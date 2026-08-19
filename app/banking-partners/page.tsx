import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { PARTNERS, PARTNERS_NOTE } from "@/lib/partners";
import { Badge } from "@/components/ui/Badge";
import { PartnerLogo } from "@/components/ui/PartnerLogo";

export const metadata: Metadata = {
  title: "Banking Partners — Our Institutional Network",
  description:
    "HK FINCORP works with leading banks, NBFCs, and housing finance companies across India to bring clients well-matched loan and insurance solutions.",
  alternates: { canonical: "/banking-partners" },
};

const NETWORK_POINTS = [
  {
    title: "Wider Options",
    copy: "Different institutions favour different profiles, industries, and property types. A wide network means your application goes where it is most welcome.",
  },
  {
    title: "Better Positioning",
    copy: "Years of working relationships mean we know each institution's processes and present your file the way their credit teams expect.",
  },
  {
    title: "Smoother Processing",
    copy: "Established points of contact help resolve queries quickly, keeping your sanction and disbursal timelines on track.",
  },
];

export default function BankingPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Banking Partners"
        title="A Network Built Over 24 Years"
        copy="Long-standing relationships with leading banks, NBFCs, and housing finance companies — so your requirement always finds the right institution."
      />

      {/* Partner logo cards */}
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((partner, i) => (
              <Reveal key={partner.name} delay={(i % 5) * 0.05}>
                {/* EDIT: swap in official artwork via public/partners/<key>.svg — see PartnerLogo */}
                <li className="group flex h-full flex-col items-center rounded-3xl border border-midnight-900/8 bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/30 hover:shadow-card-hover">
                  <PartnerLogo
                    partnerKey={partner.key}
                    name={partner.name}
                    className="flex flex-col items-center gap-3 transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge tone="ivory" className="mt-4">
                    {partner.type}
                  </Badge>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <DisclaimerBanner className="mt-10" text={PARTNERS_NOTE} />
          </Reveal>
        </div>
      </section>

      {/* Why the network matters */}
      <section className="aurora-dark relative overflow-hidden bg-midnight-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              dark
              eyebrow="Why It Matters"
              title="What a Strong Network Means for You"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {NETWORK_POINTS.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div className="relative h-full rounded-3xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Landmark className="h-5 w-5 text-gold-300" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{point.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Let Your Application Find the Right Institution."
        copy="Share your requirement and our team will match it to the lenders and insurers best suited to your profile."
      />
    </>
  );
}
