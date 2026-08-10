"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group h-full">
      <Link
        href={`/services/${service.slug}`}
        className="flex h-full flex-col rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/30 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-white">
            <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
          </span>
          <span className="rounded-full bg-ivory-100 px-2.5 py-1 text-[11px] font-semibold text-midnight-600">
            {service.category}
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-midnight-900">
          {service.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-midnight-600">
          {service.shortCopy}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
          Explore
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
