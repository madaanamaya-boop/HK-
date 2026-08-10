import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SITE, CONTACT, SOCIALS } from "@/lib/constants";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "HK FINCORP — 24+ Years of Trusted Financial Excellence",
    template: "%s | HK FINCORP",
  },
  description: SITE.description,
  keywords: [
    "financial consultancy India",
    "home loan assistance",
    "business loan consultant",
    "personal loan guidance",
    "loan against property",
    "car loan India",
    "insurance advisory",
    "HK FINCORP",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "HK FINCORP — 24+ Years of Trusted Financial Excellence",
    description: SITE.description,
    url: SITE.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HK FINCORP — Trusted Financial Consultancy",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "FinancialService"],
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/hk-logo.png`,
  description: SITE.description,
  foundingDate: String(SITE.foundedYear),
  founder: { "@type": "Person", name: "Hemant Kumar" },
  slogan: SITE.tagline,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  areaServed: { "@type": "Country", name: "India" },
  sameAs: [SOCIALS.instagram, SOCIALS.facebook],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-midnight-950"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Chatbot />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
