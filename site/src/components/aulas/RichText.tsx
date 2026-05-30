import type { ReactNode } from "react";
import katex from "katex";

/**
 * Renderiza texto com LaTeX inline e blocos de desenvolvimento.
 *
 * - `\( ... \)` → fórmula inline (no meio da frase).
 * - `\[ ... \]` → bloco de display (centralizado, em destaque). Ideal para
 *   desenvolvimentos em várias linhas usando `\begin{aligned} ... \end{aligned}`,
 *   com `&` alinhando no `=` e `\\` separando cada passagem — como uma pessoa
 *   resolve no papel.
 *
 * Usamos `\(...\)` / `\[...\]` (delimitadores LaTeX padrão) em vez de `$...$`
 * porque o conteúdo em português usa "R$" para moeda o tempo todo.
 *
 * Acessibilidade: o visual do KaTeX fica `aria-hidden`; o `aria-label` recebe
 * uma leitura aproximada em linguagem natural (ver `ariaFromLatex`).
 */

/** Converte um trecho de LaTeX numa leitura textual aproximada (pt-BR). */
function ariaFromLatex(latex: string): string {
  return latex
    .replace(/\\begin\{aligned\}/g, "")
    .replace(/\\end\{aligned\}/g, "")
    .replace(/\\begin\{cases\}/g, "")
    .replace(/\\end\{cases\}/g, "")
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1) sobre ($2)")
    .replace(/\\sqrt\{([^{}]*)\}/g, "raiz de $1")
    .replace(/\\times/g, " vezes ")
    .replace(/\\cdot/g, " vezes ")
    .replace(/\\div/g, " dividido por ")
    .replace(/\\leq/g, " menor ou igual a ")
    .replace(/\\geq/g, " maior ou igual a ")
    .replace(/\\neq/g, " diferente de ")
    .replace(/\\pm/g, " mais ou menos ")
    .replace(/\\approx/g, " aproximadamente ")
    .replace(/\^\{([^{}]*)\}/g, " elevado a $1")
    .replace(/\^(\d)/g, " elevado a $1")
    .replace(/\\\\/g, "; ")
    .replace(/&/g, "")
    .replace(/\\,/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function renderMath(latex: string, display: boolean, key: number): ReactNode {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: display,
    output: "htmlAndMathml",
    strict: "ignore",
  });
  return (
    <span
      key={`math-${key}`}
      role="math"
      aria-label={ariaFromLatex(latex)}
      className={display ? "my-1 block" : undefined}
    >
      <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
}

export function RichText({
  children,
  as: Tag = "span",
  className,
}: {
  children: string;
  as?: "span" | "p" | "div" | "li";
  className?: string;
}) {
  const text = children;

  if (!text.includes("\\(") && !text.includes("\\[")) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Captura blocos de display `\[ ... \]` (grupo 1) ou fórmulas inline
  // `\( ... \)` (grupo 2). O `[\s\S]` permite quebras de linha internas.
  const mathToken = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  let match: RegExpExecArray | null;
  while ((match = mathToken.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const displayContent = match[1];
    const inlineContent = match[2];
    if (displayContent !== undefined) {
      nodes.push(renderMath(displayContent, true, key++));
    } else {
      nodes.push(renderMath(inlineContent, false, key++));
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <Tag className={className}>{nodes}</Tag>;
}
