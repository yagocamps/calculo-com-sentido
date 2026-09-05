import {
  calculo1LessonPath,
  calculo1ModuloPath,
  calculo1Modulos,
} from "@/data/calculo-1";
import { exercicios } from "@/data/exercicios";
import { glossario } from "@/data/glossario";
import { isLessonAccessible } from "@/lib/aulas";
import { lessonPath, moduloPath, preCalculoModulos } from "@/data/pre-calculo";
import { slugify } from "@/lib/utils";

export type SearchItem = {
  id: string;
  type: "aula" | "modulo" | "exercicio" | "glossario";
  title: string;
  subtitle: string;
  href: string;
  haystack: string;
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

let cachedIndex: SearchItem[] | null = null;

export function getSearchIndex(): SearchItem[] {
  if (cachedIndex) return cachedIndex;
  const items: SearchItem[] = [];

  for (const modulo of preCalculoModulos) {
    items.push({
      id: `pre-module/${modulo.slug}`,
      type: "modulo",
      title: modulo.title,
      subtitle: `Módulo · Pré-Cálculo · ${modulo.lessons.length} aulas`,
      href: moduloPath(modulo.slug),
      haystack: normalize(`${modulo.title} ${modulo.shortTitle} ${modulo.desc} ${modulo.contents.join(" ")}`),
    });
    for (const lesson of modulo.lessons) {
      if (!isLessonAccessible("pre-calculo", modulo.slug, lesson)) {
        continue;
      }
      items.push({
        id: `pre/${modulo.slug}/${lesson.slug}`,
        type: "aula",
        title: lesson.title,
        subtitle: `Pré-Cálculo · ${modulo.shortTitle}`,
        href: lessonPath(modulo.slug, lesson.slug),
        haystack: normalize(`${lesson.title} ${modulo.title} ${modulo.shortTitle}`),
      });
    }
  }

  for (const modulo of calculo1Modulos) {
    if (modulo.defaultState === "locked") continue;
    items.push({
      id: `calc-module/${modulo.slug}`,
      type: "modulo",
      title: modulo.title,
      subtitle: `Módulo · Cálculo 1 · ${modulo.lessons.length} aulas`,
      href: calculo1ModuloPath(modulo.slug),
      haystack: normalize(`${modulo.title} ${modulo.shortTitle} ${modulo.desc} ${modulo.contents.join(" ")}`),
    });
    for (const lesson of modulo.lessons) {
      if (!isLessonAccessible("calculo-1", modulo.slug, lesson)) {
        continue;
      }
      items.push({
        id: `calc/${modulo.slug}/${lesson.slug}`,
        type: "aula",
        title: lesson.title,
        subtitle: `Cálculo 1 · ${modulo.shortTitle}`,
        href: calculo1LessonPath(modulo.slug, lesson.slug),
        haystack: normalize(`${lesson.title} ${modulo.title} ${modulo.shortTitle}`),
      });
    }
  }

  for (const entry of glossario) {
    items.push({
      id: `gloss/${entry.termo}`,
      type: "glossario",
      title: entry.termo,
      subtitle: "Glossário",
      href: `/glossario#${slugify(entry.termo)}`,
      haystack: normalize(`${entry.termo} ${entry.definicao}`),
    });
  }

  for (const exercise of exercicios) {
    items.push({
      id: `exercise/${exercise.id}`,
      type: "exercicio",
      title: exercise.title,
      subtitle: `Exercício · ${exercise.tema} · ${exercise.area}`,
      href: `/exercicios?id=${exercise.id}`,
      haystack: normalize(`${exercise.title} ${exercise.tema} ${exercise.area} ${exercise.enunciado} ${exercise.interpretacao}`),
    });
  }

  cachedIndex = items;
  return items;
}

export function searchItems(query: string, limit = 12): SearchItem[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const index = getSearchIndex();

  const scored = index
    .map((item) => {
      const title = normalize(item.title);
      let score = 0;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      else if (item.haystack.includes(q)) score = 30;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.slice(0, limit).map((r) => r.item);
}
