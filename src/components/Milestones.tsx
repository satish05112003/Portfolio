"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { Medal, ShieldCheck, GraduationCap, Certificate, Trophy } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function Milestones() {
  const shouldReduceMotion = useReducedMotion();

  // Static list parsed exactly from the achievements backup data to guarantee structured presentation
  const accomplishments = [
    {
      type: "EXAM RANK",
      title: "JEE Mains 2022",
      metric: "Top 3.7%",
      description: "Secured a position in the top 3.7 percentile globally in the Joint Entrance Examination (JEE Mains) 2022 among over 1 million candidates.",
      icon: Trophy,
      span: "md:col-span-2",
    },
    {
      type: "SCHOLARSHIP",
      title: "FFE Scholar",
      metric: "ACADEMIC",
      description: "Selected to receive a scholarship from the Foundation for Excellence (FFE) in recognition of outstanding academic performance and potential.",
      icon: GraduationCap,
      span: "md:col-span-2",
    },
    {
      type: "VOLUNTEERING",
      title: "Zama Web3 Volunteer",
      metric: "FHE PRIVACY",
      description: "Selected as a volunteer for Zama, a cryptography and privacy-focused Web3 company building Fully Homomorphic Encryption (FHE) protocols.",
      icon: ShieldCheck,
      span: "md:col-span-2",
    },
    {
      type: "WORKSHOP",
      title: "Ansys HFSS Training",
      metric: "ELECTROMAGNETIC",
      description: "Completed an intensive 2-day simulation training workshop covering HFSS high-frequency structure simulator tools and techniques.",
      icon: Certificate,
      span: "md:col-span-3",
    },
    {
      type: "INTERNSHIP",
      title: "ML Intern Certificate",
      metric: "EXPERIENCE",
      description: "Certified Machine Learning Intern at TechnoHacks EduTech, demonstrating competence across data preparation and algorithm training workflows.",
      icon: Medal,
      span: "md:col-span-3",
    },
  ];

  return (
    <section id="milestones" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col mb-16 max-w-[65ch]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Milestones & Awards
          </h2>
          <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
            Significant academic recognitions, competitive examinations rankings, and professional training certifications.
          </p>
        </div>

        {/* 6-Column Layout: Row 1 has 3 cards (span 2 each), Row 2 has 2 cards (span 3 each) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full">
        {accomplishments.map((item, index) => {
          const Icon = item.icon;
          return (
            <GlassCard
              key={index}
              className={`${item.span} p-6 md:p-8 flex flex-col justify-between group cursor-default`}
              spotlightColor="rgba(0, 105, 140, 0.08)"
              delay={index * 0.08}
            >
              <div className="select-none h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <span className="font-mono text-[9px] text-[#00698c] uppercase tracking-wider">
                      {item.type}
                    </span>
                    <Icon className="w-5 h-5 text-[#00698c]/80 group-hover:text-[#00698c] transition-colors duration-300" />
                  </div>
                  
                  <span className="inline-block text-[10px] font-mono bg-white/[0.04] text-[#d7d7d7] px-2 py-0.5 rounded border border-white/5 mb-3">
                    {item.metric}
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-xs text-[#d7d7d7]/70 font-light leading-relaxed mt-4">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          );
        })}
      </div>
      </motion.div>
    </section>
  );
}
