import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Tag } from "@/components/ui/Tag";
import type { ModuleState } from "@/components/trilhas/ModuleCard";
import type { TrilhaModuloData } from "@/data/trilha-module";
import { isLessonAccessible } from "@/lib/aulas";
import { moduleStateTag } from "@/lib/progress-utils";
import { cn } from "@/lib/utils";

export function ModuloPageContent({
  trilhaSlug,
  trilhaLabel,
  trilhaHref,
  modulo,
  progress,
  moduleState,
  lessonStatuses,
  lessonPathFn,
}: {
  trilhaSlug: "pre-calculo" | "calculo-1";
  trilhaLabel: string;
  trilhaHref: string;
  modulo: TrilhaModuloData;
  progress: number;
  moduleState: ModuleState;
  lessonStatuses: { slug: string; done: boolean; available: boolean }[];
  lessonPathFn: (moduloSlug: string, aulaSlug: string) => string;
}) {
  const stateLabel = moduleStateTag(moduleState);

  return (
    <div className="mx-auto max-w-[1080px]">
      <Button href={trilhaHref} variant="ghost" size="sm" className="mb-4">
        ← Voltar à trilha
      </Button>

      <header className="flex flex-col gap-6 rounded-3 border border-border bg-surface-warm p-7 md:flex-row md:p-8">
        <div className="flex-1">
          <p className="font-serif text-[13px] italic text-terracotta">
            Módulo {modulo.n} · {trilhaLabel}
          </p>
          <h1 className="mt-1 font-serif text-[38px] font-medium leading-tight tracking-tight">
            {modulo.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
            {modulo.desc}
          </p>
          <Tag tone={stateLabel.tone} className="mt-4">
            {stateLabel.text}
          </Tag>
        </div>
        <ProgressRing value={progress} size={100} label="DO MÓDULO" />
      </header>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-serif text-lg font-medium">Conteúdos</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
            {modulo.contents.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-terracotta">·</span>
                {c}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-serif text-lg font-medium">Onde aparece na prática</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
            {modulo.applications.map((a) => (
              <li key={a} className="flex gap-2">
                <span className="text-sage">·</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            Aulas ({modulo.lessons.length})
          </h2>
        </div>
        <ol className="space-y-2">
          {modulo.lessons.map((aula, i) => {
            const status = lessonStatuses.find((s) => s.slug === aula.slug);
            const done = status?.done ?? false;
            const canOpen = isLessonAccessible(
              trilhaSlug,
              modulo.slug,
              aula,
              modulo.defaultState === "locked",
            );

            return (
              <li key={aula.slug}>
                {canOpen ? (
                  <Link
                    href={lessonPathFn(modulo.slug, aula.slug)}
                    className={cn(
                      "flex items-center gap-4 rounded-2 border bg-surface px-4 py-3.5 transition-colors hover:border-terracotta hover:bg-terracotta-soft/30",
                      done ? "border-sage" : "border-border",
                    )}
                  >
                    <LessonRow
                      index={i + 1}
                      title={aula.title}
                      duration={aula.duration}
                      done={done}
                      available
                    />
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex items-center gap-4 rounded-2 border border-border bg-surface-soft/50 px-4 py-3.5 opacity-70",
                    )}
                  >
                    <LessonRow
                      index={i + 1}
                      title={aula.title}
                      duration={aula.duration}
                      done={false}
                      available={false}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

function LessonRow({
  index,
  title,
  duration,
  done,
  available,
}: {
  index: number;
  title: string;
  duration: string;
  done: boolean;
  available: boolean;
}) {
  return (
    <>
      <span
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-xs font-semibold",
          done
            ? "bg-sage text-white"
            : "border border-border bg-surface-warm text-ink-muted",
        )}
      >
        {done ? "✓" : String(index).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink">{title}</p>
        <p className="text-xs text-ink-subtle">
          {duration}
          {!available && " · Em breve"}
        </p>
      </div>
      {available && (
        <span className="shrink-0 text-sm font-semibold text-terracotta">
          Abrir →
        </span>
      )}
    </>
  );
}
