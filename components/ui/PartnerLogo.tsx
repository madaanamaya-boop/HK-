import type { PartnerKey } from "@/lib/partners";

/**
 * Partner brand marks.
 *
 * These are simplified, in-house geometric marks rendered in each
 * institution's brand colour — used as placeholders so the partner wall
 * reads as a logo strip rather than a text list.
 *
 * EDIT: to use official artwork, drop each logo at
 * `public/partners/<key>.svg` (or .png) and replace the <svg> below with:
 *   <Image src={`/partners/${partnerKey}.svg`} alt={name} width={132} height={32} />
 * Only use official logos you are licensed/permitted to display.
 */

interface MarkProps {
  className?: string;
}

const MARKS: Record<PartnerKey, { color: string; render: (p: MarkProps) => React.ReactNode }> = {
  hdfc: {
    color: "#004C8F",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" fill="#004C8F" />
        <rect x="7" y="7" width="14" height="14" fill="#fff" />
        <rect x="10.5" y="10.5" width="7" height="7" fill="#ED232A" />
      </svg>
    ),
  },
  icici: {
    color: "#AE275F",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <path
          d="M4 18c0-7 5.5-12 12.5-12 3 0 5.5 1 7.5 2.6-2-1-4-1.4-6-1.4C11.5 7.2 7 11.4 7 17.2c0 1.6.3 3 .9 4.3A13.4 13.4 0 0 1 4 18Z"
          fill="#F58220"
        />
        <rect x="11" y="12" width="4" height="11" rx="1" fill="#AE275F" />
        <circle cx="13" cy="8.5" r="2.2" fill="#AE275F" />
      </svg>
    ),
  },
  axis: {
    color: "#97144D",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill="#97144D" />
        <path d="M14 7.5 20.5 20h-4.2L14 15.2 11.7 20H7.5L14 7.5Z" fill="#fff" />
      </svg>
    ),
  },
  idfc: {
    color: "#9C1D22",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill="#9C1D22" />
        <rect x="6.5" y="7" width="3" height="14" fill="#fff" />
        <path d="M12 7h5.5a7 7 0 0 1 0 14H12V7Zm3 3v8h2a4 4 0 0 0 0-8h-2Z" fill="#F7A11A" />
      </svg>
    ),
  },
  kotak: {
    color: "#003874",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="12" fill="#003874" />
        <path d="M9 7h3.2v6.4L18 7h4l-6.6 7 6.9 7h-4.2l-5.9-6.1V21H9V7Z" fill="#fff" />
        <circle cx="21.5" cy="8" r="2.5" fill="#ED232A" />
      </svg>
    ),
  },
  yes: {
    color: "#00518F",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="2" fill="#00518F" />
        <path d="M7 8h3.4l3.1 5 3.1-5H20l-4.9 7.6V21h-3.2v-5.4L7 8Z" fill="#fff" />
        <circle cx="21" cy="20" r="2.4" fill="#ED1C24" />
      </svg>
    ),
  },
  tata: {
    color: "#486AAE",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <path d="M14 2 24.4 8v12L14 26 3.6 20V8L14 2Z" fill="#486AAE" />
        <path d="M8 10h12v3h-4.3v8h-3.4v-8H8v-3Z" fill="#fff" />
      </svg>
    ),
  },
  hdb: {
    color: "#00693E",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="#00693E" />
        <path d="M7 8h3v4.5h5V8h3v13h-3v-5.5h-5V21H7V8Z" fill="#fff" />
        <circle cx="21" cy="9" r="2.2" fill="#8DC63F" />
      </svg>
    ),
  },
  hero: {
    color: "#E4002B",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <path d="M2 22 14 4l12 18H2Z" fill="#E4002B" />
        <path d="M14 11.5 19.5 20h-11L14 11.5Z" fill="#fff" />
      </svg>
    ),
  },
  godrej: {
    color: "#00833E",
    render: ({ className }) => (
      <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
        <rect x="2" y="2" width="24" height="24" rx="6" fill="#00833E" />
        <path
          d="M19.5 11.2A5.6 5.6 0 0 0 14 8a6 6 0 1 0 0 12 5.8 5.8 0 0 0 5.8-4.6h-5.4v-2.6h8v1.4"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="square"
        />
      </svg>
    ),
  },
};

export function PartnerLogo({
  partnerKey,
  name,
  className,
}: {
  partnerKey: PartnerKey;
  name: string;
  className?: string;
}) {
  const mark = MARKS[partnerKey];
  return (
    <span className={className}>
      {mark.render({ className: "h-7 w-7 shrink-0" })}
      <span
        className="whitespace-nowrap font-display text-sm font-bold tracking-tight"
        style={{ color: mark.color }}
      >
        {name}
      </span>
    </span>
  );
}
