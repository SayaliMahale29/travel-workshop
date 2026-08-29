import fs from "fs/promises";
import path from "path";
import defaultContent from "@/data/site-content.json";
import type { Registration, SiteContent } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_OVERRIDE = path.join(DATA_DIR, "content-override.json");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_OVERRIDE, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return defaultContent as SiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(CONTENT_OVERRIDE, JSON.stringify(content, null, 2), "utf-8");
}

export async function getRegistrations(): Promise<Registration[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(REGISTRATIONS_FILE, "utf-8");
    return JSON.parse(raw) as Registration[];
  } catch {
    return [];
  }
}

export async function saveRegistrations(regs: Registration[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(regs, null, 2), "utf-8");
}

export async function addRegistration(reg: Registration): Promise<void> {
  const regs = await getRegistrations();
  regs.push(reg);
  await saveRegistrations(regs);
}

export async function updateRegistration(
  id: string,
  updates: Partial<Registration>
): Promise<Registration | null> {
  const regs = await getRegistrations();
  const idx = regs.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  regs[idx] = { ...regs[idx], ...updates };
  await saveRegistrations(regs);
  return regs[idx];
}

export async function findRegistrationByOrderId(
  orderId: string
): Promise<Registration | null> {
  const regs = await getRegistrations();
  return regs.find((r) => r.razorpayOrderId === orderId) ?? null;
}

export async function findRegistrationById(
  id: string
): Promise<Registration | null> {
  const regs = await getRegistrations();
  return regs.find((r) => r.id === id) ?? null;
}
