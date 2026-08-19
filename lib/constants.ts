/**
 * Central brand + contact configuration.
 * Replace the placeholder values below before going live.
 */

export const SITE = {
  name: "HK FINCORP",
  legalName: "HK FINCORP Financial Consultancy",
  tagline: "Your Trust Is Our Priority.",
  url: "https://www.hkfincorp.in", // EDIT: final production domain
  foundedYear: 2001,
  yearsOfExperience: "24+",
  description:
    "HK FINCORP is a pan-India financial consultancy with 24+ years of experience, helping individuals, families, and businesses secure loan and insurance solutions through transparent guidance and end-to-end support.",
} as const;

export const CONTACT = {
  phone: "+91 98111 62249",
  phoneHref: "tel:+919811162249",
  whatsapp: "+91 98111 62249",
  whatsappHref:
    "https://wa.me/919811162249?text=Hello%20HK%20FINCORP%2C%20I%20would%20like%20a%20free%20consultation.",
  email: "info@hkfincorp.in",
  emailHref: "mailto:info@hkfincorp.in",
  address: "Pan-India Financial Consultancy", // EDIT: registered office address
} as const;

export const SOCIALS = {
  instagram: "https://www.instagram.com/hkfincorp/",
  facebook: "https://www.facebook.com/people/Hk-Fincorp/61571969191902/",
} as const;

export const FOUNDERS = [
  {
    name: "Hemant Kumar",
    role: "Founder",
    initials: "HK",
    message:
      "Every client we serve is a relationship we intend to keep for decades. For over 24 years, our promise has stayed the same — honest guidance, complete transparency, and standing by our word at every step of your financial journey.",
  },
  {
    name: "Simran Madaan",
    role: "Co-Founder",
    initials: "SM",
    message:
      "Financial decisions shape families and businesses for years. We take that responsibility seriously — listening first, advising honestly, and supporting our clients end-to-end until the right solution is in place.",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Financial Tools", href: "/financial-tools" },
  { label: "Offers & Policies", href: "/offers-policies" },
  { label: "Banking Partners", href: "/banking-partners" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
] as const;

export const PRIMARY_CTA = { label: "Get Free Consultation", href: "/contact" } as const;

export const GLOBAL_DISCLAIMER =
  "HK FINCORP is a financial consultancy service provider. Loan approval, interest rates, processing fees, insurance issuance, premiums, and terms are subject to the policies of respective banks, NBFCs, insurers, credit bureaus, and financial institutions. HK FINCORP does not guarantee loan approval or credit score outcomes.";

export const SERVICE_DISCLAIMER =
  "Subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.";
