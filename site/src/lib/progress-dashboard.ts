import {
  calculo1LessonId,
  calculo1LessonPath,
  calculo1ModuloPath,
  calculo1Modulos,
} from "@/data/calculo-1";
import { exercicios, type ExerciseType } from "@/data/exercicios";
import {
  lessonId,
  lessonPath,
  moduloPath,
  preCalculoModulos,
} from "@/data/pre-calculo";
import { typeLabels } from "@/lib/exercicios";
import {
  localDateISO,
  type ExerciseAttemptsMap,
  type ProgressState,
  type TesteNivelStored,
} from "@/lib/progress";
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

/**
 * Área em que o aluno está errando exercícios, com link direto para a aula
 * que cobre o assunto (ex.: muitos erros de "Interpretação · Função afim"
 * → revisar a aula Função afim).
 */
export type WeakSpot = {
  key: string;
  label: string;
  attempts: number;
  incorrect: number;
  /** Percentual de acerto (0–100) nas tentativas dessa área. */
  accuracy: number;
  lessonTitle: string;
  lessonHref: string;
  exercisesHref: string;
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
  weakSpots: WeakSpot[];
  /** Total de tentativas registradas (acertos + erros) — para mensagens de estado vazio. */
  attemptsTotal: number;
  /** Dias com estudo nos últimos 7 dias — streak suave, só mensagem positiva. */
  studyDaysThisWeek: number;
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

/**
 * Aula (ou módulo) que cobre cada tema de exercício. Temas que são módulos
 * inteiros apontam para a trilha do módulo; temas pontuais (ex.: função
 * afim) apontam para a aula exata.
 */
const temaAulaMap: Record<
  string,
  { trilha: "pre-calculo" | "calculo-1"; modulo: string; aula?: string }
> = {
  fundamentos: { trilha: "pre-calculo", modulo: "fundamentos" },
  algebra: { trilha: "pre-calculo", modulo: "algebra" },
  funcoes: { trilha: "pre-calculo", modulo: "funcoes" },
  "funcao-afim": { trilha: "pre-calculo", modulo: "funcoes", aula: "funcao-afim" },
  "funcao-quadratica": {
    trilha: "pre-calculo",
    modulo: "funcoes",
    aula: "funcao-quadratica",
  },
  graficos: { trilha: "pre-calculo", modulo: "graficos" },
  trigonometria: { trilha: "pre-calculo", modulo: "trigonometria" },
  "preparacao-limites": { trilha: "pre-calculo", modulo: "preparacao-limites" },
  "funcoes-calculo": { trilha: "calculo-1", modulo: "funcoes-para-calculo" },
  limites: { trilha: "calculo-1", modulo: "limites" },
  continuidade: { trilha: "calculo-1", modulo: "continuidade" },
  derivadas: { trilha: "calculo-1", modulo: "derivadas" },
  "aplicacoes-derivadas": { trilha: "calculo-1", modulo: "aplicacoes-derivadas" },
  integrais: { trilha: "calculo-1", modulo: "integrais" },
};

function lessonLinkForTema(
  temaSlug: string,
): { title: string; href: string } | null {
  const map = temaAulaMap[temaSlug];
  if (!map) return null;
  const modulos =
    map.trilha === "pre-calculo" ? preCalculoModulos : calculo1Modulos;
  const modulo = modulos.find((m) => m.slug === map.modulo);
  if (!modulo) return null;
  if (map.aula) {
    const lesson = modulo.lessons.find((l) => l.slug === map.aula);
    if (lesson) {
      return {
        title: lesson.title,
        href:
          map.trilha === "pre-calculo"
            ? lessonPath(modulo.slug, lesson.slug)
            : calculo1LessonPath(modulo.slug, lesson.slug),
      };
    }
  }
  return {
    title: `Módulo ${modulo.title}`,
    href:
      map.trilha === "pre-calculo"
        ? moduloPath(modulo.slug)
        : calculo1ModuloPath(modulo.slug),
  };
}

type AttemptAgg = {
  attempts: number;
  correct: number;
  incorrect: number;
  temaSlug: string;
  temaLabel: string;
  type?: ExerciseType;
};

let exercicioByIdCache: Map<string, (typeof exercicios)[number]> | null = null;

function getExercicioById(id: string) {
  if (!exercicioByIdCache) {
    exercicioByIdCache = new Map(exercicios.map((e) => [e.id, e]));
  }
  return exercicioByIdCache.get(id);
}

/** Agrega tentativas por tema e por célula tema × tipo de questão. */
function aggregateAttempts(attemptsById: ExerciseAttemptsMap): {
  byTema: Map<string, AttemptAgg>;
  byCell: Map<string, AttemptAgg>;
  total: number;
} {
  const byTema = new Map<string, AttemptAgg>();
  const byCell = new Map<string, AttemptAgg>();
  let total = 0;

  for (const [id, stats] of Object.entries(attemptsById)) {
    const ex = getExercicioById(id);
    if (!ex) continue;
    const n = stats.correct + stats.incorrect;
    if (n === 0) continue;
    total += n;

    const tema = byTema.get(ex.temaSlug) ?? {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      temaSlug: ex.temaSlug,
      temaLabel: ex.tema,
    };
    tema.attempts += n;
    tema.correct += stats.correct;
    tema.incorrect += stats.incorrect;
    byTema.set(ex.temaSlug, tema);

    const cellKey = `${ex.temaSlug}:${ex.type}`;
    const cell = byCell.get(cellKey) ?? {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      temaSlug: ex.temaSlug,
      temaLabel: ex.tema,
      type: ex.type,
    };
    cell.attempts += n;
    cell.correct += stats.correct;
    cell.incorrect += stats.incorrect;
    byCell.set(cellKey, cell);
  }

  return { byTema, byCell, total };
}

const accuracyOf = (agg: AttemptAgg) =>
  Math.round((agg.correct / agg.attempts) * 100);

/**
 * Áreas para revisar: células tema × tipo com 2+ erros e menos de 70% de
 * acerto (ex.: "Interpretação · Função afim"). Temas com erro acumulado mas
 * sem célula crítica entram como tema inteiro.
 */
function getWeakSpots(
  attemptsById: ExerciseAttemptsMap,
  limit = 4,
): WeakSpot[] {
  const { byTema, byCell } = aggregateAttempts(attemptsById);

  const isWeak = (agg: AttemptAgg) =>
    agg.incorrect >= 2 && accuracyOf(agg) < 70;

  const spots: WeakSpot[] = [];
  const temasCobertos = new Set<string>();

  const toSpot = (agg: AttemptAgg, key: string, label: string): WeakSpot | null => {
    const lesson = lessonLinkForTema(agg.temaSlug);
    if (!lesson) return null;
    return {
      key,
      label,
      attempts: agg.attempts,
      incorrect: agg.incorrect,
      accuracy: accuracyOf(agg),
      lessonTitle: lesson.title,
      lessonHref: lesson.href,
      exercisesHref: `/exercicios?tema=${agg.temaSlug}`,
    };
  };

  for (const [key, cell] of byCell) {
    if (!isWeak(cell) || !cell.type) continue;
    const spot = toSpot(cell, key, `${typeLabels[cell.type]} · ${cell.temaLabel}`);
    if (spot) {
      spots.push(spot);
      temasCobertos.add(cell.temaSlug);
    }
  }

  for (const [key, tema] of byTema) {
    if (temasCobertos.has(key) || !isWeak(tema)) continue;
    const spot = toSpot(tema, key, tema.temaLabel);
    if (spot) spots.push(spot);
  }

  spots.sort((a, b) => b.incorrect - a.incorrect || a.accuracy - b.accuracy);
  return spots.slice(0, limit);
}

/** Temas com 3+ tentativas e 80%+ de acerto viram pontos fortes. */
function getExerciseStrengths(
  attemptsById: ExerciseAttemptsMap,
  limit = 3,
): string[] {
  const { byTema } = aggregateAttempts(attemptsById);
  return [...byTema.values()]
    .filter((t) => t.attempts >= 3 && accuracyOf(t) >= 80)
    .sort((a, b) => accuracyOf(b) - accuracyOf(a) || b.attempts - a.attempts)
    .slice(0, limit)
    .map(
      (t) =>
        `${t.temaLabel} · ${accuracyOf(t)}% de acerto nos exercícios (${t.correct} de ${t.attempts})`,
    );
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

function countStudyDaysThisWeek(activityDays: string[]): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  const cutoffISO = localDateISO(cutoff);
  return activityDays.filter((d) => d >= cutoffISO).length;
}

export function buildProgressDashboard(
  state: ProgressState,
): ProgressDashboard {
  const { completedExercises = [], exerciseAttempts = {}, testeNivel } = state;
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
    // Desempenho real nos exercícios vem primeiro; conclusão de módulos complementa.
    strengths: [
      ...getExerciseStrengths(exerciseAttempts),
      ...getStrengths(completedLessons),
    ].slice(0, 6),
    weakSpots: getWeakSpots(exerciseAttempts),
    attemptsTotal: aggregateAttempts(exerciseAttempts).total,
    studyDaysThisWeek: countStudyDaysThisWeek(state.activityDays ?? []),
    toReview: getToReview(completedLessons),
    completedLessons: getCompletedLessonsList(completedLessons),
    modules: [...preModules, ...calcModules],
    testeNivel,
  };
}
