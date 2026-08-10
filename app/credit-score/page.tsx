import type { Metadata } from "next";
import { ShieldCheck, Lock, FileSearch } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CreditScoreForm } from "@/components/forms/CreditScoreForm";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Credit Score Checker — Consent-Based Credit Health Review",
  description:
    "Begin a consent-based credit score and loan eligibility consultation with HK FINCORP. Guidance on your credit health and realistic loan options.",
  alternates: { canonical: "/credit-score" },
};

const ASSURANCES = [
  {
    icon: Lock,
    title: "Consent-First",
    copy: "Nothing is checked without your explicit consent — you stay in control at every step.",
  },
  {
    icon: ShieldCheck,
    title: "Data Handled Carefully",
    copy: "Your details are used only for your credit and eligibility consultation.",
  },
  {
    icon: FileSearch,
    title: "Expert Interpretation",
    copy: "A score is just a number — our team explains what it means for your loan options.",
  },
];

export default function CreditScorePage() {
  return (
    <>
      <PageHero
        eyebrow="Financial Tools"
        title="Credit Score Checker"
        copy="Your credit health shapes your loan options. Start a consent-based review and get expert guidance on your score and eligibility."
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-midnight-900">
                How It Works
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-midnight-600">
                Share your details in five quick steps. Once submitted, our team helps you review
                your credit health and understand the loan options realistic for your profile.
              </p>
              <div className="mt-8 space-y-5">
                {ASSURANCES.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="grad-fill flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
                      <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-midnight-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-midnight-600">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <CreditScoreForm />
            </Reveal>
            <Reveal delay={0.15}>
              <DisclaimerBanner
                className="mt-6"
                text="Credit score checks are subject to user consent and third-party credit bureau/API availability. HK FINCORP does not guarantee credit score outcomes. This service currently registers your request for an expert-assisted consultation; direct bureau integration (CIBIL / Experian / CRIF / Equifax) can be enabled when API access is configured."
              />
            </Reveal>
          </div>
        </div>
      </section>
      <FinalCTA
        title="Not Sure What Your Score Means?"
        copy="Our experts translate credit reports into clear, practical guidance — and help you strengthen your profile before you apply."
        ctaLabel="Book Free Consultation"
      />
    </>
  );
}
