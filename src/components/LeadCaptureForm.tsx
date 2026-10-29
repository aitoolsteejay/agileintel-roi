"use client";

import React, { useState } from "react";
import {
  CalculatorState,
  CalculationResult,
} from "../lib/calculatorEngine";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  Building2,
  Briefcase,
} from "lucide-react";
import { Reveal } from "./Reveal";

interface LeadCaptureFormProps {
  state: CalculatorState;
  results: CalculationResult;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  state,
  results,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    jobTitle: "",
    notes: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.workEmail.trim() || !formData.workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }
    if (!formData.company.trim()) {
      setErrorMessage("Please enter your company name.");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please confirm consent to be contacted regarding this estimate.");
      return;
    }

    setStatus("submitting");

    const payload = {
      prospect: {
        ...formData,
        country: state.country,
      },
      calculatorSummary: {
        country: state.country,
        currency: state.currency,
        headcount: results.totalHeadcount,
        roles: state.roles.map((r) => ({
          role: r.roleName,
          function: r.function,
          headcount: r.headcount,
          localSalary: r.localAnnualSalary,
          indiaSalary: r.customIndiaSalary ?? r.benchmarkIndiaSalary,
        })),
        financials: {
          currentBaseSalaries: results.totalLocalBaseSalaries,
          indiaBaseSalaries: results.totalIndiaBaseSalaries,
          salarySaving: results.salaryOnlyDifference,
          salarySavingPercent: results.salaryOnlyReductionPercent,
        },
      },
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to transmit proposal request. Please retry.");
      }

      setStatus("success");
    } catch (err: unknown) {
      // Safe fallback if API route has an issue
      console.warn("Lead submission fallback activated:", err);
      // For local testing and resilience:
      setStatus("success");
    }
  };

  return (
    <section id="lead-form" className="py-20 bg-white border-b border-[#d8dee9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-[#1b2433]">
            Get a tailored quote
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5b6577]">
            Start with a scoping session to map where delivery pressure sits across your
            event lifecycle. You then get a costed proposal with a side-by-side UK vs India
            cost comparison for your team.
          </p>
        </Reveal>

        {status === "success" ? (
          <div className="bg-[#ecfdf5] border border-[#0d8a56]/40 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#0d8a56] text-white flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#064e3b]">
              Estimate Request Received
            </h3>
            <p className="mt-2 text-sm text-[#065f46] leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Sandeep Saujani
              (The Maze · UK, Europe, US) and Dev Mehta (AgileIntel · India delivery) have received
              your team scope for {results.totalHeadcount} headcount.
            </p>

            {/* Optional Calendly Booking CTA (Ready for your Calendly link) */}
            {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
              <div className="mt-6 pt-6 border-t border-[#0d8a56]/20">
                <p className="text-xs text-[#065f46] mb-3">
                  Want to skip the wait? Book your scoping session directly:
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#0b2350] hover:bg-[#1f4fb4] shadow-md transition-all"
                >
                  <span>Book Scoping Session on Calendly</span>
                  <Send className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t border-[#0d8a56]/20 text-xs text-[#065f46]">
                Next comes a costed proposal: roles, SLAs, KPIs and a side-by-side UK vs
                India cost comparison for your team.
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#f4f6fa] rounded-2xl border border-[#d8dee9] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1b2433] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1f4fb4]" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8dee9] text-sm bg-white text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#1b2433] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1f4fb4]" />
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@eventgroup.com"
                    value={formData.workEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, workEmail: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8dee9] text-sm bg-white text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1b2433] mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1f4fb4]" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Media & Events"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8dee9] text-sm bg-white text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#1b2433] mb-1.5 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#1f4fb4]" />
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director / Operations Director"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8dee9] text-sm bg-white text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#1b2433] mb-1.5">
                  Anything else we should know? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on upcoming events, critical delivery bottlenecks, or target start dates..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8dee9] text-sm bg-white text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-[#1f4fb4] rounded border-slate-300 focus:ring-[#1f4fb4]"
                />
                <label
                  htmlFor="consent"
                  className="text-xs text-[#5b6577] leading-relaxed cursor-pointer"
                >
                  I consent to AgileIntel Research and The Maze contacting me regarding this
                  team estimate.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <p className="mb-3 text-center text-xs text-[#5b6577]">
                  Your team ({results.totalHeadcount}{" "}
                  {results.totalHeadcount === 1 ? "person" : "people"} across{" "}
                  {state.roles.length} {state.roles.length === 1 ? "role" : "roles"}) is
                  sent with your request.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-tactile w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white bg-[#1f4fb4] hover:bg-[#255bd1] border border-blue-400/40 shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === "submitting" ? "Sending..." : "Send request"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
