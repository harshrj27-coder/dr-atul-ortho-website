import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getExpectedAdminToken } from "@/lib/adminAuth";

// Protects everything under /admin (except the login page itself) and the
// admin API routes. If the session cookie is missing or wrong, redirect to
// the login page instead of ever rendering the dashboard.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin/login") || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = await getExpectedAdminToken();

  if (!cookie || cookie !== expected) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
