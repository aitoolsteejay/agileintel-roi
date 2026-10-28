"use client";

import React from "react";
import { Trash2, HelpCircle, Check, RotateCcw } from "lucide-react";
import { RoleInput } from "../lib/calculatorEngine";
import { SALARY_BENCHMARKS, SalaryBenchmark } from "../data/benchmarks";
import { formatCurrency, formatPercent } from "../lib/formatters";

interface RoleRowProps {
  role: RoleInput;
  index: number;
  currency: "GBP" | "USD" | "EUR";
  onUpdate: (updated: RoleInput) => void;
  onRemove: () => void;
}

export const RoleRow: React.FC<RoleRowProps> = ({
  role,
  index,
  currency,
  onUpdate,
  onRemove,
}) => {
  const matchingBenchmark = SALARY_BENCHMARKS.find((b) => b.role === role.roleName);

  const handleBenchmarkSelect = (roleName: string) => {
    if (roleName === "custom") {
      onUpdate({
        ...role,
        roleName: "Custom Role",
        isBenchmarkRole: false,
        benchmarkIndiaSalary: 20000,
        customIndiaSalary: 20000,
        isSalaryOverridden: false,
      });
      return;
    }

    const bm = SALARY_BENCHMARKS.find((b) => b.role === roleName);
    if (bm) {
      onUpdate({
        ...role,
        roleName: bm.role,
        function: bm.function,
        localAnnualSalary: bm.ukSalaryGBP,
        isBenchmarkRole: true,
        benchmarkIndiaSalary: bm.indiaSalaryGBP,
        customIndiaSalary: bm.indiaSalaryGBP,
        isSalaryOverridden: false,
      });
    }
  };

  const handleResetSalaryToBenchmark = () => {
    if (matchingBenchmark) {
      onUpdate({
        ...role,
        localAnnualSalary: matchingBenchmark.ukSalaryGBP,
        customIndiaSalary: matchingBenchmark.indiaSalaryGBP,
        isSalaryOverridden: false,
      });
    }
  };

  // Local calculation preview for this row
  const rowLocalBase = role.headcount * role.localAnnualSalary;
  const rowEmployerCost =
    role.employerCostType === "percentage"
      ? rowLocalBase * (role.employerCostValue / 100)
      : role.headcount * role.employerCostValue;
  const rowOverhead = role.headcount * role.annualOverheadPerPerson;
  const rowTotalLocal = rowLocalBase + rowEmployerCost + rowOverhead;

  const indiaSalaryPerPerson = role.customIndiaSalary ?? role.benchmarkIndiaSalary ?? 0;
  const rowIndiaBase = role.headcount * indiaSalaryPerPerson;
  const rowSalarySaving = rowLocalBase - rowIndiaBase;
  const rowSavingPct = rowLocalBase > 0 ? (rowSalarySaving / rowLocalBase) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border border-[#d8dee9] p-4 sm:p-5 shadow-sm hover:border-[#1f4fb4]/40 transition-all">
      {/* Top Header: Role Name, Function, and Delete */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e3e7ef]">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b6577] mb-1">
            Role #{index + 1}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={role.isBenchmarkRole ? role.roleName : "custom"}
              onChange={(e) => handleBenchmarkSelect(e.target.value)}
              className="text-sm font-semibold text-[#1b2433] bg-[#f4f6fa] border border-[#d8dee9] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1f4fb4] focus:border-transparent outline-none max-w-full sm:max-w-md"
            >
              <optgroup label="AgileIntel Benchmarked Roles (Slide 4)">
                {SALARY_BENCHMARKS.map((b) => (
                  <option key={b.role} value={b.role}>
                    {b.role} ({b.function})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom Roles">
                <option value="custom">Custom Role / Other</option>
              </optgroup>
            </select>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8eef9] text-[#1f4fb4] border border-[#1f4fb4]/20">
              {role.function}
            </span>

            {role.isBenchmarkRole && (
              <span className="inline-flex items-center gap-1 text-xs text-[#0d8a56] font-medium bg-[#ecfdf5] px-2 py-0.5 rounded border border-[#0d8a56]/20">
                <Check className="w-3 h-3" />
                Benchmark Loaded
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-right">
            <span className="text-xs text-[#5b6577] block">Row Local Cost</span>
            <span className="text-sm font-bold text-[#1b2433]">
              {formatCurrency(rowTotalLocal, currency)}/yr
            </span>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove role"
            aria-label="Remove role"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Inputs: Headcount, Local Salary, India Salary */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Headcount */}
        <div>
          <label className="block text-xs font-medium text-[#5b6577] mb-1">
            Headcount (People)
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onUpdate({ ...role, headcount: Math.max(1, role.headcount - 1) })}
              className="px-3 py-2 border border-r-0 border-[#d8dee9] bg-[#f4f6fa] rounded-l-lg hover:bg-slate-200 text-sm font-semibold text-[#1b2433]"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={role.headcount}
              onChange={(e) =>
                onUpdate({
                  ...role,
                  headcount: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
              className="w-full text-center py-2 border border-[#d8dee9] text-sm font-semibold text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
            />
            <button
              type="button"
              onClick={() => onUpdate({ ...role, headcount: role.headcount + 1 })}
              className="px-3 py-2 border border-l-0 border-[#d8dee9] bg-[#f4f6fa] rounded-r-lg hover:bg-slate-200 text-sm font-semibold text-[#1b2433]"
            >
              +
            </button>
          </div>
        </div>

        {/* Local Annual Salary Per Person */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-[#5b6577]">
              Current Base Salary / Person
            </label>
            {role.isSalaryOverridden && (
              <button
                type="button"
                onClick={handleResetSalaryToBenchmark}
                className="inline-flex items-center gap-1 text-[11px] text-[#1f4fb4] hover:underline"
                title="Reset to verified benchmark"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              step="500"
              value={role.localAnnualSalary}
              onChange={(e) =>
                onUpdate({
                  ...role,
                  localAnnualSalary: Math.max(0, parseFloat(e.target.value) || 0),
                  isSalaryOverridden: true,
                })
              }
              className="w-full px-3 py-2 border border-[#d8dee9] rounded-lg text-sm font-semibold text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
            />
            {role.isBenchmarkRole && !role.isSalaryOverridden && (
              <span className="absolute right-3 top-2.5 text-[11px] text-[#5b6577] bg-[#f4f6fa] px-1.5 py-0.5 rounded border border-[#d8dee9]">
                Deck Ref
              </span>
            )}
          </div>
        </div>

        {/* India Base Salary Per Person */}
        <div>
          <label className="block text-xs font-medium text-[#5b6577] mb-1">
            India Base Salary / Person
          </label>
          <div className="relative">
            <input
              type="number"
              step="500"
              value={role.customIndiaSalary ?? role.benchmarkIndiaSalary ?? 20000}
              onChange={(e) =>
                onUpdate({
                  ...role,
                  customIndiaSalary: Math.max(0, parseFloat(e.target.value) || 0),
                })
              }
              className="w-full px-3 py-2 border border-[#d8dee9] rounded-lg text-sm font-semibold text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
            />
            <span className="absolute right-3 top-2.5 text-[11px] text-[#0d8a56] font-semibold">
              -{formatPercent(rowSavingPct, 0)} base
            </span>
          </div>
        </div>
      </div>

      {/* Row Secondary Parameters: Employer On-cost, Overhead, Recruitment */}
      <div className="mt-4 pt-3 border-t border-[#e3e7ef]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Employer Cost (NIC, Pension, Healthcare) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#5b6577]">Employer On-costs</span>
            <div className="inline-flex rounded border border-[#d8dee9] p-0.5 bg-[#f4f6fa]">
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    ...role,
                    employerCostType: "percentage",
                    employerCostValue: 15.0,
                  })
                }
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  role.employerCostType === "percentage"
                    ? "bg-white text-[#1f4fb4] shadow-xs"
                    : "text-[#5b6577]"
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    ...role,
                    employerCostType: "fixed",
                    employerCostValue: 6000,
                  })
                }
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  role.employerCostType === "fixed"
                    ? "bg-white text-[#1f4fb4] shadow-xs"
                    : "text-[#5b6577]"
                }`}
              >
                Fixed
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step={role.employerCostType === "percentage" ? "0.5" : "500"}
              value={role.employerCostValue}
              onChange={(e) =>
                onUpdate({
                  ...role,
                  employerCostValue: Math.max(0, parseFloat(e.target.value) || 0),
                })
              }
              className="w-full px-2 py-1.5 border border-[#d8dee9] rounded text-xs text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
            />
            <span className="text-[#5b6577]">
              {role.employerCostType === "percentage" ? "%" : currency}
            </span>
          </div>
        </div>

        {/* Annual Overhead per person */}
        <div>
          <label className="block text-[#5b6577] mb-1">
            Annual Overhead / Person (Desk, SaaS)
          </label>
          <input
            type="number"
            step="250"
            value={role.annualOverheadPerPerson}
            onChange={(e) =>
              onUpdate({
                ...role,
                annualOverheadPerPerson: Math.max(0, parseFloat(e.target.value) || 0),
              })
            }
            className="w-full px-2 py-1.5 border border-[#d8dee9] rounded text-xs text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
          />
        </div>

        {/* One-time recruitment fee */}
        <div>
          <label className="block text-[#5b6577] mb-1">
            Local Recruiter Fee / Person
          </label>
          <input
            type="number"
            step="500"
            value={role.recruitmentCostPerPerson}
            onChange={(e) =>
              onUpdate({
                ...role,
                recruitmentCostPerPerson: Math.max(0, parseFloat(e.target.value) || 0),
              })
            }
            className="w-full px-2 py-1.5 border border-[#d8dee9] rounded text-xs text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
          />
        </div>
      </div>
    </div>
  );
};
