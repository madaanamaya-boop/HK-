export type OfferCategory =
  | "Home Loan"
  | "Personal Loan"
  | "Business Loan"
  | "Car Loan"
  | "Loan Against Property"
  | "Insurance"
  | "Policy Updates";

export type OfferBadge = "Featured" | "Updated" | "Limited Period" | "Popular";

export interface Offer {
  id: string;
  title: string;
  category: OfferCategory;
  summary: string;
  eligibilityNote: string;
  validity: string; // EDIT: placeholder validity
  partner: string; // EDIT: placeholder partner/lender
  badge: OfferBadge;
  featured?: boolean;
}

/** EDIT: All offers below are editable placeholders — update as campaigns change. */
export const OFFERS: Offer[] = [
  {
    id: "home-loan-balance-transfer",
    title: "Home Loan Balance Transfer Assistance",
    category: "Home Loan",
    summary:
      "Review your existing home loan and explore transfer options that may reduce your interest outgo over the remaining tenure.",
    eligibilityNote: "For existing home loan borrowers with regular repayment track record.",
    validity: "Ongoing — terms reviewed monthly",
    partner: "Multiple partner banks & HFCs",
    badge: "Featured",
    featured: true,
  },
  {
    id: "business-loan-msme",
    title: "Business Loan Support for MSMEs",
    category: "Business Loan",
    summary:
      "Guidance for MSMEs seeking working capital or expansion funding, including collateral-free options for eligible profiles.",
    eligibilityNote: "Businesses with 2+ years vintage and documented turnover.",
    validity: "Ongoing",
    partner: "Partner banks & NBFCs",
    badge: "Popular",
    featured: true,
  },
  {
    id: "used-car-loan-assist",
    title: "Used Car Loan Assistance",
    category: "Car Loan",
    summary:
      "Specialised support for pre-owned car funding — including seller-to-seller purchases and RC transfer coordination.",
    eligibilityNote: "Subject to vehicle age, valuation, and applicant profile.",
    validity: "Ongoing",
    partner: "Leading auto finance partners",
    badge: "Updated",
  },
  {
    id: "motor-insurance-renewal",
    title: "Motor Insurance Renewal Support",
    category: "Insurance",
    summary:
      "Timely renewal assistance with premium comparison across insurers — protect your no-claim bonus before your policy lapses.",
    eligibilityNote: "For private cars, two-wheelers, and select commercial vehicles.",
    validity: "Ongoing",
    partner: "Leading general insurers",
    badge: "Popular",
  },
  {
    id: "health-family-plan",
    title: "Health Insurance Family Plan Guidance",
    category: "Insurance",
    summary:
      "Structured guidance on family floater plans and super top-ups sized to real hospital costs in your city.",
    eligibilityNote: "Entry ages and medical underwriting as per insurer norms.",
    validity: "Ongoing",
    partner: "Reputed health insurers",
    badge: "Featured",
    featured: true,
  },
  {
    id: "lap-consultation",
    title: "Loan Against Property Consultation",
    category: "Loan Against Property",
    summary:
      "Free structuring consultation on LAP — loan-to-value options, tenure planning, and lender selection for your property type.",
    eligibilityNote: "Residential, commercial, and select industrial properties.",
    validity: "Limited period consultation drive", // EDIT
    partner: "Multiple partner lenders",
    badge: "Limited Period",
  },
  {
    id: "personal-loan-season",
    title: "Personal Loan Rate Comparison Drive",
    category: "Personal Loan",
    summary:
      "Compare personal loan offers across partner banks and NBFCs before you commit — clarity on rates, fees, and total cost.",
    eligibilityNote: "Salaried and self-employed applicants meeting lender criteria.",
    validity: "Ongoing",
    partner: "Partner banks & NBFCs",
    badge: "Updated",
  },
];

export interface PolicyUpdate {
  id: string;
  title: string;
  summary: string;
  date: string; // EDIT: placeholder date
}

/** EDIT: Policy updates are editable placeholders — keep this list current. */
export const POLICY_UPDATES: PolicyUpdate[] = [
  {
    id: "credit-score-requirements",
    title: "Credit Score Requirements",
    summary:
      "Several lenders have refined minimum credit score expectations across loan categories. Applicants near threshold scores should review their credit health before applying.",
    date: "Updated recently", // EDIT
  },
  {
    id: "documentation-changes",
    title: "Documentation Changes",
    summary:
      "Digital KYC and account-aggregator based income verification are increasingly accepted, reducing paperwork for eligible applicants at partner institutions.",
    date: "Updated recently", // EDIT
  },
  {
    id: "processing-fee-updates",
    title: "Processing Fee Updates",
    summary:
      "Processing fee structures have been revised at select lenders. Always confirm the applicable fee schedule in your sanction letter before acceptance.",
    date: "Updated recently", // EDIT
  },
  {
    id: "eligibility-criteria",
    title: "Eligibility Criteria Updates",
    summary:
      "Income multiplier and obligation-ratio norms have been updated at some institutions, which may change eligible loan amounts for certain profiles.",
    date: "Updated recently", // EDIT
  },
  {
    id: "insurance-renewal-guidelines",
    title: "Insurance Renewal Guidelines",
    summary:
      "Insurers continue to tighten inspection norms for lapsed motor policies. Renewing on time preserves your no-claim bonus and avoids re-inspection.",
    date: "Updated recently", // EDIT
  },
];

export const OFFER_CATEGORIES: ("All" | OfferCategory)[] = [
  "All",
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Car Loan",
  "Loan Against Property",
  "Insurance",
  "Policy Updates",
];

export const OFFERS_DISCLAIMER =
  "Offers, interest rates, eligibility, processing fees, insurance premiums, and approval terms may vary based on applicant profile, lender policies, documentation, credit score, and internal guidelines. HK FINCORP provides consultancy and assistance. Final approval remains subject to the respective bank, NBFC, insurer, or financial institution.";
