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
};

export function demonstrationsForLesson(
  trilha: "pre-calculo" | "calculo-1",
  moduleSlug: string,
  aulaSlug: string,
): AulaDemonstracao[] {
  return demonstracoes[trilha + "/" + moduleSlug + "/" + aulaSlug] ?? [];
}
