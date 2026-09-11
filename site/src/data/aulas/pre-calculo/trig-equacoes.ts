import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

/**
 * Equações trigonométricas — a pergunta ao contrário.
 *
 * O módulo ensinava a calcular \(\sin 30^\circ\), mas nunca a responder "que
 * ângulo tem seno \(\frac{1}{2}\)?". Nenhuma aula e nenhum exercício do banco
 * resolvia \(\sin x = a\). É a habilidade que trava, mais adiante, quem precisa
 * achar pontos críticos de funções com seno e cosseno.
 *
 * As duas aulas vêm depois dos gráficos porque usam as duas leituras: o ponto
 * no círculo (quantas soluções por volta) e a onda (por que elas se repetem).
 * Os exemplos ficam em graus, como no resto do módulo, e a solução geral
 * aparece também em radianos, que é como o Cálculo vai cobrá-la.
 */

const MOD = "trigonometria";
const MOD_TITLE = "Trigonometria básica";

export const trigEquacoesAulas: Record<string, AulaContent> = {
  "equacoes-trigonometricas": {
    meta: {
      ...preMeta({
        title: "Equações trigonométricas: que ângulo tem esse seno?",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 8,
        duration: "15 min",
        readingNotes: ["Duas soluções por volta", "Some voltas inteiras para ter todas"],
        glossaryTerms: ["Cosseno", "Período"],
        next: { slug: "equacoes-trigonometricas-passos", title: "Equações trigonométricas com mais passos" },
      }),
      prereqs: [
        { label: "Ciclo trigonométrico", href: "/pre-calculo/trigonometria/ciclo-trigonometrico" },
        { label: "Graus e radianos", href: "/pre-calculo/trigonometria/graus-e-radianos" },
      ],
      usedIn: [
        {
          label: "Equações com mais passos",
          href: "/pre-calculo/trigonometria/equacoes-trigonometricas-passos",
          detail: "sen 2x, seno ao quadrado e sen x = cos x",
        },
        {
          label: "Pontos críticos",
          href: "/calculo-1/aplicacoes-derivadas/pontos-criticos",
          detail: "f′(x) = 0 com seno e cosseno vira uma equação desta aula",
        },
        {
          label: "Ondas e movimento circular",
          href: "/pre-calculo/trigonometria/ondas-movimento",
          detail: "em que instante a cadeira da roda-gigante chega a uma altura",
        },
      ],
    },
    plot: "seno-igual-meio-ciclo",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Até aqui a pergunta foi sempre a mesma: dado o ângulo, quanto vale o seno? \\(\\sin 30^\\circ = \\frac{1}{2}\\). Esta aula faz a pergunta ao contrário: dado o seno, qual é o ângulo?",
        "Ela aparece sempre que algo oscila e você quer saber quando. Em que instante a cadeira da roda-gigante está a certa altura? Em que momento a tensão da tomada atinge um valor? Em Cálculo, onde a derivada de uma função com seno se anula?",
        "E a resposta tem uma surpresa: quase nunca é um ângulo só. Entender por que é a parte mais importante da aula.",
      ],
    },
    explicacao: {
      title: "A altura no círculo aparece duas vezes por volta",
      paragraphs: [
        "No ciclo trigonométrico, o seno é a altura do ponto. Então resolver \\(\\sin x = a\\) é perguntar: em que pontos do círculo a altura é \\(a\\)?",
        "Uma reta horizontal na altura \\(a\\), com \\(-1 < a < 1\\), corta o círculo em **dois** pontos, simétricos em relação ao eixo vertical. Se um deles é o ângulo \\(\\theta\\), o outro é \\(180^\\circ - \\theta\\). Para o cosseno, que é a coordenada \\(x\\), a reta é vertical e os dois pontos são simétricos em relação ao eixo horizontal: \\(\\theta\\) e \\(-\\theta\\), isto é, \\(360^\\circ - \\theta\\).",
        "Como o ponto volta ao mesmo lugar a cada volta, somar \\(360^\\circ\\) não muda nada. Cada solução dentro de uma volta gera infinitas outras: \\(x + k \\cdot 360^\\circ\\), ou \\(x + 2k\\pi\\) em radianos, com \\(k\\) inteiro. Se o enunciado pede um intervalo, fique só com as que caem nele. A tangente repete a cada \\(180^\\circ\\), então \\(\\tan x = a\\) tem uma solução por meia volta.",
      ],
      alternativa: [
        "Pense numa roda-gigante de raio \\(1\\) e numa régua horizontal na altura \\(a\\). Durante uma volta, a cadeira passa por essa altura duas vezes: uma subindo, outra descendo. Esses dois momentos são as duas soluções.",
        "E a roda não para. A cada volta completa, a cadeira passa pela mesma altura mais duas vezes — é isso que o \\(+\\,k \\cdot 360^\\circ\\) registra.",
      ],
      callout:
        "Seno: \\(\\theta\\) e \\(180^\\circ - \\theta\\). Cosseno: \\(\\theta\\) e \\(360^\\circ - \\theta\\). Depois some \\(k \\cdot 360^\\circ\\) (ou \\(2k\\pi\\)) para ter todas.",
      formula: "sen x = a ⟹ x = θ + k·360° ou x = 180° − θ + k·360°;  cos x = a ⟹ x = ±θ + k·360°",
      formulaLatex:
        "\\begin{aligned} \\sin x = a &\\;\\Longrightarrow\\; x = \\theta + k \\cdot 360^\\circ \\\\ &\\;\\phantom{\\Longrightarrow}\\; \\text{ou } x = 180^\\circ - \\theta + k \\cdot 360^\\circ \\\\ \\cos x = a &\\;\\Longrightarrow\\; x = \\pm\\theta + k \\cdot 360^\\circ \\end{aligned}",
      formulaAria:
        "se seno de x é igual a a, então x é igual a teta mais k vezes 360 graus, ou x é igual a 180 graus menos teta mais k vezes 360 graus; se cosseno de x é igual a a, então x é igual a mais ou menos teta mais k vezes 360 graus",
      formulaLegend: "θ é um ângulo com o seno (ou cosseno) igual a a; k é qualquer inteiro; em radianos, 360° vira 2π",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Cálculo", detail: "pontos críticos de funções com seno e cosseno" },
        { label: "Roda-gigante", detail: "quando a cadeira está a certa altura" },
        { label: "Eletricidade", detail: "instantes em que a tensão alternada atinge um valor" },
        { label: "Física", detail: "quando uma mola passa por certa posição" },
        { label: "Astronomia", detail: "dias do ano com certa duração de luz solar" },
        { label: "Engenharia", detail: "ângulos de braços robóticos e mecanismos" },
      ],
    },
    exemplo: {
      title: "Onde o seno vale 1/2",
      situacao: "Resolva \\(\\sin x = \\frac{1}{2}\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Achar um ângulo de referência",
          detail: "Da tabela de ângulos notáveis, \\(\\sin 30^\\circ = \\frac{1}{2}\\). Então \\(x = 30^\\circ\\) é uma solução.",
        },
        {
          title: "Procurar a outra metade da volta",
          detail:
            "O seno também é positivo no 2º quadrante. A reta \\(y = \\frac{1}{2}\\) corta o círculo de novo no ponto simétrico: \\(180^\\circ - 30^\\circ = 150^\\circ\\).",
        },
        {
          title: "Conferir",
          detail: "\\(\\sin 150^\\circ = \\sin 30^\\circ = \\frac{1}{2}\\). As duas estão dentro do intervalo pedido.",
        },
        {
          title: "Responder, e escrever em radianos",
          detail: "\\(x = 30^\\circ\\) ou \\(x = 150^\\circ\\). Em radianos, \\(x = \\frac{\\pi}{6}\\) ou \\(x = \\frac{5\\pi}{6}\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "No círculo acima, a linha da altura \\(\\frac{1}{2}\\) encontra o círculo em dois pontos, e cada raio faz \\(30^\\circ\\) com o seu lado do eixo horizontal. É por isso que a segunda solução é \\(180^\\circ - 30^\\circ\\), e não \\(30^\\circ + 90^\\circ\\) ou qualquer outro palpite.",
        "Sem o intervalo, as soluções seriam infinitas: \\(x = 30^\\circ + k \\cdot 360^\\circ\\) ou \\(x = 150^\\circ + k \\cdot 360^\\circ\\). Em radianos, \\(x = \\frac{\\pi}{6} + 2k\\pi\\) ou \\(x = \\frac{5\\pi}{6} + 2k\\pi\\) — é assim que o Cálculo vai pedir.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Parar na primeira solução (\\(30^\\circ\\)) e esquecer a simétrica (\\(150^\\circ\\)).",
        "Trocar as simetrias: \\(180^\\circ - \\theta\\) é a do seno; \\(360^\\circ - \\theta\\) é a do cosseno. \\(\\sin 330^\\circ = -\\frac{1}{2}\\), não \\(\\frac{1}{2}\\).",
        "Tentar resolver \\(\\sin x = 2\\). O seno nunca passa de \\(1\\), então não há solução.",
        "Esquecer o \\(+\\,k \\cdot 360^\\circ\\) quando o enunciado não limita o intervalo.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(\\cos x = \\frac{1}{2}\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
          identificar: "\\(\\cos 60^\\circ = \\frac{1}{2}\\).",
          dica: "Para o cosseno, a solução simétrica é \\(360^\\circ - \\theta\\).",
          resolucao:
            "O ângulo de referência é \\(60^\\circ\\). O cosseno é positivo no 1º e no 4º quadrantes: \\(x = 60^\\circ\\) e \\(x = 360^\\circ - 60^\\circ = 300^\\circ\\).",
          resposta: "x = 60° ou x = 300°",
          interpretacao:
            "No círculo, a reta vertical \\(x = \\frac{1}{2}\\) corta em dois pontos, um acima e outro abaixo do eixo horizontal.",
          erroComum: "Responder \\(60^\\circ\\) e \\(120^\\circ\\), usando a simetria do seno.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(\\sin x = -\\frac{\\sqrt{2}}{2}\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
          identificar: "O seno é negativo: os pontos ficam abaixo do eixo horizontal.",
          dica: "\\(\\sin 45^\\circ = \\frac{\\sqrt{2}}{2}\\). Procure os ângulos do 3º e do 4º quadrantes com essa referência.",
          resolucao:
            "Referência de \\(45^\\circ\\). Seno negativo no 3º e no 4º quadrantes: \\(180^\\circ + 45^\\circ = 225^\\circ\\) e \\(360^\\circ - 45^\\circ = 315^\\circ\\).",
          resposta: "x = 225° ou x = 315°",
          interpretacao: "O sinal escolhe os quadrantes; o ângulo de referência escolhe a posição dentro deles.",
          erroComum: "Responder \\(45^\\circ\\) e \\(135^\\circ\\), ignorando o sinal negativo.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado:
            "Quantas soluções tem \\(\\sin x = 0{,}3\\) no intervalo \\(0^\\circ \\leq x < 720^\\circ\\)? Não precisa calcular os ângulos.",
          identificar: "Conte quantas vezes a reta \\(y = 0{,}3\\) corta o círculo em uma volta.",
          dica: "Quantas voltas cabem no intervalo?",
          resolucao:
            "Como \\(0 < 0{,}3 < 1\\), a reta corta o círculo em dois pontos por volta. O intervalo tem duas voltas: \\(4\\) soluções.",
          resposta: "4",
          interpretacao:
            "Contar voltas e multiplicar pelos cortes por volta é um bom teste para não perder soluções.",
          erroComum: "Responder \\(2\\), contando só a primeira volta.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Seno e cosseno com sinais diferentes, e o caso em que não há solução.",
      exerciseIds: ["trig-eq-01", "trig-eq-02", "trig-eq-03"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Resolver \\(\\sin x = a\\) é achar os pontos do círculo com altura \\(a\\).",
        "Se \\(-1 < a < 1\\), há duas soluções por volta; se \\(a = \\pm 1\\), uma; se \\(|a| > 1\\), nenhuma.",
        "Seno: \\(\\theta\\) e \\(180^\\circ - \\theta\\). Cosseno: \\(\\theta\\) e \\(360^\\circ - \\theta\\).",
        "Todas as soluções: some \\(k \\cdot 360^\\circ\\) (ou \\(2k\\pi\\)), com \\(k\\) inteiro.",
        "Tangente: uma solução a cada \\(180^\\circ\\).",
        "Próximo: equações com o ângulo multiplicado, seno ao quadrado e seno igual a cosseno.",
      ],
    },
  },

  "equacoes-trigonometricas-passos": {
    meta: {
      ...preMeta({
        title: "Equações trigonométricas com mais passos",
        moduleSlug: MOD,
        moduleTitle: MOD_TITLE,
        lessonNumber: 9,
        duration: "15 min",
        readingNotes: ["Tire o disfarce: u = bx, s = sen x", "Ajuste o intervalo antes de listar"],
        glossaryTerms: ["Período", "Senoide"],
        next: { slug: "rampas-altura", title: "Rampas e altura de prédios" },
      }),
      prereqs: [
        { label: "Equações trigonométricas", href: "/pre-calculo/trigonometria/equacoes-trigonometricas" },
        { label: "Equação do 2º grau", href: "/pre-calculo/fundamentos/equacao-segundo-grau" },
      ],
      usedIn: [
        {
          label: "Pontos críticos",
          href: "/calculo-1/aplicacoes-derivadas/pontos-criticos",
          detail: "f′(x) = 0 costuma chegar como uma equação com mais passos",
        },
        {
          label: "Ondas e movimento circular",
          href: "/pre-calculo/trigonometria/ondas-movimento",
          detail: "ondas mais rápidas, como sen 2x, cruzam cada altura mais vezes",
        },
      ],
    },
    plot: "seno-2x-igual-meio",
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "As equações de prova raramente chegam prontas como \\(\\sin x = \\frac{1}{2}\\). O ângulo aparece multiplicado, como em \\(\\sin 2x\\); o seno aparece ao quadrado; ou seno e cosseno aparecem juntos na mesma igualdade.",
        "Todas elas são uma \\(\\sin u = a\\) disfarçada. O trabalho desta aula é tirar o disfarce sem perder solução no caminho — e é justamente no caminho que se perdem as soluções.",
        "Em Cálculo, achar os pontos críticos de uma função com seno ou cosseno quase sempre termina numa equação destas.",
      ],
    },
    explicacao: {
      title: "Três disfarces, a mesma equação por baixo",
      paragraphs: [
        "**Ângulo multiplicado.** Em \\(\\sin 2x = a\\), chame \\(u = 2x\\) e resolva \\(\\sin u = a\\). O detalhe está no intervalo: se \\(x\\) vai de \\(0^\\circ\\) a \\(360^\\circ\\), \\(u\\) vai de \\(0^\\circ\\) a \\(720^\\circ\\) — duas voltas, o dobro de soluções. Só no fim divida por \\(2\\).",
        "**Seno ao quadrado.** Trate \\(\\sin x\\) como uma incógnita. \\(2\\sin^2 x - \\sin x - 1 = 0\\) é uma equação do 2º grau em \\(s = \\sin x\\): resolva para \\(s\\) e depois resolva \\(\\sin x = s\\) para cada valor entre \\(-1\\) e \\(1\\).",
        "**Seno e cosseno juntos.** \\(\\sin x = \\cos x\\) vira \\(\\tan x = 1\\) dividindo por \\(\\cos x\\). Antes de dividir, confira que \\(\\cos x = 0\\) não era solução — se fosse, a divisão a apagaria sem aviso.",
      ],
      alternativa: [
        "Pense em cada equação como uma \\(\\sin x = a\\) fantasiada. Trocar \\(2x\\) por \\(u\\), trocar \\(\\sin x\\) por \\(s\\), dividir por \\(\\cos x\\): cada troca tira uma camada da fantasia, e por baixo está sempre o passo da aula anterior.",
        "O cuidado é não perder nada ao tirar a fantasia. O intervalo muda quando \\(2x\\) vira \\(u\\), e a divisão por \\(\\cos x\\) só vale onde \\(\\cos x \\neq 0\\).",
      ],
      callout:
        "Reduza tudo a \\(\\sin u = a\\) (ou cosseno, ou tangente). Ajuste o intervalo de \\(u\\) antes de listar as soluções, e só no fim volte para \\(x\\).",
      formula: "sen(bx) = a: com u = bx, resolva sen u = a no intervalo ajustado; depois x = u/b",
      formulaLatex:
        "\\begin{aligned} \\sin(bx) = a &\\;\\Longrightarrow\\; \\sin u = a,\\ \\ u = bx \\\\ &\\;\\Longrightarrow\\; x = \\frac{u}{b} \\end{aligned}",
      formulaAria:
        "seno de b x igual a a leva a seno de u igual a a, com u igual a b x; no fim, x igual a u sobre b",
      formulaLegend: "se x percorre uma volta, u = bx percorre b voltas",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Cálculo", detail: "f′(x) = 0 em funções como \\(x + 2\\cos x\\)" },
        { label: "Eletricidade", detail: "sinais com o dobro da frequência da rede" },
        { label: "Física", detail: "oscilações que se repetem duas vezes mais rápido" },
        { label: "Som", detail: "harmônicos: a mesma nota uma oitava acima" },
        { label: "Mecânica", detail: "posições de um pistão ligado a uma roda" },
        { label: "Provas", detail: "\\(\\sin 2x\\) e seno ao quadrado são clássicos das listas" },
      ],
    },
    exemplo: {
      title: "Uma onda duas vezes mais rápida",
      situacao: "Resolva \\(\\sin 2x = \\frac{1}{2}\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Trocar o ângulo",
          detail: "Chame \\(u = 2x\\). A equação vira \\(\\sin u = \\frac{1}{2}\\).",
        },
        {
          title: "Ajustar o intervalo",
          detail: "Se \\(0^\\circ \\leq x < 360^\\circ\\), então \\(0^\\circ \\leq u < 720^\\circ\\): duas voltas.",
        },
        {
          title: "Resolver em u",
          detail:
            "Na primeira volta, \\(u = 30^\\circ\\) ou \\(u = 150^\\circ\\). Somando uma volta: \\(u = 390^\\circ\\) ou \\(u = 510^\\circ\\).",
        },
        {
          title: "Voltar para x",
          detail: "Dividindo por \\(2\\): \\(x = 15^\\circ\\), \\(75^\\circ\\), \\(195^\\circ\\) ou \\(255^\\circ\\).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "No gráfico acima, \\(\\sin 2x\\) é a senoide comprimida: completa duas ondas no espaço de uma, e por isso passa pela altura \\(\\frac{1}{2}\\) quatro vezes. Quem resolve \\(\\sin u = \\frac{1}{2}\\) só na primeira volta encontra \\(15^\\circ\\) e \\(75^\\circ\\) e perde metade das respostas.",
        "O mesmo raciocínio aparece em Cálculo. Se \\(f(x) = x + 2\\cos x\\), a derivada é \\(f'(x) = 1 - 2\\sin x\\), e \\(f'(x) = 0\\) é exatamente \\(\\sin x = \\frac{1}{2}\\): a equação da aula anterior, agora a serviço de achar onde o gráfico fica plano.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Tratar \\(\\sin 2x\\) como \\(2\\sin x\\). São funções diferentes: em \\(x = 90^\\circ\\), \\(\\sin 180^\\circ = 0\\), mas \\(2\\sin 90^\\circ = 2\\).",
        "Esquecer de ampliar o intervalo de \\(u\\) e perder as soluções da segunda volta.",
        "No 2º grau em \\(\\sin x\\), aceitar uma raiz fora de \\([-1, 1]\\). \\(\\sin x = 2\\) não tem solução e deve ser descartada.",
        "Dividir por \\(\\cos x\\) sem conferir se \\(\\cos x = 0\\) era solução.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(2\\sin^2 x - \\sin x - 1 = 0\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
          identificar: "É uma equação do 2º grau na incógnita \\(s = \\sin x\\).",
          dica: "Fatore: \\(2s^2 - s - 1 = (2s + 1)(s - 1)\\).",
          resolucao:
            "Com \\(s = \\sin x\\): \\((2s + 1)(s - 1) = 0\\), então \\(s = 1\\) ou \\(s = -\\frac{1}{2}\\). \\(\\sin x = 1\\) dá \\(x = 90^\\circ\\). \\(\\sin x = -\\frac{1}{2}\\) dá \\(x = 210^\\circ\\) ou \\(x = 330^\\circ\\).",
          resposta: "x = 90°, 210° ou 330°",
          interpretacao:
            "Cada valor de \\(s\\) vira uma equação simples. \\(\\sin x = 1\\) tem uma solução só por volta, porque a reta \\(y = 1\\) apenas toca o círculo no topo.",
          erroComum: "Parar em \\(s = 1\\) e \\(s = -\\frac{1}{2}\\), esquecendo de voltar para \\(x\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(\\sin x = \\cos x\\) para \\(0^\\circ \\leq x < 360^\\circ\\).",
          identificar: "Divida por \\(\\cos x\\), depois de conferir que \\(\\cos x = 0\\) não é solução.",
          dica: "Se \\(\\cos x = 0\\), então \\(\\sin x = \\pm 1\\), e a igualdade falharia.",
          resolucao:
            "Onde \\(\\cos x = 0\\), o seno vale \\(\\pm 1\\), então esses ângulos não resolvem a equação e a divisão é segura: \\(\\tan x = 1\\). A tangente repete a cada \\(180^\\circ\\): \\(x = 45^\\circ\\) ou \\(x = 225^\\circ\\).",
          resposta: "x = 45° ou x = 225°",
          interpretacao:
            "São os dois pontos do círculo com as duas coordenadas iguais, um no 1º e outro no 3º quadrante.",
          erroComum: "Responder só \\(45^\\circ\\), esquecendo que a tangente se repete a cada \\(180^\\circ\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado:
            "A altura de uma cadeira de roda-gigante é \\(h(\\theta) = 12 + 10\\sin\\theta\\), em metros. Para quais ângulos \\(0^\\circ \\leq \\theta < 360^\\circ\\) a cadeira está a \\(17\\) m do chão?",
          identificar: "Isole o seno antes de pensar em ângulos.",
          dica: "\\(12 + 10\\sin\\theta = 17\\) dá \\(\\sin\\theta = \\frac{1}{2}\\).",
          resolucao:
            "\\(10\\sin\\theta = 5\\), então \\(\\sin\\theta = \\frac{1}{2}\\): \\(\\theta = 30^\\circ\\) ou \\(\\theta = 150^\\circ\\).",
          resposta: "θ = 30° ou θ = 150°",
          interpretacao:
            "A cadeira passa pelos \\(17\\) m duas vezes por volta: subindo, aos \\(30^\\circ\\), e descendo, aos \\(150^\\circ\\).",
          erroComum: "Esquecer o centro da roda e resolver \\(10\\sin\\theta = 17\\), que daria \\(\\sin\\theta = 1{,}7\\) e nenhuma solução.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Solução geral em radianos, ângulo multiplicado e a duração do dia ao longo do ano.",
      exerciseIds: ["trig-eq-04", "trig-eq-05", "trig-eq-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Toda equação desta aula é uma \\(\\sin u = a\\) disfarçada.",
        "Ângulo multiplicado: troque \\(bx\\) por \\(u\\) e amplie o intervalo para \\(b\\) voltas.",
        "Seno ao quadrado: resolva o 2º grau em \\(s = \\sin x\\) e descarte as raízes fora de \\([-1, 1]\\).",
        "\\(\\sin x = \\cos x\\): confira \\(\\cos x = 0\\) e divida, obtendo \\(\\tan x = 1\\).",
        "Próximo: rampas e altura de prédios.",
      ],
    },
  },
};
