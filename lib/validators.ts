import { z } from "zod";

export const mobileRegex = /^[6-9]\d{9}$/;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(80),
  mobile: z
    .string()
    .regex(mobileRegex, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().min(2, "Please enter your city").max(60),
  service: z.string().min(1, "Please select a service"),
  amount: z.string().optional(),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please provide consent to be contacted" }),
  }),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const quickLeadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  mobile: z
    .string()
    .regex(mobileRegex, "Please enter a valid 10-digit mobile number"),
  service: z.string().min(1, "Please select a service"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please provide consent to be contacted" }),
  }),
  source: z.string().optional(),
});

export type QuickLeadInput = z.infer<typeof quickLeadSchema>;

export const creditScoreSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(80),
  mobile: z
    .string()
    .regex(mobileRegex, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  pan: z
    .string()
    .toUpperCase()
    .regex(panRegex, "Please enter a valid PAN (e.g. ABCDE1234F)"),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Consent is required to proceed with a credit check",
    }),
  }),
});

export type CreditScoreInput = z.infer<typeof creditScoreSchema>;

export const eligibilitySchema = z.object({
  employmentType: z.enum(["salaried", "self-employed", "business-owner"], {
    errorMap: () => ({ message: "Please select your employment type" }),
  }),
  monthlyIncome: z.coerce
    .number({ errorMap: () => ({ message: "Please enter your monthly income" }) })
    .min(5000, "Monthly income should be at least ₹5,000"),
  city: z.string().min(2, "Please enter your city"),
  loanAmount: z.coerce
    .number({ errorMap: () => ({ message: "Please enter the required loan amount" }) })
    .min(10000, "Loan amount should be at least ₹10,000"),
  existingEmi: z.coerce
    .number({ errorMap: () => ({ message: "Please enter your existing EMI (0 if none)" }) })
    .min(0, "Existing EMI cannot be negative"),
  loanType: z.string().min(1, "Please select a loan type"),
  creditScoreRange: z.string().min(1, "Please select a credit score range"),
});

export type EligibilityInput = z.infer<typeof eligibilitySchema>;
