"use client";

import React from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { CurrencyCode, RoleInput } from "../lib/calculatorEngine";
import { FUNCTION_CATEGORIES, SALARY_BENCHMARKS } from "../data/benchmarks";
import { formatPercent, getCurrencySymbol } from "../lib/formatters";

/** Column layout shared by the role rows and their header row (sm and up). */
export const ROLE_GRID_COLUMNS =
  "sm:grid-cols-[minmax(0,1fr)_6.5rem_7rem_7rem_2rem]";

/** Benchmark roles grouped by function, used by every role picker. */
export const BenchmarkRoleOptions: React.FC = () => (
  <>
    {FUNCTION_CATEGORIES.map((fn) => {
      const roles = SALARY_BENCHMARKS.filter((b) => b.function === fn);
      if (roles.length === 0) return null;
      return (
        <optgroup key={fn} label={fn}>
          {roles.map((b) => (
            <option key={b.role} value={b.role}>
              {b.role}
            </option>
          ))}
        </optgroup>
      );
    })}
  </>
);

interface MoneyInputProps {
  label: string;
  symbol: string;
  value: number;
  onChange: (value: number) => void;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ label, symbol, value, onChange }) => (
  <div className="relative">
    <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5b6577]">
      {symbol}
    </span>
    <input
      type="number"
      min="0"
      step="500"
      aria-label={label}
      value={value}
      onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
      className="no-spin w-full pl-6 pr-2 py-2 border border-[#d8dee9] rounded-lg text-sm font-semibold text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
    />
  </div>
);

interface RoleRowProps {
  role: RoleInput;
  currency: CurrencyCode;
  canRemove: boolean;
  onUpdate: (updated: RoleInput) => void;
  onRemove: () => void;
}

export const RoleRow: React.FC<RoleRowProps> = ({
  role,
  currency,
  canRemove,
  onUpdate,
  onRemove,
}) => {
  const benchmark = role.isBenchmarkRole
    ? SALARY_BENCHMARKS.find((b) => b.role === role.roleName)
    : undefined;
  const indiaSalary = role.customIndiaSalary ?? role.benchmarkIndiaSalary ?? 0;
  const isEdited =
    benchmark !== undefined &&
    (role.localAnnualSalary !== benchmark.ukSalaryGBP ||
      indiaSalary !== benchmark.indiaSalaryGBP);
  const savingPct =
    role.localAnnualSalary > 0
      ? ((role.localAnnualSalary - indiaSalary) / role.localAnnualSalary) * 100
      : 0;
  const symbol = getCurrencySymbol(currency);

  const handleRoleSelect = (value: string) => {
    const bm = SALARY_BENCHMARKS.find((b) => b.role === value);
    if (!bm) {
      onUpdate({
        ...role,
        roleName: "Custom Role",
        isBenchmarkRole: false,
        isSalaryOverridden: false,
      });
      return;
    }
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
  };

  const handleReset = () => {
    if (benchmark) {
      onUpdate({
        ...role,
        localAnnualSalary: benchmark.ukSalaryGBP,
        customIndiaSalary: benchmark.indiaSalaryGBP,
        isSalaryOverridden: false,
      });
    }
  };

  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)_2rem] gap-x-3 gap-y-2 py-3 ${ROLE_GRID_COLUMNS}`}
    >
      {/* Role picker + per-role saving */}
      <div className="min-w-0">
        <select
          aria-label="Role"
          value={role.isBenchmarkRole ? role.roleName : "custom"}
          onChange={(e) => handleRoleSelect(e.target.value)}
          className="w-full text-sm font-semibold text-[#1b2433] bg-[#f4f6fa] border border-[#d8dee9] rounded-lg px-2.5 py-2 focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
        >
          <BenchmarkRoleOptions />
          <option value="custom">Custom role</option>
        </select>
        <div className="mt-1 flex items-center gap-2 text-[11px]">
          <span
            className={`font-semibold ${
              savingPct >= 0 ? "text-[#0d8a56]" : "text-[#dc2626]"
            }`}
          >
            {formatPercent(Math.abs(savingPct), 0)}{" "}
            {savingPct >= 0 ? "lower" : "higher"} in India
          </span>
          {isEdited && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#1f4fb4] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="btn-tactile sm:order-last self-start p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none"
        title="Remove role"
        aria-label="Remove role"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Number inputs: own row on mobile, inline columns from sm up */}
      <div className="col-span-2 grid grid-cols-3 gap-3 sm:contents">
        <div className="min-w-0">
          <span className="sm:hidden block text-[11px] text-[#5b6577] mb-1">People</span>
          <div className="flex items-stretch">
            <button
              type="button"
              aria-label="Fewer people"
              onClick={() => onUpdate({ ...role, headcount: Math.max(1, role.headcount - 1) })}
              className="btn-tactile px-2.5 border border-r-0 border-[#d8dee9] bg-[#f4f6fa] rounded-l-lg hover:bg-slate-200 text-sm font-bold text-[#1b2433]"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              aria-label="People"
              value={role.headcount}
              onChange={(e) =>
                onUpdate({ ...role, headcount: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="no-spin w-full min-w-0 text-center py-2 border border-[#d8dee9] text-sm font-semibold text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
            />
            <button
              type="button"
              aria-label="More people"
              onClick={() => onUpdate({ ...role, headcount: role.headcount + 1 })}
              className="btn-tactile px-2.5 border border-l-0 border-[#d8dee9] bg-[#f4f6fa] rounded-r-lg hover:bg-slate-200 text-sm font-bold text-[#1b2433]"
            >
              +
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <span className="sm:hidden block text-[11px] text-[#5b6577] mb-1">Current salary</span>
          <MoneyInput
            label="Current salary per person"
            symbol={symbol}
            value={role.localAnnualSalary}
            onChange={(v) =>
              onUpdate({ ...role, localAnnualSalary: v, isSalaryOverridden: true })
            }
          />
        </div>

        <div className="min-w-0">
          <span className="sm:hidden block text-[11px] text-[#5b6577] mb-1">India salary</span>
          <MoneyInput
            label="India salary per person"
            symbol={symbol}
            value={indiaSalary}
            onChange={(v) =>
              onUpdate({ ...role, customIndiaSalary: v, isSalaryOverridden: true })
            }
          />
        </div>
      </div>
    </div>
  );
};
