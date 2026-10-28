"use client";

import React from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCalculateClick }) => {
  return (
    <section id="hero" className="relative bg-[#0b2350] text-white pt-10 pb-14 overflow-hidden border-b border-[#1f4fb4]/20">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8fb0f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#1f4fb4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scope Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-slate-200 mb-5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#8fb0f0] animate-pulse" />
          <span className="tracking-wide uppercase font-semibold text-[#8fb0f0]">
            B2B Events Offshore Delivery
          </span>
          <span className="text-white/40">·</span>
          <span>UK / Europe / US</span>
        </div>

        {/* Headline & Subtitle */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Scale your delivery. <br />
            <span className="text-[#8fb0f0]">Not your cost base.</span>
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Calculate what your business could save by moving event operations,
            research, marketing, or CRM work to an AgileIntel-managed team in India.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-200 font-medium">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="font-extrabold text-[#8fb0f0] text-sm">49%</span>
              <span>Average base salary saving</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="font-extrabold text-[#8fb0f0] text-sm">24</span>
              <span>Benchmarked roles</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <span className="font-extrabold text-[#8fb0f0] text-sm">6 Wks</span>
              <span>To a live India pod</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
