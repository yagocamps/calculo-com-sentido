import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

const MOD = "derivadas";
const MOD_TITLE = "Derivadas com sentido";

export const derivadasAulas: Record<string, AulaContent> = {
  "variacao-media": {
    meta: c1Meta({
      title: "Variação média: mudança no intervalo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "11 min",
      glossaryTerms: ["Variação média", "Intervalo", "Taxa"],
      next: { slug: "variacao-instantanea", title: "Variação instantânea" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Antes de falar de \"agora\", medimos mudança em um trecho: quanto a posição mudou entre dois instantes, quanto o lucro mudou entre duas quantidades.",
        "Variação média é a inclinação da reta que liga dois pontos do gráfico — a secante.",
        "É o passo natural depois de limites e continuidade.",
      ],
    },
    explicacao: {
      title: "Definição",
      paragraphs: [
        "Entre x = a e x = b, a variação média de f é quanto f mudou por unidade de x.",
        "Geometricamente: inclinação da reta por (a, f(a)) e (b, f(b)).",
        "Quanto menor o intervalo, mais nos aproximamos da mudança \"no instante\".",
      ],
      formula: "média = [f(b) − f(a)] / (b − a)",
      formulaLegend: "Δy / Δx no intervalo",
      callout: "Unidades: (unidade de f) por (unidade de x).",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Viagem", detail: "Velocidade média = Δs/Δt" },
        { label: "Economia", detail: "Custo médio por unidade extra no trecho" },
        { label: "Clima", detail: "Temperatura média subiu X°C por hora" },
      ],
    },
    exemplo: {
      title: "s(t) = t² metros",
      situacao: "Posição de t = 1 s a t = 3 s. Variação média de posição?",
    },
    passos: {
      title: "Cálculo",
      steps: [
        { title: "Valores", detail: "s(1)=1, s(3)=9." },
        { title: "Δs", detail: "9 − 1 = 8 m." },
        { title: "Δt", detail: "3 − 1 = 2 s." },
        { title: "Média", detail: "8/2 = 4 m/s (velocidade média no intervalo)." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "4 m/s não garante que em cada instante a velocidade foi 4 — só descreve o trecho.",
        "Derivada virá quando Δt → 0.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar (f(b)−f(a)) por (f(a)−f(b)) sem ajustar sinal.",
        "Dividir por (a−b) em vez de (b−a).",
        "Confundir média com valor instantâneo.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "vm-g1",
          type: "calculo",
          enunciado: "f(x)=3x+2 entre x=0 e x=4. Variação média?",
          resposta: "3",
          resolucao: "(14−2)/4 = 12/4 = 3.",
          interpretacao: "Afim: média = coeficiente angular.",
        },
        {
          id: "vm-g2",
          type: "interpretacao",
          enunciado: "Lucro passou de R$ 1000 a R$ 2500 ao aumentar produção de 10 para 60 peças. Variação média do lucro em relação à quantidade?",
          resposta: "R$ 30 por peça",
          resolucao: "(2500−1000)/(60−10) = 1500/50 = 30.",
          interpretacao: "Lucro médio extra por peça no trecho.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Variação média = Δf/Δx no intervalo.",
        "É inclinação da secante.",
        "Base para velocidade média e derivada.",
      ],
    },
  },

  "variacao-instantanea": {
    meta: c1Meta({
      title: "Variação instantânea: o que acontece agora",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "12 min",
      next: { slug: "reta-secante-tangente", title: "Reta secante e tangente" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "O velocímetro mostra velocidade agora, não só a média da viagem.",
        "Variação instantânea pergunta: se o intervalo ficar minúsculo, para qual taxa a mudança tende?",
        "Resposta: limite da variação média quando Δx → 0.",
      ],
    },
    explicacao: {
      title: "Ideia",
      paragraphs: [
        "Aproxime b de a: médias cada vez mais perto da inclinação no ponto.",
        "Esse limite é a taxa instantânea de mudança de f em a.",
        "Pode não existir se o gráfico tiver quina ou salto.",
      ],
      formula: "taxa instantânea = lim (Δx→0) Δf/Δx",
      callout: "Mesma ideia de limite que você já estudou.",
    },
    ondeAparece: {
      title: "Contextos",
      items: [
        { label: "Velocidade instantânea", detail: "Derivada de posição" },
        { label: "Marginal", detail: "Custo de mais uma unidade" },
        { label: "Sensores", detail: "Leitura no instante" },
      ],
    },
    exemplo: {
      title: "s(t)=t²",
      situacao: "Velocidade instantânea em t = 2 s?",
    },
    passos: {
      title: "Esboço",
      steps: [
        { title: "Média em [2, 2+h]", detail: "[(2+h)²−4]/h = 4+h." },
        { title: "h → 0", detail: "Tende a 4 m/s." },
        { title: "Conferência", detail: "Carro acelerando; em t=2 a taxa é 4." },
      ],
    },
    interpretacao: {
      title: "Mensagem",
      paragraphs: [
        "Instantâneo = limite do médio.",
        "Próxima aula nomeia a reta tangente.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar média de viagem inteira como instantânea.",
        "Esquecer limite quando o ponto é problemático.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "vi-g1",
          type: "compreensao",
          enunciado: "Por que Δx não pode ser zero na média antes do limite?",
          resposta: "Divisão por zero; usamos limite quando Δx → 0.",
          resolucao: "Processo de aproximação.",
          interpretacao: "Limite formaliza o instante.",
        },
        {
          id: "vi-g2",
          type: "interpretacao",
          enunciado: "Temperatura média 2°C/h em 3 h. Isso fixa a temperatura em cada minuto?",
          resposta: "Não necessariamente.",
          resolucao: "Média pode esconder oscilações.",
          interpretacao: "Instantânea detalha o momento.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Instantânea = limite da variação média.",
        "Velocidade no ponto = limite de Δs/Δt.",
        "Prepara definição de derivada.",
      ],
    },
  },

  "reta-secante-tangente": {
    meta: c1Meta({
      title: "Reta secante e reta tangente",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "13 min",
      next: { slug: "definicao-derivada", title: "Definição de derivada" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Secante corta a curva em dois pontos; tangente toca em um ponto sem \"atravessar\" localmente.",
        "Inclinação da tangente = taxa instantânea = derivada.",
      ],
    },
    explicacao: {
      title: "Geometria",
      paragraphs: [
        "Secante por (a,f(a)) e (a+h,f(a+h)): inclinação [f(a+h)−f(a)]/h.",
        "h → 0: secante → tangente em a (se o limite existir).",
        "Tangente é a melhor aproximação linear do gráfico perto de a.",
      ],
      formula: "m_tangente = lim (h→0) [f(a+h)−f(a)]/h",
      callout: "Equação da tangente: y − f(a) = m(x − a).",
    },
    ondeAparece: {
      title: "Uso",
      items: [
        { label: "Aproximação", detail: "Linearizar perto de um ponto" },
        { label: "Física", detail: "Direção do movimento instantâneo" },
        { label: "Gráficos", detail: "Prever pequena mudança em f" },
      ],
    },
    exemplo: {
      title: "f(x)=x² em x=1",
      situacao: "Inclinação da tangente?",
    },
    passos: {
      title: "Passos",
      steps: [
        { title: "Secante", detail: "[(1+h)²−1]/h = 2+h." },
        { title: "Limite", detail: "h→0 → m = 2." },
        { title: "Tangente", detail: "y − 1 = 2(x − 1) → y = 2x − 1." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Perto de (1,1), a parábola parece uma reta de inclinação 2.",
        "Derivada em a é inclinação da tangente.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir secante com tangente antes do limite.",
        "Tangente em quina (|x| em 0) não é única clássica.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "st-g1",
          type: "calculo",
          enunciado: "f(x)=5x em x=2. Inclinação da tangente?",
          resposta: "5",
          resolucao: "Reta já é tangente; m=5.",
          interpretacao: "Afim: derivada = coeficiente.",
        },
        {
          id: "st-g2",
          type: "compreensao",
          enunciado: "h→0 na secante representa o quê?",
          resposta: "Aproximar o segundo ponto ao primeiro.",
          resolucao: "Secante → tangente.",
          interpretacao: "Processo visual do limite.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Secante → tangente quando h→0.",
        "Inclinação da tangente = derivada em a.",
        "Tangente aproxima o gráfico localmente.",
      ],
    },
  },

  "definicao-derivada": {
    meta: c1Meta({
      title: "Definição de derivada",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      next: { slug: "regras-derivacao", title: "Regras de derivação" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A derivada nomeia o que construímos: taxa instantânea de mudança.",
        "Notação f′(a) ou df/dx em a — ferramenta central do Cálculo 1.",
      ],
    },
    explicacao: {
      title: "Definição formal",
      paragraphs: [
        "f′(a) = lim (h→0) [f(a+h) − f(a)] / h, se o limite existir.",
        "Equivalente: lim (x→a) [f(x) − f(a)] / (x − a).",
        "Derivável em a ⇒ contínua em a (mas o contrário é falso).",
      ],
      formula: "f′(a) = lim (h→0) [f(a+h)−f(a)]/h",
      formulaLatex:
        "f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}",
      formulaAria:
        "f linha de a é igual ao limite, quando h tende a zero, de f de a mais h menos f de a, dividido por h",
      formulaLegend: "notação: dy/dx, y′, Df",
      callout: "Calcular por definição é lento — regras aceleram.",
    },
    ondeAparece: {
      title: "Interpretações",
      items: [
        { label: "Geométrica", detail: "Inclinação da tangente" },
        { label: "Física", detail: "Velocidade, aceleração" },
        { label: "Econômica", detail: "Custo marginal" },
      ],
    },
    exemplo: {
      title: "f(x)=x² em a=3",
      situacao: "f′(3) pela definição.",
    },
    passos: {
      title: "Cálculo",
      steps: [
        { title: "Diferença", detail: "[(3+h)²−9]/h = (6h+h²)/h = 6+h." },
        { title: "Limite", detail: "f′(3)=6." },
        { title: "Tangente", detail: "y−9=6(x−3)." },
      ],
    },
    interpretacao: {
      title: "Significado",
      paragraphs: [
        "Em x=3, x² muda instantaneamente como se fosse reta de inclinação 6.",
        "Regras darão f′(x)=2x → f′(3)=6.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de tomar o limite após simplificar.",
        "Cancelar h quando não é fator comum válido.",
        "Assumir derivável em quina.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "def-g1",
          type: "calculo",
          enunciado: "f(x)=7x−1. f′(2)?",
          resposta: "7",
          resolucao: "Limite dá 7; reta tem inclinação 7.",
          interpretacao: "Derivada constante da afim.",
        },
        {
          id: "def-g2",
          type: "compreensao",
          enunciado: "f′(a) não existe. f pode ser contínua em a?",
          resposta: "Sim (ex.: |x| em 0).",
          resolucao: "Contínua mas quina.",
          interpretacao: "Derivável é mais forte.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "f′(a) = limite do quociente de diferenças.",
        "Tangente, velocidade, marginal = mesma ideia.",
        "Próximo: regras para calcular rápido.",
      ],
    },
  },

  "regras-derivacao": {
    meta: c1Meta({
      title: "Regras de derivação (visão geral)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "15 min",
      next: { slug: "derivada-potencia", title: "Derivada de potências" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Recalcular limite em cada exercício não escala. Regras são atalhos comprovados a partir da definição.",
        "Organizam o cálculo em blocos: constante, soma, produto, quociente, cadeia.",
      ],
    },
    explicacao: {
      title: "Mapa das regras",
      paragraphs: [
        "(c)′ = 0. (x^n)′ = n x^(n−1) para n inteiro (estendido depois).",
        "(f+g)′ = f′+g′. (cf)′ = c f′.",
        "(fg)′ = f′g + fg′. (f/g)′ = (f′g−fg′)/g².",
        "(f∘g)′(x) = f′(g(x))·g′(x) — regra da cadeia.",
      ],
      formula: "(f+g)′ = f′ + g′",
      callout: "Sempre simplifique antes de derivar quando possível.",
    },
    ondeAparece: {
      title: "Estratégia",
      items: [
        { label: "Polinômio", detail: "Termo a termo" },
        { label: "Produto", detail: "Duas funções multiplicadas" },
        { label: "Composta", detail: "Função dentro de função" },
      ],
    },
    exemplo: {
      title: "f(x)=3x²+2x−5",
      situacao: "Derivar por regras.",
    },
    passos: {
      title: "Passo a passo",
      steps: [
        { title: "x²", detail: "→ 2x; multiplica 3 → 6x." },
        { title: "2x", detail: "→ 2." },
        { title: "−5", detail: "→ 0." },
        { title: "f′(x)", detail: "6x+2." },
      ],
    },
    interpretacao: {
      title: "Quando usar qual",
      paragraphs: [
        "Soma → derivar cada pedaço.",
        "Produto só quando não dá para expandir fácil.",
        "Cadeia quando há \"camada interna\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Derivar produto como se fosse soma.",
        "Esquecer g′ na cadeia.",
        "Erro de sinal no quociente.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "reg-g1",
          type: "calculo",
          enunciado: "f(x)=x³+x. f′(x)?",
          resposta: "3x²+1",
          resolucao: "3x² e 1.",
          interpretacao: "Regra da soma + potência.",
        },
        {
          id: "reg-g2",
          type: "compreensao",
          enunciado: "Por que (fg)′ não é f′g′?",
          resposta: "Efeito de um fator muda enquanto o outro varia.",
          resolucao: "Regra do produto completa.",
          interpretacao: "Interação entre fatores.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Regras evitam limite em todo exercício.",
        "Soma, produto, quociente, cadeia — arsenal principal.",
        "Aulas seguintes detalham cada bloco.",
      ],
    },
  },

  "derivada-potencia": {
    meta: c1Meta({
      title: "Derivada de potências e polinômios",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "12 min",
      next: { slug: "derivada-produto-quociente", title: "Produto e quociente" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A regra (x^n)′ = n x^(n−1) é a mais usada em Cálculo 1.",
        "Polinômios viram retas inclinadas termo a termo.",
      ],
    },
    explicacao: {
      title: "Regra da potência",
      paragraphs: [
        "n inteiro positivo: derivada reduz expoente em 1 e multiplica por n.",
        "Constante c: derivada 0. cx: derivada c.",
        "Raiz e 1/x são potências disfarçadas: √x = x^(1/2).",
      ],
      formula: "(x^n)′ = n x^(n−1)",
      formulaLegend: "válida para n racional em domínio adequado",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Área", detail: "x² em dimensões" },
        { label: "Custo", detail: "Termos quadráticos de escala" },
        { label: "Movimento", detail: "s(t) polinomial" },
      ],
    },
    exemplo: {
      title: "f(x)=x⁴−3x²+5",
      situacao: "f′(x)?",
    },
    passos: {
      title: "Derivar",
      steps: [
        { title: "x⁴", detail: "4x³." },
        { title: "−3x²", detail: "−6x." },
        { title: "5", detail: "0." },
        { title: "Resultado", detail: "f′(x)=4x³−6x." },
      ],
    },
    interpretacao: {
      title: "Grau",
      paragraphs: [
        "Grau do polinômio cai 1 na derivada.",
        "Derivada nula em pontos onde tangente é horizontal.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer multiplicar pelo expoente.",
        "Derivar constante como se fosse x.",
        "Expoente negativo: regra ainda vale com cuidado no domínio.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "pot-g1",
          type: "calculo",
          enunciado: "f(x)=x⁵. f′(x)?",
          resposta: "5x⁴",
          resolucao: "Regra da potência.",
          interpretacao: "Padrão direto.",
        },
        {
          id: "pot-g2",
          type: "calculo",
          enunciado: "f(x)=1/x = x⁻¹. f′(x)?",
          resposta: "−x⁻² = −1/x²",
          resolucao: "−1·x⁻².",
          interpretacao: "Potência negativa.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "(x^n)′ = n x^(n−1).",
        "Polinômio: derivar termo a termo.",
        "Constante some na derivada.",
      ],
    },
  },

  "derivada-produto-quociente": {
    meta: c1Meta({
      title: "Derivada de produto e quociente",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "13 min",
      next: { slug: "derivada-composta", title: "Regra da cadeia (introdução)" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Receita = preço × quantidade: as duas variáveis mudam juntas — precisa da regra do produto.",
        "Custo médio e razões usam quociente.",
      ],
    },
    explicacao: {
      title: "Fórmulas",
      paragraphs: [
        "Produto: (fg)′ = f′g + fg′.",
        "Quociente: (f/g)′ = (f′g − fg′) / g², com g ≠ 0.",
        "Se possível, expandir antes evita trabalho extra.",
      ],
      formula: "(fg)′ = f′g + fg′",
      callout: "Ordem no quociente: \"derivada do topo vezes embaixo menos topo vezes derivada de embaixo\".",
    },
    ondeAparece: {
      title: "Quando usar",
      items: [
        { label: "x²·sen x", detail: "Produto" },
        { label: "(x+1)/(x−1)", detail: "Quociente" },
        { label: "Lucro/quantidade", detail: "Razão de funções" },
      ],
    },
    exemplo: {
      title: "f(x)=x²·(2x+1)",
      situacao: "Derivar.",
    },
    passos: {
      title: "Produto",
      steps: [
        { title: "f=x², g=2x+1", detail: "f′=2x, g′=2." },
        { title: "Aplicar", detail: "2x(2x+1)+x²·2." },
        { title: "Simplificar", detail: "4x²+2x+2x²=6x²+2x." },
      ],
    },
    interpretacao: {
      title: "Dica",
      paragraphs: [
        "Expandir x²(2x+1)=2x³+x² e derivar dá o mesmo — confira.",
        "Quociente é sensível a sinais.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Derivar fatores separadamente e multiplicar.",
        "Inverter sinal no numerador do quociente.",
        "Esquecer g² no denominador.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "pq-g1",
          type: "calculo",
          enunciado: "f(x)=(x)(x+3). Pela regra do produto.",
          resposta: "2x+3",
          resolucao: "1·(x+3)+x·1 = x+3+x.",
          interpretacao: "Confere expandindo x²+3x.",
        },
        {
          id: "pq-g2",
          type: "calculo",
          enunciado: "f(x)=1/x. Pela regra do quociente (1 sobre x).",
          resposta: "−1/x²",
          resolucao: "(0·x−1·1)/x².",
          interpretacao: "Caso clássico.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Produto: f′g + fg′.",
        "Quociente: (f′g−fg′)/g².",
        "Expandir às vezes é mais rápido.",
      ],
    },
  },

  "derivada-composta": {
    meta: c1Meta({
      title: "Regra da cadeia (introdução)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "12 min",
      next: { slug: "interpretacao-derivada", title: "Interpretar a derivada" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Função dentro de função: custo do tempo de viagem, temperatura ao longo da posição.",
        "A mudança externa multiplica a mudança interna.",
      ],
    },
    explicacao: {
      title: "Ideia",
      paragraphs: [
        "Se y = f(u) e u = g(x), então dy/dx = (dy/du)·(du/dx).",
        "Notação: (f(g(x)))′ = f′(g(x))·g′(x).",
        "Identifique a camada de fora e a de dentro.",
      ],
      formula: "(f∘g)′(x) = f′(g(x)) · g′(x)",
      callout: "Não esqueça o fator g′(x) — erro mais comum.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "(3x+1)⁵", detail: "Fora: u⁵, dentro: 3x+1" },
        { label: "√(x²+1)", detail: "Fora: √u" },
        { label: "e^(2x)", detail: "Exponencial composta (futuro)" },
      ],
    },
    exemplo: {
      title: "f(x)=(2x+3)⁴",
      situacao: "f′(x)?",
    },
    passos: {
      title: "Cadeia",
      steps: [
        { title: "Fora", detail: "u⁴ → 4u³." },
        { title: "Dentro", detail: "u=2x+3 → u′=2." },
        { title: "Montar", detail: "4(2x+3)³·2 = 8(2x+3)³." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Taxa na saída = taxa na casca externa × taxa da casca interna.",
        "Prática com vários exemplos fixa o olhar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Derivar só a potência externa.",
        "Esquecer de derivar o interior.",
        "Confundir composição com produto.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cad-g1",
          type: "calculo",
          enunciado: "f(x)=(x²+1)³. f′(x)?",
          resposta: "3(x²+1)²·2x = 6x(x²+1)²",
          resolucao: "3u²·2x.",
          interpretacao: "Cadeia clássica.",
        },
        {
          id: "cad-g2",
          type: "compreensao",
          enunciado: "(f·g)′ vs (f∘g)′: qual envolve multiplicar g′?",
          resposta: "Ambas, mas (f∘g)′ = f′(g)·g′; produto é f′g+fg′.",
          resolucao: "Estruturas diferentes.",
          interpretacao: "Identifique composição vs produto.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Cadeia: derivada externa × derivada interna.",
        "Marque u interno antes de derivar.",
        "Erro clássico: omitir g′(x).",
      ],
    },
  },

  "interpretacao-derivada": {
    meta: c1Meta({
      title: "Interpretar a derivada na prática",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "11 min",
      next: { slug: "velocidade-aceleracao", title: "Velocidade e aceleração" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Calcular f′(x) sem interpretar perde metade da prova aplicada.",
        "f′>0: função sobe; f′<0: desce; f′=0: possível extremo ou platô.",
      ],
    },
    explicacao: {
      title: "Leituras",
      paragraphs: [
        "Sinal de f′: direção do gráfico.",
        "Valor de |f′|: rapidez da mudança (não o valor de f).",
        "f′ em unidades de (unidade de f) por (unidade de x).",
      ],
      formula: "f′ > 0 ⇒ crescente | f′ < 0 ⇒ decrescente",
      callout: "Segunda derivada (futuro) estuda concavidade.",
    },
    ondeAparece: {
      title: "Frases de prova",
      items: [
        { label: "Marginal", detail: "Custo de mais uma unidade ≈ C′(x)" },
        { label: "Velocidade", detail: "s′(t)" },
        { label: "Crescimento", detail: "P′(t) populacional" },
      ],
    },
    exemplo: {
      title: "C(x)=1000+5x+0,01x²",
      situacao: "C′(x)=5+0,02x. O que C′(100) significa?",
    },
    passos: {
      title: "Interpretar",
      steps: [
        { title: "Valor", detail: "C′(100)=5+2=7 reais/unidade (aprox.)." },
        { title: "Frase", detail: "Produzir a 101ª unidade custa cerca de R$ 7 extras." },
        { title: "Cuidado", detail: "Não é custo total nem médio." },
      ],
    },
    interpretacao: {
      title: "Hábito",
      paragraphs: [
        "Sempre escreva uma frase após derivar em problema aplicado.",
        "Unidades são obrigatórias.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que f′=0 implica mínimo (pode ser máximo ou inflexão).",
        "Confundir f com f′.",
        "Ignorar domínio positivo em produção.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "intd-g1",
          type: "interpretacao",
          enunciado: "f′(5)=−3. O gráfico sobe ou desce perto de x=5?",
          resposta: "Desce.",
          resolucao: "Derivada negativa.",
          interpretacao: "Decrescente local.",
        },
        {
          id: "intd-g2",
          type: "aplicada",
          enunciado: "R′(q)=80−0,4q (receita). O que R′(50)=60 significa?",
          resposta: "Receita marginal ≈ R$ 60 na 51ª unidade.",
          resolucao: "Taxa de mudança da receita em q=50.",
          interpretacao: "Marginal ≠ receita total.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "f′: sinal = direção; valor = rapidez.",
        "Marginal e velocidade são interpretações.",
        "Sempre traduza para linguagem do problema.",
      ],
    },
  },

  "velocidade-aceleracao": {
    meta: c1Meta({
      title: "Velocidade e aceleração",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "12 min",
      next: { slug: "custo-marginal", title: "Custo e lucro marginal" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "s(t) posição → v(t)=s′(t) velocidade → a(t)=v′(t)=s″(t) aceleração.",
        "É o exemplo que motivou o Cálculo desde Newton.",
      ],
    },
    explicacao: {
      title: "Relações",
      paragraphs: [
        "Velocidade instantânea = derivada da posição em relação ao tempo.",
        "Aceleração = derivada da velocidade = segunda derivada da posição.",
        "v>0: indo no sentido positivo; v<0: sentido oposto.",
      ],
      formula: "v(t) = s′(t),  a(t) = v′(t) = s″(t)",
    },
    ondeAparece: {
      title: "Situações",
      items: [
        { label: "Queda livre", detail: "s(t) parabólica" },
        { label: "Trânsito", detail: "Acelerar e frear" },
        { label: "Engenharia", detail: "vibração e controle" },
      ],
    },
    exemplo: {
      title: "s(t)=−5t²+20t (metros)",
      situacao: "v(t) e a(t)? Significado em t=1 s.",
    },
    passos: {
      title: "Derivar",
      steps: [
        { title: "v(t)", detail: "−10t+20 m/s." },
        { title: "a(t)", detail: "−10 m/s² (constante)." },
        { title: "t=1", detail: "v(1)=10 m/s; a(1)=−10 m/s² (desacelerando se positivo for cima)." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "a constante negativa: gravidade simplificada.",
        "Máximo de s ocorre quando v=0.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir posição com velocidade.",
        "Esquecer unidades m, m/s, m/s².",
        "Achar que aceleração zero implica repouso (pode ter v constante ≠ 0).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "veld-g1",
          type: "calculo",
          enunciado: "s(t)=t³. v(2)?",
          resposta: "12 m/s se s em m, t em s",
          resolucao: "v=3t² → 12.",
          interpretacao: "Derivada de t³.",
        },
        {
          id: "veld-g2",
          type: "interpretacao",
          enunciado: "v(t)=0 em t=3. O que isso sugere sobre s?",
          resposta: "Possível instante de máximo ou mínimo local de posição.",
          resolucao: "Mudança de direção ou ponto crítico.",
          interpretacao: "v=0 não implica s=0.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "v=s′, a=v′=s″.",
        "Unidades coerentes sempre.",
        "v=0: candidato a extremo de posição.",
      ],
    },
  },

  "custo-marginal": {
    meta: c1Meta({
      title: "Custo e lucro marginal",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 11,
      duration: "11 min",
      next: { slug: "revisao-derivadas", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Produzir mais uma unidade custa aproximadamente C′(x) — custo marginal.",
        "Lucro marginal L′ = R′ − C′ guia decisão de produzir ou parar.",
      ],
    },
    explicacao: {
      title: "Definições",
      paragraphs: [
        "Custo marginal em x: C′(x) (custo da próxima unidade infinitesimal).",
        "Receita marginal: R′(x).",
        "Lucro marginal: L′(x) = R′(x) − C′(x).",
      ],
      formula: "L(x) = R(x) − C(x) ⇒ L′(x) = R′(x) − C′(x)",
      callout: "Produzir mais vale a pena enquanto R′ > C′ (lucro marginal positivo).",
    },
    ondeAparece: {
      title: "Decisão",
      items: [
        { label: "Empresa", detail: "Quantidade ótima (módulo 6)" },
        { label: "Preço", detail: "Elasticidade (cursos avançados)" },
        { label: "Orçamento", detail: "Custo extra de um projeto" },
      ],
    },
    exemplo: {
      title: "C(x)=500+10x+0,05x², R(x)=40x",
      situacao: "C′(x), R′(x) e quando lucro marginal zera?",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "C′", detail: "10+0,1x." },
        { title: "R′", detail: "40." },
        { title: "L′=0", detail: "40−10−0,1x=0 → x=300." },
        { title: "Interpretação", detail: "Além de 300, custo marginal supera receita marginal." },
      ],
    },
    interpretacao: {
      title: "Prática",
      paragraphs: [
        "Marginal aproxima decisão incremental.",
        "Otimização completa no módulo Aplicações de derivadas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar custo médio no lugar de marginal.",
        "Esquecer que R′ pode depender de x (preço variável).",
        "Confundir lucro total com marginal.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cm-g1",
          type: "calculo",
          enunciado: "C(x)=1000+8x. C′(50)?",
          resposta: "8",
          resolucao: "Derivada constante 8.",
          interpretacao: "Cada unidade extra custa R$ 8.",
        },
        {
          id: "cm-g2",
          type: "interpretacao",
          enunciado: "R′(q)=30, C′(q)=35. Devo aumentar produção?",
          resposta: "Não; custo marginal > receita marginal.",
          resolucao: "L′ negativo.",
          interpretacao: "Mais uma unidade reduz lucro.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "C′ e R′ são taxas marginais.",
        "L′ = R′ − C′.",
        "L′>0: produzir mais ajuda (localmente).",
      ],
    },
  },

  "revisao-derivadas": {
    meta: c1Meta({
      title: "Revisão: Derivadas com sentido",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 12,
      duration: "9 min",
      next: {
        slug: "crescimento-decrescimento-deriv",
        moduleSlug: "aplicacoes-derivadas",
        title: "Onde a função sobe ou desce",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Consolidar derivada como taxa instantânea e regras de cálculo.",
        "Próximo módulo usa f′ para máximos, mínimos e otimização.",
      ],
    },
    explicacao: {
      title: "Checklist",
      paragraphs: [
        "✓ Variação média → limite → f′(a).",
        "✓ Tangente e interpretação.",
        "✓ Regras: soma, potência, produto, quociente, cadeia.",
        "✓ Velocidade, aceleração, marginal.",
      ],
      formula: "f′(a) = lim [f(a+h)−f(a)]/h",
      callout: "Aplicações de derivadas: onde f′=0 e sinais de f′.",
    },
    ondeAparece: {
      title: "Próximo módulo",
      items: [
        { label: "Crescimento", detail: "Sinal de f′" },
        { label: "Extremos", detail: "f′=0" },
        { label: "Otimização", detail: "Lucro máximo" },
      ],
    },
    exemplo: {
      title: "Desafio rápido",
      situacao: "f(x)=x²(3x−1). Esboce estratégia para f′ sem expandir tudo de uma vez.",
    },
    passos: {
      title: "Estratégia",
      steps: [
        { title: "Opção A", detail: "Expandir e derivar termo a termo." },
        { title: "Opção B", detail: "Regra do produto: 2x(3x−1)+x²·3." },
        { title: "Simplificar", detail: "6x²−2x+3x²=9x²−2x." },
      ],
    },
    interpretacao: {
      title: "Seguir",
      paragraphs: [
        "Abra Aplicações de derivadas na trilha.",
        "Revise regra da cadeia se ainda travar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Calcular sem interpretar em problemas aplicados.",
        "Pular para integral antes de dominar derivada.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "revd-g1",
          type: "calculo",
          enunciado: "f(x)=(x²+1)². f′(1) pela cadeia.",
          resposta: "2(1+1)·2·1 = 8",
          resolucao: "2u·2x em x=1, u=2.",
          interpretacao: "Revisão cadeia.",
        },
        {
          id: "revd-g2",
          type: "compreensao",
          enunciado: "Relacione derivável, contínua e limite em a.",
          resposta: "Derivável ⇒ contínua ⇒ limite existe (em a).",
          resolucao: "Implicações em uma direção.",
          interpretacao: "Hierarquia de hipóteses.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Derivada = taxa instantânea = inclinação da tangente.",
        "Regras aceleram; interpretação fecha o ciclo.",
        "Próximo: aplicações (máximos, otimização).",
      ],
    },
  },
};
