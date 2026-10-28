"use client";

import React from "react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency, formatPercent } from "../lib/formatters";

interface CostComparisonChartProps {
  results: CalculationResult;
}

export const CostComparisonChart: React.FC<CostComparisonChartProps> = ({
  results,
}) => {
  const isManaged = results.isEligibleForManagedCalculation && results.agileIntelAnnualCost !== null;

  const localTotal = isManaged
    ? results.currentAnnualOperatingCost
    : results.totalLocalBaseSalaries;

  const offshoreTotal = isManaged
    ? results.agileIntelAnnualCost ?? 0
    : results.totalIndiaBaseSalaries;

  const maxVal = Math.max(localTotal, offshoreTotal, 1);
  const localWidthPct = Math.min(100, Math.round((localTotal / maxVal) * 100));
  const offshoreWidthPct = Math.min(100, Math.round((offshoreTotal / maxVal) * 100));

  const savingAmount = localTotal - offshoreTotal;
  const savingPct = localTotal > 0 ? (savingAmount / localTotal) * 100 : 0;

  return (
    <div className="bg-[#f4f6fa] rounded-xl border border-[#d8dee9] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-[#1b2433]">
            {isManaged ? "Annual Cost Comparison" : "Base Salary Benchmark Comparison"}
          </h4>
          <p className="text-xs text-[#5b6577]">
            {isManaged
              ? "Current fully-loaded local operating cost vs AgileIntel managed offshore team"
              : "Source-backed salary benchmark comparison (excludes management fee & on-costs)"}
          </p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            savingAmount >= 0
              ? "bg-[#ecfdf5] text-[#0d8a56] border border-[#0d8a56]/20"
              : "bg-[#fef2f2] text-[#dc2626] border border-[#dc2626]/20"
          }`}
        >
          {savingAmount >= 0 ? "-" : "+"}
          {formatPercent(Math.abs(savingPct), 1)}
        </span>
      </div>

      {/* Bar 1: Local Team */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-[#1b2433] font-semibold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0b2350]" />
            {isManaged ? "Current Local Operating Cost" : "Current UK Base Salaries"}
          </span>
          <span className="text-[#1b2433] font-bold">
            {formatCurrency(localTotal, results.currency)}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden flex">
          <div
            className="bg-[#0b2350] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 text-[10px] text-white font-medium"
            style={{ width: `${localWidthPct}%` }}
          >
            {localWidthPct > 25 && "100%"}
          </div>
        </div>
        {isManaged && (
          <div className="flex justify-between text-[11px] text-[#5b6577] px-1">
            <span>Base: {formatCurrency(results.totalLocalBaseSalaries, results.currency)}</span>
            <span>On-costs: {formatCurrency(results.totalEmployerCosts, results.currency)}</span>
            <span>Overhead: {formatCurrency(results.totalAnnualOverhead, results.currency)}</span>
          </div>
        )}
      </div>

      {/* Bar 2: AgileIntel Offshore Team */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-[#1b2433] font-semibold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1f4fb4]" />
            {isManaged ? "AgileIntel Managed Team Cost" : "India Benchmark Base Salaries"}
          </span>
          <span className="text-[#1f4fb4] font-bold">
            {formatCurrency(offshoreTotal, results.currency)}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden flex">
          <div
            className="bg-[#1f4fb4] h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 text-[10px] text-white font-medium"
            style={{ width: `${offshoreWidthPct}%` }}
          >
            {offshoreWidthPct > 20 && `${Math.round((offshoreTotal / localTotal) * 100)}%`}
          </div>
        </div>
        {isManaged && (
          <div className="flex justify-between text-[11px] text-[#5b6577] px-1">
            <span>Base: {formatCurrency(results.totalIndiaBaseSalaries, results.currency)}</span>
            <span>Statutory (12%): {formatCurrency(results.indiaEmployerCosts, results.currency)}</span>
            <span>Mgmt & QA: {formatCurrency(results.offshoreManagementFees, results.currency)}</span>
          </div>
        )}
      </div>

      {/* Net Delta Footer */}
      <div className="mt-4 pt-3 border-t border-[#d8dee9] flex items-center justify-between text-xs">
        <span className="text-[#5b6577]">
          {isManaged ? "Net Ongoing Annual Saving:" : "Salary-Only Difference:"}
        </span>
        <span
          className={`font-extrabold ${
            savingAmount >= 0 ? "text-[#0d8a56]" : "text-[#dc2626]"
          }`}
        >
          {formatCurrency(savingAmount, results.currency)} / year
        </span>
      </div>
    </div>
  );
};
