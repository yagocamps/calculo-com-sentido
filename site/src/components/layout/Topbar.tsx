"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { NavIcon } from "@/components/layout/icons";

export function Topbar({
  crumbs,
  right,
  onMenuClick,
}: {
  crumbs: string[];
  right?: React.ReactNode;
  onMenuClick?: () => void;
}) {
  const [studyMinutes, setStudyMinutes] = useState(0);

  // Active session study timer
  useEffect(() => {
    if (typeof window === "undefined") return;

    let startTimeStr = sessionStorage.getItem("ccs-study-start");
    if (!startTimeStr) {
      startTimeStr = Date.now().toString();
      sessionStorage.setItem("ccs-study-start", startTimeStr);
    }
    const startTime = parseInt(startTimeStr, 10);

    const updateTimer = () => {
      const elapsedMs = Date.now() - startTime;
      const elapsedMinutes = Math.floor(elapsedMs / 60000);
      setStudyMinutes(Math.max(0, elapsedMinutes));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg px-4 md:px-7">
      {onMenuClick && (
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-warm md:hidden cursor-pointer"
        >
          <NavIcon name="menu" />
        </button>
      )}

      <nav className="flex items-center gap-1.5 text-[12px] md:text-[13px] text-ink-muted min-w-0" aria-label="Trilha">
        {crumbs.map((crumb, i) => (
          <span key={`${crumb}-${i}`} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <span className="text-ink-subtle shrink-0">›</span>}
            <span
              className={
                i === crumbs.length - 1
                  ? "font-semibold text-ink truncate"
                  : "truncate hidden sm:inline"
              }
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2.5 shrink-0">
        {right}
        <ThemeToggle />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-warm px-2 py-0.5 md:px-2.5 md:py-1 text-[11px] md:text-xs font-medium text-ink-muted select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" aria-hidden />
          Sessão · {studyMinutes} min
        </span>
        <span
          className="grid h-[28px] w-[28px] md:h-[30px] md:w-[30px] place-items-center rounded-full border border-border bg-sage-soft font-serif text-[12px] md:text-[13px] font-semibold text-sage-ink cursor-default"
          title="Estudante (Sessão Local)"
          aria-hidden
        >
          E
        </span>
      </div>
    </header>
  );
}
