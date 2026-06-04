import type { ReactNode } from "react";
import katex from "katex";
import { GlossaryInline } from "@/components/glossario/GlossaryInline";
import type { GlossarioEntry } from "@/data/glossario";

export type GlossaryHighlight = {
  terms: { termo: string; entry: GlossarioEntry }[];
  /** Termos já realçados (compartilhado entre parágrafos para realçar só a 1ª vez). */
  used: Set<string>;
};

function normalizeTerm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Realça a 1ª ocorrência (ainda não usada) de cada termo num trecho de texto. */
function highlightTerms(
  text: string,
  glossary: GlossaryHighlight,
  keyBase: number,
): ReactNode {
  if (glossary.terms.length === 0) return text;
  const sorted = [...glossary.terms].sort(
    (a, b) => b.termo.length - a.termo.length,
  );
  const alts = sorted.map((t) => escapeRegExp(t.termo)).join("|");
  const re = new RegExp(`(?<!\\p{L})(${alts})(?!\\p{L})`, "giu");
  const normMap = new Map(
    glossary.terms.map((t) => [normalizeTerm(t.termo), t]),
  );

  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const key = normalizeTerm(m[0]);
    const term = normMap.get(key);
    if (term && !glossary.used.has(key)) {
      glossary.used.add(key);
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(
        <GlossaryInline
          key={`g-${keyBase}-${k++}`}
          termo={term.termo}
          display={m[0]}
          entry={term.entry}
        />,
      );
      last = m.index + m[0].length;
    }
  }
  if (out.length === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}

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
  glossary,
}: {
  children: string;
  as?: "span" | "p" | "div" | "li";
  className?: string;
  glossary?: GlossaryHighlight;
}) {
  const text = children;

  const renderPlain = (segment: string, keyBase: number): ReactNode =>
    glossary ? highlightTerms(segment, glossary, keyBase) : segment;

  if (!text.includes("\\(") && !text.includes("\\[")) {
    return <Tag className={className}>{renderPlain(text, 0)}</Tag>;
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
      nodes.push(renderPlain(text.slice(lastIndex, match.index), key));
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
    nodes.push(renderPlain(text.slice(lastIndex), key));
  }

  return <Tag className={className}>{nodes}</Tag>;
}
