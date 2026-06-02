import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "preparacao-limites";
const MOD_TITLE = "Preparação para limites";

export const preparacaoLimitesAulas: Record<string, AulaContent> = {
  "ideia-aproximacao": {
    meta: preMeta({
      title: "Ideia de aproximação: chegar perto sem precisar tocar",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "11 min",
      readingNotes: ["Aproximar-se de um valor", "A intuição antes do limite"],
      glossaryTerms: ["Aproximação", "Tendência", "Valor-alvo"],
      next: { slug: "comportamento-funcoes", title: "Comportamento de funções" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Toda a base do cálculo está numa ideia simples: o que acontece quando você chega bem perto de um valor, sem necessariamente chegar nele?",
        "Você já faz isso na vida: ao estacionar, encosta o carro cada vez mais perto da guia; ao ajustar o forno, vai chegando perto da temperatura certa. Aproximar-se é natural.",
        "Entender aproximação agora deixa o conceito de limite (no Cálculo 1) parecer óbvio em vez de assustador.",
      ],
    },
    explicacao: {
      title: "Chegar perto é diferente de chegar lá",
      paragraphs: [
        "Aproximar-se de um número significa assumir valores cada vez mais próximos dele: \\(1{,}9\\) — \\(1{,}99\\) — \\(1{,}999\\) — e assim por diante, encostando em 2 sem nunca colar.",
        "O que importa não é o valor final, e sim para onde a sequência está indo. Esse \"para onde está indo\" é a semente da ideia de limite.",
      ],
      callout:
        "Aproximação é olhar para onde os valores estão indo, não onde eles param.",
      formula: "1,9 → 1,99 → 1,999 → ... → 2",
      formulaLatex: "1{,}9 \\to 1{,}99 \\to 1{,}999 \\to \\cdots \\to 2",
      formulaAria: "um vírgula nove, um vírgula noventa e nove, um vírgula novecentos e noventa e nove, tendendo a dois",
      formulaLegend: "os valores se aproximam de 2 sem precisar alcançá-lo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Estacionar", detail: "encostar cada vez mais perto da guia" },
        { label: "Forno e ar", detail: "chegar perto da temperatura desejada" },
        { label: "GPS", detail: "estimativa que melhora ao se aproximar" },
        { label: "Zoom de mapa", detail: "detalhe que aparece ao aproximar" },
        { label: "Engenharia", detail: "tolerâncias e margens" },
        { label: "Cálculo", detail: "a base da ideia de limite" },
      ],
    },
    exemplo: {
      title: "Aproximando-se de 2",
      situacao:
        "Observe a sequência \\(1{,}9\\) — \\(1{,}99\\) — \\(1{,}999\\) — \\(1{,}9999\\). De qual número ela está se aproximando, e ela chega exatamente nele?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Olhar o padrão",
          detail: "Cada termo tem mais um 9: a parte inteira é 1 e a decimal cresce em direção a 1.",
        },
        {
          title: "Estimar o alvo",
          detail: "Os valores ficam cada vez mais perto de 2, mas sempre um pouquinho abaixo.",
        },
        {
          title: "Medir a distância até 2",
          detail: "\\(2 - 1{,}9 = 0{,}1\\); \\(2 - 1{,}99 = 0{,}01\\); \\(2 - 1{,}999 = 0{,}001\\). A distância encolhe.",
        },
        {
          title: "Concluir o destino",
          detail: "A sequência tende a 2: a distância pode ficar tão pequena quanto quisermos.",
        },
        {
          title: "Responder se chega",
          detail: "Nenhum termo é exatamente 2, mas o destino (a tendência) é 2.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A sequência \"aponta\" para 2 mesmo sem tocar em 2. No cálculo, dizemos que o limite é 2 — o destino para onde tudo converge.",
        "Essa diferença entre \"o valor para onde vai\" e \"o valor que assume\" é exatamente o que torna o cálculo poderoso: ele estuda o destino, não só a parada.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que aproximar-se obriga a alcançar o valor.",
        "Confundir o último termo da lista com o destino da sequência.",
        "Olhar só um termo em vez do padrão inteiro.",
        "Pensar que a distância chega a zero de fato (ela só encolhe sem parar).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "A sequência \\(2{,}9\\) — \\(2{,}99\\) — \\(2{,}999\\) se aproxima de qual número?",
          identificar: "Veja para onde os valores caminham.",
          dica: "Some mais um 9 mentalmente.",
          resolucao: "Os valores encostam em 3 por baixo: tende a 3.",
          resposta: "\\(3\\)",
          interpretacao: "O destino é 3, mesmo sem nenhum termo ser 3.",
          erroComum: "Responder \\(2{,}999\\) (um termo, não o destino).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Qual a distância entre \\(4{,}99\\) e 5?",
          identificar: "Subtraia os dois valores.",
          dica: "\\(5 - 4{,}99\\).",
          resolucao: "\\(5 - 4{,}99 = 0{,}01\\).",
          resposta: "\\(0{,}01\\)",
          interpretacao: "A distância pequena mostra que 4,99 já está bem perto de 5.",
          erroComum: "Calcular \\(4{,}99 - 5\\) e esquecer o sinal/contexto.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que estudar 'para onde vai' em vez de 'onde para'?",
          identificar: "Pense em casos onde o valor exato não existe.",
          dica: "Às vezes a função nem está definida no ponto.",
          resolucao: "Porque muitas situações têm comportamento claro perto de um ponto, mesmo sem valor exato nele.",
          resposta: "Porque o destino existe mesmo quando o ponto exato falha",
          interpretacao: "É o que permite o cálculo lidar com taxas instantâneas.",
          erroComum: "Achar que só importa o valor final.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a ideia de aproximação e tendência no banco de exercícios.",
      exerciseIds: ["prep-ap-01", "prep-ap-02"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Aproximar-se é assumir valores cada vez mais próximos de um alvo.",
        "O que importa é o destino, não onde a lista para.",
        "A distância até o alvo encolhe sem parar.",
        "Essa ideia é a base do limite no Cálculo 1.",
      ],
    },
  },

  "comportamento-funcoes": {
    meta: preMeta({
      title: "Comportamento de funções: o que ela faz perto de um ponto",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "12 min",
      readingNotes: ["Função perto de um ponto", "Crescer, decrescer, estabilizar"],
      glossaryTerms: ["Comportamento", "Vizinhança", "Função"],
      next: { slug: "valores-proximos", title: "Valores próximos de um ponto" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Antes de calcular qualquer coisa, vale a pergunta: o que essa função está fazendo aqui perto? Está subindo, descendo, se acalmando, disparando?",
        "Ler o comportamento de uma função é como ler o ritmo de um gráfico de batimentos ou de preços: você entende a história antes de qualquer número.",
        "Essa leitura prepara o terreno para limites, porque limite é justamente o comportamento ao chegar perto de um ponto.",
      ],
    },
    explicacao: {
      title: "Olhar a vizinhança, não só o ponto",
      paragraphs: [
        "O comportamento de uma função perto de um ponto é o que ela faz nos valores vizinhos: à esquerda e à direita daquele x.",
        "Uma função pode crescer ao se aproximar, decrescer, ou se aproximar de um valor estável. Às vezes ela faz coisas diferentes vindo da esquerda e da direita — e isso importa muito.",
      ],
      callout:
        "Comportamento = o que a função faz nos arredores de um ponto, não apenas nele.",
      formula: "x → a:  f(x) cresce, decresce ou estabiliza?",
      formulaLatex: "x \\to a: \\ f(x) \\ \\text{cresce, decresce ou estabiliza?}",
      formulaAria: "quando x tende a a, f de x cresce, decresce ou estabiliza",
      formulaLegend: "estudar o comportamento é observar f perto de a",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Preços", detail: "tendência de alta ou baixa perto de uma data" },
        { label: "Saúde", detail: "curva de febre subindo ou cedendo" },
        { label: "Velocidade", detail: "carro acelerando ou freando" },
        { label: "Clima", detail: "temperatura estabilizando ao anoitecer" },
        { label: "Reações", detail: "concentração se aproximando do equilíbrio" },
        { label: "Cálculo", detail: "preparação direta para limites" },
      ],
    },
    exemplo: {
      title: "O que \\(f(x) = x + 1\\) faz perto de \\(x = 2\\)",
      situacao:
        "Observe a função \\(f(x) = x + 1\\) com \\(x\\) se aproximando de 2 (\\(1{,}9\\); \\(1{,}99\\); \\(2{,}01\\); \\(2{,}1\\)). Para qual valor f(x) caminha?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Vir pela esquerda",
          detail: "\\(f(1{,}9) = 2{,}9\\) e \\(f(1{,}99) = 2{,}99\\): f cresce em direção a 3.",
        },
        {
          title: "Vir pela direita",
          detail: "\\(f(2{,}1) = 3{,}1\\) e \\(f(2{,}01) = 3{,}01\\): f desce em direção a 3.",
        },
        {
          title: "Comparar os dois lados",
          detail: "Os dois caminhos apontam para o mesmo valor: 3.",
        },
        {
          title: "Conferir com o ponto",
          detail: "Perto de \\(x = 2\\) a função vai para 3, e \\(f(2) = 3\\) também — aqui o destino e o valor coincidem.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Perto de \\(x = 2\\), a função aponta para 3 pelos dois lados. Esse acordo entre esquerda e direita é o que dá confiança no comportamento.",
        "Em funções mais difíceis, os dois lados podem discordar — e detectar isso cedo evita erros graves de interpretação no cálculo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Olhar só um lado (esquerda ou direita) e tirar conclusão.",
        "Confundir o valor no ponto com o comportamento ao redor.",
        "Ignorar que os dois lados podem apontar para destinos diferentes.",
        "Usar poucos valores e não enxergar o padrão.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(f(x) = 2x\\), quanto vale \\(f(2{,}99)\\)?",
          identificar: "Substitua \\(x = 2{,}99\\).",
          dica: "\\(2 \\times 2{,}99\\).",
          resolucao: "\\(f(2{,}99) = 5{,}98\\).",
          resposta: "\\(5{,}98\\)",
          interpretacao: "Perto de \\(x = 3\\), f se aproxima de 6.",
          erroComum: "Somar em vez de multiplicar.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Para \\(f(x) = x + 1\\), os dois lados perto de \\(x = 4\\) apontam para o mesmo valor?",
          identificar: "Teste \\(3{,}99\\) e \\(4{,}01\\).",
          dica: "Calcule f nos dois.",
          resolucao: "\\(f(3{,}99) = 4{,}99\\) e \\(f(4{,}01) = 5{,}01\\): ambos vão a 5.",
          resposta: "Sim, ambos vão a 5",
          interpretacao: "O comportamento é consistente nos dois lados.",
          erroComum: "Comparar só com \\(f(4)\\) sem olhar os lados.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que olhar a vizinhança e não só o ponto?",
          identificar: "Pense em buracos no gráfico.",
          dica: "Às vezes o ponto não existe, mas a vizinhança sim.",
          resolucao: "Porque a vizinhança revela a tendência mesmo quando o ponto está indefinido ou é exceção.",
          resposta: "Porque a vizinhança mostra a tendência",
          interpretacao: "É exatamente o que o limite captura.",
          erroComum: "Achar que o ponto basta sempre.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a leitura do comportamento de funções no banco de exercícios.",
      exerciseIds: ["prep-ap-03", "prep-ap-04"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Comportamento é o que a função faz nos arredores de um ponto.",
        "Compare sempre os dois lados: esquerda e direita.",
        "O valor no ponto pode coincidir ou não com o destino.",
        "Ler comportamento é o ensaio para limites.",
      ],
    },
  },

  "valores-proximos": {
    meta: preMeta({
      title: "Valores próximos de um ponto: a tabela que revela o destino",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "10 min",
      readingNotes: ["Tabela de aproximação", "Esquerda e direita"],
      glossaryTerms: ["Tabela", "Aproximação lateral", "Destino"],
      next: { slug: "ideia-tendencia", title: "Ideia de tendência" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quando não dá para ver o destino de cara, monta-se uma tabela: testam-se valores cada vez mais perto e observa-se para onde a função aponta.",
        "É a mesma lógica de cercar uma resposta por tentativas — algo que você já faz ao ajustar um chuveiro ou afinar um instrumento.",
        "Essa tabela é a ferramenta concreta que transforma a intuição de aproximação em números que você pode conferir.",
      ],
    },
    explicacao: {
      title: "Cercar o ponto pelos dois lados",
      paragraphs: [
        "Escolha valores que se aproximam do ponto pela esquerda (menores) e pela direita (maiores), cada vez mais perto, e calcule f em cada um.",
        "Se as duas colunas convergem para o mesmo número, esse número é o destino. Se discordam, a função não tem um destino único ali.",
      ],
      callout:
        "Aproxime pela esquerda e pela direita. Se as duas colunas concordam, achou o destino.",
      formula: "x → a⁻ e x → a⁺ ⇒ mesmo valor?",
      formulaLatex: "x \\to a^- \\ \\text{e}\\ x \\to a^+ \\Rightarrow \\text{mesmo valor?}",
      formulaAria: "x tendendo a a pela esquerda e pela direita levam ao mesmo valor?",
      formulaLegend: "as duas aproximações laterais precisam concordar",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Calibração", detail: "ajustar instrumentos por tentativa" },
        { label: "Computação", detail: "métodos numéricos por aproximação" },
        { label: "Finanças", detail: "estimar valor perto de uma data" },
        { label: "Física", detail: "medir grandezas em torno de um ponto" },
        { label: "Estatística", detail: "convergência de médias" },
        { label: "Cálculo", detail: "tabela que sugere o limite" },
      ],
    },
    exemplo: {
      title: "Tabela perto de x = 3",
      situacao:
        "Para \\(f(x) = x^2\\), complete a aproximação por valores próximos de \\(x = 3\\) e diga para onde f(x) caminha.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Aproximar pela esquerda",
          detail: "\\(f(2{,}9) = 8{,}41\\) e \\(f(2{,}99) = 8{,}9401\\): sobe em direção a 9.",
        },
        {
          title: "Aproximar pela direita",
          detail: "\\(f(3{,}1) = 9{,}61\\) e \\(f(3{,}01) = 9{,}0601\\): desce em direção a 9.",
        },
        {
          title: "Comparar as colunas",
          detail: "Esquerda e direita apontam para o mesmo número: 9.",
        },
        {
          title: "Ler o destino e conferir",
          detail: "Os valores próximos de \\(x = 3\\) levam f(x) a 9, e \\(f(3) = 9\\) confirma.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A tabela mostrou, com números, que f(x) caminha para 9 perto de \\(x = 3\\). A intuição virou evidência conferível.",
        "Quando você não consegue calcular direto no ponto, essa tabela é a saída honesta: ela revela o destino sem precisar tocar nele.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Testar valores longe demais do ponto.",
        "Usar só um lado da tabela.",
        "Arredondar cedo demais e perder o padrão.",
        "Confundir o destino com o valor que você já sabia no ponto.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(f(x) = x^2\\), quanto vale \\(f(1{,}99)\\)?",
          identificar: "Eleve 1,99 ao quadrado.",
          dica: "\\(1{,}99 \\times 1{,}99\\).",
          resolucao: "\\(f(1{,}99) = 3{,}9601\\).",
          resposta: "\\(3{,}9601\\)",
          interpretacao: "Perto de \\(x = 2\\), f se aproxima de 4.",
          erroComum: "Calcular \\(2^2\\) direto e ignorar a aproximação.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "As colunas de uma tabela apontam 5 pela esquerda e 7 pela direita. Há um destino único?",
          identificar: "Compare os dois lados.",
          dica: "Eles concordam?",
          resolucao: "Não: como os lados discordam, não há destino único.",
          resposta: "Não, pois os lados discordam",
          interpretacao: "A função pode ter um salto nesse ponto.",
          erroComum: "Escolher uma das colunas como resposta.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que aproximar pelos dois lados em vez de um só?",
          identificar: "Pense em saltos e quinas.",
          dica: "Um lado pode esconder discordância.",
          resolucao: "Porque só checando os dois lados garantimos que o destino é o mesmo.",
          resposta: "Para garantir que os dois lados concordam",
          interpretacao: "Evita concluir um destino que não existe.",
          erroComum: "Confiar só na aproximação pela direita.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique tabelas de valores próximos no banco de exercícios.",
      exerciseIds: ["prep-ap-05", "prep-ap-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Monte uma tabela com valores próximos do ponto.",
        "Aproxime pela esquerda e pela direita.",
        "Colunas que concordam revelam o destino.",
        "É a ferramenta numérica que antecede o limite.",
      ],
    },
  },

  "ideia-tendencia": {
    meta: preMeta({
      title: "Ideia de tendência: para onde a função aponta",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "11 min",
      readingNotes: ["Tendência como destino", "Quando o ponto falha"],
      glossaryTerms: ["Tendência", "Indefinição", "Buraco no gráfico"],
      next: { slug: "interpretacao-grafica", title: "Interpretação gráfica" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Tendência é a palavra-chave: para onde a função aponta quando x chega perto de um ponto, mesmo que no ponto exato algo dê errado.",
        "É como prever onde uma bola vai cair olhando a trajetória, ainda que você não veja o instante exato do toque no chão.",
        "Aqui a ideia de aproximação ganha nome próprio e vira o conceito que, no Cálculo 1, será chamado de limite.",
      ],
    },
    explicacao: {
      title: "O destino existe mesmo sem o ponto",
      paragraphs: [
        "A tendência é o valor para onde \\(f(x)\\) aponta conforme \\(x\\) se aproxima de \\(a\\). Esse destino pode existir mesmo que \\(f(a)\\) não exista ou seja diferente.",
        "Um caso clássico: uma função com um \"buraco\" em \\(x = a\\). Substituir dá uma indefinição (como \\(\\frac{0}{0}\\)), mas a tabela mostra claramente para onde tudo aponta.",
      ],
      callout:
        "Tendência é o destino apontado pela função — independente do que acontece no ponto exato.",
      formula: "f(x) → L  quando  x → a",
      formulaLatex: "f(x) \\to L \\ \\text{quando} \\ x \\to a",
      formulaAria: "f de x tende a L quando x tende a a",
      formulaLegend: "L é a tendência: o destino de f perto de a",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Esportes", detail: "prever a trajetória de uma bola" },
        { label: "Economia", detail: "tendência de um indicador" },
        { label: "Medicina", detail: "evolução esperada de um exame" },
        { label: "Engenharia", detail: "comportamento-limite de um material" },
        { label: "Computação", detail: "convergência de algoritmos" },
        { label: "Cálculo", detail: "é a definição intuitiva de limite" },
      ],
    },
    exemplo: {
      title: "Um buraco em x = 1",
      situacao:
        "A função \\(f(x) = \\frac{x^2 - 1}{x - 1}\\) não está definida em \\(x = 1\\) (dá \\(\\frac{0}{0}\\)). Para onde ela tende quando \\(x\\) se aproxima de 1?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer o problema no ponto",
          detail: "Em \\(x = 1\\), numerador e denominador zeram: \\(\\frac{0}{0}\\), indefinido.",
        },
        {
          title: "Aproximar pela esquerda",
          detail: "\\(f(0{,}9) = \\frac{0{,}81 - 1}{0{,}9 - 1} = \\frac{-0{,}19}{-0{,}1} = 1{,}9\\).",
        },
        {
          title: "Aproximar pela direita",
          detail: "\\(f(1{,}1) = \\frac{1{,}21 - 1}{1{,}1 - 1} = \\frac{0{,}21}{0{,}1} = 2{,}1\\).",
        },
        {
          title: "Ver a tendência e concluir",
          detail: "À medida que \\(x \\to 1\\), os valores cercam 2 pelos dois lados: a função tende a 2, mesmo sem existir em \\(x = 1\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Há um buraco no gráfico em \\(x = 1\\), mas a tendência é clara: 2. A função aponta para 2 vindo dos dois lados.",
        "Esse é o coração do cálculo: estudar o destino mesmo quando o ponto falha. É o que permite calcular velocidades instantâneas e inclinações exatas adiante.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Concluir que a tendência não existe só porque o ponto é indefinido.",
        "Parar no \\(\\frac{0}{0}\\) sem investigar a vizinhança.",
        "Olhar um lado só.",
        "Confundir o buraco (ponto ausente) com a tendência (destino).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Na função do exemplo, quanto vale \\(f(0{,}99)\\)?",
          identificar: "Substitua \\(x = 0{,}99\\).",
          dica: "\\(\\frac{0{,}99^2 - 1}{0{,}99 - 1}\\).",
          resolucao: "\\(f(0{,}99) = \\frac{0{,}9801 - 1}{-0{,}01} = \\frac{-0{,}0199}{-0{,}01} = 1{,}99\\).",
          resposta: "\\(1{,}99\\)",
          interpretacao: "Cada vez mais perto de 2.",
          erroComum: "Errar o sinal no denominador.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Uma função dá \\(\\frac{0}{0}\\) num ponto. Isso significa que ela não tem tendência ali?",
          identificar: "Lembre que \\(\\frac{0}{0}\\) é indeterminação.",
          dica: "A tabela pode revelar o destino.",
          resolucao: "Não: \\(\\frac{0}{0}\\) é indeterminação; a vizinhança pode apontar para um valor bem definido.",
          resposta: "Não, a tendência pode existir",
          interpretacao: "Indeterminação no ponto não impede tendência.",
          erroComum: "Concluir que não há resposta.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Qual o nome que o cálculo dá para essa 'tendência'?",
          identificar: "É o conceito central do Cálculo 1.",
          dica: "Começa com 'li'.",
          resolucao: "Limite.",
          resposta: "Limite",
          interpretacao: "Você já entende a ideia antes do nome técnico.",
          erroComum: "Chamar de derivada (vem depois).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a ideia de tendência e indeterminações no banco de exercícios.",
      exerciseIds: ["prep-ap-07", "prep-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Tendência é o destino apontado pela função perto de um ponto.",
        "Pode existir mesmo quando o ponto é indefinido (\\(\\frac{0}{0}\\)).",
        "Sempre confira os dois lados.",
        "Essa ideia é o limite do Cálculo 1.",
      ],
    },
  },

  "interpretacao-grafica": {
    meta: preMeta({
      title: "Interpretação gráfica: enxergar a tendência no desenho",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "10 min",
      readingNotes: ["Ler tendência no gráfico", "Buracos e saltos"],
      glossaryTerms: ["Gráfico", "Ponto aberto", "Salto"],
      next: { slug: "velocidade-tendencia", title: "Velocidade e tendência" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Um gráfico conta a história da tendência num relance: dá para ver para onde a curva aponta antes de calcular qualquer número.",
        "Quem aprende a ler isso visualmente entende limites muito mais rápido — o olho percebe o destino que a tabela só sugere.",
        "Aqui você junta a aproximação numérica com a leitura do desenho, fechando a intuição.",
      ],
    },
    explicacao: {
      title: "Seguir a curva com o dedo",
      paragraphs: [
        "Para ver a tendência num gráfico, siga a curva com o dedo aproximando-se do x desejado, pela esquerda e pela direita, e veja em que altura (y) os dois caminhos se encontram.",
        "Um ponto aberto (bolinha vazia) marca um buraco: a curva aponta para aquela altura, mas não a assume. Um salto mostra que os dois lados vão para alturas diferentes — sem tendência única.",
      ],
      callout:
        "Siga a curva pelos dois lados. A altura onde elas se encontram é a tendência.",
      formula: "esquerda → mesma altura ← direita",
      formulaLatex: "\\text{esquerda} \\to \\text{mesma altura} \\leftarrow \\text{direita}",
      formulaAria: "esquerda e direita encontrando-se na mesma altura",
      formulaLegend: "a tendência é a altura comum aos dois lados da curva",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Painéis", detail: "ler tendência de um indicador no gráfico" },
        { label: "Saúde", detail: "curva de monitor apontando um valor" },
        { label: "Mercado", detail: "tendência visual de um preço" },
        { label: "Engenharia", detail: "leitura de curvas de resposta" },
        { label: "Ciência", detail: "extrapolar comportamento de dados" },
        { label: "Cálculo", detail: "interpretar limites no gráfico" },
      ],
    },
    exemplo: {
      title: "Curva com ponto aberto",
      situacao:
        "Um gráfico mostra uma reta passando por \\(y = 4\\) em \\(x = 2\\), mas com uma bolinha aberta exatamente nesse ponto. Qual a tendência de \\(f(x)\\) quando \\(x \\to 2\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Aproximar pela esquerda",
          detail: "Seguindo a reta por valores \\(< 2\\), a curva sobe rumo à altura 4.",
        },
        {
          title: "Aproximar pela direita",
          detail: "Seguindo por valores \\(> 2\\), a curva desce rumo à mesma altura 4.",
        },
        {
          title: "Encontrar a altura comum",
          detail: "Os dois lados miram \\(y = 4\\).",
        },
        {
          title: "Interpretar a bolinha aberta e concluir",
          detail: "O ponto aberto diz que \\(f(2)\\) não vale 4 (ou não existe), mas a tendência quando \\(x \\to 2\\) é 4, apesar do buraco.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O gráfico mostra de imediato o que a tabela demoraria a sugerir: a curva aponta para 4, mesmo com o ponto aberto.",
        "Distinguir 'para onde aponta' de 'o que vale no ponto' é o que o olho treinado faz num segundo — e é exatamente a leitura de limite no cálculo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir o ponto aberto (sem valor) com a tendência.",
        "Ler só um lado da curva.",
        "Achar que salto (lados diferentes) tem tendência única.",
        "Ignorar a escala dos eixos ao estimar a altura.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Num gráfico, o que significa uma bolinha aberta sobre um ponto?",
          identificar: "Pense em valor ausente.",
          dica: "Aberta = não incluído.",
          resolucao: "Que a função não assume aquele valor ali (ponto excluído), embora a curva aponte para ele.",
          resposta: "O ponto não está incluído",
          interpretacao: "A tendência pode ser aquela altura mesmo assim.",
          erroComum: "Ler como se o valor existisse normalmente.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "A curva vai a 3 pela esquerda e a 6 pela direita. Há tendência única?",
          identificar: "Compare as alturas.",
          dica: "Elas coincidem?",
          resolucao: "Não: lados em alturas diferentes indicam um salto, sem tendência única.",
          resposta: "Não, há um salto",
          interpretacao: "A função pula de 3 para 6 nesse ponto.",
          erroComum: "Escolher uma das alturas.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Como ler a tendência num gráfico?",
          identificar: "Use os dois lados.",
          dica: "Siga a curva com o dedo.",
          resolucao: "Aproxime-se do x pelos dois lados e veja em que altura comum a curva aponta.",
          resposta: "Seguindo a curva pelos dois lados até a altura comum",
          interpretacao: "É a versão visual da tabela de aproximação.",
          erroComum: "Olhar só o valor marcado no ponto.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a leitura gráfica de tendências no banco de exercícios.",
      exerciseIds: ["prep-ap-09", "prep-ap-10"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Siga a curva pelos dois lados até a altura comum.",
        "Ponto aberto marca buraco: a curva aponta, mas não assume.",
        "Salto (lados diferentes) significa sem tendência única.",
        "É a leitura visual do limite.",
      ],
    },
  },

  "velocidade-tendencia": {
    meta: preMeta({
      title: "Velocidade e tendência: o primeiro passo rumo ao cálculo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "9 min",
      readingNotes: ["Velocidade média vs instantânea", "Ponte para o Cálculo 1"],
      glossaryTerms: ["Velocidade média", "Velocidade instantânea", "Taxa"],
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Velocidade instantânea — a que aparece no velocímetro neste exato segundo — é, no fundo, uma tendência. E é o exemplo que originou o cálculo.",
        "Como medir a velocidade num único instante, se velocidade é distância dividida por tempo e um instante tem tempo zero? A resposta usa tudo que você viu neste módulo.",
        "Esta aula amarra aproximação, tendência e gráfico no problema que abre as portas do Cálculo 1.",
      ],
    },
    explicacao: {
      title: "Da média ao instante",
      paragraphs: [
        "A velocidade média num intervalo é a distância percorrida dividida pelo tempo gasto. Mas isso é a média do trecho, não a velocidade exata num ponto.",
        "Para achar a velocidade instantânea, calculamos a média em intervalos cada vez menores em torno do instante. O destino dessas médias — a tendência — é a velocidade instantânea.",
      ],
      callout:
        "Velocidade instantânea = tendência das velocidades médias quando o intervalo de tempo encolhe a zero.",
      formula: "v_inst = tendência de (Δs / Δt)  quando  Δt → 0",
      formulaLatex: "v_{\\text{inst}} = \\text{tendência de } \\frac{\\Delta s}{\\Delta t} \\ \\text{quando} \\ \\Delta t \\to 0",
      formulaAria: "velocidade instantânea é a tendência de delta s sobre delta t quando delta t tende a zero",
      formulaLegend: "intervalos cada vez menores revelam a velocidade no instante",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Velocímetro", detail: "a velocidade do instante atual" },
        { label: "Esportes", detail: "velocidade de pico de um atleta" },
        { label: "Engenharia", detail: "taxa de variação em um ponto" },
        { label: "Finanças", detail: "variação instantânea de um preço" },
        { label: "Física", detail: "aceleração e taxas instantâneas" },
        { label: "Cálculo", detail: "é literalmente a definição de derivada" },
      ],
    },
    exemplo: {
      title: "Velocidade perto de t = 2 s",
      situacao:
        "Um objeto percorre \\(s(t) = t^2\\) metros. Estime a velocidade instantânea em \\(t = 2\\) s usando intervalos cada vez menores.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Velocidade média de 2 a 3 s",
          detail: "\\(\\frac{s(3) - s(2)}{3 - 2} = \\frac{9 - 4}{1} = 5\\) m/s.",
        },
        {
          title: "Encolher: de 2 a 2,1 s",
          detail: "\\(\\frac{s(2{,}1) - s(2)}{0{,}1} = \\frac{4{,}41 - 4}{0{,}1} = 4{,}1\\) m/s.",
        },
        {
          title: "Encolher mais: de 2 a 2,01 s",
          detail: "\\(\\frac{s(2{,}01) - s(2)}{0{,}01} = \\frac{4{,}0401 - 4}{0{,}01} = 4{,}01\\) m/s.",
        },
        {
          title: "Ver a tendência e concluir",
          detail: "\\(5 \\to 4{,}1 \\to 4{,}01\\): as médias caminham para 4 m/s, então a velocidade instantânea em \\(t = 2\\) s tende a 4 m/s.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A velocidade no instante \\(t = 2\\) s é 4 m/s — o destino das velocidades médias quando o intervalo encolhe. Você acabou de fazer, na mão, o que o cálculo chama de derivada.",
        "Esse é o ponto de chegada do Pré-Cálculo e o ponto de partida do Cálculo 1: tendência aplicada à taxa de variação. Você já tem a intuição completa para começar limites e derivadas de verdade.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir velocidade média (do trecho) com instantânea (do ponto).",
        "Parar num intervalo grande e achar que já é a resposta.",
        "Dividir distância por tempo errado (trocar \\(\\Delta s\\) e \\(\\Delta t\\)).",
        "Tentar usar \\(\\Delta t = 0\\) diretamente (dá \\(\\frac{0}{0}\\)).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Para \\(s(t) = t^2\\), qual a velocidade média entre \\(t = 2\\) e \\(t = 2{,}001\\) s?",
          identificar: "\\(\\frac{s(2{,}001) - s(2)}{0{,}001}\\).",
          dica: "\\(s(2{,}001) = 4{,}004001\\).",
          resolucao: "\\(\\frac{4{,}004001 - 4}{0{,}001} = 4{,}001\\) m/s.",
          resposta: "4,001 m/s",
          interpretacao: "Cada vez mais perto de 4 m/s.",
          erroComum: "Errar o quadrado de \\(2{,}001\\).",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Por que não calculamos a velocidade instantânea com \\(\\Delta t = 0\\) direto?",
          identificar: "Pense na divisão.",
          dica: "\\(\\frac{\\Delta s}{\\Delta t}\\) com \\(\\Delta t = 0\\).",
          resolucao: "Porque daria \\(\\frac{0}{0}\\), uma indeterminação; usamos a tendência com \\(\\Delta t\\) encolhendo.",
          resposta: "Porque daria \\(\\frac{0}{0}\\)",
          interpretacao: "É exatamente o problema que o limite resolve.",
          erroComum: "Achar que basta colocar zero.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Como o cálculo chama a velocidade instantânea de s(t)?",
          identificar: "É a taxa de variação no ponto.",
          dica: "Começa com 'deri'.",
          resolucao: "Derivada de s em relação ao tempo.",
          resposta: "Derivada",
          interpretacao: "Você chegou à porta do Cálculo 1.",
          erroComum: "Chamar de integral (é o oposto).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique velocidade média, instantânea e tendência no banco de exercícios.",
      exerciseIds: ["prep-ap-11", "prep-ap-12"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Velocidade instantânea é a tendência das velocidades médias.",
        "Encolha o intervalo de tempo e veja para onde a média aponta.",
        "\\(\\Delta t = 0\\) daria \\(\\frac{0}{0}\\) — por isso usamos tendência.",
        "Esse é o salto para limites e derivadas no Cálculo 1.",
      ],
    },
  },
};
