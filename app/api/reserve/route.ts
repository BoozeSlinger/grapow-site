import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { date, time, guests, name, email } = await req.json();

    // 1. Send Email Notification
    // Only attempt if API key is present to avoid crashing in demo mode
    if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
        from: 'Gra Pow Reservations <reservations@grapow.site>', // Requires domain verification
        to: ['breezeblocks089@gmail.com'],
        subject: `Start of New Reservation Request: ${name} - ${date} @ ${time}`,
        html: `
            <h1>New Reservation Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <br/>
            <p><em>Please confirm availability with the guest directly.</em></p>
        `
        });
    } else {
        console.log("Simulating Email Send:", { date, time, guests, name, email });
    }

    // 2. Send to Google Sheets (via Apps Script Webhook)
    // Only attempt if Webhook URL is present
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time, guests, name, email, timestamp: new Date().toISOString() })
        });
    } else {
         console.log("Simulating Sheets Push:", { date, time, guests, name, email });
    }

    return NextResponse.json({ success: true, message: "Reservation received" });

  } catch (error) {
    console.error("Reservation Error:", error);
    return NextResponse.json({ success: false, message: "Failed to process reservation" }, { status: 500 });
  }
}
