import type { AulaDemonstracao } from "@/data/aulas/types";

export const demonstracoes: Record<string, AulaDemonstracao[]> = {
  "pre-calculo/fundamentos/fracoes": [
    {
      title: "Divisão de frações",
      intro: "Dividir por uma fração é perguntar quantas vezes o segundo pedaço cabe no primeiro.",
      steps: [
        {
          title: "Inverter a segunda fração",
          detail: "Mantemos a primeira fração e multiplicamos pelo inverso da segunda: \\(\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}\\).",
          formula: "\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\times\\frac{d}{c}",
          formulaAria: "a sobre b dividido por c sobre d é a sobre b vezes d sobre c",
        },
        {
          title: "Multiplicar e manter as restrições",
          detail: "Multiplicamos os termos correspondentes, lembrando que os denominadores não podem ser zero.",
          formula: "\\frac{a}{b}\\times\\frac{d}{c}=\\frac{ad}{bc},\\qquad b,c,d\\neq0",
          formulaAria: "a sobre b vezes d sobre c é ad sobre bc, com os denominadores diferentes de zero",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/potenciacao": [
    {
      title: "Propriedades da potenciação",
      intro: "As regras das potências vêm de contar quantas vezes a mesma base aparece.",
      steps: [
        {
          title: "Produto e quociente",
          detail: "Ao juntar fatores de mesma base, somamos expoentes; ao dividir, cancelamos fatores e subtraímos expoentes.",
          formula: "a^m\\cdot a^n=a^{m+n},\\qquad\\frac{a^m}{a^n}=a^{m-n}",
          formulaAria: "produto soma os expoentes e quociente subtrai os expoentes",
        },
        {
          title: "Potência de potência",
          detail: "Uma potência de potência repete o grupo inteiro; por isso multiplicamos os expoentes.",
          formula: "(a^m)^n=a^{mn}",
          formulaAria: "a elevado a m elevado a n é a elevado a m vezes n",
        },
        {
          title: "Expoentes especiais",
          detail: "O expoente zero representa uma divisão da potência por ela mesma; o negativo representa o inverso.",
          formula: "a^0=1,\\qquad a^{-n}=\\frac1{a^n}",
          formulaAria: "a elevado a zero é um e a elevado a menos n é um sobre a elevado a n",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/radiciacao": [
    {
      title: "Relação entre radiciação e potenciação",
      intro: "A raiz desfaz a potência e pode ser escrita como uma potência de expoente fracionário.",
      steps: [
        {
          title: "Escrever a raiz como potência",
          detail: "A raiz de índice \\(n\\) equivale a elevar a \\(\\frac1n\\).",
          formula: "\\sqrt[n]{a}=a^{\\frac1n}",
          formulaAria: "raiz n-ésima de a é a elevado a um sobre n",
        },
        {
          title: "Combinar os expoentes",
          detail: "Quando há uma potência dentro da raiz, os expoentes se multiplicam.",
          formula: "\\sqrt[n]{a^m}=(a^m)^{1/n}=a^{m/n}",
          formulaAria: "raiz n-ésima de a elevado a m é a elevado a m sobre n",
        },
        {
          title: "Desfazer a operação",
          detail: "Elevar ao índice e extrair a raiz são operações inversas, respeitando o domínio.",
          formula: "\\left(\\sqrt[n]{a}\\right)^n=a",
          formulaAria: "a raiz n-ésima de a elevada a n é a",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/produtos-notaveis": [
    {
      title: "Quadrado da soma",
      intro: "O termo do meio aparece duas vezes porque há dois produtos cruzados iguais.",
      steps: [
        {
          title: "Abrir o quadrado",
          detail: "\\((a+b)^2\\) é o produto \\((a+b)(a+b)\\).",
          formula: "(a+b)^2=(a+b)(a+b)",
          formulaAria: "a mais b ao quadrado é a mais b vezes a mais b",
        },
        {
          title: "Distribuir e juntar",
          detail: "Distribuindo, aparecem \\(ab\\) duas vezes.",
          formula: "(a+b)^2=a^2+ab+ab+b^2=a^2+2ab+b^2",
          formulaAria: "a mais b ao quadrado é a ao quadrado mais dois a b mais b ao quadrado",
        },
      ],
    },
    {
      title: "Quadrado da diferença",
      intro: "Os produtos cruzados ficam negativos, enquanto o quadrado de b continua positivo.",
      steps: [
        {
          title: "Escrever como produto",
          detail: "\\((a-b)^2=(a-b)(a-b)\\).",
          formula: "(a-b)^2=(a-b)(a-b)",
          formulaAria: "a menos b ao quadrado é a menos b vezes a menos b",
        },
        {
          title: "Distribuir os sinais",
          detail: "Os dois produtos cruzados são \\(-ab\\).",
          formula: "(a-b)^2=a^2-ab-ab+b^2=a^2-2ab+b^2",
          formulaAria: "a menos b ao quadrado é a ao quadrado menos dois a b mais b ao quadrado",
        },
      ],
    },
    {
      title: "Produto da soma pela diferença",
      intro: "Os produtos cruzados têm sinais opostos e se cancelam.",
      steps: [
        {
          title: "Distribuir",
          detail: "Multiplicamos cada termo do primeiro binômio por cada termo do segundo.",
          formula: "(a+b)(a-b)=a^2-ab+ab-b^2",
          formulaAria: "a mais b vezes a menos b",
        },
        {
          title: "Cancelar os opostos",
          detail: "Como \\(-ab+ab=0\\), restam apenas os quadrados.",
          formula: "(a+b)(a-b)=a^2-b^2",
          formulaAria: "a mais b vezes a menos b é a ao quadrado menos b ao quadrado",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/fatoracao": [
    {
      title: "Fatoração algébrica",
      intro: "Fatorar é fazer o caminho inverso da distributiva: transformar uma soma em produto.",
      steps: [
        {
          title: "Encontrar o fator comum",
          detail: "Em \\(ax+ay\\), o fator \\(a\\) aparece nos dois termos.",
          formula: "ax+ay",
          formulaAria: "a x mais a y",
        },
        {
          title: "Colocar em evidência",
          detail: "Retiramos \\(a\\) e deixamos dentro do parêntese o que sobra.",
          formula: "ax+ay=a(x+y)",
          formulaAria: "a x mais a y é a vezes x mais y",
        },
        {
          title: "Conferir",
          detail: "Distribuir de volta recupera a expressão original.",
          formula: "a(x+y)=ax+ay",
          formulaAria: "a vezes x mais y é a x mais a y",
        },
      ],
    },
    {
      title: "Diferença de quadrados",
      intro: "A diferença de dois quadrados é um caso de fatoração que vira soma vezes diferença.",
      steps: [
        {
          title: "Reconhecer o padrão",
          detail: "Procure dois quadrados perfeitos subtraídos.",
          formula: "a^2-b^2",
          formulaAria: "a ao quadrado menos b ao quadrado",
        },
        {
          title: "Fatorar",
          detail: "Aplicamos a identidade do produto da soma pela diferença.",
          formula: "a^2-b^2=(a+b)(a-b)",
          formulaAria: "a ao quadrado menos b ao quadrado é a mais b vezes a menos b",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/equacao-primeiro-grau": [
    {
      title: "Princípio da equivalência em equações",
      intro: "Uma igualdade permanece verdadeira quando fazemos a mesma operação nos dois membros.",
      steps: [
        {
          title: "Somar o mesmo valor",
          detail: "Se \\(A=B\\), somar \\(k\\) dos dois lados mantém o equilíbrio.",
          formula: "A=B\\Longrightarrow A+k=B+k",
          formulaAria: "a igual a b implica a mais k igual a b mais k",
        },
        {
          title: "Multiplicar ou dividir",
          detail: "Multiplicar é sempre permitido; dividir exige \\(k\\neq0\\).",
          formula: "A=B\\Longrightarrow kA=kB,\\qquad\\frac Ak=\\frac Bk\\;(k\\neq0)",
          formulaAria: "a igual a b permite multiplicar por k e dividir por k diferente de zero",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/escalas-medidas": [
    {
      title: "Fórmula da escala",
      intro: "Escala é a razão entre uma medida no desenho e a medida real, na mesma unidade.",
      steps: [
        {
          title: "Montar a razão",
          detail: "Comparamos o desenho \\(d\\) com a medida real \\(D\\).",
          formula: "E=\\frac dD",
          formulaAria: "escala é distância do desenho sobre distância real",
        },
        {
          title: "Resolver uma escala 1:n",
          detail: "Se uma unidade do desenho representa \\(n\\) unidades reais, multiplicamos por \\(n\\).",
          formula: "E=\\frac1n\\Longrightarrow D=n\\cdot d",
          formulaAria: "escala um sobre n implica distância real igual a n vezes a desenhada",
        },
      ],
    },
  ],
  "pre-calculo/fundamentos/consumo-energia": [
    {
      title: "Relação entre potência, energia e tempo",
      intro: "Potência é a rapidez do consumo; energia é o total acumulado no tempo.",
      steps: [
        {
          title: "Partir da definição",
          detail: "Potência é energia dividida pelo tempo.",
          formula: "P=\\frac Et",
          formulaAria: "potência é energia sobre tempo",
        },
        {
          title: "Isolar a energia",
          detail: "Multiplicando por \\(t\\), encontramos a energia.",
          formula: "E=P\\cdot t",
          formulaAria: "energia é potência vezes tempo",
        },
        {
          title: "Conferir as unidades",
          detail: "Quilowatts vezes horas produzem quilowatt-hora.",
          formula: "1\\;\\mathrm{kW}\\cdot1\\;\\mathrm h=1\\;\\mathrm{kWh}",
          formulaAria: "um quilowatt vezes uma hora é um quilowatt-hora",
        },
      ],
    },
  ],
  "pre-calculo/algebra/expressoes-algebricas": [
    {
      title: "Propriedade distributiva",
      intro: "Distribuir é multiplicar o fator de fora por todos os termos do parêntese.",
      steps: [
        {
          title: "Multiplicar cada termo",
          detail: "O fator \\(a\\) não escolhe apenas o primeiro termo; ele alcança \\(b\\) e \\(c\\).",
          formula: "a(b+c)=ab+ac",
          formulaAria: "a vezes b mais c é a b mais a c",
        },
        {
          title: "Aplicar com subtração",
          detail: "O sinal do termo também é distribuído.",
          formula: "a(b-c)=ab-ac",
          formulaAria: "a vezes b menos c é a b menos a c",
        },
      ],
    },
  ],
  "pre-calculo/algebra/isolamento-variaveis": [
    {
      title: "Isolamento de variáveis",
      intro: "Isolar é desfazer as operações que acompanham a variável, sempre nos dois lados.",
      steps: [
        {
          title: "Desfazer a soma",
          detail: "Em \\(ax+b=c\\), subtraímos \\(b\\).",
          formula: "ax+b=c\\Longrightarrow ax=c-b",
          formulaAria: "a x mais b igual a c implica a x igual a c menos b",
        },
        {
          title: "Desfazer a multiplicação",
          detail: "Depois dividimos por \\(a\\), com \\(a\\neq0\\).",
          formula: "ax=c-b\\Longrightarrow x=\\frac{c-b}{a}",
          formulaAria: "a x igual a c menos b implica x igual a c menos b sobre a",
        },
      ],
    },
  ],
  "pre-calculo/algebra/inequacoes": [
    {
      title: "Inversão do sinal em inequações",
      intro: "Multiplicar ou dividir por um número negativo reflete a ordem na reta numérica.",
      steps: [
        {
          title: "Refletir os dois lados",
          detail: "Ao multiplicar uma desigualdade por \\(-1\\), os pontos trocam de lado.",
          formula: "a<b\\Longrightarrow -a>-b",
          formulaAria: "a menor que b implica menos a maior que menos b",
        },
        {
          title: "Aplicar ao isolamento",
          detail: "Ao dividir por \\(-3\\), o sinal precisa virar.",
          formula: "-3x\\geq12\\Longrightarrow x\\leq-4",
          formulaAria: "menos três x maior ou igual a doze implica x menor ou igual a menos quatro",
        },
      ],
    },
  ],
  "pre-calculo/algebra/sistemas-equacoes": [
    {
      title: "Método da eliminação em sistemas lineares",
      intro: "Somamos equações para cancelar uma variável e resolver a outra.",
      steps: [
        {
          title: "Escolher termos opostos",
          detail: "No sistema, \\(+y\\) e \\(-y\\) já se anulam ao somar.",
          formula: "\\begin{cases}x+y=7\\\\x-y=1\\end{cases}",
          formulaAria: "sistema x mais y igual a sete e x menos y igual a um",
        },
        {
          title: "Somar e substituir",
          detail: "A soma dá \\(2x=8\\), então \\(x=4\\); substituindo, \\(y=3\\).",
          formula: "(x+y)+(x-y)=8\\Longrightarrow 2x=8\\Longrightarrow(x,y)=(4,3)",
          formulaAria: "a soma dá dois x igual a oito e a solução é quatro e três",
        },
      ],
    },
  ],
  "pre-calculo/algebra/simplificacao": [
    {
      title: "Cancelamento de fatores em expressões algébricas",
      intro: "Só podemos cancelar fatores comuns, nunca termos somados, e devemos preservar as restrições.",
      steps: [
        {
          title: "Fatorar o numerador",
          detail: "A diferença de quadrados revela o fator comum.",
          formula: "\\frac{x^2-9}{x-3}=\\frac{(x-3)(x+3)}{x-3}",
          formulaAria: "x ao quadrado menos nove sobre x menos três",
        },
        {
          title: "Cancelar e lembrar a restrição",
          detail: "Cancelamos \\(x-3\\), mas a expressão original continua proibida em \\(x=3\\).",
          formula: "\\frac{(x-3)(x+3)}{x-3}=x+3,\\qquad x\\neq3",
          formulaAria: "o resultado é x mais três, com x diferente de três",
        },
      ],
    },
  ],
  "pre-calculo/funcoes/funcao-afim": [
    { title: "Coeficiente angular da reta",
    intro: "O coeficiente angular mede quanto y varia quando x avança.",
    steps: [
      {
        title: "Escolher dois pontos",
        detail: "Considere \\(P_1=(x_1,y_1)\\) e \\(P_2=(x_2,y_2)\\), com \\(x_2\\neq x_1\\).",
        formula: "P_1=(x_1,y_1),\\qquad P_2=(x_2,y_2)",
        formulaAria: "primeiro ponto e segundo ponto",
      },
      {
        title: "Comparar as variações",
        detail: "A inclinação é a variação vertical dividida pela horizontal.",
        formula: "m=\\frac{\\Delta y}{\\Delta x}=\\frac{y_2-y_1}{x_2-x_1}",
        formulaAria: "m é delta y sobre delta x",
      },
      {
        title: "Interpretar o sinal",
        detail: "\\(m>0\\) indica reta crescente; \\(m<0\\), decrescente.",
        formula: "m>0\\Rightarrow\\text{sobe},\\qquad m<0\\Rightarrow\\text{desce}",
        formulaAria: "m positivo sobe e m negativo desce",
      },
    ],
  },
    { title: "Equação da reta \\(y=mx+b\\)",
    intro: "A forma reduzida separa a inclinação da reta do ponto onde ela cruza o eixo y.",
    steps: [
      {
        title: "Partir da forma ponto-inclinação",
        detail: "Para um ponto \\((x_0,y_0)\\), escrevemos a variação vertical em função da horizontal.",
        formula: "y-y_0=m(x-x_0)",
        formulaAria: "y menos y zero é m vezes x menos x zero",
      },
      {
        title: "Distribuir e isolar y",
        detail: "Abrindo o parêntese, a parte constante se reúne em \\(b=y_0-mx_0\\).",
        formula: "y=mx+y_0-mx_0=mx+b",
        formulaAria: "y é m x mais b",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-quadratica": [
    { title: "Fórmula do x do vértice da parábola",
    intro: "O vértice está no eixo de simetria, exatamente no meio das duas raízes.",
    steps: [
      {
        title: "Usar o ponto médio",
        detail: "Se existem duas raízes, o eixo de simetria fica no ponto médio delas.",
        formula: "x_v=\\frac{x_1+x_2}{2}",
        formulaAria: "x do vértice é a soma das raízes sobre dois",
      },
      {
        title: "Usar a soma das raízes",
        detail: "Para \\(ax^2+bx+c=0\\), a soma das raízes é \\(-\\frac ba\\).",
        formula: "x_1+x_2=-\\frac ba",
        formulaAria: "a soma das raízes é menos b sobre a",
      },
      {
        title: "Concluir",
        detail: "Dividindo por 2, obtemos a coordenada horizontal do vértice.",
        formula: "x_v=-\\frac{b}{2a}",
        formulaAria: "x do vértice é menos b sobre dois a",
      },
    ],
  },
    { title: "Fórmula do y do vértice da parábola",
    intro: "A coordenada y é o valor da função no x do vértice.",
    steps: [
      {
        title: "Substituir",
        detail: "Colocamos \\(x_v=-\\frac{b}{2a}\\) em \\(f(x)=ax^2+bx+c\\).",
        formula: "y_v=f(x_v)=a\\left(-\\frac{b}{2a}\\right)^2+b\\left(-\\frac{b}{2a}\\right)+c",
        formulaAria: "y do vértice é f de x do vértice",
      },
      {
        title: "Simplificar",
        detail: "Colocando os termos no mesmo denominador, aparece o discriminante.",
        formula: "y_v=\\frac{4ac-b^2}{4a}=-\\frac{\\Delta}{4a}",
        formulaAria: "y do vértice é menos delta sobre quatro a",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-modular": [
    { title: "Definição de módulo",
    intro: "O módulo representa a distância de um número até zero, portanto nunca é negativo.",
    steps: [
      {
        title: "Definir por partes",
        detail: "Para números positivos, mantemos o valor; para negativos, trocamos o sinal.",
        formula: "|x|=\\begin{cases}x,&x\\geq0\\\\-x,&x<0\\end{cases}",
        formulaAria: "módulo de x é x se x é maior ou igual a zero e menos x se x é menor que zero",
      },
      {
        title: "Interpretar como distância",
        detail: "Números opostos ficam à mesma distância da origem.",
        formula: "|5|=|-5|=5",
        formulaAria: "módulo de cinco e menos cinco é cinco",
      },
    ],
  },
    { title: "Reflexão do gráfico pela função módulo",
    intro: "Aplicar módulo aos valores de y reflete para cima a parte que estava abaixo do eixo x.",
    steps: [
      {
        title: "Transformar cada ponto",
        detail: "Um ponto \\((x,y)\\) de \\(f\\) vira \\((x,|y|)\\).",
        formula: "(x,y)\\longmapsto(x,|y|)",
        formulaAria: "o ponto x y vai para x módulo de y",
      },
      {
        title: "Refletir valores negativos",
        detail: "Quando \\(f(x)<0\\), o módulo troca \\(y\\) por \\(-y\\).",
        formula: "f(x)<0\\Longrightarrow|f(x)|=-f(x)",
        formulaAria: "se f de x é negativo, módulo de f de x é menos f de x",
      },
      {
        title: "Concluir",
        detail: "Por isso o gráfico final fica sempre sobre ou no eixo x.",
        formula: "|f(x)|\\geq0",
        formulaAria: "módulo de f de x é maior ou igual a zero",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-exponencial": [
    { title: "Crescimento exponencial",
    intro: "O crescimento exponencial repete uma multiplicação pelo mesmo fator em cada período.",
    steps: [
      {
        title: "Aplicar o fator uma vez",
        detail: "Um valor inicial \\(P_0\\), multiplicado por \\(r\\), vira \\(P_1\\).",
        formula: "P_1=P_0r",
        formulaAria: "p um é p zero vezes r",
      },
      {
        title: "Repetir a multiplicação",
        detail: "Após dois períodos, o fator aparece duas vezes; após n, aparece n vezes.",
        formula: "P_n=P_0\\underbrace{r\\cdot r\\cdots r}_{n\\text{ fatores}}",
        formulaAria: "p n é p zero vezes r repetido n vezes",
      },
      {
        title: "Escrever a potência",
        detail: "A repetição se resume em uma potência; \\(r>1\\) produz crescimento.",
        formula: "P_n=P_0r^n",
        formulaAria: "p n é p zero vezes r elevado a n",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-logaritmica": [
    { title: "Definição de logaritmo",
    intro: "Logaritmo responde qual expoente transforma uma base em determinado resultado.",
    steps: [
      {
        title: "Partir da potência",
        detail: "Começamos com \\(a^y=x\\), respeitando as restrições da base.",
        formula: "a^y=x,\\qquad a>0,\\quad a\\neq1",
        formulaAria: "a elevado a y é x",
      },
      {
        title: "Perguntar pelo expoente",
        detail: "O logaritmo é o nome dado ao expoente \\(y\\).",
        formula: "\\log_a(x)=y\\Longleftrightarrow a^y=x",
        formulaAria: "logaritmo de x na base a é y se e somente se a elevado a y é x",
      },
    ],
  },
    { title: "Propriedades dos logaritmos",
    intro: "As propriedades dos logaritmos são as propriedades dos expoentes traduzidas para outra linguagem.",
    steps: [
      {
        title: "Produto",
        detail: "Como expoentes somam no produto, logaritmos de produtos somam.",
        formula: "\\log_a(xy)=\\log_a x+\\log_a y",
        formulaAria: "logaritmo de x y é a soma dos logaritmos",
      },
      {
        title: "Quociente",
        detail: "Como expoentes subtraem na divisão, logaritmos de quocientes subtraem.",
        formula: "\\log_a\\left(\\frac{x}{y}\\right)=\\log_a x-\\log_a y",
        formulaAria: "logaritmo de x sobre y é a diferença dos logaritmos",
      },
      {
        title: "Potência",
        detail: "O expoente que está fora pode ser colocado como fator.",
        formula: "\\log_a(x^k)=k\\log_a x",
        formulaAria: "logaritmo de x elevado a k é k vezes logaritmo de x",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/juros-compostos": [
    { title: "Fórmula dos juros compostos",
    intro: "Cada período multiplica o saldo anterior por um fator que inclui a taxa.",
    steps: [
      {
        title: "Calcular o primeiro período",
        detail: "O capital cresce pelo capital mais os juros.",
        formula: "C_1=C_0+C_0i=C_0(1+i)",
        formulaAria: "c um é c zero vezes um mais i",
      },
      {
        title: "Repetir o fator",
        detail: "No período seguinte, o mesmo fator incide sobre o saldo já aumentado.",
        formula: "C_2=C_0(1+i)^2",
        formulaAria: "c dois é c zero vezes um mais i ao quadrado",
      },
      {
        title: "Generalizar",
        detail: "Após \\(n\\) períodos, o fator aparece \\(n\\) vezes.",
        formula: "C_n=C_0(1+i)^n",
        formulaAria: "c n é c zero vezes um mais i elevado a n",
      },
    ],
  },
  ],
  "pre-calculo/graficos/translacao-graficos": [
    { title: "Translação vertical de gráficos",
    intro: "Somar uma constante às saídas move todos os pontos para cima ou para baixo.",
    steps: [
      {
        title: "Alterar y",
        detail: "Se \\(g(x)=f(x)+k\\), cada valor de y recebe o mesmo \\(k\\).",
        formula: "g(x)=f(x)+k",
        formulaAria: "g de x é f de x mais k",
      },
      {
        title: "Acompanhar um ponto",
        detail: "Um ponto \\((x,y)\\) vira \\((x,y+k)\\).",
        formula: "(x,y)\\longmapsto(x,y+k)",
        formulaAria: "o ponto x y vai para x y mais k",
      },
      {
        title: "Ler o sinal",
        detail: "\\(k>0\\) sobe; \\(k<0\\) desce; a forma permanece igual.",
        formula: "k>0\\Rightarrow\\text{sobe},\\qquad k<0\\Rightarrow\\text{desce}",
        formulaAria: "k positivo sobe e k negativo desce",
      },
    ],
  },
    { title: "Translação horizontal de gráficos",
    intro: "Alterar a entrada da função move o gráfico na horizontal.",
    steps: [
      {
        title: "Trocar a entrada",
        detail: "Em \\(g(x)=f(x-h)\\), usamos o valor antigo em \\(x-h\\).",
        formula: "g(x)=f(x-h)",
        formulaAria: "g de x é f de x menos h",
      },
      {
        title: "Acompanhar um ponto",
        detail: "Um ponto \\((u,y)\\) de \\(f\\) vira \\((u+h,y)\\) em \\(g\\).",
        formula: "(u,y)\\longmapsto(u+h,y)",
        formulaAria: "o ponto u y vai para u mais h y",
      },
      {
        title: "Lembrar o sinal",
        detail: "O \\(x-h\\) desloca para a direita quando \\(h>0\\).",
        formula: "h>0\\Rightarrow\\text{direita}",
        formulaAria: "h positivo desloca para a direita",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/seno": [
    { title: "Razões trigonométricas por semelhança de triângulos",
    intro: "Triângulos semelhantes preservam as razões entre lados correspondentes.",
    steps: [
      {
        title: "Comparar lados",
        detail: "Triângulos com o mesmo ângulo têm a mesma razão entre oposto e hipotenusa.",
        formula: "\\frac{o_1}{h_1}=\\frac{o_2}{h_2}",
        formulaAria: "oposto um sobre hipotenusa um é igual a oposto dois sobre hipotenusa dois",
      },
      {
        title: "Dar nome à razão",
        detail: "Essa razão constante é o seno do ângulo.",
        formula: "\\sin(\\theta)=\\frac{\\text{cateto oposto}}{\\text{hipotenusa}}",
        formulaAria: "seno de teta é cateto oposto sobre hipotenusa",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/tangente": [
    { title: "Relação \\(\\tan x=\\frac{\\sin x}{\\cos x}\\)",
    intro: "A tangente surge ao dividir seno por cosseno no mesmo triângulo.",
    steps: [
      {
        title: "Escrever seno e cosseno",
        detail: "Usamos \\(\\sin x=\\frac oh\\) e \\(\\cos x=\\frac ah\\).",
        formula: "\\sin x=\\frac oh,\\qquad\\cos x=\\frac ah",
        formulaAria: "seno é o sobre h e cosseno é a sobre h",
      },
      {
        title: "Dividir as frações",
        detail: "A hipotenusa cancela e sobra oposto sobre adjacente.",
        formula: "\\frac{\\sin x}{\\cos x}=\\frac{o/h}{a/h}=\\frac oa",
        formulaAria: "seno sobre cosseno é o sobre a",
      },
      {
        title: "Reconhecer a tangente",
        detail: "Oposto sobre adjacente é a definição da tangente.",
        formula: "\\tan x=\\frac{\\sin x}{\\cos x}",
        formulaAria: "tangente é seno sobre cosseno",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/ciclo-trigonometrico": [
    { title: "Valores trigonométricos de 30°, 45° e 60°",
    intro: "Os valores notáveis vêm dos triângulos especiais 45-45-90 e 30-60-90.",
    steps: [
      {
        title: "Caso de 45°",
        detail: "Com catetos 1 e hipotenusa \\(\\sqrt2\\), as duas razões são iguais.",
        formula: "\\sin45^\\circ=\\cos45^\\circ=\\frac{\\sqrt2}{2}",
        formulaAria: "seno e cosseno de quarenta e cinco são raiz de dois sobre dois",
      },
      {
        title: "Caso de 30°",
        detail: "No triângulo equilátero dividido, o cateto oposto mede 1 e a hipotenusa 2.",
        formula: "\\sin30^\\circ=\\frac12,\\qquad\\cos30^\\circ=\\frac{\\sqrt3}{2}",
        formulaAria: "seno de trinta é um meio e cosseno de trinta é raiz de três sobre dois",
      },
      {
        title: "Caso de 60°",
        detail: "Trocando os catetos, obtemos os valores de 60°.",
        formula: "\\sin60^\\circ=\\frac{\\sqrt3}{2},\\qquad\\cos60^\\circ=\\frac12",
        formulaAria: "seno de sessenta é raiz de três sobre dois e cosseno de sessenta é um meio",
      },
    ],
  },
    { title: "Relação entre graus e radianos",
    intro: "Radianos medem o ângulo usando o comprimento do arco.",
    steps: [
      {
        title: "Volta completa",
        detail: "Uma volta mede \\(360^\\circ\\) e tem arco \\(2\\pi r\\).",
        formula: "360^\\circ=2\\pi\\ \\mathrm{rad}",
        formulaAria: "trezentos e sessenta graus são dois pi radianos",
      },
      {
        title: "Meia volta",
        detail: "Metade da volta corresponde a \\(180^\\circ\\) e \\(\\pi\\) radianos.",
        formula: "180^\\circ=\\pi\\ \\mathrm{rad}",
        formulaAria: "cento e oitenta graus são pi radianos",
      },
      {
        title: "Converter",
        detail: "Para passar de graus a radianos, multiplicamos por \\(\\frac\\pi{180}\\).",
        formula: "\\theta_{\\mathrm{rad}}=\\theta_{\\mathrm{graus}}\\frac{\\pi}{180}",
        formulaAria: "teta em radianos é teta em graus vezes pi sobre cento e oitenta",
      },
    ],
  },
    { title: "Comprimento de arco \\(s=r\\theta\\)",
    intro: "O arco é a mesma fração da circunferência que o ângulo é da volta.",
    steps: [
      {
        title: "Montar a proporção",
        detail: "A fração do arco é \\(\\frac{s}{2\\pi r}\\) e a fração da volta é \\(\\frac\\theta{2\\pi}\\).",
        formula: "\\frac{s}{2\\pi r}=\\frac{\\theta}{2\\pi}",
        formulaAria: "s sobre dois pi r é teta sobre dois pi",
      },
      {
        title: "Simplificar",
        detail: "Multiplicando pelos denominadores, os \\(2\\pi\\) desaparecem.",
        formula: "s=r\\theta",
        formulaAria: "s é r vezes teta",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/identidades-basicas": [
    { title: "Identidade fundamental da trigonometria",
    intro: "No círculo unitário, seno e cosseno são as coordenadas de um ponto de raio 1.",
    steps: [
      {
        title: "Aplicar Pitágoras",
        detail: "O ponto \\((\\cos x,\\sin x)\\) está na circunferência unitária.",
        formula: "(\\cos x)^2+(\\sin x)^2=1",
        formulaAria: "cosseno de x ao quadrado mais seno de x ao quadrado é um",
      },
      {
        title: "Reescrever",
        detail: "A notação usual produz a identidade fundamental.",
        formula: "\\sin^2x+\\cos^2x=1",
        formulaAria: "seno de x ao quadrado mais cosseno de x ao quadrado é um",
      },
    ],
  },
    { title: "Identidade \\(1+\\tan^2x=\\sec^2x\\)",
    intro: "Dividimos a identidade fundamental por \\(\\cos^2x\\), quando o cosseno não é zero.",
    steps: [
      {
        title: "Dividir tudo",
        detail: "Partimos de \\(\\sin^2x+\\cos^2x=1\\).",
        formula: "\\frac{\\sin^2x}{\\cos^2x}+1=\\frac1{\\cos^2x}",
        formulaAria: "seno ao quadrado sobre cosseno ao quadrado mais um é um sobre cosseno ao quadrado",
      },
      {
        title: "Reconhecer as definições",
        detail: "\\(\\sin x/\\cos x=\\tan x\\) e \\(1/\\cos x=\\sec x\\).",
        formula: "\\tan^2x+1=\\sec^2x",
        formulaAria: "tangente ao quadrado mais um é secante ao quadrado",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/graficos-trigonometricos": [
    { title: "Construção do gráfico do seno pelo círculo trigonométrico",
    intro: "O gráfico do seno registra a coordenada vertical do ponto que gira no círculo unitário.",
    steps: [
      {
        title: "Associar o ponto",
        detail: "Para cada ângulo, o ponto é \\((\\cos x,\\sin x)\\).",
        formula: "P(x)=(\\cos x,\\sin x)",
        formulaAria: "p de x é cosseno de x e seno de x",
      },
      {
        title: "Ler a altura",
        detail: "A coordenada vertical é o seno e fica entre \\(-1\\) e \\(1\\).",
        formula: "y=\\sin x,\\qquad -1\\leq\\sin x\\leq1",
        formulaAria: "y é seno de x entre menos um e um",
      },
      {
        title: "Marcar pontos",
        detail: "Os valores \\(0,1,0\\) em um quarto de volta formam a onda.",
        formula: "\\sin0=0,\\quad\\sin\\frac\\pi2=1,\\quad\\sin\\pi=0",
        formulaAria: "seno de zero é zero, seno de pi sobre dois é um e seno de pi é zero",
      },
    ],
  },
    { title: "Construção do gráfico do cosseno pelo círculo trigonométrico",
    intro: "O gráfico do cosseno registra a coordenada horizontal do ponto que gira.",
    steps: [
      {
        title: "Associar o ponto",
        detail: "O ponto do círculo é \\((\\cos x,\\sin x)\\).",
        formula: "P(x)=(\\cos x,\\sin x)",
        formulaAria: "p de x é cosseno de x e seno de x",
      },
      {
        title: "Ler a largura",
        detail: "A coordenada horizontal é o cosseno, entre \\(-1\\) e \\(1\\).",
        formula: "y=\\cos x,\\qquad -1\\leq\\cos x\\leq1",
        formulaAria: "y é cosseno de x entre menos um e um",
      },
      {
        title: "Marcar pontos",
        detail: "Os valores \\(1,0,-1\\) mostram o início da onda.",
        formula: "\\cos0=1,\\quad\\cos\\frac\\pi2=0,\\quad\\cos\\pi=-1",
        formulaAria: "cosseno de zero é um, cosseno de pi sobre dois é zero e cosseno de pi é menos um",
      },
    ],
  },
  ],
  "calculo-1/limites/limite-por-grafico": [
    { title: "Existência de limite mesmo quando a função não existe no ponto",
    intro: "O limite observa o comportamento ao redor de um ponto; não depende de a função ter valor exatamente nele.",
    steps: [
      {
        title: "Aproximar pelo entorno",
        detail: "Quando \\(x\\) se aproxima de \\(a\\), os valores de \\(f(x)\\) podem se aproximar de \\(L\\).",
        formula: "\\lim_{x\\to a}f(x)=L",
        formulaAria: "o limite de f de x quando x tende a a é L",
      },
      {
        title: "Separar limite e valor",
        detail: "Pode haver um furo em \\(x=a\\) e, ainda assim, o limite existir.",
        formula: "f(a)\\text{ não existe},\\qquad\\lim_{x\\to a}f(x)=L",
        formulaAria: "f de a não existe, mas o limite pode ser L",
      },
    ],
  },
  ],
  "calculo-1/limites/limites-laterais": [
    { title: "Limites laterais e condição de existência",
    intro: "O limite bilateral só existe quando a função chega ao mesmo destino pelos dois lados.",
    steps: [
      {
        title: "Definir os lados",
        detail: "Pela esquerda usamos \\(x\\to a^-\\); pela direita, \\(x\\to a^+\\).",
        formula: "\\lim_{x\\to a^-}f(x),\\qquad\\lim_{x\\to a^+}f(x)",
        formulaAria: "limite pela esquerda e limite pela direita",
      },
      {
        title: "Comparar",
        detail: "Se os resultados forem diferentes, o gráfico apresenta um salto.",
        formula: "L_-\\neq L_+\\Longrightarrow\\lim_{x\\to a}f(x)\\text{ não existe}",
        formulaAria: "limites laterais diferentes implicam que o limite não existe",
      },
      {
        title: "Concluir",
        detail: "O limite existe exatamente quando os dois limites laterais coincidem.",
        formula: "\\lim_{x\\to a}f(x)=L\\Longleftrightarrow L_-=L_+=L",
        formulaAria: "o limite existe se e somente se os limites laterais são iguais",
      },
    ],
  },
  ],
  "calculo-1/limites/limite-no-infinito": [
    { title: "Dominância do termo de maior grau em limites no infinito",
    intro: "Para valores enormes de x, o termo de maior grau domina o comportamento do polinômio.",
    steps: [
      {
        title: "Dividir pelo maior grau",
        detail: "Em um quociente, dividimos todos os termos pela maior potência de \\(x\\).",
        formula: "\\frac{3x^2+2x+1}{x^2-5}=\\frac{3+\\frac2x+\\frac1{x^2}}{1-\\frac5{x^2}}",
        formulaAria: "quociente dividido por x ao quadrado",
      },
      {
        title: "Fazer os termos menores sumirem",
        detail: "Quando \\(x\\to\\infty\\), as frações com x no denominador tendem a zero.",
        formula: "\\lim_{x\\to\\infty}\\frac1x=0,\\qquad\\lim_{x\\to\\infty}\\frac1{x^2}=0",
        formulaAria: "esses termos tendem a zero",
      },
      {
        title: "Ler o limite",
        detail: "Sobra a razão entre os coeficientes dominantes.",
        formula: "\\lim_{x\\to\\infty}\\frac{3x^2+2x+1}{x^2-5}=3",
        formulaAria: "o limite é três",
      },
    ],
  },
  ],
  "calculo-1/limites/velocidade-instantanea": [
    { title: "Velocidade instantânea a partir da velocidade média",
    intro: "A velocidade instantânea é a velocidade média quando o intervalo de tempo encolhe até zero.",
    steps: [
      {
        title: "Calcular uma média",
        detail: "Entre dois instantes, dividimos a variação da posição pela variação do tempo.",
        formula: "v_{\\mathrm{média}}=\\frac{\\Delta s}{\\Delta t}",
        formulaAria: "velocidade média é delta s sobre delta t",
      },
      {
        title: "Encolher o intervalo",
        detail: "Usamos intervalos cada vez menores ao redor de \\(t\\).",
        formula: "v(t)=\\lim_{\\Delta t\\to0}\\frac{s(t+\\Delta t)-s(t)}{\\Delta t}",
        formulaAria: "velocidade em t é o limite",
      },
      {
        title: "Interpretar",
        detail: "O limite da média é a taxa de variação naquele instante.",
        formula: "v_{\\mathrm{instantânea}}=\\lim_{\\Delta t\\to0}v_{\\mathrm{média}}",
        formulaAria: "velocidade instantânea é o limite da velocidade média",
      },
    ],
  },
  ],
  "calculo-1/continuidade/continuidade-ponto": [
    { title: "Condições para continuidade de uma função",
    intro: "Ser contínua em um ponto significa não haver furo, salto ou valor incompatível.",
    steps: [
      {
        title: "O valor precisa existir",
        detail: "A função precisa ter um valor definido em \\(a\\).",
        formula: "f(a)\\text{ existe}",
        formulaAria: "f de a existe",
      },
      {
        title: "O limite precisa existir",
        detail: "Os caminhos pela esquerda e pela direita devem chegar ao mesmo destino.",
        formula: "\\lim_{x\\to a}f(x)\\text{ existe}",
        formulaAria: "o limite existe",
      },
      {
        title: "Limite e valor devem coincidir",
        detail: "A condição final conecta o comportamento ao redor com o ponto.",
        formula: "\\lim_{x\\to a}f(x)=f(a)",
        formulaAria: "o limite é igual a f de a",
      },
    ],
  },
  ],
  "calculo-1/derivadas/definicao-derivada": [
    { title: "Definição da derivada",
    intro: "A derivada é o limite da inclinação de secantes quando o segundo ponto se aproxima do primeiro.",
    steps: [
      {
        title: "Começar pela secante",
        detail: "A inclinação entre \\(a\\) e \\(a+h\\) é a variação de f dividida pela variação de x.",
        formula: "\\frac{f(a+h)-f(a)}{h}",
        formulaAria: "f de a mais h menos f de a sobre h",
      },
      {
        title: "Aproximar o ponto",
        detail: "Fazemos \\(h\\) tender a zero; a secante vira a tangente.",
        formula: "f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}",
        formulaAria: "f linha de a é o limite quando h tende a zero",
      },
      {
        title: "Interpretar",
        detail: "O resultado é a inclinação instantânea da função.",
        formula: "f'(a)=\\text{inclinação da tangente em }a",
        formulaAria: "f linha de a é a inclinação da tangente em a",
      },
    ],
  },
    { title: "Derivada de \\(x^2\\) pela definição",
    intro: "Este exemplo mostra a definição funcionando sem usar uma regra pronta.",
    steps: [
      {
        title: "Substituir a função",
        detail: "Para \\(f(x)=x^2\\), temos \\(f(x+h)=(x+h)^2\\).",
        formula: "\\frac{(x+h)^2-x^2}{h}",
        formulaAria: "x mais h ao quadrado menos x ao quadrado sobre h",
      },
      {
        title: "Expandir e cancelar",
        detail: "O \\(x^2\\) se cancela e colocamos \\(h\\) em evidência.",
        formula: "\\frac{x^2+2xh+h^2-x^2}{h}=\\frac{h(2x+h)}h=2x+h",
        formulaAria: "a expressão se simplifica para dois x mais h",
      },
      {
        title: "Calcular o limite",
        detail: "Quando \\(h\\to0\\), sobra \\(2x\\).",
        formula: "\\lim_{h\\to0}(2x+h)=2x",
        formulaAria: "o limite é dois x",
      },
    ],
  },
  ],
  "calculo-1/derivadas/derivada-potencia": [
    { title: "Regra da potência",
    intro: "A regra generaliza o padrão observado ao derivar potências pela definição.",
    steps: [
      {
        title: "Partir da definição",
        detail: "Para \\(f(x)=x^n\\), usamos o quociente de diferenças.",
        formula: "f'(x)=\\lim_{h\\to0}\\frac{(x+h)^n-x^n}{h}",
        formulaAria: "f linha de x é o limite da diferença",
      },
      {
        title: "Observar o termo de primeira ordem",
        detail: "No desenvolvimento, o termo linear é \\(nx^{n-1}h\\); os outros contêm \\(h^2\\) ou mais.",
        formula: "(x+h)^n=x^n+nx^{n-1}h+\\text{termos com }h^2",
        formulaAria: "o termo linear é n x elevado a n menos um vezes h",
      },
      {
        title: "Cancelar e limitar",
        detail: "Após dividir por \\(h\\), os termos com h desaparecem.",
        formula: "\\frac{d}{dx}x^n=nx^{n-1}",
        formulaAria: "a derivada de x elevado a n é n vezes x elevado a n menos um",
      },
    ],
  },
  ],
  "calculo-1/derivadas/derivada-produto-quociente": [
    { title: "Regra do produto",
    intro: "A variação de um produto tem duas fontes: a mudança do primeiro fator e a mudança do segundo.",
    steps: [
      {
        title: "Adicionar e retirar um termo",
        detail: "Separamos a diferença adicionando \\(u(x)v(x+h)\\) no numerador.",
        formula: "\\frac{u(x+h)v(x+h)-u(x)v(x)}h",
        formulaAria: "diferença do produto sobre h",
      },
      {
        title: "Separar as variações",
        detail: "Isso produz uma variação de u e outra de v.",
        formula: "\\frac{u(x+h)-u(x)}h\\,v(x+h)+u(x)\\frac{v(x+h)-v(x)}h",
        formulaAria: "variação de u vezes v mais u vezes variação de v",
      },
      {
        title: "Fazer o limite",
        detail: "Quando \\(h\\to0\\), \\(v(x+h)\\to v(x)\\).",
        formula: "(uv)'=u'v+uv'",
        formulaAria: "a derivada do produto é u linha v mais u v linha",
      },
    ],
  },
    { title: "Regra do quociente",
    intro: "O quociente pode ser visto como um produto pelo inverso do denominador.",
    steps: [
      {
        title: "Reescrever",
        detail: "Para \\(v\\neq0\\), escrevemos \\(u/v=u\\cdot v^{-1}\\).",
        formula: "\\frac uv=u\\,v^{-1}",
        formulaAria: "u sobre v é u vezes v elevado a menos um",
      },
      {
        title: "Derivar o inverso",
        detail: "A derivada de \\(v^{-1}\\) é \\(-v'/v^2\\).",
        formula: "(v^{-1})'=-\\frac{v'}{v^2}",
        formulaAria: "a derivada do inverso de v é menos v linha sobre v ao quadrado",
      },
      {
        title: "Organizar",
        detail: "Aplicando o produto e colocando no mesmo denominador, chegamos à regra.",
        formula: "\\left(\\frac uv\\right)'=\\frac{u'v-uv'}{v^2}",
        formulaAria: "a derivada de u sobre v é u linha v menos u v linha sobre v ao quadrado",
      },
    ],
  },
  ],
  "calculo-1/derivadas/derivada-composta": [
    { title: "Regra da cadeia",
    intro: "Em uma composição, a variação passa pela função interna antes de chegar à função externa.",
    steps: [
      {
        title: "Criar uma variável intermediária",
        detail: "Escreva \\(u=g(x)\\) e \\(y=f(u)\\).",
        formula: "u=g(x),\\qquad y=f(u)",
        formulaAria: "u é g de x e y é f de u",
      },
      {
        title: "Multiplicar taxas",
        detail: "A taxa de y em relação a x é o produto das duas taxas intermediárias.",
        formula: "\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}",
        formulaAria: "dy sobre dx é dy sobre du vezes du sobre dx",
      },
      {
        title: "Voltar à composição",
        detail: "Substituindo as funções, derivamos a externa e multiplicamos pela interna.",
        formula: "\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)",
        formulaAria: "a derivada de f de g de x é f linha de g de x vezes g linha de x",
      },
    ],
  },
  ],
  "calculo-1/integrais/ideia-de-soma": [
    { title: "Integral como limite de somas",
    intro: "A integral definida nasce de somar áreas de retângulos cada vez mais estreitos.",
    steps: [
      {
        title: "Aproximar por retângulos",
        detail: "Cada retângulo tem altura \\(f(x_i^*)\\) e base \\(\\Delta x\\).",
        formula: "S_n=\\sum_{i=1}^n f(x_i^*)\\Delta x",
        formulaAria: "s n é a soma das áreas dos retângulos",
      },
      {
        title: "Refinar a divisão",
        detail: "Dividimos o intervalo em mais partes; assim \\(\\Delta x\\) diminui.",
        formula: "\\Delta x=\\frac{b-a}{n},\\qquad n\\to\\infty",
        formulaAria: "delta x é b menos a sobre n",
      },
      {
        title: "Tomar o limite",
        detail: "O limite dessas aproximações define a integral.",
        formula: "\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\Delta x",
        formulaAria: "a integral é o limite da soma",
      },
    ],
  },
  ],
  "calculo-1/integrais/area-sob-grafico": [
    { title: "Área sob a curva",
    intro: "Para uma função não negativa, a integral acumula a área entre o gráfico e o eixo x.",
    steps: [
      {
        title: "Somar aproximações",
        detail: "A área aproximada é a soma de bases vezes alturas.",
        formula: "A\\approx\\sum f(x_i^*)\\Delta x",
        formulaAria: "a área é aproximadamente a soma",
      },
      {
        title: "Deixar os retângulos finos",
        detail: "Quanto menor \\(\\Delta x\\), mais a soma acompanha a curva.",
        formula: "\\Delta x\\to0",
        formulaAria: "delta x tende a zero",
      },
      {
        title: "Definir a área",
        detail: "No limite, a aproximação vira a área exata.",
        formula: "A=\\int_a^b f(x)\\,dx",
        formulaAria: "a área é a integral de a até b",
      },
    ],
  },
  ],
  "calculo-1/integrais/tfc": [
    { title: "Teorema Fundamental do Cálculo",
    intro: "O teorema conecta acumular áreas com derivar: uma operação desfaz a outra.",
    steps: [
      {
        title: "Criar uma área acumulada",
        detail: "Defina \\(F(x)\\) como a área desde \\(a\\) até \\(x\\).",
        formula: "F(x)=\\int_a^x f(t)\\,dt",
        formulaAria: "f maiúsculo de x é a integral de a até x",
      },
      {
        title: "Derivar a área",
        detail: "Ao avançar um pouco em x, acrescentamos um retângulo de altura aproximadamente \\(f(x)\\).",
        formula: "F'(x)=f(x)",
        formulaAria: "f maiúsculo linha de x é f de x",
      },
      {
        title: "Usar a antiderivada",
        detail: "Se \\(F'=f\\), a área entre os limites é a diferença dos valores.",
        formula: "\\int_a^b f(x)\\,dx=F(b)-F(a)",
        formulaAria: "a integral de a até b é f de b menos f de a",
      },
    ],
  },
  ],
};

export function demonstrationsForLesson(
  trilha: "pre-calculo" | "calculo-1",
  moduleSlug: string,
  aulaSlug: string,
): AulaDemonstracao[] {
  return demonstracoes[trilha + "/" + moduleSlug + "/" + aulaSlug] ?? [];
}
