"use client";

import React from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onCalculateClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCalculateClick,
  onHowItWorksClick,
}) => {
  return (
    <section id="hero" className="relative bg-[#0b2350] text-white pt-12 pb-20 overflow-hidden">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8fb0f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#1f4fb4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Market Scope Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-slate-200 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#8fb0f0] animate-pulse" />
          <span className="tracking-wide uppercase font-semibold text-[#8fb0f0]">
            B2B Events Offshore Delivery
          </span>
          <span className="text-white/40">·</span>
          <span>UK / Europe / US</span>
        </div>

        {/* Headline & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Scale your delivery. <br />
            <span className="text-[#8fb0f0]">Not your cost base.</span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
            See what your business could save by building an AgileIntel-managed
            team in India, with an estimate based on your roles, current team costs,
            and delivery requirements.
          </p>

          {/* Credibility Line from presentation */}
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400 font-medium">
            <span className="text-white font-semibold">Core Delivery:</span>
            <span>Research</span>
            <span>·</span>
            <span>Data</span>
            <span>·</span>
            <span>Marketing</span>
            <span>·</span>
            <span>Sales & CRM</span>
            <span>·</span>
            <span>Event Operations</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onCalculateClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold text-white bg-[#1f4fb4] hover:bg-[#255bd1] border border-blue-400/40 shadow-lg shadow-blue-900/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Calculate your savings</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onHowItWorksClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-medium text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm transition-all"
            >
              <span>How it works</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Presentation Benchmark Highlight Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pt-10 border-t border-white/15">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-[#8fb0f0]">
              49%
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              Average Base Salary Saving
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Across 24 benchmarked roles in B2B event operations, data, and marketing.
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-[#8fb0f0]">
              7
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              Event-Lifecycle Functions
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Run from India: from market research and lead generation to post-event reporting.
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-[#8fb0f0]">
              90 Days
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              From Kick-off to Scale
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Live in 6 weeks with your first pod. Formal review and scale decision at day 90.
            </div>
          </div>
        </div>

        {/* Organizations Trusted Banner */}
        <div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 uppercase tracking-wider">
            Leadership team experience with organisations including:
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-slate-300">
            <span>Oxford Global</span>
            <span>·</span>
            <span>DCD</span>
            <span>·</span>
            <span>Marsh McLennan</span>
            <span>·</span>
            <span>Cirium</span>
            <span>·</span>
            <span>Econsultancy</span>
            <span>·</span>
            <span>Centaur</span>
            <span>·</span>
            <span>HRD Connect</span>
          </div>
        </div>
      </div>
    </section>
  );
};
