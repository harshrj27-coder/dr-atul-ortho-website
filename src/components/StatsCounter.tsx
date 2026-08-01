"use client";

import AnimatedCounter from "./AnimatedCounter";

const stats = [
  { value: 11, suffix: "+", label: "Years of Excellence" },
  { value: 20000, suffix: "+", label: "Patients Treated" },
  { value: 12000, suffix: "+", label: "Surgeries Performed" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 24, prefix: "", suffix: "×7", label: "Emergency Care" },
  { value: 95, suffix: "%", label: "Patient Satisfaction" },
];

export default function StatsCounter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--lux-blue)] via-[#0043ad] to-[#05070c] py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="aurora-blob left-[5%] top-[10%] h-[360px] w-[360px] bg-[var(--gold)]" />
        <div className="aurora-blob bottom-[-10%] right-[5%] h-[360px] w-[360px] bg-[var(--emerald)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 text-center sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label}>
            <AnimatedCounter
              value={s.value}
              suffix={s.suffix}
              prefix={s.prefix}
              className="font-display text-3xl font-semibold text-white sm:text-4xl"
            />
            <p className="mt-2 text-[11px] uppercase tracking-wide text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
