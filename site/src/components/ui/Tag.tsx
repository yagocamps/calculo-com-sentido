import { cn } from "@/lib/utils";

type TagTone = "sky" | "sage" | "terracotta" | "amber" | "verde" | "muted";

const tones: Record<TagTone, string> = {
  sky: "bg-sky-soft text-sky-ink",
  sage: "bg-sage-soft text-sage-ink",
  terracotta: "bg-terracotta-soft text-terracotta-ink",
  amber: "bg-amber-soft text-amber-ink",
  verde: "bg-verde-soft text-verde-ink",
  muted: "bg-surface-warm text-ink-muted",
};

export function Tag({
  children,
  tone = "sky",
  className,
}: {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LevelTag({
  level,
}: {
  level: "facil" | "medio" | "dificil" | "desafio" | "prova";
}) {
  const map = {
    facil: { label: "Fácil", tone: "sage" as const },
    medio: { label: "Médio", tone: "sky" as const },
    dificil: { label: "Difícil", tone: "amber" as const },
    desafio: { label: "Desafio", tone: "terracotta" as const },
    prova: { label: "Prova", tone: "terracotta" as const },
  };
  const { label, tone } = map[level];
  return <Tag tone={tone}>{label}</Tag>;
}
