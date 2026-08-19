export interface Faq {
  question: string;
  answer: string;
}

/** General FAQs used on the contact page and structured data. */
export const GENERAL_FAQS: Faq[] = [
  {
    question: "What does HK FINCORP do?",
    answer:
      "HK FINCORP is a pan-India financial consultancy with 24+ years of experience. We guide individuals, families, and businesses through loan and insurance decisions — comparing lenders and insurers, assisting with documentation, and supporting you end-to-end until your requirement is fulfilled.",
  },
  {
    question: "Do you charge for consultations?",
    answer:
      "Initial consultations are free. We first understand your requirement and profile, then guide you on realistic options across our banking and insurance network.",
  },
  {
    question: "Does HK FINCORP guarantee loan approval?",
    answer:
      "No consultancy can — and you should be cautious of anyone who claims otherwise. Approvals are always subject to lender policies, eligibility, documentation, credit profile, and internal approval guidelines. What we do promise is honest guidance, correct positioning of your application, and complete support through the process.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We assist clients across India. Consultations happen over phone, WhatsApp, and email, with in-person support depending on location.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply book a free consultation through the contact form, call us, or message us on WhatsApp. Share your requirement, and our team will guide you from there.",
  },
];
