import type { Exercicio } from "@/data/exercicios";

// Banco de exercícios aplicados de Função quadrática (Pré-Cálculo).
// 9 campos do CLAUDE.md + LaTeX (\(...\)). Decimais com {,}.
export const exerciciosFuncaoQuadratica: Exercicio[] = [
  // ── Reconhecer a função ─────────────────────────────────────────
  {
    id: "fq-01",
    num: "FQ-01",
    title: "Ler os coeficientes",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · leitura",
    type: "compreensao",
    level: "facil",
    enunciado:
      "Na função \\(f(x) = 2x^2 - 5x + 3\\), identifique \\(a\\), \\(b\\) e \\(c\\) e diga se a parábola abre para cima ou para baixo.",
    identificar: [
      "Qual número acompanha \\(x^2\\)?",
      "Qual acompanha \\(x\\)?",
      "Qual é o termo sem \\(x\\)?",
    ],
    dica: "O sinal de \\(a\\) sozinho já decide para onde a parábola abre.",
    resolucao:
      "Comparando com \\(ax^2 + bx + c\\): \\(a = 2\\), \\(b = -5\\), \\(c = 3\\). Como \\(a = 2 > 0\\), a parábola abre para cima.",
    resposta: "\\(a = 2\\), \\(b = -5\\), \\(c = 3\\); abre para cima",
    interpretacao:
      "Abrir para cima significa que a função tem um ponto de mínimo — existe um valor mais baixo, e daí em diante ela só cresce.",
    erroComum:
      "Esquecer que o sinal de menos faz parte do coeficiente e anotar \\(b = 5\\).",
  },
  {
    id: "fq-02",
    num: "FQ-02",
    title: "Duas raízes por Bhaskara",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · raízes",
    type: "calculo",
    level: "facil",
    enunciado: "Resolva \\(x^2 - 5x + 6 = 0\\).",
    identificar: "\\(a = 1\\), \\(b = -5\\), \\(c = 6\\).",
    dica: "Calcule \\(\\Delta = b^2 - 4ac\\) antes de aplicar a fórmula.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1\\).",
      "\\(\\sqrt{\\Delta} = 1\\), então \\(x = \\frac{5 \\pm 1}{2}\\).",
      "\\(x_1 = \\frac{5 + 1}{2} = 3\\) e \\(x_2 = \\frac{5 - 1}{2} = 2\\).",
    ],
    resposta: "\\(x = 2\\) ou \\(x = 3\\)",
    interpretacao:
      "São os dois pontos em que a parábola corta o eixo horizontal — os valores de \\(x\\) que zeram a função.",
    erroComum:
      "Trocar o sinal de \\(-b\\): com \\(b = -5\\), o numerador começa em \\(+5\\), não \\(-5\\).",
  },
  {
    id: "fq-03",
    num: "FQ-03",
    title: "Área de um canteiro",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Cotidiano · área",
    type: "aplicada",
    level: "facil",
    enunciado:
      "Um canteiro retangular tem um lado de \\(x\\) metros e o outro de \\((20 - x)\\) metros. (a) Escreva a área em função de \\(x\\). (b) Qual a área quando \\(x = 6\\)?",
    identificar: [
      "Área de retângulo é o produto dos lados.",
      "O que acontece com o grau quando você multiplica \\(x\\) por algo que também tem \\(x\\)?",
    ],
    dica: "Multiplique e organize em \\(ax^2 + bx + c\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(A(x) = x(20 - x) = 20x - x^2\\).",
      "Para \\(x = 6\\): \\(A(6) = 6 \\cdot (20 - 6) = 6 \\cdot 14 = 84\\).",
    ],
    resposta: "\\(A(x) = -x^2 + 20x\\); \\(A(6) = 84\\ \\text{m}^2\\)",
    interpretacao:
      "A área vira quadrática porque as duas dimensões dependem de \\(x\\). Por isso existe um tamanho que dá área máxima — não adianta esticar um lado sem limite.",
    erroComum: "Somar os lados em vez de multiplicar, achando o perímetro.",
  },
  {
    id: "fq-04",
    num: "FQ-04",
    title: "Quando não há raiz real",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · discriminante",
    type: "interpretacao",
    level: "facil",
    enunciado:
      "Calcule \\(\\Delta\\) de \\(x^2 + 2x + 5 = 0\\) e explique o que o resultado diz sobre o gráfico.",
    identificar: "\\(a = 1\\), \\(b = 2\\), \\(c = 5\\).",
    dica: "Raiz quadrada de número negativo não existe nos reais.",
    resolucao:
      "\\(\\Delta = 2^2 - 4 \\cdot 1 \\cdot 5 = 4 - 20 = -16\\). Como \\(\\Delta < 0\\), não há raiz real.",
    resposta: "\\(\\Delta = -16\\); nenhuma raiz real",
    interpretacao:
      "A parábola abre para cima e fica inteira acima do eixo \\(x\\): nunca o toca. \"Sem raiz real\" é uma informação sobre o gráfico, não um erro de conta.",
    erroComum:
      "Continuar aplicando Bhaskara com \\(\\Delta\\) negativo e inventar um resultado.",
  },

  // ── Vértice, máximo e mínimo ────────────────────────────────────
  {
    id: "fq-05",
    num: "FQ-05",
    title: "Altura de uma bola lançada",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Física · lançamento",
    type: "aplicada",
    level: "medio",
    enunciado:
      "A altura de uma bola é \\(h(t) = -5t^2 + 20t\\), com \\(h\\) em metros e \\(t\\) em segundos. (a) Em que instante ela volta ao chão? (b) Qual a altura máxima?",
    identificar: [
      "Voltar ao chão significa \\(h = 0\\).",
      "Altura máxima acontece no vértice.",
    ],
    dica: "Para (a), coloque \\(t\\) em evidência. Para (b), use \\(t_v = -\\frac{b}{2a}\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "(a) \\(-5t^2 + 20t = 0 \\Rightarrow t(-5t + 20) = 0\\).",
      "Logo \\(t = 0\\) (lançamento) ou \\(t = 4\\) s (volta ao chão).",
      "(b) \\(t_v = -\\frac{20}{2 \\cdot (-5)} = 2\\) s.",
      "\\(h(2) = -5 \\cdot 4 + 20 \\cdot 2 = -20 + 40 = 20\\) m.",
    ],
    resposta: "Volta ao chão em \\(t = 4\\) s; altura máxima de \\(20\\) m em \\(t = 2\\) s",
    interpretacao:
      "O instante do topo é exatamente o meio do percurso: sobe 2 s e desce 2 s. A simetria da parábola é a simetria do movimento.",
    erroComum:
      "Achar que a altura máxima é \\(h(4)\\) — em \\(t = 4\\) a bola está no chão, altura zero.",
  },
  {
    id: "fq-06",
    num: "FQ-06",
    title: "Coordenadas do vértice",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · vértice",
    type: "calculo",
    level: "medio",
    enunciado:
      "Encontre o vértice de \\(f(x) = x^2 - 6x + 5\\) e diga se ele é ponto de máximo ou de mínimo.",
    identificar: "\\(a = 1\\), \\(b = -6\\), \\(c = 5\\).",
    dica: "\\(x_v = -\\frac{b}{2a}\\); depois substitua na função para achar \\(y_v\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(x_v = -\\frac{-6}{2 \\cdot 1} = 3\\).",
      "\\(y_v = 3^2 - 6 \\cdot 3 + 5 = 9 - 18 + 5 = -4\\).",
      "Como \\(a > 0\\), a parábola abre para cima: o vértice é mínimo.",
    ],
    resposta: "Vértice \\((3, -4)\\); ponto de mínimo",
    interpretacao:
      "O menor valor que essa função assume é \\(-4\\), e isso acontece em \\(x = 3\\). Nenhum outro \\(x\\) dá resultado menor.",
    erroComum:
      "Esquecer o sinal negativo da fórmula e calcular \\(x_v = \\frac{b}{2a} = -3\\).",
  },
  {
    id: "fq-07",
    num: "FQ-07",
    title: "Quantas unidades dão lucro máximo",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Finanças · lucro",
    type: "aplicada",
    level: "medio",
    enunciado:
      "O lucro de uma oficina é \\(L(x) = -2x^2 + 120x - 800\\) reais, onde \\(x\\) é o número de peças produzidas por dia. Quantas peças maximizam o lucro e qual é esse lucro?",
    identificar: [
      "\\(a = -2 < 0\\): existe máximo.",
      "O máximo está no vértice.",
    ],
    dica: "Ache \\(x_v\\) e depois calcule \\(L(x_v)\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(x_v = -\\frac{120}{2 \\cdot (-2)} = -\\frac{120}{-4} = 30\\) peças.",
      "\\(L(30) = -2 \\cdot 900 + 120 \\cdot 30 - 800\\).",
      "\\(L(30) = -1800 + 3600 - 800 = 1000\\).",
    ],
    resposta: "\\(30\\) peças por dia, com lucro de R$ 1.000,00",
    interpretacao:
      "Produzir mais que 30 peças começa a dar prejuízo marginal: os custos crescem mais rápido que a receita. Mais produção nem sempre é mais lucro.",
    erroComum:
      "Achar que quanto maior a produção, maior o lucro — ignorando que \\(a\\) é negativo.",
  },
  {
    id: "fq-08",
    num: "FQ-08",
    title: "Raiz dupla",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · raízes",
    type: "calculo",
    level: "medio",
    enunciado: "Resolva \\(x^2 - 8x + 16 = 0\\) e interprete o resultado no gráfico.",
    identificar: "\\(a = 1\\), \\(b = -8\\), \\(c = 16\\).",
    dica: "Repare no valor de \\(\\Delta\\) antes de concluir.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(\\Delta = (-8)^2 - 4 \\cdot 1 \\cdot 16 = 64 - 64 = 0\\).",
      "\\(x = \\frac{8 \\pm 0}{2} = 4\\).",
      "Há uma única raiz (dupla): \\(x = 4\\).",
    ],
    resposta: "\\(x = 4\\) (raiz dupla)",
    interpretacao:
      "A parábola encosta no eixo \\(x\\) num único ponto, sem atravessar. O vértice está exatamente sobre o eixo.",
    erroComum:
      "Escrever \"duas raízes iguais a 4\" como se fossem dois pontos diferentes no gráfico.",
  },
  {
    id: "fq-09",
    num: "FQ-09",
    title: "Preço que maximiza a receita",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Finanças · receita",
    type: "aplicada",
    level: "medio",
    enunciado:
      "Uma lanchonete vende \\(q = 100 - 2p\\) porções por dia quando o preço é \\(p\\) reais. (a) Escreva a receita \\(R(p)\\). (b) Qual preço dá a maior receita?",
    identificar: [
      "Receita é preço vezes quantidade.",
      "A quantidade cai quando o preço sobe.",
    ],
    dica: "\\(R(p) = p \\cdot q\\). Multiplique e ache o vértice.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(R(p) = p(100 - 2p) = 100p - 2p^2\\).",
      "\\(p_v = -\\frac{100}{2 \\cdot (-2)} = 25\\).",
      "\\(R(25) = 25(100 - 50) = 25 \\cdot 50 = 1250\\).",
    ],
    resposta: "\\(R(p) = -2p^2 + 100p\\); preço de R$ 25,00, receita de R$ 1.250,00",
    interpretacao:
      "Cobrar caro demais afasta clientes e cobrar barato demais não paga a conta. O vértice é o equilíbrio entre os dois efeitos.",
    erroComum:
      "Maximizar só o preço, esquecendo que a quantidade vendida depende dele.",
  },
  {
    id: "fq-10",
    num: "FQ-10",
    title: "Ler a parábola no gráfico",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Gráficos · leitura",
    type: "interpretacao",
    level: "medio",
    enunciado:
      "Uma parábola corta o eixo \\(x\\) em \\(1\\) e \\(5\\) e tem vértice em \\((3, 8)\\). (a) O coeficiente \\(a\\) é positivo ou negativo? (b) Qual o valor máximo ou mínimo da função?",
    identificar: [
      "O vértice está acima ou abaixo das raízes?",
      "A abscissa do vértice fica no meio das raízes.",
    ],
    dica: "Se o vértice está acima do eixo e a curva desce até cortá-lo dos dois lados, para onde ela abre?",
    resolucao:
      "As raízes são \\(1\\) e \\(5\\), e o meio delas é \\(\\frac{1 + 5}{2} = 3\\) — coerente com o vértice dado. Como o vértice está em \\(y = 8\\) (acima do eixo) e a curva desce até cortar o eixo nos dois lados, ela abre para baixo: \\(a < 0\\). Logo \\(8\\) é o valor máximo.",
    resposta: "\\(a < 0\\); valor máximo igual a \\(8\\), em \\(x = 3\\)",
    interpretacao:
      "Dá para descrever a função inteira sem ter a fórmula: raízes, sentido da abertura e vértice já contam a história do gráfico.",
    erroComum:
      "Confundir o valor máximo (\\(y_v = 8\\)) com o ponto onde ele ocorre (\\(x_v = 3\\)).",
  },

  // ── Situações mais completas ────────────────────────────────────
  {
    id: "fq-11",
    num: "FQ-11",
    title: "Cercado aproveitando o muro",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Engenharia · otimização",
    type: "aplicada",
    level: "dificil",
    enunciado:
      "Com \\(60\\) m de tela, um sitiante quer cercar uma área retangular usando um muro já existente como um dos lados. Quais dimensões dão a maior área?",
    identificar: [
      "O muro dispensa um dos lados: a tela cobre três lados.",
      "Chame de \\(x\\) os dois lados iguais.",
    ],
    dica:
      "Se os dois lados perpendiculares ao muro medem \\(x\\), sobra \\(60 - 2x\\) para o lado paralelo.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Lados: \\(x\\), \\(x\\) e \\(60 - 2x\\).",
      "\\(A(x) = x(60 - 2x) = 60x - 2x^2\\).",
      "\\(x_v = -\\frac{60}{2 \\cdot (-2)} = 15\\) m.",
      "Lado paralelo ao muro: \\(60 - 2 \\cdot 15 = 30\\) m.",
      "\\(A = 15 \\cdot 30 = 450\\ \\text{m}^2\\).",
    ],
    resposta: "\\(15\\) m por \\(30\\) m, com área máxima de \\(450\\ \\text{m}^2\\)",
    interpretacao:
      "Com um lado de graça, o formato ótimo deixa de ser o quadrado: o lado do muro fica com o dobro dos outros. A restrição muda a resposta.",
    erroComum:
      "Usar \\(60\\) como perímetro dos quatro lados e esquecer que o muro substitui um deles.",
  },
  {
    id: "fq-12",
    num: "FQ-12",
    title: "Onde a função é positiva",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Álgebra · inequação",
    type: "calculo",
    level: "dificil",
    enunciado: "Resolva a inequação \\(x^2 - 4x + 3 > 0\\).",
    identificar: [
      "Primeiro ache onde a expressão vale zero.",
      "Depois use o sinal de \\(a\\) para saber onde ela é positiva.",
    ],
    dica:
      "Com \\(a > 0\\), a parábola é negativa entre as raízes e positiva fora delas.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(\\Delta = 16 - 12 = 4\\), \\(\\sqrt{\\Delta} = 2\\).",
      "\\(x = \\frac{4 \\pm 2}{2}\\), ou seja, \\(x_1 = 1\\) e \\(x_2 = 3\\).",
      "Como \\(a = 1 > 0\\), a parábola abre para cima e fica abaixo do eixo entre \\(1\\) e \\(3\\).",
      "Logo é positiva fora desse intervalo.",
    ],
    resposta: "\\(x < 1\\) ou \\(x > 3\\)",
    interpretacao:
      "Resolver inequação do 2º grau é ler o gráfico, não decorar regra: as raízes dividem a reta em faixas, e o sinal de \\(a\\) diz o sinal de cada faixa.",
    erroComum:
      "Responder \\(1 < x < 3\\), que é justamente onde a função é negativa.",
  },
  {
    id: "fq-13",
    num: "FQ-13",
    title: "Arco de uma ponte",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Engenharia · estruturas",
    type: "aplicada",
    level: "dificil",
    enunciado:
      "O arco de uma ponte segue \\(h(x) = -0{,}02x^2 + 0{,}8x\\), com \\(x\\) e \\(h\\) em metros, medidos a partir de uma das bases. (a) Qual o vão da ponte? (b) Qual a altura máxima do arco?",
    identificar: [
      "O vão vai de uma base à outra: são as raízes.",
      "A altura máxima está no vértice.",
    ],
    dica: "Para (a), coloque \\(x\\) em evidência em \\(h(x) = 0\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "(a) \\(-0{,}02x^2 + 0{,}8x = 0 \\Rightarrow x(-0{,}02x + 0{,}8) = 0\\).",
      "\\(x = 0\\) ou \\(x = \\frac{0{,}8}{0{,}02} = 40\\). O vão é de \\(40\\) m.",
      "(b) \\(x_v = -\\frac{0{,}8}{2 \\cdot (-0{,}02)} = 20\\) m.",
      "\\(h(20) = -0{,}02 \\cdot 400 + 0{,}8 \\cdot 20 = -8 + 16 = 8\\) m.",
    ],
    resposta: "Vão de \\(40\\) m; altura máxima de \\(8\\) m, no meio do vão",
    interpretacao:
      "O ponto mais alto cai exatamente no meio das bases — de novo a simetria da parábola. É por isso que ela modela bem arcos e cabos.",
    erroComum:
      "Somar as duas raízes achando que isso dá o vão, em vez de subtrair (ou notar que uma delas é zero).",
  },
  {
    id: "fq-14",
    num: "FQ-14",
    title: "Desconto no ingresso vale a pena?",
    tema: "Função quadrática",
    temaSlug: "funcao-quadratica",
    area: "Finanças · precificação",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "Um teatro vende \\(300\\) ingressos a R$ 40,00. A cada R$ 2,00 de desconto no preço, vende \\(30\\) ingressos a mais. Qual preço maximiza a receita, e qual é essa receita?",
    identificar: [
      "Preço e quantidade mudam juntos, em passos.",
      "Chame de \\(n\\) o número de descontos de R$ 2,00 aplicados.",
    ],
    dica:
      "Escreva preço e quantidade em função de \\(n\\), multiplique, e ache o vértice em \\(n\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Preço: \\(40 - 2n\\). Quantidade: \\(300 + 30n\\).",
      "\\(R(n) = (40 - 2n)(300 + 30n)\\).",
      "\\(R(n) = 12000 + 1200n - 600n - 60n^2 = -60n^2 + 600n + 12000\\).",
      "\\(n_v = -\\frac{600}{2 \\cdot (-60)} = 5\\) descontos.",
      "Preço: \\(40 - 2 \\cdot 5 = 30\\) reais; quantidade: \\(300 + 30 \\cdot 5 = 450\\).",
      "\\(R = 30 \\cdot 450 = 13500\\).",
    ],
    resposta: "Preço de R$ 30,00, com \\(450\\) ingressos e receita de R$ 13.500,00",
    interpretacao:
      "Baixar o preço aumenta a receita até certo ponto — depois o desconto come mais do que o público extra traz. O vértice é exatamente onde os dois efeitos se equilibram.",
    erroComum:
      "Tratar o preço como variável contínua e esquecer que \\(n\\) conta passos de R$ 2,00, trocando \\(n = 5\\) por \"preço 5\".",
  },
];
