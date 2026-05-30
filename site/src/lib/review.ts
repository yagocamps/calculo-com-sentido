/**
 * Revisão espaçada (Plano Mestre, Seção 22 e 46).
 *
 * Modelo Leitner simplificado: cada aula concluída entra numa "caixa".
 * Acertar ("Lembrei") sobe de caixa e adia a próxima revisão; errar
 * ("Esqueci") volta para a caixa 0. O intervalo cresce a cada caixa.
 */

export type ReviewItem = {
  /** Caixa atual (0..INTERVALS.length-1). */
  box: number;
  /** Próxima revisão (ISO date). */
  due: string;
  /** Última revisão/agendamento (ISO date). */
  last: string;
};

export type ReviewMap = Record<string, ReviewItem>;

export type ReviewResult = "good" | "again";

/** Intervalos em dias por caixa. */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 16, 35, 75];

function addDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

export function nextDue(box: number, from: Date = new Date()): string {
  const idx = Math.min(Math.max(box, 0), REVIEW_INTERVALS_DAYS.length - 1);
  return addDays(from, REVIEW_INTERVALS_DAYS[idx]).toISOString();
}

/** Agenda a primeira revisão ao concluir uma aula. */
export function seedReview(from: Date = new Date()): ReviewItem {
  return { box: 0, due: nextDue(0, from), last: from.toISOString() };
}

export function applyReview(
  item: ReviewItem | undefined,
  result: ReviewResult,
  now: Date = new Date(),
): ReviewItem {
  const currentBox = item?.box ?? 0;
  const box =
    result === "good"
      ? Math.min(currentBox + 1, REVIEW_INTERVALS_DAYS.length - 1)
      : 0;
  return { box, due: nextDue(box, now), last: now.toISOString() };
}

export function isDue(
  item: ReviewItem | undefined,
  now: Date = new Date(),
): boolean {
  // Sem agendamento (aula concluída antes do recurso) = revisar agora.
  if (!item) return true;
  return new Date(item.due).getTime() <= now.getTime();
}

export function normalizeReviews(raw: unknown): ReviewMap {
  if (!raw || typeof raw !== "object") return {};
  const out: ReviewMap = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const v = value as Partial<ReviewItem>;
    if (
      typeof v.box === "number" &&
      typeof v.due === "string" &&
      typeof v.last === "string"
    ) {
      out[key] = { box: v.box, due: v.due, last: v.last };
    }
  }
  return out;
}
