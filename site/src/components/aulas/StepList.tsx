import { RichText, type GlossaryHighlight } from "@/components/aulas/RichText";
import type { AulaStep } from "@/data/aulas/types";

export function StepList({
  steps,
  glossary,
}: {
  steps: AulaStep[];
  glossary?: GlossaryHighlight;
}) {
  return (
    <div>
      {steps.map((step, i) => (
        <div
          key={step.title}
          className="grid grid-cols-[36px_1fr] gap-3.5 border-b border-dashed border-border-soft py-3 last:border-0"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface font-serif text-[13px] font-semibold">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold">{step.title}</p>
            <RichText
              as="p"
              className="font-mono text-[13.5px] text-ink-muted"
              glossary={glossary}
            >
              {step.detail}
            </RichText>
          </div>
        </div>
      ))}
    </div>
  );
}
