"use client";

import { useState } from "react";
import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import { Button } from "@/components/ui/Button";
import type { ModuleCheckpointData } from "@/data/checkpoints";
import { cn } from "@/lib/utils";

export function ModuleCheckpoint({
  data,
  storageKey,
}: {
  data: ModuleCheckpointData;
  storageKey: string;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = data.questions.reduce(
    (total, question, index) =>
      total + Number(answers[index] === question.correctIndex),
    0,
  );
  const percent = Math.round((score / data.questions.length) * 100);
  const passed = percent >= data.passPercent;

  function submit() {
    setSubmitted(true);
    try {
      window.localStorage.setItem(
        `ccs-checkpoint:v1:${storageKey}`,
        JSON.stringify({ percent, completedAt: new Date().toISOString() }),
      );
    } catch {
      // O checkpoint continua funcionando sem armazenamento local.
    }
  }

  return (
    <section className="mt-6 rounded-3 border border-border bg-surface-warm p-6">
      <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
        Revisão cumulativa
      </p>
      <h2 className="mt-1 font-serif text-2xl font-medium">{data.title}</h2>
      <p className="mt-1 text-sm text-ink-muted">{data.description}</p>
      <p className="mt-2 text-xs font-semibold text-ink-subtle">
        Meta sugerida: {data.passPercent}% · você pode continuar mesmo sem atingir a meta.
      </p>

      <ol className="mt-5 space-y-4">
        {data.questions.map((question, questionIndex) => (
          <li key={question.prompt} className="rounded-2 border border-border bg-surface p-4">
            <RichText as="p" className="text-sm font-semibold">
              {`${questionIndex + 1}. ${question.prompt}`}
            </RichText>
            <div
              className="mt-3 grid gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label={`Respostas da questão ${questionIndex + 1}`}
            >
              {question.options.map((option, optionIndex) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={answers[questionIndex] === optionIndex}
                  onClick={() => {
                    setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }));
                    setSubmitted(false);
                  }}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-left text-[13px] transition-colors",
                    answers[questionIndex] === optionIndex
                      ? "border-terracotta bg-terracotta-soft/40"
                      : "border-border hover:border-terracotta",
                  )}
                >
                  <RichText>{option}</RichText>
                </button>
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
          disabled={Object.keys(answers).length < data.questions.length}
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
              : `${percent}% — vale revisar os pontos indicados`}
          </p>
        )}
      </div>
    </section>
  );
}
