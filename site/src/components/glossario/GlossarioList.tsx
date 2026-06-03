"use client";

import { useMemo, useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import type { GlossarioEntry } from "@/data/glossario";
import { slugify } from "@/lib/utils";

function normaliza(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function GlossarioList({ entries }: { entries: GlossarioEntry[] }) {
  const [busca, setBusca] = useState("");

  const ordenados = useMemo(
    () =>
      [...entries].sort((a, b) =>
        a.termo.localeCompare(b.termo, "pt-BR", { sensitivity: "base" }),
      ),
    [entries],
  );

  const filtrados = useMemo(() => {
    const q = normaliza(busca.trim());
    if (!q) return ordenados;
    return ordenados.filter(
      (e) =>
        normaliza(e.termo).includes(q) || normaliza(e.definicao).includes(q),
    );
  }, [ordenados, busca]);

  return (
    <div>
      <div className="mt-6">
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar termo ou definição…"
          aria-label="Buscar no glossário"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-terracotta"
        />
        <p className="mt-2 text-xs text-ink-subtle">
          {filtrados.length} de {entries.length} termos
        </p>
      </div>

      {filtrados.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">
          Nenhum termo encontrado para “{busca}”.
        </p>
      ) : (
        <dl className="mt-6 divide-y divide-border">
          {filtrados.map((entry) => (
            <div
              key={entry.termo}
              id={slugify(entry.termo)}
              className="py-5 scroll-mt-20"
            >
              <dt className="font-serif text-xl font-medium">{entry.termo}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                <RichText as="span">{entry.definicao}</RichText>
                {entry.exemplo && (
                  <span className="mt-2 block text-sm text-ink">
                    Ex.: <RichText as="span">{entry.exemplo}</RichText>
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
