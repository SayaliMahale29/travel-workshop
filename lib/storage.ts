import fs from "fs/promises";
import path from "path";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { list, put } from "@vercel/blob";
import defaultContent from "@/data/site-content.json";
import type { Registration, SiteContent } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_OVERRIDE = path.join(DATA_DIR, "content-override.json");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");

const CONTENT_BLOB = "site-content.json";
const REGISTRATIONS_PREFIX = "private/registrations/";
const SCREENSHOTS_PREFIX = "private/payment-screenshots/";

// Vercel's filesystem is ephemeral, so blob storage is the only durable option there.
function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readBlob<T>(pathname: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname });
    const match = blobs.find((b) => b.pathname === pathname);
    if (!match) return null;
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function writeBlob(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function encryptionKey(): Buffer {
  const secret =
    process.env.DATA_ENCRYPTION_SECRET ??
    process.env.BLOB_READ_WRITE_TOKEN ??
    process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("A storage secret is required to protect registration data");
  return createHash("sha256").update(secret).digest();
}

function encrypt(data: Buffer): Buffer {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]);
}

function decrypt(data: Buffer): Buffer {
  const iv = data.subarray(0, 12);
  const authTag = data.subarray(12, 28);
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]);
}

async function writeEncryptedBlob(pathname: string, data: Buffer): Promise<void> {
  await put(pathname, encrypt(data), {
    access: "public",
    contentType: "application/octet-stream",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function readEncryptedUrl(url: string): Promise<Buffer> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Stored file could not be read");
  return decrypt(Buffer.from(await res.arrayBuffer()));
}

async function registrationBlobs() {
  const all = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: REGISTRATIONS_PREFIX, cursor, limit: 1000 });
    all.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return all;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

const DEFAULT_CONTENT = defaultContent as SiteContent;

// Saved content from an older site version is replaced so new prices/text always show.
function isOutdated(stored: SiteContent | null): boolean {
  return (stored?.contentVersion ?? 0) < (DEFAULT_CONTENT.contentVersion ?? 0);
}

export async function getSiteContent(): Promise<SiteContent> {
  if (useBlob()) {
    const stored = await readBlob<SiteContent>(CONTENT_BLOB);
    if (stored && isOutdated(stored)) {
      await saveSiteContent(DEFAULT_CONTENT);
      return DEFAULT_CONTENT;
    }
    return stored ?? DEFAULT_CONTENT;
  }

  try {
    const raw = await fs.readFile(CONTENT_OVERRIDE, "utf-8");
    const parsed = JSON.parse(raw) as SiteContent;
    if (isOutdated(parsed)) return DEFAULT_CONTENT;
    return parsed;
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  if (useBlob()) {
    await writeBlob(CONTENT_BLOB, content);
    return;
  }

  await ensureDataDir();
  await fs.writeFile(CONTENT_OVERRIDE, JSON.stringify(content, null, 2), "utf-8");
}

export async function getRegistrations(): Promise<Registration[]> {
  if (useBlob()) {
    const blobs = await registrationBlobs();
    const registrations = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const data = await readEncryptedUrl(blob.url);
          return JSON.parse(data.toString("utf-8")) as Registration;
        } catch {
          return null;
        }
      })
    );
    return registrations
      .filter((registration): registration is Registration => registration !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  await ensureDataDir();
  try {
    const raw = await fs.readFile(REGISTRATIONS_FILE, "utf-8");
    return JSON.parse(raw) as Registration[];
  } catch {
    return [];
  }
}

export async function getRegistrationCount(): Promise<number> {
  try {
    if (useBlob()) return (await registrationBlobs()).length;
    return (await getRegistrations()).length;
  } catch {
    return 0;
  }
}

export async function saveRegistrations(regs: Registration[]): Promise<void> {
  if (useBlob()) {
    await Promise.all(
      regs.map((registration) =>
        writeEncryptedBlob(
          `${REGISTRATIONS_PREFIX}${registration.id}.enc`,
          Buffer.from(JSON.stringify(registration), "utf-8")
        )
      )
    );
    return;
  }

  await ensureDataDir();
  await fs.writeFile(REGISTRATIONS_FILE, JSON.stringify(regs, null, 2), "utf-8");
}

export async function addRegistration(reg: Registration): Promise<void> {
  if (useBlob()) {
    await writeEncryptedBlob(
      `${REGISTRATIONS_PREFIX}${reg.id}.enc`,
      Buffer.from(JSON.stringify(reg), "utf-8")
    );
    return;
  }
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
  if (useBlob()) {
    await writeEncryptedBlob(
      `${REGISTRATIONS_PREFIX}${regs[idx].id}.enc`,
      Buffer.from(JSON.stringify(regs[idx]), "utf-8")
    );
    return regs[idx];
  }
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

export async function savePaymentScreenshot(
  registrationId: string,
  file: File
): Promise<string> {
  if (!useBlob()) {
    const extension = file.type === "image/png" ? "png" : "jpg";
    const pathname = path.join(DATA_DIR, `${registrationId}.${extension}.enc`);
    await ensureDataDir();
    await fs.writeFile(pathname, encrypt(Buffer.from(await file.arrayBuffer())));
    return pathname;
  }

  const pathname = `${SCREENSHOTS_PREFIX}${registrationId}.enc`;
  await writeEncryptedBlob(pathname, Buffer.from(await file.arrayBuffer()));
  return pathname;
}

export async function getPaymentScreenshot(
  registration: Registration
): Promise<Buffer | null> {
  if (!registration.paymentScreenshotPath) return null;

  if (!useBlob()) {
    try {
      return decrypt(await fs.readFile(registration.paymentScreenshotPath));
    } catch {
      return null;
    }
  }

  const { blobs } = await list({ prefix: registration.paymentScreenshotPath });
  const blob = blobs.find((item) => item.pathname === registration.paymentScreenshotPath);
  if (!blob) return null;
  try {
    return await readEncryptedUrl(blob.url);
  } catch {
    return null;
  }
}
