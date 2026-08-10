import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ToolCard } from "@/components/cards/ToolCard";
import { TOOLS } from "@/lib/tools";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { EligibilityChecker } from "@/components/tools/EligibilityChecker";
import { DocumentChecklist } from "@/components/tools/DocumentChecklist";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Financial Tools — EMI, Credit Score, Eligibility & Documents",
  description:
    "Free financial tools by HK FINCORP: EMI calculator, credit score checker, loan eligibility checker, and document checklist assistant.",
  alternates: { canonical: "/financial-tools" },
};

export default function FinancialToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Financial Tools"
        title="Smart Financial Tools"
        copy="Plan with clarity before you apply. Free, instant tools built to bring transparency to your financial decisions."
      />

      {/* Tools hub */}
      <section className="aurora-dark relative overflow-hidden bg-midnight-950 py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.title} delay={i * 0.07}>
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMI calculator module */}
      <section className="bg-ivory-50 py-20 lg:py-28" id="emi-calculator" aria-labelledby="emi-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Tool 01"
              title="EMI Calculator"
              copy="Adjust the amount, rate, and tenure to see your monthly EMI with a full principal-versus-interest breakdown."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <EMICalculator />
          </Reveal>
        </div>
      </section>

      {/* Credit score pointer */}
      <section className="bg-ivory-100 py-20 lg:py-24" id="credit-score" aria-labelledby="cs-heading">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionHeader
              eyebrow="Tool 02"
              title="Credit Score Checker"
              copy="Begin a consent-based credit health review. Share a few details and our team will guide you on your score and realistic loan options."
            />
            <Button href="/credit-score" variant="dark" size="lg" className="mt-8">
              Open Credit Score Checker
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Eligibility checker module */}
      <section className="bg-ivory-50 py-20 lg:py-28" id="eligibility" aria-labelledby="el-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Tool 03"
              title="Loan Eligibility Checker"
              copy="A soft, indicative view of your consultation eligibility — no credit check, no obligation."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <EligibilityChecker />
          </Reveal>
        </div>
      </section>

      {/* Document checklist module */}
      <section className="bg-ivory-100 py-20 lg:py-28" id="document-checklist" aria-labelledby="dc-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Tool 04"
              title="Document Checklist Assistant"
              copy="Select your service and employment type to instantly build the document list for your application."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <DocumentChecklist />
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
