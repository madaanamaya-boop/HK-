import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

interface FinalCTAProps {
  title?: string;
  copy?: string;
  ctaLabel?: string;
}

export function FinalCTA({
  title = "Let's build your financial future with trust",
  copy = "Speak with an HK FINCORP expert and get personalized guidance for your loan or insurance requirement.",
  ctaLabel = "Book free consultation",
}: FinalCTAProps) {
  return (
    <section className="bg-ivory-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="aurora-dark relative overflow-hidden rounded-[2rem] bg-midnight-950 px-6 py-16 text-center sm:px-12 sm:py-20">
            <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-tight text-white text-balance sm:text-[2.75rem]">
              {title}
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {copy}
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact" variant="gold" size="lg">
                {ctaLabel}
                <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/emi-calculator" variant="outline-light" size="lg">
                Calculate EMI first
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
