"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getProgress } from "@/lib/progress";
import {
  getNextLessonInfo,
  type NextLessonInfo,
} from "@/lib/progress-dashboard";

/**
 * CTAs do hero. Dois caminhos apenas (público ansioso decide mal entre 4
 * botões). Quando já existe progresso no navegador, o CTA primário vira
 * "Continuar de onde parei" — zero decisão na volta ao site.
 */
export function HeroCtas() {
  const [resume, setResume] = useState<NextLessonInfo | null>(null);

  useEffect(() => {
    const p = getProgress();
    if (p.completedLessons.length === 0) return;
    const info = getNextLessonInfo(p.completedLessons);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura do progresso (localStorage) client-only
    if (info) setResume(info);
  }, []);

  if (resume) {
    return (
      <div className="relative mt-5">
        <div className="flex flex-wrap gap-2.5">
          <Button href={resume.href} size="lg">
            Continuar de onde parei: {resume.title} →
          </Button>
          <Button href="#trilhas" variant="ghost" size="lg">
            Ver trilhas
          </Button>
        </div>
        <p className="mt-2 text-[13px] text-ink-muted">
          {resume.trilha} · {resume.moduleTitle}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-5 flex flex-wrap gap-2.5">
      <Button href="/teste-de-nivel" size="lg">
        Fazer teste e encontrar minha primeira aula (10–15 min) →
      </Button>
      <Button href="#trilhas" variant="ghost" size="lg">
        Prefiro escolher uma trilha → ver trilhas
      </Button>
    </div>
  );
}
