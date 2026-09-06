import type {
  AulaContent,
  AulaFutureUse,
  AulaPrereq,
  AulaQuizQuestion,
} from "@/data/aulas/types";
import type { AnswerCheckOptions } from "@/lib/answer-check";

type Track = "pre-calculo" | "calculo-1";

export type CurriculumLessonSpec = {
  track: Track;
  moduleSlug: string;
  moduleTitle: string;
  lessonNumber: number;
  slug: string;
  title: string;
  duration?: string;
  level?: string;
  notes: string[];
  glossary?: string[];
  prereqs?: AulaPrereq[];
  usedIn: AulaFutureUse[];
  why: string[];
  explanation: string[];
  callout: string;
  formula: string;
  formulaLatex?: string;
  formulaAria?: string;
  formulaLegend?: string;
  rules?: AulaContent["explicacao"]["rules"];
  appearances: { label: string; detail: string }[];
  exampleTitle: string;
  example: string;
  steps: { title: string; detail: string }[];
  interpretation: string[];
  errors: string[];
  guided: {
    type?: "compreensao" | "calculo" | "aplicada" | "interpretacao";
    question: string;
    identify?: string;
    hint?: string;
    solution: string;
    answer: string;
    answerCheck?: AnswerCheckOptions;
    interpretation: string;
    commonError?: string;
  }[];
  exerciseIds?: string[];
  summary: string[];
  quiz?: AulaQuizQuestion[];
};

export function lessonHref(
  track: Track,
  moduleSlug: string,
  lessonSlug: string,
) {
  return `/${track}/${moduleSlug}/${lessonSlug}`;
}

export function createCurriculumLesson(
  spec: CurriculumLessonSpec,
): AulaContent {
  return {
    meta: {
      title: spec.title,
      moduleSlug: spec.moduleSlug,
      moduleTitle: spec.moduleTitle,
      lessonNumber: spec.lessonNumber,
      duration: spec.duration ?? "13 min",
      level: spec.level ?? "essencial",
      readingNotes: spec.notes,
      glossaryTerms: spec.glossary ?? [],
      prereqs: spec.prereqs,
      usedIn: spec.usedIn,
    },
    porQue: {
      title: "A ponte que evita um bloqueio depois",
      paragraphs: spec.why,
    },
    explicacao: {
      title: "A ideia antes da técnica",
      paragraphs: spec.explanation,
      callout: spec.callout,
      formula: spec.formula,
      formulaLatex: spec.formulaLatex,
      formulaAria: spec.formulaAria,
      formulaLegend: spec.formulaLegend,
      rules: spec.rules,
    },
    ondeAparece: {
      title: "Onde esta habilidade reaparece",
      items: spec.appearances,
    },
    exemplo: {
      title: spec.exampleTitle,
      situacao: spec.example,
    },
    passos: {
      title: "Estratégia comentada",
      steps: spec.steps,
    },
    interpretacao: {
      title: "Como ler o resultado",
      paragraphs: spec.interpretation,
    },
    erros: {
      title: "Armadilhas que valem atenção",
      items: spec.errors,
    },
    exerciciosGuiados: {
      title: "Prática em camadas",
      exercises: spec.guided.map((exercise, index) => ({
        id: `p2-${spec.track}-${spec.moduleSlug}-${spec.slug}-${index + 1}`,
        type: exercise.type ?? "calculo",
        enunciado: exercise.question,
        identificar: exercise.identify,
        dica: exercise.hint,
        resolucao: exercise.solution,
        resposta: exercise.answer,
        answerCheck: exercise.answerCheck,
        interpretacao: exercise.interpretation,
        erroComum: exercise.commonError,
      })),
    },
    exerciciosAplicados: {
      title: "Continue praticando",
      intro:
        "Use o banco para avançar do fundamento até um problema novo, sem pular a interpretação.",
      exerciseIds: spec.exerciseIds ?? [],
    },
    resumo: {
      title: "O que precisa ficar",
      bullets: spec.summary,
    },
    quiz: spec.quiz,
  };
}
