"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { HowEstimateWorks } from "./HowEstimateWorks";
import { TeamRequirementsForm } from "./TeamRequirementsForm";
import { ResultsSummary } from "./ResultsSummary";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { SalaryBenchmarkTable } from "./SalaryBenchmarkTable";
import { CaseStudiesSection } from "./CaseStudiesSection";
import { ImplementationTimeline } from "./ImplementationTimeline";
import { GovernanceSecuritySection } from "./GovernanceSecuritySection";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { MethodologyDisclosure } from "./MethodologyDisclosure";
import { Footer } from "./Footer";
import {
  CalculatorState,
  calculateTeamEconomics,
  createMarketResearchAnalystsDemo,
  RoleInput,
} from "../lib/calculatorEngine";
import {
  DEFAULT_PRICING_CONFIG,
  INDICATIVE_MANAGED_MODEL_PRESET,
} from "../lib/pricingConfig";
import { ShieldAlert, Sparkles, Building2, Layers } from "lucide-react";

export const CalculatorPage: React.FC = () => {
  // Initialize with the deck's illustrative Market Research Analysts demo
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(() =>
    createMarketResearchAnalystsDemo()
  );

  // Compute live economics reactively
  const results = useMemo(() => {
    return calculateTeamEconomics(calculatorState);
  }, [calculatorState]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleManagedModel = () => {
    if (calculatorState.pricingConfig.mode === "approved_managed_service") {
      setCalculatorState((prev) => ({
        ...prev,
        pricingConfig: { ...DEFAULT_PRICING_CONFIG },
      }));
    } else {
      setCalculatorState((prev) => ({
        ...prev,
        pricingConfig: { ...INDICATIVE_MANAGED_MODEL_PRESET },
      }));
    }
  };

  const handleAddRoleFromTable = (newRole: RoleInput) => {
    setCalculatorState((prev) => ({
      ...prev,
      roles: [...prev.roles, newRole],
    }));
    // Scroll gently to the calculator so the user sees the added role
    scrollTo("calculator");
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1b2433] flex flex-col font-sans">
      <Navbar />

      <Hero
        onCalculateClick={() => scrollTo("calculator")}
        onHowItWorksClick={() => scrollTo("how-it-works")}
      />

      {/* Main Interactive Calculator Section */}
      <section id="calculator" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#1f4fb4]">
              Interactive ROI Engine
            </span>
            <h2 className="mt-1 text-3xl font-extrabold text-[#0b2350]">
              AgileIntel Offshore Team Savings & Capacity Calculator
            </h2>
            <p className="mt-2 text-sm text-[#5b6577] max-w-2xl">
              Model your delivery team in India. Compare direct base salaries against
              UK market rates or simulate a fully managed offshore pod.
            </p>
          </div>

          {/* Pricing Model Selector Pill */}
          <div className="bg-white rounded-xl p-1 border border-[#d8dee9] shadow-xs flex items-center self-start">
            <button
              type="button"
              onClick={() => {
                if (calculatorState.pricingConfig.mode !== "salary_only") {
                  handleToggleManagedModel();
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                calculatorState.pricingConfig.mode === "salary_only"
                  ? "bg-[#0b2350] text-white shadow-xs"
                  : "text-[#5b6577] hover:text-[#1b2433]"
              }`}
            >
              Salary-Only Benchmark
            </button>
            <button
              type="button"
              onClick={() => {
                if (calculatorState.pricingConfig.mode !== "approved_managed_service") {
                  handleToggleManagedModel();
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                calculatorState.pricingConfig.mode === "approved_managed_service"
                  ? "bg-[#1f4fb4] text-white shadow-xs"
                  : "text-[#5b6577] hover:text-[#1b2433]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Indicative Managed Model</span>
            </button>
          </div>
        </div>

        {/* Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <TeamRequirementsForm
              state={calculatorState}
              onChange={setCalculatorState}
            />
          </div>

          {/* Right Column: Sticky Results Summary (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <ResultsSummary
              results={results}
              onGetProposalClick={() => scrollTo("lead-form")}
              onToggleManagedModel={handleToggleManagedModel}
            />
          </div>
        </div>
      </section>

      {/* Supporting Sections */}
      <HowEstimateWorks />
      <CapabilitiesSection />
      <SalaryBenchmarkTable onAddRole={handleAddRoleFromTable} />
      <CaseStudiesSection />
      <ImplementationTimeline />
      <GovernanceSecuritySection />
      <LeadCaptureForm state={calculatorState} results={results} />
      <MethodologyDisclosure />
      <Footer />
    </div>
  );
};
