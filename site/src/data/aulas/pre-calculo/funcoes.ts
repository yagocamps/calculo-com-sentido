import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "funcoes";
const MOD_TITLE = "Funções";

export const funcoesAulas: Record<string, AulaContent> = {
  "o-que-e-funcao": {
    meta: preMeta({
      title: "O que é uma função?",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "10 min",
      readingNotes: ["A ideia de máquina", "Entrada → saída"],
      glossaryTerms: ["Função", "Variável", "Entrada", "Saída"],
      next: { slug: "dominio-imagem", title: "Domínio e imagem" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Função é uma das ideias mais úteis da matemática, e também uma das mais mal explicadas. No fundo, é simples: é uma regra que pega uma coisa e devolve outra.",
        "Você usa funções o tempo todo sem perceber: coloca um valor de compra e a máquina devolve o troco; coloca a distância e o app devolve o preço.",
        "Entender o que é uma função muda a forma como você lê fórmulas, gráficos e quase todo o resto do curso.",
      ],
    },
    explicacao: {
      title: "Uma máquina de entrada e saída",
      paragraphs: [
        "Pense numa máquina: você coloca um número (a entrada), ela aplica uma regra e devolve outro número (a saída). Essa máquina é a função.",
        "A regra mais importante: para cada entrada, existe uma só saída. Se você colocar o mesmo número, a máquina sempre devolve o mesmo resultado. É isso que faz dela uma função.",
      ],
      callout:
        "Função = regra que transforma cada entrada em exatamente uma saída. Mesma entrada, mesma saída, sempre.",
      formula: "f(x) = saída para a entrada x",
      formulaLatex: "f(x)",
      formulaAria: "f de x",
      formulaLegend: "f é a regra; x é a entrada; f(x) é a saída",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "App de corrida", detail: "distância → preço da viagem" },
        { label: "Conversão", detail: "reais → dólares pela cotação" },
        { label: "Temperatura", detail: "Celsius → Fahrenheit" },
        { label: "Programação", detail: "toda função recebe e devolve dados" },
        { label: "Física", detail: "tempo → posição de um objeto" },
        { label: "Planilhas", detail: "célula de entrada → fórmula → resultado" },
      ],
    },
    exemplo: {
      title: "Uma máquina simples",
      situacao:
        "Uma função dobra o número e soma 1: \\(f(x) = 2x + 1\\). O que ela devolve para a entrada \\(x = 3\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar a entrada",
          detail: "A entrada é \\(x = 3\\).",
        },
        {
          title: "Substituir e calcular",
          detail:
            "\\[\\begin{aligned} f(3) &= 2 \\cdot 3 + 1 \\\\ &= 6 + 1 \\\\ &= 7 \\end{aligned}\\]",
        },
        {
          title: "Interpretar a notação",
          detail: "\\(f(3) = 7\\) se lê: \"para a entrada 3, a função devolve 7\".",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(f(3) = 7\\) quer dizer que, ao colocar 3 na máquina, ela devolve 7. A notação \\(f(3)\\) não é multiplicação — é \"o valor da função em 3\".",
        "Se você colocar 3 de novo, sempre sai 7. Essa previsibilidade é a essência de função: a mesma entrada nunca dá duas saídas diferentes.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Ler \\(f(x)\\) como \\(f\\) vezes \\(x\\) — é \"f de x\", o valor da função.",
        "Achar que uma entrada pode ter duas saídas diferentes.",
        "Confundir a entrada (\\(x\\)) com a saída (\\(f(x)\\)).",
        "Esquecer a ordem das operações ao substituir.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(f(x) = x + 4\\), quanto é \\(f(10)\\)?",
          identificar: "Substitua \\(x\\) por 10.",
          dica: "\\(f(10) = 10 + 4\\).",
          resolucao: "\\(f(10) = 10 + 4 = 14\\).",
          resposta: "\\(14\\)",
          interpretacao: "Entrada 10 → saída 14, pela regra de somar 4.",
          erroComum: "Multiplicar 10 por 4.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Para \\(g(x) = 3x - 2\\), quanto é \\(g(0)\\)?",
          identificar: "Substitua \\(x\\) por 0.",
          dica: "\\(3 \\cdot 0 - 2\\).",
          resolucao: "\\(g(0) = 0 - 2 = -2\\).",
          resposta: "\\(-2\\)",
          interpretacao: "Mesmo com entrada zero, a parte fixa (\\(-2\\)) aparece na saída.",
          erroComum: "Achar que \\(g(0)\\) é sempre 0.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Uma tabela mostra entrada 2 → saída 5 e entrada 2 → saída 8. É função?",
          identificar: "Verifique se a mesma entrada dá saídas diferentes.",
          dica: "A regra de função proíbe isso.",
          resolucao: "A entrada 2 dá duas saídas (5 e 8), então não é função.",
          resposta: "Não é função",
          interpretacao: "Para ser função, cada entrada precisa de uma única saída.",
          erroComum: "Achar que qualquer tabela representa uma função.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a ideia de função e a notação f(x) no banco de exercícios.",
      exerciseIds: ["func-ap-01", "func-ap-02"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Função é uma regra: cada entrada gera uma única saída.",
        "f(x) se lê \"f de x\" — é o valor da função, não multiplicação.",
        "Substituir o x pela entrada e calcular dá a saída.",
        "Mesma entrada sempre devolve a mesma saída.",
      ],
    },
  },

  "dominio-imagem": {
    meta: preMeta({
      title: "Domínio e imagem",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "11 min",
      readingNotes: ["Entradas permitidas", "Saídas possíveis"],
      glossaryTerms: ["Domínio", "Imagem", "Restrição"],
      next: { slug: "funcao-afim", title: "Função afim" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Nem todo número pode entrar na máquina. Não dá para dividir por zero, nem tirar raiz quadrada de número negativo (nos reais). Essas são as entradas proibidas.",
        "Domínio é o conjunto das entradas permitidas; imagem é o conjunto das saídas que realmente saem. Saber isso evita respostas sem sentido.",
        "No mundo real o domínio também tem limite: tempo não é negativo, quantidade de pessoas é inteira. A matemática respeita o contexto.",
      ],
    },
    explicacao: {
      title: "O que pode entrar e o que pode sair",
      paragraphs: [
        "Domínio: todos os valores de entrada (x) para os quais a função faz sentido. Procure o que é proibido — divisão por zero e raiz de negativo são os campeões — e exclua.",
        "Imagem: todos os valores de saída (y) que a função realmente produz. É o resultado de aplicar a regra a todo o domínio.",
      ],
      callout:
        "Domínio é o que entra; imagem é o que sai. Comece sempre perguntando: tem divisão por zero ou raiz de negativo aqui?",
      formula: "f(x) = 1/x  ⟹  domínio: x ≠ 0",
      formulaLatex: "f(x) = \\frac{1}{x} \\;\\Rightarrow\\; x \\neq 0",
      formulaAria: "f de x igual a um sobre x implica x diferente de zero",
      formulaLegend: "o zero fica de fora do domínio por causa da divisão",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Tempo", detail: "em problemas reais, \\(t \\geq 0\\)" },
        { label: "Geometria", detail: "lados e raios são positivos" },
        { label: "Finanças", detail: "quantidade vendida não é negativa" },
        { label: "Física", detail: "domínio limitado pelo fenômeno" },
        { label: "Programação", detail: "validar entradas permitidas" },
        { label: "Cálculo", detail: "onde a função existe para derivar/integrar" },
      ],
    },
    exemplo: {
      title: "Uma função com entrada proibida",
      situacao:
        "Considere \\(f(x) = \\frac{1}{x - 2}\\). Qual é o domínio dessa função?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Procurar o que é proibido",
          detail: "Há uma divisão; o denominador não pode ser zero.",
        },
        {
          title: "Escrever e resolver a condição proibida",
          detail: "\\(x - 2 = 0\\) quando \\(x = 2\\) — logo \\(x = 2\\) não pode entrar.",
        },
        {
          title: "Escrever o domínio",
          detail: "Todos os reais menos o 2: \\(x \\neq 2\\).",
        },
        {
          title: "Conferir o sentido",
          detail: "Em \\(x = 2\\) daria \\(\\frac{1}{0}\\), que não existe. Confere a exclusão.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O domínio é \"todos os números reais, exceto 2\". Para qualquer outro valor a função funciona; só o 2 quebra a conta.",
        "No gráfico, isso vira um \"buraco\" ou uma linha que a curva nunca toca em \\(x = 2\\). O domínio antecipa onde a função existe.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de excluir o valor que zera o denominador.",
        "Permitir raiz quadrada de número negativo nos reais.",
        "Ignorar o contexto real (tempo ou quantidade negativos).",
        "Confundir domínio (entradas) com imagem (saídas).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Qual o domínio de \\(f(x) = \\frac{1}{x}\\)?",
          identificar: "Denominador não pode ser zero.",
          dica: "Quando \\(x = 0\\) há divisão por zero.",
          resolucao: "Exclua \\(x = 0\\): domínio é \\(x \\neq 0\\).",
          resposta: "\\(x \\neq 0\\)",
          interpretacao: "Todo real serve, menos o zero.",
          erroComum: "Incluir o zero no domínio.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Qual o domínio de \\(f(x) = \\sqrt{x}\\) (nos reais)?",
          identificar: "Raiz quadrada exige radicando não negativo.",
          dica: "\\(x\\) precisa ser \\(\\geq 0\\).",
          resolucao: "Domínio: \\(x \\geq 0\\).",
          resposta: "\\(x \\geq 0\\)",
          interpretacao: "Não existe raiz real de número negativo.",
          erroComum: "Permitir valores negativos de \\(x\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "A área de um quadrado é \\(A(L) = L^2\\). No mundo real, qual o domínio?",
          identificar: "\\(L\\) é o lado de um quadrado.",
          dica: "Comprimento não pode ser negativo nem zero.",
          resolucao: "\\(L > 0\\) (lado positivo).",
          resposta: "\\(L > 0\\)",
          interpretacao: "Matematicamente \\(L^2\\) aceita negativos, mas um lado real é positivo.",
          erroComum: "Usar todos os reais ignorando o contexto.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique determinação de domínio e imagem no banco de exercícios.",
      exerciseIds: ["func-ap-03", "func-ap-04"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Domínio = entradas permitidas; imagem = saídas possíveis.",
        "Proibições clássicas: dividir por zero e raiz de negativo.",
        "O contexto real pode restringir mais o domínio.",
        "O domínio diz onde a função existe.",
      ],
    },
  },

  "funcao-quadratica": {
    meta: preMeta({
      title: "Função quadrática: a parábola",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      readingNotes: ["Concavidade pelo sinal de a", "Vértice = máximo ou mínimo"],
      glossaryTerms: ["Parábola", "Vértice", "Concavidade", "Raiz"],
      next: { slug: "funcao-modular", title: "Função modular" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quando algo sobe e depois desce — uma bola jogada para o alto, o lucro que cresce e cai, a trajetória de um jato d'água — você está vendo uma função quadrática.",
        "O gráfico dela é uma parábola, aquela curva em forma de U (ou U de cabeça para baixo). O ponto de virada, o vértice, costuma ser a resposta da pergunta: altura máxima, lucro máximo, custo mínimo.",
        "É a primeira função que não é uma reta, e abre a porta para modelar quase todo fenômeno que tem um pico ou um fundo.",
      ],
    },
    explicacao: {
      title: "A forma e o que cada parte faz",
      paragraphs: [
        "A função quadrática é \\(f(x) = ax^2 + bx + c\\), com \\(a \\neq 0\\). O termo \\(ax^2\\) é o que dá a curva; sem ele seria uma reta.",
        "O sinal de \\(a\\) decide a concavidade: \\(a > 0\\) abre para cima (tem mínimo), \\(a < 0\\) abre para baixo (tem máximo). O vértice é o ponto extremo, e as raízes são onde a parábola cruza o eixo \\(x\\).",
      ],
      callout:
        "\\(a > 0\\): U para cima, tem ponto mínimo. \\(a < 0\\): U para baixo, tem ponto máximo. O vértice é sempre esse ponto de virada.",
      formula: "f(x) = ax² + bx + c,  x_v = −b/2a",
      formulaLatex: "f(x) = ax^2 + bx + c, \\quad x_v = \\frac{-b}{2a}",
      formulaAria: "f de x igual a a x ao quadrado mais b x mais c; x do vértice igual a menos b sobre dois a",
      formulaLegend: "a fórmula geral e a abscissa do vértice",
    },
    grafico: {
      fn: "-5 * x^2 + 20 * x",
      alt: "Parábola de boca para baixo: a altura de uma bola sobe, atinge o pico em x = 2 e desce de volta ao chão.",
      xDomain: [0, 4],
      yDomain: [0, 25],
      legend: "h(t) = −5t² + 20t — altura de uma bola; pico de 20 m em t = 2 s.",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Lançamentos", detail: "altura de uma bola ou projétil" },
        { label: "Lucro", detail: "preço ótimo que maximiza o ganho" },
        { label: "Engenharia", detail: "arcos e antenas parabólicas" },
        { label: "Custos", detail: "quantidade que minimiza o custo" },
        { label: "Esportes", detail: "trajetória de chutes e arremessos" },
        { label: "Cálculo", detail: "máximos e mínimos com derivada" },
      ],
    },
    exemplo: {
      title: "A altura de uma bola",
      situacao:
        "Uma bola é jogada e sua altura é \\(h(t) = -5t^2 + 20t\\) (em metros, \\(t\\) em segundos). Qual a altura máxima e quando ela ocorre?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar a, b e c",
          detail: "\\(a = -5\\), \\(b = 20\\), \\(c = 0\\). Como \\(a < 0\\), a parábola abre para baixo (tem máximo).",
        },
        {
          title: "Achar o instante do vértice",
          detail:
            "\\[\\begin{aligned} t_v &= \\frac{-b}{2a} = \\frac{-20}{2 \\cdot (-5)} \\\\ &= \\frac{-20}{-10} = 2 \\end{aligned}\\]",
        },
        {
          title: "Calcular a altura nesse instante",
          detail:
            "\\[\\begin{aligned} h(2) &= -5 \\cdot 4 + 20 \\cdot 2 \\\\ &= -20 + 40 \\\\ &= 20 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "Como \\(a < 0\\), o vértice é máximo: a bola sobe, atinge 20 m aos 2 s e cai. Faz sentido físico.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A bola atinge a altura máxima de 20 metros aos 2 segundos. O vértice respondeu exatamente \"qual o pico e quando\".",
        "O sinal negativo de \\(a\\) foi a pista: ele garante que existe um máximo, não um mínimo. Se \\(a\\) fosse positivo, a curva teria um fundo em vez de um pico.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer o sinal de \\(a\\) ao decidir se é máximo ou mínimo.",
        "Errar o sinal em \\(\\frac{-b}{2a}\\) (o \\(b = 20\\) dá \\(-20\\) no numerador).",
        "Calcular só \\(t_v\\) e esquecer de achar a altura \\(h(t_v)\\).",
        "Confundir as raízes (onde \\(y = 0\\)) com o vértice (extremo).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "A função \\(f(x) = 2x^2 - 3x + 1\\) tem máximo ou mínimo?",
          identificar: "Olhe o sinal de \\(a\\).",
          dica: "\\(a = 2 > 0\\).",
          resolucao: "Como \\(a > 0\\), a parábola abre para cima: tem mínimo.",
          resposta: "Mínimo",
          interpretacao: "U para cima sempre tem um ponto de fundo.",
          erroComum: "Achar que toda parábola tem máximo.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Ache o \\(x\\) do vértice de \\(f(x) = x^2 - 6x + 5\\).",
          identificar: "Use \\(x_v = \\frac{-b}{2a}\\).",
          dica: "\\(a = 1\\), \\(b = -6\\).",
          resolucao:
            "\\[\\begin{aligned} x_v &= \\frac{-(-6)}{2 \\cdot 1} = \\frac{6}{2} \\\\ &= 3 \\end{aligned}\\]",
          resposta: "\\(x_v = 3\\)",
          interpretacao: "O extremo (aqui mínimo) está em \\(x = 3\\).",
          erroComum: "Esquecer que \\(-(-6) = +6\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Quais as raízes de \\(x^2 - 5x + 6 = 0\\)?",
          identificar: "Onde a parábola corta o eixo \\(x\\).",
          dica: "Fatore: dois números que somam 5 e multiplicam 6.",
          resolucao:
            "\\[\\begin{aligned} x^2 - 5x + 6 &= 0 \\\\ (x - 2)(x - 3) &= 0 \\\\ x = 2 \\ &\\text{ou} \\ x = 3 \\end{aligned}\\]",
          resposta: "\\(x = 2\\) e \\(x = 3\\)",
          interpretacao: "A parábola cruza o eixo \\(x\\) nesses dois pontos.",
          erroComum: "Confundir as raízes com o vértice.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique parábolas, vértice e raízes no banco de exercícios.",
      exerciseIds: ["func-ap-05", "func-ap-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Função quadrática: \\(f(x) = ax^2 + bx + c\\), gráfico em parábola.",
        "\\(a > 0\\) abre para cima (mínimo); \\(a < 0\\) abre para baixo (máximo).",
        "Vértice em \\(x_v = \\frac{-b}{2a}\\) é o ponto extremo.",
        "Raízes são onde a parábola cruza o eixo \\(x\\).",
      ],
    },
  },

  "funcao-modular": {
    meta: preMeta({
      title: "Função modular: distância sem sinal",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "11 min",
      readingNotes: ["Módulo = distância até zero", "Gráfico em V"],
      glossaryTerms: ["Módulo", "Valor absoluto", "Distância"],
      next: { slug: "funcao-exponencial", title: "Função exponencial" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Às vezes só importa o tamanho, não a direção. A distância entre duas cidades é a mesma na ida e na volta; um erro de 2 graus para mais ou para menos é igualmente ruim.",
        "O módulo (ou valor absoluto) captura essa ideia: ele transforma qualquer número no seu tamanho, sempre positivo. |−5| e |5| dão os dois 5.",
        "É a ferramenta certa para medir diferença, erro e distância — situações em que o sinal não interessa.",
      ],
    },
    explicacao: {
      title: "O que o módulo faz",
      paragraphs: [
        "O módulo de um número é a distância dele até o zero, sempre positiva (ou zero). Se o número já é positivo, fica igual; se é negativo, vira positivo.",
        "A função f(x) = |x| tem gráfico em forma de V: desce até o zero e sobe de novo, espelhada. O bico do V fica na origem.",
      ],
      callout:
        "Módulo = tamanho sem sinal. |x| nunca é negativo, porque distância não é negativa.",
      formula: "|x| = x se x ≥ 0;  |x| = −x se x < 0",
      formulaLatex: "|x| = \\begin{cases} x & x \\geq 0 \\\\ -x & x < 0 \\end{cases}",
      formulaAria: "módulo de x é igual a x se x maior ou igual a zero, e menos x se x menor que zero",
      formulaLegend: "a definição por partes do valor absoluto",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Distância", detail: "quão longe, sem se importar com direção" },
        { label: "Erro", detail: "desvio para mais ou para menos" },
        { label: "Tolerância", detail: "peça dentro de \\(\\pm 0{,}5\\) mm" },
        { label: "Finanças", detail: "diferença absoluta entre valores" },
        { label: "Programação", detail: "função abs() em toda linguagem" },
        { label: "Física", detail: "módulo de uma grandeza vetorial" },
      ],
    },
    exemplo: {
      title: "Um erro de temperatura",
      situacao:
        "Um termostato deve manter 20 °C. A diferença em relação ao alvo é \\(|T - 20|\\). Qual a diferença quando \\(T = 17\\) °C e quando \\(T = 23\\) °C?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Calcular para T = 17",
          detail: "\\(|17 - 20| = |-3| = 3\\).",
        },
        {
          title: "Calcular para T = 23",
          detail: "\\(|23 - 20| = |3| = 3\\).",
        },
        {
          title: "Comparar os dois casos",
          detail: "Ambos dão 3: o erro tem o mesmo tamanho, para baixo ou para cima.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Estar a 17 °C ou a 23 °C representa o mesmo erro de 3 graus em relação ao alvo. O módulo ignora se faltou ou sobrou — só mede o quanto.",
        "Por isso \\(|x|\\) é a ferramenta de \"distância\": o que importa é o afastamento do alvo, não o lado para o qual ele aconteceu.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que \\(|-x| = x\\) sempre (só vale se você souber o sinal de \\(x\\)).",
        "Tratar o módulo como se cancelasse o número (\\(|-5|\\) não é \\(-5\\)).",
        "Esquecer que o módulo pode dar zero (quando o número é zero).",
        "Distribuir módulo sobre soma: \\(|a + b|\\) nem sempre é \\(|a| + |b|\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quanto é \\(|-8|\\)?",
          identificar: "Distância de \\(-8\\) até o zero.",
          dica: "Negativo vira positivo.",
          resolucao: "\\(|-8| = 8\\).",
          resposta: "\\(8\\)",
          interpretacao: "\\(-8\\) está a 8 unidades do zero.",
          erroComum: "Responder \\(-8\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Calcule \\(|3 - 10|\\).",
          identificar: "Resolva dentro do módulo primeiro.",
          dica: "\\(3 - 10 = -7\\).",
          resolucao: "\\(|3 - 10| = |-7| = 7\\).",
          resposta: "\\(7\\)",
          interpretacao: "A diferença entre 3 e 10 é 7, em tamanho.",
          erroComum: "Aplicar o módulo antes de fazer a subtração.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Para quais valores de \\(x\\) temos \\(|x| = 5\\)?",
          identificar: "Quais números estão a 5 do zero?",
          dica: "Há dois: um positivo e um negativo.",
          resolucao: "\\(x = 5\\) ou \\(x = -5\\).",
          resposta: "\\(x = 5\\) e \\(x = -5\\)",
          interpretacao: "Dois pontos têm distância 5 até o zero, um de cada lado.",
          erroComum: "Dar só a solução positiva.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique módulo, distância e erros no banco de exercícios.",
      exerciseIds: ["func-ap-07", "func-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Módulo = distância até o zero, sempre \\(\\geq 0\\).",
        "\\(|x|\\) mantém positivos e inverte negativos.",
        "O gráfico de \\(|x|\\) é um V com bico na origem.",
        "\\(|x| = k\\) (\\(k > 0\\)) tem duas soluções: \\(k\\) e \\(-k\\).",
      ],
    },
  },

  "funcao-exponencial": {
    meta: preMeta({
      title: "Função exponencial: crescimento que acelera",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "13 min",
      readingNotes: ["Multiplicar em vez de somar", "Crescimento e decaimento"],
      glossaryTerms: ["Exponencial", "Base", "Crescimento", "Decaimento"],
      next: { slug: "funcao-logaritmica", title: "Função logarítmica" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Tem coisa que não cresce somando sempre o mesmo tanto, e sim multiplicando: o dinheiro com juros, uma população, um vídeo que viraliza. A cada passo, fica vezes maior.",
        "Esse crescimento que acelera é a função exponencial. No começo parece lento, depois dispara — é por isso que juros compostos e \"viralizar\" surpreendem tanto.",
        "Entender exponencial explica desde a conta da poupança até por que uma epidemia cresce tão rápido no início.",
      ],
    },
    explicacao: {
      title: "Multiplicar em vez de somar",
      paragraphs: [
        "Na função afim você soma sempre o mesmo valor. Na exponencial você multiplica sempre pela mesma base. \\(f(x) = a \\cdot b^x\\): \\(a\\) é o valor inicial e \\(b\\) é o fator de multiplicação a cada passo.",
        "Se \\(b > 1\\), há crescimento (cada passo aumenta); se \\(0 < b < 1\\), há decaimento (cada passo diminui). O gráfico sobe (ou desce) cada vez mais rápido.",
      ],
      callout:
        "Afim soma a mesma coisa; exponencial multiplica pela mesma coisa. \\(b > 1\\) cresce, \\(0 < b < 1\\) decai.",
      formula: "f(x) = a·bˣ",
      formulaLatex: "f(x) = a \\cdot b^{x}",
      formulaAria: "f de x igual a a vezes b elevado a x",
      formulaLegend: "a = valor inicial · b = fator de multiplicação por passo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Juros compostos", detail: "dinheiro multiplicando a cada período" },
        { label: "População", detail: "crescimento populacional ou de bactérias" },
        { label: "Viral", detail: "compartilhamentos dobrando" },
        { label: "Remédios", detail: "concentração caindo pela metade" },
        { label: "Radioatividade", detail: "meia-vida de materiais" },
        { label: "Tecnologia", detail: "lei de Moore, capacidade dobrando" },
      ],
    },
    exemplo: {
      title: "Bactérias que dobram",
      situacao:
        "Uma cultura começa com 100 bactérias e dobra a cada hora: \\(N(t) = 100 \\cdot 2^t\\). Quantas bactérias há após 3 horas?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os elementos",
          detail: "Valor inicial \\(a = 100\\); base \\(b = 2\\) (dobra); \\(t = 3\\) horas.",
        },
        {
          title: "Substituir e calcular",
          detail:
            "\\[\\begin{aligned} N(3) &= 100 \\cdot 2^3 \\\\ &= 100 \\cdot 8 \\\\ &= 800 \\end{aligned}\\]",
        },
        {
          title: "Conferir passo a passo",
          detail: "\\(100 \\to 200\\) (1h) \\(\\to 400\\) (2h) \\(\\to 800\\) (3h). Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Após 3 horas há 800 bactérias. Repare como o salto da 2ª para a 3ª hora (de 400 para 800) é bem maior que da 1ª (de 100 para 200): é o crescimento que acelera.",
        "Esse é o motivo de juros compostos e epidemias parecerem inofensivos no início e explodirem depois — a multiplicação se acumula sobre um número cada vez maior.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Tratar como afim e somar em vez de multiplicar.",
        "Multiplicar a base pelo expoente (\\(2^3\\) não é 6).",
        "Esquecer o valor inicial \\(a\\) ao calcular.",
        "Confundir crescimento (\\(b > 1\\)) com decaimento (\\(b < 1\\)).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(f(x) = 3 \\cdot 2^x\\), quanto é \\(f(2)\\)?",
          identificar: "Calcule a potência antes de multiplicar.",
          dica: "\\(2^2 = 4\\).",
          resolucao: "\\(f(2) = 3 \\cdot 4 = 12\\).",
          resposta: "\\(12\\)",
          interpretacao: "Partindo de 3, multiplicado por 2 duas vezes.",
          erroComum: "Fazer 3·2·2 na ordem errada ou somar.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "\\(f(x) = 5 \\cdot (0{,}5)^x\\) cresce ou decai?",
          identificar: "Olhe a base.",
          dica: "\\(0{,}5\\) está entre 0 e 1.",
          resolucao: "Como \\(0 < 0{,}5 < 1\\), a função decai.",
          resposta: "Decai",
          interpretacao: "Cada passo corta o valor pela metade.",
          erroComum: "Achar que toda exponencial cresce.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Um remédio de 80 mg cai pela metade a cada 4 h. Quanto resta após 8 h?",
          identificar: "Duas meias-vidas em 8 horas.",
          dica: "Multiplique por \\(\\frac{1}{2}\\) duas vezes.",
          resolucao: "\\(80 \\to 40\\) (4h) \\(\\to 20\\) (8h).",
          resposta: "20 mg",
          interpretacao: "Decaimento exponencial: metade, depois metade da metade.",
          erroComum: "Subtrair sempre 40 mg em vez de multiplicar por \\(\\frac{1}{2}\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique crescimento e decaimento exponencial no banco de exercícios.",
      exerciseIds: ["func-ap-09", "func-ap-10"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Exponencial multiplica pela mesma base a cada passo.",
        "\\(f(x) = a \\cdot b^x\\): \\(a\\) é o inicial, \\(b\\) o fator por passo.",
        "\\(b > 1\\) cresce acelerando; \\(0 < b < 1\\) decai.",
        "Calcule a potência antes de multiplicar pelo inicial.",
      ],
    },
  },

  "funcao-logaritmica": {
    meta: preMeta({
      title: "Função logarítmica: a operação inversa",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "13 min",
      readingNotes: ["Log responde 'qual expoente?'", "Inversa da exponencial"],
      glossaryTerms: ["Logaritmo", "Base", "Expoente", "Inversa"],
      next: { slug: "corrida-aplicativo", title: "Aplicação: corrida de app" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Se a exponencial responde \"quanto vira depois de tantos passos?\", o logaritmo responde a pergunta inversa: \"quantos passos para chegar nesse valor?\".",
        "Quanto tempo para o dinheiro dobrar? Quantas vezes preciso dividir até sobrar pouco? Essas perguntas de \"quantas vezes\" são logaritmos.",
        "O log também é o que comprime escalas enormes: terremotos (Richter), som (decibéis) e pH usam logaritmo para caber números gigantes numa régua pequena.",
      ],
    },
    explicacao: {
      title: "Log pergunta 'qual é o expoente?'",
      paragraphs: [
        "\\(\\log_b(N)\\) pergunta: \"a qual expoente preciso elevar a base \\(b\\) para obter \\(N\\)?\". Por exemplo, \\(\\log_2(8) = 3\\), porque \\(2^3 = 8\\).",
        "É exatamente a operação inversa da exponencial. Onde a exponencial empilha multiplicações, o log conta quantas foram. Por isso elas se desfazem.",
      ],
      callout:
        "\\(\\log_b(N) = x\\) significa \\(b^x = N\\). Logaritmo é \"qual expoente\"; é a inversa da exponencial.",
      formula: "log_b(N) = x  ⟺  bˣ = N",
      formulaLatex: "\\log_b(N) = x \\iff b^{x} = N",
      formulaAria: "log na base b de N igual a x se e somente se b elevado a x igual a N",
      formulaLegend: "a definição do logaritmo como inverso da potência",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Terremotos", detail: "escala Richter é logarítmica" },
        { label: "Som", detail: "decibéis medem intensidade em log" },
        { label: "Química", detail: "pH é −log da concentração" },
        { label: "Finanças", detail: "tempo para um investimento dobrar" },
        { label: "Computação", detail: "complexidade O(log n) em buscas" },
        { label: "Cálculo", detail: "derivadas e integrais de log e exp" },
      ],
    },
    exemplo: {
      title: "Quantas vezes dobrar até chegar a 64?",
      situacao:
        "Você começa com 1 e dobra repetidamente: 1, 2, 4, 8... Quantas vezes precisa dobrar para chegar a 64? Em log: quanto é \\(\\log_2(64)\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reescrever como pergunta de expoente",
          detail: "\\(\\log_2(64)\\) pergunta: 2 elevado a quê dá 64?",
        },
        {
          title: "Testar potências de 2",
          detail: "\\(2^1=2,\\ 2^2=4,\\ 2^3=8,\\ 2^4=16,\\ 2^5=32,\\ 2^6=64\\).",
        },
        {
          title: "Identificar o expoente certo",
          detail: "\\(2^6 = 64\\), então \\(\\log_2(64) = 6\\).",
        },
        {
          title: "Conferir com a contagem",
          detail: "Dobrar 6 vezes a partir de 1: 2, 4, 8, 16, 32, 64. Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(\\log_2(64) = 6\\) quer dizer que são necessárias 6 duplicações para sair de 1 e chegar a 64. O log contou os passos da exponencial.",
        "Repare como o log encolhe números grandes: 64 vira 6. É por isso que escalas como Richter e decibéis usam log — para que diferenças enormes caibam em poucos números.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que log é multiplicação ou divisão.",
        "Esquecer qual é a base (\\(\\log_2\\) e \\(\\log_{10}\\) dão resultados diferentes).",
        "Tentar calcular log de número negativo ou zero (não existe).",
        "Inverter a pergunta: log dá o expoente, não a potência.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quanto é \\(\\log_3(9)\\)?",
          identificar: "3 elevado a quê dá 9?",
          dica: "Pense nas potências de 3.",
          resolucao: "\\(3^2 = 9\\), então \\(\\log_3(9) = 2\\).",
          resposta: "\\(2\\)",
          interpretacao: "São dois passos de multiplicação por 3.",
          erroComum: "Responder 3 (a base) em vez do expoente.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quanto é \\(\\log_{10}(1000)\\)?",
          identificar: "10 elevado a quê dá 1000?",
          dica: "\\(1000 = 10 \\cdot 10 \\cdot 10\\).",
          resolucao: "\\(10^3 = 1000\\), então \\(\\log_{10}(1000) = 3\\).",
          resposta: "\\(3\\)",
          interpretacao: "O log base 10 conta os zeros das potências de 10.",
          erroComum: "Responder 100 ou 1000.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que log e exponencial se desfazem?",
          identificar: "Pense no que cada uma faz.",
          dica: "Uma empilha multiplicações; a outra conta quantas.",
          resolucao: "A exponencial leva o expoente ao valor; o log leva o valor de volta ao expoente, desfazendo a operação.",
          resposta: "São operações inversas",
          interpretacao: "Como soma e subtração: uma anula a outra.",
          erroComum: "Achar que são operações independentes.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique logaritmos e a relação com exponenciais no banco de exercícios.",
      exerciseIds: ["func-ap-11", "func-ap-12"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(\\log_b(N)\\) pergunta: qual expoente leva \\(b\\) a \\(N\\)?",
        "Logaritmo é a operação inversa da exponencial.",
        "\\(\\log_b(N) = x\\) equivale a \\(b^x = N\\).",
        "Log comprime números grandes (Richter, decibéis, pH).",
      ],
    },
  },

  "corrida-aplicativo": {
    meta: preMeta({
      title: "Aplicação: corrida de aplicativo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "9 min",
      readingNotes: ["Função afim na prática", "Bandeirada + por km"],
      glossaryTerms: ["Função afim", "Taxa", "Valor inicial"],
      next: { slug: "juros-compostos", title: "Aplicação: juros compostos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A corrida de app é o exemplo perfeito de função afim: você paga uma bandeirada fixa só para entrar no carro, e mais um tanto por quilômetro rodado.",
        "Entender essa conta deixa você prever o preço antes de pedir, comparar trajetos e perceber quando uma tarifa dinâmica está cara.",
        "É a mesma estrutura de plano de celular e salário com comissão — depois de ver aqui, você reconhece em todo lugar.",
      ],
    },
    explicacao: {
      title: "Fixo mais variável, de novo",
      paragraphs: [
        "O preço é C(x) = bandeirada + (preço por km × km rodados). A bandeirada é o valor inicial b; o preço por km é a taxa a.",
        "No gráfico, é uma reta que começa na altura da bandeirada (quando x = 0) e sobe de forma constante. Cada km a mais soma sempre o mesmo valor.",
      ],
      callout:
        "\\(C(x) = a \\cdot x + b\\): \\(a\\) é o preço por km, \\(b\\) é a bandeirada. Quilometragem zero já custa a bandeirada.",
      formula: "C(x) = 2,5·x + 6",
      formulaLatex: "C(x) = 2{,}5 \\cdot x + 6",
      formulaAria: "C de x igual a dois vírgula cinco vezes x mais seis",
      formulaLegend: "exemplo: R$ 6 de bandeirada + R$ 2,50 por km",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Apps de corrida", detail: "preço por trajeto" },
        { label: "Táxi", detail: "bandeirada + taxímetro" },
        { label: "Frete", detail: "taxa base + por km" },
        { label: "Salário", detail: "fixo + comissão por venda" },
        { label: "Aluguel de equipamento", detail: "taxa + por hora" },
        { label: "Conta de água", detail: "tarifa mínima + consumo" },
      ],
    },
    exemplo: {
      title: "Quanto vou pagar?",
      situacao:
        "Um app cobra R$ 6 de bandeirada e R$ 2,50 por km. Quanto custa uma corrida de 8 km? E de quantos km a corrida custaria R$ 31?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar a função",
          detail: "\\(C(x) = 2{,}5x + 6\\), com \\(x\\) = km.",
        },
        {
          title: "Calcular o preço de 8 km",
          detail:
            "\\[\\begin{aligned} C(8) &= 2{,}5 \\cdot 8 + 6 \\\\ &= 20 + 6 \\\\ &= 26 \\end{aligned}\\]",
        },
        {
          title: "Para R$ 31, montar e resolver a equação",
          detail:
            "\\[\\begin{aligned} 2{,}5x + 6 &= 31 \\\\ 2{,}5x &= 25 \\\\ x &= 10 \\end{aligned}\\]",
        },
        {
          title: "Interpretar",
          detail: "8 km custam R$ 26; uma corrida de R$ 31 tem 10 km.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Você consegue ir nos dois sentidos: do trajeto para o preço (\\(C(8) = 26\\)) e do preço para o trajeto (R$ 31 → 10 km). É a mesma função, lida de dois jeitos.",
        "A bandeirada de R$ 6 é o que você paga mesmo sem andar quase nada. Por isso corridas curtíssimas saem proporcionalmente caras: o fixo pesa mais.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de somar a bandeirada ao preço por km.",
        "Multiplicar a bandeirada pelos km.",
        "Ao achar os km, dividir antes de tirar a bandeirada.",
        "Confundir o preço por km (taxa) com o total da corrida.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Com \\(C(x) = 2{,}5x + 6\\), quanto custa uma corrida de 4 km?",
          identificar: "Substitua \\(x = 4\\).",
          dica: "\\(2{,}5 \\cdot 4 + 6\\).",
          resolucao:
            "\\[\\begin{aligned} C(4) &= 2{,}5 \\cdot 4 + 6 \\\\ &= 10 + 6 = 16 \\end{aligned}\\]",
          resposta: "R$ 16,00",
          interpretacao: "Metade do trajeto de 8 km, mas não metade do preço, por causa da bandeirada.",
          erroComum: "Esquecer a bandeirada e responder R$ 10.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quantos km dá uma corrida de R$ 21 nesse app?",
          identificar: "Resolva \\(2{,}5x + 6 = 21\\).",
          dica: "Tire 6, depois divida por \\(2{,}5\\).",
          resolucao:
            "\\[\\begin{aligned} 2{,}5x + 6 &= 21 \\\\ 2{,}5x &= 15 \\\\ x &= 6 \\end{aligned}\\]",
          resposta: "6 km",
          interpretacao: "Verificando: \\(2{,}5 \\cdot 6 + 6 = 21\\). Confere.",
          erroComum: "Dividir 21 por 2,5 sem tirar a bandeirada.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "App A: R$ 5 + R$ 3/km. App B: R$ 8 + R$ 2/km. Para 5 km, qual sai mais barato?",
          identificar: "Calcule os dois preços e compare.",
          dica: "A: \\(5 + 15\\); B: \\(8 + 10\\).",
          resolucao: "\\(A = 20\\); \\(B = 18\\). B é mais barato.",
          resposta: "App B (R$ 18)",
          interpretacao: "O menor preço por km de B compensa a bandeirada maior nesse trajeto.",
          erroComum: "Escolher pelo menor fixo sem calcular o total.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique problemas de corrida e tarifas no banco de exercícios.",
      exerciseIds: ["func-ap-13", "func-ap-14"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Corrida de app é função afim: bandeirada + preço por km.",
        "\\(C(x) = a \\cdot x + b\\), com \\(b\\) = bandeirada e \\(a\\) = preço por km.",
        "Dá para ir do trajeto ao preço e do preço ao trajeto.",
        "A bandeirada pesa mais em corridas curtas.",
      ],
    },
  },

  "juros-compostos": {
    meta: preMeta({
      title: "Aplicação: juros compostos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "10 min",
      readingNotes: ["Exponencial na prática", "Juro sobre juro"],
      glossaryTerms: ["Juros compostos", "Montante", "Taxa", "Capital"],
      next: { slug: "custo-producao", title: "Aplicação: custo de produção" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Juros compostos é a função exponencial no seu bolso. O dinheiro não rende sobre o valor inicial só: rende sobre o que já rendeu também — juro sobre juro.",
        "É o que faz um investimento crescer cada vez mais rápido com o tempo, e também o que faz uma dívida de cartão sair do controle.",
        "Entender essa conta é uma das aplicações mais úteis de matemática para a vida adulta.",
      ],
    },
    explicacao: {
      title: "Multiplicar pelo fator a cada período",
      paragraphs: [
        "A cada período, o valor é multiplicado por \\((1 + i)\\), onde \\(i\\) é a taxa em decimal. Após \\(t\\) períodos, multiplica-se \\(t\\) vezes: \\(M = C \\cdot (1 + i)^t\\).",
        "\\(C\\) é o capital inicial, \\(i\\) a taxa por período e \\(t\\) o número de períodos. Como há multiplicação repetida, o crescimento é exponencial — acelera com o tempo.",
      ],
      callout:
        "Cada período multiplica por \\((1 + i)\\). Repetir isso \\(t\\) vezes é elevar \\((1 + i)\\) à potência \\(t\\).",
      formula: "M = C·(1 + i)ᵗ",
      formulaLatex: "M = C \\cdot (1 + i)^{t}",
      formulaAria: "M igual a C vezes abre parêntese um mais i fecha parêntese elevado a t",
      formulaLegend: "montante = capital × fator de juro elevado ao número de períodos",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Poupança", detail: "rendimento mês a mês" },
        { label: "Investimentos", detail: "CDB, Tesouro, fundos" },
        { label: "Cartão de crédito", detail: "dívida que cresce rápido" },
        { label: "Financiamento", detail: "saldo devedor com juros" },
        { label: "Inflação", detail: "preços subindo a cada ano" },
        { label: "Aposentadoria", detail: "acúmulo de longo prazo" },
      ],
    },
    exemplo: {
      title: "R$ 1000 rendendo 10% ao ano",
      situacao:
        "Você investe R$ 1000 a 10% ao ano (juros compostos). Quanto terá após 2 anos?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os valores",
          detail: "\\(C = 1000\\); \\(i = 10\\% = 0{,}10\\); \\(t = 2\\) anos.",
        },
        {
          title: "Montar e desenvolver a fórmula",
          detail:
            "\\[\\begin{aligned} M &= 1000 \\cdot (1 + 0{,}10)^2 \\\\ &= 1000 \\cdot (1{,}10)^2 \\\\ &= 1000 \\cdot 1{,}21 \\\\ &= 1210 \\end{aligned}\\]",
        },
        {
          title: "Comparar com juro simples",
          detail: "Juro simples daria \\(1000 + 100 + 100 = 1200\\); composto deu 1210 (os R$ 10 a mais são juro sobre juro).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Após 2 anos você tem R$ 1210. Os R$ 10 a mais em relação ao juro simples vêm do segundo ano render também sobre os R$ 100 ganhos no primeiro.",
        "Essa diferença parece pequena em 2 anos, mas vira enorme em 10 ou 20 — é o efeito exponencial. Por isso começar cedo a investir faz tanta diferença.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar a taxa em porcentagem (\\(10\\)) em vez de decimal (\\(0{,}10\\)).",
        "Multiplicar a base pelo expoente em vez de elevar.",
        "Confundir juro composto com simples (somar sempre o mesmo).",
        "Esquecer de somar o 1 ao \\(i\\): é \\((1 + i)\\), não \\(i\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "R$ 500 a 10% ao ano, por 1 ano. Qual o montante?",
          identificar: "Use \\(M = C \\cdot (1 + i)^t\\) com \\(t = 1\\).",
          dica: "\\(500 \\cdot 1{,}10\\).",
          resolucao: "\\(500 \\cdot 1{,}10 = 550\\).",
          resposta: "R$ 550,00",
          interpretacao: "Em 1 ano, composto e simples dão o mesmo: R$ 50 de juro.",
          erroComum: "Usar \\(1{,}10^2\\) mesmo com \\(t = 1\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "R$ 1000 a 20% ao ano, por 2 anos. Qual o montante?",
          identificar: "Eleve \\((1{,}20)\\) ao quadrado.",
          dica: "\\((1{,}20)^2 = 1{,}44\\).",
          resolucao:
            "\\[\\begin{aligned} M &= 1000 \\cdot (1{,}20)^2 \\\\ &= 1000 \\cdot 1{,}44 \\\\ &= 1440 \\end{aligned}\\]",
          resposta: "R$ 1440,00",
          interpretacao: "Juro simples daria 1400; os R$ 40 extras são juro sobre juro.",
          erroComum: "Calcular \\(1000 \\cdot 1{,}40\\).",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Por que juros compostos crescem mais rápido que simples com o tempo?",
          identificar: "Pense sobre o que rende juro a cada período.",
          dica: "No composto, o juro também rende.",
          resolucao: "No composto, cada período rende sobre o total acumulado (capital + juros anteriores), então a base de cálculo cresce.",
          resposta: "Porque o juro rende juro",
          interpretacao: "É multiplicação repetida, não soma fixa — daí ser exponencial.",
          erroComum: "Achar que a diferença é constante todo ano.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique juros compostos e montante no banco de exercícios.",
      exerciseIds: ["func-ap-15", "func-ap-16"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Juros compostos: \\(M = C \\cdot (1 + i)^t\\).",
        "A taxa entra em decimal (\\(10\\% = 0{,}10\\)) e soma-se 1.",
        "Cada período rende sobre o total acumulado (juro sobre juro).",
        "É crescimento exponencial: dispara no longo prazo.",
      ],
    },
  },

  "custo-producao": {
    meta: preMeta({
      title: "Aplicação: custo de produção",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "10 min",
      readingNotes: ["Custo como função", "Quadrática para custo mínimo"],
      glossaryTerms: ["Custo", "Função custo", "Mínimo"],
      next: { slug: "revisao-funcoes-1", title: "Revisão · Parte 1" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Custo de produção pode ser uma função afim (fixo + por unidade) ou, quando há ineficiências e ganhos de escala, uma quadrática com um ponto de custo mínimo.",
        "Escrever o custo como função permite responder perguntas valiosas: quanto custa produzir X, e qual a quantidade que minimiza o custo por unidade.",
        "Reúne o que você viu de função afim e quadrática num problema real de negócio.",
      ],
    },
    explicacao: {
      title: "Custo como função da quantidade",
      paragraphs: [
        "No caso simples, C(x) = custo fixo + custo variável × quantidade — uma função afim. O gráfico é uma reta que parte do custo fixo.",
        "Quando o custo por unidade muda com a escala, o custo médio vira uma quadrática: cai, atinge um mínimo e depois sobe. O vértice (\\(x_v = \\frac{-b}{2a}\\)) aponta a quantidade de custo mínimo.",
      ],
      callout:
        "Custo afim: reta partindo do fixo. Custo médio quadrático: tem um ponto de mínimo no vértice.",
      formula: "C(x) = ax² + bx + c,  x_min = −b/2a",
      formulaLatex: "C(x) = ax^2 + bx + c, \\quad x_{min} = \\frac{-b}{2a}",
      formulaAria: "C de x igual a a x ao quadrado mais b x mais c; x mínimo igual a menos b sobre dois a",
      formulaLegend: "quando a > 0, o vértice é a quantidade de custo mínimo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Indústria", detail: "quantidade ótima de produção" },
        { label: "Logística", detail: "tamanho de lote que minimiza custo" },
        { label: "Restaurante", detail: "porções por compra de insumo" },
        { label: "Agricultura", detail: "área plantada vs. custo por hectare" },
        { label: "Energia", detail: "ponto de operação mais econômico" },
        { label: "Cálculo", detail: "otimização com derivadas adiante" },
      ],
    },
    exemplo: {
      title: "Custo com ponto mínimo",
      situacao:
        "O custo médio por peça é \\(C(x) = x^2 - 8x + 30\\) (em reais), onde \\(x\\) é a quantidade em centenas. Qual quantidade minimiza o custo, e qual é esse custo?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar a, b, c",
          detail: "\\(a = 1\\), \\(b = -8\\), \\(c = 30\\). Como \\(a > 0\\), há um mínimo.",
        },
        {
          title: "Achar a quantidade do mínimo",
          detail:
            "\\[\\begin{aligned} x_{min} &= \\frac{-b}{2a} = \\frac{-(-8)}{2 \\cdot 1} \\\\ &= \\frac{8}{2} = 4 \\end{aligned}\\]",
        },
        {
          title: "Calcular o custo nesse ponto",
          detail:
            "\\[\\begin{aligned} C(4) &= 16 - 32 + 30 \\\\ &= 14 \\end{aligned}\\]",
        },
        {
          title: "Interpretar",
          detail: "Como \\(a > 0\\), o vértice é o ponto mais baixo: produzir 400 peças (\\(x = 4\\) centenas) dá o menor custo médio, R$ 14 por peça.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Produzir 400 peças minimiza o custo médio em R$ 14 por peça. Produzir menos ou mais que isso encarece cada peça — pouco demais não dilui o fixo, demais sobrecarrega a estrutura.",
        "É o mesmo vértice da função quadrática, agora respondendo a uma pergunta de negócio: existe um ponto ideal, nem pouco nem demais.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer o sinal ao calcular \\(\\frac{-b}{2a}\\) (\\(b = -8\\) dá \\(+8\\) no numerador).",
        "Parar em \\(x_{min}\\) e não calcular o custo \\(C(x_{min})\\).",
        "Achar que produzir sempre mais reduz o custo médio.",
        "Confundir a unidade (aqui \\(x\\) está em centenas).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Custo \\(C(x) = 50 + 4x\\). Quanto custa produzir 20 unidades?",
          identificar: "Função afim: substitua \\(x = 20\\).",
          dica: "\\(50 + 4 \\cdot 20\\).",
          resolucao: "\\(50 + 4 \\cdot 20 = 50 + 80 = 130\\).",
          resposta: "R$ 130,00",
          interpretacao: "Custo fixo de R$ 50 mais R$ 4 por unidade.",
          erroComum: "Esquecer o custo fixo.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Ache a quantidade de custo mínimo de \\(C(x) = x^2 - 10x + 40\\).",
          identificar: "Vértice da parábola.",
          dica: "\\(x_{min} = \\frac{-b}{2a}\\) com \\(b = -10\\).",
          resolucao: "\\(x_{min} = \\frac{10}{2} = 5\\).",
          resposta: "\\(x = 5\\)",
          interpretacao: "Em \\(x = 5\\) o custo é o menor (parábola abre para cima).",
          erroComum: "Usar \\(-10\\) no numerador sem inverter o sinal.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "No item anterior, qual é o custo mínimo?",
          identificar: "Calcule \\(C(5)\\).",
          dica: "\\(5^2 - 10 \\cdot 5 + 40\\).",
          resolucao:
            "\\[\\begin{aligned} C(5) &= 25 - 50 + 40 \\\\ &= 15 \\end{aligned}\\]",
          resposta: "R$ 15,00",
          interpretacao: "O menor custo possível dessa função é R$ 15, em \\(x = 5\\).",
          erroComum: "Reportar o \\(x\\) (5) como se fosse o custo.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique funções de custo e otimização no banco de exercícios.",
      exerciseIds: ["func-ap-17", "func-ap-18"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Custo simples é função afim: fixo + variável × quantidade.",
        "Custo médio pode ser quadrático, com um ponto de mínimo.",
        "O vértice \\(x_{min} = \\frac{-b}{2a}\\) dá a quantidade de custo mínimo.",
        "Sempre calcule o custo no ponto, não pare na quantidade.",
      ],
    },
  },

  "revisao-funcoes-1": {
    meta: preMeta({
      title: "Revisão · Parte 1: conceito e funções básicas",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 11,
      duration: "8 min",
      readingNotes: ["Conceito, domínio, afim, quadrática, modular"],
      glossaryTerms: ["Função", "Domínio", "Afim", "Quadrática"],
      next: { slug: "revisao-funcoes-2", title: "Revisão · Parte 2" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A primeira metade do módulo construiu a ideia de função e apresentou os tipos básicos: afim (reta), quadrática (parábola) e modular (V).",
        "Revisar é enxergar o que liga tudo: toda função é uma máquina de entrada e saída, e cada tipo tem uma assinatura no gráfico.",
        "Fixar isso deixa as funções exponencial e logarítmica — e os gráficos do próximo módulo — muito mais fáceis.",
      ],
    },
    explicacao: {
      title: "As funções básicas, lado a lado",
      paragraphs: [
        "Função: regra que dá uma saída para cada entrada. Domínio: as entradas permitidas (cuidado com divisão por zero e raiz de negativo).",
        "Afim (\\(f = ax + b\\)): reta, cresce de forma constante. Quadrática (\\(f = ax^2 + bx + c\\)): parábola, tem vértice de máximo ou mínimo. Modular (\\(f = |x|\\)): V, mede distância sem sinal.",
      ],
      callout:
        "Reconheça pelo gráfico: reta = afim, parábola = quadrática, V = modular. Cada forma conta a história da função.",
      formula: "afim: ax + b · quadrática: ax² + bx + c · modular: |x|",
      formulaLegend: "as três funções básicas e suas fórmulas",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Gráficos", detail: "identificar o tipo pela forma" },
        { label: "Modelagem", detail: "escolher a função certa para o fenômeno" },
        { label: "Provas", detail: "reconhecer afim, quadrática e modular" },
        { label: "Física", detail: "movimento uniforme vs. acelerado" },
        { label: "Negócios", detail: "custos lineares vs. com ponto ótimo" },
        { label: "Cálculo", detail: "base para limites e derivadas" },
      ],
    },
    exemplo: {
      title: "Identificar e avaliar",
      situacao:
        "Dada \\(f(x) = x^2 - 4x + 3\\), diga o tipo, se tem máximo ou mínimo, e calcule \\(f(0)\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar o tipo",
          detail: "Tem \\(x^2\\): é quadrática, gráfico em parábola.",
        },
        {
          title: "Olhar o sinal de a",
          detail: "\\(a = 1 > 0\\): abre para cima, tem mínimo.",
        },
        {
          title: "Calcular f(0)",
          detail: "\\(f(0) = 0 - 0 + 3 = 3\\) — onde corta o eixo \\(y\\).",
        },
        {
          title: "Conferir o sentido",
          detail: "Quadrática com mínimo e valor 3 na entrada zero. Coerente.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Você classificou a função (quadrática), descreveu o comportamento (mínimo) e avaliou um ponto (\\(f(0) = 3\\)) — exatamente o que se espera ao ler uma função.",
        "Esse trio — tipo, comportamento, valor num ponto — é a leitura básica de qualquer função, e vale para todos os tipos do módulo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir os gráficos: reta, parábola e V são bem diferentes.",
        "Esquecer de checar o domínio antes de avaliar.",
        "Ler \\(f(0)\\) como zero automaticamente.",
        "Trocar máximo por mínimo ignorando o sinal de \\(a\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Que tipo de função tem gráfico em formato de V?",
          identificar: "Associe a forma ao tipo.",
          dica: "Distância sem sinal.",
          resolucao: "É a função modular, \\(f(x) = |x|\\).",
          resposta: "Modular",
          interpretacao: "O bico do V está onde o conteúdo do módulo zera.",
          erroComum: "Confundir com a parábola.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Para \\(f(x) = 2x - 1\\), quanto é \\(f(5)\\)?",
          identificar: "Função afim: substitua \\(x = 5\\).",
          dica: "\\(2 \\cdot 5 - 1\\).",
          resolucao: "\\(f(5) = 2 \\cdot 5 - 1 = 9\\).",
          resposta: "\\(9\\)",
          interpretacao: "Saída 9 para entrada 5, numa reta crescente.",
          erroComum: "Calcular \\(2 \\cdot (5 - 1)\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Qual o domínio de \\(f(x) = \\frac{1}{x + 1}\\)?",
          identificar: "Denominador não pode zerar.",
          dica: "\\(x + 1 = 0\\) quando \\(x = -1\\).",
          resolucao: "Exclua \\(x = -1\\): domínio é \\(x \\neq -1\\).",
          resposta: "\\(x \\neq -1\\)",
          interpretacao: "Só esse valor quebra a função.",
          erroComum: "Excluir \\(x = 1\\) em vez de \\(x = -1\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise conceito, domínio e funções básicas no banco de exercícios.",
      exerciseIds: ["func-ap-19", "func-ap-20"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Função: cada entrada gera uma saída; cheque o domínio.",
        "Afim = reta; quadrática = parábola; modular = V.",
        "O sinal de \\(a\\) na quadrática decide máximo ou mínimo.",
        "Leitura básica: tipo, comportamento e valor num ponto.",
      ],
    },
  },

  "revisao-funcoes-2": {
    meta: preMeta({
      title: "Revisão · Parte 2: exponencial, log e aplicações",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 12,
      duration: "8 min",
      readingNotes: ["Exponencial, log e os três casos aplicados"],
      glossaryTerms: ["Exponencial", "Logaritmo", "Função afim"],
      next: {
        slug: "plano-cartesiano",
        title: "Plano cartesiano",
        moduleSlug: "graficos",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A segunda metade trouxe a exponencial (multiplicar, não somar), o logaritmo (sua inversa) e três aplicações que amarram tudo: corrida, juros e custo.",
        "Revisar aqui é perceber que cada função existe para descrever um tipo de mudança: constante (afim), com pico (quadrática), acelerada (exponencial).",
        "É o fechamento do módulo de Funções e a ponte para estudar gráficos com mais profundidade.",
      ],
    },
    explicacao: {
      title: "Exponencial, log e aplicações",
      paragraphs: [
        "Exponencial (\\(f = a \\cdot b^x\\)): multiplica pela base a cada passo; \\(b > 1\\) cresce, \\(0 < b < 1\\) decai. Logaritmo: a inversa, responde \"qual expoente\".",
        "Aplicações: a corrida é função afim; os juros compostos são exponencial; o custo pode ser afim ou quadrático. Cada problema real escolhe a função que descreve sua mudança.",
      ],
      callout:
        "Mudança constante → afim. Mudança com pico → quadrática. Mudança que acelera → exponencial. O log desfaz a exponencial.",
      formula: "exp: a·bˣ · juros: C·(1+i)ᵗ · log: log_b(N)",
      formulaLegend: "as ferramentas da segunda metade do módulo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Finanças", detail: "juros e crescimento de patrimônio" },
        { label: "Ciência", detail: "população, decaimento, pH" },
        { label: "Transporte", detail: "tarifas e custos lineares" },
        { label: "Negócios", detail: "custo ótimo de produção" },
        { label: "Tecnologia", detail: "escalas logarítmicas de desempenho" },
        { label: "Cálculo", detail: "exp e log aparecem o tempo todo" },
      ],
    },
    exemplo: {
      title: "Escolher a função certa",
      situacao:
        "Um valor de R$ 200 cresce 5% ao ano. Quanto será após 2 anos? Qual tipo de função descreve isso?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer o tipo",
          detail: "Crescer uma porcentagem a cada ano é multiplicar: exponencial.",
        },
        {
          title: "Montar e desenvolver a fórmula de juros",
          detail:
            "\\[\\begin{aligned} M &= 200 \\cdot (1 + 0{,}05)^2 \\\\ &= 200 \\cdot (1{,}05)^2 \\\\ &= 200 \\cdot 1{,}1025 \\\\ &= 220{,}50 \\end{aligned}\\]",
        },
        {
          title: "Interpretar",
          detail: "Após 2 anos, R$ 220,50 — crescimento exponencial de 5% ao ano.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 220,50 é o valor após 2 anos. O passo decisivo foi reconhecer que \"crescer X% ao ano\" é exponencial, não afim — escolher a função certa é metade do problema.",
        "Se fosse um valor fixo somado por ano (afim), a conta seria outra. Saber distinguir os tipos de mudança é o grande ganho do módulo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Modelar crescimento percentual como afim (somando fixo).",
        "Usar a taxa em porcentagem em vez de decimal nos juros.",
        "Confundir log com exponencial (são inversas, não iguais).",
        "Escolher a função sem analisar o tipo de mudança.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(f(x) = 2 \\cdot 3^x\\), quanto é \\(f(2)\\)?",
          identificar: "Potência antes da multiplicação.",
          dica: "\\(3^2 = 9\\).",
          resolucao: "\\(f(2) = 2 \\cdot 9 = 18\\).",
          resposta: "\\(18\\)",
          interpretacao: "Crescimento exponencial a partir de 2.",
          erroComum: "Calcular \\(2 \\cdot 3 \\cdot 2\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quanto é \\(\\log_2(16)\\)?",
          identificar: "2 elevado a quê dá 16?",
          dica: "Potências de 2.",
          resolucao: "\\(2^4 = 16\\), então \\(\\log_2(16) = 4\\).",
          resposta: "\\(4\\)",
          interpretacao: "São 4 duplicações para chegar a 16.",
          erroComum: "Responder 8 (metade) ou 2 (base).",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Um salário fixo de R$ 2000 + R$ 50 por venda é qual tipo de função?",
          identificar: "Soma um valor fixo por unidade.",
          dica: "Fixo + variável constante.",
          resolucao: "É função afim: \\(f(x) = 50x + 2000\\).",
          resposta: "Afim",
          interpretacao: "Mudança constante por venda — reta, não exponencial.",
          erroComum: "Classificar como exponencial por ter crescimento.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise exponencial, log e aplicações no banco de exercícios.",
      exerciseIds: ["func-ap-21", "func-ap-22"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Exponencial multiplica pela base; log é sua inversa.",
        "Mudança constante = afim; acelerada = exponencial.",
        "Juros compostos: \\(M = C \\cdot (1 + i)^t\\).",
        "Escolher a função certa começa por analisar o tipo de mudança.",
      ],
    },
  },
};
