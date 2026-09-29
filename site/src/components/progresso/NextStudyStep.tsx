import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { ProgressDashboard } from "@/lib/progress-dashboard";

const reasons = {
  "exercise-errors": "Reforçar uma dificuldade", "guided-errors": "Reforçar uma dificuldade",
  "checkpoint-errors": "Rever uma checagem", "level-test": "Retomar sua base",
  review: "Revisão de hoje", path: "Avançar na trilha",
} as const;

export function NextStudyStep({ dash }: { dash: ProgressDashboard }) {
  const step = dash.skillRecommendation;
  const next = dash.nextLesson;
  if (!step && !next) return <section className="rounded-2 border border-border bg-surface p-6">
    <h2 className="font-serif text-2xl">Continue praticando</h2>
    <p className="mt-2 text-ink-muted">Escolha um tema para consolidar o que aprendeu.</p>
    <Button href="/exercicios" className="mt-4">Escolher exercícios →</Button>
  </section>;
  return <section aria-label="Seu próximo passo" className="rounded-3 border border-terracotta/40 bg-terracotta-soft/30 p-6">
    <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">Seu próximo passo · {step ? reasons[step.source] : "Continuar a trilha"}</p>
    <h2 className="mt-2 font-serif text-2xl font-medium">{step?.title ?? next?.title}</h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{step?.reason ?? "Retome a próxima aula da sua trilha e avance no seu ritmo."}</p>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Button href={step?.href ?? next!.href}>Começar este passo →</Button>
      <Link href={step?.practiceHref ?? "/exercicios"} className="text-sm font-semibold text-ink-muted underline">Prefiro praticar</Link>
    </div>
    {next && step && next.href !== step.href && <p className="mt-4 text-sm text-ink-muted">Depois, continue a trilha: <Link href={next.href} className="underline">{next.title}</Link>.</p>}
  </section>;
}
