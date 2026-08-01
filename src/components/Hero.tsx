"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";
import AnimatedCounter from "./AnimatedCounter";

// Three.js/R3F must be client-only — SSR has no WebGL context.
const SkeletonScene = dynamic(() => import("./SkeletonScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-[var(--lux-blue)]/30 border-t-[var(--lux-blue)]" />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-mesh-light pt-28">
      {/* Animated aurora mesh background — stand-in for cinematic video */}
      <div className="aurora-bg">
        <div className="aurora-blob left-[-10%] top-[10%] h-[480px] w-[480px] animate-aurora-move bg-[var(--lux-blue)]" />
        <div
          className="aurora-blob right-[-5%] top-[-10%] h-[420px] w-[420px] animate-aurora-move bg-[var(--emerald)]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="aurora-blob bottom-[-10%] left-[30%] h-[420px] w-[420px] animate-aurora-move bg-[var(--gold)]"
          style={{ animationDelay: "-12s" }}
        />
        {/* Floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 animate-float rounded-full bg-[var(--lux-blue)]/40"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[var(--lux-blue)]"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-[var(--emerald)]" />
            Consultant Orthopaedics &amp; Joint Replacement Surgeon
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-5xl font-semibold leading-[1.08] text-[#0b0f1a] sm:text-6xl lg:text-[64px]"
          >
            Transforming Every{" "}
            <span className="text-gradient italic">Step</span> of Your Life
            with Advanced Orthopedic Excellence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg text-[#0b0f1a]/60"
          >
            Robotic knee, hip &amp; shoulder replacement, arthroscopy and
            complex trauma care — delivered with precision technology and a
            deeply personal approach, in Jalandhar.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/appointment"
              className="bg-gradient-to-r from-[var(--lux-blue)] to-[var(--emerald)] text-white shadow-glow-blue hover:brightness-110"
            >
              Book Appointment
            </MagneticButton>
            <MagneticButton
              href="#doctor-profile"
              className="glass text-[#0b0f1a]"
            >
              <PlayCircle size={18} /> Watch Introduction
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-[#0b0f1a]/10 pt-8"
          >
            {[
              { value: 11, suffix: "+", label: "Years Experience" },
              { value: 12000, suffix: "+", label: "Surgeries" },
              { value: 98, suffix: "%", label: "Success Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-3xl font-semibold text-[#0b0f1a]"
                />
                <p className="mt-1 text-xs uppercase tracking-wide text-[#0b0f1a]/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: interactive 3D skeleton */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] sm:h-[520px] lg:h-[620px]"
        >
          <div className="glass absolute inset-0 rounded-[32px]" />
          <div className="relative h-full w-full p-2">
            <SkeletonScene />
          </div>
          <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--lux-blue)]">
            Interactive · Hover a joint
          </span>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#0b0f1a]/40"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
