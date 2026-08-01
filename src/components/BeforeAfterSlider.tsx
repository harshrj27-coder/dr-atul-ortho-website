"use client";

/**
 * Interactive drag comparison slider. Ships with styled gradient
 * placeholders (clearly labeled) instead of real patient photos — swap the
 * two panel backgrounds for real, consented before/after images when
 * available.
 */

import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    updateFromClientX(e.clientX);
  }
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragging.current) updateFromClientX(e.clientX);
  }
  function stopDrag() {
    dragging.current = false;
  }

  return (
    <section className="relative bg-white py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Recovery Showcase
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Before &amp; After Mobility
          </h2>
          <p className="mt-3 text-[#0b0f1a]/55">
            Drag the slider to compare. (Placeholder imagery — real,
            consented patient comparisons will be added here.)
          </p>
        </div>

        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrag}
          onPointerLeave={stopDrag}
          className="glass-card relative aspect-[16/9] cursor-ew-resize select-none overflow-hidden rounded-3xl"
        >
          {/* "After" layer (full width, base) */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--emerald)]/20 via-white to-[var(--lux-blue)]/10">
            <span className="rounded-full bg-[var(--emerald)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--emerald)]">
              After — Improved Mobility
            </span>
          </div>

          {/* "Before" layer (clipped by pos) */}
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b0f1a]/10 via-white to-[#0b0f1a]/5"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <span className="rounded-full bg-[#0b0f1a]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0b0f1a]/60">
              Before — Limited Mobility
            </span>
          </div>

          {/* Handle */}
          <motion.div
            className="absolute top-0 h-full w-[3px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#0b0f1a] shadow-glass-lg">
              <MoveHorizontal size={18} />
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Pain Score", from: "8/10", to: "1/10" },
            { label: "Walking Distance", from: "50m", to: "5km+" },
            { label: "Recovery Time", from: "—", to: "6 weeks" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-wide text-[#0b0f1a]/45">{s.label}</p>
              <p className="mt-1 font-display text-lg text-[#0b0f1a]">
                <span className="text-[#0b0f1a]/40 line-through">{s.from}</span>{" "}
                → <span className="text-[var(--emerald)]">{s.to}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
