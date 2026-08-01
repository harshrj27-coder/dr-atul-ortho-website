"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/timeline";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const lineScale = useTransform(scrollXProgress, [0, 1], [0.05, 1]);

  return (
    <section className="relative bg-[var(--ice-blue)]/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Career Journey
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            An Interactive Timeline of Excellence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#0b0f1a]/55">
            Scroll horizontally to explore the milestones behind 11+ years of
            orthopedic expertise.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[42px] h-[2px] bg-[#0b0f1a]/10">
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full origin-left bg-gradient-to-r from-[var(--lux-blue)] via-[var(--emerald)] to-[var(--gold)]"
            />
          </div>

          <div
            ref={containerRef}
            className="scrollbar-none flex gap-6 overflow-x-auto pb-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ scrollSnapAlign: "start" }}
                className="glass-card w-72 shrink-0 rounded-2xl p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--lux-blue)] to-[var(--emerald)] text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">
                    {item.year}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#0b0f1a]">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-[var(--lux-blue)]">{item.place}</p>
                <p className="mt-3 text-sm text-[#0b0f1a]/55">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
