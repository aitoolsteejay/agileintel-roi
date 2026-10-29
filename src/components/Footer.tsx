"use client";

import React from "react";
import Image from "next/image";
import { Mail, MapPin, Building, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b2350] text-white pt-16 pb-12 border-t border-[#1f4fb4]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Partnership */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 bg-white rounded-lg px-2.5 py-1 border border-white/15 flex items-center justify-center">
                <Image
                  src="/agileintel_logo.png"
                  alt="AgileIntel Research"
                  width={140}
                  height={40}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-white/40">×</span>
              <div className="relative h-10 bg-white rounded-lg px-2.5 py-1 border border-white/15 flex items-center justify-center">
                <Image
                  src="/maze_logo.png"
                  alt="The Maze"
                  width={70}
                  height={40}
                  className="h-7 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              AgileIntel, founded by Dev Mehta, and The Maze, founded by Sandeep Saujani,
              have formed a strategic partnership to expand AgileIntel&apos;s presence across
              Europe.
            </p>

            <div className="pt-2 text-[11px] text-[#8fb0f0]">
              Built in India · Led by events insiders
            </div>
          </div>

          {/* Col 2: Leadership Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8fb0f0] mb-3">
              Leadership & Delivery
            </h4>
            <div className="space-y-4 text-xs">
              <div>
                <strong className="block text-white">Dev Mehta</strong>
                <span className="text-slate-400 block text-[11px]">
                  Founder & Director · AgileIntel Research
                </span>
                <a
                  href="mailto:Dev.mehta@agileintelresearch.com"
                  className="inline-flex items-center gap-1 text-[#8fb0f0] hover:text-white mt-0.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>Dev.mehta@agileintelresearch.com</span>
                </a>
              </div>

              <div>
                <strong className="block text-white">Sandeep Saujani</strong>
                <span className="text-slate-400 block text-[11px]">
                  Partner · AgileIntel Europe / The Maze
                </span>
                <a
                  href="mailto:sandeep@the-maze.io"
                  className="inline-flex items-center gap-1 text-[#8fb0f0] hover:text-white mt-0.5"
                >
                  <Mail className="w-3 h-3" />
                  <span>sandeep@the-maze.io</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: India Registered Office */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8fb0f0] mb-3">
              India Registered Office
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8fb0f0] shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed text-[11px]">
                  Ackruti Trade Centre, Kondivita,
                  <br />
                  Andheri East, Mumbai 400093,
                  <br />
                  India
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations Partnered Banner */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-b border-white/10">
          <span className="font-semibold text-slate-300">
            Organisations The Maze has worked with:
          </span>
          <div className="flex flex-wrap gap-4 text-slate-300 font-medium">
            <span>Oxford Global</span>
            <span>·</span>
            <span>DCD</span>
            <span>·</span>
            <span>Marsh McLennan</span>
            <span>·</span>
            <span>Cirium</span>
            <span>·</span>
            <span>Econsultancy</span>
            <span>·</span>
            <span>MSP Global</span>
            <span>·</span>
            <span>Centaur</span>
            <span>·</span>
            <span>HRD Connect</span>
            <span>·</span>
            <span>IntentPro</span>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 AgileIntel Research & The Maze. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Glassdoor Benchmark: 31 August 2026</span>
            <span>·</span>
            <span>UK / Europe / US</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
