"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, MessageCircle, MapPin, X, Siren } from "lucide-react";

export default function EmergencyBar() {
  const [open, setOpen] = useState(false);

  function shareLocation() {
    if (!navigator.geolocation) {
      alert("Location sharing isn't supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, "_blank");
      },
      () => alert("Could not get your location. Please allow location access.")
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="glass flex w-60 flex-col gap-2 rounded-2xl p-3 shadow-glass-lg"
          >
            <a
              href="tel:"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0b0f1a] transition hover:bg-white/60"
            >
              <PhoneCall size={16} className="text-[var(--lux-blue)]" /> Call Clinic
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#0b0f1a] transition hover:bg-white/60"
            >
              <MessageCircle size={16} className="text-[var(--emerald)]" /> WhatsApp
            </a>
            <button
              onClick={shareLocation}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#0b0f1a] transition hover:bg-white/60"
            >
              <MapPin size={16} className="text-[var(--gold)]" /> Share My Location
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        aria-label="Emergency options"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white shadow-glow-blue"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-red-500/50" />
        {open ? <X size={22} /> : <Siren size={22} />}
      </motion.button>
    </div>
  );
}
