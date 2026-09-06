import {
  createCurriculumLesson,
  type CurriculumLessonSpec,
} from "@/data/aulas/lesson-factory";
import type { AulaContent } from "@/data/aulas/types";
import type { TrilhaAula } from "@/data/trilha-module";
import { propriedadesDosLimites } from "@/data/aulas/calculo-1/propriedades-dos-limites";
import { derivadaInversaSpec, reviseCurriculum } from "@/data/aulas/revisao-curricular";

type Practice = [question: string, solution: string, answer: string, meaning: string];
type CompactSpec = {
  moduleSlug: string;
  moduleTitle: string;
  lessonNumber: number;
  slug: string;
  title: string;
  notes: string[];
  why: string;
  concept: string;
  callout: string;
  formula: string;
  formulaLatex?: string;
  example: string;
  steps: string[];
  result: string;
  pitfall: string;
  practice: Practice[];
  exerciseIds?: string[];
  level?: string;
};

const appearances: Record<string, { label: string; detail: string }[]> = {
  "funcoes-para-calculo": [
    { label: "Limites", detail: "escolher técnica e respeitar domínio" },
    { label: "Derivadas", detail: "reconhecer estrutura e camadas" },
  ],
  limites: [
    { label: "Derivadas", detail: "definir taxa instantânea" },
    { label: "Continuidade", detail: "comparar tendência e valor" },
  ],
  continuidade: [
    { label: "Existência de raízes", detail: "aplicar o Teorema do Valor Intermediário" },
    { label: "TFC", detail: "garantir hipóteses para funções acumuladas" },
  ],
  derivadas: [
    { label: "Modelagem", detail: "medir taxas em diferentes famílias" },
    { label: "Aplicações", detail: "estudar crescimento, extremos e aproximação" },
  ],
  "aplicacoes-derivadas": [
    { label: "Engenharia e Física", detail: "relacionar grandezas que variam" },
    { label: "Economia", detail: "decidir com taxas e extremos" },
  ],
  integrais: [
    { label: "Acúmulo", detail: "recuperar totais a partir de taxas" },
    { label: "Geometria", detail: "calcular áreas e volumes" },
  ],
};

function compact(spec: CompactSpec): CurriculumLessonSpec {
  return {
    track: "calculo-1",
    moduleSlug: spec.moduleSlug,
    moduleTitle: spec.moduleTitle,
    lessonNumber: spec.lessonNumber,
    slug: spec.slug,
    title: spec.title,
    duration: "14 min",
    level: spec.level ?? "universitário introdutório",
    notes: spec.notes,
    usedIn: [],
    why: [spec.why],
    explanation: [spec.concept],
    callout: spec.callout,
    formula: spec.formula,
    formulaLatex: spec.formulaLatex,
    appearances: appearances[spec.moduleSlug],
    exampleTitle: "Exemplo em três leituras",
    example: spec.example,
    steps: spec.steps.map((detail, index) => ({
      title: ["Diagnosticar", "Escolher a ferramenta", "Executar", "Conferir o sentido"][index] ?? `Passo ${index + 1}`,
      detail,
    })),
    interpretation: [spec.result],
    errors: [spec.pitfall, "Aplicar uma regra sem conferir domínio, hipótese ou unidade."],
    guided: spec.practice.map(([question, solution, answer, meaning], index) => ({
      type: index === 0 ? "calculo" : "interpretacao",
      question,
      solution,
      answer,
      interpretation: meaning,
      hint: "Identifique primeiro a estrutura e escreva a regra com suas condições.",
      commonError: spec.pitfall,
    })),
    exerciseIds: spec.exerciseIds,
    summary: [spec.concept, spec.callout, spec.result],
  };
}

const specs: CurriculumLessonSpec[] = [
  derivadaInversaSpec,
  compact({
    moduleSlug: "funcoes-para-calculo", moduleTitle: "Funções para Cálculo", lessonNumber: 9,
    slug: "composicao-e-inversa", title: "Composição e inversa para Cálculo", notes: ["camadas", "desfazer funções"],
    why: "Regra da cadeia e substituição em integrais dependem de reconhecer uma função dentro de outra.",
    concept: "Em \\(f(g(x))\\), \\(g\\) age primeiro. A inversa desfaz uma função um a um e troca domínio por imagem.",
    callout: "Composição lê de dentro para fora; inversa desfaz de fora para dentro.",
    formula: "(f∘g)(x)=f(g(x)); f⁻¹(f(x))=x", formulaLatex: "(f\\circ g)(x)=f(g(x)),\\qquad f^{-1}(f(x))=x",
    example: "Com \\(g(x)=2x+1\\) e \\(f(u)=u^3\\), escreva a composição e identifique suas camadas.",
    steps: ["A função interna é \\(g(x)=2x+1\\).", "A externa recebe uma entrada e eleva ao cubo.", "Logo \\(f(g(x))=(2x+1)^3\\).", "A ordem explica por que a cadeia multiplicará por 2."],
    result: "A composição tem duas camadas explícitas: transformação afim e potência.",
    pitfall: "Trocar a ordem das funções ou confundir inversa com recíproca.",
    practice: [
      ["Se \\(f(x)=x^2\\) e \\(g(x)=x-4\\), calcule \\((f\\circ g)(5)\\).", "\\(g(5)=1\\) e \\(f(1)=1\\).", "1", "A saída interna virou a entrada externa."],
      ["Qual a inversa de \\(h(x)=2x-6\\)?", "Troque entrada e saída e isole: \\(h^{-1}(x)=(x+6)/2\\).", "\\((x+6)/2\\)", "A inversa recupera a entrada original."],
    ], exerciseIds: ["p2-composicao-2", "p2-composicao-4"],
  }),
  compact({
    moduleSlug: "funcoes-para-calculo", moduleTitle: "Funções para Cálculo", lessonNumber: 10,
    slug: "funcoes-por-partes", title: "Funções por partes e leitura lateral", notes: ["regras por intervalo", "pontos de troca"],
    why: "Limites laterais e continuidade quase sempre são testados em funções com regras diferentes de cada lado.",
    concept: "Escolha a expressão pela condição da entrada. No ponto de troca, calcule separadamente valor, tendência pela esquerda e tendência pela direita.",
    callout: "Três perguntas diferentes: quanto vale no ponto, para onde vai pela esquerda e para onde vai pela direita?",
    formula: "f(x)={g(x), x<a; h(x), x≥a}", formulaLatex: "f(x)=\\begin{cases}g(x),&x<a,\\\\h(x),&x\\ge a.\\end{cases}",
    example: "Analise em \\(x=1\\): \\(f(x)=x+2\\) se \\(x<1\\), e \\(f(x)=2x\\) se \\(x\\ge1\\).",
    steps: ["Pela esquerda, \\(x+2\\to3\\).", "Pela direita, \\(2x\\to2\\).", "O valor usa a segunda regra: \\(f(1)=2\\).", "Como os lados diferem, o limite bilateral não existe."],
    result: "A função está definida em 1, mas tem salto; existência no ponto não garante limite.",
    pitfall: "Usar a regra do ponto para os dois limites laterais.",
    practice: [
      ["Se os dois limites laterais valem 5, qual é o limite bilateral?", "Como as tendências coincidem, o limite é 5.", "5", "O valor no ponto pode ser outro sem alterar esse limite."],
      ["Se esquerda vale 2 e direita vale -2, o limite existe?", "Não; os lados discordam.", "Não existe", "Um salto impede o limite bilateral."],
    ], exerciseIds: ["p2-funcoes-por-partes-2", "p2-limites-laterais-3"],
  }),
  compact({
    moduleSlug: "funcoes-para-calculo", moduleTitle: "Funções para Cálculo", lessonNumber: 11,
    slug: "polinomiais-e-racionais", title: "Polinomiais e racionais como famílias", notes: ["termo dominante", "restrições"],
    why: "Grande parte dos limites e derivadas iniciais usa polinômios ou quocientes de polinômios.",
    concept: "Polinômios são contínuos em todos os reais. Funções racionais são contínuas onde o denominador não zera; fatores canceláveis geram furos e fatores persistentes geram assíntotas verticais.",
    callout: "Antes de calcular, fatore e registre o domínio.",
    formula: "r(x)=p(x)/q(x), q(x)≠0", formulaLatex: "r(x)=\\frac{p(x)}{q(x)},\\qquad q(x)\\ne0",
    example: "Classifique as restrições de \\(r(x)=\\frac{x^2-1}{(x-1)(x-3)}\\).",
    steps: ["O domínio exclui 1 e 3.", "Fatore \\(x^2-1=(x-1)(x+1)\\).", "Cancele \\(x-1\\) apenas para \\(x\\ne1\\).", "Há furo em 1 e assíntota vertical em 3."],
    result: "A simplificação revela o comportamento, mas o domínio original preserva o furo.",
    pitfall: "Tratar todo zero do denominador como o mesmo tipo de descontinuidade.",
    practice: [
      ["Qual o domínio de \\(1/(x^2-4)\\)?", "Exclua os zeros \\(x=\\pm2\\).", "\\(x\\ne-2,2\\)", "Os dois fatores permanecem no denominador."],
      ["Em \\((x-5)/(x-5)\\), há o quê em \\(x=5\\)?", "A expressão vale 1 para \\(x\\ne5\\), mas não existe em 5: furo.", "furo", "O limite é 1."],
    ], exerciseIds: ["p2-polinomios-racionais-1", "p2-polinomios-racionais-4"],
  }),
  compact({
    moduleSlug: "funcoes-para-calculo", moduleTitle: "Funções para Cálculo", lessonNumber: 12,
    slug: "quociente-de-diferencas", title: "Quociente de diferenças", notes: ["taxa média", "preparação para derivada"],
    why: "A expressão central da derivada deve ser entendida como taxa média antes de virar um limite.",
    concept: "\\([f(x+h)-f(x)]/h\\) compara a mudança na saída com a mudança \\(h\\) na entrada. Geometricamente, é a inclinação de uma secante.",
    callout: "Simplifique o numerador inteiro antes de dividir por \\(h\\).",
    formula: "[f(x+h)-f(x)]/h", formulaLatex: "\\frac{f(x+h)-f(x)}{h}",
    example: "Calcule o quociente de diferenças de \\(f(x)=x^2\\).",
    steps: ["\\(f(x+h)=(x+h)^2\\).", "Subtraia \\(x^2\\): sobra \\(2xh+h^2\\).", "Fatore \\(h\\) e divida por \\(h\\ne0\\).", "O quociente é \\(2x+h\\)."],
    result: "Quando \\(h\\to0\\), a taxa média se aproxima de \\(2x\\).",
    pitfall: "Esquecer parênteses ao calcular \\(f(x+h)-f(x)\\).",
    practice: [
      ["Ache o quociente para \\(f(x)=3x+1\\).", "A diferença é \\(3h\\); dividindo por \\(h\\), sobra 3.", "3", "Função afim tem taxa constante."],
      ["Por que exigimos \\(h\\ne0\\) antes do limite?", "Porque o quociente contém divisão por \\(h\\).", "Para não dividir por zero", "O limite permite aproximar zero sem usar zero."],
    ],
  }),
  compact({
    moduleSlug: "funcoes-para-calculo", moduleTitle: "Funções para Cálculo", lessonNumber: 13,
    slug: "oficina-algebrica-limites", title: "Oficina algébrica para limites", notes: ["diagnóstico", "escolha de técnica"],
    why: "O bloqueio mais comum em limites é algébrico, não conceitual: o aluno reconhece a aproximação, mas não sabe transformar \\(0/0\\).",
    concept: "Use um roteiro: substituir, classificar a forma, fatorar ou racionalizar, registrar restrições, simplificar e substituir novamente.",
    callout: "A forma da expressão escolhe a ferramenta; não existe uma única receita para todo \\(0/0\\).",
    formula: "diagnóstico → transformação → simplificação → limite", formulaLatex: "\\text{diagnóstico}\\to\\text{transformação}\\to\\text{simplificação}\\to\\text{limite}",
    example: "Compare a estratégia para \\((x^2-4)/(x-2)\\) e \\((\\sqrt{x}-2)/(x-4)\\).",
    steps: ["As duas substituições produzem \\(0/0\\).", "A primeira expressão contém diferença de quadrados; a segunda, diferença de raízes.", "Fatore a primeira e use conjugado na segunda.", "Ambas se tornam expressões avaliáveis perto do ponto."],
    result: "O diagnóstico evita tentativas aleatórias e torna a resolução justificável.",
    pitfall: "Cancelar parcelas ou aplicar conjugado onde uma fatoração simples bastava.",
    practice: [
      ["Que técnica usar em \\((x^2-9)/(x-3)\\)?", "Diferença de quadrados.", "fatoração", "O fator \\(x-3\\) fica visível."],
      ["Que técnica usar em \\((\\sqrt{x+1}-2)/(x-3)\\)?", "Conjugado da diferença de raízes.", "racionalização", "O produto cria \\(x-3\\)."],
    ],
  }),
  propriedadesDosLimites,
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 13,
    slug: "indeterminacao-fatoracao", title: "Indeterminação \\(0/0\\) e fatoração", notes: ["diferença de quadrados", "trinômios"],
    why: "Fatoração é a técnica principal para limites algébricos com fatores ocultos.",
    concept: "\\(0/0\\) informa que substituição direta não decidiu o limite. Fatore a expressão, cancele apenas fatores comuns com a restrição adequada e reavalie.",
    callout: "Indeterminação não é resultado; é um pedido de investigação.",
    formula: "lim x→a [(x-a)g(x)/(x-a)] = lim x→a g(x)", formulaLatex: "\\lim_{x\\to a}\\frac{(x-a)g(x)}{x-a}=\\lim_{x\\to a}g(x)",
    example: "Calcule \\(\\lim_{x\\to-2}\\frac{x^2+5x+6}{x+2}\\).",
    steps: ["A substituição dá \\(0/0\\).", "Fatore o trinômio: \\((x+2)(x+3)\\).", "Cancele \\(x+2\\) para \\(x\\ne-2\\).", "Avalie \\(x+3\\) em -2: resultado 1."],
    result: "O limite é 1, embora a expressão original não esteja definida em -2.",
    pitfall: "Cancelar o \\(x\\) de uma soma ou esquecer a restrição.",
    practice: [
      ["Calcule \\(\\lim_{x\\to1}(x^2-1)/(x-1)\\).", "Fatore e cancele: \\(x+1\\to2\\).", "2", "O furo tem tendência 2."],
      ["O que significa obter \\(0/0\\)?", "Que a substituição é inconclusiva e outra técnica é necessária.", "indeterminação", "Diferentes funções com \\(0/0\\) podem ter limites distintos."],
    ], exerciseIds: ["p2-limites-fatoracao-2", "p2-limites-fatoracao-4"],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 14,
    slug: "racionalizacao-em-limites", title: "Racionalização em limites", notes: ["conjugado", "radicais"],
    why: "Diferenças de raízes escondem fatores que aparecem quando usamos o conjugado.",
    concept: "Multiplique pela fração formada pelo conjugado sobre ele mesmo. A identidade \\((a-b)(a+b)=a^2-b^2\\) elimina a raiz problemática.",
    callout: "Escolha o conjugado da parte que produz a indeterminação.",
    formula: "(√u-√v)(√u+√v)=u-v", formulaLatex: "(\\sqrt u-\\sqrt v)(\\sqrt u+\\sqrt v)=u-v",
    example: "Calcule \\(\\lim_{x\\to0}\\frac{\\sqrt{x+4}-2}{x}\\).",
    steps: ["A substituição produz \\(0/0\\).", "Multiplique por \\((\\sqrt{x+4}+2)/(\\sqrt{x+4}+2)\\).", "O numerador vira \\(x\\), que cancela.", "Sobra \\(1/(\\sqrt{x+4}+2)\\to1/4\\)."],
    result: "A variação da raiz perto de 4 é aproximadamente um quarto da variação interna.",
    pitfall: "Multiplicar só o numerador pelo conjugado.",
    practice: [
      ["Calcule \\(\\lim_{x\\to9}(\\sqrt{x}-3)/(x-9)\\).", "Racionalize e obtenha \\(1/(\\sqrt{x}+3)\\to1/6\\).", "\\(1/6\\)", "A técnica revela uma taxa local."],
      ["Qual o conjugado de \\(2-\\sqrt{x}\\)?", "Troque o sinal entre os termos.", "\\(2+\\sqrt{x}\\)", "O produto vira \\(4-x\\)."],
    ], exerciseIds: ["p2-racionalizacao-2", "p2-racionalizacao-4"],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 15,
    slug: "teorema-do-confronto", title: "Teorema do Confronto", notes: ["comparação", "função espremida"],
    why: "Alguns limites são difíceis de calcular diretamente, mas fáceis de cercar entre duas funções conhecidas.",
    concept: "Se \\(g(x)\\le f(x)\\le h(x)\\) perto de \\(a\\) e \\(g\\) e \\(h\\) têm o mesmo limite \\(L\\), então \\(f\\) também tende a \\(L\\).",
    callout: "As duas barreiras precisam convergir para o mesmo número.",
    formula: "g≤f≤h e lim g=lim h=L ⇒ lim f=L", formulaLatex: "g(x)\\le f(x)\\le h(x),\\quad \\lim g=\\lim h=L\\ \\Longrightarrow\\ \\lim f=L",
    example: "Use \\(-|x|\\le x\\sin(1/x)\\le|x|\\) para estudar \\(x\\to0\\).",
    steps: ["Como \\(|\\sin(1/x)|\\le1\\), o produto fica entre \\(-|x|\\) e \\(|x|\\).", "As duas barreiras tendem a 0.", "Aplique o confronto.", "Logo \\(x\\sin(1/x)\\to0\\)."],
    result: "A oscilação continua, mas sua amplitude é espremida até zero.",
    pitfall: "Usar barreiras que não têm o mesmo limite.",
    practice: [
      ["Se \\(-x^2\\le f(x)\\le x^2\\), qual o limite em 0?", "Ambas as barreiras tendem a 0.", "0", "O confronto controla a função desconhecida."],
      ["Basta ter apenas uma função acima de \\(f\\)?", "Não; precisamos de duas barreiras convergindo ao mesmo valor.", "Não", "O aperto vem dos dois lados."],
    ],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 16,
    slug: "limite-trigonometrico-fundamental", title: "Limite trigonométrico fundamental", notes: ["radianos", "seno"],
    why: "A derivada do seno nasce deste limite; ele explica por que radianos são a unidade natural do Cálculo.",
    concept: "No círculo unitário, comparações geométricas espremem \\(\\sin x/x\\) até 1 quando \\(x\\to0\\), desde que \\(x\\) esteja em radianos.",
    callout: "Em graus, a constante seria diferente; a forma simples vale em radianos.",
    formula: "lim x→0 sin(x)/x = 1", formulaLatex: "\\lim_{x\\to0}\\frac{\\sin x}{x}=1",
    example: "Calcule \\(\\lim_{x\\to0}\\frac{\\sin(5x)}{x}\\).",
    steps: ["Crie o quociente padrão multiplicando e dividindo por 5.", "\\(\\sin(5x)/x=5[\\sin(5x)/(5x)]\\).", "Como \\(5x\\to0\\), o colchete tende a 1.", "O limite é 5."],
    result: "O fator interno aparece como multiplicador, antecipando a regra da cadeia.",
    pitfall: "Aplicar o limite fundamental sem fazer o denominador coincidir com o argumento do seno.",
    practice: [
      ["Calcule \\(\\lim_{x\\to0}\\sin(3x)/(3x)\\).", "É exatamente a forma fundamental.", "1", "Argumento e denominador coincidem."],
      ["Calcule \\(\\lim_{x\\to0}\\sin(2x)/x\\).", "Escreva \\(2\\sin(2x)/(2x)\\).", "2", "O fator 2 fica fora do limite."],
    ], exerciseIds: ["p2-limites-trig-1", "p2-limites-trig-4"],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 17,
    slug: "classificacao-indeterminacoes", title: "Classificação de indeterminações", notes: ["diagnóstico", "estratégias"],
    why: "Nomear a forma evita conclusões automáticas erradas e orienta a transformação adequada.",
    concept: "Formas como \\(0/0\\), \\(\\infty/\\infty\\), \\(0\\cdot\\infty\\) e \\(\\infty-\\infty\\) são inconclusivas. Cada uma pode esconder resultados diferentes.",
    callout: "Infinito descreve comportamento; não é um número comum para fazer aritmética direta.",
    formula: "0/0, ∞/∞, 0·∞, ∞-∞: formas indeterminadas", formulaLatex: "\\frac00,\\quad\\frac{\\infty}{\\infty},\\quad0\\cdot\\infty,\\quad\\infty-\\infty",
    example: "Compare \\(x/x\\), \\(x^2/x\\) e \\(1/x\\) quando \\(x\\to0\\) pelos lados apropriados.",
    steps: ["As aparências com zero não determinam o resultado.", "Simplifique \\(x/x=1\\) para \\(x\\ne0\\).", "\\(x^2/x=x\\to0\\).", "Já \\(1/x\\) é ilimitada e depende do lado."],
    result: "Uma mesma aparência superficial pode levar a 1, 0 ou comportamento infinito.",
    pitfall: "Tratar \\(0/0\\) como zero ou \\(\\infty/\\infty\\) como um.",
    practice: [
      ["\\(0/0\\) é um valor?", "Não; é uma forma indeterminada.", "Não", "É preciso transformar ou comparar."],
      ["\\(5/0^+\\) é indeterminação?", "Não: numerador não zero e denominador positivo pequeno indicam \\(+\\infty\\).", "Não; tende a +infinito", "O sinal lateral importa."],
    ],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 18,
    slug: "epsilon-delta-intuicao", title: "Epsilon e delta — leitura opcional", notes: ["definição formal", "opcional"], level: "aprofundamento opcional",
    why: "A definição formal transforma a frase 'tão perto quanto quisermos' em um compromisso verificável.",
    concept: "Dado qualquer erro vertical \\(\\varepsilon>0\\), procuramos uma tolerância horizontal \\(\\delta>0\\) que garanta \\(|f(x)-L|<\\varepsilon\\) sempre que \\(0<|x-a|<\\delta\\).",
    callout: "Epsilon controla a saída; delta controla a entrada.",
    formula: "∀ε>0, ∃δ>0: 0<|x-a|<δ ⇒ |f(x)-L|<ε", formulaLatex: "\\forall\\varepsilon>0,\\ \\exists\\delta>0:\\ 0<|x-a|<\\delta\\Rightarrow|f(x)-L|<\\varepsilon",
    example: "Mostre a escolha de \\(\\delta\\) para \\(f(x)=2x\\), \\(a=3\\) e \\(L=6\\).",
    steps: ["Queremos \\(|2x-6|<\\varepsilon\\).", "Fatore: \\(2|x-3|<\\varepsilon\\).", "Basta exigir \\(|x-3|<\\varepsilon/2\\).", "Escolha \\(\\delta=\\varepsilon/2\\)."],
    result: "A escolha liga diretamente a precisão desejada na saída à tolerância permitida na entrada.",
    pitfall: "Achar que \\(\\varepsilon\\) e \\(\\delta\\) são valores fixos universais.",
    practice: [
      ["Para \\(f(x)=5x\\), qual escolha simples de \\(\\delta\\) atende um \\(\\varepsilon\\)?", "Como \\(|5x-5a|=5|x-a|\\), use \\(\\delta=\\varepsilon/5\\).", "\\(\\varepsilon/5\\)", "A inclinação converte tolerâncias."],
      ["Qual variável controla a proximidade de \\(f(x)\\) a \\(L\\)?", "\\(\\varepsilon\\) define a faixa vertical.", "epsilon", "Delta é escolhido em resposta a epsilon."],
    ],
  }),
  compact({
    moduleSlug: "limites", moduleTitle: "Limites sem trauma", lessonNumber: 19,
    slug: "limites-exponenciais-logaritmicos", title: "Limites exponenciais e logarítmicos", notes: ["continuidade", "crescimento"],
    why: "Exponenciais e logaritmos aparecem em crescimento, decaimento e taxas; seus limites combinam continuidade e comportamento assintótico.",
    concept: "Onde estão definidas, exponenciais e logaritmos são contínuos. Assim, substituição direta resolve limites em pontos internos do domínio; no infinito, use crescimento e a relação de inversas.",
    callout: "Antes de usar continuidade do logaritmo, confirme que o argumento permanece positivo.",
    formula: "lim aˣ = aᴸ quando x→L; ln x→-∞ quando x→0⁺", formulaLatex: "\\lim_{x\\to L}a^x=a^L,\\qquad\\lim_{x\\to0^+}\\ln x=-\\infty",
    example: "Calcule \\(\\lim_{x\\to0}e^{2x+1}\\) e descreva \\(\\ln x\\) quando \\(x\\to0^+\\).",
    steps: ["A exponencial é contínua em todo real.", "Substitua: \\(e^{2(0)+1}=e\\).", "O logaritmo só existe para \\(x>0\\).", "Pela direita, \\(\\ln x\\) decresce sem limite: \\(-\\infty\\)."],
    result: "Um limite é finito por continuidade; o outro é lateral e ilimitado por causa da borda do domínio.",
    pitfall: "Aproximar zero pela esquerda em \\(\\ln x\\) nos números reais.",
    practice: [
      ["Calcule \\(\\lim_{x\\to2}3^{x-1}\\).", "Por continuidade, \\(3^{1}=3\\).", "3", "A substituição é válida."],
      ["Quanto vale \\(\\lim_{x\\to+\\infty}e^{-x}\\)?", "Vale 0.", "0", "O decaimento exponencial se aproxima do eixo sem tocá-lo."],
    ],
  }),
  compact({
    moduleSlug: "continuidade", moduleTitle: "Continuidade", lessonNumber: 7,
    slug: "teorema-valor-intermediario", title: "Teorema do Valor Intermediário", notes: ["existência", "hipóteses"],
    why: "O teorema garante que uma função contínua não pula valores e permite provar que uma equação tem solução sem encontrá-la exatamente.",
    concept: "Se \\(f\\) é contínua em \\([a,b]\\), então assume todo valor entre \\(f(a)\\) e \\(f(b)\\). Ele garante existência, não unicidade nem localização exata.",
    callout: "Hipótese: continuidade no intervalo fechado. Conclusão: pelo menos uma ocorrência do valor intermediário.",
    formula: "f contínua em [a,b], N entre f(a),f(b) ⇒ existe c em [a,b] com f(c)=N", formulaLatex: "f\\in C([a,b]),\\ N\\text{ entre }f(a)\\text{ e }f(b)\\Rightarrow\\exists c\\in[a,b]:f(c)=N",
    example: "Mostre que \\(x^3+x-1=0\\) tem uma raiz entre 0 e 1.",
    steps: ["Defina \\(f(x)=x^3+x-1\\), polinômio contínuo.", "\\(f(0)=-1\\).", "\\(f(1)=1\\).", "Zero está entre -1 e 1; existe ao menos uma raiz em \\((0,1)\\)."],
    result: "Provamos existência sem calcular a raiz; o teorema não diz onde exatamente ela está.",
    pitfall: "Usar o teorema sem continuidade ou concluir que a raiz é única.",
    practice: [
      ["Se \\(f(2)=-3\\), \\(f(5)=4\\) e \\(f\\) é contínua, existe raiz entre 2 e 5?", "Sim, zero está entre as imagens dos extremos.", "Sim", "A continuidade impede um salto sobre zero."],
      ["O TVI garante uma única raiz?", "Não, garante pelo menos uma.", "Não", "Unicidade precisa de outra informação, como monotonicidade."],
    ],
  }),
  compact({
    moduleSlug: "continuidade", moduleTitle: "Continuidade", lessonNumber: 8,
    slug: "composicao-funcoes-continuas", title: "Composição de funções contínuas", notes: ["domínio", "continuidade preservada"],
    why: "Funções complexas são construídas em camadas; saber quando a continuidade passa pela composição simplifica muitos limites.",
    concept: "Se \\(g\\) é contínua em \\(a\\) e \\(f\\) é contínua em \\(g(a)\\), então \\(f\\circ g\\) é contínua em \\(a\\). O ponto \\(g(a)\\) precisa pertencer ao domínio de \\(f\\).",
    callout: "A composição preserva continuidade apenas onde todas as camadas estão definidas.",
    formula: "lim f(g(x)) = f(lim g(x))", formulaLatex: "\\lim_{x\\to a}f(g(x))=f\\left(\\lim_{x\\to a}g(x)\\right)=f(g(a))",
    example: "Justifique a continuidade de \\(h(x)=\\sqrt{x^2+1}\\) em todos os reais.",
    steps: ["A interna \\(g(x)=x^2+1\\) é polinomial e contínua.", "Sua imagem satisfaz \\(g(x)\\ge1\\).", "A raiz é contínua para entradas não negativas.", "Logo a composição é contínua em todo real."],
    result: "O domínio da camada externa é respeitado automaticamente porque \\(x^2+1\\) nunca é negativo.",
    pitfall: "Declarar continuidade da composição sem conferir o domínio da função externa.",
    practice: [
      ["Onde \\(\\ln(x-2)\\) é contínua?", "Quando \\(x-2>0\\), isto é, \\(x>2\\).", "\\(x>2\\)", "A restrição vem da camada logarítmica."],
      ["\\(1/(x^2+1)\\) é contínua em todos os reais?", "Sim, pois o denominador nunca zera.", "Sim", "A composição e o quociente respeitam suas hipóteses."],
    ],
  }),
  compact({
    moduleSlug: "derivadas", moduleTitle: "Derivadas com sentido", lessonNumber: 13,
    slug: "derivadas-trigonometricas", title: "Derivadas trigonométricas", notes: ["seno", "cosseno", "tangente"],
    why: "Ondas e movimentos periódicos exigem taxas de variação de seno, cosseno e tangente.",
    concept: "Em radianos, seno deriva para cosseno, cosseno deriva para menos seno e tangente deriva para secante ao quadrado. Com composição, multiplique pela derivada interna.",
    callout: "As fórmulas simples pressupõem ângulos em radianos.",
    formula: "(sin x)'=cos x; (cos x)'=-sin x; (tan x)'=sec²x", formulaLatex: "(\\sin x)'=\\cos x,\\quad(\\cos x)'=-\\sin x,\\quad(\\tan x)'=\\sec^2x",
    example: "Derive \\(f(x)=3\\sin(2x)-\\cos x\\).",
    steps: ["Separe a soma e mantenha a constante 3.", "Pela cadeia, \\((\\sin2x)'=2\\cos2x\\).", "\\((-\\cos x)'=+\\sin x\\).", "Logo \\(f'(x)=6\\cos(2x)+\\sin x\\)."],
    result: "A frequência interna 2 multiplica a taxa da onda.",
    pitfall: "Esquecer o sinal negativo da derivada do cosseno ou a cadeia.",
    practice: [
      ["Derive \\(\\cos(4x)\\).", "Use cadeia: \\(-4\\sin(4x)\\).", "\\(-4\\sin(4x)\\)", "A frequência aparece como fator."],
      ["Derive \\(\\tan x\\).", "A regra direta é \\(\\sec^2x\\).", "\\(\\sec^2x\\)", "A identidade trigonométrica surge na taxa."],
    ], exerciseIds: ["p2-derivadas-trig-1", "p2-derivadas-trig-5"],
  }),
  compact({
    moduleSlug: "derivadas", moduleTitle: "Derivadas com sentido", lessonNumber: 14,
    slug: "derivadas-exponenciais-logaritmicas", title: "Derivadas exponenciais e logarítmicas", notes: ["eˣ", "ln x"],
    why: "Crescimento contínuo, decaimento, juros e escalas logarítmicas pedem suas próprias regras de derivação.",
    concept: "A exponencial natural é sua própria derivada. Para base \\(a\\), aparece \\(\\ln a\\). O logaritmo natural deriva para \\(1/x\\), no domínio \\(x>0\\).",
    callout: "Com função interna \\(u(x)\\), aplique cadeia: \\((e^u)'=e^u u'\\) e \\((\\ln u)'=u'/u\\).",
    formula: "(eˣ)'=eˣ; (aˣ)'=aˣ ln a; (ln x)'=1/x", formulaLatex: "(e^x)'=e^x,\\quad(a^x)'=a^x\\ln a,\\quad(\\ln x)'=\\frac1x",
    example: "Derive \\(f(x)=e^{3x}+\\ln(x^2+1)\\).",
    steps: ["Na exponencial, a interna é \\(3x\\).", "Obtenha \\(3e^{3x}\\).", "No log, a interna é \\(x^2+1\\), derivada \\(2x\\).", "Some: \\(f'=3e^{3x}+2x/(x^2+1)\\)."],
    result: "As duas parcelas exigem cadeia, embora pertençam a famílias diferentes.",
    pitfall: "Escrever \\((\\ln u)'=1/u\\) e esquecer \\(u'\\).",
    practice: [
      ["Derive \\(2^x\\).", "Use base geral: \\(2^x\\ln2\\).", "\\(2^x\\ln2\\)", "A base altera a taxa por \\(\\ln2\\)."],
      ["Derive \\(\\ln(5x)\\), para \\(x>0\\).", "\\(5)/(5x)=1/x\\).", "\\(1/x\\)", "A constante interna cancela neste caso."],
    ], exerciseIds: ["p2-derivadas-exp-log-1", "p2-derivadas-exp-log-4"],
  }),
  compact({
    moduleSlug: "derivadas", moduleTitle: "Derivadas com sentido", lessonNumber: 15,
    slug: "derivacao-implicita", title: "Derivação implícita", notes: ["y depende de x", "cadeia"],
    why: "Nem toda curva vem com \\(y\\) isolado. Círculos e relações físicas são frequentemente dadas por uma equação entre variáveis.",
    concept: "Derive os dois lados em relação a \\(x\\). Sempre que derivar uma expressão com \\(y\\), multiplique por \\(y'=dy/dx\\), pois \\(y\\) depende de \\(x\\).",
    callout: "O fator \\(y'\\) é a regra da cadeia aparecendo na variável dependente.",
    formula: "d/dx[y²]=2y·y'", formulaLatex: "\\frac{d}{dx}(y^2)=2y\\frac{dy}{dx}",
    example: "Encontre a inclinação da circunferência \\(x^2+y^2=25\\).",
    steps: ["Derive: \\(2x+2yy'=0\\).", "Isole \\(y'\\): \\(2yy'=-2x\\).", "Divida por \\(2y\\): \\(y'=-x/y\\).", "No ponto \\((3,4)\\), a inclinação é \\(-3/4\\)."],
    result: "A inclinação depende da posição na circunferência e fica vertical onde \\(y=0\\).",
    pitfall: "Derivar \\(y^2\\) como \\(2y\\) sem multiplicar por \\(y'\\).",
    practice: [
      ["Derive \\(xy=6\\) implicitamente.", "Produto: \\(y+xy'=0\\), então \\(y'=-y/x\\).", "\\(-y/x\\)", "As duas variáveis mudam juntas."],
      ["Em \\(x^2+y^2=1\\), qual inclinação em \\((0,1)\\)?", "\\(y'=-x/y=0\\).", "0", "A tangente é horizontal no topo."],
    ], exerciseIds: ["p2-derivacao-implicita-1", "p2-derivacao-implicita-4"],
  }),
  compact({
    moduleSlug: "derivadas", moduleTitle: "Derivadas com sentido", lessonNumber: 16,
    slug: "derivadas-ordem-superior", title: "Derivadas de ordem superior", notes: ["segunda derivada", "aceleração"],
    why: "A primeira derivada mede mudança; derivar novamente mede como essa mudança também varia.",
    concept: "A segunda derivada \\(f''\\) é a derivada de \\(f'\\). Em movimento, posição deriva para velocidade e velocidade deriva para aceleração; em gráficos, \\(f''\\) informa concavidade.",
    callout: "A unidade também deriva: metros, metros por segundo, metros por segundo ao quadrado.",
    formula: "posição s → velocidade s' → aceleração s''", formulaLatex: "s(t)\\longrightarrow s'(t)=v(t)\\longrightarrow s''(t)=a(t)",
    example: "Para \\(s(t)=t^3-6t^2+9t\\), encontre velocidade e aceleração.",
    steps: ["Derive a posição: \\(v(t)=3t^2-12t+9\\).", "Derive novamente: \\(a(t)=6t-12\\).", "Em \\(t=2\\), \\(a(2)=0\\).", "A aceleração muda de sinal nesse instante."],
    result: "A segunda derivada descreve a mudança da velocidade, não a velocidade em si.",
    pitfall: "Confundir \\(f''\\) com \\((f')^2\\).",
    practice: [
      ["Se \\(f(x)=x^4\\), calcule \\(f''(x)\\).", "\\(f'=4x^3\\) e \\(f''=12x^2\\).", "\\(12x^2\\)", "A segunda taxa ainda depende de x."],
      ["Se \\(s\\) está em metros e \\(t\\) em segundos, unidade de \\(s''\\)?", "Metros por segundo ao quadrado.", "m/s²", "A unidade confirma a interpretação como aceleração."],
    ],
  }),
  compact({
    moduleSlug: "aplicacoes-derivadas", moduleTitle: "Aplicações de derivadas", lessonNumber: 10,
    slug: "extremos-intervalo-fechado", title: "Extremos absolutos em intervalo fechado", notes: ["endpoints", "pontos críticos"],
    why: "Em problemas reais, o maior ou menor valor pode ocorrer na borda permitida, não apenas onde a derivada zera.",
    concept: "Para função contínua em \\([a,b]\\), encontre pontos críticos internos e compare os valores da função nesses pontos e nos dois endpoints.",
    callout: "O método é uma comparação de candidatos, não apenas resolver \\(f'=0\\).",
    formula: "candidatos = críticos em (a,b) + a + b", formulaLatex: "\\text{candidatos}=\\{c\\in(a,b):f'(c)=0\\text{ ou não existe}\\}\\cup\\{a,b\\}",
    example: "Ache extremos absolutos de \\(f(x)=x^2-4x+5\\) em \\([0,5]\\).",
    steps: ["\\(f'(x)=2x-4=0\\Rightarrow x=2\\).", "Calcule \\(f(0)=5\\), \\(f(2)=1\\), \\(f(5)=10\\).", "Compare os três valores.", "Mínimo 1 em 2; máximo 10 em 5."],
    result: "O máximo está na borda, mostrando por que endpoints são indispensáveis.",
    pitfall: "Testar apenas o ponto crítico e esquecer as bordas.",
    practice: [
      ["Quais candidatos testar para \\(f\\) em \\([-1,3]\\) com crítico em 2?", "Teste -1, 2 e 3.", "-1, 2 e 3", "A lista vem do domínio fechado."],
      ["O maior valor de \\(f\\) entre candidatos é o quê?", "O máximo absoluto no intervalo.", "máximo absoluto", "A comparação decide o extremo global."],
    ],
  }),
  compact({
    moduleSlug: "aplicacoes-derivadas", moduleTitle: "Aplicações de derivadas", lessonNumber: 11,
    slug: "esboco-completo-curvas", title: "Esboço completo de curvas", notes: ["domínio", "assíntotas", "sinais"],
    why: "Um bom esboço reúne tudo: domínio, interceptos, limites, derivadas e concavidade.",
    concept: "Siga uma ordem: domínio e simetrias; interceptos; limites e assíntotas; sinal de \\(f'\\); sinal de \\(f''\\); pontos notáveis; desenho coerente.",
    callout: "Cada linha da tabela deve virar uma característica visível no gráfico.",
    formula: "domínio → limites → f' → f'' → esboço", formulaLatex: "\\text{domínio}\\to\\text{limites}\\to f'\\to f''\\to\\text{esboço}",
    example: "Organize o estudo de \\(f(x)=x^3-3x\\).",
    steps: ["Domínio: todos os reais; zeros: \\(-\\sqrt3,0,\\sqrt3\\).", "\\(f'=3x^2-3\\): críticos \\(\\pm1\\).", "\\(f''=6x\\): inflexão em 0.", "Use sinais para marcar crescimento, extremos e concavidade."],
    result: "O esboço deixa de ser adivinhação e passa a resumir argumentos calculados.",
    pitfall: "Desenhar uma curva bonita que contradiz sinais ou assíntotas.",
    practice: [
      ["Qual informação vem antes de derivar uma função racional?", "O domínio e as possíveis assíntotas.", "domínio", "Não se desenha através de pontos proibidos."],
      ["Se \\(f'>0\\) e \\(f''<0\\), como é o trecho?", "Crescente e côncavo para baixo.", "crescente e côncavo para baixo", "As duas derivadas respondem perguntas diferentes."],
    ],
  }),
  compact({
    moduleSlug: "aplicacoes-derivadas", moduleTitle: "Aplicações de derivadas", lessonNumber: 12,
    slug: "rolle-e-valor-medio", title: "Teoremas de Rolle e do Valor Médio", notes: ["hipóteses", "taxa média"],
    why: "Esses teoremas conectam o comportamento global de um intervalo a uma taxa instantânea em algum ponto interno.",
    concept: "Se \\(f\\) é contínua em \\([a,b]\\) e derivável em \\((a,b)\\), o TVM garante um \\(c\\) com \\(f'(c)=[f(b)-f(a)]/(b-a)\\). Rolle é o caso em que os extremos têm o mesmo valor.",
    callout: "Verifique as hipóteses antes de usar a conclusão.",
    formula: "f'(c)=[f(b)-f(a)]/(b-a)", formulaLatex: "f'(c)=\\frac{f(b)-f(a)}{b-a}",
    example: "Para \\(f(x)=x^2\\) em \\([1,3]\\), encontre o ponto garantido pelo TVM.",
    steps: ["Polinômio: contínuo e derivável.", "Taxa média: \\((9-1)/(3-1)=4\\).", "\\(f'(x)=2x\\).", "Resolva \\(2c=4\\): \\(c=2\\)."],
    result: "Em algum ponto, a inclinação da tangente iguala a inclinação da secante do intervalo.",
    pitfall: "Usar o TVM em ponto de descontinuidade ou não derivabilidade.",
    practice: [
      ["Qual a taxa média de \\(x^2\\) em \\([0,2]\\)?", "\\((4-0)/(2-0))=2\\).", "2", "O TVM procura uma tangente com essa inclinação."],
      ["Rolle exige qual relação adicional?", "\\(f(a)=f(b)\\).", "\\(f(a)=f(b)\\)", "A taxa média então é zero."],
    ],
  }),
  compact({
    moduleSlug: "aplicacoes-derivadas", moduleTitle: "Aplicações de derivadas", lessonNumber: 13,
    slug: "taxas-relacionadas", title: "Taxas relacionadas", notes: ["duas grandezas", "unidades"],
    why: "Em fenômenos reais, várias grandezas mudam ao mesmo tempo e uma equação física ou geométrica conecta suas taxas.",
    concept: "Escreva a relação entre as grandezas, derive em relação ao tempo e só depois substitua os valores do instante. Cada variável dependente do tempo produz sua própria taxa.",
    callout: "Substituir números antes de derivar pode apagar justamente a grandeza que varia.",
    formula: "x²+y²=r² ⇒ 2x x' + 2y y' = 2r r'", formulaLatex: "x^2+y^2=r^2\\Rightarrow2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=2r\\frac{dr}{dt}",
    example: "Um círculo aumenta com \\(dr/dt=2\\) cm/s. Qual \\(dA/dt\\) quando \\(r=5\\)?",
    steps: ["Relação: \\(A=\\pi r^2\\).", "Derive no tempo: \\(dA/dt=2\\pi r\\,dr/dt\\).", "Substitua \\(r=5\\) e \\(dr/dt=2\\).", "Resultado: \\(dA/dt=20\\pi\\) cm²/s."],
    result: "A área cresce mais rapidamente quando o raio já é maior.",
    pitfall: "Confundir a unidade de uma taxa de área com cm/s.",
    practice: [
      ["Se \\(V=s^3\\), relacione \\(dV/dt\\) e \\(ds/dt\\).", "Derive: \\(dV/dt=3s^2 ds/dt\\).", "\\(3s^2 ds/dt\\)", "O tamanho atual multiplica a taxa do lado."],
      ["Por que as unidades ajudam?", "Elas distinguem comprimento/tempo de área/tempo e detectam fórmulas incompletas.", "Para conferir a interpretação", "Análise dimensional é uma checagem de sentido."],
    ], exerciseIds: ["p2-taxas-relacionadas-1", "p2-taxas-relacionadas-5"],
  }),
  compact({
    moduleSlug: "aplicacoes-derivadas", moduleTitle: "Aplicações de derivadas", lessonNumber: 14,
    slug: "aproximacao-linear", title: "Aproximação linear e diferenciais", notes: ["reta tangente", "erro local"],
    why: "Perto de um ponto conhecido, a reta tangente permite estimar rapidamente valores difíceis e medir sensibilidade.",
    concept: "A linearização em \\(a\\) é \\(L(x)=f(a)+f'(a)(x-a)\\). O diferencial \\(dy=f'(a)dx\\) estima a mudança na saída para uma pequena mudança na entrada.",
    callout: "A aproximação é local: quanto mais longe de \\(a\\), maior pode ser o erro.",
    formula: "L(x)=f(a)+f'(a)(x-a)", formulaLatex: "L(x)=f(a)+f'(a)(x-a)",
    example: "Aproxime \\(\\sqrt{4{,}1}\\) usando \\(f(x)=\\sqrt{x}\\) perto de 4.",
    steps: ["\\(f(4)=2\\).", "\\(f'(x)=1/(2\\sqrt{x})\\), então \\(f'(4)=1/4\\).", "\\(dx=0{,}1\\).", "\\(L(4{,}1)=2+(1/4)(0{,}1)=2{,}025\\)."],
    result: "A estimativa é rápida e próxima do valor real porque 4,1 está perto de 4.",
    pitfall: "Usar a linearização longe demais do ponto-base.",
    practice: [
      ["Linearize \\(f(x)=x^2\\) em \\(a=3\\).", "\\(f(3)=9\\), \\(f'(3)=6\\): \\(L(x)=9+6(x-3)\\).", "\\(9+6(x-3)\\)", "A reta compartilha valor e inclinação no ponto."],
      ["Se \\(dx=0{,}02\\) e \\(f'(a)=5\\), estime \\(dy\\).", "\\(dy=5(0{,}02)=0{,}1\\).", "0,1", "A derivada converte pequenas variações."],
    ],
  }),
  compact({
    moduleSlug: "integrais", moduleTitle: "Integrais", lessonNumber: 12,
    slug: "somas-de-riemann", title: "Somas de Riemann", notes: ["retângulos", "limite de somas"],
    why: "A integral definida não é apenas uma fórmula de antiderivada: nasce como limite de muitas contribuições pequenas.",
    concept: "Divida \\([a,b]\\) em subintervalos de largura \\(\\Delta x\\), escolha pontos \\(x_i^*\\) e some \\(f(x_i^*)\\Delta x\\). Refinar a partição conduz à integral.",
    callout: "Cada parcela é altura vezes largura; a soma aproxima o acúmulo total.",
    formula: "∫ₐᵇ f(x)dx = lim Σ f(xᵢ*)Δx", formulaLatex: "\\int_a^b f(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^n f(x_i^*)\\Delta x",
    example: "Aproxime a área sob \\(f(x)=x\\) em \\([0,2]\\) com dois retângulos à direita.",
    steps: ["\\(\\Delta x=(2-0)/2=1\\).", "Pontos à direita: 1 e 2.", "Soma: \\(f(1)1+f(2)1=1+2=3\\).", "A área exata é 2; a soma à direita superestima a função crescente."],
    result: "A escolha dos pontos afeta a aproximação finita, mas o limite elimina essa dependência sob condições adequadas.",
    pitfall: "Somar apenas alturas e esquecer \\(\\Delta x\\).",
    practice: [
      ["Qual \\(\\Delta x\\) em \\([0,6]\\) com 3 partes iguais?", "\\((6-0)/3=2\\).", "2", "É a largura de cada retângulo."],
      ["Soma à direita de função crescente tende a superestimar ou subestimar?", "Superestimar.", "superestimar", "As alturas vêm do maior valor em cada subintervalo."],
    ],
  }),
  compact({
    moduleSlug: "integrais", moduleTitle: "Integrais", lessonNumber: 13,
    slug: "substituicao", title: "Substituição: a cadeia ao contrário", notes: ["função interna", "du"],
    why: "Sem substituição, integrais de composições simples ficam fora de alcance mesmo após o aluno dominar a regra da cadeia.",
    concept: "Escolha \\(u=g(x)\\) quando a integral contém uma função de \\(g(x)\\) multiplicada por \\(g'(x)\\). Troque toda a expressão para \\(u\\), integre e volte para \\(x\\).",
    callout: "A substituição funciona quando a derivada da parte interna aparece, talvez por um fator constante.",
    formula: "∫ f(g(x))g'(x)dx = ∫ f(u)du", formulaLatex: "\\int f(g(x))g'(x)\\,dx=\\int f(u)\\,du",
    example: "Calcule \\(\\int 2x(x^2+1)^3\\,dx\\).",
    steps: ["Escolha \\(u=x^2+1\\).", "Então \\(du=2x\\,dx\\).", "A integral vira \\(\\int u^3du=u^4/4+C\\).", "Volte: \\((x^2+1)^4/4+C\\)."],
    result: "Derivar a resposta recupera o integrando, confirmando a substituição.",
    pitfall: "Trocar apenas uma parte e deixar mistura de \\(x\\) e \\(u\\).",
    practice: [
      ["Calcule \\(\\int 3x^2 e^{x^3}dx\\).", "Use \\(u=x^3\\), \\(du=3x^2dx\\): resultado \\(e^{x^3}+C\\).", "\\(e^{x^3}+C\\)", "É a cadeia ao contrário."],
      ["Qual escolha de \\(u\\) em \\(\\int x/(x^2+4)dx\\)?", "Use \\(u=x^2+4\\).", "\\(u=x^2+4\\)", "A derivada interna é proporcional a \\(x\\)."],
    ], exerciseIds: ["p2-substituicao-1", "p2-substituicao-5"],
  }),
  compact({
    moduleSlug: "integrais", moduleTitle: "Integrais", lessonNumber: 14,
    slug: "valor-medio-funcao", title: "Valor médio de uma função", notes: ["acúmulo", "média contínua"],
    why: "Quando uma taxa varia continuamente, a média aritmética de poucos pontos não representa todo o intervalo.",
    concept: "O valor médio contínuo é o acúmulo total dividido pelo comprimento do intervalo: \\(f_{med}=\\frac1{b-a}\\int_a^b f(x)dx\\).",
    callout: "É a mesma ideia de média: total dividido pela extensão em que o total foi acumulado.",
    formula: "f_médio = 1/(b-a) ∫ₐᵇ f(x)dx", formulaLatex: "f_{\\mathrm{med}}=\\frac1{b-a}\\int_a^b f(x)\\,dx",
    example: "Encontre o valor médio de \\(f(x)=x^2\\) em \\([0,3]\\).",
    steps: ["Comprimento do intervalo: 3.", "\\(\\int_0^3x^2dx=[x^3/3]_0^3=9\\).", "Divida por 3.", "Valor médio: 3."],
    result: "Uma função com valores de 0 a 9 pode ter média 3 porque passa mais tempo em alturas menores.",
    pitfall: "Calcular apenas \\((f(a)+f(b))/2\\), que só funciona em casos especiais.",
    practice: [
      ["Valor médio de \\(f(x)=4\\) em qualquer intervalo?", "O acúmulo é \\(4(b-a)\\); dividindo pelo comprimento, sobra 4.", "4", "A média de uma constante é a própria constante."],
      ["Qual unidade tem o valor médio?", "A mesma unidade de \\(f\\).", "a mesma de f", "A divisão cancela a unidade da variável de integração."],
    ],
  }),
  compact({
    moduleSlug: "integrais", moduleTitle: "Integrais", lessonNumber: 15,
    slug: "area-entre-curvas", title: "Área entre curvas", notes: ["cima menos baixo", "interseções"],
    why: "Muitas regiões não ficam entre uma curva e o eixo, mas entre duas funções que podem trocar de posição.",
    concept: "Encontre as interseções, determine qual função está acima em cada intervalo e integre \\(\\text{cima}-\\text{baixo}\\). Se a ordem mudar, divida a integral.",
    callout: "Área geométrica não pode ser negativa; a ordem das curvas é parte do problema.",
    formula: "A=∫ₐᵇ [f(x)-g(x)]dx, se f≥g", formulaLatex: "A=\\int_a^b[f(x)-g(x)]\\,dx\\quad\\text{se }f(x)\\ge g(x)",
    example: "Calcule a área entre \\(y=x\\) e \\(y=x^2\\) de 0 a 1.",
    steps: ["Interseções: \\(x=x^2\\Rightarrow x=0,1\\).", "Em \\((0,1)\\), \\(x\\ge x^2\\).", "Integre \\(x-x^2\\).", "\\([x^2/2-x^3/3]_0^1=1/6\\)."],
    result: "A integral mede a distância vertical acumulada entre as curvas.",
    pitfall: "Subtrair na ordem errada ou ignorar um cruzamento interno.",
    practice: [
      ["Entre \\(y=4\\) e \\(y=x^2\\) em \\([-2,2]\\), qual integrando?", "A curva de cima é 4: use \\(4-x^2\\).", "\\(4-x^2\\)", "As interseções são as bordas."],
      ["Se as curvas cruzam no meio, o que fazer?", "Dividir o intervalo e trocar a ordem onde necessário.", "dividir a integral", "Isso mantém a área positiva."],
    ], exerciseIds: ["p2-area-entre-curvas-1", "p2-area-entre-curvas-5"],
  }),
  compact({
    moduleSlug: "integrais", moduleTitle: "Integrais", lessonNumber: 16,
    slug: "volumes-por-discos", title: "Volumes por discos e arruelas", notes: ["opcional", "sólidos de revolução"], level: "aplicação opcional",
    why: "Girar uma região em torno de um eixo transforma áreas pequenas em discos ou arruelas cujo volume pode ser acumulado.",
    concept: "Uma fatia perpendicular ao eixo de rotação tem área \\(\\pi R^2\\) para disco ou \\(\\pi(R^2-r^2)\\) para arruela. Integre essas áreas ao longo do eixo.",
    callout: "Defina claramente raio externo e interno antes de montar a integral.",
    formula: "V=π∫[R(x)²-r(x)²]dx", formulaLatex: "V=\\pi\\int_a^b[R(x)^2-r(x)^2]\\,dx",
    example: "Gire a região sob \\(y=x\\), \\(0\\le x\\le2\\), em torno do eixo \\(x\\).",
    steps: ["Cada seção é um disco de raio \\(R(x)=x\\).", "Não há raio interno: \\(r=0\\).", "\\(V=\\pi\\int_0^2x^2dx\\).", "\\(V=\\pi[x^3/3]_0^2=8\\pi/3\\)."],
    result: "Somamos volumes infinitesimais de discos ao longo de duas unidades.",
    pitfall: "Usar a função como área sem elevar o raio ao quadrado.",
    practice: [
      ["Qual área de uma arruela com raios 5 e 3?", "\\(\\pi(25-9)=16\\pi\\).", "\\(16\\pi\\)", "Subtraímos o furo interno."],
      ["Ao girar \\(y=f(x)\\) em torno do eixo x, qual raio do disco?", "A distância vertical ao eixo: \\(|f(x)|\\).", "\\(|f(x)|\\)", "O quadrado elimina o sinal na área."],
    ],
  }),
];

export const calculo1Phase2Catalog: Record<string, TrilhaAula[]> = {};
export const calculo1Phase2Registry: Record<string, Record<string, AulaContent>> = {};

for (const original of specs) {
  const spec = reviseCurriculum(original);
  (calculo1Phase2Catalog[spec.moduleSlug] ??= []).push({
    slug: spec.slug,
    title: spec.title,
    duration: spec.duration ?? "14 min",
    available: true,
  });
  (calculo1Phase2Registry[spec.moduleSlug] ??= {})[spec.slug] =
    createCurriculumLesson(spec);
}
