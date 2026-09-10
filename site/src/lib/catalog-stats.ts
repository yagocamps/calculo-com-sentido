import { calculo1Modulos } from "@/data/calculo-1";
import { preCalculoModulos } from "@/data/pre-calculo";
import { exercicios } from "@/data/exercicios";
import { hasAulaContent } from "@/lib/aulas";

export const catalogStats = {
  moduleCount: preCalculoModulos.length + calculo1Modulos.length,
  lessonCount: [...preCalculoModulos, ...calculo1Modulos].reduce((sum, m) => sum + m.lessons.length, 0),
  publishedLessonCount: ([["pre-calculo",preCalculoModulos],["calculo-1",calculo1Modulos]] as const)
    .reduce((sum,[track,modules]) => sum + modules.filter(m => m.defaultState !== "locked").reduce((n,m) =>
      n + m.lessons.filter(l => hasAulaContent(track,m.slug,l.slug)).length,0),0),
  exerciseCount: exercicios.length,
};
