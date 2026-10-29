"use client";

import React from "react";
import { ArrowDown, Sparkles, TrendingUp, Users } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";

const HERO_STATS = [
  { value: 49, suffix: "%", label: "Average base salary saving" },
  { value: 24, suffix: "", label: "Benchmarked roles" },
  { value: 6, suffix: " Wks", label: "To a live India pod" },
];

interface HeroProps {
  onCalculateClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCalculateClick }) => {
  return (
    <section id="hero" className="relative bg-[#0b2350] text-white pt-12 pb-16 overflow-hidden border-b border-[#1f4fb4]/20">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8fb0f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1f4fb4]/20 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3d5a92]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scope Pill with subtle pulse */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-slate-200 mb-6 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#8fb0f0] animate-pulse" />
          <span className="tracking-wide uppercase font-semibold text-[#8fb0f0]">
            B2B Events Offshore Delivery
          </span>
          <span className="text-white/40">·</span>
          <span>UK / Europe / US</span>
        </div>

        {/* Headline & Subtitle with smooth staggered slide-up */}
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Scale your events. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8fb0f0] via-[#aeb9d0] to-white">
              Not your cost base.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            See what your business could save by moving event operations, data,
            marketing, or research to an AgileIntel-managed team in India.
          </p>

          {/* Quick stats: chips stagger in, numbers tick up */}
          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="animate-slide-up"
                style={{ animationDelay: `${250 + i * 120}ms` }}
              >
                <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5">
                  <AnimatedNumber
                    value={stat.value}
                    format={(n) => `${Math.round(n)}${stat.suffix}`}
                    countUpOnView
                    duration={1400}
                    className="font-black text-[#8fb0f0] text-base tabular-nums"
                  />
                  <span className="text-slate-200">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
