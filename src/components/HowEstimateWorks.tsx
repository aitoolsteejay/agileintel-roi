"use client";

import React from "react";
import { Users2, ArrowRightLeft, TrendingUp } from "lucide-react";

export const HowEstimateWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
            Methodology & Workflow
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#1b2433]">
            How the Estimate Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5b6577]">
            A transparent, three-step financial model based on verified August 2026
            Glassdoor salary benchmarks and AgileIntel’s proven pod delivery structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-[#f4f6fa] rounded-2xl p-6 border border-[#d8dee9] relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0b2350] text-white flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#1b2433] mb-2">
                Estimate Current Local Cost
              </h3>
              <p className="text-xs text-[#5b6577] leading-relaxed">
                We tally your direct base salaries, statutory employer on-costs
                (National Insurance, pension, healthcare), and per-seat overheads
                (desk, software seats, hardware) to capture the true fully-loaded
                cost of local delivery.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#d8dee9]/60 text-[11px] text-[#5b6577]">
              <strong className="text-[#1b2433]">Formula:</strong> Base Salary + On-costs + Overhead + (Recruitment fees if new)
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f4f6fa] rounded-2xl p-6 border border-[#d8dee9] relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1f4fb4] text-white flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#1b2433] mb-2">
                Compare with AgileIntel Offshore Pod
              </h3>
              <p className="text-xs text-[#5b6577] leading-relaxed">
                Benchmark against pre-verified India base salaries across 24 B2B
                event roles. Compare direct salary-only differentials or simulate
                an all-inclusive managed team model with dedicated QA and line leadership.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#d8dee9]/60 text-[11px] text-[#5b6577]">
              <strong className="text-[#1b2433]">Scope:</strong> India Base + Statutory + Pod Management & QA
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f4f6fa] rounded-2xl p-6 border border-[#d8dee9] relative flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0d8a56] text-white flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#1b2433] mb-2">
                Review Savings & Scale Opportunity
              </h3>
              <p className="text-xs text-[#5b6577] leading-relaxed">
                Review net ongoing annual cost reductions, first-year amortization
                timelines, and break-even periods. Reinvest savings into additional
                research, creative, and data capacity to drive commercial growth.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#d8dee9]/60 text-[11px] text-[#5b6577]">
              <strong className="text-[#1b2433]">Outcome:</strong> 40–57% lower base costs &gt;100% Y2 ROI potential
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
