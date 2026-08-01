"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  Globe,
  PhoneCall,
} from "lucide-react";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/symptom-checker", label: "AI Symptom Checker" },
  { href: "/blog", label: "Health Library" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "glass flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500",
            scrolled ? "shadow-glass-lg" : "shadow-glass"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-xs font-display italic text-[var(--lux-blue)]">
              ARS
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-semibold text-[#0b0f1a]">
                Dr. Atul Rai Sharma
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-[var(--lux-blue)]">
                Orthopaedics &amp; Joint Replacement
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="group flex items-center gap-1 text-sm font-medium text-[#0b0f1a]/80 hover:text-[var(--lux-blue)]">
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--lux-blue)] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="glass absolute left-1/2 top-full mt-3 grid w-[520px] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl p-3 shadow-glass-lg"
                      >
                        {services.slice(0, 8).map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services#${s.slug}`}
                            className="rounded-xl px-3 py-2 text-sm text-[#0b0f1a]/80 transition hover:bg-white/60 hover:text-[var(--lux-blue)]"
                          >
                            {s.name}
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          className="col-span-2 mt-1 rounded-xl px-3 py-2 text-center text-sm font-semibold text-gold hover:bg-white/60"
                        >
                          View all services →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-medium text-[#0b0f1a]/80 hover:text-[var(--lux-blue)]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--lux-blue)] transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#0b0f1a]/70 transition hover:bg-white/50 md:flex"
            >
              <Search size={16} />
            </button>
            <button
              aria-label="Toggle language"
              onClick={() => setLang((l) => (l === "EN" ? "HI" : "EN"))}
              className="hidden h-9 items-center gap-1 rounded-full px-2 text-xs font-semibold text-[#0b0f1a]/70 transition hover:bg-white/50 md:flex"
            >
              <Globe size={14} /> {lang}
            </button>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
              className="hidden h-9 w-9 items-center justify-center rounded-full text-[#0b0f1a]/70 transition hover:bg-white/50 md:flex"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="tel:"
              className="hidden h-9 items-center gap-1.5 rounded-full bg-[#0b0f1a]/5 px-3 text-xs font-semibold text-[#0b0f1a]/80 transition hover:bg-[#0b0f1a]/10 lg:flex"
            >
              <PhoneCall size={14} /> Emergency
            </a>
            <Link
              href="/appointment"
              className="hidden items-center rounded-full bg-gradient-to-r from-[var(--lux-blue)] to-[var(--lux-blue-2,#3B82F6)] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-glow-blue transition hover:brightness-110 sm:inline-flex"
            >
              Book Appointment
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#0b0f1a] lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass mt-2 overflow-hidden rounded-2xl p-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[#0b0f1a]/80 hover:bg-white/50"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/appointment"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-full bg-[var(--lux-blue)] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
