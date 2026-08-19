import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "gold" | "dark" | "outline" | "outline-light" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "grad-fill text-white shadow-gold hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0",
  dark: "bg-midnight-900 text-white hover:bg-midnight-800 hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0",
  outline:
    "border border-midnight-900/15 bg-white text-midnight-900 hover:border-gold-500 hover:text-gold-700 hover:-translate-y-0.5 hover:shadow-card",
  "outline-light": "border border-white/25 text-white hover:border-gold-400 hover:bg-white/10",
  soft: "bg-gold-500/10 text-gold-700 hover:bg-gold-500/16",
  ghost: "text-midnight-900 hover:text-gold-700 hover:bg-ivory-100",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type ButtonAsLink = CommonProps & { href: string; target?: string; rel?: string; "aria-label"?: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "gold", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel, "aria-label": ariaLabel } = props as ButtonAsLink;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a
          href={href}
          target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
          rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
