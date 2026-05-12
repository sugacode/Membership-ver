# Member Verification Site

A lightweight, static membership verification page powered by Google Sheets + Google Apps Script.

## File structure

```
├── index.html      ← main page (do not edit)
├── config.js       ← YOUR settings (edit this)
└── README.md
```

> **Tip:** Add `config.js` to `.gitignore` to keep your token and script URL out of version control. Only deploy it directly to your hosting server.

---

## Setup

### 1. Google Apps Script (one-time)

1. Open your Google Sheet → **Extensions → Apps Script**
2. Delete everything and paste the code below
3. Replace `YOUR_SECRET_TOKEN` with the same value in `config.js → secretToken`

```javascript
const SECRET_TOKEN = "YOUR_SECRET_TOKEN"; // must match config.js

function doGet(e) {
  // Check token
  const token = e && e.parameter && e.parameter.token;
  if (token !== SECRET_TOKEN) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: "Unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Return member data
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(rows))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** → **Deploy → New deployment**
5. Gear icon ⚙ → **Web app**
6. Set **Who has access** → **Anyone**
7. Click **Deploy** → copy the **Web app URL**
8. Paste the URL into `config.js → scriptUrl`

> ⚠️ After any change to the Apps Script code, you must **Deploy → New deployment** (not "Manage deployments") to apply it.

---

### 2. config.js

```js
const CONFIG = {
  orgName:     "Your Organization Name",
  scriptUrl:   "https://script.google.com/macros/s/YOUR_ID/exec",
  secretToken: "YOUR_SECRET_TOKEN",   // same as in Apps Script

  col_memberId:   "ID",
  col_name:       "Nama",
  col_status:     "status",
  col_expiry:     "Masa_berlaku",
  col_memberType: "",
};
```

---

### 3. Google Sheet format

| ID | Nama | status | Masa_berlaku |
|----|------|--------|--------------|
| MBR-001 | Agus Santoso | active | 2025-12-31 |
| MBR-002 | Siti Rahayu | expired | 2024-06-30 |

Valid values for `status`: `active` · `expired` · `pending`

---

### 4. Deploy to hosting

Upload `index.html` and `config.js` to any static host:
- **GitHub Pages** — push to repo, enable Pages on `main` branch
- **Netlify** — drag & drop the folder
- **cPanel** — upload both files to `public_html`

---

## Security notes

- The token stops random people from querying your Apps Script URL directly
- The token is visible in page source — this is a deterrent, not a hard lock
- Do not store sensitive data (passwords, addresses, phone numbers) in the sheet
- The sheet is **read-only** — nothing can be written through this site