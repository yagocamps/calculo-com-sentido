import assert from "node:assert/strict";
import { test } from "node:test";
import { createStudyPlanSessions, normalizeStudyPlan, validPlanDate, type StudyPlan } from "@/lib/study-plan";
import { buildProgressDashboard } from "@/lib/progress-dashboard";
import { getProgress } from "@/lib/progress";

const start = "2026-09-05T12:00:00-03:00";
test("every preset contains the promised weeks and sessions in the dashboard", () => {
  for (const [durationWeeks, sessionsPerWeek, minutesPerSession] of [[2, 5, 40], [4, 4, 25], [8, 3, 15]] as const) {
    const plan: StudyPlan = { durationWeeks, sessionsPerWeek, minutesPerSession, startedAt: start };
    const sessions = createStudyPlanSessions(plan);
    assert.equal(sessions.length, durationWeeks * sessionsPerWeek);
    assert.equal(new Set(sessions.map((s) => s.id)).size, sessions.length);
    assert.ok(sessions.every((s) => validPlanDate(s.date)));
    for (let week = 1; week <= durationWeeks; week++) assert.equal(sessions.filter((s) => s.week === week).length, sessionsPerWeek);
    assert.deepEqual(sessions.map((s) => s.date), sessions.map((s) => s.date).sort());
    const dash = buildProgressDashboard({ ...getProgress(), studyPlan: plan });
    assert.equal(dash.studyPlanSteps.length, durationWeeks * sessionsPerWeek);
  }
});

test("rescheduled dates, completion and lesson choices survive normalization", () => {
  const plan = normalizeStudyPlan({ durationWeeks: 2, sessionsPerWeek: 5, minutesPerSession: 40, startedAt: start })!;
  plan.sessions![0].date = "2026-10-20";
  plan.sessions![0].completed = true;
  assert.deepEqual(normalizeStudyPlan(JSON.parse(JSON.stringify(plan))), plan);
  assert.equal(validPlanDate("2026-02-30"), false);
  assert.equal(validPlanDate("2026-09-05"), true);
  assert.equal(normalizeStudyPlan({ ...plan, startedAt: "yesterday" }), undefined);
  plan.sessions![0].href = "https://untrusted.invalid";
  assert.notEqual(normalizeStudyPlan(plan)!.sessions![0].href, plan.sessions![0].href);
});

test("a new plan starts with a known priority and does not repeat completed lessons as new material", () => {
  const plan: StudyPlan = { durationWeeks: 4, sessionsPerWeek: 4, minutesPerSession: 25, startedAt: start };
  const priority = "/calculo-1/limites/propriedades-dos-limites";
  const completed = ["pre-calculo/fundamentos/operacoes-basicas"];
  const sessions = createStudyPlanSessions(plan, completed, priority);
  assert.equal(sessions[0].href, priority);
  assert.ok(sessions.filter((s) => s.kind === "lesson").every((s) => !completed.includes(s.href.slice(1))));
});
