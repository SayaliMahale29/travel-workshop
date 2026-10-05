import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findRegistrationById, getPaymentScreenshot } from "@/lib/storage";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const registration = await findRegistrationById(id);
  if (!registration) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  const screenshot = await getPaymentScreenshot(registration);
  if (!screenshot) {
    return NextResponse.json({ error: "Screenshot not found" }, { status: 404 });
  }

  return new Response(new Uint8Array(screenshot), {
    headers: {
      "Content-Type": registration.paymentScreenshotType ?? "image/jpeg",
      "Content-Disposition": `inline; filename="payment-${registration.id}.jpg"`,
      "Cache-Control": "private, no-store",
    },
  });
}
