import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian currency, e.g. ₹12,50,000 */
export function formatINR(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
}

/** Compact Indian format, e.g. ₹12.5 L / ₹1.2 Cr */
export function formatINRCompact(value: number) {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(value % 1_00_00_000 === 0 ? 0 : 1)} Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(value % 1_00_000 === 0 ? 0 : 1)} L`;
  return formatINR(value);
}

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayable: number;
  principal: number;
}

/**
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 * where r = monthly interest rate, n = tenure in months.
 */
export function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalInterest: 0, totalPayable: 0, principal };
  }
  const r = annualRatePercent / 12 / 100;
  if (r === 0) {
    const emi = principal / tenureMonths;
    return { emi, totalInterest: 0, totalPayable: principal, principal };
  }
  const factor = Math.pow(1 + r, tenureMonths);
  const emi = (principal * r * factor) / (factor - 1);
  const totalPayable = emi * tenureMonths;
  return {
    emi,
    totalInterest: totalPayable - principal,
    totalPayable,
    principal,
  };
}
