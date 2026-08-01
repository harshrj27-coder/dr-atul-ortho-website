import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      console.log("[mock] Newsletter signup:", parsed.data.email);
      return NextResponse.json({ ok: true, mock: true });
    }

    const { error } = await admin
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email });

    // Ignore unique-constraint violations (already subscribed) — still a success.
    if (error && error.code !== "23505") throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("newsletter POST error:", err);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
