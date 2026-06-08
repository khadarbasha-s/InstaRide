import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM = process.env.EMAIL_FROM || "FastRental <onboarding@resend.dev>";
const NOTIFY = process.env.LEAD_NOTIFY_EMAIL || "bookings@fastrental.example";

interface LeadPayload {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  carName?: string | null;
  locationName?: string | null;
  message?: string | null;
  pickupDate?: Date | null;
  returnDate?: Date | null;
  source: string;
  createdAt: Date;
}

function leadHtml(lead: LeadPayload): string {
  const rows = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["Car", lead.carName || "—"],
    ["Location", lead.locationName || "—"],
    ["Pickup", lead.pickupDate ? new Date(lead.pickupDate).toDateString() : "—"],
    ["Return", lead.returnDate ? new Date(lead.returnDate).toDateString() : "—"],
    ["Source", lead.source],
    ["Message", lead.message || "—"],
  ];
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-weight:600;">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${v}</td></tr>`
    )
    .join("");
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#FFC107;color:#1A1A1A;padding:20px;text-align:center;">
        <h1 style="margin:0;font-size:22px;">New Lead — FastRental</h1>
      </div>
      <div style="padding:20px;background:#fff;">
        <p>You have received a new inquiry. Details below:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:12px;">${body}</table>
        <p style="margin-top:20px;color:#666;font-size:13px;">Lead ID: ${lead.id}</p>
      </div>
    </div>
  `;
}

function confirmationHtml(lead: LeadPayload): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#FFC107;color:#1A1A1A;padding:20px;text-align:center;">
        <h1 style="margin:0;font-size:22px;">We received your inquiry</h1>
      </div>
      <div style="padding:20px;background:#fff;">
        <p>Hi ${lead.name},</p>
        <p>Thanks for reaching out to FastRental! We've received your inquiry${lead.carName ? ` for the <strong>${lead.carName}</strong>` : ""} and will get back to you shortly.</p>
        <p>For an instant response, you can also:</p>
        <ul>
          <li><strong>Call us:</strong> ${process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 88245 83708"}</li>
          <li><strong>WhatsApp:</strong> ${process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 88245 83708"}</li>
        </ul>
        <p style="color:#666;font-size:13px;margin-top:20px;">— Team FastRental</p>
      </div>
    </div>
  `;
}

export async function sendLeadEmails(lead: LeadPayload): Promise<void> {
  if (!resend) {
    console.log("[email] RESEND_API_KEY not set — skipping email notifications.");
    return;
  }
  const tasks: Promise<unknown>[] = [
    resend.emails.send({
      from: FROM,
      to: NOTIFY,
      subject: `New Lead: ${lead.name} ${lead.carName ? `— ${lead.carName}` : ""}`,
      html: leadHtml(lead),
    }),
  ];
  if (lead.email) {
    tasks.push(
      resend.emails.send({
        from: FROM,
        to: lead.email,
        subject: "We received your inquiry — FastRental",
        html: confirmationHtml(lead),
      })
    );
  }
  const results = await Promise.allSettled(tasks);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[email] task ${i} failed:`, r.reason);
    }
  });
}
