"use client";

import { useState, type ReactNode } from "react";
import type { VisualLabKind } from "@/data/visual-labs";

const questions: Record<VisualLabKind | "afim", string> = {
  "motion-limit": "O valor exatamente no ponto precisa ser igual ao valor para o qual as medições se aproximam?",
  "continuity-bridge": "Uma mudança de inclinação sempre provoca uma quebra de continuidade?",
  "derivative-tank": "O volume de água e a velocidade com que esse volume muda representam a mesma grandeza?",
  "integral-ramp": "Mantendo o perfil e o comprimento da rampa, o que acontece com o volume ao aumentar sua largura?",
  limit: "Uma função pode ter limite em um ponto onde não está definida?",
  secant: "O que acontece com a reta secante quando seus dois pontos ficam cada vez mais próximos?",
  riemann: "Como a quantidade de retângulos afeta a aproximação da área?",
  "unit-circle": "Em quais quadrantes o seno e o cosseno têm sinais diferentes?",
  transformations: "Como distinguir uma translação horizontal de uma mudança na abertura da parábola?",
  parabola: "O que muda no gráfico quando o coeficiente de x² troca de sinal?",
  "product-rule": "Ao variar dois lados de um retângulo, por que precisamos considerar a mudança de ambos?",
  ftc: "Como a altura da função original se relaciona com a inclinação da função que acumula sua área?",
  afim: "Qual coeficiente altera a inclinação da reta e qual altera sua altura no eixo vertical?",
};

export function SimulationStudy({ kind, children }: { kind: VisualLabKind | "afim"; children: ReactNode }) {
  const [round, setRound] = useState(0);
  return (
    <section aria-label="Investigação guiada" className="my-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-serif text-xl">Investigue antes de concluir</h3>
        <button type="button" onClick={() => setRound(value => value + 1)} className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-surface-soft">Reiniciar investigação</button>
      </div>
      <div key={round} className="space-y-4">
        <label className="block rounded-2 border border-border bg-surface p-4">
          <span className="block text-sm font-semibold text-terracotta">1 · Preveja</span>
          <span className="mt-2 block">{questions[kind]}</span>
          <textarea rows={2} className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-sm" placeholder="Minha hipótese… (opcional)" />
        </label>
        <div>
          <p className="font-semibold">2 · Experimente</p>
          <p className="mb-3 text-sm text-ink-muted">Mude um controle por vez. Compare pelo menos duas situações e observe o gráfico e os valores.</p>
          {children}
        </div>
        <label className="block rounded-2 border border-border bg-surface p-4">
          <span className="block text-sm font-semibold text-terracotta">3 · Explique</span>
          <span className="mt-2 block">Sua hipótese se confirmou? Use uma observação do simulador para justificar e imagine um novo caso.</span>
          <textarea rows={3} className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-sm" placeholder="Observei que… Isso acontece porque…" />
          <span className="mt-2 block text-xs text-ink-muted">Rascunho desta investigação; não é salvo. Reiniciar limpa os campos e retorna os controles ao início.</span>
        </label>
      </div>
    </section>
  );
}
