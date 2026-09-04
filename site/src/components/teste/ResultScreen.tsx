import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Tag } from "@/components/ui/Tag";
import {
  scoreByTopic,
  testTopics,
  topicosParaReforcar,
  type OptionKey,
} from "@/data/teste-nivel";
import type { TesteNivelResult } from "@/lib/teste-nivel";
import { cn } from "@/lib/utils";

export function ResultScreen({
  result,
  answers,
  onRetry,
}: {
  result: TesteNivelResult;
  answers: Record<string, OptionKey>;
  onRetry: () => void;
}) {
  const byTopic = scoreByTopic(answers);
  // Módulos a reforçar, sem repetir (vários tópicos caem no mesmo módulo).
  const fracos = topicosParaReforcar(answers);
  const modulosSugeridos = fracos.filter(
    (t, i) => fracos.findIndex((o) => o.modulo.href === t.modulo.href) === i,
  );
  const firstLessonHref =
    result.prioritySkill?.href ?? result.recommendation.firstLessonHref;

  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
        <Card className="flex flex-col items-center justify-center">
          <ProgressRing
            value={result.scorePercent}
            size={120}
            label="SUA PONTUAÇÃO"
          />
          <p className="mt-3 text-center text-sm text-ink-muted">
            {result.correctCount} de {result.total} acertos
          </p>
        </Card>

        <Card>
          <Tag tone="terracotta">{result.recommendation.levelLabel}</Tag>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight">
            {result.recommendation.title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            {result.recommendation.description}
          </p>
          <p className="mt-2 text-sm font-medium text-ink">
            {result.recommendation.detail}
          </p>
          {result.prioritySkill && (
            <div className="mt-4 rounded-2 border border-amber bg-amber-soft/60 px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-ink">
                Habilidade prioritária
              </p>
              <p className="mt-1 font-semibold text-ink">
                {result.prioritySkill.label}
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                {result.prioritySkill.reason}
              </p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button
              href={`${firstLessonHref}?from=level-test&band=${result.recommendation.band}`}
              size="lg"
            >
              Começar primeira aula →
            </Button>
            <Button href={result.recommendation.href} variant="soft" size="lg">
              Ver trilha completa
            </Button>
            <Button href="/" variant="ghost" size="lg">
              Voltar ao início
            </Button>
            <Button variant="soft" size="lg" onClick={onRetry}>
              Refazer teste
            </Button>
          </div>
        </Card>
      </div>

      <section className="mt-5">
        <h3 className="font-serif text-xl font-medium tracking-tight">
          Desempenho por área
        </h3>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {testTopics.map((t) => {
            const stats = byTopic[t.id];
            const pct = stats
              ? Math.round((stats.correct / stats.total) * 100)
              : 0;
            return (
              <div
                key={t.id}
                className="rounded-2 border border-border bg-surface p-4"
              >
                <p className="text-xs text-ink-muted">{t.label}</p>
                <p className="mt-1 font-serif text-2xl font-medium">{pct}%</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-warm">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      pct >= 70 ? "bg-sage" : pct >= 40 ? "bg-amber" : "bg-terracotta",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-ink-subtle">
                  {stats?.correct ?? 0}/{stats?.total ?? 0} acertos
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {modulosSugeridos.length > 0 && (
        <section className="mt-5">
          <h3 className="font-serif text-xl font-medium tracking-tight">
            Por onde começar
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            Você acertou menos da metade nestes assuntos. Eles são o caminho mais
            curto para destravar o resto — comece por aqui, na ordem.
          </p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {modulosSugeridos.map((t, i) => (
              <a
                key={t.topic}
                href={t.modulo.href}
                className="flex items-baseline gap-3 rounded-2 border border-border bg-surface p-4 transition-colors hover:border-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <span className="font-serif text-sm italic text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-medium text-ink">
                    {t.modulo.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] text-ink-muted">
                    {t.label} · {t.correct} de {t.total} acertos
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
