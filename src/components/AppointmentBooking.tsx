"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(6, "A valid phone number is required"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  concern: z.string().optional(),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];

function getNextDays(count: number) {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 1; days.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) days.push(d); // skip Sundays
  }
  return days;
}

export default function AppointmentBooking() {
  const days = useMemo(() => getNextDays(10), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (!selectedDate || !selectedTime) {
      setError("Please select a date and time slot.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          preferredDate: selectedDate.toISOString().slice(0, 10),
          preferredTime: selectedTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass-card mx-auto max-w-xl rounded-3xl p-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[var(--emerald)] to-[var(--lux-blue)] text-white"
        >
          <CheckCircle2 size={28} />
        </motion.div>
        <h3 className="font-display text-2xl font-semibold text-[#0b0f1a]">
          Appointment Requested
        </h3>
        <p className="mt-2 text-sm text-[#0b0f1a]/55">
          Our team will confirm your slot via phone / email / WhatsApp shortly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setSelectedDate(null);
            setSelectedTime(null);
          }}
          className="mt-6 rounded-full bg-[var(--lux-blue)] px-6 py-3 text-sm font-semibold text-white"
        >
          Book Another Slot
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card mx-auto max-w-3xl rounded-3xl p-6 sm:p-10">
      <div className="mb-8 flex items-center gap-3">
        <CalendarDays className="text-[var(--lux-blue)]" size={22} />
        <h3 className="font-display text-2xl font-semibold text-[#0b0f1a]">
          Book Your Appointment
        </h3>
      </div>

      {/* Date picker */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#0b0f1a]/45">
        Select a Date
      </p>
      <div className="scrollbar-none mb-6 flex gap-3 overflow-x-auto pb-2">
        {days.map((d) => {
          const active = selectedDate?.toDateString() === d.toDateString();
          return (
            <button
              key={d.toISOString()}
              onClick={() => setSelectedDate(d)}
              className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition ${
                active
                  ? "border-[var(--lux-blue)] bg-[var(--lux-blue)] text-white"
                  : "border-[#0b0f1a]/10 bg-white/60 text-[#0b0f1a]/70 hover:border-[var(--lux-blue)]/40"
              }`}
            >
              <span className="text-[10px] uppercase">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="mt-1 font-display text-lg font-semibold">{d.getDate()}</span>
              <span className="text-[9px] uppercase">
                {d.toLocaleDateString("en-US", { month: "short" })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#0b0f1a]/45">
              <Clock size={12} /> Available Slots
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`rounded-xl border px-2 py-2.5 text-xs font-medium transition ${
                    selectedTime === slot
                      ? "border-[var(--emerald)] bg-[var(--emerald)]/10 text-[var(--emerald)]"
                      : "border-[#0b0f1a]/10 bg-white/60 text-[#0b0f1a]/70 hover:border-[var(--emerald)]/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name *" error={errors.name?.message}>
          <input {...register("name")} className="input" placeholder="Your name" />
        </Field>
        <Field label="Phone Number *" error={errors.phone?.message}>
          <input {...register("phone")} className="input" placeholder="+91 XXXXX XXXXX" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} className="input" placeholder="you@example.com" />
        </Field>
        <Field label="Concern">
          <select {...register("concern")} className="input">
            <option value="">Select a concern</option>
            <option>Knee Pain / Replacement</option>
            <option>Hip Pain / Replacement</option>
            <option>Shoulder Pain / Replacement</option>
            <option>Sports Injury</option>
            <option>Fracture / Trauma</option>
            <option>General Consultation</option>
          </select>
        </Field>
        <Field label="Message" className="sm:col-span-2">
          <textarea {...register("message")} rows={3} className="input" placeholder="Briefly describe your condition" />
        </Field>

        {error && <p className="text-xs text-red-500 sm:col-span-2">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--emerald)] py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 sm:col-span-2"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Booking...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(11,15,26,0.1);
          background: rgba(255,255,255,0.7);
          padding: 12px 14px;
          font-size: 14px;
          outline: none;
        }
        .input:focus { border-color: var(--lux-blue); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold text-[#0b0f1a]/60">{label}</label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
