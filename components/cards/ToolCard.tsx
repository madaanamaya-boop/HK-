"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Gauge, BadgeCheck, ListChecks, type LucideIcon } from "lucide-react";
import type { Tool, ToolIconName } from "@/lib/tools";

const TOOL_ICONS: Record<ToolIconName, LucideIcon> = {
  calculator: Calculator,
  gauge: Gauge,
  "badge-check": BadgeCheck,
  "list-checks": ListChecks,
};

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = TOOL_ICONS[tool.icon];
  return (
    <article className="group h-full">
      <Link
        href={tool.href}
        className="flex h-full flex-col rounded-3xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/40 hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:p-7"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-white">
          <Icon className="h-5.5 w-5.5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
          {tool.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{tool.copy}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
          {tool.cta ?? "Open tool"}
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </article>
  );
}
