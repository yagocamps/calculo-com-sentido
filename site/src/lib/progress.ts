import {
  calculo1LessonId,
  calculo1Modulos,
} from "@/data/calculo-1";
import { isLessonAccessible } from "@/lib/aulas";
import { moduleCheckpoints } from "@/data/checkpoints";
import { evaluateCheckpoint } from "@/lib/checkpoint";
import { checkAnswer } from "@/lib/answer-check";
import { checkpointAttemptId, getLearningItem, guidedAttemptId, guidedSignature, normalizeCheckpointRecords, normalizeGuidedRecords,
  type AssessmentMethod, type CheckpointRecords, type GuidedRecord, type GuidedRecords } from "@/lib/learning-assessments";
import { normalizeAdaptiveSession, type AdaptiveSession } from "@/lib/adaptive-session";
import { createStudyPlanSessions, normalizeStudyPlan, validPlanDate, type StudyPlan } from "@/lib/study-plan";
export type { StudyPlan } from "@/lib/study-plan";
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
const CURRENT_SCHEMA_VERSION = 4;

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
  skillScores?: Record<string, { correct: number; total: number }>;
};

/** Acertos e erros acumulados de um exercício (alimenta "Pontos fortes" e "O que revisar"). */
export type ExerciseAttemptStats = {
  correct: number;
  incorrect: number;
};

export type ExerciseAttemptsMap = Record<string, ExerciseAttemptStats>;

export type ExerciseAttemptEvent = {
  exerciseId: string;
  outcome: "correct" | "incorrect";
  attemptedAt: string;
  method?: AssessmentMethod;
};

export type ProgressState = {
  schemaVersion: number;
  percent: number;
  nextLesson: string;
  completedLessons: string[];
  completedExercises: string[];
  exerciseAttempts: ExerciseAttemptsMap;
  attemptHistory: ExerciseAttemptEvent[];
  guidedRecords: GuidedRecords;
  checkpointRecords: CheckpointRecords;
  checkpointMigrationVersion: 1;
  favoriteLessons: string[];
  lessonNotes: Record<string, string>;
  studyPlan?: StudyPlan;
  adaptiveSession?: AdaptiveSession;
  /** Dias (YYYY-MM-DD locais) com atividade de estudo — alimenta o "streak suave". */
  activityDays: string[];
  reviews: ReviewMap;
  testeNivel?: TesteNivelStored;
};

const defaultProgress: ProgressState = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  percent: 0,
  nextLesson: "Função afim",
  completedLessons: [],
  completedExercises: [],
  exerciseAttempts: {},
  attemptHistory: [],
  guidedRecords: {},
  checkpointRecords: {},
  checkpointMigrationVersion: 1,
  favoriteLessons: [],
  lessonNotes: {},
  activityDays: [],
  reviews: {},
};

const MAX_ACTIVITY_DAYS = 90;

function normalizeActivityDays(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const valid = raw.filter(
    (d): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d),
  );
  return [...new Set(valid)].sort().slice(-MAX_ACTIVITY_DAYS);
}

/** Data local de hoje em YYYY-MM-DD (sem UTC, para não virar o dia errado). */
export function localDateISO(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function withToday(days: string[]): string[] {
  const today = localDateISO();
  return days.includes(today) ? days : [...days, today];
}

function normalizeExerciseAttempts(raw: unknown): ExerciseAttemptsMap {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: ExerciseAttemptsMap = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!getLearningItem(id) || !value || typeof value !== "object") continue;
    const { correct, incorrect } = value as Partial<ExerciseAttemptStats>;
    const c = typeof correct === "number" && Number.isFinite(correct) && correct >= 0 ? Math.floor(correct) : 0;
    const i =
      typeof incorrect === "number" && Number.isFinite(incorrect) && incorrect >= 0 ? Math.floor(incorrect) : 0;
    if (c > 0 || i > 0) out[id] = { correct: c, incorrect: i };
  }
  return out;
}

function normalizeAttemptHistory(raw: unknown): ExerciseAttemptEvent[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is ExerciseAttemptEvent => {
      if (!item || typeof item !== "object") return false;
      const event = item as Partial<ExerciseAttemptEvent>;
      return (
        typeof event.exerciseId === "string" &&
        Boolean(getLearningItem(event.exerciseId)) &&
        (event.outcome === "correct" || event.outcome === "incorrect") &&
        typeof event.attemptedAt === "string" &&
        !Number.isNaN(Date.parse(event.attemptedAt))
      );
    })
    .slice(-200);
}

function normalizeLessonNotes(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const known = new Set(normalizeLessonIds(Object.keys(raw)));
  const notes: Record<string, string> = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (known.has(id) && typeof value === "string" && value.trim()) {
      notes[id] = value.trim().slice(0, 1500);
    }
  }
  return notes;
}

function persistProgress(state: ProgressState): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function syncDerivedFields() {
  if (typeof window === "undefined") return;
  const state = getProgress();
  persistProgress({ ...state, nextLesson: computeNextLessonTitle(state.completedLessons) });
}

export function getProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = (raw ? JSON.parse(raw) : {}) as Partial<ProgressState>;
    const completedLessons = normalizeLessonIds(parsed.completedLessons);
    const completedExercises = normalizeExerciseIds(parsed.completedExercises);
    const exerciseAttempts = normalizeExerciseAttempts(parsed.exerciseAttempts);
    const attemptHistory = normalizeAttemptHistory(parsed.attemptHistory);
    const favoriteLessons = normalizeLessonIds(parsed.favoriteLessons);
    const lessonNotes = normalizeLessonNotes(parsed.lessonNotes);
    const activityDays = normalizeActivityDays(parsed.activityDays);
    const reviews = normalizeReviews(parsed.reviews);
    let state: ProgressState = {
      ...defaultProgress,
      ...parsed,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      completedLessons,
      completedExercises,
      exerciseAttempts,
      attemptHistory,
      guidedRecords: normalizeGuidedRecords(parsed.guidedRecords),
      checkpointRecords: normalizeCheckpointRecords(parsed.checkpointRecords),
      checkpointMigrationVersion: 1,
      favoriteLessons,
      lessonNotes,
      studyPlan: normalizeStudyPlan(parsed.studyPlan),
      adaptiveSession: normalizeAdaptiveSession(parsed.adaptiveSession),
      activityDays,
      reviews,
      percent: computeCombinedTrilhaPercent(completedLessons),
      nextLesson:
        typeof parsed.nextLesson === "string"
          ? parsed.nextLesson
          : computeNextLessonTitle(completedLessons),
    };
    if (parsed.checkpointMigrationVersion !== 1) {
      for (const [id, data] of Object.entries(moduleCheckpoints)) {
        if (state.checkpointRecords[id]) continue;
        try {
          const legacy = localStorage.getItem(`ccs-checkpoint:v1:${id}`);
          if (!legacy) continue;
          const record = normalizeCheckpointRecords({ [id]: JSON.parse(legacy) })[id];
          if (!record) continue;
          state.checkpointRecords[id] = record;
          state = withAttempts(state, data.questions.map((question, index) => ({
            exerciseId: checkpointAttemptId(id, index), outcome: record.answers[index] === question.correctIndex ? "correct" : "incorrect",
            attemptedAt: record.completedAt, method: "choice",
          })));
        } catch { /* An invalid legacy record cannot establish readiness. */ }
      }
      persistProgress(state);
    }
    return state;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(state: Partial<ProgressState>) {
  if (typeof window === "undefined") return false;
  const current = getProgress();
  const merged: ProgressState = {
    ...current,
    ...state,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    completedLessons: state.completedLessons
      ? normalizeLessonIds(state.completedLessons)
      : current.completedLessons,
    completedExercises: state.completedExercises
      ? normalizeExerciseIds(state.completedExercises)
      : current.completedExercises,
    exerciseAttempts: state.exerciseAttempts
      ? normalizeExerciseAttempts(state.exerciseAttempts)
      : current.exerciseAttempts,
    attemptHistory: state.attemptHistory
      ? normalizeAttemptHistory(state.attemptHistory)
      : current.attemptHistory,
    guidedRecords: state.guidedRecords ? normalizeGuidedRecords(state.guidedRecords) : current.guidedRecords,
    checkpointRecords: state.checkpointRecords ? normalizeCheckpointRecords(state.checkpointRecords) : current.checkpointRecords,
    checkpointMigrationVersion: 1,
    favoriteLessons: state.favoriteLessons
      ? normalizeLessonIds(state.favoriteLessons)
      : current.favoriteLessons,
    lessonNotes: state.lessonNotes
      ? normalizeLessonNotes(state.lessonNotes)
      : current.lessonNotes,
    studyPlan:
      Object.prototype.hasOwnProperty.call(state, "studyPlan")
        ? normalizeStudyPlan(state.studyPlan)
        : current.studyPlan,
    adaptiveSession: Object.prototype.hasOwnProperty.call(state, "adaptiveSession")
      ? normalizeAdaptiveSession(state.adaptiveSession)
      : current.adaptiveSession,
    activityDays: state.activityDays
      ? normalizeActivityDays(state.activityDays)
      : current.activityDays,
    reviews: state.reviews ? normalizeReviews(state.reviews) : current.reviews,
  };
  merged.percent = computeCombinedTrilhaPercent(merged.completedLessons);
  merged.nextLesson = computeNextLessonTitle(merged.completedLessons);
  const saved = persistProgress(merged);
  if (saved) dispatchProgressUpdate();
  return saved;
}

export function markLessonComplete(lessonPathId: string) {
  const current = getProgress();
  const normalized = normalizeLessonIds(current.completedLessons);
  if (normalized.includes(lessonPathId)) return;
  saveProgress({
    completedLessons: [...normalized, lessonPathId],
    reviews: { ...current.reviews, [lessonPathId]: seedReview() },
    activityDays: withToday(current.activityDays),
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
    activityDays: withToday(current.activityDays),
  });
}

/**
 * Registra uma tentativa de exercício (acerto ou erro). Diferente de
 * `markExerciseComplete`, acumula histórico — é o que permite ao dashboard
 * apontar "Pontos fortes" e "O que revisar" por tema e tipo de questão.
 */
export function recordExerciseAttempt(
  exerciseId: string,
  outcome: "correct" | "incorrect",
  method?: AssessmentMethod,
) {
  if (!getLearningItem(exerciseId)) return;
  const current = getProgress();
  saveProgress(withAttempts(current, [{ exerciseId, outcome, attemptedAt: new Date().toISOString(), method }]));
}

function withAttempts(state: ProgressState, events: ExerciseAttemptEvent[]): ProgressState {
  const stats = { ...state.exerciseAttempts };
  for (const event of events) {
    const previous = stats[event.exerciseId] ?? { correct: 0, incorrect: 0 };
    stats[event.exerciseId] = { correct: previous.correct + Number(event.outcome === "correct"),
      incorrect: previous.incorrect + Number(event.outcome === "incorrect") };
  }
  return { ...state, exerciseAttempts: stats,
    attemptHistory: [...state.attemptHistory, ...events].sort((a, b) => Date.parse(a.attemptedAt) - Date.parse(b.attemptedAt)).slice(-200),
    activityDays: normalizeActivityDays([...state.activityDays, ...events.map((e) => localDateISO(new Date(e.attemptedAt)))]) };
}

export function submitGuidedAttempt(lessonId: string, exerciseId: string, input: string, selfAssessment?: "correct" | "incorrect") {
  const id = guidedAttemptId(lessonId, exerciseId);
  const exercise = getLearningItem(id)?.exercise;
  const attempt = input.trim();
  if (!exercise || !attempt || attempt.length > 2000) return null;
  const current = getProgress();
  const previous = current.guidedRecords[id];
  const checked = checkAnswer(attempt, exercise.resposta, exercise.answerCheck);
  const result = checked === "manual" && selfAssessment ? selfAssessment : checked;
  const method = checked === "manual" && selfAssessment ? "self-assessment" : "automatic";
  if (previous?.attempt === attempt && (previous.result !== "manual" || result === "manual"))
    return { record: previous, saved: true };
  const record: GuidedRecord = { signature: guidedSignature(exercise), attempt, result, method, updatedAt: new Date().toISOString() };
  const next = result === "manual" ? current : withAttempts(current, [{ exerciseId: id, outcome: result, attemptedAt: record.updatedAt, method }]);
  const saved = saveProgress({ ...next, guidedRecords: { ...current.guidedRecords, [id]: record } });
  return { record, saved };
}

export function clearGuidedAnswer(id: string) {
  const records = { ...getProgress().guidedRecords };
  delete records[id];
  return saveProgress({ guidedRecords: records });
}

export function submitModuleCheckpoint(id: string, answers: Record<number, number>) {
  const data = moduleCheckpoints[id];
  if (!data || !evaluateCheckpoint(data, answers).complete) return false;
  const current = getProgress();
  const previous = current.checkpointRecords[id];
  const completedAt = new Date().toISOString();
  const events: ExerciseAttemptEvent[] = data.questions.flatMap((question, index) =>
    previous?.answers[index] === answers[index] ? [] : [{ exerciseId: checkpointAttemptId(id, index),
      outcome: answers[index] === question.correctIndex ? "correct" : "incorrect", attemptedAt: completedAt, method: "choice" }]);
  if (!events.length) return true;
  return saveProgress({ ...withAttempts(current, events), checkpointRecords: { ...current.checkpointRecords,
    [id]: { version: 2, signature: JSON.stringify(data.questions), answers: { ...answers }, completedAt } } });
}

export function toggleLessonFavorite(lessonPathId: string): boolean {
  const current = getProgress();
  const favorites = normalizeLessonIds(current.favoriteLessons);
  const isFavorite = favorites.includes(lessonPathId);
  saveProgress({
    favoriteLessons: isFavorite
      ? favorites.filter((id) => id !== lessonPathId)
      : [...favorites, lessonPathId],
  });
  return !isFavorite;
}

export function saveLessonNote(lessonPathId: string, note: string) {
  const current = getProgress();
  const notes = { ...current.lessonNotes };
  const clean = note.trim().slice(0, 1500);
  if (clean) notes[lessonPathId] = clean;
  else delete notes[lessonPathId];
  saveProgress({ lessonNotes: notes });
}

export function configureStudyPlan(durationWeeks: 2 | 4 | 8, priorityHref?: string) {
  const current = getProgress();
  if (current.studyPlan?.durationWeeks === durationWeeks) return;
  const presets: Record<2 | 4 | 8, Omit<StudyPlan, "durationWeeks" | "startedAt">> = {
    2: { sessionsPerWeek: 5, minutesPerSession: 40 },
    4: { sessionsPerWeek: 4, minutesPerSession: 25 },
    8: { sessionsPerWeek: 3, minutesPerSession: 15 },
  };
  const plan: StudyPlan = {
      durationWeeks,
      ...presets[durationWeeks],
      startedAt: new Date().toISOString(),
  };
  plan.sessions = createStudyPlanSessions(plan, current.completedLessons, priorityHref);
  saveProgress({ studyPlan: plan });
}

export function updateStudyPlanSession(id: string, change: { completed?: boolean; date?: string }) {
  const current = getProgress();
  const plan = current.studyPlan;
  if (!plan?.sessions?.some((s) => s.id === id) || (change.date !== undefined && !validPlanDate(change.date))) return;
  saveProgress({ studyPlan: { ...plan, sessions: plan.sessions.map((s) => s.id === id ? { ...s, ...change } : s) },
    activityDays: change.completed ? withToday(current.activityDays) : current.activityDays });
}

export function markExerciseComplete(exerciseId: string) {
  const current = getProgress();
  const normalized = normalizeExerciseIds(current.completedExercises);
  if (normalized.includes(exerciseId)) return;
  saveProgress({
    completedExercises: [...normalized, exerciseId],
    activityDays: withToday(current.activityDays),
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

const MAX_IMPORT_BYTES = 20_000_000;

export function exportProgressJson(): string {
  return JSON.stringify(getProgress());
}

/** Importa backup JSON com validação (tamanho, schema, normalização). */
export function importProgressFromJson(raw: string): {
  ok: boolean;
  error?: string;
} {
  if (typeof window === "undefined") {
    return { ok: false, error: "Indisponível no servidor." };
  }
  if (raw.length > MAX_IMPORT_BYTES || new TextEncoder().encode(raw).byteLength > MAX_IMPORT_BYTES) {
    return { ok: false, error: "Arquivo muito grande (máx. 20 MB)." };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed) ||
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
    const exerciseAttempts = normalizeExerciseAttempts(parsed.exerciseAttempts);
    const attemptHistory = normalizeAttemptHistory(parsed.attemptHistory);
    const favoriteLessons = normalizeLessonIds(parsed.favoriteLessons);
    const lessonNotes = normalizeLessonNotes(parsed.lessonNotes);
    const activityDays = normalizeActivityDays(parsed.activityDays);
    const reviews = normalizeReviews(parsed.reviews);
    const saved = saveProgress({
      completedLessons,
      completedExercises,
      exerciseAttempts,
      attemptHistory,
      guidedRecords: normalizeGuidedRecords(parsed.guidedRecords),
      checkpointRecords: normalizeCheckpointRecords(parsed.checkpointRecords),
      checkpointMigrationVersion: 1,
      favoriteLessons,
      lessonNotes,
      studyPlan: normalizeStudyPlan(parsed.studyPlan),
      adaptiveSession: normalizeAdaptiveSession(parsed.adaptiveSession),
      activityDays,
      reviews,
      testeNivel:
        parsed.testeNivel &&
        typeof parsed.testeNivel.scorePercent === "number"
          ? parsed.testeNivel
          : undefined,
    });
    if (!saved) return { ok: false, error: "O navegador não conseguiu salvar o backup. Verifique o espaço de armazenamento disponível." };
    syncDerivedFields();
    return { ok: true };
  } catch {
    return { ok: false, error: "JSON inválido ou corrompido." };
  }
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
    for (const id of Object.keys(moduleCheckpoints)) localStorage.removeItem(`ccs-checkpoint:v1:${id}`);
  } catch {
    /* ignore */
  }
  dispatchProgressUpdate();
}
