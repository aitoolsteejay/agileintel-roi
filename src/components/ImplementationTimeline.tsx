"use client";

import React from "react";
import { IMPLEMENTATION_TIMELINE } from "../data/kpis";
import { Clock, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const ImplementationTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-20 bg-white border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Engagement Models Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
            Engagement Options · Slide 9
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[#1b2433]">
            Start Small. Prove It in 90 Days. Then Scale.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5b6577]">
            Structured engagement frameworks designed for conference and B2B event
            organisers with increasing levels of operational ownership.
          </p>
        </div>

        {/* 3 Engagement Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#f4f6fa] rounded-2xl border border-[#d8dee9] p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0b2350] text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1b2433] mb-1">
                Specialist Pods
              </h3>
              <p className="text-xs text-[#5b6577] mb-4">
                Focused teams for specific functions or high-volume projects.
              </p>
              <ul className="space-y-2 text-xs text-[#5b6577]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Dedicated team for 1+ functions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Clear scope & agreed deliverables
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Quickest to initiate
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-[#d8dee9] text-xs font-semibold text-[#0b2350]">
              Best for: Starting quickly and testing value
            </div>
          </div>

          <div className="bg-[#f4f6fa] rounded-2xl border border-[#1f4fb4]/40 p-6 flex flex-col justify-between relative shadow-sm">
            <div className="absolute top-4 right-4 text-[10px] uppercase font-bold text-[#1f4fb4] bg-[#e8eef9] px-2 py-0.5 rounded-full border border-[#1f4fb4]/20">
              Most Popular
            </div>
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#1f4fb4] text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1b2433] mb-1">
                Managed Delivery Team
              </h3>
              <p className="text-xs text-[#5b6577] mb-4">
                End-to-end operational ownership of a process or workstream.
              </p>
              <ul className="space-y-2 text-xs text-[#5b6577]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Integrated team with process ownership
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Defined SLAs and formal governance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Scales with your evolving portfolio
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-[#d8dee9] text-xs font-semibold text-[#1f4fb4]">
              Best for: Scaling work that is proven
            </div>
          </div>

          <div className="bg-[#f4f6fa] rounded-2xl border border-[#d8dee9] p-6 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#0b2350] text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1b2433] mb-1">
                Build-Operate-Transfer
              </h3>
              <p className="text-xs text-[#5b6577] mb-4">
                A long-term capability built on your processes, people, and tools.
              </p>
              <ul className="space-y-2 text-xs text-[#5b6577]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  AgileIntel sets up & runs the team
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Transition to your corporate entity
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                  Your own permanent India GCC
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-3 border-t border-[#d8dee9] text-xs font-semibold text-[#0b2350]">
              Best for: Large, long-term operations
            </div>
          </div>
        </div>

        {/* 4-Stage Implementation Journey Timeline */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-[#1b2433] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1f4fb4]" />
              Indicative 90-Day Implementation Journey
            </h3>
            <span className="text-xs text-[#5b6577]">
              Average time to hire: 28–39 days (India) vs 36–44 days (UK)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {IMPLEMENTATION_TIMELINE.map((item, idx) => (
              <div
                key={item.stage}
                className="bg-[#f4f6fa] rounded-2xl border border-[#d8dee9] p-5 relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-white bg-[#0b2350] px-2.5 py-1 rounded">
                    {item.timeframe}
                  </span>
                  <span className="text-xs font-bold text-[#1f4fb4]">
                    Stage {item.stage}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#1b2433] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5b6577] mb-3 leading-relaxed">
                  {item.description}
                </p>
                <ul className="space-y-1.5 text-[11px] text-[#5b6577] pt-2 border-t border-[#d8dee9]">
                  {item.activities.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#1f4fb4] font-bold">›</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-[#5b6577] italic text-center">
            *Indicative implementation journey as presented in Slide 10; actual timelines depend on role specialisation and client clearance.
          </p>
        </div>
      </div>
    </section>
  );
};
