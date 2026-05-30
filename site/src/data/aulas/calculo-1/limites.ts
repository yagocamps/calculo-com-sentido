import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";
import { ideiaDeLimiteAula } from "@/data/aulas/ideia-de-limite";

const MOD = "limites";
const MOD_TITLE = "Limites sem trauma";

export const limitesAulas: Record<string, AulaContent> = {
  "ideia-de-limite": ideiaDeLimiteAula,

  "limite-por-tabela": {
    meta: c1Meta({
      title: "Limite por tabela",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "11 min",
      readingNotes: ["Tabela numérica", "Aproximação"],
      glossaryTerms: ["Limite", "Tendência", "Aproximação"],
      next: { slug: "limite-por-grafico", title: "Limite por gráfico" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Antes de calcular com álgebra, você pode observar o comportamento: escolha valores de x cada vez mais perto de a e veja para onde f(x) vai.",
        "Tabelas são a ferramenta mais honesta do iniciante — mostram tendência sem exigir manipulação simbólica.",
        "Em engenharia e economia, dados numéricos muitas vezes chegam antes de uma fórmula fechada.",
      ],
    },
    explicacao: {
      title: "Montar a tabela",
      paragraphs: [
        "Escolha a (o ponto de interesse) e valores de x que se aproximam de a — pela esquerda, pela direita, ou pelos dois lados.",
        "Calcule f(x) para cada x da tabela. Ignore x = a se a função não estiver definida ali.",
        "Observe se os valores de f(x) se estabilizam em torno de um número L — esse é o candidato a limite.",
      ],
      callout: "Quanto mais perto de a, mais confiança na tendência — mas a tabela nunca prova sozinha.",
      formula: "lim (x→a) f(x) ≈ L",
      formulaLegend: "L = valor para o qual f(x) parece convergir na tabela",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Engenharia", detail: "Testes numéricos perto de ponto de falha" },
        { label: "Economia", detail: "Demanda quando preço se aproxima de um patamar" },
        { label: "Física", detail: "Medições sucessivas perto de instante crítico" },
        { label: "Simulação", detail: "Software gera tabelas antes de fechar fórmula" },
      ],
    },
    exemplo: {
      title: "f(x) = (x² − 4)/(x − 2)",
      situacao: "Monte uma tabela com x → 2 (por cima e por baixo) e estime o limite.",
    },
    passos: {
      title: "Construir a tabela",
      steps: [
        { title: "Escolher x", detail: "Ex.: 1,9 · 1,99 · 1,999 · 2,001 · 2,01 · 2,1." },
        { title: "Calcular f(x)", detail: "Simplifique antes: f(x) = x + 2 para x ≠ 2." },
        { title: "Ler tendência", detail: "Valores perto de 4 quando x → 2." },
        { title: "Conclusão", detail: "lim (x→2) f(x) ≈ 4." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "A tabela sugere L = 4 mesmo com buraco em x = 2.",
        "Diferenças pequenas entre linhas indicam convergência; saltos indicam possível limite lateral ou inexistência.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar poucos valores — a tendência pode enganar.",
        "Incluir x = a quando f(a) não existe e confundir com o limite.",
        "Achar que a tabela substitui a demonstração formal.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "tab-g1",
          type: "calculo",
          enunciado: "Para f(x) = (x² − 9)/(x − 3), monte x = 2,9 · 2,99 · 3,01 · 3,1. Qual tendência?",
          resposta: "Valores perto de 6.",
          resolucao: "f(x) = x + 3 para x ≠ 3 → f(2,99) ≈ 5,99.",
          interpretacao: "lim (x→3) f(x) = 6.",
        },
        {
          id: "tab-g2",
          type: "compreensao",
          enunciado: "Por que testar x à esquerda e à direita de a?",
          resposta: "Para detectar se os dois lados convergem ao mesmo L.",
          resolucao: "Limites laterais podem diferir.",
          interpretacao: "Tabela bilateral é hábito essencial.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Tabela: x perto de a → calcular f(x) → observar tendência.",
        "Funciona mesmo quando f(a) não existe.",
        "Teste esquerda e direita de a.",
        "Próximo: ler a mesma ideia no gráfico.",
      ],
    },
  },

  "limite-por-grafico": {
    meta: c1Meta({
      title: "Limite por gráfico",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "12 min",
      readingNotes: ["Gráfico", "Buraco", "Salto"],
      glossaryTerms: ["Limite", "Buraco", "Salto"],
      next: { slug: "limite-substituicao", title: "Limite por substituição" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "O gráfico mostra tendência de um relance: para onde a curva caminha quando x se aproxima de a?",
        "Buracos e saltos explicam por que f(a) pode faltar ou diferir do limite.",
        "Ler gráficos com cuidado evita confundir valor no ponto com comportamento perto dele.",
      ],
    },
    explicacao: {
      title: "Ler tendência no gráfico",
      paragraphs: [
        "Aproxime x de a pelo eixo horizontal e siga f(x) no eixo vertical.",
        "Buraco (○): f(a) ausente, mas curva tende a L — limite existe.",
        "Salto: lados esquerdo e direito tendem a alturas diferentes — limite bilateral não existe.",
      ],
      callout: "Limite = altura para onde a curva aponta, não necessariamente o ponto marcado.",
      formula: "lim (x→a) f(x) = L",
      formulaLegend: "L = y para o qual a curva se aproxima visualmente",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Velocidade", detail: "Gráfico s(t) mostra posição; inclinação local vem depois" },
        { label: "Engenharia", detail: "Curvas de resposta perto de saturação" },
        { label: "Economia", detail: "Oferta vs preço com descontinuidade de política" },
        { label: "Controle", detail: "Sinais com degraus e atrasos" },
      ],
    },
    exemplo: {
      title: "Três gráficos mentais",
      situacao: "Compare: (1) reta com buraco em (2, 5); (2) degrau em x = 2; (3) curva suave passando por (2, 5).",
    },
    passos: {
      title: "Análise visual",
      steps: [
        { title: "Buraco", detail: "Curva → 5; ponto vazio → lim (x→2) f(x) = 5." },
        { title: "Salto", detail: "Esquerda → 3, direita → 7 → limite bilateral não existe." },
        { title: "Contínuo", detail: "Curva passa por (2, 5) → limite = f(2) = 5." },
        { title: "Registrar L", detail: "Anote L e tipo de quebra antes de calcular." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Gráfico traduz tabela em imagem: mesma tendência, leitura mais rápida.",
        "Salto indica limite lateral diferente — tema da aula de limites laterais.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir buraco com limite inexistente.",
        "Ler só um lado do gráfico.",
        "Achar que ponto preenchido sempre coincide com o limite.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "graf-g1",
          type: "interpretacao",
          enunciado: "Gráfico: reta y = x + 1 com buraco em (1, 2). Qual lim (x→1) f(x)?",
          resposta: "2",
          resolucao: "Curva tende a y = 2; buraco não altera tendência.",
          interpretacao: "Limite ≠ valor no ponto quando há buraco.",
        },
        {
          id: "graf-g2",
          type: "compreensao",
          enunciado: "Degrau em x = 0: esquerda em y = −1, direita em y = 1. Existe lim (x→0) f(x)?",
          resposta: "Não (laterais diferentes).",
          resolucao: "3 ≠ 7 no exemplo de salto; aqui −1 ≠ 1.",
          interpretacao: "Salto = limite bilateral falha.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Siga a curva quando x → a para ler L.",
        "Buraco: limite pode existir sem f(a).",
        "Salto: limites laterais distintos.",
        "Próximo: calcular por substituição quando possível.",
      ],
    },
  },

  "limite-substituicao": {
    meta: c1Meta({
      title: "Limite por substituição",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "13 min",
      readingNotes: ["Substituição", "Continuidade", "Indeterminação"],
      glossaryTerms: ["Substituição", "Continuidade", "0/0"],
      next: { slug: "limites-laterais", title: "Limites laterais" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quando a função é \"bem comportada\" em a, o limite é simplesmente f(a) — basta substituir.",
        "Muitos limites parecem difíceis porque x = a gera 0/0 ou forma indeterminada; aí substituição direta falha, mas a tendência ainda existe.",
        "Reconhecer quando substituir funciona economiza tempo em prova e em modelos aplicados.",
      ],
    },
    explicacao: {
      title: "Substituir com critério",
      paragraphs: [
        "Se f é contínua em a (sem buraco, salto ou assíntota), então lim (x→a) f(x) = f(a).",
        "Substitua x = a na expressão. Se obtiver número definido, esse é o limite.",
        "Se der 0/0, ∞/∞ ou outra indeterminação, simplifique (fatorar, racionalizar) antes de substituir de novo.",
      ],
      callout: "Substituição direta é o atalho — quando a continuidade garante.",
      formula: "lim (x→a) f(x) = f(a)",
      formulaLegend: "válido quando f é contínua em a",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Polinômios", detail: "Sempre contínuos → substituição imediata" },
        { label: "Custo", detail: "C(10) = custo exato de 10 unidades" },
        { label: "Posição", detail: "s(5) = onde o móvel está aos 5 s" },
        { label: "Engenharia", detail: "Modelos válidos só após simplificar singularidades" },
      ],
    },
    exemplo: {
      title: "Dois casos",
      situacao: "(A) lim (x→3) (x² + 2x − 1). (B) lim (x→2) (x² − 4)/(x − 2).",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Caso A", detail: "Polinômio contínuo → 9 + 6 − 1 = 14." },
        { title: "Caso B — tentativa", detail: "x = 2 → 0/0 (indeterminação)." },
        { title: "Simplificar", detail: "(x−2)(x+2)/(x−2) = x + 2 para x ≠ 2." },
        { title: "Substituir", detail: "x = 2 → 4." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "0/0 não significa limite inexistente — significa que substituição bruta falhou.",
        "Simplificar revela a tendência que tabela e gráfico já sugeriam.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Substituir em 0/0 sem simplificar e concluir \"não existe\".",
        "Cancelar termos que não são fatores comuns (ex.: somar em vez de fatorar).",
        "Esquecer que simplificação altera domínio — limite ignora o buraco.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "sub-g1",
          type: "calculo",
          enunciado: "lim (x→−1) (3x² − x + 2)",
          resposta: "6",
          resolucao: "Polinômio → 3(1) + 1 + 2 = 6.",
          interpretacao: "Substituição direta.",
        },
        {
          id: "sub-g2",
          type: "calculo",
          enunciado: "lim (x→5) (x² − 25)/(x − 5)",
          resposta: "10",
          resolucao: "(x−5)(x+5)/(x−5) = x + 5 → 10.",
          interpretacao: "0/0 resolvido por fatoração.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Contínua em a → limite = f(a).",
        "0/0 pede simplificação antes de substituir.",
        "Fatorar e racionalizar são ferramentas básicas.",
        "Próximo: limites laterais quando os lados diferem.",
      ],
    },
  },

  "limites-laterais": {
    meta: c1Meta({
      title: "Limites laterais",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "11 min",
      readingNotes: ["Esquerda", "Direita", "Notação"],
      glossaryTerms: ["Limite lateral", "Esquerda", "Direita"],
      next: { slug: "limite-infinito", title: "Limites infinitos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Às vezes a função se comporta de um jeito à esquerda de a e de outro à direita — como um semáforo ou uma política que muda em uma data.",
        "Limite lateral pergunta: o que acontece se x → a por um só lado?",
        "O limite bilateral só existe quando esquerda e direita concordam.",
      ],
    },
    explicacao: {
      title: "Um lado de cada vez",
      paragraphs: [
        "Limite à esquerda: x se aproxima de a com x < a. Notação: lim (x→a⁻) f(x).",
        "Limite à direita: x se aproxima de a com x > a. Notação: lim (x→a⁺) f(x).",
        "Limite bilateral existe ⟺ limites laterais existem e são iguais.",
      ],
      callout: "Salto no gráfico = laterais diferentes.",
      formula: "lim (x→a) f(x) = L ⟺ lim (x→a⁻) f(x) = lim (x→a⁺) f(x) = L",
      formulaLegend: "a⁻ = por baixo · a⁺ = por cima",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Tarifas", detail: "Preço muda exatamente em x = k unidades" },
        { label: "Controle", detail: "Sinal liga/desliga em instante t₀" },
        { label: "Engenharia", detail: "Material com comportamento distinto em compressão vs tração" },
        { label: "Economia", detail: "Imposto com faixa que salta no limite" },
      ],
    },
    exemplo: {
      title: "Função por partes",
      situacao: "f(x) = { x + 1 se x < 2; 5 se x = 2; 2x − 1 se x > 2 }. Estude x → 2.",
    },
    passos: {
      title: "Calcular laterais",
      steps: [
        { title: "Esquerda", detail: "x → 2⁻ usa x + 1 → tende a 3." },
        { title: "Direita", detail: "x → 2⁺ usa 2x − 1 → tende a 3." },
        { title: "Comparar", detail: "3 = 3 → lim (x→2) f(x) = 3." },
        { title: "Observar f(2)", detail: "f(2) = 5 ≠ 3 — limite existe, valor no ponto difere." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Laterais explicam saltos: se 3 ≠ 7, limite bilateral não existe.",
        "Em aplicações, o lado importa: chegar ao limite por baixo vs por cima pode ter significados distintos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar a fórmula errada do lado errado da fronteira.",
        "Achar que limite bilateral existe só porque um dos lados existe.",
        "Confundir limite lateral com valor de f(a).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "lat-g1",
          type: "calculo",
          enunciado: "f(x) = |x|/x para x ≠ 0. Qual lim (x→0⁺) e lim (x→0⁻)?",
          resposta: "1 e −1",
          resolucao: "x > 0 → 1; x < 0 → −1.",
          interpretacao: "Laterais diferentes → lim (x→0) não existe.",
        },
        {
          id: "lat-g2",
          type: "interpretacao",
          enunciado: "Gráfico com degrau: esquerda 4, direita 4. Existe lim (x→a) f(x)?",
          resposta: "Sim, L = 4",
          resolucao: "Laterais iguais bastam; f(a) pode ainda saltar.",
          interpretacao: "Coincidência lateral = limite bilateral.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "a⁻ e a⁺: aproximar por um lado.",
        "Limite bilateral exige laterais iguais.",
        "Saltos e tarifas por partes são casos típicos.",
        "Próximo: quando f(x) → ±∞.",
      ],
    },
  },

  "limite-infinito": {
    meta: c1Meta({
      title: "Limites infinitos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "12 min",
      readingNotes: ["Infinito", "Assíntota vertical"],
      glossaryTerms: ["Limite infinito", "Assíntota vertical"],
      next: { slug: "limite-no-infinito", title: "Limites no infinito" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Algumas grandezas explodem quando x se aproxima de a — denominador vai a zero, pressão tende ao infinito, fila cresce sem limite.",
        "Limite infinito descreve crescimento sem bound: f(x) fica maior que qualquer número fixo, se x estiver perto o suficiente de a.",
        "Isso explica assíntotas verticais no gráfico.",
      ],
    },
    explicacao: {
      title: "Quando f(x) dispara",
      paragraphs: [
        "lim (x→a) f(x) = +∞ significa: f(x) cresce além de qualquer M, se x estiver suficientemente perto de a.",
        "Analogamente −∞ para decrescimento ilimitado.",
        "Gráfico: curva sobe ou desce \"verticalmente\" perto da reta x = a.",
      ],
      callout: "∞ não é um número — é shorthand para \"fica arbitrariamente grande\".",
      formula: "lim (x→a) f(x) = +∞",
      formulaLegend: "f(x) > M para x perto de a (M qualquer)",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Engenharia", detail: "Resistência antes de ruptura (modelo idealizado)" },
        { label: "Economia", detail: "Custo marginal extremo perto de capacidade máxima" },
        { label: "Física", detail: "Campo gravitacional perto de singularidade" },
        { label: "Filas", detail: "Tempo de espera quando demanda → capacidade" },
      ],
    },
    exemplo: {
      title: "f(x) = 1/(x − 3)²",
      situacao: "Descreva o comportamento quando x → 3.",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "Denominador", detail: "→ 0 quando x → 3." },
        { title: "Sinal", detail: "(x−3)² > 0 para x ≠ 3 → f(x) > 0." },
        { title: "Magnitude", detail: "Quanto menor |x−3|, maior f(x)." },
        { title: "Conclusão", detail: "lim (x→3) f(x) = +∞; x = 3 é assíntota vertical." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "+∞ e −∞ importam para o lado da curva em relação ao eixo x.",
        "Laterais podem ser +∞ de um lado e −∞ do outro (ex.: 1/x em x = 0).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Tratar ∞ como valor numérico para operar.",
        "Esquecer de verificar sinal ( +∞ vs −∞ ).",
        "Confundir limite infinito (f → ∞) com limite no infinito (x → ∞).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "inf-g1",
          type: "calculo",
          enunciado: "lim (x→0⁺) 1/x e lim (x→0⁻) 1/x",
          resposta: "+∞ e −∞",
          resolucao: "x > 0 → positivo grande; x < 0 → negativo grande.",
          interpretacao: "Laterais com sinais opostos.",
        },
        {
          id: "inf-g2",
          type: "interpretacao",
          enunciado: "f(x) = 1/(x − 1). Por que x = 1 é assíntota vertical?",
          resposta: "Denominador zero → |f| → ∞",
          resolucao: "lim (x→1) |f(x)| = ∞.",
          interpretacao: "Padrão 1/(x−a).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "f(x) → ±∞ quando x → a: crescimento ilimitado.",
        "Gráfico: assíntota vertical x = a.",
        "Verifique laterais e sinal.",
        "Próximo: x → ±∞ (comportamento no infinito).",
      ],
    },
  },

  "limite-no-infinito": {
    meta: c1Meta({
      title: "Limites no infinito",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "11 min",
      readingNotes: ["x → ∞", "Assíntota horizontal"],
      glossaryTerms: ["Limite no infinito", "Assíntota horizontal"],
      next: { slug: "assintotas", title: "Assíntotas" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Longe na direita ou esquerda do eixo x, como a função se comporta? Demanda estabiliza? Velocidade terminal? Custo marginal tende a constante?",
        "Limite no infinito estuda x → +∞ ou x → −∞ — o \"fim do gráfico\".",
        "Introduz assíntotas horizontais: retas y = L que a curva aproxima.",
      ],
    },
    explicacao: {
      title: "Comportamento assintótico",
      paragraphs: [
        "lim (x→+∞) f(x) = L: valores de f(x) ficam arbitrariamente perto de L se x for grande o bastante.",
        "Polinômio vs racional: grau do numerador comparado ao denominador decide se tende a ∞ ou a constante.",
        "Regra rápida: grau num < grau den → L = 0; graus iguais → razão dos coeficientes líderes.",
      ],
      callout: "Pense no gráfico \"achatando\" perto de y = L.",
      formula: "lim (x→+∞) f(x) = L",
      formulaLegend: "L pode ser 0, constante ou ±∞",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Economia", detail: "Demanda tende a patamar quando preço sobe muito" },
        { label: "Biologia", detail: "População próxima de capacidade máxima K" },
        { label: "Engenharia", detail: "Resposta em regime permanente" },
        { label: "Medicina", detail: "Concentração plasmática estabiliza com tempo longo" },
      ],
    },
    exemplo: {
      title: "f(x) = (3x² + 1)/(x² + 4)",
      situacao: "Determine lim (x→+∞) f(x) e lim (x→−∞) f(x).",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Graus", detail: "Numerador e denominador grau 2." },
        { title: "Coeficientes", detail: "3/1 = 3 no termo líder." },
        { title: "Conclusão", detail: "lim (x→±∞) f(x) = 3." },
        { title: "Gráfico", detail: "Assíntota horizontal y = 3." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "y = 3 é o valor de longo prazo do modelo racional.",
        "Se grau num > grau den, limite no infinito é ±∞ — curva não achata.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir lim (x→a) f(x) = ∞ com lim (x→∞) f(x).",
        "Esquecer termos de grau menor — só o líder decide no infinito.",
        "Assumir L = 0 sempre para racionais.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "ninf-g1",
          type: "calculo",
          enunciado: "lim (x→+∞) (5x + 2)/(2x − 7)",
          resposta: "5/2",
          resolucao: "Graus iguais → 5/2.",
          interpretacao: "Assíntota horizontal y = 5/2.",
        },
        {
          id: "ninf-g2",
          type: "calculo",
          enunciado: "lim (x→+∞) (x + 1)/(x² + 3)",
          resposta: "0",
          resolucao: "Grau num < grau den.",
          interpretacao: "Curva achata no eixo x.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "x → ±∞: estuda comportamento de longo prazo.",
        "Racionais: compare graus e coeficientes líderes.",
        "Assíntota horizontal y = L quando lim = L finito.",
        "Próximo: vertical, horizontal e oblíqua juntas.",
      ],
    },
  },

  "assintotas": {
    meta: c1Meta({
      title: "Assíntotas",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "12 min",
      readingNotes: ["Vertical", "Horizontal", "Oblíqua"],
      glossaryTerms: ["Assíntota", "Vertical", "Horizontal", "Oblíqua"],
      next: { slug: "velocidade-instantanea", title: "Velocidade instantânea" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Assíntota é reta guia: o gráfico se aproxima dela, mas não precisa tocá-la.",
        "Organiza limites infinitos e no infinito num vocabulário visual único.",
        "Em modelos aplicados, assíntotas indicam limites físicos, capacidade ou custo marginal estável.",
      ],
    },
    explicacao: {
      title: "Três tipos (introdução)",
      paragraphs: [
        "Vertical x = a: lim (x→a) |f(x)| = ∞ — denominador zero, explosão local.",
        "Horizontal y = L: lim (x→±∞) f(x) = L — comportamento de longo prazo.",
        "Oblíqua y = mx + b: quando grau num = grau den + 1, a curva aproxima uma reta inclinada (divisão polinomial).",
      ],
      callout: "Assíntota descreve tendência do gráfico, não interseção obrigatória.",
      formula: "y = L · y = mx + b · x = a",
      formulaLegend: "horizontal · oblíqua · vertical",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Engenharia", detail: "Capacidade máxima (horizontal)" },
        { label: "Economia", detail: "Custo médio → custo marginal (oblíqua em modelos)" },
        { label: "Física", detail: "Assíntota vertical em singularidade idealizada" },
        { label: "Biologia", detail: "y = K capacidade de ambiente" },
      ],
    },
    exemplo: {
      title: "f(x) = (x² + 1)/x",
      situacao: "Identifique assíntotas vertical, horizontal e oblíqua.",
    },
    passos: {
      title: "Inventário",
      steps: [
        { title: "Vertical", detail: "x = 0 (denominador); lim (x→0) |f| = ∞." },
        { title: "Horizontal?", detail: "Grau num > den → não há horizontal finita." },
        { title: "Oblíqua", detail: "(x²+1)/x = x + 1/x → y = x (reta guia)." },
        { title: "Esboço mental", detail: "Curva segue y = x longe da origem; explode em x = 0." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Lista de assíntotas resume limites difíceis em retas simples.",
        "Oblíqua aparece quando crescimento linear domina no infinito.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir buraco com assíntota vertical.",
        "Declarar oblíqua sem dividir polinômios.",
        "Achar que gráfico deve cruzar a assíntota.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "ass-g1",
          type: "calculo",
          enunciado: "f(x) = 2/(x − 5). Assíntota vertical?",
          resposta: "x = 5",
          resolucao: "Denominador zero em x = 5.",
          interpretacao: "Padrão k/(x−a).",
        },
        {
          id: "ass-g2",
          type: "calculo",
          enunciado: "f(x) = (2x² + 3)/(x + 1). Assíntota oblíqua?",
          resposta: "y = 2x − 2",
          resolucao: "Divisão: 2x − 2 + 5/(x+1); resto → 0 no ∞.",
          interpretacao: "Grau num = grau den + 1 → oblíqua.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Vertical: lim infinito em x = a.",
        "Horizontal: lim finito quando x → ±∞.",
        "Oblíqua: reta inclinada guia no infinito.",
        "Próximo: velocidade instantânea via limites.",
      ],
    },
  },

  "velocidade-instantanea": {
    meta: c1Meta({
      title: "Velocidade instantânea",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "14 min",
      readingNotes: ["s(t)", "Taxa média", "Limite"],
      glossaryTerms: ["Velocidade instantânea", "Taxa média", "Posição"],
      next: { slug: "aplicacoes-limites", title: "Aplicações de limites" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Velocidade no velocímetro não é média da viagem inteira — é o que acontece \"agora\", em um instante.",
        "Com s(t) = posição, velocidade média em [t₁, t₂] usa diferença; instantânea exige intervalo cada vez menor.",
        "Limite transforma taxa média em taxa instantânea — ponte direta para derivada.",
      ],
    },
    explicacao: {
      title: "De média a instantânea",
      paragraphs: [
        "Velocidade média: v_méd = Δs/Δt = (s(t₂) − s(t₁))/(t₂ − t₁).",
        "Instantânea em t = a: lim (Δt→0) [s(a + Δt) − s(a)]/Δt.",
        "Geometricamente: inclinação da reta secante → inclinação da tangente.",
      ],
      callout: "Limite dá sentido preciso a \"velocidade no instante\".",
      formula: "v(a) = lim (Δt→0) [s(a + Δt) − s(a)]/Δt",
      formulaLegend: "v(a) = velocidade instantânea em t = a",
    },
    ondeAparece: {
      title: "Aplicações reais",
      items: [
        { label: "Trânsito", detail: "s(t) do GPS → velocidade no radar" },
        { label: "Engenharia", detail: "Taxa de deformação em materiais" },
        { label: "Economia", detail: "Custo marginal como limite de ΔC/Δq" },
        { label: "Medicina", detail: "Taxa de eliminação de fármaco no sangue" },
      ],
    },
    exemplo: {
      title: "s(t) = t² (metros)",
      situacao: "Velocidade média em [2, 2,5] e limite para instantânea em t = 2.",
    },
    passos: {
      title: "Calcular",
      steps: [
        { title: "Média", detail: "Δs = 2,5² − 2² = 2,25 m; Δt = 0,5 s → 4,5 m/s." },
        { title: "Intervalo menor", detail: "[2, 2,1]: Δs/Δt ≈ 4,1 m/s." },
        { title: "Limite", detail: "Quando Δt → 0, tende a 4 m/s." },
        { title: "Interpretar", detail: "v(2) = 4 m/s — instantânea em t = 2." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Médias em intervalos menores aproximam a instantânea — exatamente o espírito do limite.",
        "Derivada formalizará esse limite; aqui o foco é o significado físico.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar velocidade média da viagem como instantânea.",
        "Esquecer unidades (m/s, km/h).",
        "Confundir posição s(a) com velocidade v(a).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "vel-g1",
          type: "calculo",
          enunciado: "s(t) = 3t + 5. Velocidade média em [0, 4] e instantânea?",
          resposta: "3 m/s em ambos",
          resolucao: "Movimento uniforme: Δs/Δt = 12/4 = 3; limite igual.",
          interpretacao: "Retilineo uniforme: média = instantânea.",
        },
        {
          id: "vel-g2",
          type: "aplicada",
          enunciado: "C(q) = 1000 + 20q. O que representa lim (Δq→0) ΔC/Δq?",
          resposta: "Custo marginal instantâneo",
          resolucao: "Mesma estrutura de velocidade com C e q.",
          interpretacao: "Limite de taxa média → taxa instantânea.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "s(t) posição; v média = Δs/Δt.",
        "Instantânea = limite quando Δt → 0.",
        "Motivação central para derivada.",
        "Próximo: panorama de aplicações.",
      ],
    },
  },

  "aplicacoes-limites": {
    meta: c1Meta({
      title: "Aplicações de limites",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "10 min",
      readingNotes: ["Modelagem", "Tendência", "Aplicações"],
      glossaryTerms: ["Modelagem", "Tendência", "Taxa"],
      next: { slug: "revisao-limites", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Limite não é exercício isolado — é a linguagem de tendência em ciência, engenharia e economia.",
        "Consolidar aplicações fixa por que o módulo inteiro importa antes de avançar para continuidade.",
        "Quase toda taxa instantânea e comportamento assintótico passa por limite.",
      ],
    },
    explicacao: {
      title: "Onde limites moram",
      paragraphs: [
        "Velocidade e aceleração: limites de Δs/Δt e Δv/Δt.",
        "Economia: custo marginal, elasticidade perto de um preço.",
        "Engenharia: carga limite, deformação antes de ruptura (modelos ideais).",
        "Biologia: população tendendo a capacidade K (limite finito no infinito).",
      ],
      callout: "Pergunte sempre: o que se aproxima de quê?",
      formula: "lim (variável → alvo) (taxa ou função)",
      formulaLegend: "esqueleto comum das aplicações",
    },
    ondeAparece: {
      title: "Panorama",
      items: [
        { label: "Física", detail: "Instantâneo via intervalos infinitesimais" },
        { label: "Economia", detail: "Marginal = limite de incremento médio" },
        { label: "Engenharia", detail: "Assíntotas = limites operacionais" },
        { label: "TI", detail: "Algoritmos e taxas de convergência" },
      ],
    },
    exemplo: {
      title: "Custo de produção",
      situacao: "C(q) = 500 + 8q + 0,01q². Discuta custo médio e custo marginal quando q cresce muito.",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "Médio", detail: "C(q)/q = 500/q + 8 + 0,01q → ∞ quando q → ∞? termo 0,01q domina." },
        { title: "Marginal (ideia)", detail: "ΔC/Δq ≈ 8 + 0,02q para q grande." },
        { title: "Limite no infinito", detail: "Custo marginal cresce sem bound — capacidade precisa de outro modelo." },
        { title: "Decisão", detail: "Limites alertam saturação ou necessidade de retificar modelo." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Limites traduzem \"o que acontece no extremo\" em números ou ∞.",
        "Revisão desta aula amarra tabela, gráfico, laterais, infinitos e velocidade.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Aplicar modelo fora do domínio onde foi calibrado.",
        "Ignorar unidades e contexto ao interpretar L ou ∞.",
        "Confundir tendência com previsão exata.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "apl-g1",
          type: "aplicada",
          enunciado: "Demanda D(p) = 1000/(1 + p). O que lim (p→+∞) D(p) sugere?",
          resposta: "Demanda → 0",
          resolucao: "Denominador domina → 0.",
          interpretacao: "Preço muito alto esvazia demanda.",
        },
        {
          id: "apl-g2",
          type: "compreensao",
          enunciado: "Cite duas situações onde limite infinito aparece.",
          resposta: "Ex.: 1/(x−a) perto de a; tempo de fila quando demanda → capacidade",
          resolucao: "Explosão local ou modelo idealizado.",
          interpretacao: "Infinito = sem bound, não número.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Limites modelam tendência, taxas instantâneas e extremos.",
        "Física, economia e engenharia compartilham a mesma estrutura.",
        "Assíntotas = tradução gráfica de limites.",
        "Próximo: revisão do módulo.",
      ],
    },
  },

  "revisao-limites": {
    meta: c1Meta({
      title: "Revisão do módulo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 11,
      duration: "9 min",
      next: {
        slug: "ideia-continuidade",
        moduleSlug: "continuidade",
        title: "Ideia visual de continuidade",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Consolidar limites evita carregar buracos conceituais para continuidade e derivada.",
        "Checklist final: você consegue ir da ideia intuitiva ao cálculo e à leitura aplicada?",
      ],
    },
    explicacao: {
      title: "Checklist do módulo",
      paragraphs: [
        "✓ Ideia: tendência quando x → a (sem exigir f(a)).",
        "✓ Tabela e gráfico: estimar L; buracos vs saltos.",
        "✓ Substituir quando contínuo; simplificar 0/0.",
        "✓ Laterais, infinitos, no infinito, assíntotas.",
        "✓ Velocidade instantânea como limite de Δs/Δt.",
      ],
      formula: "Próximo: continuidade em a",
      formulaLegend: "f contínua em a ⟺ lim (x→a) f(x) = f(a)",
      callout: "Continuidade junta limite e valor no ponto.",
    },
    ondeAparece: {
      title: "Conexão",
      items: [
        { label: "Continuidade", detail: "Limite = f(a) sem quebra" },
        { label: "Derivada", detail: "Limite de taxa média" },
        { label: "Modelagem", detail: "Assíntotas e tendências" },
      ],
    },
    exemplo: {
      title: "Mini-simulado mental",
      situacao: "f(x) = (x² − 1)/(x − 1). Limite em x = 1? Assíntotas de g(x) = 1/x + 2?",
    },
    passos: {
      title: "Revisão rápida",
      steps: [
        { title: "f em x = 1", detail: "Simplifica x + 1 → lim = 2." },
        { title: "g", detail: "Vertical x = 0; horizontal y = 2." },
        { title: "Laterais", detail: "1/x: esquerda −∞, direita +∞ em 0." },
        { title: "Próximo módulo", detail: "Continuidade formaliza \"sem quebra\"." },
      ],
    },
    interpretacao: {
      title: "Próximo módulo",
      paragraphs: [
        "Abra Continuidade — comece por Ideia visual de continuidade.",
        "Marque este módulo como concluído se dominou o checklist.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Memorizar regras sem interpretar tabela/gráfico.",
        "Pular limites laterais em funções por partes.",
        "Tratar ∞ como número nas contas.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "revl-g1",
          type: "compreensao",
          enunciado: "Liste três métodos para investigar lim (x→a) f(x).",
          resposta: "Tabela, gráfico, substituição/simplificação",
          resolucao: "Complementar com laterais quando necessário.",
          interpretacao: "Kit completo do módulo.",
        },
        {
          id: "revl-g2",
          type: "calculo",
          enunciado: "lim (x→+∞) (4x − 1)/(2x + 5)",
          resposta: "2",
          resolucao: "Graus iguais → 4/2.",
          interpretacao: "Assíntota horizontal y = 2.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Limite = tendência; tabela, gráfico, álgebra.",
        "Laterais, ±∞, assíntotas, velocidade instantânea.",
        "Próximo: módulo Continuidade.",
        "Revisite aulas fracas antes de seguir.",
      ],
    },
  },
};
