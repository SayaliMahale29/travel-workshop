import { NextResponse } from "next/server";
import { z } from "zod";
import { addRegistration, getSiteContent, savePaymentScreenshot } from "@/lib/storage";
import type { Registration } from "@/lib/types";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10).max(15),
  age: z.string().trim().min(1).max(3),
  location: z.string().trim().min(2).max(100),
  socialLink: z.string().trim().min(2).max(200),
  experience: z.string().trim().min(1).max(100),
  biggestChallenge: z.string().trim().min(2).max(1000),
  learningGoal: z.string().trim().min(1).max(100),
  favoriteAkashContent: z.string().trim().min(2).max(1000),
  transactionId: z.string().trim().min(4).max(100),
  paymentConfirmed: z.literal("yes"),
});

const ALLOWED_SCREENSHOTS = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SCREENSHOT_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete every required field correctly." },
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
    const registration: Registration = {
      id,
      ...details,
      paymentScreenshotPath,
      paymentScreenshotType: screenshot.type,
      amount: content.workshop.price,
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
