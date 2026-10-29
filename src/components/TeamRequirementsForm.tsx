"use client";

import React from "react";
import {
  CalculatorState,
  CurrencyCode,
  RoleInput,
  createRoleFromBenchmark,
} from "../lib/calculatorEngine";
import { SALARY_BENCHMARKS } from "../data/benchmarks";
import { getCurrencySymbol } from "../lib/formatters";
import { BenchmarkRoleOptions, ROLE_GRID_COLUMNS, RoleRow } from "./RoleRow";

const LOCATIONS: { country: string; currency: CurrencyCode; label: string }[] = [
  { country: "United Kingdom", currency: "GBP", label: "United Kingdom (£)" },
  { country: "United States", currency: "USD", label: "United States ($)" },
  { country: "Europe", currency: "EUR", label: "Europe (€)" },
];

interface TeamRequirementsFormProps {
  state: CalculatorState;
  onChange: (newState: CalculatorState) => void;
}

export const TeamRequirementsForm: React.FC<TeamRequirementsFormProps> = ({
  state,
  onChange,
}) => {
  const handleCountryChange = (country: string) => {
    const location = LOCATIONS.find((l) => l.country === country) ?? LOCATIONS[0];
    onChange({ ...state, country: location.country, currency: location.currency });
  };

  const handleAddRole = (roleName: string) => {
    const bm = SALARY_BENCHMARKS.find((b) => b.role === roleName);
    onChange({ ...state, roles: [...state.roles, createRoleFromBenchmark(bm)] });
  };

  const handleUpdateRole = (index: number, updated: RoleInput) => {
    const newRoles = [...state.roles];
    newRoles[index] = updated;
    onChange({ ...state, roles: newRoles });
  };

  const handleRemoveRole = (index: number) => {
    if (state.roles.length <= 1) return;
    onChange({ ...state, roles: state.roles.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#d8dee9] p-5 sm:p-6 shadow-sm">
        {/* Location (also sets the currency) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label htmlFor="team-location" className="text-sm font-semibold text-[#1b2433]">
            Where is your team today?
          </label>
          <select
            id="team-location"
            value={state.country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#d8dee9] text-sm font-semibold text-[#1b2433] bg-[#f4f6fa] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
          >
            {LOCATIONS.map((l) => (
              <option key={l.country} value={l.country}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        {state.country !== "United Kingdom" && (
          <p className="mt-2 text-[11px] text-[#b45309] bg-[#fffbeb] p-2 rounded border border-[#f59e0b]/30 animate-fade-in">
            The salaries start as UK figures in pounds. Enter your current salaries in{" "}
            {getCurrencySymbol(state.currency)} and the India salaries will follow.
          </p>
        )}

        {/* Roles */}
        <div className="mt-6 pt-5 border-t border-[#e3e7ef]">
          <h3 className="text-sm font-semibold text-[#1b2433]">Which roles do you need?</h3>
          <p className="text-xs text-[#5b6577] mt-0.5">
            Yearly base salary per person, pre-filled from AgileIntel&apos;s benchmarks.
            Change the current salary and the India salary follows at that role&apos;s
            benchmarked saving.
          </p>

          <div
            className={`hidden sm:grid gap-x-3 mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#5b6577] ${ROLE_GRID_COLUMNS}`}
          >
            <span>Role</span>
            <span>People</span>
            <span>Current salary</span>
            <span>India salary</span>
            <span />
          </div>

          <div className="divide-y divide-[#e3e7ef]">
            {state.roles.map((role, idx) => (
              <RoleRow
                key={role.id}
                role={role}
                currency={state.currency}
                canRemove={state.roles.length > 1}
                onUpdate={(updated) => handleUpdateRole(idx, updated)}
                onRemove={() => handleRemoveRole(idx)}
              />
            ))}
          </div>

          <select
            aria-label="Add another role"
            value=""
            onChange={(e) => {
              if (e.target.value) handleAddRole(e.target.value);
            }}
            className="mt-3 w-full sm:w-auto px-3 py-2 rounded-lg border border-dashed border-[#1f4fb4]/50 text-sm font-semibold text-[#1f4fb4] bg-white hover:bg-[#e8eef9] focus:ring-2 focus:ring-[#1f4fb4] outline-none cursor-pointer transition-colors"
          >
            <option value="">+ Add another role</option>
            <BenchmarkRoleOptions />
            <option value="custom">Custom role</option>
          </select>
        </div>
    </div>
  );
};
