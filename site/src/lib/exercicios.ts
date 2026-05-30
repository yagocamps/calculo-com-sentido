import {
  exercicios,
  type ExerciseLevel,
  type Exercicio,
} from "@/data/exercicios";

export function getExercicio(id: string): Exercicio | undefined {
  return exercicios.find((e) => e.id === id);
}

export function filterExercicios(
  temaSlug: string,
  levelSlug: string,
): Exercicio[] {
  return exercicios.filter((e) => {
    const temaOk = temaSlug === "todos" || e.temaSlug === temaSlug;
    const levelOk = levelSlug === "todos" || e.level === levelSlug;
    return temaOk && levelOk;
  });
}

export function countByTema(temaSlug: string): number {
  if (temaSlug === "todos") return exercicios.length;
  return exercicios.filter((e) => e.temaSlug === temaSlug).length;
}

export const typeLabels: Record<Exercicio["type"], string> = {
  compreensao: "Compreensão",
  calculo: "Cálculo direto",
  aplicada: "Aplicada",
  interpretacao: "Interpretação",
};

export const levelOrder: ExerciseLevel[] = [
  "facil",
  "medio",
  "dificil",
  "desafio",
];
