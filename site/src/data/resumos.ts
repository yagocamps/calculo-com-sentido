// Resumos de 1 página por módulo — revisão rápida de véspera de prova.
// `pontos` e `erros` aceitam LaTeX inline \(...\); `formulas` são LaTeX puro
// (a página renderiza em bloco). `href` aponta para a trilha do módulo.

export type Resumo = {
  slug: string;
  titulo: string;
  trilha: "Pré-Cálculo" | "Cálculo 1";
  href: string;
  tempo: string;
  intro: string;
  pontos: string[];
  formulas: string[];
  erros: string[];
};

export const resumos: Resumo[] = [
  // ════════════════ PRÉ-CÁLCULO ════════════════
  {
    slug: "fundamentos",
    titulo: "Fundamentos",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/fundamentos",
    tempo: "4 min",
    intro: "As ferramentas básicas que sustentam todo o resto: contas, frações, potências, equações e aplicações do dia a dia.",
    pontos: [
      "Ordem das operações: parênteses \\(\\to\\) potências/raízes \\(\\to \\times\\,\\div \\to +\\,-\\).",
      "Frações: somar exige MMC; multiplicar é direto; dividir é multiplicar pelo inverso.",
      "Potências: mesma base soma expoentes; raízes são potências fracionárias (\\(\\sqrt{x} = x^{1/2}\\)).",
      "Produtos notáveis e fatoração são caminhos de ida e volta.",
      "Equações: 1º grau isola a incógnita; 2º grau usa Bhaskara.",
      "Aplicações: porcentagem, juros simples, escala e energia (kWh).",
    ],
    formulas: [
      "(a+b)^2 = a^2 + 2ab + b^2",
      "a^2 - b^2 = (a-b)(a+b)",
      "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      "\\text{Energia (kWh)} = \\text{potência (kW)} \\times \\text{tempo (h)}",
    ],
    erros: [
      "Esquecer o termo \\(2ab\\) no quadrado da soma.",
      "Somar frações sem igualar os denominadores.",
      "Tirar desconto em reais em vez de porcentagem.",
    ],
  },
  {
    slug: "algebra",
    titulo: "Álgebra essencial",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/algebra",
    tempo: "3 min",
    intro: "Manipular expressões, isolar variáveis, resolver inequações e sistemas, e modelar custo, receita e lucro.",
    pontos: [
      "Só se juntam termos semelhantes (mesma parte literal).",
      "Isolar variável = desfazer operações na ordem inversa.",
      "Inequação: a desigualdade inverte ao multiplicar ou dividir por número negativo.",
      "Sistemas: substituição ou adição (eliminação).",
      "Negócios: lucro é receita menos custo; equilíbrio é onde se igualam.",
    ],
    formulas: [
      "L(x) = R(x) - C(x)",
      "\\text{equilíbrio:}\\quad R(x) = C(x)",
    ],
    erros: [
      "Distribuir errado o sinal: \\(-(a+b) = -a - b\\), não \\(-a + b\\).",
      "Não inverter a desigualdade ao dividir por negativo.",
      "Cancelar termos que não são fatores comuns.",
    ],
  },
  {
    slug: "funcoes",
    titulo: "Funções",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/funcoes",
    tempo: "4 min",
    intro: "A ideia de função como máquina entrada–saída, domínio/imagem e as famílias principais: afim, quadrática, modular, exponencial e logarítmica.",
    pontos: [
      "Função associa cada entrada \\(x\\) a uma única saída \\(f(x)\\).",
      "Domínio = entradas válidas (denominador \\(\\neq 0\\), radicando \\(\\geq 0\\)).",
      "Quadrática: vértice é o máximo ou mínimo da parábola.",
      "Exponencial cresce/decai multiplicando; log é a sua inversa.",
      "Juros compostos são crescimento exponencial.",
    ],
    formulas: [
      "x_v = -\\frac{b}{2a}",
      "\\log_b a = c \\iff b^c = a",
      "M = C\\,(1 + i)^t",
    ],
    erros: [
      "Calcular \\((-2)^2 = -4\\) (o certo é \\(4\\)).",
      "Esquecer restrições do domínio.",
      "Ler a base \\(1{,}02\\) como \\(102\\%\\) de aumento (é \\(2\\%\\)).",
    ],
  },
  {
    slug: "graficos",
    titulo: "Gráficos",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/graficos",
    tempo: "3 min",
    intro: "Ler e interpretar gráficos: pontos, crescimento, picos e vales, translações e inclinação como taxa de variação.",
    pontos: [
      "Par ordenado \\((x, y)\\): primeiro a horizontal, depois a vertical.",
      "Crescente: sobe da esquerda para a direita; decrescente: desce.",
      "Picos são máximos; vales são mínimos.",
      "Translação: somar fora move na vertical; mexer no \\(x\\) move na horizontal (ao contrário).",
      "Inclinação de uma reta = taxa de variação (semente da derivada).",
    ],
    formulas: [
      "\\text{inclinação} = \\frac{\\Delta y}{\\Delta x}",
      "f(x) + k\\ \\text{(sobe } k\\text{)};\\quad f(x - h)\\ \\text{(direita } h\\text{)}",
    ],
    erros: [
      "Inverter os eixos no par ordenado.",
      "Achar que \\((x+3)^2\\) move para a direita (move para a esquerda).",
      "Confundir o vale (mínimo) com um ponto qualquer da descida.",
    ],
  },
  {
    slug: "trigonometria",
    titulo: "Trigonometria",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/trigonometria",
    tempo: "4 min",
    intro: "Seno, cosseno e tangente no triângulo retângulo e no ciclo, a relação fundamental e aplicações em rampas, ondas e forças.",
    pontos: [
      "SOH-CAH-TOA: seno = oposto/hip, cosseno = adjacente/hip, tangente = oposto/adjacente.",
      "Ângulos notáveis: \\(\\sin 30^\\circ = \\tfrac{1}{2}\\), \\(\\cos 60^\\circ = \\tfrac{1}{2}\\).",
      "No ciclo, cosseno é a coordenada \\(x\\) e seno é a coordenada \\(y\\).",
      "Senoide: período é onde repete; amplitude é o quanto sobe/desce.",
      "Forças se decompõem em componentes com seno e cosseno.",
    ],
    formulas: [
      "\\sin\\theta = \\frac{\\text{op}}{\\text{hip}},\\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hip}},\\quad \\tan\\theta = \\frac{\\text{op}}{\\text{adj}}",
      "\\sin^2\\theta + \\cos^2\\theta = 1",
    ],
    erros: [
      "Trocar cateto oposto com adjacente.",
      "Usar seno onde a componente pede cosseno (horizontal usa cosseno).",
      "Esquecer de elevar ao quadrado na relação fundamental.",
    ],
  },
  {
    slug: "preparacao-limites",
    titulo: "Preparação para limites",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/preparacao-limites",
    tempo: "3 min",
    intro: "A rampa de entrada para o Cálculo: aproximação, tendência, tabelas, indeterminação e a ideia de instantâneo.",
    pontos: [
      "Limite é a tendência: para onde \\(f(x)\\) aponta perto de um ponto, mesmo sem chegar nele.",
      "\\(\\frac{1}{x}\\): tende a \\(0\\) no infinito; dispara perto de \\(0\\).",
      "Tabela com valores próximos estima a tendência.",
      "\\(\\frac{0}{0}\\) não é o fim — simplifique e tente de novo.",
      "Velocidade instantânea = média em intervalos cada vez menores.",
    ],
    formulas: [
      "\\text{instantânea} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t}",
    ],
    erros: [
      "Achar que \\(\\frac{0}{0}\\) significa que o limite não existe.",
      "Tirar a média de laterais diferentes.",
      "Confundir aproximar-se de um valor com atingi-lo.",
    ],
  },
  // ════════════════ CÁLCULO 1 ════════════════
  {
    slug: "funcoes-para-calculo",
    titulo: "Funções para cálculo",
    trilha: "Cálculo 1",
    href: "/calculo-1/funcoes-para-calculo",
    tempo: "3 min",
    intro: "Revisão de funções já pensando em cálculo: domínio e buracos, leitura de gráficos e taxa de variação.",
    pontos: [
      "Cálculo estuda como a saída \\(f(x)\\) muda quando a entrada \\(x\\) varia.",
      "Pontos proibidos do domínio viram buracos ou assíntotas nos limites.",
      "Zeros: onde o gráfico cruza o eixo \\(x\\) (\\(f(x) = 0\\)).",
      "Taxa de variação média prepara a ideia de derivada.",
      "Custo, receita e lucro modelam problemas reais.",
    ],
    formulas: [
      "\\text{taxa média} = \\frac{\\Delta f}{\\Delta x}",
      "L(x) = R(x) - C(x)",
    ],
    erros: [
      "Confundir \\(f\\) (valor) com \\(f'\\) (taxa).",
      "Dizer que o máximo é o \\(x\\) (o máximo é o valor \\(y\\)).",
      "Esquecer de excluir pontos onde o denominador zera.",
    ],
  },
  {
    slug: "limites",
    titulo: "Limites",
    trilha: "Cálculo 1",
    href: "/calculo-1/limites",
    tempo: "4 min",
    intro: "O coração inicial do Cálculo: tendência, substituição, indeterminações, limites laterais, infinitos e assíntotas.",
    pontos: [
      "Primeiro passo: tente substituir \\(x = a\\).",
      "Se der \\(\\frac{0}{0}\\), fatore e simplifique.",
      "Limite bilateral só existe se os laterais coincidem.",
      "Denominador \\(\\to 0\\): limite infinito (assíntota vertical).",
      "No infinito com graus iguais: razão dos coeficientes líderes (assíntota horizontal).",
    ],
    formulas: [
      "\\lim_{x \\to a} f(x) = L",
      "\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 + 4} = \\frac{3}{1} = 3",
    ],
    erros: [
      "Parar em \\(\\frac{0}{0}\\) e dizer que não existe.",
      "Tirar a média de laterais diferentes.",
      "Achar que o gráfico toca a assíntota.",
    ],
  },
  {
    slug: "continuidade",
    titulo: "Continuidade",
    trilha: "Cálculo 1",
    href: "/calculo-1/continuidade",
    tempo: "3 min",
    intro: "Quando o gráfico não tem buraco, salto nem disparo — e as três condições que garantem isso.",
    pontos: [
      "Contínua em \\(a\\): \\(f(a)\\) existe, o limite existe, e os dois são iguais.",
      "Buraco = descontinuidade removível (redefinindo o ponto, conserta).",
      "Salto = limites laterais diferentes (não conserta).",
      "Assíntota vertical = descontinuidade infinita.",
      "Polinômios são contínuos em toda parte; racionais, fora dos zeros do denominador.",
    ],
    formulas: [
      "\\text{contínua em } a \\iff \\lim_{x \\to a} f(x) = f(a)",
    ],
    erros: [
      "Lembrar só do limite e esquecer a igualdade com \\(f(a)\\).",
      "Classificar um salto como buraco removível.",
      "Achar que basta a função 'ter valor' no ponto.",
    ],
  },
  {
    slug: "derivadas",
    titulo: "Derivadas",
    trilha: "Cálculo 1",
    href: "/calculo-1/derivadas",
    tempo: "5 min",
    intro: "Taxa de variação instantânea: definição, reta tangente e as regras que evitam calcular limite toda hora.",
    pontos: [
      "Derivada = inclinação da tangente = taxa instantânea.",
      "Regra da potência é a mais usada.",
      "Soma deriva termo a termo; produto e quociente têm fórmulas próprias.",
      "Cadeia: derivada de fora vezes derivada de dentro (não esqueça o de dentro).",
      "Sinal de \\(f'\\) dá a direção; o valor, a rapidez.",
      "Física: \\(v = s'\\), \\(a = v' = s''\\). Economia: marginal é \\(C'\\), \\(R'\\).",
    ],
    formulas: [
      "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      "(x^n)' = n\\,x^{n-1}",
      "(fg)' = f'g + fg', \\quad \\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}",
      "(f(g(x)))' = f'(g(x)) \\cdot g'(x)",
    ],
    erros: [
      "Esquecer o fator da derivada interna na cadeia.",
      "Derivar produto como \\(f'g'\\).",
      "Confundir \\(f'(a) < 0\\) (decresce) com \\(f(a) < 0\\).",
    ],
  },
  {
    slug: "aplicacoes-derivadas",
    titulo: "Aplicações de derivadas",
    trilha: "Cálculo 1",
    href: "/calculo-1/aplicacoes-derivadas",
    tempo: "4 min",
    intro: "Usar a derivada para entender a forma do gráfico e resolver problemas de otimização.",
    pontos: [
      "\\(f' > 0\\): cresce; \\(f' < 0\\): decresce.",
      "Pontos críticos: \\(f'(x) = 0\\) ou \\(f'\\) não existe.",
      "Teste da 2ª derivada: \\(f'' > 0\\) mínimo, \\(f'' < 0\\) máximo.",
      "Concavidade: \\(f'' > 0\\) para cima (\\(\\cup\\)); \\(f'' < 0\\) para baixo (\\(\\cap\\)).",
      "Otimizar: modelar \\(\\to\\) derivar \\(\\to\\) testar críticos e bordas \\(\\to\\) interpretar.",
      "Lucro máximo quando receita marginal iguala custo marginal (\\(R' = C'\\)).",
    ],
    formulas: [
      "\\text{crítico: } f'(x) = 0",
      "f'' (c) > 0 \\Rightarrow \\text{mínimo}; \\quad f''(c) < 0 \\Rightarrow \\text{máximo}",
    ],
    erros: [
      "Usar o sinal de \\(f\\) em vez de \\(f'\\).",
      "Esquecer de testar as bordas do domínio.",
      "Parar no \\(x\\) ótimo sem calcular o valor pedido.",
    ],
  },
  {
    slug: "integrais",
    titulo: "Integrais",
    trilha: "Cálculo 1",
    href: "/calculo-1/integrais",
    tempo: "4 min",
    intro: "Acúmulo e área: antiderivadas, integral definida e o Teorema Fundamental que liga tudo à derivada.",
    pontos: [
      "Integral = acúmulo total = área líquida sob o gráfico.",
      "Indefinida é uma família de funções (sempre \\(+C\\)).",
      "Definida é um número (área/acúmulo em \\([a,b]\\)).",
      "TFC: achar antiderivada, avaliar nos limites e subtrair.",
      "Aplicações: distância (\\(\\int v\\)), energia (\\(\\int P\\)), área entre curvas.",
    ],
    formulas: [
      "\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
      "\\int_a^b f(x)\\,dx = F(b) - F(a)",
      "\\text{área entre curvas} = \\int_a^b (\\text{topo} - \\text{base})\\,dx",
    ],
    erros: [
      "Esquecer o \\(+C\\) na integral indefinida.",
      "Deixar \\(+C\\) na integral definida.",
      "Usar \\(\\int v\\) como distância quando \\(v\\) troca de sinal (aí use \\(\\int |v|\\)).",
    ],
  },
];
