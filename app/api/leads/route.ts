import { NextRequest, NextResponse } from "next/server";

/**
 * Central lead intake endpoint.
 *
 * Currently logs leads to the server console and returns success.
 * Integration points (uncomment / implement as needed):
 *  - Email notification (e.g. Resend, Nodemailer)
 *  - Google Sheets (Sheets API append)
 *  - CRM (Zoho, HubSpot, custom)
 *  - WhatsApp Business API notification
 *  - Webhook forwarding
 *  - Database persistence (Postgres, MongoDB)
 */

interface LeadBody {
  name?: string;
  mobile?: string;
  email?: string;
  city?: string;
  service?: string;
  amount?: string;
  message?: string;
  consent?: boolean;
  source?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  if (!body.name || !body.mobile) {
    return NextResponse.json(
      { success: false, message: "Name and mobile number are required" },
      { status: 400 }
    );
  }

  const lead = {
    ...body,
    leadId: `HKF-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
  };

  // ── Mock persistence: server console ─────────────────────────────
  console.log("[HK FINCORP LEAD]", JSON.stringify(lead, null, 2));

  // ── Future integrations ───────────────────────────────────────────
  // await sendEmailNotification(lead);
  // await appendToGoogleSheet(lead);
  // await pushToCrm(lead);
  // await notifyWhatsAppBusiness(lead);
  // await forwardToWebhook(lead);
  // await saveToDatabase(lead);

  return NextResponse.json({
    success: true,
    leadId: lead.leadId,
    message: "Thank you. Our team will contact you shortly.",
  });
}
