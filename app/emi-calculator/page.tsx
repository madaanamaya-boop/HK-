import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EMICalculator } from "@/components/tools/EMICalculator";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";

export const metadata: Metadata = {
  title: "EMI Calculator — Plan Your Loan Repayment",
  description:
    "Free EMI calculator by HK FINCORP. Calculate your monthly EMI, total interest, and total payable for home, personal, business, and car loans.",
  alternates: { canonical: "/emi-calculator" },
};

export default function EmiCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Financial Tools"
        title="EMI Calculator"
        copy="Know your monthly commitment before you borrow. Adjust the loan amount, interest rate, and tenure to see a complete repayment picture."
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <EMICalculator />
          </Reveal>
          <Reveal delay={0.1}>
            <DisclaimerBanner
              className="mt-8"
              text="EMI results are indicative and for planning purposes only. Actual EMIs, interest rates, and terms vary by lender, credit profile, and internal approval guidelines."
            />
          </Reveal>
        </div>
      </section>
      <FinalCTA
        title="Want Guidance on the Right Loan Structure?"
        copy="Our experts help you choose the amount, tenure, and lender that keep your EMIs genuinely comfortable."
        ctaLabel="Speak to an Expert"
      />
    </>
  );
}
