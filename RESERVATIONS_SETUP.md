# Reservation System Setup Guide 🛠️

To make the reservation form actually send emails and save to Google Sheets, you need to set up two environments variables. Until you add these, the system runs in **Simulation Mode** (it just logs to the console).

## 1. Email Notifications (Resend)

We use [Resend](https://resend.com) to send transactional emails. It has a generous free tier.

1.  Go to [Resend.com](https://resend.com) and sign up.
2.  Create an API Key.
3.  Copy the key (starts with `re_...`).
4.  **env variable name:** `RESEND_API_KEY`

_Note: On the free tier, you can only send emails to the email address you signed up with unless you verify a domain._

## 2. Google Sheets Database

We use a Google Apps Script to catch the reservation data and append it to a sheet.

1.  Create a new Google Sheet at [sheets.new](https://sheets.new).
2.  Name the tabs `Reservations`.
3.  Add headers in Row 1: `Date`, `Time`, `Guests`, `Name`, `Email`, `Timestamp`.
4.  Go to **Extensions** > **Apps Script**.
5.  Delete existing code and paste this:
    ```javascript
    function doPost(e) {
      var sheet =
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reservations");
      var data = JSON.parse(e.postData.contents);

      sheet.appendRow([
        data.date,
        data.time,
        data.guests,
        data.name,
        data.email,
        data.timestamp,
      ]);

      return ContentService.createTextOutput(
        JSON.stringify({ result: "success" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }
    ```
6.  Click **Deploy** > **New Deployment**.
7.  Select type: **Web app**.
8.  Set **Who has access** to: **Anyone**. (Crucial!)
9.  Click **Deploy** and copy the **Web app URL**.
10. **env variable name:** `GOOGLE_SHEETS_WEBHOOK_URL`

## How to Add Variables

### Vercel / Hostinger

Go to your project settings -> **Environment Variables**.

1. `RESEND_API_KEY`: `re_12345...`
2. `GOOGLE_SHEETS_WEBHOOK_URL`: `https://script.google.com/macros/s/...`

### Local Development

Create a `.env.local` file in the root directory:

```bash
RESEND_API_KEY=re_12345...
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/...
```
