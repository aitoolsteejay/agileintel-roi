"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  PiggyBank,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency, formatPercent } from "../lib/formatters";
import { CostComparisonChart } from "./CostComparisonChart";

interface ResultsSummaryProps {
  results: CalculationResult;
  onGetProposalClick: () => void;
  onToggleManagedModel: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  onGetProposalClick,
  onToggleManagedModel,
}) => {
  const isManaged =
    results.isEligibleForManagedCalculation &&
    results.agileIntelAnnualCost !== null;

  return (
    <div className="bg-white rounded-2xl border border-[#d8dee9] shadow-lg overflow-hidden sticky top-24">
      {/* Top Banner Header */}
      <div className="bg-[#0b2350] text-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-[#8fb0f0] font-bold">
            Team Economics Summary
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/15">
            {results.totalHeadcount} Headcount
          </span>
        </div>

        {/* Primary Metric: Savings */}
        {isManaged ? (
          <div>
            <div className="text-xs text-slate-300 mb-1">
              Estimated Ongoing Annual Savings
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatCurrency(results.annualSavings, results.currency)}
              </span>
              <span
                className={`text-sm sm:text-base font-bold px-2 py-0.5 rounded ${
                  (results.annualSavings ?? 0) >= 0
                    ? "bg-[#0d8a56] text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {(results.annualSavings ?? 0) >= 0 ? "-" : "+"}
                {formatPercent(Math.abs(results.costReductionPercent ?? 0), 1)}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Per year vs current UK local team operating cost
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs text-slate-300 mb-1">
              Base Salary Benchmark Difference
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatCurrency(results.salaryOnlyDifference, results.currency)}
              </span>
              <span className="text-sm sm:text-base font-bold px-2 py-0.5 rounded bg-[#1f4fb4] text-white">
                -{formatPercent(results.salaryOnlyReductionPercent, 1)} base
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-300">
              Source-backed Glassdoor benchmark comparison (excludes management fees)
            </div>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Unapproved Pricing Honest State Callout */}
        {!isManaged ? (
          <div className="bg-[#fffbeb] border border-[#f59e0b]/40 rounded-xl p-4 text-xs text-[#92400e]">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold text-[#78350f] mb-1">
                  Source-Backed Benchmark Mode
                </strong>
                <p className="leading-relaxed text-[#92400e]">
                  Your local team cost is fully calculated. To compute exact net savings,
                  AgileIntel confirms custom commercial pricing based on your agreed
                  pod scope.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onToggleManagedModel}
                    className="inline-flex items-center gap-1 font-semibold text-[#0b2350] bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded border border-amber-300 transition-colors"
                  >
                    Simulate Indicative Managed Model (£7.5k/person)
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#ecfdf5] border border-[#0d8a56]/30 rounded-xl p-3.5 text-xs text-[#065f46]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d8a56] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#064e3b]">
                  Indicative Managed Model Active:
                </span>{" "}
                Includes estimated 12% India statutory employer costs and £7,500/headcount
                operational management & QA fee.
                <button
                  type="button"
                  onClick={onToggleManagedModel}
                  className="block mt-1 text-[#0b2350] underline font-medium hover:text-[#1f4fb4]"
                >
                  Switch back to Salary-Only Benchmark mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Visual Comparison Chart */}
        <CostComparisonChart results={results} />

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 text-left">
          {/* Current Local Team Cost */}
          <div className="bg-[#f4f6fa] rounded-xl p-3.5 border border-[#d8dee9]">
            <span className="text-[11px] font-medium text-[#5b6577] block">
              Current Local Cost
            </span>
            <span className="text-base sm:text-lg font-bold text-[#1b2433]">
              {formatCurrency(results.currentAnnualOperatingCost, results.currency)}
            </span>
            <span className="text-[10px] text-[#5b6577] block mt-0.5">
              Base + on-costs + overhead
            </span>
          </div>

          {/* AgileIntel Managed Cost */}
          <div className="bg-[#f4f6fa] rounded-xl p-3.5 border border-[#d8dee9]">
            <span className="text-[11px] font-medium text-[#5b6577] block">
              AgileIntel Annual Cost
            </span>
            <span className="text-base sm:text-lg font-bold text-[#1f4fb4]">
              {formatCurrency(results.agileIntelAnnualCost, results.currency)}
            </span>
            <span className="text-[10px] text-[#5b6577] block mt-0.5">
              {isManaged ? "Managed team cost" : "Requires proposal"}
            </span>
          </div>

          {/* First-Year Net Savings */}
          <div className="bg-[#f4f6fa] rounded-xl p-3.5 border border-[#d8dee9]">
            <span className="text-[11px] font-medium text-[#5b6577] block flex items-center gap-1">
              <PiggyBank className="w-3.5 h-3.5 text-[#0d8a56]" />
              First-Year Net Savings
            </span>
            <span className="text-base sm:text-lg font-bold text-[#1b2433]">
              {formatCurrency(results.firstYearNetSavings, results.currency)}
            </span>
            <span className="text-[10px] text-[#5b6577] block mt-0.5">
              After setup & transition
            </span>
          </div>

          {/* Cost-Based ROI */}
          <div className="bg-[#f4f6fa] rounded-xl p-3.5 border border-[#d8dee9]">
            <span className="text-[11px] font-medium text-[#5b6577] block flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#1f4fb4]" />
              Cost-Based ROI
            </span>
            <span className="text-base sm:text-lg font-bold text-[#1b2433]">
              {formatPercent(results.costBasedROI, 0)}
            </span>
            <span className="text-[10px] text-[#5b6577] block mt-0.5">
              Cost-comparison ratio
            </span>
          </div>
        </div>

        {/* Break-Even Period Callout */}
        <div className="bg-[#e8eef9] border border-[#1f4fb4]/20 rounded-xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1f4fb4]/10 text-[#1f4fb4]">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <span className="font-semibold text-[#0b2350] block">
              Break-Even Horizon:
            </span>
            <span className="text-[#5b6577]">{results.breakEvenNote}</span>
          </div>
        </div>

        {/* CTA: Get Tailored Estimate */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onGetProposalClick}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white bg-[#1f4fb4] hover:bg-[#255bd1] border border-blue-400/40 shadow-md transition-all hover:translate-y-[-1px]"
          >
            <span>Request a Tailored Team Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-2 text-center text-[11px] text-[#5b6577]">
            Free scoping session with Dev Mehta (India) & Sandeep Saujani (UK/EU).
          </p>
        </div>
      </div>
    </div>
  );
};
