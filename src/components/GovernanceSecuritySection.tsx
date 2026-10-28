"use client";

import React from "react";
import {
  KPI_METRICS,
  KPI_CAVEAT,
  WHY_INDIA_STATS,
  GOVERNANCE_MATRIX,
  DATA_SECURITY_PILLARS,
} from "../data/kpis";
import { ShieldCheck, Lock, Activity, Users, FileCheck, CheckCircle2 } from "lucide-react";

export const GovernanceSecuritySection: React.FC = () => {
  return (
    <section id="kpis-governance" className="py-20 bg-[#f4f6fa] border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section A: KPI Scorecard */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
              Operational Measurement · Slide 12
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#1b2433]">
              KPI Scorecard: Visible From Month One
            </h2>
            <p className="mt-2 text-sm text-[#5b6577]">
              Rigorous monthly governance against quantitative financial, operational,
              and quality benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KPI_METRICS.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#d8dee9] p-4 shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#1f4fb4] uppercase tracking-wider mb-2">
                  <span>{kpi.category}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0b2350]">
                  {kpi.value}
                </div>
                <div className="text-xs font-semibold text-[#1b2433] mt-1">
                  {kpi.metric}
                </div>
                <div className="text-[11px] text-[#5b6577] mt-1">
                  {kpi.notes}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#d8dee9] text-xs text-[#5b6577]">
            <strong className="text-[#1b2433]">KPI Disclosure:</strong> {KPI_CAVEAT}
          </div>
        </div>

        {/* Section B: Why India Market Depth */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
              Macro Talent Context
            </span>
            <h3 className="mt-2 text-2xl font-bold text-[#1b2433]">
              Why India: Deep Talent, Mature Enterprise Market
            </h3>
            <p className="mt-2 text-sm text-[#5b6577]">
              Proven ecosystem supporting thousands of international global capability centres.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WHY_INDIA_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#d8dee9] p-4 text-center shadow-xs"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-[#1f4fb4]">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#1b2433] mt-1 leading-snug">
                  {stat.label}
                </div>
                <div className="text-[10px] text-[#5b6577] mt-1 leading-tight">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section C: Governance Responsibility Matrix */}
        <div className="bg-white rounded-2xl border border-[#d8dee9] p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl mb-6">
            <h3 className="text-xl font-bold text-[#1b2433]">
              Governance Matrix: You Direct the Work, We Run the Operation
            </h3>
            <p className="text-xs sm:text-sm text-[#5b6577] mt-1">
              Clear segregation of commercial priorities versus daily operational management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* You Own */}
            <div className="bg-[#f4f6fa] rounded-xl p-5 border border-[#d8dee9]">
              <div className="font-bold text-sm text-[#0b2350] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0b2350]" />
                You Own
              </div>
              <ul className="space-y-2 text-[#5b6577]">
                {GOVERNANCE_MATRIX.youOwn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0b2350] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AgileIntel Owns */}
            <div className="bg-[#f4f6fa] rounded-xl p-5 border border-[#1f4fb4]/40">
              <div className="font-bold text-sm text-[#1f4fb4] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1f4fb4]" />
                AgileIntel Owns
              </div>
              <ul className="space-y-2 text-[#5b6577]">
                {GOVERNANCE_MATRIX.agileIntelOwns.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1f4fb4] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Together */}
            <div className="bg-[#f4f6fa] rounded-xl p-5 border border-[#d8dee9]">
              <div className="font-bold text-sm text-[#0d8a56] mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d8a56]" />
                Together
              </div>
              <ul className="space-y-2 text-[#5b6577]">
                {GOVERNANCE_MATRIX.together.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d8a56] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section D: Data Security & Compliance Pillars */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
              Data Protection & Compliance · Slide 12 (A4)
            </span>
            <h3 className="mt-2 text-2xl font-bold text-[#1b2433]">
              Your Systems. Controlled Access.
            </h3>
            <p className="mt-2 text-sm text-[#5b6577]">
              Multi-layered enterprise information security aligned with UK & EU GDPR and India DPDP regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DATA_SECURITY_PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#d8dee9] p-5 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#1f4fb4]" />
                  <h4 className="text-sm font-bold text-[#1b2433]">
                    {pillar.title}
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-[#5b6577]">
                  {pillar.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#1f4fb4] font-bold">›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
