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

/**
 * Números da capa de cada trilha, contados do catálogo.
 *
 * Antes eram strings fixas e envelheciam a cada aula nova: a trilha anunciava
 * "75 aulas" com 77 no ar, e "164 exercícios" com 169 no banco daquela trilha.
 */
const TEMAS_PRE = ["fundamentos", "algebra", "funcoes", "graficos", "trigonometria",
  "preparacao-limites", "funcao-afim", "funcao-quadratica", "geometria-analitica"];

function contar(modules: { lessons: unknown[] }[], temas: string[], semanas: string) {
  const aulas = modules.reduce((n, m) => n + m.lessons.length, 0);
  const exs = exercicios.filter((e) => temas.includes(e.temaSlug)).length;
  return [
    { n: String(modules.length), label: "Módulos" },
    { n: String(aulas), label: "Aulas" },
    { n: String(exs), label: "Exercícios" },
    { n: semanas, label: "Semanas" },
  ];
}

export const preCalculoStats = contar(preCalculoModulos, TEMAS_PRE, "~8");
export const calculo1Stats = contar(
  calculo1Modulos,
  [...new Set(exercicios.map((e) => e.temaSlug))].filter((t) => !TEMAS_PRE.includes(t)),
  "~10",
);
