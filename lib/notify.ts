import type { Registration, SiteContent } from "./types";

function formatWhatsAppMessage(reg: Registration, content: SiteContent): string {
  const w = content.workshop;
  return [
    `Hi ${reg.name}! Your payment for *${content.title}* is confirmed.`,
    ``,
    `Dates: ${w.dates}`,
    `Time: ${w.time}`,
    `Amount paid: Rs.${reg.amount}`,
    ``,
    w.joinDetails,
    ``,
    `See you there! — ${content.creator.name}`,
  ].join("\n");
}

export async function sendWhatsAppConfirmation(
  reg: Registration,
  content: SiteContent
): Promise<boolean> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiKey = process.env.WHATSAPP_API_KEY;

  if (!apiUrl || !apiKey) {
    console.warn("WhatsApp API not configured — skipping. See SETUP-GUIDE.md");
    return false;
  }

  const phone = reg.phone.replace(/\D/g, "");
  const fullPhone = phone.startsWith("91") ? phone : `91${phone}`;
  const message = formatWhatsAppMessage(reg, content);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode: "+91",
        phoneNumber: fullPhone.replace(/^91/, ""),
        type: "Text",
        data: { message },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("WhatsApp API error:", response.status, text);
      return false;
    }
    return true;
  } catch (err) {
    console.error("WhatsApp send failed:", err);
    return false;
  }
}

export function isWhatsAppConfigured(): boolean {
  return !!(process.env.WHATSAPP_API_URL && process.env.WHATSAPP_API_KEY);
}

export async function notifyAfterPayment(
  reg: Registration,
  content: SiteContent
): Promise<{ emailBuyer: boolean; emailOrganizer: boolean; whatsapp: boolean }> {
  const { sendBuyerConfirmation, sendOrganizerNotification } = await import(
    "./email"
  );

  const [emailBuyer, emailOrganizer, whatsapp] = await Promise.all([
    sendBuyerConfirmation(reg, content),
    sendOrganizerNotification(reg, content),
    sendWhatsAppConfirmation(reg, content),
  ]);

  return { emailBuyer, emailOrganizer, whatsapp };
}
