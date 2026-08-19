import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialsExplorer } from "@/components/sections/TestimonialsExplorer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";

export const metadata: Metadata = {
  title: "Testimonials — Client Experiences",
  description:
    "What clients across India say about working with HK FINCORP on home loans, business loans, car loans, and insurance.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Relationships That Speak for Themselves"
        copy="Honest words from the families and businesses we've had the privilege to guide. Filter by service to read experiences relevant to your requirement."
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <TestimonialsExplorer />
          </Reveal>
          <Reveal delay={0.1}>
            <DisclaimerBanner
              className="mt-14"
              text="Testimonials reflect individual client experiences and are shared with consent. Outcomes vary by profile — no result is guaranteed or implied."
            />
          </Reveal>
        </div>
      </section>
      <FinalCTA
        title="Your Story Could Be Next."
        copy="Begin with a free consultation and experience the difference of trust-first financial guidance."
      />
    </>
  );
}
