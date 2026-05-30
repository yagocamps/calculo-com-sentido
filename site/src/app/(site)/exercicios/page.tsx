import { Suspense } from "react";
import { ExerciciosFlow } from "@/components/exercicios/ExerciciosFlow";

export const metadata = {
  title: "Exercícios",
  description:
    "Exercícios aplicados com enunciado, dica, resolução passo a passo e interpretação.",
};

export default function ExerciciosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-ink-muted">
          Carregando exercícios…
        </div>
      }
    >
      <ExerciciosFlow />
    </Suspense>
  );
}
