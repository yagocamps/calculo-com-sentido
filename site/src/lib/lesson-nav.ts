import { calculo1LessonPath, calculo1Modulos } from "@/data/calculo-1";
import { lessonPath, preCalculoModulos } from "@/data/pre-calculo";

export type AdjacentLesson = { href: string; title: string } | null;

/**
 * Encontra a aula anterior e a próxima dentro da mesma trilha, na ordem dos
 * módulos e das aulas (atravessa fronteiras de módulo naturalmente).
 */
export function getAdjacentLessons(
  trilha: "pre-calculo" | "calculo-1",
  moduleSlug: string,
  aulaSlug: string,
): { prev: AdjacentLesson; next: AdjacentLesson } {
  const modulos = trilha === "calculo-1" ? calculo1Modulos : preCalculoModulos;
  const toPath = trilha === "calculo-1" ? calculo1LessonPath : lessonPath;

  const flat: { href: string; title: string }[] = [];
  for (const mod of modulos) {
    for (const lesson of mod.lessons) {
      flat.push({ href: toPath(mod.slug, lesson.slug), title: lesson.title });
    }
  }

  const currentHref = toPath(moduleSlug, aulaSlug);
  const idx = flat.findIndex((l) => l.href === currentHref);
  if (idx === -1) return { prev: null, next: null };

  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
