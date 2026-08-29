import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import {
  findRegistrationByOrderId,
  getSiteContent,
  updateRegistration,
} from "@/lib/storage";
import { notifyAfterPayment } from "@/lib/notify";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;

    const reg = await findRegistrationByOrderId(orderId);
    if (reg && reg.status !== "paid") {
      const updated = await updateRegistration(reg.id, {
        status: "paid",
        razorpayPaymentId: payment.id,
        paidAt: new Date().toISOString(),
      });

      if (updated) {
        const content = await getSiteContent();
        await notifyAfterPayment(updated, content);
      }
    }
  }

  return NextResponse.json({ received: true });
}
