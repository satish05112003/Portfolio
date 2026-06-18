/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GlassCard } from "./ui/GlassCard";
import { MagneticButton } from "./ui/MagneticButton";
import { portfolioData } from "@/utils/dataParser";
import { FilePdf, Copy, Check, TerminalWindow } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function ResumeCenter() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const resumeJson = {
    contact: {
      name: portfolioData.personal.name,
      role: portfolioData.personal.role,
      email: portfolioData.personal.email,
      phone: portfolioData.personal.phone,
      location: portfolioData.personal.location,
    },
    education: portfolioData.education.map((edu: any) => ({
      institution: edu.institution_name,
      degree: edu.degree,
      major: edu.field_of_study,
      period: `${edu.start_year} - ${edu.end_year}`,
    })),
    experience: portfolioData.experience.map((exp: any) => ({
      company: exp.company_name,
      role: exp.role_title,
      period: "July 2024 - Aug 2024",
      description: exp.description,
    })),
    advancedSkills: portfolioData.skills
      .filter((s: any) => s.proficiency_level === "ADVANCED")
      .map((s: any) => s.skill_name),
  };

  const jsonString = JSON.stringify(resumeJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col mb-16 max-w-[65ch]">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Resume Console
        </h2>
        <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
          Access structural metadata directly or download the complete engineering curriculum vitae.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Side: Interactive Code Terminal (Span 8) */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full">
          <GlassCard className="p-0 border border-white/10 shadow-2xl h-full flex flex-col overflow-hidden" spotlightColor="rgba(215, 215, 215, 0.01)">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5 font-mono text-xs text-[#d7d7d7]/60">
              <div className="flex items-center gap-2">
                <TerminalWindow className="w-4 h-4 text-[#00698c]" />
                <span>satish_nagalla.json</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
              </div>
            </div>

            {/* Scrollable JSON view */}
            <div className="p-6 overflow-y-auto max-h-[360px] font-mono text-[11px] md:text-xs text-[#d7d7d7]/85 leading-relaxed bg-[#0b0b0a] select-text">
              <pre className="no-scrollbar">
                <code>
                  {jsonString}
                </code>
              </pre>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Action Console (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full">
          <GlassCard className="p-8 flex flex-col justify-between h-full group" spotlightColor="rgba(0, 105, 140, 0.12)">
            <div className="select-none">
              <h3 className="text-xl font-semibold text-white tracking-tight mb-4">
                Curriculum Access
              </h3>
              <p className="text-sm text-[#d7d7d7]/70 font-light leading-relaxed mb-8">
                Download the formatted, applicant-tracking-system (ATS) compliant hardware/software engineering profile directly in PDF format, or capture the structured raw JSON object above.
              </p>
            </div>

            {/* Custom CTA Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <MagneticButton
                href="/NAGALLA_SATISH.pdf"
                download="NAGALLA_SATISH.pdf"
                variant="primary"
                className="w-full text-center"
              >
                <FilePdf className="mr-2 w-5 h-5" />
                Download CV (PDF)
              </MagneticButton>
              
              <MagneticButton
                onClick={handleCopy}
                variant="secondary"
                className="w-full text-center"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 w-5 h-5 text-green-500 animate-pulse" />
                    JSON Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-5 h-5" />
                    Copy Raw JSON
                  </>
                )}
              </MagneticButton>
            </div>
          </GlassCard>
        </div>

      </div>
      </motion.div>
    </section>
  );
}
