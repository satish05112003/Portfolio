"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { portfolioData } from "@/utils/dataParser";
import { Envelope, LinkedinLogo, GithubLogo, TerminalWindow, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const { email, github, linkedin } = portfolioData.personal;

  const contactCards = [
    {
      label: "Direct Signal // Email",
      title: email,
      description: "Send direct transmission to discuss opportunities, systems engineering, or collaborations.",
      href: `mailto:${email}`,
      icon: <Envelope className="w-6 h-6 text-[#00698c]" />,
      target: "_self"
    },
    {
      label: "Professional Grid // LinkedIn",
      title: "satish-nagalla",
      description: "Connect for professional networking, credentials review, and background overview.",
      href: linkedin,
      icon: <LinkedinLogo className="w-6 h-6 text-[#00698c]" />,
      target: "_blank"
    },
    {
      label: "Open Source // GitHub",
      title: "satish05112003",
      description: "Inspect code repositories, core algorithm scripts, and software toolkits.",
      href: github,
      icon: <GithubLogo className="w-6 h-6 text-[#00698c]" />,
      target: "_blank"
    },
    {
      label: "Curriculum Vitae // Archive",
      title: "Developer Resume",
      description: "Download the compiled applicant-tracking-system PDF profile directly.",
      href: "/NAGALLA_SATISH.pdf",
      icon: <TerminalWindow className="w-6 h-6 text-[#00698c]" />,
      target: "_self"
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Title */}
        <div className="flex flex-col mb-16 max-w-[65ch]">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Let&apos;s Build Something Great
        </h2>
        <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
          Establish direct connection across endpoints or explore technical qualifications. Available for full-time roles, research contracts, and systemic builds.
        </p>
      </div>

      {/* Grid of Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {contactCards.map((card, idx) => (
          <a
            key={idx}
            href={card.href}
            target={card.target}
            download={card.href.endsWith(".pdf") ? "NAGALLA_SATISH.pdf" : undefined}
            rel={card.target === "_blank" ? "noopener noreferrer" : undefined}
            className="block group/card rounded-2xl transition-all duration-300 active:scale-[0.99] cursor-pointer"
          >
            <GlassCard
              className="p-8 h-full flex flex-col justify-between border border-white/10 hover:border-[#00698c]/30 group-hover/card:bg-white/[0.01] transition-all duration-300"
              spotlightColor="rgba(0, 105, 140, 0.08)"
            >
              <div className="flex items-start justify-between gap-4 mb-8 select-none">
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-2xl bg-[#292823]/25 border border-white/10 flex items-center justify-center group-hover/card:border-[#00698c]/40 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-[#00698c] uppercase tracking-wider font-semibold">
                      {card.label}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover/card:text-[#00698c] transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                </div>
                {/* Arrow indicator */}
                <ArrowUpRight className="w-4 h-4 text-[#d7d7d7]/40 group-hover/card:text-white group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-300" />
              </div>

              <p className="text-xs md:text-sm text-[#d7d7d7]/70 font-light leading-relaxed select-none">
                {card.description}
              </p>
            </GlassCard>
          </a>
        ))}
      </div>
      </motion.div>
    </section>
  );
}
