"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * Wraps its children with a subtle magnetic-follow effect on hover — the
 * button drifts a few px toward the cursor, then snaps back with a spring.
 */
export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.28);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Comp
        href={href}
        onClick={onClick}
        type={!href ? type : undefined}
        className={cn(
          "relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-shadow",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
