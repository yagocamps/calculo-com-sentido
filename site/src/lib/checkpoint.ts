import type { ModuleCheckpointData } from "@/data/checkpoints";

export function evaluateCheckpoint(data: ModuleCheckpointData, answers: Record<number, number>) {
  const correct = data.questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const complete = data.questions.length > 0 && data.questions.every((q, i) =>
    Number.isInteger(answers[i]) && answers[i] >= 0 && answers[i] < q.options.length,
  );
  const criticalErrors = data.questions.flatMap((q, i) =>
    q.critical && answers[i] !== q.correctIndex ? [i] : [],
  );
  const ratio = data.questions.length ? correct / data.questions.length : 0;
  return {
    correct,
    complete,
    percent: Math.round(ratio * 100),
    criticalErrors,
    passed: complete && ratio * 100 >= data.passPercent && criticalErrors.length === 0,
  };
}

/** Old score-only records cannot prove mastery of the current questions. */
export function restoreCheckpoint(data: ModuleCheckpointData, raw: string | null): Record<number, number> | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (value?.version !== 2 || value.signature !== JSON.stringify(data.questions) ||
        !value.answers || typeof value.answers !== "object" || Array.isArray(value.answers)) return null;
    const answers = Object.fromEntries(data.questions.map((_, i) => [i, value.answers[i]]));
    return evaluateCheckpoint(data, answers).complete ? answers : null;
  } catch {
    return null;
  }
}
