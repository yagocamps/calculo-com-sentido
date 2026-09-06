"use client";

import { useEffect, useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import { Tag } from "@/components/ui/Tag";
import type { AulaExercise } from "@/data/aulas/types";
import { type CheckResult } from "@/lib/answer-check";
import { clearGuidedAnswer, getProgress, submitGuidedAttempt } from "@/lib/progress";
import { guidedAnchor, guidedAttemptId } from "@/lib/learning-assessments";
import { cn } from "@/lib/utils";

const typeLabels = {
  compreensao: "Compreensão",
  calculo: "Cálculo",
  aplicada: "Aplicada",
  interpretacao: "Interpretação",
} as const;

export function AulaExerciseCard({ exercise, lessonPathId }: { exercise: AulaExercise; lessonPathId: string }) {
  const [showDica, setShowDica] = useState(false);
  const [showResposta, setShowResposta] = useState(false);
  const [attempt, setAttempt] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [method, setMethod] = useState<"automatic" | "self-assessment">("automatic");
  const [saveError, setSaveError] = useState(false);
  const id = guidedAttemptId(lessonPathId, exercise.id);
  const anchorId = guidedAnchor(exercise.id);

  useEffect(() => {
    const restored = getProgress().guidedRecords[id];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only assessment after SSR
    setAttempt(restored?.attempt ?? "");
    setResult(restored?.result ?? null);
    setMethod(restored?.method ?? "automatic");
    setShowResposta(Boolean(restored));
    // Saved solutions change card heights after hydration; align the deep link afterwards.
    if (window.location.hash === `#${anchorId}`) {
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => document.getElementById(anchorId)?.scrollIntoView({ block: "start" }));
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [id, anchorId]);

  // Aprendizado ativo: o aluno tenta responder antes de revelar a solução,
  // com feedback imediato — em vez de só ler a resolução passivamente.
  const handleVerify = (selfAssessment?: "correct" | "incorrect") => {
    if (!attempt.trim()) return;
    const retryAssessment = saveError && method === "self-assessment" && result !== "manual" && result !== null ? result : undefined;
    const submitted = submitGuidedAttempt(lessonPathId, exercise.id, attempt, selfAssessment ?? retryAssessment);
    if (!submitted) return;
    setResult(submitted.record.result);
    setMethod(submitted.record.method);
    setSaveError(!submitted.saved);
    setShowResposta(true);
  };

  return (
    <div id={anchorId} className="scroll-mt-20 rounded-2 border border-border bg-surface-soft/60 p-4">
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

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={attempt}
          maxLength={2000}
          onChange={(e) => { setAttempt(e.target.value); setResult(null); setSaveError(false); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleVerify();
          }}
          placeholder="Sua resposta…"
          aria-label="Sua resposta"
          className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus-visible:border-terracotta"
        />
        <button
          type="button"
          onClick={() => handleVerify()}
          disabled={!attempt.trim() || (result !== null && !saveError)}
          className="rounded-full bg-terracotta px-3.5 py-1.5 text-xs font-semibold text-bg hover:opacity-90"
        >
          Verificar
        </button>
      </div>

      <p className="mt-2 text-xs text-ink-subtle">
        Use ponto ou vírgula para decimais, sem separador de milhar. Preserve símbolos e unidades.
        {exercise.answerCheck?.absoluteTolerance !== undefined && ` Tolerância absoluta: ${exercise.answerCheck.absoluteTolerance}.`}
      </p>
      {saveError && <p role="alert" className="mt-2 text-xs text-amber-ink">Resposta avaliada, mas não foi possível salvar neste navegador. Tente verificar novamente quando houver armazenamento disponível.</p>}
      {result && !saveError && <p role="status" className="mt-2 text-xs text-ink-muted">Resposta salva · {result === "manual" ? "aguardando sua comparação com o gabarito" : method === "self-assessment" ? "autoavaliação" : "conferência automática"}. Reenviar a mesma resposta não cria outra tentativa.</p>}
      {result && <button type="button" className="mt-2 text-xs font-semibold text-terracotta underline" onClick={() => {
        if (clearGuidedAnswer(id)) { setAttempt(""); setResult(null); setShowResposta(false); setSaveError(false); }
        else setSaveError(true);
      }}>Tentar novamente</button>}

      {result === "correct" && (
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-[13px] font-semibold text-sage-ink">
          {method === "self-assessment" ? "✓ Marcada como correta por você." : "✓ Resposta correta."}
        </p>
      )}
      {result === "incorrect" && (
        <div className="mt-2 space-y-1.5 text-[13px]">
          <p className="text-ink-muted">
            <span className="font-semibold text-amber-ink">{method === "self-assessment" ? "Você indicou que precisa revisar." : "Resposta diferente do gabarito."}</span>{" "}
            Compare sua tentativa com a resolução abaixo.
          </p>
          {exercise.erroComum && (
            <p className="rounded-xl border border-amber bg-amber-soft/60 px-3 py-2 leading-relaxed text-amber-ink">
              <b>O erro mais comum aqui:</b>{" "}
              <RichText>{exercise.erroComum}</RichText>
            </p>
          )}
        </div>
      )}
      {result === "manual" && (
        <div className="mt-2 text-[13px] text-ink-muted"><p>
          Não foi possível conferir automaticamente. Compare os símbolos, as unidades e as condições da sua resposta com o gabarito abaixo.
        </p><div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={() => handleVerify("correct")} className="rounded border border-sage px-3 py-2 text-sage-ink">Minha resposta está correta</button>
          <button type="button" onClick={() => handleVerify("incorrect")} className="rounded border border-amber px-3 py-2 text-amber-ink">Preciso revisar minha resposta</button>
        </div></div>
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
