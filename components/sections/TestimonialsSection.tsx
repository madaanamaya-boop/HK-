import { TESTIMONIALS } from "@/lib/testimonials";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function TestimonialsSection() {
  const featured = TESTIMONIALS.slice(0, 3);

  return (
    <section className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Client voices"
            title="Trusted by families and businesses across India"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Button href="/testimonials" variant="outline" size="lg">
            Read more testimonials
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
