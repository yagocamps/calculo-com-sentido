"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ModuloPageContent } from "@/components/trilhas/ModuloPageContent";
import type { TrilhaModuloData } from "@/data/trilha-module";
import type { ModuleState } from "@/components/trilhas/ModuleCard";
import type { GlossarioEntry } from "@/data/glossario";
import { getProgress } from "@/lib/progress";
import {
  computeModuleProgress,
  resolveModuleState,
  type LessonIdFn,
} from "@/lib/trilhas";

export function TrilhaModuloPageClient({
  trilhaSlug,
  trilhaLabel,
  trilhaHref,
  modulo,
  lessonIdFn,
  lessonPathFn,
  flashcards,
}: {
  trilhaSlug: "pre-calculo" | "calculo-1";
  trilhaLabel: string;
  trilhaHref: string;
  modulo: TrilhaModuloData;
  lessonIdFn: LessonIdFn;
  lessonPathFn: (moduloSlug: string, aulaSlug: string) => string;
  flashcards?: GlossarioEntry[];
}) {
  const [progress, setProgress] = useState(0);
  const [moduleState, setModuleState] = useState<ModuleState>("open");
  const [lessonStatuses, setLessonStatuses] = useState<
    { slug: string; done: boolean; available: boolean }[]
  >([]);

  useEffect(() => {
    const refresh = () => {
      const { completedLessons } = getProgress();
      setProgress(computeModuleProgress(modulo, completedLessons, lessonIdFn));
      setModuleState(
        resolveModuleState(modulo, completedLessons, lessonIdFn),
      );
      setLessonStatuses(
        modulo.lessons.map((l) => ({
          slug: l.slug,
          done: completedLessons.includes(lessonIdFn(modulo.slug, l.slug)),
          available: l.available,
        })),
      );
    };
    refresh();
    window.addEventListener("ccs-progress-update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ccs-progress-update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [modulo, lessonIdFn]);

  return (
    <PageShell crumbs={["Início", trilhaLabel, modulo.title]}>
      <ModuloPageContent
        trilhaSlug={trilhaSlug}
        trilhaLabel={trilhaLabel}
        trilhaHref={trilhaHref}
        modulo={modulo}
        progress={progress}
        moduleState={moduleState}
        lessonStatuses={lessonStatuses}
        lessonPathFn={lessonPathFn}
        flashcards={flashcards}
      />
    </PageShell>
  );
}
