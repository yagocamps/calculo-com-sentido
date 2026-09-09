// Resumos de 1 página por módulo — revisão rápida de véspera de prova.
// `pontos` e `erros` aceitam LaTeX inline \(...\); `formulas` são LaTeX puro
// (a página renderiza em bloco). `href` aponta para a trilha do módulo.

/** Erro comum em duas colunas: o que o aluno costuma fazer × o correto. */
export type ResumoErro = {
  faz: string;
  correto: string;
};

export type Resumo = {
  slug: string;
  titulo: string;
  trilha: "Pré-Cálculo" | "Cálculo 1";
  href: string;
  tempo: string;
  intro: string;
  pontos: string[];
  formulas: string[];
  erros: ResumoErro[];
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
      {
        faz: "Escrever \\((a+b)^2 = a^2 + b^2\\).",
        correto: "\\((a+b)^2 = a^2 + 2ab + b^2\\) — o termo \\(2ab\\) sempre aparece.",
      },
      {
        faz: "Somar frações direto: \\(\\tfrac{1}{2} + \\tfrac{1}{3} = \\tfrac{2}{5}\\).",
        correto: "Igualar denominadores antes: \\(\\tfrac{3}{6} + \\tfrac{2}{6} = \\tfrac{5}{6}\\).",
      },
      {
        faz: "Tratar \"20% de desconto\" como R$ 20 a menos.",
        correto: "Calcular sobre o preço: desconto \\(= 0{,}20 \\times\\) valor.",
      },
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
      {
        faz: "Distribuir só no primeiro termo: \\(-(a+b) = -a + b\\).",
        correto: "O sinal vale para todos: \\(-(a+b) = -a - b\\).",
      },
      {
        faz: "Manter a desigualdade: \\(-2x < 6 \\Rightarrow x < -3\\).",
        correto: "Dividir por negativo inverte: \\(-2x < 6 \\Rightarrow x > -3\\).",
      },
      {
        faz: "Cancelar parcelas: \\(\\tfrac{x+3}{3} = x + 1\\).",
        correto: "Só fatores comuns cancelam: \\(\\tfrac{3x}{3} = x\\); soma não cancela.",
      },
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
      {
        faz: "Calcular \\((-2)^2 = -4\\).",
        correto: "\\((-2)^2 = 4\\) — quadrado de negativo é positivo.",
      },
      {
        faz: "Aceitar qualquer \\(x\\) sem olhar a função.",
        correto: "Excluir denominador \\(= 0\\) e radicando \\(< 0\\) do domínio.",
      },
      {
        faz: "Ler \\(M = C(1{,}02)^t\\) como 102% de aumento.",
        correto: "Base \\(1{,}02\\) significa crescimento de \\(2\\%\\) por período.",
      },
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
      "\\text{inclinação} = m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}",
      "f(x) + k\\ \\text{(sobe } k\\text{)};\\quad f(x - h)\\ \\text{(direita } h\\text{)}",
    ],
    erros: [
      {
        faz: "Marcar \\((3, 5)\\) subindo 3 e andando 5.",
        correto: "Primeiro a horizontal (\\(x = 3\\)), depois a vertical (\\(y = 5\\)).",
      },
      {
        faz: "Achar que \\(f(x+3)\\) move o gráfico para a direita.",
        correto: "\\(f(x+3)\\) move para a esquerda; \\(f(x-3)\\) move para a direita.",
      },
      {
        faz: "Chamar qualquer ponto da descida de mínimo.",
        correto: "O mínimo é o fundo do vale — onde o gráfico para de descer e volta a subir.",
      },
    ],
  },
  {
    slug: "geometria-analitica",
    titulo: "Geometria analítica",
    trilha: "Pré-Cálculo",
    href: "/pre-calculo/geometria-analitica",
    tempo: "3 min",
    intro: "Medir no plano cartesiano: distância entre pontos, ponto médio, inclinação de retas e a equação da circunferência.",
    pontos: [
      "Distância entre dois pontos é Pitágoras no plano: \\(\\Delta x\\) e \\(\\Delta y\\) são os catetos, a distância é a hipotenusa.",
      "Ponto médio é a média das coordenadas, uma a uma — não a média de tudo junto.",
      "Coeficiente angular \\(m\\) mede quanto o \\(y\\) muda por unidade de \\(x\\); é a mesma ideia de taxa que vira derivada.",
      "Retas paralelas (não verticais) têm \\(m_1 = m_2\\); perpendiculares (não verticais) têm \\(m_1 m_2 = -1\\).",
      "Reta vertical não tem coeficiente angular definido — as duas regras acima não se aplicam a ela.",
      "Circunferência é o conjunto dos pontos a distância \\(r\\) do centro: a fórmula da distância elevada ao quadrado.",
      "Na forma padrão, os sinais do centro aparecem trocados: \\((x-h)^2\\) tem centro em \\(h = +2\\) quando se lê \\((x-2)^2\\).",
    ],
    formulas: [
      "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      "M = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)",
      "m = \\frac{y_2 - y_1}{x_2 - x_1}\\quad;\\quad y - y_0 = m(x - x_0)",
      "(x - h)^2 + (y - k)^2 = r^2",
    ],
    erros: [
      {
        faz: "Somar as coordenadas dentro da raiz: \\(d = \\sqrt{(x_2 + x_1)^2 + (y_2 + y_1)^2}\\).",
        correto: "A distância usa as diferenças: \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).",
      },
      {
        faz: "Perpendicular de \\(m = \\tfrac{1}{4}\\) é \\(-\\tfrac{1}{4}\\).",
        correto: "É o oposto do recíproco: \\(m_2 = -4\\), porque \\(\\tfrac{1}{4}\\cdot(-4) = -1\\).",
      },
      {
        faz: "Ler \\((x - 2)^2 + (y + 3)^2 = 25\\) como centro \\((-2, 3)\\) e raio \\(25\\).",
        correto: "Centro \\((2, -3)\\) e raio \\(r = \\sqrt{25} = 5\\) — os sinais invertem e o lado direito é \\(r^2\\).",
      },
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
      "Forças se decompõem em componentes: a componente adjacente ao ângulo usa cosseno; a oposta usa seno. Qual delas é a horizontal depende de onde o ângulo foi medido.",
    ],
    formulas: [
      "\\sin\\theta = \\frac{\\text{op}}{\\text{hip}},\\quad \\cos\\theta = \\frac{\\text{adj}}{\\text{hip}},\\quad \\tan\\theta = \\frac{\\text{op}}{\\text{adj}}",
      "\\sin^2\\theta + \\cos^2\\theta = 1",
      "\\theta \\text{ medido da horizontal:}\\quad F_x = F\\cos\\theta,\\ F_y = F\\sin\\theta",
      "\\theta \\text{ medido da vertical:}\\quad F_x = F\\sin\\theta,\\ F_y = F\\cos\\theta",
    ],
    erros: [
      {
        faz: "Usar o cateto adjacente no seno.",
        correto: "Seno usa o oposto: \\(\\sin\\theta = \\tfrac{\\text{op}}{\\text{hip}}\\) (SOH).",
      },
      {
        faz: "Decorar \"horizontal é cosseno, vertical é seno\" sem olhar o desenho.",
        correto: "Cosseno vai no cateto adjacente ao ângulo, seno no oposto. Com \\(\\theta\\) medido da horizontal, \\(F_x = F\\cos\\theta\\); medido da vertical, inverte.",
      },
      {
        faz: "Escrever \\(\\sin\\theta + \\cos\\theta = 1\\).",
        correto: "A relação fundamental é com quadrados: \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).",
      },
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
      {
        faz: "Ver \\(\\tfrac{0}{0}\\) e concluir que o limite não existe.",
        correto: "\\(\\tfrac{0}{0}\\) é indeterminação: simplifique e tente de novo. Em \\(\\tfrac{x^2-1}{x-1}\\) perto de \\(1\\), o limite é \\(2\\).",
      },
      {
        faz: "Tirar a média quando cada lado aponta para um valor.",
        correto: "Laterais diferentes \\(\\Rightarrow\\) a tendência bilateral não existe.",
      },
      {
        faz: "Confundir \"aproximar-se de 2\" com \"valer 2\".",
        correto: "Tendência descreve para onde aponta — a função nem precisa estar definida no ponto.",
      },
    ],
  },
  // ════════════════ CÁLCULO 1 ════════════════
  {
    slug: "antes-do-calculo",
    titulo: "Antes do Cálculo",
    trilha: "Cálculo 1",
    href: "/calculo-1/antes-do-calculo",
    tempo: "3 min",
    intro:
      "O módulo que não tem conta, mas evita reprovação: o que Cálculo 1 realmente pede, por que tanta gente trava e como estudar sem se afogar no primeiro mês.",
    pontos: [
      "Cálculo 1 estuda mudança: como uma grandeza varia e quanto ela acumula.",
      "O arco inteiro da matéria é um só: função \\(\\to\\) limite \\(\\to\\) derivada \\(\\to\\) integral.",
      "A reprovação raramente vem do Cálculo em si — vem da base de Pré-Cálculo (frações, potências, fatoração, funções).",
      "Derivada responde \"com que velocidade muda?\"; integral responde \"quanto acumulou?\".",
      "Pré-requisitos reais: manipular expressões, resolver equações, ler gráficos e entender função como relação entre grandezas.",
      "Estudar Cálculo é praticar, não reler: sem exercício resolvido por conta própria, a leitura dá falsa sensação de domínio.",
      "Acompanhar a turma vale mais que estudar muito na véspera — a matéria é cumulativa.",
    ],
    formulas: [
      "\\text{função} \\to \\text{limite} \\to \\text{derivada} \\to \\text{integral}",
      "\\text{derivada} = \\text{taxa de variação instantânea}",
      "\\text{integral} = \\text{acúmulo ao longo de um intervalo}",
    ],
    erros: [
      {
        faz: "Pular o Pré-Cálculo por achar que \"isso é do ensino médio\".",
        correto:
          "Checar a base antes: quase todo erro em prova de Cálculo é erro de álgebra, não de limite ou derivada.",
      },
      {
        faz: "Estudar lendo a matéria várias vezes.",
        correto:
          "Resolver exercício sem olhar a resolução, errar, e só então conferir — é o erro que mostra o que faltou.",
      },
      {
        faz: "Deixar acumular para a semana da prova.",
        correto:
          "Manter ritmo semanal: cada tópico novo usa o anterior, então atraso vira bola de neve.",
      },
    ],
  },
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
      {
        faz: "Tratar \\(f(a) < 0\\) como \"função caindo\".",
        correto: "Sinal de \\(f\\) é altura; quem diz se sobe ou desce é a taxa \\(f'\\).",
      },
      {
        faz: "Responder o máximo com o valor de \\(x\\).",
        correto: "O máximo é o valor \\(y = f(x)\\); o \\(x\\) é onde ele acontece.",
      },
      {
        faz: "Aceitar \\(x\\) que zera o denominador.",
        correto: "Excluir do domínio os pontos onde o denominador é zero.",
      },
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
      "Denominador \\(\\to 0\\) não conclui nada sozinho: olhe também o numerador. Se ele não tende a zero, o limite é infinito (assíntota vertical); se tende a zero, é \\(\\frac{0}{0}\\) — fatore e simplifique, e o limite pode ser finito.",
      "Se depois de simplificar os laterais discordarem em sinal, o limite bilateral não existe.",
      "No infinito com graus iguais: razão dos coeficientes líderes (assíntota horizontal).",
    ],
    formulas: [
      "\\lim_{x \\to a} f(x) = L",
      "\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = \\lim_{x \\to 1} (x + 1) = 2",
      "\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 + 4} = \\frac{3}{1} = 3",
    ],
    erros: [
      {
        faz: "Parar em \\(\\tfrac{0}{0}\\) e responder \"não existe\".",
        correto: "Fatorar, simplificar e substituir de novo.",
      },
      {
        faz: "Tirar a média de laterais diferentes.",
        correto: "Se \\(\\lim_{x \\to a^-} \\neq \\lim_{x \\to a^+}\\), o limite não existe.",
      },
      {
        faz: "Ver denominador \\(\\to 0\\) e responder \"infinito\" na hora.",
        correto: "Cheque o numerador: se ele também vai a zero, é \\(\\tfrac{0}{0}\\) e o limite pode ser finito.",
      },
      {
        faz: "Achar que o gráfico nunca pode cruzar a assíntota.",
        correto: "Assíntota é comportamento de aproximação, não barreira: \\(f(x) = \\tfrac{x}{x^2+1}\\) tem assíntota horizontal \\(y = 0\\) e passa por \\((0,0)\\).",
      },
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
      {
        faz: "Checar só se o limite existe.",
        correto: "São três condições: \\(f(a)\\) existe, o limite existe e \\(\\lim = f(a)\\).",
      },
      {
        faz: "Classificar um salto como buraco removível.",
        correto: "Salto tem laterais diferentes — redefinir o ponto não conserta.",
      },
      {
        faz: "Achar que basta a função \"ter valor\" no ponto.",
        correto: "O valor precisa coincidir com o limite no ponto.",
      },
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
      {
        faz: "Derivar \\(f(g(x))\\) e esquecer o \"de dentro\".",
        correto: "Cadeia completa: \\(f'(g(x)) \\cdot g'(x)\\).",
      },
      {
        faz: "Derivar produto como \\((fg)' = f'g'\\).",
        correto: "\\((fg)' = f'g + fg'\\) — cada fator deriva uma vez.",
      },
      {
        faz: "Confundir \\(f'(a) < 0\\) com \\(f(a) < 0\\).",
        correto: "\\(f' < 0\\): a função desce; \\(f < 0\\): o valor é negativo. São coisas diferentes.",
      },
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
      "Teste da 2ª derivada (só em crítico com \\(f'(c) = 0\\)): \\(f''(c) > 0\\) é mínimo local; \\(f''(c) < 0\\) é máximo local; \\(f''(c) = 0\\) é inconclusivo — volte ao sinal de \\(f'\\).",
      "Concavidade: \\(f'' > 0\\) para cima (\\(\\cup\\)); \\(f'' < 0\\) para baixo (\\(\\cap\\)).",
      "Otimizar: modelar \\(\\to\\) derivar \\(\\to\\) testar críticos e bordas \\(\\to\\) interpretar.",
      "\\(R' = C'\\) dá \\(L' = 0\\): é candidato a lucro máximo, não garantia. Confirme com o sinal de \\(L'\\), com \\(L''\\) ou comparando com as bordas do domínio.",
    ],
    formulas: [
      "\\text{crítico: } f'(x) = 0",
      "f'(c) = 0 \\text{ e } f''(c) > 0 \\Rightarrow \\text{mínimo local}",
      "f'(c) = 0 \\text{ e } f''(c) < 0 \\Rightarrow \\text{máximo local}",
      "L = R - C \\Rightarrow (R' = C' \\iff L' = 0)",
    ],
    erros: [
      {
        faz: "Analisar crescimento pelo sinal de \\(f\\).",
        correto: "Crescimento vem do sinal de \\(f'\\): positivo sobe, negativo desce.",
      },
      {
        faz: "Otimizar testando só os pontos críticos.",
        correto: "Testar também as bordas do domínio — o ótimo pode estar nelas.",
      },
      {
        faz: "Parar no \\(x\\) ótimo.",
        correto: "Substituir o \\(x\\) e responder o valor pedido (lucro, área, volume).",
      },
      {
        faz: "Usar \\(f''(c) > 0\\) para concluir mínimo sem checar se \\(f'(c) = 0\\).",
        correto: "O teste da 2ª derivada só classifica ponto crítico. Sem \\(f'(c) = 0\\), o sinal de \\(f''\\) só informa concavidade.",
      },
      {
        faz: "Tratar \\(R' = C'\\) como prova de lucro máximo.",
        correto: "É só \\(L' = 0\\): pode ser mínimo ou inflexão. Verifique \\(L''\\), o sinal de \\(L'\\) ou as bordas.",
      },
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
      {
        faz: "Escrever \\(\\int x^2\\,dx = \\tfrac{x^3}{3}\\).",
        correto: "Indefinida sempre com a constante: \\(\\tfrac{x^3}{3} + C\\).",
      },
      {
        faz: "Carregar o \\(+C\\) na integral definida.",
        correto: "Na definida o \\(C\\) cancela: o resultado é \\(F(b) - F(a)\\).",
      },
      {
        faz: "Usar \\(\\int v\\) como distância quando \\(v\\) troca de sinal.",
        correto: "Distância total usa \\(\\int |v|\\); \\(\\int v\\) dá o deslocamento líquido.",
      },
    ],
  },
];
