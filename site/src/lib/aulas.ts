import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { funcaoAfimAula } from "@/data/aulas/funcao-afim";
import type { AulaContent } from "@/data/aulas/types";

const registry: Record<string, AulaContent> = {
  "pre-calculo/funcoes/funcao-afim": funcaoAfimAula,
  ...buildPreCalculoRegistry(),
  ...buildCalculo1Registry(),
};

function registryKey(
  trilha: string,
  moduloSlug: string,
  aulaSlug: string,
): string {
  return `${trilha}/${moduloSlug}/${aulaSlug}`;
}

export function getAulaContent(
  trilha: string,
  moduloSlug: string,
  aulaSlug: string,
): AulaContent | undefined {
  return registry[registryKey(trilha, moduloSlug, aulaSlug)];
}

export function hasAulaContent(
  trilha: string,
  moduloSlug: string,
  aulaSlug: string,
): boolean {
  return Boolean(registry[registryKey(trilha, moduloSlug, aulaSlug)]);
}

/** Aula clicável na trilha (conteúdo publicado ou flag available). */
export function isLessonAccessible(
  trilha: "pre-calculo" | "calculo-1",
  moduloSlug: string,
  lesson: { slug: string; available: boolean },
  moduloLocked = false,
): boolean {
  if (moduloLocked) return false;
  return (
    lesson.available || hasAulaContent(trilha, moduloSlug, lesson.slug)
  );
}
