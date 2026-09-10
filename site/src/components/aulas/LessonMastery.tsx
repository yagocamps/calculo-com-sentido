"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MasteryChecklist } from "@/components/progresso/MasteryChecklist";
import { getProgress } from "@/lib/progress";
import {
  lessonEvidence,
  masterySteps,
  masterySummary,
  type MasteryStep,
} from "@/lib/learning-evidence";

/**
 * Onde o aluno está, na página em que ele está trabalhando.
 *
 * O critério de domínio já era explicado em /progresso, mas em texto corrido e
 * longe do exercício. Quem responde tudo certo e vê o estado parado em
 * "Estudado" precisa saber aqui — e principalmente quando o que falta é só o
 * tempo passar.
 */
export function LessonMastery({
  lessonPathId,
  temaHref,
}: {
  lessonPathId: string;
  temaHref?: string;
}) {
  const [dados, setDados] = useState<{
    estado: string;
    resumo: string;
    steps: MasteryStep[];
  } | null>(null);

  useEffect(() => {
    const evidencia = lessonEvidence(getProgress(), lessonPathId);
    if (!evidencia) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a evidência vive no localStorage, só existe no cliente
    setDados({
      estado: evidencia.state,
      resumo: masterySummary(evidencia),
      steps: masterySteps(evidencia),
    });
  }, [lessonPathId]);

  if (!dados) return null;

  const dominado = dados.estado === "Dominado";
  // Quando o critério é inalcançável nesta aula, listar os outros passos só
  // mostraria pendências que o aluno não tem como cumprir aqui.
  const bloqueado = dados.steps.some((s) => s.blocked);
  const semTentativas = !bloqueado && dados.steps.every((s) => !s.done);

  return (
    <div
      className={
        dominado
          ? "mt-4 rounded-2 border border-sage bg-sage-soft/50 px-4 py-3"
          : "mt-4 rounded-2 border border-border bg-surface-soft/60 px-4 py-3"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
          Seu domínio deste assunto
        </p>
        <p className={dominado ? "text-[13px] font-semibold text-sage-ink" : "text-[13px] font-semibold text-ink"}>
          {dados.estado}
        </p>
      </div>

      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{dados.resumo}</p>

      {!dominado && (
        <>
          {!bloqueado && <MasteryChecklist steps={dados.steps} className="mt-3" />}
          {semTentativas && (
            <p className="mt-2.5 text-[12.5px] text-ink-subtle">
              Responder os exercícios guiados acima já começa a contar. Só valem
              respostas conferidas: uma autoavaliação ajuda você, mas não
              certifica domínio.
            </p>
          )}
          {temaHref && (
            <Link
              href={temaHref}
              className="mt-2.5 inline-block text-[13px] font-semibold text-terracotta underline"
            >
              Praticar mais questões deste tema →
            </Link>
          )}
        </>
      )}
    </div>
  );
}
