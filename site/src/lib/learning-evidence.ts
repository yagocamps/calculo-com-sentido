import { calculo1Modulos } from "@/data/calculo-1";
import { preCalculoModulos } from "@/data/pre-calculo";
import { getAulaContent } from "@/lib/aulas";
import { guidedAttemptId } from "@/lib/learning-assessments";
import type { ProgressState } from "@/lib/progress";

export const evidenceSkills = [
  ...preCalculoModulos.flatMap(m => m.lessons.map(l => ({ ...l, id: `pre-calculo/${m.slug}/${l.slug}`, track: "pre-calculo", module: m.slug }))),
  ...calculo1Modulos.flatMap(m => m.lessons.map(l => ({ ...l, id: `calculo-1/${m.slug}/${l.slug}`, track: "calculo-1", module: m.slug }))),
].map(l => {
  const c = getAulaContent(l.track, l.module, l.slug);
  return { id: l.id, title: c?.meta.title ?? l.title, href: `/${l.id}`,
    exerciseIds: [...(c?.exerciciosAplicados.exerciseIds ?? []), ...(c?.exerciciosGuiados.exercises ?? []).map(e => guidedAttemptId(l.id, e.id))],
    prerequisites: (c?.meta.prereqs ?? []).map(p => p.href.slice(1)).filter(p => p.split("/").length === 3),
  };
});

const skillsByExercise = new Map<string, string[]>();
for (const skill of evidenceSkills) for (const id of skill.exerciseIds) {
  skillsByExercise.set(id, [...(skillsByExercise.get(id) ?? []), skill.id]);
}
export const exerciseSkillIds = (id: string) => skillsByExercise.get(id) ?? [];

/**
 * Os quatro limiares do domínio, num lugar só. A interface explica o critério
 * ao aluno a partir daqui (ver `masterySteps`), de modo que a regra e o que
 * ele lê não podem divergir.
 */
export const MASTERY = {
  /** Questões distintas cuja última tentativa conferida foi um acerto. */
  questoesCorretas: 3,
  /** Acerto mínimo nas tentativas recentes, em porcentagem. */
  precisaoMinima: 80,
  /** Quantas tentativas recentes entram no cálculo da precisão. */
  janelaRecente: 10,
  /** Espera até que reacertar uma questão conte como revisão. */
  intervaloRevisaoMs: 24 * 60 * 60 * 1000,
} as const;

type Evento = ProgressState["attemptHistory"][number];

function evidenciaDaHabilidade(
  skill: (typeof evidenceSkills)[number],
  events: Evento[],
  completedLessons: string[],
  now: Date,
) {
  const history = events.filter(e => skill.exerciseIds.includes(e.exerciseId));
  const recent = history.slice(-MASTERY.janelaRecente);
  const latest = new Map(history.map(e => [e.exerciseId,e]));
  const correct = [...latest.values()].filter(e => e.outcome === "correct");
  const unresolved = [...latest.values()].filter(e => e.outcome === "incorrect");
  const initialSuccesses = new Set<string>();
  let foundationAt: number | undefined;
  let reviewed = false;
  for (const e of history) {
    if (e.outcome !== "correct") continue;
    const time = Date.parse(e.attemptedAt);
    if (foundationAt !== undefined && time - foundationAt >= MASTERY.intervaloRevisaoMs && initialSuccesses.has(e.exerciseId)) reviewed = true;
    initialSuccesses.add(e.exerciseId);
    if (foundationAt === undefined && initialSuccesses.size >= MASTERY.questoesCorretas) foundationAt = time;
  }
  const accuracy = recent.length ? Math.round(100 * recent.filter(e => e.outcome === "correct").length / recent.length) : null;
  const mastered = correct.length >= MASTERY.questoesCorretas && reviewed &&
    accuracy !== null && accuracy >= MASTERY.precisaoMinima && unresolved.length === 0;
  return { ...skill, state: mastered ? "Dominado" as const : completedLessons.includes(skill.id) || history.length ? "Estudado" as const : "Não estudado" as const,
    accuracy, correctCount: correct.length, reviewed: Boolean(reviewed),
    /** Quando reacertar passa a valer como revisão. Ausente se a base ainda não foi formada. */
    reviewableAt: foundationAt === undefined ? undefined : new Date(foundationAt + MASTERY.intervaloRevisaoMs).toISOString(),
    dueErrors: unresolved.filter(e => now.getTime() - Date.parse(e.attemptedAt) >= MASTERY.intervaloRevisaoMs).map(e => e.exerciseId),
    unresolved: unresolved.length };
}

export type SkillEvidence = ReturnType<typeof evidenciaDaHabilidade>;

function conferidos(state: Pick<ProgressState, "attemptHistory">, now: Date): Evento[] {
  return state.attemptHistory.filter(e => ["automatic", "choice"].includes(e.method ?? "") &&
    Number.isFinite(Date.parse(e.attemptedAt)) && Date.parse(e.attemptedAt) <= now.getTime())
    .sort((a,b) => Date.parse(a.attemptedAt) - Date.parse(b.attemptedAt));
}

export function buildLearningEvidence(state: Pick<ProgressState, "completedLessons" | "attemptHistory">, now = new Date()) {
  const events = conferidos(state, now);
  return evidenceSkills.map(skill => evidenciaDaHabilidade(skill, events, state.completedLessons, now));
}

/** Evidência de uma aula só — para mostrar o andamento na própria página dela. */
export function lessonEvidence(
  state: Pick<ProgressState, "completedLessons" | "attemptHistory">,
  lessonId: string,
  now = new Date(),
): SkillEvidence | undefined {
  const skill = evidenceSkills.find(s => s.id === lessonId);
  if (!skill) return undefined;
  return evidenciaDaHabilidade(skill, conferidos(state, now), state.completedLessons, now);
}

export type MasteryStep = {
  /** Critério já cumprido. */
  done: boolean;
  /** O que o critério pede. */
  label: string;
  /** Onde o aluno está, ou o que fazer agora. */
  status: string;
  /** Depende do tempo passar, não de esforço — não adianta insistir hoje. */
  waiting?: boolean;
  /** A aula não tem questões conferíveis suficientes; o critério é inalcançável nela. */
  blocked?: boolean;
};

function quandoRevisar(reviewableAt: string, now: Date): string {
  const alvo = new Date(reviewableAt);
  const dias = Math.ceil((alvo.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  if (dias <= 0) return "já pode ser feita: refaça uma das questões que você acertou";
  if (dias === 1) return "volte amanhã e refaça uma das questões que você acertou";
  return `volte a partir de ${alvo.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })} e refaça uma das questões que você acertou`;
}

/**
 * Traduz o critério de domínio no que falta para esta habilidade.
 *
 * Sem isto o aluno responde tudo certo e o estado continua em "Estudado" sem
 * explicação — inclusive quando o que falta é só o tempo passar, ou quando a
 * aula nem tem questões conferíveis suficientes para o critério ser possível.
 */
export function masterySteps(skill: SkillEvidence, now = new Date()): MasteryStep[] {
  const disponiveis = skill.exerciseIds.length;
  const faltamCorretas = MASTERY.questoesCorretas - skill.correctCount;

  return [
    {
      done: skill.correctCount >= MASTERY.questoesCorretas,
      blocked: disponiveis < MASTERY.questoesCorretas,
      label: `Acertar ${MASTERY.questoesCorretas} questões conferidas`,
      status:
        disponiveis < MASTERY.questoesCorretas
          ? `esta aula tem ${disponiveis} ${disponiveis === 1 ? "questão conferível" : "questões conferíveis"} e o critério pede ${MASTERY.questoesCorretas}`
          : skill.correctCount >= MASTERY.questoesCorretas
            ? `${skill.correctCount} questões com acerto`
            : `${skill.correctCount} de ${MASTERY.questoesCorretas} — ${faltamCorretas === 1 ? "falta 1" : `faltam ${faltamCorretas}`}`,
    },
    {
      done: skill.unresolved === 0,
      label: "Não deixar erro pendente",
      status:
        skill.unresolved === 0
          ? "nenhum erro em aberto"
          : `${skill.unresolved} ${skill.unresolved === 1 ? "questão continua errada" : "questões continuam erradas"} — refaça`,
    },
    {
      done: skill.accuracy !== null && skill.accuracy >= MASTERY.precisaoMinima,
      label: `Manter ${MASTERY.precisaoMinima}% de acerto nas tentativas recentes`,
      status:
        skill.accuracy === null
          ? "nenhuma tentativa conferida ainda"
          : `você está em ${skill.accuracy}%`,
    },
    {
      done: skill.reviewed,
      waiting: !skill.reviewed && skill.reviewableAt !== undefined && new Date(skill.reviewableAt) > now,
      label: "Reacertar uma delas pelo menos um dia depois",
      status: skill.reviewed
        ? "revisão registrada"
        : skill.reviewableAt === undefined
          ? `liberado depois que você acertar as ${MASTERY.questoesCorretas} primeiras`
          : quandoRevisar(skill.reviewableAt, now),
    },
  ];
}

/** Uma linha só: o próximo passo para dominar, ou o estado atual. */
export function masterySummary(skill: SkillEvidence, now = new Date()): string {
  if (skill.state === "Dominado") return "Assunto dominado.";
  const passos = masterySteps(skill, now);
  const bloqueado = passos.find(p => p.blocked);
  // Não dá para "dominar" aqui pelo critério atual — dizer isso é mais honesto
  // do que listar pendências que o aluno não tem como cumprir nesta página.
  if (bloqueado) return `Por enquanto o domínio não é medido nesta aula: ${bloqueado.status}.`;
  const pendente = passos.find(p => !p.done);
  if (!pendente) return "Assunto dominado.";
  return pendente.waiting
    ? `Falta só a revisão — ${pendente.status}.`
    : `Para dominar: ${pendente.label.toLowerCase()} (${pendente.status}).`;
}

/** Só atribui erro a pré-requisito quando há evidência de erro nesse pré-requisito. */
export function prerequisiteRecovery(state: Pick<ProgressState, "completedLessons" | "attemptHistory">, now = new Date()) {
  const evidence = buildLearningEvidence(state, now);
  const failed = evidence.filter(s => s.unresolved > 0);
  for (const current of failed) {
    const visited = new Set<string>();
    const walk = (id: string): typeof current | undefined => {
      if (visited.has(id)) return;
      visited.add(id);
      const skill = evidence.find(s => s.id === id);
      if (!skill) return;
      for (const prereq of skill.prerequisites) { const earlier = walk(prereq); if (earlier) return earlier; }
      return skill.unresolved > 0 && id !== current.id ? skill : undefined;
    };
    const prerequisite = walk(current.id);
    if (prerequisite) return { current, prerequisite };
  }
  return null;
}
