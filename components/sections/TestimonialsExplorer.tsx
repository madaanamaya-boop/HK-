"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS, TESTIMONIAL_FILTERS, type TestimonialService } from "@/lib/testimonials";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { cn } from "@/lib/utils";

type Filter = "All" | TestimonialService;

export function TestimonialsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.service === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter testimonials by service"
        className="flex flex-wrap justify-center gap-2"
      >
        {TESTIMONIAL_FILTERS.map((cat) => (
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

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
