"use client";

import { useState } from "react";
import { FileCheck2 } from "lucide-react";
import { SERVICES } from "@/lib/services";
import {
  getDocumentChecklist,
  CHECKLIST_NOTE,
  EMPLOYMENT_LABELS,
  type EmploymentType,
} from "@/lib/documents";
import { FieldWrapper, SelectInput } from "@/components/forms/fields";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function DocumentChecklist({ className }: { className?: string }) {
  const [serviceSlug, setServiceSlug] = useState("");
  const [employment, setEmployment] = useState<EmploymentType | "">("");

  const checklist =
    serviceSlug && employment ? getDocumentChecklist(serviceSlug, employment) : null;
  const serviceName = SERVICES.find((s) => s.slug === serviceSlug)?.name;

  return (
    <div className={cn("rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-9", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Service" htmlFor="dc-service">
          <SelectInput
            id="dc-service"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>

        <FieldWrapper label="Employment Type" htmlFor="dc-employment">
          <SelectInput
            id="dc-employment"
            value={employment}
            onChange={(e) => setEmployment(e.target.value as EmploymentType | "")}
          >
            <option value="">Select employment type</option>
            {(Object.keys(EMPLOYMENT_LABELS) as EmploymentType[]).map((k) => (
              <option key={k} value={k}>
                {EMPLOYMENT_LABELS[k]}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      {checklist ? (
        <div className="mt-8" aria-live="polite">
          <h3 className="font-display text-lg font-semibold text-midnight-900">
            Documents for {serviceName} — {EMPLOYMENT_LABELS[employment as EmploymentType]}
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {checklist.map((group) => (
              <div key={group.group} className="rounded-2xl bg-ivory-100 p-5">
                <h4 className="font-display text-sm font-semibold text-midnight-900">{group.group}</h4>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-midnight-600">
                      <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-midnight-600/70">{CHECKLIST_NOTE}</p>
          <Button href="/contact" variant="gold" className="mt-6">
            Get Help With Documentation
          </Button>
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-ivory-100 px-5 py-4 text-sm text-midnight-600">
          Select a service and employment type to see your personalized document checklist.
        </p>
      )}
    </div>
  );
}
