"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { TrilhaPage } from "@/components/trilhas/TrilhaPage";
import { calculo1Trilha } from "@/data/calculo-1";
import type { TrilhaModulo } from "@/data/trilhas";
import { getProgress } from "@/lib/progress";
import {
  computeCalculo1TrilhaProgress,
  getCalculo1ModulesWithProgress,
} from "@/lib/trilhas";

export function TrilhaCalculo1Content() {
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<TrilhaModulo[]>([]);

  useEffect(() => {
    const refresh = () => {
      const { completedLessons } = getProgress();
      setModules(getCalculo1ModulesWithProgress());
      setProgress(computeCalculo1TrilhaProgress(completedLessons));
    };
    refresh();
    window.addEventListener("ccs-progress-update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ccs-progress-update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <PageShell crumbs={["Início", "Cálculo 1"]}>
      <TrilhaPage
        dark
        eyebrow={calculo1Trilha.eyebrow}
        title={calculo1Trilha.title}
        description={calculo1Trilha.description}
        stats={calculo1Trilha.stats}
        progress={progress}
        progressLabel="SEU PROGRESSO"
        modules={modules}
      />
    </PageShell>
  );
}
