import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { CONTACT, SOCIALS, GLOBAL_DISCLAIMER, SITE } from "@/lib/constants";
import { SERVICES } from "@/lib/services";
import { BrandLogo } from "@/components/ui/BrandLogo";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Financial Tools", href: "/financial-tools" },
  { label: "Offers & Policies", href: "/offers-policies" },
  { label: "Banking Partners", href: "/banking-partners" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Disclaimer", href: "/terms-disclaimer" },
];

export function Footer() {
  return (
    <footer className="bg-midnight-950 text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 lg:px-8 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <BrandLogo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {SITE.description}
            </p>
            <p className="mt-4 font-display text-sm font-semibold text-gold-400">
              {SITE.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HK FINCORP on Instagram"
                className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HK FINCORP on Facebook"
                className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold font-semibold text-gold-400">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold font-semibold text-gold-400">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold font-semibold text-gold-400">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/60">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h4 className="text-xs font-bold font-semibold text-white/50">
            Disclaimer
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-white/45">{GLOBAL_DISCLAIMER}</p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            24+ Years of Trusted Financial Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
