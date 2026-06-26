"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { Cpu, Brain, CurrencyEth } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function BentoPillars() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="expertise" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col mb-16 max-w-[65ch]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Core Disciplines
          </h2>
          <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
            Merging hardware precision with software intelligence and decentralized execution to construct end-to-end autonomous solutions.
          </p>
        </div>

        {/* Bento Grid layout: 2-column base. Row 1 has 1 full-width card. Row 2 has 2 half-width cards. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Cell 1: Embedded Systems (ECE) - Spans 2 Columns (Full Width) */}
          <GlassCard
            className="md:col-span-2 p-8 min-h-[300px] flex flex-col justify-between group cursor-default"
            spotlightColor="rgba(215, 215, 215, 0.04)"
            delay={0}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
              
              {/* Details */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00698c]">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs tracking-wider uppercase text-[#00698c]">
                      01 // PHYSICAL LAYER
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
                    Embedded Systems & Electronics
                  </h3>
                  <p className="text-sm md:text-base text-[#d7d7d7]/80 font-light leading-relaxed mb-6">
                    Built bare-metal firmware using Embedded C, interfaced sensors with Arduino microcontrollers, and worked with Intel 8085/8086 microprocessors. Familiar with register-level programming, GPIO, UART, SPI, I2C, interrupts, timers, and RTOS fundamentals.
                  </p>
                </div>
                
                {/* Hardware Spec Tags */}
                <div className="flex flex-wrap gap-2">
                  {["Embedded C", "Microcontrollers", "Intel 8085 / 8086", "GPIO / UART / SPI / I2C", "RTOS Basics", "Assembly Programming"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] font-mono bg-white/[0.03] text-[#d7d7d7]/70 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual: Schematic wireframe SVG */}
              <div className="lg:col-span-5 h-[200px] lg:h-full flex items-center justify-center relative overflow-hidden bg-white/[0.01] rounded-xl border border-white/5 p-4 select-none">
                <svg className="w-full h-full stroke-white/5 fill-none" viewBox="0 0 200 100">
                  <rect x="75" y="25" width="50" height="50" rx="6" className="stroke-white/10" />
                  <text x="100" y="52" fill="#00698c" className="font-mono text-[8px] text-center" textAnchor="middle">MCU CORE</text>
                  
                  {/* Peripheral lines */}
                  <line x1="75" y1="35" x2="35" y2="35" />
                  <line x1="75" y1="45" x2="35" y2="45" />
                  <line x1="75" y1="55" x2="35" y2="55" />
                  <line x1="75" y1="65" x2="35" y2="65" />
                  
                  <line x1="125" y1="35" x2="165" y2="35" />
                  <line x1="125" y1="45" x2="165" y2="45" />
                  <line x1="125" y1="55" x2="165" y2="55" />
                  <line x1="125" y1="65" x2="165" y2="65" />
                  
                  {/* Status nodes */}
                  <circle cx="35" cy="35" r="2" fill="#d7d7d7" />
                  <circle cx="35" cy="45" r="2" fill="#00698c" />
                  <circle cx="35" cy="55" r="2" fill="#d7d7d7" />
                  <circle cx="35" cy="65" r="2" fill="#00698c" />
                  
                  <circle cx="165" cy="35" r="2" fill="#00698c" />
                  <circle cx="165" cy="45" r="2" fill="#d7d7d7" />
                  <circle cx="165" cy="55" r="2" fill="#00698c" />
                  <circle cx="165" cy="65" r="2" fill="#d7d7d7" />
                </svg>
              </div>
              
            </div>
          </GlassCard>

          {/* Cell 2: AI / ML - Spans 1 Column */}
          <GlassCard
            className="p-8 min-h-[360px] flex flex-col justify-between group cursor-default"
            spotlightColor="rgba(0, 105, 140, 0.15)"
            delay={0.1}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00698c]">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs tracking-wider uppercase text-[#00698c]">
                  02 // SOFTWARE LAYER
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight">
                Software Development & Machine Learning
              </h3>
              <p className="text-xs md:text-sm text-[#d7d7d7]/80 font-light leading-relaxed mb-6">
                Developed predictive machine learning models using XGBoost, LightGBM, and Random Forest for data-driven applications. Experienced with Python, data preprocessing, feature engineering, model evaluation, REST API development, and backend application development using FastAPI.
              </p>
            </div>
            
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {["Python", "XGBoost", "LightGBM", "Random Forest", "FastAPI", "Pandas", "NumPy"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-white/[0.03] text-[#d7d7d7]/60 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Cell 3: Web3 & Blockchain - Spans 1 Column */}
          <GlassCard
            className="p-8 min-h-[360px] flex flex-col justify-between group cursor-default"
            spotlightColor="rgba(0, 105, 140, 0.15)"
            delay={0.2}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#00698c]">
                  <CurrencyEth className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs tracking-wider uppercase text-[#00698c]">
                  03 // CONSTRUCT LAYER
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight">
                Web3 & Blockchain
              </h3>
              <p className="text-xs md:text-sm text-[#d7d7d7]/80 font-light leading-relaxed mb-6">
                Built decentralized applications using Solidity and Foundry, with experience in smart contract development and Web3 integrations using Wagmi and Viem. Familiar with blockchain development workflows, wallet connectivity, and on-chain application architecture.
              </p>
            </div>
            
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {["Solidity", "Foundry", "Wagmi", "Viem", "Smart Contracts", "Web3"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-white/[0.03] text-[#d7d7d7]/60 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>

        </div>
      </motion.div>
    </section>
  );
}
