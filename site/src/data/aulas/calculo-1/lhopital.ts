import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

/**
 * Regra de L'Hôpital e as outras indeterminações.
 *
 * O site citava L'Hôpital uma única vez — para dizer onde não usá-la — e não
 * a ensinava em lugar nenhum, embora ela esteja em quase toda lista de limites
 * de Cálculo 1. As duas aulas ficam depois da aproximação linear de propósito:
 * a justificativa da regra é exatamente "perto do ponto, cada função se
 * parece com a sua tangente".
 *
 * Os exemplos evitam \(\sin x / x\), \((e^x - 1)/x\) e \(\ln x / (x - 1)\):
 * são os limites que constroem as próprias derivadas usadas pela regra, e
 * calculá-los por L'Hôpital seria andar em círculo.
 */

const MOD = "aplicacoes-derivadas";
const MOD_TITLE = "Aplicações de derivadas";

export const lhopitalAulas: Record<string, AulaContent> = {
  "regra-de-lhopital": {
    meta: {
      ...c1Meta({
        title: "Regra de L’Hôpital: quando 0/0 vira razão de inclinações",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 14,
        duration: "16 min",
        level: "universitário introdutório",
        readingNotes: ["Só vale em 0/0 e ∞/∞", "Derive em cima e embaixo, separadamente"],
        glossaryTerms: ["Limite", "Derivada", "Forma indeterminada"],
        next: { slug: "outras-indeterminacoes", title: "Outras indeterminações" },
      }),
      prereqs: [
        { label: "Aproximação linear", href: "/calculo-1/aplicacoes-derivadas/aproximacao-linear" },
        { label: "Regras de derivação", href: "/calculo-1/derivadas/regras-derivacao" },
      ],
      usedIn: [
        {
          label: "Outras indeterminações",
          href: "/calculo-1/aplicacoes-derivadas/outras-indeterminacoes",
          detail: "0·∞, ∞ − ∞ e potências, reescritas até virar 0/0",
        },
        {
          label: "Esboço completo de curvas",
          href: "/calculo-1/aplicacoes-derivadas/esboco-completo-curvas",
          detail: "o que o gráfico faz perto de um buraco e no infinito",
        },
      ],
    },
    plot: "lhopital-razao-inclinacoes",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Você já sabe o que fazer com um \\(\\frac{0}{0}\\) quando dá para fatorar: cancela o fator comum e substitui. Mas muitos limites não fatoram. Perto de \\(x = 1\\), \\(\\frac{x^2 - 1}{\\ln x}\\) dá \\(\\frac{0}{0}\\) e não há fator comum à vista; a tabela sugere um valor, mas não prova nada.",
        "A regra de L’Hôpital resolve boa parte desses casos com uma ferramenta que você já domina: derivar. Em vez de comparar as duas funções, você compara a rapidez com que cada uma vai a zero.",
        "É também a regra mais usada fora de hora em prova. Por isso esta aula gasta tanto tempo com as condições quanto com a conta.",
      ],
    },
    explicacao: {
      title: "Perto do ponto, cada função se parece com a sua tangente",
      paragraphs: [
        "Se \\(f(a) = 0\\) e \\(g(a) = 0\\), a fração \\(\\frac{f(x)}{g(x)}\\) vira \\(\\frac{0}{0}\\) em \\(x = a\\). As duas partes somem juntas, e o resultado depende de qual some mais depressa.",
        "Perto de \\(a\\), cada função se parece com a sua reta tangente: \\(f(x) \\approx f'(a)(x - a)\\) e \\(g(x) \\approx g'(a)(x - a)\\). O fator \\((x - a)\\) aparece nas duas e se cancela, sobrando a razão das inclinações, \\(\\frac{f'(a)}{g'(a)}\\).",
        "A regra geral diz: se \\(\\frac{f(x)}{g(x)}\\) dá \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\), e o limite de \\(\\frac{f'(x)}{g'(x)}\\) existe, então os dois limites são iguais. Ela pede ainda que \\(f\\) e \\(g\\) sejam deriváveis perto de \\(a\\), com \\(g'(x) \\neq 0\\) ali. Com as funções deste curso, a condição que costuma falhar é a primeira — por isso a substituição vem sempre antes.",
      ],
      alternativa: [
        "Imagine duas torneiras fechando no mesmo instante. No fim, as duas vazões chegam a zero e a razão entre elas parece \\(\\frac{0}{0}\\). Mas se uma fecha três vezes mais depressa que a outra, perto do fim a razão das vazões é \\(3\\).",
        "É essa rapidez de fechamento que as derivadas medem. Por isso a regra troca as funções pelas derivadas: quem decide a fração é a velocidade com que cada parte vai a zero.",
      ],
      callout:
        "Substitua primeiro. Só se der \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\) a regra vale. Aí derive o numerador e o denominador, cada um por si, e substitua de novo.",
      formula: "lim f(x)/g(x) = lim f′(x)/g′(x), se a substituição der 0/0 ou ∞/∞",
      formulaLatex:
        "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}",
      formulaAria:
        "limite de f de x sobre g de x, quando x tende a a, é igual ao limite de f linha de x sobre g linha de x, se a substituição der zero sobre zero ou infinito sobre infinito",
      formulaLegend: "só quando a substituição dá 0/0 ou ∞/∞; vale também com x → ±∞ e nos limites laterais",
    },
    demonstracao: {
      title: "Por que a regra funciona, no caso mais simples",
      tag: "razão de inclinações",
      intro:
        "Há uma justificativa curta quando \\(f\\) e \\(g\\) valem zero em \\(a\\), são deriváveis ali e \\(g'(a) \\neq 0\\). O caso geral usa o Teorema do Valor Médio de Cauchy, mas a ideia é esta mesma.",
      steps: [
        {
          title: "Usar que as duas valem zero em a",
          detail: "Como \\(f(a) = 0\\) e \\(g(a) = 0\\), subtrair esses zeros não muda nada.",
          formula: "\\frac{f(x)}{g(x)} = \\frac{f(x) - f(a)}{g(x) - g(a)}",
          formulaAria: "f de x sobre g de x é igual a f de x menos f de a, sobre g de x menos g de a",
        },
        {
          title: "Dividir em cima e embaixo por x − a",
          detail: "Para \\(x \\neq a\\), dividir numerador e denominador pelo mesmo número não altera a fração.",
          formula: "\\frac{f(x)}{g(x)} = \\dfrac{\\;\\dfrac{f(x) - f(a)}{x - a}\\;}{\\;\\dfrac{g(x) - g(a)}{x - a}\\;}",
          formulaAria:
            "f de x sobre g de x é igual à razão entre f de x menos f de a sobre x menos a, e g de x menos g de a sobre x menos a",
        },
        {
          title: "Reconhecer duas derivadas",
          detail:
            "Cada andar da fração é uma taxa de variação média. Quando \\(x \\to a\\), a de cima tende a \\(f'(a)\\) e a de baixo a \\(g'(a)\\).",
          formula: "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{f'(a)}{g'(a)}",
          formulaAria: "o limite de f de x sobre g de x, quando x tende a a, é f linha de a sobre g linha de a",
        },
      ],
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Provas", detail: "está em quase toda lista de limites de Cálculo 1" },
        { label: "Comparar crescimentos", detail: "a exponencial vence qualquer potência: \\(x^{10}/e^x \\to 0\\)" },
        { label: "Computação", detail: "o tempo de um algoritmo \\(n^2\\) contra um \\(2^n\\)" },
        { label: "Finanças", detail: "juros capitalizados sem parar e o número \\(e\\)" },
        { label: "Física", detail: "o que uma fórmula faz quando um parâmetro vai a zero" },
        { label: "Esboço de curvas", detail: "o que o gráfico faz perto de um buraco ou no infinito" },
      ],
    },
    exemplo: {
      title: "Um 0/0 que também dá para fatorar",
      situacao:
        "Calcule o limite abaixo pela regra de L’Hôpital e confira fatorando. Os dois caminhos precisam dar o mesmo número. \\[\\lim_{x \\to 2} \\frac{x^3 - 8}{x^2 - 4}\\]",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Substituir primeiro",
          detail:
            "Em \\(x = 2\\): numerador \\(8 - 8 = 0\\), denominador \\(4 - 4 = 0\\). É \\(\\frac{0}{0}\\), então a regra pode ser usada.",
        },
        {
          title: "Derivar em cima e embaixo, separadamente",
          detail: "\\((x^3 - 8)' = 3x^2\\) e \\((x^2 - 4)' = 2x\\). Não é a regra do quociente: cada parte é derivada sozinha.",
        },
        {
          title: "Substituir de novo",
          detail: "\\[\\lim_{x \\to 2} \\frac{3x^2}{2x} = \\frac{12}{4} = 3\\]",
        },
        {
          title: "Conferir fatorando",
          detail:
            "\\[\\frac{x^3 - 8}{x^2 - 4} = \\frac{(x - 2)(x^2 + 2x + 4)}{(x - 2)(x + 2)} \\;\\to\\; \\frac{4 + 4 + 4}{4} = 3\\]",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Os dois caminhos dão \\(3\\). No gráfico acima, perto de \\(x = 2\\) as duas curvas se parecem com retas de inclinação \\(12\\) e \\(4\\): a altura de uma fica perto de três vezes a altura da outra, e é isso que o limite mede.",
        "A regra não substitui a fatoração quando ela é fácil. Mas funciona também onde não há o que fatorar: em \\(\\frac{x^2 - 1}{\\ln x}\\) perto de \\(1\\), derivando fica \\(\\frac{2x}{1/x} = 2x^2\\), que tende a \\(2\\).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Aplicar a regra sem conferir a forma. Em \\(\\frac{x + 1}{x + 2}\\) com \\(x \\to 0\\), a substituição já dá \\(\\frac{1}{2}\\); derivando, você obteria \\(1\\), que está errado.",
        "Usar a regra do quociente. L’Hôpital deriva o numerador e o denominador cada um por si, e não a fração inteira.",
        "Continuar derivando depois que a forma deixou de ser indeterminada. Cada nova aplicação exige um novo \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\).",
        "Usar a regra para provar os limites que constroem as próprias derivadas, como \\(\\frac{\\sin x}{x} \\to 1\\). A derivada do seno foi obtida a partir desse limite; usá-la para calculá-lo é andar em círculo.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Calcule \\[\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}\\]",
          identificar: "Substitua: \\(\\sqrt{4} - 2 = 0\\) e \\(4 - 4 = 0\\).",
          dica: "\\((\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}\\) e \\((x - 4)' = 1\\).",
          resolucao:
            "É \\(\\frac{0}{0}\\). Derivando: \\(\\frac{1/(2\\sqrt{x})}{1} = \\frac{1}{2\\sqrt{x}}\\). Em \\(x = 4\\): \\(\\frac{1}{2 \\cdot 2} = \\frac{1}{4}\\).",
          resposta: "1/4",
          interpretacao:
            "Dá para conferir multiplicando pelo conjugado \\(\\sqrt{x} + 2\\): a fração vira \\(\\frac{1}{\\sqrt{x} + 2}\\), que também tende a \\(\\frac{1}{4}\\).",
          erroComum: "Derivar só o numerador e esquecer que o denominador também precisa ser derivado.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Pode-se usar L’Hôpital em \\(\\frac{\\cos x}{x}\\) quando \\(x \\to 0\\)? Por quê?",
          identificar: "Substitua antes de qualquer coisa.",
          dica: "Quanto vale \\(\\cos 0\\)?",
          resolucao:
            "Não. Em \\(x = 0\\) o numerador vale \\(\\cos 0 = 1\\) e o denominador vale \\(0\\): é \\(\\frac{1}{0}\\), que não é indeterminação. A fração explode — para \\(+\\infty\\) pela direita e \\(-\\infty\\) pela esquerda —, então o limite bilateral não existe.",
          resposta: "Não: é 1/0, não uma indeterminação",
          interpretacao:
            "Um número diferente de zero sobre algo que vai a zero não é disputa nenhuma: o resultado explode, e a regra não tem nada a acrescentar.",
          erroComum: "Derivar mesmo assim e obter \\(\\frac{-\\sin x}{1} \\to 0\\), uma resposta sem sentido.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado:
            "Quando \\(x \\to \\infty\\), quem cresce mais depressa: \\(\\ln x\\) ou \\(\\sqrt{x}\\)? Calcule o limite de \\(\\frac{\\ln x}{\\sqrt{x}}\\).",
          identificar: "As duas partes crescem sem limite: é \\(\\frac{\\infty}{\\infty}\\).",
          dica: "\\((\\ln x)' = \\frac{1}{x}\\) e \\((\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}\\).",
          resolucao:
            "Derivando: \\(\\frac{1/x}{1/(2\\sqrt{x})} = \\frac{2\\sqrt{x}}{x} = \\frac{2}{\\sqrt{x}}\\), que tende a \\(0\\).",
          resposta: "0; a raiz cresce mais depressa",
          interpretacao:
            "O logaritmo cresce, mas tão devagar que perde para qualquer potência positiva de \\(x\\), até para a raiz quadrada.",
          erroComum: "Achar que, como os dois vão a infinito, a razão tende a \\(1\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "0/0 e ∞/∞, crescimento de algoritmos e o erro de derivar cedo demais.",
      exerciseIds: ["ad-lh-01", "ad-lh-02", "ad-lh-03"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Substitua primeiro: a regra só vale em \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\).",
        "Derive o numerador e o denominador separadamente e substitua de novo.",
        "Se voltar a dar \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\), pode aplicar outra vez.",
        "Perto do ponto, a razão das funções vira a razão das inclinações.",
        "Não use a regra para provar os limites que constroem as derivadas.",
        "Próximo: \\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\) e \\(1^\\infty\\), reescritas até virar \\(\\frac{0}{0}\\).",
      ],
    },
  },

  "outras-indeterminacoes": {
    meta: {
      ...c1Meta({
        title: "Outras indeterminações: reescrever até virar 0/0",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 15,
        duration: "15 min",
        level: "universitário introdutório",
        readingNotes: ["0·∞: um fator vai para o denominador", "Potências: tire o logaritmo"],
        glossaryTerms: ["Forma indeterminada", "Logaritmo", "Limite"],
        next: { slug: "revisao-aplic-derivadas", title: "Revisão do módulo" },
      }),
      prereqs: [
        { label: "Regra de L’Hôpital", href: "/calculo-1/aplicacoes-derivadas/regra-de-lhopital" },
        { label: "Função logarítmica", href: "/pre-calculo/funcoes/funcao-logaritmica" },
      ],
      usedIn: [
        {
          label: "Esboço completo de curvas",
          href: "/calculo-1/aplicacoes-derivadas/esboco-completo-curvas",
          detail: "o que x ln x faz perto de zero e as potências no infinito",
        },
        {
          label: "Banco de aplicações de derivadas",
          href: "/exercicios?tema=aplicacoes-derivadas",
          detail: "LH-04 a LH-06 misturam as três reescritas, como em prova",
        },
      ],
    },
    plot: "um-elevado-a-infinito",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "L’Hôpital só aceita frações do tipo \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\). Mas os limites de prova nem sempre chegam em forma de fração: aparecem \\(x \\ln x\\) perto de zero, a diferença de dois termos que explodem, ou uma potência como \\((1 + \\frac{1}{x})^x\\).",
        "Nesses casos a intuição engana. \\(0 \\cdot \\infty\\) não é zero nem infinito, e \\(1^\\infty\\) não é \\(1\\). Cada uma dessas formas pode dar qualquer resultado, dependendo de quem vence a disputa.",
        "A saída é sempre a mesma: reescrever a expressão até que ela vire uma fração \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\). Aí a regra da aula anterior resolve.",
      ],
    },
    explicacao: {
      title: "Três reescritas, um só destino",
      paragraphs: [
        "**\\(0 \\cdot \\infty\\)**: mande um dos fatores para o denominador, invertido. \\(x \\ln x = \\frac{\\ln x}{1/x}\\), que perto de \\(0^+\\) é \\(\\frac{-\\infty}{\\infty}\\). Em geral, deixe o logaritmo em cima.",
        "**\\(\\infty - \\infty\\)**: junte tudo numa fração só, com denominador comum. A diferença de dois termos grandes vira um quociente, e o quociente costuma dar \\(\\frac{0}{0}\\).",
        "**\\(1^\\infty\\), \\(0^0\\) e \\(\\infty^0\\)**: tire o logaritmo. Se \\(y = f(x)^{g(x)}\\), então \\(\\ln y = g(x) \\ln f(x)\\), que é um produto do tipo \\(0 \\cdot \\infty\\). Calcule o limite de \\(\\ln y\\) e, no fim, volte com a exponencial: se \\(\\ln y \\to L\\), então \\(y \\to e^L\\).",
      ],
      alternativa: [
        "Pense nessas formas como disputas. Em \\(x \\ln x\\), um fator puxa para zero e o outro para menos infinito. Em \\((1 + \\frac{1}{x})^x\\), a base puxa para \\(1\\) e o expoente para infinito. O símbolo da forma diz só quem está disputando, não quem ganha.",
        "Reescrever como fração coloca os dois disputantes frente a frente, um em cima e outro embaixo. Aí as derivadas medem quem é mais rápido.",
      ],
      callout:
        "\\(0 \\cdot \\infty\\): vire fração. \\(\\infty - \\infty\\): junte numa fração. Potência indeterminada: tire o logaritmo e, no fim, volte com a exponencial.",
      formula: "y = f^g ⟹ ln y = g · ln f; se ln y → L, então y → e^L",
      formulaLatex:
        "\\begin{aligned} y = f(x)^{g(x)} &\\;\\Longrightarrow\\; \\ln y = g(x)\\,\\ln f(x) \\\\ \\ln y \\to L &\\;\\Longrightarrow\\; y \\to e^{L} \\end{aligned}",
      formulaAria:
        "y igual a f de x elevado a g de x implica logaritmo natural de y igual a g de x vezes logaritmo natural de f de x; se o logaritmo de y tende a L, então y tende a e elevado a L",
      formulaLegend: "o logaritmo transforma a potência num produto",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Juros contínuos", detail: "\\((1 + \\frac{r}{n})^n \\to e^r\\) quando a capitalização não para" },
        { label: "Teoria da informação", detail: "a entropia usa \\(p \\ln p\\), que tende a \\(0\\) quando \\(p \\to 0\\)" },
        { label: "Computação", detail: "comparar \\(n \\ln n\\) com \\(n^2\\) no tempo de algoritmos" },
        { label: "Crescimento", detail: "populações que crescem continuamente seguem o número \\(e\\)" },
        { label: "Esboço de curvas", detail: "o que \\(x \\ln x\\) faz perto de zero" },
        { label: "Provas", detail: "\\(1^\\infty\\) é a pegadinha clássica das listas de limites" },
      ],
    },
    exemplo: {
      title: "1 elevado a infinito não é 1",
      situacao:
        "Calcule o limite de \\((1 + \\frac{1}{x})^x\\) quando \\(x \\to \\infty\\). A base vai para \\(1\\) e o expoente vai para infinito — a tentação é responder \\(1\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer a forma",
          detail: "Base \\(1 + \\frac{1}{x} \\to 1\\), expoente \\(x \\to \\infty\\): é \\(1^\\infty\\), indeterminada.",
        },
        {
          title: "Tirar o logaritmo",
          detail:
            "Com \\(y = (1 + \\frac{1}{x})^x\\), fica \\(\\ln y = x \\ln(1 + \\frac{1}{x}) = \\dfrac{\\ln(1 + 1/x)}{1/x}\\), que é \\(\\frac{0}{0}\\).",
        },
        {
          title: "Aplicar L’Hôpital",
          detail:
            "\\[\\frac{\\frac{1}{1 + 1/x} \\cdot \\frac{-1}{x^2}}{\\frac{-1}{x^2}} = \\frac{1}{1 + 1/x} \\;\\to\\; 1\\]",
        },
        {
          title: "Voltar com a exponencial",
          detail: "Se \\(\\ln y \\to 1\\), então \\(y \\to e^1 = e \\approx 2{,}718\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O limite é \\(e\\), e não \\(1\\). No gráfico acima, a curva sobe devagar em direção à linha de \\(e\\), longe da linha do \\(1\\) que a intuição sugeria. A base encolhe para \\(1\\), mas o expoente cresce na mesma medida, e nenhum dos dois vence sozinho.",
        "É o limite dos juros compostos: capitalizar \\(100\\%\\) ao ano em \\(n\\) parcelas cada vez menores rende, no máximo, o fator \\(e\\). Um aviso honesto: aqui a regra confirma o valor de \\(e\\), mas não serve para defini-lo, porque a derivada de \\(\\ln x\\) usada no passo 3 já depende desse número.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Responder \\(1^\\infty = 1\\) ou \\(0 \\cdot \\infty = 0\\) de cabeça. As duas formas são indeterminadas e podem dar qualquer valor.",
        "Aplicar L’Hôpital direto num produto ou numa diferença. A regra só vale para quocientes; reescreva antes.",
        "Esquecer de voltar com a exponencial: o limite de \\(\\ln y\\) não é o limite de \\(y\\).",
        "Na forma \\(0 \\cdot \\infty\\), mandar o logaritmo para o denominador. \\(\\frac{x}{1/\\ln x}\\) é válido, mas gera derivadas piores; deixe o logaritmo em cima.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Calcule o limite de \\(x \\ln x\\) quando \\(x \\to 0^+\\).",
          identificar: "É \\(0 \\cdot (-\\infty)\\): reescreva como fração.",
          dica: "\\(x \\ln x = \\frac{\\ln x}{1/x}\\).",
          resolucao:
            "\\(\\frac{\\ln x}{1/x}\\) é \\(\\frac{-\\infty}{\\infty}\\). Derivando: \\(\\frac{1/x}{-1/x^2} = -x\\), que tende a \\(0\\).",
          resposta: "0",
          interpretacao: "O fator \\(x\\) vai a zero mais depressa do que \\(\\ln x\\) vai a menos infinito.",
          erroComum: "Responder \\(-\\infty\\) porque \\(\\ln x\\) explode.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Calcule o limite de \\(x^x\\) quando \\(x \\to 0^+\\).",
          identificar: "É \\(0^0\\): tire o logaritmo.",
          dica: "\\(\\ln(x^x) = x \\ln x\\), que você calculou no exercício anterior.",
          resolucao: "\\(\\ln(x^x) = x \\ln x \\to 0\\). Então \\(x^x \\to e^0 = 1\\).",
          resposta: "1",
          interpretacao:
            "Aqui \"zero elevado a zero\" deu \\(1\\), mas só porque a conta confirmou. Em \\((e^{-1/x})^x\\), também do tipo \\(0^0\\), o resultado é \\(e^{-1}\\).",
          erroComum: "Responder \\(0\\) porque a base vai a zero.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado:
            "Por que \\(\\infty - \\infty\\) não é zero? Dê um exemplo de dois termos que crescem sem limite e cuja diferença tende a um número diferente de zero.",
          identificar: "\"Infinito\" não é um número: descreve algo que cresce.",
          dica: "Tente dois termos que andam sempre juntos, separados por uma constante.",
          resolucao:
            "Os dois termos de \\((x + 5) - x\\) crescem sem limite, e a diferença vale \\(5\\) para todo \\(x\\). Já \\(x^2 - x\\) tende a infinito. O resultado depende de quem cresce mais depressa.",
          resposta: "Porque depende de quem cresce mais rápido; por exemplo, (x + 5) − x → 5",
          interpretacao:
            "\\(\\infty - \\infty\\) descreve uma disputa, não uma conta. Juntar numa fração é o jeito de ver quem ganha.",
          erroComum: "Tratar infinito como número e cancelar os dois termos.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Um exercício de cada reescrita, incluindo os juros capitalizados sem parar.",
      exerciseIds: ["ad-lh-04", "ad-lh-05", "ad-lh-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(1^\\infty\\), \\(0^0\\) e \\(\\infty^0\\) são indeterminadas: o símbolo não diz o resultado.",
        "\\(0 \\cdot \\infty\\): passe um fator para o denominador.",
        "\\(\\infty - \\infty\\): junte numa fração só.",
        "Potências: \\(\\ln y = g \\ln f\\); se \\(\\ln y \\to L\\), então \\(y \\to e^L\\).",
        "Depois de reescrever, confira que virou \\(\\frac{0}{0}\\) ou \\(\\frac{\\infty}{\\infty}\\) antes de derivar.",
        "Próximo: revisão do módulo.",
      ],
    },
  },
};
