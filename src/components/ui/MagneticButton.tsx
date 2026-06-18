"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/utils/cn";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  download?: boolean | string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  download,
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calibrated spring configuration matching physical weight
  const springConfig = { damping: 15, stiffness: 180, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Capture bounds: pull cursor relative coordinates by a factor of 0.3
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    "relative inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00698c] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    {
      "bg-[#00698c] text-white hover:bg-[#00526e] shadow-[0_4px_18px_-2px_rgba(0,105,140,0.35)]":
        variant === "primary",
      "bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-md":
        variant === "secondary",
      "bg-transparent text-[#d7d7d7] hover:text-white hover:bg-white/5":
        variant === "ghost",
      "opacity-50 cursor-not-allowed pointer-events-none": disabled,
    },
    className
  );

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: xSpring, y: ySpring },
    whileHover: shouldReduceMotion || disabled ? {} : { scale: 1.02 },
    whileTap: shouldReduceMotion || disabled ? {} : { scale: 0.98 },
    className: styles,
  };

  if (href) {
    return (
      <motion.a href={href} download={download} onClick={onClick} {...motionProps}>
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
