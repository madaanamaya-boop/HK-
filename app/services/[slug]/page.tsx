import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Users, FileText, ArrowRight } from "lucide-react";
import { SERVICES, getService } from "@/lib/services";
import { SITE, SERVICE_DISCLAIMER } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} — ${service.tagline}`,
    description: service.shortCopy,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="aurora relative overflow-hidden bg-ivory-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-midnight-600">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-700">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-gold-700">Services</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-gold-700">{service.name}</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="grad-fill flex h-14 w-14 items-center justify-center rounded-2xl text-white">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </span>
              <Badge tone="gold">{service.category}</Badge>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-midnight-900 text-balance sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-3 font-display text-lg font-semibold text-gold-700">{service.tagline}</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-midnight-600 sm:text-lg">
              {service.heroCopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#lead-form" variant="gold" size="lg">
                Get Free Consultation
              </Button>
              {service.category === "Loan" && (
                <Button href="/emi-calculator" variant="outline" size="lg">
                  Calculate EMI
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for + Benefits */}
      <section className="bg-ivory-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-2">
            <div className="aurora-dark relative overflow-hidden rounded-3xl bg-midnight-950 p-8 text-white sm:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <Users className="h-5 w-5 text-gold-300" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight">Who This Is For</h2>
              <ul className="mt-6 space-y-4">
                {service.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="lg:col-span-3">
            <Reveal>
              <SectionHeader align="left" eyebrow="Benefits" title={`Why Choose HK FINCORP for Your ${service.name}`} />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {service.benefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-midnight-900/8 bg-white p-6 shadow-card">
                    <h3 className="font-display text-base font-semibold text-midnight-900">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-midnight-600">{benefit.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility + Documents */}
      <section className="bg-ivory-100 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="h-full rounded-3xl border border-midnight-900/8 bg-white p-8 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-midnight-900">Eligibility Overview</h2>
              <ul className="mt-6 space-y-4">
                {service.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-midnight-600">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-midnight-900/8 bg-white p-8 shadow-card sm:p-9">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-midnight-900">Documents Required</h2>
              <ul className="mt-6 space-y-4">
                {service.documents.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-midnight-600">
                    <FileText className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/financial-tools#document-checklist"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700"
              >
                Build your personalized checklist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <DisclaimerBanner text={SERVICE_DISCLAIMER} />
        </div>
      </section>

      {/* Process */}
      <section className="aurora-dark relative overflow-hidden bg-midnight-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader dark eyebrow="How It Works" title="A Clear, Guided Process" />
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.07}>
                <li className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm">
                  <span className="grad-text font-display text-3xl font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold text-white">{step.step}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">{step.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ + Lead form */}
      <section className="bg-ivory-50 py-20 lg:py-28" id="lead-form">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Reveal>
              <SectionHeader align="left" eyebrow="FAQ" title="Common Questions" />
            </Reveal>
            <Reveal delay={0.1}>
              <FAQAccordion faqs={service.faqs} className="mt-8" />
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <LeadForm
              source={`service-${service.slug}`}
              defaultService={service.name}
              title={`Start Your ${service.name} Consultation`}
              subtitle="Free, no-obligation guidance from an HK FINCORP expert."
            />
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-ivory-100 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeader eyebrow="Explore More" title="Related Services" />
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <Reveal key={rel.slug} delay={i * 0.07}>
                  <ServiceCard service={rel} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
