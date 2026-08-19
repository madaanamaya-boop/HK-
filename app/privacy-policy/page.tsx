import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HK FINCORP collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: [
      "When you use our website, forms, tools, or chatbot, we may collect information you voluntarily provide, including your name, mobile number, email address, city, PAN (for credit score consultation requests), employment details, income details, and the nature of your loan or insurance requirement.",
      "We may also collect basic technical information such as browser type and pages visited, used to improve the website experience.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "Your information is used to respond to your enquiries, provide financial consultation, assess suitable loan and insurance options, communicate with you about your requirement (via call, SMS, email, or WhatsApp with your consent), and improve our services.",
      "Where you have expressly consented, your details may be shared with banks, NBFCs, insurers, or credit bureaus strictly for processing your requirement.",
    ],
  },
  {
    title: "3. Consent",
    body: [
      "All lead forms and credit score requests on this website include an explicit consent checkbox. We contact you and process your information only on the basis of that consent. Credit score checks are additionally subject to user consent and third-party credit bureau/API availability.",
    ],
  },
  {
    title: "4. Data Sharing",
    body: [
      "We do not sell your personal information. Information is shared only with financial institutions relevant to your requirement, with your consent, or where required by law.",
    ],
  },
  {
    title: "5. Data Security",
    body: [
      "We take reasonable technical and organisational measures to protect your information against unauthorised access, alteration, or disclosure. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Data Retention",
    body: [
      "We retain personal information only as long as necessary for the purposes described above or as required by applicable law and regulation.",
    ],
  },
  {
    title: "7. Your Rights",
    body: [
      `You may request access to, correction of, or deletion of your personal information by writing to us at ${CONTACT.email}. We will respond to legitimate requests within a reasonable timeframe.`,
    ],
  },
  {
    title: "8. Cookies & Analytics",
    body: [
      "This website may use essential cookies for functionality and, if enabled, analytics tools to understand usage patterns. You can control cookies through your browser settings.",
    ],
  },
  {
    title: "9. Third-Party Links",
    body: [
      "Our website may link to external sites (such as WhatsApp, social media, or partner institutions). We are not responsible for the privacy practices of those sites and encourage you to review their policies.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The revised version will be posted on this page. Continued use of the website constitutes acceptance of the updated policy.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      `For privacy-related questions, contact ${SITE.legalName} at ${CONTACT.email} or ${CONTACT.phone}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="How we collect, use, and protect your personal information." // EDIT: review with legal counsel before publishing
      />
      <section className="bg-ivory-50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-midnight-600/70">Last updated: {new Date().getFullYear()}</p>
          <div className="mt-8 space-y-10">
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
