"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OFFERS, POLICY_UPDATES, OFFER_CATEGORIES, type OfferCategory } from "@/lib/offers";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { CalendarClock } from "lucide-react";

type Filter = "All" | OfferCategory;

export function OffersExplorer() {
  const [filter, setFilter] = useState<Filter>("All");

  const showPolicyUpdates = filter === "All" || filter === "Policy Updates";
  const filteredOffers =
    filter === "Policy Updates"
      ? []
      : filter === "All"
        ? OFFERS
        : OFFERS.filter((o) => o.category === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="Filter offers by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {OFFER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
              filter === cat
                ? "border-midnight-900 bg-midnight-900 text-white shadow-card"
                : "border-midnight-900/8 bg-white text-midnight-600 hover:border-gold-500 hover:text-gold-700"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Offers grid */}
      {filteredOffers.length > 0 && (
        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => (
              <motion.div
                key={offer.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <OfferCard offer={offer} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Policy updates */}
      {showPolicyUpdates && (
        <div className="mt-20">
          <SectionHeader
            eyebrow="Policy Updates"
            title="Lender & Insurer Policy Updates"
            copy="Changes worth knowing before you apply — tracked by our advisory team."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {POLICY_UPDATES.map((update) => (
              <article
                key={update.id}
                className="flex h-full flex-col rounded-3xl border border-midnight-900/10 bg-midnight-950 p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15">
                  <CalendarClock className="h-4.5 w-4.5 text-gold-400" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{update.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{update.summary}</p>
                <p className="mt-4 text-xs font-semibold font-semibold text-gold-400/80">
                  {update.date}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
