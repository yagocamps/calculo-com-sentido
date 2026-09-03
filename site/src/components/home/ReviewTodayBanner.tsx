"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buildProgressDashboard } from "@/lib/progress-dashboard";
import { getProgress } from "@/lib/progress";

/**
 * Card "Para hoje" na home: transforma a revisão espaçada (que vivia só em
 * /progresso) em hábito visível. Só aparece quando há aulas vencendo.
 */
export function ReviewTodayBanner() {
  const [due, setDue] = useState(0);

  useEffect(() => {
    const dash = buildProgressDashboard(getProgress());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura do progresso (localStorage) client-only
    setDue(dash.reviewDueCount);
  }, []);

  if (due === 0) return null;

  return (
    <Link
      href="/progresso"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2 border border-sage bg-sage-soft/60 px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-sm text-sage-ink">
        <span className="font-bold">Para hoje:</span> revisar {due}{" "}
        {due === 1 ? "conceito" : "conceitos"} (~5 min). Revisão espaçada é o
        que faz o conteúdo ficar.
      </p>
      <span className="text-sm font-semibold text-sage-ink">Revisar agora →</span>
    </Link>
  );
}
