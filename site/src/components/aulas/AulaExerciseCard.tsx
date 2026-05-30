"use client";

import { useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import { Tag } from "@/components/ui/Tag";
import type { AulaExercise } from "@/data/aulas/types";
import { cn } from "@/lib/utils";

const typeLabels = {
  compreensao: "Compreensão",
  calculo: "Cálculo",
  aplicada: "Aplicada",
  interpretacao: "Interpretação",
} as const;

export function AulaExerciseCard({ exercise }: { exercise: AulaExercise }) {
  const [showDica, setShowDica] = useState(false);
  const [showResposta, setShowResposta] = useState(false);

  return (
    <div className="rounded-2 border border-border bg-surface-soft/60 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Tag tone="sky">{typeLabels[exercise.type]}</Tag>
      </div>
      <RichText as="p" className="text-[15px] leading-relaxed">
        {exercise.enunciado}
      </RichText>

      {exercise.identificar && (
        <p className="mt-2 text-xs text-ink-muted">
          <b>Identificar:</b> <RichText>{exercise.identificar}</RichText>
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {exercise.dica && (
          <button
            type="button"
            onClick={() => setShowDica((v) => !v)}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted hover:border-amber hover:text-amber-ink"
          >
            {showDica ? "Ocultar dica" : "Ver dica"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowResposta((v) => !v)}
          className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted hover:border-terracotta hover:text-terracotta"
        >
          {showResposta ? "Ocultar resolução" : "Ver resolução"}
        </button>
      </div>

      {showDica && exercise.dica && (
        <p className="mt-3 rounded-xl border border-amber bg-amber-soft px-3 py-2 text-sm text-amber-ink">
          <b>Dica:</b> <RichText>{exercise.dica}</RichText>
        </p>
      )}

      {showResposta && (
        <div className="mt-3 space-y-2 rounded-xl border border-sage bg-sage-soft/50 px-3 py-3 text-sm">
          <p>
            <b>Resolução:</b>{" "}
            <RichText className="font-mono text-[13px]">
              {exercise.resolucao}
            </RichText>
          </p>
          <p>
            <b>Resposta:</b> <RichText>{exercise.resposta}</RichText>
          </p>
          <p className="text-ink-muted">
            <b>Interpretação:</b> <RichText>{exercise.interpretacao}</RichText>
          </p>
          {exercise.erroComum && (
            <p className={cn("text-amber-ink")}>
              <b>Erro comum:</b> <RichText>{exercise.erroComum}</RichText>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
