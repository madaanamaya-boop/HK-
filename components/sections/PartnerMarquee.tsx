import { PARTNERS } from "@/lib/partners";
import { PartnerLogo } from "@/components/ui/PartnerLogo";

/** Continuously scrolling logo wall — pauses on hover. */
export function PartnerMarquee() {
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section aria-label="Banking partners" className="bg-ivory-50 pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-medium text-midnight-600">
          Working with India&rsquo;s leading banks &amp; NBFCs
        </p>
        <div className="marquee relative mt-7 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
          />
          <div className="marquee-track flex w-max items-center gap-4 py-2">
            {loop.map((partner, i) => (
              <span
                key={`${partner.key}-${i}`}
                aria-hidden={i >= PARTNERS.length}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-midnight-900/8 bg-white px-6 py-3.5 shadow-sm transition-shadow duration-300 hover:shadow-card"
              >
                <PartnerLogo
                  partnerKey={partner.key}
                  name={partner.name}
                  className="flex items-center gap-2.5"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
