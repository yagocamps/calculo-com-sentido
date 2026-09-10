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
  | { kind: "segment"; from: [number, number]; to: [number, number]; tone?: PlotTone; dashed?: boolean; label?: string };

export type PlotSpec = {
  /** Leitura para quem não vê a figura. Descreve o que ela mostra, não o que ela é. */
  alt: string;
  x: [number, number];
  y: [number, number];
  xLabel?: string;
  yLabel?: string;
  legend?: string;
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
} satisfies Record<string, PlotSpec>;

export type PlotId = keyof typeof plots;

export function getPlot(id: PlotId): PlotSpec {
  return plots[id];
}
