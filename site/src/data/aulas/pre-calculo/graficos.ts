import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "graficos";
const MOD_TITLE = "Gráficos";

export const graficosAulas: Record<string, AulaContent> = {
  "plano-cartesiano": {
    meta: preMeta({
      title: "Plano cartesiano: o mapa dos números",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "10 min",
      readingNotes: ["Eixos x e y", "Ler coordenadas (x, y)"],
      glossaryTerms: ["Plano cartesiano", "Coordenada", "Eixo", "Origem"],
      next: { slug: "leitura-graficos", title: "Leitura de gráficos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "O plano cartesiano é um mapa onde cada ponto tem um endereço de dois números. É a mesma ideia de \"rua e número\" ou das coordenadas de um GPS.",
        "Ele transforma números em desenho: é o que permite ver uma função como uma curva e enxergar tendências que a fórmula esconde.",
        "Dominar a leitura de coordenadas é o passo zero para entender qualquer gráfico — de uma prova ao painel do seu app de banco.",
      ],
    },
    explicacao: {
      title: "Dois eixos, um endereço",
      paragraphs: [
        "São duas retas perpendiculares: o eixo x (horizontal) e o eixo y (vertical). Onde elas se cruzam é a origem, o ponto (0, 0).",
        "Cada ponto é um par ordenado (x, y): primeiro quanto anda na horizontal, depois na vertical. A ordem importa — (3, 1) é diferente de (1, 3).",
      ],
      callout:
        "Par ordenado (x, y): primeiro o horizontal, depois o vertical. Sempre nessa ordem.",
      formula: "P = (x, y)",
      formulaLatex: "P = (x,\\ y)",
      formulaAria: "P igual a abre parêntese x vírgula y fecha parêntese",
      formulaLegend: "x = posição horizontal · y = posição vertical",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "GPS", detail: "latitude e longitude são coordenadas" },
        { label: "Gráficos", detail: "todo gráfico vive no plano" },
        { label: "Jogos", detail: "posição de personagens na tela" },
        { label: "Design", detail: "coordenadas de pixels" },
        { label: "Mapas", detail: "endereço por linha e coluna" },
        { label: "Cálculo", detail: "visualizar funções e suas curvas" },
      ],
    },
    exemplo: {
      title: "Localizar um ponto",
      situacao:
        "Onde fica o ponto \\((3, 2)\\) no plano? E como ele difere do ponto \\((2, 3)\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Ler a primeira coordenada (x)",
          detail: "Para \\((3, 2)\\), \\(x = 3\\): ande 3 para a direita a partir da origem.",
        },
        {
          title: "Ler a segunda coordenada (y)",
          detail: "\\(y = 2\\): suba 2 a partir dali — o cruzamento é o ponto \\((3, 2)\\).",
        },
        {
          title: "Comparar com (2, 3)",
          detail: "\\((2, 3)\\) anda 2 para a direita e sobe 3 — um lugar diferente.",
        },
        {
          title: "Concluir",
          detail: "A ordem dos números muda o endereço: por isso é par ORDENADO.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\((3, 2)\\) e \\((2, 3)\\) são pontos distintos, porque o primeiro número sempre é o horizontal e o segundo o vertical. Trocar a ordem move o ponto.",
        "Esse endereço de dois números é o que liga a álgebra ao desenho: cada par \\((x, f(x))\\) de uma função vira um ponto, e juntos formam a curva.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar a ordem: \\((x, y)\\) não é \\((y, x)\\).",
        "Confundir o eixo \\(x\\) (horizontal) com o \\(y\\) (vertical).",
        "Esquecer o sinal: à esquerda e abaixo da origem os valores são negativos.",
        "Contar a partir do lugar errado em vez da origem.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "No ponto \\((5, -2)\\), qual é a coordenada vertical?",
          identificar: "A segunda coordenada é o \\(y\\).",
          dica: "Ordem: \\((x, y)\\).",
          resolucao: "O \\(y\\) é \\(-2\\).",
          resposta: "\\(-2\\)",
          interpretacao: "O ponto está 2 abaixo da origem na vertical.",
          erroComum: "Responder 5, que é o \\(x\\).",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Um ponto está sobre o eixo \\(x\\). O que sabemos do seu \\(y\\)?",
          identificar: "O eixo \\(x\\) está na altura zero.",
          dica: "Quem está no eixo horizontal não subiu nem desceu.",
          resolucao: "O \\(y\\) é 0; o ponto é \\((x, 0)\\).",
          resposta: "\\(y = 0\\)",
          interpretacao: "Estar no eixo \\(x\\) significa altura zero.",
          erroComum: "Achar que \\(x\\) também é zero.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Em qual região fica \\((-3, -4)\\)?",
          identificar: "Veja os sinais das duas coordenadas.",
          dica: "\\(x\\) negativo (esquerda) e \\(y\\) negativo (abaixo).",
          resolucao: "Esquerda e abaixo da origem (terceiro quadrante).",
          resposta: "Terceiro quadrante",
          interpretacao: "Ambos negativos colocam o ponto no canto inferior esquerdo.",
          erroComum: "Ignorar os sinais e colocar no quadrante errado.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique leitura e marcação de coordenadas no banco de exercícios.",
      exerciseIds: ["graf-ap-01", "graf-ap-02"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Plano cartesiano: eixo \\(x\\) horizontal, eixo \\(y\\) vertical, cruzando na origem.",
        "Cada ponto é um par ordenado \\((x, y)\\).",
        "A ordem importa: \\((3, 2) \\neq (2, 3)\\).",
        "Sinais indicam o lado: esquerda/abaixo são negativos.",
      ],
    },
  },

  "leitura-graficos": {
    meta: preMeta({
      title: "Leitura de gráficos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "11 min",
      readingNotes: ["Do eixo x ao y", "Encontrar valores na curva"],
      glossaryTerms: ["Gráfico", "Eixo", "Curva", "Valor"],
      next: { slug: "crescimento-decrescimento", title: "Crescimento e decrescimento" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Saber ler um gráfico é uma das habilidades mais práticas que existem. Notícias, painéis de saúde, finanças, ciência — tudo vem em gráfico hoje em dia.",
        "Um gráfico conta uma história visual: o que entra (eixo x) e o que acontece (eixo y). Ler bem é extrair informação sem precisar da fórmula.",
        "É também o que torna funções intuitivas: em vez de uma tabela enorme, você olha a curva e entende de relance.",
      ],
    },
    explicacao: {
      title: "Subir do eixo x até a curva",
      paragraphs: [
        "Para achar o valor da função em um x: localize o x no eixo horizontal, suba até tocar a curva e leia a altura (y) no eixo vertical.",
        "Para o caminho inverso — saber em que x a função vale tal y: parta da altura no eixo y, ande na horizontal até a curva e desça até o eixo x.",
      ],
      callout:
        "Do x para o y: suba do eixo x até a curva e leia a altura. Do y para o x: faça o caminho contrário.",
      formula: "x no eixo → sobe até a curva → lê y",
      formulaLegend: "o procedimento básico de leitura de um gráfico",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Notícias", detail: "gráficos de economia e saúde" },
        { label: "Apps", detail: "painéis de passos, gastos, sono" },
        { label: "Medicina", detail: "curvas de crescimento infantil" },
        { label: "Clima", detail: "temperatura ao longo do dia" },
        { label: "Finanças", detail: "cotação de ações" },
        { label: "Cálculo", detail: "ler comportamento antes de calcular" },
      ],
    },
    exemplo: {
      title: "Temperatura ao longo do dia",
      situacao:
        "Um gráfico mostra a temperatura (\\(y\\), em °C) por hora do dia (\\(x\\)). Às 6h o ponto está em \\((6, 18)\\) e às 14h em \\((14, 30)\\). Como ler esses valores?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar o que cada eixo mede",
          detail: "Eixo \\(x\\): hora do dia. Eixo \\(y\\): temperatura em °C.",
        },
        {
          title: "Ler o ponto das 6h",
          detail: "Suba de \\(x = 6\\) até a curva: altura 18 → 18 °C às 6h.",
        },
        {
          title: "Ler o ponto das 14h",
          detail: "Suba de \\(x = 14\\): altura 30 → 30 °C às 14h.",
        },
        {
          title: "Comparar e interpretar",
          detail: "A temperatura subiu 12 °C entre 6h e 14h: a manhã esquenta até a tarde.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Cada ponto liga uma hora a uma temperatura. Ler o gráfico é traduzir a posição na curva em informação: \"às 14h fazia 30 graus\".",
        "O poder do gráfico é mostrar a tendência inteira de uma vez. Você não precisa de todos os números — a forma da curva já conta que esquentou ao longo do dia.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar os eixos: confirmar o que é x e o que é y.",
        "Ler a escala errada (de 2 em 2, de 10 em 10).",
        "Ler o valor sem subir exatamente até a curva.",
        "Ignorar as unidades de cada eixo.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Num gráfico de \\((5, 12)\\), qual o valor da função em \\(x = 5\\)?",
          identificar: "A altura (\\(y\\)) na curva é a resposta.",
          dica: "Suba de \\(x = 5\\) até a curva.",
          resolucao: "\\(y = 12\\).",
          resposta: "\\(12\\)",
          interpretacao: "Em \\(x = 5\\) a função vale 12.",
          erroComum: "Responder 5, que é a entrada.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "A curva passa por \\((0, 4)\\). O que isso diz?",
          identificar: "\\(x = 0\\) é onde a curva cruza o eixo \\(y\\).",
          dica: "Valor inicial da função.",
          resolucao: "Em \\(x = 0\\) a função vale 4 (corta o eixo \\(y\\) em 4).",
          resposta: "Vale 4 em \\(x = 0\\)",
          interpretacao: "É o ponto de partida, o valor inicial.",
          erroComum: "Achar que o ponto está sobre o eixo \\(x\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Num gráfico de saldo bancário por dia, o ponto \\((10, -50)\\) aparece. O que significa?",
          identificar: "\\(y\\) negativo indica saldo abaixo de zero.",
          dica: "Eixo \\(x\\) = dia, eixo \\(y\\) = saldo.",
          resolucao: "No dia 10, o saldo era −R$ 50 (negativo).",
          resposta: "Saldo de −R$ 50 no dia 10",
          interpretacao: "O sinal negativo no eixo y mostra que a conta estava no vermelho.",
          erroComum: "Ignorar o sinal e ler R$ 50 positivos.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique leitura de valores em gráficos no banco de exercícios.",
      exerciseIds: ["graf-ap-03", "graf-ap-04"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Eixo x é a entrada; eixo y é o que acontece.",
        "Do x ao y: suba até a curva e leia a altura.",
        "Confira sempre escala e unidades dos eixos.",
        "O gráfico mostra a tendência inteira de uma vez.",
      ],
    },
  },

  "crescimento-decrescimento": {
    meta: preMeta({
      title: "Crescimento e decrescimento",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "12 min",
      readingNotes: ["Subir, descer ou estável", "Ler o sentido da curva"],
      glossaryTerms: ["Crescente", "Decrescente", "Constante"],
      next: { slug: "interpretacao-visual", title: "Interpretação visual" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A pergunta mais comum sobre um gráfico é: \"está subindo ou descendo?\". Vendas crescendo, febre baixando, saldo estável — tudo é leitura de crescimento ou decrescimento.",
        "Saber em quais trechos a curva sobe, desce ou fica parada é o primeiro nível de análise de qualquer gráfico.",
        "É também a semente da ideia de derivada no Cálculo: a derivada vai medir, com precisão, esse \"está subindo ou descendo\".",
      ],
    },
    explicacao: {
      title: "Para onde a curva vai",
      paragraphs: [
        "Lendo sempre da esquerda para a direita: a função é crescente quando a curva sobe (y aumenta conforme x aumenta), decrescente quando desce, e constante quando fica na horizontal.",
        "Uma mesma função pode ter trechos diferentes: subir até um pico, depois descer. Os pontos onde ela vira (de subir para descer) costumam ser os mais importantes.",
      ],
      callout:
        "Leia da esquerda para a direita: sobe = crescente, desce = decrescente, reta horizontal = constante.",
      formula: "x₁ < x₂ e f(x₁) < f(x₂) ⟹ crescente",
      formulaLatex: "x_1 < x_2 \\text{ e } f(x_1) < f(x_2) \\Rightarrow \\text{crescente}",
      formulaAria: "se x um menor que x dois e f de x um menor que f de x dois, então crescente",
      formulaLegend: "definição de função crescente num intervalo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Vendas", detail: "meses de alta e de baixa" },
        { label: "Saúde", detail: "febre subindo ou cedendo" },
        { label: "Economia", detail: "inflação acelerando ou desacelerando" },
        { label: "Esportes", detail: "desempenho ao longo da temporada" },
        { label: "Clima", detail: "temperatura subindo até a tarde" },
        { label: "Cálculo", detail: "base da ideia de derivada" },
      ],
    },
    exemplo: {
      title: "As vendas do ano",
      situacao:
        "Um gráfico de vendas sobe de janeiro a junho, fica estável de junho a agosto e cai de agosto a dezembro. Descreva os trechos.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Ler da esquerda para a direita",
          detail: "Comece em janeiro e acompanhe a curva até dezembro.",
        },
        {
          title: "Identificar o trecho de subida",
          detail: "Jan–jun: a curva sobe → crescente (vendas aumentando).",
        },
        {
          title: "Identificar o trecho estável",
          detail: "Jun–ago: curva horizontal → constante (vendas paradas).",
        },
        {
          title: "Identificar o trecho de queda",
          detail: "Ago–dez: curva desce → decrescente (vendas caindo).",
        },
        {
          title: "Resumir a história",
          detail: "Cresceu no 1º semestre, estabilizou no meio do ano e caiu no fim.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Dividir a curva em \"sobe, fica, desce\" já conta a história do ano sem nenhum número exato. É a leitura qualitativa, a primeira que um analista faz.",
        "Os pontos de virada (junho e agosto) merecem atenção: é onde algo mudou — talvez uma promoção que acabou, ou a chegada de uma baixa temporada.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Ler o gráfico da direita para a esquerda (sempre é da esquerda para a direita).",
        "Confundir um valor alto com \"crescente\" (altura não é o mesmo que subir).",
        "Não perceber trechos diferentes na mesma curva.",
        "Chamar de constante uma curva que sobe devagar.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "A reta de \\(f(x) = 2x + 1\\) é crescente ou decrescente?",
          identificar: "Olhe o sinal do coeficiente de \\(x\\).",
          dica: "Coeficiente positivo sobe.",
          resolucao: "Como o coeficiente (2) é positivo, a reta sobe: crescente.",
          resposta: "Crescente",
          interpretacao: "A cada \\(x\\) a mais, \\(y\\) aumenta 2.",
          erroComum: "Olhar o \\(+1\\) em vez do coeficiente de \\(x\\).",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Uma curva sobe até \\(x = 3\\) e depois desce. O que ocorre em \\(x = 3\\)?",
          identificar: "É o ponto de virada.",
          dica: "Onde para de subir e começa a descer.",
          resolucao: "Em \\(x = 3\\) está o ponto de máximo (pico).",
          resposta: "Ponto de máximo",
          interpretacao: "É o valor mais alto antes da queda.",
          erroComum: "Chamar de mínimo.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "O saldo de uma conta é constante por uma semana. O que isso indica?",
          identificar: "Curva horizontal = sem variação.",
          dica: "Nem entra nem sai dinheiro.",
          resolucao: "Não houve movimentação: nenhuma entrada nem saída.",
          resposta: "Sem movimentação",
          interpretacao: "Constante significa que o valor não mudou no período.",
          erroComum: "Achar que constante significa saldo zero.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique identificação de crescimento e decrescimento no banco de exercícios.",
      exerciseIds: ["graf-ap-05", "graf-ap-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Leia sempre da esquerda para a direita.",
        "Sobe = crescente, desce = decrescente, horizontal = constante.",
        "Uma curva pode ter vários trechos diferentes.",
        "Pontos de virada (máximo/mínimo) são os mais importantes.",
      ],
    },
  },

  "interpretacao-visual": {
    meta: preMeta({
      title: "Interpretação visual de gráficos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "10 min",
      readingNotes: ["Picos, vales e cruzamentos", "A história por trás da curva"],
      glossaryTerms: ["Máximo", "Mínimo", "Interseção", "Tendência"],
      next: { slug: "translacao-graficos", title: "Translação de gráficos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Ler valores e sentido é o começo; interpretar é contar a história completa: onde estão os picos, os fundos, quando duas curvas se cruzam e o que isso significa.",
        "É essa leitura que aparece em decisões reais: quando o lucro foi máximo, quando dois planos custam igual, em que ponto a tendência mudou.",
        "Interpretar gráfico é transformar desenho em conclusão — uma das habilidades mais valorizadas em qualquer área.",
      ],
    },
    explicacao: {
      title: "Os pontos que contam a história",
      paragraphs: [
        "Máximo é o ponto mais alto (um pico); mínimo é o mais baixo (um vale). Eles respondem \"qual o melhor/pior momento\".",
        "Interseção é onde duas curvas se cruzam: ali elas têm o mesmo valor. E onde a curva cruza o eixo x estão as raízes (valor zero). Cada um desses pontos tem um significado prático.",
      ],
      callout:
        "Picos = máximos, vales = mínimos, cruzamentos = valores iguais. Onde corta o eixo x, o valor é zero.",
      formula: "interseção: f(x) = g(x)",
      formulaLatex: "f(x) = g(x)",
      formulaAria: "f de x igual a g de x",
      formulaLegend: "no cruzamento, as duas funções têm o mesmo valor",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Negócios", detail: "mês de lucro máximo" },
        { label: "Planos", detail: "ponto onde dois custos se igualam" },
        { label: "Saúde", detail: "pico de uma epidemia" },
        { label: "Esportes", detail: "melhor e pior desempenho" },
        { label: "Engenharia", detail: "ponto de tensão máxima" },
        { label: "Cálculo", detail: "máximos e mínimos com derivada" },
      ],
    },
    exemplo: {
      title: "Dois planos no mesmo gráfico",
      situacao:
        "Dois planos de celular aparecem como retas no mesmo gráfico de custo (\\(y\\)) por GB (\\(x\\)). Elas se cruzam em \\((20, 70)\\). O que esse cruzamento conta?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar o que é cada eixo",
          detail: "\\(x\\) = GB usados; \\(y\\) = custo em reais.",
        },
        {
          title: "Localizar o cruzamento",
          detail: "As retas se encontram em \\((20, 70)\\).",
        },
        {
          title: "Interpretar o ponto de encontro",
          detail: "Em 20 GB os dois planos custam o mesmo: R$ 70.",
        },
        {
          title: "Ler antes e depois do cruzamento",
          detail: "Antes de 20 GB, a reta mais baixa é a mais barata; depois, troca.",
        },
        {
          title: "Concluir",
          detail: "O cruzamento é o ponto de decisão entre os dois planos.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O cruzamento em (20, 70) é o ponto de equilíbrio: abaixo de 20 GB um plano vence, acima o outro. O gráfico mostra a decisão de relance.",
        "Esse é o poder de pôr duas curvas juntas: o ponto de encontro vira uma recomendação prática, sem precisar resolver a equação no papel.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir máximo (pico) com o fim do gráfico.",
        "Ignorar o que acontece antes e depois de um cruzamento.",
        "Trocar raiz (corta o eixo x) com interseção entre curvas.",
        "Tirar conclusão sem olhar as unidades dos eixos.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Uma curva de lucro tem pico em (8, 5000). O que isso indica?",
          identificar: "Pico = máximo.",
          dica: "x = mês, y = lucro.",
          resolucao: "O lucro máximo foi R$ 5000, no mês 8.",
          resposta: "Lucro máximo de R$ 5000 no mês 8",
          interpretacao: "É o melhor momento do período.",
          erroComum: "Ler 8 como o lucro.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Onde uma curva corta o eixo x, qual é o valor da função?",
          identificar: "O eixo x está na altura zero.",
          dica: "y vale 0 ali.",
          resolucao: "A função vale 0 (são as raízes).",
          resposta: "Zero",
          interpretacao: "Cortar o eixo x significa resultado zero naquele x.",
          erroComum: "Achar que o x é que vale zero.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Duas curvas de temperatura se cruzam às 15h. O que houve?",
          identificar: "Cruzamento = mesmo valor.",
          dica: "As duas medições coincidem ali.",
          resolucao: "Às 15h as duas tinham a mesma temperatura.",
          resposta: "Temperaturas iguais às 15h",
          interpretacao: "Antes e depois uma estava acima da outra; ali se igualaram.",
          erroComum: "Achar que o cruzamento é o ponto mais quente.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique interpretação de picos, vales e cruzamentos no banco de exercícios.",
      exerciseIds: ["graf-ap-07", "graf-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Máximo = pico; mínimo = vale.",
        "Interseção entre curvas = mesmo valor naquele ponto.",
        "Cortar o eixo x = valor zero (raiz).",
        "Interpretar é transformar a curva em conclusão prática.",
      ],
    },
  },

  "translacao-graficos": {
    meta: preMeta({
      title: "Translação de gráficos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "11 min",
      readingNotes: ["Mover para cima/baixo", "Mover para os lados"],
      glossaryTerms: ["Translação", "Deslocamento", "Gráfico base"],
      next: { slug: "vendas-precos", title: "Vendas e preços" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Você não precisa redesenhar tudo quando uma função muda um pouco. Se você conhece o gráfico de uma função, pequenas mudanças na fórmula só o deslocam — para cima, para baixo ou para os lados.",
        "Entender isso economiza um trabalho enorme: reconhecer o gráfico-base e ver para onde ele foi movido.",
        "É a primeira ideia de \"transformar\" funções, que volta o tempo todo em modelagem e no Cálculo.",
      ],
    },
    explicacao: {
      title: "Somar fora ou dentro",
      paragraphs: [
        "Somar um número FORA da função, f(x) + k, move o gráfico na vertical: +k sobe, −k desce. É intuitivo: você está somando à altura.",
        "Somar DENTRO, f(x + k), move na horizontal — e ao contrário do que parece: f(x + k) desloca para a esquerda, f(x − k) para a direita.",
      ],
      callout:
        "Fora move na vertical (no sentido esperado). Dentro move na horizontal (no sentido contrário ao sinal).",
      formula: "f(x) + k: vertical · f(x − k): horizontal",
      formulaLatex: "f(x) + k \\;(\\text{vertical}), \\quad f(x - k) \\;(\\text{horizontal})",
      formulaAria: "f de x mais k desloca na vertical; f de x menos k desloca na horizontal",
      formulaLegend: "k fora sobe/desce; k dentro move para os lados",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Física", detail: "trajetória que começa mais alto" },
        { label: "Finanças", detail: "mesma curva com base inicial maior" },
        { label: "Áudio/sinais", detail: "deslocar uma onda no tempo" },
        { label: "Animação", detail: "mover objetos pela tela" },
        { label: "Estatística", detail: "deslocar uma distribuição" },
        { label: "Cálculo", detail: "reconhecer funções transformadas" },
      ],
    },
    exemplo: {
      title: "Subir uma parábola",
      situacao:
        "Você conhece o gráfico de \\(f(x) = x^2\\) (parábola com vértice na origem). O que acontece com o gráfico de \\(g(x) = x^2 + 3\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer o gráfico-base",
          detail: "\\(f(x) = x^2\\) é a parábola com vértice em \\((0, 0)\\).",
        },
        {
          title: "Identificar a mudança",
          detail: "\\(g\\) soma 3 FORA da função: \\(x^2 + 3\\).",
        },
        {
          title: "Decidir o tipo de deslocamento",
          detail: "Somar fora move na vertical; \\(+3\\) sobe.",
        },
        {
          title: "Mover o vértice e concluir",
          detail: "O vértice vai de \\((0, 0)\\) para \\((0, 3)\\): \\(g\\) é a mesma parábola, 3 unidades mais alta.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(g(x) = x^2 + 3\\) é exatamente o gráfico de \\(x^2\\) levantado em 3. Você não precisou recalcular pontos — só reconhecer o deslocamento.",
        "Essa leitura rápida (gráfico-base + deslocamento) vale para qualquer função: reta, parábola, V, exponencial. Identificar a base e o movimento resolve metade dos exercícios de gráfico.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Inverter o sentido horizontal: \\(f(x - 2)\\) vai para a DIREITA.",
        "Confundir mudança dentro (horizontal) com fora (vertical).",
        "Achar que \\(+k\\) sempre move para a direita.",
        "Esquecer de mover o ponto-chave (vértice, bico, interceptos).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Como fica o gráfico de \\(f(x) = x^2 - 5\\) em relação a \\(x^2\\)?",
          identificar: "Mudança fora da função.",
          dica: "\\(-5\\) fora move na vertical.",
          resolucao: "Desce 5 unidades: vértice em \\((0, -5)\\).",
          resposta: "Desce 5 unidades",
          interpretacao: "Mesma parábola, 5 mais baixa.",
          erroComum: "Mover para o lado em vez de para baixo.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Para onde se move o gráfico de \\(f(x - 4)\\) em relação a \\(f(x)\\)?",
          identificar: "Mudança dentro da função.",
          dica: "Dentro move ao contrário do sinal.",
          resolucao: "Move 4 para a direita.",
          resposta: "4 para a direita",
          interpretacao: "Apesar do \\(-4\\), o deslocamento é para a direita.",
          erroComum: "Mover 4 para a esquerda.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "O gráfico de \\(|x| + 2\\) fica onde em relação a \\(|x|\\)?",
          identificar: "Soma fora da função.",
          dica: "\\(+2\\) fora sobe.",
          resolucao: "Sobe 2: o bico do V vai de \\((0,0)\\) para \\((0,2)\\).",
          resposta: "Sobe 2 unidades",
          interpretacao: "O V inteiro sobe 2.",
          erroComum: "Mover o V para a esquerda.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique translações verticais e horizontais no banco de exercícios.",
      exerciseIds: ["graf-ap-09", "graf-ap-10"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Somar fora, \\(f(x) + k\\): move na vertical (\\(+k\\) sobe, \\(-k\\) desce).",
        "Somar dentro, \\(f(x \\pm k)\\): move na horizontal, sentido contrário ao sinal.",
        "Reconheça o gráfico-base e só aplique o deslocamento.",
        "Mova sempre o ponto-chave (vértice, bico, interceptos).",
      ],
    },
  },

  "vendas-precos": {
    meta: preMeta({
      title: "Aplicação: vendas e preços",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "9 min",
      readingNotes: ["Ler gráfico de receita", "Preço que maximiza vendas"],
      glossaryTerms: ["Receita", "Demanda", "Máximo"],
      next: { slug: "temperatura-consumo", title: "Temperatura e consumo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Preço alto demais afasta clientes; preço baixo demais não paga as contas. Em algum ponto no meio está o preço que traz a maior receita.",
        "Gráficos de vendas e receita mostram esse ponto ótimo de forma visual — muitas vezes um pico de parábola.",
        "É a aplicação direta de ler picos e tendências num gráfico para tomar uma decisão de negócio.",
      ],
    },
    explicacao: {
      title: "Receita como curva",
      paragraphs: [
        "Receita = preço × quantidade vendida. Como subir o preço costuma reduzir a quantidade vendida, a receita sobe, atinge um máximo e depois cai — uma parábola.",
        "No gráfico de receita por preço, o pico aponta o preço ideal. Ler esse ponto é responder \"quanto cobrar para ganhar mais?\".",
      ],
      callout:
        "Receita = preço × quantidade. O pico do gráfico de receita mostra o preço que maximiza o ganho.",
      formula: "R(p) = p · q(p)",
      formulaLatex: "R(p) = p \\cdot q(p)",
      formulaAria: "R de p igual a p vezes q de p",
      formulaLegend: "receita = preço vezes a quantidade vendida àquele preço",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Comércio", detail: "definir preço de venda" },
        { label: "Ingressos", detail: "preço que enche e lucra" },
        { label: "SaaS", detail: "valor da assinatura" },
        { label: "Promoções", detail: "desconto que aumenta a receita" },
        { label: "Cardápio", detail: "preço de um prato popular" },
        { label: "Cálculo", detail: "otimização de receita com derivada" },
      ],
    },
    exemplo: {
      title: "O preço de um ingresso",
      situacao:
        "A receita de um show é \\(R(p) = -2p^2 + 200p\\) (\\(p\\) é o preço do ingresso). O gráfico é uma parábola para baixo. Qual preço dá a maior receita?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer a parábola",
          detail: "\\(a = -2 < 0\\): abre para baixo, tem máximo (o pico é o melhor preço).",
        },
        {
          title: "Achar o preço do vértice",
          detail:
            "\\[\\begin{aligned} p_v &= \\frac{-b}{2a} = \\frac{-200}{2 \\cdot (-2)} \\\\ &= \\frac{-200}{-4} = 50 \\end{aligned}\\]",
        },
        {
          title: "Calcular a receita máxima",
          detail:
            "\\[\\begin{aligned} R(50) &= -2 \\cdot 2500 + 200 \\cdot 50 \\\\ &= -5000 + 10000 \\\\ &= 5000 \\end{aligned}\\]",
        },
        {
          title: "Interpretar o pico",
          detail: "O melhor preço é R$ 50, gerando R$ 5000 de receita. Preço maior ou menor rende menos.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Cobrar R$ 50 maximiza a receita em R$ 5000. Subir o preço afastaria público; baixá-lo deixaria dinheiro na mesa. O pico equilibra os dois efeitos.",
        "É exatamente a leitura de máximo de um gráfico aplicada a dinheiro: o vértice da parábola de receita é a recomendação de preço.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que preço sempre maior gera receita maior.",
        "Parar no preço (\\(p_v\\)) sem calcular a receita máxima.",
        "Errar o sinal em \\(\\frac{-b}{2a}\\).",
        "Confundir receita (preço × quantidade) com lucro (receita − custo).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(R(p) = -p^2 + 40p\\), qual preço dá a receita máxima?",
          identificar: "Vértice da parábola.",
          dica: "\\(p_v = \\frac{-b}{2a}\\) com \\(a = -1\\), \\(b = 40\\).",
          resolucao:
            "\\[\\begin{aligned} p_v &= \\frac{-40}{2 \\cdot (-1)} \\\\ &= 20 \\end{aligned}\\]",
          resposta: "\\(p = 20\\)",
          interpretacao: "O preço ótimo é R$ 20.",
          erroComum: "Esquecer que \\(a\\) é negativo no denominador.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "No item anterior, qual é a receita máxima?",
          identificar: "Calcule \\(R(20)\\).",
          dica: "\\(-20^2 + 40 \\cdot 20\\).",
          resolucao:
            "\\[\\begin{aligned} R(20) &= -400 + 800 \\\\ &= 400 \\end{aligned}\\]",
          resposta: "R$ 400,00",
          interpretacao: "É o pico da curva de receita.",
          erroComum: "Reportar 20 como a receita.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Por que existe um preço ótimo, e não 'quanto mais caro melhor'?",
          identificar: "Pense no efeito do preço na quantidade.",
          dica: "Preço alto vende menos.",
          resolucao: "Subir o preço reduz a quantidade vendida; em algum ponto a perda de clientes supera o ganho por unidade, e a receita cai.",
          resposta: "Porque preço alto reduz as vendas",
          interpretacao: "O equilíbrio entre preço e quantidade cria o pico.",
          erroComum: "Ignorar que a quantidade vendida cai com o preço.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique gráficos de receita e preço ótimo no banco de exercícios.",
      exerciseIds: ["graf-ap-11", "graf-ap-12"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Receita = preço × quantidade vendida.",
        "Costuma ser parábola: sobe, atinge o pico e cai.",
        "O vértice indica o preço que maximiza a receita.",
        "Receita não é lucro (falta descontar o custo).",
      ],
    },
  },

  "temperatura-consumo": {
    meta: preMeta({
      title: "Aplicação: temperatura e consumo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "10 min",
      readingNotes: ["Relacionar duas grandezas", "Ler tendência num gráfico real"],
      glossaryTerms: ["Variável", "Tendência", "Correlação"],
      next: { slug: "revisao-graficos", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Muitos gráficos do dia a dia ligam duas grandezas que variam juntas: temperatura e consumo de energia, hora e movimento de uma loja, chuva e nível de um rio.",
        "Ler esses gráficos é perceber tendências: \"quanto mais quente, mais energia gasta com ar-condicionado\". É a base de decisões em casa, em empresas e em políticas públicas.",
        "Junta tudo do módulo — eixos, leitura, crescimento e interpretação — num gráfico que descreve o mundo real.",
      ],
    },
    explicacao: {
      title: "Quando uma grandeza segue a outra",
      paragraphs: [
        "Num gráfico de consumo por temperatura, o eixo x é a temperatura e o eixo y o consumo. A forma da curva mostra como um acompanha o outro.",
        "Se a curva sobe quando x sobe, as grandezas crescem juntas (relação direta). Se desce, uma sobe enquanto a outra cai (relação inversa). A inclinação mostra a intensidade.",
      ],
      callout:
        "Sobem juntas = relação direta; uma sobe e a outra desce = relação inversa. A inclinação diz o quão forte é o efeito.",
      formula: "consumo = base + taxa · temperatura",
      formulaLegend: "muitas relações reais aproximam-se de uma função afim",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Energia", detail: "consumo de ar-condicionado vs. calor" },
        { label: "Comércio", detail: "movimento por horário" },
        { label: "Agricultura", detail: "produção vs. chuva" },
        { label: "Saúde", detail: "atendimentos vs. frio" },
        { label: "Transporte", detail: "trânsito por hora do dia" },
        { label: "Cálculo", detail: "taxas de variação em fenômenos" },
      ],
    },
    exemplo: {
      title: "Consumo de energia no calor",
      situacao:
        "Um gráfico mostra que a 20 °C o consumo é 100 kWh/dia e a 30 °C é 200 kWh/dia, crescendo de forma aproximadamente linear. Qual a tendência e quanto se gasta a mais por grau?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar as variáveis",
          detail: "\\(x\\) = temperatura (°C); \\(y\\) = consumo (kWh/dia).",
        },
        {
          title: "Ler os dois pontos",
          detail: "\\((20, 100)\\) e \\((30, 200)\\): consumo sobe quando a temperatura sobe (relação direta).",
        },
        {
          title: "Calcular o gasto por grau",
          detail:
            "\\[\\begin{aligned} \\text{taxa} &= \\frac{200 - 100}{30 - 20} \\\\ &= \\frac{100}{10} = 10 \\end{aligned}\\] (kWh por grau)",
        },
        {
          title: "Interpretar",
          detail: "Cada 1 °C a mais custa cerca de 10 kWh adicionais por dia.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A inclinação de 10 kWh por grau quantifica a tendência: não só \"esquenta, gasta mais\", mas quanto mais. Isso é o que permite prever a conta de luz num dia quente.",
        "Essa taxa de variação (quanto y muda por unidade de x) é justamente a semente do conceito de derivada — o coração do Cálculo que vem a seguir.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir relação direta com inversa.",
        "Calcular a variação dividindo na ordem errada.",
        "Achar que correlação é sempre causa (cuidado com conclusões).",
        "Ignorar as unidades ao interpretar a inclinação.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Num gráfico, o consumo cai quando a temperatura sobe. Que relação é essa?",
          identificar: "Uma sobe, a outra desce.",
          dica: "Sentidos opostos.",
          resolucao: "É uma relação inversa.",
          resposta: "Inversa",
          interpretacao: "Talvez aquecimento: quanto mais frio, mais se gasta.",
          erroComum: "Chamar de direta.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "De \\((10, 50)\\) a \\((20, 90)\\), qual a variação por unidade de \\(x\\)?",
          identificar: "Variação de \\(y\\) dividida pela de \\(x\\).",
          dica: "\\(\\frac{90 - 50}{20 - 10}\\).",
          resolucao: "\\(\\frac{40}{10} = 4\\).",
          resposta: "4 por unidade",
          interpretacao: "\\(y\\) aumenta 4 a cada 1 de \\(x\\).",
          erroComum: "Dividir 40 por 90.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Movimento de uma loja é baixo de manhã, alto no almoço e cai à noite. Descreva a curva.",
          identificar: "Pense em subir, pico e descer.",
          dica: "Há um máximo no meio.",
          resolucao: "Cresce até o almoço (pico) e depois decresce: parábola para baixo.",
          resposta: "Sobe até o pico do almoço e desce",
          interpretacao: "O máximo indica o horário de maior movimento.",
          erroComum: "Descrever como sempre crescente.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique leitura de gráficos que relacionam duas grandezas no banco de exercícios.",
      exerciseIds: ["graf-ap-13", "graf-ap-14"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Gráficos reais ligam duas grandezas que variam juntas.",
        "Relação direta sobe junto; inversa vai em sentidos opostos.",
        "A inclinação mede quanto y muda por unidade de x.",
        "Essa taxa de variação é a semente da derivada.",
      ],
    },
  },

  "revisao-graficos": {
    meta: preMeta({
      title: "Revisão do módulo: gráficos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "8 min",
      readingNotes: ["Consolida as 7 aulas", "Do ponto à interpretação"],
      glossaryTerms: ["Coordenada", "Tendência", "Máximo", "Translação"],
      next: {
        slug: "seno",
        title: "Seno",
        moduleSlug: "trigonometria",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "O módulo inteiro foi construindo uma habilidade só: olhar um gráfico e entender o que ele diz, do ponto isolado à história completa.",
        "Você aprendeu a localizar pontos, ler valores, identificar crescimento, interpretar picos e cruzamentos e reconhecer deslocamentos. Esta aula amarra tudo.",
        "É a preparação perfeita para o Cálculo, que vai medir com precisão as tendências que você agora lê de olho.",
      ],
    },
    explicacao: {
      title: "O módulo em camadas",
      paragraphs: [
        "Camada 1 — localizar: cada ponto é (x, y) no plano. Camada 2 — ler: subir do x até a curva para achar o y. Camada 3 — descrever: crescente, decrescente ou constante.",
        "Camada 4 — interpretar: picos, vales e cruzamentos contam a história. Camada 5 — transformar: reconhecer o gráfico-base e seu deslocamento. As aplicações usam todas juntas.",
      ],
      callout:
        "Localizar → ler → descrever → interpretar → transformar. É a escada para entender qualquer gráfico.",
      formula: "ponto (x, y) → tendência → significado",
      formulaLegend: "o caminho da leitura completa de um gráfico",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Trigonometria", detail: "o próximo módulo tem muitos gráficos" },
        { label: "Dados", detail: "ler painéis e relatórios" },
        { label: "Negócios", detail: "decisões a partir de curvas" },
        { label: "Ciência", detail: "interpretar experimentos" },
        { label: "Provas", detail: "questões com gráficos" },
        { label: "Cálculo", detail: "derivadas medem o que você lê aqui" },
      ],
    },
    exemplo: {
      title: "Uma leitura completa",
      situacao:
        "Uma curva passa por \\((0, 2)\\), sobe até um pico em \\((3, 8)\\) e desce até \\((6, 2)\\). Faça a leitura completa: tipo, comportamento e pontos-chave.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Ler o ponto inicial",
          detail: "Em \\(x = 0\\), \\(y = 2\\): a curva começa na altura 2.",
        },
        {
          title: "Descrever o comportamento",
          detail: "Sobe de \\(x = 0\\) a \\(x = 3\\) (crescente), depois desce até \\(x = 6\\) (decrescente).",
        },
        {
          title: "Identificar o ponto-chave",
          detail: "Pico em \\((3, 8)\\): é o máximo, valor mais alto da curva.",
        },
        {
          title: "Reconhecer a forma e contar a história",
          detail: "Sobe e desce simetricamente (parábola para baixo): começa em 2, atinge o máximo 8 em \\(x = 3\\) e volta a 2 em \\(x = 6\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Você usou as camadas todas: localizou pontos, descreveu o sentido, achou o máximo e reconheceu a forma. Essa é a leitura completa que o módulo treinou.",
        "Repare que nem foi preciso a fórmula: a posição dos pontos e o sentido da curva já contam tudo. Quando o Cálculo chegar, ele vai dar números exatos a essa intuição.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Pular a leitura dos eixos e suas unidades.",
        "Confundir altura (valor alto) com crescimento (subir).",
        "Esquecer de marcar os pontos de virada.",
        "Tirar conclusões sem olhar a curva inteira.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Uma reta passa por \\((0, 3)\\) e sobe. Onde ela corta o eixo \\(y\\) e qual o comportamento?",
          identificar: "Intercepto em \\(x = 0\\) e sentido.",
          dica: "\\(x = 0\\) dá o corte no eixo \\(y\\).",
          resolucao: "Corta o eixo \\(y\\) em 3 e é crescente.",
          resposta: "Corta em \\((0,3)\\); crescente",
          interpretacao: "Começa em 3 e sobe a partir dali.",
          erroComum: "Trocar o corte com o eixo \\(x\\).",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "\\(g(x) = x^2 + 1\\) está como em relação a \\(x^2\\)?",
          identificar: "Translação vertical.",
          dica: "\\(+1\\) fora da função.",
          resolucao: "Sobe 1 unidade: vértice em \\((0, 1)\\).",
          resposta: "Sobe 1 unidade",
          interpretacao: "Mesma parábola, 1 acima.",
          erroComum: "Mover para a direita.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Duas retas de custo se cruzam em \\((5, 40)\\). O que decidir a partir daí?",
          identificar: "Cruzamento = custos iguais.",
          dica: "Antes e depois um plano vence.",
          resolucao: "Em 5 unidades os custos empatam (R$ 40); antes um plano é melhor, depois o outro.",
          resposta: "Ponto de equilíbrio em \\((5, 40)\\)",
          interpretacao: "O cruzamento orienta a escolha conforme a quantidade.",
          erroComum: "Ignorar o que acontece fora do cruzamento.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise todo o módulo de gráficos com exercícios variados no banco do site.",
      exerciseIds: ["graf-ap-15", "graf-ap-16", "dsf-graf-01"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Leitura em camadas: localizar, ler, descrever, interpretar, transformar.",
        "Pontos-chave: interceptos, máximos, mínimos e cruzamentos.",
        "Translações deslocam um gráfico-base conhecido.",
        "A intuição de tendência prepara o terreno para o Cálculo.",
      ],
    },
  },
};
