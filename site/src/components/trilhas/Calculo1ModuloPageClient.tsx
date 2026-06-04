"use client";

import { TrilhaModuloPageClient } from "@/components/trilhas/TrilhaModuloPageClient";
import type { GlossarioEntry } from "@/data/glossario";
import type { TrilhaModuloData } from "@/data/trilha-module";
import {
  calculo1LessonId,
  calculo1LessonPath,
  calculo1Trilha,
} from "@/data/calculo-1";

export function Calculo1ModuloPageClient({
  modulo,
  flashcards,
}: {
  modulo: TrilhaModuloData;
  flashcards?: GlossarioEntry[];
}) {
  return (
    <TrilhaModuloPageClient
      trilhaSlug="calculo-1"
      trilhaLabel={calculo1Trilha.title}
      trilhaHref="/calculo-1"
      modulo={modulo}
      lessonIdFn={calculo1LessonId}
      lessonPathFn={calculo1LessonPath}
      flashcards={flashcards}
    />
  );
}
