"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { getProgress } from "@/lib/progress";
import { buildProgressDashboard, type ProgressDashboard } from "@/lib/progress-dashboard";
import { NextStudyStep } from "@/components/progresso/NextStudyStep";

export function StudyWelcome({ children }: { children: ReactNode }) {
  const [dash, setDash] = useState<ProgressDashboard | null>(null);
  useEffect(() => {
    const update = () => {
      const progress = buildProgressDashboard(getProgress());
      setDash(progress.lessonsCompleted || progress.exercisesCompleted || progress.attemptsTotal || progress.savedAssessmentCount || progress.testeNivel ? progress : null);
    };
    update();
    window.addEventListener("ccs-progress-update", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("ccs-progress-update", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  if (!dash) return children;
  return <section className="space-y-5">
    <div><p className="text-sm font-semibold text-terracotta">Cálculo com Sentido</p>
      <h1 className="mt-2 font-serif text-4xl font-medium">Vamos continuar seus estudos</h1>
      <p className="mt-2 text-ink-muted">Uma etapa de cada vez, com espaço para praticar e revisar.</p>
    </div>
    <NextStudyStep dash={dash} />
    <div className="flex flex-wrap gap-3 text-sm">
      {dash.reviewDueCount > 0 && <Link href="/progresso#revisar-hoje" className="rounded-xl border border-border bg-surface px-4 py-3 font-semibold">Revisar hoje · {dash.reviewDueCount}</Link>}
      <Link href="/progresso" className="rounded-xl border border-border bg-surface px-4 py-3 font-semibold">Meu progresso e anotações</Link>
      <Link href="#trilhas" className="px-4 py-3 underline">Explorar trilhas</Link>
    </div>
  </section>;
}
