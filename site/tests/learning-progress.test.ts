import assert from "node:assert/strict";
import { before, after, beforeEach, test } from "node:test";
import { moduleCheckpoints } from "@/data/checkpoints";
import { getAulaContent } from "@/lib/aulas";
import { buildProgressDashboard } from "@/lib/progress-dashboard";
import { checkpointAttemptId, guidedAttemptId, normalizeGuidedRecords } from "@/lib/learning-assessments";
import { clearGuidedAnswer, exportProgressJson, getProgress, importProgressFromJson, recordExerciseAttempt,
  resetProgress, saveProgress, submitGuidedAttempt, submitModuleCheckpoint, syncDerivedFields } from "@/lib/progress";

const store = new Map<string, string>();
let quotaExceeded = false;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
before(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: { dispatchEvent: () => true } });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => { if (quotaExceeded) throw new Error("quota"); store.set(key, value); },
    removeItem: (key: string) => store.delete(key),
  } });
});
after(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow); else Reflect.deleteProperty(globalThis, "window");
  if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage); else Reflect.deleteProperty(globalThis, "localStorage");
});
beforeEach(() => { store.clear(); quotaExceeded = false; });

const lessonId = "calculo-1/derivadas/derivada-da-inversa";
const exercise = getAulaContent("calculo-1", "derivadas", "derivada-da-inversa")!.exerciciosGuiados.exercises[0];
const guidedId = guidedAttemptId(lessonId, exercise.id);
const moduleId = "pre-calculo/preparacao-limites";
const checkpoint = moduleCheckpoints[moduleId];
const correctAnswers = Object.fromEntries(checkpoint.questions.map((q, i) => [i, q.correctIndex]));
const criticalIndex = checkpoint.questions.findIndex((q) => q.critical);
const wrongAnswers = { ...correctAnswers, [criticalIndex]: (correctAnswers[criticalIndex] + 1) % checkpoint.questions[criticalIndex].options.length };

test("legacy checkpoint answers migrate once, including on export before revisiting the module", () => {
  const completedAt = "2026-08-20T12:00:00Z";
  store.set(`ccs-checkpoint:v1:${moduleId}`, JSON.stringify({ version: 2, signature: JSON.stringify(checkpoint.questions),
    answers: wrongAnswers, completedAt, percent: 100, passed: true }));
  // The app calls this before opening modules: it must not suppress legacy migration.
  syncDerivedFields();
  const exported = JSON.parse(exportProgressJson());
  assert.deepEqual(exported.checkpointRecords[moduleId].answers, wrongAnswers);
  assert.equal(exported.attemptHistory.length, checkpoint.questions.length);
  assert.ok(exported.attemptHistory.every((e: { attemptedAt: string }) => e.attemptedAt === completedAt));
  assert.equal(getProgress().attemptHistory.length, checkpoint.questions.length);
  const dash = buildProgressDashboard(getProgress());
  assert.equal(dash.skillRecommendation?.source, "checkpoint-errors");
  assert.equal(dash.skillRecommendation?.href, checkpoint.questions[criticalIndex].reviewHref);
  assert.equal(dash.lessonsCompleted, 0);
});

test("legacy score-only or stale-question records do not establish readiness or manufacture attempts", () => {
  store.set(`ccs-checkpoint:v1:${moduleId}`, JSON.stringify({ percent: 100, passed: true }));
  assert.equal(getProgress().checkpointRecords[moduleId], undefined);
  assert.equal(getProgress().attemptHistory.length, 0);
  store.clear();
  store.set(`ccs-checkpoint:v1:${moduleId}`, JSON.stringify({ version: 2, signature: "old questions", answers: correctAnswers, completedAt: new Date().toISOString() }));
  assert.equal(getProgress().checkpointRecords[moduleId], undefined);
});

test("checkpoint re-submission is idempotent and changing one answer records just that answer", () => {
  assert.equal(submitModuleCheckpoint(moduleId, { 0: 0 }), false);
  assert.equal(submitModuleCheckpoint(moduleId, wrongAnswers), true);
  assert.equal(submitModuleCheckpoint(moduleId, wrongAnswers), true);
  assert.equal(getProgress().attemptHistory.length, checkpoint.questions.length);
  assert.equal(submitModuleCheckpoint(moduleId, correctAnswers), true);
  const progress = getProgress();
  assert.equal(progress.attemptHistory.length, checkpoint.questions.length + 1);
  assert.deepEqual(progress.exerciseAttempts[checkpointAttemptId(moduleId, criticalIndex)], { correct: 1, incorrect: 1 });
  assert.notEqual(buildProgressDashboard(progress).skillRecommendation?.source, "checkpoint-errors");
});

test("guided answers restore, count once, feed exact lesson recommendations and keep lesson completion independent", () => {
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, "999")?.record.result, "incorrect");
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, " 999 ")?.saved, true);
  assert.equal(getProgress().attemptHistory.length, 1);
  assert.equal(getProgress().guidedRecords[guidedId].attempt, "999");
  const dash = buildProgressDashboard(getProgress());
  assert.equal(dash.skillRecommendation?.source, "guided-errors");
  assert.equal(dash.skillRecommendation?.href, `/${lessonId}`);
  assert.match(dash.errorHistory[0].href, /#exercicio-/);
  assert.equal(dash.attemptsTotal, 1);
  assert.equal(dash.exercisesCompleted, 0);
  assert.equal(dash.lessonsCompleted, 0);
  submitGuidedAttempt(lessonId, exercise.id, "1/5");
  assert.deepEqual(getProgress().exerciseAttempts[guidedId], { correct: 1, incorrect: 1 });
  assert.notEqual(buildProgressDashboard(getProgress()).skillRecommendation?.source, "guided-errors");
  clearGuidedAnswer(guidedId);
  assert.equal(getProgress().guidedRecords[guidedId], undefined);
  assert.equal(getProgress().attemptHistory.length, 2, "starting a new attempt preserves the history");
});

test("unsupported answers wait for explicit self-assessment and retain that method", () => {
  const pending = submitGuidedAttempt(lessonId, exercise.id, "minha explicação")!;
  assert.equal(pending.record.result, "manual");
  assert.equal(getProgress().attemptHistory.length, 0);
  assert.equal(buildProgressDashboard(getProgress()).savedAssessmentCount, 1);
  submitGuidedAttempt(lessonId, exercise.id, "minha explicação", "incorrect");
  submitGuidedAttempt(lessonId, exercise.id, "minha explicação", "incorrect");
  assert.equal(getProgress().attemptHistory.length, 1);
  assert.equal(getProgress().attemptHistory[0].method, "self-assessment");
  assert.match(buildProgressDashboard(getProgress()).errorHistory[0].skill, /Autoavaliação/);
  // Rechecking must not turn an assessed answer back into a pending one.
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, "minha explicação")?.record.result, "incorrect");
});

test("backup round trip restores all assessment sources and replacing it cannot resurrect legacy data", () => {
  submitModuleCheckpoint(moduleId, wrongAnswers);
  submitGuidedAttempt(lessonId, exercise.id, "1/5");
  recordExerciseAttempt("lim-prop-01", "correct", "automatic");
  const original = getProgress();
  const backup = exportProgressJson();
  store.clear();
  assert.equal(importProgressFromJson(backup).ok, true);
  const restored = getProgress();
  assert.deepEqual(restored.checkpointRecords, original.checkpointRecords);
  assert.deepEqual(restored.guidedRecords, original.guidedRecords);
  assert.deepEqual(restored.exerciseAttempts, original.exerciseAttempts);
  assert.deepEqual(restored.attemptHistory, original.attemptHistory);
  store.set(`ccs-checkpoint:v1:${moduleId}`, JSON.stringify(original.checkpointRecords[moduleId]));
  assert.equal(importProgressFromJson('{"completedLessons":[]}').ok, true);
  assert.deepEqual(getProgress().checkpointRecords, {});
  assert.deepEqual(getProgress().guidedRecords, {});
  assert.equal(getProgress().attemptHistory.length, 0);
  resetProgress();
  assert.equal(getProgress().attemptHistory.length, 0);
  assert.equal(store.has(`ccs-checkpoint:v1:${moduleId}`), false);
});

test("restoration recomputes automatic feedback and rejects unknown or stale guided snapshots", () => {
  const wrong = submitGuidedAttempt(lessonId, exercise.id, "999")!.record;
  const normalized = normalizeGuidedRecords({ [guidedId]: { ...wrong, result: "correct" } });
  assert.equal(normalized[guidedId].result, "incorrect");
  assert.deepEqual(normalizeGuidedRecords({ [guidedId]: { ...wrong, signature: "changed content" } }), {});
  assert.deepEqual(normalizeGuidedRecords({ unknown: wrong }), {});
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, " "), null);
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, "9".repeat(2001)), null);
});

test("invalid JSON roots cannot replace existing progress", () => {
  submitGuidedAttempt(lessonId, exercise.id, "1/5");
  const previous = store.get("ccs-progress");
  for (const raw of ["null", "true", "42", '"backup"', "[]", "[{}]", "{"]) {
    assert.equal(importProgressFromJson(raw).ok, false);
    assert.equal(store.get("ccs-progress"), previous);
  }
});

test("storage failure is reported without overwriting existing progress; retry records exactly once", () => {
  saveProgress({ completedLessons: [lessonId] });
  const previous = store.get("ccs-progress");
  quotaExceeded = true;
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, "1/5")?.saved, false);
  assert.equal(submitModuleCheckpoint(moduleId, correctAnswers), false);
  assert.equal(importProgressFromJson('{"completedLessons":[]}').ok, false);
  assert.equal(store.get("ccs-progress"), previous);
  quotaExceeded = false;
  assert.equal(submitGuidedAttempt(lessonId, exercise.id, "1/5")?.saved, true);
  assert.equal(getProgress().attemptHistory.length, 1);
});
