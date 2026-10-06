import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/site-auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Login page is public; send already-authed visitors home.
  if (pathname === "/login" || pathname.startsWith("/login/")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (verifyToken(token)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!verifyToken(token)) {
    const loginUrl = new URL("/login", request.url);
    const next = `${pathname}${search}`;
    if (next && next !== "/") {
      loginUrl.searchParams.set("next", next);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protect everything except Next internals and common static assets.
     * /login is handled inside the proxy (allowed through).
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
