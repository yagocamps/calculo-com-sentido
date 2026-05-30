import {
  calculo1LessonId,
  calculo1LessonPath,
  calculo1ModuloPath,
  calculo1Modulos,
} from "@/data/calculo-1";
import { exercicios } from "@/data/exercicios";
import {
  lessonId,
  lessonPath,
  moduloPath,
  preCalculoModulos,
} from "@/data/pre-calculo";
import type { ProgressState, TesteNivelStored } from "@/lib/progress";
import { isLessonAccessible } from "@/lib/aulas";
import { isDue, type ReviewMap } from "@/lib/review";
import {
  computeCombinedTrilhaPercent,
  computePublishedTrilhaPercent,
  countPublishedLessons,
  countPublishedLessonsCompleted,
  countValidLessonsCompleted,
  normalizeLessonIds,
} from "@/lib/progress-utils";
import {
  computeCalculo1TrilhaProgress,
  computeModuleProgress,
  computeTrilhaProgress,
  resolveModuleState,
} from "@/lib/trilhas";

export type NextLessonInfo = {
  title: string;
  href: string;
  moduleTitle: string;
  moduleSlug: string;
  moduleHref: string;
  trilha: string;
};

export type ReviewQueueItem = {
  id: string;
  title: string;
  href: string;
  trilha: string;
  moduleTitle: string;
  box: number;
  isNew: boolean;
};

export type ProgressDashboard = {
  trilhaPreCalculoPercent: number;
  trilhaCalculo1Percent: number;
  trilhaCombinedPercent: number;
  publishedLessonsTotal: number;
  publishedLessonsCompleted: number;
  publishedPercent: number;
  reviewQueue: ReviewQueueItem[];
  reviewDueCount: number;
  reviewTotal: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  exercisesCompleted: number;
  exercisesTotal: number;
  nextLesson: NextLessonInfo | null;
  recommendedModule: {
    title: string;
    href: string;
    progress: number;
    reason: string;
    trilha: string;
  } | null;
  strengths: string[];
  toReview: { title: string; href: string; moduleTitle: string }[];
  completedLessons: {
    title: string;
    href: string;
    moduleTitle: string;
    trilha: string;
    completedAt?: string;
  }[];
  modules: {
    key: string;
    trilha: string;
    slug: string;
    title: string;
    progress: number;
    state: string;
    href: string;
    lessonsDone: number;
    lessonsTotal: number;
  }[];
  testeNivel?: TesteNivelStored;
};

function findNextInTrilha(
  trilha: "pre-calculo" | "calculo-1",
  completedLessons: string[],
): NextLessonInfo | null {
  const modulos =
    trilha === "pre-calculo" ? preCalculoModulos : calculo1Modulos;
  const idFn = trilha === "pre-calculo" ? lessonId : calculo1LessonId;
  const pathFn =
    trilha === "pre-calculo" ? lessonPath : calculo1LessonPath;
  const trilhaLabel = trilha === "pre-calculo" ? "Pré-Cálculo" : "Cálculo 1";

  for (const modulo of modulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = idFn(modulo.slug, lesson.slug);
      if (completedLessons.includes(id)) continue;
      if (isLessonAccessible(trilha, modulo.slug, lesson)) {
        return {
          title: lesson.title,
          href: pathFn(modulo.slug, lesson.slug),
          moduleTitle: modulo.title,
          moduleSlug: modulo.slug,
          moduleHref:
            trilha === "pre-calculo"
              ? moduloPath(modulo.slug)
              : calculo1ModuloPath(modulo.slug),
          trilha: trilhaLabel,
        };
      }
    }
  }
  return null;
}

export function getNextLessonInfo(
  completedLessons: string[],
): NextLessonInfo | null {
  return (
    findNextInTrilha("pre-calculo", completedLessons) ??
    findNextInTrilha("calculo-1", completedLessons)
  );
}

function getRecommendedModule(
  completedLessons: string[],
): ProgressDashboard["recommendedModule"] {
  const next = getNextLessonInfo(completedLessons);
  if (!next) return null;

  const idFn =
    next.trilha === "Pré-Cálculo" ? lessonId : calculo1LessonId;
  const modulos =
    next.trilha === "Pré-Cálculo" ? preCalculoModulos : calculo1Modulos;
  const modulo = modulos.find((m) => m.slug === next.moduleSlug);
  if (!modulo) return null;

  const progress = computeModuleProgress(modulo, completedLessons, idFn);
  return {
    title: modulo.title,
    href: next.moduleHref,
    progress,
    reason:
      progress > 0 ? "Continue de onde parou" : "Próxima aula disponível",
    trilha: next.trilha,
  };
}

function getStrengths(completedLessons: string[]): string[] {
  const strengths: string[] = [];
  for (const modulo of preCalculoModulos) {
    const p = computeModuleProgress(modulo, completedLessons);
    if (p >= 100) strengths.push(`Pré-Cálculo · ${modulo.title}`);
    else if (p >= 25) strengths.push(`Pré-Cálculo · ${modulo.title} (${p}%)`);
  }
  for (const modulo of calculo1Modulos) {
    const p = computeModuleProgress(
      modulo,
      completedLessons,
      calculo1LessonId,
    );
    if (p >= 100) strengths.push(`Cálculo 1 · ${modulo.title}`);
    else if (p >= 25) strengths.push(`Cálculo 1 · ${modulo.title} (${p}%)`);
  }
  if (strengths.length === 0 && completedLessons.length > 0) {
    strengths.push("Primeiras aulas concluídas — bom começo!");
  }
  return strengths.slice(0, 6);
}

function getToReview(
  completedLessons: string[],
  limit = 5,
): ProgressDashboard["toReview"] {
  const items: ProgressDashboard["toReview"] = [];

  for (const modulo of preCalculoModulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = lessonId(modulo.slug, lesson.slug);
      if (completedLessons.includes(id)) continue;
      if (!isLessonAccessible("pre-calculo", modulo.slug, lesson)) {
        continue;
      }
      items.push({
        title: lesson.title,
        href: lessonPath(modulo.slug, lesson.slug),
        moduleTitle: `Pré-Cálculo · ${modulo.shortTitle}`,
      });
      if (items.length >= limit) return items;
    }
  }

  for (const modulo of calculo1Modulos) {
    if (modulo.defaultState === "locked") continue;
    for (const lesson of modulo.lessons) {
      const id = calculo1LessonId(modulo.slug, lesson.slug);
      if (completedLessons.includes(id)) continue;
      if (!isLessonAccessible("calculo-1", modulo.slug, lesson)) {
        continue;
      }
      items.push({
        title: lesson.title,
        href: calculo1LessonPath(modulo.slug, lesson.slug),
        moduleTitle: `Cálculo 1 · ${modulo.shortTitle}`,
      });
      if (items.length >= limit) return items;
    }
  }

  return items;
}

function getCompletedLessonsList(
  completedLessons: string[],
): ProgressDashboard["completedLessons"] {
  const list: ProgressDashboard["completedLessons"] = [];

  for (const modulo of preCalculoModulos) {
    for (const lesson of modulo.lessons) {
      const id = lessonId(modulo.slug, lesson.slug);
      if (completedLessons.includes(id)) {
        list.push({
          title: lesson.title,
          href: lessonPath(modulo.slug, lesson.slug),
          moduleTitle: modulo.shortTitle,
          trilha: "Pré-Cálculo",
        });
      }
    }
  }

  for (const modulo of calculo1Modulos) {
    for (const lesson of modulo.lessons) {
      const id = calculo1LessonId(modulo.slug, lesson.slug);
      if (completedLessons.includes(id)) {
        list.push({
          title: lesson.title,
          href: calculo1LessonPath(modulo.slug, lesson.slug),
          moduleTitle: modulo.shortTitle,
          trilha: "Cálculo 1",
        });
      }
    }
  }

  return list.reverse();
}

type LessonMeta = {
  title: string;
  href: string;
  trilha: string;
  moduleTitle: string;
};

let lessonMetaCache: Map<string, LessonMeta> | null = null;

function getLessonMetaById(): Map<string, LessonMeta> {
  if (lessonMetaCache) return lessonMetaCache;
  const m = new Map<string, LessonMeta>();
  for (const modulo of preCalculoModulos) {
    for (const lesson of modulo.lessons) {
      m.set(lessonId(modulo.slug, lesson.slug), {
        title: lesson.title,
        href: lessonPath(modulo.slug, lesson.slug),
        trilha: "Pré-Cálculo",
        moduleTitle: modulo.shortTitle,
      });
    }
  }
  for (const modulo of calculo1Modulos) {
    for (const lesson of modulo.lessons) {
      m.set(calculo1LessonId(modulo.slug, lesson.slug), {
        title: lesson.title,
        href: calculo1LessonPath(modulo.slug, lesson.slug),
        trilha: "Cálculo 1",
        moduleTitle: modulo.shortTitle,
      });
    }
  }
  lessonMetaCache = m;
  return m;
}

function getReviewQueue(
  completedLessons: string[],
  reviews: ReviewMap,
  limit = 20,
): { due: ReviewQueueItem[]; dueCount: number; total: number } {
  const meta = getLessonMetaById();
  const now = new Date();
  const due: ReviewQueueItem[] = [];
  let total = 0;

  for (const id of completedLessons) {
    const lm = meta.get(id);
    if (!lm) continue;
    total += 1;
    const item = reviews[id];
    if (isDue(item, now)) {
      due.push({
        id,
        title: lm.title,
        href: lm.href,
        trilha: lm.trilha,
        moduleTitle: lm.moduleTitle,
        box: item?.box ?? 0,
        isNew: !item,
      });
    }
  }

  due.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.box - b.box);
  return { due: due.slice(0, limit), dueCount: due.length, total };
}

export function buildProgressDashboard(
  state: ProgressState,
): ProgressDashboard {
  const { completedExercises = [], testeNivel } = state;
  const completedLessons = normalizeLessonIds(state.completedLessons);
  const trilhaPreCalculoPercent = computeTrilhaProgress(completedLessons);
  const trilhaCalculo1Percent = computeCalculo1TrilhaProgress(completedLessons);
  const trilhaCombinedPercent = computeCombinedTrilhaPercent(completedLessons);
  const review = getReviewQueue(completedLessons, state.reviews ?? {});
  const lessonsTotal =
    preCalculoModulos.reduce((s, m) => s + m.lessons.length, 0) +
    calculo1Modulos.reduce((s, m) => s + m.lessons.length, 0);

  const preModules = preCalculoModulos.map((modulo) => ({
    key: `pre-${modulo.slug}`,
    trilha: "Pré-Cálculo",
    slug: modulo.slug,
    title: modulo.title,
    progress: computeModuleProgress(modulo, completedLessons),
    state: resolveModuleState(modulo, completedLessons),
    href: moduloPath(modulo.slug),
    lessonsDone: modulo.lessons.filter((l) =>
      completedLessons.includes(lessonId(modulo.slug, l.slug)),
    ).length,
    lessonsTotal: modulo.lessons.length,
  }));

  const calcModules = calculo1Modulos.map((modulo) => ({
    key: `calc-${modulo.slug}`,
    trilha: "Cálculo 1",
    slug: modulo.slug,
    title: modulo.title,
    progress: computeModuleProgress(
      modulo,
      completedLessons,
      calculo1LessonId,
    ),
    state: resolveModuleState(modulo, completedLessons, calculo1LessonId),
    href: calculo1ModuloPath(modulo.slug),
    lessonsDone: modulo.lessons.filter((l) =>
      completedLessons.includes(calculo1LessonId(modulo.slug, l.slug)),
    ).length,
    lessonsTotal: modulo.lessons.length,
  }));

  return {
    trilhaPreCalculoPercent,
    trilhaCalculo1Percent,
    trilhaCombinedPercent,
    publishedLessonsTotal: countPublishedLessons(),
    publishedLessonsCompleted: countPublishedLessonsCompleted(completedLessons),
    publishedPercent: computePublishedTrilhaPercent(completedLessons),
    reviewQueue: review.due,
    reviewDueCount: review.dueCount,
    reviewTotal: review.total,
    lessonsCompleted: countValidLessonsCompleted(completedLessons),
    lessonsTotal,
    exercisesCompleted: completedExercises.length,
    exercisesTotal: exercicios.length,
    nextLesson: getNextLessonInfo(completedLessons),
    recommendedModule: getRecommendedModule(completedLessons),
    strengths: getStrengths(completedLessons),
    toReview: getToReview(completedLessons),
    completedLessons: getCompletedLessonsList(completedLessons),
    modules: [...preModules, ...calcModules],
    testeNivel,
  };
}
