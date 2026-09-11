export type CheckpointQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reviewHref: string;
  /** Must be correct before declaring readiness; navigation remains open. */
  critical?: boolean;
};

export type ModuleCheckpointData = {
  title: string;
  description: string;
  passPercent: number;
  questions: CheckpointQuestion[];
};

export const moduleCheckpoints: Record<string, ModuleCheckpointData> = {
  "pre-calculo/fundamentos": {
    title: "Checkpoint · Base numérica",
    description: "Mistura operações, frações, potências e equações antes da Álgebra.",
    passPercent: 80,
    questions: [
      { prompt: "Quanto vale \\(3+2\\cdot5\\)?", options: ["25", "13", "17", "10"], correctIndex: 1, explanation: "A multiplicação vem antes da soma: \\(3+10=13\\).", reviewHref: "/pre-calculo/fundamentos/operacoes-basicas" },
      { prompt: "Qual fração é equivalente a \\(\\frac{3}{4}\\)?", options: ["\\(\\frac{6}{8}\\)", "\\(\\frac{4}{5}\\)", "\\(\\frac{9}{16}\\)", "\\(\\frac{12}{20}\\)"], correctIndex: 0, explanation: "Multiplicar numerador e denominador por 2 preserva o valor.", reviewHref: "/pre-calculo/fundamentos/fracoes" },
      { prompt: "Quanto vale \\(2^3\\cdot2^2\\)?", options: ["16", "32", "64", "10"], correctIndex: 1, explanation: "Mesma base: somamos os expoentes, \\(2^5=32\\).", reviewHref: "/pre-calculo/fundamentos/potenciacao" },
      { prompt: "Resolva \\(3x-6=9\\).", options: ["1", "3", "5", "9"], correctIndex: 2, explanation: "Somando 6 e dividindo por 3, obtemos \\(x=5\\).", reviewHref: "/pre-calculo/fundamentos/equacao-primeiro-grau" },
      { prompt: "Qual é a fatoração de \\(x^2-9\\)?", options: ["\\((x-3)^2\\)", "\\((x-3)(x+3)\\)", "\\(x(x-9)\\)", "\\((x-9)(x+1)\\)"], correctIndex: 1, explanation: "É uma diferença de quadrados.", reviewHref: "/pre-calculo/fundamentos/fatoracao" },
    ],
  },
  "pre-calculo/algebra": {
    title: "Checkpoint · Fluência algébrica",
    description: "Verifica equivalência, fatoração, inequações e restrições.",
    passPercent: 75,
    questions: [
      { prompt: "Simplifique \\(3x+2x-4\\).", options: ["\\(5x-4\\)", "\\(5x+4\\)", "\\(6x-4\\)", "\\(x-4\\)"], correctIndex: 0, explanation: "Somamos apenas os termos semelhantes.", reviewHref: "/pre-calculo/algebra/expressoes-algebricas" },
      { prompt: "Ao dividir uma inequação por \\(-2\\), o sinal...", options: ["permanece", "inverte", "vira igualdade", "desaparece"], correctIndex: 1, explanation: "Multiplicar ou dividir por número negativo inverte a ordem.", reviewHref: "/pre-calculo/algebra/inequacoes" },
      { prompt: "Em \\(\\frac{x^2-4}{x-2}\\), qual restrição permanece?", options: ["\\(x\\neq-2\\)", "\\(x\\neq0\\)", "\\(x\\neq2\\)", "nenhuma"], correctIndex: 2, explanation: "O fator pode cancelar na expressão, mas \\(x=2\\) continua fora do domínio original.", reviewHref: "/pre-calculo/algebra/fracoes-algebricas" },
      { prompt: "Qual técnica resolve \\(x^2+5x+6\\)?", options: ["diferença de quadrados", "fator comum", "trinômio", "racionalização"], correctIndex: 2, explanation: "Buscamos dois números de produto 6 e soma 5.", reviewHref: "/pre-calculo/fundamentos/fatoracao" },
    ],
  },
  "pre-calculo/funcoes": {
    title: "Checkpoint · Linguagem de funções",
    description: "Mistura domínio, composição, funções por partes e famílias.",
    passPercent: 75,
    questions: [
      { prompt: "Se \\(f(x)=2x+1\\), então \\(f(3)=\\)...", options: ["5", "6", "7", "9"], correctIndex: 2, explanation: "Substituímos \\(x\\) por 3: \\(2(3)+1=7\\).", reviewHref: "/pre-calculo/funcoes/o-que-e-funcao" },
      { prompt: "Se \\(f(x)=x+1\\) e \\(g(x)=x^2\\), \\(f(g(2))\\) vale...", options: ["5", "6", "9", "16"], correctIndex: 0, explanation: "Primeiro \\(g(2)=4\\); depois \\(f(4)=5\\).", reviewHref: "/pre-calculo/funcoes/composicao-funcoes" },
      { prompt: "O domínio de \\(1/(x-4)\\) exclui...", options: ["0", "1", "-4", "4"], correctIndex: 3, explanation: "O denominador zera em \\(x=4\\).", reviewHref: "/pre-calculo/funcoes/dominio-imagem" },
      { prompt: "Uma função inversa troca...", options: ["soma por produto", "entrada por saída", "reta por parábola", "domínio por zero"], correctIndex: 1, explanation: "A inversa desfaz a função, trocando os papéis de entrada e saída.", reviewHref: "/pre-calculo/funcoes/funcoes-inversas" },
    ],
  },
  "pre-calculo/trigonometria": {
    title: "Checkpoint · Trigonometria pronta para Cálculo",
    description: "Verifica razões, radianos, quadrantes e identidade fundamental.",
    passPercent: 75,
    questions: [
      { prompt: "No triângulo retângulo, \\(\\sin\\theta\\) é...", options: ["\\(\\frac{\\text{adjacente}}{\\text{hipotenusa}}\\)", "\\(\\frac{\\text{oposto}}{\\text{hipotenusa}}\\)", "\\(\\frac{\\text{oposto}}{\\text{adjacente}}\\)", "\\(\\frac{\\text{hipotenusa}}{\\text{oposto}}\\)"], correctIndex: 1, explanation: "Seno relaciona cateto oposto e hipotenusa.", reviewHref: "/pre-calculo/trigonometria/seno" },
      { prompt: "\\(180^\\circ\\) correspondem a...", options: ["\\(\\frac{\\pi}{2}\\)", "\\(\\pi\\)", "\\(2\\pi\\)", "\\(1\\ \\text{rad}\\)"], correctIndex: 1, explanation: "Uma meia-volta mede \\(\\pi\\) radianos.", reviewHref: "/pre-calculo/trigonometria/graus-e-radianos" },
      { prompt: "No segundo quadrante, o cosseno é...", options: ["positivo", "negativo", "zero sempre", "indefinido"], correctIndex: 1, explanation: "A coordenada \\(x\\) é negativa no segundo quadrante.", reviewHref: "/pre-calculo/trigonometria/ciclo-trigonometrico" },
      { prompt: "Complete: \\(\\sin^2x+\\cos^2x=\\)...", options: ["0", "1", "\\(\\tan x\\)", "\\(\\sec x\\)"], correctIndex: 1, explanation: "É a identidade fundamental da trigonometria.", reviewHref: "/pre-calculo/trigonometria/identidades-basicas" },
    ],
  },
  "pre-calculo/preparacao-limites": {
    title: "Checkpoint · Prontidão para Limites",
    description: "O ponto de passagem: gráficos, fatoração, cancelamento e racionalização.",
    passPercent: 80,
    questions: [
      { prompt: "Em um limite \\(0/0\\), a primeira atitude é...", options: ["concluir zero", "concluir infinito", "procurar uma transformação algébrica", "cancelar parcelas"], correctIndex: 2, explanation: "\\(0/0\\) é indeterminação; fatorar ou racionalizar pode revelar o comportamento.", reviewHref: "/pre-calculo/preparacao-limites/fatoracao-em-limites" },
      { prompt: "Pode cancelar o \\(x\\) em \\((x+2)/x\\)?", options: ["sim, sempre", "não, pois não é fator do numerador inteiro", "só se \\(x=0\\)", "só em limites"], correctIndex: 1, critical: true, explanation: "Cancelamento vale para fatores, não para parcelas de uma soma.", reviewHref: "/pre-calculo/preparacao-limites/cancelamento-com-restricao" },
      { prompt: "O conjugado de \\(\\sqrt{x}-2\\) é...", options: ["\\(\\sqrt{x}-2\\)", "\\(\\sqrt{x}+2\\)", "\\(x+4\\)", "\\(2-\\sqrt{x}\\)"], correctIndex: 1, explanation: "O conjugado troca o sinal entre os termos.", reviewHref: "/pre-calculo/preparacao-limites/racionalizacao" },
      { prompt: "Se limites laterais são diferentes, o limite bilateral...", options: ["é a média", "é zero", "não existe", "é o maior"], correctIndex: 2, explanation: "O limite bilateral exige a mesma aproximação pelos dois lados.", reviewHref: "/pre-calculo/preparacao-limites/valores-proximos" },
      { prompt: "Em \\((x^2-1)/(x-1)\\), para \\(x\\neq1\\), a forma simplificada é...", options: ["\\(x-1\\)", "\\(x+1\\)", "\\(x^2+1\\)", "1"], correctIndex: 1, explanation: "Fatoramos \\(x^2-1=(x-1)(x+1)\\).", reviewHref: "/pre-calculo/preparacao-limites/fatoracao-em-limites" },
    ],
  },
  "calculo-1/funcoes-para-calculo": {
    title: "Checkpoint · Ponte para Cálculo",
    description: "Confere as funções e a álgebra usadas nas primeiras provas.",
    passPercent: 80,
    questions: [
      { prompt: "Em \\(f(g(x))\\), qual função é aplicada primeiro?", options: ["\\(f\\)", "\\(g\\)", "as duas juntas", "nenhuma"], correctIndex: 1, explanation: "A função interna \\(g\\) age primeiro.", reviewHref: "/calculo-1/funcoes-para-calculo/composicao-e-inversa" },
      { prompt: "Uma função racional é quociente de...", options: ["raízes", "logaritmos", "polinômios", "senos"], correctIndex: 2, explanation: "Ela tem a forma \\(p(x)/q(x)\\), com \\(q(x)\\neq0\\).", reviewHref: "/calculo-1/funcoes-para-calculo/polinomiais-e-racionais" },
      { prompt: "O quociente \\([f(x+h)-f(x)]/h\\) mede...", options: ["área", "taxa média", "domínio", "intercepto"], correctIndex: 1, explanation: "É a taxa média em um intervalo de largura \\(h\\).", reviewHref: "/calculo-1/funcoes-para-calculo/quociente-de-diferencas" },
      { prompt: "Para cancelar \\(x-2\\), ele deve aparecer como...", options: ["parcela", "expoente", "fator", "denominador apenas"], correctIndex: 2, explanation: "Só fatores comuns podem ser cancelados.", reviewHref: "/calculo-1/funcoes-para-calculo/oficina-algebrica-limites" },
    ],
  },
  "calculo-1/limites": {
    title: "Checkpoint · Caixa de ferramentas de Limites",
    description: "Mistura propriedades, técnicas, laterais e interpretação.",
    passPercent: 80,
    questions: [
      { prompt: "Se \\(\\lim f=2\\) e \\(\\lim g=3\\), então \\(\\lim(fg)=\\)...", options: ["5", "6", "\\(\\frac{2}{3}\\)", "não existe"], correctIndex: 1, explanation: "Pela propriedade do produto, multiplicamos os limites.", reviewHref: "/calculo-1/limites/propriedades-dos-limites" },
      { prompt: "Qual técnica é natural quando há diferença de raízes?", options: ["fator comum", "conjugado", "regra do produto", "Bhaskara"], correctIndex: 1, explanation: "Multiplicar pelo conjugado elimina a diferença de radicais.", reviewHref: "/calculo-1/limites/racionalizacao-em-limites" },
      { prompt: "O Teorema do Confronto exige...", options: ["duas funções que cercam outra e têm o mesmo limite", "derivadas iguais", "domínios iguais", "funções lineares"], correctIndex: 0, explanation: "A função espremida herda o limite comum das duas barreiras.", reviewHref: "/calculo-1/limites/teorema-do-confronto" },
      { prompt: "\\(\\lim_{x\\to0}\\frac{\\sin x}{x}\\), em radianos, vale...", options: ["0", "1", "\\(\\infty\\)", "\\(-1\\)"], correctIndex: 1, explanation: "É o limite trigonométrico fundamental.", reviewHref: "/calculo-1/limites/limite-trigonometrico-fundamental" },
      { prompt: "Se esquerda e direita dão 4, mas \\(f(a)\\) não existe, o limite...", options: ["não existe", "vale 4", "vale 0", "é infinito"], correctIndex: 1, explanation: "Limite depende da aproximação, não do valor no ponto.", reviewHref: "/calculo-1/limites/limites-laterais" },
    ],
  },
  "calculo-1/derivadas": {
    title: "Checkpoint · Regras de Derivação",
    description: "Escolha a regra e interprete a derivada, em vez de decorar isoladamente.",
    passPercent: 80,
    questions: [
      { prompt: "A derivada de \\(x^5\\) é...", options: ["\\(x^4\\)", "\\(5x^4\\)", "\\(5x\\)", "\\(x^5\\)"], correctIndex: 1, explanation: "Pela regra da potência, o expoente desce e diminui uma unidade.", reviewHref: "/calculo-1/derivadas/derivada-potencia" },
      { prompt: "A derivada de \\(\\sin x\\) é...", options: ["\\(-\\sin x\\)", "\\(\\cos x\\)", "\\(\\tan x\\)", "1"], correctIndex: 1, explanation: "Em radianos, \\((\\sin x)'=\\cos x\\).", reviewHref: "/calculo-1/derivadas/derivadas-trigonometricas" },
      { prompt: "Para \\(e^{3x}\\), qual regra aparece além da exponencial?", options: ["produto", "quociente", "cadeia", "nenhuma"], correctIndex: 2, explanation: "A função externa é exponencial e a interna é \\(3x\\).", reviewHref: "/calculo-1/derivadas/derivada-composta" },
      { prompt: "Em uma equação \\(x^2+y^2=25\\), derivamos \\(y\\) usando...", options: ["\\(y'=0\\)", "cadeia", "só potência", "integral"], correctIndex: 1, explanation: "Como \\(y\\) depende de \\(x\\), \\((y^2)'=2yy'\\).", reviewHref: "/calculo-1/derivadas/derivacao-implicita" },
      { prompt: "Se posição é \\(s(t)\\), aceleração é...", options: ["\\(s\\)", "\\(s'\\)", "\\(s''\\)", "\\(\\frac{1}{s}\\)"], correctIndex: 2, explanation: "Velocidade é a primeira derivada; aceleração, a segunda.", reviewHref: "/calculo-1/derivadas/derivadas-ordem-superior" },
    ],
  },
  "calculo-1/aplicacoes-derivadas": {
    title: "Checkpoint · Decisões com Derivadas",
    description: "Combina sinal, extremos, modelagem, TVM e aproximação.",
    passPercent: 75,
    questions: [
      { prompt: "Se \\(f'(x)>0\\) em um intervalo, \\(f\\) é...", options: ["decrescente", "crescente", "constante", "descontínua"], correctIndex: 1, explanation: "Derivada positiva indica crescimento local.", reviewHref: "/calculo-1/aplicacoes-derivadas/crescimento-decrescimento-deriv" },
      { prompt: "Num intervalo fechado, extremos absolutos exigem testar...", options: ["só \\(f'=0\\)", "só as bordas", "pontos críticos e bordas", "só \\(f''\\)"], correctIndex: 2, explanation: "Comparamos todos os candidatos internos e as bordas.", reviewHref: "/calculo-1/aplicacoes-derivadas/extremos-intervalo-fechado" },
      { prompt: "O TVM compara uma derivada instantânea com...", options: ["área", "taxa média no intervalo", "valor inicial", "segunda derivada"], correctIndex: 1, explanation: "Existe um ponto onde a taxa instantânea iguala a taxa média.", reviewHref: "/calculo-1/aplicacoes-derivadas/rolle-e-valor-medio" },
      { prompt: "A aproximação linear perto de \\(a\\) usa...", options: ["\\(f(a)+f'(a)(x-a)\\)", "\\(f(a)\\,x\\)", "\\(f'(x)^2\\)", "\\(\\int f\\)"], correctIndex: 0, explanation: "A reta tangente aproxima a função localmente.", reviewHref: "/calculo-1/aplicacoes-derivadas/aproximacao-linear" },
    ],
  },
  "calculo-1/integrais": {
    title: "Checkpoint · Acúmulo e Integração",
    description: "Integra área, antiderivada, substituição e interpretação física.",
    passPercent: 75,
    questions: [
      { prompt: "Uma soma de Riemann aproxima...", options: ["inclinação", "acúmulo por retângulos", "domínio", "raiz"], correctIndex: 1, explanation: "Somamos pequenas contribuições \\(f(x_i)\\Delta x\\).", reviewHref: "/calculo-1/integrais/somas-de-riemann" },
      { prompt: "A substituição \\(u\\) desfaz principalmente qual regra?", options: ["produto", "cadeia", "quociente", "potência"], correctIndex: 1, explanation: "Reconhecemos a função interna e sua derivada.", reviewHref: "/calculo-1/integrais/substituicao" },
      { prompt: "Área entre duas curvas é calculada por...", options: ["baixo − cima", "cima − baixo", "produto", "média dos extremos"], correctIndex: 1, explanation: "Integramos a distância vertical, separando intervalos quando a ordem troca.", reviewHref: "/calculo-1/integrais/area-entre-curvas" },
      { prompt: "O valor médio de \\(f\\) em \\([a,b]\\) contém o fator...", options: ["\\(b-a\\)", "\\(\\frac{1}{b-a}\\)", "\\(a+b\\)", "\\(\\frac{1}{2}\\)"], correctIndex: 1, explanation: "Dividimos o acúmulo total pelo comprimento do intervalo.", reviewHref: "/calculo-1/integrais/valor-medio-funcao" },
      { prompt: "Se velocidade muda de sinal, distância total usa...", options: ["\\(\\int v\\)", "\\(\\int |v|\\)", "\\(v(b)-v(a)\\)", "\\(v'\\)"], correctIndex: 1, explanation: "O módulo impede cancelamento entre trechos em sentidos opostos.", reviewHref: "/calculo-1/integrais/distancia-total" },
    ],
  },

  // Os quatro módulos que ainda não tinham checkpoint. Cada pergunta cobra o
  // que a aula de revisão indicada ensina — inclusive em Antes do Cálculo, que
  // é um módulo de orientação: ali o checkpoint confere a base e o mapa.
  "pre-calculo/graficos": {
    title: "Checkpoint · Leitura de gráficos",
    description: "Mistura coordenadas, crescimento, interseções e transformações.",
    passPercent: 75,
    questions: [
      { prompt: "O ponto \\((2, -3)\\) fica...", options: ["2 à direita e 3 para cima", "2 à direita e 3 para baixo", "2 à esquerda e 3 para baixo", "3 à direita e 2 para baixo"], correctIndex: 1, explanation: "Primeiro o horizontal (\\(x = 2\\), para a direita), depois o vertical (\\(y = -3\\), para baixo).", reviewHref: "/pre-calculo/graficos/plano-cartesiano" },
      { prompt: "Lendo da esquerda para a direita, um trecho em que o gráfico desce é...", options: ["crescente", "decrescente", "constante", "descontínuo"], correctIndex: 1, explanation: "Quando \\(x\\) aumenta e \\(f(x)\\) diminui, a função decresce naquele trecho.", reviewHref: "/pre-calculo/graficos/crescimento-decrescimento" },
      { prompt: "Duas retas de custo por GB se cruzam em \\((20, 70)\\). O cruzamento indica que...", options: ["com 20 GB os dois planos custam 70", "o plano mais barato custa 20", "os planos custam 20 e 70", "acima de 70 GB os planos se igualam"], correctIndex: 0, explanation: "No cruzamento \\(f(x) = g(x)\\): para \\(x = 20\\), os dois custos valem 70.", reviewHref: "/pre-calculo/graficos/interpretacao-visual" },
      { prompt: "Comparado ao gráfico de \\(f(x) = x^2\\), o de \\(g(x) = (x - 3)^2\\) está...", options: ["3 para a esquerda", "3 para a direita", "3 para cima", "refletido no eixo \\(x\\)"], correctIndex: 1, critical: true, explanation: "Dentro da função o deslocamento é horizontal e no sentido contrário ao sinal: \\(x - 3\\) leva o vértice para \\(x = 3\\).", reviewHref: "/pre-calculo/graficos/translacao-graficos" },
      { prompt: "O gráfico de \\(-f(x)\\) é o de \\(f(x)\\)...", options: ["refletido no eixo \\(x\\)", "refletido no eixo \\(y\\)", "deslocado para baixo", "ampliado na vertical"], correctIndex: 0, explanation: "Multiplicar a saída por \\(-1\\) troca o sinal de cada altura.", reviewHref: "/pre-calculo/graficos/reflexoes-e-escalas" },
    ],
  },
  "pre-calculo/geometria-analitica": {
    title: "Checkpoint · Geometria analítica",
    description: "Distância, ponto médio, inclinação de retas e circunferência.",
    passPercent: 75,
    questions: [
      { prompt: "A distância entre \\((1, 2)\\) e \\((4, 6)\\) é...", options: ["5", "7", "\\(\\sqrt{7}\\)", "25"], correctIndex: 0, explanation: "Pitágoras nas diferenças: \\(\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\).", reviewHref: "/pre-calculo/geometria-analitica/distancia-e-ponto-medio" },
      { prompt: "O ponto médio entre \\((2, 8)\\) e \\((6, 4)\\) é...", options: ["\\((4, 6)\\)", "\\((8, 12)\\)", "\\((2, 2)\\)", "\\((4, 2)\\)"], correctIndex: 0, explanation: "É a média de cada coordenada: \\(\\left(\\frac{2 + 6}{2}, \\frac{8 + 4}{2}\\right) = (4, 6)\\).", reviewHref: "/pre-calculo/geometria-analitica/distancia-e-ponto-medio" },
      { prompt: "Uma reta tem coeficiente angular \\(2\\). Uma reta perpendicular a ela tem coeficiente...", options: ["\\(2\\)", "\\(-2\\)", "\\(\\frac{1}{2}\\)", "\\(-\\frac{1}{2}\\)"], correctIndex: 3, critical: true, explanation: "Para retas não verticais, perpendiculares têm \\(m_1 m_2 = -1\\): \\(m_2 = -\\frac{1}{2}\\).", reviewHref: "/pre-calculo/geometria-analitica/retas-paralelas-perpendiculares" },
      { prompt: "Duas retas paralelas não verticais têm...", options: ["o mesmo coeficiente angular", "coeficientes angulares opostos", "coeficientes com produto \\(-1\\)", "o mesmo ponto de corte no eixo \\(y\\)"], correctIndex: 0, explanation: "Paralelas têm a mesma inclinação; se forem retas distintas, cortam o eixo \\(y\\) em pontos diferentes.", reviewHref: "/pre-calculo/geometria-analitica/retas-paralelas-perpendiculares" },
      { prompt: "A circunferência \\((x - 2)^2 + (y + 1)^2 = 9\\) tem...", options: ["centro \\((2, -1)\\) e raio 3", "centro \\((-2, 1)\\) e raio 3", "centro \\((2, -1)\\) e raio 9", "centro \\((2, 1)\\) e raio 3"], correctIndex: 0, explanation: "Na forma padrão os sinais do centro aparecem trocados, e o lado direito é \\(r^2\\): \\(r = 3\\).", reviewHref: "/pre-calculo/geometria-analitica/circunferencia" },
    ],
  },
  "calculo-1/antes-do-calculo": {
    title: "Checkpoint · Pronto para começar",
    description: "Confere a base mínima e o mapa da disciplina antes dos limites.",
    passPercent: 75,
    questions: [
      { prompt: "Se \\(f(x) = 3x - 1\\), quanto vale \\(f(2)\\)?", options: ["5", "6", "\\(2f\\)", "\\(-1\\)"], correctIndex: 0, critical: true, explanation: "Troque \\(x\\) por 2: \\(3 \\cdot 2 - 1 = 5\\). A notação \\(f(2)\\) não é multiplicação.", reviewHref: "/calculo-1/antes-do-calculo/pre-requisitos" },
      { prompt: "As soluções de \\(x^2 - 4 = 0\\) são...", options: ["só \\(x = 2\\)", "\\(x = 2\\) e \\(x = -2\\)", "\\(x = 4\\)", "\\(x = \\pm 4\\)"], correctIndex: 1, explanation: "\\(x^2 = 4\\) tem duas raízes, \\(2\\) e \\(-2\\).", reviewHref: "/calculo-1/antes-do-calculo/pre-requisitos" },
      { prompt: "Na trilha, a derivada é construída a partir de...", options: ["integrais", "limites", "áreas", "equações do 2º grau"], correctIndex: 1, explanation: "A derivada é o limite das taxas médias; por isso limites vêm antes.", reviewHref: "/calculo-1/antes-do-calculo/mapa-da-trilha" },
      { prompt: "Se \\(s(t)\\) é a posição de um carro, a velocidade instantânea é...", options: ["a integral de \\(s\\)", "a derivada de \\(s\\)", "o valor \\(s(0)\\)", "a média de \\(s\\)"], correctIndex: 1, explanation: "A derivada mede a taxa instantânea; a integral da velocidade recupera a distância.", reviewHref: "/calculo-1/antes-do-calculo/mapa-da-trilha" },
      { prompt: "Qual ciclo de estudo a trilha recomenda?", options: ["reler o material três vezes", "ideia → guiado → sozinho → interpretar", "decorar as fórmulas na véspera", "assistir às aulas sem resolver exercícios"], correctIndex: 1, explanation: "Fechar o material e tentar sozinho vale mais que reler; interpretar o resultado fecha o ciclo.", reviewHref: "/calculo-1/antes-do-calculo/como-estudar" },
    ],
  },
  "calculo-1/continuidade": {
    title: "Checkpoint · Continuidade",
    description: "Três condições, tipos de quebra, intervalos e o Valor Intermediário.",
    passPercent: 75,
    questions: [
      { prompt: "A condição que garante que \\(f\\) é contínua em \\(a\\) é...", options: ["\\(f(a)\\) existir", "o limite em \\(a\\) existir", "\\(\\lim_{x \\to a} f(x) = f(a)\\)", "o gráfico ser crescente"], correctIndex: 2, critical: true, explanation: "A igualdade resume as três condições: o valor existe, o limite existe e os dois coincidem. Só uma das duas primeiras não basta.", reviewHref: "/calculo-1/continuidade/continuidade-ponto" },
      { prompt: "Em \\(f(x) = \\frac{x^2 - 1}{x - 1}\\), a descontinuidade em \\(x = 1\\) é...", options: ["um salto", "um buraco (removível)", "infinita", "oscilatória"], correctIndex: 1, explanation: "O limite existe e vale 2, mas \\(f(1)\\) não está definida: redefinir \\(f(1) = 2\\) conserta.", reviewHref: "/calculo-1/continuidade/furos-saltos" },
      { prompt: "Limites laterais que existem, mas são diferentes, indicam...", options: ["um buraco", "um salto", "uma assíntota vertical", "continuidade"], correctIndex: 1, explanation: "Cada lado aponta para um valor; redefinir um único ponto não resolve.", reviewHref: "/calculo-1/continuidade/furos-saltos" },
      { prompt: "\\(|x|\\) é contínua em \\(x = 0\\)?", options: ["não, porque tem uma quina", "sim, mesmo com a quina", "não, porque não é derivável ali", "só pela direita"], correctIndex: 1, explanation: "O gráfico não se quebra em 0; a quina impede a derivada, não a continuidade. Derivável implica contínua, mas não o contrário.", reviewHref: "/calculo-1/continuidade/continuidade-intervalo" },
      { prompt: "Se \\(f\\) é contínua em \\([0, 1]\\), com \\(f(0) = -1\\) e \\(f(1) = 1\\), então...", options: ["\\(f\\) tem ao menos uma raiz em \\([0, 1]\\)", "\\(f\\) tem exatamente uma raiz", "\\(f(0{,}5) = 0\\)", "nada se pode concluir"], correctIndex: 0, explanation: "Pelo Teorema do Valor Intermediário, o valor 0 é atingido ao menos uma vez — sem garantia de unicidade nem de onde.", reviewHref: "/calculo-1/continuidade/teorema-valor-intermediario" },
    ],
  },
};

export function getModuleCheckpoint(track: string, moduleSlug: string) {
  return moduleCheckpoints[`${track}/${moduleSlug}`];
}
