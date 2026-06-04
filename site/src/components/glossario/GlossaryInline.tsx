import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import type { GlossarioEntry } from "@/data/glossario";
import { slugify } from "@/lib/utils";

/**
 * Termo do glossário realçado no meio do texto da aula. Sublinhado pontilhado;
 * ao passar o mouse ou focar (teclado), mostra a definição num popover — como
 * o dicionário do macOS. Tudo via CSS (group-hover/focus-within), sem JS, então
 * continua sendo componente de servidor (não envia KaTeX para o cliente).
 */
export function GlossaryInline({
  termo,
  display,
  entry,
}: {
  termo: string;
  display: string;
  entry: GlossarioEntry;
}) {
  return (
    <span className="group relative inline">
      <Link
        href={`/glossario#${slugify(termo)}`}
        className="cursor-help font-medium text-ink underline decoration-dotted decoration-terracotta/60 underline-offset-2 hover:text-terracotta focus-visible:text-terracotta"
      >
        {display}
      </Link>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-64 max-w-[80vw] origin-bottom-left scale-95 rounded-2 border border-border bg-surface p-3 text-left text-[12.5px] font-normal not-italic leading-relaxed text-ink-muted opacity-0 shadow-lg transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <span className="mb-1 block font-serif text-[13px] font-semibold text-ink">
          {termo}
        </span>
        <RichText as="span">{entry.definicao}</RichText>
      </span>
    </span>
  );
}
