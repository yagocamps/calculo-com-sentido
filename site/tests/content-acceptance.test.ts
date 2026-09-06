import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { calculo1Modulos } from "@/data/calculo-1";
import { exercicios } from "@/data/exercicios";
import { mathDelimiterErrors } from "@/lib/math-delimiters";
import { checkAnswer } from "@/lib/answer-check";

test("limit laws have individual conditions, examples, accessible notation and linked practice", () => {
  const lesson = buildCalculo1Registry()["calculo-1/limites/propriedades-dos-limites"];
  const rules = lesson.explicacao.rules ?? [];
  for (const id of ["constante", "identidade", "soma", "diferenca", "multiplo", "produto", "quociente", "potencia", "raiz", "modulo", "composicao"]) {
    const rule = rules.find((item) => item.id === id);
    assert.ok(rule, `Missing rule: ${id}`);
    assert.ok(rule.conditions && rule.example && rule.formulaLatex && rule.formulaAria);
  }
  const practice = lesson.exerciciosAplicados.exerciseIds.map((id) => exercicios.find((e) => e.id === id));
  assert.equal(practice.length, 10);
  assert.ok(practice.every(Boolean));
  assert.deepEqual([...new Set(practice.map((e) => e?.pedagogicalLevel))].sort(), [1, 2, 3, 4, 5]);
  assert.ok(lesson.quiz && lesson.quiz.length >= 3);
});

test("limit properties precede substitution and applications without duplicate routes", () => {
  const lessons = calculo1Modulos.find((m) => m.slug === "limites")!.lessons;
  const slugs = lessons.map((l) => l.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const use of ["limite-substituicao", "velocidade-instantanea", "aplicacoes-limites"]) {
    assert.ok(slugs.indexOf("propriedades-dos-limites") < slugs.indexOf(use));
  }
});

test("new numeric answer keys agree with independently calculated results", () => {
  const expected = { "lim-prop-01": "5", "lim-prop-02": "9", "lim-prop-03": "5", "lim-prop-04": "1", "lim-prop-09": "7" };
  for (const [id, answer] of Object.entries(expected)) {
    assert.equal(checkAnswer(answer, exercicios.find((e) => e.id === id)!.resposta), "correct", id);
  }
});

test("malformed delimiters are detected even without any complete formula", () => {
  for (const malformed of ["\\(-(2x+y)/(x+2y))\\", "x\\)", "\\[x\\)", "\\(\\)", "\\(a\\(b\\)\\)"]) {
    assert.ok(mathDelimiterErrors(malformed).length > 0, malformed);
  }
  assert.deepEqual(mathDelimiterErrors("Texto \\(x+1\\), depois \\[\\frac12\\]. R$ 5."), []);
  const implicit = exercicios.find((e) => e.id === "p2-derivacao-implicita-5")!;
  assert.deepEqual(mathDelimiterErrors(implicit.resposta), []);
  assert.match(implicit.enunciado, /ne0/);
});
