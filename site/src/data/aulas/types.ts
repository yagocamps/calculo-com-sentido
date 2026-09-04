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

export type AulaDemonstracao = {
  title: string;
  intro: string;
  steps: {
    title: string;
    detail: string;
    formula: string;
    formulaAria: string;
  }[];
};

export type AulaStep = {
  title: string;
  detail: string;
};

/** Vídeo-aula do YouTube (até 3 por aula). `youtubeId` é o ID do vídeo
 * (ex.: em https://youtu.be/ABC123 ou ?v=ABC123, o ID é "ABC123"). */
export type AulaVideo = {
  titulo: string;
  youtubeId: string;
};

/** Pergunta do mini-quiz de saída (mastery learning). */
export type AulaQuizQuestion = {
  pergunta: string;
  opcoes: string[];
  corretaIndex: number;
  /** Por que a resposta certa é certa (mostrado após conferir). */
  explicacao: string;
  /** Seção da aula para revisar em caso de erro (id da TOC, ex.: "explicacao"). */
  reforcoSectionId?: string;
};

/** Pré-requisito de uma aula, com link para revisar. */
export type AulaPrereq = {
  label: string;
  href: string;
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
    /** Pré-requisitos específicos da aula. Quando ausente, a aula usa os
     * pré-requisitos padrão do módulo (ver `src/data/prereqs.ts`). */
    prereqs?: AulaPrereq[];
  };
  porQue: {
    title: string;
    paragraphs: string[];
  };
  explicacao: {
    title: string;
    paragraphs: string[];
    /** Versão alternativa da explicação (outra analogia, ritmo mais lento) —
     * aparece atrás do botão "Não entendi — explica de outro jeito". */
    alternativa?: string[];
    callout?: string;
    /** Texto plano da fórmula — sempre serve como leitura acessível (pt-BR). */
    formula: string;
    /** LaTeX opcional. Quando presente, a fórmula é renderizada com KaTeX. */
    formulaLatex?: string;
    /** Leitura textual customizada (sobrescreve `formula` no aria-label). */
    formulaAria?: string;
    formulaLegend?: string;
  };
  /** Demonstração algébrica opcional, exibida na explicação. */
  demonstracao?: {
    title: string;
    intro: string;
    steps: {
      title: string;
      detail: string;
      formula: string;
      formulaAria: string;
    }[];
  };
  /** Gráfico interativo opcional, exibido na explicação. */
  grafico?: {
    fn: string;
    alt: string;
    xDomain?: [number, number];
    yDomain?: [number, number];
    legend?: string;
    /** Quando presente, o gráfico ganha sliders para manipular os
     * coeficientes (quem não "enxerga" abstração aprende manipulando). */
    interactive?: { type: "afim"; a: number; b: number };
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
  /** Vídeo-aulas do YouTube (máx. 3). Quando vazio/ausente, a seção
   * "Vídeo aula" aparece como "Em breve". */
  videos?: AulaVideo[];
  /** Mini-quiz de saída (3 perguntas). 2+ acertos → pronto para a próxima;
   * menos → reforço com link para a seção correspondente. */
  quiz?: AulaQuizQuestion[];
};
