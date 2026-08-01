"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Phones already have smooth native momentum scrolling. Lenis's
    // continuous requestAnimationFrame loop only adds overhead there and
    // fights the browser's own scroll handling — a common cause of janky
    // "atak-atak" scrolling on mobile. Only run it on devices with a fine
    // pointer (mouse/trackpad), where it improves the wheel-scroll feel.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf_id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf_id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
