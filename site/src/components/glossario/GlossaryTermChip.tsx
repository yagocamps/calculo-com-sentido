"use client";

import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import type { GlossarioEntry } from "@/data/glossario";

/**
 * Chip de termo do glossário com popover de definição ao passar o mouse ou
 * focar (teclado). Mantém o link para o glossário completo como fallback
 * (toque no mobile). Se não houver definição, vira um link simples.
 */
export function GlossaryTermChip({
  termo,
  href,
  entry,
}: {
  termo: string;
  href: string;
  entry?: GlossarioEntry;
}) {
  if (!entry) {
    return (
      <Link
        href={href}
        className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11.5px] text-ink-muted hover:border-terracotta hover:text-ink"
      >
        {termo}
      </Link>
    );
  }

  return (
    <span className="group relative inline-block">
      <Link
        href={href}
        className="inline-block rounded-full border border-border bg-surface px-2 py-0.5 text-[11.5px] text-ink-muted hover:border-terracotta hover:text-ink focus-visible:border-terracotta focus-visible:text-ink"
      >
        {termo}
      </Link>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 w-60 origin-bottom-left scale-95 rounded-2 border border-border bg-surface p-3 text-left opacity-0 shadow-lg transition-all duration-150 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <span className="block font-serif text-[13px] font-semibold text-ink">
          {termo}
        </span>
        <RichText as="span" className="mt-1 block text-[12.5px] leading-relaxed text-ink-muted">
          {entry.definicao}
        </RichText>
        <Link
          href={href}
          className="mt-2 inline-block text-[11.5px] font-semibold text-terracotta hover:underline"
        >
          ver no glossário →
        </Link>
      </span>
    </span>
  );
}
