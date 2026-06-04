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
  text: string;
  display?: boolean;
  className?: string;
}) {
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
