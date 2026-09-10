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

export function buildLearningEvidence(state: Pick<ProgressState, "completedLessons" | "attemptHistory">, now = new Date()) {
  const events = state.attemptHistory.filter(e => ["automatic", "choice"].includes(e.method ?? "") &&
    Number.isFinite(Date.parse(e.attemptedAt)) && Date.parse(e.attemptedAt) <= now.getTime())
    .sort((a,b) => Date.parse(a.attemptedAt) - Date.parse(b.attemptedAt));
  return evidenceSkills.map(skill => {
    const history = events.filter(e => skill.exerciseIds.includes(e.exerciseId));
    const recent = history.slice(-10);
    const latest = new Map(history.map(e => [e.exerciseId,e]));
    const correct = [...latest.values()].filter(e => e.outcome === "correct");
    const unresolved = [...latest.values()].filter(e => e.outcome === "incorrect");
    const initialSuccesses = new Set<string>();
    let foundationAt: number | undefined;
    let reviewed = false;
    for (const e of history) {
      if (e.outcome !== "correct") continue;
      const time = Date.parse(e.attemptedAt);
      if (foundationAt !== undefined && time - foundationAt >= 86400000 && initialSuccesses.has(e.exerciseId)) reviewed = true;
      initialSuccesses.add(e.exerciseId);
      if (foundationAt === undefined && initialSuccesses.size >= 3) foundationAt = time;
    }
    const accuracy = recent.length ? Math.round(100 * recent.filter(e => e.outcome === "correct").length / recent.length) : null;
    const mastered = correct.length >= 3 && reviewed && accuracy !== null && accuracy >= 80 && unresolved.length === 0;
    return { ...skill, state: mastered ? "Dominado" as const : state.completedLessons.includes(skill.id) || history.length ? "Estudado" as const : "Não estudado" as const,
      accuracy, correctCount: correct.length, reviewed: Boolean(reviewed),
      dueErrors: unresolved.filter(e => now.getTime() - Date.parse(e.attemptedAt) >= 86400000).map(e => e.exerciseId),
      unresolved: unresolved.length };
  });
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
