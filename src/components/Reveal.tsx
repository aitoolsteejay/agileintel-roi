"use client";

import React, { useRef } from "react";
import { useInView } from "../lib/motion";

interface RevealProps {
  children: React.ReactNode;
  /** Milliseconds to wait after it scrolls into view, for staggering. */
  delay?: number;
  className?: string;
}

/** Fades and slides its content up the first time it scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "0px 0px -8% 0px");

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};
