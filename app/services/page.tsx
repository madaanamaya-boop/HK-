import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LOAN_SERVICES, INSURANCE_SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Loans & Insurance Advisory",
  description:
    "Home loans, business loans, personal loans, car loans, loan against property, and motor, life & health insurance — guided by 24+ years of trusted experience.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Financial Solutions, Guided End-to-End"
        copy="Every service below comes with the same promise: transparent comparison across our banking network, honest advice, and complete support until your requirement is fulfilled."
      />

      <section className="bg-ivory-50 py-20 lg:py-28" aria-labelledby="loans-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Loans"
              title="Lending Solutions"
              copy="From your first home to your next business milestone — funding guidance matched to your profile."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LOAN_SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.07}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-100 py-20 lg:py-28" aria-labelledby="insurance-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow="Insurance"
              title="Protection Solutions"
              copy="Cover chosen for genuine protection — with support at renewals and, most importantly, at claim time."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INSURANCE_SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.07}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
