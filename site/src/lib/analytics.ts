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

type LevelTestAttribution = {
  lessonId: string;
  recommendationBand: string;
  createdAt: number;
  expiresAt: number;
  openedAt?: number;
  completedAt?: number;
};

const sessionKeys = new Set<string>();
const sessionStoragePrefix = "ccs-analytics:";
const attributionStorageKey = "ccs-level-test-attribution";
const attributionWindowMs = 7 * 24 * 60 * 60 * 1000;

function normalizeLessonId(path: string) {
  return path.split("?")[0].split("#")[0].replace(/^\/+|\/+$/g, "");
}

function writeAttribution(attribution: LevelTestAttribution) {
  try {
    window.localStorage.setItem(
      attributionStorageKey,
      JSON.stringify(attribution),
    );
  } catch {
    // A medição nunca deve bloquear a experiência se o storage estiver indisponível.
  }
}

function readAttribution(): LevelTestAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(attributionStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LevelTestAttribution>;
    if (
      typeof parsed.lessonId !== "string" ||
      typeof parsed.recommendationBand !== "string" ||
      typeof parsed.createdAt !== "number" ||
      typeof parsed.expiresAt !== "number"
    ) {
      window.localStorage.removeItem(attributionStorageKey);
      return null;
    }
    if (Date.now() > parsed.expiresAt) {
      window.localStorage.removeItem(attributionStorageKey);
      return null;
    }
    return parsed as LevelTestAttribution;
  } catch {
    return null;
  }
}

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

/** Inicia uma janela anônima de atribuição quando o teste é concluído. */
export function saveLevelTestAttribution(
  firstLessonHref: string,
  recommendationBand: string,
  completedAt?: string,
) {
  if (typeof window === "undefined") return;
  const parsedCompletedAt = completedAt ? Date.parse(completedAt) : Number.NaN;
  const createdAt = Number.isFinite(parsedCompletedAt)
    ? parsedCompletedAt
    : Date.now();
  writeAttribution({
    lessonId: normalizeLessonId(firstLessonHref),
    recommendationBand,
    createdAt,
    expiresAt: createdAt + attributionWindowMs,
  });
}

/** Registra a abertura da aula recomendada, inclusive após fechar e reabrir o site. */
export function trackAttributedFirstLessonOpened(
  lessonPathId: string,
  fallbackBand?: string | null,
) {
  if (typeof window === "undefined") return;
  let attribution = readAttribution();

  // Compatibilidade com links já emitidos antes da persistência por sete dias.
  if (!attribution && fallbackBand) {
    saveLevelTestAttribution(lessonPathId, fallbackBand);
    attribution = readAttribution();
  }
  if (
    !attribution ||
    attribution.lessonId !== normalizeLessonId(lessonPathId) ||
    attribution.openedAt
  ) {
    return;
  }

  attribution.openedAt = Date.now();
  writeAttribution(attribution);
  trackCcsEvent(
    ANALYTICS_EVENTS.firstLessonOpened,
    {
      lesson_id: attribution.lessonId,
      recommendation_band: attribution.recommendationBand,
      source: "level_test",
      attribution_window_days: 7,
    },
    `${attribution.lessonId}:${attribution.createdAt}`,
  );
}

/** Registra uma única conclusão da primeira aula dentro da janela de sete dias. */
export function trackAttributedFirstLessonCompleted(lessonPathId: string) {
  const attribution = readAttribution();
  if (
    !attribution ||
    attribution.lessonId !== normalizeLessonId(lessonPathId) ||
    attribution.completedAt
  ) {
    return;
  }

  attribution.completedAt = Date.now();
  writeAttribution(attribution);
  trackCcsEvent(
    ANALYTICS_EVENTS.firstLessonCompleted,
    {
      lesson_id: attribution.lessonId,
      recommendation_band: attribution.recommendationBand,
      source: "level_test",
      attribution_window_days: 7,
      hours_since_test: Math.max(
        0,
        Math.round((attribution.completedAt - attribution.createdAt) / 3_600_000),
      ),
    },
    `${attribution.lessonId}:${attribution.createdAt}`,
  );
}
