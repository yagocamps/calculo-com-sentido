import type { AulaContent } from "@/data/aulas/types";
import { lessonPath } from "@/data/pre-calculo";

export function preMeta(opts: {
  title: string;
  moduleSlug: string;
  moduleTitle: string;
  lessonNumber: number;
  duration: string;
  level?: string;
  readingNotes?: string[];
  glossaryTerms?: string[];
  next?: { slug: string; title: string; moduleSlug?: string };
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
    nextLesson: opts.next
      ? {
          title: opts.next.title,
          href: lessonPath(
            opts.next.moduleSlug ?? opts.moduleSlug,
            opts.next.slug,
          ),
        }
      : undefined,
  };
}
