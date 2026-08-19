import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Inline disclaimer strip used on service, offer, and tool pages. */
export function DisclaimerBanner({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl bg-ivory-100 p-5", className)} role="note">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-midnight-600">{text}</p>
    </div>
  );
}
