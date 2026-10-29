"use client";

import React from "react";
import { CalculationResult } from "../lib/calculatorEngine";
import { formatCurrency } from "../lib/formatters";
import { AnimatedNumber } from "./AnimatedNumber";

interface CostComparisonChartProps {
  results: CalculationResult;
}

interface Bar {
  label: string;
  value: number;
  swatch: string;
  fill: string;
  valueClass: string;
}

export const CostComparisonChart: React.FC<CostComparisonChartProps> = ({
  results,
}) => {
  const bars: Bar[] = [
    {
      label: "Your current team",
      value: results.totalLocalBaseSalaries,
      swatch: "bg-[#5b8def]",
      fill: "bg-[#5b8def]",
      valueClass: "text-[#1b2433]",
    },
    {
      label: "Same roles in India",
      value: results.totalIndiaBaseSalaries,
      swatch: "bg-[#1f4fb4]",
      fill: "bg-[#1f4fb4]",
      valueClass: "text-[#1f4fb4]",
    },
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
            <AnimatedNumber
              value={bar.value}
              format={(n) => formatCurrency(n, results.currency)}
              className={`font-bold tabular-nums ${bar.valueClass}`}
            />
          </div>
          <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden">
            <div
              className={`${bar.fill} h-full rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.round((bar.value / maxVal) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
