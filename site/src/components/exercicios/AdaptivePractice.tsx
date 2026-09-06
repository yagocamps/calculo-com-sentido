"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { exercicios } from "@/data/exercicios";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/aulas/RichText";
import { ExercicioDetail } from "@/components/exercicios/ExercicioDetail";
import { answerAdaptiveSession, createAdaptiveSession, nextAdaptiveExercise, type AdaptiveAnswer, type AdaptiveSession } from "@/lib/adaptive-session";
import { getProgress, markExerciseComplete, recordExerciseAttempt, saveProgress } from "@/lib/progress";
import { pedagogicalLevelOf } from "@/lib/exercicios";

export function AdaptivePractice({ seedId }: { seedId: string }) {
  const [session, setSession] = useState<AdaptiveSession | null>(null);
  const currentSession = useRef<AdaptiveSession | null>(null);
  const statusRef = useRef<HTMLElement | null>(null);
  const currentId = session?.currentId;
  const sessionId = session?.id;
  const complete = Boolean(session && session.answers.length >= session.targetCount);

  useEffect(() => { statusRef.current?.focus(); }, [currentId, sessionId, complete]);

  function update(next: AdaptiveSession) {
    currentSession.current = next;
    setSession(next);
    saveProgress({ adaptiveSession: next });
  }

  useEffect(() => {
    const saved = getProgress().adaptiveSession;
    const initial = saved ?? createAdaptiveSession(seedId, crypto.randomUUID());
    currentSession.current = initial;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only session after SSR
    setSession(initial);
    if (initial && !saved) saveProgress({ adaptiveSession: initial });
  }, [seedId]);

  function assess(answer: AdaptiveAnswer) {
    const previous = currentSession.current;
    if (!previous) return;
    const next = answerAdaptiveSession(previous, answer);
    if (next === previous) return;
    update(next);
    recordExerciseAttempt(answer.exerciseId, answer.outcome, answer.method);
    if (answer.outcome === "correct") markExerciseComplete(answer.exerciseId);
  }

  function startNew() {
    const next = createAdaptiveSession(seedId, crypto.randomUUID());
    if (next) update(next);
  }

  const active = exercicios.find((e) => e.id === session?.currentId);
  const requested = exercicios.find((e) => e.id === seedId);
  const assessment = session?.answers.find((a) => a.exerciseId === session.currentId);
  const next = session ? nextAdaptiveExercise(session, getProgress().completedExercises) : null;
  const correct = session?.answers.filter((a) => a.outcome === "correct").length ?? 0;

  return (
    <PageShell crumbs={["Início", "Exercícios", "Sessão adaptativa"]}>
      <div className="mx-auto max-w-3xl space-y-5">
        <header>
          <h1 className="font-serif text-3xl font-medium">Sessão adaptativa</h1>
          <p className="mt-2 text-sm text-ink-muted">Uma resposta por questão nesta sessão. Acerto busca um nível acima; erro busca um abaixo, dentro do mesmo tema. Se esse nível acabar, usamos o mais próximo disponível.</p>
          <Link href="/exercicios" className="mt-2 inline-block text-sm text-terracotta underline">Pausar e voltar ao banco</Link>
        </header>
        {session && requested && requested.temaSlug !== session.temaSlug && (
          <aside className="rounded-xl border border-border p-4 text-sm">
            <p>Você abriu uma prática de {requested.tema}, mas há uma sessão salva de {active?.tema}. Continue abaixo ou inicie o tema que acabou de escolher.</p>
            <Button className="mt-2" variant="soft" onClick={startNew}>Iniciar sessão de {requested.tema}</Button>
          </aside>
        )}
        {!session || !active ? <p role="status">Preparando sua sessão…</p> : complete ? (
          <section ref={statusRef} tabIndex={-1} aria-label="Resumo da sessão" className="rounded-3 border border-border bg-surface p-6">
            <h2 className="font-serif text-2xl" role="status">Sessão concluída · {session.targetCount} de {session.targetCount}</h2>
            <p className="mt-2">{correct} {correct === 1 ? "acerto" : "acertos"} e {session.targetCount - correct} {session.targetCount - correct === 1 ? "erro" : "erros"}. Use as resoluções para decidir o que revisar.</p>
            <p className="mt-1 text-xs text-ink-muted">Respostas por autoavaliação ficam identificadas abaixo; a conclusão desta sessão não certifica domínio do tema.</p>
            <ol className="my-4 space-y-3">
              {session.answers.map((answer) => {
                const exercise = exercicios.find((e) => e.id === answer.exerciseId)!;
                return <li key={answer.exerciseId} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-semibold">{answer.outcome === "correct" ? "✓ Acerto" : "Revisar"} · {exercise.title}</p>
                  <p className="text-xs text-ink-muted">{answer.method === "automatic" ? "Conferência automática" : "Autoavaliação"}</p>
                  <details className="mt-2 text-sm"><summary className="cursor-pointer text-terracotta">Conferir resolução</summary><RichText as="div">{exercise.resolucaoSteps?.join("\n") ?? exercise.resolucao}</RichText><RichText as="p">{`Resposta: ${exercise.resposta}`}</RichText></details>
                </li>;
              })}
            </ol>
            <div className="flex flex-wrap gap-2"><Button onClick={startNew}>Começar outra sessão</Button><Button href="/progresso" variant="soft">Ver meu progresso</Button></div>
          </section>
        ) : (
          <>
            <section ref={statusRef} tabIndex={-1} aria-label="Andamento da sessão" className="rounded-2 border border-border bg-sky-soft/30 p-4">
              <p className="font-semibold" role="status">Questão {session.answers.length + (assessment ? 0 : 1)} de {session.targetCount} · {active.tema}</p>
              <p className="text-sm text-ink-muted">{session.answers.length} {session.answers.length === 1 ? "resposta registrada" : "respostas registradas"}. A sessão é retomada neste ponto ao voltar.</p>
              {next && <p className="mt-2 text-sm">Próxima questão: nível {pedagogicalLevelOf(next)}. {assessment?.outcome === "correct" ? "Vamos avançar a dificuldade quando houver questões disponíveis." : "Vamos reforçar a base antes de avançar."}</p>}
              {assessment && <p className="mt-2 text-sm">Resposta registrada. Confira a resolução e use Próximo para continuar.</p>}
            </section>
            <ExercicioDetail key={`${session.id}:${active.id}`} exercicio={active} assessment={assessment} onAssess={assess}
              hasPrev={false} hasNext={Boolean(next)} onReset={() => {}}
              onNext={() => { const latest = currentSession.current; if (!latest) return; const selected = nextAdaptiveExercise(latest, getProgress().completedExercises); if (selected) update({ ...latest, currentId: selected.id }); }} />
            <details className="text-sm text-ink-muted"><summary className="cursor-pointer">Trocar a sessão em andamento</summary><p className="my-2">Iniciar outra substitui esta sequência salva. As tentativas já registradas continuam no histórico.</p><Button variant="soft" onClick={startNew}>Iniciar nova sequência</Button></details>
          </>
        )}
      </div>
    </PageShell>
  );
}
