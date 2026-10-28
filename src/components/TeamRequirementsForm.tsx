"use client";

import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Globe2,
  Users,
  Briefcase,
} from "lucide-react";
import {
  CalculatorState,
  HiringSituation,
  CurrencyCode,
  RoleInput,
  createRoleFromBenchmark,
  createMarketResearchAnalystsDemo,
} from "../lib/calculatorEngine";
import { SALARY_BENCHMARKS } from "../data/benchmarks";
import { RoleRow } from "./RoleRow";
import {
  INDICATIVE_MANAGED_MODEL_PRESET,
} from "../lib/pricingConfig";

interface TeamRequirementsFormProps {
  state: CalculatorState;
  onChange: (newState: CalculatorState) => void;
}

export const TeamRequirementsForm: React.FC<TeamRequirementsFormProps> = ({
  state,
  onChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedRoleToAdd, setSelectedRoleToAdd] = useState<string>(
    SALARY_BENCHMARKS[0].role
  );

  const handleCountryChange = (country: string) => {
    let currency: CurrencyCode = "GBP";
    if (country === "United States") currency = "USD";
    else if (country === "Germany" || country === "Other European country")
      currency = "EUR";

    onChange({
      ...state,
      country,
      currency,
    });
  };

  const handleHiringSituationChange = (situation: HiringSituation) => {
    onChange({
      ...state,
      hiringSituation: situation,
      additionalCosts: {
        ...state.additionalCosts,
        avoidLocalRecruitment: situation === "new_team",
      },
    });
  };

  const handleLoadDemo = () => {
    const demo = createMarketResearchAnalystsDemo();
    if (state.pricingConfig.mode === "approved_managed_service") {
      demo.pricingConfig = { ...INDICATIVE_MANAGED_MODEL_PRESET };
    }
    onChange(demo);
  };

  const handleAddRole = (roleName?: string) => {
    const name = roleName || selectedRoleToAdd;
    let newRole: RoleInput;
    if (name === "custom") {
      newRole = createRoleFromBenchmark(undefined);
    } else {
      const bm = SALARY_BENCHMARKS.find((b) => b.role === name);
      newRole = createRoleFromBenchmark(bm);
    }
    onChange({
      ...state,
      roles: [...state.roles, newRole],
    });
  };

  const handleUpdateRole = (index: number, updated: RoleInput) => {
    const newRoles = [...state.roles];
    newRoles[index] = updated;
    onChange({
      ...state,
      roles: newRoles,
    });
  };

  const handleRemoveRole = (index: number) => {
    if (state.roles.length <= 1) {
      alert("At least one role is required for the calculation.");
      return;
    }
    const newRoles = state.roles.filter((_, i) => i !== index);
    onChange({
      ...state,
      roles: newRoles,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Country, Situation, and Demo Preset */}
      <div className="bg-white rounded-2xl border border-[#d8dee9] p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e3e7ef]">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1b2433] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#1f4fb4]" />
              Team Configuration & Scope
            </h3>
            <p className="text-xs text-[#5b6577] mt-0.5">
              Specify your proposed team roles, location, and hiring context.
            </p>
          </div>

          {/* Quick Demo Button with subtle animation */}
          <button
            type="button"
            onClick={handleLoadDemo}
            className="btn-tactile inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#0b2350] bg-[#e8eef9] hover:bg-[#d5ddee] border border-[#1f4fb4]/20 transition-all shadow-xs group"
          >
            <Sparkles className="w-4 h-4 text-[#1f4fb4] group-hover:rotate-12 transition-transform duration-300" />
            <span>Load 3x Market Research Analysts (Deck Demo)</span>
          </button>
        </div>

        {/* Location & Currency Row */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#5b6577] mb-1.5 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
              Current Team Hiring Location
            </label>
            <select
              value={state.country}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#d8dee9] text-sm font-semibold text-[#1b2433] bg-[#f4f6fa] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
            >
              <option value="United Kingdom">United Kingdom (GBP £ - Deck Benchmark)</option>
              <option value="United States">United States (USD $)</option>
              <option value="Germany">Germany (EUR €)</option>
              <option value="Other European country">Other European Country (EUR €)</option>
              <option value="Other">Other International Location</option>
            </select>
            {state.country !== "United Kingdom" && (
              <p className="mt-1 text-[11px] text-[#b45309] bg-[#fffbeb] p-1.5 rounded border border-[#f59e0b]/30 animate-fade-in">
                Note: The presentation supplies UK benchmarks. For {state.country},
                enter your local market salary in {state.currency} below.
              </p>
            )}
          </div>

          {/* Currency Display */}
          <div>
            <label className="block text-xs font-medium text-[#5b6577] mb-1.5">
              Financial Modeling Currency
            </label>
            <select
              value={state.currency}
              onChange={(e) =>
                onChange({ ...state, currency: e.target.value as CurrencyCode })
              }
              className="w-full px-3 py-2.5 rounded-lg border border-[#d8dee9] text-sm font-semibold text-[#1b2433] bg-[#f4f6fa] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
            >
              <option value="GBP">GBP (£ - British Pound)</option>
              <option value="USD">USD ($ - US Dollar)</option>
              <option value="EUR">EUR (€ - Euro)</option>
            </select>
            <p className="mt-1 text-[11px] text-[#5b6577]">
              All calculations use consistent currency without artificial exchange conversions.
            </p>
          </div>
        </div>

        {/* Hiring Situation Tabs */}
        <div className="mt-5 pt-4 border-t border-[#e3e7ef]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b6577] mb-2">
            Hiring Context (Affects First-Year Avoided Costs)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                id: "new_team",
                title: "Building a New Team",
                desc: "Local recruitment agency fees avoided by going offshore",
              },
              {
                id: "replace_roles",
                title: "Replacing Existing Roles",
                desc: "Notice/severance factored; recruitment fees not avoided",
              },
              {
                id: "move_tasks",
                title: "Moving Selected Tasks",
                desc: "Relieving senior staff of repetitive production workload",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleHiringSituationChange(tab.id as HiringSituation)}
                className={`btn-tactile p-3.5 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 ${
                  state.hiringSituation === tab.id
                    ? "bg-[#0b2350] text-white border-[#0b2350] shadow-sm"
                    : "bg-[#f4f6fa] text-[#1b2433] border-[#d8dee9] hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-bold">{tab.title}</div>
                <div
                  className={`text-[11px] mt-1 leading-snug ${
                    state.hiringSituation === tab.id
                      ? "text-slate-300"
                      : "text-[#5b6577]"
                  }`}
                >
                  {tab.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Builder Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-[#1b2433] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1f4fb4]" />
              Configured Team Roles ({state.roles.length})
            </h4>
            <p className="text-xs text-[#5b6577]">
              Pre-loaded from 31 August 2026 Glassdoor salary benchmarks. Customize headcount or salaries.
            </p>
          </div>

          {/* Add Role Selector */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRoleToAdd}
              onChange={(e) => setSelectedRoleToAdd(e.target.value)}
              className="text-xs font-medium text-[#1b2433] bg-white border border-[#d8dee9] rounded-lg px-2.5 py-2 outline-none focus:ring-1 focus:ring-[#1f4fb4] max-w-xs transition-colors"
            >
              {SALARY_BENCHMARKS.map((b) => (
                <option key={b.role} value={b.role}>
                  + {b.role} (£{b.ukSalaryGBP.toLocaleString()})
                </option>
              ))}
              <option value="custom">+ Custom Role</option>
            </select>
            <button
              type="button"
              onClick={() => handleAddRole()}
              className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#1f4fb4] hover:bg-[#255bd1] transition-all shadow-xs hover:shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-3.5">
          {state.roles.map((role, idx) => (
            <RoleRow
              key={role.id}
              role={role}
              index={idx}
              currency={state.currency}
              onUpdate={(updated) => handleUpdateRole(idx, updated)}
              onRemove={() => handleRemoveRole(idx)}
            />
          ))}
        </div>
      </div>

      {/* Advanced / Additional Costs Collapsible Drawer */}
      <div className="bg-white rounded-2xl border border-[#d8dee9] overflow-hidden transition-all duration-300">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-[#1b2433] hover:bg-[#f4f6fa] transition-colors"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#1f4fb4]" />
            <span>Advanced Offshore Transition & Setup Parameters</span>
            <span className="text-xs font-normal text-[#5b6577]">
              (Setup, Transition, Management Fee Overrides)
            </span>
          </div>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-slate-500 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500 transition-transform duration-200" />
          )}
        </button>

        {showAdvanced && (
          <div className="p-5 border-t border-[#e3e7ef] bg-[#f4f6fa]/50 space-y-4 text-xs animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[#5b6577] mb-1 font-medium">
                  One-time Setup Cost ({state.currency})
                </label>
                <input
                  type="number"
                  step="500"
                  value={state.additionalCosts.oneTimeOffshoreSetupCost}
                  onChange={(e) =>
                    onChange({
                      ...state,
                      additionalCosts: {
                        ...state.additionalCosts,
                        oneTimeOffshoreSetupCost: Math.max(
                          0,
                          parseFloat(e.target.value) || 0
                        ),
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#d8dee9] rounded text-xs font-medium text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
                />
                <span className="text-[10px] text-[#5b6577] mt-0.5 block">
                  Workstations, VPN, software setup (default: £1.5k/person)
                </span>
              </div>

              <div>
                <label className="block text-[#5b6577] mb-1 font-medium">
                  One-time Transition Cost ({state.currency})
                </label>
                <input
                  type="number"
                  step="500"
                  value={state.additionalCosts.oneTimeTransitionCost}
                  onChange={(e) =>
                    onChange({
                      ...state,
                      additionalCosts: {
                        ...state.additionalCosts,
                        oneTimeTransitionCost: Math.max(
                          0,
                          parseFloat(e.target.value) || 0
                        ),
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#d8dee9] rounded text-xs font-medium text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
                />
                <span className="text-[10px] text-[#5b6577] mt-0.5 block">
                  Knowledge transfer, workflows (default: £2.5k pod)
                </span>
              </div>

              <div>
                <label className="block text-[#5b6577] mb-1 font-medium">
                  Additional Offshore Annual Management Fee ({state.currency})
                </label>
                <input
                  type="number"
                  step="500"
                  value={state.additionalCosts.annualOffshoreManagementFee}
                  onChange={(e) =>
                    onChange({
                      ...state,
                      additionalCosts: {
                        ...state.additionalCosts,
                        annualOffshoreManagementFee: Math.max(
                          0,
                          parseFloat(e.target.value) || 0
                        ),
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#d8dee9] rounded text-xs font-medium text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
                />
                <span className="text-[10px] text-[#5b6577] mt-0.5 block">
                  Any agreed bespoke SLA or dedicated account lead fee
                </span>
              </div>

              <div>
                <label className="block text-[#5b6577] mb-1 font-medium">
                  Other Annual Offshore Costs ({state.currency})
                </label>
                <input
                  type="number"
                  step="500"
                  value={state.additionalCosts.otherAnnualOffshoreCosts}
                  onChange={(e) =>
                    onChange({
                      ...state,
                      additionalCosts: {
                        ...state.additionalCosts,
                        otherAnnualOffshoreCosts: Math.max(
                          0,
                          parseFloat(e.target.value) || 0
                        ),
                      },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-[#d8dee9] rounded text-xs font-medium text-[#1b2433] focus:ring-1 focus:ring-[#1f4fb4] outline-none"
                />
                <span className="text-[10px] text-[#5b6577] mt-0.5 block">
                  Dedicated software licenses or travel budget
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="avoid-recruit-toggle"
                checked={state.additionalCosts.avoidLocalRecruitment}
                onChange={(e) =>
                  onChange({
                    ...state,
                    additionalCosts: {
                      ...state.additionalCosts,
                      avoidLocalRecruitment: e.target.checked,
                    },
                  })
                }
                className="w-4 h-4 text-[#1f4fb4] rounded border-slate-300 focus:ring-[#1f4fb4]"
              />
              <label
                htmlFor="avoid-recruit-toggle"
                className="text-xs font-medium text-[#1b2433] cursor-pointer"
              >
                Count avoided local recruitment agency fees towards first-year net savings
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
