"use client";

import { useMemo, useState } from "react";
import { PhoneCall } from "lucide-react";
import { calculateEmi, formatINR, formatINRCompact, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-midnight-600">
          {label}
        </label>
        <output
          htmlFor={id}
          className="tnum rounded-xl bg-gold-500/10 px-3.5 py-1.5 font-display text-base font-bold text-gold-700"
        >
          {display}
        </output>
      </div>
      <div className="relative mt-4">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 rounded-full bg-ivory-200" />
        <div
          aria-hidden="true"
          className="grad-fill pointer-events-none absolute left-0 top-0 h-1.5 rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative bg-transparent"
          aria-label={label}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-midnight-500">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function EMICalculator({ className }: { className?: string }) {
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(9.5);
  const [tenureMonths, setTenureMonths] = useState(240);

  const result = useMemo(
    () => calculateEmi(principal, rate, tenureMonths),
    [principal, rate, tenureMonths]
  );

  const principalPct = result.totalPayable > 0 ? (result.principal / result.totalPayable) * 100 : 0;
  const interestPct = 100 - principalPct;
  const years = Math.floor(tenureMonths / 12);
  const months = tenureMonths % 12;
  const tenureDisplay = months === 0 ? `${years} yrs` : `${years} yrs ${months} mo`;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-2", className)}>
      {/* Inputs */}
      <div className="rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-9">
        <h3 className="font-display text-xl font-semibold tracking-tight text-midnight-900">
          Your loan details
        </h3>
        <div className="mt-8 space-y-8">
          <SliderField
            id="emi-amount"
            label="Loan amount"
            value={principal}
            min={100000}
            max={20000000}
            step={100000}
            display={formatINRCompact(principal)}
            minLabel="₹1 L"
            maxLabel="₹2 Cr"
            onChange={setPrincipal}
          />
          <SliderField
            id="emi-rate"
            label="Interest rate (p.a.)"
            value={rate}
            min={6}
            max={24}
            step={0.1}
            display={`${rate.toFixed(1)}%`}
            minLabel="6%"
            maxLabel="24%"
            onChange={setRate}
          />
          <SliderField
            id="emi-tenure"
            label="Tenure"
            value={tenureMonths}
            min={12}
            max={360}
            step={6}
            display={tenureDisplay}
            minLabel="1 yr"
            maxLabel="30 yrs"
            onChange={setTenureMonths}
          />
        </div>
        <p className="mt-8 rounded-2xl bg-ivory-100 p-4 text-xs leading-relaxed text-midnight-600">
          EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where r is the monthly rate and n the tenure in
          months. Indicative — actual terms vary by lender.
        </p>
      </div>

      {/* Results */}
      <div className="aurora-dark relative flex flex-col overflow-hidden rounded-3xl bg-midnight-950 p-7 text-white sm:p-9">
        <h3 className="relative font-display text-xl font-semibold tracking-tight">
          Your EMI breakdown
        </h3>

        <div className="relative mt-8 rounded-2xl bg-white/[0.07] p-6 text-center backdrop-blur">
          <p className="text-sm text-white/60">Monthly EMI</p>
          <p
            aria-live="polite"
            className="tnum mt-2 font-display text-5xl font-bold tracking-tight text-white"
          >
            {formatINR(Math.round(result.emi))}
          </p>
        </div>

        <dl className="relative mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/[0.07] p-5 backdrop-blur">
            <dt className="text-xs text-white/60">Total interest</dt>
            <dd className="tnum mt-1.5 font-display text-xl font-bold">
              {formatINR(Math.round(result.totalInterest))}
            </dd>
          </div>
          <div className="rounded-2xl bg-white/[0.07] p-5 backdrop-blur">
            <dt className="text-xs text-white/60">Total payable</dt>
            <dd className="tnum mt-1.5 font-display text-xl font-bold">
              {formatINR(Math.round(result.totalPayable))}
            </dd>
          </div>
        </dl>

        <div className="relative mt-6">
          <div
            className="flex h-2.5 overflow-hidden rounded-full bg-white/10"
            role="img"
            aria-label={`Principal ${principalPct.toFixed(0)} percent, interest ${interestPct.toFixed(0)} percent of total payable`}
          >
            <div className="grad-fill transition-all duration-500" style={{ width: `${principalPct}%` }} />
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/65">
            <span className="flex items-center gap-2">
              <span className="grad-fill h-2.5 w-2.5 rounded-full" aria-hidden="true" />
              Principal {principalPct.toFixed(0)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" aria-hidden="true" />
              Interest {interestPct.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="relative mt-auto pt-8">
          <Button href="/contact" variant="gold" className="w-full">
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Speak to an expert
          </Button>
        </div>
      </div>
    </div>
  );
}
