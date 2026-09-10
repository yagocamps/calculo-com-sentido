import type { AulaContent } from "./types";
const m = String.raw;

/** Relações explícitas da auditoria; não dependem do índice visual do catálogo. */
export const auditPrerequisites: Record<string, [string, string][]> = {
  "pre-calculo/algebra/fracoes-algebricas": [["Frações", "pre-calculo/fundamentos/fracoes"], ["Fatoração", "pre-calculo/fundamentos/fatoracao"]],
  "calculo-1/limites/indeterminacao-fatoracao": [["Frações algébricas", "pre-calculo/algebra/fracoes-algebricas"]],
  "pre-calculo/funcoes/composicao-funcoes": [["Domínio e imagem", "pre-calculo/funcoes/dominio-imagem"]],
  "pre-calculo/funcoes/funcoes-por-partes": [["Domínio e imagem", "pre-calculo/funcoes/dominio-imagem"]],
  "calculo-1/limites/limites-laterais": [["Funções por partes", "pre-calculo/funcoes/funcoes-por-partes"]],
  "calculo-1/continuidade/ideia-continuidade": [["Funções por partes", "pre-calculo/funcoes/funcoes-por-partes"], ["Limites laterais", "calculo-1/limites/limites-laterais"]],
  "calculo-1/derivadas/derivada-composta": [["Composição de funções", "pre-calculo/funcoes/composicao-funcoes"], ["Regras de derivação", "calculo-1/derivadas/regras-derivacao"]],
  "calculo-1/derivadas/derivadas-trigonometricas": [["Graus e radianos", "pre-calculo/trigonometria/graus-e-radianos"], ["Regra da cadeia", "calculo-1/derivadas/derivada-composta"]],
  "calculo-1/derivadas/derivadas-exponenciais-logaritmicas": [["Limites exponenciais e logarítmicos", "calculo-1/limites/limites-exponenciais-logaritmicos"], ["Regra da cadeia", "calculo-1/derivadas/derivada-composta"]],
  "calculo-1/derivadas/derivacao-implicita": [["Regra da cadeia", "calculo-1/derivadas/derivada-composta"], ["Produto e quociente", "calculo-1/derivadas/derivada-produto-quociente"]],
  "calculo-1/aplicacoes-derivadas/taxas-relacionadas": [["Derivação implícita", "calculo-1/derivadas/derivacao-implicita"]],
  "calculo-1/aplicacoes-derivadas/aproximacao-linear": [["Secante e tangente", "calculo-1/derivadas/reta-secante-tangente"]],
  "calculo-1/aplicacoes-derivadas/rolle-e-valor-medio": [["Continuidade", "calculo-1/continuidade/ideia-continuidade"], ["Definição de derivada", "calculo-1/derivadas/definicao-derivada"]],
  "calculo-1/continuidade/teorema-valor-intermediario": [["Continuidade", "calculo-1/continuidade/ideia-continuidade"]],
  "calculo-1/aplicacoes-derivadas/extremos-intervalo-fechado": [["Continuidade", "calculo-1/continuidade/ideia-continuidade"], ["Pontos críticos", "calculo-1/aplicacoes-derivadas/pontos-criticos"]],
  "calculo-1/aplicacoes-derivadas/otimizacao": [["Extremos em intervalo fechado", "calculo-1/aplicacoes-derivadas/extremos-intervalo-fechado"]],
  "calculo-1/integrais/substituicao": [["Regra da cadeia", "calculo-1/derivadas/derivada-composta"], ["Teorema Fundamental do Cálculo", "calculo-1/integrais/tfc"]],
  "calculo-1/integrais/area-entre-curvas": [["Integral definida", "calculo-1/integrais/integral-definida"]],
  "calculo-1/integrais/valor-medio-funcao": [["Integral definida", "calculo-1/integrais/integral-definida"]],
  "calculo-1/integrais/somas-de-riemann": [["Área sob o gráfico", "calculo-1/integrais/area-sob-grafico"]],
};

export function applyPdfAudit(key: string, original: AulaContent): AulaContent {
  const refs = auditPrerequisites[key];
  let c = refs ? { ...original, meta: { ...original.meta, prereqs: refs.map(([label, path]) => ({ label, href: `/${path}` })) } } : original;
  const add = (paragraphs: string[]) => { c = { ...c, explicacao: { ...c.explicacao, paragraphs: [...c.explicacao.paragraphs, ...paragraphs] } }; };
  if (key === "pre-calculo/funcoes/composicao-funcoes") add([
    m`Domínio da composição: \(x\) precisa pertencer ao domínio de \(g\), e a saída \(g(x)\) precisa pertencer ao domínio de \(f\). Em símbolos: \(D_{f\circ g}=\{x\in D_g:g(x)\in D_f\}\).`,
    m`Com \(f(u)=\sqrt u\) e \(g(x)=2x-1\), a composição é \(\sqrt{2x-1}\). Exigimos \(2x-1\ge0\), portanto \(D_{f\circ g}=[1/2,+\infty)\). Invertendo a ordem, obtemos \(2\sqrt x-1\), cujo domínio é \([0,+\infty)\).`,
    m`Um sensor converte tensão em temperatura por \(T(v)=10v+5\); uma peça de comprimento inicial \(L_0\) varia segundo \(L(T)=L_0[1+\alpha(T-T_0)]\). A composição \(L(T(v))\) converte diretamente a tensão medida no comprimento estimado, dentro da faixa de calibração dos dois modelos.`,
  ]);
  if (key === "calculo-1/derivadas/derivada-composta") {
    c = { ...c, meta: { ...c.meta, title: "Regra da cadeia: composição e várias camadas", duration: "20 min" } };
    add([
      m`A regra exige que \(g\) seja derivável em \(x\) e que \(f\) seja derivável em \(g(x)\). A derivada externa é avaliada na saída da interna. Em \(\sqrt{3x+4}\), a função existe para \(x\ge-4/3\), mas a fórmula da derivada vale para \(x>-4/3\).`,
      m`Três camadas: em \(y=[(2x+1)^2+3]^4\), primeiro calculamos \(u=2x+1\), depois \(v=u^2+3\), por fim \(y=v^4\). A sensibilidade total é o produto \(dy/dx=(dy/dv)(dv/du)(du/dx)\).`,
      m`Derivando cada etapa: \(dy/dv=4v^3\), \(dv/du=2u\) e \(du/dx=2\). Substitua as camadas de volta: \[y'=16(2x+1)[(2x+1)^2+3]^3.\] Cada fator corresponde a uma transformação, não a um símbolo que simplesmente se cancela.`,
    ]);
    c = { ...c, exerciciosGuiados: { ...c.exerciciosGuiados, exercises: [...c.exerciciosGuiados.exercises, {
      id: "cad-camadas", type: "calculo", enunciado: m`Para \(y=[(2x+1)^2+3]^4\), calcule \(y'(0)\).`,
      resolucao: m`Em \(x=0\), temos \(u=1\) e \(v=4\). Multiplique as taxas: \(4\cdot4^3\cdot2\cdot1\cdot2=1024\).`, resposta: "1024", interpretacao: "O resultado reúne as três sensibilidades no mesmo ponto." }] } };
  }
  if (key === "pre-calculo/funcoes/funcoes-por-partes") {
    add([m`O domínio é a união dos intervalos em que cada regra está definida. Neste exemplo, a reta \(y=x+1\) vale em \(( -\infty,0)\), e a parábola \(y=x^2\) vale em \([0,+\infty)\): o domínio total é \(\mathbb R\). No gráfico, desenhe só o trecho permitido de cada curva. Em \((0,1)\), use círculo aberto; em \((0,0)\), ponto preenchido. A bolinha preenchida define o valor da função, não o limite pela outra parte.`]);
  }
  if (key === "calculo-1/derivadas/derivadas-trigonometricas") add([m`Seno e cosseno são deriváveis para todo real. A regra da tangente exige \(\cos x\ne0\); numa composição, essa restrição vale para o argumento interno. Para um deslocamento oscilatório \(s(t)=A\sin(\omega t)\), com \(\omega t\) em radianos, a velocidade é \(s'(t)=A\omega\cos(\omega t)\): a frequência altera a rapidez, mesmo com a mesma amplitude.`]);
  if (key === "calculo-1/derivadas/derivadas-exponenciais-logaritmicas") add([m`Em um modelo de resfriamento \(T(t)=T_{amb}+B e^{-kt}\), com \(k>0\), a taxa é \(T'(t)=-kB e^{-kt}\). Para \(B>0\), a temperatura diminui e a intensidade da queda vai ficando menor. O sinal vem da função interna e o modelo se aplica à faixa física considerada.`]);
  if (key === "calculo-1/derivadas/derivacao-implicita") add([m`Na circunferência, dividir por \(2y\) exige \(y\ne0\). Perto desses pontos, podemos representar um dos ramos como função derivável de \(x\). Em \((5,0)\) e \((-5,0)\), a tangente é vertical e não há derivada finita \(dy/dx\); não atribua um número a uma divisão por zero.`]);
  if (key === "calculo-1/aplicacoes-derivadas/taxas-relacionadas") {
    add([m`Comece pelo desenho: um círculo com centro fixo e raio \(r(t)\) crescendo. A região interna tem área \(A(t)\). O raio e a área variam; \(\pi\) permanece constante. A pergunta pede uma taxa de área, não uma área. Escreva a relação antes de inserir o raio observado.`]);
    c = { ...c, exemplo: { ...c.exemplo, diagram: "growing-circle" }, passos: { ...c.passos, steps: [
      { title: "Desenhar e nomear", detail: m`No desenho, \(r(t)\) é o raio em centímetros e \(A(t)\) é a área em centímetros quadrados. Conhecemos \(dr/dt=2\,\mathrm{cm/s}\) e queremos \(dA/dt\) quando \(r=5\,\mathrm{cm}\).` },
      ...c.passos.steps,
    ] } };
  }
  if (key === "calculo-1/aplicacoes-derivadas/aproximacao-linear") add([
    m`Em engenharia, um pequeno erro de medida \(dx\) pode produzir uma variação estimada \(dy=f'(a)dx\). Para a área \(A=\pi r^2\) de uma peça circular, com raio nominal \(10\,\mathrm{mm}\) e variação de até \(0{,}1\,\mathrm{mm}\), o diferencial estima \(|dA|\le2\pi\,\mathrm{mm}^2\), aproximadamente 2% da área nominal.`,
    m`Diferencial não é erro exato: \(\Delta A=2\pi r\,\Delta r+\pi(\Delta r)^2\). Nesse exemplo, o termo omitido tem módulo de até \(0{,}01\pi\,\mathrm{mm}^2\). Assim distinguimos a variação estimada da área e o erro da própria aproximação.`,
  ]);
  if (key === "calculo-1/aplicacoes-derivadas/rolle-e-valor-medio") add([
    m`Em ambos os teoremas, \(a<b\) e o ponto garantido pertence a \((a,b)\). Para Rolle, acrescente \(f(a)=f(b)\); então existe \(c\) interior com \(f'(c)=0\). Em \(f(x)=x^2-1\) no intervalo \([-1,1]\), os extremos valem zero e \(c=0\).`,
    m`Consequência do TVM: se \(f'>0\) em um intervalo, quaisquer \(x_1<x_2\) nele satisfazem \(f(x_2)-f(x_1)=f'(c)(x_2-x_1)>0\). Por isso a função é crescente nesse intervalo. A hipótese de intervalo importa: não atravesse uma interrupção do domínio.`,
  ]);
  if (key === "calculo-1/aplicacoes-derivadas/extremos-intervalo-fechado") add([
    m`Teorema do Valor Extremo: uma função contínua em um intervalo fechado e limitado \([a,b]\) atinge máximo e mínimo absolutos. A garantia é de existência; para localizá-los, compare os valores nos extremos e em todos os pontos críticos interiores.`,
    m`As hipóteses importam: \(f(x)=x\) em \((0,1)\) não atinge máximo nem mínimo; \(1/x\) em \((0,1]\) não tem máximo. Em um intervalo não limitado, como \([0,+\infty)\), a função \(f(x)=x\) também não tem máximo.`,
  ]);
  if (key === "calculo-1/integrais/valor-medio-funcao") add([
    m`Para \(a<b\) e função integrável, o retângulo de base \(b-a\) e altura \(f_{\mathrm{med}}\) tem área com sinal igual à integral: \((b-a)f_{\mathrm{med}}=\int_a^b f(x)\,dx\). No exemplo, a base é 3, a altura média é 3 e a área é 9. Para funções negativas, trate essa área como acúmulo com sinal.`,
  ]);
  return c;
}
