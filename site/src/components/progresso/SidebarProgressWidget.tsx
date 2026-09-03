"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buildProgressDashboard } from "@/lib/progress-dashboard";
import { countPublishedLessons } from "@/lib/progress-utils";
import { getProgress } from "@/lib/progress";

export function SidebarProgressWidget() {
  const [percent, setPercent] = useState(0);
  // Com progresso zero, nada de "0/121 publicadas" — soa como site vazio.
  const [trilhaDetail, setTrilhaDetail] = useState(
    `${countPublishedLessons()} aulas disponíveis para você`,
  );
  const [nextLabel, setNextLabel] = useState("Comece por");
  const [reviewDue, setReviewDue] = useState(0);
  const [nextHref, setNextHref] = useState("/pre-calculo/funcoes/funcao-afim");
  const [nextTitle, setNextTitle] = useState("Função afim");

  useEffect(() => {
    const update = () => {
      const dash = buildProgressDashboard(getProgress());
      setPercent(dash.publishedPercent);
      const done = dash.publishedLessonsCompleted;
      setTrilhaDetail(
        done === 0
          ? `${dash.publishedLessonsTotal} aulas disponíveis para você`
          : `Você completou ${done} de ${dash.publishedLessonsTotal} · Pré ${dash.trilhaPreCalculoPercent}% · Calc ${dash.trilhaCalculo1Percent}%`,
      );
      setNextLabel(done === 0 ? "Comece por" : "Próximo");
      setReviewDue(dash.reviewDueCount);
      if (dash.nextLesson) {
        setNextHref(dash.nextLesson.href);
        setNextTitle(dash.nextLesson.title);
      } else {
        setNextTitle("Trilha concluída");
        setNextHref("/progresso");
      }
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("ccs-progress-update", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("ccs-progress-update", update);
    };
  }, []);

  return (
    <div className="mt-auto rounded-xl border border-border bg-surface p-3">
      <div className="flex justify-between text-xs text-ink-muted">
        <span>Seu progresso</span>
        <span className="font-semibold text-ink">{percent}%</span>
      </div>
      <p className="text-[10px] text-ink-subtle">{trilhaDetail}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-warm">
        <div
          className="h-full rounded-full bg-terracotta transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-ink-subtle">
        {nextLabel}:{" "}
        <Link
          href={nextHref}
          className="font-semibold text-ink hover:text-terracotta"
        >
          {nextTitle}
        </Link>
      </p>
      {reviewDue > 0 && (
        <Link
          href="/progresso"
          className="mt-2 flex items-center justify-between rounded-lg bg-sage-soft px-2.5 py-1.5 text-[11px] font-semibold text-sage-ink hover:opacity-90"
        >
          <span>Revisar hoje</span>
          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-sage px-1 text-[10px] text-bg">
            {reviewDue}
          </span>
        </Link>
      )}
    </div>
  );
}
