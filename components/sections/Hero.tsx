"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { calculateEmi, formatINR, formatINRCompact } from "@/lib/utils";

const TRUST_STRIP = [
  { icon: ShieldCheck, label: "Trusted since 2001" },
  { icon: MapPin, label: "Pan-India support" },
  { icon: Layers, label: "Loans & insurance" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/** Live mini EMI calculator — the hero's interactive centerpiece. */
function HeroCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [years, setYears] = useState(20);
  const rate = 9.5;
  const emi = useMemo(() => calculateEmi(amount, rate, years * 12).emi, [amount, years]);

  const pct = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      {/* Glow behind the card */}
      <div
        aria-hidden="true"
        className="drift absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold-500/25 via-aqua-400/20 to-violet-500/15 blur-3xl"
      />

      <div className="ring-grad relative rounded-3xl bg-white p-7 shadow-card-hover sm:p-8">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Try it live
          </p>
          <span className="text-xs font-medium text-midnight-600">at {rate}% p.a.</span>
        </div>

        <div className="mt-7 space-y-7">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="hero-amount" className="text-sm font-medium text-midnight-600">
                Loan amount
              </label>
              <output className="tnum font-display text-lg font-semibold text-midnight-900">
                {formatINRCompact(amount)}
              </output>
            </div>
            <div className="relative mt-3">
              <div
                aria-hidden="true"
                className="grad-fill pointer-events-none absolute inset-y-0 left-0 my-auto h-1.5 rounded-full"
                style={{ width: `${pct(amount, 500000, 10000000)}%` }}
              />
              <input
                id="hero-amount"
                type="range"
                className="relative bg-transparent"
                min={500000}
                max={10000000}
                step={100000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                aria-label="Loan amount"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-1.5 rounded-full bg-ivory-200"
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="hero-tenure" className="text-sm font-medium text-midnight-600">
                Tenure
              </label>
              <output className="tnum font-display text-lg font-semibold text-midnight-900">
                {years} years
              </output>
            </div>
            <div className="relative mt-3">
              <div
                aria-hidden="true"
                className="grad-fill pointer-events-none absolute inset-y-0 left-0 my-auto h-1.5 rounded-full"
                style={{ width: `${pct(years, 5, 30)}%` }}
              />
              <input
                id="hero-tenure"
                type="range"
                className="relative bg-transparent"
                min={5}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                aria-label="Tenure in years"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-1.5 rounded-full bg-ivory-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 rounded-2xl bg-ivory-100 px-5 py-4">
          <div>
            <p className="text-xs font-medium text-midnight-600">Your monthly EMI</p>
            <p
              aria-live="polite"
              className="tnum mt-1 font-display text-3xl font-bold tracking-tight text-midnight-900"
            >
              {formatINR(Math.round(emi))}
            </p>
          </div>
          <Link
            href="/emi-calculator"
            className="group inline-flex items-center gap-1 pb-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600"
          >
            Details
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Copy and visual drift apart slightly as the hero scrolls away
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} className="aurora relative overflow-hidden bg-ivory-50">
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-36 lg:pb-28">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-midnight-900/8 bg-white/80 px-4 py-2 text-sm font-medium text-midnight-600 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            24+ years · Your trust is our priority
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.9rem] font-bold leading-[1.05] tracking-[-0.03em] text-midnight-900 text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            Loans &amp; insurance,
            <br />
            <span className="grad-text">made simple.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-midnight-600"
          >
            Compare options across leading banks and NBFCs, get honest guidance, and let our
            experts handle the paperwork — start to finish.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button href="/contact" variant="gold" size="lg">
                Get free consultation
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/credit-score" variant="outline" size="lg">
                Check credit score
              </Button>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-12 flex flex-wrap gap-x-7 gap-y-3"
          >
            {TRUST_STRIP.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm text-midnight-600">
                <item.icon className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Interactive calculator */}
        <motion.div
          style={{ y: cardY, opacity: fade }}
          className="flex justify-center lg:justify-end"
        >
          <HeroCalculator />
        </motion.div>
      </div>
    </section>
  );
}
