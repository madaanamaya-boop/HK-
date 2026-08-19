import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "center",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold",
            dark ? "bg-white/10 text-gold-300" : "bg-gold-500/10 text-gold-700"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-[2.6rem]",
          dark ? "text-white" : "text-midnight-900"
        )}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/65" : "text-midnight-600"
          )}
        >
          {copy}
        </p>
      )}
    </div>
  );
}
