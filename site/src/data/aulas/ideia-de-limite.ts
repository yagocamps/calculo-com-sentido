import type { AulaContent } from "@/data/aulas/types";
import { calculo1LessonPath } from "@/data/calculo-1";

export const ideiaDeLimiteAula: AulaContent = {
  meta: {
    title: "Ideia de limite: aproximar sem chegar",
    moduleSlug: "limites",
    moduleTitle: "Limites sem trauma",
    lessonNumber: 1,
    duration: "12 min",
    level: "iniciante",
    readingNotes: ["Tabela numérica", "Leitura de gráfico"],
    glossaryTerms: ["Limite", "Aproximação", "Tendência"],
    nextLesson: {
      title: "Limite por tabela",
      href: calculo1LessonPath("limites", "limite-por-tabela"),
    },
  },
  porQue: {
    title: "Antes da fórmula, o sentido",
    paragraphs: [
      "Limite é a forma matemática de perguntar: \"se eu me aproximo cada vez mais de um valor, para onde o resultado vai?\"",
      "Você não precisa atingir o ponto — muitas vezes nem dá (como divisão por zero em um buraco do gráfico). O que importa é a tendência.",
      "Sem limite, não existe derivada nem a noção precisa de velocidade instantânea.",
    ],
  },
  explicacao: {
    title: "Aproximar é o jogo",
    paragraphs: [
      "Imagine encher um copo aos poucos: a cada instante você observa o nível da água se aproximando de 200 ml, mesmo que nunca tenha chegado exatamente a 200 ml ainda.",
      "No gráfico, olhamos o que acontece com \\(f(x)\\) quando \\(x\\) se aproxima de um número \\(a\\) — pela esquerda, pela direita, ou pelos dois lados.",
    ],
    callout: "Limite descreve tendência, não obrigatoriamente o valor no ponto.",
    formula: "lim (x→a) f(x) = L",
    formulaLatex: "\\lim_{x \\to a} f(x) = L",
    formulaAria:
      "limite de f de x quando x tende a a é igual a L",
    formulaLegend: "quando x se aproxima de a, f(x) tende a L",
  },
  ondeAparece: {
    title: "Aplicações reais",
    items: [
      { label: "Velocidade instantânea", detail: "Média em intervalos cada vez menores" },
      { label: "Engenharia", detail: "Comportamento perto de falhas ou saturação" },
      { label: "Economia", detail: "Tendência de demanda quando preço se aproxima de um patamar" },
      { label: "Biologia", detail: "Crescimento populacional perto de capacidade máxima" },
    ],
  },
  exemplo: {
    title: "Exemplo numérico simples",
    situacao:
      "Para \\(f(x) = \\frac{x^2 - 1}{x - 1}\\), o que acontece com \\(f(x)\\) quando \\(x\\) se aproxima de 1? (Note que \\(x = 1\\) não está no domínio.)",
  },
  passos: {
    title: "Como investigar",
    steps: [
      {
        title: "Tentar x = 1 direto",
        detail: "Dá \\(\\frac{0}{0}\\) — indeterminação; o ponto é um \"buraco\".",
      },
      {
        title: "Valores próximos de 1",
        detail: "\\(x = 0{,}9 \\to f \\approx 1{,}9\\); \\(x = 1{,}1 \\to f \\approx 2{,}1\\); \\(x = 0{,}99 \\to f \\approx 1{,}99\\).",
      },
      {
        title: "Identificar a tendência",
        detail: "Os valores se aproximam de 2 — esse é o limite quando \\(x \\to 1\\).",
      },
      {
        title: "Simplificar (opcional)",
        detail: "\\(\\frac{x^2-1}{x-1} = x+1\\) para \\(x \\neq 1\\); então o limite é 2.",
      },
    ],
  },
  interpretacao: {
    title: "O que isso significa",
    paragraphs: [
      "O limite 2 diz: perto de \\(x = 1\\), a função se comporta como se valesse 2, mesmo com buraco em \\(x = 1\\).",
      "Na física, intervalos de tempo cada vez menores usam a mesma lógica para definir velocidade no instante.",
      "Nas próximas aulas você verá tabelas, gráficos e regras de cálculo — sempre com essa ideia de tendência.",
    ],
  },
  erros: {
    title: "Cuidado com",
    items: [
      "Confundir limite com o valor da função no ponto (podem ser diferentes).",
      "Achar que \\(\\frac{0}{0}\\) significa \"não existe limite\" — muitas vezes existe tendência.",
      "Olhar só um lado do gráfico quando o limite exige os dois lados.",
      "Substituir direto sem verificar indeterminação.",
    ],
  },
  exerciciosGuiados: {
    title: "Exercícios guiados",
    exercises: [
      {
        id: "lim-g1",
        type: "compreensao",
        enunciado:
          "\\(f(x)\\) se aproxima de 5 quando \\(x \\to 3\\). O que podemos afirmar sobre o limite?",
        resolucao: "Pela definição intuitiva, \\(\\lim_{x \\to 3} f(x) = 5\\).",
        resposta: "O limite é 5.",
        interpretacao: "Não precisamos que \\(f(3) = 5\\).",
      },
      {
        id: "lim-g2",
        type: "calculo",
        enunciado: "Quando \\(x \\to 2\\), \\(f(x) = 3x\\) tende a qual valor?",
        dica: "Substitua mentalmente \\(x = 2\\) na expressão \\(3x\\).",
        resolucao: "\\(3 \\times 2 = 6\\)",
        resposta: "\\(6\\)",
        interpretacao: "Funções contínuas simples: o limite coincide com \\(f(2)\\).",
      },
    ],
  },
  exerciciosAplicados: {
    title: "Exercícios aplicados",
    intro: "Em breve: exercícios de limite com contexto de velocidade e tendência.",
    exerciseIds: [],
  },
  resumo: {
    title: "Resumo da aula",
    bullets: [
      "Limite = comportamento de \\(f(x)\\) quando \\(x\\) se aproxima de \\(a\\).",
      "Tendência pode existir mesmo com buraco ou indeterminação no ponto.",
      "Tabelas e gráficos ajudam antes das regras algébricas.",
      "Base para derivada (velocidade instantânea) e continuidade.",
    ],
  },
};
