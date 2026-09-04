"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ANALYTICS_EVENTS, trackCcsEvent } from "@/lib/analytics";
import { burstConfetti } from "@/lib/confetti";
import {
  isLessonComplete,
  markLessonComplete,
  unmarkLessonComplete,
} from "@/lib/progress";

export function MarkCompleteButton({ lessonPathId }: { lessonPathId: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const sync = () => setDone(isLessonComplete(lessonPathId));
    sync();
    window.addEventListener("ccs-progress-update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ccs-progress-update", sync);
      window.removeEventListener("storage", sync);
    };
  }, [lessonPathId]);

  if (done) {
    return (
      <button
        type="button"
        title="Clique para desmarcar como concluída"
        aria-label="Concluída — clique para desmarcar"
        onClick={() => {
          unmarkLessonComplete(lessonPathId);
          setDone(false);
        }}
        className="group inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-ink transition-colors hover:bg-sage/25"
      >
        ✓ Concluída
        <span className="hidden text-sage-ink/70 group-hover:inline">↺ desmarcar</span>
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={(e) => {
        markLessonComplete(lessonPathId);
        if (new URLSearchParams(window.location.search).get("from") === "level-test") {
          trackCcsEvent(
            ANALYTICS_EVENTS.firstLessonCompleted,
            {
              lesson_id: lessonPathId,
              recommendation_band:
                new URLSearchParams(window.location.search).get("band") ?? "unknown",
              source: "level_test",
            },
            lessonPathId,
          );
        }
        setDone(true);
        const r = (
          e?.currentTarget as HTMLElement | undefined
        )?.getBoundingClientRect();
        if (r) burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
      }}
    >
      Marcar como concluída
    </Button>
  );
}
