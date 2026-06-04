"use client";

import { useEffect, useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import { RevealBlock } from "@/components/exercicios/RevealBlock";
import { TypeTag } from "@/components/exercicios/TypeTag";
import { Button } from "@/components/ui/Button";
import { LevelTag } from "@/components/ui/Tag";
import Link from "next/link";
import { exercicios, type Exercicio } from "@/data/exercicios";
import { checkAnswer, type CheckResult } from "@/lib/answer-check";
import { levelOrder } from "@/lib/exercicios";
import {
  isExerciseComplete,
  markExerciseComplete,
} from "@/lib/progress";

/**
 * Próximo exercício recomendado: sobe um nível no acerto, desce um no erro,
 * dentro do mesmo tema, preferindo um que ainda não foi resolvido.
 */
function recommendNext(
  current: Exercicio,
  outcome: "correct" | "incorrect",
): Exercicio | null {
  const idx = levelOrder.indexOf(current.level);
  const targetIdx =
    outcome === "correct"
      ? Math.min(idx + 1, levelOrder.length - 1)
      : Math.max(idx - 1, 0);
  const targetLevel = levelOrder[targetIdx];
  const sameTema = exercicios.filter(
    (e) => e.temaSlug === current.temaSlug && e.id !== current.id,
  );
  return (
    sameTema.find((e) => e.level === targetLevel && !isExerciseComplete(e.id)) ??
    sameTema.find((e) => e.level === targetLevel) ??
    sameTema.find((e) => !isExerciseComplete(e.id)) ??
    null
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-dashed border-border-soft py-3 sm:grid-cols-[130px_1fr]">
      <span className="font-serif text-xs italic tracking-wide text-ink-subtle">
        {label}
      </span>
      <div className="text-sm leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function ExercicioDetail({
  exercicio,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onReset,
}: {
  exercicio: Exercicio;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onReset: () => void;
}) {
  const [showDica, setShowDica] = useState(false);
  const [showResolucao, setShowResolucao] = useState(false);
  const [showResposta, setShowResposta] = useState(false);
  const [showErro, setShowErro] = useState(false);
  const [exerciseDone, setExerciseDone] = useState(false);
  const [attempt, setAttempt] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura do estado de conclusão (localStorage) client-only
    setExerciseDone(isExerciseComplete(exercicio.id));
  }, [exercicio.id]);

  const identificar = Array.isArray(exercicio.identificar)
    ? exercicio.identificar
    : [exercicio.identificar];

  const handleReset = () => {
    setShowDica(false);
    setShowResolucao(false);
    setShowResposta(false);
    setShowErro(false);
    setAttempt("");
    setResult(null);
    onReset();
  };

  const handleVerify = () => {
    const r = checkAnswer(attempt, exercicio.resposta);
    setResult(r);
    setShowResposta(true);
    setShowResolucao(true);
    if (r === "correct") {
      markExerciseComplete(exercicio.id);
      setExerciseDone(true);
    }
  };

  const selfAssess = (acertou: boolean) => {
    setResult(acertou ? "correct" : "incorrect");
    if (acertou) {
      markExerciseComplete(exercicio.id);
      setExerciseDone(true);
    }
  };

  const recommended =
    result === "correct" || result === "incorrect"
      ? recommendNext(exercicio, result)
      : null;

  return (
    <article className="rounded-3 border border-border bg-surface p-7 shadow-sm">
      <header className="mb-4 flex flex-wrap justify-between gap-4 border-b border-border-soft pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-ink-subtle">
              {exercicio.num}
            </span>
            <LevelTag level={exercicio.level} />
            <TypeTag type={exercicio.type} />
          </div>
          <h2 className="mt-2 font-serif text-[22px] font-medium tracking-tight">
            {exercicio.title}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Tema: {exercicio.tema} · Área: {exercicio.area}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {exerciseDone ? (
            <span className="inline-flex items-center rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-ink">
              ✓ Resolvido
            </span>
          ) : (
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                markExerciseComplete(exercicio.id);
                setExerciseDone(true);
              }}
            >
              Marcar como resolvido
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleReset}>
            ↺ Reiniciar
          </Button>
        </div>
      </header>

      <Field label="Enunciado">
        <RichText as="p" className="whitespace-pre-line">
          {exercicio.enunciado}
        </RichText>
      </Field>

      <Field label="O que identificar">
        <ul className="list-disc space-y-1 pl-4">
          {identificar.map((item) => (
            <RichText as="li" key={item}>
              {item}
            </RichText>
          ))}
        </ul>
      </Field>

      <Field label="Sua resposta">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleVerify();
            }}
            placeholder="Tente antes de ver a solução…"
            aria-label="Sua resposta"
            className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus-visible:border-terracotta"
          />
          <Button variant="primary" size="sm" onClick={handleVerify}>
            Verificar
          </Button>
        </div>

        {result === "correct" && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-[13px] font-semibold text-sage-ink">
            ✓ Correto! Mandou bem.
          </p>
        )}
        {result === "incorrect" && (
          <p className="mt-2 text-[13px] text-ink-muted">
            <span className="font-semibold text-sage-ink">Quase!</span> Confira a
            resolução e a resposta abaixo — e tente entender onde escapou.
          </p>
        )}
        {result === "manual" && (
          <div className="mt-2 text-[13px] text-ink-muted">
            Compare sua resposta com o gabarito abaixo. Você acertou?
            <span className="mt-2 flex gap-2">
              <Button variant="soft" size="sm" onClick={() => selfAssess(true)}>
                ✓ Acertei
              </Button>
              <Button variant="ghost" size="sm" onClick={() => selfAssess(false)}>
                ✗ Ainda não
              </Button>
            </span>
          </div>
        )}

        {recommended && (
          <Link
            href={`/exercicios?id=${recommended.id}`}
            className="mt-3 block rounded-2 border border-border bg-surface-soft px-4 py-3 transition-colors hover:border-terracotta"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
              {result === "correct"
                ? "Mandou bem — tente um mais puxado"
                : "Recomendado: reforce com um mais tranquilo"}
            </span>
            <span className="mt-0.5 block text-[13px] font-medium text-ink">
              {recommended.title} →
            </span>
          </Link>
        )}
      </Field>

      <Field label="Dica">
        <RevealBlock
          variant="hint"
          visible={showDica}
          onToggle={() => setShowDica((v) => !v)}
        >
          <RichText>{exercicio.dica}</RichText>
        </RevealBlock>
      </Field>

      <Field label="Resolução">
        <RevealBlock
          variant="sol"
          visible={showResolucao}
          onToggle={() => setShowResolucao((v) => !v)}
        >
          {exercicio.resolucaoSteps ? (
            <ol className="list-decimal space-y-1 pl-4">
              {exercicio.resolucaoSteps.map((step) => (
                <RichText as="li" key={step}>
                  {step}
                </RichText>
              ))}
            </ol>
          ) : (
            <RichText as="p" className="text-[13.5px]">
              {exercicio.resolucao}
            </RichText>
          )}
        </RevealBlock>
      </Field>

      <Field label="Resposta">
        <RevealBlock
          variant="ans"
          visible={showResposta}
          onToggle={() => setShowResposta((v) => !v)}
        >
          <RichText as="p" className="font-semibold">
            {exercicio.resposta}
          </RichText>
        </RevealBlock>
      </Field>

      <Field label="Interpretação">
        <RichText as="p" className="italic text-ink-muted">
          {exercicio.interpretacao}
        </RichText>
      </Field>

      <Field label="Erro comum">
        <RevealBlock
          variant="err"
          visible={showErro}
          onToggle={() => setShowErro((v) => !v)}
        >
          <RichText>{exercicio.erroComum}</RichText>
        </RevealBlock>
      </Field>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-4">
        <span className="text-sm text-ink-subtle">
          Tente resolver antes de abrir a resposta.
        </span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="soft"
            size="sm"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            ← Anterior
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            disabled={!hasNext}
          >
            Próximo →
          </Button>
        </div>
      </footer>
    </article>
  );
}
