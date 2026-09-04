"use client";

import { track } from "@vercel/analytics";

export const ANALYTICS_EVENTS = {
  levelTestStarted: "level_test_started",
  levelTestCompleted: "level_test_completed",
  firstLessonOpened: "first_lesson_opened",
  firstLessonCompleted: "first_lesson_completed",
} as const;

type EventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
type EventProperties = Record<string, string | number | boolean>;

const sessionKeys = new Set<string>();
const sessionStoragePrefix = "ccs-analytics:";

/**
 * Registra os eventos do funil sem enviar dados pessoais.
 * A deduplicação por sessão evita contar duas vezes por re-render ou refresh, sem
 * armazenar identidade ou dados pessoais.
 */
export function trackCcsEvent(
  name: EventName,
  properties?: EventProperties,
  dedupeKey?: string,
) {
  if (typeof window === "undefined") return;

  const key = dedupeKey ? `${name}:${dedupeKey}` : name;
  if (sessionKeys.has(key)) return;
  try {
    if (window.sessionStorage.getItem(sessionStoragePrefix + key)) return;
    window.sessionStorage.setItem(sessionStoragePrefix + key, "1");
  } catch {
    // Analytics não pode interromper o fluxo pedagógico se o storage estiver bloqueado.
  }
  sessionKeys.add(key);

  void track(name, properties);
}
