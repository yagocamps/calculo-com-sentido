/** Bullets verificáveis (sem depoimentos inventados). Contagem dinâmica na home. */
export const homeSocialProof = [
  "Aulas com estrutura fixa: sentido → aplicação → cálculo",
  "Teste de nível gratuito em poucos minutos",
  "Progresso e revisão espaçada salvos no seu navegador",
];

export const homeMission = {
  quote: [
    "Cálculo 1 é uma das matérias que mais assusta alunos no início da faculdade.",
    "Muitos alunos não reprovam porque são incapazes, mas porque chegam sem uma base sólida e sem entender o sentido do conteúdo.",
    "O objetivo deste site é mudar essa realidade.",
  ],
  closing:
    "Aqui, o aluno aprende Pré-Cálculo e Cálculo 1 de forma simples, aplicada e progressiva, começando do básico e avançando passo a passo até os principais conceitos da faculdade.",
};

export const homeProblem = {
  title: "O problema que a gente conhece",
  paragraphs: [
    "No ensino médio, muita gente passou anos decorando fórmulas sem entender para que servem. Quando chega na faculdade, Cálculo 1 aparece de repente — limites, derivadas, integrais — e parece um idioma novo.",
    "A reprovação não é falta de inteligência na maioria dos casos. É base fraca, ritmo acelerado da turma e explicações que começam pela definição formal em vez do sentido.",
  ],
  stats: [
    { value: "Base", label: "operações e álgebra sustentam o conteúdo que vem depois" },
    { value: "Ritmo", label: "aulas curtas permitem revisar sem pular etapas" },
    { value: "Sentido", label: "cada fórmula é ligada à interpretação e à aplicação" },
  ],
};

export const homeSolution = {
  title: "A solução deste site",
  paragraphs: [
    "Cálculo com Sentido não é um repositório de fórmulas. É um caminho progressivo: primeiro a ideia, depois a aplicação, só então o cálculo — sempre com interpretação do resultado.",
    "Você pode começar pelo teste de nível, revisar Pré-Cálculo do zero ou ir direto para Cálculo 1 se a base já estiver ok. O ritmo é seu; o conteúdo não pula etapas.",
  ],
  pillars: [
    {
      title: "Sentido antes da fórmula",
      desc: "Cada tópico começa com o porquê e com exemplos do mundo real.",
    },
    {
      title: "Aplicação obrigatória",
      desc: "Toda aula tem a seção “Onde isso aparece?” — finanças, engenharia, saúde, cotidiano.",
    },
    {
      title: "Passo a passo + erros comuns",
      desc: "Resolução guiada e alertas sobre o que a maioria erra na prova.",
    },
  ],
};

export const homeLessonModel = {
  title: "Aulas simples, aplicadas e sem academiquês",
  subtitle:
    "Cada aula segue a mesma estrutura — você sempre sabe o que vem agora e qual é o próximo passo.",
  steps: [
    "Por que aprender isso",
    "Explicação simples",
    "Onde isso aparece na prática",
    "Exemplo aplicado",
    "Resolução passo a passo",
    "Interpretação do resultado",
    "Erros comuns",
    "Exercícios guiados e aplicados",
    "Resumo e próxima aula",
  ],
  examples: [
    { topic: "Função afim", apps: "Corrida de app, salário com comissão" },
    { topic: "Limites", apps: "Velocidade instantânea, tendência de gráficos" },
    { topic: "Derivadas", apps: "Lucro máximo, taxa de variação" },
  ],
};

export const homeBenefits = [
  {
    num: "01 · IDEIA",
    title: "Sentido antes da fórmula",
    text: "Cada aula começa com o porquê e com onde o conteúdo aparece na prática — engenharia, finanças, saúde, cotidiano.",
  },
  {
    num: "02 · RITMO",
    title: "Passo a passo, sem pular",
    text: "Aulas curtas, exercícios guiados e desafios em cinco níveis. Você avança no seu ritmo e pode revisar quando precisar.",
  },
  {
    num: "03 · ERROS",
    title: "Aprender com tropeços",
    text: "Toda aula lista erros típicos — para você não repetir os mesmos na prova ou no trabalho.",
  },
  {
    num: "04 · CLAREZA",
    title: "Linguagem acolhedora",
    text: "Sem vergonha de não saber o básico. Explicamos como para quem tem medo de matemática — sem perder o rigor.",
  },
];

export const homeAudience = [
  {
    title: "Iniciante",
    desc: "Quer aprender do zero, sem vergonha de não saber o básico.",
    cta: "Começar pelo teste de nível",
    href: "/teste-de-nivel",
  },
  {
    title: "Intermediário",
    desc: "Precisa revisar assuntos esquecidos do ensino médio.",
    cta: "Ir para Pré-Cálculo",
    href: "/pre-calculo",
  },
  {
    title: "Avançado",
    desc: "Quer revisitar Pré-Cálculo e Cálculo 1 antes da prova.",
    cta: "Ir para Cálculo 1",
    href: "/calculo-1",
  },
];

export const homePaths = [
  {
    title: "Pré-Cálculo",
    tag: "Base · 7 módulos",
    tagTone: "sage" as const,
    meta: "~ 8 semanas",
    desc: "Funções, gráficos, álgebra e trigonometria. A base sólida que falta para entender Cálculo 1 sem trauma.",
    href: "/pre-calculo",
    accent: "border-l-sage",
  },
  {
    title: "Cálculo 1",
    tag: "Faculdade · 7 módulos",
    tagTone: "terracotta" as const,
    meta: "~ 10 semanas",
    desc: "Limites, continuidade, derivadas e integrais. Primeiro a ideia intuitiva — depois a fórmula, sempre com aplicação real.",
    href: "/calculo-1",
    accent: "border-l-terracotta",
  },
];
