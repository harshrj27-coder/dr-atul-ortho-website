"use client";

import { motion } from "framer-motion";
import { Scan, Cpu, Radar, Brain, MonitorSmartphone, Layers, Bone as BoneIcon, Aperture } from "lucide-react";

const technologies = [
  { icon: Scan, name: "MRI Imaging", desc: "High-resolution soft tissue diagnostics." },
  { icon: Aperture, name: "CT Scanning", desc: "Detailed 3D bone structure analysis." },
  { icon: Radar, name: "Navigation Surgery", desc: "Real-time surgical guidance for precision." },
  { icon: Cpu, name: "Robot-Assisted Surgery", desc: "Sub-millimetre implant accuracy." },
  { icon: Brain, name: "AI Diagnosis Support", desc: "Data-driven treatment planning." },
  { icon: MonitorSmartphone, name: "Digital X-Ray", desc: "Instant, low-radiation imaging." },
  { icon: Layers, name: "3D Surgical Planning", desc: "Patient-specific pre-op simulation." },
  { icon: BoneIcon, name: "Arthroscopy Systems", desc: "Minimally invasive keyhole precision." },
];

export default function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-[#05070c] py-28 text-white">
      <div className="aurora-bg opacity-60">
        <div className="aurora-blob left-[10%] top-[10%] h-[380px] w-[380px] bg-[var(--lux-blue)]" />
        <div className="aurora-blob bottom-[5%] right-[10%] h-[380px] w-[380px] bg-[var(--emerald)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--gold)]">
            Technology
          </span>
          <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            Precision Powered by Innovation
          </h2>
          <p className="mt-3 text-white/55">
            The same technology used in the world&apos;s leading orthopedic centres.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-dark group rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-[var(--gold)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <t.icon size={22} />
              </div>
              <h3 className="font-display text-base font-semibold text-white">{t.name}</h3>
              <p className="mt-1 text-xs text-white/45">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
