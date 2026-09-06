"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import { Button } from "@/components/ui/Button";
import type { ModuleCheckpointData } from "@/data/checkpoints";
import { cn } from "@/lib/utils";
import { evaluateCheckpoint } from "@/lib/checkpoint";
import { getProgress, submitModuleCheckpoint } from "@/lib/progress";

export function ModuleCheckpoint({
  data,
  storageKey,
}: {
  data: ModuleCheckpointData;
  storageKey: string;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const { percent, passed, complete, criticalErrors } = evaluateCheckpoint(data, answers);
  const hasCritical = data.questions.some((question) => question.critical);

  useEffect(() => {
    const restored = getProgress().checkpointRecords[storageKey]?.answers ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate browser storage after SSR
    setAnswers(restored ?? {});
    setSubmitted(restored !== null);
    if (window.location.hash === "#checkpoint") {
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => document.getElementById("checkpoint")?.scrollIntoView({ block: "start" }));
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [data, storageKey]);

  function submit() {
    if (!complete) return;
    setSubmitted(true);
    setSaveError(!submitModuleCheckpoint(storageKey, answers));
  }

  return (
    <section id="checkpoint" className="mt-6 scroll-mt-20 rounded-3 border border-border bg-surface-warm p-6">
      <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
        Revisão cumulativa
      </p>
      <p className="mt-2 text-xs text-ink-muted">As respostas conferidas entram no histórico e no backup. Ao corrigir uma questão, somente a resposta alterada conta como nova tentativa.</p>
      {saveError && <p role="alert" className="mt-2 text-xs text-amber-ink">Resultado calculado, mas o navegador não conseguiu salvá-lo. Tente conferir novamente quando houver armazenamento disponível.</p>}
      <h2 className="mt-1 font-serif text-2xl font-medium">{data.title}</h2>
      <p className="mt-1 text-sm text-ink-muted">{data.description}</p>
      <p className="mt-2 text-xs font-semibold text-ink-subtle">
        Meta sugerida: {data.passPercent}%{hasCritical ? " e acerto nas habilidades essenciais" : ""} · você pode continuar mesmo sem atingir a meta.
      </p>

      <ol className="mt-5 space-y-4">
        {data.questions.map((question, questionIndex) => (
          <li key={question.prompt} className="rounded-2 border border-border bg-surface p-4">
            <RichText as="p" className="text-sm font-semibold">
              {`${questionIndex + 1}. ${question.prompt}`}
            </RichText>
            {question.critical && <p className="mt-1 text-xs font-semibold text-terracotta">Habilidade essencial para avançar com segurança</p>}
            <div
              className="mt-3 grid gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label={`Respostas da questão ${questionIndex + 1}`}
            >
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2 text-left text-[13px] transition-colors focus-within:ring-2 focus-within:ring-terracotta",
                    answers[questionIndex] === optionIndex
                      ? "border-terracotta bg-terracotta-soft/40"
                      : "border-border hover:border-terracotta",
                  )}
                >
                  <input
                    type="radio"
                    name={`checkpoint-${storageKey}-${questionIndex}`}
                    value={optionIndex}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() => {
                      setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
                      setSubmitted(false);
                    }}
                    className="mt-1 shrink-0 accent-terracotta"
                  />
                  <RichText>{option}</RichText>
                </label>
              ))}
            </div>
            {submitted && answers[questionIndex] !== question.correctIndex && (
              <div className="mt-3 rounded-xl bg-amber-soft/60 px-3 py-2 text-xs leading-relaxed text-amber-ink">
                <RichText>{question.explanation}</RichText>{" "}
                <Link href={question.reviewHref} className="font-semibold underline">
                  Revisar esta habilidade →
                </Link>
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          onClick={submit}
          disabled={!complete || (submitted && !saveError)}
        >
          Conferir checkpoint
        </Button>
        {submitted && (
          <p
            aria-live="polite"
            className={cn(
              "rounded-full px-3 py-1 text-sm font-semibold",
              passed ? "bg-sage-soft text-sage-ink" : "bg-amber-soft text-amber-ink",
            )}
          >
            {passed
              ? `✓ ${percent}% — base pronta para avançar`
              : criticalErrors.length > 0
                ? `${percent}% — revise a habilidade essencial indicada antes de considerar a base pronta`
                : `${percent}% — vale revisar os pontos indicados`}
          </p>
        )}
      </div>
    </section>
  );
}
