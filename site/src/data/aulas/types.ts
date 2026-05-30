export type AulaExercise = {
  id: string;
  type: "compreensao" | "calculo" | "aplicada" | "interpretacao";
  enunciado: string;
  identificar?: string;
  dica?: string;
  resolucao: string;
  resposta: string;
  interpretacao: string;
  erroComum?: string;
};

export type AulaStep = {
  title: string;
  detail: string;
};

export type AulaContent = {
  meta: {
    title: string;
    moduleSlug: string;
    moduleTitle: string;
    lessonNumber: number;
    duration: string;
    level: string;
    readingNotes: string[];
    glossaryTerms: string[];
    nextLesson?: { title: string; href: string };
  };
  porQue: {
    title: string;
    paragraphs: string[];
  };
  explicacao: {
    title: string;
    paragraphs: string[];
    callout?: string;
    /** Texto plano da fórmula — sempre serve como leitura acessível (pt-BR). */
    formula: string;
    /** LaTeX opcional. Quando presente, a fórmula é renderizada com KaTeX. */
    formulaLatex?: string;
    /** Leitura textual customizada (sobrescreve `formula` no aria-label). */
    formulaAria?: string;
    formulaLegend?: string;
  };
  /** Gráfico interativo opcional, exibido na explicação. */
  grafico?: {
    fn: string;
    alt: string;
    xDomain?: [number, number];
    yDomain?: [number, number];
    legend?: string;
  };
  ondeAparece: {
    title: string;
    items: { label: string; detail: string }[];
  };
  exemplo: {
    title: string;
    situacao: string;
  };
  passos: {
    title: string;
    steps: AulaStep[];
  };
  interpretacao: {
    title: string;
    paragraphs: string[];
  };
  erros: {
    title: string;
    items: string[];
  };
  exerciciosGuiados: {
    title: string;
    exercises: AulaExercise[];
  };
  exerciciosAplicados: {
    title: string;
    intro: string;
    exerciseIds: string[];
  };
  resumo: {
    title: string;
    bullets: string[];
  };
};
