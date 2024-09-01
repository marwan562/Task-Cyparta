import { NextResponse, NextRequest } from "next/server";
import Cookies from "js-cookie";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    
    const token = Cookies.get("accessToken");

    if (token) {
      const redirectUrl = new URL("/employees/profile", request.url);
      return NextResponse.redirect(redirectUrl);
    } else {
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}
