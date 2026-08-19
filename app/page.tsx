import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PartnerMarquee } from "@/components/sections/PartnerMarquee";
import { TrustMetrics } from "@/components/sections/TrustMetrics";
import { TrustPillars } from "@/components/sections/TrustPillars";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ToolsPreview } from "@/components/sections/ToolsPreview";
import { FounderSection } from "@/components/sections/FounderSection";
import { OffersPreview } from "@/components/sections/OffersPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "HK FINCORP — 24+ Years of Trusted Financial Excellence",
  description:
    "Pan-India financial consultancy helping individuals, families, and businesses secure smarter loan and insurance solutions through transparent guidance, trusted relationships, and end-to-end support.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <PartnerMarquee />
      <TrustPillars />
      <ServicesPreview />
      <ToolsPreview />
      <FounderSection />
      <OffersPreview />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
