"use client";

import React, { useState } from "react";
import { SALARY_BENCHMARKS, SALARY_BENCHMARKS_SOURCE_NOTE } from "../data/benchmarks";
import { Search, Plus, Filter, Info, Check } from "lucide-react";
import { formatCurrency, formatPercent } from "../lib/formatters";
import { RoleInput, createRoleFromBenchmark } from "../lib/calculatorEngine";

interface SalaryBenchmarkTableProps {
  onAddRole: (role: RoleInput) => void;
}

export const SalaryBenchmarkTable: React.FC<SalaryBenchmarkTableProps> = ({
  onAddRole,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFunction, setSelectedFunction] = useState<string>("all");
  const [addedRoles, setAddedRoles] = useState<Record<string, boolean>>({});

  const functions = [
    "all",
    ...Array.from(new Set(SALARY_BENCHMARKS.map((b) => b.function))),
  ];

  const filtered = SALARY_BENCHMARKS.filter((b) => {
    const matchesSearch =
      b.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.function.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFunction =
      selectedFunction === "all" || b.function === selectedFunction;
    return matchesSearch && matchesFunction;
  });

  const handleAdd = (roleName: string) => {
    const bm = SALARY_BENCHMARKS.find((b) => b.role === roleName);
    if (bm) {
      onAddRole(createRoleFromBenchmark(bm));
      setAddedRoles((prev) => ({ ...prev, [roleName]: true }));
      setTimeout(() => {
        setAddedRoles((prev) => ({ ...prev, [roleName]: false }));
      }, 2000);
    }
  };

  return (
    <section id="benchmarks" className="py-20 bg-white border-b border-[#d8dee9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
            Salary Data Source of Truth
          </span>
          <h2 className="mt-2 text-3xl font-bold text-[#1b2433]">
            Verified Salary Benchmark Dataset
          </h2>
          <p className="mt-2 text-sm text-[#5b6577]">
            Exact role-level benchmarks presented in Slide 4. Figures represent indicative
            annual base salaries in GBP and exclude AgileIntel management fees and employer on-costs.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search benchmark role (e.g. Data Scientist, Copywriter)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d8dee9] rounded-xl text-sm font-medium text-[#1b2433] bg-[#f4f6fa] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#5b6577]" />
            <select
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
              className="px-3 py-2 border border-[#d8dee9] rounded-xl text-sm font-medium text-[#1b2433] bg-white focus:ring-2 focus:ring-[#1f4fb4] outline-none"
            >
              <option value="all">All Functions (24 Roles)</option>
              {functions
                .filter((f) => f !== "all")
                .map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#d8dee9] shadow-sm bg-white">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#0b2350] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 sm:px-6">Role</th>
                <th className="py-3.5 px-4">Function</th>
                <th className="py-3.5 px-4 text-right">UK Base (£)</th>
                <th className="py-3.5 px-4 text-right">India Base (£)</th>
                <th className="py-3.5 px-4 text-right">Deck Stated Saving</th>
                <th className="py-3.5 px-4 text-right">Calculated Saving</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e3e7ef]">
              {filtered.map((b) => {
                const calculatedSaving =
                  b.ukSalaryGBP > 0
                    ? ((b.ukSalaryGBP - b.indiaSalaryGBP) / b.ukSalaryGBP) * 100
                    : 0;

                return (
                  <tr
                    key={b.role}
                    className="hover:bg-[#f4f6fa] transition-colors text-xs sm:text-sm"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1b2433]">
                      <div>{b.role}</div>
                      {b.notes && (
                        <div className="text-[11px] font-normal text-[#5b6577] mt-0.5">
                          {b.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#5b6577]">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8eef9] text-[#1f4fb4]">
                        {b.function}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-[#1b2433]">
                      {formatCurrency(b.ukSalaryGBP, "GBP")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-[#1f4fb4]">
                      {formatCurrency(b.indiaSalaryGBP, "GBP")}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-[#0d8a56]">
                      {b.statedSavingPercent}%
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs text-[#5b6577]">
                      {formatPercent(calculatedSaving, 1)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleAdd(b.role)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          addedRoles[b.role]
                            ? "bg-[#ecfdf5] text-[#0d8a56] border border-[#0d8a56]"
                            : "bg-[#f4f6fa] hover:bg-[#e8eef9] text-[#0b2350] border border-[#d8dee9]"
                        }`}
                      >
                        {addedRoles[b.role] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Source Note Box */}
        <div className="mt-4 p-4 rounded-xl bg-[#f4f6fa] border border-[#d8dee9] flex items-start gap-2.5 text-xs text-[#5b6577]">
          <Info className="w-4 h-4 text-[#1f4fb4] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1b2433] block mb-0.5">
              Source Attribution & Methodological Note:
            </strong>
            <p>{SALARY_BENCHMARKS_SOURCE_NOTE}</p>
            <p className="mt-1 text-[11px] text-[#7e8b9f]">
              Slide 4 benchmark averages: UK £47,590 vs India £24,460 across 24 roles (49% average saving).
              All figures represent base compensation; total employer cost and AgileIntel management fees vary by contract terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
