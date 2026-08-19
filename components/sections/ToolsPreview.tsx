import { ToolCard } from "@/components/cards/ToolCard";
import { TOOLS } from "@/lib/tools";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function ToolsPreview() {
  return (
    <section className="aurora-dark relative overflow-hidden bg-midnight-950 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            dark
            eyebrow="Financial tools"
            title="Plan before you apply"
            copy="Free, instant tools that bring clarity to your numbers — and honesty about what they can't tell you."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 0.06}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
