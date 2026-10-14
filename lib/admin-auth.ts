import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Admin (editor) auth. Completely separate from the site viewing gate:
 * it uses ADMIN_PASSWORD, its own httpOnly cookie, and is checked on every
 * write endpoint.
 */
export const ADMIN_COOKIE = "site_admin";
/** Non-secret hint so the browser knows to show the editor toolbar. */
export const ADMIN_HINT_COOKIE = "site_admin_ui";
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 14; // 14 days
/** Custom header every editor request must carry (blocks cross-site form posts). */
export const EDITOR_HEADER = "x-charmaine-editor";

function secret(): string | undefined {
  const s = process.env.ADMIN_PASSWORD;
  return s && s.length >= 8 ? s : undefined;
}

function sign(exp: number, key: string) {
  return createHmac("sha256", key).update(`admin-v1.${exp}`).digest("hex");
}

export function createAdminToken(): string | null {
  const key = secret();
  if (!key) return null;
  const exp = Math.floor(Date.now() / 1000) + ADMIN_MAX_AGE;
  return `${exp}.${sign(exp, key)}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || !sig || exp < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(exp, key));
  const got = Buffer.from(sig);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

export function verifyAdminPassword(submitted: string): boolean {
  const key = secret();
  if (!key) return false;
  const a = createHmac("sha256", "admin-pw-check")
    .update(submitted.trim())
    .digest();
  const b = createHmac("sha256", "admin-pw-check").update(key).digest();
  return timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

/** Use at the top of every write route. Returns a Response to send back if not allowed. */
export async function requireAdmin(request: Request): Promise<Response | null> {
  if (request.headers.get(EDITOR_HEADER) !== "1") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAdmin())) {
    return Response.json({ error: "Not logged in as editor" }, { status: 401 });
  }
  return null;
}
