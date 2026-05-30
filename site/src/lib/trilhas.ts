import type { ModuleState } from "@/components/trilhas/ModuleCard";
import type { TrilhaModuloData } from "@/data/trilha-module";
import {
  calculo1LessonId,
  calculo1ModuloPath,
  calculo1Modulos,
} from "@/data/calculo-1";
import {
  lessonId,
  preCalculoModulos,
} from "@/data/pre-calculo";
import { getProgress } from "@/lib/progress";

export type LessonIdFn = (moduloSlug: string, aulaSlug: string) => string;

export function computeModuleProgress(
  modulo: TrilhaModuloData,
  completedLessons: string[],
  idFn: LessonIdFn = lessonId,
): number {
  if (modulo.lessons.length === 0) return 0;
  const done = modulo.lessons.filter((l) =>
    completedLessons.includes(idFn(modulo.slug, l.slug)),
  ).length;
  return Math.round((done / modulo.lessons.length) * 100);
}

export function resolveModuleState(
  modulo: TrilhaModuloData,
  completedLessons: string[],
  idFn: LessonIdFn = lessonId,
): ModuleState {
  if (modulo.defaultState === "locked") return "locked";
  const progress = computeModuleProgress(modulo, completedLessons, idFn);
  if (progress >= 100) return "done";
  if (progress > 0) return "current";
  return "open";
}

function computeTrilhaProgressFor(
  modulos: TrilhaModuloData[],
  completedLessons: string[],
  idFn: LessonIdFn,
): number {
  const total = modulos.reduce((s, m) => s + m.lessons.length, 0);
  const done = modulos.reduce(
    (s, m) =>
      s +
      m.lessons.filter((l) =>
        completedLessons.includes(idFn(m.slug, l.slug)),
      ).length,
    0,
  );
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function computeTrilhaProgress(completedLessons: string[]): number {
  return computeTrilhaProgressFor(
    preCalculoModulos,
    completedLessons,
    lessonId,
  );
}

export function computeCalculo1TrilhaProgress(
  completedLessons: string[],
): number {
  return computeTrilhaProgressFor(
    calculo1Modulos,
    completedLessons,
    calculo1LessonId,
  );
}

export function getPreCalculoModulesWithProgress() {
  const { completedLessons } = getProgress();
  return preCalculoModulos.map((modulo) => ({
    slug: modulo.slug,
    n: modulo.n,
    title: modulo.title,
    desc: modulo.desc,
    state: resolveModuleState(modulo, completedLessons),
    lessons: modulo.lessons.length,
    progress: computeModuleProgress(modulo, completedLessons),
    apps: modulo.apps,
    href: `/pre-calculo/${modulo.slug}`,
  }));
}

export function getCalculo1ModulesWithProgress() {
  const { completedLessons } = getProgress();
  return calculo1Modulos.map((modulo) => ({
    slug: modulo.slug,
    n: modulo.n,
    title: modulo.title,
    desc: modulo.desc,
    state: resolveModuleState(modulo, completedLessons, calculo1LessonId),
    lessons: modulo.lessons.length,
    progress: computeModuleProgress(
      modulo,
      completedLessons,
      calculo1LessonId,
    ),
    apps: modulo.apps,
    href: calculo1ModuloPath(modulo.slug),
  }));
}

