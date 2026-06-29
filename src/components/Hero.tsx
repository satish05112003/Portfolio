"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, SealCheck } from "@phosphor-icons/react";
import HeroFloatingSkills from "./HeroFloatingSkills";

// Professional photo location
const PROFILE_PHOTO_PATH = "/199961.png";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Smooth scroll transformations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothGlowOpacity = useSpring(glowOpacity, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothPhotoY = useSpring(photoY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Mouse move handler for interactive VisionOS-style radial glow
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (shouldReduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Fallback info mappings removed in favor of background floating skills ecosystem

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="group/hero relative min-h-[100dvh] w-full flex items-center justify-center pt-24 pb-10 overflow-hidden px-6 md:px-12 lg:px-16 xl:px-20 max-w-[1400px] mx-auto cursor-default"
    >
      
      {/* 1. Animated Mesh Gradient & Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Cerulean Light Source */}
        <motion.div
          style={{ opacity: smoothGlowOpacity }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 0.85, 0.6],
                  x: [0, 40, 0],
                  y: [0, -30, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#00698c]/35 filter blur-[100px]"
        />
        {/* Graphite Light Source */}
        <motion.div
          style={{ opacity: smoothGlowOpacity }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.25, 1],
                  opacity: [0.45, 0.7, 0.45],
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#292823]/45 filter blur-[120px]"
        />
        <HeroFloatingSkills />
      </div>

      {/* 2. Mouse-Reactive Radial lighting mask */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 z-10"
          style={{
            background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0, 105, 140, 0.3), transparent 80%)`,
          }}
        />
      )}

      {/* Hero Layout Content Grid: 55% Text / 45% Image on Desktop */}
      <motion.div
        style={{ scale: smoothScale, opacity: smoothOpacity }}
        className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center w-full z-20"
      >
        
        {/* RIGHT SIDE: Large Profile Photo (Photo centered on top on Mobile, right side on Desktop) */}
        <motion.div
          style={{ y: smoothPhotoY }}
          className="col-span-1 flex justify-center lg:justify-end order-1 lg:order-2 w-full"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >

            {/* Double-layered Glassmorphic Card Frame */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [0, -12, 0],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] lg:w-[430px] lg:h-[430px] xl:w-[480px] xl:h-[480px] rounded-[36px] p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] flex items-center justify-center group overflow-hidden select-none hover:border-[#00698c]/40 transition-all duration-500"
            >
              {/* Inner glass highlight lines */}
              <div className="absolute inset-px bg-gradient-to-tr from-white/[0.03] via-[#00698c]/5 to-transparent rounded-[32px] pointer-events-none z-20" />
              
              {/* VisionOS Specular Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out pointer-events-none z-25" />
              
              {/* Photo Box */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden border border-white/5 bg-[#080807] z-10 shadow-inner">
                <Image
                  src={PROFILE_PHOTO_PATH}
                  alt="Nagalla Satish"
                  fill
                  priority
                  sizes="(max-w-768px) 288px, (max-w-1024px) 380px, (max-w-1280px) 430px, 480px"
                  className="object-cover object-center contrast-[1.05] grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[700ms] ease-in-out"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* LEFT SIDE: Editorial Details (Photo Top / Text Bottom on Mobile, left side on Desktop) */}
        <motion.div
          style={{ y: smoothTextY }}
          className="col-span-1 flex flex-col items-start text-left select-none order-2 lg:order-1 lg:pr-8 w-full"
        >
          
          {/* Status Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00698c]/15 border border-[#00698c]/25 mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00698c] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#d7d7d7] uppercase font-semibold">
              Available for Opportunities
            </span>
          </div>

          {/* H1 Name centerpiece */}
          <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-bold tracking-tighter leading-[0.85] text-white flex flex-col font-sans select-none mb-4">
            <span className="text-[#d7d7d7] overflow-hidden flex flex-wrap gap-x-[1px]">
              {"NAGALLA".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={shouldReduceMotion ? { y: 0, opacity: 1, filter: "none" } : { y: "60%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="text-white overflow-hidden flex flex-wrap gap-x-[1px]">
              {"SATISH".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={shouldReduceMotion ? { y: 0, opacity: 1, filter: "none" } : { y: "60%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Reclaimed role pills space */}

          {/* Concise intro copy */}
          <p className="text-sm md:text-base text-[#d7d7d7]/85 font-light leading-relaxed mb-4 max-w-[55ch]">
            Building intelligent systems across AI, Embedded Computing, Full Stack Development, and Web3 technologies.
          </p>

          {/* Education telemetry highlight */}
          <div className="flex flex-col gap-1 border-t border-white/5 pt-4 mb-5 w-full max-w-[340px]">
            <span className="font-sans font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
              <SealCheck className="w-4 h-4 text-[#00698c]" />
              NIT Agartala
            </span>
            <span className="font-mono text-[10px] text-[#d7d7d7]/60 tracking-wider">
              Electronics & Communication Engineering
            </span>
          </div>

          {/* Dynamic CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <MagneticButton href="#projects" variant="primary">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="/NAGALLA_SATISH.pdf" download="NAGALLA_SATISH.pdf" variant="secondary">
              Download Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="secondary"
              className="border-transparent bg-transparent hover:bg-white/[0.02] text-[#d7d7d7]"
            >
              Contact Me
            </MagneticButton>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
}
