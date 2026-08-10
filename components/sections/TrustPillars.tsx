import {
  Eye,
  Users,
  Landmark,
  Workflow,
  Zap,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS: { icon: LucideIcon; title: string; copy: string }[] = [
  {
    icon: Eye,
    title: "Transparent guidance",
    copy: "Every rate, fee, and condition explained before you commit.",
  },
  {
    icon: Users,
    title: "Personalized consultancy",
    copy: "Advice shaped around your income, goals, and comfort.",
  },
  {
    icon: Landmark,
    title: "Strong banking network",
    copy: "Long-standing relationships with leading banks and NBFCs.",
  },
  {
    icon: Workflow,
    title: "End-to-end support",
    copy: "From first call to disbursal — and every renewal after.",
  },
  {
    icon: Zap,
    title: "Fast, hassle-free",
    copy: "Complete files move quickly. We handle the follow-ups.",
  },
  {
    icon: HeartHandshake,
    title: "Trust-first approach",
    copy: "If an option doesn't serve you, we say so. That's why clients stay.",
  },
];

export function TrustPillars() {
  return (
    <section className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Why HK FINCORP"
            title="Built on relationships, not just transactions"
            copy="For over two decades, clients have returned — and sent their families and businesses — because of how we work."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-white">
                  <pillar.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-midnight-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-midnight-600">{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
