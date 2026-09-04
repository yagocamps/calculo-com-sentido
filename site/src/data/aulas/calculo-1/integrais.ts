import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

const MOD = "integrais";
const MOD_TITLE = "Integrais com sentido";

export const integraisAulas: Record<string, AulaContent> = {
  "ideia-de-soma": {
    meta: c1Meta({
      title: "Ideia de soma acumulada",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "11 min",
      glossaryTerms: ["Soma", "Acúmulo", "Partição"],
      next: { slug: "area-sob-grafico", title: "Área sob o gráfico" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Derivada pergunta \"quão rápido muda agora?\". Integral pergunta \"quanto acumulou no total?\"",
        "Conta de luz, distância percorrida, volume de água — tudo é soma de pedaços pequenos.",
        "A integral nasce como limite de somas de retângulos.",
      ],
    },
    explicacao: {
      title: "Soma de Riemann (intuição)",
      paragraphs: [
        "Divida o intervalo em pedaços; em cada pedaço aproxime f por um valor e multiplique pela largura.",
        "Some tudo: aproximação da área ou do acúmulo.",
        "Pedaços cada vez menores → soma tende à integral (quando existe).",
      ],
      formula: "S ≈ Σ f(xᵢ*)·Δx",
      formulaLatex: "S \\approx \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x",
      formulaAria: "S aproximadamente igual à soma de f de x i estrela vezes delta x",
      formulaLegend: "Δx = largura do pedaço",
      callout: "Mais retângulos, melhor a aproximação.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Distância", detail: "Soma de \\(v \\cdot \\Delta t\\)" },
        { label: "Consumo", detail: "Soma de \\(\\text{potência} \\cdot \\Delta t\\)" },
        { label: "Área", detail: "Soma de \\(\\text{altura} \\cdot \\Delta x\\)" },
      ],
    },
    exemplo: {
      title: "Velocidade constante",
      situacao: "\\(v=5\\) m/s durante 10 s. Distância total?",
    },
    passos: {
      title: "Pensar",
      steps: [
        { title: "Retângulos", detail: "Altura 5, base 10 \\(\\to\\) área 50." },
        { title: "Soma", detail: "\\(\\sum v \\cdot \\Delta t = 5 \\times 10 = 50\\) m." },
        { title: "Limite", detail: "v constante: integral exata = soma simples." },
      ],
    },
    interpretacao: {
      title: "Par com derivada",
      paragraphs: [
        "Se \\(s'(t)=v(t)\\), recuperar \\(s\\) é integrar \\(v\\).",
        "Acúmulo e taxa são operações inversas (TFC formaliza).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir valor instantâneo com total acumulado.",
        "Esquecer unidades (m/s × s = m).",
        "Achar que integral é só \"área\" sem contexto.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "som-g1",
          type: "interpretacao",
          enunciado: "\\(v(t)=3\\) em \\(0 \\leq t \\leq 4\\). Distância?",
          resposta: "\\(12\\) m",
          resolucao: "\\(3 \\times 4\\).",
          interpretacao: "Soma retangular.",
        },
        {
          id: "som-g2",
          type: "compreensao",
          enunciado: "Por que dividir em pedaços menores?",
          resposta: "Aproximar melhor curvas que não são constantes.",
          resolucao: "Limite \\(\\Delta x \\to 0\\).",
          interpretacao: "Precisão da soma.",
        },
              {
          id: "som-g3",
          type: "calculo",
          enunciado: "Uma torneira tem vazão \\(v(t) = 2t\\) L/min. Estime o volume em \\([0,\\ 4]\\) com dois retângulos de largura \\(2\\), usando o valor no início de cada um.",
          resposta: "\\(\\approx 8\\) L (o exato é \\(16\\) L)",
          resolucao: "Em \\([0,2]\\): \\(v(0) = 0 \\Rightarrow 0 \\times 2 = 0\\). Em \\([2,4]\\): \\(v(2) = 4 \\Rightarrow 4 \\times 2 = 8\\). Soma \\(= 8\\) L.",
          interpretacao: "Com poucos retângulos e usando a borda esquerda de uma taxa que cresce, a estimativa fica bem abaixo. Mais retângulos aproximam do valor real.",
          erroComum: "Tomar a soma de retângulos como resposta exata, e não como aproximação.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-01", "int-ap-02"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral \\(=\\) acúmulo \\(=\\) limite de somas.",
        "Pedaços × valor médio × largura.",
        "Inverso conceitual da derivada.",
      ],
    },
  },

  "area-sob-grafico": {
    meta: c1Meta({
      title: "Área sob o gráfico",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "13 min",
      next: { slug: "integral-indefinida", title: "Integral indefinida" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Área entre gráfico e eixo x modela total acumulado quando \\(f \\geq 0\\).",
        "f negativo: integral conta área com sinal (abaixo do eixo subtrai).",
      ],
    },
    explicacao: {
      title: "Leitura geométrica",
      paragraphs: [
        "\\(\\int_a^b f(x)\\,dx\\): área líquida entre f e o eixo x de a a b.",
        "\\(f \\geq 0\\): área geométrica. f alterna sinal: partes somam e subtraem.",
        "Unidade: (unidade de f)×(unidade de x).",
      ],
      formula: "A ≈ Σ f(xᵢ)Δx → ∫ₐᵇ f(x) dx",
      formulaLatex: "A \\approx \\sum f(x_i)\\,\\Delta x \\;\\to\\; \\int_a^b f(x)\\,dx",
      formulaAria: "A aproximadamente igual à soma de f de x i delta x, que tende à integral de a a b de f de x dx",
      callout: "Desenho ajuda a ver o que está somando.",
    },
    ondeAparece: {
      title: "Contextos",
      items: [
        { label: "v(t)", detail: "Área sob v = distância" },
        { label: "Taxa", detail: "Total produzido" },
        { label: "Densidade", detail: "Massa em um trecho" },
      ],
    },
    exemplo: {
      title: "\\(f(x)=2\\) em \\([0,3]\\)",
      situacao: "Área sob o gráfico?",
    },
    passos: {
      title: "Calcular",
      steps: [
        { title: "Retângulo", detail: "\\(2 \\times 3 = 6\\)." },
        { title: "Integral", detail: "\\(\\int_0^3 2\\,dx = 6\\)." },
        { title: "Unidade", detail: "Se x em m, f em m/s \\(\\to\\) área em m? Verifique contexto." },
      ],
    },
    interpretacao: {
      title: "Sinal",
      paragraphs: [
        "Área \"abaixo\" do eixo contribui negativamente.",
        "Distância total usa \\(|v|\\) ou separa trechos — cuidado em movimento.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Ignorar trechos com \\(f<0\\).",
        "Confundir área com perímetro.",
        "Esquecer limites \\(a\\) e \\(b\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "asg-g1",
          type: "calculo",
          enunciado: "\\(f(x)=4\\), \\(x \\in [1,5]\\). \\(\\int_1^5 f\\,dx\\)?",
          resposta: "\\(16\\)",
          resolucao: "\\(4 \\times 4\\).",
          interpretacao: "Retângulo.",
        },
        {
          id: "asg-g2",
          type: "interpretacao",
          enunciado: "Gráfico de v(t) acima do eixo. O que é a área?",
          resposta: "Distância percorrida no sentido positivo (no intervalo).",
          resolucao: "Soma de deslocamentos.",
          interpretacao: "\\(v \\geq 0\\).",
        },
              {
          id: "asg-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x\\) em \\([0,\\ 6]\\). Calcule \\(\\int_0^6 x\\,dx\\) pela área da figura.",
          resposta: "\\(18\\)",
          resolucao: "A região é um triângulo de base \\(6\\) e altura \\(f(6) = 6\\): \\(\\frac{6 \\times 6}{2} = 18\\).",
          interpretacao: "Quando a figura é simples, geometria e integral dão o mesmo número — é um jeito de conferir a conta sem fórmula.",
          erroComum: "Usar base vezes altura (\\(36\\)) e esquecer de dividir por \\(2\\).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-03", "int-ap-04"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral definida ≈ área líquida sob f.",
        "Sinal importa quando \\(f<0\\).",
        "Unidades: produto das escalas dos eixos.",
      ],
    },
  },

  "integral-indefinida": {
    meta: c1Meta({
      title: "Integral indefinida (antiderivada)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "12 min",
      next: { slug: "integral-definida", title: "Integral definida" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Se \\(F'(x)=f(x)\\), F é antiderivada de f — \"volta\" da derivada.",
        "Integral indefinida \\(\\int f(x)\\,dx = F(x)+C\\) reúne todas as antiderivadas.",
      ],
    },
    explicacao: {
      title: "Conceito",
      paragraphs: [
        "C é constante porque \\((F+C)'=F'=f\\).",
        "Regras espelham derivadas: \\(\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C\\) (\\(n \\neq -1\\)).",
        "\\(\\int f'(x)\\,dx = f(x)+C\\) — cheque derivando o resultado.",
      ],
      formula: "∫f(x)dx = F(x) + C, com F′=f",
      formulaLatex: "\\int f(x)\\,dx = F(x) + C, \\quad \\text{com } F'=f",
      formulaAria: "integral de f de x dx igual a F de x mais C, com F linha igual a f",
      callout: "Sempre +C em indefinida (família de soluções).",
    },
    ondeAparece: {
      title: "Uso",
      items: [
        { label: "Recuperar posição", detail: "\\(s=\\int v\\,dt\\)" },
        { label: "Custo total", detail: "\\(\\int \\text{marginal}\\)" },
        { label: "TFC", detail: "Liga a definida" },
      ],
    },
    exemplo: {
      title: "\\(\\int 3x^2\\,dx\\)",
      situacao: "Antiderivada?",
    },
    passos: {
      title: "Integrar",
      steps: [
        { title: "Regra", detail: "\\(x^3 + C\\)." },
        { title: "Verificar", detail: "\\((x^3)'=3x^2\\)." },
        { title: "C", detail: "Qualquer constante funciona." },
      ],
    },
    interpretacao: {
      title: "Diferença definida vs indefinida",
      paragraphs: [
        "Indefinida: função \\(+\\,C\\) (família).",
        "Definida: número (área/acúmulo entre \\(a\\) e \\(b\\)).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer \\(+C\\).",
        "Dividir por \\(n+1\\) errado em potência.",
        "\\(\\int \\frac{1}{x}\\,dx = \\ln|x|+C\\), não \\(\\frac{x^0}{0}\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "ind-g1",
          type: "calculo",
          enunciado: "\\(\\int (2x+1)\\,dx\\)",
          resposta: "\\(x^2+x+C\\)",
          resolucao: "Termo a termo.",
          interpretacao: "Polinômio.",
        },
        {
          id: "ind-g2",
          type: "compreensao",
          enunciado: "Por que \\((F+C)'=f\\) se \\(F'=f\\)?",
          resposta: "Derivada de constante é zero.",
          resolucao: "\\((C)'=0\\).",
          interpretacao: "Família paralela.",
        },
              {
          id: "ind-g3",
          type: "calculo",
          enunciado: "Calcule \\(\\int x^3\\,dx\\) e depois confira o resultado derivando.",
          resposta: "\\(\\frac{x^4}{4} + C\\)",
          resolucao: "Sobe o expoente e divide por ele: \\(\\frac{x^{3+1}}{3+1} + C = \\frac{x^4}{4} + C\\). Conferindo: \\(\\left(\\frac{x^4}{4}\\right)' = \\frac{4x^3}{4} = x^3\\).",
          interpretacao: "Integral indefinida sempre pode ser conferida derivando — é o único conteúdo em que o gabarito está na sua mão.",
          erroComum: "Baixar o expoente como se fosse derivada, respondendo \\(3x^2\\).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-05", "int-ap-06"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Antiderivada: derivar volta a f.",
        "\\(\\int f\\,dx = F(x)+C\\).",
        "Regras análogas às derivadas.",
      ],
    },
  },

  "integral-definida": {
    meta: c1Meta({
      title: "Integral definida",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      next: { slug: "propriedades-integral", title: "Propriedades da integral" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Integral definida \\(\\int_a^b f(x)\\,dx\\) é um número: acúmulo/área líquida no intervalo.",
        "Limites \\(a\\) e \\(b\\) fixam onde começa e termina a conta.",
      ],
    },
    explicacao: {
      title: "Definição e notação",
      paragraphs: [
        "Limite de somas de Riemann quando f é integrável em \\([a,b]\\).",
        "\\(\\int_a^a f = 0\\). Trocar limites: \\(\\int_a^b f = -\\int_b^a f\\).",
        "Interpretação: área líquida ou total acumulado no trecho.",
      ],
      formula: "∫ₐᵇ f(x) dx ∈ ℝ",
      formulaLatex: "\\int_a^b f(x)\\,dx \\in \\mathbb{R}",
      formulaAria: "integral de a a b de f de x dx pertence aos reais",
      callout: "dx indica variável de integração; a e b são números.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Produção", detail: "Total entre \\(t_1\\) e \\(t_2\\)" },
        { label: "Probabilidade", detail: "Área sob densidade (futuro)" },
        { label: "Energia", detail: "Trabalho como integral de força" },
      ],
    },
    exemplo: {
      title: "\\(\\int_0^2 2x\\,dx\\)",
      situacao: "Valor exato?",
    },
    passos: {
      title: "Por área ou antiderivada",
      steps: [
        { title: "Triângulo", detail: "Base 2, altura 4 \\(\\to\\) área 4." },
        { title: "Antiderivada", detail: "\\(\\left. x^2 \\right|_0^2 = 4-0=4\\)." },
        { title: "Conferência", detail: "Mesmo resultado." },
      ],
    },
    interpretacao: {
      title: "Número, não função",
      paragraphs: [
        "Resultado 4 é área (unidades de f vezes x).",
        "TFC generaliza cálculo na próxima aula-chave.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Deixar \\(+C\\) na definida (não aparece no valor final).",
        "Limites invertidos sem sinal.",
        "Confundir variável de integração com limite.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "def-g1",
          type: "calculo",
          enunciado: "\\(\\int_1^3 5\\,dx\\)",
          resposta: "\\(10\\)",
          resolucao: "\\(5 \\times (3-1)\\).",
          interpretacao: "Retângulo altura 5.",
        },
        {
          id: "def-g2",
          type: "interpretacao",
          enunciado: "\\(\\int_a^a f\\,dx = \\;?\\)",
          resposta: "\\(0\\)",
          resolucao: "Intervalo de largura zero.",
          interpretacao: "Propriedade básica.",
        },
              {
          id: "def-g3",
          type: "calculo",
          enunciado: "\\(\\int_1^3 (2x + 1)\\,dx\\)",
          resposta: "\\(10\\)",
          resolucao: "Uma antiderivada é \\(F(x) = x^2 + x\\). Então \\(F(3) - F(1) = 12 - 2 = 10\\).",
          interpretacao: "O \\(+C\\) se cancela na subtração — por isso a integral definida devolve um número, e não uma família de funções.",
          erroComum: "Somar \\(F(3) + F(1)\\) em vez de subtrair.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-07", "int-ap-08"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Definida = número no intervalo \\([a,b]\\).",
        "Área líquida / acúmulo.",
        "Antiderivada calcula via TFC (próxima).",
      ],
    },
  },

  "propriedades-integral": {
    meta: c1Meta({
      title: "Propriedades da integral",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "11 min",
      next: { slug: "tfc", title: "Teorema Fundamental do Cálculo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Propriedades permitem quebrar integrais difíceis em pedaços simples.",
        "Linearity, aditividade de intervalos e comparação são ferramentas de prova e cálculo.",
      ],
    },
    explicacao: {
      title: "Principais",
      paragraphs: [
        "\\(\\int (f+g) = \\int f + \\int g\\). \\(\\int (cf) = c\\int f\\).",
        "\\(\\int_a^b f = \\int_a^c f + \\int_c^b f\\) (aditividade).",
        "Se \\(f \\leq g\\) em \\([a,b]\\), então \\(\\int_a^b f \\leq \\int_a^b g\\).",
      ],
      formula: "∫ₐᵇ f = ∫ₐᶜ f + ∫ᶜᵇ f",
      formulaLatex: "\\int_a^b f = \\int_a^c f + \\int_c^b f",
      formulaAria: "integral de a a b de f igual à integral de a a c mais integral de c a b",
      callout: "c pode estar dentro ou fora de [a,b].",
    },
    ondeAparece: {
      title: "Uso",
      items: [
        { label: "Simetria", detail: "Funções pares/ímpares" },
        { label: "Trechos", detail: "Definição por partes" },
        { label: "Estimativa", detail: "Bounding integrais" },
      ],
    },
    exemplo: {
      title: "\\(\\int_0^4 f\\) com \\(f=2\\) em \\([0,2]\\) e \\(f=6\\) em \\([2,4]\\)",
      situacao: "Calcular.",
    },
    passos: {
      title: "Somar pedaços",
      steps: [
        { title: "Quebrar", detail: "\\(\\int_0^2 2 + \\int_2^4 6\\)." },
        { title: "Calcular", detail: "\\(4+12=16\\)." },
        { title: "Interpretação", detail: "Acúmulo em dois regimes." },
      ],
    },
    interpretacao: {
      title: "Estratégia",
      paragraphs: [
        "Modelos reais mudam de regra — integre trecho a trecho.",
        "Simetria em \\([-a,a]\\) economiza trabalho.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Quebrar em \\(c\\) fora do domínio de f.",
        "Esquecer sinal ao inverter limites.",
        "Aplicar linearidade em divisão inválida.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "prop-g1",
          type: "calculo",
          enunciado: "\\(\\int_0^2 (3x+1)\\,dx = \\int_0^2 3x\\,dx + \\;?\\)",
          resposta: "\\(\\int_0^2 1\\,dx\\)",
          resolucao: "Linearidade.",
          interpretacao: "Separar termos.",
        },
        {
          id: "prop-g2",
          type: "compreensao",
          enunciado: "\\(\\int_0^3 f = 5\\) e \\(\\int_3^5 f = 2\\). \\(\\int_0^5 f\\)?",
          resposta: "\\(7\\)",
          resolucao: "Aditividade.",
          interpretacao: "Soma de trechos.",
        },
              {
          id: "prop-g3",
          type: "calculo",
          enunciado: "Sabendo que \\(\\int_1^4 f(x)\\,dx = 6\\), calcule (a) \\(\\int_1^4 3f(x)\\,dx\\) e (b) \\(\\int_4^1 f(x)\\,dx\\).",
          resposta: "(a) \\(18\\); (b) \\(-6\\)",
          resolucao: "(a) Constante sai da integral: \\(3 \\times 6 = 18\\). (b) Inverter os limites troca o sinal: \\(-6\\).",
          interpretacao: "Inverter os limites é percorrer o intervalo ao contrário — o acúmulo vem com o sinal trocado.",
          erroComum: "Supor que \\(\\int_4^1 f = \\int_1^4 f\\), como se a ordem dos limites não importasse.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-09", "int-ap-10"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Soma e constante: linearidade.",
        "Quebre intervalos: aditividade.",
        "Compare funções para estimar.",
      ],
    },
  },

  "tfc": {
    meta: c1Meta({
      title: "Teorema Fundamental do Cálculo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "15 min",
      next: { slug: "distancia-total", title: "Distância total a partir da velocidade" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "TFC liga derivada e integral: calcular área usando antiderivada.",
        "É a ponte que torna Cálculo 1 computável na prática.",
      ],
    },
    explicacao: {
      title: "Parte I e II (intuição)",
      paragraphs: [
        "Parte I: se \\(f\\) é contínua em \\([a,b]\\), então a função de área acumulada \\(A(x)=\\int_a^x f(t)\\,dt\\) é derivável no interior do intervalo e \\(A'(x)=f(x)\\).",
        "Parte II: se \\(f\\) é integrável em \\([a,b]\\) e admite uma antiderivada \\(F\\), isto é, \\(F'=f\\), então \\(\\int_a^b f(x)\\,dx = F(b)-F(a)\\).",
        "Notação: \\(F(b)-F(a) = \\left[F(x)\\right]_a^b\\).",
      ],
      formula: "∫ₐᵇ f(x) dx = F(b) − F(a),  F′=f",
      formulaLatex:
        "\\int_{a}^{b} f(x)\\, dx = F(b) - F(a), \\quad F' = f",
      formulaAria:
        "a integral de a até b de f de x dx é igual a F de b menos F de a, onde F linha é igual a f",
      callout: "Com as hipóteses satisfeitas, avalie a antiderivada nos limites — não esqueça de subtrair F(a).",
    },
    ondeAparece: {
      title: "Tudo que integra",
      items: [
        { label: "Áreas", detail: "Cálculo exato" },
        { label: "Física", detail: "\\(s=\\int v\\)" },
        { label: "Probabilidade", detail: "Acúmulo de densidade" },
      ],
    },
    exemplo: {
      title: "\\(\\int_0^1 x^2\\,dx\\)",
      situacao: "Usar TFC.",
    },
    passos: {
      title: "Passos",
      steps: [
        { title: "Antiderivada", detail: "\\(F(x)=\\frac{x^3}{3}\\)." },
        { title: "Avaliar", detail: "\\(F(1)-F(0)=\\frac{1}{3}-0=\\frac{1}{3}\\)." },
        { title: "Interpretação", detail: "Área sob \\(x^2\\) em \\([0,1]\\) é \\(\\frac{1}{3}\\)." },
      ],
    },
    interpretacao: {
      title: "Coração do curso",
      paragraphs: [
        "Derivada e integral são inversas (com C na indefinida).",
        "Provas e listas usam TFC o tempo todo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Antiderivada errada.",
        "Esquecer \\(F(a)\\) na subtração.",
        "Confundir variável \\(t\\) com \\(x\\) (mesmo resultado se consistente).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "tfc-g1",
          type: "calculo",
          enunciado: "\\(\\int_0^2 4x\\,dx\\) via TFC.",
          resposta: "\\(8\\)",
          resolucao: "\\(\\left. 2x^2 \\right|_0^2=8\\).",
          interpretacao: "Parábola.",
        },
        {
          id: "tfc-g2",
          type: "compreensao",
          enunciado: "Se \\(F'=f\\), por que \\(\\int_a^b f = F(b)-F(a)\\)?",
          resposta: "Acúmulo total = valor final − valor inicial da antiderivada.",
          resolucao: "TFC parte II.",
          interpretacao: "Mudança líquida de F.",
        },
              {
          id: "tfc-g3",
          type: "calculo",
          enunciado: "Seja \\(G(x) = \\int_0^x t^2\\,dt\\). Calcule \\(G'(x)\\).",
          resposta: "\\(G'(x) = x^2\\)",
          resolucao: "Pela outra metade do TFC, derivar uma integral cujo limite superior é \\(x\\) devolve o integrando avaliado em \\(x\\): \\(G'(x) = x^2\\).",
          interpretacao: "Derivada e integral se desfazem uma à outra. Nem é preciso calcular \\(G\\) para saber a que taxa ela cresce.",
          erroComum: "Calcular \\(G(x) = \\frac{x^3}{3}\\) e parar aí, sem responder o que foi pedido (a derivada, que volta a ser \\(x^2\\)).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-11", "int-ap-12"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "TFC: para \\(f\\) contínua em \\([a,b]\\), a área acumulada deriva de volta para \\(f\\); se \\(F'=f\\), então \\(\\int_a^b f = F(b)-F(a)\\).",
        "Encontre antiderivada, avalie limites.",
        "Une área e acúmulo ao cálculo simbólico.",
      ],
    },
  },

  "distancia-total": {
    meta: c1Meta({
      title: "Distância total a partir da velocidade",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "12 min",
      next: { slug: "consumo-acumulado", title: "Consumo acumulado" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Deslocamento \\(\\int v\\,dt\\) pode ser negativo; distância total soma o percorrido sem sinal.",
        "v negativo = voltar; distância conta ida e volta.",
      ],
    },
    explicacao: {
      title: "Deslocamento vs distância",
      paragraphs: [
        "Deslocamento em \\([t_1,t_2]\\): \\(\\int_{t_1}^{t_2} v(t)\\,dt\\) (com sinal).",
        "Distância total: \\(\\int |v(t)|\\,dt\\) ou soma de |trechos|.",
        "Gráfico: área acima e abaixo do eixo separadamente.",
      ],
      formula: "distância = ∫ |v(t)| dt",
      formulaLatex: "\\text{distância} = \\int |v(t)|\\,dt",
      formulaAria: "distância igual à integral do módulo de v de t dt",
      callout: "Movimento ida e volta exige cuidado com sinal de v.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "GPS", detail: "Odômetro vs posição final" },
        { label: "Esporte", detail: "Km percorridos" },
        { label: "Tráfego", detail: "Fluxo acumulado" },
      ],
    },
    exemplo: {
      title: "\\(v(t)=6-2t\\) em \\([0,6]\\)",
      situacao: "Deslocamento e distância em 0 a 6 s?",
    },
    passos: {
      title: "Analisar",
      steps: [
        { title: "Zero v", detail: "\\(6-2t=0 \\Rightarrow t=3\\)." },
        { title: "Deslocamento", detail: "\\[\\int_0^6 (6-2t)\\,dt = \\left[6t-t^2\\right]_0^6 = 0\\]" },
        { title: "Distância", detail: "\\(\\int_0^3 v + \\int_3^6 |v| = 9+9=18\\) m." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Voltou ao ponto inicial: deslocamento 0, mas percorreu 18 m.",
        "Integral de v sozinha não basta para odômetro.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar \\(\\int v\\) como distância quando v muda de sinal.",
        "Esquecer de achar onde \\(v=0\\).",
        "Unidades de tempo e velocidade.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "dis-g1",
          type: "interpretacao",
          enunciado: "\\(v>0\\) todo o intervalo. Distância = deslocamento?",
          resposta: "Sim no intervalo.",
          resolucao: "\\(|v|=v\\).",
          interpretacao: "Mesmo sentido.",
        },
        {
          id: "dis-g2",
          type: "calculo",
          enunciado: "\\(v=5\\) m/s por 4 s. Distância?",
          resposta: "\\(20\\) m",
          resolucao: "\\(5 \\times 4\\).",
          interpretacao: "Constante positiva.",
        },
              {
          id: "dis-g3",
          type: "calculo",
          enunciado: "\\(v(t) = 6 - 2t\\) m/s em \\([0,\\ 5]\\). (a) Quando o objeto inverte o sentido? (b) Qual a distância total percorrida?",
          resposta: "(a) Em \\(t = 3\\) s; (b) \\(13\\) m",
          resolucao: "\\(v = 0\\) em \\(t = 3\\). De \\(0\\) a \\(3\\): \\(\\int_0^3 (6-2t)\\,dt = 9\\). De \\(3\\) a \\(5\\): a área vale \\(4\\), mas com \\(v < 0\\). Total \\(= 9 + 4 = 13\\) m.",
          interpretacao: "O deslocamento seria \\(9 - 4 = 5\\) m. A distância total soma os módulos: é o que o odômetro marca, não o que o mapa mostra.",
          erroComum: "Integrar \\(v\\) direto de \\(0\\) a \\(5\\), obter \\(5\\) m e chamar isso de distância total.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-13", "int-ap-14"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Deslocamento = \\(\\int v\\) (com sinal).",
        "Distância = \\(\\int |v|\\) ou soma de trechos.",
        "Ache onde \\(v=0\\) para quebrar intervalo.",
      ],
    },
  },

  "consumo-acumulado": {
    meta: c1Meta({
      title: "Consumo acumulado",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "11 min",
      next: { slug: "area-volume-integral", title: "Área e volume" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Potência instantânea (kW) integrada no tempo dá energia consumida (kWh).",
        "Vazão (L/min) integrada dá volume total.",
        "Qualquer taxa × tempo acumula total.",
      ],
    },
    explicacao: {
      title: "Modelo",
      paragraphs: [
        "\\(P(t)\\) potência \\(\\to\\) energia \\(E=\\int P\\,dt\\).",
        "Consumo de água: \\(\\int \\text{vazão}\\,dt\\).",
        "Unidades: (unidade/s) × s = unidade total.",
      ],
      formula: "Total = ∫ₜ₁ᵗ² (taxa) dt",
      formulaLatex: "\\text{Total} = \\int_{t_1}^{t_2} \\text{taxa}\\,dt",
      formulaAria: "total igual à integral de t1 a t2 da taxa dt",
      callout: "Gráfico da taxa: área = total acumulado.",
    },
    ondeAparece: {
      title: "Conta e cotidiano",
      items: [
        { label: "Conta de luz", detail: "kWh no mês" },
        { label: "Encanamento", detail: "Litros no tanque" },
        { label: "Dados", detail: "Tráfego total no dia" },
      ],
    },
    exemplo: {
      title: "\\(P(t)=2t\\) kW em \\([0,3]\\) h",
      situacao: "Energia consumida?",
    },
    passos: {
      title: "Integrar",
      steps: [
        { title: "Unidades", detail: "t em horas, P em kW \\(\\to\\) kWh." },
        { title: "∫₀³ 2t dt", detail: "\\(\\int_0^3 2t\\,dt = \\left[t^2\\right]_0^3 = 9\\) kWh." },
        { title: "Interpretação", detail: "Potência crescente; total 9 kWh no intervalo." },
      ],
    },
    interpretacao: {
      title: "Leitura de conta",
      paragraphs: [
        "Medidor soma consumo — integral discreta no relógio.",
        "Tarifa aplica sobre total, não sobre pico isolado.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir potência com energia.",
        "Horas vs segundos nas unidades.",
        "Usar valor médio sem integrar quando taxa varia.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "con-g1",
          type: "calculo",
          enunciado: "Vazão constante 5 L/min por 10 min. Volume?",
          resposta: "\\(50\\) L",
          resolucao: "\\(5 \\times 10\\).",
          interpretacao: "Retângulo.",
        },
        {
          id: "con-g2",
          type: "interpretacao",
          enunciado: "Pico alto por 1 min e zero depois. Consumo total grande?",
          resposta: "Depende da integral; pico sozinho não define total.",
          resolucao: "Área sob \\(P(t)\\).",
          interpretacao: "Acúmulo importa.",
        },
              {
          id: "con-g3",
          type: "aplicada",
          enunciado: "Uma máquina consome potência \\(p(t) = 4 + t\\) kW, com \\(t\\) em horas. Quanta energia ela consome nas primeiras \\(6\\) horas?",
          resposta: "\\(42\\) kWh",
          resolucao: "\\(\\int_0^6 (4 + t)\\,dt = \\left[4t + \\frac{t^2}{2}\\right]_0^6 = 24 + 18 = 42\\).",
          interpretacao: "Potência é taxa (kW); energia é o acúmulo dela no tempo (kWh). A integral converte uma na outra — é a conta da sua fatura de luz.",
          erroComum: "Multiplicar a potência final (\\(10\\) kW) pelas \\(6\\) h e responder \\(60\\) kWh, tratando taxa variável como constante.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-15", "int-ap-16"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Taxa integrada = total acumulado.",
        "Cuidado com unidades (kW·h).",
        "Área sob gráfico da taxa.",
      ],
    },
  },

  "area-volume-integral": {
    meta: c1Meta({
      title: "Área e volume com integral",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "13 min",
      next: { slug: "aplicacoes-integrais", title: "Aplicações práticas" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Áreas entre curvas e volumes de sólidos aparecem em engenharia e física.",
        "Cálculo 1 introduz: área = integral da diferença; volume = disco/fatia (conceito).",
      ],
    },
    explicacao: {
      title: "Ideias",
      paragraphs: [
        "Área entre f e g em \\([a,b]\\): \\(\\int (f-g)\\,dx\\) quando \\(f \\geq g\\).",
        "Volume por rotação (esboço): fatias perpendiculares; Cálculo 2 aprofunda.",
        "Simetria reduz trabalho em áreas.",
      ],
      formula: "A = ∫ₐᵇ (f(x) − g(x)) dx",
      formulaLatex: "A = \\int_a^b \\left(f(x) - g(x)\\right)\\,dx",
      formulaAria: "A igual à integral de a a b de f de x menos g de x dx",
      callout: "Desenhe quem está em cima.",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "Terreno", detail: "Área entre níveis" },
        { label: "Reservatório", detail: "Volume por seção" },
        { label: "Economia", detail: "Excedente consumidor/produtor (intro)" },
      ],
    },
    exemplo: {
      title: "Entre \\(y=x\\) e \\(y=x^2\\) em \\([0,1]\\)",
      situacao: "Área da região entre as curvas?",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Quem está acima", detail: "\\(x \\geq x^2\\) em \\([0,1]\\)." },
        { title: "Integral", detail: "\\[\\int_0^1 (x-x^2)\\,dx = \\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2}-\\frac{1}{3} = \\frac{1}{6}\\]" },
        { title: "Unidade", detail: "Área no plano (unidades²)." },
      ],
    },
    interpretacao: {
      title: "Volume (visão)",
      paragraphs: [
        "Rotacionar região gera sólido; volume \\(\\approx\\) soma de discos \\(\\pi r^2 \\Delta x\\) — integral em curso seguinte.",
        "Aqui: fixe a ideia de fatiar e somar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Integrar \\((f-g)\\) sem ver quem é maior.",
        "Limites errados de interseção.",
        "Esquecer unidades de área.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "avol-g1",
          type: "calculo",
          enunciado: "Área sob \\(y=3\\) em \\([2,5]\\).",
          resposta: "\\(9\\)",
          resolucao: "\\(3 \\times 3\\).",
          interpretacao: "Retângulo.",
        },
        {
          id: "avol-g2",
          type: "compreensao",
          enunciado: "Por que área entre curvas usa (topo−base)?",
          resposta: "Soma alturas líquidas fatiadas.",
          resolucao: "Retângulos de altura f−g.",
          interpretacao: "Mesma ideia de Riemann.",
        },
              {
          id: "avol-g3",
          type: "calculo",
          enunciado: "Calcule a área entre \\(y = 4\\) e \\(y = x^2\\), de \\(x = 0\\) a \\(x = 2\\).",
          resposta: "\\(\\frac{16}{3}\\)",
          resolucao: "Em \\([0,2]\\) vale \\(4 \\geq x^2\\). \\(\\int_0^2 (4 - x^2)\\,dx = \\left[4x - \\frac{x^3}{3}\\right]_0^2 = 8 - \\frac{8}{3} = \\frac{16}{3}\\).",
          interpretacao: "Integrar (topo menos base) soma a altura de cada fatia vertical. Em \\(x = 2\\) as curvas se encontram e a altura vira zero.",
          erroComum: "Integrar \\(x^2 - 4\\) e responder \\(-\\frac{16}{3}\\) — área não é negativa.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-17", "int-ap-18"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Área entre curvas: \\(\\int (f-g)\\) com \\(f \\geq g\\).",
        "Ache interseções para limites.",
        "Volume: fatiar e integrar (aprofundamento depois).",
      ],
    },
  },

  "aplicacoes-integrais": {
    meta: c1Meta({
      title: "Aplicações práticas de integrais",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "10 min",
      next: { slug: "revisao-integrais", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Síntese: integral responde acúmulo — distância, energia, área, totais em economia.",
        "Problema aplicado: identifique taxa, intervalo, unidades, depois integre.",
      ],
    },
    explicacao: {
      title: "Roteiro aplicado",
      paragraphs: [
        "1) O que é a taxa? 2) Unidades? 3) Intervalo \\([a,b]\\)? 4) \\(\\int \\text{taxa} \\to\\) total.",
        "Deslocamento vs distância; energia vs potência; área vs altura.",
        "TFC para calcular quando há antiderivada.",
      ],
      formula: "Total = F(b)−F(a)  ou  ∫ₐᵇ f",
      formulaLatex: "\\text{Total} = F(b)-F(a) \\quad \\text{ou} \\quad \\int_a^b f",
      formulaAria: "total igual a F de b menos F de a, ou a integral de a a b de f",
      callout: "Desenho do gráfico valida sinal e magnitude.",
    },
    ondeAparece: {
      title: "Painel",
      items: [
        { label: "Física", detail: "s, v, trabalho" },
        { label: "Economia", detail: "Excedente, custo total" },
        { label: "Engenharia", detail: "Fluxos e volumes" },
      ],
    },
    exemplo: {
      title: "Problema misto",
      situacao: "Marginal \\(C'(x)=20+0{,}1x\\). Custo adicional de produzir de 100 a 200 unidades?",
    },
    passos: {
      title: "Integrar marginal",
      steps: [
        { title: "Interpretação", detail: "Custo extra \\(\\approx \\int_{100}^{200} C'(x)\\,dx\\)." },
        { title: "Antiderivada", detail: "\\(20x+0{,}05x^2\\)." },
        { title: "Avaliar", detail: "\\[(20 \\cdot 200+0{,}05 \\cdot 40000)-(20 \\cdot 100+0{,}05 \\cdot 10000)\\]" },
        { title: "Calcular", detail: "\\(4000+2000-2000-500 = 3500\\) (conferir contas no caderno)." },
      ],
    },
    interpretacao: {
      title: "Marginal integrada",
      paragraphs: [
        "Integral de custo marginal dá custo variável acumulado no trecho.",
        "Custo fixo não entra na derivada — some separado se pedido.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Integrar quantidade em vez de taxa.",
        "Limites trocados.",
        "Não responder o que o enunciado pede (total vs taxa).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "apl-g1",
          type: "interpretacao",
          enunciado: "Dados \\(v(t)\\) em gráfico. Como achar distância total?",
          resposta: "Somar áreas \\(|v|\\) por trechos ou \\(\\int |v|\\).",
          resolucao: "Sinal de v.",
          interpretacao: "Gráfico.",
        },
        {
          id: "apl-g2",
          type: "compreensao",
          enunciado: "Derivada e integral: perguntas inversas?",
          resposta: "Derivada: taxa agora; integral: total no intervalo.",
          resolucao: "Par conceitual TFC.",
          interpretacao: "Mapa da trilha.",
        },
              {
          id: "apl-g3",
          type: "aplicada",
          enunciado: "Uma cultura de bactérias cresce à taxa \\(r(t) = 100 + 20t\\) indivíduos por hora. Quantas bactérias surgem entre \\(t = 0\\) e \\(t = 3\\) horas?",
          resposta: "\\(390\\) bactérias",
          resolucao: "\\(\\int_0^3 (100 + 20t)\\,dt = \\left[100t + 10t^2\\right]_0^3 = 300 + 90 = 390\\).",
          interpretacao: "A integral de uma taxa de nascimento diz quantas surgiram — não a população total, que ainda depende de quantas já existiam em \\(t = 0\\).",
          erroComum: "Chamar \\(390\\) de população final, esquecendo a população inicial.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-19", "int-ap-20"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Identifique taxa e intervalo.",
        "Unidades e sinal.",
        "TFC para calcular.",
      ],
    },
  },

  "revisao-integrais": {
    meta: c1Meta({
      title: "Revisão: Integrais com sentido — trilha Cálculo 1",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 11,
      duration: "9 min",
      // Última aula do site: o próximo passo natural é revisar para a prova.
      nextExterno: {
        title: "Resumos de véspera: uma página por módulo",
        href: "/resumos",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Você fechou o arco central de Cálculo 1: limites → derivadas → integrais.",
        "Esta revisão consolida acúmulo, área e TFC antes de seguir para Cálculo 2 ou revisão geral.",
      ],
    },
    explicacao: {
      title: "Checklist da trilha",
      paragraphs: [
        "✓ Soma e área sob gráfico.",
        "✓ Indefinida (\\(+C\\)) e definida (número).",
        "✓ Propriedades e TFC: \\(F(b)-F(a)\\).",
        "✓ Distância, consumo, área entre curvas.",
        "✓ Par com derivada via TFC.",
      ],
      formula: "∫ₐᵇ f = F(b)−F(a)  |  d/dx ∫ₐˣ f = f(x)",
      formulaLatex: "\\int_a^b f = F(b)-F(a) \\quad\\Big|\\quad \\frac{d}{dx}\\int_a^x f = f(x)",
      formulaAria: "integral de a a b de f igual a F de b menos F de a; derivada em x da integral de a a x de f igual a f de x",
      callout: "Trilha Cálculo 1 completa em conteúdo de aulas.",
    },
    ondeAparece: {
      title: "Próximos passos seus",
      items: [
        { label: "Prática", detail: "Banco de exercícios do site" },
        { label: "Pré-Cálculo", detail: "Reforço se necessário" },
        { label: "Cálculo 2", detail: "Técnicas e séries" },
      ],
    },
    exemplo: {
      title: "Desafio final",
      situacao: "\\(v(t)=3t\\) m/s em \\(0 \\leq t \\leq 4\\) s. Deslocamento e distância?",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Deslocamento", detail: "\\(\\int_0^4 3t\\,dt = \\left[1{,}5t^2\\right]_0^4 = 24\\) m." },
        { title: "Distância", detail: "\\(v \\geq 0 \\to 24\\) m também." },
        { title: "Frase", detail: "Partiu do repouso e acelerou uniformemente; posição final 24 m à frente." },
      ],
    },
    interpretacao: {
      title: "Parabéns",
      paragraphs: [
        "Marque o progresso em Meu progresso.",
        "Revise módulos fracos e faça exercícios aplicados.",
        "Cálculo com sentido não termina aqui — mas o esqueleto de Cálculo 1, sim.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Decorar integral sem desenhar área.",
        "Esquecer TFC na definida.",
        "Parar de praticar após ler.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "revi-g1",
          type: "calculo",
          enunciado: "\\(\\int_0^2 (x+1)\\,dx\\)",
          resposta: "\\(4\\)",
          resolucao: "\\(\\left[\\frac{x^2}{2}+x\\right]_0^2=2+2\\).",
          interpretacao: "TFC.",
        },
        {
          id: "revi-g2",
          type: "compreensao",
          enunciado: "Relacione derivada e integral em uma frase.",
          resposta: "Derivada mede taxa instantânea; integral acumula no intervalo; TFC liga as duas.",
          resolucao: "Síntese do curso.",
          interpretacao: "Mapa mental.",
        },
              {
          id: "revi-g3",
          type: "calculo",
          enunciado: "Um carro parte do repouso com velocidade \\(v(t) = 6t\\) m/s. (a) Que distância percorre nos primeiros \\(5\\) s? (b) Qual a sua velocidade em \\(t = 5\\)?",
          resposta: "(a) \\(75\\) m; (b) \\(30\\) m/s",
          resolucao: "(a) \\(\\int_0^5 6t\\,dt = \\left[3t^2\\right]_0^5 = 75\\). (b) \\(v(5) = 6 \\times 5 = 30\\).",
          interpretacao: "A integral responde \"quanto acumulou\" (\\(75\\) m); a função responde \"quanto vale agora\" (\\(30\\) m/s). Duas perguntas diferentes sobre o mesmo movimento.",
          erroComum: "Multiplicar \\(v(5) = 30\\) pelos \\(5\\) s e responder \\(150\\) m, tratando velocidade variável como constante.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["int-ap-21", "int-ap-22", "dsf-int-01"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral \\(=\\) acúmulo \\(=\\) área líquida (com sinal).",
        "TFC é a ferramenta de cálculo.",
        "Trilha Cálculo 1: 62 aulas — conteúdo completo.",
        "Continue praticando e revisando Pré-Cálculo quando precisar.",
      ],
    },
  },
};
