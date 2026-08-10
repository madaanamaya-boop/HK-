"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validators";
import { submitLead } from "@/lib/leads";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import {
  FieldWrapper,
  TextInput,
  SelectInput,
  TextareaInput,
  CheckboxInput,
} from "@/components/forms/fields";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  /** Analytics tag identifying where the form is placed. */
  source: string;
  /** Preselect a service (e.g. on service detail pages). */
  defaultService?: string;
  /** Compact hides the message + amount fields. */
  compact?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function LeadForm({
  source,
  defaultService = "",
  compact = false,
  className,
  title = "Get Free Consultation",
  subtitle = "Share your details and an HK FINCORP expert will reach out with personalized guidance.",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService, source },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    const res = await submitLead({ ...data, source });
    if (res.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setServerMessage(res.message ?? "Something went wrong. Please try again.");
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
          Thank you — we have received your request.
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-midnight-600">
          An HK FINCORP expert will contact you shortly with personalized guidance for your requirement.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-9", className)}
    >
      <h3 className="font-display text-xl font-semibold text-midnight-900">{title}</h3>
      <p className="mt-1.5 text-sm text-midnight-600">{subtitle}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor={`${source}-name`} error={errors.name?.message}>
          <TextInput
            id={`${source}-name`}
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FieldWrapper>

        <FieldWrapper label="Mobile Number" htmlFor={`${source}-mobile`} error={errors.mobile?.message}>
          <TextInput
            id={`${source}-mobile`}
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile number"
            autoComplete="tel-national"
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
        </FieldWrapper>

        <FieldWrapper label="Email" htmlFor={`${source}-email`} error={errors.email?.message}>
          <TextInput
            id={`${source}-email`}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FieldWrapper>

        <FieldWrapper label="City" htmlFor={`${source}-city`} error={errors.city?.message}>
          <TextInput
            id={`${source}-city`}
            placeholder="Your city"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            {...register("city")}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Service Interested In"
          htmlFor={`${source}-service`}
          error={errors.service?.message}
          className={compact ? "sm:col-span-2" : undefined}
        >
          <SelectInput
            id={`${source}-service`}
            aria-invalid={!!errors.service}
            {...register("service")}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Other / Not Sure">Other / Not Sure</option>
          </SelectInput>
        </FieldWrapper>

        {!compact && (
          <FieldWrapper
            label="Loan Amount / Insurance Requirement"
            htmlFor={`${source}-amount`}
            error={errors.amount?.message}
          >
            <TextInput
              id={`${source}-amount`}
              placeholder="e.g. ₹25,00,000 or family health cover"
              {...register("amount")}
            />
          </FieldWrapper>
        )}

        {!compact && (
          <FieldWrapper
            label="Message (optional)"
            htmlFor={`${source}-message`}
            error={errors.message?.message}
            className="sm:col-span-2"
          >
            <TextareaInput
              id={`${source}-message`}
              placeholder="Tell us a little about your requirement…"
              {...register("message")}
            />
          </FieldWrapper>
        )}
      </div>

      <div className="mt-6">
        <CheckboxInput
          id={`${source}-consent`}
          label="I authorize HK FINCORP to contact me via call, SMS, email, or WhatsApp regarding my enquiry. This consent overrides my registration on DND/NDNC."
          error={errors.consent?.message}
          {...register("consent")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverMessage}
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" className="mt-7 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Request Free Consultation
          </>
        )}
      </Button>
    </form>
  );
}
