import assert from "node:assert/strict";
import { test } from "node:test";
import { checkAnswer } from "@/lib/answer-check";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";

test("the published annulus answer retains pi", () => {
  const lesson = buildCalculo1Registry()["calculo-1/integrais/volumes-por-discos"];
  const answer = lesson.exerciciosGuiados.exercises[0].resposta;
  assert.equal(checkAnswer("16", answer), "manual");
  assert.equal(checkAnswer("16π", answer), "correct");
});

test("functions, variables, grouping and units cannot disappear", () => {
  const pairs = [
    ["\\sin(x)", "\\cos(x)"], ["x", "\\(\\cos x\\)"],
    ["16", "16π"], ["2", "2m"], ["2 m", "2 cm"], ["4 cm²", "4π cm²"],
    ["x", "X"], ["x^12", "x^{1}2"], ["x+2/x", "(x+2)/x"],
    ["cos", "cos x"], ["1", "\\infty"], ["x+2", "x+2, x≠2"],
  ];
  for (const [attempt, answer] of pairs) assert.notEqual(checkAnswer(attempt, answer), "correct", `${attempt} ≠ ${answer}`);
});

test("decimals and fractions compare exactly, including signed denominators", () => {
  for (const [attempt, answer] of [
    ["0,5", "\\(\\frac{1}{2}\\)"], [".5", "1/2"], ["2/4", "1/2"],
    ["1/-2", "-0.5"], ["−0,5", "-1/2"], ["(-2)/(-4)", "0.5"],
    ["\\frac{\\frac{1}{2}}{3}", "1/6"], ["\\dfrac{3}{4}", "0,75"],
    ["1.460", "1,46"], ["9007199254740993", "9007199254740993"],
  ]) assert.equal(checkAnswer(attempt, answer), "correct", `${attempt} = ${answer}`);
  for (const [attempt, answer] of [
    ["101", "100"], ["0.0000001", "0"], ["0.333", "1/3"],
    ["1.460", "1460"], ["9007199254740993", "9007199254740992"], ["1/2", "-1/2"],
  ]) assert.equal(checkAnswer(attempt, answer), "incorrect", `${attempt} ≠ ${answer}`);
});

test("rounding requires an explicit tolerance", () => {
  assert.equal(checkAnswer("0.333", "1/3"), "incorrect");
  assert.equal(checkAnswer("0.333", "1/3", { absoluteTolerance: 0.0005 }), "correct");
  assert.equal(checkAnswer("0.33", "1/3", { absoluteTolerance: 0.0005 }), "incorrect");
  for (const absoluteTolerance of [-1, NaN, Infinity, 0]) {
    assert.equal(checkAnswer("101", "100", { absoluteTolerance }), "incorrect");
  }
});

test("the site's own LaTeX decimal is recognised", () => {
  for (const [attempt, answer] of [
    ["0,5", "\\(0{,}5\\)"], ["0.5", "\\(0{,}5\\)"], ["1/2", "\\(0{,}5\\)"],
    ["\\(0{,}5\\)", "0,5"], ["2,40", "\\(2{,}40\\)"],
  ]) assert.equal(checkAnswer(attempt, answer), "correct", `${attempt} = ${answer}`);
  assert.equal(checkAnswer("0,6", "\\(0{,}5\\)"), "incorrect");
});

test("a declared unit becomes optional, never interchangeable", () => {
  // Declarada: vale com e sem a unidade.
  for (const [attempt, answer, unit] of [
    ["9", "\\(9\\) km", "km"], ["9 km", "\\(9\\) km", "km"], ["9km", "\\(9\\) km", "km"],
    ["6", "\\(6\\) m/s", "m/s"], ["165", "\\(165\\) kWh", "kWh"],
    ["0,5", "\\(0{,}5\\) m", "m"],
  ] as [string, string, string][]) {
    assert.equal(checkAnswer(attempt, answer, { unit }), "correct", `${attempt} = ${answer}`);
  }
  // Outra unidade nunca é aceita, mesmo com a unidade declarada.
  for (const [attempt, answer, unit] of [
    ["9 cm", "\\(9\\) km", "km"], ["9 m", "\\(9\\) km", "km"],
    ["6 km/h", "\\(6\\) m/s", "m/s"],
  ] as [string, string, string][]) {
    assert.notEqual(checkAnswer(attempt, answer, { unit }), "correct", `${attempt} ≠ ${answer}`);
  }
  // Número errado continua errado.
  assert.equal(checkAnswer("8 km", "\\(9\\) km", { unit: "km" }), "incorrect");
  // Sem declarar a unidade, o comportamento conservador permanece.
  assert.notEqual(checkAnswer("9", "\\(9\\) km"), "correct");
});

test("empty, undefined, unsupported and hostile expressions are not auto-approved", () => {
  for (const [attempt, answer] of [
    ["", "0"], ["\\(\\)", "\\(\\)"], ["1/0", "1/0"],
    ["\\frac{1}{0}", "\\frac{1}{0}"], ["sqrt(4)", "2"],
    ["2+2", "4"], ["2x", "x+x"], ["1e3", "1000"],
    ["process.exit(1)", "1"], ["1".repeat(2001), "1"],
  ]) assert.equal(checkAnswer(attempt, answer), "manual", attempt);
});
