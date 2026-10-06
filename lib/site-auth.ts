import { createHmac, timingSafeEqual } from "crypto";

export const COOKIE_NAME = "site_access";
const TOKEN_PAYLOAD = "site-access-v1";

function getSecret(): string | undefined {
  const secret = process.env.SITE_PASSWORD;
  return secret && secret.length > 0 ? secret : undefined;
}

/** HMAC token stored in the cookie (never the plaintext password). */
export function createAccessToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(TOKEN_PAYLOAD).digest("hex");
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = createAccessToken();
  if (!expected) return false;
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Timing-safe password check against SITE_PASSWORD. */
export function verifyPassword(submitted: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  // Hash both to fixed length so timingSafeEqual always applies.
  const a = createHmac("sha256", "pw-check").update(submitted).digest();
  const b = createHmac("sha256", "pw-check").update(secret).digest();
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Only allow same-origin relative paths for post-login redirect. */
export function safeNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("://")) {
    return "/";
  }
  return next;
}
