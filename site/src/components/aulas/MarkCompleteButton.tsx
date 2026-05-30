"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  isLessonComplete,
  markLessonComplete,
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
      <span className="inline-flex items-center rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-ink">
        ✓ Concluída
      </span>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        markLessonComplete(lessonPathId);
        setDone(true);
      }}
    >
      Marcar como concluída
    </Button>
  );
}
