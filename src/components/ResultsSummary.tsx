"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency, formatPercent } from "../lib/formatters";
import { CostComparisonChart } from "./CostComparisonChart";

interface ResultsSummaryProps {
  results: CalculationResult;
  onGetQuoteClick: () => void;
}

function describePayback(months: number | null): { value: string; hint: string } {
  if (months === null) return { value: "—", hint: "No saving to pay it back" };
  if (months === 0) return { value: "Immediately", hint: "Avoided recruiter fees cover it" };
  return {
    value: `${months} month${months === 1 ? "" : "s"}`,
    hint: "From your monthly saving",
  };
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  onGetQuoteClick,
}) => {
  const isManaged =
    results.isEligibleForManagedCalculation &&
    results.agileIntelAnnualCost !== null;

  const saving = isManaged ? results.annualSavings ?? 0 : results.salaryOnlyDifference;
  const savingPct = isManaged
    ? results.costReductionPercent ?? 0
    : results.salaryOnlyReductionPercent;
  const isSaving = saving >= 0;
  const payback = describePayback(results.breakEvenMonths);

  return (
    <div className="bg-white rounded-2xl border border-[#d8dee9] shadow-lg overflow-hidden sticky top-24 transition-all duration-300">
      {/* Headline saving */}
      <div className="bg-[#0b2350] text-white p-5 sm:p-6">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider text-[#8fb0f0] font-bold">
            {isManaged ? "Estimated saving per year" : "Salary saving per year"}
          </span>
          <span className="text-slate-300">
            {results.totalHeadcount} {results.totalHeadcount === 1 ? "person" : "people"}
          </span>
        </div>
        <div className="mt-2 flex items-baseline flex-wrap gap-x-3 gap-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {formatCurrency(saving, results.currency)}
          </span>
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

        {isManaged && (
          <dl className="grid grid-cols-2 gap-3 animate-fade-in">
            <div className="bg-[#f4f6fa] rounded-xl p-3 border border-[#d8dee9]">
              <dt className="text-[11px] font-medium text-[#5b6577]">First-year saving</dt>
              <dd className="text-base sm:text-lg font-bold text-[#1b2433]">
                {formatCurrency(results.firstYearNetSavings, results.currency)}
              </dd>
              <dd className="text-[10px] text-[#5b6577]">
                After {formatCurrency(results.totalOffshoreOneTimeCost, results.currency)}{" "}
                one-time setup
              </dd>
            </div>
            <div className="bg-[#f4f6fa] rounded-xl p-3 border border-[#d8dee9]">
              <dt className="text-[11px] font-medium text-[#5b6577]">Setup paid back</dt>
              <dd className="text-base sm:text-lg font-bold text-[#1b2433]">{payback.value}</dd>
              <dd className="text-[10px] text-[#5b6577]">{payback.hint}</dd>
            </div>
          </dl>
        )}

        <p className="text-[11px] leading-relaxed text-[#5b6577]">
          {isManaged
            ? "Indicative: includes 12% India on-costs and an AgileIntel fee of £7,500 per person a year. Your proposal confirms final pricing."
            : "Base salaries only, from Glassdoor data (Aug 2026). Choose Full cost above to add on-costs, overheads and AgileIntel's fee."}
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
