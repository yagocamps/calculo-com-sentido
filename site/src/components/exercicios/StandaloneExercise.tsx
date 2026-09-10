"use client";
import { useState } from "react";
import type { Exercicio } from "@/data/exercicios";
import { ExercicioDetail } from "./ExercicioDetail";

export function StandaloneExercise({ exercise }: { exercise: Exercicio }) {
  const [reset, setReset] = useState(0);
  return <ExercicioDetail key={`${exercise.id}-${reset}`} exercicio={exercise} hasPrev={false} hasNext={false} onReset={() => setReset(n => n+1)} />;
}
