import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createAdaptiveSession, answerAdaptiveSession } from "@/lib/adaptive-session";
import { configureStudyPlan, getProgress, importProgressFromJson, saveProgress, updateStudyPlanSession } from "@/lib/progress";

const store = new Map<string, string>();
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
before(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: { dispatchEvent: () => true } });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  } });
});
after(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow); else Reflect.deleteProperty(globalThis, "window");
  if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage); else Reflect.deleteProperty(globalThis, "localStorage");
});

test("session and complete study plan survive backup, reload and unrelated progress updates", () => {
  store.clear();
  configureStudyPlan(2);
  updateStudyPlanSession("w1-s1", { completed: true, date: "2026-10-20" });
  const initial = createAdaptiveSession("lim-prop-01", "saved")!;
  const session = answerAdaptiveSession(initial, { exerciseId: initial.currentId, outcome: "correct", attempt: "5", method: "automatic" });
  saveProgress({ adaptiveSession: session });
  const backup = JSON.stringify(getProgress());
  store.clear();
  assert.equal(importProgressFromJson(backup).ok, true);
  saveProgress({ activityDays: ["2026-09-05"] });
  const restored = getProgress();
  assert.deepEqual(restored.adaptiveSession, session);
  assert.equal(restored.studyPlan!.sessions!.length, 10);
  assert.equal(restored.studyPlan!.sessions![0].completed, true);
  assert.equal(restored.studyPlan!.sessions![0].date, "2026-10-20");
  configureStudyPlan(2);
  assert.equal(getProgress().studyPlan!.sessions![0].completed, true);
  assert.equal(importProgressFromJson('{"completedLessons":[],"completedExercises":[]}').ok, true);
  assert.equal(getProgress().studyPlan, undefined);
  assert.equal(getProgress().adaptiveSession, undefined);
});
