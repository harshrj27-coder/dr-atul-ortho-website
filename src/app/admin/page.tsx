"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  concern: string | null;
  message: string | null;
  status: string;
  payment_status: string;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "confirmed", "completed", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "paid", "cash"];

const STATUS_COLOR: Record<string, string> = {
  new: "bg-blue-500/15 text-blue-300",
  confirmed: "bg-amber-500/15 text-amber-300",
  completed: "bg-emerald-500/15 text-emerald-300",
  cancelled: "bg-red-500/15 text-red-300",
};

const PAYMENT_COLOR: Record<string, string> = {
  pending: "bg-white/10 text-white/60",
  paid: "bg-emerald-500/15 text-emerald-300",
  cash: "bg-amber-500/15 text-amber-300",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings", { cache: "no-store" });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const json = await res.json();
    setBookings(json.bookings || []);
    setConfigured(json.configured !== false);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function updateBooking(id: string, patch: Partial<Pick<Booking, "status" | "payment_status">>) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.name?.toLowerCase().includes(q) ||
      b.phone?.toLowerCase().includes(q) ||
      (b.email || "").toLowerCase().includes(q)
    );
  });

  const stats = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    paid: bookings.filter((b) => b.payment_status === "paid").length,
    pending: bookings.filter((b) => b.payment_status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-white/40">Admin</p>
            <h1 className="font-display text-3xl">Bookings &amp; payments</h1>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 hover:border-white/30 hover:text-white"
          >
            Log out
          </button>
        </div>

        {!configured && (
          <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            Supabase isn&apos;t connected yet, so there&apos;s nothing to show here.
            Run <code>supabase/schema.sql</code> in your Supabase project and add
            the keys to <code>.env.local</code> to start seeing real bookings.
          </div>
        )}

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total bookings", value: stats.total },
            { label: "New", value: stats.new },
            { label: "Paid", value: stats.paid },
            { label: "Payment pending", value: stats.pending },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by name, phone or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-sm rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm outline-none focus:border-[var(--lux-blue)]"
        />

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Preferred slot</th>
                <th className="px-4 py-3">Concern</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Booked on</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/40">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-white/70">
                    <div>{b.phone}</div>
                    {b.email && <div className="text-xs text-white/40">{b.email}</div>}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {b.preferred_date || "—"} {b.preferred_time || ""}
                  </td>
                  <td className="px-4 py-3 text-white/70">{b.concern || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateBooking(b.id, { status: e.target.value })}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none ${STATUS_COLOR[b.status] || "bg-white/10"}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#0b0f1a] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.payment_status}
                      onChange={(e) => updateBooking(b.id, { payment_status: e.target.value })}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium outline-none ${PAYMENT_COLOR[b.payment_status] || "bg-white/10"}`}
                    >
                      {PAYMENT_OPTIONS.map((p) => (
                        <option key={p} value={p} className="bg-[#0b0f1a] text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/50">
                    {new Date(b.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-white/30">
          Online payment collection isn&apos;t connected yet — mark payments as
          &quot;paid&quot; or &quot;cash&quot; manually for now. Once you set up
          Razorpay/Stripe, this can auto-update.
        </p>
      </div>
    </div>
  );
}
