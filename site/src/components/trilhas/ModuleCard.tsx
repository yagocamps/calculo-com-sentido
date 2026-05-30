import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

export type ModuleState = "done" | "current" | "open" | "locked";

export function ModuleCard({
  n,
  title,
  desc,
  state,
  lessons,
  progress,
  apps,
  href,
}: {
  n: number;
  title: string;
  desc: string;
  state: ModuleState;
  lessons: number;
  progress: number;
  apps: string[];
  href?: string;
}) {
  const clickable = href && state !== "locked";
  const badge =
    state === "done" ? (
      <Tag tone="sage">✓ Concluído</Tag>
    ) : state === "current" ? (
      <Tag tone="terracotta">● Em curso</Tag>
    ) : state === "open" ? (
      <Tag tone="sky">Disponível</Tag>
    ) : (
      <Tag tone="muted">🔒 Em breve</Tag>
    );

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-serif text-[13px] italic text-ink-subtle">
          Módulo {n}
        </span>
        {badge}
      </div>
      <h3 className="font-serif text-xl font-medium leading-tight tracking-tight">
        {title}
      </h3>
      <p className="text-[13px] leading-relaxed text-ink-muted">{desc}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {apps.map((a) => (
          <span
            key={a}
            className="rounded-full border border-border-soft bg-surface-warm px-2 py-0.5 text-[11px] text-ink-muted"
          >
            {a}
          </span>
        ))}
      </div>
      {state !== "locked" && (
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-warm">
          <div
            className="h-full rounded-full bg-terracotta"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="mt-auto flex items-center justify-between border-t border-dashed border-border-soft pt-3 text-xs text-ink-subtle">
        <span>{lessons} aulas</span>
        <span className="font-semibold text-ink">
          {state === "done"
            ? "Revisar"
            : state === "locked"
              ? "—"
              : "Continuar →"}
        </span>
      </div>
    </>
  );

  if (clickable) {
    return (
      <Link
        href={href}
        className="relative flex flex-col gap-2.5 overflow-hidden rounded-2 border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        {inner}
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "relative flex flex-col gap-2.5 overflow-hidden rounded-2 border border-border bg-surface p-5 shadow-sm",
        state === "locked" && "opacity-[0.62]",
      )}
    >
      {inner}
    </article>
  );
}
