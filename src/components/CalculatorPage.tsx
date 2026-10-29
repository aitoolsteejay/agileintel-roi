"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { TeamRequirementsForm } from "./TeamRequirementsForm";
import { ResultsSummary } from "./ResultsSummary";
import { BusinessImpact } from "./BusinessImpact";
import { Reveal } from "./Reveal";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { Footer } from "./Footer";
import {
  CalculatorState,
  calculateTeamEconomics,
  createDefaultCalculatorState,
} from "../lib/calculatorEngine";

export const CalculatorPage: React.FC = () => {
  // Initialize with clean default state
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(() =>
    createDefaultCalculatorState()
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

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-[#1b2433] flex flex-col font-sans">
      <Navbar />

      <Hero onCalculateClick={() => scrollTo("calculator")} />

      {/* Main Interactive Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b2350] mb-6">
          Estimate your savings
        </h2>

        {/* Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-7">
            <TeamRequirementsForm
              state={calculatorState}
              onChange={setCalculatorState}
            />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={120}>
            <ResultsSummary
              results={results}
              onGetQuoteClick={() => scrollTo("lead-form")}
            />
          </Reveal>
        </div>

        <BusinessImpact results={results} />
      </section>

      {/* Lead Generation & Calendly Flow */}
      <LeadCaptureForm state={calculatorState} results={results} />

      <Footer />
    </div>
  );
};
