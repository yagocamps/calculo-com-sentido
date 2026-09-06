import { calculo1Modulos } from "@/data/calculo-1";
import { preCalculoModulos } from "@/data/pre-calculo";
import { exercicios } from "@/data/exercicios";

export type StudyPlanSession = {
  id: string;
  week: number;
  slot: number;
  date: string;
  title: string;
  reason: string;
  href: string;
  kind: "lesson" | "practice" | "review";
  completed: boolean;
};
export type StudyPlan = {
  durationWeeks: 2 | 4 | 8;
  sessionsPerWeek: 3 | 4 | 5;
  minutesPerSession: 15 | 25 | 40;
  startedAt: string;
  sessions?: StudyPlanSession[];
};

const lessons = [
  ...preCalculoModulos.flatMap((m) => m.lessons.filter((l) => l.available).map((l) => ({ id: `pre-calculo/${m.slug}/${l.slug}`, title: l.title, module: m.slug }))),
  ...calculo1Modulos.flatMap((m) => m.lessons.filter((l) => l.available).map((l) => ({ id: `calculo-1/${m.slug}/${l.slug}`, title: l.title, module: m.slug }))),
];

export function validPlanDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return Number.isFinite(date.getTime()) && formatDate(date) === value;
}
function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** A fixed itinerary: later progress updates cannot silently replace completed sessions. */
export function createStudyPlanSessions(plan: StudyPlan, completedLessons: string[] = [], priorityHref?: string): StudyPlanSession[] {
  const priority = lessons.find((l) => `/${l.id}` === priorityHref);
  const remaining = lessons.filter((l) => !completedLessons.includes(l.id) && l.id !== priority?.id);
  const queue = priority ? [priority, ...remaining] : remaining.length ? remaining : lessons;
  const sessions: StudyPlanSession[] = [];
  let cursor = 0;
  let current = queue[0];
  for (let week = 1; week <= plan.durationWeeks; week++) {
    for (let slot = 1; slot <= plan.sessionsPerWeek; slot++) {
      const kind = slot === plan.sessionsPerWeek ? "review" : slot % 2 ? "lesson" : "practice";
      if (kind === "lesson") current = queue[Math.min(cursor++, queue.length - 1)];
      const topic = current.module === "funcoes-para-calculo" ? "funcoes-calculo" : current.module;
      const seed = exercicios.find((e) => e.temaSlug === topic);
      const actualKind = kind === "practice" && !seed ? "review" : kind;
      const date = new Date(plan.startedAt);
      date.setDate(date.getDate() + (week - 1) * 7 + Math.floor((slot - 1) * 7 / plan.sessionsPerWeek));
      sessions.push({ id: `w${week}-s${slot}`, week, slot, date: formatDate(date), kind: actualKind, completed: false,
        title: actualKind === "practice" ? `Pratique: ${current.title}` : current.title,
        reason: actualKind === "lesson" ? "Estude a explicação e tente os exercícios guiados; use a próxima sessão se precisar de mais tempo."
          : actualKind === "practice" ? "Cinco questões do tema, com ajuste após cada resposta."
            : "Retome sem olhar a solução, confira as condições e reveja os erros da semana.",
        href: actualKind === "practice" ? `/exercicios?id=${encodeURIComponent(seed!.id)}&session=adaptativa` : `/${current.id}` });
    }
  }
  return sessions;
}

export function normalizeStudyPlan(raw: unknown): StudyPlan | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const value = raw as Partial<StudyPlan>;
  if (![2, 4, 8].includes(value.durationWeeks ?? 0) || ![3, 4, 5].includes(value.sessionsPerWeek ?? 0) ||
      ![15, 25, 40].includes(value.minutesPerSession ?? 0) || typeof value.startedAt !== "string" ||
      !Number.isFinite(Date.parse(value.startedAt))) return undefined;
  const plan: StudyPlan = { durationWeeks: value.durationWeeks!, sessionsPerWeek: value.sessionsPerWeek!,
    minutesPerSession: value.minutesPerSession!, startedAt: value.startedAt };
  const generated = createStudyPlanSessions(plan);
  const validHref = (href: string) => lessons.some((l) => href === `/${l.id}`) ||
    exercicios.some((e) => href === `/exercicios?id=${encodeURIComponent(e.id)}&session=adaptativa`);
  plan.sessions = generated.map((fallback) => {
    const item = Array.isArray(value.sessions) ? value.sessions.find((s) => s?.id === fallback.id) : undefined;
    if (!item || item.week !== fallback.week || item.slot !== fallback.slot || typeof item.date !== "string" ||
        !validPlanDate(item.date) || typeof item.href !== "string" || !validHref(item.href) ||
        typeof item.title !== "string" || typeof item.reason !== "string" ||
        !["lesson", "practice", "review"].includes(item.kind)) return fallback;
    return { ...fallback, date: item.date, href: item.href, title: item.title.slice(0, 200),
      reason: item.reason.slice(0, 500), kind: item.kind, completed: item.completed === true };
  });
  return plan;
}
