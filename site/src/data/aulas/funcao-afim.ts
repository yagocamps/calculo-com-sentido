import { lessonPath } from "@/data/pre-calculo";
import type { AulaContent } from "@/data/aulas/types";

export const funcaoAfimAula: AulaContent = {
  meta: {
    title: "Função afim: a equação que descreve quase tudo no dia a dia",
    moduleSlug: "funcoes",
    moduleTitle: "Funções",
    lessonNumber: 3,
    duration: "12 min",
    level: "iniciante",
    readingNotes: ["5 exemplos resolvidos", "4 níveis de exercícios"],
    glossaryTerms: ["Coeficiente", "Taxa", "Variável", "Domínio"],
    nextLesson: {
      title: "Função quadrática: a parábola",
      href: lessonPath("funcoes", "funcao-quadratica"),
    },
  },
  porQue: {
    title: "Antes da fórmula, o sentido",
    paragraphs: [
      "A função afim é o jeito matemático de dizer: tem uma parte fixa e uma parte que depende de quanto você usa.",
      "É a corrida de aplicativo (bandeirada + preço por km), o salário com comissão (fixo + percentual sobre vendas), a conta de luz (tarifa mínima + consumo).",
      "Se você entender essa ideia, metade das funções do ensino médio e da faculdade deixa de parecer mágica.",
    ],
  },
  explicacao: {
    title: "A ideia em uma frase",
    paragraphs: [
      "Quando algo cresce de forma constante — sempre o mesmo tanto a cada passo — você está olhando para uma função afim.",
      "O gráfico é uma reta. Não precisa decorar isso agora; o importante é reconhecer a situação: fixo + variável.",
    ],
    callout:
      "Pense em \"quanto eu pago só por existir\" (\\(b\\)) e \"quanto aumenta a cada unidade\" (\\(a\\)).",
    formula: "f(x) = a·x + b",
    formulaLatex: "f(x) = a \\cdot x + b",
    formulaAria: "f de x é igual a a vezes x, mais b",
    formulaLegend: "a = taxa · b = valor inicial / parte fixa",
  },
  grafico: {
    fn: "2.4 * x + 6",
    alt: "Reta crescente da corrida de app: começa em R$ 6 (bandeirada, no eixo y) e sobe R$ 2,40 a cada quilômetro.",
    xDomain: [0, 12],
    yDomain: [0, 40],
    legend: "C(x) = 2,40·x + 6 — bandeirada de R$ 6 + R$ 2,40 por km.",
  },
  ondeAparece: {
    title: "Aplicações reais",
    items: [
      { label: "Corrida de app", detail: "Bandeirada + R$ por km" },
      { label: "Salário", detail: "Fixo + comissão por venda" },
      { label: "Conta de luz", detail: "Tarifa mínima + consumo em kWh" },
      { label: "Aluguel de bicicleta", detail: "Liberação da bike + minutos rodados" },
      { label: "Plano de internet", detail: "Mensalidade + pacotes extras" },
      { label: "Custo de produção", detail: "Custo fixo + custo por unidade" },
    ],
  },
  exemplo: {
    title: "Uma situação concreta",
    situacao:
      "Uma corrida de aplicativo cobra uma bandeirada de R$ 6,00 e mais R$ 2,40 por quilômetro rodado. Quanto custa uma corrida de \\(8\\) km?",
  },
  passos: {
    title: "Como pensar e resolver",
    steps: [
      {
        title: "Identificar a parte fixa",
        detail: "A bandeirada não depende da distância → \\(b = 6\\).",
      },
      {
        title: "Identificar a taxa",
        detail: "A cada km rodado soma R$ 2,40 → \\(a = 2{,}40\\).",
      },
      {
        title: "Montar a função",
        detail: "\\(C(x) = 2{,}40 \\cdot x + 6\\)  (\\(x\\) = km rodados)",
      },
      {
        title: "Substituir x = 8",
        detail: "\\(C(8) = 2{,}40 \\times 8 + 6 = 19{,}20 + 6\\)",
      },
      {
        title: "Calcular o total",
        detail: "\\(C(8) =\\) R$ 25,20",
      },
    ],
  },
  interpretacao: {
    title: "O que esse número significa?",
    paragraphs: [
      "R$ 25,20 é o que o cliente paga no total.",
      "Dos R$ 25,20, R$ 6,00 seriam cobrados mesmo se a corrida tivesse \\(0\\) km — é o custo de \"chamar o carro\".",
      "Os outros R$ 19,20 vêm da distância: quanto mais longe, maior o valor. Se a corrida fosse de \\(0\\) km, ainda custaria R$ 6,00. Essa é a leitura prática do \\(b\\).",
    ],
  },
  erros: {
    title: "Cuidado com",
    items: [
      "Esquecer de somar a parte fixa \\(b\\) no final (calcular só \\(a \\times x\\)).",
      "Trocar \\(a\\) e \\(b\\) ao montar a função na situação real.",
      "Achar que, se \\(x = 0\\), o custo total também é zero.",
      "Confundir \"taxa por km\" com \"valor total da corrida\".",
    ],
  },
  exerciciosGuiados: {
    title: "Exercícios guiados",
    exercises: [
      {
        id: "guiado-1",
        type: "compreensao",
        enunciado:
          "Em uma função do tipo \\(f(x) = ax + b\\), o que o valor \\(b\\) representa em uma situação real?",
        identificar: "Qual parte não depende de \\(x\\)?",
        dica: "Pense no que você paga mesmo sem usar o serviço.",
        resolucao:
          "\\(b\\) é o valor inicial: o que existe antes de contar unidades (bandeirada, salário fixo, tarifa mínima).",
        resposta: "A parte fixa / valor inicial.",
        interpretacao:
          "Sem entender \\(b\\), você subestima ou superestima custos em situações reais.",
        erroComum: "Dizer que \\(b\\) é a taxa de crescimento.",
      },
      {
        id: "guiado-2",
        type: "calculo",
        enunciado:
          "Um serviço cobra \\(C(x) = 3x + 20\\), em que \\(x\\) é o número de horas. Qual o custo para \\(5\\) horas?",
        identificar: "Substitua \\(x = 5\\) na função.",
        dica: "Primeiro \\(3 \\times 5\\), depois some \\(20\\).",
        resolucao: "\\(C(5) = 3 \\times 5 + 20 = 15 + 20 = 35\\)",
        resposta: "R$ 35,00",
        interpretacao: "R$ 20 é o fixo; R$ 15 vem das \\(5\\) horas a R$ 3 cada.",
        erroComum: "Esquecer o \\(+\\,20\\).",
      },
      {
        id: "guiado-3",
        type: "aplicada",
        enunciado:
          "Um plano cobra R$ 40,00 fixos mais R$ 5,00 por pacote extra de dados. Monte a função \\(C(x)\\) do custo total.",
        identificar: "Fixo = \\(b\\), preço por pacote = \\(a\\).",
        dica: "Use a forma \\(ax + b\\) com \\(x\\) = número de pacotes extras.",
        resolucao: "\\(C(x) = 5x + 40\\)",
        resposta: "\\(C(x) = 5x + 40\\)",
        interpretacao:
          "Cada pacote extra adiciona R$ 5; os R$ 40 existem mesmo com \\(x = 0\\).",
        erroComum: "Escrever \\(C(x) = 40x + 5\\).",
      },
    ],
  },
  exerciciosAplicados: {
    title: "Exercícios aplicados",
    intro:
      "Treine no banco de exercícios com contexto real (corrida, salário, energia).",
    exerciseIds: ["ex-01", "ex-02", "ex-03", "ex-04", "ex-05"],
  },
  resumo: {
    title: "Resumo da aula",
    bullets: [
      "Função afim: \\(f(x) = ax + b\\) — crescimento constante.",
      "\\(a\\) = taxa (quanto muda por unidade); \\(b\\) = parte fixa.",
      "Gráfico é uma reta; na vida: fixo + variável.",
      "Sempre interprete o resultado: o que é fixo e o que depende de \\(x\\)?",
    ],
  },
};
