import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

/**
 * Estudo de sinal — a técnica que faltava.
 *
 * A auditoria classificou esta lacuna como P0: o site não tinha quadro de
 * sinais nem inequação quadrática em lugar nenhum, e as duas coisas são o
 * pré-requisito escondido de meia dúzia de assuntos que já existem — domínio
 * de raiz e de fração, onde a função cresce (sinal de f′), para onde a
 * concavidade aponta (sinal de f″) e a leitura de qualquer inequação que não
 * seja do primeiro grau.
 *
 * Sem isto, "onde a função cresce" vira um procedimento decorado, que é
 * exatamente o oposto do que o site se propõe.
 */

const MOD = "algebra";
const MOD_TITLE = "Álgebra essencial";

export const sinaisAulas: Record<string, AulaContent> = {
  "quadro-de-sinais": {
    meta: preMeta({
      title: "Quadro de sinais: onde a expressão é positiva ou negativa",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      readingNotes: ["Zeros de cada fator", "Testar um ponto por intervalo"],
      glossaryTerms: ["Fator", "Raiz de uma função", "Intervalo"],
      next: { slug: "inequacoes-quadraticas", title: "Inequações quadráticas e racionais" },
    }),
    plot: "sinal-parabola",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Até agora você resolveu perguntas do tipo \"para qual \\(x\\) isso vale zero?\". Existe uma pergunta diferente, e mais frequente: \"para quais \\(x\\) isso é positivo?\".",
        "Ela aparece o tempo todo, quase sempre disfarçada: o domínio de \\(\\sqrt{x-3}\\) exige que o que está dentro seja positivo ou nulo; o denominador de uma fração exige que ele não seja zero; em Cálculo, saber onde a função cresce é saber onde a derivada é positiva.",
        "A boa notícia é que existe uma técnica única para todas essas perguntas, e ela cabe numa linha de raciocínio: descubra onde cada pedaço troca de sinal e teste um ponto entre essas trocas.",
      ],
    },
    explicacao: {
      title: "Um fator só troca de sinal ao passar pelo seu zero",
      paragraphs: [
        "Pense em \\((x-1)\\). Para \\(x\\) maior que \\(1\\) ele é positivo; para \\(x\\) menor que \\(1\\), negativo. A troca acontece exatamente em \\(x = 1\\), que é onde ele vale zero — e em nenhum outro lugar.",
        "Isso vale para qualquer fator: os zeros são os únicos candidatos a ponto de troca. Eles cortam a reta numérica em intervalos, e dentro de cada intervalo o sinal não muda mais.",
        "Por isso basta testar **um** número de cada intervalo: o sinal que você achar ali vale para o intervalo inteiro. Depois é só multiplicar os sinais dos fatores, como quem multiplica \\((-)\\) por \\((-)\\) e obtém \\((+)\\).",
      ],
      alternativa: [
        "Imagine uma estrada com pedágios nos pontos \\(-3\\) e \\(1\\). Entre dois pedágios o terreno não muda: ou é subida o trecho todo, ou é descida o trecho todo. A paisagem só pode mudar quando você passa por um pedágio.",
        "Os pedágios são os zeros. Testar um ponto do trecho é olhar pela janela uma vez: o que você vê ali é o que tem no trecho inteiro.",
      ],
      callout:
        "Entre dois zeros consecutivos o sinal é constante. Teste um único ponto de cada intervalo e a resposta vale para todo ele.",
      formula: "(x − a)(x − b) > 0: zeros em a e b dividem a reta em três intervalos",
      formulaLatex: "(x-a)(x-b) > 0 \\;\\Longrightarrow\\; \\text{estude o sinal em } (-\\infty,a),\\ (a,b),\\ (b,+\\infty)",
      formulaAria:
        "abre parênteses x menos a fecha parênteses vezes abre parênteses x menos b fecha parênteses maior que zero implica estudar o sinal nos intervalos de menos infinito até a, de a até b, e de b até mais infinito",
      formulaLegend: "os zeros cortam a reta; cada pedaço tem um sinal só",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Domínio com raiz", detail: "\\(\\sqrt{p(x)}\\) exige \\(p(x) \\geq 0\\)" },
        { label: "Domínio com fração", detail: "o denominador não pode zerar" },
        { label: "Crescimento", detail: "a função cresce onde \\(f'\\) é positiva" },
        { label: "Concavidade", detail: "a curva abre para cima onde \\(f''\\) é positiva" },
        { label: "Otimização", detail: "o sinal de \\(f'\\) diz se o ponto crítico é topo ou fundo" },
        { label: "Física", detail: "saber quando a velocidade é positiva (indo) ou negativa (voltando)" },
      ],
    },
    exemplo: {
      title: "Onde \\((x-1)(x+3)\\) é positivo?",
      situacao:
        "Descubra para quais valores de \\(x\\) o produto \\((x-1)(x+3)\\) é maior que zero. Repare que a pergunta não é onde ele vale zero — é onde ele é positivo.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Achar os zeros de cada fator",
          detail:
            "\\(x - 1 = 0\\) dá \\(x = 1\\); \\(x + 3 = 0\\) dá \\(x = -3\\). São os dois únicos pontos onde o sinal pode mudar.",
        },
        {
          title: "Cortar a reta nesses pontos",
          detail:
            "Sobram três intervalos: \\((-\\infty, -3)\\), \\((-3, 1)\\) e \\((1, +\\infty)\\).",
        },
        {
          title: "Testar um ponto de cada intervalo",
          detail:
            "\\[\\begin{aligned} x=-4: &\\quad (-5)\\cdot(-1) = 5 > 0 \\\\ x=0: &\\quad (-1)\\cdot(3) = -3 < 0 \\\\ x=2: &\\quad (1)\\cdot(5) = 5 > 0 \\end{aligned}\\]",
        },
        {
          title: "Ler a resposta nos intervalos",
          detail:
            "O produto é positivo nos dois intervalos das pontas: \\(x < -3\\) ou \\(x > 1\\). Em notação de intervalo, \\((-\\infty,-3) \\cup (1,+\\infty)\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "No gráfico acima, \"positivo\" é literalmente \"acima do eixo \\(x\\)\". A resposta que você calculou com sinais é a mesma que você leria apontando o dedo: a parábola está acima do eixo antes de \\(-3\\) e depois de \\(1\\), e abaixo entre os dois.",
        "Repare que os zeros ficaram de fora da resposta. Como a pergunta era \\(> 0\\) (estritamente maior), os pontos onde o produto vale exatamente zero não servem. Se fosse \\(\\geq 0\\), eles entrariam.",
        "Esse é o mesmo raciocínio que você usará para dizer onde uma função cresce — trocando \\((x-1)(x+3)\\) pela derivada.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Testar justamente um dos zeros: ali o produto vale zero e não informa o sinal do intervalo.",
        "Achar que o sinal sempre alterna. Um fator repetido, como \\((x-2)^2\\), não muda o sinal ao passar por \\(2\\) — ele apenas toca o eixo.",
        "Responder só os zeros (\\(x = 1\\) e \\(x = -3\\)) quando a pergunta pedia um intervalo.",
        "Confundir \\(>\\) com \\(\\geq\\) na hora de incluir ou excluir as pontas.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para quais \\(x\\) o produto \\((x-4)(x+1)\\) é negativo?",
          identificar: "Ache os zeros, corte a reta e teste um ponto de cada pedaço.",
          dica: "Os zeros são \\(4\\) e \\(-1\\). Teste \\(x = 0\\), que está entre eles.",
          resolucao:
            "Zeros em \\(-1\\) e \\(4\\). Em \\(x=-2\\): \\((-6)(-1)=6>0\\). Em \\(x=0\\): \\((-4)(1)=-4<0\\). Em \\(x=5\\): \\((1)(6)=6>0\\). O produto é negativo só no intervalo do meio.",
          resposta: "-1 < x < 4",
          interpretacao: "É o trecho em que a parábola fica abaixo do eixo: entre as duas raízes.",
          erroComum: "Responder \\(x < -1\\) ou \\(x > 4\\), que é onde o produto é positivo.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Qual é o domínio de \\(\\sqrt{x^2 - 9}\\)?",
          identificar: "Dentro da raiz o valor precisa ser maior ou igual a zero.",
          dica: "Fatore \\(x^2 - 9\\) como diferença de quadrados antes de estudar o sinal.",
          resolucao:
            "\\(x^2-9=(x-3)(x+3)\\), com zeros em \\(-3\\) e \\(3\\). Testando: positivo antes de \\(-3\\), negativo entre, positivo depois de \\(3\\). Como a raiz aceita o zero, as pontas entram.",
          resposta: "x ≤ -3 ou x ≥ 3",
          interpretacao:
            "O domínio não é um intervalo só: são duas partes separadas, e o trecho do meio fica de fora porque ali o radicando é negativo.",
          erroComum: "Escrever \\(x \\geq 3\\) e esquecer o ramo negativo, que também serve.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado:
            "Por que basta testar um único número dentro de cada intervalo, em vez de testar vários?",
          identificar: "Pense no que teria de acontecer para o sinal mudar no meio de um intervalo.",
          dica: "Um fator só troca de sinal onde ele vale zero.",
          resolucao:
            "Porque dentro de um intervalo não existe nenhum zero — os zeros são justamente as bordas. Sem passar por um zero, nenhum fator troca de sinal, então o produto mantém o mesmo sinal no intervalo inteiro.",
          resposta: "Porque não há zeros dentro do intervalo, e o sinal só muda ao passar por um zero",
          interpretacao:
            "É essa garantia que transforma infinitos números em uma conta só por intervalo.",
          erroComum:
            "Achar que é uma simplificação aproximada. Não é: o sinal é realmente constante ali.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique o estudo de sinal em produtos, raízes e frações.",
      exerciseIds: ["alg-sin-01", "alg-sin-02", "alg-sin-03"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Os zeros de cada fator são os únicos pontos onde o sinal pode mudar.",
        "Eles cortam a reta em intervalos; dentro de cada um o sinal é constante.",
        "Teste um ponto por intervalo e multiplique os sinais dos fatores.",
        "Positivo significa acima do eixo \\(x\\) no gráfico.",
        "Próximo: usar o quadro de sinais para resolver inequações de verdade.",
      ],
    },
  },

  "inequacoes-quadraticas": {
    meta: preMeta({
      title: "Inequações quadráticas e racionais",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "15 min",
      readingNotes: ["Tudo para um lado", "O denominador nunca entra"],
      glossaryTerms: ["Inequação", "Raiz de uma função", "Intervalo"],
      next: { slug: "sistemas-equacoes", title: "Sistemas de equações" },
    }),
    plot: "sinal-racional",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Numa inequação do primeiro grau você isola o \\(x\\) e acabou. Em \\(x^2 - x - 6 > 0\\) isso não funciona: não há como deixar o \\(x\\) sozinho, porque ele aparece ao quadrado.",
        "A saída é outra: em vez de isolar, você descobre onde a expressão inteira é positiva. É exatamente o quadro de sinais da aula anterior, agora com um objetivo.",
        "Vale para as racionais também — e é aí que mora a armadilha mais cara do assunto.",
      ],
    },
    explicacao: {
      title: "Leve tudo para um lado e estude o sinal",
      paragraphs: [
        "Primeiro passo, sempre: deixe zero de um dos lados. \\(x^2 > x + 6\\) vira \\(x^2 - x - 6 > 0\\). Só assim a pergunta vira \"onde esta expressão é positiva?\", que você já sabe responder.",
        "Depois fatore e monte o quadro de sinais. A resposta é a união dos intervalos em que o sinal bate com o que a inequação pede.",
        "Nas racionais entra uma diferença importante: os zeros do denominador também cortam a reta, porque o sinal pode virar ao passar por eles. Mas eles **nunca** entram na resposta, porque ali a expressão não existe.",
      ],
      alternativa: [
        "Se preferir pensar no gráfico: resolver \\(f(x) > 0\\) é perguntar em que trechos a curva está acima do eixo. Fatorar e testar sinais é o jeito de descobrir isso sem precisar desenhar.",
        "Nas frações, a assíntota vertical funciona como uma parede: o sinal pode ser diferente de cada lado dela, e a parede em si não pertence a lado nenhum.",
      ],
      callout:
        "Nunca multiplique os dois lados pelo denominador. Você não sabe o sinal dele, e multiplicar por um número negativo inverte a desigualdade sem aviso.",
      formula: "p(x)/q(x) ≥ 0: zeros de p entram; zeros de q ficam sempre de fora",
      formulaLatex:
        "\\frac{p(x)}{q(x)} \\geq 0 \\;\\Longrightarrow\\; \\text{zeros de } p \\text{ entram};\\ \\text{zeros de } q \\text{ nunca}",
      formulaAria:
        "p de x sobre q de x maior ou igual a zero implica que os zeros de p entram na resposta e os zeros de q nunca entram",
      formulaLegend: "o denominador corta a reta, mas não pertence à solução",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Domínio", detail: "achar onde a fórmula de uma função faz sentido" },
        { label: "Lucro", detail: "para quais quantidades o lucro é positivo" },
        { label: "Física", detail: "durante quais instantes o projétil está acima do solo" },
        { label: "Crescimento", detail: "em que intervalo \\(f'(x) > 0\\)" },
        { label: "Concavidade", detail: "em que intervalo \\(f''(x) > 0\\)" },
        { label: "Engenharia", detail: "faixas de operação seguras de um equipamento" },
      ],
    },
    exemplo: {
      title: "Uma inequação com fração",
      situacao:
        "Resolva \\(\\dfrac{x+1}{x-2} \\geq 0\\). Repare que a desigualdade é \"maior ou igual\", mas nem todos os zeros vão poder entrar na resposta.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Conferir que já há zero de um lado",
          detail:
            "A expressão já está comparada com zero. Se não estivesse, o primeiro movimento seria passar tudo para o mesmo lado — e não multiplicar cruzado.",
        },
        {
          title: "Marcar os zeros do numerador e do denominador",
          detail:
            "Numerador zera em \\(x = -1\\); denominador zera em \\(x = 2\\). Os dois cortam a reta, mas com estatutos diferentes.",
        },
        {
          title: "Testar um ponto de cada intervalo",
          detail:
            "\\[\\begin{aligned} x=-2: &\\quad \\frac{-1}{-4} = 0{,}25 > 0 \\\\ x=0: &\\quad \\frac{1}{-2} = -0{,}5 < 0 \\\\ x=3: &\\quad \\frac{4}{1} = 4 > 0 \\end{aligned}\\]",
        },
        {
          title: "Decidir quem entra nas pontas",
          detail:
            "Em \\(x=-1\\) a fração vale zero, e a inequação aceita zero: entra. Em \\(x=2\\) a fração não existe: fica de fora, sempre. Resposta: \\((-\\infty,-1] \\cup (2,+\\infty)\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O colchete em \\(-1\\) e o parêntese em \\(2\\) não são detalhe de notação: dizem coisas diferentes. Em \\(-1\\) a expressão vale zero e a pergunta admitia zero. Em \\(2\\) não há valor nenhum para admitir.",
        "No gráfico acima isso aparece na hora: a curva toca o eixo em \\(-1\\) e some perto de \\(2\\), onde há assíntota. Nenhuma conta consegue colocar \\(x = 2\\) na resposta.",
        "Se tivesse multiplicado os dois lados por \\(x-2\\), você teria obtido \\(x + 1 \\geq 0\\), isto é, \\(x \\geq -1\\) — resposta errada, que inclui o \\(2\\) e o intervalo \\((-1, 2)\\), onde a fração é negativa.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Multiplicar os dois lados pelo denominador. O sinal dele é desconhecido e a desigualdade pode inverter.",
        "Incluir o zero do denominador na resposta. Ali a expressão não existe, então ele nunca entra.",
        "Resolver \\(x^2 > 9\\) como \\(x > 3\\), esquecendo o ramo \\(x < -3\\).",
        "Trocar união por interseção ao juntar os intervalos: a resposta costuma ser \"um trecho ou o outro\".",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(x^2 - x - 6 > 0\\).",
          identificar: "Fatore o trinômio e estude o sinal do produto.",
          dica: "Procure dois números de produto \\(-6\\) e soma \\(-1\\).",
          resolucao:
            "\\(x^2-x-6=(x-3)(x+2)\\), com zeros em \\(-2\\) e \\(3\\). O produto é positivo fora das raízes e negativo entre elas.",
          resposta: "x < -2 ou x > 3",
          interpretacao: "A parábola abre para cima, então fica acima do eixo nas duas pontas.",
          erroComum: "Responder o intervalo do meio, que é onde a expressão é negativa.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(\\dfrac{x-4}{x+2} \\leq 0\\).",
          identificar: "Zeros do numerador e do denominador cortam a reta; só um deles pode entrar.",
          dica: "O zero do numerador é \\(4\\); o do denominador é \\(-2\\).",
          resolucao:
            "Testando os três intervalos: positivo antes de \\(-2\\), negativo entre \\(-2\\) e \\(4\\), positivo depois de \\(4\\). Como a inequação aceita zero, \\(x = 4\\) entra; \\(x = -2\\) fica fora porque anula o denominador.",
          resposta: "-2 < x ≤ 4",
          interpretacao:
            "A resposta é um intervalo só, aberto de um lado e fechado do outro — cada ponta por um motivo diferente.",
          erroComum: "Fechar o intervalo em \\(-2\\), incluindo um ponto onde a fração não existe.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado:
            "Um projétil tem altura \\(h(t) = -5t^2 + 20t\\) metros. Durante quais instantes ele está acima do solo?",
          identificar: "\"Acima do solo\" é \\(h(t) > 0\\); e o tempo não pode ser negativo.",
          dica: "Fatore \\(h(t) = -5t(t-4)\\).",
          resolucao:
            "Os zeros são \\(t = 0\\) e \\(t = 4\\). Como o coeficiente de \\(t^2\\) é negativo, a parábola abre para baixo e fica positiva entre as raízes: \\(0 < t < 4\\).",
          resposta: "0 < t < 4",
          interpretacao:
            "O projétil sai do solo em \\(t=0\\) e volta em \\(t=4\\); entre esses instantes ele está no ar. Fora desse intervalo a fórmula daria altura negativa, que não tem sentido físico aqui.",
          erroComum:
            "Ignorar que a parábola abre para baixo e responder o complemento do intervalo.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Inequações do segundo grau, racionais e aplicadas.",
      exerciseIds: ["alg-sin-04", "alg-sin-05", "alg-sin-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Passe tudo para um lado antes de qualquer coisa: a pergunta vira \"onde isto é positivo?\".",
        "Fatore, marque os zeros e monte o quadro de sinais.",
        "Numa fração, o denominador corta a reta mas nunca entra na resposta.",
        "Nunca multiplique os dois lados pelo denominador de sinal desconhecido.",
        "Próximo: sistemas de equações.",
      ],
    },
  },
};
