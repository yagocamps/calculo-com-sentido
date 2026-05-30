import { cn } from "@/lib/utils";

const variants = {
  idea: {
    box: "bg-sky-soft border-sky text-sky-ink",
    label: "IDEIA INTUITIVA",
  },
  apply: {
    box: "bg-sage-soft border-sage text-sage-ink",
    label: "ONDE ISSO APARECE",
  },
  warn: {
    box: "bg-amber-soft border-amber text-amber-ink",
    label: "ERRO COMUM",
  },
  tip: {
    box: "bg-terracotta-soft border-terracotta text-terracotta-ink",
    label: "DICA",
  },
} as const;

export function Callout({
  variant,
  children,
  label,
  className,
}: {
  variant: keyof typeof variants;
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  const v = variants[variant];
  return (
    <div
      className={cn(
        "rounded-2 border border-l-4 p-4",
        v.box,
        className,
      )}
    >
      <div className="mb-1.5 text-[11px] font-bold tracking-[0.12em]">
        {label ?? v.label}
      </div>
      <div className="text-[15px] leading-relaxed [&_b]:font-semibold">{children}</div>
    </div>
  );
}
