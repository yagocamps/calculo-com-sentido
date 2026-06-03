import { Card } from "@/components/ui/Card";
import {
  testQuestions,
  testTopics,
  type TopicId,
} from "@/data/teste-nivel";
import { cn } from "@/lib/utils";

type TopicState = "done" | "current" | "pending";

function topicState(topicId: TopicId, currentIndex: number): TopicState {
  const indices = testQuestions
    .map((q, i) => (q.topic === topicId ? i : -1))
    .filter((i) => i >= 0);
  const lastIndex = Math.max(...indices);
  const firstIndex = Math.min(...indices);

  if (currentIndex > lastIndex) return "done";
  if (currentIndex >= firstIndex && currentIndex <= lastIndex) return "current";
  return "pending";
}

export function TopicsSidebar({ currentIndex }: { currentIndex: number }) {
  return (
    <aside className="flex flex-col gap-3.5">
      <Card>
        <h3 className="mb-2.5 font-serif text-base font-medium">
          Tópicos avaliados
        </h3>
        <ul className="flex flex-col gap-0.5">
          {testTopics.map((t) => {
            const state = topicState(t.id, currentIndex);
            return (
              <li
                key={t.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px]",
                  state === "current" &&
                    "border border-border bg-surface-soft font-semibold text-ink",
                  state === "done" && "text-ink-muted",
                  state === "pending" && "font-medium text-ink",
                )}
              >
                <span
                  className={cn(
                    "grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-[11px] font-bold text-bg",
                    state === "done" && "bg-sage",
                    state === "current" && "bg-terracotta",
                    state === "pending" && "border border-border bg-surface-warm text-transparent",
                  )}
                >
                  {state === "done" ? "✓" : ""}
                </span>
                {t.label}
              </li>
            );
          })}
        </ul>
      </Card>

      <Card>
        <h3 className="mb-2.5 font-serif text-base font-medium">
          O que acontece depois
        </h3>
        <ol className="list-decimal space-y-1 pl-4 text-[13px] leading-relaxed text-ink-muted">
          <li>Veja sua pontuação por área</li>
          <li>Receba uma trilha recomendada</li>
          <li>Comece pela aula certa para você</li>
        </ol>
      </Card>
    </aside>
  );
}
