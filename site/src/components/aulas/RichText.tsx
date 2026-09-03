import type { ReactNode } from "react";
import katex from "katex";
import { GlossaryInline } from "@/components/glossario/GlossaryInline";
import { addAlignedRowGap, ariaFromLatex } from "@/lib/katex-format";
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

function renderMath(latex: string, display: boolean, key: number): ReactNode {
  const html = katex.renderToString(addAlignedRowGap(latex), {
    throwOnError: false,
    displayMode: display,
    output: "htmlAndMathml",
    strict: "ignore",
  });
  const reading = ariaFromLatex(latex);

  // "Tradutor de notação": fórmulas inline com leitura de 2+ palavras ganham
  // tooltip "Lê-se: …" no hover/foco — quem trava na notação (f(x), Δ, lim)
  // descobre como verbalizá-la. Símbolos soltos (x, 8) ficam sem tooltip.
  const showReading = !display && reading.split(/\s+/).length >= 2;

  if (showReading) {
    return (
      <span key={`math-${key}`} className="group/math relative inline">
        <span
          role="math"
          aria-label={reading}
          tabIndex={0}
          className="cursor-help rounded-sm border-b border-dotted border-ink-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-0 z-30 mb-1.5 w-max max-w-[min(280px,80vw)] origin-bottom-left scale-95 rounded-xl border border-border bg-surface px-3 py-2 text-left font-sans text-[12px] font-normal not-italic leading-relaxed text-ink-muted opacity-0 shadow-lg transition-all duration-150 group-hover/math:scale-100 group-hover/math:opacity-100 group-focus-within/math:scale-100 group-focus-within/math:opacity-100"
        >
          <span className="font-semibold text-ink">Lê-se:</span> {reading}
        </span>
      </span>
    );
  }

  return (
    <span
      key={`math-${key}`}
      role="math"
      aria-label={reading}
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
