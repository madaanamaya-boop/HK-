/**
 * Central client-side lead submission helper.
 * All forms across the site post through this function so future
 * integrations (email, Google Sheets, CRM, WhatsApp API, webhooks,
 * databases) only need to be wired in one place: /api/leads.
 */

export interface LeadPayload {
  name: string;
  mobile: string;
  email?: string;
  city?: string;
  service?: string;
  amount?: string;
  message?: string;
  consent?: boolean;
  /** Where on the site the lead originated, e.g. "contact-page", "chatbot". */
  source: string;
  [key: string]: unknown;
}

export interface LeadResponse {
  success: boolean;
  leadId?: string;
  message?: string;
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { success: false, message: "Something went wrong. Please try again." };
    }
    return (await res.json()) as LeadResponse;
  } catch {
    return { success: false, message: "Network error. Please check your connection and try again." };
  }
}
