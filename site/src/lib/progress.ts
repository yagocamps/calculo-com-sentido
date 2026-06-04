import {
  calculo1LessonId,
  calculo1Modulos,
} from "@/data/calculo-1";
import { isLessonAccessible } from "@/lib/aulas";
import { lessonId, preCalculoModulos } from "@/data/pre-calculo";
import {
  computeCombinedTrilhaPercent,
  dispatchProgressUpdate,
  normalizeExerciseIds,
  normalizeLessonIds,
} from "@/lib/progress-utils";
import {
  applyReview,
  normalizeReviews,
  seedReview,
  type ReviewMap,
  type ReviewResult,
} from "@/lib/review";

const STORAGE_KEY = "ccs-progress";

function computeNextLessonTitle(completedLessons: string[]): string {
  const normalized = normalizeLessonIds(completedLessons);
  for (const modulo of preCalculoModulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = lessonId(modulo.slug, lesson.slug);
      if (!normalized.includes(id)) {
        if (isLessonAccessible("pre-calculo", modulo.slug, lesson)) {
          return lesson.title;
        }
      }
    }
  }
  for (const modulo of calculo1Modulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = calculo1LessonId(modulo.slug, lesson.slug);
      if (!normalized.includes(id)) {
        if (isLessonAccessible("calculo-1", modulo.slug, lesson)) {
          return lesson.title;
        }
      }
    }
  }
  return "Trilha concluída";
}

export type TesteNivelStored = {
  scorePercent: number;
  levelLabel: string;
  band: "base" | "pre-calculo" | "calculo-1";
  completedAt: string;
};

export type ProgressState = {
  percent: number;
  nextLesson: string;
  completedLessons: string[];
  completedExercises: string[];
  reviews: ReviewMap;
  testeNivel?: TesteNivelStored;
};

const defaultProgress: ProgressState = {
  percent: 0,
  nextLesson: "Função afim",
  completedLessons: [],
  completedExercises: [],
  reviews: {},
};

function persistProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota exceeded or private mode */
  }
}

export function syncDerivedFields() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const completedLessons = normalizeLessonIds(parsed.completedLessons);
    const completedExercises = normalizeExerciseIds(parsed.completedExercises);
    const reviews = normalizeReviews(parsed.reviews);

    const percent = computeCombinedTrilhaPercent(completedLessons);
    const nextTitle = computeNextLessonTitle(completedLessons);

    if (
      parsed.percent !== percent ||
      parsed.nextLesson !== nextTitle ||
      completedLessons.length !== (parsed.completedLessons?.length ?? 0)
    ) {
      const updated: ProgressState = {
        ...defaultProgress,
        ...parsed,
        completedLessons,
        completedExercises,
        reviews,
        percent,
        nextLesson: nextTitle,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore error
  }
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const completedLessons = normalizeLessonIds(parsed.completedLessons);
    const completedExercises = normalizeExerciseIds(parsed.completedExercises);
    const reviews = normalizeReviews(parsed.reviews);
    return {
      ...defaultProgress,
      ...parsed,
      completedLessons,
      completedExercises,
      reviews,
      percent: computeCombinedTrilhaPercent(completedLessons),
      nextLesson:
        typeof parsed.nextLesson === "string"
          ? parsed.nextLesson
          : computeNextLessonTitle(completedLessons),
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(state: Partial<ProgressState>) {
  if (typeof window === "undefined") return;
  const current = getProgress();
  const merged: ProgressState = {
    ...current,
    ...state,
    completedLessons: state.completedLessons
      ? normalizeLessonIds(state.completedLessons)
      : current.completedLessons,
    completedExercises: state.completedExercises
      ? normalizeExerciseIds(state.completedExercises)
      : current.completedExercises,
    reviews: state.reviews ? normalizeReviews(state.reviews) : current.reviews,
  };
  merged.percent = computeCombinedTrilhaPercent(merged.completedLessons);
  merged.nextLesson = computeNextLessonTitle(merged.completedLessons);
  persistProgress(merged);
  dispatchProgressUpdate();
}

export function markLessonComplete(lessonPathId: string) {
  const current = getProgress();
  const normalized = normalizeLessonIds(current.completedLessons);
  if (normalized.includes(lessonPathId)) return;
  saveProgress({
    completedLessons: [...normalized, lessonPathId],
    reviews: { ...current.reviews, [lessonPathId]: seedReview() },
  });
}

/** Desfaz a conclusão de uma aula (remove também a revisão agendada). */
export function unmarkLessonComplete(lessonPathId: string) {
  const current = getProgress();
  const normalized = normalizeLessonIds(current.completedLessons);
  if (!normalized.includes(lessonPathId)) return;
  const reviews = { ...current.reviews };
  delete reviews[lessonPathId];
  saveProgress({
    completedLessons: normalized.filter((id) => id !== lessonPathId),
    reviews,
  });
}

/** Registra o resultado de uma revisão e reagenda a próxima. */
export function markReviewed(lessonPathId: string, result: ReviewResult) {
  const current = getProgress();
  const updated = applyReview(current.reviews[lessonPathId], result);
  saveProgress({
    reviews: { ...current.reviews, [lessonPathId]: updated },
  });
}

export function markExerciseComplete(exerciseId: string) {
  const current = getProgress();
  const normalized = normalizeExerciseIds(current.completedExercises);
  if (normalized.includes(exerciseId)) return;
  saveProgress({
    completedExercises: [...normalized, exerciseId],
  });
}

export function unmarkExerciseComplete(exerciseId: string) {
  const current = getProgress();
  const normalized = normalizeExerciseIds(current.completedExercises);
  if (!normalized.includes(exerciseId)) return;
  saveProgress({
    completedExercises: normalized.filter((id) => id !== exerciseId),
  });
}

export function isLessonComplete(lessonPathId: string): boolean {
  return getProgress().completedLessons.includes(lessonPathId);
}

export function isExerciseComplete(exerciseId: string): boolean {
  return getProgress().completedExercises.includes(exerciseId);
}

const MAX_IMPORT_BYTES = 500_000;

/** Importa backup JSON com validação (tamanho, schema, normalização). */
export function importProgressFromJson(raw: string): {
  ok: boolean;
  error?: string;
} {
  if (typeof window === "undefined") {
    return { ok: false, error: "Indisponível no servidor." };
  }
  if (raw.length > MAX_IMPORT_BYTES) {
    return { ok: false, error: "Arquivo muito grande (máx. 500 KB)." };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (
      !parsed ||
      (parsed.completedLessons !== undefined &&
        !Array.isArray(parsed.completedLessons)) ||
      (parsed.completedExercises !== undefined &&
        !Array.isArray(parsed.completedExercises)) ||
      (parsed.reviews !== undefined &&
        typeof parsed.reviews !== "object")
    ) {
      return { ok: false, error: "Formato de backup inválido." };
    }
    const completedLessons = normalizeLessonIds(parsed.completedLessons);
    const completedExercises = normalizeExerciseIds(parsed.completedExercises);
    const reviews = normalizeReviews(parsed.reviews);
    saveProgress({
      completedLessons,
      completedExercises,
      reviews,
      testeNivel:
        parsed.testeNivel &&
        typeof parsed.testeNivel.scorePercent === "number"
          ? parsed.testeNivel
          : undefined,
    });
    syncDerivedFields();
    return { ok: true };
  } catch {
    return { ok: false, error: "JSON inválido ou corrompido." };
  }
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  dispatchProgressUpdate();
}
