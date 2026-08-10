import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="aurora relative flex min-h-[70vh] items-center overflow-hidden bg-ivory-50 pt-24">
      <div className="relative mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <p className="grad-text font-display text-7xl font-bold">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-midnight-900">
          This page seems to have moved.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-midnight-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back to
          trusted ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="gold" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
