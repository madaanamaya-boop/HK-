"use client";

import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { CONTACT } from "@/lib/constants";

/** Sticky bottom action bar — mobile only. */
export function StickyMobileCTA() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-midnight-900/8 bg-white/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-2 p-2.5">
        <a
          href={CONTACT.phoneHref}
          className="flex flex-col items-center gap-1 rounded-2xl py-2 text-midnight-700 transition-colors hover:bg-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">Call</span>
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-2xl py-2 text-midnight-700 transition-colors hover:bg-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>
        <Link
          href="/contact"
          className="grad-fill flex flex-col items-center gap-1 rounded-2xl py-2 text-white shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs font-bold">Apply</span>
        </Link>
      </div>
    </nav>
  );
}
