import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_HINT_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/", request.url), 303);
  const secure = process.env.NODE_ENV === "production";
  for (const name of [ADMIN_COOKIE, ADMIN_HINT_COOKIE]) {
    res.cookies.set(name, "", {
      httpOnly: name === ADMIN_COOKIE,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
  return res;
}
