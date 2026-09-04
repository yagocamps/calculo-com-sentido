"use client";

import { useEffect } from "react";
import { trackAttributedFirstLessonOpened } from "@/lib/analytics";

export function LessonAnalytics({ lessonPathId }: { lessonPathId: string }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    trackAttributedFirstLessonOpened(
      lessonPathId,
      params.get("from") === "level-test" ? params.get("band") : null,
    );
  }, [lessonPathId]);

  return null;
}
