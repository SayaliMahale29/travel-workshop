import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteContent, saveSiteContent, getRegistrations } from "@/lib/storage";
import type { SiteContent } from "@/lib/types";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [content, registrations] = await Promise.all([
    getSiteContent(),
    getRegistrations(),
  ]);

  return NextResponse.json({
    content,
    registrations: registrations.filter((r) => r.status === "submitted" || r.status === "paid"),
  });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteContent;
  await saveSiteContent(body);
  return NextResponse.json({ success: true });
}
