"use client";

import { useState } from "react";
import { RichText } from "@/components/aulas/RichText";

/**
 * "Não entendi — explica de outro jeito": versão alternativa da explicação
 * (outra analogia, ritmo mais lento). Quem tem dificuldade real raramente
 * entende na primeira, e reler o mesmo texto não ajuda.
 */
export function AlternativeExplanation({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-sky bg-sky-soft/50 px-4 py-1.5 text-[13px] font-semibold text-sky-ink transition-colors hover:bg-sky-soft cursor-pointer"
      >
        <span aria-hidden>🔄</span>
        {open
          ? "Fechar a explicação alternativa"
          : "Não entendi — explica de outro jeito"}
      </button>

      {open && (
        <div className="mt-3 rounded-2 border border-sky bg-sky-soft/40 px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-ink">
            Mesma ideia, outro caminho
          </p>
          {paragraphs.map((p) => (
            <RichText
              as="p"
              key={p.slice(0, 24)}
              className="mt-2.5 text-[15px] leading-relaxed"
            >
              {p}
            </RichText>
          ))}
          <p className="mt-3 text-[12.5px] italic text-ink-muted">
            Ainda nebuloso? Tudo bem — siga para o exemplo aplicado logo
            abaixo: ver a ideia funcionando costuma destravar.
          </p>
        </div>
      )}
    </div>
  );
}
