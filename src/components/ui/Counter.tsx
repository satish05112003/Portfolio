"use client";

import React, { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate, useInView, motion } from "motion/react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // easeOutQuart
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
