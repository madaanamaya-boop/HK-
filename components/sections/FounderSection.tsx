import { FOUNDERS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function FounderSection() {
  return (
    <section className="bg-ivory-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Our legacy"
            title="Guided by experience. Driven by trust."
            copy="Since 2001, under Founder Hemant Kumar and Co-Founder Simran Madaan, the promise hasn't changed."
          />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card sm:p-8">
                {/* EDIT: replace initials with a founder photo — drop it at
                    public/founder-hk.jpg and swap in next/image */}
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grad-fill flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold text-white"
                  >
                    {founder.initials}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight text-midnight-900">
                      {founder.name}
                    </p>
                    <p className="text-sm font-medium text-gold-700">{founder.role}</p>
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-midnight-600">
                  &ldquo;{founder.message}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
