import { OFFERS } from "@/lib/offers";
import { OfferCard } from "@/components/cards/OfferCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function OffersPreview() {
  const featured = OFFERS.filter((o) => o.featured).slice(0, 3);

  return (
    <section className="bg-ivory-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Stay informed"
            title="Latest offers & policy updates"
            copy="Curated assistance programs and lender policy changes, kept current by our advisory team."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 0.07}>
              <OfferCard offer={offer} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button href="/offers-policies" variant="outline" size="lg">
            View offers &amp; policies
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
