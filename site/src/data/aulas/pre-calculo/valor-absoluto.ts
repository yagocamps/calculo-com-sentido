import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

/**
 * Valor absoluto como distância — a outra metade da lacuna de Álgebra.
 *
 * O site tratava o módulo só como função (o gráfico em V, a definição por
 * partes). Faltava a leitura que o Cálculo usa: \(|x - a|\) é a distância de
 * \(x\) até \(a\). Sem ela, a definição formal de limite
 * (\(0 < |x - a| < \delta\)) é uma sequência de símbolos, e não a frase
 * "x está perto de a" que ela de fato é.
 *
 * As duas aulas vêm logo depois do estudo de sinal porque fecham o mesmo
 * assunto — inequações — pelo caminho que não precisa de quadro de sinais.
 */

const MOD = "algebra";
const MOD_TITLE = "Álgebra essencial";

export const valorAbsolutoAulas: Record<string, AulaContent> = {
  "valor-absoluto-distancia": {
    meta: {
      ...preMeta({
        title: "Valor absoluto como distância",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 6,
        duration: "13 min",
        readingNotes: ["|a − b| é a distância entre a e b", "Distância não tem sinal"],
        glossaryTerms: ["Valor absoluto", "Módulo", "Distância"],
        next: { slug: "inequacoes-modulares", title: "Inequações modulares" },
      }),
      usedIn: [
        {
          label: "Inequações modulares",
          href: "/pre-calculo/algebra/inequacoes-modulares",
          detail: "para transformar |x − c| < r num intervalo",
        },
        {
          label: "Epsilon e delta",
          href: "/calculo-1/limites/epsilon-delta-intuicao",
          detail: "onde |x − a| < δ é a forma exata de dizer \"x perto de a\"",
        },
        {
          label: "Função modular",
          href: "/pre-calculo/funcoes/funcao-modular",
          detail: "o gráfico em V mede a distância até o bico",
        },
      ],
    },
    plot: "distancia-na-reta",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Você provavelmente aprendeu o módulo como uma regra: \"tira o sinal\". \\(|-5| = 5\\), \\(|5| = 5\\). A regra funciona, mas esconde o que o módulo mede de verdade: distância.",
        "E é a distância que importa daqui para a frente. Uma peça de \\(50\\) mm aceita com meio milímetro de folga, o erro de um termômetro, o desvio de um dado em relação à média — tudo isso é \"quão longe de um alvo\", sem se importar de que lado.",
        "Em Cálculo 1 essa leitura vira linguagem: \"\\(x\\) está perto de \\(3\\)\" se escreve \\(|x - 3|\\) pequeno. Quem lê o módulo como distância entende a frase na hora; quem só sabe tirar o sinal fica diante de um símbolo.",
      ],
    },
    explicacao: {
      title: "O módulo mede quão longe, não para que lado",
      paragraphs: [
        "\\(|x|\\) é a distância de \\(x\\) até o zero na reta numérica. Por isso \\(|-5| = |5| = 5\\): os dois estão a cinco passos do zero, um de cada lado.",
        "A mesma ideia vale entre dois números quaisquer: a distância entre \\(a\\) e \\(b\\) é \\(|a - b|\\). De \\(2\\) até \\(7\\) são cinco passos, e de fato \\(|7 - 2| = |2 - 7| = 5\\). A ordem da subtração não importa, porque o módulo apaga o sinal.",
        "Lendo ao contrário, cada expressão com módulo vira uma frase. \\(|x - 3|\\) é \"a distância de \\(x\\) até \\(3\\)\". E \\(|x + 1|\\) é \\(|x - (-1)|\\), a distância de \\(x\\) até \\(-1\\): o sinal de mais esconde um centro negativo.",
      ],
      alternativa: [
        "Pense num elevador. Do 2º ao 7º andar, ou do 7º ao 2º, ele percorre cinco andares. A subtração \\(7 - 2 = 5\\) ou \\(2 - 7 = -5\\) diz também para onde ele foi; o módulo guarda só o quanto andou.",
        "Sempre que uma conta com módulo parecer abstrata, troque o símbolo pela frase \"distância até...\" e marque os dois pontos numa reta. A resposta costuma aparecer antes da conta.",
      ],
      callout:
        "\\(|a - b|\\) é a distância entre \\(a\\) e \\(b\\) na reta. Leia \\(|x - c|\\) como \"a distância de \\(x\\) até \\(c\\)\".",
      formula: "|a − b| = distância entre a e b",
      formulaLatex: "|a - b| = |b - a| = \\text{distância entre } a \\text{ e } b",
      formulaAria:
        "módulo de a menos b igual a módulo de b menos a, igual à distância entre a e b",
      formulaLegend: "a ordem da subtração não muda a distância",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Tolerância", detail: "peça de \\(50\\) mm aceita se \\(|x - 50| \\leq 0{,}5\\)" },
        { label: "Erro de medida", detail: "a distância entre o valor medido e o real é o tamanho do erro" },
        { label: "Termostato", detail: "\\(|T - 20|\\) é o quanto a sala se afastou do alvo" },
        { label: "Estatística", detail: "desvio absoluto de cada dado até a média" },
        { label: "Programação", detail: "comparar números com \\(|a - b| < 0{,}001\\) em vez de exigir igualdade" },
        { label: "Limites", detail: "\"\\(x\\) perto de \\(a\\)\" é \\(|x - a|\\) pequeno" },
      ],
    },
    exemplo: {
      title: "A distância entre −3 e 4",
      situacao:
        "Na reta numérica, qual é a distância entre \\(-3\\) e \\(4\\)? Calcule de dois jeitos — contando passos na reta e usando o módulo — e confira que dão o mesmo.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Localizar os dois pontos",
          detail: "\\(-3\\) fica três passos à esquerda do zero; \\(4\\) fica quatro passos à direita. Estão em lados opostos.",
        },
        {
          title: "Contar na reta",
          detail: "Do \\(-3\\) até o zero são \\(3\\) passos; do zero até o \\(4\\), mais \\(4\\). Total: \\(7\\).",
        },
        {
          title: "Conferir com o módulo",
          detail: "\\(|4 - (-3)| = |4 + 3| = 7\\). Na outra ordem: \\(|-3 - 4| = |-7| = 7\\). Mesma distância.",
        },
        {
          title: "Reparar no sinal que sumiu",
          detail: "\\(4 - (-3) = 7\\) e \\(-3 - 4 = -7\\) diferem só no sinal, que indica a direção. O módulo descarta a direção e guarda a distância.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A distância é \\(7\\), e não \\(1\\). O tropeço mais comum é fazer \\(4 - 3\\), esquecendo que o \\(-3\\) está do outro lado do zero: subtrair um número negativo soma a distância dele.",
        "É esse o uso que o Cálculo fará do módulo. \\(|x - a|\\) mede o quanto \\(x\\) está longe de \\(a\\), de qualquer lado. Quando você encontrar \\(|x - 3| < 0{,}01\\), leia: \"\\(x\\) está a menos de um centésimo de \\(3\\)\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Calcular \\(|4 - (-3)|\\) como \\(|4 - 3|\\), perdendo o sinal do número negativo.",
        "Achar que \\(|a - b|\\) e \\(|b - a|\\) são diferentes: são a mesma distância, medida a partir de pontas opostas.",
        "Ler \\(|x + 2|\\) como distância até \\(2\\). Como \\(x + 2 = x - (-2)\\), o centro é \\(-2\\).",
        "Distribuir o módulo: \\(|a - b|\\) não é \\(|a| - |b|\\). Com \\(a = -3\\) e \\(b = 4\\), um dá \\(7\\) e o outro dá \\(-1\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Qual é a distância entre \\(-6\\) e \\(-2\\) na reta numérica?",
          identificar: "A distância entre \\(a\\) e \\(b\\) é \\(|a - b|\\).",
          dica: "\\(|-6 - (-2)| = |-6 + 2|\\).",
          resolucao:
            "\\(|-6 - (-2)| = |-4| = 4\\). Contando na reta: de \\(-6\\) até \\(-2\\) são quatro passos, sem passar pelo zero.",
          resposta: "4",
          interpretacao:
            "Os dois estão do mesmo lado do zero, então a distância é a diferença dos tamanhos: \\(6 - 2\\).",
          erroComum: "Somar \\(6 + 2 = 8\\), como se estivessem em lados opostos do zero.",
        },
        {
          id: "guiado-2",
          type: "interpretacao",
          enunciado: "Traduza em palavras a equação \\(|x - 5| = 3\\). Quais valores de \\(x\\) a satisfazem?",
          identificar: "Leia \\(|x - 5|\\) como \"a distância de \\(x\\) até \\(5\\)\".",
          dica: "Que números estão a três passos do \\(5\\)?",
          resolucao:
            "A frase é \"\\(x\\) está a três de distância do \\(5\\)\". Andando três para a direita chega-se a \\(8\\); três para a esquerda, a \\(2\\).",
          resposta: "x = 2 ou x = 8",
          interpretacao:
            "Uma distância fixa até um centro sempre dá dois pontos, um de cada lado. Por isso a equação modular tem duas soluções.",
          erroComum: "Responder só \\(x = 8\\) e esquecer o lado esquerdo.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado:
            "Um termômetro marcou \\(37{,}8\\) °C quando a temperatura real era \\(38{,}3\\) °C. Qual é o tamanho do erro?",
          identificar: "Tamanho do erro é a distância entre o valor medido e o real.",
          dica: "Calcule \\(|37{,}8 - 38{,}3|\\).",
          resolucao: "\\(|37{,}8 - 38{,}3| = |-0{,}5| = 0{,}5\\) °C.",
          resposta: "0,5 °C",
          interpretacao:
            "O sinal negativo diria que o termômetro marcou para menos. O tamanho do erro — o que decide se ele é confiável — é \\(0{,}5\\) °C.",
          erroComum: "Responder \\(-0{,}5\\) °C: um erro de tamanho negativo não existe.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Distâncias na reta, centros escondidos e equações com módulo.",
      exerciseIds: ["alg-mod-01", "alg-mod-02", "alg-mod-03"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(|x|\\) é a distância de \\(x\\) até o zero.",
        "\\(|a - b|\\) é a distância entre \\(a\\) e \\(b\\); a ordem não importa.",
        "Leia \\(|x - c|\\) como \"distância de \\(x\\) até \\(c\\)\"; em \\(|x + c|\\), o centro é \\(-c\\).",
        "O módulo não se distribui: em geral \\(|a - b| \\neq |a| - |b|\\).",
        "Próximo: usar essa leitura para resolver inequações com módulo.",
      ],
    },
  },

  "inequacoes-modulares": {
    meta: {
      ...preMeta({
        title: "Inequações modulares: faixas em torno de um centro",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 7,
        duration: "15 min",
        readingNotes: ["Menor que o raio: um intervalo", "Maior que o raio: duas pontas"],
        glossaryTerms: ["Valor absoluto", "Inequação", "Intervalo", "Vizinhança"],
        next: { slug: "sistemas-equacoes", title: "Sistemas de equações" },
      }),
      usedIn: [
        {
          label: "Epsilon e delta",
          href: "/calculo-1/limites/epsilon-delta-intuicao",
          detail: "0 < |x − a| < δ é a faixa em volta de a, sem o próprio a",
        },
        {
          label: "Ideia de limite",
          href: "/calculo-1/limites/ideia-de-limite",
          detail: "\"x se aproxima de a\" é |x − a| cada vez menor",
        },
      ],
    },
    plot: "faixa-modular",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Uma peça de \\(50\\) mm é aceita com meio milímetro de folga. Um remédio funciona se a dose ficar a menos de \\(15\\) mg da ideal. Um alarme dispara se a temperatura se afastar mais de \\(5\\) °C do normal. Três regras, a mesma forma: a distância até um alvo precisa ser menor — ou maior — que um limite.",
        "Escritas em matemática, elas são inequações modulares, como \\(|x - 50| \\leq 0{,}5\\). A aula anterior deu a leitura (\"distância de \\(x\\) até \\(50\\)\"); esta aula transforma a leitura em intervalo.",
        "É também, sem tirar nem pôr, a linguagem da definição de limite que você verá em Cálculo 1: \"\\(x\\) a menos de \\(\\delta\\) de \\(a\\)\" é \\(|x - a| < \\delta\\).",
      ],
    },
    explicacao: {
      title: "Menor que o raio é uma faixa; maior que o raio são duas pontas",
      paragraphs: [
        "\\(|x - c| < r\\) diz: \\(x\\) está a menos de \\(r\\) do centro \\(c\\). Os números que cumprem isso formam uma faixa de raio \\(r\\) em volta de \\(c\\), de \\(c - r\\) até \\(c + r\\). Em símbolos, \\(c - r < x < c + r\\).",
        "\\(|x - c| > r\\) diz o contrário: \\(x\\) está a mais de \\(r\\) do centro. Sobram as duas pontas de fora, \\(x < c - r\\) ou \\(x > c + r\\). Aqui a resposta é sempre \"um lado ou o outro\".",
        "Com \\(\\leq\\) e \\(\\geq\\) a ideia é a mesma, e as bordas \\(c - r\\) e \\(c + r\\) entram, porque ali a distância é exatamente \\(r\\). Antes de tudo, deixe o módulo sozinho de um lado e confira se \\(r\\) é positivo.",
      ],
      alternativa: [
        "Pense num cachorro preso a um poste em \\(c\\) por uma coleira de comprimento \\(r\\). \\(|x - c| < r\\) é tudo o que ele alcança: um trecho só, com o poste no meio. \\(|x - c| > r\\) é o que ele não alcança: tudo à esquerda e tudo à direita desse trecho.",
        "Por isso \"menor\" dá um intervalo e \"maior\" dá dois. Se esquecer qual é qual, desenhe o poste e a coleira.",
      ],
      callout:
        "Menor que \\(r\\): um intervalo só, \\(c - r < x < c + r\\). Maior que \\(r\\): duas pontas, \\(x < c - r\\) ou \\(x > c + r\\).",
      formula: "|x − c| < r ⟺ c − r < x < c + r;  |x − c| > r ⟺ x < c − r ou x > c + r",
      formulaLatex:
        "\\begin{aligned} |x - c| < r &\\iff c - r < x < c + r \\\\ |x - c| > r &\\iff x < c - r \\ \\text{ ou } \\ x > c + r \\end{aligned}",
      formulaAria:
        "módulo de x menos c menor que r equivale a c menos r menor que x menor que c mais r; módulo de x menos c maior que r equivale a x menor que c menos r, ou x maior que c mais r",
      formulaLegend: "valem para r positivo; com ≤ e ≥ as bordas entram",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Indústria", detail: "tolerância de fabricação, como \\(|x - 50| \\leq 0{,}5\\) mm" },
        { label: "Medicina", detail: "faixa de dose eficaz em torno da dose ideal" },
        { label: "Qualidade", detail: "peças rejeitadas são as de \\(|x - c| > r\\)" },
        { label: "Alarmes", detail: "disparar quando \\(|T - T_0| > 5\\)" },
        { label: "Pesquisas", detail: "margem de erro: resultado \\(\\pm 3\\) pontos" },
        { label: "Limites", detail: "\\(0 < |x - a| < \\delta\\) na definição formal" },
      ],
    },
    exemplo: {
      title: "Dentro da faixa e fora dela",
      situacao:
        "Resolva \\(|x - 3| \\leq 2\\) e, em seguida, \\(|x - 3| > 2\\). Use a leitura de distância antes de fazer qualquer conta.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Ler como distância",
          detail: "\\(|x - 3| \\leq 2\\) é \"\\(x\\) está a no máximo \\(2\\) do \\(3\\)\". O centro é \\(3\\) e o raio é \\(2\\).",
        },
        {
          title: "Andar o raio para cada lado",
          detail: "\\(3 - 2 = 1\\) e \\(3 + 2 = 5\\). As bordas da faixa são \\(1\\) e \\(5\\).",
        },
        {
          title: "Montar o intervalo",
          detail:
            "Como é \\(\\leq\\), as bordas entram: \\(1 \\leq x \\leq 5\\), ou \\([1, 5]\\). Pela regra dá o mesmo: \\(-2 \\leq x - 3 \\leq 2\\), e somando \\(3\\) nos três membros, \\(1 \\leq x \\leq 5\\).",
        },
        {
          title: "Inverter para o caso maior",
          detail:
            "\\(|x - 3| > 2\\) pede quem está a mais de \\(2\\) do \\(3\\): as duas pontas de fora, \\(x < 1\\) ou \\(x > 5\\). As bordas não entram, porque ali a distância é exatamente \\(2\\), e não mais que \\(2\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "No gráfico acima, \\(|x - 3|\\) é o V e o raio é a linha na altura \\(2\\). O trecho do V abaixo da linha é o intervalo \\([1, 5]\\); os trechos acima são as duas pontas. As duas respostas se completam: juntas cobrem a reta inteira, sem sobrar nem repetir ponto.",
        "Por isso testar um número resolve qualquer dúvida sobre o lado: o centro \\(x = 3\\) sempre satisfaz o \"menor que\", e um número bem longe, como \\(x = 100\\), sempre satisfaz o \"maior que\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Resolver \\(|x - 3| > 2\\) como \\(1 < x < 5\\), trocando as pontas de fora pela faixa de dentro.",
        "Escrever \\(x - 3 > 2\\), chegar a \\(x > 5\\) e parar, esquecendo o lado esquerdo.",
        "Aplicar a regra com raio negativo. \\(|x - 3| < -1\\) não tem solução, porque distância nunca é negativa; e \\(|x - 3| > -1\\) vale para todo \\(x\\).",
        "Não isolar o módulo antes. Em \\(2|x - 1| + 3 < 9\\), primeiro chegue a \\(|x - 1| < 3\\); só então leia o centro e o raio.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(|x + 1| < 4\\).",
          identificar: "Reescreva como distância: \\(|x + 1| = |x - (-1)|\\).",
          dica: "O centro é \\(-1\\), não \\(1\\).",
          resolucao:
            "\\(|x + 1| < 4\\) é \"\\(x\\) a menos de \\(4\\) do \\(-1\\)\". Bordas: \\(-1 - 4 = -5\\) e \\(-1 + 4 = 3\\). Como a desigualdade é estrita, elas não entram.",
          resposta: "-5 < x < 3",
          interpretacao: "É uma faixa de largura \\(8\\) centrada em \\(-1\\).",
          erroComum: "Tomar o centro como \\(1\\) e responder \\(-3 < x < 5\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(|2x - 6| \\geq 4\\).",
          identificar: "Tire o coeficiente de dentro do módulo para enxergar o centro: \\(|2x - 6| = 2|x - 3|\\).",
          dica: "A inequação vira \\(|x - 3| \\geq 2\\).",
          resolucao:
            "\\(2|x - 3| \\geq 4\\) dá \\(|x - 3| \\geq 2\\): distância até \\(3\\) de pelo menos \\(2\\). Resposta: \\(x \\leq 1\\) ou \\(x \\geq 5\\). Com \\(\\geq\\), as bordas entram.",
          resposta: "x ≤ 1 ou x ≥ 5",
          interpretacao:
            "O coeficiente \\(2\\) cortou o raio pela metade: o \\(4\\) dentro do módulo original vira \\(2\\) de distância real até o centro.",
          erroComum: "Usar \\(6\\) como centro e \\(4\\) como raio, sem dividir pelo coeficiente de \\(x\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado:
            "Um remédio é eficaz quando a dose \\(d\\), em mg, satisfaz \\(|d - 250| \\leq 15\\). Qual é a faixa de doses eficazes?",
          identificar: "Centro \\(250\\), raio \\(15\\).",
          dica: "Ande \\(15\\) para cada lado de \\(250\\).",
          resolucao:
            "\\(250 - 15 = 235\\) e \\(250 + 15 = 265\\). Com \\(\\leq\\), as bordas entram: \\(235 \\leq d \\leq 265\\).",
          resposta: "Entre 235 mg e 265 mg",
          interpretacao: "A prescrição \"\\(250\\) mg com margem de \\(15\\) mg\" é exatamente essa inequação.",
          erroComum: "Responder só \\(d \\leq 265\\), deixando passar doses baixas demais.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Faixas de tolerância, pontas de fora e o caso do raio negativo.",
      exerciseIds: ["alg-mod-04", "alg-mod-05", "alg-mod-06", "func-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Isole o módulo e confira se o raio \\(r\\) é positivo.",
        "\\(|x - c| < r\\): um intervalo, \\(c - r < x < c + r\\).",
        "\\(|x - c| > r\\): duas pontas, \\(x < c - r\\) ou \\(x > c + r\\).",
        "Com \\(\\leq\\) ou \\(\\geq\\), as bordas entram.",
        "Raio negativo: \"menor que\" não tem solução; \"maior que\" vale para todo \\(x\\).",
        "Próximo: sistemas de equações.",
      ],
    },
  },
};
