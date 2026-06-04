import type { ModuleState } from "@/components/trilhas/ModuleCard";

export type PreCalculoAula = {
  slug: string;
  title: string;
  duration: string;
  /** Aula com conteúdo completo (Etapa 5+) */
  available: boolean;
};

export type PreCalculoModulo = {
  slug: string;
  n: number;
  shortTitle: string;
  title: string;
  desc: string;
  contents: string[];
  applications: string[];
  lessons: PreCalculoAula[];
  defaultState: ModuleState;
  apps: string[];
};

export const preCalculoTrilha = {
  slug: "pre-calculo",
  title: "Pré-Cálculo",
  eyebrow: "Trilha · A base que faltava",
  description:
    "Seis módulos para você revisar (ou aprender do zero) tudo que o ensino médio deveria ter ensinado. Cada módulo tem aulas curtas, exemplos aplicados e exercícios em quatro níveis.",
  stats: [
    { n: "6", label: "Módulos" },
    { n: "59", label: "Aulas" },
    { n: "240+", label: "Exercícios" },
    { n: "~8", label: "Semanas" },
  ],
};

export const preCalculoModulos: PreCalculoModulo[] = [
  {
    slug: "fundamentos",
    n: 1,
    shortTitle: "Fundamentos",
    title: "Fundamentos matemáticos",
    desc: "Operações, frações, potências, raízes, produtos notáveis, fatoração e equações.",
    defaultState: "open",
    apps: ["descontos", "orçamento", "medidas"],
    contents: [
      "Operações básicas",
      "Frações",
      "Potenciação",
      "Radiciação",
      "Produtos notáveis",
      "Fatoração",
      "Equações do 1º grau",
      "Equações do 2º grau",
    ],
    applications: [
      "Cálculo de descontos",
      "Divisão de custos",
      "Escalas e medidas",
      "Problemas financeiros simples",
      "Consumo de energia",
      "Planejamento de orçamento",
    ],
    lessons: [
      { slug: "operacoes-basicas", title: "Operações básicas e ordem", duration: "10 min", available: true },
      { slug: "fracoes", title: "Frações na prática", duration: "12 min", available: true },
      { slug: "potenciacao", title: "Potenciação", duration: "11 min", available: true },
      { slug: "radiciacao", title: "Radiciação", duration: "10 min", available: true },
      { slug: "produtos-notaveis", title: "Produtos notáveis", duration: "14 min", available: true },
      { slug: "fatoracao", title: "Fatoração", duration: "13 min", available: true },
      { slug: "equacao-primeiro-grau", title: "Equações do 1º grau", duration: "12 min", available: true },
      { slug: "equacao-segundo-grau", title: "Equações do 2º grau", duration: "15 min", available: true },
      { slug: "descontos-orcamento", title: "Descontos e orçamento", duration: "10 min", available: true },
      { slug: "escalas-medidas", title: "Escalas e medidas", duration: "9 min", available: true },
      { slug: "problemas-financeiros", title: "Problemas financeiros simples", duration: "11 min", available: true },
      { slug: "consumo-energia", title: "Consumo de energia", duration: "10 min", available: true },
      { slug: "revisao-fundamentos-1", title: "Revisão · Parte 1", duration: "8 min", available: true },
      { slug: "revisao-fundamentos-2", title: "Revisão · Parte 2", duration: "8 min", available: true },
    ],
  },
  {
    slug: "algebra",
    n: 2,
    shortTitle: "Álgebra essencial",
    title: "Álgebra essencial",
    desc: "Manipulação de expressões, isolamento, inequações e sistemas de equações.",
    defaultState: "open",
    apps: ["custos", "produção", "receita"],
    contents: [
      "Manipulação de expressões",
      "Isolamento de variáveis",
      "Inequações",
      "Sistemas de equações",
      "Simplificação algébrica",
    ],
    applications: [
      "Orçamentos",
      "Comparação de planos",
      "Cálculo de custos",
      "Problemas de produção",
      "Equilíbrio entre receita e despesa",
    ],
    lessons: [
      { slug: "expressoes-algebricas", title: "Manipulação de expressões", duration: "12 min", available: true },
      { slug: "isolamento-variaveis", title: "Isolamento de variáveis", duration: "11 min", available: true },
      { slug: "inequacoes", title: "Inequações", duration: "13 min", available: true },
      { slug: "sistemas-equacoes", title: "Sistemas de equações", duration: "14 min", available: true },
      { slug: "simplificacao", title: "Simplificação algébrica", duration: "10 min", available: true },
      { slug: "orcamentos-planos", title: "Orçamentos e planos", duration: "10 min", available: true },
      { slug: "custos-producao", title: "Custos de produção", duration: "11 min", available: true },
      { slug: "receita-despesa", title: "Receita e despesa", duration: "10 min", available: true },
      { slug: "revisao-algebra", title: "Revisão do módulo", duration: "9 min", available: true },
    ],
  },
  {
    slug: "funcoes",
    n: 3,
    shortTitle: "Funções",
    title: "Funções",
    desc: "Domínio, imagem, afim, quadrática, modular, exponencial e logarítmica.",
    defaultState: "current",
    apps: ["corrida de app", "juros", "crescimento"],
    contents: [
      "O que é uma função",
      "Domínio e imagem",
      "Função afim",
      "Função quadrática",
      "Função modular",
      "Função exponencial",
      "Função logarítmica",
    ],
    applications: [
      "Corrida de aplicativo",
      "Salário com comissão",
      "Juros compostos",
      "Crescimento populacional",
      "Lucro de uma empresa",
      "Custo de produção",
    ],
    lessons: [
      { slug: "o-que-e-funcao", title: "O que é uma função?", duration: "10 min", available: true },
      { slug: "dominio-imagem", title: "Domínio e imagem", duration: "11 min", available: true },
      { slug: "funcao-afim", title: "Função afim", duration: "12 min", available: true },
      { slug: "funcao-quadratica", title: "Função quadrática", duration: "14 min", available: true },
      { slug: "funcao-modular", title: "Função modular", duration: "11 min", available: true },
      { slug: "funcao-exponencial", title: "Função exponencial", duration: "13 min", available: true },
      { slug: "funcao-logaritmica", title: "Função logarítmica", duration: "13 min", available: true },
      { slug: "corrida-aplicativo", title: "Aplicação: corrida de app", duration: "9 min", available: true },
      { slug: "juros-compostos", title: "Aplicação: juros compostos", duration: "10 min", available: true },
      { slug: "custo-producao", title: "Aplicação: custo de produção", duration: "10 min", available: true },
      { slug: "revisao-funcoes-1", title: "Revisão · Parte 1", duration: "8 min", available: true },
      { slug: "revisao-funcoes-2", title: "Revisão · Parte 2", duration: "8 min", available: true },
    ],
  },
  {
    slug: "graficos",
    n: 4,
    shortTitle: "Gráficos",
    title: "Gráficos",
    desc: "Plano cartesiano, leitura, crescimento, decrescimento e translação.",
    defaultState: "open",
    apps: ["vendas", "preços", "temperatura"],
    contents: [
      "Plano cartesiano",
      "Leitura de gráficos",
      "Crescimento e decrescimento",
      "Interpretação visual de funções",
      "Translação de gráficos",
    ],
    applications: [
      "Análise de vendas",
      "Evolução de preços",
      "Crescimento de seguidores",
      "Variação de temperatura",
      "Consumo de energia",
      "Evolução de desempenho",
    ],
    lessons: [
      { slug: "plano-cartesiano", title: "Plano cartesiano", duration: "10 min", available: true },
      { slug: "leitura-graficos", title: "Leitura de gráficos", duration: "11 min", available: true },
      { slug: "crescimento-decrescimento", title: "Crescimento e decrescimento", duration: "12 min", available: true },
      { slug: "interpretacao-visual", title: "Interpretação visual", duration: "10 min", available: true },
      { slug: "translacao-graficos", title: "Translação de gráficos", duration: "11 min", available: true },
      { slug: "vendas-precos", title: "Vendas e preços", duration: "9 min", available: true },
      { slug: "temperatura-consumo", title: "Temperatura e consumo", duration: "10 min", available: true },
      { slug: "revisao-graficos", title: "Revisão do módulo", duration: "8 min", available: true },
    ],
  },
  {
    slug: "trigonometria",
    n: 5,
    shortTitle: "Trigonometria",
    title: "Trigonometria básica",
    desc: "Seno, cosseno, tangente, ciclo trigonométrico e identidades básicas.",
    defaultState: "open",
    apps: ["rampas", "ondas", "arquitetura"],
    contents: [
      "Seno",
      "Cosseno",
      "Tangente",
      "Ciclo trigonométrico",
      "Identidades básicas",
      "Gráficos trigonométricos simples",
    ],
    applications: [
      "Inclinação de rampas",
      "Altura de prédios",
      "Ondas",
      "Movimento circular",
      "Engenharia",
      "Arquitetura",
    ],
    lessons: [
      { slug: "seno", title: "Seno", duration: "12 min", available: true },
      { slug: "cosseno", title: "Cosseno", duration: "12 min", available: true },
      { slug: "tangente", title: "Tangente", duration: "11 min", available: true },
      { slug: "ciclo-trigonometrico", title: "Ciclo trigonométrico", duration: "14 min", available: true },
      { slug: "identidades-basicas", title: "Identidades básicas", duration: "13 min", available: true },
      { slug: "graficos-trigonometricos", title: "Gráficos trigonométricos", duration: "11 min", available: true },
      { slug: "rampas-altura", title: "Rampas e altura de prédios", duration: "10 min", available: true },
      { slug: "ondas-movimento", title: "Ondas e movimento circular", duration: "10 min", available: true },
      { slug: "engenharia-arquitetura", title: "Engenharia e arquitetura", duration: "9 min", available: true },
      { slug: "revisao-trigonometria", title: "Revisão do módulo", duration: "8 min", available: true },
    ],
  },
  {
    slug: "preparacao-limites",
    n: 6,
    shortTitle: "Preparação p/ limites",
    title: "Preparação para limites",
    desc: "Aproximação, comportamento de funções e tendência — a porta de entrada para Cálculo 1.",
    defaultState: "open",
    apps: ["velocidade", "tendências"],
    contents: [
      "Ideia de aproximação",
      "Comportamento de funções",
      "Valores próximos de um ponto",
      "Ideia de tendência",
      "Interpretação gráfica",
    ],
    applications: [
      "Velocidade próxima de um instante",
      "Tendência de crescimento",
      "Aproximações em gráficos",
      "Comportamento de sistemas",
      "Leitura de mudanças pequenas",
    ],
    lessons: [
      { slug: "ideia-aproximacao", title: "Ideia de aproximação", duration: "11 min", available: true },
      { slug: "comportamento-funcoes", title: "Comportamento de funções", duration: "12 min", available: true },
      { slug: "valores-proximos", title: "Valores próximos de um ponto", duration: "10 min", available: true },
      { slug: "ideia-tendencia", title: "Ideia de tendência", duration: "11 min", available: true },
      { slug: "interpretacao-grafica", title: "Interpretação gráfica", duration: "10 min", available: true },
      { slug: "velocidade-tendencia", title: "Velocidade e tendência", duration: "9 min", available: true },
    ],
  },
];

export function lessonId(moduloSlug: string, aulaSlug: string) {
  return `pre-calculo/${moduloSlug}/${aulaSlug}`;
}

export function lessonPath(moduloSlug: string, aulaSlug: string) {
  return `/pre-calculo/${moduloSlug}/${aulaSlug}`;
}

export function moduloPath(moduloSlug: string) {
  return `/pre-calculo/${moduloSlug}`;
}

export function getModulo(slug: string): PreCalculoModulo | undefined {
  return preCalculoModulos.find((m) => m.slug === slug);
}

export function getAula(
  moduloSlug: string,
  aulaSlug: string,
): { modulo: PreCalculoModulo; aula: PreCalculoAula } | undefined {
  const modulo = getModulo(moduloSlug);
  if (!modulo) return undefined;
  const aula = modulo.lessons.find((l) => l.slug === aulaSlug);
  if (!aula) return undefined;
  return { modulo, aula };
}

export function getAllAulaParams() {
  return preCalculoModulos.flatMap((m) =>
    m.lessons
      .filter((l) => l.available)
      .map((l) => ({ modulo: m.slug, aula: l.slug })),
  );
}

export function getAllModuloParams() {
  return preCalculoModulos.map((m) => ({ modulo: m.slug }));
}
