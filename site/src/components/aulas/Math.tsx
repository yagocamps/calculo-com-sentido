import katex from "katex";
import { addAlignedRowGap } from "@/lib/katex-format";

/**
 * Renderiza uma fórmula com KaTeX de forma acessível.
 *
 * - O HTML/MathML do KaTeX fica `aria-hidden` (visual).
 * - A leitura para leitores de tela vem do `text` (linguagem natural, pt-BR)
 *   via `aria-label` no wrapper `role="math"`.
 *
 * Ver Plano Mestre, Seção 41 (acessibilidade matemática).
 */
export function MathFormula({
  latex,
  text,
  display = false,
  className,
}: {
  latex: string;
  /** Leitura em linguagem natural (pt-BR) — obrigatória, sem ela leitores de tela não entendem a fórmula. */
  text: string;
  display?: boolean;
  className?: string;
}) {
  // TypeScript já obriga a prop; isto pega string vazia ou chamadas sem
  // checagem de tipo em dev, antes de quebrar a regra 41 em produção.
  if (process.env.NODE_ENV !== "production" && (!text || !text.trim())) {
    console.error(
      `[MathFormula] A fórmula "${latex}" foi renderizada sem 'text' (descrição em linguagem natural). ` +
        "Toda fórmula precisa de leitura para leitores de tela — Plano Mestre, Seção 41.",
    );
  }

  const html = katex.renderToString(addAlignedRowGap(latex), {
    throwOnError: false,
    displayMode: display,
    output: "htmlAndMathml",
    strict: "ignore",
  });

  return (
    <span className={className} role="math" aria-label={text}>
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}
