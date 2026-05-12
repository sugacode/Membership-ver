// ─────────────────────────────────────────────────────────────
//  MEMBERSHIP VERIFICATION — CONFIGURATION
//  Edit this file only. Do not touch index.html.
// ─────────────────────────────────────────────────────────────

const CONFIG = {

  // Organization name shown on the page
  orgName: "APSI PTMA",

  // Google Apps Script Web App URL
  scriptUrl: "https://script.google.com/macros/s/AKfycbw2byUjaoR8AWqhixE_LiSXDtcP2EY-z7QvBRGj7r88nOPpjBhjfFs8OZ_UqvmSkZps1Q/exec",

  // Secret token — must match exactly what you set in Apps Script
  // Change this to any long random string you like, then copy the
  // same value into the Apps Script (see README.md)
  secretToken: "6c905dcedf4931679c3d7e60eb83baf18a9b8404dd470a4c631cd0bffa355334",

  // ── Column names ──────────────────────────────────────────
  // Must match your Google Sheet header row exactly (case-sensitive)
  col_memberId:   "ID",            // Member ID / code
  col_name:       "Nama",          // Member full name
  col_status:     "status",        // "active" | "expired" | "pending"
  col_expiry:     "Masa_berlaku",  // Expiry date  — set "" to hide
  col_memberType: "",              // Membership type — set "" to hide

  registerUrl:   "https://forms.gle/1iGF9Baad79LYMWp8",
registerLabel: "Register as Member",  // change text if you like

};