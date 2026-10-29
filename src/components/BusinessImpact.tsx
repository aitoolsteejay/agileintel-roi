"use client";

import React, { useId, useState } from "react";
import {
  Clock,
  Headset,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { CalculationResult, calculateBusinessImpact } from "../lib/calculatorEngine";
import { formatCurrency, formatPercent, getCurrencySymbol } from "../lib/formatters";
import { AnimatedNumber } from "./AnimatedNumber";
import { Reveal } from "./Reveal";
import { CostOverTimeChart } from "./CostOverTimeChart";

// Wording and figures from the AgileIntel Offshoring B2B Events Introduction 2026 deck
const BENEFITS = [
  {
    icon: Headset,
    title: "Your senior team leads the event",
    text: "Your India team powers the operations behind it, from market research to post-event reporting.",
  },
  {
    icon: ShieldCheck,
    title: "You manage the work. We manage the operation.",
    text: "AgileIntel handles recruitment, HR, payroll, benefits, compliance, IT, team management and performance monitoring.",
  },
  {
    icon: Clock,
    title: "Faster to hire",
    text: "28–39 days to hire in India, against 36–44 days in the UK.",
  },
];

// Case study 2 in the deck
const PROOF_POINTS = [
  { value: 10000, prefix: "", suffix: "+", label: "companies tiered" },
  { value: 50000, prefix: "", suffix: "+", label: "contacts enriched" },
  { value: 20, prefix: "+", suffix: "%", label: "positive reply rate" },
  { value: 10, prefix: "+", suffix: "%", label: "discovery calls booked" },
];

/** 2.3, or 2 rather than 2.0 */
const formatMultiple = (n: number) => String(Number(n.toFixed(1)));

interface MetricTileProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  hint: string;
}

const MetricTile: React.FC<MetricTileProps> = ({ icon: Icon, label, value, hint }) => (
  <div className="h-full bg-white rounded-2xl border border-[#d8dee9] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center gap-2 text-xs font-semibold text-[#5b6577]">
      <span className="p-1.5 rounded-lg bg-[#e8eef9] text-[#1f4fb4]">
        <Icon className="w-4 h-4" />
      </span>
      {label}
    </div>
    <p className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b2350] tabular-nums">
      {value}
    </p>
    <p className="mt-1 text-xs leading-relaxed text-[#5b6577]">{hint}</p>
  </div>
);

interface BusinessImpactProps {
  results: CalculationResult;
}

export const BusinessImpact: React.FC<BusinessImpactProps> = ({ results }) => {
  const [profit, setProfit] = useState(0);
  const profitId = useId();

  const impact = calculateBusinessImpact(results);
  const currency = results.currency;
  const headcount = results.totalHeadcount;
  const hasSaving = impact.annualSaving > 0;
  const money = (n: number) => formatCurrency(n, currency);

  const multiple = impact.capacityMultiple ?? 0;
  const capacityHint =
    impact.indiaHeadcountForSameSpend !== null && impact.indiaHeadcountForSameSpend > headcount
      ? `What you spend on ${headcount} ${headcount === 1 ? "person" : "people"} today could fund ${impact.indiaHeadcountForSameSpend} in India.`
      : `Your budget goes ${formatMultiple(multiple)}× as far in India.`;

  return (
    <div className="mt-12">
      <Reveal>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b2350]">
          What this means for your business
        </h2>
        <p className="text-sm text-[#5b6577] mt-1 max-w-3xl">
          Not a staffing vendor. An extension of your team: your team in India, managed by
          AgileIntel.
        </p>
      </Reveal>

      {hasSaving ? (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Reveal>
              <MetricTile
                icon={TrendingUp}
                label="Estimated profit gain"
                value={
                  <>
                    +<AnimatedNumber value={impact.annualSaving} format={money} /> a year
                  </>
                }
                hint="What you save on the team goes straight to your bottom line."
              />
            </Reveal>
            <Reveal delay={100}>
              <MetricTile
                icon={Users}
                label="Same budget, bigger team"
                value={
                  <>
                    <AnimatedNumber value={multiple} format={formatMultiple} />× the team
                  </>
                }
                hint={capacityHint}
              />
            </Reveal>
          </div>

          {/* Optional: turn the saving into a profit uplift */}
          <Reveal className="mt-4">
            <div className="bg-white rounded-2xl border border-[#d8dee9] p-4 sm:px-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <label htmlFor={profitId} className="text-sm font-semibold text-[#1b2433]">
                Your yearly profit today
                <span className="block text-[11px] font-normal text-[#5b6577]">
                  Optional. Stays on this page.
                </span>
              </label>
              <div className="relative sm:w-44">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#5b6577]">
                  {getCurrencySymbol(currency)}
                </span>
                <input
                  id={profitId}
                  type="number"
                  min="0"
                  step="10000"
                  placeholder="e.g. 500000"
                  value={profit || ""}
                  onChange={(e) => setProfit(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="no-spin w-full pl-7 pr-3 py-2 border border-[#d8dee9] rounded-lg text-sm font-semibold text-[#1b2433] focus:ring-2 focus:ring-[#1f4fb4] outline-none transition-colors"
                />
              </div>
              <p className="text-sm text-[#5b6577] sm:ml-auto" aria-live="polite">
                {profit > 0 ? (
                  <span className="animate-fade-in">
                    That could lift your profit by{" "}
                    <AnimatedNumber
                      value={(impact.annualSaving / profit) * 100}
                      format={(n) => formatPercent(n, 0)}
                      className="text-lg font-extrabold text-[#0d8a56] tabular-nums"
                    />
                    .
                  </span>
                ) : (
                  "Enter it to see the saving as a share of your profit."
                )}
              </p>
            </div>
          </Reveal>
        </>
      ) : (
        <p className="mt-5 text-sm text-[#5b6577] bg-white rounded-2xl border border-[#d8dee9] p-5">
          With these figures the India team doesn&apos;t cost less, so there&apos;s no profit
          gain to show. Check the salaries above.
        </p>
      )}

      {/* Cost over time: chart plus the same numbers as a table */}
      <Reveal className="mt-4">
        <div className="bg-white rounded-2xl border border-[#d8dee9] p-5 sm:p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#1b2433]">
            Total cost over 1, 3 and 5 years
          </h3>
          <p className="text-xs text-[#5b6577] mt-0.5">Base salaries only, at today&apos;s rates.</p>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-3">
              <CostOverTimeChart
                projections={impact.projections}
                currency={currency}
                indiaLabel="Same roles in India"
              />
            </div>
            <table className="lg:col-span-2 w-full text-xs tabular-nums">
              <caption className="sr-only">Total cost and saving at 1, 3 and 5 years</caption>
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-[#5b6577]">
                  <th scope="col" className="text-left font-semibold pb-2">Period</th>
                  <th scope="col" className="text-right font-semibold pb-2">Current</th>
                  <th scope="col" className="text-right font-semibold pb-2">India</th>
                  <th scope="col" className="text-right font-semibold pb-2">Saving</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3e7ef]">
                {impact.projections.map((p) => (
                  <tr key={p.years}>
                    <th scope="row" className="text-left font-semibold text-[#1b2433] py-2.5">
                      {p.years} year{p.years === 1 ? "" : "s"}
                    </th>
                    <td className="text-right text-[#1b2433]">{money(p.currentCost)}</td>
                    <td className="text-right text-[#1b2433]">{money(p.indiaCost)}</td>
                    <td className="text-right font-bold text-[#0d8a56]">{money(p.saving)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Beyond cost, and proof it works */}
      <Reveal className="mt-4">
        <div className="bg-[#0b2350] rounded-2xl p-5 sm:p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3">
                <Icon className="w-5 h-5 shrink-0 text-[#8fb0f0] mt-0.5" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="text-xs leading-relaxed text-slate-300 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8fb0f0]">
              Case study: global B2B events and conference organiser
            </p>
            <dl className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              {PROOF_POINTS.map((p) => (
                <div key={p.label}>
                  <dt className="sr-only">{p.label}</dt>
                  <dd className="text-xl sm:text-2xl font-extrabold tabular-nums">
                    <AnimatedNumber
                      value={p.value}
                      format={(n) =>
                        `${p.prefix}${Math.round(n).toLocaleString("en-GB")}${p.suffix}`
                      }
                      countUpOnView
                      duration={1600}
                    />
                  </dd>
                  <dd className="text-xs text-slate-300">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <p className="mt-3 text-[11px] leading-relaxed text-[#5b6577]">
        Estimates use the salaries above and aren&apos;t a guaranteed saving. Case study and
        hiring figures are from AgileIntel&apos;s Offshoring B2B Events Introduction 2026.
      </p>
    </div>
  );
};
