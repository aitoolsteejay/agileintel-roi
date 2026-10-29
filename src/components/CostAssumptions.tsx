"use client";

import React from "react";
import { CalculatorState, RoleInput } from "../lib/calculatorEngine";
import { getCurrencySymbol } from "../lib/formatters";

type SharedCostField =
  | "employerCostValue"
  | "annualOverheadPerPerson"
  | "recruitmentCostPerPerson";

interface NumberFieldProps {
  label: string;
  hint: string;
  value: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (value: number) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({
  label,
  hint,
  value,
  step,
  prefix,
  suffix,
  onChange,
}) => (
  <label className="block">
    <span className="block text-xs font-medium text-[#1b2433]">{label}</span>
    <span className="block text-[11px] text-[#5b6577] mb-1.5">{hint}</span>
    <div className="relative">
      {prefix && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#5b6577]">
          {prefix}
        </span>
      )}
      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, parseFloat(e.target.value) || 0))}
        className={`no-spin w-full ${prefix ? "pl-7" : "pl-3"} ${
          suffix ? "pr-24" : "pr-3"
        } py-2 border border-[#d8dee9] rounded-lg text-sm font-semibold text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5b6577]">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

interface CostAssumptionsProps {
  state: CalculatorState;
  onChange: (newState: CalculatorState) => void;
}

/**
 * Team-wide local cost assumptions, shown only in the full-cost view since the
 * salary-only comparison doesn't use them. Every role carries the same values.
 */
export const CostAssumptions: React.FC<CostAssumptionsProps> = ({ state, onChange }) => {
  const shared = state.roles[0];
  if (!shared) return null;

  const symbol = getCurrencySymbol(state.currency);
  const isNewTeam = state.hiringSituation === "new_team";

  const updateShared = (field: SharedCostField, value: number) => {
    onChange({
      ...state,
      roles: state.roles.map((r): RoleInput => ({ ...r, [field]: value })),
    });
  };

  const setNewTeam = (newTeam: boolean) => {
    onChange({
      ...state,
      hiringSituation: newTeam ? "new_team" : "replace_roles",
      additionalCosts: {
        ...state.additionalCosts,
        avoidLocalRecruitment: newTeam,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#d8dee9] p-5 sm:p-6 shadow-sm animate-fade-in">
      <h3 className="text-sm font-semibold text-[#1b2433]">Your costs on top of salary</h3>
      <p className="text-xs text-[#5b6577] mt-0.5">Applied to everyone in the team.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberField
          label="Employer on-costs"
          hint="National Insurance, pension"
          suffix="% of salary"
          step={0.5}
          value={shared.employerCostValue}
          onChange={(v) => updateShared("employerCostValue", v)}
        />
        <NumberField
          label="Overhead per person, per year"
          hint="Desk, laptop, software"
          prefix={symbol}
          step={250}
          value={shared.annualOverheadPerPerson}
          onChange={(v) => updateShared("annualOverheadPerPerson", v)}
        />
      </div>

      <div className="mt-5 pt-4 border-t border-[#e3e7ef] grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <span className="block text-xs font-medium text-[#1b2433] mb-1.5">
            Are these new hires?
          </span>
          <div className="inline-flex rounded-lg border border-[#d8dee9] p-0.5 bg-[#f4f6fa]">
            {[
              { newTeam: true, label: "Yes, new roles" },
              { newTeam: false, label: "No, replacing staff" },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={isNewTeam === option.newTeam}
                onClick={() => setNewTeam(option.newTeam)}
                className={`btn-tactile px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isNewTeam === option.newTeam
                    ? "bg-white text-[#0b2350] shadow-xs"
                    : "text-[#5b6577] hover:text-[#1b2433]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {isNewTeam && (
          <NumberField
            label="Recruiter fee per hire"
            hint="You avoid this by hiring through AgileIntel"
            prefix={symbol}
            step={500}
            value={shared.recruitmentCostPerPerson}
            onChange={(v) => updateShared("recruitmentCostPerPerson", v)}
          />
        )}
      </div>
    </div>
  );
};
