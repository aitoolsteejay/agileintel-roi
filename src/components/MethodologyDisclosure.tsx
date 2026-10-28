"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Info } from "lucide-react";

export const MethodologyDisclosure: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-10 bg-white border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f4f6fa] rounded-2xl border border-[#d8dee9] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1b2433]">
                  Financial Methodology & Benchmark Disclosures
                </h3>
                <p className="text-xs text-[#5b6577]">
                  Transparent calculation logic, data citations, and operational caveats.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0b2350] bg-white border border-[#d8dee9] hover:bg-slate-50 transition-colors"
            >
              <span>{isOpen ? "Collapse Disclosures" : "Read Full Methodology"}</span>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>

          {isOpen && (
            <div className="mt-6 pt-6 border-t border-[#d8dee9] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5b6577] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#1b2433] mb-1.5">
                  1. Salary Benchmark Attribution & Scope
                </h4>
                <p>
                  All benchmark base salaries in this calculator originate directly from the
                  <em> AgileIntel Offshoring B2B Events Introduction 2026</em> presentation (Slide 4).
                  Figures reflect a Glassdoor salary review conducted as of 31 August 2026
                  combined with over 10 years of AgileIntel recruitment placements in India.
                  The deck average across 24 benchmarked roles indicates a £47,590 UK average
                  and a £24,460 India average (49% average saving).
                </p>

                <h4 className="font-bold text-[#1b2433] mt-4 mb-1.5">
                  2. Employer On-Costs & Local Overheads
                </h4>
                <p>
                  Current UK local operating costs incorporate statutory employer on-costs
                  (Employer National Insurance Contributions at ~13.8–15%, workplace pensions,
                  and mandatory benefits) plus per-head office, hardware, and SaaS licensing
                  overheads (defaulted to £4,500/year per person, configurable by user).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1b2433] mb-1.5">
                  3. Offshore Pricing & Management Fee Treatment
                </h4>
                <p>
                  In source-backed mode, the calculator compares base salaries only and transparently
                  identifies that AgileIntel commercial management fees are subject to agreed pod scope.
                  When the &ldquo;Indicative Managed Model&rdquo; is simulated, an estimated 12% India statutory
                  employer provision and an indicative £7,500/person/year management and QA fee
                  are applied.
                </p>

                <h4 className="font-bold text-[#1b2433] mt-4 mb-1.5">
                  4. First-Year Amortisation & Avoided Recruitment
                </h4>
                <p>
                  For new teams, one-time local recruitment fees (typically £4,000–£6,000 per role)
                  are accounted as avoided local expenditure, offsetting offshore workstation setup
                  and transition training costs. For replacement of existing roles, historical
                  recruitment is not counted as an avoided saving without explicit agreement.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
