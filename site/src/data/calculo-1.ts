import type { TrilhaModuloData } from "@/data/trilha-module";
import { calculo1Phase2Catalog } from "@/data/aulas/calculo-1/fase2";

export const calculo1Trilha = {
  slug: "calculo-1",
  title: "Cálculo 1",
  eyebrow: "Trilha · A faculdade sem medo",
  description:
    "Limites, derivadas e integrais completos: primeiro a ideia, depois a técnica, sempre com aplicação, cinco níveis de prática e checkpoints cumulativos.",
  stats: [
    { n: "7", label: "Módulos" },
    { n: "91", label: "Aulas" },
    { n: "176", label: "Exercícios" },
    { n: "~10", label: "Semanas" },
  ],
};

export const calculo1Modulos: TrilhaModuloData[] = [
  {
    slug: "antes-do-calculo",
    n: 1,
    shortTitle: "Antes do Cálculo",
    title: "Antes do Cálculo",
    desc: "O que é Cálculo 1, por que assusta, e como estudar sem trauma.",
    defaultState: "open",
    apps: ["orientação", "estudo", "motivação"],
    contents: [
      "O que é Cálculo 1",
      "Por que tanta gente reprova",
      "O que você precisa saber antes",
      "Como estudar Cálculo",
      "Função, gráfico, limite, derivada e integral",
    ],
    applications: [
      "Movimento e velocidade",
      "Crescimento e variação",
      "Otimização de recursos",
      "Acúmulo (área, consumo)",
    ],
    lessons: [
      { slug: "o-que-e-calculo-1", title: "O que é Cálculo 1?", duration: "10 min", available: true },
      { slug: "por-que-reprovam", title: "Por que tanta gente reprova?", duration: "9 min", available: true },
      { slug: "pre-requisitos", title: "O que você precisa saber antes", duration: "11 min", available: true },
      { slug: "como-estudar", title: "Como estudar Cálculo sem trauma", duration: "12 min", available: true },
      { slug: "mapa-da-trilha", title: "Mapa: função → limite → derivada → integral", duration: "8 min", available: true },
    ],
  },
  {
    slug: "funcoes-para-calculo",
    n: 2,
    shortTitle: "Funções p/ Cálculo",
    title: "Funções para Cálculo",
    desc: "Revisão focada no que será usado em limites, derivadas e integrais.",
    defaultState: "open",
    apps: ["custo", "lucro", "velocidade"],
    contents: [
      "Funções no contexto do Cálculo",
      "Domínio e imagem",
      "Gráficos e leitura",
      "Crescimento e decrescimento",
      "Interpretação aplicada",
    ],
    applications: [
      "Custos e receitas",
      "Lucro",
      "Velocidade",
      "Temperatura",
      "Produção",
    ],
    lessons: [
      { slug: "funcoes-no-calculo", title: "Funções no contexto do Cálculo", duration: "10 min", available: true },
      { slug: "dominio-imagem", title: "Domínio e imagem (revisão)", duration: "11 min", available: true },
      { slug: "graficos-leitura", title: "Ler gráficos com sentido", duration: "10 min", available: true },
      { slug: "crescimento-decrescimento", title: "Crescimento e decrescimento", duration: "11 min", available: true },
      { slug: "interpretacao-grafica", title: "Interpretar o que o gráfico diz", duration: "10 min", available: true },
      { slug: "custo-receita", title: "Custo, receita e lucro", duration: "12 min", available: true },
      { slug: "velocidade-temperatura", title: "Velocidade e temperatura", duration: "10 min", available: true },
      ...calculo1Phase2Catalog["funcoes-para-calculo"],
      { slug: "revisao-funcoes-calculo", title: "Revisão do módulo", duration: "8 min", available: true },
    ],
  },
  {
    slug: "limites",
    n: 3,
    shortTitle: "Limites",
    title: "Limites sem trauma",
    desc: "Aproximação, limites por tabela, gráfico, laterais, infinitos e assíntotas.",
    defaultState: "open",
    apps: ["velocidade instantânea", "tendência"],
    contents: [
      "Ideia de aproximação",
      "Limite por tabela e gráfico",
      "Limite por substituição",
      "Limites laterais",
      "Limites infinitos e no infinito",
      "Assíntotas",
    ],
    applications: [
      "Velocidade instantânea",
      "Aproximação de valores",
      "Tendência de gráficos",
      "Crescimento sem limite",
    ],
    lessons: [
      { slug: "ideia-de-limite", title: "Ideia de limite (intuitivo)", duration: "12 min", available: true },
      { slug: "limite-por-tabela", title: "Limite por tabela", duration: "11 min", available: true },
      { slug: "limite-por-grafico", title: "Limite por gráfico", duration: "12 min", available: true },
      { slug: "limite-substituicao", title: "Limite por substituição", duration: "13 min", available: true },
      { slug: "limites-laterais", title: "Limites laterais", duration: "11 min", available: true },
      { slug: "limite-infinito", title: "Limites infinitos", duration: "12 min", available: true },
      { slug: "limite-no-infinito", title: "Limites no infinito", duration: "11 min", available: true },
      { slug: "assintotas", title: "Assíntotas", duration: "12 min", available: true },
      { slug: "velocidade-instantanea", title: "Velocidade instantânea", duration: "14 min", available: true },
      { slug: "aplicacoes-limites", title: "Aplicações de limites", duration: "10 min", available: true },
      ...calculo1Phase2Catalog.limites,
      { slug: "revisao-limites", title: "Revisão do módulo", duration: "9 min", available: true },
    ],
  },
  {
    slug: "continuidade",
    n: 4,
    shortTitle: "Continuidade",
    title: "Continuidade",
    desc: "Quando uma função não tem quebras: furos, saltos e assíntotas.",
    defaultState: "open",
    apps: ["movimento", "sinais"],
    contents: [
      "Ideia visual de continuidade",
      "Furos e saltos no gráfico",
      "Assíntotas e quebras",
      "Continuidade em um ponto",
      "Continuidade em intervalos",
    ],
    applications: [
      "Modelos sem interrupção",
      "Temperatura ao longo do tempo",
      "Movimento contínuo",
      "Produção contínua",
    ],
    lessons: [
      { slug: "ideia-continuidade", title: "Ideia visual de continuidade", duration: "11 min", available: true },
      { slug: "furos-saltos", title: "Furos e saltos", duration: "12 min", available: true },
      { slug: "assintotas-continuidade", title: "Assíntotas e continuidade", duration: "10 min", available: true },
      { slug: "continuidade-ponto", title: "Continuidade em um ponto", duration: "11 min", available: true },
      { slug: "continuidade-intervalo", title: "Continuidade em intervalos", duration: "10 min", available: true },
      ...calculo1Phase2Catalog.continuidade,
      { slug: "revisao-continuidade", title: "Revisão do módulo", duration: "8 min", available: true },
    ],
  },
  {
    slug: "derivadas",
    n: 5,
    shortTitle: "Derivadas",
    title: "Derivadas com sentido",
    desc: "Taxa de variação, reta tangente, regras e interpretação prática.",
    defaultState: "open",
    apps: ["velocidade", "lucro marginal"],
    contents: [
      "Variação média e instantânea",
      "Reta secante e tangente",
      "Definição de derivada",
      "Regras de derivação",
      "Interpretação da derivada",
    ],
    applications: [
      "Velocidade e aceleração",
      "Lucro e custo marginal",
      "Crescimento de empresas",
      "Variação de temperatura",
    ],
    lessons: [
      { slug: "variacao-media", title: "Variação média", duration: "11 min", available: true },
      { slug: "variacao-instantanea", title: "Variação instantânea", duration: "12 min", available: true },
      { slug: "reta-secante-tangente", title: "Reta secante e tangente", duration: "13 min", available: true },
      { slug: "definicao-derivada", title: "Definição de derivada", duration: "14 min", available: true },
      { slug: "regras-derivacao", title: "Regras de derivação", duration: "15 min", available: true },
      { slug: "derivada-potencia", title: "Derivada de potências", duration: "12 min", available: true },
      { slug: "derivada-produto-quociente", title: "Produto e quociente", duration: "13 min", available: true },
      { slug: "derivada-composta", title: "Regra da cadeia (introdução)", duration: "12 min", available: true },
      { slug: "interpretacao-derivada", title: "Interpretar a derivada", duration: "11 min", available: true },
      { slug: "velocidade-aceleracao", title: "Velocidade e aceleração", duration: "12 min", available: true },
      { slug: "custo-marginal", title: "Custo e lucro marginal", duration: "11 min", available: true },
      ...calculo1Phase2Catalog.derivadas,
      { slug: "revisao-derivadas", title: "Revisão do módulo", duration: "9 min", available: true },
    ],
  },
  {
    slug: "aplicacoes-derivadas",
    n: 6,
    shortTitle: "Aplic. derivadas",
    title: "Aplicações de derivadas",
    desc: "Máximos, mínimos, otimização e problemas aplicados.",
    defaultState: "open",
    apps: ["otimização", "produção"],
    contents: [
      "Crescimento e decrescimento",
      "Máximos e mínimos",
      "Pontos críticos",
      "Concavidade",
      "Otimização",
    ],
    applications: [
      "Lucro máximo",
      "Custo mínimo",
      "Área e volume máximos",
      "Produção otimizada",
    ],
    lessons: [
      { slug: "crescimento-decrescimento-deriv", title: "Onde a função sobe ou desce", duration: "11 min", available: true },
      { slug: "maximos-minimos", title: "Máximos e mínimos", duration: "14 min", available: true },
      { slug: "pontos-criticos", title: "Pontos críticos", duration: "12 min", available: true },
      { slug: "concavidade", title: "Concavidade", duration: "11 min", available: true },
      { slug: "otimizacao", title: "Problemas de otimização", duration: "15 min", available: true },
      { slug: "velocidade-producao", title: "Velocidade e produção", duration: "12 min", available: true },
      { slug: "area-volume-max", title: "Área e volume máximos", duration: "13 min", available: true },
      { slug: "lucro-maximo", title: "Lucro máximo na prática", duration: "12 min", available: true },
      ...calculo1Phase2Catalog["aplicacoes-derivadas"],
      { slug: "revisao-aplic-derivadas", title: "Revisão do módulo", duration: "8 min", available: true },
    ],
  },
  {
    slug: "integrais",
    n: 7,
    shortTitle: "Integrais",
    title: "Integrais com sentido",
    desc: "Soma acumulada, área sob o gráfico, integral definida e TFC.",
    defaultState: "open",
    apps: ["área", "consumo", "distância"],
    contents: [
      "Ideia de soma acumulada",
      "Área sob o gráfico",
      "Integral indefinida e definida",
      "Propriedades",
      "Teorema Fundamental do Cálculo",
    ],
    applications: [
      "Área e volume",
      "Distância total percorrida",
      "Consumo acumulado",
      "Energia acumulada",
    ],
    lessons: [
      { slug: "ideia-de-soma", title: "Ideia de soma acumulada", duration: "11 min", available: true },
      { slug: "area-sob-grafico", title: "Área sob o gráfico", duration: "13 min", available: true },
      { slug: "integral-indefinida", title: "Integral indefinida", duration: "12 min", available: true },
      { slug: "integral-definida", title: "Integral definida", duration: "14 min", available: true },
      { slug: "propriedades-integral", title: "Propriedades da integral", duration: "11 min", available: true },
      { slug: "tfc", title: "Teorema Fundamental do Cálculo", duration: "15 min", available: true },
      { slug: "distancia-total", title: "Distância total a partir da velocidade", duration: "12 min", available: true },
      { slug: "consumo-acumulado", title: "Consumo acumulado", duration: "11 min", available: true },
      { slug: "area-volume-integral", title: "Área e volume", duration: "13 min", available: true },
      { slug: "aplicacoes-integrais", title: "Aplicações práticas", duration: "10 min", available: true },
      ...calculo1Phase2Catalog.integrais,
      { slug: "revisao-integrais", title: "Revisão do módulo", duration: "9 min", available: true },
    ],
  },
];

export function calculo1LessonId(moduloSlug: string, aulaSlug: string) {
  return `calculo-1/${moduloSlug}/${aulaSlug}`;
}

export function calculo1LessonPath(moduloSlug: string, aulaSlug: string) {
  return `/calculo-1/${moduloSlug}/${aulaSlug}`;
}

export function calculo1ModuloPath(moduloSlug: string) {
  return `/calculo-1/${moduloSlug}`;
}

export function getCalculo1Modulo(slug: string) {
  return calculo1Modulos.find((m) => m.slug === slug);
}

export function getCalculo1Aula(moduloSlug: string, aulaSlug: string) {
  const modulo = getCalculo1Modulo(moduloSlug);
  if (!modulo) return undefined;
  const aula = modulo.lessons.find((l) => l.slug === aulaSlug);
  if (!aula) return undefined;
  return { modulo, aula };
}

export function getAllCalculo1ModuloParams() {
  return calculo1Modulos.map((m) => ({ modulo: m.slug }));
}

export function getAllCalculo1AulaParams() {
  return calculo1Modulos.flatMap((m) =>
    m.lessons.map((l) => ({ modulo: m.slug, aula: l.slug })),
  );
}
