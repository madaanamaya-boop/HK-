"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, RotateCcw } from "lucide-react";
import { eligibilitySchema, type EligibilityInput } from "@/lib/validators";
import { LOAN_SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput } from "@/components/forms/fields";
import { cn, formatINRCompact } from "@/lib/utils";

const SCORE_RANGES = ["750 and above", "700 – 749", "650 – 699", "Below 650", "Not sure / New to credit"];

export function EligibilityChecker({ className }: { className?: string }) {
  const [result, setResult] = useState<EligibilityInput | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EligibilityInput>({
    resolver: zodResolver(eligibilitySchema),
  });

  const onSubmit = handleSubmit((data) => setResult(data));

  if (result) {
    const disposable = Math.max(result.monthlyIncome * 0.5 - result.existingEmi, 0);
    const comfortable = disposable > 0;
    return (
      <div
        className={cn("rounded-3xl border border-midnight-900/8 bg-white p-8 shadow-card sm:p-10", className)}
        role="status"
      >
        <span className="grad-fill flex h-14 w-14 items-center justify-center rounded-full">
          <BadgeCheck className="h-7 w-7 text-white" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-midnight-900">
          Based on your inputs, you may be eligible for consultation.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-midnight-600">
          For a {result.loanType} requirement of {formatINRCompact(result.loanAmount)} in {result.city},
          {comfortable
            ? " your income and obligation profile appears suitable for a detailed discussion with our experts."
            : " our experts can help you explore restructuring options and realistic loan amounts for your obligations."}{" "}
          This is a soft, indicative estimate only — not an approval or a guaranteed offer. Final
          eligibility is subject to lender policies, documentation, credit profile, and internal
          approval guidelines.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/contact" variant="gold">
            Book Free Consultation
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setResult(null);
              reset();
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Check Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-9", className)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper
          label="Employment Type"
          htmlFor="el-employment"
          error={errors.employmentType?.message}
        >
          <SelectInput id="el-employment" aria-invalid={!!errors.employmentType} {...register("employmentType")}>
            <option value="">Select employment type</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-Employed</option>
            <option value="business-owner">Business Owner</option>
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper label="Monthly Income (₹)" htmlFor="el-income" error={errors.monthlyIncome?.message}>
          <TextInput
            id="el-income"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 75000"
            aria-invalid={!!errors.monthlyIncome}
            {...register("monthlyIncome")}
          />
        </FieldWrapper>

        <FieldWrapper label="City" htmlFor="el-city" error={errors.city?.message}>
          <TextInput id="el-city" placeholder="Your city" aria-invalid={!!errors.city} {...register("city")} />
        </FieldWrapper>

        <FieldWrapper label="Required Loan Amount (₹)" htmlFor="el-amount" error={errors.loanAmount?.message}>
          <TextInput
            id="el-amount"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 2500000"
            aria-invalid={!!errors.loanAmount}
            {...register("loanAmount")}
          />
        </FieldWrapper>

        <FieldWrapper label="Existing Monthly EMI (₹)" htmlFor="el-emi" error={errors.existingEmi?.message}>
          <TextInput
            id="el-emi"
            type="number"
            inputMode="numeric"
            placeholder="0 if none"
            aria-invalid={!!errors.existingEmi}
            {...register("existingEmi")}
          />
        </FieldWrapper>

        <FieldWrapper label="Loan Type" htmlFor="el-type" error={errors.loanType?.message}>
          <SelectInput id="el-type" aria-invalid={!!errors.loanType} {...register("loanType")}>
            <option value="">Select loan type</option>
            {LOAN_SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper
          label="Credit Score Range"
          htmlFor="el-score"
          error={errors.creditScoreRange?.message}
          className="sm:col-span-2"
        >
          <SelectInput id="el-score" aria-invalid={!!errors.creditScoreRange} {...register("creditScoreRange")}>
            <option value="">Select a range</option>
            {SCORE_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <Button type="submit" variant="gold" size="lg" className="mt-7 w-full sm:w-auto">
        Check Eligibility
      </Button>
      <p className="mt-4 text-xs leading-relaxed text-midnight-600/70">
        This tool gives a soft, indicative view for consultation purposes only. It does not perform
        a credit check and does not represent an approval or offer.
      </p>
    </form>
  );
}
