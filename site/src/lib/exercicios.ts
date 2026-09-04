import {
  exercicios,
  type Exercicio,
  type PedagogicalExerciseLevel,
} from "@/data/exercicios";

export function pedagogicalLevelOf(
  exercise: Exercicio,
): PedagogicalExerciseLevel {
  if (exercise.pedagogicalLevel) return exercise.pedagogicalLevel;
  if (exercise.level === "facil") return 1;
  if (exercise.type === "interpretacao" || exercise.type === "compreensao") {
    return 3;
  }
  if (exercise.level === "medio") return 2;
  if (exercise.level === "dificil") return 4;
  return 5;
}

export function getExercicio(id: string): Exercicio | undefined {
  return exercicios.find((e) => e.id === id);
}

export function filterExercicios(
  temaSlug: string,
  levelSlug: string,
): Exercicio[] {
  return exercicios.filter((e) => {
    const temaOk = temaSlug === "todos" || e.temaSlug === temaSlug;
    const levelOk =
      levelSlug === "todos" || pedagogicalLevelOf(e) === Number(levelSlug);
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

export const levelOrder: PedagogicalExerciseLevel[] = [1, 2, 3, 4, 5];
