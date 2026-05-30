import type { AulaContent } from "@/data/aulas/types";
import { calculo1LessonPath } from "@/data/calculo-1";

export const oQueECalculo1Aula: AulaContent = {
  meta: {
    title: "O que é Cálculo 1? (sem terror)",
    moduleSlug: "antes-do-calculo",
    moduleTitle: "Antes do Cálculo",
    lessonNumber: 1,
    duration: "10 min",
    level: "iniciante",
    readingNotes: ["Mapa da trilha", "3 exemplos do dia a dia"],
    glossaryTerms: ["Limite", "Derivada", "Integral", "Função"],
    nextLesson: {
      title: "Por que tanta gente reprova?",
      href: calculo1LessonPath("antes-do-calculo", "por-que-reprovam"),
    },
  },
  porQue: {
    title: "Antes da fórmula, o sentido",
    paragraphs: [
      "Cálculo 1 não é uma lista de fórmulas para decorar. É o estudo de como as coisas mudam e de como somar efeitos pequenos para obter um total.",
      "Na faculdade você vai encontrar limites, derivadas e integrais — mas todos respondem perguntas que você já faz no dia a dia: \"até onde isso vai?\", \"quão rápido muda?\", \"quanto acumulou no total?\"",
      "Esta trilha começa pela ideia. A notação vem depois, quando você já sabe o que está procurando.",
    ],
  },
  explicacao: {
    title: "Os três pilares em linguagem humana",
    paragraphs: [
      "Limite: o que acontece quando você se aproxima de um valor (velocidade no instante, tendência de um gráfico).",
      "Derivada: a taxa de variação naquele instante — quanto algo cresce ou cai por unidade de tempo, distância ou produção.",
      "Integral: o acúmulo — área sob um gráfico, distância total a partir da velocidade, consumo somado ao longo do mês.",
    ],
    callout:
      "Se você dominar funções no Pré-Cálculo, metade da batalha do Cálculo 1 já foi vencida.",
    formula: "Cálculo 1 ≈ limites + derivadas + integrais",
    formulaLegend: "sempre ligados a funções e gráficos",
  },
  ondeAparece: {
    title: "Onde isso aparece na vida real",
    items: [
      { label: "Engenharia", detail: "Projeto de estruturas, fluxo, sinais" },
      { label: "Economia", detail: "Custo marginal, lucro máximo" },
      { label: "Física", detail: "Velocidade, aceleração, energia" },
      { label: "Medicina", detail: "Concentração de fármacos no tempo" },
      { label: "TI / dados", detail: "Taxas de aprendizado, otimização" },
      { label: "Cotidiano", detail: "Previsão de gastos, consumo, deslocamento" },
    ],
  },
  exemplo: {
    title: "Um exemplo antes de qualquer símbolo",
    situacao:
      "Um carro percorre 60 km em 1 hora. Qual a velocidade média? E o que significa \"velocidade no instante\" quando o motorista acelera e freia?",
  },
  passos: {
    title: "Como pensar o problema",
    steps: [
      {
        title: "Velocidade média",
        detail: "60 km ÷ 1 h = 60 km/h — isso é variação média de posição.",
      },
      {
        title: "Velocidade instantânea",
        detail: "No velocímetro, o valor muda a cada segundo — aí entra o limite e a derivada.",
      },
      {
        title: "Distância total no trajeto",
        detail: "Somar muitos trechos pequenos de velocidade × tempo — ideia da integral.",
      },
      {
        title: "Conectar com a trilha",
        detail: "Limites → derivadas → aplicações → integrais, nesta ordem pedagógica.",
      },
    ],
  },
  interpretacao: {
    title: "O que levar desta aula",
    paragraphs: [
      "Cálculo 1 é aplicado por natureza. Cada tópico da trilha terá situação real antes da conta.",
      "Reprovar costuma vir de pular a intuição e ir direto para regras sem contexto — aqui fazemos o oposto.",
      "Revise funções no Pré-Cálculo se sentir lacunas; o módulo 2 desta trilha também reforça o essencial.",
    ],
  },
  erros: {
    title: "Cuidado com",
    items: [
      "Achar que Cálculo é só álgebra com letras diferentes.",
      "Decorar fórmulas sem saber o que cada símbolo mede na prática.",
      "Pular o Pré-Cálculo e ir direto para limites sem dominar gráficos.",
      "Estudar só teoria sem exercícios guiados e aplicados.",
    ],
  },
  exerciciosGuiados: {
    title: "Exercícios guiados",
    exercises: [
      {
        id: "c1-g1",
        type: "compreensao",
        enunciado:
          "Qual pergunta um limite ajuda a responder em uma situação real?",
        identificar: "Pense em \"para onde tende\" quando x se aproxima de um valor.",
        dica: "Velocidade no instante é um caso clássico.",
        resolucao:
          "Limite descreve o comportamento de f(x) quando x se aproxima de um número — sem precisar chegar exatamente nele.",
        resposta: "Para onde a grandeza tende quando nos aproximamos de um valor.",
        interpretacao: "É a ponte entre média e instantâneo.",
      },
      {
        id: "c1-g2",
        type: "interpretacao",
        enunciado:
          "Uma empresa quer saber se o lucro ainda cresce na produção atual. Derivada ou integral?",
        identificar: "Crescimento naquele ponto = taxa de variação.",
        dica: "Derivada mede \"quão rápido muda agora\".",
        resolucao: "Lucro marginal é derivada do lucro em relação à quantidade produzida.",
        resposta: "Derivada.",
        interpretacao: "Integral seria para acumular lucro ao longo de vários períodos.",
      },
    ],
  },
  exerciciosAplicados: {
    title: "Exercícios aplicados",
    intro: "Em breve: banco de exercícios dedicado ao módulo Antes do Cálculo.",
    exerciseIds: [],
  },
  resumo: {
    title: "Resumo da aula",
    bullets: [
      "Cálculo 1 estuda mudança (derivada) e acúmulo (integral), com limites como base.",
      "Tudo se apoia em funções e gráficos — revise o Pré-Cálculo quando precisar.",
      "A trilha segue: antes do cálculo → funções → limites → continuidade → derivadas → aplicações → integrais.",
      "Estude pelo sentido primeiro; a fórmula vem para nomear o que você já entendeu.",
    ],
  },
};
