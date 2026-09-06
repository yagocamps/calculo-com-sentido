"use client";

import { useState } from "react";
import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import { sectionLinks } from "@/components/aulas/toc-sections";
import { Button } from "@/components/ui/Button";
import type { AulaQuizQuestion } from "@/data/aulas/types";
import { cn } from "@/lib/utils";
import { evaluateLessonQuiz } from "@/lib/checkpoint";

const sectionLabelById = new Map(
  sectionLinks.map((s) => [s.id as string, s.label]),
);

/**
 * Mini-quiz de saída (mastery learning): 3 perguntas rápidas ao final da
 * aula. 2+ acertos → "pronto para a próxima"; menos → reforço apontando a
 * seção exata para reler. Evita o padrão de avançar com lacunas até desabar
 * em módulos mais à frente.
 */
export function AulaQuiz({
  questions,
  nextLesson,
}: {
  questions: AulaQuizQuestion[];
  nextLesson?: { title: string; href: string };
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    questions.map(() => null),
  );
  const [checked, setChecked] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const { score, passed } = evaluateLessonQuiz(questions, answers);

  const missedSections = checked
    ? [
        ...new Set(
          questions
            .filter((q, i) => answers[i] !== q.corretaIndex)
            .map((q) => q.reforcoSectionId)
            .filter((id): id is string => Boolean(id)),
        ),
      ]
    : [];

  const reset = () => {
    setAnswers(questions.map(() => null));
    setChecked(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-ink-muted">
        Sem nota, sem pressão — é só para você saber se vale avançar ou reler
        um trecho antes.
      </p>
      {questions.some((q) => q.critical) && (
        <p className="text-sm text-ink-muted">Para indicar prontidão, as questões marcadas como essenciais também precisam estar corretas.</p>
      )}

      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const isRight = checked && chosen === q.corretaIndex;
        const isWrong = checked && chosen !== null && chosen !== q.corretaIndex;
        return (
          <fieldset
            key={q.pergunta.slice(0, 32)}
            className={cn(
              "rounded-2 border bg-surface p-4",
              isRight && "border-sage",
              isWrong && "border-amber",
              !checked && "border-border",
            )}
          >
            <legend className="sr-only">Pergunta {qi + 1}</legend>
            <div className="flex items-start gap-2.5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-terracotta-soft font-mono text-[11px] font-bold text-terracotta-ink">
                {qi + 1}
              </span>
              <RichText as="p" className="text-[15px] font-medium leading-relaxed">
                {q.pergunta}
              </RichText>
            </div>

            <div className="mt-3 space-y-1.5">
              {q.opcoes.map((op, oi) => {
                const selected = chosen === oi;
                const correct = checked && oi === q.corretaIndex;
                const wrongPick = checked && selected && oi !== q.corretaIndex;
                return (
                  <label
                    key={op.slice(0, 32)}
                    className={cn(
                      "flex cursor-pointer items-start gap-2.5 rounded-xl border px-3 py-2 text-[14px] leading-relaxed transition-colors",
                      correct
                        ? "border-sage bg-sage-soft/60"
                        : wrongPick
                          ? "border-amber bg-amber-soft/50"
                          : selected
                            ? "border-terracotta bg-terracotta-soft/40"
                            : "border-border-soft bg-surface-soft/50 hover:border-terracotta",
                    )}
                  >
                    <input
                      type="radio"
                      name={`quiz-q${qi}`}
                      checked={selected}
                      disabled={checked}
                      onChange={() =>
                        setAnswers((prev) =>
                          prev.map((a, i) => (i === qi ? oi : a)),
                        )
                      }
                      className="mt-1 accent-[var(--terracotta)]"
                    />
                    <RichText as="span">{op}</RichText>
                    {correct && (
                      <span className="ml-auto shrink-0 text-sage" aria-hidden>
                        ✓
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            {checked && (
              <RichText
                as="p"
                className={cn(
                  "mt-2.5 rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                  isRight
                    ? "bg-sage-soft/50 text-sage-ink"
                    : "bg-amber-soft/50 text-amber-ink",
                )}
              >
                {q.explicacao}
              </RichText>
            )}
            {q.critical && <p className="mt-2 text-xs font-semibold text-terracotta">Condição essencial para aplicar a regra</p>}
          </fieldset>
        );
      })}

      {!checked ? (
        <Button onClick={() => setChecked(true)} disabled={!allAnswered}>
          {allAnswered
            ? "Conferir respostas"
            : "Responda as perguntas para conferir"}
        </Button>
      ) : (
        <div
          className={cn(
            "rounded-2 border p-5",
            passed ? "border-sage bg-sage-soft/40" : "border-amber bg-amber-soft/40",
          )}
        >
          {passed ? (
            <>
              <p className="font-serif text-xl font-medium text-sage-ink">
                {score} de {questions.length} — você está pronto para a
                próxima! 🎉
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {nextLesson && (
                  <Button href={nextLesson.href}>
                    Próxima aula: {nextLesson.title} →
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={reset}>
                  Refazer o quiz
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="font-serif text-xl font-medium text-amber-ink">
                {score} de {questions.length} — vamos reforçar antes de seguir?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Nada de errado em reler — é assim que fixa. Veja de novo
                {missedSections.length > 0
                  ? " as seções abaixo e refaça o quiz:"
                  : " as explicações da aula e refaça o quiz:"}
              </p>
              {missedSections.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {missedSections.map((id) => (
                    <Link
                      key={id}
                      href={`#${id}`}
                      className="rounded-full border border-border bg-surface px-3 py-1 text-[12.5px] font-semibold text-ink-muted transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      ↥ {questions.find((q) => q.reforcoSectionId === id)?.reforcoLabel ?? sectionLabelById.get(id) ?? id}
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <Button variant="soft" size="sm" onClick={reset}>
                  Refazer o quiz
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
