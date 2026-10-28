"use client";

import React, { useState } from "react";
import { DELIVERY_CAPABILITIES } from "../data/capabilities";
import { CheckCircle2, Sparkles, Layers } from "lucide-react";

export const CapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? DELIVERY_CAPABILITIES
      : activeTab === "quick-wins"
      ? DELIVERY_CAPABILITIES.filter((c) => c.isQuickWin)
      : DELIVERY_CAPABILITIES;

  return (
    <section id="capabilities" className="py-20 bg-[#f4f6fa] border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
              Operations Backbone · All Can Run From India
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#1b2433]">
              AgileIntel Delivery Capabilities
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5b6577]">
              Your senior team leads event commercial strategy and relationships. Your
              AgileIntel India team powers the production engine across the entire
              event lifecycle.
            </p>
          </div>

          {/* Lifecycle filter */}
          <div className="inline-flex rounded-xl bg-white p-1 border border-[#d8dee9] shadow-xs self-start">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-[#0b2350] text-white shadow-xs"
                  : "text-[#5b6577] hover:text-[#1b2433]"
              }`}
            >
              All 9 Functions
            </button>
            <button
              onClick={() => setActiveTab("quick-wins")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "quick-wins"
                  ? "bg-[#0b2350] text-white shadow-xs"
                  : "text-[#5b6577] hover:text-[#1b2433]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1f4fb4]" />
              <span>Proven Quick Wins</span>
            </button>
          </div>
        </div>

        {/* 7 Core Lifecycle Stages visual bar from slide 3 */}
        <div className="hidden lg:grid grid-cols-7 gap-1 bg-white p-2 rounded-2xl border border-[#d8dee9] mb-10 text-center text-xs font-bold uppercase tracking-wider text-[#5b6577]">
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">01 · Plan</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">02 · Promote</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">03 · Acquire</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">04 · Convert</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">05 · Deliver</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">06 · Engage</div>
          <div className="py-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">07 · Analyse</div>
        </div>

        {/* Grid of Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cap) => (
            <div
              key={cap.id}
              className="bg-white rounded-2xl border border-[#d8dee9] p-6 shadow-sm hover:border-[#1f4fb4]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-[#1f4fb4] bg-[#e8eef9] px-2.5 py-1 rounded-md">
                    {cap.number} · {cap.lifecycleStage}
                  </span>
                  {cap.isQuickWin && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d8a56] bg-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#0d8a56]/20">
                      <Sparkles className="w-3 h-3" />
                      Proven Quick Win
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#1b2433] mb-2">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#5b6577] mb-4 leading-relaxed">
                  {cap.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-[#e3e7ef]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b2433] block">
                    Source Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#5b6577]">
                    {cap.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f4f6fa] text-[11px] text-[#5b6577]">
                AI-skills established in parallel for automated speed.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
