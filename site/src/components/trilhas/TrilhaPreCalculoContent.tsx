"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { TrilhaPage } from "@/components/trilhas/TrilhaPage";
import type { TrilhaModulo } from "@/data/trilhas";
import { preCalculoModulos, preCalculoTrilha } from "@/data/pre-calculo";
import { getProgress } from "@/lib/progress";
import {
  computeTrilhaProgress,
  getPreCalculoModulesWithProgress,
} from "@/lib/trilhas";

function initialModules(): TrilhaModulo[] {
  return preCalculoModulos.map((m) => ({
    slug: m.slug,
    n: m.n,
    title: m.title,
    desc: m.desc,
    state: m.defaultState === "locked" ? "locked" : "open",
    lessons: m.lessons.length,
    progress: 0,
    apps: m.apps,
    href: `/pre-calculo/${m.slug}`,
  }));
}

export function TrilhaPreCalculoContent() {
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<TrilhaModulo[]>(initialModules);

  useEffect(() => {
    const refresh = () => {
      const { completedLessons } = getProgress();
      setModules(getPreCalculoModulesWithProgress());
      setProgress(computeTrilhaProgress(completedLessons));
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
    <PageShell crumbs={["Início", "Pré-Cálculo"]}>
      <TrilhaPage
        eyebrow={preCalculoTrilha.eyebrow}
        title={preCalculoTrilha.title}
        description={preCalculoTrilha.description}
        stats={preCalculoTrilha.stats}
        progress={progress}
        progressLabel="SEU PROGRESSO"
        modules={modules}
      />
    </PageShell>
  );
}
