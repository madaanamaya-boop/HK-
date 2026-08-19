"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Offer, OfferBadge } from "@/lib/offers";
import { cn } from "@/lib/utils";

const badgeTones: Record<OfferBadge, string> = {
  Featured: "grad-fill text-white",
  Updated: "bg-midnight-900 text-white",
  "Limited Period": "bg-amber-500 text-white",
  Popular: "bg-gold-500/12 text-gold-700",
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-ivory-100 px-2.5 py-1 text-[11px] font-semibold text-midnight-600">
          {offer.category}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
            badgeTones[offer.badge]
          )}
        >
          {offer.badge}
        </span>
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-midnight-900">
        {offer.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-midnight-600">{offer.summary}</p>
      <dl className="mt-5 space-y-2 rounded-2xl bg-ivory-100 p-4 text-xs text-midnight-600">
        <div className="flex gap-2">
          <dt className="shrink-0 font-semibold text-midnight-900">Eligibility</dt>
          <dd className="text-right ml-auto">{offer.eligibilityNote}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-semibold text-midnight-900">Validity</dt>
          <dd className="text-right ml-auto">{offer.validity}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 font-semibold text-midnight-900">Partner</dt>
          <dd className="text-right ml-auto">{offer.partner}</dd>
        </div>
      </dl>
      <Link
        href={`/contact?service=${encodeURIComponent(offer.category)}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        Check eligibility
        <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
