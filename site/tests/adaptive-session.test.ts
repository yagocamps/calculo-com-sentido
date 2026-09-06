import assert from "node:assert/strict";
import { test } from "node:test";
import { exercicios } from "@/data/exercicios";
import { pedagogicalLevelOf } from "@/lib/exercicios";
import { answerAdaptiveSession, createAdaptiveSession, nextAdaptiveExercise, normalizeAdaptiveSession } from "@/lib/adaptive-session";

const seed = exercicios.find((e) => e.temaSlug === "limites" && pedagogicalLevelOf(e) === 2)!;
test("correct raises and incorrect lowers the next available level within the same topic", () => {
  for (const outcome of ["correct", "incorrect"] as const) {
    const initial = createAdaptiveSession(seed.id, "test")!;
    assert.equal(nextAdaptiveExercise(initial), null);
    const answered = answerAdaptiveSession(initial, { exerciseId: seed.id, outcome, attempt: "teste", method: "self-assessment" });
    const next = nextAdaptiveExercise(answered)!;
    assert.equal(pedagogicalLevelOf(next), outcome === "correct" ? 3 : 1);
    assert.equal(next.temaSlug, seed.temaSlug);
    assert.notEqual(next.id, seed.id);
  }
});

test("five answers finish the session, without duplicate submissions or repeated items", () => {
  let session = createAdaptiveSession(seed.id, "test")!;
  for (let i = 0; i < 5; i++) {
    const answer = { exerciseId: session.currentId, outcome: "correct" as const, attempt: "teste", method: "automatic" as const };
    session = answerAdaptiveSession(session, answer);
    assert.equal(answerAdaptiveSession(session, answer), session);
    assert.equal(answerAdaptiveSession(session, { ...answer, exerciseId: "unknown" }), session);
    session = normalizeAdaptiveSession(JSON.parse(JSON.stringify(session)))!;
    assert.ok(session);
    const next = nextAdaptiveExercise(session);
    if (i < 4) { assert.ok(next); session = { ...session, currentId: next.id }; }
    else assert.equal(next, null);
  }
  assert.equal(session.answers.length, 5);
  assert.equal(new Set(session.answers.map((a) => a.exerciseId)).size, 5);
});

test("level bounds and a small topic fall back to available questions", () => {
  const bank = exercicios.filter((e) => e.temaSlug === "limites" && pedagogicalLevelOf(e) === 1).slice(0, 2);
  let session = createAdaptiveSession(bank[0].id, "small", new Date(), bank)!;
  assert.equal(session.targetCount, 2);
  session = answerAdaptiveSession(session, { exerciseId: bank[0].id, outcome: "incorrect", attempt: "0", method: "automatic" });
  assert.equal(nextAdaptiveExercise(session, [], bank)?.id, bank[1].id);
});

test("corrupt and foreign-topic session data is rejected", () => {
  const session = createAdaptiveSession(seed.id, "test")!;
  assert.equal(normalizeAdaptiveSession({ ...session, currentId: "not-a-question" }), undefined);
  assert.equal(normalizeAdaptiveSession({ ...session, startedAt: "bad-date" }), undefined);
  assert.equal(normalizeAdaptiveSession({ ...session, targetCount: 500 }), undefined);
  assert.equal(normalizeAdaptiveSession({ ...session, targetCount: 1 }), undefined);
  assert.equal(normalizeAdaptiveSession({ ...session, id: "" }), undefined);
  const foreign = exercicios.find((e) => e.temaSlug !== seed.temaSlug)!;
  assert.equal(normalizeAdaptiveSession({ ...session, answers: [{ exerciseId: foreign.id, outcome: "correct", attempt: "x", method: "automatic" }] }), undefined);
});
