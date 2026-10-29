"use client";

import React, { useId, useState } from "react";
import { Info } from "lucide-react";

interface InfoTipProps {
  /** What the tip explains, used in the button's accessible name. */
  label: string;
  children: React.ReactNode;
}

/** Small "i" button that explains a field on hover, or on tap/Enter. */
export const InfoTip: React.FC<InfoTipProps> = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  return (
    <span className="relative inline-flex group">
      <button
        type="button"
        aria-label={`About ${label}`}
        aria-describedby={tipId}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="p-0.5 -m-0.5 rounded-full text-[#5b6577] hover:text-[#1f4fb4] transition-colors"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <span
        id={tipId}
        role="tooltip"
        className={`pointer-events-none absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 rounded-lg bg-[#0b2350] px-3 py-2 text-[11px] font-normal leading-relaxed text-white shadow-lg transition-opacity duration-150 group-hover:visible group-hover:opacity-100 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {children}
      </span>
    </span>
  );
};
