"use client";

import React, { useRef, useState } from "react";
import { CostProjection, CurrencyCode } from "../lib/calculatorEngine";
import { formatCompactCurrency, formatCurrency } from "../lib/formatters";
import { useInView } from "../lib/motion";

// Validated pair (dataviz palette check): current team, then India team
const CURRENT_COLOR = "bg-[#5b8def]";
const INDIA_COLOR = "bg-[#1f4fb4]";

/** Round the axis top up to a clean step so ticks read 0 / 100K / 200K. */
function niceScale(max: number, tickCount = 4): { top: number; ticks: number[] } {
  if (max <= 0) return { top: 1, ticks: [0] };
  const rough = max / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? rough;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top + step / 2; v += step) ticks.push(v);
  return { top, ticks };
}

const periodLabel = (years: number) => `${years} year${years === 1 ? "" : "s"}`;

interface CostOverTimeChartProps {
  projections: CostProjection[];
  currency: CurrencyCode;
  indiaLabel: string;
}

/** Grouped columns comparing the two options' total cost at 1, 3 and 5 years. */
export const CostOverTimeChart: React.FC<CostOverTimeChartProps> = ({
  projections,
  currency,
  indiaLabel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "0px 0px -10% 0px");
  const [active, setActive] = useState<number | null>(null);

  const max = Math.max(...projections.flatMap((p) => [p.currentCost, p.indiaCost]), 0);
  const { top, ticks } = niceScale(max);
  const heightPct = (value: number) => (inView ? `${(Math.max(0, value) / top) * 100}%` : "0%");

  const series = [
    { key: "currentCost" as const, label: "Your current team", color: CURRENT_COLOR },
    { key: "indiaCost" as const, label: indiaLabel, color: INDIA_COLOR },
  ];

  return (
    <div ref={ref}>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5b6577]">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex">
        {/* Y-axis ticks */}
        <div className="relative w-12 shrink-0 h-52 text-[10px] text-[#5b6577] tabular-nums" aria-hidden="true">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-2 translate-y-1/2"
              style={{ bottom: `${(t / top) * 100}%` }}
            >
              {formatCompactCurrency(t, currency)}
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          {/* Plot */}
          <div className="relative h-52">
            {ticks.map((t) => (
              <div
                key={t}
                className={`absolute inset-x-0 border-t ${t === 0 ? "border-[#c3cbd9]" : "border-[#eef1f6]"}`}
                style={{ bottom: `${(t / top) * 100}%` }}
                aria-hidden="true"
              />
            ))}

            <div className="absolute inset-0 flex">
              {projections.map((p, i) => (
                <div
                  key={p.years}
                  tabIndex={0}
                  role="group"
                  aria-label={`${periodLabel(p.years)}: your current team ${formatCurrency(p.currentCost, currency)}, ${indiaLabel} ${formatCurrency(p.indiaCost, currency)}, saving ${formatCurrency(p.saving, currency)}`}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`relative flex-1 h-full flex items-end justify-center gap-3 rounded-t-lg outline-none transition-colors ${
                    active === i ? "bg-[#f4f6fa]" : ""
                  }`}
                >
                  {series.map((s, si) => (
                    <div
                      key={s.key}
                      className={`relative w-6 rounded-t-[4px] ${s.color} transition-[height,filter] duration-700 ease-out motion-reduce:transition-none ${
                        active === i ? "brightness-110" : ""
                      }`}
                      style={{
                        height: heightPct(p[s.key]),
                        transitionDelay: inView ? `${i * 90 + si * 60}ms` : undefined,
                      }}
                    >
                      <span
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-[10px] font-semibold text-[#1b2433] whitespace-nowrap transition-opacity duration-300 ${
                          inView ? "opacity-100 delay-700" : "opacity-0"
                        }`}
                      >
                        {formatCompactCurrency(p[s.key], currency)}
                      </span>
                    </div>
                  ))}

                  {/* Tooltip beside the group (left of the last one): values lead, labels follow */}
                  {active === i && (
                    <div
                      role="tooltip"
                      className={`pointer-events-none absolute z-10 top-0 w-52 rounded-lg bg-white border border-[#d8dee9] shadow-lg p-3 text-xs animate-fade-in ${
                        i === 0
                          ? "left-[60%]"
                          : i === projections.length - 1
                            ? "right-[60%]"
                            : "left-1/2 -translate-x-1/2 sm:left-[60%] sm:translate-x-0"
                      }`}
                    >
                      <p className="font-semibold text-[#5b6577]">Over {periodLabel(p.years)}</p>
                      {series.map((s) => (
                        <p key={s.key} className="mt-1.5 flex flex-wrap items-center gap-x-2">
                          <span className={`w-3 h-0.5 rounded-full ${s.color}`} />
                          <span className="font-bold text-[#1b2433]">
                            {formatCurrency(p[s.key], currency)}
                          </span>
                          <span className="text-[#5b6577]">{s.label}</span>
                        </p>
                      ))}
                      <p className="mt-2 pt-2 border-t border-[#e3e7ef] font-bold text-[#0d8a56]">
                        {formatCurrency(p.saving, currency)} saved
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* X-axis: period, then the saving it adds up to */}
          <div className="flex pt-2" aria-hidden="true">
            {projections.map((p) => (
              <div key={p.years} className="flex-1 text-center">
                <p className="text-xs font-semibold text-[#1b2433]">{periodLabel(p.years)}</p>
                <p className="text-[11px] font-semibold text-[#0d8a56]">
                  Save {formatCompactCurrency(p.saving, currency)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
