import assert from "node:assert/strict";
import { test } from "node:test";
import { getAulaContent } from "@/lib/aulas";
import { calculo1Modulos } from "@/data/calculo-1";
import { expressStages, resolveExpressRef } from "@/data/trilha-expressa";
import { exercicios } from "@/data/exercicios";
import { exerciciosRevisaoCurricular } from "@/data/exercicios-revisao-curricular";
import { evaluateLessonQuiz } from "@/lib/checkpoint";
import { sectionLinks } from "@/components/aulas/toc-sections";

const revised = [
  "pre-calculo/funcoes/polinomios-e-zeros", "pre-calculo/funcoes/funcoes-inversas",
  "calculo-1/limites/limites-exponenciais-logaritmicos", "calculo-1/limites/classificacao-indeterminacoes",
  "calculo-1/derivadas/derivadas-exponenciais-logaritmicas", "calculo-1/derivadas/derivada-da-inversa",
  "calculo-1/integrais/substituicao", "calculo-1/integrais/area-entre-curvas", "calculo-1/integrais/somas-de-riemann",
];
const content = (path: string) => { const [track, module, slug] = path.split("/"); return getAulaContent(track, module, slug)!; };

test("reviewed lessons expose their practice, prerequisites and valid quiz recovery anchors", () => {
  const linked = new Set<string>();
  for (const path of revised) {
    const lesson = content(path);
    assert.ok(lesson, path);
    assert.ok(lesson.exerciciosAplicados.exerciseIds.length >= 2, path);
    for (const id of lesson.exerciciosAplicados.exerciseIds) {
      assert.equal(exercicios.filter((e) => e.id === id).length, 1, id);
      linked.add(id);
    }
    for (const prereq of lesson.meta.prereqs ?? []) assert.ok(content(prereq.href.slice(1)), prereq.href);
    const anchors = new Set<string>([...sectionLinks.map((s) => s.id), ...(lesson.explicacao.rules ?? []).map((r) => `regra-${r.id}`)]);
    for (const question of lesson.quiz ?? []) if (question.reforcoSectionId) assert.ok(anchors.has(question.reforcoSectionId), question.reforcoSectionId);
  }
  assert.equal(exerciciosRevisaoCurricular.length, 23);
  for (const exercise of exerciciosRevisaoCurricular) assert.ok(linked.has(exercise.id), exercise.id);
});

test("the catalog places foundations before their uses and the express route resolves every lesson", () => {
  const order = (module: string) => calculo1Modulos.find((m) => m.slug === module)!.lessons.map((l) => l.slug);
  const before = (module: string, a: string, b: string) => {
    const slugs = order(module);
    assert.equal(slugs.filter((s) => s === a).length, 1);
    assert.ok(slugs.indexOf(a) < slugs.indexOf(b), `${a} must precede ${b}`);
  };
  before("limites", "propriedades-dos-limites", "limite-substituicao");
  before("limites", "limites-exponenciais-logaritmicos", "classificacao-indeterminacoes");
  before("derivadas", "derivada-composta", "derivada-da-inversa");
  before("integrais", "somas-de-riemann", "integral-definida");
  before("integrais", "somas-de-riemann", "tfc");
  const refs = expressStages.flatMap((s) => s.refs);
  for (const ref of refs) assert.ok(resolveExpressRef(ref), ref.aula);
  const slugs = refs.map((r) => r.aula);
  for (const prerequisite of ["fracoes-algebricas", "cancelamento-com-restricao", "racionalizacao"])
    assert.ok(slugs.indexOf(prerequisite) >= 0 && slugs.indexOf(prerequisite) < slugs.indexOf("indeterminacao-fatoracao"));
  assert.ok(slugs.includes("racionalizacao-em-limites"));
  assert.doesNotMatch(JSON.stringify(expressStages), /70%|toda P1|Estas 7 aulas/);
});

test("inverse quiz never signals readiness when the nonzero derivative condition is missed", () => {
  const quiz = content("calculo-1/derivadas/derivada-da-inversa").quiz!;
  assert.equal(quiz.length, 3);
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
    const answers = [a, b, c];
    const result = evaluateLessonQuiz(quiz, answers);
    const score = answers.filter((value, i) => value === quiz[i].corretaIndex).length;
    assert.equal(result.passed, score >= 2 && b === 1);
  }
});

function integrate(coefficients: number[], a: number, b: number) {
  return coefficients.reduce((total, coefficient, power) => total + coefficient * (b ** (power + 1) - a ** (power + 1)) / (power + 1), 0);
}
function numericAnswer(id: string) {
  const answer = exerciciosRevisaoCurricular.find((e) => e.id === id)!.resposta;
  assert.match(answer, /^-?\d+(?:\/\d+)?$/);
  const [numerator, denominator = "1"] = answer.split("/").map(Number);
  return numerator / Number(denominator);
}
test("new integral answer keys agree with direct integration of the original polynomials", () => {
  const computed: Record<string, number> = {
    "cur-sub-1": integrate([0, 2, 0, 4, 0, 2], 0, 2),
    "cur-sub-2": integrate([18, -24, 8], 0, 1),
    "cur-area-1": integrate([0, -2], -1, 0) + integrate([0, 2], 0, 1),
    "cur-area-2": integrate([0, -1, 1], -1, 0) + integrate([0, 1, -1], 0, 1),
  };
  for (const [id, value] of Object.entries(computed)) assert.ok(Math.abs(numericAnswer(id) - value) < 1e-12, id);
  const signed = integrate([0, 1, -1], 0, 2);
  const area = integrate([0, 1, -1], 0, 1) + integrate([0, -1, 1], 1, 2);
  assert.ok(Math.abs(area - 1) < 1e-12);
  assert.ok(Math.abs(Math.abs(signed) - area) > 0.3, "taking absolute value at the end loses area");
});

test("numeric limit and inverse answer keys agree with independent evaluations", () => {
  for (const x of [-1e-7, 1e-7]) {
    assert.ok(Math.abs(Math.expm1(5*x)/(2*x) - numericAnswer("cur-lim-1")) < 1e-6);
    assert.ok(Math.abs(Math.log1p(-3*x)/(2*x) - numericAnswer("cur-lim-2")) < 1e-6);
    assert.ok(Math.abs(Math.expm1(2*x)/Math.log1p(4*x) - numericAnswer("cur-lim-3")) < 1e-6);
  }
  // Compute the inverse numerically near output 12, without using the derivative-inverse formula.
  const inverse = (y: number) => {
    let lo = 1, hi = 3;
    for (let i = 0; i < 60; i++) { const x = (lo + hi)/2; if (x*x*x + 2*x < y) lo = x; else hi = x; }
    return (lo + hi)/2;
  };
  const h = 1e-4;
  assert.ok(Math.abs((inverse(12+h)-inverse(12-h))/(2*h) - numericAnswer("cur-dinv-2")) < 1e-8);
});
