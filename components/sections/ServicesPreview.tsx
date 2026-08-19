import { SERVICES } from "@/lib/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  return (
    <section className="bg-ivory-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Our services"
            title="Every financial need, one trusted advisor"
            copy="Loans and insurance, compared across our banking network and matched to your profile."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.06}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button href="/services" variant="dark" size="lg">
            View all services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
