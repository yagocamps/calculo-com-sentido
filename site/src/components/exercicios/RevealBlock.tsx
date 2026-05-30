import { cn } from "@/lib/utils";

const variants = {
  hint: {
    box: "bg-amber-soft border-amber text-amber-ink",
    label: "Dica",
    icon: "💡",
  },
  sol: {
    box: "bg-sky-soft border-sky text-sky-ink",
    label: "Resolução passo a passo",
    icon: "📝",
  },
  ans: {
    box: "bg-sage-soft border-sage text-sage-ink",
    label: "Resposta final",
    icon: "✓",
  },
  err: {
    box: "bg-terracotta-soft border-terracotta text-terracotta-ink",
    label: "Erro comum",
    icon: "⚠",
  },
} as const;

export function RevealBlock({
  variant,
  children,
  visible,
  onToggle,
}: {
  variant: keyof typeof variants;
  children: React.ReactNode;
  visible: boolean;
  onToggle: () => void;
}) {
  const v = variants[variant];

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="mb-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted hover:border-terracotta"
      >
        {visible ? `Ocultar ${v.label.toLowerCase()}` : `Mostrar ${v.label.toLowerCase()}`}
      </button>
      {visible && (
        <div className={cn("rounded-2 border px-4 py-3 text-sm leading-relaxed", v.box)}>
          <div className="mb-1.5 text-[11px] font-bold tracking-[0.12em]">
            {v.icon} {v.label.toUpperCase()}
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
