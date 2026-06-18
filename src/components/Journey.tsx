"use client";

import React from "react";
import { GlassCard } from "./ui/GlassCard";
import { Calendar, GraduationCap, Briefcase, MapPin } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export default function Journey() {
  const shouldReduceMotion = useReducedMotion();

  // Combined chronological journey list
  const timelineEvents = [
    {
      year: "2022 - 2026",
      type: "education",
      title: "Bachelor of Technology",
      subtitle: "National Institute of Technology Agartala",
      department: "Electronics and Communication Engineering",
      location: "Tripura, India",
      metric: "ECE SPECIALIZATION",
      description: "Focused on low-level firmware engineering, microprocessors, digital signal processing, and simulated systems engineering. Active member in technical clubs and robotics design.",
    },
    {
      year: "July 2024 - Aug 2024",
      type: "experience",
      title: "Machine Learning Intern",
      subtitle: "TechnoHacks EduTech",
      department: "AI & ML Department",
      location: "Remote",
      metric: "Internship Certificate",
      description: "Implemented text preprocessing pipelines, developed classification classifiers, and handled exploratory data analysis tasks utilizing Python, Pandas, and Scikit-Learn libraries.",
    },
    {
      year: "2020 - 2022",
      type: "education",
      title: "Senior Secondary Education",
      subtitle: "Sri Sai Aditya Junior College",
      department: "MPC Stream (Maths, Physics, Chemistry)",
      location: "Kakinada, Andhra Pradesh, India",
      metric: "MPC SPECIALIZATION",
      description: "Completed secondary board coursework with core focuses in analytical mathematics, physical mechanics, and digital chemistry concepts.",
    },
  ];

  return (
    <section id="journey" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0, filter: "none" } : { opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col mb-16 max-w-[65ch]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Education & Experience
          </h2>
          <p className="text-base md:text-lg text-[#d7d7d7]/85 font-light leading-relaxed">
            Chronological breakdown of formal academic education and early professional work checkpoints in engineering.
          </p>
        </div>

        {/* Timeline flow */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 select-none">
          
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-5 h-5 rounded-full bg-black border border-white/20 flex items-center justify-center z-10 group-hover:border-[#00698c] transition-colors duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00698c]" />
              </div>

              {/* Event Item inside a Glass Card */}
              <GlassCard className="p-6 md:p-8" spotlightColor="rgba(0, 105, 140, 0.05)" delay={index * 0.1}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-[#00698c] mb-2">
                      {event.type === "education" ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : (
                        <Briefcase className="w-5 h-5" />
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {event.type === "education" ? "ACADEMIC JOURNEY" : "PROFESSIONAL INTERNSHIP"}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {event.title}
                    </h3>
                    <p className="text-[#d7d7d7] font-medium text-sm md:text-base">
                      {event.subtitle}
                    </p>
                  </div>

                  {/* Date / Time and Location Indicators */}
                  <div className="flex flex-col items-start md:items-end text-xs font-mono text-[#d7d7d7]/60 gap-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="inline-block text-[10px] font-mono bg-[#00698c]/15 text-[#00698c] border border-[#00698c]/20 px-2 py-0.5 rounded mb-3">
                    {event.metric}
                  </span>
                  <p className="text-xs md:text-sm text-[#d7d7d7]/70 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </GlassCard>
              
            </div>
          ))}

        </div>
      </motion.div>
    </section>
  );
}
