"use client";

/**
 * 360° Virtual Tour shell. Ships with a drag-to-pan placeholder "room"
 * background (no real panorama photography available yet) and working
 * hotspot navigation between rooms. To go fully 360°, swap the gradient
 * background for a real equirectangular JPG per room and render it with a
 * library like `photo-sphere-viewer` or a Three.js equirect sphere — the
 * hotspot/room-switch state here will keep working unchanged.
 */

import { useRef, useState, type PointerEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Move3d, MapPin } from "lucide-react";

const rooms = [
  { key: "reception", label: "Reception", gradient: "from-[var(--lux-blue)]/25 via-white to-[var(--gold)]/15" },
  { key: "waiting", label: "Waiting Area", gradient: "from-[var(--emerald)]/20 via-white to-[var(--lux-blue)]/10" },
  { key: "consultation", label: "Consultation Room", gradient: "from-[var(--gold)]/20 via-white to-[var(--emerald)]/15" },
  { key: "ot", label: "Operation Theatre", gradient: "from-[#0b0f1a]/15 via-white to-[var(--lux-blue)]/20" },
  { key: "rehab", label: "Rehabilitation Center", gradient: "from-[var(--emerald)]/25 via-white to-[var(--gold)]/10" },
  { key: "icu", label: "ICU", gradient: "from-[var(--lux-blue)]/20 via-white to-[#0b0f1a]/10" },
  { key: "ward", label: "Patient Rooms", gradient: "from-[var(--gold)]/15 via-white to-[var(--emerald)]/20" },
] as const;

export default function VirtualTour() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [pan, setPan] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const room = rooms[roomIndex];

  function onDown(e: PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    lastX.current = e.clientX;
  }
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setPan((p) => Math.min(40, Math.max(-40, p + delta * 0.05)));
  }
  function onUp() {
    dragging.current = false;
  }

  return (
    <section className="relative bg-[var(--ice-blue)]/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[3px] text-[var(--lux-blue)]">
            Virtual Tour
          </span>
          <h2 className="font-display text-4xl font-semibold text-[#0b0f1a] sm:text-5xl">
            Step Inside the Clinic
          </h2>
          <p className="mt-3 text-[#0b0f1a]/55">
            Drag to look around. Placeholder scenes shown — full 360°
            photography can be dropped in later.
          </p>
        </div>

        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="glass-card relative aspect-[16/8] cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={room.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: pan }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.5 }, x: { type: "spring", stiffness: 60, damping: 20 } }}
              className={`absolute inset-[-5%] flex items-center justify-center bg-gradient-to-br ${room.gradient}`}
            >
              <div className="text-center">
                <Move3d className="mx-auto mb-3 text-[#0b0f1a]/25" size={36} />
                <p className="font-display text-2xl text-[#0b0f1a]/50">{room.label}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Hotspots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/70 p-2 backdrop-blur">
            {rooms.map((r, i) => (
              <button
                key={r.key}
                onClick={() => {
                  setRoomIndex(i);
                  setPan(0);
                }}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  i === roomIndex
                    ? "bg-[var(--lux-blue)] text-white"
                    : "text-[#0b0f1a]/60 hover:bg-[#0b0f1a]/5"
                }`}
              >
                <MapPin size={11} /> {r.label}
              </button>
            ))}
          </div>

          <span className="glass absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--lux-blue)]">
            VR-ready shell
          </span>
        </div>
      </div>
    </section>
  );
}
