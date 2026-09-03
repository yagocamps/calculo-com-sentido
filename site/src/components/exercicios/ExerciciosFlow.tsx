"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ExercicioDetail } from "@/components/exercicios/ExercicioDetail";
import { TypeTag } from "@/components/exercicios/TypeTag";
import { PageShell } from "@/components/layout/PageShell";
import { LevelTag } from "@/components/ui/Tag";
import {
  exercicioNiveis,
  exercicioTemas,
  exercicios,
  type ExerciseType,
} from "@/data/exercicios";
import { countByTema, filterExercicios } from "@/lib/exercicios";
import { cn } from "@/lib/utils";

const exercicioTipos: ExerciseType[] = [
  "compreensao",
  "calculo",
  "aplicada",
  "interpretacao",
];

export function ExerciciosFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");
  const paramTema = searchParams.get("tema");
  // Deep-link de uma aula (?id=...): começa no tema do próprio exercício,
  // senão a lista filtrada não conteria o exercício e ele "sumiria".
  // O dashboard de progresso usa ?tema=... ("Refazer exercícios").
  const initialTema =
    (paramId && exercicios.find((e) => e.id === paramId)?.temaSlug) ||
    (paramTema && exercicioTemas.some((t) => t.slug === paramTema)
      ? paramTema
      : "todos");
  const [tema, setTema] = useState(initialTema);
  const [nivel, setNivel] = useState("todos");

  const filtered = useMemo(
    () => filterExercicios(tema, nivel),
    [tema, nivel],
  );

  const activeId =
    paramId && filtered.some((e) => e.id === paramId)
      ? paramId
      : filtered[0]?.id ?? exercicios[0]?.id;

  const active = filtered.find((e) => e.id === activeId);
  const activeIndex = active
    ? filtered.findIndex((e) => e.id === active.id)
    : -1;

  const selectExercicio = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", id);
      router.replace(`/exercicios?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  if (filtered.length === 0 || !active) {
    return (
      <PageShell crumbs={["Início", "Exercícios"]}>
        <div className="mx-auto max-w-lg">
          <h1 className="font-serif text-2xl font-medium">Exercícios</h1>
          <p className="mt-2 text-ink-muted">
            Nenhum exercício com esses filtros. Tente outro tema ou nível.
          </p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-terracotta hover:underline"
            onClick={() => {
              setTema("todos");
              setNivel("todos");
            }}
          >
            Ver todos os exercícios →
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell crumbs={["Início", "Exercícios", active.tema]}>
      <div className="mx-auto grid max-w-[1080px] gap-5 lg:grid-cols-[320px_1fr]">
        <aside>
          <h1 className="font-serif text-2xl font-medium tracking-tight">
            Exercícios aplicados
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Modelo com 9 partes: enunciado, identificar, dica, resolução,
            resposta, interpretação e erro comum.
          </p>

          <div className="mt-3.5">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
              Tema
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exercicioTemas.map((t) => (
                <FilterChip
                  key={t.slug}
                  active={tema === t.slug}
                  onClick={() => {
                    setTema(t.slug);
                    const next = filterExercicios(t.slug, nivel);
                    if (next[0]) selectExercicio(next[0].id);
                  }}
                >
                  {t.label}
                  {t.slug !== "todos" && (
                    <span className="opacity-60">
                      {" "}
                      ({countByTema(t.slug)})
                    </span>
                  )}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
              Nível
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exercicioNiveis.map((n) => (
                <FilterChip
                  key={n.slug}
                  active={nivel === n.slug}
                  onClick={() => {
                    setNivel(n.slug);
                    const next = filterExercicios(tema, n.slug);
                    if (next[0]) selectExercicio(next[0].id);
                  }}
                >
                  {n.label}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
              Tipos de questão
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exercicioTipos.map((t) => (
                <TypeTag key={t} type={t} />
              ))}
            </div>
          </div>

          <ul className="mt-4 max-h-[480px] space-y-1.5 overflow-y-auto pr-1">
            {filtered.map((ex) => (
              <li key={ex.id}>
                <button
                  type="button"
                  onClick={() => selectExercicio(ex.id)}
                  className={cn(
                    "w-full rounded-2 border px-3.5 py-3 text-left transition-colors",
                    ex.id === active.id
                      ? "border-border bg-surface shadow-sm"
                      : "border-transparent hover:border-border hover:bg-surface-soft",
                  )}
                >
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[11px] font-semibold text-ink-subtle">
                      {ex.num}
                    </span>
                    <LevelTag level={ex.level} />
                    <TypeTag type={ex.type} />
                  </div>
                  <div className="truncate text-[13.5px] font-semibold">
                    {ex.title}
                  </div>
                  <div className="text-xs text-ink-muted">{ex.area}</div>
                </button>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="mt-4 text-sm text-ink-muted">
              Nenhum exercício neste filtro.
            </p>
          )}
        </aside>

        <ExercicioDetail
          key={active.id}
          exercicio={active}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < filtered.length - 1}
          onPrev={() => {
            const prev = filtered[activeIndex - 1];
            if (prev) selectExercicio(prev.id);
          }}
          onNext={() => {
            const next = filtered[activeIndex + 1];
            if (next) selectExercicio(next.id);
          }}
          onReset={() => {}}
        />
      </div>
    </PageShell>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
        active
          ? "border-ink bg-ink text-bg"
          : "border-border bg-surface text-ink-muted hover:border-terracotta",
      )}
    >
      {children}
    </button>
  );
}
