"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand logo with graceful fallback.
 * Renders /public/hk-logo.png when available; if the file is missing,
 * falls back to a clean gradient "HK" mark.
 */
export function BrandLogo({
  dark = false,
  className,
}: {
  /** Set true when rendered on a dark surface (footer). */
  dark?: boolean;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href="/"
      aria-label="HK FINCORP — Home"
      className={cn(
        "flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
        className
      )}
    >
      {!imageFailed ? (
        <Image
          src="/hk-logo.png"
          alt="HK FINCORP"
          width={40}
          height={40}
          priority
          className="h-10 w-10 rounded-xl object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="grad-fill flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
        >
          HK
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            dark ? "text-white" : "text-midnight-900"
          )}
        >
          HK FINCORP
        </span>
        <span
          className={cn(
            "mt-0.5 whitespace-nowrap text-[11px] font-medium",
            dark ? "text-white/50" : "text-midnight-600"
          )}
        >
          Trusted since 2001
        </span>
      </span>
    </Link>
  );
}
