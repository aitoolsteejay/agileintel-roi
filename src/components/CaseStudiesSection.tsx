"use client";

import React from "react";
import { CASE_STUDIES, CASE_STUDY_CAVEAT } from "../data/caseStudies";
import { CheckCircle2, TrendingUp, Users, Info } from "lucide-react";

export const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="py-20 bg-[#f4f6fa] border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
            Proof · Already Proven With B2B Events Businesses
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[#1b2433]">
            Client Case Studies & Commercial Impact
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5b6577]">
            Source-attributed case-study metrics from Slide 6 demonstrating delivery
            scale, quality, and commercial growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-2xl border border-[#d8dee9] p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#1f4fb4] bg-[#e8eef9] px-3 py-1 rounded-full">
                    {cs.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#5b6577] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#1f4fb4]" />
                    {cs.teamSize}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1b2433]">{cs.title}</h3>
                <p className="text-xs font-medium text-[#1f4fb4] mt-0.5 mb-6">
                  {cs.clientType}
                </p>

                {/* Hero Metrics Row */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#f4f6fa] border border-[#d8dee9] mb-6">
                  {cs.heroMetrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#0b2350]">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-medium text-[#5b6577] mt-1 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Challenge */}
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b2433] block mb-1">
                    Operational Challenge:
                  </span>
                  <p className="text-xs text-[#5b6577] leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                {/* What We Delivered */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b2433] block mb-2">
                    What AgileIntel Delivered:
                  </span>
                  <ul className="space-y-2 text-xs text-[#5b6577]">
                    {cs.whatWeDelivered.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8a56] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#e3e7ef] text-[11px] text-[#5b6577] italic">
                Reported in AgileIntel Offshoring B2B Events Introduction 2026 presentation (Slide 6).
              </div>
            </div>
          ))}
        </div>

        {/* Caveat Notice */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#d8dee9] flex items-start gap-3 text-xs text-[#5b6577]">
          <Info className="w-4 h-4 text-[#1f4fb4] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1b2433] block">Case Study Caveat:</strong>
            <p>{CASE_STUDY_CAVEAT}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
