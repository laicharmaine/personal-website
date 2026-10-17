import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_HINT_COOKIE,
  ADMIN_MAX_AGE,
  createAdminToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

/** Admin login (form post from /admin). */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");
  const ok =
    password.length > 0 &&
    password.length < 200 &&
    verifyAdminPassword(password);
  if (!ok) {
    // Small delay to slow down guessing.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
  }
  const token = createAdminToken();
  if (!token)
    return NextResponse.redirect(new URL("/admin?error=1", request.url), 303);

  const res = NextResponse.redirect(new URL("/?edit=1", request.url), 303);
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });
  res.cookies.set(ADMIN_HINT_COOKIE, "1", {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });
  return res;
}
