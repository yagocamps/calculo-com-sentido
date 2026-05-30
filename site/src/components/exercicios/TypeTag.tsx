import { Tag } from "@/components/ui/Tag";
import type { ExerciseType } from "@/data/exercicios";
import { typeLabels } from "@/lib/exercicios";

const toneMap: Record<
  ExerciseType,
  "sky" | "sage" | "terracotta" | "amber"
> = {
  compreensao: "sky",
  calculo: "sage",
  aplicada: "terracotta",
  interpretacao: "amber",
};

export function TypeTag({ type }: { type: ExerciseType }) {
  return <Tag tone={toneMap[type]}>{typeLabels[type]}</Tag>;
}
