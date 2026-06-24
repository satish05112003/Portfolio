"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { Cpu, Brain, Lock, Code } from "@phosphor-icons/react";
import Counter from "./ui/Counter";
import { motion, useReducedMotion } from "motion/react";

export default function TechSpecs() {
  const shouldReduceMotion = useReducedMotion();

  const specCategories = [
    {
      id: "01",
      title: "Embedded Systems",
      skills: [
        "Embedded C",
        "Arduino",
        "GPIO / UART",
        "SPI / I2C",
        "Intel 8085/8086 Assembly",
        "Device Drivers",
        "Microcontrollers",
        "IoT Systems",
        "Real-Time Systems",
        "Embedded Firmware"
      ]
    },
    {
      id: "02",
      title: "AI & Machine Learning",
      skills: [
        "Machine Learning",
        "PyTorch Core",
        "Scikit-Learn",
        "XGBoost",
        "LightGBM",
        "NumPy",
        "Pandas",
        "Model Evaluation",
        "Hugging Face",
        "OpenAI APIs"
      ]
    },
    {
      id: "03",
      title: "Generative AI & Agent Systems",
      skills: [
        "AI Engineering",
        "Generative AI",
        "LLM Integration",
        "RAG Systems",
        "Agentic AI",
        "Multi-Agent Systems",
        "LangChain",
        "LangGraph",
        "Vector Databases",
        "Prompt Engineering"
      ]
    },
    {
      id: "04",
      title: "Web3 & Smart Contracts",
      skills: [
        "Solidity",
        "Smart Contracts",
        "Foundry",
        "Blockchain Development",
        "Testnet Development",
        "Base/Pharos Networks",
        "Web3 Libraries",
        "EVM Reputation",
        "Wagmi Hooks",
        "Viem Clients",
        "Prediction Markets"
      ]
    },
    {
      id: "05",
      title: "Backend & APIs",
      skills: [
        "Python",
        "C",
        "C++",
        "FastAPI",
        "Django",
        "REST APIs",
        "WebSockets",
        "API Integration",
        "System Design"
      ]
    },
    {
      id: "06",
      title: "Frontend Engineering",
      skills: [
        "JavaScript",
        "Next.js",
        "React.js",
        "Tailwind",
        "HTML / CSS"
      ]
    },
    {
      id: "07",
      title: "DevOps & Infrastructure",
      skills: [
        "Docker",
        "Linux",
        "Git & GitHub"
      ]
    },
    {
      id: "08",
      title: "Tools & Platforms",
      skills: [
        "Vercel",
        "GitHub Pipelines",
        "Firebase"
      ]
    }
  ];
  
  return (
    <section id="specs" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col mb-16 max-w-[65ch]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
            Comprehensive review of languages, platforms, and methodologies employed in engineering robust hardware and software platforms.
          </p>
        </div>

        {/* Telemetry Counter Dashboard Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full select-none">
          <GlassCard className="p-6 text-center cursor-default" spotlightColor="rgba(0, 105, 140, 0.08)">
            <span className="block font-mono text-[9px] text-[#00698c] uppercase tracking-wider mb-2">SYSTEMS REGISTERED</span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">
              <Counter value={13} suffix="" />
            </span>
            <span className="text-xs text-[#d7d7d7]/50 font-light mt-1 block">Autonomous Builds</span>
          </GlassCard>

          <GlassCard className="p-6 text-center cursor-default" spotlightColor="rgba(0, 105, 140, 0.08)">
            <span className="block font-mono text-[9px] text-[#00698c] uppercase tracking-wider mb-2">SKILLS DIRECTORY</span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">
              <Counter value={47} suffix="+" />
            </span>
            <span className="text-xs text-[#d7d7d7]/50 font-light mt-1 block">Hardware & Software</span>
          </GlassCard>

          <GlassCard className="p-6 text-center cursor-default" spotlightColor="rgba(0, 105, 140, 0.08)">
            <span className="block font-mono text-[9px] text-[#00698c] uppercase tracking-wider mb-2">MILESTONES AUDITED</span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">
              <Counter value={5} suffix="" />
            </span>
            <span className="text-xs text-[#d7d7d7]/50 font-light mt-1 block">Certificates & Awards</span>
          </GlassCard>

          <GlassCard className="p-6 text-center cursor-default" spotlightColor="rgba(0, 105, 140, 0.08)">
            <span className="block font-mono text-[9px] text-[#00698c] uppercase tracking-wider mb-2">GITHUB CONTRIBUTIONS</span>
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white block">
              <Counter value={250} suffix="+" />
            </span>
            <span className="text-xs text-[#d7d7d7]/70 font-semibold mt-1 block">
              Contributions in the Last 6 Months
            </span>
            <span className="text-[10px] text-[#d7d7d7]/40 font-light mt-1.5 block leading-relaxed max-w-[220px] mx-auto">
              Consistently contributing to projects, experiments, and engineering systems across AI, Embedded Systems, Full Stack Development, and Web3.
            </span>
          </GlassCard>
        </div>

        {/* Part 1: Core Performance Metrics - 2-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full">
          
          <GlassCard className="p-6 md:p-8 cursor-default" spotlightColor="rgba(0,105,140,0.06)">
            <div className="flex items-start gap-4 select-none">
              <div className="w-12 h-12 rounded-2xl bg-[#00698c]/10 flex items-center justify-center text-[#00698c] shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#00698c] uppercase tracking-wider mb-1">Layer 01 // Firmware Execution</span>
                <h3 className="text-xl font-semibold text-white mb-2">Embedded Control</h3>
                <span className="text-3xl font-mono font-bold text-white block mb-1">BARE-METAL</span>
                <p className="text-xs text-[#d7d7d7]/60 font-light leading-relaxed">
                  Writing optimized hardware interactions in C/C++ and Intel 8085/8086 Assembly. Specializing in SPI/I2C protocols, timers, and interrupts.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 cursor-default" spotlightColor="rgba(0,105,140,0.06)">
            <div className="flex items-start gap-4 select-none">
              <div className="w-12 h-12 rounded-2xl bg-[#00698c]/10 flex items-center justify-center text-[#00698c] shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#00698c] uppercase tracking-wider mb-1">Layer 02 // Neural Inference</span>
                <h3 className="text-xl font-semibold text-white mb-2">Autonomous Intelligence</h3>
                <span className="text-3xl font-mono font-bold text-white block mb-1">ML PIPELINES</span>
                <p className="text-xs text-[#d7d7d7]/60 font-light leading-relaxed">
                  Constructing models in PyTorch, executing predictive analysis with XGBoost/LightGBM, and deploying RAG-based AI Agents.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 cursor-default" spotlightColor="rgba(0,105,140,0.06)">
            <div className="flex items-start gap-4 select-none">
              <div className="w-12 h-12 rounded-2xl bg-[#00698c]/10 flex items-center justify-center text-[#00698c] shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#00698c] uppercase tracking-wider mb-1">Layer 03 // Consensus & Logic</span>
                <h3 className="text-xl font-semibold text-white mb-2">Decentralized Trust</h3>
                <span className="text-3xl font-mono font-bold text-white block mb-1">SMART CONTRACTS</span>
                <p className="text-xs text-[#d7d7d7]/60 font-light leading-relaxed">
                  Developing secure Solidity payment architectures and on-chain prediction platforms built using Foundry test suites.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 cursor-default" spotlightColor="rgba(0,105,140,0.06)">
            <div className="flex items-start gap-4 select-none">
              <div className="w-12 h-12 rounded-2xl bg-[#00698c]/10 flex items-center justify-center text-[#00698c] shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#00698c] uppercase tracking-wider mb-1">Layer 04 // Computational Core</span>
                <h3 className="text-xl font-semibold text-white mb-2">Software Architectures</h3>
                <span className="text-3xl font-mono font-bold text-white block mb-1">FASTAPI & WEB3</span>
                <p className="text-xs text-[#d7d7d7]/60 font-light leading-relaxed">
                  Designing fast asynchronous backend APIs in Python (FastAPI/Django) and Web3 frontends (Next.js, Wagmi, Viem).
                </p>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Part 2: Specifications Index - Grouped Chunks with Soft Dividers */}
        <GlassCard className="p-8 select-none cursor-default" spotlightColor="rgba(215, 215, 215, 0.02)">
          <h3 className="text-xl font-semibold text-white mb-8 border-b border-white/5 pb-4">
            Technical Specifications
          </h3>

          <div className="space-y-8 divide-y divide-white/5">
            {specCategories.map((group, index) => (
              <div
                key={group.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${index === 0 ? "pt-0" : "pt-8"}`}
              >
                <div className="lg:col-span-4 font-mono text-xs text-[#00698c] uppercase tracking-wider">
                  {group.id} {"//"} {group.title}
                </div>
                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {group.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-white/[0.02] border border-white/5 text-[#d7d7d7] rounded-full hover:border-[#00698c]/30 hover:text-white transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
