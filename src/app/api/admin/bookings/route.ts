import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// Auth is already enforced by src/middleware.ts for everything under
// /api/admin/*, so these handlers can assume the caller is a logged-in admin.

export async function GET() {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return NextResponse.json({
      ok: true,
      configured: false,
      bookings: [],
    });
  }

  const { data, error } = await admin
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json({ error: "Could not fetch bookings." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, configured: true, bookings: data });
}

export async function PATCH(req: NextRequest) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase isn't connected yet — connect it to save changes." },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { id, status, payment_status } = body as {
    id?: string;
    status?: string;
    payment_status?: string;
  };

  if (!id) {
    return NextResponse.json({ error: "Missing booking id." }, { status: 400 });
  }

  const update: Record<string, string> = {};
  if (status) update.status = status;
  if (payment_status) update.payment_status = payment_status;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { data, error } = await admin
    .from("appointments")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Could not update booking." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, booking: data });
}
