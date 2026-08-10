export type TestimonialService = "Home Loan" | "Business Loan" | "Car Loan" | "Insurance";

export interface Testimonial {
  id: string;
  quote: string;
  initials: string; // EDIT: replace with real client initials
  name: string; // EDIT: replace with real client name (with consent)
  city: string; // EDIT: replace with real city
  service: TestimonialService;
}

/** EDIT: All testimonials are editable placeholders — replace with real client feedback (with consent). */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "HK FINCORP guided us clearly through the entire process and helped us understand the best available options. Every step was explained before we committed to anything.",
    initials: "RS",
    name: "R. Sharma",
    city: "Delhi NCR",
    service: "Home Loan",
  },
  {
    id: "t2",
    quote:
      "What stood out was the honesty. They told us plainly which offers made sense for our profile and which didn't. Our working capital loan came through smoothly.",
    initials: "AK",
    name: "A. Khanna",
    city: "Ludhiana",
    service: "Business Loan",
  },
  {
    id: "t3",
    quote:
      "Buying a pre-owned car felt complicated until we spoke to the HK FINCORP team. They handled the valuation, loan, and RC transfer coordination end-to-end.",
    initials: "VM",
    name: "V. Mehta",
    city: "Jaipur",
    service: "Car Loan",
  },
  {
    id: "t4",
    quote:
      "They helped us restructure our family's health cover with a sensible floater and top-up. The fine print was explained patiently — no jargon, no pressure.",
    initials: "SP",
    name: "S. Patel",
    city: "Ahmedabad",
    service: "Insurance",
  },
  {
    id: "t5",
    quote:
      "Our home loan balance transfer saved us meaningfully over the remaining tenure. The team ran the numbers with us first and only recommended the move because it genuinely helped.",
    initials: "NG",
    name: "N. Gupta",
    city: "Gurugram",
    service: "Home Loan",
  },
  {
    id: "t6",
    quote:
      "As a small manufacturer, getting the right lender mattered. HK FINCORP knew which institutions understood our industry and presented our file properly.",
    initials: "MJ",
    name: "M. Joshi",
    city: "Pune",
    service: "Business Loan",
  },
  {
    id: "t7",
    quote:
      "Motor insurance renewal used to be a last-minute scramble. Now we get timely reminders and a clear comparison before renewing. Small thing, big peace of mind.",
    initials: "TK",
    name: "T. Kaur",
    city: "Chandigarh",
    service: "Insurance",
  },
  {
    id: "t8",
    quote:
      "From loan sanction to delivery, our new car purchase was coordinated perfectly with the dealership. Transparent about every charge along the way.",
    initials: "DB",
    name: "D. Bhatia",
    city: "Mumbai",
    service: "Car Loan",
  },
];

export const TESTIMONIAL_FILTERS: ("All" | TestimonialService)[] = [
  "All",
  "Home Loan",
  "Business Loan",
  "Car Loan",
  "Insurance",
];
