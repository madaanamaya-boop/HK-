/**
 * Rule-based chatbot engine for HK FINCORP.
 * Deterministic keyword matching — safe, fast, and easy to extend.
 * Later this can be swapped for an LLM/API-backed responder inside /api/chatbot.
 */

export interface BotLink {
  label: string;
  href: string;
}

export interface BotReply {
  text: string;
  links?: BotLink[];
  quickReplies?: string[];
  /** Signals the UI to start collecting name + mobile for a human callback. */
  collectLead?: boolean;
}

export const DEFAULT_QUICK_REPLIES = [
  "Check EMI",
  "Check Credit Score",
  "Home Loan",
  "Business Loan",
  "Documents Required",
  "Talk to Expert",
];

export const BOT_GREETING: BotReply = {
  text: "Namaste! I'm the HK FINCORP assistant. I can help you with loans, insurance, documents, EMI calculations, and connecting you to our experts. What would you like to know?",
  quickReplies: DEFAULT_QUICK_REPLIES,
};

interface Rule {
  keywords: RegExp;
  reply: BotReply;
}

const SAFE_NOTE =
  "Please note: final terms are always subject to lender/insurer policies, eligibility, documentation, and credit profile.";

const RULES: Rule[] = [
  {
    keywords: /\b(human|expert|agent|advisor|adviser|call ?back|callback|talk to|speak to|representative|consultant|help me|connect)\b/i,
    reply: {
      text: "I'd be happy to connect you with an HK FINCORP expert for a free consultation. May I take your name and mobile number so our team can call you back?",
      collectLead: true,
    },
  },
  {
    keywords: /\b(emi|calculat|monthly (payment|instal))\b/i,
    reply: {
      text: "You can calculate your EMI instantly with our calculator — adjust the loan amount, interest rate, and tenure to see your monthly EMI, total interest, and total payable.",
      links: [{ label: "Open EMI Calculator", href: "/emi-calculator" }],
      quickReplies: ["Home Loan", "Personal Loan", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(credit score|cibil|experian|credit report|score check)\b/i,
    reply: {
      text: "Our Credit Score Checker helps you begin a consent-based credit health review. Share a few details and our team will guide you on your score and loan eligibility. Credit score checks are subject to user consent and third-party credit bureau/API availability.",
      links: [{ label: "Check Credit Score", href: "/credit-score" }],
      quickReplies: ["Check EMI", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(home loan|housing loan|house loan|flat|apartment|balance transfer)\b/i,
    reply: {
      text: `We assist with home loans for new purchases, construction, and balance transfers — comparing banks and housing finance companies suited to your profile, then supporting you from documentation to disbursal. ${SAFE_NOTE}`,
      links: [
        { label: "Home Loan Details", href: "/services/home-loan" },
        { label: "Calculate EMI", href: "/emi-calculator" },
      ],
      quickReplies: ["Documents Required", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(lap|loan against property|property loan|mortgage loan)\b/i,
    reply: {
      text: `A loan against property lets you unlock funds against residential or commercial property, typically at lower rates than unsecured loans. We help with structuring, lender selection, and end-to-end processing. ${SAFE_NOTE}`,
      links: [{ label: "LAP Details", href: "/services/loan-against-property" }],
      quickReplies: ["Documents Required", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(business loan|msme|working capital|business fund|expansion)\b/i,
    reply: {
      text: `We guide MSMEs, proprietors, and companies to business funding matched to their industry and banking history — including collateral-free options for eligible profiles. ${SAFE_NOTE}`,
      links: [{ label: "Business Loan Details", href: "/services/business-loan" }],
      quickReplies: ["Documents Required", "Check EMI", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(personal loan|wedding|marriage loan|education loan|travel loan|medical loan)\b/i,
    reply: {
      text: `Personal loans work well for weddings, education, medical needs, and consolidation. We compare offers across banks and NBFCs and advise on the amount and tenure that keeps your EMIs comfortable. ${SAFE_NOTE}`,
      links: [{ label: "Personal Loan Details", href: "/services/personal-loan" }],
      quickReplies: ["Check EMI", "Documents Required", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(used car|pre.?owned|second hand)\b/i,
    reply: {
      text: `Used car funding is a specialised space — vehicle age, valuation, and lender norms all matter. We know the lenders who do it well and assist even with seller-to-seller purchases and RC transfer. ${SAFE_NOTE}`,
      links: [{ label: "Used Car Loan Details", href: "/services/used-car-loan" }],
      quickReplies: ["Documents Required", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(new car|car loan|vehicle loan|auto loan|four wheeler)\b/i,
    reply: {
      text: `We help you fund your new car at sensible terms — comparing lenders on rate and funding percentage, and coordinating with your dealership for on-time delivery. ${SAFE_NOTE}`,
      links: [{ label: "New Car Loan Details", href: "/services/new-car-loan" }],
      quickReplies: ["Check EMI", "Documents Required", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(motor insurance|car insurance|vehicle insurance|two wheeler insurance|bike insurance)\b/i,
    reply: {
      text: "We help you choose motor insurance that actually protects you — comparing premiums and claim service across insurers, advising on add-ons like zero depreciation, and supporting renewals and claims.",
      links: [{ label: "Motor Insurance Details", href: "/services/motor-insurance" }],
      quickReplies: ["Talk to Expert", "Documents Required"],
    },
  },
  {
    keywords: /\b(life insurance|term (plan|insurance|cover)|life cover)\b/i,
    reply: {
      text: "We help you calculate the life cover your family genuinely needs and compare term plans from reputed insurers — with claim settlement records considered, and complete support at claim time.",
      links: [{ label: "Life Insurance Details", href: "/services/life-insurance" }],
      quickReplies: ["Talk to Expert", "Mediclaim"],
    },
  },
  {
    keywords: /\b(mediclaim|health insurance|hospital|medical insurance|floater|top.?up)\b/i,
    reply: {
      text: "We guide you on health insurance — family floaters, super top-ups, waiting periods, and room-rent limits explained plainly — so your savings are protected when medical costs arise.",
      links: [{ label: "Mediclaim Details", href: "/services/mediclaim" }],
      quickReplies: ["Talk to Expert", "Life Insurance"],
    },
  },
  {
    keywords: /\b(document|paperwork|papers|kyc|checklist)\b/i,
    reply: {
      text: "Document needs vary by service and employment type, but typically include identity/address proof (PAN, Aadhaar), income proof, and bank statements — plus property or vehicle papers where relevant. Our Document Checklist Assistant builds a list for your exact case.",
      links: [{ label: "Document Checklist Assistant", href: "/financial-tools#document-checklist" }],
      quickReplies: ["Home Loan", "Business Loan", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(eligib|qualify|how much (loan|can i))\b/i,
    reply: {
      text: `Eligibility depends on your income, obligations, credit profile, and the lender's policies. Try our Loan Eligibility Checker for a soft estimate, then speak with our team for realistic guidance. ${SAFE_NOTE}`,
      links: [{ label: "Loan Eligibility Checker", href: "/financial-tools#eligibility" }],
      quickReplies: ["Check Credit Score", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(whatsapp|wa\b)\b/i,
    reply: {
      text: "You can reach us directly on WhatsApp — tap below and our team will respond promptly.",
      links: [
        {
          label: "Chat on WhatsApp",
          href: "https://wa.me/919811162249?text=Hello%20HK%20FINCORP%2C%20I%20would%20like%20a%20free%20consultation.",
        },
      ],
      quickReplies: ["Talk to Expert"],
    },
  },
  {
    keywords: /\b(contact|phone|number|email|address|office|reach|location)\b/i,
    reply: {
      text: "You can reach HK FINCORP at +91 98111 62249, email info@hkfincorp.in, or message us on WhatsApp. We assist clients across India.",
      links: [{ label: "Contact Page", href: "/contact" }],
      quickReplies: ["Talk to Expert"],
    },
  },
  {
    keywords: /\b(offer|discount|rate|interest|processing fee|scheme)\b/i,
    reply: {
      text: `You can browse our current offers and policy updates — from home loan balance transfer assistance to insurance renewal support. ${SAFE_NOTE}`,
      links: [{ label: "Offers & Policies", href: "/offers-policies" }],
      quickReplies: ["Home Loan", "Business Loan", "Talk to Expert"],
    },
  },
  {
    keywords: /\b(about|who are you|company|founder|experience|trust)\b/i,
    reply: {
      text: "HK FINCORP is a pan-India financial consultancy with 24+ years of experience, founded by Hemant Kumar with Simran Madaan as Co-Founder. We're built on trust, transparency, and long-term relationships — guiding clients through loans and insurance with honest, personalised support.",
      links: [{ label: "About Us", href: "/about" }],
      quickReplies: ["Talk to Expert"],
    },
  },
  {
    keywords: /\b(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/i,
    reply: {
      text: "Hello! How can I help you today? I can guide you on loans, insurance, documents, EMI calculations, or connect you with our experts.",
      quickReplies: DEFAULT_QUICK_REPLIES,
    },
  },
  {
    keywords: /\b(thank|thanks|great|awesome|ok(ay)?|nice)\b/i,
    reply: {
      text: "You're welcome! If there's anything else — loans, insurance, or a free consultation — I'm right here.",
      quickReplies: ["Talk to Expert", "Check EMI"],
    },
  },
];

export function getBotReply(input: string): BotReply {
  const text = input.trim();
  for (const rule of RULES) {
    if (rule.keywords.test(text)) return rule.reply;
  }
  return {
    text: "I want to make sure you get an accurate answer. Could you tell me a little more — or would you prefer to speak with an HK FINCORP expert directly? I can arrange a free callback.",
    quickReplies: ["Talk to Expert", ...DEFAULT_QUICK_REPLIES.slice(0, 4)],
  };
}
