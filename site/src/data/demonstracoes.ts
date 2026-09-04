import type { AulaDemonstracao } from "@/data/aulas/types";

export const demonstracoes: Record<string, AulaDemonstracao[]> = {
  "pre-calculo/fundamentos/fracoes": [
    {
      title: "Divisão de frações",
      intro: "Dividir por uma fração é perguntar quantas vezes o segundo pedaço cabe no primeiro.",
      steps: [
        {
          title: "Inverter a segunda fração",
          detail: "Mantemos a primeira fração e multiplicamos pelo inverso da segunda: \\\\(\\\\frac{a}{b}\\\\div\\\\frac{c}{d}=\\\\frac{a}{b}\\\\times\\\\frac{d}{c}\\\\).",
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
          detail: "A raiz de índice \\\\(n\\\\) equivale a elevar a \\\\(\\\\frac1n\\\\).",
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
          detail: "\\\\((a+b)^2\\\\) é o produto \\\\((a+b)(a+b)\\\\).",
          formula: "(a+b)^2=(a+b)(a+b)",
          formulaAria: "a mais b ao quadrado é a mais b vezes a mais b",
        },
        {
          title: "Distribuir e juntar",
          detail: "Distribuindo, aparecem \\\\(ab\\\\) duas vezes.",
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
          detail: "\\\\((a-b)^2=(a-b)(a-b)\\\\).",
          formula: "(a-b)^2=(a-b)(a-b)",
          formulaAria: "a menos b ao quadrado é a menos b vezes a menos b",
        },
        {
          title: "Distribuir os sinais",
          detail: "Os dois produtos cruzados são \\\\(-ab\\\\).",
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
          detail: "Como \\\\(-ab+ab=0\\\\), restam apenas os quadrados.",
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
          detail: "Em \\\\(ax+ay\\\\), o fator \\\\(a\\\\) aparece nos dois termos.",
          formula: "ax+ay",
          formulaAria: "a x mais a y",
        },
        {
          title: "Colocar em evidência",
          detail: "Retiramos \\\\(a\\\\) e deixamos dentro do parêntese o que sobra.",
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
          detail: "Se \\\\(A=B\\\\), somar \\\\(k\\\\) dos dois lados mantém o equilíbrio.",
          formula: "A=B\\Longrightarrow A+k=B+k",
          formulaAria: "a igual a b implica a mais k igual a b mais k",
        },
        {
          title: "Multiplicar ou dividir",
          detail: "Multiplicar é sempre permitido; dividir exige \\\\(k\\\\neq0\\\\).",
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
          detail: "Comparamos o desenho \\\\(d\\\\) com a medida real \\\\(D\\\\).",
          formula: "E=\\frac dD",
          formulaAria: "escala é distância do desenho sobre distância real",
        },
        {
          title: "Resolver uma escala 1:n",
          detail: "Se uma unidade do desenho representa \\\\(n\\\\) unidades reais, multiplicamos por \\\\(n\\\\).",
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
          detail: "Multiplicando por \\\\(t\\\\), encontramos a energia.",
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
          detail: "O fator \\\\(a\\\\) não escolhe apenas o primeiro termo; ele alcança \\\\(b\\\\) e \\\\(c\\\\).",
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
          detail: "Em \\\\(ax+b=c\\\\), subtraímos \\\\(b\\\\).",
          formula: "ax+b=c\\Longrightarrow ax=c-b",
          formulaAria: "a x mais b igual a c implica a x igual a c menos b",
        },
        {
          title: "Desfazer a multiplicação",
          detail: "Depois dividimos por \\\\(a\\\\), com \\\\(a\\\\neq0\\\\).",
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
          detail: "Ao multiplicar uma desigualdade por \\\\(-1\\\\), os pontos trocam de lado.",
          formula: "a<b\\Longrightarrow -a>-b",
          formulaAria: "a menor que b implica menos a maior que menos b",
        },
        {
          title: "Aplicar ao isolamento",
          detail: "Ao dividir por \\\\(-3\\\\), o sinal precisa virar.",
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
          detail: "No sistema, \\\\(+y\\\\) e \\\\(-y\\\\) já se anulam ao somar.",
          formula: "\\begin{cases}x+y=7\\\\x-y=1\\end{cases}",
          formulaAria: "sistema x mais y igual a sete e x menos y igual a um",
        },
        {
          title: "Somar e substituir",
          detail: "A soma dá \\\\(2x=8\\\\), então \\\\(x=4\\\\); substituindo, \\\\(y=3\\\\).",
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
          detail: "Cancelamos \\\\(x-3\\\\), mas a expressão original continua proibida em \\\\(x=3\\\\).",
          formula: "\\frac{(x-3)(x+3)}{x-3}=x+3,\\qquad x\\neq3",
          formulaAria: "o resultado é x mais três, com x diferente de três",
        },
      ],
    },
  ],
  "pre-calculo/funcoes/funcao-afim": [
  "Coeficiente angular da reta": {
    intro: "O coeficiente angular mede quanto y varia quando x avança.",
    steps: [
      {
        title: "Escolher dois pontos",
        detail: "Considere \\\\(P_1=(x_1,y_1)\\\\) e \\\\(P_2=(x_2,y_2)\\\\), com \\\\(x_2\\\\neq x_1\\\\).",
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
        detail: "\\\\(m>0\\\\) indica reta crescente; \\\\(m<0\\\\), decrescente.",
        formula: "m>0\\Rightarrow\\text{sobe},\\qquad m<0\\Rightarrow\\text{desce}",
        formulaAria: "m positivo sobe e m negativo desce",
      },
    ],
  },
  "Equação da reta \\(y=mx+b\\)": {
    intro: "A forma reduzida separa a inclinação da reta do ponto onde ela cruza o eixo y.",
    steps: [
      {
        title: "Partir da forma ponto-inclinação",
        detail: "Para um ponto \\\\((x_0,y_0)\\\\), escrevemos a variação vertical em função da horizontal.",
        formula: "y-y_0=m(x-x_0)",
        formulaAria: "y menos y zero é m vezes x menos x zero",
      },
      {
        title: "Distribuir e isolar y",
        detail: "Abrindo o parêntese, a parte constante se reúne em \\\\(b=y_0-mx_0\\\\).",
        formula: "y=mx+y_0-mx_0=mx+b",
        formulaAria: "y é m x mais b",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-quadratica": [
  "Fórmula do x do vértice da parábola": {
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
        detail: "Para \\\\(ax^2+bx+c=0\\\\), a soma das raízes é \\\\(-\\\\frac ba\\\\).",
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
  "Fórmula do y do vértice da parábola": {
    intro: "A coordenada y é o valor da função no x do vértice.",
    steps: [
      {
        title: "Substituir",
        detail: "Colocamos \\\\(x_v=-\\\\frac{b}{2a}\\\\) em \\\\(f(x)=ax^2+bx+c\\\\).",
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
  "Definição de módulo": {
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
  "Reflexão do gráfico pela função módulo": {
    intro: "Aplicar módulo aos valores de y reflete para cima a parte que estava abaixo do eixo x.",
    steps: [
      {
        title: "Transformar cada ponto",
        detail: "Um ponto \\\\((x,y)\\\\) de \\\\(f\\\\) vira \\\\((x,|y|)\\\\).",
        formula: "(x,y)\\longmapsto(x,|y|)",
        formulaAria: "o ponto x y vai para x módulo de y",
      },
      {
        title: "Refletir valores negativos",
        detail: "Quando \\\\(f(x)<0\\\\), o módulo troca \\\\(y\\\\) por \\\\(-y\\\\).",
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
  "Crescimento exponencial": {
    intro: "O crescimento exponencial repete uma multiplicação pelo mesmo fator em cada período.",
    steps: [
      {
        title: "Aplicar o fator uma vez",
        detail: "Um valor inicial \\\\(P_0\\\\), multiplicado por \\\\(r\\\\), vira \\\\(P_1\\\\).",
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
        detail: "A repetição se resume em uma potência; \\\\(r>1\\\\) produz crescimento.",
        formula: "P_n=P_0r^n",
        formulaAria: "p n é p zero vezes r elevado a n",
      },
    ],
  },
  ],
  "pre-calculo/funcoes/funcao-logaritmica": [
  "Definição de logaritmo": {
    intro: "Logaritmo responde qual expoente transforma uma base em determinado resultado.",
    steps: [
      {
        title: "Partir da potência",
        detail: "Começamos com \\\\(a^y=x\\\\), respeitando as restrições da base.",
        formula: "a^y=x,\\qquad a>0,\\quad a\\neq1",
        formulaAria: "a elevado a y é x",
      },
      {
        title: "Perguntar pelo expoente",
        detail: "O logaritmo é o nome dado ao expoente \\\\(y\\\\).",
        formula: "\\log_a(x)=y\\Longleftrightarrow a^y=x",
        formulaAria: "logaritmo de x na base a é y se e somente se a elevado a y é x",
      },
    ],
  },
  "Propriedades dos logaritmos": {
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
  "Fórmula dos juros compostos": {
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
        detail: "Após \\\\(n\\\\) períodos, o fator aparece \\\\(n\\\\) vezes.",
        formula: "C_n=C_0(1+i)^n",
        formulaAria: "c n é c zero vezes um mais i elevado a n",
      },
    ],
  },
  ],
  "pre-calculo/graficos/translacao-graficos": [
  "Translação vertical de gráficos": {
    intro: "Somar uma constante às saídas move todos os pontos para cima ou para baixo.",
    steps: [
      {
        title: "Alterar y",
        detail: "Se \\\\(g(x)=f(x)+k\\\\), cada valor de y recebe o mesmo \\\\(k\\\\).",
        formula: "g(x)=f(x)+k",
        formulaAria: "g de x é f de x mais k",
      },
      {
        title: "Acompanhar um ponto",
        detail: "Um ponto \\\\((x,y)\\\\) vira \\\\((x,y+k)\\\\).",
        formula: "(x,y)\\longmapsto(x,y+k)",
        formulaAria: "o ponto x y vai para x y mais k",
      },
      {
        title: "Ler o sinal",
        detail: "\\\\(k>0\\\\) sobe; \\\\(k<0\\\\) desce; a forma permanece igual.",
        formula: "k>0\\Rightarrow\\text{sobe},\\qquad k<0\\Rightarrow\\text{desce}",
        formulaAria: "k positivo sobe e k negativo desce",
      },
    ],
  },
  "Translação horizontal de gráficos": {
    intro: "Alterar a entrada da função move o gráfico na horizontal.",
    steps: [
      {
        title: "Trocar a entrada",
        detail: "Em \\\\(g(x)=f(x-h)\\\\), usamos o valor antigo em \\\\(x-h\\\\).",
        formula: "g(x)=f(x-h)",
        formulaAria: "g de x é f de x menos h",
      },
      {
        title: "Acompanhar um ponto",
        detail: "Um ponto \\\\((u,y)\\\\) de \\\\(f\\\\) vira \\\\((u+h,y)\\\\) em \\\\(g\\\\).",
        formula: "(u,y)\\longmapsto(u+h,y)",
        formulaAria: "o ponto u y vai para u mais h y",
      },
      {
        title: "Lembrar o sinal",
        detail: "O \\\\(x-h\\\\) desloca para a direita quando \\\\(h>0\\\\).",
        formula: "h>0\\Rightarrow\\text{direita}",
        formulaAria: "h positivo desloca para a direita",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/seno": [
  "Razões trigonométricas por semelhança de triângulos": {
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
  "Relação \\(\\tan x=\\frac{\\sin x}{\\cos x}\\)": {
    intro: "A tangente surge ao dividir seno por cosseno no mesmo triângulo.",
    steps: [
      {
        title: "Escrever seno e cosseno",
        detail: "Usamos \\\\(\\\\sin x=\\\\frac oh\\\\) e \\\\(\\\\cos x=\\\\frac ah\\\\).",
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
  "Valores trigonométricos de 30°, 45° e 60°": {
    intro: "Os valores notáveis vêm dos triângulos especiais 45-45-90 e 30-60-90.",
    steps: [
      {
        title: "Caso de 45°",
        detail: "Com catetos 1 e hipotenusa \\\\(\\\\sqrt2\\\\), as duas razões são iguais.",
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
  "Relação entre graus e radianos": {
    intro: "Radianos medem o ângulo usando o comprimento do arco.",
    steps: [
      {
        title: "Volta completa",
        detail: "Uma volta mede \\\\(360^\\\\circ\\\\) e tem arco \\\\(2\\\\pi r\\\\).",
        formula: "360^\\circ=2\\pi\\ \\mathrm{rad}",
        formulaAria: "trezentos e sessenta graus são dois pi radianos",
      },
      {
        title: "Meia volta",
        detail: "Metade da volta corresponde a \\\\(180^\\\\circ\\\\) e \\\\(\\\\pi\\\\) radianos.",
        formula: "180^\\circ=\\pi\\ \\mathrm{rad}",
        formulaAria: "cento e oitenta graus são pi radianos",
      },
      {
        title: "Converter",
        detail: "Para passar de graus a radianos, multiplicamos por \\\\(\\\\frac\\\\pi{180}\\\\).",
        formula: "\\theta_{\\mathrm{rad}}=\\theta_{\\mathrm{graus}}\\frac{\\pi}{180}",
        formulaAria: "teta em radianos é teta em graus vezes pi sobre cento e oitenta",
      },
    ],
  },
  "Comprimento de arco \\(s=r\\theta\\)": {
    intro: "O arco é a mesma fração da circunferência que o ângulo é da volta.",
    steps: [
      {
        title: "Montar a proporção",
        detail: "A fração do arco é \\\\(\\\\frac{s}{2\\\\pi r}\\\\) e a fração da volta é \\\\(\\\\frac\\\\theta{2\\\\pi}\\\\).",
        formula: "\\frac{s}{2\\pi r}=\\frac{\\theta}{2\\pi}",
        formulaAria: "s sobre dois pi r é teta sobre dois pi",
      },
      {
        title: "Simplificar",
        detail: "Multiplicando pelos denominadores, os \\\\(2\\\\pi\\\\) desaparecem.",
        formula: "s=r\\theta",
        formulaAria: "s é r vezes teta",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/identidades-basicas": [
  "Identidade fundamental da trigonometria": {
    intro: "No círculo unitário, seno e cosseno são as coordenadas de um ponto de raio 1.",
    steps: [
      {
        title: "Aplicar Pitágoras",
        detail: "O ponto \\\\((\\\\cos x,\\\\sin x)\\\\) está na circunferência unitária.",
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
  "Identidade \\(1+\\tan^2x=\\sec^2x\\)": {
    intro: "Dividimos a identidade fundamental por \\(\\cos^2x\\), quando o cosseno não é zero.",
    steps: [
      {
        title: "Dividir tudo",
        detail: "Partimos de \\\\(\\\\sin^2x+\\\\cos^2x=1\\\\).",
        formula: "\\frac{\\sin^2x}{\\cos^2x}+1=\\frac1{\\cos^2x}",
        formulaAria: "seno ao quadrado sobre cosseno ao quadrado mais um é um sobre cosseno ao quadrado",
      },
      {
        title: "Reconhecer as definições",
        detail: "\\\\(\\\\sin x/\\\\cos x=\\\\tan x\\\\) e \\\\(1/\\\\cos x=\\\\sec x\\\\).",
        formula: "\\tan^2x+1=\\sec^2x",
        formulaAria: "tangente ao quadrado mais um é secante ao quadrado",
      },
    ],
  },
  ],
  "pre-calculo/trigonometria/graficos-trigonometricos": [
  "Construção do gráfico do seno pelo círculo trigonométrico": {
    intro: "O gráfico do seno registra a coordenada vertical do ponto que gira no círculo unitário.",
    steps: [
      {
        title: "Associar o ponto",
        detail: "Para cada ângulo, o ponto é \\\\((\\\\cos x,\\\\sin x)\\\\).",
        formula: "P(x)=(\\cos x,\\sin x)",
        formulaAria: "p de x é cosseno de x e seno de x",
      },
      {
        title: "Ler a altura",
        detail: "A coordenada vertical é o seno e fica entre \\\\(-1\\\\) e \\\\(1\\\\).",
        formula: "y=\\sin x,\\qquad -1\\leq\\sin x\\leq1",
        formulaAria: "y é seno de x entre menos um e um",
      },
      {
        title: "Marcar pontos",
        detail: "Os valores \\\\(0,1,0\\\\) em um quarto de volta formam a onda.",
        formula: "\\sin0=0,\\quad\\sin\\frac\\pi2=1,\\quad\\sin\\pi=0",
        formulaAria: "seno de zero é zero, seno de pi sobre dois é um e seno de pi é zero",
      },
    ],
  },
  "Construção do gráfico do cosseno pelo círculo trigonométrico": {
    intro: "O gráfico do cosseno registra a coordenada horizontal do ponto que gira.",
    steps: [
      {
        title: "Associar o ponto",
        detail: "O ponto do círculo é \\\\((\\\\cos x,\\\\sin x)\\\\).",
        formula: "P(x)=(\\cos x,\\sin x)",
        formulaAria: "p de x é cosseno de x e seno de x",
      },
      {
        title: "Ler a largura",
        detail: "A coordenada horizontal é o cosseno, entre \\\\(-1\\\\) e \\\\(1\\\\).",
        formula: "y=\\cos x,\\qquad -1\\leq\\cos x\\leq1",
        formulaAria: "y é cosseno de x entre menos um e um",
      },
      {
        title: "Marcar pontos",
        detail: "Os valores \\\\(1,0,-1\\\\) mostram o início da onda.",
        formula: "\\cos0=1,\\quad\\cos\\frac\\pi2=0,\\quad\\cos\\pi=-1",
        formulaAria: "cosseno de zero é um, cosseno de pi sobre dois é zero e cosseno de pi é menos um",
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
