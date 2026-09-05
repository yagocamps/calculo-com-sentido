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
    question: "Quanto é \\(18 + 7 \\times 2\\)?",
    context: "Lembre-se da ordem das operações (multiplicação antes da soma).",
    options: [
      { key: "A", text: "50" },
      { key: "B", text: "32" },
      { key: "C", text: "25" },
      { key: "D", text: "36" },
    ],
    correct: "B",
    explanation:
      "Primeiro \\(7 \\times 2 = 14\\), depois \\(18 + 14 = 32\\). Erro comum: somar \\(18 + 7\\) antes de multiplicar.",
  },
  {
    id: "q02",
    topic: "fracoes",
    topicLabel: "Frações",
    question: "Qual é o valor de \\(\\frac{3}{4} + \\frac{1}{2}\\)?",
    options: [
      { key: "A", text: "\\(\\frac{4}{6}\\)" },
      { key: "B", text: "\\(\\frac{5}{4}\\)" },
      { key: "C", text: "\\(\\frac{1}{4}\\)" },
      { key: "D", text: "\\(\\frac{2}{3}\\)" },
    ],
    correct: "B",
    explanation:
      "Convertendo para o mesmo denominador: \\(\\frac{1}{2} = \\frac{2}{4}\\), então \\(\\frac{3}{4} + \\frac{2}{4} = \\frac{5}{4}\\) (ou \\(1{,}25\\)). É preciso mesmo denominador.",
  },
  {
    id: "q03",
    topic: "potencias",
    topicLabel: "Potências e raízes",
    question: "Qual é o valor de \\(2^3 \\times 2^2\\)?",
    options: [
      { key: "A", text: "\\(2^5\\)" },
      { key: "B", text: "\\(2^6\\)" },
      { key: "C", text: "\\(4^5\\)" },
      { key: "D", text: "\\(2^1\\)" },
    ],
    correct: "A",
    explanation: "Mesma base: somamos os expoentes. \\(2^3 \\times 2^2 = 2^5 = 32\\).",
  },
  {
    id: "q04",
    topic: "potencias",
    topicLabel: "Potências e raízes",
    subtopic: "Raízes",
    question: "Qual é o valor de \\(\\sqrt{81}\\)?",
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "9" },
      { key: "C", text: "18" },
      { key: "D", text: "40,5" },
    ],
    correct: "B",
    explanation: "\\(9 \\times 9 = 81\\), então \\(\\sqrt{81} = 9\\).",
  },
  {
    id: "q05",
    topic: "equacoes",
    topicLabel: "Equações",
    subtopic: "1º grau",
    question: "Resolva: \\(2x + 6 = 14\\)",
    formula: "\\(2x + 6 = 14\\)",
    options: [
      { key: "A", text: "x = 10" },
      { key: "B", text: "x = 4" },
      { key: "C", text: "x = 8" },
      { key: "D", text: "x = 2" },
    ],
    correct: "B",
    explanation: "\\(2x = 8 \\Rightarrow x = 4\\). Subtraia 6 dos dois lados antes de dividir.",
  },
  {
    id: "q06",
    topic: "equacoes",
    topicLabel: "Equações",
    subtopic: "2º grau",
    question: "Uma equação \\(x^2 - 9 = 0\\) tem como soluções reais:",
    options: [
      { key: "A", text: "x = 3 e x = −3" },
      { key: "B", text: "x = 9 e x = −9" },
      { key: "C", text: "x = 3 apenas" },
      { key: "D", text: "Nenhuma solução real" },
    ],
    correct: "A",
    explanation: "\\(x^2 = 9 \\Rightarrow x = 3\\) ou \\(x = -3\\). São as duas raízes reais.",
  },
  {
    id: "q07",
    topic: "funcoes",
    topicLabel: "Funções",
    subtopic: "Função afim",
    question:
      "Um plano cobra R$ 40,00 fixos mais R$ 5,00 por pacote extra. A função C(x) = 5x + 40 significa:",
    formula: "\\(C(x) = 5x + 40\\)",
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
    question: "Se \\(f(x) = x^2\\), qual é \\(f(3)\\)?",
    formula: "\\(f(x) = x^2\\)",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "9" },
      { key: "C", text: "5" },
      { key: "D", text: "27" },
    ],
    correct: "B",
    explanation: "Substitua \\(x = 3\\): \\(f(3) = 3^2 = 9\\).",
  },
  {
    id: "q09",
    topic: "graficos",
    topicLabel: "Gráficos",
    question:
      "A reta y = 2x + 1 passa pelo ponto (0, 1). O que o coeficiente 2 representa?",
    formula: "\\(y = 2x + 1\\)",
    options: [
      { key: "A", text: "Inclinação da reta (taxa de crescimento)" },
      { key: "B", text: "O valor quando x = 0" },
      { key: "C", text: "A distância até a origem" },
      { key: "D", text: "O eixo vertical do gráfico" },
    ],
    correct: "A",
    explanation:
      "O 2 é o coeficiente angular (inclinação). O +1 é o valor em \\(x = 0\\) (ordenada na origem).",
  },
  {
    id: "q10",
    topic: "trigonometria",
    topicLabel: "Trigonometria",
    question: "Em um triângulo retângulo, \\(\\operatorname{sen}(30^\\circ)\\) é igual a:",
    options: [
      { key: "A", text: "\\(\\frac{1}{2}\\)" },
      { key: "B", text: "\\(\\frac{\\sqrt{3}}{2}\\)" },
      { key: "C", text: "\\(\\frac{\\sqrt{2}}{2}\\)" },
      { key: "D", text: "1" },
    ],
    correct: "A",
    explanation: "\\(\\operatorname{sen}(30^\\circ) = \\frac{1}{2}\\) é um valor clássico da trigonometria básica.",
  },
  {
    id: "q11",
    topic: "trigonometria",
    topicLabel: "Trigonometria",
    question: "O que é \\(\\cos(0^\\circ)\\)?",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "−1" },
      { key: "D", text: "Indefinido" },
    ],
    correct: "B",
    explanation: "No círculo trigonométrico, \\(\\cos(0^\\circ) = 1\\).",
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
      "Substituindo \\(x = 2\\) em \\(x + 3\\) obtemos \\(5\\). O limite coincide com o valor da função afim.",
  },
  {
    id: "q13",
    topic: "operacoes",
    topicLabel: "Operações básicas",
    question: "Quanto é \\(20 - 3 \\times (4 - 2)\\)?",
    context: "Parênteses primeiro, depois multiplicação, depois subtração.",
    options: [
      { key: "A", text: "34" },
      { key: "B", text: "14" },
      { key: "C", text: "26" },
      { key: "D", text: "10" },
    ],
    correct: "B",
    explanation:
      "Dentro dos parênteses: \\(4 - 2 = 2\\). Depois \\(3 \\times 2 = 6\\). Por fim \\(20 - 6 = 14\\). Erro comum: fazer \\(20 - 3\\) primeiro.",
  },
  {
    id: "q14",
    topic: "operacoes",
    topicLabel: "Operações básicas",
    subtopic: "Sinais",
    question: "Quanto é \\((-5) \\times (-4) + (-10)\\)?",
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "−30" },
      { key: "C", text: "30" },
      { key: "D", text: "−10" },
    ],
    correct: "A",
    explanation:
      "Menos com menos dá mais: \\((-5) \\times (-4) = 20\\). Depois \\(20 + (-10) = 10\\). Erro comum: manter o sinal negativo no produto.",
  },
  {
    id: "q15",
    topic: "fracoes",
    topicLabel: "Frações",
    question: "Quanto é \\(\\frac{2}{3} \\times \\frac{3}{5}\\)?",
    options: [
      { key: "A", text: "\\(\\frac{6}{15}\\), ou seja, \\(\\frac{2}{5}\\)" },
      { key: "B", text: "\\(\\frac{5}{8}\\)" },
      { key: "C", text: "\\(\\frac{10}{9}\\)" },
      { key: "D", text: "\\(\\frac{6}{8}\\)" },
    ],
    correct: "A",
    explanation:
      "Em multiplicação de frações, multiplica-se em linha: \\(\\frac{2 \\times 3}{3 \\times 5} = \\frac{6}{15} = \\frac{2}{5}\\). Não é preciso igualar denominadores — isso só vale para soma.",
  },
  {
    id: "q16",
    topic: "fracoes",
    topicLabel: "Frações",
    subtopic: "Porcentagem",
    question: "Uma blusa de R$ 80,00 está com 25% de desconto. Quanto se paga?",
    options: [
      { key: "A", text: "R$ 55,00" },
      { key: "B", text: "R$ 60,00" },
      { key: "C", text: "R$ 20,00" },
      { key: "D", text: "R$ 75,00" },
    ],
    correct: "B",
    explanation:
      "25% de 80 é 80 × 0,25 = 20 (o desconto). Paga-se 80 − 20 = 60. Erro comum: responder 20, que é o desconto e não o valor final.",
  },
  {
    id: "q17",
    topic: "potencias",
    topicLabel: "Potências e raízes",
    question: "Qual é o valor de \\(5^0\\)?",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "5" },
      { key: "C", text: "1" },
      { key: "D", text: "Não existe" },
    ],
    correct: "C",
    explanation:
      "Todo número diferente de zero elevado a 0 dá 1. Vem da regra de divisão: 5³ ÷ 5³ = 5⁰ e também = 1.",
  },
  {
    id: "q18",
    topic: "equacoes",
    topicLabel: "Equações",
    subtopic: "1º grau",
    question: "Resolva: \\(3(x - 2) = x + 8\\)",
    options: [
      { key: "A", text: "x = 7" },
      { key: "B", text: "x = 3" },
      { key: "C", text: "x = 5" },
      { key: "D", text: "x = 1" },
    ],
    correct: "A",
    explanation:
      "\\(3x - 6 = x + 8 \\Rightarrow 3x - x = 8 + 6 \\Rightarrow 2x = 14 \\Rightarrow x = 7\\). Erro comum: distribuir o 3 só no x e esquecer o \\(-2\\).",
  },
  {
    id: "q19",
    topic: "funcoes",
    topicLabel: "Funções",
    subtopic: "Leitura de função",
    question:
      "Um plano cobra R$ 50,00 fixos mais R$ 3,00 por GB. Qual função dá o custo de x GB?",
    options: [
      { key: "A", text: "C(x) = 50x + 3" },
      { key: "B", text: "C(x) = 3x + 50" },
      { key: "C", text: "C(x) = 53x" },
      { key: "D", text: "C(x) = 3x − 50" },
    ],
    correct: "B",
    explanation:
      "O que varia com o consumo multiplica x (3x); o que é fixo entra somando (50). Erro comum: trocar os papéis do fixo e do variável.",
  },
  {
    id: "q20",
    topic: "graficos",
    topicLabel: "Gráficos",
    question:
      "No plano cartesiano, o ponto (−3, 2) fica em qual região?",
    options: [
      { key: "A", text: "À esquerda do eixo vertical e acima do horizontal" },
      { key: "B", text: "À direita do eixo vertical e acima do horizontal" },
      { key: "C", text: "À esquerda do eixo vertical e abaixo do horizontal" },
      { key: "D", text: "Sobre o eixo horizontal" },
    ],
    correct: "A",
    explanation:
      "O primeiro número é horizontal (x = −3, à esquerda) e o segundo é vertical (y = 2, acima). Erro comum: ler as coordenadas na ordem trocada.",
  },
  {
    id: "q21",
    topic: "graficos",
    topicLabel: "Gráficos",
    subtopic: "Leitura de curva",
    question:
      "Um gráfico de temperatura sobe até as 14h e depois desce. O que se pode afirmar sobre as 14h?",
    options: [
      { key: "A", text: "A temperatura foi zero nesse instante" },
      { key: "B", text: "A temperatura atingiu seu valor máximo" },
      { key: "C", text: "A temperatura parou de existir" },
      { key: "D", text: "O gráfico cruzou o eixo horizontal" },
    ],
    correct: "B",
    explanation:
      "Onde a curva para de subir e começa a descer está o ponto mais alto — o máximo. Ler pontos de virada em gráficos é a base de máximos e mínimos no Cálculo.",
  },
  {
    id: "q22",
    topic: "trigonometria",
    topicLabel: "Trigonometria",
    subtopic: "Razões no triângulo",
    question:
      "Num triângulo retângulo, o seno de um ângulo agudo é a razão entre:",
    options: [
      { key: "A", text: "Cateto adjacente e hipotenusa" },
      { key: "B", text: "Cateto oposto e cateto adjacente" },
      { key: "C", text: "Cateto oposto e hipotenusa" },
      { key: "D", text: "Hipotenusa e cateto oposto" },
    ],
    correct: "C",
    explanation:
      "Seno = cateto oposto ÷ hipotenusa. O adjacente sobre a hipotenusa é o cosseno; oposto sobre adjacente é a tangente.",
  },
  {
    id: "q23",
    topic: "limites",
    topicLabel: "Noções de limite",
    question:
      "Conforme x cresce muito (10, 100, 1000…), de que valor 1/x se aproxima?",
    context: "Ideia intuitiva de tendência — sem fórmula.",
    options: [
      { key: "A", text: "De 1" },
      { key: "B", text: "De 0" },
      { key: "C", text: "De infinito" },
      { key: "D", text: "De x" },
    ],
    correct: "B",
    explanation:
      "Dividir \\(1\\) por números cada vez maiores dá resultados cada vez menores: \\(\\frac{1}{1000} = 0{,}001\\). O valor tende a \\(0\\) sem nunca chegar lá.",
  },
  {
    id: "q24",
    topic: "limites",
    topicLabel: "Noções de limite",
    subtopic: "Tendência vs valor",
    question:
      "Uma função tem um furo em \\(x = 4\\), mas perto de \\(4\\) ela vale sempre algo próximo de \\(7\\). O que se pode dizer?",
    options: [
      { key: "A", text: "A função não pode ter tendência em x = 4" },
      { key: "B", text: "A tendência em x = 4 é 7, mesmo sem a função valer 7 ali" },
      { key: "C", text: "A tendência em x = 4 é 4" },
      { key: "D", text: "A função vale 7 em x = 4" },
    ],
    correct: "B",
    explanation:
      "Limite fala de para onde a função vai perto do ponto, não de quanto ela vale no ponto. É exatamente por isso que limite existe como conceito separado.",
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
  firstLessonHref: string;
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
      firstLessonHref: "/pre-calculo/fundamentos/operacoes-basicas",
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
      firstLessonHref: "/pre-calculo/fundamentos/operacoes-basicas",
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
    firstLessonHref: "/calculo-1/antes-do-calculo/o-que-e-calculo-1",
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

/** Onde estudar cada tópico do teste. Serve para transformar "você foi mal em
 * frações" num link concreto, em vez de só uma nota. */
export const topicoParaModulo: Record<TopicId, { label: string; href: string; firstLessonHref: string; exerciseTemaSlug: string }> = {
  operacoes: { label: "Fundamentos matemáticos", href: "/pre-calculo/fundamentos", firstLessonHref: "/pre-calculo/fundamentos/operacoes-basicas", exerciseTemaSlug: "fundamentos" },
  fracoes: { label: "Fundamentos matemáticos", href: "/pre-calculo/fundamentos", firstLessonHref: "/pre-calculo/fundamentos/fracoes", exerciseTemaSlug: "fundamentos" },
  potencias: { label: "Fundamentos matemáticos", href: "/pre-calculo/fundamentos", firstLessonHref: "/pre-calculo/fundamentos/potenciacao", exerciseTemaSlug: "fundamentos" },
  equacoes: { label: "Álgebra essencial", href: "/pre-calculo/algebra", firstLessonHref: "/pre-calculo/fundamentos/equacao-primeiro-grau", exerciseTemaSlug: "algebra" },
  funcoes: { label: "Funções", href: "/pre-calculo/funcoes", firstLessonHref: "/pre-calculo/funcoes/o-que-e-funcao", exerciseTemaSlug: "funcoes" },
  graficos: { label: "Gráficos", href: "/pre-calculo/graficos", firstLessonHref: "/pre-calculo/graficos/leitura-graficos", exerciseTemaSlug: "graficos" },
  trigonometria: { label: "Trigonometria", href: "/pre-calculo/trigonometria", firstLessonHref: "/pre-calculo/trigonometria/seno", exerciseTemaSlug: "trigonometria" },
  limites: { label: "Preparação para limites", href: "/pre-calculo/preparacao-limites", firstLessonHref: "/calculo-1/limites/ideia-de-limite", exerciseTemaSlug: "limites" },
};

/** Tópicos com menos de 60% de acerto, do mais fraco para o menos fraco.
 * É a lista de "estude isto primeiro" — mais útil que a nota global, porque
 * a nota esconde em qual assunto está o buraco. */
export function topicosParaReforcar(
  answers: Record<string, OptionKey>,
): { topic: TopicId; label: string; correct: number; total: number; modulo: { label: string; href: string } }[] {
  const porTopico = scoreByTopic(answers);
  return testTopics
    .map((t) => {
      const s = porTopico[t.id] ?? { correct: 0, total: 0 };
      return {
        topic: t.id,
        label: t.label,
        correct: s.correct,
        total: s.total,
        modulo: topicoParaModulo[t.id],
      };
    })
    .filter((t) => t.total > 0 && t.correct / t.total < 0.6)
    .sort((a, b) => a.correct / a.total - b.correct / b.total);
}
