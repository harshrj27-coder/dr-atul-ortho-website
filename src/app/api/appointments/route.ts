import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const appointmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(6, "A valid phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  concern: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const admin = getSupabaseAdmin();

    if (!admin) {
      // Mock mode: Supabase isn't configured yet. Log the booking so local
      // development still feels real, and return success so the UI flow
      // (confirmation screen, etc.) can be built/tested end-to-end.
      console.log("[mock] New appointment request:", data);
      return NextResponse.json({
        ok: true,
        mock: true,
        appointment: { ...data, id: `mock-${Date.now()}`, status: "new" },
      });
    }

    const { data: inserted, error } = await admin
      .from("appointments")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        preferred_date: data.preferredDate || null,
        preferred_time: data.preferredTime || null,
        concern: data.concern || null,
        message: data.message || null,
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: hook up SMS / email / WhatsApp confirmation here once you have
    // a provider (e.g. Twilio, MSG91) — see .env.example for where keys go.

    return NextResponse.json({ ok: true, appointment: inserted });
  } catch (err) {
    console.error("appointments POST error:", err);
    return NextResponse.json(
      { error: "Could not save your appointment. Please try again or call the clinic." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ ok: true, mock: true, appointments: [] });
  }
  const { data, error } = await admin
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: "Could not fetch appointments." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, appointments: data });
}
