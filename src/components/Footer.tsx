"use client";

import React from "react";
import { portfolioData } from "@/utils/dataParser";
import { ArrowUp } from "@phosphor-icons/react";

export default function Footer() {
  const { name, email, github, linkedin } = portfolioData.personal;
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#080807] border-t border-white/5 py-12 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Directories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-[#00698c] uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#d7d7d7]/70 font-light">
              <li><a href="#hero" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Expertise</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Products & Systems</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Specifications</a></li>
            </ul>
          </div>

          {/* Column 2: Education & Experience */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-[#00698c] uppercase tracking-wider">Education & Experience</h4>
            <ul className="space-y-2.5 text-xs text-[#d7d7d7]/70 font-light">
              <li><a href="#journey" className="hover:text-white transition-colors">Timeline</a></li>
              <li><a href="#milestones" className="hover:text-white transition-colors">Milestones</a></li>
              <li><a href="/NAGALLA_SATISH.pdf" download className="hover:text-white transition-colors">Download CV</a></li>
            </ul>
          </div>

          {/* Column 3: Social Directories */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-[#00698c] uppercase tracking-wider">Directories</h4>
            <ul className="space-y-2.5 text-xs text-[#d7d7d7]/70 font-light">
              <li><a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors font-mono">{email}</a></li>
            </ul>
          </div>

          {/* Column 4: Focus Statement */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[10px] text-[#00698c] uppercase tracking-wider mb-2">Systems Statement</h4>
              <p className="text-[11px] text-[#d7d7d7]/50 font-light leading-relaxed">
                Design with hardware constraints. Build with intelligence. Secure with consensus.
              </p>
            </div>
            
            {/* Scroll back up link */}
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 text-[10px] font-mono text-[#00698c] hover:text-[#009bcc] transition-colors mt-4 self-start cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Apple Sub-Footer */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-[#d7d7d7]/40 gap-4">
          <div>
            Copyright © 2026 {name}. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <span>STATIC STATIC EXPORT</span>
            <span>VERCEL HOSTED</span>
            <span>BUILT WITH NEXT.JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
