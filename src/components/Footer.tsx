"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // mock mode — ignore network errors, still confirm to the user
    }
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden bg-[#05070c] pt-20 text-white/70">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="aurora-blob left-[-10%] top-[-20%] h-[420px] w-[420px] bg-[var(--lux-blue)]" />
        <div className="aurora-blob bottom-[-20%] right-[-10%] h-[420px] w-[420px] bg-[var(--gold)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="glass-dark mb-16 flex flex-col items-center justify-between gap-6 rounded-3xl p-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="font-display text-2xl text-white">Stay ahead of joint health</h3>
            <p className="mt-1 text-sm text-white/60">
              Monthly tips on recovery, mobility and bone health — no spam.
            </p>
          </div>
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.p
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-[var(--emerald)]"
              >
                Thank you — you&apos;re subscribed.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                className="flex w-full max-w-sm gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--lux-blue)]"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--emerald)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-10 pb-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-xl text-white">Dr. Atul Rai Sharma</span>
            <p className="mt-3 text-sm text-white/50">
              Consultant Orthopaedics &amp; Joint Replacement Surgeon, Jalandhar, Punjab.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-[var(--lux-blue)] hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Departments</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/services#knee-replacement" className="hover:text-white">Knee Replacement</Link></li>
              <li><Link href="/services#hip-replacement" className="hover:text-white">Hip Replacement</Link></li>
              <li><Link href="/services#arthroscopy" className="hover:text-white">Arthroscopy</Link></li>
              <li><Link href="/services#trauma-care" className="hover:text-white">Trauma Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/about" className="hover:text-white">About the Doctor</Link></li>
              <li><Link href="/symptom-checker" className="hover:text-white">AI Symptom Checker</Link></li>
              <li><Link href="/blog" className="hover:text-white">Health Library</Link></li>
              <li><Link href="/appointment" className="hover:text-white">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Emergency</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Phone &amp; email: to be added</li>
              <li>Jalandhar, Punjab, India</li>
              <li className="text-[var(--gold)]">24×7 emergency line coming soon</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row">
          <span>© {new Date().getFullYear()} Dr. Atul Rai Sharma. All rights reserved.</span>
          <span>Ultra-premium orthopaedic practice experience.</span>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[var(--lux-blue)] to-[var(--emerald)] text-white shadow-glow-blue"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
