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
        const force = factor * 12; // Shift up to 12px
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
  const layerStyles = useMemo(() => {
    switch (layer) {
      case 0: // Far
        return {
          sizeClass: "text-[10px] py-1 px-2.5",
          opacity: 0.25,
          blurClass: "backdrop-blur-[2px] blur-[0.5px]",
          zIndex: "z-[2]"
        };
      case 1: // Middle
        return {
          sizeClass: "text-xs py-1.5 px-3.5",
          opacity: 0.48,
          blurClass: "backdrop-blur-md",
          zIndex: "z-[4]"
        };
      case 2: // Front
      default:
        return {
          sizeClass: "text-sm py-2 px-4 font-semibold",
          opacity: 0.72,
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
  const borderGlow = isDragging
    ? "border-[#00698c]/80 shadow-[0_0_20px_rgba(0,105,140,0.5)] bg-[#292823]/35 text-white"
    : isHovered
    ? "border-[#00698c]/50 shadow-[0_0_15px_rgba(0,105,140,0.35)] bg-[#292823]/25 text-white"
    : isProximate
    ? "border-white/20 shadow-[0_0_10px_rgba(0,105,140,0.15)] bg-[#292823]/15 text-[#d7d7d7]/90"
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
                y: [0, device === "mobile" ? -3 : -6, 0],
                rotate: [-0.8, 0.8, -0.8],
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
        whileHover={{ scale: 1.05 }}
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

// 48 Skills arranged by Spatial Clusters
const skillsData = [
  // --- TOP LEFT CLUSTER ---
  { name: "Python", cluster: "top-left", layer: 2, x: 5, y: 13, mobile: true, tablet: true },
  { name: "FastAPI", cluster: "top-left", layer: 1, x: 15, y: 15, mobile: false, tablet: true },
  { name: "Git", cluster: "top-left", layer: 0, x: 9, y: 21, mobile: true, tablet: true },
  { name: "Docker", cluster: "top-left", layer: 1, x: 4, y: 19, mobile: false, tablet: true },
  { name: "Linux", cluster: "top-left", layer: 0, x: 12, y: 11, mobile: false, tablet: true },
  { name: "Embedded Linux", cluster: "top-left", layer: 2, x: 18, y: 17, mobile: true, tablet: true },
  { name: "C++", cluster: "top-left", layer: 1, x: 7, y: 9, mobile: false, tablet: false },
  { name: "GitHub", cluster: "top-left", layer: 0, x: 16, y: 8, mobile: false, tablet: false },

  // --- TOP RIGHT CLUSTER ---
  { name: "Generative AI", cluster: "top-right", layer: 2, x: 80, y: 11, mobile: true, tablet: true },
  { name: "Machine Learning", cluster: "top-right", layer: 1, x: 72, y: 15, mobile: false, tablet: true },
  { name: "Deep Learning", cluster: "top-right", layer: 0, x: 84, y: 17, mobile: true, tablet: true },
  { name: "LLMs", cluster: "top-right", layer: 2, x: 76, y: 19, mobile: true, tablet: true },
  { name: "NLP", cluster: "top-right", layer: 0, x: 70, y: 9, mobile: false, tablet: true },
  { name: "AI Agents", cluster: "top-right", layer: 1, x: 86, y: 13, mobile: false, tablet: true },
  { name: "OpenAI APIs", cluster: "top-right", layer: 2, x: 78, y: 7, mobile: false, tablet: false },
  { name: "Model Evaluation", cluster: "top-right", layer: 0, x: 82, y: 21, mobile: false, tablet: false },

  // --- CENTER CLUSTER ---
  { name: "LangChain", cluster: "center", layer: 2, x: 44, y: 17, mobile: false, tablet: true },
  { name: "LangGraph", cluster: "center", layer: 1, x: 50, y: 23, mobile: false, tablet: true },
  { name: "RAG", cluster: "center", layer: 0, x: 42, y: 27, mobile: true, tablet: true },
  { name: "MCP", cluster: "center", layer: 2, x: 52, y: 15, mobile: false, tablet: true },
  { name: "Prompt Engineering", cluster: "center", layer: 1, x: 45, y: 21, mobile: true, tablet: true },
  { name: "Hugging Face", cluster: "center", layer: 0, x: 49, y: 29, mobile: false, tablet: false },

  // --- BOTTOM LEFT CLUSTER ---
  { name: "Arduino", cluster: "bottom-left", layer: 2, x: 6, y: 80, mobile: true, tablet: true },
  { name: "CAN Bus", cluster: "bottom-left", layer: 1, x: 16, y: 78, mobile: true, tablet: true },
  { name: "SocketCAN", cluster: "bottom-left", layer: 0, x: 10, y: 86, mobile: false, tablet: true },
  { name: "Firmware", cluster: "bottom-left", layer: 2, x: 20, y: 82, mobile: true, tablet: true },
  { name: "IoT", cluster: "bottom-left", layer: 1, x: 4, y: 84, mobile: false, tablet: true },
  { name: "Microcontrollers", cluster: "bottom-left", layer: 0, x: 14, y: 76, mobile: false, tablet: true },
  { name: "C", cluster: "bottom-left", layer: 2, x: 8, y: 90, mobile: false, tablet: false },
  { name: "Embedded C", cluster: "bottom-left", layer: 1, x: 18, y: 88, mobile: false, tablet: false },

  // --- BOTTOM RIGHT CLUSTER ---
  { name: "PostgreSQL", cluster: "bottom-right", layer: 2, x: 82, y: 78, mobile: true, tablet: true },
  { name: "MongoDB", cluster: "bottom-right", layer: 1, x: 74, y: 82, mobile: false, tablet: true },
  { name: "Qdrant", cluster: "bottom-right", layer: 0, x: 86, y: 84, mobile: true, tablet: true },
  { name: "ChromaDB", cluster: "bottom-right", layer: 1, x: 70, y: 86, mobile: false, tablet: true },
  { name: "Automation", cluster: "bottom-right", layer: 0, x: 78, y: 76, mobile: false, tablet: true },
  { name: "System Design", cluster: "bottom-right", layer: 2, x: 84, y: 90, mobile: true, tablet: true },
  { name: "React", cluster: "bottom-right", layer: 1, x: 72, y: 88, mobile: false, tablet: false },
  { name: "Next.js", cluster: "bottom-right", layer: 2, x: 76, y: 80, mobile: false, tablet: false },
  { name: "TypeScript", cluster: "bottom-right", layer: 0, x: 80, y: 86, mobile: false, tablet: false },
  { name: "JavaScript", cluster: "bottom-right", layer: 1, x: 68, y: 78, mobile: false, tablet: false },
  { name: "Django", cluster: "bottom-right", layer: 0, x: 78, y: 92, mobile: false, tablet: false },
  { name: "WebSockets", cluster: "bottom-right", layer: 1, x: 74, y: 74, mobile: false, tablet: false },

  // --- EDGE CLUSTER ---
  { name: "Solidity", cluster: "edge-left", layer: 2, x: 2, y: 43, mobile: true, tablet: true },
  { name: "Foundry", cluster: "edge-left", layer: 1, x: 4, y: 53, mobile: false, tablet: true },
  { name: "Smart Contracts", cluster: "edge-left", layer: 0, x: 1, y: 63, mobile: false, tablet: true },
  { name: "Blockchain", cluster: "edge-right", layer: 2, x: 91, y: 43, mobile: true, tablet: true },
  { name: "Web3", cluster: "edge-right", layer: 1, x: 93, y: 53, mobile: true, tablet: true },
  { name: "Prediction Markets", cluster: "edge-right", layer: 0, x: 90, y: 63, mobile: false, tablet: true },
];

export default function HeroFloatingSkills() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const { scrollY } = useScroll();

  // Parallax multipliers (Far: 0.2, Mid: 0.5, Front: 0.8)
  // Scale down multipliers on tablet/mobile to preserve UI clarity
  const speedFactor = useMemo(() => {
    return device === "mobile" ? 0.2 : device === "tablet" ? 0.5 : 1.0;
  }, [device]);

  const farY = useTransform(scrollY, (v) => -v * 0.2 * speedFactor);
  const midY = useTransform(scrollY, (v) => -v * 0.5 * speedFactor);
  const frontY = useTransform(scrollY, (v) => -v * 0.8 * speedFactor);

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
  // Desktop: 100% (48), Tablet: ~70% (35), Mobile: ~35% (17)
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
