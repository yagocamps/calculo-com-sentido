export type CheckpointQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reviewHref: string;
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
      { prompt: "Qual fração é equivalente a \\(3/4\\)?", options: ["6/8", "4/5", "9/16", "12/20"], correctIndex: 0, explanation: "Multiplicar numerador e denominador por 2 preserva o valor.", reviewHref: "/pre-calculo/fundamentos/fracoes" },
      { prompt: "Quanto vale \\(2^3\\cdot2^2\\)?", options: ["16", "32", "64", "10"], correctIndex: 1, explanation: "Mesma base: somamos os expoentes, \\(2^5=32\\).", reviewHref: "/pre-calculo/fundamentos/potenciacao" },
      { prompt: "Resolva \\(3x-6=9\\).", options: ["1", "3", "5", "9"], correctIndex: 2, explanation: "Somando 6 e dividindo por 3, obtemos \\(x=5\\).", reviewHref: "/pre-calculo/fundamentos/equacao-primeiro-grau" },
      { prompt: "Qual é a fatoração de \\(x^2-9\\)?", options: ["(x-3)^2", "(x-3)(x+3)", "x(x-9)", "(x-9)(x+1)"], correctIndex: 1, explanation: "É uma diferença de quadrados.", reviewHref: "/pre-calculo/fundamentos/fatoracao" },
    ],
  },
  "pre-calculo/algebra": {
    title: "Checkpoint · Fluência algébrica",
    description: "Verifica equivalência, fatoração, inequações e restrições.",
    passPercent: 75,
    questions: [
      { prompt: "Simplifique \\(3x+2x-4\\).", options: ["5x-4", "5x+4", "6x-4", "x-4"], correctIndex: 0, explanation: "Somamos apenas os termos semelhantes.", reviewHref: "/pre-calculo/algebra/expressoes-algebricas" },
      { prompt: "Ao dividir uma inequação por \\(-2\\), o sinal...", options: ["permanece", "inverte", "vira igualdade", "desaparece"], correctIndex: 1, explanation: "Multiplicar ou dividir por número negativo inverte a ordem.", reviewHref: "/pre-calculo/algebra/inequacoes" },
      { prompt: "Em \\(\\frac{x^2-4}{x-2}\\), qual restrição permanece?", options: ["x≠-2", "x≠0", "x≠2", "nenhuma"], correctIndex: 2, explanation: "O fator pode cancelar na expressão, mas \\(x=2\\) continua fora do domínio original.", reviewHref: "/pre-calculo/algebra/fracoes-algebricas" },
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
      { prompt: "No triângulo retângulo, \\(\\sin\\theta\\) é...", options: ["adjacente/hipotenusa", "oposto/hipotenusa", "oposto/adjacente", "hipotenusa/oposto"], correctIndex: 1, explanation: "Seno relaciona cateto oposto e hipotenusa.", reviewHref: "/pre-calculo/trigonometria/seno" },
      { prompt: "\\(180^\\circ\\) correspondem a...", options: ["π/2", "π", "2π", "1 rad"], correctIndex: 1, explanation: "Uma meia-volta mede \\(\\pi\\) radianos.", reviewHref: "/pre-calculo/trigonometria/graus-e-radianos" },
      { prompt: "No segundo quadrante, o cosseno é...", options: ["positivo", "negativo", "zero sempre", "indefinido"], correctIndex: 1, explanation: "A coordenada \\(x\\) é negativa no segundo quadrante.", reviewHref: "/pre-calculo/trigonometria/ciclo-trigonometrico" },
      { prompt: "Complete: \\(\\sin^2x+\\cos^2x=\\)...", options: ["0", "1", "tan x", "sec x"], correctIndex: 1, explanation: "É a identidade fundamental da trigonometria.", reviewHref: "/pre-calculo/trigonometria/identidades-basicas" },
    ],
  },
  "pre-calculo/preparacao-limites": {
    title: "Checkpoint · Prontidão para Limites",
    description: "O ponto de passagem: gráficos, fatoração, cancelamento e racionalização.",
    passPercent: 80,
    questions: [
      { prompt: "Em um limite \\(0/0\\), a primeira atitude é...", options: ["concluir zero", "concluir infinito", "procurar uma transformação algébrica", "cancelar parcelas"], correctIndex: 2, explanation: "\\(0/0\\) é indeterminação; fatorar ou racionalizar pode revelar o comportamento.", reviewHref: "/pre-calculo/preparacao-limites/fatoracao-em-limites" },
      { prompt: "Pode cancelar o \\(x\\) em \\((x+2)/x\\)?", options: ["sim, sempre", "não, pois não é fator do numerador inteiro", "só se x=0", "só em limites"], correctIndex: 1, explanation: "Cancelamento vale para fatores, não para parcelas de uma soma.", reviewHref: "/pre-calculo/preparacao-limites/cancelamento-com-restricao" },
      { prompt: "O conjugado de \\(\\sqrt{x}-2\\) é...", options: ["√x-2", "√x+2", "x+4", "2-√x"], correctIndex: 1, explanation: "O conjugado troca o sinal entre os termos.", reviewHref: "/pre-calculo/preparacao-limites/racionalizacao" },
      { prompt: "Se limites laterais são diferentes, o limite bilateral...", options: ["é a média", "é zero", "não existe", "é o maior"], correctIndex: 2, explanation: "O limite bilateral exige a mesma aproximação pelos dois lados.", reviewHref: "/pre-calculo/preparacao-limites/valores-proximos" },
      { prompt: "Em \\((x^2-1)/(x-1)\\), para \\(x\\neq1\\), a forma simplificada é...", options: ["x-1", "x+1", "x²+1", "1"], correctIndex: 1, explanation: "Fatoramos \\(x^2-1=(x-1)(x+1)\\).", reviewHref: "/pre-calculo/preparacao-limites/fatoracao-em-limites" },
    ],
  },
  "calculo-1/funcoes-para-calculo": {
    title: "Checkpoint · Ponte para Cálculo",
    description: "Confere as funções e a álgebra usadas nas primeiras provas.",
    passPercent: 80,
    questions: [
      { prompt: "Em \\(f(g(x))\\), qual função é aplicada primeiro?", options: ["f", "g", "as duas juntas", "nenhuma"], correctIndex: 1, explanation: "A função interna \\(g\\) age primeiro.", reviewHref: "/calculo-1/funcoes-para-calculo/composicao-e-inversa" },
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
      { prompt: "Se \\(\\lim f=2\\) e \\(\\lim g=3\\), então \\(\\lim(fg)=\\)...", options: ["5", "6", "2/3", "não existe"], correctIndex: 1, explanation: "Pela propriedade do produto, multiplicamos os limites.", reviewHref: "/calculo-1/limites/propriedades-dos-limites" },
      { prompt: "Qual técnica é natural quando há diferença de raízes?", options: ["fator comum", "conjugado", "regra do produto", "Bhaskara"], correctIndex: 1, explanation: "Multiplicar pelo conjugado elimina a diferença de radicais.", reviewHref: "/calculo-1/limites/racionalizacao-em-limites" },
      { prompt: "O Teorema do Confronto exige...", options: ["duas funções que cercam outra e têm o mesmo limite", "derivadas iguais", "domínios iguais", "funções lineares"], correctIndex: 0, explanation: "A função espremida herda o limite comum das duas barreiras.", reviewHref: "/calculo-1/limites/teorema-do-confronto" },
      { prompt: "\\(\\lim_{x\\to0}\\sin x/x\\), em radianos, vale...", options: ["0", "1", "∞", "-1"], correctIndex: 1, explanation: "É o limite trigonométrico fundamental.", reviewHref: "/calculo-1/limites/limite-trigonometrico-fundamental" },
      { prompt: "Se esquerda e direita dão 4, mas \\(f(a)\\) não existe, o limite...", options: ["não existe", "vale 4", "vale 0", "é infinito"], correctIndex: 1, explanation: "Limite depende da aproximação, não do valor no ponto.", reviewHref: "/calculo-1/limites/limites-laterais" },
    ],
  },
  "calculo-1/derivadas": {
    title: "Checkpoint · Regras de Derivação",
    description: "Escolha a regra e interprete a derivada, em vez de decorar isoladamente.",
    passPercent: 80,
    questions: [
      { prompt: "A derivada de \\(x^5\\) é...", options: ["x⁴", "5x⁴", "5x", "x⁵"], correctIndex: 1, explanation: "Pela regra da potência, o expoente desce e diminui uma unidade.", reviewHref: "/calculo-1/derivadas/derivada-potencia" },
      { prompt: "A derivada de \\(\\sin x\\) é...", options: ["-sin x", "cos x", "tan x", "1"], correctIndex: 1, explanation: "Em radianos, \\((\\sin x)'=\\cos x\\).", reviewHref: "/calculo-1/derivadas/derivadas-trigonometricas" },
      { prompt: "Para \\(e^{3x}\\), qual regra aparece além da exponencial?", options: ["produto", "quociente", "cadeia", "nenhuma"], correctIndex: 2, explanation: "A função externa é exponencial e a interna é \\(3x\\).", reviewHref: "/calculo-1/derivadas/derivada-composta" },
      { prompt: "Em uma equação \\(x^2+y^2=25\\), derivamos \\(y\\) usando...", options: ["y'=0", "cadeia", "só potência", "integral"], correctIndex: 1, explanation: "Como \\(y\\) depende de \\(x\\), \\((y^2)'=2yy'\\).", reviewHref: "/calculo-1/derivadas/derivacao-implicita" },
      { prompt: "Se posição é \\(s(t)\\), aceleração é...", options: ["s", "s'", "s''", "1/s"], correctIndex: 2, explanation: "Velocidade é a primeira derivada; aceleração, a segunda.", reviewHref: "/calculo-1/derivadas/derivadas-ordem-superior" },
    ],
  },
  "calculo-1/aplicacoes-derivadas": {
    title: "Checkpoint · Decisões com Derivadas",
    description: "Combina sinal, extremos, modelagem, TVM e aproximação.",
    passPercent: 75,
    questions: [
      { prompt: "Se \\(f'(x)>0\\) em um intervalo, \\(f\\) é...", options: ["decrescente", "crescente", "constante", "descontínua"], correctIndex: 1, explanation: "Derivada positiva indica crescimento local.", reviewHref: "/calculo-1/aplicacoes-derivadas/crescimento-decrescimento-deriv" },
      { prompt: "Num intervalo fechado, extremos absolutos exigem testar...", options: ["só f'=0", "só endpoints", "críticos e endpoints", "só f''"], correctIndex: 2, explanation: "Comparamos todos os candidatos internos e as bordas.", reviewHref: "/calculo-1/aplicacoes-derivadas/extremos-intervalo-fechado" },
      { prompt: "O TVM compara uma derivada instantânea com...", options: ["área", "taxa média no intervalo", "valor inicial", "segunda derivada"], correctIndex: 1, explanation: "Existe um ponto onde a taxa instantânea iguala a taxa média.", reviewHref: "/calculo-1/aplicacoes-derivadas/rolle-e-valor-medio" },
      { prompt: "A aproximação linear perto de \\(a\\) usa...", options: ["f(a)+f'(a)(x-a)", "f(a)x", "f'(x)^2", "∫f"], correctIndex: 0, explanation: "A reta tangente aproxima a função localmente.", reviewHref: "/calculo-1/aplicacoes-derivadas/aproximacao-linear" },
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
      { prompt: "O valor médio de \\(f\\) em \\([a,b]\\) contém o fator...", options: ["b-a", "1/(b-a)", "a+b", "1/2"], correctIndex: 1, explanation: "Dividimos o acúmulo total pelo comprimento do intervalo.", reviewHref: "/calculo-1/integrais/valor-medio-funcao" },
      { prompt: "Se velocidade muda de sinal, distância total usa...", options: ["∫v", "∫|v|", "v(b)-v(a)", "v'"], correctIndex: 1, explanation: "O módulo impede cancelamento entre trechos em sentidos opostos.", reviewHref: "/calculo-1/integrais/distancia-total" },
    ],
  },
};

export function getModuleCheckpoint(track: string, moduleSlug: string) {
  return moduleCheckpoints[`${track}/${moduleSlug}`];
}
