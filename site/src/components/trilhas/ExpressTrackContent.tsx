"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import {
  expressReadingMinutes,
  expressStages,
  resolveExpressRef,
} from "@/data/trilha-expressa";
import { getProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function ExpressTrackContent() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      setCompleted(getProgress().completedLessons);
    };
    update();
    window.addEventListener("ccs-progress-update", update);
    return () => window.removeEventListener("ccs-progress-update", update);
  }, []);

  const stages = expressStages.map((stage) => ({
    ...stage,
    lessons: stage.refs
      .map(resolveExpressRef)
      .filter((l): l is NonNullable<typeof l> => Boolean(l)),
  }));

  const allLessons = stages.flatMap((s) => s.lessons);
  const doneCount = allLessons.filter((l) => completed.includes(l.id)).length;
  const readingMin = expressReadingMinutes();
  const readingHours = Math.round((readingMin / 60) * 10) / 10;

  return (
    <PageShell crumbs={["Início", "Socorro, tenho prova!"]}>
      <div className="mx-auto max-w-[820px]">
        <section className="rounded-3 border border-border bg-gradient-to-br from-surface-warm to-amber-soft/40 px-8 py-8 md:px-10">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
            Trilha expressa
          </p>
          <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight">
            Prova chegando? Respira.
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            Este é o corte mínimo para sobreviver a limites e derivadas:{" "}
            {allLessons.length} aulas (~{readingHours.toLocaleString("pt-BR")}h
            de leitura, uns 10h de estudo com exercícios). Não substitui a
            trilha completa — mas resolve a urgência. Depois da prova, volta
            com calma.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Tag tone="sage">
              {doneCount} de {allLessons.length} aulas concluídas
            </Tag>
            <Link
              href="/teste-de-nivel"
              className="text-[13px] font-semibold text-terracotta hover:underline"
            >
              Tem alguns minutos? O teste de nível diz onde focar →
            </Link>
          </div>
        </section>

        {stages.map((stage, si) => (
          <section key={stage.titulo} className="mt-8">
            <div className="flex items-baseline gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-terracotta font-mono text-[12px] font-bold text-bg">
                {si + 1}
              </span>
              <div>
                <h2 className="font-serif text-2xl font-medium tracking-tight">
                  {stage.titulo}
                </h2>
                <p className="mt-0.5 text-sm text-ink-muted">{stage.desc}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {stage.lessons.map((lesson) => {
                const done = completed.includes(lesson.id);
                return (
                  <li key={lesson.id}>
                    <Link
                      href={lesson.href}
                      className={cn(
                        "flex flex-wrap items-center gap-3 rounded-2 border bg-surface px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                        done ? "border-sage/60" : "border-border",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[12px] font-bold",
                          done
                            ? "border-sage bg-sage text-bg"
                            : "border-border text-ink-subtle",
                        )}
                        aria-label={done ? "Aula concluída" : "Aula pendente"}
                      >
                        {done ? "✓" : ""}
                      </span>
                      <span className="min-w-[200px] flex-1">
                        <span
                          className={cn(
                            "block text-[14.5px] font-semibold",
                            done && "text-ink-muted line-through decoration-sage/60",
                          )}
                        >
                          {lesson.title}
                        </span>
                        {lesson.motivo && (
                          <span className="block text-[12px] text-ink-subtle">
                            {lesson.motivo}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs text-ink-subtle">
                        ⏱ {lesson.duration}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="mt-10 flex flex-col items-center rounded-3 border border-border bg-surface-warm px-8 py-8 text-center">
          <h2 className="max-w-md text-balance font-serif text-2xl font-medium tracking-tight">
            Passou a prova? Agora constrói a base de verdade.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            A trilha expressa apaga incêndio. A trilha completa evita o
            próximo.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            <Button href="/pre-calculo">Trilha completa de Pré-Cálculo →</Button>
            <Button href="/calculo-1" variant="ghost">
              Trilha completa de Cálculo 1 →
            </Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
