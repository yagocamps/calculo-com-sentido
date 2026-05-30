import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Tag } from "@/components/ui/Tag";
import { scoreByTopic, testTopics, type OptionKey } from "@/data/teste-nivel";
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
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button href={result.recommendation.href} size="lg">
              {result.recommendation.cta} →
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
    </div>
  );
}
