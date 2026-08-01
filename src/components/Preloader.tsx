"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    let raf: number;
    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    }
    raf = requestAnimationFrame(tick);
    // Safety net: if rAF ever stalls (e.g. backgrounded/embedded preview
    // tabs that throttle animation frames), force completion so the
    // preloader can never get stuck forever.
    const fallback = setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, 3000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-br from-[#05070c] via-[#0b0f1a] to-[#05070c]"
        >
          {/* Rotating "DNA" ring made of glowing dots */}
          <div className="relative h-40 w-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = 50 + 42 * Math.cos(angle);
                const y = 50 + 42 * Math.sin(angle);
                return (
                  <span
                    key={i}
                    className="absolute h-2 w-2 rounded-full"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      background:
                        i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#0057D9" : "#00B894",
                      boxShadow: "0 0 12px currentColor",
                    }}
                  />
                );
              })}
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-xl italic text-white/90 tracking-wide">
                ARS
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[4px] text-white/50">
              Orthopaedics &amp; Joint Replacement
            </span>
            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0057D9] via-[#00B894] to-[#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-display text-2xl text-white tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
