import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminPassword, getExpectedAdminToken } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const token = await getExpectedAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
