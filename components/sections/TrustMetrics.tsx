import { TrustMetricCard, type TrustMetric } from "@/components/cards/TrustMetricCard";
import { Reveal } from "@/components/ui/Reveal";

/** EDIT: metric copy is placeholder-friendly — adjust labels as the business evolves. */
const METRICS: TrustMetric[] = [
  { value: 24, suffix: "+", label: "Years of experience", sublabel: "Trusted since 2001" },
  { headline: "Pan-India", label: "Service coverage", sublabel: "Clients across the country" },
  { value: 9, suffix: "+", label: "Loan & insurance solutions", sublabel: "Under one roof" },
  { headline: "Thousands", label: "of clients assisted", sublabel: "High satisfaction" }, // EDIT
];

export function TrustMetrics() {
  return (
    <section className="bg-ivory-50 pb-20 lg:pb-24" aria-label="Trust metrics">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.07}>
              <TrustMetricCard metric={metric} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
