import type { Metadata } from "next";
import {
  ShieldCheck,
  Eye,
  Handshake,
  Smile,
  Users,
  Compass,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FOUNDERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us — Built on Trust Since 2001",
  description:
    "HK FINCORP is a pan-India financial consultancy founded by Hemant Kumar, with Simran Madaan as Co-Founder. 24+ years of trusted guidance across loans and insurance.",
  alternates: { canonical: "/about" },
};

const VALUES: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: ShieldCheck, title: "Trust", copy: "The foundation of every relationship we build — earned over 24 years, one kept promise at a time." },
  { icon: Eye, title: "Transparency", copy: "Every cost, condition, and trade-off explained clearly before you decide." },
  { icon: Handshake, title: "Commitment", copy: "We keep our word. When we take up your requirement, we see it through." },
  { icon: Smile, title: "Customer Satisfaction", copy: "Success is measured by how confident our clients feel about their decisions." },
  { icon: Users, title: "Long-Term Relationships", copy: "Clients who joined us decades ago still call first — and send their families to us." },
  { icon: Compass, title: "Responsible Financial Guidance", copy: "We recommend what serves you, even when it means advising you to wait." },
];

const TIMELINE = [
  { year: "2001", title: "The Beginning", copy: "HK FINCORP is founded by Hemant Kumar with a simple conviction — financial guidance should be honest, personal, and accountable." },
  { year: "2005", title: "Growing Banking Network", copy: "Relationships deepen with leading banks and NBFCs, widening the solutions available to clients." },
  { year: "2010", title: "Full-Spectrum Lending", copy: "The practice expands across home loans, business funding, personal loans, and vehicle finance." },
  { year: "2015", title: "Insurance Advisory", copy: "Motor, life, and health insurance guidance is added — protection alongside lending." },
  { year: "2020", title: "Pan-India Reach", copy: "Digital-first consultations extend trusted guidance to clients across the country." },
  { year: "Today", title: "24+ Years of Trust", copy: "Under Founder Hemant Kumar and Co-Founder Simran Madaan, the same promise continues: your trust comes first." },
];

const WHY_TRUST = [
  "24+ years of continuous, relationship-led practice — not a startup experiment",
  "Guidance-first model: we advise, compare, and support; we never pressure-sell",
  "Strong working relationships with leading banks, NBFCs, and insurers",
  "Complete transparency on rates, fees, and realistic outcomes",
  "End-to-end support — from first consultation to disbursal, renewals, and claims",
  "Clients across India who return, refer, and stay for decades",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HK FINCORP"
        title="We Keep Our Word. Your Trust Comes First."
        copy="A pan-India financial consultancy built over 24 years on relationships, transparency, and the discipline of always doing right by the client."
      />

      {/* Brand story */}
      <section className="bg-ivory-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="right">
            <SectionHeader
              align="left"
              eyebrow="Our Story"
              title="From One Promise to Thousands of Relationships"
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-midnight-600">
              <p>
                HK FINCORP began in 2001 with a conviction that still guides us today: financial
                decisions are too important to be rushed, oversold, or left unexplained. Founder
                Hemant Kumar built the practice on patient consultation — understanding each
                client&rsquo;s situation before recommending anything at all.
              </p>
              <p>
                Over two decades, that approach turned first-time borrowers into lifelong clients,
                and clients into referrers. Today, with Co-Founder Simran Madaan strengthening the
                leadership, HK FINCORP assists individuals, families, and businesses across India
                with loans and insurance — through the same banking relationships, transparency,
                and end-to-end support that built our name.
              </p>
              <p>
                We are consultants, not a marketplace. Every engagement begins with listening and
                ends only when your requirement is genuinely fulfilled.
              </p>
            </div>
          </Reveal>
          <Reveal from="left">
            <div className="relative">
              <div className="drift absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-gold-500/25 via-aqua-400/20 to-violet-500/15 blur-3xl" aria-hidden="true" />
              <div className="aurora-dark relative overflow-hidden rounded-3xl bg-midnight-950 p-9 text-white shadow-card-hover">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-400">Our Mission</p>
                <p className="mt-4 font-display text-2xl font-semibold tracking-tight leading-snug text-balance">
                  &ldquo;To simplify financial decisions through honest guidance, trusted
                  partnerships, and customer-first service.&rdquo;
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-7">
                  <div>
                    <p className="grad-text font-display text-3xl font-bold tracking-tight">24+</p>
                    <p className="mt-1 text-xs text-white/60">Years of experience</p>
                  </div>
                  <div>
                    <p className="grad-text font-display text-3xl font-bold tracking-tight">Pan-India</p>
                    <p className="mt-1 text-xs text-white/60">Client assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder messages */}
      <section className="bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Leadership"
              title="The People Behind the Promise"
            />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            {FOUNDERS.map((founder, i) => (
              <Reveal key={founder.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-3xl border border-midnight-900/8 bg-white p-8 shadow-card">
                  {/* EDIT: replace initials block with a real founder photo when available */}
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-midnight-800 to-midnight-950 font-display text-2xl font-semibold tracking-tight text-gold-400"
                  >
                    {founder.initials}
                  </span>
                  <blockquote className="mt-6 flex-1 text-base leading-relaxed text-midnight-600 italic">
                    &ldquo;{founder.message}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-midnight-900/8 pt-5">
                    <p className="font-display text-lg font-semibold text-midnight-900">{founder.name}</p>
                    <p className="text-sm font-semibold text-gold-700">{founder.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Values"
              title="What We Stand For"
              copy="Six principles that govern every consultation, recommendation, and relationship."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-midnight-900/8 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-white">
                    <value.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-midnight-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-midnight-600">{value.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust + Pan-India */}
      <section className="aurora-dark relative overflow-hidden bg-midnight-950 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="right">
            <SectionHeader
              align="left"
              dark
              eyebrow="Credibility"
              title="Why Clients Trust HK FINCORP"
            />
            <ul className="mt-8 space-y-4">
              {WHY_TRUST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                  <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal from="left">
            <div className="relative flex h-full flex-col justify-center rounded-3xl border border-white/12 bg-white/[0.06] p-9 backdrop-blur">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <MapPin className="h-5.5 w-5.5 text-gold-300" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">
                Pan-India Presence
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                From metros to emerging cities, HK FINCORP assists clients wherever they are.
                Consultations happen over phone, WhatsApp, and email — with the same personal
                attention a client would receive across the table. Our banking and insurance
                network operates nationally, so your options are never limited by your pin code.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                One relationship. National reach. Complete support.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-ivory-50 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Our Journey"
              title="From 2001 to Today"
            />
          </Reveal>
          <ol className="relative mt-14 space-y-10 border-l-2 border-gold-500/25 pl-8 sm:pl-10">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <li className="relative">
                  <span
                    className="absolute -left-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold-500 bg-white sm:-left-[3.05rem]"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  </span>
                  <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-700">
                    {item.year}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-midnight-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-midnight-600">{item.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
