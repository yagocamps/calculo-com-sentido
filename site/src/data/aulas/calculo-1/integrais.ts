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
      formulaLegend: "Δx = largura do pedaço",
      callout: "Mais retângulos, melhor a aproximação.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Distância", detail: "Soma de v·Δt" },
        { label: "Consumo", detail: "Soma de potência·Δt" },
        { label: "Área", detail: "Soma de altura·Δx" },
      ],
    },
    exemplo: {
      title: "Velocidade constante",
      situacao: "v=5 m/s durante 10 s. Distância total?",
    },
    passos: {
      title: "Pensar",
      steps: [
        { title: "Retângulos", detail: "Altura 5, base 10 → área 50." },
        { title: "Soma", detail: "Σ v·Δt = 5×10 = 50 m." },
        { title: "Limite", detail: "v constante: integral exata = soma simples." },
      ],
    },
    interpretacao: {
      title: "Par com derivada",
      paragraphs: [
        "Se s′(t)=v(t), recuperar s é integrar v.",
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
          enunciado: "v(t)=3 em 0≤t≤4. Distância?",
          resposta: "12 m",
          resolucao: "3×4.",
          interpretacao: "Soma retangular.",
        },
        {
          id: "som-g2",
          type: "compreensao",
          enunciado: "Por que dividir em pedaços menores?",
          resposta: "Aproximar melhor curvas que não são constantes.",
          resolucao: "Limite Δx→0.",
          interpretacao: "Precisão da soma.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral = acúmulo = limite de somas.",
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
        "Área entre gráfico e eixo x modela total acumulado quando f≥0.",
        "f negativo: integral conta área com sinal (abaixo do eixo subtrai).",
      ],
    },
    explicacao: {
      title: "Leitura geométrica",
      paragraphs: [
        "∫ₐᵇ f(x) dx: área líquida entre f e o eixo x de a a b.",
        "f≥0: área geométrica. f alterna sinal: partes somam e subtraem.",
        "Unidade: (unidade de f)×(unidade de x).",
      ],
      formula: "A ≈ Σ f(xᵢ)Δx → ∫ₐᵇ f(x) dx",
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
      title: "f(x)=2 em [0,3]",
      situacao: "Área sob o gráfico?",
    },
    passos: {
      title: "Calcular",
      steps: [
        { title: "Retângulo", detail: "2×3=6." },
        { title: "Integral", detail: "∫₀³ 2 dx = 6." },
        { title: "Unidade", detail: "Se x em m, f em m/s → área em m? Verifique contexto." },
      ],
    },
    interpretacao: {
      title: "Sinal",
      paragraphs: [
        "Área \"abaixo\" do eixo contribui negativamente.",
        "Distância total usa |v| ou separa trechos — cuidado em movimento.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Ignorar trechos com f<0.",
        "Confundir área com perímetro.",
        "Esquecer limites a e b.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "asg-g1",
          type: "calculo",
          enunciado: "f(x)=4, x∈[1,5]. ∫₁⁵ f dx?",
          resposta: "16",
          resolucao: "4×4.",
          interpretacao: "Retângulo.",
        },
        {
          id: "asg-g2",
          type: "interpretacao",
          enunciado: "Gráfico de v(t) acima do eixo. O que é a área?",
          resposta: "Distância percorrida no sentido positivo (no intervalo).",
          resolucao: "Soma de deslocamentos.",
          interpretacao: "v≥0.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral definida ≈ área líquida sob f.",
        "Sinal importa quando f<0.",
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
        "Se F′(x)=f(x), F é antiderivada de f — \"volta\" da derivada.",
        "Integral indefinida ∫f(x)dx = F(x)+C reunir todas as antiderivadas.",
      ],
    },
    explicacao: {
      title: "Conceito",
      paragraphs: [
        "C é constante porque (F+C)′=F′=f.",
        "Regras espelham derivadas: ∫x^n dx = x^(n+1)/(n+1)+C (n≠−1).",
        "∫f′(x)dx = f(x)+C — cheque derivando o resultado.",
      ],
      formula: "∫f(x)dx = F(x) + C, com F′=f",
      callout: "Sempre +C em indefinida (família de soluções).",
    },
    ondeAparece: {
      title: "Uso",
      items: [
        { label: "Recuperar posição", detail: "s=∫v dt" },
        { label: "Custo total", detail: "∫ marginal" },
        { label: "TFC", detail: "Liga a definida" },
      ],
    },
    exemplo: {
      title: "∫(3x²)dx",
      situacao: "Antiderivada?",
    },
    passos: {
      title: "Integrar",
      steps: [
        { title: "Regra", detail: "x³ + C." },
        { title: "Verificar", detail: "(x³)′=3x²." },
        { title: "C", detail: "Qualquer constante funciona." },
      ],
    },
    interpretacao: {
      title: "Diferença definida vs indefinida",
      paragraphs: [
        "Indefinida: função + C (família).",
        "Definida: número (área/acúmulo entre a e b).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer +C.",
        "Dividir por n+1 errado em potência.",
        "∫(1/x)dx = ln|x|+C, não x^0/0.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "ind-g1",
          type: "calculo",
          enunciado: "∫(2x+1)dx",
          resposta: "x²+x+C",
          resolucao: "Termo a termo.",
          interpretacao: "Polinômio.",
        },
        {
          id: "ind-g2",
          type: "compreensao",
          enunciado: "Por que (F+C)′=f se F′=f?",
          resposta: "Derivada de constante é zero.",
          resolucao: "(C)′=0.",
          interpretacao: "Família paralela.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Antiderivada: derivar volta a f.",
        "∫f dx = F(x)+C.",
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
        "Integral definida ∫ₐᵇ f(x)dx é um número: acúmulo/área líquida no intervalo.",
        "Limites a e b fixam onde começa e termina a conta.",
      ],
    },
    explicacao: {
      title: "Definição e notação",
      paragraphs: [
        "Limite de somas de Riemann quando f é integrável em [a,b].",
        "∫ₐᵃ f = 0. Trocar limites: ∫ₐᵇ f = −∫ᵇₐ f.",
        "Interpretação: área líquida ou total acumulado no trecho.",
      ],
      formula: "∫ₐᵇ f(x) dx ∈ ℝ",
      callout: "dx indica variável de integração; a e b são números.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Produção", detail: "Total entre t₁ e t₂" },
        { label: "Probabilidade", detail: "Área sob densidade (futuro)" },
        { label: "Energia", detail: "Trabalho como integral de força" },
      ],
    },
    exemplo: {
      title: "∫₀² (2x) dx",
      situacao: "Valor exato?",
    },
    passos: {
      title: "Por área ou antiderivada",
      steps: [
        { title: "Triângulo", detail: "Base 2, altura 4 → área 4." },
        { title: "Antiderivada", detail: "x²|₀² = 4−0=4." },
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
        "Deixar +C na definida (não aparece no valor final).",
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
          enunciado: "∫₁³ 5 dx",
          resposta: "10",
          resolucao: "5×(3−1).",
          interpretacao: "Retângulo altura 5.",
        },
        {
          id: "def-g2",
          type: "interpretacao",
          enunciado: "∫ₐᵃ f dx = ?",
          resposta: "0",
          resolucao: "Intervalo de largura zero.",
          interpretacao: "Propriedade básica.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Definida = número no intervalo [a,b].",
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
        "∫(f+g) = ∫f + ∫g. ∫(cf) = c∫f.",
        "∫ₐᵇ f = ∫ₐᶜ f + ∫ᶜᵇ f (aditividade).",
        "Se f≤g em [a,b], então ∫ₐᵇ f ≤ ∫ₐᵇ g.",
      ],
      formula: "∫ₐᵇ f = ∫ₐᶜ f + ∫ᶜᵇ f",
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
      title: "∫₀⁴ f com f=2 em [0,2] e f=6 em [2,4]",
      situacao: "Calcular.",
    },
    passos: {
      title: "Somar pedaços",
      steps: [
        { title: "Quebrar", detail: "∫₀² 2 + ∫₂⁴ 6." },
        { title: "Calcular", detail: "4+12=16." },
        { title: "Interpretação", detail: "Acúmulo em dois regimes." },
      ],
    },
    interpretacao: {
      title: "Estratégia",
      paragraphs: [
        "Modelos reais mudam de regra — integre trecho a trecho.",
        "Simetria em [−a,a] economiza trabalho.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Quebrar em c fora do domínio de f.",
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
          enunciado: "∫₀² (3x+1)dx = ∫₀² 3x dx + ?",
          resposta: "∫₀² 1 dx",
          resolucao: "Linearidade.",
          interpretacao: "Separar termos.",
        },
        {
          id: "prop-g2",
          type: "compreensao",
          enunciado: "∫₀³ f = 5 e ∫₃⁵ f = 2. ∫₀⁵ f?",
          resposta: "7",
          resolucao: "Aditividade.",
          interpretacao: "Soma de trechos.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
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
        "Parte I: F(x)=∫ₐˣ f(t)dt tem F′(x)=f(x) (área acumulada varia à taxa f).",
        "Parte II: se F′=f, então ∫ₐᵇ f(x)dx = F(b)−F(a).",
        "Notação: F(b)−F(a) = [F(x)]ₐᵇ.",
      ],
      formula: "∫ₐᵇ f(x) dx = F(b) − F(a),  F′=f",
      formulaLatex:
        "\\int_{a}^{b} f(x)\\, dx = F(b) - F(a), \\quad F' = f",
      formulaAria:
        "a integral de a até b de f de x dx é igual a F de b menos F de a, onde F linha é igual a f",
      callout: "Avalie antiderivada nos limites — não esqueça subtrair F(a).",
    },
    ondeAparece: {
      title: "Tudo que integra",
      items: [
        { label: "Áreas", detail: "Cálculo exato" },
        { label: "Física", detail: "s=∫v" },
        { label: "Probabilidade", detail: "Acúmulo de densidade" },
      ],
    },
    exemplo: {
      title: "∫₀¹ x² dx",
      situacao: "Usar TFC.",
    },
    passos: {
      title: "Passos",
      steps: [
        { title: "Antiderivada", detail: "F(x)=x³/3." },
        { title: "Avaliar", detail: "F(1)−F(0)=1/3−0=1/3." },
        { title: "Interpretação", detail: "Área sob x² em [0,1] é 1/3." },
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
        "Esquecer F(a) na subtração.",
        "Confundir variável t com x (mesmo resultado se consistente).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "tfc-g1",
          type: "calculo",
          enunciado: "∫₀² (4x) dx via TFC.",
          resposta: "8",
          resolucao: "2x²|₀²=8.",
          interpretacao: "Parábola.",
        },
        {
          id: "tfc-g2",
          type: "compreensao",
          enunciado: "Se F′=f, por que ∫ₐᵇ f = F(b)−F(a)?",
          resposta: "Acúmulo total = valor final − valor inicial da antiderivada.",
          resolucao: "TFC parte II.",
          interpretacao: "Mudança líquida de F.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "TFC: ∫ₐᵇ f = F(b)−F(a).",
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
        "Deslocamento ∫v dt pode ser negativo; distância total soma o percorrido sem sinal.",
        "v negativo = voltar; distância conta ida e volta.",
      ],
    },
    explicacao: {
      title: "Deslocamento vs distância",
      paragraphs: [
        "Deslocamento em [t₁,t₂]: ∫ₜ₁ᵗ² v(t) dt (com sinal).",
        "Distância total: ∫|v(t)| dt ou soma de |trechos|.",
        "Gráfico: área acima e abaixo do eixo separadamente.",
      ],
      formula: "distância = ∫ |v(t)| dt",
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
      title: "v(t)=6−2t em [0,6]",
      situacao: "Deslocamento e distância em 0 a 6 s?",
    },
    passos: {
      title: "Analisar",
      steps: [
        { title: "Zero v", detail: "6−2t=0 → t=3." },
        { title: "Deslocamento", detail: "∫₀⁶(6−2t)dt = [6t−t²]₀⁶ = 0." },
        { title: "Distância", detail: "∫₀³ v + ∫₃⁶ |v| = 9+9=18 m." },
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
        "Usar ∫v como distância quando v muda de sinal.",
        "Esquecer de achar onde v=0.",
        "Unidades de tempo e velocidade.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "dis-g1",
          type: "interpretacao",
          enunciado: "v>0 todo o intervalo. Distância = deslocamento?",
          resposta: "Sim no intervalo.",
          resolucao: "|v|=v.",
          interpretacao: "Mesmo sentido.",
        },
        {
          id: "dis-g2",
          type: "calculo",
          enunciado: "v=5 m/s por 4 s. Distância?",
          resposta: "20 m",
          resolucao: "5×4.",
          interpretacao: "Constante positiva.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Deslocamento = ∫v (com sinal).",
        "Distância = ∫|v| ou soma de trechos.",
        "Ache onde v=0 para quebrar intervalo.",
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
        "P(t) potência → energia E=∫P dt.",
        "Consumo de água: ∫ vazão dt.",
        "Unidades: (unidade/s) × s = unidade total.",
      ],
      formula: "Total = ∫ₜ₁ᵗ² (taxa) dt",
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
      title: "P(t)=2t kW em [0,3] h",
      situacao: "Energia consumida?",
    },
    passos: {
      title: "Integrar",
      steps: [
        { title: "Unidades", detail: "t em horas, P em kW → kWh." },
        { title: "∫₀³ 2t dt", detail: "[t²]₀³ = 9 kWh." },
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
          resposta: "50 L",
          resolucao: "5×10.",
          interpretacao: "Retângulo.",
        },
        {
          id: "con-g2",
          type: "interpretacao",
          enunciado: "Pico alto por 1 min e zero depois. Consumo total grande?",
          resposta: "Depende da integral; pico sozinho não define total.",
          resolucao: "Área sob P(t).",
          interpretacao: "Acúmulo importa.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
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
        "Área entre f e g em [a,b]: ∫(f−g) dx quando f≥g.",
        "Volume por rotação (esboço): fatias perpendiculares; Cálculo 2 aprofunda.",
        "Simetria reduz trabalho em áreas.",
      ],
      formula: "A = ∫ₐᵇ (f(x) − g(x)) dx",
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
      title: "Entre y=x e y=x² em [0,1]",
      situacao: "Área da região entre as curvas?",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Quem está acima", detail: "x ≥ x² em [0,1]." },
        { title: "Integral", detail: "∫₀¹ (x−x²)dx = [x²/2−x³/3]₀¹ = 1/2−1/3 = 1/6." },
        { title: "Unidade", detail: "Área no plano (unidades²)." },
      ],
    },
    interpretacao: {
      title: "Volume (visão)",
      paragraphs: [
        "Rotacionar região gera sólido; volume ≈ soma de discos πr²Δx — integral em curso seguinte.",
        "Aqui: fixe a ideia de fatiar e somar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Integrar (f−g) sem ver quem é maior.",
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
          enunciado: "Área sob y=3 em [2,5].",
          resposta: "9",
          resolucao: "3×3.",
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
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Área entre curvas: ∫(f−g) com f≥g.",
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
        "1) O que é a taxa? 2) Unidades? 3) Intervalo [a,b]? 4) ∫ taxa → total.",
        "Deslocamento vs distância; energia vs potência; área vs altura.",
        "TFC para calcular quando há antiderivada.",
      ],
      formula: "Total = F(b)−F(a)  ou  ∫ₐᵇ f",
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
      situacao: "Marginal C′(x)=20+0,1x. Custo adicional de produzir de 100 a 200 unidades?",
    },
    passos: {
      title: "Integrar marginal",
      steps: [
        { title: "Interpretação", detail: "Custo extra ≈ ∫₁₀₀²⁰⁰ C′(x)dx." },
        { title: "Antiderivada", detail: "20x+0,05x²." },
        { title: "Avaliar", detail: "(20·200+0,05·40000)−(20·100+0,05·10000)." },
        { title: "Calcular", detail: "4000+2000−2000−500 = 3500 (conferir contas no caderno)." },
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
          enunciado: "Dados v(t) em gráfico. Como achar distância total?",
          resposta: "Somar áreas |v| por trechos ou ∫|v|.",
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
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
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
        "✓ Indefinida (+C) e definida (número).",
        "✓ Propriedades e TFC: F(b)−F(a).",
        "✓ Distância, consumo, área entre curvas.",
        "✓ Par com derivada via TFC.",
      ],
      formula: "∫ₐᵇ f = F(b)−F(a)  |  d/dx ∫ₐˣ f = f(x)",
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
      situacao: "v(t)=3t m/s em 0≤t≤4 s. Deslocamento e distância?",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Deslocamento", detail: "∫₀⁴ 3t dt = [1,5t²]₀⁴ = 24 m." },
        { title: "Distância", detail: "v≥0 → 24 m também." },
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
          enunciado: "∫₀² (x+1) dx",
          resposta: "4",
          resolucao: "[x²/2+x]₀²=2+2.",
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
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Use o banco de exercícios do site.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Integral = acúmulo = área líquida (com sinal).",
        "TFC é a ferramenta de cálculo.",
        "Trilha Cálculo 1: 62 aulas — conteúdo completo.",
        "Continue praticando e revisando Pré-Cálculo quando precisar.",
      ],
    },
  },
};
