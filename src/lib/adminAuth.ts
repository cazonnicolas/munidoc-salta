import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "munidoc_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const encoder = new TextEncoder();

function getAdminSecret() {
  // TODO: En producción usar siempre ADMIN_SESSION_SECRET independiente y largo.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", getAdminSecret()).update(payload).digest("base64url");
}

export function createAdminSessionToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = toBase64Url(
    JSON.stringify({
      role: "activity_admin",
      iat: now,
      exp: now + ADMIN_SESSION_MAX_AGE,
    }),
  );

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  const secret = getAdminSecret();
  if (!token || !secret || !token.includes(".")) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload);
  const signatureBytes = encoder.encode(signature);
  const expectedBytes = encoder.encode(expectedSignature);

  if (signatureBytes.length !== expectedBytes.length) return false;

  try {
    const validSignature = timingSafeEqual(signatureBytes, expectedBytes);
    if (!validSignature) return false;

    const decoded = JSON.parse(fromBase64Url(payload)) as { exp?: number; role?: string };
    return decoded.role === "activity_admin" && typeof decoded.exp === "number" && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(sessionToken);
}
