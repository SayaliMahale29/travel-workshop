import { NextResponse } from "next/server";
import { z } from "zod";
import { getRazorpay, isRazorpayConfigured } from "@/lib/razorpay";
import { addRegistration, getSiteContent } from "@/lib/storage";
import type { Registration } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
});

export async function POST(request: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Payment system not configured. See SETUP-GUIDE.md" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const content = await getSiteContent();
  if (!content.workshop.registrationOpen) {
    return NextResponse.json({ error: "Registration is closed" }, { status: 403 });
  }

  const { name, email, phone } = parsed.data;
  const amountPaise = content.workshop.price * 100;

  const registration: Registration = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    amount: content.workshop.price,
    currency: content.workshop.currency,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: registration.id.slice(0, 8),
      notes: {
        registrationId: registration.id,
        email,
        name,
      },
    });

    registration.razorpayOrderId = order.id;
    await addRegistration(registration);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      registrationId: registration.id,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
