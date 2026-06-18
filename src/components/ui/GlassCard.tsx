"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "motion/react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  spotlightColor?: string;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function GlassCard({
  children,
  className,
  enableSpotlight = true,
  spotlightColor = "rgba(0, 105, 140, 0.15)",
  delay = 0,
  id,
  style,
  onClick,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!enableSpotlight || shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom Apple cubic-bezier curve
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      id={id}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass-panel transition-all duration-300",
        className
      )}
    >
      {/* Specular spotlight overlay tracking coordinates */}
      {enableSpotlight && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 z-0"
          style={{
            background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      
      {/* Inner specular highlight line */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-2xl z-0" />
      
      {/* Inner glow shadow wrapper */}
      <div className="absolute inset-px bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[15px] z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
