import type { Metadata } from "next";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadForm } from "@/components/forms/LeadForm";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CONTACT, SOCIALS, SITE } from "@/lib/constants";
import { GENERAL_FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Contact — Book Your Free Consultation",
  description:
    "Speak with an HK FINCORP expert. Call, WhatsApp, or email us — pan-India assistance for loans and insurance with 24+ years of trusted experience.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    icon: Phone,
    title: "Call Us",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    note: "Mon–Sat, business hours",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappHref,
    note: "Fast responses, share documents easily",
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    note: "Detailed queries welcome",
  },
];

export default function ContactPage() {
  // The service preselection is read from ?service= on the client (LeadForm),
  // so this page can be statically exported.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GENERAL_FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your Requirement"
        copy="Free consultation, honest guidance, zero pressure. Reach us whichever way suits you best — we assist clients across India."
      />

      {/* Contact channels */}
      <section className="bg-ivory-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.title} delay={i * 0.07}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col items-center rounded-3xl border border-midnight-900/8 bg-white p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/30 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-white">
                    <channel.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold text-midnight-900">
                    {channel.title}
                  </h2>
                  <p className="mt-1.5 text-sm font-semibold text-midnight-900">{channel.value}</p>
                  <p className="mt-1 text-xs text-midnight-600/70">{channel.note}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="aurora-dark relative mt-8 flex flex-col items-center justify-between gap-4 overflow-hidden rounded-3xl bg-midnight-950 px-8 py-6 sm:flex-row">
              <p className="flex items-center gap-3 text-sm text-white/80">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                {CONTACT.address} — serving clients across India
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HK FINCORP on Instagram"
                  className="rounded-full border border-white/20 p-2.5 text-white/70 transition-colors hover:border-gold-400 hover:bg-white/10 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={SOCIALS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HK FINCORP on Facebook"
                  className="rounded-full border border-white/20 p-2.5 text-white/70 transition-colors hover:border-gold-400 hover:bg-white/10 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main form + quick form */}
      <section className="bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-3">
            <LeadForm
              source="contact-page"
              title="Tell Us About Your Requirement"
              subtitle="Complete the form and an HK FINCORP expert will call you back with personalized guidance."
            />
          </Reveal>
          <div className="lg:col-span-2">
            <Reveal delay={0.1}>
              <LeadForm
                source="contact-quick"
                compact
                title="Quick Consultation"
                subtitle="In a hurry? Just the essentials — we'll take it from there."
              />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="aurora-dark relative mt-6 overflow-hidden rounded-3xl bg-midnight-950 p-7 text-sm leading-relaxed text-white/70">
                <p className="font-display text-base font-semibold text-white">
                  What happens after you submit?
                </p>
                <ol className="mt-4 list-decimal space-y-2 pl-5">
                  <li>An expert reviews your requirement.</li>
                  <li>You receive a callback for a free consultation.</li>
                  <li>We compare suitable options and guide you honestly.</li>
                  <li>If you proceed, we support you end-to-end.</li>
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory-50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="FAQ" title="Before You Call" />
          </Reveal>
          <Reveal delay={0.1}>
            <FAQAccordion faqs={GENERAL_FAQS} className="mt-10" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
