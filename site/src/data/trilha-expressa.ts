// Trilha expressa "Socorro, tenho prova": o mínimo para sobreviver a
// limites e derivadas em ~2 semanas. Referencia aulas das trilhas normais —
// título, duração e link são resolvidos a partir dos dados das trilhas.

import {
  calculo1LessonId,
  calculo1LessonPath,
  calculo1Modulos,
} from "@/data/calculo-1";
import { lessonId, lessonPath, preCalculoModulos } from "@/data/pre-calculo";

export type ExpressRef = {
  trilha: "pre-calculo" | "calculo-1";
  modulo: string;
  aula: string;
  /** Por que esta aula entrou no corte (mostrado como nota). */
  motivo?: string;
};

export type ExpressStage = {
  titulo: string;
  desc: string;
  refs: ExpressRef[];
};

export const expressStages: ExpressStage[] = [
  {
    titulo: "Base mínima (não pule!)",
    desc: "Sem isso, limites e derivadas viram decoreba. São as 5 aulas de pré que mais seguram prova.",
    refs: [
      { trilha: "pre-calculo", modulo: "funcoes", aula: "o-que-e-funcao" },
      {
        trilha: "pre-calculo",
        modulo: "funcoes",
        aula: "funcao-afim",
        motivo: "a função mais cobrada em problemas aplicados",
      },
      { trilha: "pre-calculo", modulo: "funcoes", aula: "funcao-quadratica" },
      {
        trilha: "pre-calculo",
        modulo: "preparacao-limites",
        aula: "ideia-aproximacao",
      },
      {
        trilha: "pre-calculo",
        modulo: "preparacao-limites",
        aula: "ideia-tendencia",
      },
    ],
  },
  {
    titulo: "Limites: o essencial",
    desc: "Tendência, substituição, 0/0 e laterais — o que toda P1 cobra.",
    refs: [
      { trilha: "calculo-1", modulo: "limites", aula: "ideia-de-limite" },
      {
        trilha: "calculo-1",
        modulo: "limites",
        aula: "limite-substituicao",
        motivo: "o método que resolve a maioria das questões",
      },
      { trilha: "calculo-1", modulo: "limites", aula: "limites-laterais" },
      { trilha: "calculo-1", modulo: "limites", aula: "limite-no-infinito" },
    ],
  },
  {
    titulo: "Derivadas: o coração da prova",
    desc: "Definição rápida, regras práticas e interpretação — onde a prova decide sua nota.",
    refs: [
      { trilha: "calculo-1", modulo: "derivadas", aula: "variacao-media" },
      { trilha: "calculo-1", modulo: "derivadas", aula: "definicao-derivada" },
      {
        trilha: "calculo-1",
        modulo: "derivadas",
        aula: "regras-derivacao",
        motivo: "regra da potência resolve 70% das derivadas de prova",
      },
      { trilha: "calculo-1", modulo: "derivadas", aula: "derivada-composta" },
      {
        trilha: "calculo-1",
        modulo: "derivadas",
        aula: "interpretacao-derivada",
      },
    ],
  },
  {
    titulo: "Se a prova cobrar mais",
    desc: "Máximos/mínimos e integrais básicas — confira o conteúdo da sua prova antes de investir aqui.",
    refs: [
      {
        trilha: "calculo-1",
        modulo: "aplicacoes-derivadas",
        aula: "maximos-minimos",
      },
      { trilha: "calculo-1", modulo: "aplicacoes-derivadas", aula: "otimizacao" },
      { trilha: "calculo-1", modulo: "integrais", aula: "integral-definida" },
      { trilha: "calculo-1", modulo: "integrais", aula: "tfc" },
    ],
  },
];

export type ExpressLesson = {
  id: string;
  title: string;
  duration: string;
  href: string;
  motivo?: string;
};

/** Resolve uma referência para os dados reais da aula (título, duração, link). */
export function resolveExpressRef(ref: ExpressRef): ExpressLesson | null {
  const modulos =
    ref.trilha === "pre-calculo" ? preCalculoModulos : calculo1Modulos;
  const modulo = modulos.find((m) => m.slug === ref.modulo);
  const lesson = modulo?.lessons.find((l) => l.slug === ref.aula);
  if (!modulo || !lesson) return null;
  return {
    id:
      ref.trilha === "pre-calculo"
        ? lessonId(ref.modulo, ref.aula)
        : calculo1LessonId(ref.modulo, ref.aula),
    title: lesson.title,
    duration: lesson.duration,
    href:
      ref.trilha === "pre-calculo"
        ? lessonPath(ref.modulo, ref.aula)
        : calculo1LessonPath(ref.modulo, ref.aula),
    motivo: ref.motivo,
  };
}

/** Minutos somados de leitura de todas as aulas da trilha expressa. */
export function expressReadingMinutes(): number {
  let total = 0;
  for (const stage of expressStages) {
    for (const ref of stage.refs) {
      const lesson = resolveExpressRef(ref);
      if (lesson) total += parseInt(lesson.duration, 10) || 0;
    }
  }
  return total;
}
