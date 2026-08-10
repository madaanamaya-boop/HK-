export type EmploymentType = "salaried" | "self-employed" | "business-owner";

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  salaried: "Salaried",
  "self-employed": "Self-Employed",
  "business-owner": "Business Owner",
};

export interface DocumentGroup {
  group: string;
  items: string[];
}

const KYC: DocumentGroup = {
  group: "Identity & Address Proof",
  items: ["PAN card", "Aadhaar card", "Passport / Voter ID / Driving licence (any one, as address proof)"],
};

const PHOTOS: DocumentGroup = {
  group: "Photographs",
  items: ["Recent passport-size photographs"],
};

function incomeDocs(employment: EmploymentType): DocumentGroup {
  if (employment === "salaried") {
    return {
      group: "Income Proof",
      items: [
        "Last 3 months salary slips",
        "Form 16 (latest 2 years)",
        "Employment / appointment letter if recently joined",
      ],
    };
  }
  if (employment === "self-employed") {
    return {
      group: "Income Proof",
      items: [
        "Last 2 years ITRs with computation",
        "Professional qualification / registration proof",
        "Financial statements if applicable",
      ],
    };
  }
  return {
    group: "Income & Business Proof",
    items: [
      "Last 2 years ITRs with financials (P&L, balance sheet)",
      "GST returns — typically last 12 months",
      "Business registration / continuity proof (GST certificate, licences)",
    ],
  };
}

function bankStatements(employment: EmploymentType): DocumentGroup {
  return {
    group: "Bank Statements",
    items: [
      employment === "salaried"
        ? "Last 6 months salary account statements"
        : "Last 6–12 months business / primary account statements",
    ],
  };
}

const PROPERTY_DOCS: DocumentGroup = {
  group: "Property Documents",
  items: [
    "Sale agreement / allotment letter",
    "Complete title chain documents",
    "Approved building plan / sanctions",
    "Latest property tax receipts where applicable",
  ],
};

const VEHICLE_DOCS: DocumentGroup = {
  group: "Vehicle Documents",
  items: [
    "Proforma invoice (new car) or RC copy (used car)",
    "Existing insurance copy for used vehicles",
    "Seller KYC and RC transfer papers for used vehicles",
  ],
};

const INSURANCE_DOCS: DocumentGroup = {
  group: "Insurance Documents",
  items: [
    "Previous policy copy for renewals or porting",
    "Vehicle RC copy (for motor insurance)",
    "Medical reports if required by the insurer",
  ],
};

/**
 * Returns the indicative document checklist for a service + employment type.
 * Final requirements vary by lender/insurer.
 */
export function getDocumentChecklist(serviceSlug: string, employment: EmploymentType): DocumentGroup[] {
  const base = [KYC, incomeDocs(employment), bankStatements(employment)];

  switch (serviceSlug) {
    case "home-loan":
    case "loan-against-property":
      return [...base, PROPERTY_DOCS, PHOTOS];
    case "new-car-loan":
    case "used-car-loan":
      return [...base, VEHICLE_DOCS, PHOTOS];
    case "motor-insurance":
      return [KYC, INSURANCE_DOCS];
    case "life-insurance":
    case "mediclaim":
      return [KYC, incomeDocs(employment), INSURANCE_DOCS, PHOTOS];
    default:
      return [...base, PHOTOS];
  }
}

export const CHECKLIST_NOTE =
  "This checklist is indicative. Final document requirements vary by lender, insurer, profile, and product. Our team shares an exact list during your consultation.";
