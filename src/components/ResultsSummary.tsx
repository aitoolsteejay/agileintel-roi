"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency, formatPercent } from "../lib/formatters";
import { CostComparisonChart } from "./CostComparisonChart";
import { AnimatedNumber } from "./AnimatedNumber";

interface ResultsSummaryProps {
  results: CalculationResult;
  onGetQuoteClick: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  onGetQuoteClick,
}) => {
  const saving = results.salaryOnlyDifference;
  const savingPct = results.salaryOnlyReductionPercent;
  const isSaving = saving >= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#d8dee9] shadow-lg overflow-hidden sticky top-24 transition-all duration-300">
      {/* Headline saving */}
      <div className="bg-[#0b2350] text-white p-5 sm:p-6">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider text-[#8fb0f0] font-bold">
            Salary saving per year
          </span>
          <span className="text-slate-300">
            {results.totalHeadcount} {results.totalHeadcount === 1 ? "person" : "people"}
          </span>
        </div>
        <div className="mt-2 flex items-baseline flex-wrap gap-x-3 gap-y-1">
          <AnimatedNumber
            value={saving}
            format={(n) => formatCurrency(n, results.currency)}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums"
          />
          <span
            className={`text-sm font-bold px-2 py-0.5 rounded ${
              isSaving ? "bg-[#0d8a56]" : "bg-red-600"
            }`}
          >
            {formatPercent(Math.abs(savingPct), 0)} {isSaving ? "lower" : "higher"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <CostComparisonChart results={results} />

        <p className="text-[11px] leading-relaxed text-[#5b6577]">
          Indicative annual base salaries from Glassdoor (31 August 2026) and AgileIntel&apos;s
          recruitment experience. Excludes AgileIntel&apos;s management fee and employer
          on-costs.
        </p>

        <button
          type="button"
          onClick={onGetQuoteClick}
          className="btn-tactile w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white bg-[#1f4fb4] hover:bg-[#255bd1] border border-blue-400/40 shadow-md hover:shadow-lg transition-all"
        >
          <span>Get a tailored quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
