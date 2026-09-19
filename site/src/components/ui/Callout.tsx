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
  /**
   * Título da faixa. `null` remove a faixa: use quando o callout abre logo
   * abaixo de uma seção que já diz a mesma coisa, para o aluno não ler o
   * mesmo rótulo duas vezes seguidas.
   */
  label?: string | null;
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
      {label !== null && (
        <div className="mb-1.5 text-[11px] font-bold tracking-[0.12em]">
          {label ?? v.label}
        </div>
      )}
      <div className="aula-texto [&_b]:font-semibold">{children}</div>
    </div>
  );
}
