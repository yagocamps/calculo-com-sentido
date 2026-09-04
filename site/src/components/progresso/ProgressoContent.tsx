"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Tag } from "@/components/ui/Tag";
import {
  buildProgressDashboard,
  type ProgressDashboard,
} from "@/lib/progress-dashboard";
import {
  getProgress,
  importProgressFromJson,
  markReviewed,
  resetProgress,
} from "@/lib/progress";

export function ProgressoContent() {
  const [dash, setDash] = useState<ProgressDashboard | null>(null);

  const refresh = () => {
    setDash(buildProgressDashboard(getProgress()));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura inicial do progresso (localStorage) pós-hidratação
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("storage", onUpdate);
    window.addEventListener("ccs-progress-update", onUpdate);
    return () => {
      window.removeEventListener("storage", onUpdate);
      window.removeEventListener("ccs-progress-update", onUpdate);
    };
  }, []);

  if (!dash) {
    return (
      <PageShell crumbs={["Início", "Meu progresso"]}>
        <div className="mx-auto max-w-[1080px] space-y-6 animate-pulse select-none">
          <div className="space-y-2">
            <div className="h-10 w-48 rounded-[10px] bg-border-soft" />
            <div className="h-4 w-72 rounded-[10px] bg-border-soft" />
          </div>
          
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="h-36 w-36 rounded-2 bg-border-soft" />
              <div className="h-36 w-36 rounded-2 bg-border-soft" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-28 rounded-2 bg-border-soft" />
              <div className="h-28 rounded-2 bg-border-soft" />
            </div>
          </div>
          
          <div className="space-y-3 pt-6">
            <div className="h-8 w-56 rounded-[10px] bg-border-soft" />
            <div className="h-24 rounded-2 bg-border-soft" />
          </div>
        </div>
      </PageShell>
    );
  }

  const isEmpty =
    dash.lessonsCompleted === 0 &&
    dash.exercisesCompleted === 0 &&
    dash.attemptsTotal === 0 &&
    !dash.testeNivel;

  return (
    <PageShell crumbs={["Início", "Meu progresso"]}>
      <div className="mx-auto max-w-[1080px] space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-medium tracking-tight">
              Meu progresso
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              Seus dados ficam salvos neste navegador (localStorage).
            </p>
            {/* Streak suave: só celebra, nunca cobra (público já chega ansioso). */}
            {dash.studyDaysThisWeek > 0 && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-[13px] font-semibold text-sage-ink">
                Você estudou {dash.studyDaysThisWeek}{" "}
                {dash.studyDaysThisWeek === 1 ? "dia" : "dias"} nos últimos 7
                dias 👏
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="soft"
              size="sm"
              onClick={() => {
                try {
                  const raw = localStorage.getItem("ccs-progress");
                  if (!raw) {
                    alert("Não há progresso registrado para exportar.");
                    return;
                  }
                  const blob = new Blob([raw], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `ccs-progresso-backup-${new Date().toISOString().split('T')[0]}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                } catch (e) {
                  alert("Erro ao exportar backup: " + (e instanceof Error ? e.message : String(e)));
                }
              }}
            >
              Exportar Backup (JSON)
            </Button>

            <label className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-surface px-3 py-1.5 text-[12.5px] font-semibold cursor-pointer transition-opacity hover:opacity-90 shadow-sm select-none">
              Importar Backup (JSON)
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const text = event.target?.result as string;
                    const result = importProgressFromJson(text);
                    if (result.ok) {
                      refresh();
                      alert("Progresso importado com sucesso!");
                    } else {
                      alert(result.error ?? "Erro ao importar backup.");
                    }
                  };
                  reader.readAsText(file);
                }}
              />
            </label>

            {!isEmpty && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (
                    confirm(
                      "Zerar todo o progresso local? Esta ação não pode ser desfeita.",
                    )
                  ) {
                    resetProgress();
                    refresh();
                  }
                }}
              >
                Zerar progresso
              </Button>
            )}
          </div>
        </header>

        {isEmpty ? (
          <Card className="py-10 text-center">
            <p className="font-serif text-3xl font-medium tracking-tight">
              Sua jornada começa aqui 🌱
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              Ninguém precisa chegar sabendo — este site existe justamente para
              construir a base com calma, no seu ritmo. A primeira aula leva
              cerca de 10 minutos.
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                href={dash.nextLesson?.href ?? "/pre-calculo"}
                size="lg"
              >
                Começar primeira aula →
              </Button>
            </div>
            <p className="mt-4 text-xs text-ink-subtle">
              Prefere um diagnóstico antes?{" "}
              <Link
                href="/teste-de-nivel"
                className="font-semibold text-terracotta hover:underline"
              >
                Faça o teste de nível (10–15 min)
              </Link>
            </p>
          </Card>
        ) : (
          <>
            <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
              <div className="flex flex-wrap gap-4">
                <Card className="flex flex-col items-center justify-center py-6">
                  <ProgressRing
                    value={dash.trilhaPreCalculoPercent}
                    size={112}
                    label="PRÉ-CÁLCULO"
                  />
                </Card>
                <Card className="flex flex-col items-center justify-center py-6">
                  <ProgressRing
                    value={dash.trilhaCalculo1Percent}
                    size={112}
                    label="CÁLCULO 1"
                  />
                </Card>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard
                  label="Aulas publicadas concluídas"
                  value={String(dash.publishedLessonsCompleted)}
                  sub={`de ${dash.publishedLessonsTotal} com conteúdo`}
                />
                <StatCard
                  label="Exercícios resolvidos"
                  value={String(dash.exercisesCompleted)}
                  sub={`de ${dash.exercisesTotal} no banco`}
                />
                {dash.testeNivel && (
                  <StatCard
                    label="Teste de nível"
                    value={`${dash.testeNivel.scorePercent}%`}
                    sub={dash.testeNivel.levelLabel}
                  />
                )}
                {dash.nextLesson && (
                  <Card>
                    <p className="text-xs text-ink-subtle">Próxima aula</p>
                    <Link
                      href={dash.nextLesson.href}
                      className="mt-1 block font-serif text-lg font-medium text-terracotta hover:underline"
                    >
                      {dash.nextLesson.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-muted">
                      {dash.nextLesson.trilha} · {dash.nextLesson.moduleTitle}
                    </p>
                  </Card>
                )}
              </div>
            </div>
            <p className="text-sm text-ink-muted">
              {dash.publishedLessonsCompleted} de {dash.publishedLessonsTotal}{" "}
              aulas com conteúdo concluídas ({dash.publishedPercent}%) ·{" "}
              {dash.lessonsCompleted} de {dash.lessonsTotal} no catálogo completo
              ({dash.trilhaCombinedPercent}%)
            </p>

            {dash.reviewTotal > 0 && (
              <Card className="border-l-4 border-l-sage">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sage-ink">
                      Revisar hoje
                    </p>
                    <p className="mt-1 font-serif text-2xl font-medium">
                      {dash.reviewDueCount > 0
                        ? `${dash.reviewDueCount} ${
                            dash.reviewDueCount === 1 ? "aula" : "aulas"
                          } para revisar`
                        : "Tudo em dia por hoje 🎉"}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      Revisão espaçada: aulas voltam em intervalos crescentes
                      para fixar o conteúdo.
                    </p>
                  </div>
                </div>

                {dash.reviewQueue.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {dash.reviewQueue.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-wrap items-center gap-3 rounded-2 border border-border bg-surface px-4 py-3"
                      >
                        <div className="min-w-[180px] flex-1">
                          <Link
                            href={item.href}
                            className="font-medium text-ink hover:text-terracotta"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-ink-subtle">
                            {item.trilha} · {item.moduleTitle}
                            {item.isNew
                              ? " · nunca revisada"
                              : ` · nível ${item.box + 1}`}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Button
                            href={item.href}
                            variant="soft"
                            size="sm"
                          >
                            Revisar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              markReviewed(item.id, "again");
                              refresh();
                            }}
                          >
                            Esqueci
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              markReviewed(item.id, "good");
                              refresh();
                            }}
                          >
                            Lembrei
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}

            {dash.recommendedModule && (
              <Card className="border-l-4 border-l-terracotta">
                <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                  Módulo recomendado
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-2xl font-medium">
                      {dash.recommendedModule.title}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {dash.recommendedModule.trilha} ·{" "}
                      {dash.recommendedModule.reason} ·{" "}
                      {dash.recommendedModule.progress}% do módulo
                    </p>
                  </div>
                  <Button href={dash.recommendedModule.href}>
                    Continuar →
                  </Button>
                </div>
              </Card>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <Card>
                <h2 className="font-serif text-xl font-medium text-sage-ink">
                  Pontos fortes
                </h2>
                {dash.strengths.length > 0 ? (
                  <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                    {dash.strengths.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-sage">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-ink-muted">
                    Conclua aulas e resolva exercícios para ver seus pontos
                    fortes aqui.
                  </p>
                )}
              </Card>

              <Card className="border-l-4 border-l-amber">
                <h2 className="font-serif text-xl font-medium text-amber-ink">
                  O que revisar
                </h2>
                {dash.weakSpots.length > 0 ? (
                  <ul className="mt-3 space-y-2.5">
                    {dash.weakSpots.map((w) => (
                      <li
                        key={w.key}
                        className="rounded-2 border border-border bg-surface-soft px-3.5 py-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-ink">
                            {w.label}
                          </span>
                          <span className="rounded-full bg-amber-soft px-2 py-0.5 text-[11px] font-bold text-amber-ink">
                            {w.accuracy}% de acerto
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          {w.incorrect}{" "}
                          {w.incorrect === 1 ? "erro" : "erros"} em {w.attempts}{" "}
                          {w.attempts === 1 ? "tentativa" : "tentativas"}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold">
                          <Link
                            href={w.lessonHref}
                            className="text-terracotta hover:underline"
                          >
                            Rever: {w.lessonTitle} →
                          </Link>
                          <Link
                            href={w.exercisesHref}
                            className="text-ink-muted hover:text-terracotta"
                          >
                            Refazer exercícios →
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-ink-muted">
                    {dash.attemptsTotal === 0
                      ? "Responda exercícios (digitando sua resposta e verificando) para o site detectar o que merece revisão."
                      : "Nenhum ponto fraco detectado até agora — continue praticando! 🎉"}
                  </p>
                )}
              </Card>

              <Card>
                <h2 className="font-serif text-xl font-medium">
                  Próximas aulas (não concluídas)
                </h2>
                <ul className="mt-3 space-y-2">
                  {dash.toReview.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-ink hover:text-terracotta"
                      >
                        {item.title}
                      </Link>
                      <span className="text-xs text-ink-subtle">
                        {" "}
                        · {item.moduleTitle}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <section>
              <h2 className="mb-3 font-serif text-2xl font-medium">
                Progresso por módulo
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dash.modules.map((m) => (
                  <Link
                    key={m.key}
                    href={m.href}
                    className="rounded-2 border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-ink">{m.title}</span>
                      <ModuleStateTag state={m.state} />
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">
                      {m.trilha} · {m.lessonsDone}/{m.lessonsTotal} aulas
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-warm">
                      <div
                        className="h-full rounded-full bg-terracotta transition-all"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs font-semibold text-ink">
                      {m.progress}%
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {dash.completedLessons.length > 0 && (
              <section>
                <h2 className="mb-3 font-serif text-2xl font-medium">
                  Aulas concluídas
                </h2>
                <ul className="divide-y divide-border rounded-2 border border-border bg-surface">
                  {dash.completedLessons.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="flex items-center justify-between px-4 py-3 hover:bg-surface-soft"
                      >
                        <div>
                          <p className="font-medium">{l.title}</p>
                          <p className="text-xs text-ink-muted">
                            {l.trilha} · {l.moduleTitle}
                          </p>
                        </div>
                        <span className="text-sage">✓</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card>
      <p className="text-xs text-ink-subtle">{label}</p>
      <p className="mt-1 font-serif text-3xl font-medium">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{sub}</p>
    </Card>
  );
}

function ModuleStateTag({ state }: { state: string }) {
  const map: Record<string, { tone: "sage" | "terracotta" | "sky" | "muted"; label: string }> = {
    done: { tone: "sage", label: "Concluído" },
    current: { tone: "terracotta", label: "Em curso" },
    open: { tone: "sky", label: "Aberto" },
    locked: { tone: "muted", label: "Em breve" },
  };
  const t = map[state] ?? map.open;
  return <Tag tone={t.tone}>{t.label}</Tag>;
}
