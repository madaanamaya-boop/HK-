import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7">
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-midnight-700">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-midnight-900/8 pt-5">
        <span
          aria-hidden="true"
          className="grad-fill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        >
          {testimonial.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-midnight-900">{testimonial.name}</p>
          <p className="text-xs text-midnight-600">
            {testimonial.city} · {testimonial.service}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
