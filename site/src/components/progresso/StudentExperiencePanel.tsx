"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ProgressDashboard } from "@/lib/progress-dashboard";
import { configureStudyPlan, updateStudyPlanSession } from "@/lib/progress";

const sourceLabel = {
  "exercise-errors": "Com base nos seus erros",
  "guided-errors": "Com base nos exercícios guiados",
  "checkpoint-errors": "Com base no checkpoint",
  "level-test": "Com base no teste de nível",
  review: "Com base na revisão espaçada",
  path: "Com base nos pré-requisitos",
} as const;

function formatAttemptDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function StudentExperiencePanel({
  dash,
  onRefresh,
}: {
  dash: ProgressDashboard;
  onRefresh: () => void;
}) {
  const recommendation = dash.skillRecommendation;

  return (
    <div className="space-y-5">
      {recommendation && (
        <Card className="border-l-4 border-l-terracotta">
          <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
            Próximo passo recomendado · {sourceLabel[recommendation.source]}
          </p>
          <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-ink-muted">
                Habilidade: {recommendation.skill}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-medium">
                {recommendation.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {recommendation.reason}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href={recommendation.href}>Estudar agora →</Button>
              {recommendation.practiceHref && (
                <Button href={recommendation.practiceHref} variant="soft">
                  Praticar habilidade
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-ink">
            Sessão adaptativa
          </p>
          <h2 className="mt-1 font-serif text-xl font-medium">
            Cinco questões, uma de cada vez
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            A próxima questão é escolhida após cada resposta, buscando subir no acerto e reforçar no erro. Uma sessão salva é retomada ao entrar.
          </p>
          <ol className="mt-4 space-y-2">
            {dash.adaptiveSession.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="grid grid-cols-[28px_1fr_auto] items-start gap-2 rounded-xl border border-border bg-surface-soft px-3 py-2.5 transition-colors hover:border-sky"
                >
                  <span className="font-mono text-xs font-bold text-sky-ink">
                    →
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {item.title}
                    </span>
                    <span className="block text-[11px] text-ink-muted">
                      {item.reason}
                    </span>
                  </span>
                  <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-sky-ink">
                    nível {item.level}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          {dash.adaptiveSession[0] && (
            <Button href={dash.adaptiveSession[0].href} className="mt-4">
              Abrir sessão →
            </Button>
          )}
        </Card>

        <Card>
          <p className="text-[11px] font-bold uppercase tracking-wider text-sage-ink">
            Plano de estudos
          </p>
          <h2 className="mt-1 font-serif text-xl font-medium">
            Escolha um ritmo realista
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {([2, 4, 8] as const).map((weeks) => (
              <button
                key={weeks}
                type="button"
                aria-pressed={dash.studyPlan?.durationWeeks === weeks}
                onClick={() => {
                  configureStudyPlan(weeks, recommendation?.href);
                  onRefresh();
                }}
                className={`rounded-xl border px-2 py-2 text-center text-sm font-semibold transition-colors ${
                  dash.studyPlan?.durationWeeks === weeks
                    ? "border-sage bg-sage-soft text-sage-ink"
                    : "border-border bg-surface-soft text-ink-muted hover:border-sage"
                }`}
              >
                {weeks} semanas
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-muted">Trocar o ritmo cria um novo plano. O histórico de aulas e exercícios é preservado.</p>
          {dash.studyPlan ? (
            <>
              <p className="mt-3 text-xs text-ink-muted">
                {dash.studyPlan.sessionsPerWeek} sessões por semana · cerca de{" "}
                {dash.studyPlan.minutesPerSession} min por sessão ·{" "}
                {dash.studyPlan.durationWeeks * dash.studyPlan.sessionsPerWeek} sessões no total
              </p>
              <p className="mt-2 text-sm font-semibold" role="status">{dash.studyPlanSteps.filter((s) => s.completed).length} de {dash.studyPlanSteps.length} sessões concluídas</p>
              <p className="mt-1 text-xs text-ink-muted">Marque a sessão depois de estudar. Isso acompanha sua rotina e não certifica domínio. Para reagendar, escolha a data e clique em Salvar data.</p>
              <div className="mt-3 space-y-3">
                {Array.from({ length: dash.studyPlan.durationWeeks }, (_, i) => i + 1).map((week) => (
                  <details key={week} open={week === 1} className="rounded-xl border border-border p-3">
                    <summary className="cursor-pointer font-semibold">Semana {week} · {dash.studyPlanSteps.filter((s) => s.week === week && s.completed).length}/{dash.studyPlan!.sessionsPerWeek} concluídas</summary>
                    <ol className="mt-3 space-y-3">
                {dash.studyPlanSteps.filter((step) => step.week === week).map((step) => (
                  <li key={step.id}>
                    <Link
                      href={step.href}
                      className="block rounded-xl border border-border bg-surface-soft px-3 py-2.5 hover:border-sage"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sage-ink">
                        {step.label} · {step.minutes} min
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold text-ink">
                        {step.title}
                      </span>
                      <span className="block text-[11px] text-ink-muted">
                        {step.reason}
                      </span>
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={step.completed}
                        onChange={(event) => { updateStudyPlanSession(step.id, { completed: event.target.checked }); onRefresh(); }} />
                        Concluí a sessão {step.slot} da semana {step.week}</label>
                      <form key={`${dash.studyPlan!.startedAt}:${step.id}:${step.date}`} className="flex flex-wrap items-center gap-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          const date = new FormData(event.currentTarget).get("date");
                          if (typeof date === "string") { updateStudyPlanSession(step.id, { date }); onRefresh(); }
                        }}>
                        <label className="flex items-center gap-2">Reagendar
                          <input type="date" name="date" required defaultValue={step.date} aria-label={`Data da sessão ${step.slot} da semana ${step.week}`}
                            className="min-w-0 rounded border border-border bg-surface p-1 text-ink" />
                        </label>
                        <button type="submit" aria-label={`Salvar data da sessão ${step.slot} da semana ${step.week}`} className="rounded border border-border px-2 py-1 font-semibold text-sage-ink hover:bg-sage-soft">Salvar data</button>
                      </form>
                    </div>
                  </li>
                ))}
                    </ol>
                  </details>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              O plano combina sua habilidade prioritária, prática adaptativa e revisão.
              Escolha 2, 4 ou 8 semanas para montar todas as sessões do plano.
            </p>
          )}
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-l-4 border-l-amber">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-ink">
            Histórico de erros
          </p>
          <h2 className="mt-1 font-serif text-xl font-medium">
            O que merece uma segunda tentativa
          </h2>
          {dash.errorHistory.length ? (
            <ul className="mt-3 divide-y divide-border-soft">
              {dash.errorHistory.map((item) => (
                <li key={item.key} className="py-2.5 first:pt-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link href={item.href} className="text-sm font-semibold text-ink hover:text-terracotta">
                        {item.title} →
                      </Link>
                      <p className="text-[11px] text-ink-muted">{item.skill}</p>
                    </div>
                    <time className="text-[10px] text-ink-subtle" dateTime={item.attemptedAt}>
                      {formatAttemptDate(item.attemptedAt)}
                    </time>
                  </div>
                  {item.lessonHref && (
                    <Link href={item.lessonHref} className="mt-1 inline-block text-[11px] font-semibold text-terracotta hover:underline">
                      Rever a explicação da habilidade
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">
              Quando uma resposta não der certo, ela aparecerá aqui com o caminho de revisão.
            </p>
          )}
        </Card>

        <Card>
          <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
            Favoritos e anotações
          </p>
          <h2 className="mt-1 font-serif text-xl font-medium">
            Seu caderno de retomada
          </h2>
          {dash.savedLessons.length ? (
            <ul className="mt-3 space-y-2">
              {dash.savedLessons.map((item) => (
                <li key={item.id} className="rounded-xl border border-border bg-surface-soft px-3 py-2.5">
                  <Link href={item.href} className="text-sm font-semibold text-ink hover:text-terracotta">
                    {item.favorite ? "★ " : ""}{item.title} →
                  </Link>
                  <p className="text-[11px] text-ink-muted">{item.moduleTitle}</p>
                  {item.note && (
                    <p className="mt-1 line-clamp-2 text-xs italic text-ink-muted">
                      “{item.note}”
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-muted">
              Abra “Minha área de estudo” em qualquer aula para favoritar ou anotar.
            </p>
          )}
        </Card>
      </div>

      <Card className="bg-surface-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
              Sincronização opcional, sem conta
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              O backup JSON no topo inclui progresso, teste, respostas de checkpoints e exercícios guiados, histórico, sessão adaptativa, plano, favoritos e anotações.
              Exporte neste computador e importe em outro quando quiser.
            </p>
          </div>
          <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-ink">
            Seus dados continuam locais
          </span>
        </div>
      </Card>
    </div>
  );
}
