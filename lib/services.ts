export type ServiceCategory = "Loan" | "Insurance";

export type ServiceIcon =
  | "home"
  | "landmark"
  | "briefcase"
  | "wallet"
  | "car"
  | "car-front"
  | "shield"
  | "heart-handshake"
  | "stethoscope";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  icon: ServiceIcon;
  tagline: string;
  shortCopy: string;
  heroCopy: string;
  whoItsFor: string[];
  benefits: { title: string; copy: string }[];
  eligibility: string[];
  documents: string[];
  process: { step: string; copy: string }[];
  faqs: ServiceFaq[];
  related: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "home-loan",
    name: "Home Loan",
    category: "Loan",
    icon: "home",
    tagline: "Guidance for the home you have worked towards",
    shortCopy:
      "Structured guidance for new purchases, construction, and balance transfers — with lender options matched to your profile.",
    heroCopy:
      "A home is one of life's most important financial decisions. HK FINCORP helps you compare lender options, understand true costs, and move from application to disbursal with clarity and confidence.",
    whoItsFor: [
      "First-time home buyers purchasing a ready or under-construction property",
      "Families upgrading to a larger home or a new city",
      "Homeowners seeking a balance transfer to reduce interest outgo",
      "Applicants planning self-construction or plot-plus-construction funding",
    ],
    benefits: [
      { title: "Lender comparison", copy: "We shortlist banks and housing finance companies suited to your income, property, and credit profile." },
      { title: "Transparent cost view", copy: "Clear guidance on interest structures, processing fees, and charges — before you commit." },
      { title: "Balance transfer support", copy: "Assessment of whether a transfer genuinely saves you money over the remaining tenure." },
      { title: "End-to-end assistance", copy: "From documentation to sanction and disbursal, our team stays with you at every step." },
    ],
    eligibility: [
      "Salaried, self-employed, and business applicants considered",
      "Age, income stability, and credit history reviewed as per lender norms",
      "Property type, title, and approvals evaluated by the lender",
      "Co-applicant income may strengthen eligibility",
    ],
    documents: [
      "PAN card and Aadhaar / address proof",
      "Last 3–6 months salary slips or income documents",
      "Last 6–12 months bank statements",
      "Form 16 / ITRs (typically 2 years)",
      "Property documents — agreement, title chain, approvals",
      "Passport-size photographs",
    ],
    process: [
      { step: "Consultation", copy: "We understand your requirement, budget, and profile in a free consultation." },
      { step: "Lender shortlist", copy: "We compare suitable banks and HFCs and explain the trade-offs clearly." },
      { step: "Documentation", copy: "Our team helps you prepare a complete, accurate application file." },
      { step: "Sanction & legal", copy: "We coordinate credit assessment, property legal, and technical checks." },
      { step: "Disbursal", copy: "We follow through until funds are disbursed and your file is closed cleanly." },
    ],
    faqs: [
      {
        question: "How much home loan can I get?",
        answer:
          "Eligibility depends on your income, existing obligations, credit profile, property value, and the lender's internal policies. In a consultation we help you arrive at a realistic range across lenders — subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.",
      },
      {
        question: "Should I choose a bank or a housing finance company?",
        answer:
          "Both have strengths. Banks often offer competitive rates for strong profiles, while housing finance companies can be more flexible on property and income types. We help you compare options suited to your specific situation.",
      },
      {
        question: "Is a home loan balance transfer worth it?",
        answer:
          "It can be, if the interest saving over the remaining tenure meaningfully exceeds transfer costs. We run this calculation with you honestly — and tell you plainly if staying put is the better choice.",
      },
      {
        question: "How long does home loan processing take?",
        answer:
          "Timelines vary by lender and property, typically from a few working days to a few weeks including legal and technical verification. Complete documentation is the biggest factor in a smooth timeline.",
      },
    ],
    related: ["loan-against-property", "personal-loan", "life-insurance"],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    category: "Loan",
    icon: "landmark",
    tagline: "Unlock the value of your property, responsibly",
    shortCopy:
      "Leverage residential or commercial property for business growth, education, or consolidation — with clear-eyed advice.",
    heroCopy:
      "A loan against property can unlock significant funds at reasonable rates — when structured correctly. We help you evaluate lenders, loan-to-value options, and repayment structures that protect your asset and your peace of mind.",
    whoItsFor: [
      "Business owners funding expansion or working capital",
      "Families financing higher education or major life events",
      "Borrowers consolidating high-cost debt into one structured loan",
      "Owners of residential, commercial, or industrial property",
    ],
    benefits: [
      { title: "Higher loan amounts", copy: "Property-backed lending typically allows larger amounts than unsecured loans." },
      { title: "Longer tenures", copy: "Extended repayment options help keep EMIs manageable." },
      { title: "Multiple property types", copy: "Residential, commercial, and select industrial properties may be considered." },
      { title: "Honest structuring", copy: "We advise on loan-to-value and tenure so the loan works for you, not against you." },
    ],
    eligibility: [
      "Clear and marketable property title as assessed by the lender",
      "Income adequacy from salary, business, or rentals",
      "Credit history and existing obligations reviewed",
      "Property valuation and legal verification by the lender",
    ],
    documents: [
      "PAN card and Aadhaar / address proof",
      "Income documents — ITRs, financials, or salary slips",
      "Last 6–12 months bank statements",
      "Complete property title documents and approvals",
      "Existing loan statements, if any",
      "Passport-size photographs",
    ],
    process: [
      { step: "Consultation", copy: "We understand the purpose, amount, and property details." },
      { step: "Lender shortlist", copy: "We identify lenders whose LAP policies fit your property and profile." },
      { step: "Valuation & legal", copy: "We coordinate the lender's property valuation and legal checks." },
      { step: "Sanction", copy: "Credit assessment and sanction terms are negotiated and explained clearly." },
      { step: "Disbursal", copy: "We assist through registration of charge and final disbursal." },
    ],
    faqs: [
      {
        question: "How much can I borrow against my property?",
        answer:
          "Lenders typically fund a percentage of the property's assessed market value, subject to your income and repayment capacity. The exact amount is subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.",
      },
      {
        question: "Can I get a LAP on a commercial property?",
        answer:
          "Yes, many lenders consider commercial and select industrial properties. Loan-to-value ratios and rates may differ from residential property. We help you find lenders active in your property category.",
      },
      {
        question: "Is LAP cheaper than a personal or business loan?",
        answer:
          "Because it is secured, LAP rates are generally lower than unsecured lending — but tenures are longer and the property is collateral. We help you weigh total cost and risk honestly before you decide.",
      },
    ],
    related: ["home-loan", "business-loan", "life-insurance"],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    category: "Loan",
    icon: "briefcase",
    tagline: "Capital that keeps pace with your ambition",
    shortCopy:
      "Working capital, expansion, and MSME funding guidance — matched to your business profile and banking history.",
    heroCopy:
      "Growing a business needs timely, well-structured capital. HK FINCORP works with banks and NBFCs across India to help proprietors, partnerships, and companies access funding that fits their cash flows.",
    whoItsFor: [
      "MSMEs and proprietors seeking working capital or expansion funds",
      "Partnerships and private limited companies scaling operations",
      "Traders, manufacturers, and service businesses with banking history",
      "Professionals — doctors, CAs, architects — funding their practice",
    ],
    benefits: [
      { title: "Wide lender network", copy: "Access to banks and NBFCs with differing appetites for industry and ticket size." },
      { title: "Structured to cash flow", copy: "Guidance on tenure and EMI structures that respect your working capital cycle." },
      { title: "Collateral-free options", copy: "Unsecured business loan options may be available for eligible profiles." },
      { title: "Faster processing", copy: "Complete, well-presented files move faster — we make sure yours is one of them." },
    ],
    eligibility: [
      "Business vintage typically 2–3 years, as per lender norms",
      "Turnover, profitability, and banking conduct reviewed",
      "Credit history of the business and promoters considered",
      "Industry and geography policies vary by lender",
    ],
    documents: [
      "KYC of business and promoters — PAN, Aadhaar, registration proof",
      "Last 2 years ITRs with financials",
      "GST returns (typically 12 months)",
      "Last 6–12 months bank statements",
      "Business continuity proof — registrations, licences",
      "Existing loan sanction letters, if any",
    ],
    process: [
      { step: "Consultation", copy: "We understand your business, requirement, and timelines." },
      { step: "Profile assessment", copy: "We review financials and banking to position your file well." },
      { step: "Lender matching", copy: "We shortlist lenders whose policies favour your industry and profile." },
      { step: "Application", copy: "Documentation and application are prepared and submitted properly." },
      { step: "Sanction & disbursal", copy: "We coordinate queries, sanction terms, and disbursal end-to-end." },
    ],
    faqs: [
      {
        question: "Can I get a business loan without collateral?",
        answer:
          "Many lenders offer unsecured business loans to eligible profiles based on turnover, banking conduct, and credit history. Amounts and rates vary — subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.",
      },
      {
        question: "My business is seasonal. Does that affect eligibility?",
        answer:
          "Seasonality is common and lenders account for it, though banking conduct across the year matters. We help present your cash-flow story accurately so lenders assess your business fairly.",
      },
      {
        question: "How fast can a business loan be processed?",
        answer:
          "For complete files, unsecured business loans can move in days; secured facilities take longer due to valuation and legal work. We keep the process moving and keep you informed throughout.",
      },
    ],
    related: ["loan-against-property", "personal-loan", "mediclaim"],
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    category: "Loan",
    icon: "wallet",
    tagline: "Flexible funds for life's important moments",
    shortCopy:
      "Weddings, education, medical needs, or consolidation — clear guidance on the right lender and the right amount.",
    heroCopy:
      "A personal loan should solve a problem, not create one. We help you borrow the right amount from the right lender, with honest advice on rates, tenures, and total cost — so the loan fits your life.",
    whoItsFor: [
      "Salaried professionals with steady income",
      "Self-employed individuals with documented income",
      "Families funding weddings, education, travel, or medical needs",
      "Borrowers consolidating multiple high-cost obligations",
    ],
    benefits: [
      { title: "No collateral needed", copy: "Unsecured lending based on your income and credit profile." },
      { title: "Quick turnaround", copy: "For eligible profiles with complete documents, processing can be swift." },
      { title: "Right-sized borrowing", copy: "We advise on the amount and tenure that keeps your EMIs comfortable." },
      { title: "Rate comparison", copy: "We compare offers across banks and NBFCs so you see the real cost." },
    ],
    eligibility: [
      "Minimum income criteria as per lender and city",
      "Employment stability or business vintage reviewed",
      "Credit score and existing EMI obligations considered",
      "Age typically 21–60 years, as per lender norms",
    ],
    documents: [
      "PAN card and Aadhaar / address proof",
      "Last 3 months salary slips or income proof",
      "Last 3–6 months bank statements",
      "Form 16 or ITRs for self-employed applicants",
      "Passport-size photographs",
    ],
    process: [
      { step: "Consultation", copy: "We understand your need, amount, and repayment comfort." },
      { step: "Offer comparison", copy: "We compare suitable lender offers on rate, fees, and tenure." },
      { step: "Application", copy: "Documentation is completed accurately, in one go." },
      { step: "Approval & disbursal", copy: "We follow through until the amount reaches your account." },
    ],
    faqs: [
      {
        question: "What credit score do I need for a personal loan?",
        answer:
          "Most lenders prefer healthy credit scores, though policies vary and other factors like income and obligations matter too. If your score needs work, we guide you on improving it before applying — subject to lender policies and internal approval guidelines.",
      },
      {
        question: "Can I prepay or foreclose a personal loan?",
        answer:
          "Most lenders allow prepayment after an initial period, sometimes with charges. We factor prepayment flexibility into lender selection if you expect to close early.",
      },
      {
        question: "How much EMI is safe for my income?",
        answer:
          "A common guideline is keeping total EMIs within 40–50% of net monthly income, but the right number depends on your expenses and goals. Use our EMI calculator, then speak to us for personalised guidance.",
      },
    ],
    related: ["home-loan", "business-loan", "mediclaim"],
  },
  {
    slug: "new-car-loan",
    name: "New Car Loan",
    category: "Loan",
    icon: "car-front",
    tagline: "Drive home your new car with confidence",
    shortCopy:
      "Competitive funding options for new cars — with clarity on rates, tenures, and on-road cost funding.",
    heroCopy:
      "Buying a new car should be a happy milestone, not a paperwork maze. We help you secure well-priced funding, understand what portion of the on-road price can be financed, and complete the process smoothly alongside your dealer.",
    whoItsFor: [
      "Salaried and self-employed individuals buying their first or next car",
      "Families upgrading to a larger or safer vehicle",
      "Business owners adding vehicles for personal or company use",
    ],
    benefits: [
      { title: "High funding percentage", copy: "Eligible profiles may receive funding for a substantial part of the on-road price." },
      { title: "Quick sanctions", copy: "Car loans move fast when files are complete — we make sure yours is." },
      { title: "Dealer coordination", copy: "We coordinate between you, the lender, and the dealership for a smooth delivery." },
      { title: "Clear cost picture", copy: "Rates, processing fees, and charges explained before you sign." },
    ],
    eligibility: [
      "Minimum income criteria as per lender norms",
      "Credit history and existing obligations reviewed",
      "Employment stability or business vintage considered",
      "Vehicle model and variant as per lender's approved list",
    ],
    documents: [
      "PAN card and Aadhaar / address proof",
      "Last 3 months salary slips or income documents",
      "Last 3–6 months bank statements",
      "Proforma invoice from the dealership",
      "Passport-size photographs",
    ],
    process: [
      { step: "Consultation", copy: "Share the car, variant, and budget you have in mind." },
      { step: "Offer comparison", copy: "We compare lender offers on rate, funding percentage, and fees." },
      { step: "Documentation", copy: "Application and documents completed accurately." },
      { step: "Sanction & delivery", copy: "Disbursal is coordinated with the dealer so you take delivery on time." },
    ],
    faqs: [
      {
        question: "How much of the car price can be financed?",
        answer:
          "Depending on your profile and the lender, a substantial portion of the ex-showroom or on-road price may be financed. Exact funding is subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines.",
      },
      {
        question: "What tenure should I choose for a car loan?",
        answer:
          "Shorter tenures cost less overall; longer tenures ease monthly cash flow. Most borrowers choose 3–7 years. We help you find the balance that suits your budget.",
      },
      {
        question: "Can I get a car loan if I already have a home loan?",
        answer:
          "Yes, provided your income comfortably supports both EMIs as per lender norms. We assess your obligations honestly before recommending an amount.",
      },
    ],
    related: ["used-car-loan", "motor-insurance", "personal-loan"],
  },
  {
    slug: "used-car-loan",
    name: "Used Car Loan",
    category: "Loan",
    icon: "car",
    tagline: "Smart funding for pre-owned cars",
    shortCopy:
      "Specialised guidance for pre-owned car funding — valuation, lender selection, and transfer support included.",
    heroCopy:
      "Used car funding is a specialised space — valuations, vehicle age norms, and lender policies vary widely. With deep experience in this segment, HK FINCORP helps you fund the right pre-owned car at sensible terms.",
    whoItsFor: [
      "First-time buyers choosing a value-for-money pre-owned car",
      "Families adding a second car within budget",
      "Buyers purchasing from dealers or directly from individual sellers",
      "Business owners building small vehicle fleets economically",
    ],
    benefits: [
      { title: "Segment expertise", copy: "Used car lending has its own rules — we know the lenders who do it well." },
      { title: "Valuation guidance", copy: "Understand how lenders value the vehicle and what that means for funding." },
      { title: "Seller-to-seller support", copy: "Assistance with RC transfer and process even in individual-seller purchases." },
      { title: "Sensible structuring", copy: "Tenure and amount advice that matches the car's age and your budget." },
    ],
    eligibility: [
      "Vehicle age and model as per lender norms (total age at loan maturity matters)",
      "Minimum income criteria as per lender",
      "Credit history and existing obligations reviewed",
      "Vehicle valuation by lender-approved agencies",
    ],
    documents: [
      "PAN card and Aadhaar / address proof",
      "Last 3 months salary slips or income documents",
      "Last 3–6 months bank statements",
      "Vehicle RC, insurance, and seller documents",
      "Passport-size photographs",
    ],
    process: [
      { step: "Consultation", copy: "Tell us about the car you have shortlisted and your budget." },
      { step: "Valuation check", copy: "We guide you on realistic funding based on the vehicle's age and value." },
      { step: "Lender matching", copy: "We select lenders active in the used car segment for your profile." },
      { step: "Documentation", copy: "Loan documents and vehicle papers are completed correctly." },
      { step: "Disbursal & transfer", copy: "Funds are disbursed and RC transfer/hypothecation is completed." },
    ],
    faqs: [
      {
        question: "How old a car can be financed?",
        answer:
          "Most lenders look at the car's total age at the end of the loan tenure — commonly capped around 8–10 years, varying by lender and model. We match you with lenders suited to the specific vehicle.",
      },
      {
        question: "Are used car loan rates higher than new car loans?",
        answer:
          "Generally yes, as lenders price in the vehicle's age and resale factors. Rates vary meaningfully across lenders though — which is exactly where comparison and guidance help.",
      },
      {
        question: "Can I buy a used car directly from an individual seller with a loan?",
        answer:
          "Yes, several lenders fund seller-to-seller transactions. The process involves additional verification and RC transfer steps, and we assist you through all of them.",
      },
    ],
    related: ["new-car-loan", "motor-insurance", "personal-loan"],
  },
  {
    slug: "motor-insurance",
    name: "Motor Insurance",
    category: "Insurance",
    icon: "shield",
    tagline: "Protection for every kilometre",
    shortCopy:
      "Comprehensive and third-party motor cover guidance — renewals, claims support, and the right add-ons.",
    heroCopy:
      "The right motor insurance is about more than the lowest premium. We help you choose covers and add-ons that actually protect you — and stand by you with support when renewals and claims come around.",
    whoItsFor: [
      "Car and two-wheeler owners renewing or buying insurance",
      "New vehicle buyers choosing their first policy",
      "Owners of ageing vehicles reviewing cover versus cost",
      "Small businesses insuring commercial vehicles",
    ],
    benefits: [
      { title: "Insurer comparison", copy: "Compare premiums and claim service quality across leading insurers." },
      { title: "Right add-ons", copy: "Honest advice on zero depreciation, engine protection, and roadside assistance." },
      { title: "Renewal reminders", copy: "Assistance so your cover never lapses — lapses cost you no-claim bonus." },
      { title: "Claims guidance", copy: "Support in documentation and follow-up when you need it most." },
    ],
    eligibility: [
      "Valid vehicle registration (RC) in the proposer's name",
      "Vehicle inspection may apply for lapsed policies",
      "Premiums vary by vehicle age, model, city, and claim history",
      "No-claim bonus transferable as per insurer norms",
    ],
    documents: [
      "Vehicle RC copy",
      "Previous policy copy (for renewals)",
      "PAN / Aadhaar of the proposer",
      "Invoice copy for new vehicles",
    ],
    process: [
      { step: "Requirement review", copy: "We understand your vehicle, usage, and existing cover." },
      { step: "Quote comparison", copy: "Premiums and covers compared across suitable insurers." },
      { step: "Policy issuance", copy: "Documentation and payment are completed; policy issued." },
      { step: "Ongoing support", copy: "Renewal reminders and claims assistance whenever needed." },
    ],
    faqs: [
      {
        question: "What is the difference between comprehensive and third-party cover?",
        answer:
          "Third-party cover is the legal minimum and protects against liability to others. Comprehensive cover also protects your own vehicle against damage, theft, and calamities. For most vehicles, comprehensive cover is worth considering.",
      },
      {
        question: "Is zero depreciation cover worth it?",
        answer:
          "For newer vehicles, zero depreciation add-ons often pay for themselves in a single claim by removing depreciation deductions. For older vehicles the economics change — we advise based on your specific vehicle.",
      },
      {
        question: "What happens if my policy lapses?",
        answer:
          "Driving uninsured is illegal, and lapses can cost you your accumulated no-claim bonus. Renewal after a lapse may require vehicle inspection. We help you renew on time and restore cover quickly if a lapse occurs.",
      },
    ],
    related: ["new-car-loan", "used-car-loan", "life-insurance"],
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    category: "Insurance",
    icon: "heart-handshake",
    tagline: "Security for the people who matter most",
    shortCopy:
      "Term plans and life cover guidance focused on genuine protection — not just policy sales.",
    heroCopy:
      "Life insurance is a promise to your family. We help you calculate the cover your family genuinely needs, compare plans from reputed insurers, and choose protection that will stand by them — clearly and without jargon.",
    whoItsFor: [
      "Earning members securing their family's financial future",
      "Home and business loan borrowers protecting liabilities",
      "Parents planning for children's education and milestones",
      "Anyone reviewing old policies for adequacy of cover",
    ],
    benefits: [
      { title: "Needs-based cover", copy: "We calculate cover from your income, liabilities, and goals — not a sales target." },
      { title: "Term-first advice", copy: "Honest guidance on term insurance as the foundation of protection." },
      { title: "Insurer comparison", copy: "Claim settlement track records and plan features compared transparently." },
      { title: "Claim-time support", copy: "We stand with families through documentation when claims arise." },
    ],
    eligibility: [
      "Age and income criteria as per insurer norms",
      "Medical underwriting may apply based on age and cover amount",
      "Premiums vary by age, health, lifestyle, and cover chosen",
      "Disclosures must be complete and accurate for valid claims",
    ],
    documents: [
      "PAN and Aadhaar / address proof",
      "Income proof — salary slips, ITRs as per cover amount",
      "Recent photographs",
      "Medical reports if required by the insurer",
    ],
    process: [
      { step: "Needs analysis", copy: "We assess how much cover your family actually needs." },
      { step: "Plan comparison", copy: "Suitable plans compared on cover, premium, and claim record." },
      { step: "Application", copy: "Proposal and disclosures completed accurately — this protects your claim." },
      { step: "Medical & issuance", copy: "Any medical checks coordinated; policy issued and explained." },
    ],
    faqs: [
      {
        question: "How much life cover do I need?",
        answer:
          "A common starting point is 10–15 times your annual income plus outstanding liabilities, adjusted for your family's goals. We help you calculate a number specific to your situation.",
      },
      {
        question: "Term insurance or endowment — which is better?",
        answer:
          "Term insurance offers the largest cover at the lowest cost and is usually the right foundation. Savings-linked plans serve different goals. We explain both honestly so you choose what fits your needs.",
      },
      {
        question: "Why do life insurance claims get rejected?",
        answer:
          "The most common reason is incomplete or inaccurate disclosure at proposal stage. We make sure your application is complete and truthful — the strongest protection your family's claim can have.",
      },
    ],
    related: ["mediclaim", "home-loan", "motor-insurance"],
  },
  {
    slug: "mediclaim",
    name: "Mediclaim / Health Insurance",
    category: "Insurance",
    icon: "stethoscope",
    tagline: "Healthcare costs, handled with foresight",
    shortCopy:
      "Family floater and individual health cover guidance — with honest advice on sum insured, waiting periods, and claims.",
    heroCopy:
      "Medical costs rise faster than most incomes. The right health cover protects your savings when it matters. We help you choose plans with adequate sum insured, sensible waiting periods, and insurers with strong claim service.",
    whoItsFor: [
      "Families seeking floater cover for all members",
      "Individuals supplementing employer group cover",
      "Parents arranging cover for senior citizens",
      "Self-employed professionals without employer benefits",
    ],
    benefits: [
      { title: "Right sum insured", copy: "Guidance on cover amounts that reflect real hospital costs in your city." },
      { title: "Fine-print clarity", copy: "Waiting periods, room-rent limits, and exclusions explained before you buy." },
      { title: "Renewal & portability", copy: "Support for renewals and porting to better plans without losing benefits." },
      { title: "Claims assistance", copy: "Cashless coordination and reimbursement documentation support." },
    ],
    eligibility: [
      "Entry age norms vary by insurer and plan",
      "Pre-existing conditions subject to waiting periods and disclosures",
      "Medical tests may apply based on age and sum insured",
      "Premiums vary by age, city, and cover selected",
    ],
    documents: [
      "PAN and Aadhaar / address proof of proposer",
      "Age proof for all members to be covered",
      "Recent photographs",
      "Medical reports if required by the insurer",
      "Previous policy copy for renewals or porting",
    ],
    process: [
      { step: "Needs review", copy: "Family members, ages, medical history, and city are considered." },
      { step: "Plan comparison", copy: "Plans compared on cover, features, network hospitals, and claim record." },
      { step: "Proposal", copy: "Application with complete disclosures — essential for smooth claims." },
      { step: "Issuance & support", copy: "Policy issued and explained; we stay available for claims and renewals." },
    ],
    faqs: [
      {
        question: "How much health cover should my family have?",
        answer:
          "For metro cities, many families now consider ₹10–25 lakh floater covers given rising hospital costs, often structured as a base plan plus super top-up. We help you find the right structure for your budget.",
      },
      {
        question: "What is a waiting period in health insurance?",
        answer:
          "Most plans have initial waiting periods and longer ones for pre-existing conditions or specific treatments. Understanding these before buying prevents unpleasant surprises — we walk you through them plainly.",
      },
      {
        question: "Can I port my existing health policy to a better one?",
        answer:
          "Yes, IRDAI portability rules let you switch insurers while retaining accrued waiting-period credits, subject to the new insurer's acceptance. We assist with timing and paperwork for a smooth port.",
      },
    ],
    related: ["life-insurance", "personal-loan", "motor-insurance"],
  },
];

export const LOAN_SERVICES = SERVICES.filter((s) => s.category === "Loan");
export const INSURANCE_SERVICES = SERVICES.filter((s) => s.category === "Insurance");

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
