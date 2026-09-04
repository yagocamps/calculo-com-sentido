"use client";

import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackCcsEvent } from "@/lib/analytics";

export function LessonAnalytics({ lessonPathId }: { lessonPathId: string }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") !== "level-test") return;

    trackCcsEvent(
      ANALYTICS_EVENTS.firstLessonOpened,
      { lessonPathId, source: "level_test" },
      lessonPathId,
    );
  }, [lessonPathId]);

  return null;
}
