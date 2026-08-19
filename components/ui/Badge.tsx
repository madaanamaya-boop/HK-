import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "gold" | "navy" | "ivory" | "outline";

const tones: Record<Tone, string> = {
  gold: "bg-gold-500/10 text-gold-700",
  navy: "bg-midnight-900 text-white",
  ivory: "bg-ivory-100 text-midnight-600",
  outline: "border border-white/20 bg-white/10 text-white/90",
};

export function Badge({
  tone = "gold",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
