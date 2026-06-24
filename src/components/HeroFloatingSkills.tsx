"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, useReducedMotion, MotionValue } from "motion/react";
import { cn } from "@/utils/cn";

// Helper to generate deterministic pseudo-random values based on skill name
function getDeterministicFloat(name: string, salt: number, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const scale = Math.abs(Math.sin(hash + salt));
  return min + scale * (max - min);
}

interface SkillBubbleProps {
  name: string;
  layer: number;
  initialX: number;
  initialY: number;
  device: "mobile" | "tablet" | "desktop";
  smoothFarY: MotionValue<number>;
  smoothMidY: MotionValue<number>;
  smoothFrontY: MotionValue<number>;
}

function SkillBubble({
  name,
  layer,
  initialX,
  initialY,
  device,
  smoothFarY,
  smoothMidY,
  smoothFrontY,
}: SkillBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion Values for Dragging
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Motion Values for Cursor Proximity
  const proximityX = useMotionValue(0);
  const proximityY = useMotionValue(0);
  const proximityScale = useMotionValue(1.0);
  
  const [isProximate, setIsProximate] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Drag Release Physics (stiffness: 120, damping: 15, mass: 0.8)
  const handleDragEnd = () => {
    setIsDragging(false);
    animate(dragX, 0, { type: "spring", stiffness: 120, damping: 15, mass: 0.8 });
    animate(dragY, 0, { type: "spring", stiffness: 120, damping: 15, mass: 0.8 });
  };

  // Cursor reaction physics (Shift away when cursor approaches)
  useEffect(() => {
    if (device === "mobile" || shouldReduceMotion) {
      proximityX.set(0);
      proximityY.set(0);
      proximityScale.set(1.0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || isDragging) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const threshold = 150; // Cursor approach range (150px)
      if (dist < threshold) {
        const factor = 1 - dist / threshold;
        const force = factor * 8; // Shift up to 8px for subtle elegance
        const targetX = -(dx / (dist || 1)) * force;
        const targetY = -(dy / (dist || 1)) * force;

        animate(proximityX, targetX, { type: "spring", stiffness: 90, damping: 18 });
        animate(proximityY, targetY, { type: "spring", stiffness: 90, damping: 18 });
        animate(proximityScale, 1.03, { type: "spring", stiffness: 90, damping: 18 });
        setIsProximate(true);
      } else {
        animate(proximityX, 0, { type: "spring", stiffness: 60, damping: 15 });
        animate(proximityY, 0, { type: "spring", stiffness: 60, damping: 15 });
        animate(proximityScale, 1.0, { type: "spring", stiffness: 60, damping: 15 });
        setIsProximate(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      setIsProximate(false);
    };
  }, [device, shouldReduceMotion, isDragging, proximityX, proximityY, proximityScale]);

  // Idle floating animation settings (deterministic to satisfy React purity rules)
  const idleDuration = getDeterministicFloat(name, 1, 4, 8); // 4s to 8s
  const idleDelay = getDeterministicFloat(name, 2, -8, 0); // Negative offset so they loop asynchronously

  // Determine sizes and styling tags by Depth layer
  // Far Layer (0), Middle Layer (1), Front Layer (2)
  // Adjusted opacity down by 20% per user instructions
  const layerStyles = useMemo(() => {
    switch (layer) {
      case 0: // Far (Small Bubble)
        return {
          sizeClass: "text-[10px] py-1 px-2.5",
          opacity: 0.20, // 0.25 * 0.8
          blurClass: "backdrop-blur-[1px] blur-[0.3px]",
          zIndex: "z-[2]"
        };
      case 1: // Middle (Medium Bubble)
        return {
          sizeClass: "text-xs py-1.5 px-3.5",
          opacity: 0.36, // 0.45 * 0.8
          blurClass: "backdrop-blur-md",
          zIndex: "z-[4]"
        };
      case 2: // Front (Large Bubble)
      default:
        return {
          sizeClass: "text-sm py-2 px-4 font-semibold",
          opacity: 0.56, // 0.70 * 0.8
          blurClass: "backdrop-blur-xl",
          zIndex: "z-[6]"
        };
    }
  }, [layer]);

  // Select the correct Parallax transform based on Depth layer
  const parallaxY = useMemo(() => {
    switch (layer) {
      case 0:
        return smoothFarY;
      case 1:
        return smoothMidY;
      case 2:
      default:
        return smoothFrontY;
    }
  }, [layer, smoothFarY, smoothMidY, smoothFrontY]);

  // Dynamic animations matching drag, hover and hover-glow states
  // Reduced shadow glow values by 40% per user instructions
  const borderGlow = isDragging
    ? "border-[#00698c]/80 shadow-[0_0_12px_rgba(0,105,140,0.3)] bg-[#292823]/35 text-white"
    : isHovered
    ? "border-[#00698c]/50 shadow-[0_0_9px_rgba(0,105,140,0.21)] bg-[#292823]/25 text-white"
    : isProximate
    ? "border-white/20 shadow-[0_0_6px_rgba(0,105,140,0.09)] bg-[#292823]/15 text-[#d7d7d7]/90"
    : "border-white/10 shadow-none bg-[#292823]/10 text-[#d7d7d7]/80";

  return (
    <motion.div
      ref={ref}
      drag={device !== "mobile"}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.4}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        x: dragX,
        y: dragY,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      className={cn(
        "absolute select-none pointer-events-auto",
        layerStyles.zIndex
      )}
    >
      <motion.div
        style={{
          y: parallaxY,
          x: proximityX,
          translateY: proximityY,
          scale: proximityScale,
        }}
        animate={
          shouldReduceMotion || isDragging
            ? {}
            : {
                y: [0, device === "mobile" ? -1.5 : -4, 0], // Reduced floating amplitude to 4px
                rotate: [-0.5, 0.5, -0.5], // Subtle rotation
              }
        }
        transition={{
          y: { duration: idleDuration, delay: idleDelay, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: idleDuration * 1.2, delay: idleDelay, repeat: Infinity, ease: "easeInOut" },
        }}
        className={cn(
          "rounded-full border backdrop-blur-md cursor-grab active:cursor-grabbing font-mono transition-colors duration-300 relative",
          layerStyles.sizeClass,
          layerStyles.blurClass,
          borderGlow
        )}
        whileDrag={{ scale: 1.08 }}
        whileHover={{ scale: 1.03 }} // Hover scale reduced to 1.03
      >
        {/* Inner glass highlights */}
        <div className="absolute inset-px bg-gradient-to-tr from-white/[0.01] via-white/[0.04] to-transparent rounded-full pointer-events-none" />
        <span style={{ opacity: isDragging ? 1.0 : isHovered ? 1.0 : layerStyles.opacity }}>
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// 18 Core Identity Skills structured by Spatial Clusters and safe-zones
// Layers represent: 0 = Far/Small, 1 = Middle/Medium, 2 = Front/Large
const skillsData = [
  // --- TOP LEFT CLUSTER --- (Whitespace above left column text, X: 4-18%, Y: 8-16%)
  { name: "Python", cluster: "top-left", layer: 1, x: 4, y: 13, mobile: true, tablet: true },
  { name: "FastAPI", cluster: "top-left", layer: 1, x: 14, y: 16, mobile: false, tablet: true },
  { name: "C++", cluster: "top-left", layer: 0, x: 8, y: 8, mobile: false, tablet: false },
  { name: "Embedded Linux", cluster: "top-left", layer: 2, x: 18, y: 10, mobile: true, tablet: true },

  // --- TOP RIGHT CLUSTER --- (Whitespace above right column photo, X: 72-87%, Y: 7-20%)
  { name: "Generative AI", cluster: "top-right", layer: 2, x: 80, y: 11, mobile: true, tablet: true },
  { name: "Machine Learning", cluster: "top-right", layer: 2, x: 72, y: 15, mobile: false, tablet: true },
  { name: "Deep Learning", cluster: "top-right", layer: 1, x: 87, y: 16, mobile: true, tablet: true },
  { name: "LLMs", cluster: "top-right", layer: 1, x: 76, y: 7, mobile: true, tablet: true },
  { name: "NLP", cluster: "top-right", layer: 0, x: 82, y: 20, mobile: false, tablet: false },

  // --- CENTER RIGHT CLUSTER --- (Whitespace on far right margin beside photo, X: 91-93%, Y: 42-52%)
  { name: "AI Agents", cluster: "center-right", layer: 2, x: 91, y: 42, mobile: true, tablet: true },
  { name: "Next.js", cluster: "center-right", layer: 0, x: 93, y: 52, mobile: false, tablet: false },

  // --- BOTTOM LEFT CLUSTER --- (Whitespace below left column CTAs, X: 4-12%, Y: 84-92%)
  { name: "C", cluster: "bottom-left", layer: 0, x: 4, y: 88, mobile: false, tablet: false },
  { name: "Embedded C", cluster: "bottom-left", layer: 0, x: 12, y: 92, mobile: false, tablet: true },
  { name: "Firmware", cluster: "bottom-left", layer: 1, x: 8, y: 84, mobile: false, tablet: true },

  // --- BOTTOM RIGHT CLUSTER --- (Whitespace below right column photo, X: 70-86%, Y: 85-94%)
  { name: "IoT", cluster: "bottom-right", layer: 0, x: 70, y: 86, mobile: false, tablet: false },
  { name: "Arduino", cluster: "bottom-right", layer: 0, x: 78, y: 90, mobile: false, tablet: true },
  { name: "CAN Bus", cluster: "bottom-right", layer: 1, x: 86, y: 85, mobile: false, tablet: true },
  { name: "Microcontrollers", cluster: "bottom-right", layer: 0, x: 82, y: 94, mobile: false, tablet: false },
];

export default function HeroFloatingSkills() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const { scrollY } = useScroll();

  // Parallax multipliers reduced by 25% (Far: 0.15, Mid: 0.375, Front: 0.6)
  const speedFactor = useMemo(() => {
    return device === "mobile" ? 0.2 : device === "tablet" ? 0.5 : 1.0;
  }, [device]);

  const farY = useTransform(scrollY, (v) => -v * 0.15 * speedFactor);
  const midY = useTransform(scrollY, (v) => -v * 0.375 * speedFactor);
  const frontY = useTransform(scrollY, (v) => -v * 0.6 * speedFactor);

  const smoothFarY = useSpring(farY, { stiffness: 80, damping: 25 });
  const smoothMidY = useSpring(midY, { stiffness: 80, damping: 25 });
  const smoothFrontY = useSpring(frontY, { stiffness: 80, damping: 25 });

  // Responsive device checks
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDevice("mobile");
      } else if (window.innerWidth < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter skills proportionally:
  // Desktop: 18 bubbles, Tablet: 12 bubbles (~66%), Mobile: 6 bubbles (~33%)
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      if (device === "mobile") return skill.mobile;
      if (device === "tablet") return skill.tablet;
      return true;
    });
  }, [device]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden max-w-[1400px] mx-auto w-full">
      {filteredSkills.map((skill) => (
        <SkillBubble
          key={skill.name}
          name={skill.name}
          layer={skill.layer}
          initialX={skill.x}
          initialY={skill.y}
          device={device}
          smoothFarY={smoothFarY}
          smoothMidY={smoothMidY}
          smoothFrontY={smoothFrontY}
        />
      ))}
    </div>
  );
}
