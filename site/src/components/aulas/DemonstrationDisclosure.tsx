"use client";

import { useId, useState } from "react";
import { MathFormula } from "@/components/aulas/Math";
import { RichText } from "@/components/aulas/RichText";
import type { AulaDemonstracao } from "@/data/aulas/types";

export function DemonstrationDisclosure({
  demonstrations,
}: {
  demonstrations: AulaDemonstracao[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {demonstrations.map((demo, index) => {
        const isOpen = openIndex === index;
        const panelId = baseId + "-" + index;

        return (
          <div
            key={demo.title}
            className="rounded-2 border border-terracotta/30 bg-terracotta-soft/15 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                  Demonstração disponível
                </p>
                <h3 className="mt-1 font-serif text-[21px] font-medium text-ink">
                  {demo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="rounded-full border border-terracotta/45 bg-surface px-3.5 py-1.5 text-xs font-semibold text-terracotta transition-colors hover:border-terracotta hover:bg-terracotta-soft/40"
              >
                {isOpen ? "Ocultar demonstração" : "Ver demonstração"}
              </button>
            </div>

            <RichText as="p" className="mt-3 text-[14px] leading-relaxed text-ink-muted">
              {demo.intro}
            </RichText>

            {isOpen && (
              <div id={panelId} className="mt-4">
                <ol className="space-y-3">
                  {demo.steps.map((step, stepIndex) => (
                    <li
                      key={step.title}
                      className="grid gap-3 rounded-xl border border-border bg-surface px-4 py-4 md:grid-cols-[32px_minmax(0,1fr)]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                        {stepIndex + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-ink">{step.title}</h4>
                        <RichText
                          as="p"
                          className="mt-1 text-[13px] leading-relaxed text-ink-muted"
                        >
                          {step.detail}
                        </RichText>
                        <div className="mt-3 overflow-x-auto rounded-lg bg-surface-warm px-3 py-3 text-center">
                          <MathFormula
                            latex={step.formula}
                            text={step.formulaAria}
                            display
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
