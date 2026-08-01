"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Stethoscope, BookOpen } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 11, suffix: "+", label: "Years Experience" },
  { value: 20000, suffix: "+", label: "Patients Treated" },
  { value: 12000, suffix: "+", label: "Surgeries" },
  { value: 98, suffix: "%", label: "Success Rate" },
];

const credentials = [
  { icon: GraduationCap, label: "MBBS", place: "Dr. BR Ambedkar University, Agra" },
  { icon: GraduationCap, label: "MS Orthopedics", place: "MMIMSR, Ambala" },
  { icon: Award, label: "AO Trauma Fellowship", place: "Harvard MGH, Boston" },
  { icon: Stethoscope, label: "FRAJA · FHKSAA", place: "Vienna, Austria" },
];

export default function DoctorProfile() {
  return (
    <section id="doctor-profile" className="relative overflow-hidden bg-white py-28">
      <span className="section-num-bg pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none text-[140px] leading-none">
        01
      </span>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="gradient-border glass-card relative aspect-[4/5] overflow-hidden rounded-3xl p-2">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-[var(--ice-blue)] to-white">
              {/* Portrait placeholder — swap the background image below for
                 a real photo of Dr. Sharma once available. */}
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <span className="font-display text-6xl italic text-[var(--lux-blue)]/30">
                    ARS
                  </span>
                  <p className="mt-3 text-xs uppercase tracking-[3px] text-[#0b0f1a]/30">
                    Portrait placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-6 -top-6 rounded-2xl px-5 py-4 text-center shadow-glass-lg"
          >
            <p className="font-display text-2xl font-semibold text-[var(--lux-blue)]">A+</p>
            <p className="text-[10px] uppercase tracking-wide text-[#0b0f1a]/50">Patient Rating</p>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Meet Your Surgeon
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Dr. Atul Rai Sharma
          </h2>
          <p className="mt-2 text-sm font-medium text-[var(--gold)]">
            Consultant Orthopaedics &amp; Joint Replacement Surgeon
          </p>
          <p className="mt-5 text-[#0b0f1a]/60">
            A highly skilled Orthopedic and Joint Replacement Surgeon with over 11
            years of clinical experience, specialising in robotic knee, hip and
            shoulder replacement, arthroscopy, sports injury management and
            complex trauma care — helping thousands of patients regain mobility
            and improve their quality of life.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {credentials.map((c) => (
              <div key={c.label} className="glass-card flex items-start gap-3 rounded-2xl p-4">
                <c.icon size={18} className="mt-0.5 shrink-0 text-[var(--lux-blue)]" />
                <div>
                  <p className="text-sm font-semibold text-[#0b0f1a]">{c.label}</p>
                  <p className="text-xs text-[#0b0f1a]/50">{c.place}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#0b0f1a]/10 pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-2xl font-semibold text-[#0b0f1a]"
                />
                <p className="mt-1 text-[10px] uppercase tracking-wide text-[#0b0f1a]/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-[#0b0f1a]/50">
            <BookOpen size={16} className="text-[var(--emerald)]" />
            Author of multiple national &amp; international orthopedic research publications
          </div>
        </div>
      </div>
    </section>
  );
}
