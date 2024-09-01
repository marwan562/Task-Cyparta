import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token && pathname !== "/login") {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (token && (pathname === "/" || pathname === "/login")) {
    const redirectUrl = new URL("/employees/profile", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

