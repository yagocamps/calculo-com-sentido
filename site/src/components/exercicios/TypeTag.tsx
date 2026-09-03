import { Tag } from "@/components/ui/Tag";
import type { ExerciseType } from "@/data/exercicios";
import { typeLabels } from "@/lib/exercicios";

/**
 * Badge por tipo de questão (Plano Mestre, Seção 17). Cores na tela:
 * azul (compreensão), laranja (cálculo direto), verde (aplicada) e
 * roxo (interpretação) — os nomes dos tokens são legados, ver globals.css.
 */
const typeMeta: Record<
  ExerciseType,
  { tone: "sky" | "sage" | "terracotta" | "amber" | "verde"; icon: string }
> = {
  compreensao: { tone: "terracotta", icon: "🧠" },
  calculo: { tone: "sage", icon: "🧮" },
  aplicada: { tone: "verde", icon: "🌍" },
  interpretacao: { tone: "sky", icon: "👁️" },
};

export function TypeTag({ type }: { type: ExerciseType }) {
  const { tone, icon } = typeMeta[type];
  return (
    <Tag tone={tone}>
      <span aria-hidden>{icon}</span>
      {typeLabels[type]}
    </Tag>
  );
}
