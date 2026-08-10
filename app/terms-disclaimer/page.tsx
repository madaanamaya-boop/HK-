import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT, SITE, GLOBAL_DISCLAIMER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description:
    "Terms of use and disclaimers for the HK FINCORP website and consultancy services.",
  alternates: { canonical: "/terms-disclaimer" },
};

const SECTIONS = [
  {
    title: "1. Nature of Services",
    body: [
      `${SITE.legalName} ("HK FINCORP", "we", "us") is a financial consultancy service provider. We assist clients in identifying, comparing, and applying for loan and insurance products offered by banks, NBFCs, housing finance companies, and insurers. We are not a bank, NBFC, or insurer, and we do not lend money or issue insurance policies ourselves.`,
    ],
  },
  {
    title: "2. No Guarantee of Approval",
    body: [
      "Loan approval, sanctioned amounts, interest rates, processing fees, insurance issuance, premiums, and all related terms are decided solely by the respective financial institution. HK FINCORP does not guarantee loan approval, specific rates, timelines, or credit score outcomes. All applications remain subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.",
    ],
  },
  {
    title: "3. Information Accuracy",
    body: [
      "Content on this website — including offers, policy updates, eligibility overviews, document checklists, and calculator outputs — is indicative and for general informational purposes only. It does not constitute financial, legal, or investment advice. While we strive to keep information current, terms change frequently at the institutional level; always verify final terms in your sanction letter or policy document.",
    ],
  },
  {
    title: "4. Tools & Calculators",
    body: [
      "The EMI calculator, eligibility checker, document checklist assistant, and similar tools provide approximate, indicative results based on the inputs you supply and standard formulas. Actual figures offered by lenders may differ. The credit score checker registers a consent-based consultation request; direct bureau integration is subject to user consent and third-party credit bureau/API availability.",
    ],
  },
  {
    title: "5. Chatbot",
    body: [
      "The website chatbot provides general informational responses only. It does not provide binding advice, approvals, or guaranteed terms. For decisions, always speak with an HK FINCORP expert and verify terms with the concerned institution.",
    ],
  },
  {
    title: "6. User Responsibilities",
    body: [
      "You agree to provide accurate, complete information in forms and applications. Submitting false or misleading information may result in rejection by financial institutions and can have legal consequences.",
    ],
  },
  {
    title: "7. Intellectual Property",
    body: [
      "All content, branding, and design on this website belong to HK FINCORP unless otherwise stated. Bank, NBFC, and insurer names or marks referenced belong to their respective owners and are used for identification only.",
    ],
  },
  {
    title: "8. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, HK FINCORP shall not be liable for any direct, indirect, incidental, or consequential loss arising from the use of this website, its tools, or reliance on its content, or from decisions made by third-party financial institutions.",
    ],
  },
  {
    title: "9. Third-Party Links",
    body: [
      "Links to external websites are provided for convenience. HK FINCORP is not responsible for the content, policies, or practices of third-party sites.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in India.", // EDIT: specify city/jurisdiction
    ],
  },
  {
    title: "11. Contact",
    body: [
      `Questions about these terms may be directed to ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function TermsDisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Disclaimer"
        copy="Please read these terms carefully before using our website and services." // EDIT: review with legal counsel before publishing
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gold-500/20 bg-gold-500/10 p-6">
            <h2 className="font-display text-sm font-semibold font-semibold text-midnight-900">
              Key Disclaimer
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-midnight-600">{GLOBAL_DISCLAIMER}</p>
          </div>
          <div className="mt-10 space-y-10">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-semibold text-midnight-900">{section.title}</h2>
                {section.body.map((para) => (
                  <p key={para.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-midnight-600">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
