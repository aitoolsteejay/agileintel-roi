"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TeamRequirementsForm } from "./TeamRequirementsForm";
import { ResultsSummary } from "./ResultsSummary";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { Footer } from "./Footer";
import {
  CalculatorState,
  calculateTeamEconomics,
  createDefaultCalculatorState,
} from "../lib/calculatorEngine";
import {
  DEFAULT_PRICING_CONFIG,
  INDICATIVE_MANAGED_MODEL_PRESET,
} from "../lib/pricingConfig";

const COMPARISON_MODES = [
  { managed: false, label: "Salaries only" },
  { managed: true, label: "Full cost" },
];

export const CalculatorPage: React.FC = () => {
  // Initialize with clean default state
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(() =>
    createDefaultCalculatorState()
  );

  // Compute live economics reactively
  const results = useMemo(() => {
    return calculateTeamEconomics(calculatorState);
  }, [calculatorState]);

  const isManaged = calculatorState.pricingConfig.mode === "approved_managed_service";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const setManaged = (managed: boolean) => {
    setCalculatorState((prev) => ({
      ...prev,
      pricingConfig: managed
        ? { ...INDICATIVE_MANAGED_MODEL_PRESET }
        : { ...DEFAULT_PRICING_CONFIG },
    }));
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1b2433] flex flex-col font-sans">
      <Navbar />

      <Hero onCalculateClick={() => scrollTo("calculator")} />

      {/* Main Interactive Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Heading + the one control that switches what's being compared */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2350]">
            Estimate your savings
          </h2>
          <div className="bg-white rounded-xl p-1 border border-[#d8dee9] shadow-xs inline-flex self-start sm:self-auto">
            {COMPARISON_MODES.map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={isManaged === option.managed}
                onClick={() => setManaged(option.managed)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isManaged === option.managed
                    ? "bg-[#0b2350] text-white shadow-xs"
                    : "text-[#5b6577] hover:text-[#1b2433]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <TeamRequirementsForm
              state={calculatorState}
              onChange={setCalculatorState}
              isManaged={isManaged}
            />
          </div>

          <div className="lg:col-span-5">
            <ResultsSummary
              results={results}
              onGetQuoteClick={() => scrollTo("lead-form")}
            />
          </div>
        </div>
      </section>

      {/* Lead Generation & Calendly Flow */}
      <LeadCaptureForm state={calculatorState} results={results} />

      <Footer />
    </div>
  );
};
