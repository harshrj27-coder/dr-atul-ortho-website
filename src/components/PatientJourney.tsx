"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Stethoscope,
  ScanSearch,
  ClipboardList,
  Syringe,
  HeartPulse,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";

const stages = [
  { icon: CalendarCheck, title: "Appointment", desc: "Book online in under 2 minutes." },
  { icon: Stethoscope, title: "Consultation", desc: "In-depth clinical assessment." },
  { icon: ScanSearch, title: "Diagnosis", desc: "Imaging & precise evaluation." },
  { icon: ClipboardList, title: "Treatment Planning", desc: "Personalised care pathway." },
  { icon: Syringe, title: "Surgery", desc: "Robotic-assisted precision." },
  { icon: HeartPulse, title: "Recovery", desc: "Monitored post-op care." },
  { icon: Dumbbell, title: "Rehabilitation", desc: "Guided physiotherapy plan." },
  { icon: CheckCircle2, title: "Follow-up", desc: "Long-term mobility tracking." },
];

export default function PatientJourney() {
  return (
    <section className="relative bg-[var(--ice-blue)]/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Patient Journey
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Your Path to Recovery
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-[2px] bg-gradient-to-b from-[var(--lux-blue)] via-[var(--emerald)] to-[var(--gold)] md:left-1/2 md:block" />

          <div className="flex flex-col gap-8">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative flex items-center gap-5 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10 md:flex-row-reverse md:text-right"
                }`}
              >
                <div className="glass-card grid h-14 w-14 shrink-0 place-items-center rounded-full text-[var(--lux-blue)]">
                  <stage.icon size={22} />
                </div>
                <div className="glass-card flex-1 rounded-2xl p-4">
                  <p className="font-display text-lg font-semibold text-[#0b0f1a]">
                    {i + 1}. {stage.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[#0b0f1a]/55">{stage.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
