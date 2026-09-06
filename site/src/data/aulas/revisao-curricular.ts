import type { CurriculumLessonSpec as Spec } from "@/data/aulas/lesson-factory";

const m = String.raw;
type Rule = NonNullable<Spec["rules"]>[number];
type Guided = Spec["guided"][number];
const rule = (id: string, title: string, formulaLatex: string, formulaAria: string, conditions: string, example: string): Rule =>
  ({ id, title, formulaLatex, formulaAria, conditions, example });
const guided = (question: string, solution: string, answer: string, interpretation: string, type: Guided["type"] = "calculo"): Guided =>
  ({ question, solution, answer, interpretation, type });

/** Revisions shared by the catalog and rendered content; untouched lessons retain their specs. */
export function reviseCurriculum(spec: Spec): Spec {
  const key = `${spec.track}/${spec.moduleSlug}/${spec.slug}`;
  const patch = revisions[key];
  if (!patch) return spec;
  return { ...spec, ...patch,
    guided: [...spec.guided, ...(patch.guided ?? [])],
    exerciseIds: [...(spec.exerciseIds ?? []), ...(patch.exerciseIds ?? [])],
    summary: [...spec.summary, ...(patch.summary ?? [])],
  };
}

const revisions: Record<string, Partial<Spec>> = {
  "pre-calculo/funcoes/polinomios-e-zeros": {
    explanation: [m`O grau é o maior expoente com coeficiente não nulo. Para um polinômio não nulo, um zero real de multiplicidade par toca o eixo sem mudar de sinal; de multiplicidade ímpar, atravessa. O polinômio nulo é um caso separado e não tem grau definido pela regra usual.`,
      m`Nem todo polinômio real é produto apenas de fatores lineares reais. Por exemplo, \(x^2+1>0\) para todo real: não tem zeros reais. Sobre os reais, podem restar fatores quadráticos sem raízes reais; sobre os complexos, todo polinômio não constante se decompõe em fatores lineares, contando multiplicidades.`],
    formula: "p(x) = (x-r)^m q(x), com q(r) diferente de zero: multiplicidade do zero real r",
    formulaLatex: m`p(x)=(x-r)^m q(x),\qquad q(r)\ne0`,
    guided: [guided(m`Por que \(x^2+1\) não se fatora em fatores lineares reais?`, m`Porque \(x^2+1\ge1\) em todo real. Nos complexos, \(x^2+1=(x-i)(x+i)\).`, "Não possui zeros reais", "O conjunto numérico faz parte da afirmação de fatoração.", "compreensao")],
    exerciseIds: ["cur-pol-1", "cur-pol-2"],
    summary: ["Fatoração só em fatores lineares exige conferir o corpo numérico e a existência dos zeros."],
  },
  "pre-calculo/funcoes/funcoes-inversas": {
    explanation: [m`Para \(f:A\to B\) ter inversa \(f^{-1}:B\to A\), precisa ser bijetiva: injetiva (não repete saídas) e sobrejetiva (atinge todo B). Então \(f^{-1}(f(x))=x\) em A e \(f(f^{-1}(y))=y\) em B.`,
      m`Se f é apenas injetiva, podemos escolher a imagem f(A) como contradomínio e inverter \(f:A\to f(A)\). A inversa recebe saídas da função original; não recebe valores fora dessa imagem.`,
      m`Exemplo: \(f(x)=x^2\) de \([0,+\infty)\) para \(\mathbb R\) é injetiva, mas não sobrejetiva. Com contradomínio \([0,+\infty)\), é bijetiva e sua inversa é \(\sqrt x\). Sem restringir o domínio original, entradas opostas impedem a inversão.`],
    callout: "Declare domínio e contradomínio. Ser um a um garante inversa sobre a imagem, não sobre qualquer conjunto de chegada.",
    guided: [guided(m`A função \(e^x:\mathbb R\to\mathbb R\) é bijetiva? Qual contradomínio permite usar \(\ln x\) como inversa?`, m`Não atinge números não positivos. Com contradomínio \((0,+\infty)\), é bijetiva e \(\ln:(0,+\infty)\to\mathbb R\) é sua inversa.`, m`\((0,+\infty)\)`, "A inversa só recebe resultados possíveis.", "interpretacao")],
    exerciseIds: ["cur-inv-1", "cur-inv-2"],
    summary: ["Bijetividade permite inverter sobre o contradomínio declarado; injetividade permite inverter sobre a imagem."],
  },
  "calculo-1/limites/limites-exponenciais-logaritmicos": {
    duration: "22 min",
    explanation: [m`Para base \(a>0\), a exponencial é contínua. O logaritmo de base a exige ainda \(a\ne1\) e argumento positivo. Em pontos internos do domínio, substituímos; expressões como \((e^x-1)/x\) e \(\ln(1+x)/x\) dão 0/0 e pedem um resultado adicional.`,
      m`Nesta etapa adotamos como resultado fundamental a desigualdade \(t/(1+t)\le\ln(1+t)\le t\), válida para \(t>-1\). Ela não vem das regras de derivação que vamos construir. O confronto abaixo deduz o limite logarítmico; a relação entre inversas dá o exponencial. Não use L’Hôpital para justificar os limites que fundamentam essas derivadas.`,
      m`Leitura opcional, depois de integrais: uma construção independente define \(\ln(1+t)=\int_1^{1+t} ds/s\). Comparar a área com retângulos fornece a desigualdade. Para t positivo, as alturas ficam entre 1/(1+t) e 1; para t negativo, inverta os limites da integral. Esta justificativa geométrica não exige conhecer a derivada da exponencial.`],
    callout: "Não é só continuidade: o quociente 0/0 exige um limite fundamental. Confira base e domínio antes de transformar.",
    rules: [
      rule("limite-log-fundamental", "Limite fundamental do logaritmo", m`\lim_{t\to0}\frac{\ln(1+t)}{t}=1`, "O limite do logaritmo natural de um mais t, dividido por t, quando t tende a zero, é um.",
        "t > −1 e t ≠ 0. A aproximação é bilateral dentro do domínio.",
        m`Para t>0, \(1/(1+t)\le\ln(1+t)/t\le1\). Para −1<t<0, dividir por t inverte as desigualdades: \(1\le\ln(1+t)/t\le1/(1+t)\). Os dois extremos tendem a 1; pelo Confronto, o limite bilateral é 1.`),
      rule("limite-exp-fundamental", "Limite fundamental da exponencial", m`\lim_{h\to0}\frac{e^h-1}{h}=1`, "O limite de e elevado a h menos um, dividido por h, é um quando h tende a zero.",
        "h ≠ 0. Usamos continuidade e a relação inversa entre exp e ln, além do limite logarítmico já estabelecido.",
        m`Faça \(t=e^h-1\), então \(t\to0\) e \(h=\ln(1+t)\). O quociente vira \(t/\ln(1+t)\), recíproco de uma expressão que tende a 1. Logo também tende a 1.`),
      rule("limites-base-geral", "Escalas e outras bases", m`\lim_{x\to0}\frac{a^x-1}{x}=\ln a,\qquad\lim_{x\to0}\frac{\ln(1+kx)}x=k`, "Na primeira expressão o limite é logaritmo natural da base a; na segunda, é k.",
        "a > 0, k real; 1+kx > 0 na aproximação. Se ln a ou k for zero, a expressão correspondente é identicamente zero para x ≠ 0.",
        m`Escreva \(a^x=e^{x\ln a}\). Para a≠1, multiplique o quociente fundamental por \(\ln a\). Analogamente, faça t=kx no logaritmo. Exemplo: \(\lim_{x\to0}(e^{3x}-1)/(2x)=3/2\).`),
    ],
    guided: [
      guided(m`Calcule \(\lim_{x\to0}(e^{4x}-1)/x\).`, m`Escreva \(4(e^{4x}-1)/(4x)\); o quociente tende a 1.`, "4", "O fator interno precisa aparecer no denominador."),
      guided(m`Calcule \(\lim_{x\to0}\ln(1-2x)/x\).`, m`Com t=−2x, a expressão é \(-2\ln(1+t)/t\), que tende a −2. O domínio exige x<1/2.`, "-2", "Trocar o sinal interno não elimina um dos lados perto de zero."),
    ],
    exerciseIds: ["cur-lim-1", "cur-lim-2", "cur-lim-3"],
    summary: ["Os quocientes fundamentais tendem a 1; fatores internos e base geral alteram o resultado."],
  },
  "calculo-1/limites/classificacao-indeterminacoes": {
    duration: "22 min",
    explanation: [m`As sete formas usuais são \(0/0\), \(\infty/\infty\), \(0\cdot\infty\), \(\infty-\infty\), \(1^\infty\), \(0^0\) e \(\infty^0\). Elas descrevem tendências de partes de uma expressão e não fornecem seu limite. A notação 0⁰ aqui não atribui um valor aritmético universal a zero elevado a zero.`,
      m`Para uma potência variável \(y=f(x)^{g(x)}\), confirme \(f(x)>0\) nos pontos próximos considerados. Então \(y=e^{g(x)\ln f(x)}\). Estude o produto no expoente: se tende a L real, y tende a eᴸ; se tende a +∞, y tende a +∞; se tende a −∞, y tende a 0.`,
      "Os exemplos exponenciais usam o limite fundamental do logaritmo e as propriedades de exp e ln. Se essas ferramentas ainda não estiverem firmes, siga o pré-requisito desta aula antes de resolver as potências."],
    prereqs: [{ label: "Limites exponenciais e logarítmicos", href: "/calculo-1/limites/limites-exponenciais-logaritmicos" }],
    formula: "Sete formas indeterminadas: 0/0, infinito/infinito, zero vezes infinito, infinito menos infinito, 1 elevado a infinito, 0 elevado a 0 e infinito elevado a 0",
    formulaLatex: m`\frac00,\quad\frac\infty\infty,\quad0\cdot\infty,\quad\infty-\infty,\quad1^\infty,\quad0^0,\quad\infty^0`,
    example: m`Compare x/x, x²/x e x/x² quando x→0 pela direita. As três substituições têm forma 0/0.`,
    steps: [
      { title: "Reconhecer a mesma forma", detail: "Nas três expressões, numerador e denominador tendem a zero. Isso ainda não determina os limites." },
      { title: "Primeiro quociente", detail: "x/x=1 para x≠0; o limite é 1." },
      { title: "Segundo quociente", detail: "x²/x=x para x≠0; o limite é 0." },
      { title: "Terceiro quociente", detail: "x/x²=1/x para x≠0; pela direita de zero, o limite é +∞. A mesma forma 0/0 levou a três resultados distintos." },
    ],
    rules: [
      rule("potencia-um-infinito", "Forma 1 elevado a infinito", m`(1+x)^{1/x}=e^{\ln(1+x)/x}\longrightarrow e\quad(x\to0^+)`, "Um mais x elevado a um sobre x tende a e pela direita de zero.",
        "x > 0; base positiva. O expoente tende a +∞ e a base tende a 1.", m`O expoente após tomar logaritmo tende a 1. Já \((1+x)^{2/x}\to e^2\). A mesma forma 1 elevado a infinito deu limites diferentes.`),
      rule("potencia-zero-zero", "Forma zero elevado a zero", m`x^{c/\ln x}=e^c\quad(0<x<1)`, "x elevado a c dividido por logaritmo natural de x é e elevado a c.",
        "c é uma constante real e x→0 pela direita. ln x→−∞, então c/ln x→0. x não é zero nem um.", m`O logaritmo da potência é \((c/\ln x)\ln x=c\). Com c=−1, a base tende a zero, o expoente tende a zero pelo lado positivo e o limite é e⁻¹. Com c=−2, o limite é e⁻²: a forma não decide.`),
      rule("potencia-infinito-zero", "Forma infinito elevado a zero", m`x^{c/\ln x}=e^c\quad(x>1)`, "x elevado a c sobre logaritmo natural de x é e elevado a c também para x maior que um.",
        "c constante real e x→+∞; base positiva e c/ln x→0.", m`Com c=1, \(x^{1/\ln x}=e\); com c=2, \(x^{2/\ln x}=e^2\). São duas potências com forma infinito elevado a zero e resultados diferentes.`),
    ],
    guided: [
      guided(m`Calcule \(\lim_{x\to0^+}(1+3x)^{1/x}\).`, m`O logaritmo é \(3\ln(1+3x)/(3x)\to3\); pela exponencial, o limite é e³.`, m`\(e^3\)`, "A forma 1 elevado a infinito pede investigar o expoente transformado."),
      guided(m`É permitido tomar \(\ln f(x)\) se a base f(x) for negativa?`, "Não nos reais. É preciso analisar o domínio e a potência por outra estratégia; esta transformação exige base positiva.", "Não nos reais", "Uma técnica tem condições de aplicação.", "compreensao"),
    ],
    exerciseIds: ["cur-ind-1", "cur-ind-2", "cur-ind-3"],
    summary: ["Potências indeterminadas de base positiva viram produtos ao tomar logaritmo; depois é necessário voltar pela exponencial."],
  },
  "calculo-1/derivadas/derivadas-exponenciais-logaritmicas": {
    duration: "20 min",
    rules: [rule("derivada-log-base", "Derivada do logaritmo em qualquer base válida", m`\frac{d}{dx}\log_a u(x)=\frac{u'(x)}{u(x)\ln a}`, "A derivada do logaritmo de u na base a é a derivada de u dividida por u vezes logaritmo natural de a.",
      "a é constante, a > 0, a ≠ 1; u é diferenciável e u(x) > 0. Para a exponencial aˣ basta a > 0; a=1 dá derivada zero.",
      m`Pela mudança de base, \(\log_a u=\ln u/\ln a\). O denominador é uma constante não nula, então aplicamos a cadeia: \(u'/(u\ln a)\). Exemplo: \((\log_2(3x-1))'=3/((3x-1)\ln2)\), para x>1/3. Se 0<a<1, ln a é negativo; o sinal não pode ser descartado.`)],
    guided: [guided(m`Derive \(\log_{10}(x^2+4)\).`, m`O argumento é sempre positivo. Pela cadeia e mudança de base, \(2x/((x^2+4)\ln10)\).`, m`\(\frac{2x}{(x^2+4)\ln10}\)`, "Base dez não tem a mesma derivada que o logaritmo natural.")],
    exerciseIds: ["cur-log-1", "cur-log-2", "cur-log-3"],
    summary: ["O logaritmo em base a exige o fator ln a no denominador, base válida e argumento positivo."],
  },
  "calculo-1/integrais/substituicao": {
    duration: "22 min",
    explanation: [m`Escolha \(u=g(x)\) quando o integrando contém \(f(g(x))g'(x)\). Na integral indefinida, integre em u e volte para x, incluindo a constante C. Na definida, você pode transformar também os extremos e terminar em u, ou voltar à variável original antes de avaliar.`,
      "Uma hipótese suficiente para a fórmula definida é g continuamente diferenciável em [a,b] e f contínua em um intervalo que contenha g([a,b]). A identidade vem da cadeia e do TFC; não exige que g seja crescente. Os extremos transformados mantêm a orientação."],
    rules: [rule("substituicao-definida", "Troque os extremos junto com a variável", m`\int_a^b f(g(x))g'(x)\,dx=\int_{g(a)}^{g(b)}f(u)\,du`, "A integral de a até b de f de g vezes a derivada de g vira a integral de g de a até g de b de f de u.",
      "Use as hipóteses de continuidade e diferenciabilidade acima. Depois da troca, integrando, diferencial e extremos precisam estar na mesma variável.",
      m`Calcule \(\int_0^1 2x(x^2+1)^3\,dx\). Faça u=x²+1 e du=2x dx; x=0 vira u=1, x=1 vira u=2. Logo \(\int_1^2 u^3du=[u^4/4]_1^2=(16-1)/4=15/4\). Outra solução: volte a \((x^2+1)^4/4\) e avalie em x=0 e x=1. As duas rotas concordam.`)],
    guided: [
      guided(m`Calcule \(\int_0^2 2x/(x^2+1)\,dx\), transformando os extremos.`, m`u=x²+1, du=2x dx; extremos 1 e 5. \(\int_1^5 du/u=[\ln u]_1^5=\ln5\).`, m`\(\ln5\)`, "O argumento u permanece positivo."),
      guided(m`Use u=1−x em \(\int_0^1(1-x)^2dx\).`, m`du=−dx; extremos 1 e 0. \(-\int_1^0u^2du=\int_0^1u^2du=1/3\).`, "1/3", "A ordem invertida dos extremos e o sinal do diferencial se compensam."),
    ],
    exerciseIds: ["cur-sub-1", "cur-sub-2", "cur-sub-3"],
    summary: ["Na definida, transforme os extremos ou volte a x antes de avaliá-los. Nunca misture as duas variáveis."],
  },
  "calculo-1/integrais/area-entre-curvas": {
    duration: "20 min",
    exampleTitle: "As curvas trocam de posição dentro do intervalo",
    example: m`Calcule a área geométrica entre y=x e y=x², limitada também por x=0 e x=2. O cruzamento em x=1 fica no interior do intervalo.`,
    steps: [
      { title: "Encontrar as interseções", detail: m`x=x² dá x(x−1)=0: x=0 e x=1. Use o cruzamento interior x=1 para dividir [0,2].` },
      { title: "Comparar as alturas", detail: m`Em (0,1), x>x². Em (1,2), x²>x. Assim, \(A=\int_0^1(x-x^2)dx+\int_1^2(x^2-x)dx\).` },
      { title: "Calcular a primeira região", detail: m`\([x^2/2-x^3/3]_0^1=1/2-1/3=1/6\).` },
      { title: "Calcular a segunda região", detail: m`\([x^3/3-x^2/2]_1^2=(8/3-2)-(1/3-1/2)=5/6\).` },
      { title: "Somar áreas positivas", detail: m`A=1/6+5/6=1 unidade de área. Sem dividir, \(\int_0^2(x-x^2)dx=-2/3\); nem o módulo desse resultado, 2/3, recupera a área 1.` },
    ],
    rules: [rule("area-cruzamento", "Módulo no integrando, não só no resultado", m`A=\int_a^b|f(x)-g(x)|\,dx`, "A área entre duas curvas é a integral do módulo da diferença das alturas.",
      "Para funções contínuas em [a,b], a distância vertical é integrável e não negativa. Divida nos pontos onde a ordem das curvas muda.", "Uma interseção que apenas toca sem trocar a ordem não exige inverter a subtração. Verifique o sinal em cada trecho; não basta listar raízes.")],
    guided: [guided(m`Área entre y=x e y=0, de −1 a 1? Compare com a integral de x.`, m`\(\int_{-1}^0(-x)dx+\int_0^1x\,dx=1/2+1/2=1\). A integral de x nesse intervalo é 0 por cancelamento.`, "1", "Acúmulo com sinal e área geométrica respondem a perguntas diferentes.")],
    exerciseIds: ["cur-area-1", "cur-area-2"],
    summary: ["Com cruzamento interno, calcule cada região com altura não negativa antes de somar."],
  },
  "calculo-1/integrais/somas-de-riemann": {
    explanation: [m`Para uma função contínua em [a,b], divida o intervalo em n partes iguais de largura \(\Delta x=(b-a)/n\). Em cada parte, escolha um ponto \(x_i^*\) e some altura vezes largura. Quando n cresce sem limite, as larguras tendem a zero e as somas convergem à integral definida, independentemente dos pontos escolhidos.`,
      "Continuidade é uma condição suficiente, não necessária, para integrabilidade de Riemann. Para partições desiguais, cada retângulo usa sua própria largura, e a maior largura precisa tender a zero. Apenas aumentar a quantidade de partes, mantendo uma parte larga, não garante refinamento adequado."],
    exerciseIds: ["cur-rie-1", "cur-rie-2"],
    summary: ["No refinamento, a maior largura precisa tender a zero; continuidade garante convergência das somas."],
  },
};

export const derivadaInversaSpec: Spec = {
  track: "calculo-1", moduleSlug: "derivadas", moduleTitle: "Derivadas com sentido", lessonNumber: 18,
  slug: "derivada-da-inversa", title: "Derivada da função inversa", duration: "20 min",
  notes: ["entrada e saída", "derivada não nula"],
  prereqs: [{ label: "Funções inversas", href: "/pre-calculo/funcoes/funcoes-inversas" }, { label: "Regra da cadeia", href: "/calculo-1/derivadas/derivada-composta" }],
  usedIn: [{ label: "Derivadas logarítmicas", href: "/calculo-1/derivadas/derivadas-exponenciais-logaritmicas", detail: "relacionar a taxa da exponencial com a de sua inversa" }],
  why: ["Às vezes conseguimos achar uma entrada e sua taxa sem obter uma fórmula explícita para a inversa. O teorema permite calcular a sensibilidade da operação inversa nesse ponto."],
  explanation: [m`Seja f continuamente diferenciável e estritamente monótona em um intervalo aberto I. Ponha J=f(I) e g=f⁻¹:J→I. Para x₀ em I, y₀=f(x₀) e f′(x₀)≠0, a inversa é diferenciável em y₀ e \(g'(y_0)=1/f'(x_0)\). Essas são hipóteses suficientes; não precisamos afirmar que qualquer inversa é diferenciável.`,
    m`Os pontos mudam de papel: primeiro ache x₀=g(y₀), depois avalie f′ em x₀. A expressão \(1/f'(y_0)\) geralmente usa a entrada errada. Inversa f⁻¹ também não significa a função recíproca 1/f.`,
    m`Por que a fórmula faz sentido? Com y=f(x) e y₀=f(x₀), o quociente \((g(y)-g(y_0))/(y-y_0)\) é o recíproco de \((f(x)-f(x_0))/(x-x_0)\). A continuidade da inversa garante x→x₀ quando y→y₀; o denominador tende a f′(x₀)≠0. Isso demonstra a derivada. Pela cadeia, podemos conferir: \(f'(g(y))g'(y)=1\).`],
  callout: "Inverta a taxa no ponto correspondente. Confira a existência da inversa e a derivada não nula antes de dividir.",
  formula: "g'(y₀)=1/f'(x₀), onde y₀=f(x₀) e f'(x₀)≠0",
  formulaLatex: m`(f^{-1})'(y_0)=\frac1{f'(x_0)},\qquad y_0=f(x_0),\quad f'(x_0)\ne0`,
  appearances: [{ label: "Calibração", detail: "converter a taxa de um sensor na taxa da grandeza recuperada" }, { label: "Logaritmos", detail: "ln desfaz a exponencial e inverte sua taxa no ponto correspondente" }],
  exampleTitle: "Derivar sem isolar a inversa",
  example: m`Se f(x)=x³+x e g=f⁻¹, calcule g′(2).`,
  steps: [
    { title: "Conferir as hipóteses", detail: m`f′(x)=3x²+1>0, então f é estritamente crescente. É contínua, vai de −∞ a +∞ e é bijetiva de R para R.` },
    { title: "Recuperar a entrada", detail: m`f(1)=2, logo g(2)=1. Não é preciso resolver a cúbica para todo y.` },
    { title: "Avaliar e inverter a taxa", detail: m`f′(1)=4; portanto g′(2)=1/4.` },
    { title: "Interpretar", detail: m`Perto da saída 2, uma pequena variação Δy produz variação aproximada Δx=Δy/4 na entrada recuperada.` },
  ],
  interpretation: ["O recíproco é da derivada no ponto correspondente, não da função nem da derivada em qualquer ponto."],
  errors: ["Calcular 1/f′(2) sem procurar g(2).", "Tratar derivada zero como se permitisse dividir por zero.", "Confundir f⁻¹ com 1/f."],
  rules: [rule("inversa-derivada-zero", "Uma inversa pode ter tangente vertical", m`f(x)=x^3,\qquad g(y)=\sqrt[3]y`, "A função cubo tem inversa raiz cúbica, mas a inversa não tem derivada real finita em zero.", "Em zero, f′(0)=0: o teorema da derivada da inversa não se aplica.", m`O quociente da inversa em zero é \(\sqrt[3]h/h=1/|h|^{2/3}\), que cresce sem limite. A inversa existe, mas não há derivada finita ali.`)],
  guided: [
    guided(m`Para f(x)=5x−2, calcule (f⁻¹)′(8).`, "f(2)=8 e f′(2)=5, logo a taxa inversa é 1/5.", "1/5", "Uma taxa constante gera outra taxa constante."),
    guided(m`Para f(x)=x² em (0,+∞), calcule (f⁻¹)′(9).`, "A entrada correspondente é 3; f′(3)=6, então a derivada da inversa é 1/6.", "1/6", "A restrição do domínio seleciona a raiz positiva."),
    guided(m`A inversa de x³ tem derivada finita em zero?`, "Não. A função original é bijetiva, mas sua derivada em zero é zero; o quociente da inversa tende a +∞.", "Não", "Existência da inversa não implica derivabilidade em todo ponto.", "interpretacao"),
  ],
  exerciseIds: ["cur-dinv-1", "cur-dinv-2", "cur-dinv-3"],
  summary: ["Encontre a entrada que produz a saída pedida.", "Verifique a derivada não nula e tome seu recíproco.", "Uma inversa pode existir sem ter derivada finita em um ponto."],
  quiz: [
    { pergunta: "Se f(3)=10 e f′(3)=2, com as hipóteses do teorema válidas, quanto vale (f⁻¹)′(10)?", opcoes: ["1/2", "1/10", "2"], corretaIndex: 0, explicacao: "A saída 10 corresponde à entrada 3; inverta f′(3).", reforcoSectionId: "passos" },
    { pergunta: "Se f′(x₀)=0, podemos aplicar diretamente a fórmula 1/f′(x₀)?", opcoes: ["Sim, a derivada inversa é zero", "Não, é preciso analisar a inversa por outra via", "Sim, toda inversa é diferenciável"], corretaIndex: 1, critical: true, explicacao: "A divisão exige derivada não nula; a inversa do cubo em zero mostra o problema.", reforcoSectionId: "regra-inversa-derivada-zero", reforcoLabel: "Derivada zero e tangente vertical" },
    { pergunta: "Qual função é a inversa de f(x)=2x, de R para R?", opcoes: ["1/(2x)", "2/x", "x/2"], corretaIndex: 2, explicacao: "Dividir a saída por dois recupera a entrada; o recíproco não faz isso.", reforcoSectionId: "explicacao" },
  ],
};
