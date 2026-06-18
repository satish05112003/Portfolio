"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function RadialCursor() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const shouldReduceMotion = useReducedMotion();

  // Fine-tuned spring dynamics for fluid, responsive follow physics
  const springConfig = { damping: 30, stiffness: 180, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset position by half the diameter (150px) to keep center aligned to cursor
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none md:block hidden">
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full filter blur-[80px] bg-[#00698c]/15 pointer-events-none mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </div>
  );
}
