import { calculo1Modulos } from "@/data/calculo-1";
import { preCalculoModulos } from "@/data/pre-calculo";
import { moduleCheckpoints } from "@/data/checkpoints";
import { exercicios, type ExerciseType } from "@/data/exercicios";
import { getAulaContent } from "@/lib/aulas";
import type { AulaExercise } from "@/data/aulas/types";
import { checkAnswer, type CheckResult } from "@/lib/answer-check";
import { restoreCheckpoint } from "@/lib/checkpoint";

export type AssessmentMethod = "automatic" | "self-assessment" | "choice";
export type LearningItem = {
  id: string; source: "bank" | "guided" | "checkpoint"; title: string;
  tema: string; temaSlug: string; type: ExerciseType; href: string; lessonHref?: string;
  exercise?: AulaExercise;
  critical?: boolean;
};
export const guidedAttemptId = (lessonId: string, exerciseId: string) => `guided:${lessonId}:${exerciseId}`;
export const checkpointAttemptId = (moduleId: string, index: number) => `checkpoint:${moduleId}:${index}`;
export const guidedAnchor = (exerciseId: string) => `exercicio-${exerciseId}`;
export const guidedSignature = (exercise: AulaExercise) => JSON.stringify([exercise.enunciado, exercise.resposta, exercise.answerCheck ?? null]);

let catalog: Map<string, LearningItem> | undefined;
export function getLearningItem(id: string): LearningItem | undefined {
  if (!catalog) {
    catalog = new Map(exercicios.map((e) => [e.id, { id: e.id, source: "bank" as const, title: e.title,
      tema: e.tema, temaSlug: e.temaSlug, type: e.type, href: `/exercicios?id=${encodeURIComponent(e.id)}` }]));
    for (const [track, modules] of [["pre-calculo", preCalculoModulos], ["calculo-1", calculo1Modulos]] as const) {
      for (const modulo of modules) for (const lesson of modulo.lessons) {
        const lessonId = `${track}/${modulo.slug}/${lesson.slug}`;
        const content = getAulaContent(track, modulo.slug, lesson.slug);
        for (const exercise of content?.exerciciosGuiados.exercises ?? []) {
          const id = guidedAttemptId(lessonId, exercise.id);
          catalog.set(id, { id, source: "guided", title: `${lesson.title} · exercício guiado`,
            tema: modulo.title, temaSlug: modulo.slug === "funcoes-para-calculo" ? "funcoes-calculo" : modulo.slug,
            type: exercise.type, href: `/${lessonId}#${guidedAnchor(exercise.id)}`, lessonHref: `/${lessonId}`, exercise });
        }
      }
    }
    for (const [moduleId, checkpoint] of Object.entries(moduleCheckpoints)) checkpoint.questions.forEach((question, index) => {
      const id = checkpointAttemptId(moduleId, index);
      const lessonId = question.reviewHref.slice(1).split("#")[0];
      const [track, moduleSlug, slug] = lessonId.split("/");
      const content = getAulaContent(track, moduleSlug, slug);
      catalog!.set(id, { id, source: "checkpoint", title: `${checkpoint.title} · questão ${index + 1}`,
        tema: content?.meta.moduleTitle ?? moduleSlug, temaSlug: moduleSlug === "funcoes-para-calculo" ? "funcoes-calculo" : moduleSlug,
        type: "compreensao", href: `/${moduleId}#checkpoint`, lessonHref: question.reviewHref, critical: question.critical });
    });
  }
  return catalog.get(id);
}

export type GuidedRecord = { signature: string; attempt: string; result: CheckResult; method: "automatic" | "self-assessment"; updatedAt: string };
export type CheckpointRecord = { version: 2; signature: string; answers: Record<number, number>; completedAt: string };
export type GuidedRecords = Record<string, GuidedRecord>;
export type CheckpointRecords = Record<string, CheckpointRecord>;

export function normalizeGuidedRecords(raw: unknown): GuidedRecords {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const result: GuidedRecords = {};
  for (const [id, value] of Object.entries(raw)) {
    const exercise = getLearningItem(id)?.exercise;
    const record = value as Partial<GuidedRecord> | null;
    if (!exercise || !record || record.signature !== guidedSignature(exercise) || typeof record.attempt !== "string" ||
      !record.attempt.trim() || record.attempt.length > 2000 || typeof record.updatedAt !== "string" ||
      !Number.isFinite(Date.parse(record.updatedAt))) continue;
    const checked = checkAnswer(record.attempt, exercise.resposta, exercise.answerCheck);
    const manual = record.method === "self-assessment" && checked === "manual" &&
      (record.result === "correct" || record.result === "incorrect");
    if (!manual && record.method !== "automatic") continue;
    result[id] = { signature: record.signature, attempt: record.attempt,
      result: manual ? record.result! : checked, method: manual ? "self-assessment" : "automatic", updatedAt: record.updatedAt };
  }
  return result;
}

export function normalizeCheckpointRecords(raw: unknown): CheckpointRecords {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const records: CheckpointRecords = {};
  for (const [id, value] of Object.entries(raw)) {
    const data = moduleCheckpoints[id];
    const record = value as Partial<CheckpointRecord> | null;
    if (!data || !record || typeof record.completedAt !== "string" || !Number.isFinite(Date.parse(record.completedAt))) continue;
    const answers = restoreCheckpoint(data, JSON.stringify(record));
    if (answers) records[id] = { version: 2, signature: JSON.stringify(data.questions), answers, completedAt: record.completedAt };
  }
  return records;
}
