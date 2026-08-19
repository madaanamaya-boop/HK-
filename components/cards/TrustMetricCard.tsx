"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export interface TrustMetric {
  /** Numeric part to count up to; omit for non-numeric metrics. */
  value?: number;
  suffix?: string;
  /** Static label shown when there is no numeric value. */
  headline?: string;
  label: string;
  sublabel?: string;
}

export function TrustMetricCard({ metric }: { metric: TrustMetric }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const target = metric.value ?? 0;

  useEffect(() => {
    if (!inView || metric.value === undefined) return;
    if (reduce) {
      setCount(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduce, metric.value]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7"
    >
      <p className="tnum grad-text font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {metric.value !== undefined ? (
          <>
            {count}
            {metric.suffix}
          </>
        ) : (
          metric.headline
        )}
      </p>
      <p className="mt-3 text-sm font-semibold text-midnight-900">{metric.label}</p>
      {metric.sublabel && <p className="mt-1 text-sm text-midnight-600">{metric.sublabel}</p>}
    </div>
  );
}
