import type { ModuleState } from "@/components/trilhas/ModuleCard";
import { calculo1LessonId, calculo1Modulos } from "@/data/calculo-1";
import { isLessonAccessible } from "@/lib/aulas";
import { lessonId, preCalculoModulos } from "@/data/pre-calculo";

let knownLessonIds: Set<string> | null = null;

export function getKnownLessonIds(): Set<string> {
  if (!knownLessonIds) {
    knownLessonIds = new Set<string>();
    for (const modulo of preCalculoModulos) {
      for (const lesson of modulo.lessons) {
        knownLessonIds.add(lessonId(modulo.slug, lesson.slug));
      }
    }
    for (const modulo of calculo1Modulos) {
      for (const lesson of modulo.lessons) {
        knownLessonIds.add(calculo1LessonId(modulo.slug, lesson.slug));
      }
    }
  }
  return knownLessonIds;
}

export function normalizeLessonIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const known = getKnownLessonIds();
  const unique: string[] = [];
  for (const item of raw) {
    if (typeof item !== "string" || !known.has(item)) continue;
    if (!unique.includes(item)) unique.push(item);
  }
  return unique;
}

export function normalizeExerciseIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const unique: string[] = [];
  for (const item of raw) {
    if (typeof item !== "string" || item.length === 0) continue;
    if (!unique.includes(item)) unique.push(item);
  }
  return unique;
}

export function countValidLessonsCompleted(completedLessons: string[]): number {
  return normalizeLessonIds(completedLessons).length;
}

export function computeCombinedTrilhaPercent(completedLessons: string[]): number {
  const valid = new Set(normalizeLessonIds(completedLessons));
  const total =
    preCalculoModulos.reduce((s, m) => s + m.lessons.length, 0) +
    calculo1Modulos.reduce((s, m) => s + m.lessons.length, 0);
  if (total === 0) return 0;
  return Math.round((valid.size / total) * 100);
}

/** Aulas com conteúdo publicado (denominador motivador para o aluno). */
export function countPublishedLessons(): number {
  let n = 0;
  for (const modulo of preCalculoModulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      if (isLessonAccessible("pre-calculo", modulo.slug, lesson)) n++;
    }
  }
  for (const modulo of calculo1Modulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      if (isLessonAccessible("calculo-1", modulo.slug, lesson)) n++;
    }
  }
  return n;
}

export function countPublishedLessonsCompleted(
  completedLessons: string[],
): number {
  const valid = new Set(normalizeLessonIds(completedLessons));
  let n = 0;
  for (const modulo of preCalculoModulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = lessonId(modulo.slug, lesson.slug);
      if (
        valid.has(id) &&
        isLessonAccessible("pre-calculo", modulo.slug, lesson)
      ) {
        n++;
      }
    }
  }
  for (const modulo of calculo1Modulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = calculo1LessonId(modulo.slug, lesson.slug);
      if (
        valid.has(id) &&
        isLessonAccessible("calculo-1", modulo.slug, lesson)
      ) {
        n++;
      }
    }
  }
  return n;
}

export function computePublishedTrilhaPercent(
  completedLessons: string[],
): number {
  const total = countPublishedLessons();
  if (total === 0) return 0;
  return Math.round(
    (countPublishedLessonsCompleted(completedLessons) / total) * 100,
  );
}

export function moduleStateTag(state: ModuleState): {
  tone: "sage" | "terracotta" | "sky" | "muted";
  text: string;
} {
  switch (state) {
    case "done":
      return { tone: "sage", text: "✓ Concluído" };
    case "current":
      return { tone: "terracotta", text: "● Em curso" };
    case "locked":
      return { tone: "muted", text: "🔒 Em breve" };
    default:
      return { tone: "sky", text: "Disponível" };
  }
}

export function dispatchProgressUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("ccs-progress-update"));
}
