import type {
  Exercicio,
  ExerciseLevel,
  ExerciseType,
  PedagogicalExerciseLevel,
} from "@/data/exercicios";

type Task = [question: string, answer: string, solution: string];
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
      ["Simplifique \\(\\frac{6x}{3x}\\), com \\(x\\ne0\\).", "2", "Divida os fatores 6 por 3 e \\(x\\) por \\(x\\): resultado 2."],
      ["Simplifique \\(\\frac{x^2-4}{x-2}\\) e registre a restrição.", "\\(x+2,\\ x\\ne2\\)", "Fatore \\(x^2-4=(x-2)(x+2)\\) e cancele o fator para \\(x\\ne2\\)."],
      ["Explique por que \\(x=2\\) continua proibido após a simplificação anterior.", "Porque zerava o denominador original", "A expressão simplificada descreve os mesmos valores apenas no domínio original."],
      ["Simplifique \\(\\frac{x^2-9}{x^2+x-6}\\).", "\\(\\frac{x-3}{x-2}\\), com \\(x\\ne-3,2\\)", "Fatore: numerador \\((x-3)(x+3)\\), denominador \\((x+3)(x-2)\\); sobra \\((x-3)/(x-2)\\), com \\(x\\ne-3,2\\)."],
      ["Resolva \\(\\frac{x}{x-1}+\\frac1{x+1}\\) em uma única fração.", "\\(\\frac{x^2+x-1}{x^2-1}\\), \\(x\\ne\\pm1\\)", "Use denominador comum \\((x-1)(x+1)\\), some os numeradores e mantenha as restrições."],
    ],
  },
  {
    slug: "funcoes-por-partes", title: "Funções por partes", tema: "Funções", temaSlug: "funcoes", area: "Funções · condições",
    identify: "Escolha a regra pelo intervalo da entrada e separe valor de limite.", hint: "Observe com atenção os símbolos \\(<\\), \\(>\\), \\(\\le\\) e \\(\\ge\\).", meaning: "Uma mudança de regra pode ou não produzir salto.", error: "Usar a expressão errada no ponto de troca.",
    tasks: [
      ["Se \\(f(x)=x+1\\) para \\(x<0\\) e \\(f(x)=x^2\\) para \\(x\\ge0\\), calcule \\(f(-2)\\).", "-1", "Como -2 é negativo, use \\(x+1\\)."],
      ["Na mesma função, calcule \\(f(0)\\).", "0", "A igualdade pertence à regra \\(x^2\\)."],
      ["Os limites laterais em 0 coincidem?", "Não", "Pela esquerda a tendência é 1; pela direita é 0."],
      ["Escolha \\(k\\) para tornar contínua em 1: \\(f(x)=x+k\\) se \\(x<1\\), e \\(f(x)=3x\\) se \\(x\\ge1\\).", "2", "Iguale as tendências: \\(1+k=3\\)."],
      ["Crie uma função por partes para frete grátis acima de R$ 100 e taxa de R$ 15 abaixo disso.", "\\(F(v)=15\\) se \\(v<100\\), \\(F(v)=0\\) se \\(v\\ge100\\)", "Use o valor da compra como entrada e escreva uma regra para cada faixa."],
    ],
  },
  {
    slug: "composicao", title: "Composição de funções", tema: "Funções", temaSlug: "funcoes", area: "Funções · camadas",
    identify: "Localize a função interna e aplique-a primeiro.", hint: "Leia \\(f(g(x))\\) de dentro para fora.", meaning: "A composição representa um processo em etapas.", error: "Trocar a ordem ou somar as funções.",
    tasks: [
      ["Se \\(f(x)=x+2\\) e \\(g(x)=3x\\), calcule \\(f(g(1))\\).", "5", "\\(g(1)=3\\) e \\(f(3)=5\\)."],
      ["Escreva \\(f(g(x))\\) para as funções anteriores.", "\\(3x+2\\)", "Substitua a entrada de \\(f\\) por \\(3x\\)."],
      ["Explique por que \\(f\\circ g\\) pode diferir de \\(g\\circ f\\).", "Porque a ordem das etapas muda", "\\(f(g(x))=3x+2\\), enquanto \\(g(f(x))=3x+6\\)."],
      ["Decomponha \\(h(x)=\\sqrt{2x+1}\\) em interna e externa.", "interna \\(2x+1\\); externa \\(\\sqrt{u}\\)", "A expressão dentro da raiz é a função interna."],
      ["Um preço recebe 10% de desconto e depois taxa fixa de R$ 5. Modele a composição.", "\\(C(p)=0{,}9p+5\\)", "Aplique primeiro \\(g(p)=0{,}9p\\) e depois \\(f(u)=u+5\\)."],
    ],
  },
  {
    slug: "limites-fatoracao", title: "Limites por fatoração", tema: "Limites", temaSlug: "limites", area: "Limites · álgebra",
    identify: "Substitua, reconheça \\(0/0\\) e escolha a fatoração.", hint: "Procure diferença de quadrados, fator comum ou trinômio.", meaning: "A fatoração revela o comportamento escondido perto do furo.", error: "Tratar \\(0/0\\) como resposta ou cancelar parcelas.",
    tasks: [
      ["Calcule \\(\\lim_{x\\to2}\\frac{x^2-4}{x-2}\\).", "4", "Fatore e cancele: \\(x+2\\to4\\)."],
      ["Calcule \\(\\lim_{x\\to-3}\\frac{x^2-9}{x+3}\\).", "-6", "Sobra \\(x-3\\), que tende a -6."],
      ["O que informa a forma \\(0/0\\)?", "Que o método direto é inconclusivo", "É uma indeterminação, não um valor."],
      ["Calcule \\(\\lim_{x\\to1}\\frac{x^3-1}{x-1}\\).", "3", "Use \\(x^3-1=(x-1)(x^2+x+1)\\)."],
      ["Calcule \\(\\lim_{h\\to0}\\frac{(x+h)^2-x^2}{h}\\).", "\\(2x\\)", "Expanda, fatore \\(h\\), cancele e faça \\(h\\to0\\)."],
    ],
  },
  {
    slug: "racionalizacao", title: "Racionalização", tema: "Limites", temaSlug: "limites", area: "Limites · radicais",
    identify: "Procure diferença de raízes e escolha o conjugado.", hint: "Multiplique numerador e denominador pelo conjugado.", meaning: "O conjugado transforma radicais em diferença de quadrados.", error: "Multiplicar apenas um lado da fração ou usar o mesmo sinal.",
    tasks: [
      ["Qual o conjugado de \\(\\sqrt{x}-2\\)?", "\\(\\sqrt{x}+2\\)", "Troque o sinal entre os termos."],
      ["Calcule \\(\\lim_{x\\to4}\\frac{\\sqrt{x}-2}{x-4}\\).", "\\(1/4\\)", "Racionalize; sobra \\(1/(\\sqrt{x}+2)\\)."],
      ["Por que multiplicar pelo conjugado não muda o valor?", "Porque multiplicamos por 1", "O conjugado sobre ele mesmo vale 1 onde está definido."],
      ["Calcule \\(\\lim_{x\\to0}\\frac{\\sqrt{1+x}-1}{x}\\).", "\\(1/2\\)", "Racionalize e obtenha \\(1/(\\sqrt{1+x}+1)\\)."],
      ["Calcule \\(\\lim_{x\\to9}\\frac{x-9}{\\sqrt{x}-3}\\).", "6", "Fatore via conjugado: a expressão equivale a \\(\\sqrt{x}+3\\)."],
    ],
  },
  {
    slug: "polinomios-racionais", title: "Polinômios e funções racionais", tema: "Funções p/ cálculo", temaSlug: "funcoes-calculo", area: "Funções · comportamento",
    identify: "Encontre grau, zeros, restrições e fatores canceláveis.", hint: "Use a forma fatorada e o termo dominante.", meaning: "A álgebra antecipa interceptos, furos e assíntotas.", error: "Confundir zero do numerador com valor proibido.",
    tasks: [
      ["Qual o grau de \\(4x^3-x+2\\)?", "3", "O maior expoente com coeficiente não nulo é 3."],
      ["Quais zeros de \\((x-1)(x+4)\\)?", "1 e -4", "Zere cada fator."],
      ["Um zero de multiplicidade par toca ou cruza o eixo?", "Toca", "O sinal tende a permanecer o mesmo nos dois lados."],
      ["Classifique \\(x=2\\) em \\((x-2)/(x^2-4)\\).", "furo", "O fator cancela; a restrição permanece."],
      ["Descreva o comportamento de \\((2x^3+x)/(x^2+1)\\) no infinito.", "cresce como \\(2x\\)", "Divisão ou termos dominantes dão razão aproximada \\(2x^3/x^2=2x\\)."],
    ],
  },
  {
    slug: "limites-laterais", title: "Limites laterais", tema: "Limites", temaSlug: "limites", area: "Limites · gráficos",
    identify: "Separe aproximação pela esquerda e pela direita.", hint: "O limite bilateral só existe se os dois lados coincidirem.", meaning: "Os lados descrevem o que acontece antes e depois do ponto.", error: "Fazer média entre limites laterais diferentes.",
    tasks: [
      ["Se esquerda e direita tendem a 3, qual o limite?", "3", "Os dois lados coincidem."],
      ["Se esquerda tende a 1 e direita a 4, o limite bilateral existe?", "Não", "As tendências laterais discordam."],
      ["Uma função pode ter limite em \\(a\\) sem estar definida em \\(a\\)?", "Sim", "O limite observa os valores próximos."],
      ["Analise \\(1/x\\) quando \\(x\\to0^-\\) e \\(x\\to0^+\\).", "\\(-\\infty\\) e \\(+\\infty\\)", "O sinal do denominador pequeno muda com o lado."],
      ["Construa uma função por partes com limite 2 em 0, mas valor \\(f(0)=7\\).", "Por exemplo \\(f(x)=2\\) se \\(x\\ne0\\), e \\(f(0)=7\\)", "Os valores próximos ficam em 2; o ponto isolado vale 7."],
    ],
  },
  {
    slug: "limites-trig", title: "Limites trigonométricos", tema: "Limites", temaSlug: "limites", area: "Limites · trigonometria",
    identify: "Faça o argumento do seno coincidir com o denominador.", hint: "Use \\(\\lim_{u\\to0}\\sin u/u=1\\) em radianos.", meaning: "O fator interno antecipa a regra da cadeia.", error: "Usar graus ou esquecer o fator que ajusta o argumento.",
    tasks: [
      ["Calcule \\(\\lim_{x\\to0}\\sin x/x\\).", "1", "É o limite fundamental em radianos."],
      ["Calcule \\(\\lim_{x\\to0}\\sin(4x)/x\\).", "4", "Escreva \\(4[\\sin(4x)/(4x)]\\)."],
      ["Por que radianos são essenciais nesta fórmula?", "Porque em radianos a razão tende a 1", "Outra unidade introduz um fator de conversão."],
      ["Calcule \\(\\lim_{x\\to0}\\tan x/x\\).", "1", "Use \\(\\tan x=\\sin x/\\cos x\\), com \\(\\cos x\\to1\\)."],
      ["Calcule \\(\\lim_{x\\to0}\\sin(3x)/\\sin(5x)\\).", "\\(3/5\\)", "Crie dois quocientes fundamentais e compare os fatores."],
    ],
  },
  {
    slug: "derivadas-trig", title: "Derivadas trigonométricas", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · ondas",
    identify: "Escolha a regra trigonométrica e verifique se há composição.", hint: "Seno vira cosseno; cosseno vira menos seno.", meaning: "A frequência interna multiplica a taxa da onda.", error: "Esquecer o sinal do cosseno ou a cadeia.",
    tasks: [
      ["Derive \\(\\sin x\\).", "\\(\\cos x\\)", "Regra direta em radianos."],
      ["Derive \\(\\cos x\\).", "\\(-\\sin x\\)", "Regra direta com sinal negativo."],
      ["Interprete o que ocorre com a inclinação do seno em \\(x=\\pi/2\\).", "É zero", "\\(\\cos(\\pi/2)=0\\); o seno tem máximo local."],
      ["Derive \\(\\sin(3x)\\).", "\\(3\\cos(3x)\\)", "Aplique a cadeia."],
      ["Derive \\(x^2\\cos x\\).", "\\(2x\\cos x-x^2\\sin x\\)", "Use produto e a derivada do cosseno."],
    ],
  },
  {
    slug: "derivadas-exp-log", title: "Derivadas exponenciais e logarítmicas", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · crescimento",
    identify: "Distinga \\(e^x\\), base geral e logaritmo; procure a função interna.", hint: "Para \\(\\ln u\\), use \\(u'/u\\).", meaning: "Essas taxas modelam crescimento multiplicativo e escalas relativas.", error: "Esquecer \\(\\ln a\\) ou a derivada interna.",
    tasks: [
      ["Derive \\(e^x\\).", "\\(e^x\\)", "A exponencial natural é sua própria derivada."],
      ["Derive \\(2^x\\).", "\\(2^x\\ln2\\)", "Use a regra para base geral."],
      ["Qual o domínio de \\((\\ln x)'=1/x\\)?", "\\(x>0\\)", "O logaritmo real exige argumento positivo."],
      ["Derive \\(\\ln(x^2+1)\\).", "\\(2x/(x^2+1)\\)", "Use cadeia: interna sobre a própria função."],
      ["Derive \\(e^{x^2}\\ln x\\).", "\\(2xe^{x^2}\\ln x+e^{x^2}/x\\)", "Combine produto e cadeia, com \\(x>0\\)."],
    ],
  },
  {
    slug: "derivacao-implicita", title: "Derivação implícita", tema: "Derivadas", temaSlug: "derivadas", area: "Derivadas · relações",
    identify: "Derive os dois lados e multiplique termos com \\(y\\) por \\(y'\\).", hint: "\\(y\\) é uma função de \\(x\\).", meaning: "A inclinação pode ser obtida sem isolar globalmente a variável.", error: "Omitir \\(y'\\) ao derivar potências de \\(y\\).",
    tasks: [
      ["Derive \\(y^2\\) em relação a \\(x\\).", "\\(2yy'\\)", "A regra da cadeia produz \\(y'\\)."],
      ["Para \\(x^2+y^2=25\\), encontre \\(y'\\).", "\\(-x/y\\)", "Derive e isole: \\(2x+2yy'=0\\)."],
      ["Qual a inclinação da circunferência no ponto \\((0,5)\\)?", "0", "Substitua em \\(-x/y\\)."],
      ["Derive \\(xy=10\\).", "\\(y'=-y/x\\)", "Produto: \\(y+xy'=0\\)."],
      ["Para \\(x^2+xy+y^2=7\\), isole \\(y'\\).", "\\(-(2x+y)/(x+2y))\\", "Derive termo a termo, usando produto em \\(xy\\), e agrupe \\(y'\\)."],
    ],
  },
  {
    slug: "taxas-relacionadas", title: "Taxas relacionadas", tema: "Aplic. derivadas", temaSlug: "aplicacoes-derivadas", area: "Modelagem · movimento",
    identify: "Escreva a relação, derive no tempo e substitua o instante ao final.", hint: "Anote as unidades de cada taxa.", meaning: "A geometria conecta grandezas que mudam simultaneamente.", error: "Substituir valores antes de derivar ou perder unidades.",
    tasks: [
      ["Se \\(A=\\pi r^2\\), escreva \\(dA/dt\\).", "\\(2\\pi r\\,dr/dt\\)", "Derive em relação ao tempo."],
      ["Com \\(r=3\\) e \\(dr/dt=2\\), ache \\(dA/dt\\).", "\\(12\\pi\\)", "Substitua na relação derivada."],
      ["Por que \\(dA/dt\\) tem unidade quadrada por tempo?", "Porque mede mudança de área", "A dimensão do resultado deve combinar com a grandeza."],
      ["Um balão esférico tem \\(V=4\\pi r^3/3\\). Ache \\(dV/dt\\).", "\\(4\\pi r^2 dr/dt\\)", "Derive a potência e mantenha a taxa do raio."],
      ["Uma escada de 5 m tem base afastando a 1 m/s. Qual \\(dy/dt\\) quando \\(x=3\\), \\(y=4\\)?", "\\(-3/4\\) m/s", "De \\(x^2+y^2=25\\): \\(2x x'+2y y'=0\\)."],
    ],
  },
  {
    slug: "substituicao", title: "Integração por substituição", tema: "Integrais", temaSlug: "integrais", area: "Integrais · cadeia ao contrário",
    identify: "Escolha a função interna e procure sua derivada no restante do integrando.", hint: "Troque toda a expressão para \\(u\\), sem misturar variáveis.", meaning: "Substituição desfaz composições produzidas pela regra da cadeia.", error: "Escolher \\(u\\) sem que \\(du\\) apareça ou esquecer de voltar para \\(x\\).",
    tasks: [
      ["Em \\(\\int2x(x^2+1)^3dx\\), escolha \\(u\\).", "\\(u=x^2+1\\)", "A derivada \\(2x\\) aparece no integrando."],
      ["Calcule a integral anterior.", "\\((x^2+1)^4/4+C\\)", "A integral vira \\(\\int u^3du\\)."],
      ["Como conferir uma substituição?", "Derivando a resposta", "A derivada deve recuperar o integrando."],
      ["Calcule \\(\\int x/(x^2+4)dx\\).", "\\(\\frac12\\ln(x^2+4)+C\\)", "Use \\(u=x^2+4\\), \\(du=2x dx\\)."],
      ["Calcule \\(\\int_0^1 2x e^{x^2}dx\\).", "\\(e-1\\)", "Use \\(u=x^2\\) e transforme também os limites: 0 a 1."],
    ],
  },
  {
    slug: "area-entre-curvas", title: "Área entre curvas", tema: "Integrais", temaSlug: "integrais", area: "Integrais · geometria",
    identify: "Encontre interseções e determine a curva de cima em cada trecho.", hint: "Integre cima menos baixo; divida onde a ordem trocar.", meaning: "A integral acumula distância vertical entre curvas.", error: "Aceitar área negativa ou ignorar cruzamentos.",
    tasks: [
      ["Entre \\(y=2\\) e \\(y=x\\) em \\([0,1]\\), qual integrando?", "\\(2-x\\)", "A reta horizontal está acima."],
      ["Calcule essa área.", "\\(3/2\\)", "\\(\\int_0^1(2-x)dx=2-1/2\\)."],
      ["Por que 'cima menos baixo'?", "Para medir distância vertical positiva", "A ordem preserva a interpretação geométrica."],
      ["Calcule a área entre \\(y=x\\) e \\(y=x^2\\) em \\([0,1]\\).", "\\(1/6\\)", "Integre \\(x-x^2\\)."],
      ["Ache a área entre \\(y=x^2\\) e \\(y=2x\\) entre as interseções.", "\\(4/3\\)", "Interseções 0 e 2; integre \\(2x-x^2\\) nesse intervalo."],
    ],
  },
  {
    slug: "otimizacao", title: "Otimização com modelagem", tema: "Aplic. derivadas", temaSlug: "aplicacoes-derivadas", area: "Aplicações · decisão",
    identify: "Defina variáveis, escreva restrição e objetivo, reduza a uma variável.", hint: "Só derive depois de construir e restringir o modelo.", meaning: "O extremo matemático precisa responder à pergunta e respeitar o domínio físico.", error: "Derivar a restrição em vez da função objetivo ou ignorar endpoints.",
    tasks: [
      ["Qual o primeiro passo de um problema de otimização?", "Definir variáveis e a grandeza a otimizar", "Antes da derivada, traduza o contexto."],
      ["Retângulo de perímetro 20: escreva a área em função de \\(x\\).", "\\(A(x)=x(10-x)\\)", "Da restrição \\(2x+2y=20\\), obtemos \\(y=10-x\\)."],
      ["Qual domínio físico para a função anterior?", "\\(0<x<10\\)", "Os dois lados precisam ser positivos."],
      ["Encontre as dimensões de área máxima.", "5 por 5", "\\(A'=10-2x=0\\Rightarrow x=5\\), então \\(y=5\\)."],
      ["Uma caixa sem tampa vem de uma folha 20×30 cortando quadrados de lado \\(x\\). Monte o volume.", "\\(V(x)=x(20-2x)(30-2x)\\)", "Altura \\(x\\); base reduz duas vezes \\(x\\) em cada dimensão, com \\(0<x<10\\)."],
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
  blueprint.tasks.map(([question, answer, solution], taskIndex) => {
    const level = (taskIndex + 1) as PedagogicalExerciseLevel;
    return {
      id: `p2-${blueprint.slug}-${level}`,
      num: `P2-${String(topicIndex * 5 + level).padStart(3, "0")}`,
      title: `${blueprint.title} · Nível ${level}`,
      tema: blueprint.tema,
      temaSlug: blueprint.temaSlug,
      area: blueprint.area,
      type: types[level],
      level: legacyLevels[level],
      pedagogicalLevel: level,
      enunciado: question,
      identificar: blueprint.identify,
      dica: blueprint.hint,
      resolucao: solution,
      resposta: answer,
      interpretacao: blueprint.meaning,
      erroComum: blueprint.error,
    };
  }),
);
