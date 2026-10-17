import { NextResponse } from "next/server";

/** Legacy: the viewing gate is gone. Clear the old cookie and go home. */
export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/", request.url), 303);
  res.cookies.set("site_access", "", { path: "/", maxAge: 0 });
  return res;
}
