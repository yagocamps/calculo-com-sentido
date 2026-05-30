export type TopicId =
  | "operacoes"
  | "fracoes"
  | "potencias"
  | "equacoes"
  | "funcoes"
  | "graficos"
  | "trigonometria"
  | "limites";

export type OptionKey = "A" | "B" | "C" | "D";

export type TestQuestion = {
  id: string;
  topic: TopicId;
  topicLabel: string;
  subtopic?: string;
  question: string;
  context?: string;
  formula?: string;
  options: { key: OptionKey; text: string }[];
  correct: OptionKey;
  explanation: string;
};

export const testTopics: { id: TopicId; label: string }[] = [
  { id: "operacoes", label: "Operações básicas" },
  { id: "fracoes", label: "Frações" },
  { id: "potencias", label: "Potências e raízes" },
  { id: "equacoes", label: "Equações" },
  { id: "funcoes", label: "Funções" },
  { id: "graficos", label: "Gráficos" },
  { id: "trigonometria", label: "Trigonometria" },
  { id: "limites", label: "Noções de limite" },
];

export const testQuestions: TestQuestion[] = [
  {
    id: "q01",
    topic: "operacoes",
    topicLabel: "Operações básicas",
    question: "Quanto é 18 + 7 × 2?",
    context: "Lembre-se da ordem das operações (multiplicação antes da soma).",
    options: [
      { key: "A", text: "50" },
      { key: "B", text: "32" },
      { key: "C", text: "25" },
      { key: "D", text: "36" },
    ],
    correct: "B",
    explanation:
      "Primeiro 7 × 2 = 14, depois 18 + 14 = 32. Erro comum: somar 18 + 7 antes de multiplicar.",
  },
  {
    id: "q02",
    topic: "fracoes",
    topicLabel: "Frações",
    question: "Qual é o valor de 3/4 + 1/2?",
    options: [
      { key: "A", text: "4/6" },
      { key: "B", text: "5/4" },
      { key: "C", text: "1/4" },
      { key: "D", text: "2/3" },
    ],
    correct: "B",
    explanation:
      "1/2 = 2/4, então 3/4 + 2/4 = 5/4 (ou 1,25). É preciso mesmo denominador.",
  },
  {
    id: "q03",
    topic: "potencias",
    topicLabel: "Potências e raízes",
    question: "Qual é o valor de 2³ × 2²?",
    options: [
      { key: "A", text: "2⁵" },
      { key: "B", text: "2⁶" },
      { key: "C", text: "4⁵" },
      { key: "D", text: "2¹" },
    ],
    correct: "A",
    explanation: "Mesma base: somamos os expoentes. 2³ × 2² = 2⁵ = 32.",
  },
  {
    id: "q04",
    topic: "potencias",
    topicLabel: "Potências e raízes",
    subtopic: "Raízes",
    question: "Qual é o valor de √81?",
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "9" },
      { key: "C", text: "18" },
      { key: "D", text: "40,5" },
    ],
    correct: "B",
    explanation: "9 × 9 = 81, então √81 = 9.",
  },
  {
    id: "q05",
    topic: "equacoes",
    topicLabel: "Equações",
    subtopic: "1º grau",
    question: "Resolva: 2x + 6 = 14",
    formula: "2x + 6 = 14",
    options: [
      { key: "A", text: "x = 10" },
      { key: "B", text: "x = 4" },
      { key: "C", text: "x = 8" },
      { key: "D", text: "x = 2" },
    ],
    correct: "B",
    explanation: "2x = 8 → x = 4. Subtraia 6 dos dois lados antes de dividir.",
  },
  {
    id: "q06",
    topic: "equacoes",
    topicLabel: "Equações",
    subtopic: "2º grau",
    question: "Uma equação x² − 9 = 0 tem como soluções reais:",
    options: [
      { key: "A", text: "x = 3 e x = −3" },
      { key: "B", text: "x = 9 e x = −9" },
      { key: "C", text: "x = 3 apenas" },
      { key: "D", text: "Nenhuma solução real" },
    ],
    correct: "A",
    explanation: "x² = 9 → x = 3 ou x = −3. São as duas raízes reais.",
  },
  {
    id: "q07",
    topic: "funcoes",
    topicLabel: "Funções",
    subtopic: "Função afim",
    question:
      "Um plano cobra R$ 40,00 fixos mais R$ 5,00 por pacote extra. A função C(x) = 5x + 40 significa:",
    formula: "C(x) = 5x + 40",
    options: [
      {
        key: "A",
        text: "Taxa R$ 5 por pacote e valor fixo R$ 40",
      },
      {
        key: "B",
        text: "Valor fixo R$ 5 e taxa R$ 40 por pacote",
      },
      { key: "C", text: "O custo não depende de x" },
      { key: "D", text: "A reta passa pela origem" },
    ],
    correct: "A",
    explanation:
      "Na forma ax + b: a = 5 (taxa por pacote) e b = 40 (parte fixa). Padrão de função afim.",
  },
  {
    id: "q08",
    topic: "funcoes",
    topicLabel: "Funções",
    question: "Se f(x) = x², qual é f(3)?",
    formula: "f(x) = x²",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "9" },
      { key: "C", text: "5" },
      { key: "D", text: "27" },
    ],
    correct: "B",
    explanation: "Substitua x = 3: f(3) = 3² = 9.",
  },
  {
    id: "q09",
    topic: "graficos",
    topicLabel: "Gráficos",
    question:
      "A reta y = 2x + 1 passa pelo ponto (0, 1). O que o coeficiente 2 representa?",
    formula: "y = 2x + 1",
    options: [
      { key: "A", text: "Inclinação da reta (taxa de crescimento)" },
      { key: "B", text: "O valor quando x = 0" },
      { key: "C", text: "A distância até a origem" },
      { key: "D", text: "O eixo vertical do gráfico" },
    ],
    correct: "A",
    explanation:
      "O 2 é o coeficiente angular (inclinação). O +1 é o valor em x = 0 (ordenada na origem).",
  },
  {
    id: "q10",
    topic: "trigonometria",
    topicLabel: "Trigonometria",
    question: "Em um triângulo retângulo, sen(30°) é igual a:",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "√3/2" },
      { key: "C", text: "√2/2" },
      { key: "D", text: "1" },
    ],
    correct: "A",
    explanation: "sen(30°) = 1/2 é um valor clássico da trigonometria básica.",
  },
  {
    id: "q11",
    topic: "trigonometria",
    topicLabel: "Trigonometria",
    question: "O que é cos(0°)?",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "−1" },
      { key: "D", text: "Indefinido" },
    ],
    correct: "B",
    explanation: "No círculo trigonométrico, cos(0°) = 1.",
  },
  {
    id: "q12",
    topic: "limites",
    topicLabel: "Noções de limite",
    question:
      "Quando x se aproxima de 2 por valores menores que 2, f(x) = x + 3 se aproxima de:",
    context: "Ideia intuitiva de limite — sem calcular derivadas.",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "Infinito" },
    ],
    correct: "A",
    explanation:
      "Substituindo x = 2 em x + 3 obtemos 5. O limite coincide com o valor da função afim.",
  },
];

export type RecommendationBand = "base" | "pre-calculo" | "calculo-1";

export type TestRecommendation = {
  band: RecommendationBand;
  levelLabel: string;
  title: string;
  description: string;
  detail: string;
  href: string;
  cta: string;
};

export function getRecommendation(scorePercent: number): TestRecommendation {
  if (scorePercent <= 40) {
    return {
      band: "base",
      levelLabel: "Base matemática",
      title: "Comece pelos fundamentos",
      description:
        "Você está no nível de base matemática. Recomendamos revisar operações, frações, potências e equações antes de funções e Cálculo.",
      detail:
        "Comece pelo Módulo 1 — Fundamentos matemáticos na trilha de Pré-Cálculo.",
      href: "/pre-calculo",
      cta: "Ir para Pré-Cálculo",
    };
  }
  if (scorePercent <= 70) {
    return {
      band: "pre-calculo",
      levelLabel: "Pré-Cálculo",
      title: "Pré-Cálculo é o melhor caminho",
      description:
        "Você está no nível Pré-Cálculo. Recomendamos consolidar funções, gráficos e trigonometria antes de entrar em limites e derivadas.",
      detail:
        "Sugestão: comece pelo módulo Funções ou revise equações se sentir insegurança.",
      href: "/pre-calculo",
      cta: "Acessar trilha Pré-Cálculo",
    };
  }
  return {
    band: "calculo-1",
    levelLabel: "Pré-Cálculo avançado / Cálculo 1",
    title: "Você pode iniciar Cálculo 1",
    description:
      "Sua base está sólida. Pode começar Cálculo 1 — ainda assim, revise tópicos fracos se quiser mais segurança.",
    detail:
      "Recomendamos o módulo “Antes do Cálculo” e depois “Limites sem trauma”.",
    href: "/calculo-1",
    cta: "Acessar trilha Cálculo 1",
  };
}

export function scoreByTopic(
  answers: Record<string, OptionKey>,
): Record<TopicId, { correct: number; total: number }> {
  const map = {} as Record<TopicId, { correct: number; total: number }>;
  for (const q of testQuestions) {
    if (!map[q.topic]) map[q.topic] = { correct: 0, total: 0 };
    map[q.topic].total += 1;
    if (answers[q.id] === q.correct) map[q.topic].correct += 1;
  }
  return map;
}
