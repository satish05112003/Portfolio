"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { List, X } from "@phosphor-icons/react";
import { motion, useScroll, useSpring } from "motion/react";

export default function LocalNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#hero" },
    { label: "Expertise", href: "#expertise" },
    { label: "Products", href: "#projects" },
    { label: "Specifications", href: "#specs" },
    { label: "Experience", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Thin Cerulean Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#00698c] origin-left z-[60]"
        style={{ scaleX }}
      />
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex items-center select-none border-b border-transparent",
          {
            "bg-black/40 backdrop-blur-md border-white/5 shadow-lg shadow-black/20": scrolled || mobileMenuOpen,
          }
        )}
      >
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center">
        
        {/* Name / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group cursor-pointer select-none"
        >
          {/* Glassmorphic Favicon Icon Container */}
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#00698c]/35 group-hover:scale-[1.03] transition-all duration-300 bg-[#292823]/25 backdrop-blur-md p-1.5 shadow-md shadow-black/40 flex items-center justify-center">
            <Image
              src="/favicon.png"
              alt="Nagalla Satish Logo"
              width={26}
              height={26}
              className="object-contain"
            />
          </div>
          {/* Typography split: Nagalla (Dusty Grey) Satish (Cerulean) */}
          <span className="font-sans font-extrabold tracking-tight text-base sm:text-lg flex gap-1.5 leading-none items-center">
            <span className="text-[#d7d7d7] group-hover:text-white transition-colors duration-300">Nagalla</span>
            <span className="text-[#00698c] group-hover:text-[#009bcc] transition-colors duration-300">Satish</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-mono text-[#d7d7d7]/70 hover:text-white transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#080807] border-b border-white/5 flex flex-col p-6 space-y-4 md:hidden z-40 select-none">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-[#d7d7d7] hover:text-[#00698c] transition-colors py-2 border-b border-white/5 uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
    </>
  );
}
