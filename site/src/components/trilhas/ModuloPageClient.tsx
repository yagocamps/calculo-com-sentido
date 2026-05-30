"use client";

import { TrilhaModuloPageClient } from "@/components/trilhas/TrilhaModuloPageClient";
import type { PreCalculoModulo } from "@/data/pre-calculo";
import {
  lessonId,
  lessonPath,
  preCalculoTrilha,
} from "@/data/pre-calculo";

export function ModuloPageClient({ modulo }: { modulo: PreCalculoModulo }) {
  return (
    <TrilhaModuloPageClient
      trilhaSlug="pre-calculo"
      trilhaLabel={preCalculoTrilha.title}
      trilhaHref="/pre-calculo"
      modulo={modulo}
      lessonIdFn={lessonId}
      lessonPathFn={lessonPath}
    />
  );
}
