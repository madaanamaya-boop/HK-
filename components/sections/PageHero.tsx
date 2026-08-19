import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
}

/** Shared light hero band for inner pages. */
export function PageHero({ eyebrow, title, copy, children }: PageHeroProps) {
  return (
    <section className="aurora relative overflow-hidden bg-ivory-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {eyebrow && (
          <p className="mb-5 inline-flex items-center rounded-full bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-700">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-midnight-900 text-balance sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {copy && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-midnight-600 sm:text-lg">
            {copy}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
