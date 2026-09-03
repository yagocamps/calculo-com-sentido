import type { Exercicio } from "@/data/exercicios";

// Um exercício de nível "desafio" por tema. O filtro Desafio existia na página
// mas quase todos os temas vinham vazios — estes fecham a escada de níveis
// (fácil → médio → difícil → desafio) em cada assunto.
// 9 campos do CLAUDE.md + LaTeX (\(...\)). Decimais com {,}.
export const exerciciosDesafios: Exercicio[] = [
  {
    id: "dsf-fund-01",
    num: "DSF-01",
    title: "Aumenta 20% e desconta 20%: volta ao mesmo?",
    tema: "Fundamentos",
    temaSlug: "fundamentos",
    area: "Finanças · porcentagem",
    type: "interpretacao",
    level: "desafio",
    enunciado:
      "Um produto sofre um aumento de \\(20\\%\\) e, no mês seguinte, um desconto de \\(20\\%\\). O preço final é igual, maior ou menor que o original? Justifique com contas.",
    identificar: [
      "Sobre qual valor incide cada percentual?",
      "O segundo percentual incide sobre o preço já aumentado.",
    ],
    dica: "Chame o preço inicial de \\(P\\) e aplique um fator de cada vez.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Após o aumento: \\(1{,}20P\\).",
      "O desconto incide sobre esse novo valor: \\(1{,}20P \\times 0{,}80\\).",
      "\\(1{,}20 \\times 0{,}80 = 0{,}96\\), logo o preço final é \\(0{,}96P\\).",
    ],
    resposta: "Menor: o preço final é \\(96\\%\\) do original (queda de \\(4\\%\\))",
    interpretacao:
      "Percentuais não se cancelam porque incidem sobre bases diferentes. O aumento foi calculado sobre \\(P\\); o desconto, sobre um valor maior. É a mesma armadilha de \"repõe a inflação\" em salário.",
    erroComum:
      "Somar e subtrair os percentuais (\\(+20\\% - 20\\% = 0\\)) e concluir que o preço não mudou.",
  },
  {
    id: "dsf-alg-01",
    num: "DSF-02",
    title: "Quanto cada um tinha antes",
    tema: "Álgebra",
    temaSlug: "algebra",
    area: "Cotidiano · sistemas",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "Ana tem o triplo do dinheiro de Bruno. Se Ana der R$ 12,00 a Bruno, os dois ficam com a mesma quantia. Quanto cada um tem?",
    identificar: [
      "Duas informações, duas incógnitas.",
      "Dar dinheiro tira de um e põe no outro.",
    ],
    dica:
      "Escreva a quantia de Ana em função da de Bruno e depois monte a igualdade do \"depois da transferência\".",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Seja \\(B\\) o dinheiro de Bruno. Então Ana tem \\(3B\\).",
      "Depois da transferência: Ana fica com \\(3B - 12\\) e Bruno com \\(B + 12\\).",
      "Igualando: \\(3B - 12 = B + 12\\).",
      "\\(2B = 24 \\Rightarrow B = 12\\), logo \\(A = 36\\).",
      "Conferindo: \\(36 - 12 = 24\\) e \\(12 + 12 = 24\\). ✓",
    ],
    resposta: "Bruno tem R$ 12,00 e Ana, R$ 36,00",
    interpretacao:
      "O truque é perceber que a transferência muda os dois lados ao mesmo tempo — quem dá perde e quem recebe ganha. Montar isso corretamente é metade do problema.",
    erroComum:
      "Subtrair 12 só de Ana e esquecer de somar 12 a Bruno, montando \\(3B - 12 = B\\).",
  },
  {
    id: "dsf-func-01",
    num: "DSF-03",
    title: "Voltando da resposta para a entrada",
    tema: "Funções",
    temaSlug: "funcoes",
    area: "Finanças · custo",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "O custo de produzir \\(x\\) peças é \\(C(x) = 2x + 30\\) reais. (a) Quantas peças cabem em um orçamento de R$ 200,00? (b) Escreva a função que dá o número de peças a partir do orçamento disponível.",
    identificar: [
      "Em (a) você conhece a saída e procura a entrada.",
      "Em (b) isso vira uma função nova — a inversa.",
    ],
    dica: "Isole \\(x\\) na equação \\(C = 2x + 30\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "(a) \\(200 = 2x + 30 \\Rightarrow 2x = 170 \\Rightarrow x = 85\\) peças.",
      "(b) De \\(C = 2x + 30\\): \\(x = \\frac{C - 30}{2}\\).",
      "Conferindo com \\(C = 200\\): \\(\\frac{200 - 30}{2} = 85\\). ✓",
    ],
    resposta: "(a) \\(85\\) peças. (b) \\(x(C) = \\frac{C - 30}{2}\\)",
    interpretacao:
      "A função inversa não é um truque algébrico: é a mesma relação lida na direção oposta. Aqui, sair de \"quanto custa produzir\" para \"quanto dá para produzir\".",
    erroComum:
      "Dividir tudo por 2 sem tirar o custo fixo antes, escrevendo \\(x = \\frac{C}{2} - 30\\).",
  },
  {
    id: "dsf-fcal-01",
    num: "DSF-04",
    title: "Domínio com raiz e denominador juntos",
    tema: "Funções p/ cálculo",
    temaSlug: "funcoes-calculo",
    area: "Cálculo · domínio",
    type: "calculo",
    level: "desafio",
    enunciado:
      "Determine o domínio de \\(f(x) = \\frac{\\sqrt{x - 2}}{x - 5}\\).",
    identificar: [
      "Raiz quadrada exige radicando maior ou igual a zero.",
      "Denominador não pode ser zero.",
      "As duas condições valem ao mesmo tempo.",
    ],
    dica: "Resolva cada restrição separadamente e depois cruze as duas.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Da raiz: \\(x - 2 \\geq 0 \\Rightarrow x \\geq 2\\).",
      "Do denominador: \\(x - 5 \\neq 0 \\Rightarrow x \\neq 5\\).",
      "Cruzando: \\(x \\geq 2\\), tirando o \\(5\\).",
    ],
    resposta: "\\(D = [2, 5) \\cup (5, +\\infty)\\)",
    interpretacao:
      "Domínio é onde a função faz sentido. No Cálculo isso importa antes de qualquer limite: perguntar o comportamento em um ponto fora do domínio muda completamente a pergunta.",
    erroComum:
      "Usar \\(x > 2\\) em vez de \\(x \\geq 2\\) — em \\(x = 2\\) a raiz vale zero, o que é permitido.",
  },
  {
    id: "dsf-graf-01",
    num: "DSF-05",
    title: "Onde as duas retas se encontram",
    tema: "Gráficos",
    temaSlug: "graficos",
    area: "Gráficos · sistemas",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "Duas operadoras cobram \\(y = 2x + 1\\) e \\(y = -x + 7\\) reais por \\(x\\) GB. A partir de quantos GB a primeira fica mais cara, e qual o valor no ponto de virada?",
    identificar: [
      "O ponto de encontro é onde os dois preços são iguais.",
      "Depois dele, quem tem maior inclinação fica na frente.",
    ],
    dica: "Iguale as duas expressões e resolva para \\(x\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(2x + 1 = -x + 7\\).",
      "\\(3x = 6 \\Rightarrow x = 2\\).",
      "\\(y = 2 \\cdot 2 + 1 = 5\\). Encontro em \\((2, 5)\\).",
      "Para \\(x > 2\\), a primeira cresce (inclinação \\(+2\\)) e a segunda decresce: a primeira fica mais cara.",
    ],
    resposta: "Encontro em \\((2, 5)\\); acima de \\(2\\) GB a primeira é mais cara",
    interpretacao:
      "Resolver sistema graficamente é achar onde duas histórias contam o mesmo número. Depois do cruzamento, quem manda é a inclinação.",
    erroComum:
      "Achar o \\(x\\) e parar, sem calcular o \\(y\\) nem responder qual fica mais cara depois.",
  },
  {
    id: "dsf-trig-01",
    num: "DSF-06",
    title: "A rampa está dentro da norma?",
    tema: "Trigonometria",
    temaSlug: "trigonometria",
    area: "Engenharia · acessibilidade",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "Uma rampa tem \\(12\\) m de comprimento e vence um desnível de \\(3\\) m. (a) Qual o seno do ângulo de inclinação? (b) Esse ângulo é maior ou menor que \\(30^\\circ\\)? Justifique sem calculadora.",
    identificar: [
      "O comprimento da rampa é a hipotenusa.",
      "O desnível é o cateto oposto ao ângulo de inclinação.",
    ],
    dica: "Compare o seno obtido com \\(\\sin(30^\\circ) = \\frac{1}{2}\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "(a) \\(\\sin\\theta = \\frac{\\text{cateto oposto}}{\\text{hipotenusa}} = \\frac{3}{12} = 0{,}25\\).",
      "(b) \\(\\sin(30^\\circ) = 0{,}5\\).",
      "Como \\(0{,}25 < 0{,}5\\) e o seno cresce entre \\(0^\\circ\\) e \\(90^\\circ\\), tem-se \\(\\theta < 30^\\circ\\).",
    ],
    resposta: "\\(\\sin\\theta = 0{,}25\\); o ângulo é menor que \\(30^\\circ\\)",
    interpretacao:
      "Dá para comparar ângulos sem saber quanto eles valem: basta comparar os senos, porque a função é crescente nesse intervalo. Rampas de acessibilidade dependem exatamente dessa razão.",
    erroComum:
      "Usar \\(\\frac{3}{12}\\) como tangente, dividindo o desnível pelo comprimento da rampa em vez de pela projeção horizontal.",
  },
  {
    id: "dsf-prep-01",
    num: "DSF-07",
    title: "O buraco em x = 3",
    tema: "Preparação p/ limites",
    temaSlug: "preparacao-limites",
    area: "Limites · indeterminação",
    type: "interpretacao",
    level: "desafio",
    enunciado:
      "Considere \\(f(x) = \\frac{x^2 - 9}{x - 3}\\). (a) O que acontece em \\(x = 3\\)? (b) Para que valor \\(f(x)\\) tende quando \\(x\\) se aproxima de \\(3\\)?",
    identificar: [
      "Substituir direto dá qual expressão?",
      "O numerador é uma diferença de quadrados.",
    ],
    dica: "Fatore \\(x^2 - 9\\) e veja o que simplifica.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "(a) Em \\(x = 3\\): \\(\\frac{9 - 9}{3 - 3} = \\frac{0}{0}\\) — indefinido. A função não existe nesse ponto.",
      "(b) \\(x^2 - 9 = (x - 3)(x + 3)\\).",
      "Para \\(x \\neq 3\\): \\(f(x) = \\frac{(x-3)(x+3)}{x-3} = x + 3\\).",
      "Perto de \\(3\\), \\(f(x)\\) fica perto de \\(3 + 3 = 6\\).",
    ],
    resposta: "(a) Indefinida em \\(x = 3\\). (b) Tende a \\(6\\)",
    interpretacao:
      "A função tem um furo em \\(x = 3\\), mas a tendência existe e vale \\(6\\). É o exemplo que mostra por que limite não é \"substituir e pronto\" — e por que ele precisa ser um conceito próprio.",
    erroComum:
      "Concluir que o limite não existe só porque a função não está definida no ponto.",
  },
  {
    id: "dsf-cont-01",
    num: "DSF-08",
    title: "Que valor cola as duas partes",
    tema: "Continuidade",
    temaSlug: "continuidade",
    area: "Cálculo · continuidade",
    type: "calculo",
    level: "desafio",
    enunciado:
      "Seja \\(f(x) = x + 1\\) para \\(x < 2\\), \\(f(2) = k\\) e \\(f(x) = 3x - 3\\) para \\(x > 2\\). Qual valor de \\(k\\) torna \\(f\\) contínua em \\(x = 2\\)?",
    identificar: [
      "Continuidade exige três coisas: existir no ponto, ter limite, e os dois coincidirem.",
      "Aqui é preciso conferir os dois lados separadamente.",
    ],
    dica: "Calcule o limite pela esquerda e pela direita. Se forem iguais, \\(k\\) tem que valer isso.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Pela esquerda (\\(x < 2\\)): \\(x + 1 \\to 2 + 1 = 3\\).",
      "Pela direita (\\(x > 2\\)): \\(3x - 3 \\to 3 \\cdot 2 - 3 = 3\\).",
      "Os laterais coincidem, então o limite existe e vale \\(3\\).",
      "Para não haver salto, \\(f(2) = k = 3\\).",
    ],
    resposta: "\\(k = 3\\)",
    interpretacao:
      "Continuidade é literalmente \"desenhar sem tirar o lápis do papel\". Se os dois lados chegam em 3, o ponto tem que valer 3 — qualquer outro \\(k\\) abre um buraco visível no gráfico.",
    erroComum:
      "Conferir só um dos lados e concluir sem verificar se os dois limites laterais são iguais.",
  },
  {
    id: "dsf-deriv-01",
    num: "DSF-09",
    title: "Regra da cadeia em duas camadas",
    tema: "Derivadas",
    temaSlug: "derivadas",
    area: "Cálculo · derivação",
    type: "calculo",
    level: "desafio",
    enunciado: "Calcule a derivada de \\(f(x) = (3x^2 + 1)^4\\).",
    identificar: [
      "É uma função dentro de outra: potência por fora, polinômio por dentro.",
      "Regra da cadeia: derivada de fora vezes derivada de dentro.",
    ],
    dica:
      "Trate \\(u = 3x^2 + 1\\). Então \\(f = u^4\\) e \\(f' = 4u^3 \\cdot u'\\).",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Camada de fora: \\(\\frac{d}{du}(u^4) = 4u^3\\).",
      "Camada de dentro: \\(u = 3x^2 + 1 \\Rightarrow u' = 6x\\).",
      "\\(f'(x) = 4(3x^2 + 1)^3 \\cdot 6x\\).",
      "\\(f'(x) = 24x(3x^2 + 1)^3\\).",
    ],
    resposta: "\\(f'(x) = 24x(3x^2 + 1)^3\\)",
    interpretacao:
      "A cadeia mede como uma mudança em \\(x\\) atravessa duas etapas até chegar em \\(f\\). Esquecer o \\(u'\\) é esquecer metade do caminho.",
    erroComum:
      "Responder \\(4(3x^2 + 1)^3\\), derivando só a casca e esquecendo de multiplicar pela derivada de dentro.",
  },
  {
    id: "dsf-apder-01",
    num: "DSF-10",
    title: "A caixa de maior volume",
    tema: "Aplic. derivadas",
    temaSlug: "aplicacoes-derivadas",
    area: "Engenharia · otimização",
    type: "aplicada",
    level: "desafio",
    enunciado:
      "De uma folha quadrada de \\(12\\) cm de lado, cortam-se quadrados de lado \\(x\\) nos quatro cantos e dobram-se as abas, formando uma caixa sem tampa de volume \\(V(x) = x(12 - 2x)^2\\). Qual \\(x\\) dá o maior volume?",
    identificar: [
      "Volume máximo está onde \\(V'(x) = 0\\).",
      "O \\(x\\) precisa fazer sentido físico: \\(0 < x < 6\\).",
    ],
    dica: "Expanda antes de derivar — fica mais fácil que aplicar produto e cadeia.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "\\(V(x) = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x\\).",
      "\\(V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12)\\).",
      "\\(x^2 - 8x + 12 = 0 \\Rightarrow x = 2\\) ou \\(x = 6\\).",
      "\\(x = 6\\) zera o lado da base (\\(12 - 12 = 0\\)): não serve.",
      "Resta \\(x = 2\\): \\(V(2) = 2 \\cdot 8^2 = 128\\ \\text{cm}^3\\).",
    ],
    resposta: "\\(x = 2\\) cm, com volume máximo de \\(128\\ \\text{cm}^3\\)",
    interpretacao:
      "Derivada zero dá os candidatos; o contexto elimina os impossíveis. Cortar 6 cm faria a base sumir — a matemática apontou, mas quem descartou foi o problema real.",
    erroComum:
      "Aceitar \\(x = 6\\) como resposta por ser raiz da derivada, sem checar se faz sentido físico.",
  },
  {
    id: "dsf-int-01",
    num: "DSF-11",
    title: "Área entre duas curvas",
    tema: "Integrais",
    temaSlug: "integrais",
    area: "Cálculo · área",
    type: "calculo",
    level: "desafio",
    enunciado:
      "Calcule a área da região limitada pelas curvas \\(y = 2x\\) e \\(y = x^2\\), entre \\(x = 0\\) e \\(x = 2\\).",
    identificar: [
      "Qual das duas está por cima nesse intervalo?",
      "A área entre curvas integra a diferença (de cima menos a de baixo).",
    ],
    dica: "Teste um ponto do meio, como \\(x = 1\\), para descobrir quem está acima.",
    resolucao: "Ver passos abaixo.",
    resolucaoSteps: [
      "Em \\(x = 1\\): \\(2x = 2\\) e \\(x^2 = 1\\); a reta está acima.",
      "\\(A = \\int_0^2 (2x - x^2)\\,dx\\).",
      "\\(\\int (2x - x^2)\\,dx = x^2 - \\frac{x^3}{3}\\).",
      "\\(A = \\left(4 - \\frac{8}{3}\\right) - 0 = \\frac{12 - 8}{3} = \\frac{4}{3}\\).",
    ],
    resposta: "\\(A = \\frac{4}{3}\\) unidades de área",
    interpretacao:
      "Integrar a diferença mede a \"fatia\" entre as duas curvas. Se você inverter a ordem, o sinal fica negativo — a conta continua certa, mas área é sempre positiva.",
    erroComum:
      "Integrar \\(x^2 - 2x\\) (a de baixo menos a de cima) e responder \\(-\\frac{4}{3}\\).",
  },
];
