/**
 * Biblioteca de figuras estáticas.
 *
 * Cada gráfico existe porque algum exercício descreve uma figura em palavras e
 * pede que o aluno a leia — "o ponto (1,3) está aberto", "use três retângulos
 * à direita". Quem não enxerga abstração, que é o público do site, precisava
 * imaginar o desenho para responder uma pergunta sobre o desenho.
 *
 * Os gráficos são referenciados por id (`Exercicio.grafico`), e não embutidos,
 * para que os dados sigam serializáveis e o validador possa conferir que todo
 * id citado existe.
 */

export type PlotTone = "principal" | "aplicacao" | "ideia" | "alerta" | "neutro";

export type PlotMark =
  /** Curva da função, amostrada e interrompida onde sai do quadro. */
  | { kind: "curve"; f: (x: number) => number; from?: number; to?: number; tone?: PlotTone; dashed?: boolean }
  /** Bolinha cheia (o valor existe) ou vazada (o buraco). */
  | { kind: "point"; at: [number, number]; open?: boolean; tone?: PlotTone; label?: string }
  | { kind: "vline"; at: number; tone?: PlotTone; label?: string }
  | { kind: "hline"; at: number; tone?: PlotTone; label?: string }
  /** Retângulos de Riemann; `edges` permite partição desigual. */
  | { kind: "rects"; f: (x: number) => number; edges: number[]; side: "left" | "right"; tone?: PlotTone }
  | { kind: "area"; top: (x: number) => number; bottom?: (x: number) => number; from: number; to: number; tone?: PlotTone }
  | { kind: "segment"; from: [number, number]; to: [number, number]; tone?: PlotTone; dashed?: boolean; label?: string }
  /** Anotação livre ancorada num ponto do gráfico ("crescente", "pico"). */
  | { kind: "text"; at: [number, number]; text: string; tone?: PlotTone; anchor?: "start" | "middle" | "end" };

export type PlotSpec = {
  /** Leitura para quem não vê a figura. Descreve o que ela mostra, não o que ela é. */
  alt: string;
  x: [number, number];
  y: [number, number];
  xLabel?: string;
  yLabel?: string;
  legend?: string;
  /** Marcas de escala fixas. Sem isto a escala é automática, o que não serve
   *  quando o texto da aula cita valores específicos (90°, 6h, junho). */
  xTicks?: number[];
  yTicks?: number[];
  marks: PlotMark[];
};

/** Bordas de uma partição uniforme, para os retângulos de Riemann. */
export function particaoUniforme(de: number, ate: number, n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => de + ((ate - de) * i) / n);
}

export const plots = {
  // ── Limites: o buraco e o salto ──────────────────────────────────────
  "limite-buraco-1-3": {
    alt: "Curva crescente que se aproxima da altura 3 dos dois lados de x igual a 1, com uma bolinha vazada exatamente no ponto (1, 3), indicando que a função não está definida ali.",
    x: [-1, 3], y: [0, 5],
    legend: "A bolinha vazada marca o ponto onde a função não existe. A curva chega à altura 3 pelos dois lados.",
    marks: [
      { kind: "hline", at: 3, tone: "neutro" },
      { kind: "vline", at: 1, tone: "neutro" },
      { kind: "curve", f: (x) => x + 2, from: -1, to: 1, tone: "principal" },
      { kind: "curve", f: (x) => x + 2, from: 1, to: 3, tone: "principal" },
      { kind: "point", at: [1, 3], open: true, tone: "principal" },
    ],
  },

  "limite-buraco-2-5": {
    alt: "Curva que se aproxima da altura 5 pelos dois lados de x igual a 2, com uma bolinha vazada em (2, 5): a função não está definida nesse ponto, mas a tendência é clara.",
    x: [0, 4], y: [2, 8],
    legend: "O limite descreve para onde a curva aponta perto de x = 2, mesmo sem a função existir ali.",
    marks: [
      { kind: "hline", at: 5, tone: "neutro" },
      { kind: "vline", at: 2, tone: "neutro" },
      { kind: "curve", f: (x) => x + 3, from: 0, to: 2, tone: "principal" },
      { kind: "curve", f: (x) => x + 3, from: 2, to: 4, tone: "principal" },
      { kind: "point", at: [2, 5], open: true, tone: "principal" },
    ],
  },

  "limite-salto-x0": {
    alt: "Gráfico com um salto em x igual a 0: pela esquerda a curva chega à altura 2 e pela direita recomeça na altura 5. As duas pontas têm bolinha vazada.",
    x: [-3, 3], y: [0, 7],
    legend: "As duas laterais existem, mas são diferentes (2 e 5) — por isso não há limite bilateral em x = 0.",
    marks: [
      { kind: "vline", at: 0, tone: "neutro" },
      { kind: "curve", f: (x) => 2 + x / 3, from: -3, to: 0, tone: "principal" },
      { kind: "curve", f: (x) => 5 + x / 3, from: 0, to: 3, tone: "aplicacao" },
      { kind: "point", at: [0, 2], open: true, tone: "principal", label: "esquerda → 2" },
      { kind: "point", at: [0, 5], open: true, tone: "aplicacao", label: "direita → 5" },
    ],
  },

  "limite-salto-x2": {
    alt: "Gráfico com um salto em x igual a 2: pela esquerda a curva tende à altura 1 e pela direita à altura 4.",
    x: [0, 4], y: [0, 6],
    legend: "Laterais diferentes (1 e 4): a tendência não é única em x = 2.",
    marks: [
      { kind: "vline", at: 2, tone: "neutro" },
      { kind: "curve", f: (x) => 1 - (2 - x) / 4, from: 0, to: 2, tone: "principal" },
      { kind: "curve", f: (x) => 4 + (x - 2) / 4, from: 2, to: 4, tone: "aplicacao" },
      { kind: "point", at: [2, 1], open: true, tone: "principal", label: "esquerda → 1" },
      { kind: "point", at: [2, 4], open: true, tone: "aplicacao", label: "direita → 4" },
    ],
  },

  "buraco-removivel": {
    alt: "Reta com uma bolinha vazada em (1, 2): é o gráfico de (x ao quadrado menos 1) dividido por (x menos 1), que vale x mais 1 em todo ponto exceto x igual a 1.",
    x: [-1, 3], y: [0, 4],
    legend: "Fora de x = 1 a expressão vale x + 1. Definir f(1) = 2 fecha a bolinha e torna a função contínua.",
    marks: [
      { kind: "curve", f: (x) => x + 1, from: -1, to: 1, tone: "principal" },
      { kind: "curve", f: (x) => x + 1, from: 1, to: 3, tone: "principal" },
      { kind: "point", at: [1, 2], open: true, tone: "principal", label: "(1, 2)" },
    ],
  },

  "continua-em-2-5": {
    alt: "Curva suave passando pelo ponto (2, 5) com bolinha cheia, sem buraco nem salto na vizinhança.",
    x: [0, 4], y: [0, 12],
    legend: "Sem buraco e sem salto: o limite em x = 2 existe e coincide com f(2) = 5.",
    marks: [
      { kind: "curve", f: (x) => (x * x) / 2 + 3, tone: "principal" },
      { kind: "point", at: [2, 5], tone: "principal", label: "(2, 5)" },
    ],
  },

  "assintotas-racional": {
    alt: "Gráfico de 2x dividido por (x menos 1): dois ramos separados por uma assíntota vertical em x igual a 1, ambos se achatando na altura 2, que é a assíntota horizontal.",
    x: [-4, 6], y: [-8, 12],
    legend: "Assíntota vertical em x = 1 (o denominador zera) e horizontal em y = 2 (o quociente dos coeficientes).",
    marks: [
      { kind: "vline", at: 1, tone: "alerta", label: "x = 1" },
      { kind: "hline", at: 2, tone: "ideia", label: "y = 2" },
      { kind: "curve", f: (x) => (2 * x) / (x - 1), from: -4, to: 0.94, tone: "principal" },
      { kind: "curve", f: (x) => (2 * x) / (x - 1), from: 1.06, to: 6, tone: "principal" },
    ],
  },

  // ── Integrais: retângulos e área ─────────────────────────────────────
  "riemann-direita-3": {
    alt: "Reta y igual a x no intervalo de 0 a 3, com três retângulos de largura 1 cuja altura é medida na borda direita: alturas 1, 2 e 3.",
    x: [0, 3.4], y: [0, 4],
    legend: "Três retângulos à direita: alturas 1, 2 e 3, cada um de largura 1. A soma vale 6.",
    marks: [
      { kind: "rects", f: (x) => x, edges: particaoUniforme(0, 3, 3), side: "right", tone: "aplicacao" },
      { kind: "curve", f: (x) => x, from: 0, to: 3.4, tone: "principal" },
    ],
  },

  "riemann-particao-desigual": {
    alt: "Intervalo de 0 a 1 dividido de forma desigual: a primeira metade continua inteira, enquanto a segunda metade é fatiada em quatro partes menores.",
    x: [0, 1.1], y: [0, 1.3],
    legend: "Aumentar a quantidade de partes não basta: enquanto a fatia larga continuar larga, o refinamento não acontece.",
    marks: [
      { kind: "rects", f: (x) => x, edges: [0, 0.5, 0.625, 0.75, 0.875, 1], side: "right", tone: "alerta" },
      { kind: "curve", f: (x) => x, from: 0, to: 1.1, tone: "principal" },
    ],
  },

  "area-sob-velocidade": {
    alt: "Curva de velocidade sempre acima do eixo do tempo, com a região entre a curva e o eixo pintada: essa área é a distância percorrida.",
    x: [0, 4.5], y: [0, 7],
    xLabel: "t", yLabel: "v",
    legend: "Com a velocidade acima do eixo, a área entre a curva e o eixo do tempo é a distância percorrida.",
    marks: [
      { kind: "area", top: (t) => 2 + t, from: 0, to: 4, tone: "aplicacao" },
      { kind: "curve", f: (t) => 2 + t, from: 0, to: 4.5, tone: "principal" },
    ],
  },

  "velocidade-com-sinal": {
    alt: "Curva de velocidade que cruza o eixo do tempo: fica acima até o instante 3 e abaixo depois. As duas regiões estão pintadas em cores diferentes.",
    x: [0, 5], y: [-3, 4],
    xLabel: "t", yLabel: "v",
    legend: "Antes de t = 3 a velocidade é positiva; depois, negativa. Somar com sinal dá o deslocamento; somar em módulo dá a distância total.",
    marks: [
      { kind: "area", top: (t) => 3 - t, from: 0, to: 3, tone: "aplicacao" },
      { kind: "area", top: (t) => 3 - t, from: 3, to: 5, tone: "alerta" },
      { kind: "curve", f: (t) => 3 - t, from: 0, to: 5, tone: "principal" },
      { kind: "point", at: [3, 0], tone: "principal", label: "troca de sinal" },
    ],
  },

  "area-entre-curvas": {
    alt: "As curvas y igual a 2x e y igual a x ao quadrado entre 0 e 2, com a região entre elas pintada. A reta fica por cima em todo o intervalo.",
    x: [0, 2.4], y: [0, 5],
    legend: "Entre 0 e 2 a reta está sempre acima da parábola; a altura de cada fatia é 2x menos x ao quadrado.",
    marks: [
      { kind: "area", top: (x) => 2 * x, bottom: (x) => x * x, from: 0, to: 2, tone: "ideia" },
      { kind: "curve", f: (x) => 2 * x, from: 0, to: 2.4, tone: "principal" },
      { kind: "curve", f: (x) => x * x, from: 0, to: 2.4, tone: "aplicacao" },
      { kind: "point", at: [2, 4], tone: "neutro", label: "cruzam em x = 2" },
    ],
  },

  // ── Parábolas ────────────────────────────────────────────────────────
  "parabola-vertice-3-8": {
    alt: "Parábola com concavidade para baixo cortando o eixo x em 1 e em 5, com o vértice no ponto (3, 8).",
    x: [0, 6], y: [-4, 10],
    legend: "Raízes em 1 e 5, vértice em (3, 8). Como o vértice é o ponto mais alto, a concavidade é para baixo.",
    marks: [
      { kind: "curve", f: (x) => -2 * (x - 1) * (x - 5), tone: "principal" },
      { kind: "point", at: [1, 0], tone: "neutro" },
      { kind: "point", at: [5, 0], tone: "neutro" },
      { kind: "point", at: [3, 8], tone: "aplicacao", label: "vértice (3, 8)" },
    ],
  },

  "parabola-raiz-dupla": {
    alt: "Parábola de x ao quadrado menos 8x mais 16 tocando o eixo x em um único ponto, x igual a 4, sem atravessá-lo.",
    x: [1, 7], y: [-1, 9],
    legend: "A raiz dupla aparece como um toque: a parábola encosta no eixo em x = 4 e volta a subir.",
    marks: [
      { kind: "curve", f: (x) => (x - 4) * (x - 4), tone: "principal" },
      { kind: "point", at: [4, 0], tone: "aplicacao", label: "raiz dupla" },
    ],
  },

  "parabola-sem-raiz": {
    alt: "Parábola de x ao quadrado mais 2x mais 5 inteiramente acima do eixo x, sem tocá-lo em ponto algum.",
    x: [-5, 3], y: [0, 14],
    legend: "Com discriminante negativo a parábola não encosta no eixo: não há raiz real.",
    marks: [
      { kind: "curve", f: (x) => x * x + 2 * x + 5, tone: "principal" },
      { kind: "point", at: [-1, 4], tone: "aplicacao", label: "vértice (−1, 4)" },
    ],
  },

  "multiplicidade-par": {
    alt: "Gráfico de um polinômio que encosta no eixo x em x igual a 2 e volta a subir sem atravessar, porque a raiz tem multiplicidade par.",
    x: [0.4, 3.2], y: [-2, 14],
    legend: "Multiplicidade par toca o eixo sem mudar de sinal; multiplicidade ímpar atravessaria.",
    marks: [
      { kind: "curve", f: (x) => (x - 2) * (x - 2) * (x * x + 1), tone: "principal" },
      { kind: "point", at: [2, 0], tone: "aplicacao", label: "toca sem atravessar" },
    ],
  },
  // ── Módulo Gráficos: um módulo sobre gráficos precisa ter gráficos ───
  "plano-cartesiano-par-ordenado": {
    alt: "Plano cartesiano com dois pontos marcados: (3, 2) três casas à direita e duas acima, e (2, 3) duas à direita e três acima. São lugares diferentes.",
    x: [-1, 5], y: [-1, 5],
    xTicks: [-1, 0, 1, 2, 3, 4, 5], yTicks: [-1, 0, 1, 2, 3, 4, 5],
    legend: "Trocar a ordem muda o endereço: (3, 2) e (2, 3) são pontos distintos.",
    marks: [
      { kind: "segment", from: [0, 2], to: [3, 2], tone: "neutro", dashed: true },
      { kind: "segment", from: [3, 0], to: [3, 2], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 3], to: [2, 3], tone: "neutro", dashed: true },
      { kind: "segment", from: [2, 0], to: [2, 3], tone: "neutro", dashed: true },
      { kind: "point", at: [3, 2], tone: "principal", label: "(3, 2)" },
      { kind: "point", at: [2, 3], tone: "aplicacao", label: "(2, 3)" },
    ],
  },

  "leitura-temperatura-hora": {
    alt: "Curva de temperatura ao longo do dia. Linhas tracejadas mostram como subir do eixo das horas até a curva e ler a altura: às 6 horas, 18 graus; às 14 horas, 30 graus.",
    x: [0, 24], y: [10, 34],
    xLabel: "hora", yLabel: "°C",
    xTicks: [0, 6, 12, 14, 18, 24], yTicks: [10, 18, 22, 26, 30, 34],
    legend: "Suba do eixo x até a curva e leia a altura no eixo y. Às 6 h, 18 °C; às 14 h, 30 °C.",
    marks: [
      { kind: "curve", f: (h) => 24 - 6 * Math.cos(((h - 14) * Math.PI) / 12), tone: "principal" },
      { kind: "segment", from: [6, 10], to: [6, 18], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 18], to: [6, 18], tone: "neutro", dashed: true },
      { kind: "segment", from: [14, 10], to: [14, 30], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 30], to: [14, 30], tone: "neutro", dashed: true },
      { kind: "point", at: [6, 18], tone: "aplicacao", label: "(6, 18)" },
      { kind: "point", at: [14, 30], tone: "aplicacao", label: "(14, 30)" },
    ],
  },

  "vendas-cresce-estabiliza-cai": {
    alt: "Gráfico de vendas ao longo do ano: sobe de janeiro a junho, fica horizontal de junho a agosto e desce de agosto a dezembro.",
    x: [1, 12], y: [0, 120],
    xLabel: "mês",
    xTicks: [1, 6, 8, 12], yTicks: [0, 40, 80, 120],
    legend: "Lendo da esquerda para a direita: crescente até junho, constante até agosto, decrescente até dezembro.",
    marks: [
      { kind: "curve", f: (m) => 30 + 14 * (m - 1), from: 1, to: 6, tone: "principal" },
      { kind: "curve", f: () => 100, from: 6, to: 8, tone: "principal" },
      { kind: "curve", f: (m) => 100 - 15 * (m - 8), from: 8, to: 12, tone: "principal" },
      { kind: "text", at: [3.4, 78], text: "crescente", tone: "aplicacao" },
      { kind: "text", at: [7, 110], text: "constante", tone: "neutro" },
      { kind: "text", at: [10.4, 68], text: "decrescente", tone: "alerta" },
      { kind: "point", at: [6, 100], tone: "neutro" },
      { kind: "point", at: [8, 100], tone: "neutro" },
    ],
  },

  "dois-planos-cruzam": {
    alt: "Duas retas de custo por gigabyte no mesmo gráfico, cruzando-se no ponto (20, 70). Antes do cruzamento a reta mais baixa é a mais barata; depois, elas trocam de posição.",
    x: [0, 40], y: [0, 120],
    xLabel: "GB", yLabel: "R$",
    xTicks: [0, 10, 20, 30, 40], yTicks: [0, 30, 70, 100, 120],
    legend: "Em 20 GB os dois planos custam R$ 70. Antes disso um é mais barato; depois, o outro.",
    marks: [
      { kind: "curve", f: (x) => 30 + 2 * x, tone: "principal" },
      { kind: "curve", f: (x) => 50 + x, tone: "aplicacao" },
      { kind: "segment", from: [20, 0], to: [20, 70], tone: "neutro", dashed: true },
      { kind: "point", at: [20, 70], tone: "ideia", label: "(20, 70)" },
      { kind: "text", at: [8, 22], text: "plano A", tone: "principal", anchor: "start" },
      { kind: "text", at: [30, 92], text: "plano B", tone: "aplicacao", anchor: "start" },
    ],
  },

  "translacao-vertical": {
    alt: "Duas parábolas iguais: a de baixo com vértice na origem e a de cima três unidades acima, com vértice em (0, 3). A forma não muda, só a altura.",
    x: [-3, 3], y: [-1, 12],
    legend: "Somar 3 fora da função sobe o gráfico inteiro: o vértice vai de (0, 0) para (0, 3).",
    marks: [
      { kind: "curve", f: (x) => x * x, tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => x * x + 3, tone: "principal" },
      { kind: "segment", from: [0, 0], to: [0, 3], tone: "aplicacao", label: "+3" },
      { kind: "point", at: [0, 0], tone: "neutro" },
      { kind: "point", at: [0, 3], tone: "principal", label: "(0, 3)" },
    ],
  },

  "receita-preco-ingresso": {
    alt: "Parábola de receita por preço do ingresso, abrindo para baixo, com pico no ponto (50, 5000).",
    x: [0, 100], y: [0, 6000],
    xLabel: "preço (R$)", yLabel: "receita (R$)",
    xTicks: [0, 25, 50, 75, 100], yTicks: [0, 2000, 4000, 5000, 6000],
    legend: "O pico da parábola é o preço que maximiza a receita: R$ 50, gerando R$ 5.000.",
    marks: [
      { kind: "curve", f: (p) => -2 * p * p + 200 * p, tone: "principal" },
      { kind: "segment", from: [50, 0], to: [50, 5000], tone: "neutro", dashed: true },
      { kind: "point", at: [50, 5000], tone: "aplicacao", label: "(50, 5000)" },
    ],
  },

  "consumo-por-temperatura": {
    alt: "Reta crescente de consumo por temperatura passando pelos pontos (20, 100) e (30, 200): cada grau a mais custa cerca de 10 quilowatt-hora por dia.",
    x: [10, 40], y: [0, 300],
    xLabel: "°C", yLabel: "kWh/dia",
    xTicks: [10, 20, 30, 40], yTicks: [0, 100, 200, 300],
    legend: "Relação direta: as duas grandezas sobem juntas. A inclinação, 10 kWh por grau, mede a intensidade.",
    marks: [
      { kind: "curve", f: (t) => 10 * t - 100, tone: "principal" },
      { kind: "segment", from: [20, 100], to: [30, 100], tone: "neutro", dashed: true, label: "+10 °C" },
      { kind: "segment", from: [30, 100], to: [30, 200], tone: "aplicacao", dashed: true, label: "+100 kWh" },
      { kind: "point", at: [20, 100], tone: "principal", label: "(20, 100)" },
      { kind: "point", at: [30, 200], tone: "principal", label: "(30, 200)" },
    ],
  },

  // ── Migrações dos gráficos que usavam a biblioteca cliente ──────────
  "reta-2x-menos-6": {
    alt: "Reta de f(x) igual a 2x menos 6 cruzando o eixo x em 3: é ali que a equação 2x menos 6 igual a zero tem solução.",
    x: [-1, 6], y: [-8, 6],
    legend: "Resolver 2x − 6 = 0 é procurar onde a reta cruza o eixo x. Aqui, em x = 3.",
    marks: [
      { kind: "curve", f: (x) => 2 * x - 6, tone: "principal" },
      { kind: "point", at: [3, 0], tone: "aplicacao", label: "x = 3" },
    ],
  },

  "custo-por-kwh": {
    alt: "Reta que sai da origem: o custo cresce proporcionalmente ao consumo, a 75 centavos por quilowatt-hora.",
    x: [0, 200], y: [0, 160],
    xLabel: "kWh", yLabel: "R$",
    xTicks: [0, 50, 100, 150, 200], yTicks: [0, 40, 80, 120, 160],
    legend: "Proporção direta: dobrar o consumo dobra a conta. A reta passa pela origem.",
    marks: [
      { kind: "curve", f: (x) => 0.75 * x, tone: "principal" },
      { kind: "point", at: [100, 75], tone: "aplicacao", label: "100 kWh → R$ 75" },
    ],
  },

  "altura-da-bola": {
    alt: "Parábola da altura de uma bola em função do tempo, subindo da origem até 20 metros aos 2 segundos e voltando ao chão aos 4 segundos.",
    x: [0, 4.5], y: [0, 24],
    xLabel: "t (s)", yLabel: "altura (m)",
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 5, 10, 15, 20],
    legend: "O pico da parábola é a altura máxima: 20 m aos 2 s. A bola toca o chão de novo aos 4 s.",
    marks: [
      { kind: "curve", f: (t) => -5 * t * t + 20 * t, from: 0, to: 4, tone: "principal" },
      { kind: "segment", from: [2, 0], to: [2, 20], tone: "neutro", dashed: true },
      { kind: "point", at: [2, 20], tone: "aplicacao", label: "20 m em t = 2 s" },
      { kind: "point", at: [4, 0], tone: "neutro" },
    ],
  },

  "senoide-em-graus": {
    alt: "Uma volta e meia da curva do seno, com o eixo horizontal marcado em graus: parte de zero, sobe a 1 aos 90 graus, volta a zero aos 180, desce a menos 1 aos 270 e retorna a zero aos 360.",
    x: [0, 540], y: [-1.5, 1.5],
    xLabel: "graus",
    xTicks: [0, 90, 180, 270, 360, 450, 540],
    yTicks: [-1, 0, 1],
    // O eixo vai em graus porque é assim que a aula narra a curva ("sobe até 1
    // em 90°"). Antes o texto falava em graus e a figura vinha em radianos.
    legend: "A senoide oscila entre −1 e 1 e repete a cada volta: período de 360° (ou 2π rad). Amplitude 1.",
    marks: [
      { kind: "curve", f: (g) => Math.sin((g * Math.PI) / 180), tone: "principal" },
      { kind: "point", at: [90, 1], tone: "aplicacao", label: "90°" },
      { kind: "point", at: [270, -1], tone: "aplicacao", label: "270°" },
      { kind: "point", at: [180, 0], tone: "neutro" },
      { kind: "point", at: [360, 0], tone: "neutro" },
    ],
  },

  // ── Cálculo 1: a aula sobre desenhar curvas precisava de uma curva ──
  "esboco-x3-menos-3x": {
    alt: "Gráfico de x ao cubo menos 3x, com zeros em menos raiz de três, zero e raiz de três, máximo local em menos um, mínimo local em um e ponto de inflexão na origem.",
    x: [-2.4, 2.4], y: [-4, 4],
    legend: "Cada linha do roteiro vira algo visível: zeros no eixo, críticos em ±1, inflexão em 0 — onde a concavidade troca.",
    marks: [
      { kind: "curve", f: (x) => x * x * x - 3 * x, tone: "principal" },
      { kind: "point", at: [-1, 2], tone: "aplicacao", label: "máximo local" },
      { kind: "point", at: [1, -2], tone: "aplicacao", label: "mínimo local" },
      { kind: "point", at: [0, 0], tone: "ideia", label: "inflexão" },
      { kind: "point", at: [-Math.sqrt(3), 0], tone: "neutro" },
      { kind: "point", at: [Math.sqrt(3), 0], tone: "neutro" },
    ],
  },
  // ── Limites e continuidade: os defeitos do gráfico ──────────────────
  "buraco-e-salto": {
    alt: "Uma função com dois defeitos: em x igual a menos dois há uma bolinha vazada no meio da reta, um buraco; em x igual a zero a curva salta da altura três para a altura um, com bolinha vazada em cima e cheia embaixo.",
    x: [-5, 4], y: [-3, 6],
    legend: "Buraco: a curva aponta para a altura, mas não a assume. Salto: os dois lados apontam para alturas diferentes.",
    marks: [
      { kind: "curve", f: (x) => x + 3, from: -5, to: 0, tone: "principal" },
      { kind: "curve", f: (x) => 1 + x, from: 0, to: 4, tone: "aplicacao" },
      { kind: "point", at: [-2, 1], open: true, tone: "principal", label: "buraco" },
      { kind: "point", at: [0, 3], open: true, tone: "principal" },
      { kind: "point", at: [0, 1], tone: "aplicacao", label: "salto" },
    ],
  },

  "tendencia-ponto-aberto": {
    alt: "Curva que sobe pela esquerda e desce pela direita, encontrando a altura quatro em x igual a dois, onde há uma bolinha vazada.",
    x: [-1, 5], y: [0, 5],
    legend: "Os dois lados miram a mesma altura, 4. A bolinha aberta diz que a função não assume esse valor em x = 2.",
    marks: [
      { kind: "hline", at: 4, tone: "neutro" },
      { kind: "curve", f: (x) => 4 - Math.abs(x - 2), from: -1, to: 2, tone: "principal" },
      { kind: "curve", f: (x) => 4 - Math.abs(x - 2), from: 2, to: 5, tone: "principal" },
      { kind: "point", at: [2, 4], open: true, tone: "principal" },
      { kind: "text", at: [0.6, 2.1], text: "pela esquerda ↗", tone: "aplicacao" },
      { kind: "text", at: [3.6, 2.1], text: "↘ pela direita", tone: "aplicacao" },
    ],
  },

  "explosao-perto-de-3": {
    alt: "Gráfico de um dividido por (x menos três) ao quadrado: os dois ramos sobem verticalmente ao se aproximarem de x igual a três, sempre acima do eixo.",
    x: [0, 6], y: [0, 12],
    legend: "Numerador fixo e denominador tendendo a zero: a curva cresce além de qualquer valor, pelos dois lados.",
    marks: [
      { kind: "vline", at: 3, tone: "alerta", label: "x = 3" },
      { kind: "curve", f: (x) => 1 / ((x - 3) * (x - 3)), from: 0, to: 2.71, tone: "principal" },
      { kind: "curve", f: (x) => 1 / ((x - 3) * (x - 3)), from: 3.29, to: 6, tone: "principal" },
    ],
  },

  "limite-no-infinito-racional": {
    alt: "Gráfico de (3x ao quadrado mais 1) sobre (x ao quadrado mais 4): a curva se achata na altura três tanto para a direita quanto para a esquerda.",
    x: [-20, 20], y: [0, 4],
    xTicks: [-20, -10, 0, 10, 20], yTicks: [0, 1, 2, 3, 4],
    legend: "Graus iguais no numerador e no denominador: a curva tende à razão dos coeficientes líderes, 3.",
    marks: [
      { kind: "hline", at: 3, tone: "ideia", label: "y = 3" },
      { kind: "curve", f: (x) => (3 * x * x + 1) / (x * x + 4), tone: "principal" },
    ],
  },

  "assintota-obliqua": {
    alt: "Gráfico de x mais um sobre x: dois ramos separados pela assíntota vertical em x igual a zero, ambos encostando na reta inclinada y igual a x quando se afastam da origem.",
    x: [-6, 6], y: [-9, 9],
    legend: "Longe da origem a curva acompanha a reta y = x (assíntota oblíqua); perto de zero, explode.",
    marks: [
      { kind: "vline", at: 0, tone: "alerta", label: "x = 0" },
      { kind: "curve", f: (x) => x, tone: "ideia", dashed: true },
      { kind: "curve", f: (x) => x + 1 / x, from: -6, to: -0.15, tone: "principal" },
      { kind: "curve", f: (x) => x + 1 / x, from: 0.15, to: 6, tone: "principal" },
      { kind: "text", at: [4.2, 2.6], text: "y = x", tone: "ideia" },
    ],
  },

  "racional-furo-e-assintota": {
    alt: "Gráfico de (x menos dois) sobre (x menos dois)(x mais um): há assíntota vertical em x igual a menos um, onde o fator não cancela, e um buraco em x igual a dois, onde o fator cancela.",
    x: [-5, 5], y: [-5, 5],
    legend: "O fator que cancela vira buraco (x = 2); o que fica no denominador vira assíntota (x = −1).",
    marks: [
      { kind: "vline", at: -1, tone: "alerta", label: "assíntota" },
      { kind: "curve", f: (x) => 1 / (x + 1), from: -5, to: -1.25, tone: "principal" },
      { kind: "curve", f: (x) => 1 / (x + 1), from: -0.75, to: 5, tone: "principal" },
      { kind: "point", at: [2, 1 / 3], open: true, tone: "aplicacao", label: "buraco em x = 2" },
    ],
  },

  "funcao-por-partes-troca": {
    alt: "Função definida por partes: a reta y igual a x mais um vale para x negativo e a parábola y igual a x ao quadrado vale de zero em diante. Em x igual a zero há bolinha vazada na altura um e bolinha cheia na altura zero.",
    x: [-3, 3], y: [-2, 9],
    legend: "Pela esquerda a tendência é 1; pela direita, 0. A bolinha cheia mostra qual regra vale exatamente em x = 0.",
    marks: [
      { kind: "curve", f: (x) => x + 1, from: -3, to: 0, tone: "principal" },
      { kind: "curve", f: (x) => x * x, from: 0, to: 3, tone: "aplicacao" },
      { kind: "point", at: [0, 1], open: true, tone: "principal", label: "esquerda → 1" },
      { kind: "point", at: [0, 0], tone: "aplicacao", label: "f(0) = 0" },
    ],
  },

  // ── Derivadas e integrais ───────────────────────────────────────────
  "maximo-local-parabola": {
    alt: "Parábola de menos x ao quadrado mais 4x mais 1, com o ponto mais alto em x igual a dois, altura cinco. Antes do vértice a curva sobe; depois, desce.",
    x: [-1, 5], y: [-4, 6],
    legend: "A derivada é positiva antes de x = 2 e negativa depois: por isso ali está o máximo, de valor 5.",
    marks: [
      { kind: "curve", f: (x) => -x * x + 4 * x + 1, tone: "principal" },
      { kind: "segment", from: [2, -4], to: [2, 5], tone: "neutro", dashed: true },
      { kind: "point", at: [2, 5], tone: "aplicacao", label: "máximo (2, 5)" },
      { kind: "text", at: [0.3, 3.2], text: "f ′ > 0", tone: "ideia" },
      { kind: "text", at: [3.9, 3.2], text: "f ′ < 0", tone: "ideia" },
    ],
  },

  "concavidade-x3": {
    alt: "Gráfico de x ao cubo: à esquerda da origem a curva é côncava para baixo e à direita é côncava para cima. Na origem está o ponto de inflexão, onde a concavidade troca.",
    x: [-2, 2], y: [-8, 8],
    legend: "f″ < 0 à esquerda (concavidade para baixo) e f″ > 0 à direita (para cima). Em x = 0 a concavidade troca: é a inflexão.",
    marks: [
      { kind: "curve", f: (x) => x * x * x, tone: "principal" },
      { kind: "point", at: [0, 0], tone: "ideia", label: "inflexão" },
      { kind: "text", at: [-1.15, -5.4], text: "∩ para baixo", tone: "alerta" },
      { kind: "text", at: [1.15, 5.4], text: "∪ para cima", tone: "aplicacao" },
    ],
  },

  "area-constante-6": {
    alt: "Reta horizontal na altura dois, com a região entre ela e o eixo x pintada de zero a três, formando um retângulo de área seis.",
    x: [0, 4], y: [0, 4],
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 1, 2, 3, 4],
    legend: "A integral de 0 a 3 de f(x) = 2 é a área do retângulo: 2 × 3 = 6.",
    marks: [
      { kind: "area", top: () => 2, from: 0, to: 3, tone: "aplicacao" },
      { kind: "curve", f: () => 2, tone: "principal" },
      { kind: "text", at: [1.5, 0.9], text: "área = 6", tone: "aplicacao" },
    ],
  },
} satisfies Record<string, PlotSpec>;

export type PlotId = keyof typeof plots;

export function getPlot(id: PlotId): PlotSpec {
  return plots[id];
}
