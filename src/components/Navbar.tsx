"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Calculator } from "lucide-react";

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b2350] border-b border-[#1f4fb4]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Partnership */}
          <div className="flex items-center space-x-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("hero");
              }}
              className="flex items-center space-x-3 group"
            >
              <div className="relative h-11 w-28 sm:w-32 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all group-hover:border-white/30">
                <Image
                  src="/agileintel_logo.png"
                  alt="AgileIntel Research"
                  width={140}
                  height={40}
                  className="h-auto w-auto max-h-8 object-contain brightness-0 invert"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col border-l border-white/20 pl-3">
                <span className="text-xs uppercase tracking-widest text-[#8fb0f0] font-semibold">
                  Offshore Delivery
                </span>
                <span className="text-xs text-slate-300">
                  in partnership with <strong className="text-white">The Maze</strong>
                </span>
              </div>
            </a>
          </div>

          {/* Direct CTA Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scrollTo("lead-form")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#0b2350] bg-white hover:bg-slate-100 shadow-sm transition-all"
            >
              <span>Get Proposal / Book Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
