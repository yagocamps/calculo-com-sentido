import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

const MOD = "continuidade";
const MOD_TITLE = "Continuidade";

export const continuidadeAulas: Record<string, AulaContent> = {
  "ideia-continuidade": {
    meta: c1Meta({
      title: "Ideia visual de continuidade",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "11 min",
      readingNotes: ["Gráfico sem quebra", "Ligação com limite"],
      glossaryTerms: ["Continuidade", "Quebra", "Tendência"],
      next: { slug: "furos-saltos", title: "Furos e saltos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Uma função contínua é aquela que você pode desenhar sem tirar o lápis do papel — sem saltos nem buracos.",
        "Na prática, significa que o modelo não \"pula\" de repente: temperatura que varia suavemente, posição sem teleporte.",
        "Continuidade liga o que você viu em limites ao valor da função no ponto.",
      ],
    },
    explicacao: {
      title: "Intuição gráfica",
      paragraphs: [
        "Perto de \\(x = a\\), o gráfico não tem salto nem buraco: a tendência (limite) coincide com o valor \\(f(a)\\).",
        "Se existe limite e \\(f(a)\\) está definido e são iguais, há continuidade em \\(a\\).",
        "Quebra = limite diferente do valor, ou limite que não existe, ou função indefinida no ponto.",
      ],
      callout: "Limite descreve a tendência; continuidade exige que ela bata com \\(f(a)\\).",
      formula: "f contínua em a ⟺ lim (x→a) f(x) = f(a)",
      formulaLatex: "f \\text{ contínua em } a \\iff \\lim_{x \\to a} f(x) = f(a)",
      formulaAria: "f contínua em a se e somente se o limite quando x tende a a de f de x é igual a f de a",
      formulaLegend: "três condições equivalentes quando bem definidas",
    },
    ondeAparece: {
      title: "Onde importa",
      items: [
        { label: "Física", detail: "Trajetória sem descontinuidade no tempo" },
        { label: "Economia", detail: "Curvas de oferta/demanda suaves (modelos)" },
        { label: "Engenharia", detail: "Sinais sem degrau inesperado" },
        { label: "Cálculo", detail: "Substituição direta em limites" },
      ],
    },
    exemplo: {
      title: "Gráfico contínuo",
      situacao:
        "\\(f(x) = x^2\\). O gráfico é uma parábola sem buracos. O que esperar de \\(\\lim_{x \\to 2} f(x)\\)?",
    },
    passos: {
      title: "Verificação intuitiva",
      steps: [
        { title: "Calcular f(2)", detail: "\\(f(2) = 4\\)." },
        { title: "Aproximar x → 2", detail: "Valores perto de 2 dão \\(f(x)\\) perto de 4." },
        { title: "Limite", detail: "\\(\\lim_{x \\to 2} x^2 = 4\\)." },
        { title: "Conclusão", detail: "Limite \\(= f(2)\\) → contínua em \\(x = 2\\)." },
      ],
    },
    interpretacao: {
      title: "Mensagem",
      paragraphs: [
        "Polinômios são contínuos em todo \\(\\mathbb{R}\\) — por isso substituição direta costuma funcionar.",
        "Buracos e saltos viram foco nas próximas aulas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que contínua significa sempre crescente.",
        "Confundir contínua com definida em todo lugar (domínio importa).",
        "Ignorar o ponto ao falar só do limite.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cont-g1",
          type: "compreensao",
          enunciado: "Gráfico sem salto nem buraco em \\(x = 3\\). Contínua em 3?",
          resposta: "Sim (visualmente contínua em 3).",
          resolucao: "Limite coincide com valor no ponto.",
          interpretacao: "Definição intuitiva.",
        },
        {
          id: "cont-g2",
          type: "interpretacao",
          enunciado: "\\(\\lim_{x \\to 1} f(x) = 5\\) mas \\(f(1) = 2\\). Contínua em 1?",
          resposta: "Não.",
          resolucao: "Limite \\(\\neq f(1)\\).",
          interpretacao: "Há buraco ou valor errado no ponto.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Contínua = gráfico sem quebra no ponto.",
        "Formalmente: \\(\\lim_{x \\to a} f(x) = f(a)\\).",
        "Liga limites ao valor da função.",
        "Próximo: tipos de quebra (furos e saltos).",
      ],
    },
  },

  "furos-saltos": {
    meta: c1Meta({
      title: "Furos e saltos no gráfico",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "12 min",
      next: { slug: "assintotas-continuidade", title: "Assíntotas e continuidade" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Nem toda quebra é igual: buraco (limite existe, valor falta ou errado) é diferente de salto (limites laterais diferentes).",
        "Reconhecer o tipo orienta o cálculo e a modelagem.",
      ],
    },
    explicacao: {
      title: "Dois tipos clássicos",
      paragraphs: [
        "Buraco (descontinuidade removível): limite existe, mas \\(f(a)\\) não existe ou \\(\\neq\\) limite.",
        "Salto (descontinuidade de salto): limites laterais existem mas são diferentes.",
        "Oscilatória: limite não existe — caso mais difícil, aparece em funções senoidais perto de zero.",
      ],
      formula: "Buraco: lim f(x) = L ≠ f(a) | Salto: lim⁺ ≠ lim⁻",
      formulaLatex: "\\text{Buraco: } \\lim f(x) = L \\neq f(a) \\quad \\text{Salto: } \\lim^+ \\neq \\lim^-",
      formulaAria: "buraco: limite igual a L diferente de f de a; salto: limite pela direita diferente do limite pela esquerda",
      callout: "Buraco às vezes pode ser \"corrigido\" redefinindo \\(f(a) = L\\).",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "Buraco", detail: "\\(\\frac{x^2-4}{x-2}\\) em \\(x = 2\\)" },
        { label: "Salto", detail: "Tarifa com faixa de preço diferente" },
        { label: "Degrau", detail: "Função degrau \\(u(t)\\) em controle" },
      ],
    },
    exemplo: {
      title: "Buraco vs salto",
      situacao:
        "\\(f(x) = \\frac{x^2-1}{x-1}\\) para \\(x \\neq 1\\); \\(g(x) = 1\\) se \\(x<0\\) e \\(g(x)=2\\) se \\(x \\geq 0\\). Classifique em \\(x=1\\) e \\(x=0\\).",
    },
    passos: {
      title: "Classificar",
      steps: [
        { title: "f em x=1", detail: "Simplifica para \\(x+1\\) (\\(x \\neq 1\\)); lim \\(= 2\\), \\(f(1)\\) indefinido → buraco." },
        { title: "g em x=0", detail: "Esquerda → 1, direita → 2 → salto." },
        { title: "Correção buraco", detail: "Definir \\(f(1)=2\\) tornaria f contínua." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "Buraco: modelo quase certo, falta definir um ponto.",
        "Salto: fenômeno real de mudança abrupta (política, interruptor).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Chamar salto de buraco.",
        "Achar que buraco implica limite inexistente.",
        "Esquecer limites laterais no salto.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "fs-g1",
          type: "compreensao",
          enunciado: "\\(\\lim_{x \\to 3} f(x) = 7\\) mas \\(f(3)\\) não está definido. Tipo?",
          resposta: "Descontinuidade removível (buraco).",
          resolucao: "Limite existe; valor no ponto falta.",
          interpretacao: "Pode estender definindo \\(f(3)=7\\).",
        },
        {
          id: "fs-g2",
          type: "interpretacao",
          enunciado: "\\(\\lim^- f(x)=0\\) e \\(\\lim^+ f(x)=5\\) em \\(x=2\\). Tipo?",
          resposta: "Salto.",
          resolucao: "Laterais diferentes.",
          interpretacao: "Não há um único limite bilateral.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Buraco: limite existe, valor falha ou difere.",
        "Salto: limites laterais diferentes.",
        "Classificar a quebra guia a análise.",
      ],
    },
  },

  "assintotas-continuidade": {
    meta: c1Meta({
      title: "Assíntotas e continuidade",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "10 min",
      next: { slug: "continuidade-ponto", title: "Continuidade em um ponto" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Assíntota vertical: função explode (\\(\\to \\pm\\infty\\)) perto de uma reta \\(x = a\\) — descontinuidade infinita.",
        "Assíntota horizontal: comportamento estável quando \\(x \\to \\infty\\) — não é quebra num ponto finito, mas fecha o gráfico.",
        "Você já viu assíntotas em limites; agora enquadramos na continuidade.",
      ],
    },
    explicacao: {
      title: "Tipos e continuidade",
      paragraphs: [
        "Vertical \\(x = a\\): f não é contínua em \\(a\\) (nem definida no limite finito).",
        "Horizontal \\(y = L\\): descreve tendência no infinito, não quebra local.",
        "Oblíqua: reta inclinada que o gráfico aproxima quando \\(x \\to \\infty\\).",
      ],
      formula: "x = a ass. vert. se lim (x→a⁺) f = ±∞ (ou ambos lados)",
      formulaLatex: "x = a \\text{ vertical se } \\lim_{x \\to a^+} f = \\pm\\infty",
      formulaAria: "x igual a a é assíntota vertical se o limite pela direita é mais ou menos infinito",
      formulaLegend: "horizontal: lim (x→±∞) f(x) = L",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "1/x", detail: "Assíntota vertical \\(x = 0\\)" },
        { label: "Custos fixos", detail: "Comportamento longo prazo → horizontal" },
        { label: "Capacidade", detail: "Platô como limite no infinito" },
      ],
    },
    exemplo: {
      title: "f(x) = 1/(x − 2)",
      situacao: "Onde há assíntota vertical? Contínua em \\(x = 3\\)?",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "Vertical", detail: "\\(x = 2\\) (denominador zero)." },
        { title: "Em x = 3", detail: "\\(f(3) = 1\\); função definida e finita." },
        { title: "Limite em 3", detail: "Substituição direta → contínua em 3." },
      ],
    },
    interpretacao: {
      title: "Distinção",
      paragraphs: [
        "Assíntota vertical marca descontinuidade infinita.",
        "Pontos longe da vertical podem ser perfeitamente contínuos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir assíntota horizontal com valor em x finito.",
        "Achar que gráfico cruza assíntota vertical.",
        "Esquecer que \\(\\infty\\) não é um número.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "as-g1",
          type: "compreensao",
          enunciado: "\\(f(x)=\\frac{1}{x}\\). Contínua em \\(x=0\\)?",
          resposta: "Não (não definida; limite infinito).",
          resolucao: "Descontinuidade infinita em 0.",
          interpretacao: "Assíntota vertical \\(x=0\\).",
        },
        {
          id: "as-g2",
          type: "interpretacao",
          enunciado: "\\(\\lim_{x \\to \\infty} \\frac{3x+1}{x} = 3\\). Interpretação gráfica?",
          resposta: "Assíntota horizontal \\(y = 3\\) quando \\(x \\to \\infty\\).",
          resolucao: "Comportamento longe segue reta \\(y=3\\).",
          interpretacao: "Liga limite no infinito ao gráfico.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Assíntota vertical ↔ descontinuidade infinita.",
        "Horizontal/obliqua descrevem x → ∞.",
        "Continuidade local separada de comportamento no infinito.",
      ],
    },
  },

  "continuidade-ponto": {
    meta: c1Meta({
      title: "Continuidade em um ponto (definição)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "11 min",
      next: { slug: "continuidade-intervalo", title: "Continuidade em intervalos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A definição formal junta três checagens: \\(f(a)\\) definida, limite existe, limite \\(= f(a)\\).",
        "É o que permite substituir \\(x\\) por \\(a\\) direto em muitos limites.",
      ],
    },
    explicacao: {
      title: "Três condições",
      paragraphs: [
        "1) \\(f(a)\\) existe (número finito).",
        "2) \\(\\lim_{x \\to a} f(x)\\) existe (laterais iguais se aplicável).",
        "3) \\(\\lim_{x \\to a} f(x) = f(a)\\).",
        "Falha em qualquer uma → descontínua em \\(a\\).",
      ],
      formula: "Contínua em a ⟺ (i)(ii)(iii) acima",
      formulaLatex: "f(a)\\ \\text{existe} \\;\\wedge\\; \\lim_{x\\to a} f(x)\\ \\text{existe} \\;\\wedge\\; \\lim_{x\\to a} f(x) = f(a)",
      formulaAria: "f de a existe, e o limite existe, e o limite é igual a f de a",
      callout: "Para polinômios e funções racionais fora de zeros do denominador, as três valem.",
    },
    ondeAparece: {
      title: "Uso em Cálculo",
      items: [
        { label: "Limite", detail: "Substituição direta" },
        { label: "Derivada", detail: "Função derivada contínua implica gráfico suave" },
        { label: "Teorema", detail: "Valor intermediário (futuro)" },
      ],
    },
    exemplo: {
      title: "Verificar em a = 1",
      situacao: "\\[f(x) = \\begin{cases} x^2 & x \\neq 1 \\\\ 3 & x = 1 \\end{cases}\\] Contínua em 1?",
    },
    passos: {
      title: "Checklist",
      steps: [
        { title: "f(1)", detail: "\\(f(1) = 3\\) — existe." },
        { title: "Limite", detail: "Para \\(x \\neq 1\\), \\(f(x)=x^2 \\to\\) lim \\(= 1\\)." },
        { title: "Comparar", detail: "\\(1 \\neq 3\\) → descontínua (buraco corrigível para 1)." },
      ],
    },
    interpretacao: {
      title: "Correção",
      paragraphs: [
        "Redefinir \\(f(1) = 1\\) tornaria contínua — buraco removível.",
        "Provas pedem explicitar as três condições.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Verificar só o limite e esquecer \\(f(a)\\).",
        "Não testar limites laterais em funções por partes.",
        "Confundir domínio com continuidade.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cp-g1",
          type: "calculo",
          enunciado: "\\(f(x)=5x-2\\). Contínua em \\(x=4\\)?",
          resposta: "Sim.",
          resolucao: "Afim é contínua em todo \\(\\mathbb{R}\\); \\(f(4)=18\\), lim \\(= 18\\).",
          interpretacao: "Substituição direta.",
        },
        {
          id: "cp-g2",
          type: "compreensao",
          enunciado: "Qual condição falha se há salto em \\(a\\)?",
          resposta: "Limite bilateral não existe (ou \\(\\neq f(a)\\)).",
          resolucao: "Laterais diferentes.",
          interpretacao: "Salto viola (ii) ou (iii).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Três condições: \\(f(a)\\), limite, igualdade.",
        "Buraco: ajuste \\(f(a)\\); salto: não corrige só redefinindo um valor.",
        "Base para intervalos e teoremas.",
      ],
    },
  },

  "continuidade-intervalo": {
    meta: c1Meta({
      title: "Continuidade em intervalos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "10 min",
      next: { slug: "revisao-continuidade", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Dizer que f é contínua em \\([a, b]\\) significa contínua em todo ponto interno e bem comportada nas pontas (em intervalo fechado).",
        "Teoremas importantes (valor intermediário) exigem continuidade em intervalo.",
      ],
    },
    explicacao: {
      title: "Intervalos abertos e fechados",
      paragraphs: [
        "Contínua em \\((a, b)\\): vale a definição em cada ponto do interior.",
        "Em \\([a, b]\\) fechado: contínua em \\((a,b)\\) + contínua à direita em \\(a\\) + à esquerda em \\(b\\).",
        "Função contínua em intervalo tem gráfico \"colado\" sem quebras internas.",
      ],
      formula: "Contínua em [a,b] ⟹ gráfico conectado entre extremos",
      formulaLatex: "f \\text{ contínua em } [a,b] \\Rightarrow \\text{gráfico conectado}",
      formulaAria: "f contínua no intervalo fechado a b implica gráfico conectado",
      callout: "Próximo módulo (derivadas) usa funções contínuas em trechos.",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "Movimento", detail: "\\(s(t)\\) contínua em intervalo de tempo" },
        { label: "Produção", detail: "Fluxo sem parada no turno" },
        { label: "Teorema", detail: "Existe \\(c\\) com \\(f(c)\\) entre \\(f(a)\\) e \\(f(b)\\)" },
      ],
    },
    exemplo: {
      title: "s(t) em [0, 8]",
      situacao: "Posição contínua durante 8 horas de viagem. O que isso exclui?",
    },
    passos: {
      title: "Interpretar",
      steps: [
        { title: "Sem teleporte", detail: "Posição não salta instantaneamente." },
        { title: "Pode acelerar", detail: "Derivada pode mudar — isso é outra aula." },
        { title: "Extremos", detail: "Posição inicial e final coerentes com o percurso." },
      ],
    },
    interpretacao: {
      title: "Ponte para derivadas",
      paragraphs: [
        "Continuidade não implica suavidade (\\(|x|\\) é contínua mas tem \"quina\" em 0).",
        "Derivável \\(\\Rightarrow\\) contínua; o contrário é falso.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que contínua em intervalo implica derivável em todo ponto.",
        "Ignorar comportamento nas pontas de \\([a,b]\\).",
        "Misturar domínio máximo com intervalo pedido no problema.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "ci-g1",
          type: "compreensao",
          enunciado: "f contínua em \\([1,5]\\). O gráfico pode ter buraco em \\(x=3\\)?",
          resposta: "Não.",
          resolucao: "Buraco quebraria continuidade em 3.",
          interpretacao: "Conectado no intervalo.",
        },
        {
          id: "ci-g2",
          type: "interpretacao",
          enunciado: "Derivável em \\((a,b)\\) implica contínua em \\((a,b)\\)?",
          resposta: "Sim.",
          resolucao: "Teorema clássico: diferenciável \\(\\Rightarrow\\) contínua.",
          interpretacao: "Derivada só existe onde função não quebra.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Contínua em intervalo = contínua ponto a ponto (com cuidado nas pontas).",
        "Modelos físicos costumam assumir continuidade no tempo.",
        "Derivável é condição mais forte que contínua.",
      ],
    },
  },

  "revisao-continuidade": {
    meta: c1Meta({
      title: "Revisão: Continuidade",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "8 min",
      next: {
        slug: "variacao-media",
        moduleSlug: "derivadas",
        title: "Variação média",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Consolidar continuidade antes de derivadas evita confundir quebra com \"não derivável\".",
        "Checklist final do módulo 4.",
      ],
    },
    explicacao: {
      title: "Mapa do módulo",
      paragraphs: [
        "✓ Ideia visual e \\(\\lim_{x \\to a} f(x) = f(a)\\).",
        "✓ Buraco vs salto vs infinito (assíntota vertical).",
        "✓ Três condições em um ponto.",
        "✓ Intervalos e ligação com modelos reais.",
      ],
      formula: "Derivável ⇒ contínua ⇒ limite existe (em a)",
      formulaLatex: "\\text{Derivável} \\Rightarrow \\text{contínua} \\Rightarrow \\text{limite existe (em } a)",
      formulaAria: "derivável implica contínua implica limite existe em a",
      callout: "Próximo: taxa de variação — módulo Derivadas.",
    },
    ondeAparece: {
      title: "Conexão",
      items: [
        { label: "Limites", detail: "Tendência antes do valor" },
        { label: "Continuidade", detail: "Valor = tendência" },
        { label: "Derivada", detail: "Taxa de mudança suave (quando existe)" },
      ],
    },
    exemplo: {
      title: "Mini-desafio",
      situacao: "Classifique em \\(x = 0\\): \\(f(x)=\\frac{\\sin x}{x}\\) para \\(x \\neq 0\\), \\(f(0)=1\\); \\(g(x)=\\frac{|x|}{x}\\) para \\(x \\neq 0\\).",
    },
    passos: {
      title: "Respostas",
      steps: [
        { title: "f", detail: "lim \\(= 1\\), \\(f(0)=1\\) → contínua (clássico)." },
        { title: "g", detail: "Saltos \\(\\pm 1\\) em 0 → descontínua." },
        { title: "Próximo", detail: "Abrir Derivadas — variação média." },
      ],
    },
    interpretacao: {
      title: "Próximo módulo",
      paragraphs: [
        "Derivadas medem mudança instantânea; exigem continuidade local (e mais).",
        "Marque o progresso e revise aulas onde ainda houver dúvida.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Pular para derivadas sem dominar limite + continuidade.",
        "Decorar definição sem desenhar o gráfico.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "rc-g1",
          type: "compreensao",
          enunciado: "Liste três tipos de descontinuidade estudados.",
          resposta: "Removível (buraco), salto, infinita.",
          resolucao: "Classificação do módulo.",
          interpretacao: "Organiza revisão.",
        },
        {
          id: "rc-g2",
          type: "calculo",
          enunciado: "\\(f(x)=\\frac{x^2-9}{x-3}\\). Contínua em \\(x=3\\) se definirmos \\(f(3)=6\\)?",
          resposta: "Sim.",
          resolucao: "Limite 6; redefinição fecha o buraco.",
          interpretacao: "Descontinuidade removível.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Contínua \\(\\iff\\) limite = valor no ponto.",
        "Buraco, salto, infinita — três perfis de quebra.",
        "Intervalo conectado para teoremas e modelos.",
        "Próximo: módulo Derivadas com sentido.",
      ],
    },
  },
};
