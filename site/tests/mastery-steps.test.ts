import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MASTERY,
  buildLearningEvidence,
  lessonEvidence,
  masterySteps,
  masterySummary,
} from "@/lib/learning-evidence";
import type { ProgressState } from "@/lib/progress";

/** Aula com bastante questão conferível, para exercitar todos os critérios. */
const AULA = "calculo-1/limites/ideia-de-limite";
const AGORA = new Date("2026-09-10T12:00:00Z");
const DIA = 24 * 60 * 60 * 1000;

function estado(
  attemptHistory: ProgressState["attemptHistory"],
  completedLessons: string[] = [],
): Pick<ProgressState, "completedLessons" | "attemptHistory"> {
  return { completedLessons, attemptHistory };
}

function acerto(exerciseId: string, quandoMs: number) {
  return {
    exerciseId,
    outcome: "correct" as const,
    method: "automatic" as const,
    attemptedAt: new Date(AGORA.getTime() - quandoMs).toISOString(),
  };
}

function erro(exerciseId: string, quandoMs: number) {
  return { ...acerto(exerciseId, quandoMs), outcome: "incorrect" as const };
}

function idsDaAula(n: number): string[] {
  const skill = buildLearningEvidence(estado([]), AGORA).find((s) => s.id === AULA)!;
  assert.ok(skill.exerciseIds.length >= n, `a aula precisa de ao menos ${n} questões conferíveis`);
  return skill.exerciseIds.slice(0, n);
}

test("a explicação não pode divergir da regra: tudo cumprido equivale a Dominado", () => {
  const [a, b, c] = idsDaAula(3);
  const cenarios: [string, ProgressState["attemptHistory"]][] = [
    ["sem tentativas", []],
    ["uma questão só", [acerto(a, 3 * DIA)]],
    ["três acertos no mesmo dia", [acerto(a, 3 * DIA), acerto(b, 3 * DIA), acerto(c, 3 * DIA)]],
    ["três acertos e revisão depois de um dia", [acerto(a, 3 * DIA), acerto(b, 3 * DIA), acerto(c, 3 * DIA), acerto(a, 1 * DIA)]],
    ["revisão feita mas com erro pendente", [acerto(a, 3 * DIA), acerto(b, 3 * DIA), acerto(c, 3 * DIA), acerto(a, 1 * DIA), erro(b, 0)]],
    ["precisão baixa", [erro(a, 5 * DIA), erro(b, 5 * DIA), erro(c, 5 * DIA), erro(a, 4 * DIA), acerto(a, 3 * DIA), acerto(b, 3 * DIA), acerto(c, 3 * DIA), acerto(a, 1 * DIA)]],
  ];

  for (const [nome, historico] of cenarios) {
    const evidencia = lessonEvidence(estado(historico), AULA, AGORA)!;
    const passos = masterySteps(evidencia, AGORA);
    const todosCumpridos = passos.every((p) => p.done);
    assert.equal(
      todosCumpridos,
      evidencia.state === "Dominado",
      `${nome}: a lista diz ${todosCumpridos ? "tudo cumprido" : "falta algo"} e o estado é "${evidencia.state}"`,
    );
  }
});

test("o aluno é avisado quando o que falta é só o tempo passar", () => {
  const [a, b, c] = idsDaAula(3);
  // Os três acertos aconteceram há poucas horas: a revisão ainda não é possível.
  const evidencia = lessonEvidence(
    estado([acerto(a, 3 * 60 * 60 * 1000), acerto(b, 2 * 60 * 60 * 1000), acerto(c, 60 * 60 * 1000)]),
    AULA,
    AGORA,
  )!;
  const revisao = masterySteps(evidencia, AGORA).at(-1)!;
  assert.equal(revisao.done, false);
  assert.equal(revisao.waiting, true, "a espera precisa ser distinguida de um passo que depende de esforço");
  assert.match(revisao.status, /amanhã/);
  assert.match(masterySummary(evidencia, AGORA), /^Falta só a revisão/);
});

test("uma aula sem questões conferíveis suficientes diz isso em vez de pedir o impossível", () => {
  const curtas = buildLearningEvidence(estado([]), AGORA).filter(
    (s) => s.exerciseIds.length < MASTERY.questoesCorretas,
  );
  assert.ok(curtas.length > 0, "o cenário existe no catálogo e precisa ser comunicado");
  for (const skill of curtas) {
    const primeiro = masterySteps(skill, AGORA)[0];
    assert.equal(primeiro.blocked, true, `${skill.id}: o critério é inalcançável e deveria estar marcado`);
    assert.match(primeiro.status, /o critério pede 3/);
    // Não promete um caminho que a página não tem: o link para o banco só
    // aparece quando o módulo realmente tem tema lá.
    assert.match(masterySummary(skill, AGORA), /não é medido nesta aula/);
  }
});

test("autoavaliação não conta como evidência", () => {
  const [a, b, c] = idsDaAula(3);
  const autoavaliados = [a, b, c].map((id) => ({
    ...acerto(id, 3 * DIA),
    method: "self-assessment" as const,
  }));
  const evidencia = lessonEvidence(estado(autoavaliados), AULA, AGORA)!;
  assert.equal(evidencia.correctCount, 0);
  assert.match(masterySteps(evidencia, AGORA)[0].status, /0 de 3/);
});

test("a aula dominada é anunciada sem lista de pendências", () => {
  const [a, b, c] = idsDaAula(3);
  const evidencia = lessonEvidence(
    estado([acerto(a, 5 * DIA), acerto(b, 5 * DIA), acerto(c, 5 * DIA), acerto(a, 1 * DIA)]),
    AULA,
    AGORA,
  )!;
  assert.equal(evidencia.state, "Dominado");
  assert.equal(masterySummary(evidencia, AGORA), "Assunto dominado.");
});
