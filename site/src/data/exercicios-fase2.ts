import type {
  Exercicio,
  ExerciseLevel,
  ExerciseType,
  PedagogicalExerciseLevel,
} from "@/data/exercicios";

/**
 * A resolução pode ser um parágrafo ou uma lista de passos. Exercícios de
 * procedimento — derivar, fatorar, integrar, modelar — vêm em passos; os
 * conceituais ("Explique...", "Por que...") ficam num parágrafo, porque um
 * argumento curto picado em passos só perde o fio.
 *
 * O quarto elemento corrige o tipo quando o nível sozinho não o descreve:
 * "Derive sen 3x" é nível 4, mas é cálculo, não aplicação.
 */
type Task = [question: string, answer: string, solution: string | string[], type?: ExerciseType];
type Blueprint = {
  slug: string;
  title: string;
  tema: string;
  temaSlug: string;
  area: string;
  identify: string;
  hint: string;
  meaning: string;
  error: string;
  tasks: [Task, Task, Task, Task, Task];
};

const blueprints: Blueprint[] = [
  {
    slug: "fracoes-algebricas", title: "Frações algébricas", tema: "Álgebra", temaSlug: "algebra", area: "Álgebra · restrições",
    identify: "Liste as restrições e procure fatores comuns antes de simplificar.", hint: "Fatore numerador e denominador; não cancele parcelas.", meaning: "A forma simplificada mantém o domínio da expressão original.", error: "Cancelar termos separados por soma ou esquecer um valor proibido.",
    tasks: [
      ["Simplifique \\(\\frac{6x}{3x}\\), com \\(x\\ne0\\).", "2", [
        "Numerador e denominador são produtos, então os fatores podem ser separados: \\(\\frac{6x}{3x} = \\frac{6}{3} \\cdot \\frac{x}{x}\\).",
        "\\(\\frac{6}{3} = 2\\) e, como \\(x \\neq 0\\), \\(\\frac{x}{x} = 1\\).",
        "Resultado: \\(2 \\cdot 1 = 2\\).",
      ]],
      ["Simplifique \\(\\frac{x^2-4}{x-2}\\) e registre a restrição.", "\\(x+2,\\ x\\ne2\\)", [
        "O denominador zera em \\(x = 2\\): essa restrição vem antes de qualquer conta.",
        "Diferença de quadrados: \\(x^2 - 4 = (x - 2)(x + 2)\\).",
        "Em \\(\\frac{(x - 2)(x + 2)}{x - 2}\\), o fator \\((x - 2)\\) aparece em cima e embaixo e se cancela.",
        "Sobra \\(x + 2\\), com \\(x \\neq 2\\).",
      ]],
      ["Explique por que \\(x=2\\) continua proibido após a simplificação anterior.", "Porque zerava o denominador original", "A simplificação só vale onde a expressão original existe. Em \\(x = 2\\), o denominador original \\(x - 2\\) vale zero, então \\(\\frac{x^2-4}{x-2}\\) não tem valor ali. A forma \\(x + 2\\) coincide com a original em todos os outros pontos, mas não devolve o ponto que faltava."],
      ["Simplifique \\(\\frac{x^2-9}{x^2+x-6}\\).", "\\(\\frac{x-3}{x-2}\\), com \\(x\\ne-3,2\\)", [
        "Numerador: diferença de quadrados, \\(x^2 - 9 = (x - 3)(x + 3)\\).",
        "Denominador: dois números de produto \\(-6\\) e soma \\(1\\), que são \\(3\\) e \\(-2\\). Então \\(x^2 + x - 6 = (x + 3)(x - 2)\\).",
        "O denominador original zera em \\(x = -3\\) e em \\(x = 2\\): as duas restrições ficam.",
        "Cancelando \\((x + 3)\\): \\(\\frac{x - 3}{x - 2}\\), com \\(x \\neq -3\\) e \\(x \\neq 2\\).",
      ], "calculo"],
      ["Escreva \\(\\frac{x}{x-1}+\\frac1{x+1}\\) como uma única fração.", "\\(\\frac{x^2+2x-1}{x^2-1}\\), \\(x\\ne\\pm1\\)", [
        "Restrições: \\(x \\neq 1\\) e \\(x \\neq -1\\).",
        "Denominador comum: \\((x - 1)(x + 1) = x^2 - 1\\).",
        "Ajuste cada fração ao denominador comum: \\(\\frac{x(x + 1)}{x^2 - 1} + \\frac{x - 1}{x^2 - 1}\\).",
        "Some os numeradores: \\(x^2 + x + x - 1 = x^2 + 2x - 1\\).",
        "Resultado: \\(\\frac{x^2 + 2x - 1}{x^2 - 1}\\), com \\(x \\neq \\pm 1\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "funcoes-por-partes", title: "Funções por partes", tema: "Funções", temaSlug: "funcoes", area: "Funções · condições",
    identify: "Escolha a regra pelo intervalo da entrada e separe valor de limite.", hint: "Observe com atenção os símbolos \\(<\\), \\(>\\), \\(\\le\\) e \\(\\ge\\).", meaning: "Uma mudança de regra pode ou não produzir salto.", error: "Usar a expressão errada no ponto de troca.",
    tasks: [
      ["Se \\(f(x)=x+1\\) para \\(x<0\\) e \\(f(x)=x^2\\) para \\(x\\ge0\\), calcule \\(f(-2)\\).", "-1", [
        "Qual regra vale? \\(-2 < 0\\), então usamos \\(f(x) = x + 1\\).",
        "\\(f(-2) = -2 + 1 = -1\\).",
      ]],
      ["Na mesma função, calcule \\(f(0)\\).", "0", [
        "Em \\(x = 0\\) vale a regra que tem o sinal de igual: \\(x \\geq 0\\), isto é, \\(f(x) = x^2\\).",
        "\\(f(0) = 0^2 = 0\\).",
      ]],
      ["Os limites laterais em 0 coincidem?", "Não", [
        "Pela esquerda (\\(x < 0\\)) vale \\(x + 1\\), que tende a \\(0 + 1 = 1\\).",
        "Pela direita (\\(x > 0\\)) vale \\(x^2\\), que tende a \\(0\\).",
        "\\(1 \\neq 0\\): os limites laterais não coincidem, e o gráfico dá um salto em 0.",
      ]],
      ["Escolha \\(k\\) para tornar contínua em 1: \\(f(x)=x+k\\) se \\(x<1\\), e \\(f(x)=3x\\) se \\(x\\ge1\\).", "2", [
        "Pela esquerda de 1 vale \\(x + k\\), que tende a \\(1 + k\\).",
        "Pela direita e no próprio ponto vale \\(3x\\): a tendência é \\(3\\) e \\(f(1) = 3\\).",
        "Continuidade exige que as duas tendências coincidam: \\(1 + k = 3\\), logo \\(k = 2\\).",
      ], "calculo"],
      ["Crie uma função por partes para frete grátis acima de R$ 100 e taxa de R$ 15 abaixo disso.", "\\(F(v)=15\\) se \\(v<100\\), \\(F(v)=0\\) se \\(v\\ge100\\)", [
        "A entrada é o valor da compra \\(v\\), em reais; a saída é o frete.",
        "Abaixo de R$ 100 o frete é R$ 15: \\(F(v) = 15\\) para \\(v < 100\\).",
        "A partir de R$ 100 é grátis: \\(F(v) = 0\\) para \\(v \\geq 100\\).",
        "O \\(\\geq\\) decide o caso de exatamente R$ 100: nessa compra o frete já é grátis.",
      ]],
    ],
  },
  {
    slug: "composicao", title: "Composição de funções", tema: "Funções", temaSlug: "funcoes", area: "Funções · camadas",
    identify: "Localize a função interna e aplique-a primeiro.", hint: "Leia \\(f(g(x))\\) de dentro para fora.", meaning: "A composição representa um processo em etapas.", error: "Trocar a ordem ou somar as funções.",
    tasks: [
      ["Se \\(f(x)=x+2\\) e \\(g(x)=3x\\), calcule \\(f(g(1))\\).", "5", [
        "Primeiro a função de dentro: \\(g(1) = 3 \\cdot 1 = 3\\).",
        "Depois a de fora, aplicada ao resultado: \\(f(3) = 3 + 2 = 5\\).",
      ]],
      ["Escreva \\(f(g(x))\\) para as funções anteriores.", "\\(3x+2\\)", [
        "A entrada de \\(f\\) passa a ser \\(g(x) = 3x\\).",
        "\\(f(3x) = 3x + 2\\).",
      ]],
      ["Explique por que \\(f\\circ g\\) pode diferir de \\(g\\circ f\\).", "Porque a ordem das etapas muda", "A ordem define qual etapa acontece primeiro. \\(f(g(x))\\) multiplica por 3 e depois soma 2: \\(3x + 2\\). \\(g(f(x))\\) soma 2 e depois multiplica tudo por 3: \\(3(x + 2) = 3x + 6\\). Em \\(x = 0\\), uma dá 2 e a outra dá 6."],
      ["Decomponha \\(h(x)=\\sqrt{2x+1}\\) em interna e externa.", "interna \\(2x+1\\); externa \\(\\sqrt{u}\\)", [
        "Pergunte o que é calculado primeiro: \\(2x + 1\\).",
        "Essa é a função interna: \\(g(x) = 2x + 1\\).",
        "O que se faz com o resultado é a externa: \\(f(u) = \\sqrt{u}\\), e \\(h(x) = f(g(x))\\).",
      ], "compreensao"],
      ["Um preço recebe 10% de desconto e depois taxa fixa de R$ 5. Modele a composição.", "\\(C(p)=0{,}9p+5\\)", [
        "Desconto de 10%: \\(g(p) = 0{,}9p\\), isto é, pagar 90% do preço.",
        "Taxa fixa depois: \\(f(u) = u + 5\\).",
        "Composição na ordem do enunciado: \\(C(p) = f(g(p)) = 0{,}9p + 5\\).",
        "Na ordem inversa daria \\(0{,}9(p + 5) = 0{,}9p + 4{,}5\\): o desconto incidiria também sobre a taxa.",
      ]],
    ],
  },
  {
    slug: "limites-fatoracao", title: "Limites por fatoração", tema: "Limites", temaSlug: "limites", area: "Limites · álgebra",
    identify: "Substitua, reconheça \\(0/0\\) e escolha a fatoração.", hint: "Procure diferença de quadrados, fator comum ou trinômio.", meaning: "A fatoração revela o comportamento escondido perto do furo.", error: "Tratar \\(0/0\\) como resposta ou cancelar parcelas.",
    tasks: [
      ["Calcule \\(\\lim_{x\\to2}\\frac{x^2-4}{x-2}\\).", "4", [
        "Substituindo \\(x = 2\\): \\(\\frac{0}{0}\\), uma indeterminação.",
        "Fatore: \\(x^2 - 4 = (x - 2)(x + 2)\\).",
        "Para \\(x \\neq 2\\), a fração vale \\(x + 2\\).",
        "Quando \\(x \\to 2\\), \\(x + 2 \\to 4\\).",
      ]],
      ["Calcule \\(\\lim_{x\\to-3}\\frac{x^2-9}{x+3}\\).", "-6", [
        "Substituindo \\(x = -3\\): \\(\\frac{9 - 9}{0} = \\frac{0}{0}\\).",
        "\\(x^2 - 9 = (x + 3)(x - 3)\\); cancelando \\((x + 3)\\), sobra \\(x - 3\\).",
        "Quando \\(x \\to -3\\), \\(x - 3 \\to -6\\).",
      ]],
      ["O que informa a forma \\(0/0\\)?", "Que o método direto é inconclusivo", "\\(\\frac{0}{0}\\) não é um número: diz apenas que numerador e denominador vão juntos a zero e que a substituição direta não decide. O limite pode dar qualquer valor — ou nem existir —, e é preciso transformar a expressão, fatorando ou racionalizando, para descobrir."],
      ["Calcule \\(\\lim_{x\\to1}\\frac{x^3-1}{x-1}\\).", "3", [
        "Substituindo \\(x = 1\\): \\(\\frac{0}{0}\\).",
        "Diferença de cubos: \\(x^3 - 1 = (x - 1)(x^2 + x + 1)\\).",
        "Para \\(x \\neq 1\\), a fração vale \\(x^2 + x + 1\\).",
        "Quando \\(x \\to 1\\): \\(1 + 1 + 1 = 3\\).",
      ], "calculo"],
      ["Calcule \\(\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}\\).", "\\(2x\\)", [
        "Expanda: \\((x + h)^2 - x^2 = x^2 + 2xh + h^2 - x^2 = 2xh + h^2\\).",
        "Ponha \\(h\\) em evidência: \\(\\frac{h(2x + h)}{h} = 2x + h\\), para \\(h \\neq 0\\).",
        "Quando \\(h \\to 0\\), \\(2x + h \\to 2x\\).",
        "É a derivada de \\(x^2\\) calculada pela definição.",
      ], "calculo"],
    ],
  },
  {
    slug: "racionalizacao", title: "Racionalização", tema: "Limites", temaSlug: "limites", area: "Limites · radicais",
    identify: "Procure diferença de raízes e escolha o conjugado.", hint: "Multiplique numerador e denominador pelo conjugado.", meaning: "O conjugado transforma radicais em diferença de quadrados.", error: "Multiplicar apenas um lado da fração ou usar o mesmo sinal.",
    tasks: [
      ["Qual o conjugado de \\(\\sqrt{x}-2\\)?", "\\(\\sqrt{x}+2\\)", [
        "O conjugado mantém os dois termos e troca o sinal entre eles.",
        "De \\(\\sqrt{x} - 2\\) vem \\(\\sqrt{x} + 2\\).",
        "É o que tira a raiz: \\((\\sqrt{x} - 2)(\\sqrt{x} + 2) = x - 4\\).",
      ]],
      ["Calcule \\(\\lim_{x\\to4}\\frac{\\sqrt{x}-2}{x-4}\\).", "\\(1/4\\)", [
        "Substituindo \\(x = 4\\): \\(\\frac{0}{0}\\).",
        "Multiplique em cima e embaixo por \\(\\sqrt{x} + 2\\): o numerador vira \\(x - 4\\).",
        "\\(\\frac{x - 4}{(x - 4)(\\sqrt{x} + 2)} = \\frac{1}{\\sqrt{x} + 2}\\), para \\(x \\neq 4\\).",
        "Quando \\(x \\to 4\\): \\(\\frac{1}{2 + 2} = \\frac{1}{4}\\).",
      ]],
      ["Por que multiplicar pelo conjugado não muda o valor?", "Porque multiplicamos por 1", "Multiplicamos em cima e embaixo pela mesma expressão, \\(\\sqrt{x} + 2\\), e \\(\\frac{\\sqrt{x} + 2}{\\sqrt{x} + 2} = 1\\) sempre que \\(\\sqrt{x} + 2 \\neq 0\\) — o que vale para todo \\(x \\geq 0\\). Multiplicar por 1 muda a forma da expressão, não o seu valor."],
      ["Calcule \\(\\lim_{x\\to0}\\frac{\\sqrt{1+x}-1}{x}\\).", "\\(1/2\\)", [
        "Substituindo \\(x = 0\\): \\(\\frac{0}{0}\\).",
        "Multiplique por \\(\\sqrt{1 + x} + 1\\) em cima e embaixo: o numerador vira \\((1 + x) - 1 = x\\).",
        "\\(\\frac{x}{x(\\sqrt{1 + x} + 1)} = \\frac{1}{\\sqrt{1 + x} + 1}\\), para \\(x \\neq 0\\).",
        "Quando \\(x \\to 0\\): \\(\\frac{1}{1 + 1} = \\frac{1}{2}\\).",
      ], "calculo"],
      ["Calcule \\(\\lim_{x\\to9}\\frac{x-9}{\\sqrt{x}-3}\\).", "6", [
        "Substituindo \\(x = 9\\): \\(\\frac{0}{0}\\).",
        "Veja \\(x - 9\\) como diferença de quadrados: \\(x - 9 = (\\sqrt{x} - 3)(\\sqrt{x} + 3)\\), para \\(x \\geq 0\\).",
        "Cancelando \\((\\sqrt{x} - 3)\\), sobra \\(\\sqrt{x} + 3\\).",
        "Quando \\(x \\to 9\\): \\(3 + 3 = 6\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "polinomios-racionais", title: "Polinômios e funções racionais", tema: "Funções p/ cálculo", temaSlug: "funcoes-calculo", area: "Funções · comportamento",
    identify: "Encontre grau, zeros, restrições e fatores canceláveis.", hint: "Use a forma fatorada e o termo dominante.", meaning: "A álgebra antecipa interceptos, furos e assíntotas.", error: "Confundir zero do numerador com valor proibido.",
    tasks: [
      ["Qual o grau de \\(4x^3-x+2\\)?", "3", [
        "Os termos têm expoentes 3, 1 e 0.",
        "O grau é o maior expoente com coeficiente diferente de zero: \\(3\\), de \\(4x^3\\).",
      ]],
      ["Quais zeros de \\((x-1)(x+4)\\)?", "1 e -4", [
        "Um produto é zero quando algum dos fatores é zero.",
        "\\(x - 1 = 0\\) dá \\(x = 1\\); \\(x + 4 = 0\\) dá \\(x = -4\\).",
      ]],
      ["Um zero de multiplicidade par toca ou cruza o eixo?", "Toca", "Num zero de multiplicidade par, como o de \\((x - 2)^2\\), o fator repetido é um quadrado e não troca de sinal ao passar pelo zero. O gráfico chega ao eixo, encosta e volta para o mesmo lado: toca, sem atravessar."],
      ["Classifique \\(x=2\\) em \\((x-2)/(x^2-4)\\).", "furo", [
        "O denominador \\(x^2 - 4\\) zera em \\(x = 2\\): o ponto está fora do domínio.",
        "Fatore: \\(\\frac{x - 2}{(x - 2)(x + 2)} = \\frac{1}{x + 2}\\), para \\(x \\neq \\pm 2\\).",
        "Perto de 2 a expressão tende a \\(\\frac{1}{4}\\), um número finito: o gráfico tem um furo em \\(\\left(2, \\frac{1}{4}\\right)\\), e não uma assíntota.",
        "Em \\(x = -2\\), ao contrário, o fator não cancela: ali há assíntota vertical.",
      ], "interpretacao"],
      ["Descreva o comportamento de \\((2x^3+x)/(x^2+1)\\) no infinito.", "cresce como \\(2x\\)", [
        "Divida o numerador pelo denominador: \\(2x^3 + x = 2x(x^2 + 1) - x\\).",
        "Então \\(\\frac{2x^3 + x}{x^2 + 1} = 2x - \\frac{x}{x^2 + 1}\\).",
        "Quando \\(x \\to \\pm\\infty\\), \\(\\frac{x}{x^2 + 1} \\to 0\\): a função se aproxima da reta \\(y = 2x\\).",
      ], "interpretacao"],
    ],
  },
  {
    slug: "limites-laterais", title: "Limites laterais", tema: "Limites", temaSlug: "limites", area: "Limites · gráficos",
    identify: "Separe aproximação pela esquerda e pela direita.", hint: "O limite bilateral só existe se os dois lados coincidirem.", meaning: "Os lados descrevem o que acontece antes e depois do ponto.", error: "Fazer média entre limites laterais diferentes.",
    tasks: [
      ["Se esquerda e direita tendem a 3, qual o limite?", "3", "O limite bilateral existe quando os limites pela esquerda e pela direita existem e são iguais. Aqui os dois valem 3, então o limite é 3.", "compreensao"],
      ["Se esquerda tende a 1 e direita a 4, o limite bilateral existe?", "Não", "Para o limite bilateral existir, os dois lados precisam apontar para o mesmo número. Com 1 pela esquerda e 4 pela direita, não há um valor único: o limite bilateral não existe — e não se tira a média entre os lados.", "compreensao"],
      ["Uma função pode ter limite em \\(a\\) sem estar definida em \\(a\\)?", "Sim", "O limite olha os valores de \\(f\\) perto de \\(a\\), nunca o valor em \\(a\\). Por isso ele pode existir com a função indefinida no ponto: \\(\\frac{x^2 - 1}{x - 1}\\) não existe em \\(x = 1\\), mas tende a 2 quando \\(x \\to 1\\)."],
      ["Analise \\(1/x\\) quando \\(x\\to0^-\\) e \\(x\\to0^+\\).", "\\(-\\infty\\) e \\(+\\infty\\)", [
        "Pela esquerda, \\(x\\) é negativo e pequeno: \\(-0{,}1\\), \\(-0{,}01\\), \\(-0{,}001\\).",
        "Nesses pontos \\(\\frac{1}{x}\\) vale \\(-10\\), \\(-100\\), \\(-1000\\): decresce sem limite, \\(-\\infty\\).",
        "Pela direita, \\(x\\) é positivo e pequeno, e \\(\\frac{1}{x}\\) vale \\(10\\), \\(100\\), \\(1000\\): \\(+\\infty\\).",
        "Os lados explodem em sentidos opostos: não há limite bilateral, e \\(x = 0\\) é assíntota vertical.",
      ], "interpretacao"],
      ["Construa uma função por partes com limite 2 em 0, mas valor \\(f(0)=7\\).", "Por exemplo \\(f(x)=2\\) se \\(x\\ne0\\), e \\(f(0)=7\\)", [
        "Para o limite ser 2, os valores perto de 0 precisam ficar em 2: tome \\(f(x) = 2\\) para \\(x \\neq 0\\).",
        "O valor no ponto é independente do limite: defina \\(f(0) = 7\\).",
        "Pelos dois lados a função vale 2, então o limite é 2, embora \\(f(0) = 7\\). É uma descontinuidade removível.",
      ], "compreensao"],
    ],
  },
  {
    slug: "limites-trig", title: "Limites trigonométricos", tema: "Limites", temaSlug: "limites", area: "Limites · trigonometria",
    identify: "Faça o argumento do seno coincidir com o denominador.", hint: "Use \\(\\lim_{u\\to0}\\sin u/u=1\\) em radianos.", meaning: "O fator interno antecipa a regra da cadeia.", error: "Usar graus ou esquecer o fator que ajusta o argumento.",
    tasks: [
      ["Calcule \\(\\lim_{x\\to0}\\sin x/x\\).", "1", [
        "É o limite trigonométrico fundamental: em radianos, \\(\\frac{\\sin x}{x} \\to 1\\) quando \\(x \\to 0\\).",
        "A justificativa está na aula do limite trigonométrico fundamental: o quociente fica espremido entre \\(\\cos x\\) e \\(1\\).",
      ]],
      ["Calcule \\(\\lim_{x\\to0}\\sin(4x)/x\\).", "4", [
        "Para usar o limite fundamental, o denominador precisa ser igual ao argumento do seno, \\(4x\\).",
        "Multiplique e divida por 4: \\(\\frac{\\sin(4x)}{x} = 4 \\cdot \\frac{\\sin(4x)}{4x}\\).",
        "Quando \\(x \\to 0\\), também \\(4x \\to 0\\), e \\(\\frac{\\sin(4x)}{4x} \\to 1\\). O limite é \\(4 \\cdot 1 = 4\\).",
      ]],
      ["Por que radianos são essenciais nesta fórmula?", "Porque em radianos a razão tende a 1", "O limite \\(\\frac{\\sin x}{x} \\to 1\\) vem de comparar áreas no círculo de raio 1, e a área de uma fatia de ângulo \\(x\\) só vale \\(\\frac{x}{2}\\) com o ângulo em radianos. Em graus, o mesmo quociente tende a \\(\\frac{\\pi}{180}\\), e todas as derivadas trigonométricas ganhariam esse fator."],
      ["Calcule \\(\\lim_{x\\to0}\\tan x/x\\).", "1", [
        "Escreva \\(\\frac{\\tan x}{x} = \\frac{\\sin x}{x} \\cdot \\frac{1}{\\cos x}\\).",
        "Quando \\(x \\to 0\\): \\(\\frac{\\sin x}{x} \\to 1\\) e \\(\\cos x \\to 1\\).",
        "O limite é \\(1 \\cdot 1 = 1\\).",
      ], "calculo"],
      ["Calcule \\(\\lim_{x\\to0}\\sin(3x)/\\sin(5x)\\).", "\\(3/5\\)", [
        "Crie os dois quocientes fundamentais: \\(\\frac{\\sin(3x)}{\\sin(5x)} = \\frac{\\sin(3x)}{3x} \\cdot \\frac{5x}{\\sin(5x)} \\cdot \\frac{3x}{5x}\\).",
        "Os dois primeiros fatores tendem a 1 quando \\(x \\to 0\\).",
        "Sobra \\(\\frac{3x}{5x} = \\frac{3}{5}\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "derivadas-trig", title: "Derivadas trigonométricas", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · ondas",
    identify: "Escolha a regra trigonométrica e verifique se há composição.", hint: "Seno vira cosseno; cosseno vira menos seno.", meaning: "A frequência interna multiplica a taxa da onda.", error: "Esquecer o sinal do cosseno ou a cadeia.",
    tasks: [
      ["Derive \\(\\sin x\\).", "\\(\\cos x\\)", [
        "Pela regra do seno, com o ângulo em radianos: \\((\\sin x)' = \\cos x\\).",
        "A demonstração, pela definição de derivada, está na aula de derivadas trigonométricas.",
      ]],
      ["Derive \\(\\cos x\\).", "\\(-\\sin x\\)", [
        "Pela regra do cosseno: \\((\\cos x)' = -\\sin x\\).",
        "O sinal de menos diz que, onde o seno é positivo, o cosseno está diminuindo — por exemplo, logo depois de \\(x = 0\\).",
      ]],
      ["Interprete o que ocorre com a inclinação do seno em \\(x=\\pi/2\\).", "É zero", [
        "A inclinação do seno é a sua derivada, \\(\\cos x\\).",
        "Em \\(x = \\frac{\\pi}{2}\\): \\(\\cos\\frac{\\pi}{2} = 0\\).",
        "Inclinação zero com \\(\\sin\\frac{\\pi}{2} = 1\\), o maior valor do seno: é o topo da onda, um máximo local.",
      ]],
      ["Derive \\(\\sin(3x)\\).", "\\(3\\cos(3x)\\)", [
        "Externa: \\(\\sin u\\), com derivada \\(\\cos u\\). Interna: \\(u = 3x\\), com derivada \\(3\\).",
        "Regra da cadeia: \\(\\cos(3x) \\cdot 3 = 3\\cos(3x)\\).",
      ], "calculo"],
      ["Derive \\(x^2\\cos x\\).", "\\(2x\\cos x-x^2\\sin x\\)", [
        "É um produto: \\(f = x^2\\) e \\(g = \\cos x\\), com \\(f' = 2x\\) e \\(g' = -\\sin x\\).",
        "Regra do produto: \\(f'g + fg' = 2x\\cos x + x^2(-\\sin x)\\).",
        "Resultado: \\(2x\\cos x - x^2\\sin x\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "derivadas-exp-log", title: "Derivadas exponenciais e logarítmicas", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · crescimento",
    identify: "Distinga \\(e^x\\), base geral e logaritmo; procure a função interna.", hint: "Para \\(\\ln u\\), use \\(u'/u\\).", meaning: "Essas taxas modelam crescimento multiplicativo e escalas relativas.", error: "Esquecer \\(\\ln a\\) ou a derivada interna.",
    tasks: [
      ["Derive \\(e^x\\).", "\\(e^x\\)", [
        "A exponencial natural é a própria derivada: \\((e^x)' = e^x\\).",
        "Isso vem do limite \\(\\frac{e^h - 1}{h} \\to 1\\); a demonstração está na aula de derivadas exponenciais e logarítmicas.",
      ]],
      ["Derive \\(2^x\\).", "\\(2^x\\ln2\\)", [
        "Para base \\(a > 0\\): \\((a^x)' = a^x \\ln a\\).",
        "Com \\(a = 2\\): \\((2^x)' = 2^x \\ln 2\\).",
        "Como \\(\\ln 2 \\approx 0{,}69\\), a taxa de \\(2^x\\) é cerca de 69% do próprio valor.",
      ]],
      ["Qual o domínio de \\((\\ln x)'=1/x\\)?", "\\(x>0\\)", "A fórmula \\((\\ln x)' = \\frac{1}{x}\\) só faz sentido onde \\(\\ln x\\) existe, e o logaritmo real exige argumento positivo. Por isso o domínio é \\(x > 0\\), mesmo que \\(\\frac{1}{x}\\), sozinha, também exista para \\(x\\) negativo."],
      ["Derive \\(\\ln(x^2+1)\\).", "\\(2x/(x^2+1)\\)", [
        "Externa: \\(\\ln u\\), com derivada \\(\\frac{1}{u}\\). Interna: \\(u = x^2 + 1\\), com \\(u' = 2x\\).",
        "Cadeia: \\(\\frac{u'}{u} = \\frac{2x}{x^2 + 1}\\).",
        "O argumento \\(x^2 + 1\\) é sempre positivo, então a fórmula vale para todo \\(x\\).",
      ], "calculo"],
      ["Derive \\(e^{x^2}\\ln x\\).", "\\(2xe^{x^2}\\ln x+e^{x^2}/x\\)", [
        "É um produto: \\(f = e^{x^2}\\) e \\(g = \\ln x\\), com \\(x > 0\\).",
        "\\(f' = e^{x^2} \\cdot 2x\\), pela cadeia; \\(g' = \\frac{1}{x}\\).",
        "Regra do produto: \\(f'g + fg' = 2xe^{x^2}\\ln x + \\frac{e^{x^2}}{x}\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "derivacao-implicita", title: "Derivação implícita", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · relações",
    identify: "Derive os dois lados e multiplique termos com \\(y\\) por \\(y'\\).", hint: "\\(y\\) é uma função de \\(x\\).", meaning: "A inclinação pode ser obtida sem isolar globalmente a variável.", error: "Omitir \\(y'\\) ao derivar potências de \\(y\\).",
    tasks: [
      ["Derive \\(y^2\\) em relação a \\(x\\).", "\\(2yy'\\)", [
        "\\(y\\) depende de \\(x\\), então \\(y^2\\) é uma composição: externa \\(u^2\\), interna \\(y\\).",
        "Cadeia: \\(2y \\cdot y' = 2yy'\\).",
      ]],
      ["Para \\(x^2+y^2=25\\), encontre \\(y'\\).", "\\(-x/y\\)", [
        "Derive os dois lados em relação a \\(x\\): \\(2x + 2yy' = 0\\).",
        "Isole o termo com \\(y'\\): \\(2yy' = -2x\\).",
        "\\(y' = -\\frac{x}{y}\\), onde \\(y \\neq 0\\).",
      ]],
      ["Qual a inclinação da circunferência no ponto \\((0,5)\\)?", "0", [
        "Use \\(y' = -\\frac{x}{y}\\), do exercício anterior.",
        "Em \\((0, 5)\\): \\(y' = -\\frac{0}{5} = 0\\).",
        "Tangente horizontal: \\((0, 5)\\) é o ponto mais alto da circunferência.",
      ]],
      ["Derive \\(xy=10\\).", "\\(y'=-y/x\\)", [
        "Derive o produto \\(xy\\) pela regra do produto: \\(1 \\cdot y + x \\cdot y' = 0\\).",
        "Isole: \\(xy' = -y\\).",
        "\\(y' = -\\frac{y}{x}\\), para \\(x \\neq 0\\).",
      ], "calculo"],
      ["Para \\(x^2+xy+y^2=7\\), isole \\(y'\\) onde \\(x+2y\\ne0\\).", "\\(-\\frac{2x+y}{x+2y}\\)", [
        "Derive termo a termo: \\(2x + (y + xy') + 2yy' = 0\\).",
        "Agrupe os termos com \\(y'\\): \\(y'(x + 2y) = -(2x + y)\\).",
        "Onde \\(x + 2y \\neq 0\\): \\(y' = -\\frac{2x + y}{x + 2y}\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "taxas-relacionadas", title: "Taxas relacionadas", tema: "Aplic. derivadas", temaSlug: "aplicacoes-derivadas", area: "Modelagem · movimento",
    identify: "Escreva a relação, derive no tempo e substitua o instante ao final.", hint: "Anote as unidades de cada taxa.", meaning: "A geometria conecta grandezas que mudam simultaneamente.", error: "Substituir valores antes de derivar ou perder unidades.",
    tasks: [
      ["Se \\(A=\\pi r^2\\), escreva \\(dA/dt\\).", "\\(2\\pi r\\,dr/dt\\)", [
        "O raio muda com o tempo, então \\(A = \\pi r^2\\) é uma composição em \\(t\\).",
        "Derivando em relação a \\(t\\): \\(\\frac{dA}{dt} = 2\\pi r \\cdot \\frac{dr}{dt}\\).",
      ]],
      ["Com \\(r=3\\) e \\(dr/dt=2\\), ache \\(dA/dt\\).", "\\(12\\pi\\)", [
        "Use a relação \\(\\frac{dA}{dt} = 2\\pi r\\,\\frac{dr}{dt}\\).",
        "\\(\\frac{dA}{dt} = 2\\pi \\cdot 3 \\cdot 2 = 12\\pi\\).",
        "Com \\(r\\) em cm e \\(t\\) em s, a área cresce \\(12\\pi \\approx 37{,}7\\) cm² por segundo nesse instante.",
      ]],
      ["Por que \\(dA/dt\\) tem unidade quadrada por tempo?", "Porque mede mudança de área", "\\(\\frac{dA}{dt}\\) é uma variação de área dividida por uma variação de tempo. Área tem unidade de comprimento ao quadrado, então a taxa sai em cm²/s, m²/min e assim por diante. Conferir a unidade é um jeito rápido de pegar erros de modelagem."],
      ["Um balão esférico tem \\(V=4\\pi r^3/3\\). Ache \\(dV/dt\\).", "\\(4\\pi r^2 dr/dt\\)", [
        "\\(V = \\frac{4}{3}\\pi r^3\\), com o raio dependendo do tempo.",
        "Derivando em \\(t\\): \\(\\frac{dV}{dt} = \\frac{4}{3}\\pi \\cdot 3r^2 \\cdot \\frac{dr}{dt}\\).",
        "Simplificando: \\(\\frac{dV}{dt} = 4\\pi r^2\\,\\frac{dr}{dt}\\) — a área da superfície vezes a velocidade com que o raio cresce.",
      ]],
      ["Uma escada de 5 m tem base afastando a 1 m/s. Qual \\(dy/dt\\) quando \\(x=3\\), \\(y=4\\)?", "\\(-3/4\\) m/s", [
        "Relação: com a base em \\(x\\) e o topo em \\(y\\), \\(x^2 + y^2 = 25\\).",
        "Derivando em \\(t\\): \\(2x\\,\\frac{dx}{dt} + 2y\\,\\frac{dy}{dt} = 0\\).",
        "Com \\(x = 3\\), \\(y = 4\\) e \\(\\frac{dx}{dt} = 1\\): \\(6 + 8\\,\\frac{dy}{dt} = 0\\).",
        "\\(\\frac{dy}{dt} = -\\frac{3}{4}\\) m/s: o topo desce 0,75 m por segundo nesse instante.",
      ]],
    ],
  },
  {
    slug: "substituicao", title: "Integração por substituição", tema: "Integrais", temaSlug: "integrais", area: "Integrais · cadeia ao contrário",
    identify: "Escolha a função interna e procure sua derivada no restante do integrando.", hint: "Troque toda a expressão para \\(u\\), sem misturar variáveis.", meaning: "Substituição desfaz composições produzidas pela regra da cadeia.", error: "Escolher \\(u\\) sem que \\(du\\) apareça ou esquecer de voltar para \\(x\\).",
    tasks: [
      ["Em \\(\\int2x(x^2+1)^3dx\\), escolha \\(u\\).", "\\(u=x^2+1\\)", [
        "Procure uma função interna cuja derivada apareça no resto do integrando.",
        "Dentro do parêntese está \\(x^2 + 1\\), e a derivada dele, \\(2x\\), multiplica o resto.",
        "Escolha \\(u = x^2 + 1\\), com \\(du = 2x\\,dx\\).",
      ]],
      ["Calcule a integral anterior.", "\\((x^2+1)^4/4+C\\)", [
        "Com \\(u = x^2 + 1\\) e \\(du = 2x\\,dx\\), a integral vira \\(\\int u^3\\,du\\).",
        "\\(\\int u^3\\,du = \\frac{u^4}{4} + C\\).",
        "Volte para \\(x\\): \\(\\frac{(x^2 + 1)^4}{4} + C\\).",
      ]],
      ["Como conferir uma substituição?", "Derivando a resposta", "Derive a resposta e compare com o integrando. No exercício anterior, a derivada de \\(\\frac{(x^2 + 1)^4}{4}\\) é \\((x^2 + 1)^3 \\cdot 2x\\), pela regra da cadeia — exatamente o que estava dentro da integral. Se a derivada não voltar ao integrando, a substituição tem algum erro."],
      ["Calcule \\(\\int x/(x^2+4)dx\\).", "\\(\\frac12\\ln(x^2+4)+C\\)", [
        "Escolha \\(u = x^2 + 4\\). Então \\(du = 2x\\,dx\\), e \\(x\\,dx = \\frac{du}{2}\\).",
        "A integral vira \\(\\frac{1}{2}\\int \\frac{du}{u} = \\frac{1}{2}\\ln|u| + C\\).",
        "Como \\(x^2 + 4 > 0\\), o módulo pode sair: \\(\\frac{1}{2}\\ln(x^2 + 4) + C\\).",
      ], "calculo"],
      ["Calcule \\(\\int_0^1 2x e^{x^2}dx\\).", "\\(e-1\\)", [
        "Escolha \\(u = x^2\\), com \\(du = 2x\\,dx\\).",
        "Transforme os extremos junto: \\(x = 0\\) vira \\(u = 0\\), e \\(x = 1\\) vira \\(u = 1\\).",
        "A integral vira \\(\\int_0^1 e^u\\,du = e^1 - e^0 = e - 1\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "area-entre-curvas", title: "Área entre curvas", tema: "Integrais", temaSlug: "integrais", area: "Integrais · geometria",
    identify: "Encontre interseções e determine a curva de cima em cada trecho.", hint: "Integre cima menos baixo; divida onde a ordem trocar.", meaning: "A integral acumula distância vertical entre curvas.", error: "Aceitar área negativa ou ignorar cruzamentos.",
    tasks: [
      ["Entre \\(y=2\\) e \\(y=x\\) em \\([0,1]\\), qual integrando?", "\\(2-x\\)", [
        "Em \\([0, 1]\\), a reta \\(y = x\\) não passa de 1, e a reta \\(y = 2\\) fica sempre acima dela.",
        "O integrando é a altura de cima menos a de baixo: \\(2 - x\\).",
      ]],
      ["Calcule essa área.", "\\(3/2\\)", [
        "Uma antiderivada de \\(2 - x\\) é \\(2x - \\frac{x^2}{2}\\).",
        "Avaliando de 0 a 1: \\(\\left(2 - \\frac{1}{2}\\right) - 0 = \\frac{3}{2}\\).",
      ]],
      ["Por que 'cima menos baixo'?", "Para medir distância vertical positiva", "A altura de cada fatia vertical é a distância entre as curvas, e distância não é negativa. Cima menos baixo garante isso. Na ordem inversa a integral sairia negativa, e somar trechos em ordens diferentes faria as áreas se cancelarem."],
      ["Calcule a área entre \\(y=x\\) e \\(y=x^2\\) em \\([0,1]\\).", "\\(1/6\\)", [
        "Em \\([0, 1]\\), \\(x \\geq x^2\\): em \\(x = \\frac{1}{2}\\), por exemplo, \\(\\frac{1}{2} > \\frac{1}{4}\\).",
        "Uma antiderivada de \\(x - x^2\\) é \\(\\frac{x^2}{2} - \\frac{x^3}{3}\\).",
        "Avaliando de 0 a 1: \\(\\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}\\).",
      ], "calculo"],
      ["Ache a área entre \\(y=x^2\\) e \\(y=2x\\) entre as interseções.", "\\(4/3\\)", [
        "Interseções: \\(x^2 = 2x\\) dá \\(x(x - 2) = 0\\), isto é, \\(x = 0\\) e \\(x = 2\\).",
        "Entre elas, \\(2x \\geq x^2\\): em \\(x = 1\\), \\(2 > 1\\).",
        "Uma antiderivada de \\(2x - x^2\\) é \\(x^2 - \\frac{x^3}{3}\\).",
        "Avaliando de 0 a 2: \\(4 - \\frac{8}{3} = \\frac{4}{3}\\).",
      ], "calculo"],
    ],
  },
  {
    slug: "otimizacao", title: "Otimização com modelagem", tema: "Aplic. derivadas", temaSlug: "aplicacoes-derivadas", area: "Aplicações · decisão",
    identify: "Defina variáveis, escreva restrição e objetivo, reduza a uma variável.", hint: "Só derive depois de construir e restringir o modelo.", meaning: "O extremo matemático precisa responder à pergunta e respeitar o domínio físico.", error: "Derivar a restrição em vez da função objetivo ou ignorar endpoints.",
    tasks: [
      ["Qual o primeiro passo de um problema de otimização?", "Definir variáveis e a grandeza a otimizar", "Antes de qualquer derivada, é preciso traduzir o problema: dar nome às variáveis, dizer qual grandeza deve ficar máxima ou mínima e escrever a restrição que as liga. Derivar antes disso é derivar uma função que ainda não existe.", "compreensao"],
      ["Retângulo de perímetro 20: escreva a área em função de \\(x\\).", "\\(A(x)=x(10-x)\\)", [
        "Chame os lados de \\(x\\) e \\(y\\). O perímetro dá a restrição \\(2x + 2y = 20\\).",
        "Isole \\(y\\): \\(y = 10 - x\\).",
        "A área é \\(xy\\); com uma variável só, \\(A(x) = x(10 - x)\\).",
      ]],
      ["Qual domínio físico para a função anterior?", "\\(0<x<10\\)", [
        "Os dois lados precisam ser positivos: \\(x > 0\\) e \\(y = 10 - x > 0\\).",
        "A segunda condição dá \\(x < 10\\).",
        "Domínio físico: \\(0 < x < 10\\).",
      ]],
      ["Encontre as dimensões de área máxima.", "5 por 5", [
        "\\(A(x) = 10x - x^2\\), então \\(A'(x) = 10 - 2x\\).",
        "\\(A'(x) = 0\\) dá \\(x = 5\\), dentro do domínio \\((0, 10)\\).",
        "\\(A''(x) = -2 < 0\\): é um máximo. Então \\(y = 10 - 5 = 5\\).",
        "O retângulo de maior área com perímetro 20 é o quadrado 5 por 5, com área 25.",
      ]],
      ["Uma caixa sem tampa vem de uma folha 20×30 cortando quadrados de lado \\(x\\). Monte o volume.", "\\(V(x)=x(20-2x)(30-2x)\\)", [
        "Cortando um quadrado de lado \\(x\\) em cada canto e dobrando as abas, a altura da caixa é \\(x\\).",
        "Cada dimensão da base perde \\(2x\\), um \\(x\\) de cada lado: \\(20 - 2x\\) e \\(30 - 2x\\).",
        "Volume: \\(V(x) = x(20 - 2x)(30 - 2x)\\).",
        "Domínio: \\(20 - 2x > 0\\) exige \\(x < 10\\); com \\(x > 0\\), fica \\(0 < x < 10\\).",
      ]],
    ],
  },
];

const legacyLevels: Record<PedagogicalExerciseLevel, ExerciseLevel> = {
  1: "facil", 2: "medio", 3: "medio", 4: "dificil", 5: "desafio",
};
const types: Record<PedagogicalExerciseLevel, ExerciseType> = {
  1: "calculo", 2: "calculo", 3: "interpretacao", 4: "aplicada", 5: "aplicada",
};

export const exerciciosFase2: Exercicio[] = blueprints.flatMap((blueprint, topicIndex) =>
  blueprint.tasks.map(([question, answer, solution, taskType], taskIndex) => {
    const level = (taskIndex + 1) as PedagogicalExerciseLevel;
    const steps = Array.isArray(solution) ? solution : undefined;
    return {
      id: `p2-${blueprint.slug}-${level}`,
      num: `P2-${String(topicIndex * 5 + level).padStart(3, "0")}`,
      title: `${blueprint.title} · Nível ${level}`,
      tema: blueprint.tema,
      temaSlug: blueprint.temaSlug,
      area: blueprint.area,
      type: taskType ?? types[level],
      level: legacyLevels[level],
      pedagogicalLevel: level,
      enunciado: question,
      identificar: blueprint.identify,
      dica: blueprint.hint,
      resolucao: steps ? "Ver passos abaixo." : (solution as string),
      ...(steps ? { resolucaoSteps: steps } : {}),
      resposta: answer,
      interpretacao: blueprint.meaning,
      erroComum: blueprint.error,
    };
  }),
);
