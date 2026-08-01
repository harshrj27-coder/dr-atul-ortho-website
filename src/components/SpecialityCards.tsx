"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bone,
  PersonStanding,
  Zap,
  ScanLine,
  Waves,
  ShieldAlert,
  Baby,
  HeartPulse,
  Cpu,
  Microscope,
  ShieldCheck,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "@/data/services";

const ICONS: Record<Service["icon"], LucideIcon> = {
  knee: Activity,
  hip: Bone,
  shoulder: PersonStanding,
  sports: Zap,
  arthroscopy: ScanLine,
  spine: Waves,
  trauma: ShieldAlert,
  fracture: Bone,
  pediatric: Baby,
  arthritis: HeartPulse,
  robotic: Cpu,
  tumor: Microscope,
  "bone-health": ShieldCheck,
  revision: RefreshCcw,
};

function TiltCard({ service }: { service: Service }) {
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });
  const Icon = ICONS[service.icon];

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rotateX: py * -10, rotateY: px * 10 });
  }

  return (
    <motion.div
      id={service.slug}
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({ rotateX: 0, rotateY: 0 })}
      animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className="glass-card group relative scroll-mt-32 overflow-hidden rounded-2xl p-6"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-[var(--lux-blue)]/20 to-[var(--gold)]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--lux-blue)]/10 to-[var(--emerald)]/10 text-[var(--lux-blue)] transition-transform duration-500 group-hover:scale-110">
        <Icon size={22} />
      </div>
      <h3 className="relative font-display text-lg font-semibold text-[#0b0f1a]">
        {service.name}
      </h3>
      <p className="relative mt-1 text-xs font-medium text-[var(--gold)]">{service.short}</p>

      <motion.p
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: "auto" }}
        viewport={{ once: true }}
        className="relative mt-3 text-sm text-[#0b0f1a]/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
}

export default function SpecialityCards() {
  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Specialities
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Comprehensive Orthopedic Care
          </h2>
          <p className="mt-3 text-[#0b0f1a]/55">
            From joint replacement to trauma care — every treatment backed by
            robotic precision and evidence-based protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
