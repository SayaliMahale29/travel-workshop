import { NextResponse } from "next/server";
import { z } from "zod";
import { addRegistration, getSiteContent, savePaymentScreenshot } from "@/lib/storage";
import type { Registration } from "@/lib/types";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().min(10, "Enter a 10-digit WhatsApp number").max(15, "Enter a valid WhatsApp number")),
  age: z.string().trim().min(1, "Enter your age").max(3),
  location: z.string().trim().min(2, "Enter your location"),
  paymentOption: z.enum(["advance", "full"]).default("advance"),
  socialLink: z.string().trim().min(2, "Enter your Instagram or YouTube"),
  experience: z.string().trim().min(1, "Select your content experience"),
  biggestChallenge: z.string().trim().min(2, "Enter your biggest challenge"),
  learningGoal: z.string().trim().min(1, "Select the one thing you want to master"),
  favoriteAkashContent: z.string().trim().min(2, "Tell us what you like about Akash's content"),
  transactionId: z.string().trim().min(3, "Enter the UPI transaction ID"),
  paymentConfirmed: z.literal("yes", {
    errorMap: () => ({ message: "Please confirm that payment is complete" }),
  }),
});

const ALLOWED_SCREENSHOTS = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_SCREENSHOT_SIZE = 10 * 1024 * 1024;

const FIELD_LABELS: Record<string, string> = {
  name: "name",
  email: "email",
  phone: "WhatsApp number",
  age: "age",
  location: "location",
  socialLink: "Instagram or YouTube",
  experience: "content experience",
  biggestChallenge: "biggest challenge",
  learningGoal: "learning goal",
  favoriteAkashContent: "favourite Akash content",
  transactionId: "transaction ID",
  paymentConfirmed: "payment confirmation",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") fields[key] = value;
    }

    const parsed = schema.safeParse(fields);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      const field = first?.path[0] ? FIELD_LABELS[String(first.path[0])] ?? String(first.path[0]) : "form";
      return NextResponse.json(
        { error: first?.message ?? `Please check the ${field} field.` },
        { status: 400 }
      );
    }

    const screenshot = formData.get("paymentScreenshot");
    if (!(screenshot instanceof File) || screenshot.size === 0) {
      return NextResponse.json({ error: "Please upload your payment screenshot." }, { status: 400 });
    }
    if (!ALLOWED_SCREENSHOTS.has(screenshot.type) || screenshot.size > MAX_SCREENSHOT_SIZE) {
      return NextResponse.json(
        { error: "Upload a JPG, PNG, or WebP screenshot smaller than 10 MB." },
        { status: 400 }
      );
    }

    const content = await getSiteContent();
    if (!content.workshop.registrationOpen) {
      return NextResponse.json({ error: "Registration is currently closed." }, { status: 403 });
    }

    const id = crypto.randomUUID();
    const paymentScreenshotPath = await savePaymentScreenshot(id, screenshot);
    const { paymentConfirmed: _paymentConfirmed, ...details } = parsed.data;
    const finalAmount =
      details.paymentOption === "advance" ? content.workshop.advanceAmount : content.workshop.price;
    const registration: Registration = {
      id,
      batch: content.workshop.batch,
      ...details,
      paymentScreenshotPath,
      paymentScreenshotType: screenshot.type,
      amount: finalAmount,
      currency: content.workshop.currency,
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    await addRegistration(registration);
    return NextResponse.json({ success: true, registrationId: id });
  } catch (error) {
    console.error("Manual registration failed:", error);
    return NextResponse.json(
      { error: "We could not submit your registration. Please try again." },
      { status: 500 }
    );
  }
}
