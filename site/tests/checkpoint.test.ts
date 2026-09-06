import assert from "node:assert/strict";
import { test } from "node:test";
import { moduleCheckpoints } from "@/data/checkpoints";
import { evaluateCheckpoint, restoreCheckpoint, evaluateLessonQuiz } from "@/lib/checkpoint";
import { propriedadesDosLimites } from "@/data/aulas/calculo-1/propriedades-dos-limites";

const data = moduleCheckpoints["pre-calculo/preparacao-limites"];
const answers = Object.fromEntries(data.questions.map((q, i) => [i, q.correctIndex]));

test("the limit quiz does not declare readiness after a domain or denominator error", () => {
  const quiz = propriedadesDosLimites.quiz!;
  assert.equal(evaluateLessonQuiz(quiz, [0, 0, 1]).passed, false);
  assert.equal(evaluateLessonQuiz(quiz, [2, 1, 1]).passed, false);
  assert.equal(evaluateLessonQuiz(quiz, [2, 0, 1]).passed, true);
  assert.equal(evaluateLessonQuiz(quiz, [2, 0, null]).passed, false);
});

test("80 percent with a cancellation error must not declare readiness", () => {
  const result = evaluateCheckpoint(data, { ...answers, 1: 0 });
  assert.equal(result.percent, 80);
  assert.equal(result.passed, false);
  assert.deepEqual(result.criticalErrors, [1]);
  assert.equal(evaluateCheckpoint(data, { ...answers, 2: 0 }).passed, true);
  assert.equal(evaluateCheckpoint(data, answers).passed, true);
});

test("incomplete and invalid submissions cannot pass", () => {
  assert.equal(evaluateCheckpoint(data, {}).passed, false);
  const partial = { ...answers }; delete partial[2];
  assert.equal(evaluateCheckpoint(data, partial).passed, false);
  assert.equal(evaluateCheckpoint(data, { ...answers, 2: -1 }).passed, false);
  assert.equal(evaluateCheckpoint(data, { ...answers, 2: 0.5 }).passed, false);
});

test("every answer combination respects the critical skill", () => {
  for (let combination = 0; combination < 4 ** data.questions.length; combination++) {
    const attempt = Object.fromEntries(data.questions.map((_, i) => [i, Math.floor(combination / 4 ** i) % 4]));
    const result = evaluateCheckpoint(data, attempt);
    if (attempt[1] !== answers[1]) assert.equal(result.passed, false);
  }
});

test("restore recomputes readiness from valid current answers, never trusts an old score", () => {
  const snapshot = { version: 2, signature: JSON.stringify(data.questions), answers: { ...answers, 1: 0 }, passed: true, percent: 100 };
  const restored = restoreCheckpoint(data, JSON.stringify(snapshot));
  assert.ok(restored);
  assert.equal(evaluateCheckpoint(data, restored).passed, false);
  assert.equal(restoreCheckpoint(data, JSON.stringify({ percent: 100 })), null);
  assert.equal(restoreCheckpoint(data, JSON.stringify({ ...snapshot, signature: "old questions" })), null);
  assert.equal(restoreCheckpoint(data, JSON.stringify({ ...snapshot, answers: { 1: 0 } })), null);
  assert.equal(restoreCheckpoint(data, "broken json"), null);
});
