import type { AulaContent } from "@/data/aulas/types";
import { calculo1LessonPath } from "@/data/calculo-1";

export function c1Meta(opts: {
  title: string;
  moduleSlug: string;
  moduleTitle: string;
  lessonNumber: number;
  duration: string;
  level?: string;
  readingNotes?: string[];
  glossaryTerms?: string[];
  next?: { slug: string; title: string; moduleSlug?: string };
  /** Destino fora da trilha (fim de trilha, ponte para Cálculo 1, /resumos...). */
  nextExterno?: { title: string; href: string };
}): AulaContent["meta"] {
  return {
    title: opts.title,
    moduleSlug: opts.moduleSlug,
    moduleTitle: opts.moduleTitle,
    lessonNumber: opts.lessonNumber,
    duration: opts.duration,
    level: opts.level ?? "iniciante",
    readingNotes: opts.readingNotes ?? [],
    glossaryTerms: opts.glossaryTerms ?? [],
    nextLesson: opts.nextExterno
      ? opts.nextExterno
      : opts.next
      ? {
          title: opts.next.title,
          href: calculo1LessonPath(
            opts.next.moduleSlug ?? opts.moduleSlug,
            opts.next.slug,
          ),
        }
      : undefined,
  };
}
