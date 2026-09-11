import { exerciciosAlgebra } from "@/data/exercicios-algebra";
import { exerciciosSinais } from "@/data/exercicios-sinais";
import { exerciciosModulo } from "@/data/exercicios-modulo";
import { exerciciosLhopital } from "@/data/exercicios-lhopital";
import { exerciciosTrigEquacoes } from "@/data/exercicios-trig-equacoes";
import { exerciciosGeometria } from "@/data/exercicios-geometria";
import { exerciciosAplicacoesDerivadas } from "@/data/exercicios-aplicacoes-derivadas";
import { exerciciosContinuidade } from "@/data/exercicios-continuidade";
import { exerciciosDerivadas } from "@/data/exercicios-derivadas";
import { exerciciosDesafios } from "@/data/exercicios-desafios";
import { exerciciosFuncaoQuadratica } from "@/data/exercicios-funcao-quadratica";
import { exerciciosFuncoes } from "@/data/exercicios-funcoes";
import { exerciciosFuncoesCalculo } from "@/data/exercicios-funcoes-calculo";
import { exerciciosIntegrais } from "@/data/exercicios-integrais";
import { exerciciosGraficos } from "@/data/exercicios-graficos";
import { exerciciosPreparacaoLimites } from "@/data/exercicios-preparacao-limites";
import { exerciciosTrigonometria } from "@/data/exercicios-trigonometria";
import { exerciciosFundamentos } from "@/data/exercicios-fundamentos";
import { exerciciosLimites } from "@/data/exercicios-limites";
import { exerciciosFase2 } from "@/data/exercicios-fase2";
import type { AnswerCheckOptions } from "@/lib/answer-check";
import type { PlotId } from "@/data/plots";
import { exerciciosPropriedadesLimites } from "@/data/exercicios-propriedades-limites";
import { exerciciosRevisaoCurricular } from "@/data/exercicios-revisao-curricular";

export type ExerciseType =
  | "compreensao"
  | "calculo"
  | "aplicada"
  | "interpretacao";

export type ExerciseLevel = "facil" | "medio" | "dificil" | "desafio";
export type PedagogicalExerciseLevel = 1 | 2 | 3 | 4 | 5;

export type Exercicio = {
  id: string;
  num: string;
  title: string;
  tema: string;
  temaSlug: string;
  area: string;
  type: ExerciseType;
  level: ExerciseLevel;
  /** Escala pedagógica da Fase 2. Itens legados recebem nível por regra de migração. */
  pedagogicalLevel?: PedagogicalExerciseLevel;
  enunciado: string;
  /** Figura do enunciado (ver `@/data/plots`). Obrigatória quando o enunciado
   *  manda o aluno ler um gráfico — antes esses exercícios só descreviam a
   *  curva em palavras. */
  grafico?: PlotId;
  identificar: string | string[];
  dica: string;
  resolucao: string;
  resolucaoSteps?: string[];
  resposta: string;
  answerCheck?: AnswerCheckOptions;
  interpretacao: string;
  erroComum: string;
};

export const exercicioTemas = [
  { slug: "todos", label: "Todos" },
  { slug: "fundamentos", label: "Fundamentos" },
  { slug: "algebra", label: "Álgebra" },
  { slug: "funcoes", label: "Funções" },
  { slug: "funcoes-calculo", label: "Funções p/ cálculo" },
  { slug: "graficos", label: "Gráficos" },
  { slug: "geometria-analitica", label: "Geometria analítica" },
  { slug: "trigonometria", label: "Trigonometria" },
  { slug: "preparacao-limites", label: "Preparação p/ limites" },
  { slug: "funcao-afim", label: "Função afim" },
  { slug: "funcao-quadratica", label: "Função quadrática" },
  { slug: "limites", label: "Limites" },
  { slug: "continuidade", label: "Continuidade" },
  { slug: "derivadas", label: "Derivadas" },
  { slug: "aplicacoes-derivadas", label: "Aplic. derivadas" },
  { slug: "integrais", label: "Integrais" },
] as const;

export const exercicioNiveis = [
  { slug: "todos", label: "Todos" },
  { slug: "1", label: "1 · Fundamentos" },
  { slug: "2", label: "2 · Aplicação direta" },
  { slug: "3", label: "3 · Interpretação" },
  { slug: "4", label: "4 · Problema" },
  { slug: "5", label: "5 · Desafio" },
] as const;

export const exercicios: Exercicio[] = [
  {
    id: "ex-01",
    num: "EX-01",
    title: "Conta da corrida de app",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Cotidiano · mobilidade",
    type: "calculo",
    level: "facil",
    enunciado:
      "Uma corrida cobra bandeirada de R$ 6,00 e R$ 2,40 por km. (a) Escreva a função do custo. (b) Calcule o custo para 8 km. (c) Quantos km com R$ 30,00?",
    identificar: [
      "Qual é a parte fixa (bandeirada)?",
      "Qual é a taxa por km?",
      "O que \\(x\\) representa?",
    ],
    dica: "Use \\(C(x) = ax + b\\): \\(b = 6\\) e \\(a = 2{,}40\\). Para (c), iguale \\(C(x) = 30\\) e isole \\(x\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(b = 6\\) (bandeirada) e \\(a = 2{,}40\\) (por km).",
      "Função: \\(C(x) = 2{,}40x + 6\\).",
      "Para \\(x = 8\\): \\(C(8) = 2{,}40 \\cdot 8 + 6 = 25{,}20\\) (R$ 25,20).",
      "Para \\(C(x) = 30\\): \\(30 = 2{,}40x + 6 \\Rightarrow x = 10\\) km.",
    ],
    resposta: "(a) \\(C(x) = 2{,}40x + 6\\) · (b) R$ 25,20 · (c) 10 km",
    interpretacao:
      "A cada km a mais, o custo sobe R$ 2,40 de forma constante. Mesmo com 0 km, você pagaria R$ 6,00 — o custo de acionar o serviço.",
    erroComum: "Esquecer a bandeirada e responder só \\(2{,}40 \\times 8 = 19{,}20\\) (R$ 19,20).",
  },
  {
    id: "ex-02",
    num: "EX-02",
    title: "Plano de internet com pacote extra",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Finanças · telecom",
    type: "aplicada",
    level: "facil",
    enunciado:
      "Um plano cobra R$ 40,00 fixos mais R$ 5,00 por pacote extra de dados. Monte a função \\(C(x)\\) do custo total.",
    identificar: "Fixo mensal e preço por pacote extra.",
    dica: "\\(x\\) = número de pacotes extras. Parte fixa é \\(b\\), preço por pacote é \\(a\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Parte fixa, paga mesmo sem pacote extra: \\(b = 40\\).",
      "Parte que cresce com o número \\(x\\) de pacotes extras: \\(a = 5\\) por pacote.",
      "\\(C(x) = ax + b = 5x + 40\\).",
      "Conferência: \\(C(0) = 40\\) (só o fixo) e \\(C(2) = 5 \\cdot 2 + 40 = 50\\).",
    ],
    resposta: "\\(C(x) = 5x + 40\\)",
    interpretacao:
      "Os R$ 40 existem mesmo com \\(x = 0\\); cada pacote adiciona R$ 5 linearmente.",
    erroComum: "Trocar os coeficientes: \\(C(x) = 40x + 5\\).",
  },
  {
    id: "ex-03",
    num: "EX-03",
    title: "Salário base + comissão",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Administração · trabalho",
    type: "calculo",
    level: "medio",
    enunciado:
      "Salário fixo de R$ 1.800 + 4% sobre vendas. Quanto recebe com vendas de R$ 12.000?",
    identificar: "Fixo + percentual aplicado sobre as vendas, não sobre o salário.",
    dica: "Comissão \\(= 0{,}04 \\times 12000\\). Some ao fixo de 1800.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Salário em função das vendas: \\(S(v) = 1800 + 0{,}04v\\), pois \\(4\\% = 0{,}04\\).",
      "Comissão: \\(0{,}04 \\cdot 12\\,000 = 480\\).",
      "\\(S(12\\,000) = 1800 + 480 = 2280\\): recebe R$ 2.280,00.",
    ],
    resposta: "R$ 2.280,00",
    interpretacao:
      "A comissão cresce proporcionalmente às vendas — comportamento afim quando a taxa é constante.",
    erroComum: "Aplicar \\(4\\%\\) sobre 1800 em vez de sobre 12000.",
  },
  {
    id: "ex-04",
    num: "EX-04",
    title: "O que significa o coeficiente b?",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Compreensão · conceito",
    type: "compreensao",
    level: "facil",
    enunciado:
      "Em uma função do tipo \\(f(x) = ax + b\\), o que o valor \\(b\\) representa em uma situação real?",
    identificar: "Pense no que não depende de \\(x\\).",
    dica: "Exemplos: bandeirada, mensalidade, salário fixo.",
    resolucao:
      "\\(b\\) é o valor inicial ou parte fixa — o que existe antes de contar unidades de \\(x\\).",
    resposta: "A parte fixa / valor inicial.",
    interpretacao:
      "Confundir \\(a\\) e \\(b\\) é um dos erros mais comuns em problemas aplicados.",
    erroComum: "Dizer que \\(b\\) é a taxa de crescimento por unidade.",
  },
  {
    id: "ex-05",
    num: "EX-05",
    title: "Interpretar os coeficientes",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Compreensão · interpretação",
    type: "interpretacao",
    level: "medio",
    enunciado: "Na função \\(C(x) = 5x + 40\\), o que significa o 40? E o 5?",
    identificar: "Relacione cada número com a situação do plano de internet.",
    dica: "Compare com fixo + variável.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Sem pacotes extras: \\(C(0) = 5 \\cdot 0 + 40 = 40\\). O \\(40\\) é o custo fixo do plano.",
      "Um pacote a mais: \\(C(x + 1) - C(x) = 5\\). O \\(5\\) é o preço de cada pacote adicional.",
      "Em resumo: \\(40\\) não depende de \\(x\\); \\(5\\) multiplica \\(x\\) e é a taxa por pacote.",
    ],
    resposta: "\\(40 \\to\\) fixo · \\(5 \\to\\) taxa por pacote",
    interpretacao:
      "Interpretar coeficientes é tão importante quanto calcular — é o que a prova cobra em contexto.",
    erroComum: "Achar que 5 é o custo total ou que 40 multiplica \\(x\\).",
  },
  {
    id: "ex-06",
    num: "EX-06",
    title: "Custo de produção variável",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Engenharia · produção",
    type: "aplicada",
    level: "medio",
    enunciado:
      "Custo fixo de R$ 500 + R$ 12 por unidade produzida. Qual o custo de 80 unidades? E quanto custa produzir 0 unidades?",
    identificar: "\\(C(x) = 12x + 500\\). Custo com \\(x = 0\\) revela só o fixo.",
    dica: "Substitua \\(x = 80\\). Para \\(x = 0\\), só resta \\(b\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Função custo: \\(C(x) = 12x + 500\\).",
      "\\(C(80) = 12 \\cdot 80 + 500 = 960 + 500 = 1460\\): R$ 1.460,00.",
      "\\(C(0) = 12 \\cdot 0 + 500 = 500\\): mesmo sem produzir nada, o fixo de R$ 500 é pago.",
    ],
    resposta: "R$ 1.460,00 para 80 un. · R$ 500,00 de fixo total",
    interpretacao:
      "O fixo não se divide automaticamente por unidade — é um custo global da operação.",
    erroComum: "Dividir \\(500\\) por \\(80\\) e somar errado ao custo variável.",
  },
  {
    id: "ex-07",
    num: "EX-07",
    title: "Comparando dois planos de telefone",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Finanças · comparação",
    type: "aplicada",
    level: "dificil",
    enunciado:
      "Plano A: R$ 30 + R$ 0,80 por minuto. Plano B: R$ 50 + R$ 0,50 por minuto. Para quantos minutos os planos custam igual?",
    identificar: "Monte \\(C_A(x)\\) e \\(C_B(x)\\) e iguale.",
    dica: "\\(30 + 0{,}80x = 50 + 0{,}50x \\Rightarrow\\) isole \\(x\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(C_A(x) = 30 + 0{,}80x\\) e \\(C_B(x) = 50 + 0{,}50x\\), com \\(x\\) em minutos.",
      "Iguale: \\(30 + 0{,}80x = 50 + 0{,}50x \\Rightarrow 0{,}30x = 20\\).",
      "\\(x = \\frac{20}{0{,}30} \\approx 66{,}67\\) minutos, isto é, 66 min 40 s.",
      "Conferência: \\(C_A \\approx 30 + 53{,}33 = 83{,}33\\) e \\(C_B \\approx 50 + 33{,}33 = 83{,}33\\).",
    ],
    resposta: "\\(\\approx 66{,}7\\) minutos (ou 66 min 40 s)",
    interpretacao:
      "Antes do ponto de equilíbrio um plano é melhor; depois, o outro — típico de funções afins.",
    erroComum: "Comparar só o fixo ou só a taxa, sem igualar as funções.",
  },
  {
    id: "ex-08",
    num: "EX-08",
    title: "Otimização de frete com taxa fixa",
    tema: "Função afim",
    temaSlug: "funcao-afim",
    area: "Logística · desafio",
    type: "calculo",
    level: "desafio",
    enunciado:
      "Frete: R$ 120 de taxa fixa + R$ 3,50 por km. Orçamento máximo R$ 500. Qual a distância máxima possível?",
    identificar: "Inequação \\(C(x) \\leq 500\\) com \\(C(x) = 3{,}50x + 120\\).",
    dica: "\\(500 \\geq 3{,}50x + 120 \\Rightarrow\\) isole \\(x\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Custo do frete: \\(C(x) = 3{,}50x + 120\\). O orçamento exige \\(3{,}50x + 120 \\leq 500\\).",
      "Tire a taxa fixa: \\(3{,}50x \\leq 500 - 120 = 380\\).",
      "Divida por \\(3{,}50\\), que é positivo (o sinal não inverte): \\(x \\leq \\frac{380}{3{,}50} \\approx 108{,}57\\) km.",
      "A distância máxima é de cerca de \\(108{,}6\\) km; acima disso o frete passa de R$ 500.",
    ],
    resposta: "\\(\\approx 108{,}6\\) km (máximo)",
    interpretacao:
      "Problemas de orçamento máximo são inequações disfarçadas de função afim.",
    erroComum: "Esquecer a taxa fixa na inequação.",
  },
  ...exerciciosFundamentos,
  ...exerciciosAlgebra,
  ...exerciciosSinais,
  ...exerciciosModulo,
  ...exerciciosLhopital,
  ...exerciciosTrigEquacoes,
  ...exerciciosGeometria,
  ...exerciciosFuncoes,
  ...exerciciosFuncaoQuadratica,
  ...exerciciosFuncoesCalculo,
  ...exerciciosGraficos,
  ...exerciciosTrigonometria,
  ...exerciciosPreparacaoLimites,
  ...exerciciosLimites,
  ...exerciciosContinuidade,
  ...exerciciosDerivadas,
  ...exerciciosAplicacoesDerivadas,
  ...exerciciosIntegrais,
  ...exerciciosDesafios,
  ...exerciciosFase2,
  ...exerciciosPropriedadesLimites,
  ...exerciciosRevisaoCurricular,
];
