import { exercicios, type Exercicio } from "@/data/exercicios";
import { pedagogicalLevelOf } from "@/lib/exercicios";

export type AdaptiveAnswer = {
  exerciseId: string;
  outcome: "correct" | "incorrect";
  attempt: string;
  method: "automatic" | "self-assessment";
};
export type AdaptiveSession = {
  version: 1;
  id: string;
  startedAt: string;
  temaSlug: string;
  targetCount: number;
  currentId: string;
  answers: AdaptiveAnswer[];
};

export function createAdaptiveSession(seedId: string, id: string, now = new Date(), bank = exercicios): AdaptiveSession | null {
  const seed = bank.find((e) => e.id === seedId);
  if (!seed) return null;
  return { version: 1, id, startedAt: now.toISOString(), temaSlug: seed.temaSlug,
    targetCount: Math.min(5, bank.filter((e) => e.temaSlug === seed.temaSlug).length),
    currentId: seed.id, answers: [] };
}

export function answerAdaptiveSession(session: AdaptiveSession, answer: AdaptiveAnswer): AdaptiveSession {
  if (answer.exerciseId !== session.currentId || session.answers.length >= session.targetCount ||
      session.answers.some((a) => a.exerciseId === answer.exerciseId)) return session;
  return { ...session, answers: [...session.answers, { ...answer, attempt: answer.attempt.slice(0, 2000) }] };
}

export function nextAdaptiveExercise(session: AdaptiveSession, completed: string[] = [], bank: Exercicio[] = exercicios): Exercicio | null {
  if (session.answers.length >= session.targetCount) return null;
  const answer = session.answers.find((a) => a.exerciseId === session.currentId);
  const current = bank.find((e) => e.id === session.currentId);
  if (!answer || !current) return null;
  const target = Math.max(1, Math.min(5, pedagogicalLevelOf(current) + (answer.outcome === "correct" ? 1 : -1)));
  const seen = new Set(session.answers.map((a) => a.exerciseId));
  return bank.filter((e) => e.temaSlug === session.temaSlug && !seen.has(e.id))
    .sort((a, b) => Math.abs(pedagogicalLevelOf(a) - target) - Math.abs(pedagogicalLevelOf(b) - target) ||
      Number(completed.includes(a.id)) - Number(completed.includes(b.id)) || a.id.localeCompare(b.id))[0] ?? null;
}

export function normalizeAdaptiveSession(raw: unknown, bank = exercicios): AdaptiveSession | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const value = raw as Partial<AdaptiveSession>;
  const current = bank.find((e) => e.id === value.currentId && e.temaSlug === value.temaSlug);
  if (value.version !== 1 || typeof value.id !== "string" || !value.id.length || value.id.length > 100 ||
      typeof value.startedAt !== "string" || !Number.isFinite(Date.parse(value.startedAt)) || !current ||
      value.targetCount !== Math.min(5, bank.filter((e) => e.temaSlug === value.temaSlug).length) ||
      !Array.isArray(value.answers) || value.answers.length > value.targetCount!) return undefined;
  const ids = new Set<string>();
  for (const answer of value.answers) {
    if (!answer || !bank.some((e) => e.id === answer.exerciseId && e.temaSlug === value.temaSlug) ||
        ids.has(answer.exerciseId) || !["correct", "incorrect"].includes(answer.outcome) ||
        !["automatic", "self-assessment"].includes(answer.method) || typeof answer.attempt !== "string" ||
        answer.attempt.length > 2000) return undefined;
    ids.add(answer.exerciseId);
  }
  if (ids.has(current.id) && value.answers.at(-1)?.exerciseId !== current.id) return undefined;
  if (value.answers.length === value.targetCount && !ids.has(current.id)) return undefined;
  return { version: 1, id: value.id, startedAt: value.startedAt, temaSlug: current.temaSlug,
    targetCount: value.targetCount!, currentId: current.id, answers: value.answers.map((a) => ({ ...a })) };
}
