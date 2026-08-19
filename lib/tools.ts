export type ToolIconName = "calculator" | "gauge" | "badge-check" | "list-checks";

export interface Tool {
  icon: ToolIconName;
  title: string;
  copy: string;
  href: string;
  cta?: string;
}

export const TOOLS: Tool[] = [
  {
    icon: "calculator",
    title: "EMI Calculator",
    copy: "Plan your monthly outgo with a precise EMI, total interest, and total payable breakdown.",
    href: "/emi-calculator",
    cta: "Calculate EMI",
  },
  {
    icon: "gauge",
    title: "Credit Score Checker",
    copy: "Begin a consent-based credit health review with guidance from our experts.",
    href: "/credit-score",
    cta: "Check Score",
  },
  {
    icon: "badge-check",
    title: "Loan Eligibility Checker",
    copy: "Get a soft estimate of your loan consultation eligibility from a few simple inputs.",
    href: "/financial-tools#eligibility",
    cta: "Check Eligibility",
  },
  {
    icon: "list-checks",
    title: "Document Checklist Assistant",
    copy: "Instantly build the document list for your service and employment type.",
    href: "/financial-tools#document-checklist",
    cta: "Build Checklist",
  },
];
