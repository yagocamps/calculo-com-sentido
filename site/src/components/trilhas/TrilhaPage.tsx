import { ModuleCard } from "@/components/trilhas/ModuleCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { TrilhaModulo } from "@/data/trilhas";
import { cn } from "@/lib/utils";

export function TrilhaPage({
  title,
  eyebrow,
  description,
  stats,
  progress,
  progressLabel,
  modules,
  dark,
}: {
  title: string;
  eyebrow: string;
  description: string;
  stats: { n: string; label: string }[];
  progress: number;
  progressLabel: string;
  modules: TrilhaModulo[];
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-[1080px]">
      <header
        className={cn(
          "relative flex gap-7 overflow-hidden rounded-3 border p-7 md:p-8",
          dark
            ? "border-transparent bg-gradient-to-br from-surface-ink to-[#3a2a1f] text-ink-on-dark"
            : "border-border bg-surface-warm",
        )}
      >
        <div className="flex-1">
          <p
            className={cn(
              "font-serif text-[13px] italic tracking-wide",
              dark ? "text-terracotta-soft" : "text-terracotta",
            )}
          >
            {eyebrow}
          </p>
          <h1
            className={cn(
              "mt-1 font-serif text-[38px] font-medium leading-tight tracking-tight",
              dark && "text-white",
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-2 max-w-[540px] text-sm leading-relaxed",
              dark ? "text-ink-on-dark/80" : "text-ink-muted",
            )}
          >
            {description}
          </p>
          <div
            className={cn(
              "mt-[18px] flex flex-wrap gap-6 border-t pt-[18px]",
              dark ? "border-white/10" : "border-border",
            )}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className={cn(
                    "font-serif text-[28px] font-medium leading-none tracking-tight",
                    dark && "text-white",
                  )}
                >
                  {s.n}
                </div>
                <div
                  className={cn(
                    "mt-1.5 text-[11.5px] uppercase tracking-wide",
                    dark ? "text-ink-on-dark/55" : "text-ink-subtle",
                  )}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden shrink-0 sm:block">
          <ProgressRing
            value={progress}
            size={112}
            color={dark ? "var(--terracotta-soft)" : "var(--terracotta)"}
            label={progressLabel}
          />
        </div>
      </header>

      <div className="mt-[22px] grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.slug ?? m.n} {...m} />
        ))}
      </div>
    </div>
  );
}
