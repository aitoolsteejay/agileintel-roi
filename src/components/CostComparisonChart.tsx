"use client";

import React from "react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency } from "../lib/formatters";

interface CostComparisonChartProps {
  results: CalculationResult;
}

interface Bar {
  label: string;
  value: number;
  swatch: string;
  fill: string;
  valueClass: string;
  parts?: [string, number | null][];
}

export const CostComparisonChart: React.FC<CostComparisonChartProps> = ({
  results,
}) => {
  const isManaged =
    results.isEligibleForManagedCalculation &&
    results.agileIntelAnnualCost !== null;

  const localBar = {
    label: "Your current team",
    swatch: "bg-[#0b2350]",
    fill: "from-[#0b2350] to-[#14306a]",
    valueClass: "text-[#1b2433]",
  };
  const indiaBar = {
    swatch: "bg-[#1f4fb4]",
    fill: "from-[#1f4fb4] to-[#2563eb]",
    valueClass: "text-[#1f4fb4]",
  };

  const bars: Bar[] = isManaged
    ? [
        {
          ...localBar,
          value: results.currentAnnualOperatingCost,
          parts: [
            ["Salary", results.totalLocalBaseSalaries],
            ["On-costs", results.totalEmployerCosts],
            ["Overhead", results.totalAnnualOverhead],
          ],
        },
        {
          ...indiaBar,
          label: "AgileIntel India team",
          value: results.agileIntelAnnualCost ?? 0,
          parts: [
            ["Salary", results.totalIndiaBaseSalaries],
            ["India on-costs", results.indiaEmployerCosts],
            ["AgileIntel fee", results.offshoreManagementFees],
          ],
        },
      ]
    : [
        { ...localBar, value: results.totalLocalBaseSalaries },
        { ...indiaBar, label: "Same roles in India", value: results.totalIndiaBaseSalaries },
      ];

  const maxVal = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="space-y-4">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#1b2433] flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-sm ${bar.swatch}`} />
              {bar.label}
            </span>
            <span className={`font-bold ${bar.valueClass}`}>
              {formatCurrency(bar.value, results.currency)}
            </span>
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
            <div
              className={`bg-gradient-to-r ${bar.fill} h-full rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.round((bar.value / maxVal) * 100)}%` }}
            />
          </div>
          {bar.parts && (
            <div className="mt-1 text-[11px] text-[#5b6577]">
              {bar.parts
                .map(([label, value]) => `${label} ${formatCurrency(value, results.currency)}`)
                .join(" · ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
