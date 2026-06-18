import React from "react";
import { cn } from "@/utils/cn";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export default function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wide bg-gradient-to-r from-white/[0.04] to-white/[0.01] text-[#d7d7d7] border border-white/5 select-none hover:border-[#00698c]/30 hover:text-white transition-all duration-300",
        className
      )}
    >
      <span className="w-1 h-1 rounded-full bg-[#00698c] mr-2" />
      {name}
    </span>
  );
}
