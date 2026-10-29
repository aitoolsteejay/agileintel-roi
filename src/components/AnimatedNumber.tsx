"use client";

import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "../lib/motion";

interface AnimatedNumberProps {
  value: number;
  format: (n: number) => string;
  /** Tick up from zero the first time it scrolls into view. */
  countUpOnView?: boolean;
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * A number that glides to its new value when it changes, or ticks up from zero
 * once visible. Screen readers only ever get the final value.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  format,
  countUpOnView = false,
  duration = 700,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [shown, setShown] = useState(countUpOnView ? 0 : value);
  const shownRef = useRef(shown);

  useEffect(() => {
    if (countUpOnView && !inView) return;
    const from = shownRef.current;
    if (from === value) return;

    if (prefersReducedMotion()) {
      shownRef.current = value;
      setShown(value);
      return;
    }

    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const next = from + (value - from) * easeOutCubic(t);
      shownRef.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, inView, countUpOnView, duration]);

  if (countUpOnView) {
    // Reserve the final width so neighbours don't shift while it counts up
    return (
      <span ref={ref} className={`relative inline-block whitespace-nowrap ${className}`}>
        <span className="invisible" aria-hidden="true">
          {format(value)}
        </span>
        <span className="absolute inset-0" aria-hidden="true">
          {format(shown)}
        </span>
        <span className="sr-only">{format(value)}</span>
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{format(shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
};
