export type PartnerKey =
  | "hdfc"
  | "icici"
  | "axis"
  | "idfc"
  | "kotak"
  | "yes"
  | "tata"
  | "hdb"
  | "hero"
  | "godrej";

export interface Partner {
  key: PartnerKey;
  name: string;
  abbreviation: string;
  type: "Bank" | "NBFC" | "Housing Finance";
}

/** EDIT: Partner list is indicative and may be updated as per active business relationships. */
export const PARTNERS: Partner[] = [
  { key: "hdfc", name: "HDFC Bank", abbreviation: "HDFC", type: "Bank" },
  { key: "icici", name: "ICICI Bank", abbreviation: "ICICI", type: "Bank" },
  { key: "axis", name: "Axis Bank", abbreviation: "AXIS", type: "Bank" },
  { key: "idfc", name: "IDFC FIRST Bank", abbreviation: "IDFC", type: "Bank" },
  { key: "kotak", name: "Kotak Mahindra Bank", abbreviation: "KOTAK", type: "Bank" },
  { key: "yes", name: "Yes Bank", abbreviation: "YES", type: "Bank" },
  { key: "tata", name: "Tata Capital", abbreviation: "TATA", type: "NBFC" },
  { key: "hdb", name: "HDB Financial Services", abbreviation: "HDB", type: "NBFC" },
  { key: "hero", name: "Hero Housing Finance", abbreviation: "HERO", type: "Housing Finance" },
  { key: "godrej", name: "Godrej Finance", abbreviation: "GODREJ", type: "NBFC" },
];

export const PARTNERS_NOTE =
  "Partner list is indicative and may be updated as per active business relationships. All bank, NBFC, and insurer names and marks belong to their respective owners.";
