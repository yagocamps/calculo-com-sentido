import type { MasteryStep } from "@/lib/learning-evidence";
import { cn } from "@/lib/utils";

/** Marcador de cada critério. O símbolo nunca é a única informação: o rótulo
 * e o status dizem o mesmo em texto, para leitor de tela e para quem não
 * distingue as cores. */
function marca(step: MasteryStep) {
  if (step.done) return { simbolo: "✓", rotulo: "cumprido", classe: "text-sage-ink" };
  if (step.blocked) return { simbolo: "—", rotulo: "indisponível nesta aula", classe: "text-ink-subtle" };
  if (step.waiting) return { simbolo: "⏳", rotulo: "aguardando o intervalo", classe: "text-amber-ink" };
  return { simbolo: "○", rotulo: "pendente", classe: "text-ink-muted" };
}

export function MasteryChecklist({
  steps,
  className,
}: {
  steps: MasteryStep[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1.5", className)}>
      {steps.map((step) => {
        const { simbolo, rotulo, classe } = marca(step);
        return (
          <li key={step.label} className="flex gap-2 text-[13px] leading-relaxed">
            <span aria-hidden className={cn("mt-px w-3.5 shrink-0 text-center", classe)}>
              {simbolo}
            </span>
            <span className="sr-only">{rotulo}:</span>
            <span className={cn("min-w-0", step.done && "text-ink-muted")}>
              <span className={cn(!step.done && "font-medium text-ink")}>{step.label}</span>
              <span className="text-ink-muted"> — {step.status}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
