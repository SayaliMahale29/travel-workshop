import { Resend } from "resend";
import type { Registration, SiteContent } from "./types";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function formatWorkshopDetails(content: SiteContent): string {
  const w = content.workshop;
  return `
Workshop: ${content.title}
Dates: ${w.dates}
Time: ${w.time}
Mode: ${w.mode}
Duration: ${w.duration}

${w.joinDetails}
`.trim();
}

export async function sendBuyerConfirmation(
  reg: Registration,
  content: SiteContent
): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping buyer email");
    return false;
  }

  const from = process.env.EMAIL_FROM ?? "Workshop <onboarding@resend.dev>";
  const details = formatWorkshopDetails(content);

  const { error } = await resend.emails.send({
    from,
    to: reg.email,
    subject: `You're registered! ${content.title}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="color: #ea580c;">Payment confirmed!</h1>
        <p>Hi ${reg.name},</p>
        <p>Thank you for registering for <strong>${content.title}</strong>.</p>
        <p>Amount paid: <strong>₹${reg.amount}</strong></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <pre style="background: #f8fafc; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 14px;">${details}</pre>
        <p>See you on ${content.workshop.dates}!</p>
        <p>— Team ${content.creator.name}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Buyer email error:", error);
    return false;
  }
  return true;
}

export async function sendOrganizerNotification(
  reg: Registration,
  content: SiteContent
): Promise<boolean> {
  const resend = getResend();
  const organizerEmail = process.env.ORGANIZER_EMAIL;
  if (!resend || !organizerEmail) {
    console.warn("Email not configured for organizer notification");
    return false;
  }

  const from = process.env.EMAIL_FROM ?? "Workshop <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: organizerEmail,
    subject: `New paid registration — ${reg.name}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>New workshop registration (paid)</h2>
        <ul>
          <li><strong>Name:</strong> ${reg.name}</li>
          <li><strong>Email:</strong> ${reg.email}</li>
          <li><strong>Phone:</strong> ${reg.phone}</li>
          <li><strong>Amount:</strong> ₹${reg.amount}</li>
          <li><strong>Payment ID:</strong> ${reg.razorpayPaymentId ?? "—"}</li>
          <li><strong>Registered at:</strong> ${reg.paidAt ?? reg.createdAt}</li>
        </ul>
        <p>Workshop: ${content.title} — ${content.workshop.dates}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Organizer email error:", error);
    return false;
  }
  return true;
}

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
