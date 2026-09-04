"use client";

import { useEffect, useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import { PageShell } from "@/components/layout/PageShell";
import { ResultScreen } from "@/components/teste/ResultScreen";
import { TopicsSidebar } from "@/components/teste/TopicsSidebar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import {
  testQuestions,
  type OptionKey,
} from "@/data/teste-nivel";
import {
  calculateScore,
  getLastTestResult,
  saveTestResult,
  type TesteNivelResult,
} from "@/lib/teste-nivel";
import { trackCcsEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Phase = "intro" | "quiz" | "result";

export function TesteNivelFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionKey>>({});
  const [selected, setSelected] = useState<OptionKey | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState<TesteNivelResult | null>(null);
  const [lastResult, setLastResult] = useState<TesteNivelResult | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura do último resultado (localStorage) client-only
    setLastResult(getLastTestResult());
  }, [phase]);

  const question = testQuestions[index];
  const total = testQuestions.length;
  const progressPct = Math.round(((index + (showFeedback ? 1 : 0)) / total) * 100);

  const startTest = () => {
    trackCcsEvent(ANALYTICS_EVENTS.levelTestStarted, {
      questionCount: total,
    });
    setPhase("quiz");
    setIndex(0);
    setAnswers({});
    setSelected(null);
    setShowFeedback(false);
    setResult(null);
  };

  const confirmAnswer = () => {
    if (!selected || !question) return;
    const nextAnswers = { ...answers, [question.id]: selected };
    setAnswers(nextAnswers);
    setShowFeedback(true);
  };

  const goNextAfterFeedback = () => {
    if (!question || !selected) return;
    const nextAnswers = { ...answers, [question.id]: selected };
    setAnswers(nextAnswers);
    if (index >= total - 1) {
      const r = calculateScore(nextAnswers);
      trackCcsEvent(ANALYTICS_EVENTS.levelTestCompleted, {
        scorePercent: r.scorePercent,
        recommendationBand: r.recommendation.band,
      });
      setResult(r);
      saveTestResult(r);
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setShowFeedback(false);
  };

  const goPrev = () => {
    if (index === 0) return;
    const prev = index - 1;
    setIndex(prev);
    const prevQ = testQuestions[prev];
    setSelected(answers[prevQ.id] ?? null);
    setShowFeedback(!!answers[prevQ.id]);
  };

  const retry = () => {
    setPhase("intro");
    setIndex(0);
    setAnswers({});
    setSelected(null);
    setShowFeedback(false);
    setResult(null);
  };

  if (phase === "intro") {
    return (
      <PageShell crumbs={["Início", "Teste de nível"]}>
        <div className="mx-auto max-w-[640px]">
          <Tag tone="sky">Onboarding · {total} perguntas</Tag>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">
            Por onde você deve começar?
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            Responda perguntas rápidas sobre o que você lembra do ensino médio.
            No final, indicamos se você deve começar pela base, por Pré-Cálculo
            ou por Cálculo 1.
          </p>
          <Card className="mt-8">
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>· Operações, frações, potências e equações</li>
              <li>· Funções, gráficos e trigonometria</li>
              <li>· Noção intuitiva de limite</li>
            </ul>
            <p className="mt-4 text-xs text-ink-subtle">
              Não vale nota — só orientação. Leva cerca de 10–15 minutos.
            </p>
            {lastResult && (
              <p className="mt-4 rounded-xl border border-border bg-surface-warm px-3 py-2 text-sm text-ink-muted">
                Último resultado:{" "}
                <b className="text-ink">{lastResult.scorePercent}%</b> —{" "}
                {lastResult.recommendation.levelLabel}
              </p>
            )}
          </Card>
          <div className="mt-6 flex gap-2.5">
            <Button href="/" variant="ghost">
              ← Voltar
            </Button>
            <Button size="lg" onClick={startTest}>
              Começar teste →
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  if (phase === "result" && result) {
    return (
      <PageShell crumbs={["Início", "Teste de nível", "Resultado"]}>
        <ResultScreen result={result} answers={answers} onRetry={retry} />
      </PageShell>
    );
  }

  const isCorrect = selected === question.correct;

  return (
    <PageShell crumbs={["Início", "Teste de nível"]}>
      <div className="mx-auto grid max-w-[1080px] gap-5 lg:grid-cols-[1fr_280px]">
        <div>
          <Card className="!p-7 md:!px-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="font-serif text-[13px] italic tracking-wide text-ink-muted">
                Pergunta {String(index + 1).padStart(2, "0")} / {total}
              </span>
              <div className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-surface-warm">
                <div
                  className="h-full rounded-full bg-terracotta transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs text-ink-muted">{progressPct}% completo</span>
            </div>

            <Tag tone="sky">
              {question.topicLabel}
              {question.subtopic ? ` · ${question.subtopic}` : ""}
            </Tag>

            <h2 className="mt-2 font-serif text-[26px] font-medium leading-snug tracking-tight">
              <RichText as="span">{question.question}</RichText>
            </h2>

            {question.context && (
              <RichText as="p" className="mt-2 text-sm leading-relaxed text-ink-muted">
                {question.context}
              </RichText>
            )}

            {question.formula && (
              <div className="mt-3 inline-block rounded-lg border border-border-soft bg-surface-warm px-3.5 py-2 font-mono text-[15px]">
                <RichText>{question.formula}</RichText>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2.5">
              {question.options.map((opt) => {
                const isSelected = selected === opt.key;
                const showCorrect = showFeedback && opt.key === question.correct;
                const showWrong =
                  showFeedback && isSelected && opt.key !== question.correct;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    disabled={showFeedback}
                    onClick={() => setSelected(opt.key)}
                    className={cn(
                      "flex items-center gap-3.5 rounded-2 border px-4 py-3.5 text-left text-[14.5px] transition-colors",
                      !showFeedback &&
                        isSelected &&
                        "border-terracotta bg-terracotta-soft",
                      !showFeedback &&
                        !isSelected &&
                        "border-border bg-surface-soft hover:border-terracotta/50",
                      showCorrect && "border-sage bg-sage-soft",
                      showWrong && "border-terracotta bg-terracotta-soft/80",
                      showFeedback && "cursor-default",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-mono text-[13px] font-semibold",
                        isSelected && !showFeedback
                          ? "border-terracotta bg-terracotta text-bg"
                          : "border-border bg-surface text-ink-muted",
                        showCorrect && "border-sage bg-sage text-bg",
                      )}
                    >
                      {opt.key}
                    </span>
                    <RichText as="span">{opt.text}</RichText>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div
                className={cn(
                  "mt-5 rounded-2 border px-4 py-3 text-sm leading-relaxed",
                  isCorrect
                    ? "border-sage bg-sage-soft text-sage-ink"
                    : "border-amber bg-amber-soft text-amber-ink",
                )}
              >
                <b>{isCorrect ? "Correto!" : "Não foi dessa vez."}</b>{" "}
                <RichText as="span">{question.explanation}</RichText>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-4">
              <Button
                variant="ghost"
                onClick={goPrev}
                disabled={index === 0}
              >
                ← Anterior
              </Button>
              <span className="text-[13px] text-ink-subtle">
                {showFeedback
                  ? "Leia a explicação e avance."
                  : "Após confirmar, mostramos uma explicação curta."}
              </span>
              {!showFeedback ? (
                <Button onClick={confirmAnswer} disabled={!selected}>
                  Confirmar →
                </Button>
              ) : (
                <Button onClick={goNextAfterFeedback}>
                  {index >= total - 1 ? "Ver resultado →" : "Próxima →"}
                </Button>
              )}
            </div>
          </Card>

          <div className="mt-3.5 flex items-center gap-3 rounded-2 border border-amber bg-amber-soft px-4 py-3 text-[13px] text-amber-ink">
            <span aria-hidden>💡</span>
            <span>
              <b>Dica:</b> não se preocupe se errar — o teste só serve para
              recomendar por onde começar. Não conta nota.
            </span>
          </div>
        </div>

        <TopicsSidebar currentIndex={index} />
      </div>
    </PageShell>
  );
}
