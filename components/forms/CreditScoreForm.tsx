"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { creditScoreSchema, type CreditScoreInput } from "@/lib/validators";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, CheckboxInput } from "@/components/forms/fields";
import { cn } from "@/lib/utils";

type StepField = keyof CreditScoreInput;

const STEPS: { field: StepField; label: string; title: string }[] = [
  { field: "fullName", label: "Name", title: "What is your full name?" },
  { field: "mobile", label: "Mobile", title: "Your mobile number" },
  { field: "email", label: "Email", title: "Your email address" },
  { field: "pan", label: "PAN", title: "Your PAN (as per records)" },
  { field: "consent", label: "Consent", title: "Your consent to proceed" },
];

export function CreditScoreForm({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreditScoreInput>({
    resolver: zodResolver(creditScoreSchema),
    mode: "onTouched",
  });

  const next = async () => {
    const valid = await trigger(STEPS[step].field);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/credit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-3xl border border-midnight-900/8 bg-white p-10 text-center shadow-card",
          className
        )}
        role="status"
      >
        <span className="grad-fill flex h-14 w-14 items-center justify-center rounded-full">
          <CheckCircle2 className="h-7 w-7 text-white" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-midnight-900">
          Thank you. Our team will help you with your credit score and loan eligibility consultation.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-midnight-600">
          An HK FINCORP expert will reach out shortly to guide you on your credit health and the
          loan options realistic for your profile.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-9", className)}
    >
      {/* Progress */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {STEPS.map((s, i) => (
          <div key={s.field} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i <= step ? "grad-fill" : "bg-ivory-200"
              )}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold text-midnight-600">
        Step {step + 1} of {STEPS.length} — {STEPS[step].label}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="mt-6 min-h-36"
        >
          <h3 className="font-display text-xl font-semibold text-midnight-900">{STEPS[step].title}</h3>

          <div className="mt-5">
            {step === 0 && (
              <FieldWrapper label="Full Name" htmlFor="cs-fullName" error={errors.fullName?.message}>
                <TextInput
                  id="cs-fullName"
                  placeholder="Name as per PAN"
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                  {...register("fullName")}
                />
              </FieldWrapper>
            )}
            {step === 1 && (
              <FieldWrapper label="Mobile Number" htmlFor="cs-mobile" error={errors.mobile?.message}>
                <TextInput
                  id="cs-mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  autoComplete="tel-national"
                  aria-invalid={!!errors.mobile}
                  {...register("mobile")}
                />
              </FieldWrapper>
            )}
            {step === 2 && (
              <FieldWrapper label="Email" htmlFor="cs-email" error={errors.email?.message}>
                <TextInput
                  id="cs-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </FieldWrapper>
            )}
            {step === 3 && (
              <FieldWrapper label="PAN" htmlFor="cs-pan" error={errors.pan?.message}>
                <TextInput
                  id="cs-pan"
                  placeholder="ABCDE1234F"
                  className="uppercase"
                  maxLength={10}
                  aria-invalid={!!errors.pan}
                  {...register("pan")}
                />
              </FieldWrapper>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-ivory-100 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-midnight-600">
                    Credit score checks are subject to user consent and third-party credit
                    bureau/API availability. Your details are used only to assist you with your
                    credit and loan eligibility consultation.
                  </p>
                </div>
                <CheckboxInput
                  id="cs-consent"
                  label="I consent to HK FINCORP using my details to assist with my credit score review and loan eligibility consultation, and to contact me regarding the same."
                  error={errors.consent?.message}
                  {...register("consent")}
                />
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="mt-7 flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="sm" onClick={back} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" variant="gold" onClick={next}>
            Continue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" variant="gold" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
