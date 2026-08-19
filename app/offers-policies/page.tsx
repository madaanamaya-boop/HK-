import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { OffersExplorer } from "@/components/sections/OffersExplorer";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { OFFERS_DISCLAIMER } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Offers & Policies — Financial Updates Center",
  description:
    "Current assistance programs, offers, and lender policy updates from HK FINCORP — home loans, business loans, car loans, LAP, and insurance.",
  alternates: { canonical: "/offers-policies" },
};

export default function OffersPoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers & Policies"
        title="Your Financial Update Center"
        copy="Curated assistance programs and policy updates — presented honestly, without inflated promises. Filter by category to find what's relevant to you."
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <OffersExplorer />
          </Reveal>
          <Reveal delay={0.1}>
            <DisclaimerBanner className="mt-16" text={OFFERS_DISCLAIMER} />
          </Reveal>
        </div>
      </section>
      <FinalCTA
        title="Found Something Relevant?"
        copy="Speak with an HK FINCORP expert to check your eligibility and understand the real terms behind any offer."
        ctaLabel="Check My Eligibility"
      />
    </>
  );
}
