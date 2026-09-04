"use client";

import { useId, useState } from "react";
import { MathFormula } from "@/components/aulas/Math";
import { RichText } from "@/components/aulas/RichText";

export type BhaskaraDerivationStep = {
  title: string;
  detail: string;
  formula: string;
  formulaAria: string;
};

export function BhaskaraDerivation({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: BhaskaraDerivationStep[];
}) {
  const [show, setShow] = useState(false);
  const panelId = useId();

  return (
    <div className="my-5 rounded-2 border border-terracotta/35 bg-terracotta-soft/20 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
            Demonstração disponível
          </p>
          <h3 className="mt-1 font-serif text-[24px] font-medium text-ink">
            {title}
          </h3>
        </div>
        <span className="rounded-full border border-terracotta/30 bg-surface px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-terracotta">
          completar quadrados
        </span>
      </div>

      <RichText as="p" className="mt-3 text-[14px] leading-relaxed text-ink-muted">
        {intro}
      </RichText>

      <button
        type="button"
        onClick={() => setShow((value) => !value)}
        aria-expanded={show}
        aria-controls={panelId}
        className="mt-4 rounded-full border border-terracotta/45 bg-surface px-4 py-2 text-xs font-semibold text-terracotta transition-colors hover:border-terracotta hover:bg-terracotta-soft/40"
      >
        {show ? "Ocultar demonstração" : "Ver demonstração"}
      </button>

      {show && (
        <div id={panelId} className="mt-4">
          <div className="rounded-xl border border-border bg-surface px-4 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
              A ideia em um exemplo
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              Em vez de procurar a raiz diretamente, transformamos a expressão
              em um quadrado perfeito:
            </p>
            <div className="mt-3 grid gap-2 text-center">
              <MathFormula
                latex="x^2 - 6x + 8 = 0"
                text="x ao quadrado menos seis x mais oito é igual a zero"
                display
              />
              <MathFormula
                latex="x^2 - 6x = -8"
                text="x ao quadrado menos seis x é igual a menos oito"
                display
              />
              <MathFormula
                latex="x^2 - 6x + 9 = -8 + 9"
                text="somamos nove nos dois lados"
                display
              />
              <MathFormula
                latex="(x - 3)^2 = 1"
                text="x menos três, tudo ao quadrado, é igual a um"
                display
              />
            </div>
            <p className="mt-2 text-center text-[13px] leading-relaxed text-ink-muted">
              Como o quadrado de um número é 1, esse número pode ser 1 ou −1.
              Portanto, as raízes são <b>2</b> e <b>4</b>.
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
              Agora, a demonstração geral
            </p>
            <ol className="mt-3 space-y-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid gap-3 rounded-xl border border-border bg-surface px-4 py-4 md:grid-cols-[32px_minmax(0,1fr)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
                    {index + 1}
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

          <div className="mt-4 rounded-xl border border-sage/40 bg-sage-soft/35 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sage-ink">
              Chegamos à fórmula
            </p>
            <div className="mt-2 text-center">
              <MathFormula
                latex={"x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"}
                text="x é igual a menos b mais ou menos a raiz quadrada de b ao quadrado menos quatro a c, tudo sobre dois a"
                display
              />
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              O discriminante{" "}
              <RichText>{"\\(\\Delta = b^2 - 4ac\\)"}</RichText> não apareceu
              por acaso: ele é exatamente o numerador que sobra dentro da raiz
              depois de completar o quadrado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
