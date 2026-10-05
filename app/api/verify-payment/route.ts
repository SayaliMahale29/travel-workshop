import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { getSiteContent, updateRegistration } from "@/lib/storage";
import { notifyAfterPayment } from "@/lib/notify";

const schema = z.object({
  registrationId: z.string().uuid(),
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { registrationId, orderId, paymentId, signature } = parsed.data;

  if (!verifyPaymentSignature(orderId, paymentId, signature)) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  const { findRegistrationById } = await import("@/lib/storage");
  const existing = await findRegistrationById(registrationId);
  if (!existing) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }
  if (existing.status === "paid") {
    return NextResponse.json({ success: true, alreadyPaid: true });
  }

  const updated = await updateRegistration(registrationId, {
    status: "paid",
    razorpayPaymentId: paymentId,
    paidAt: new Date().toISOString(),
  });

  if (updated) {
    const content = await getSiteContent();
    await notifyAfterPayment(updated, content);
  }

  return NextResponse.json({ success: true });
}
