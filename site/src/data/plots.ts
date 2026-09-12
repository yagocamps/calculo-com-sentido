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
  | { kind: "text"; at: [number, number]; text: string; tone?: PlotTone; anchor?: "start" | "middle" | "end" }
  /** Figura fechada — o triângulo retângulo da trigonometria, por exemplo. */
  | { kind: "polygon"; points: [number, number][]; tone?: PlotTone; fill?: boolean; dashed?: boolean }
  /** Arco marcando um ângulo no vértice `at`, entre as direções de `from` e `to`. */
  | { kind: "angle"; at: [number, number]; from: [number, number]; to: [number, number]; label?: string; tone?: PlotTone }
  /** Quadradinho do ângulo reto. */
  | { kind: "rightAngle"; at: [number, number]; from: [number, number]; to: [number, number]; tone?: PlotTone };

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
  /** Uma figura de geometria (triângulo, rampa) não quer eixos nem malha:
   *  eles só acrescentam ruído a um desenho que não é um gráfico de função. */
  axes?: "cartesiano" | "nenhum";
  /** Mesma escala nos dois eixos. Obrigatório quando a forma é o argumento:
   *  sem isto o círculo de raio 1 sai como elipse e Pitágoras não se enxerga. */
  aspect?: "igual";
  marks: PlotMark[];
};

/** Bordas de uma partição uniforme, para os retângulos de Riemann. */
export function particaoUniforme(de: number, ate: number, n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => de + ((ate - de) * i) / n);
}

/** Reta numérica desenhada à mão, para figuras em que o plano cartesiano só
 *  acrescentaria ruído: a linha, uma marca em cada inteiro e o número embaixo. */
export function retaNumerica(de: number, ate: number): PlotMark[] {
  const marcas: PlotMark[] = [
    { kind: "segment", from: [de - 0.4, 0], to: [ate + 0.4, 0], tone: "neutro" },
  ];
  for (let k = de; k <= ate; k++) {
    marcas.push({ kind: "segment", from: [k, -0.12], to: [k, 0.12], tone: "neutro" });
    marcas.push({ kind: "text", at: [k, -0.55], text: String(k).replace("-", "−"), tone: "neutro" });
  }
  return marcas;
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
    alt: "Uma volta e meia da curva do seno, com o eixo horizontal marcado em graus: parte de zero, sobe a 1 aos 90 graus, volta a zero aos 180, desce a menos 1 aos 270 e retorna a zero aos 360. Uma segunda curva tracejada, o cosseno, tem exatamente a mesma forma mas começa no alto, em 1.",
    x: [0, 540], y: [-1.5, 1.5],
    xLabel: "graus",
    xTicks: [0, 90, 180, 270, 360, 450, 540],
    yTicks: [-1, 0, 1],
    // O eixo vai em graus porque é assim que a aula narra a curva ("sobe até 1
    // em 90°"). Antes o texto falava em graus e a figura vinha em radianos.
    legend: "A senoide oscila entre −1 e 1 e repete a cada volta: período de 360° (ou 2π rad). Amplitude 1. O cosseno (tracejado) é a mesma onda começando do alto: em 0° ele vale 1.",
    marks: [
      { kind: "curve", f: (g) => Math.sin((g * Math.PI) / 180), tone: "principal" },
      { kind: "curve", f: (g) => Math.cos((g * Math.PI) / 180), tone: "ideia", dashed: true },
      { kind: "point", at: [90, 1], tone: "aplicacao", label: "90°" },
      { kind: "point", at: [270, -1], tone: "aplicacao", label: "270°" },
      { kind: "point", at: [180, 0], tone: "neutro" },
      { kind: "point", at: [360, 0], tone: "neutro" },
      { kind: "text", at: [455, 1.28], text: "cosseno", tone: "ideia" },
      { kind: "text", at: [140, 1.28], text: "seno", tone: "principal" },
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
  // ── Trigonometria: o modulo definia seno e cosseno como razoes entre
  //    lados de um triangulo e nao desenhava triangulo nenhum ────────────
  "triangulo-seno": {
    alt: "Triângulo retângulo com o ângulo teta no vértice da esquerda. O lado vertical, na frente do ângulo, é o cateto oposto; o lado inclinado mais longo é a hipotenusa. Os dois estão destacados.",
    x: [-0.6, 5.4], y: [-0.9, 3.6],
    axes: "nenhum",
    aspect: "igual",
    legend: "Seno é o cateto oposto dividido pela hipotenusa — os dois lados destacados.",
    marks: [
      { kind: "polygon", points: [[0, 0], [4, 0], [4, 3]], tone: "neutro" },
      { kind: "segment", from: [4, 0], to: [4, 3], tone: "principal" },
      { kind: "segment", from: [0, 0], to: [4, 3], tone: "principal" },
      { kind: "rightAngle", at: [4, 0], from: [0, 0], to: [4, 3], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [4, 0], to: [4, 3], label: "θ", tone: "aplicacao" },
      { kind: "text", at: [4.55, 1.5], text: "oposto", tone: "principal", anchor: "middle" },
      { kind: "text", at: [1.6, 2.05], text: "hipotenusa", tone: "principal", anchor: "middle" },
      { kind: "text", at: [2, -0.45], text: "adjacente", tone: "neutro", anchor: "middle" },
    ],
  },

  "triangulo-cosseno": {
    alt: "O mesmo triângulo retângulo, agora com o cateto adjacente ao ângulo teta e a hipotenusa destacados.",
    x: [-0.6, 5.4], y: [-0.9, 3.6],
    axes: "nenhum",
    aspect: "igual",
    legend: "Cosseno é o cateto adjacente dividido pela hipotenusa — o lado que forma o ângulo, junto com a hipotenusa.",
    marks: [
      { kind: "polygon", points: [[0, 0], [4, 0], [4, 3]], tone: "neutro" },
      { kind: "segment", from: [0, 0], to: [4, 0], tone: "principal" },
      { kind: "segment", from: [0, 0], to: [4, 3], tone: "principal" },
      { kind: "rightAngle", at: [4, 0], from: [0, 0], to: [4, 3], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [4, 0], to: [4, 3], label: "θ", tone: "aplicacao" },
      { kind: "text", at: [4.55, 1.5], text: "oposto", tone: "neutro", anchor: "middle" },
      { kind: "text", at: [1.6, 2.05], text: "hipotenusa", tone: "principal", anchor: "middle" },
      { kind: "text", at: [2, -0.45], text: "adjacente", tone: "principal", anchor: "middle" },
    ],
  },

  "triangulo-tangente": {
    alt: "O mesmo triângulo retângulo, agora com os dois catetos destacados: o oposto ao ângulo teta e o adjacente a ele.",
    x: [-0.6, 5.4], y: [-0.9, 3.6],
    axes: "nenhum",
    aspect: "igual",
    legend: "Tangente é o cateto oposto dividido pelo adjacente: o quanto sobe sobre o quanto anda.",
    marks: [
      { kind: "polygon", points: [[0, 0], [4, 0], [4, 3]], tone: "neutro" },
      { kind: "segment", from: [4, 0], to: [4, 3], tone: "principal" },
      { kind: "segment", from: [0, 0], to: [4, 0], tone: "principal" },
      { kind: "rightAngle", at: [4, 0], from: [0, 0], to: [4, 3], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [4, 0], to: [4, 3], label: "θ", tone: "aplicacao" },
      { kind: "text", at: [4.75, 1.5], text: "sobe", tone: "principal", anchor: "middle" },
      { kind: "text", at: [2, -0.45], text: "anda", tone: "principal", anchor: "middle" },
      { kind: "text", at: [1.6, 2.05], text: "hipotenusa", tone: "neutro", anchor: "middle" },
    ],
  },

  "triangulo-3-4-5": {
    alt: "Triângulo retângulo de catetos três e quatro e hipotenusa cinco, com o ângulo teta oposto ao cateto de medida três.",
    x: [-0.7, 5.3], y: [-0.9, 3.6],
    axes: "nenhum",
    aspect: "igual",
    legend: "O triângulo 3–4–5: oposto a θ mede 3, adjacente mede 4 e a hipotenusa mede 5.",
    marks: [
      { kind: "polygon", points: [[0, 0], [4, 0], [4, 3]], tone: "aplicacao" },
      { kind: "rightAngle", at: [4, 0], from: [0, 0], to: [4, 3], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [4, 0], to: [4, 3], label: "θ", tone: "principal" },
      { kind: "text", at: [4.45, 1.5], text: "3", tone: "principal", anchor: "middle" },
      { kind: "text", at: [2, -0.45], text: "4", tone: "principal", anchor: "middle" },
      { kind: "text", at: [1.7, 2.05], text: "5", tone: "principal", anchor: "middle" },
    ],
  },

  "rampa-anatomia": {
    alt: "Uma rampa vista de lado: o comprimento da rampa é a hipotenusa, a altura vencida é o cateto oposto ao ângulo de inclinação e o avanço horizontal é o cateto adjacente.",
    x: [-0.6, 6.4], y: [-0.9, 3.2],
    axes: "nenhum",
    aspect: "igual",
    legend: "Comprimento da rampa = hipotenusa · altura vencida = oposto · avanço no chão = adjacente.",
    marks: [
      { kind: "polygon", points: [[0, 0], [5, 0], [5, 2]], tone: "neutro" },
      { kind: "segment", from: [0, 0], to: [5, 2], tone: "principal" },
      { kind: "rightAngle", at: [5, 0], from: [0, 0], to: [5, 2], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [5, 0], to: [5, 2], label: "θ", tone: "aplicacao" },
      { kind: "text", at: [5.65, 1], text: "altura", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [2.2, 1.4], text: "comprimento", tone: "principal", anchor: "middle" },
      { kind: "text", at: [2.5, -0.45], text: "avanço no chão", tone: "neutro", anchor: "middle" },
    ],
  },

  "elevacao-torre": {
    alt: "Uma torre vertical e um observador a trinta metros da base. A linha de visão até o topo forma um ângulo de elevação de quarenta e cinco graus com o chão.",
    x: [-0.6, 6.6], y: [-0.9, 4.2],
    axes: "nenhum",
    aspect: "igual",
    legend: "Distância no chão (30 m) é o adjacente; a altura da torre é o oposto. Com 45°, tangente vale 1 e altura = distância.",
    marks: [
      { kind: "polygon", points: [[0, 0], [5, 0], [5, 3.4]], tone: "neutro", fill: false },
      { kind: "segment", from: [5, 0], to: [5, 3.4], tone: "aplicacao" },
      { kind: "segment", from: [0, 0], to: [5, 3.4], tone: "principal", dashed: true },
      { kind: "rightAngle", at: [5, 0], from: [0, 0], to: [5, 3.4], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [5, 0], to: [5, 3.4], label: "45°", tone: "principal" },
      { kind: "text", at: [5.75, 1.7], text: "altura?", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [2.5, -0.45], text: "30 m", tone: "neutro", anchor: "middle" },
      { kind: "text", at: [2.1, 2.3], text: "linha de visão", tone: "principal", anchor: "middle" },
    ],
  },

  "circulo-unitario-identidade": {
    alt: "Círculo de raio um centrado na origem. Um ponto sobre o círculo no primeiro quadrante tem coordenadas cosseno de teta e seno de teta, formando com a origem e sua projeção no eixo x um triângulo retângulo de hipotenusa um.",
    x: [-1.4, 1.4], y: [-1.4, 1.4],
    xTicks: [-1, 0, 1], yTicks: [-1, 0, 1],
    aspect: "igual",
    legend: "Os catetos medem |cos θ| e |sen θ| e a hipotenusa mede 1: Pitágoras vira sen²θ + cos²θ = 1.",
    marks: [
      { kind: "curve", f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "curve", f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "polygon", points: [[0, 0], [0.8, 0], [0.8, 0.6]], tone: "aplicacao" },
      { kind: "rightAngle", at: [0.8, 0], from: [0, 0], to: [0.8, 0.6], tone: "neutro" },
      { kind: "angle", at: [0, 0], from: [0.8, 0], to: [0.8, 0.6], label: "θ", tone: "principal" },
      { kind: "point", at: [0.8, 0.6], tone: "principal", label: "(cos θ, sen θ)" },
      { kind: "text", at: [1.02, 0.3], text: "sen θ", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.4, -0.16], text: "cos θ", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "circulo-soma-de-arcos": {
    alt: "Círculo de raio um centrado na origem. Um raio sobe do eixo x até o ponto do ângulo a; a partir desse raio, um segundo arco marca mais b graus até o ponto do ângulo a mais b, mais alto e mais à esquerda no primeiro quadrante.",
    x: [-1.4, 1.4], y: [-1.4, 1.4],
    xTicks: [-1, 0, 1], yTicks: [-1, 0, 1],
    aspect: "igual",
    legend: "Somar arcos é girar duas vezes: primeiro a, depois mais b. As fórmulas traduzem esse giro em coordenadas.",
    marks: [
      { kind: "curve", f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "curve", f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "segment", from: [0, 0], to: [0.819, 0.574], tone: "aplicacao" },
      { kind: "segment", from: [0, 0], to: [0.5, 0.866], tone: "principal" },
      { kind: "angle", at: [0, 0], from: [1, 0], to: [0.819, 0.574], label: "a", tone: "aplicacao" },
      { kind: "angle", at: [0, 0], from: [0.819, 0.574], to: [0.5, 0.866], label: "b", tone: "principal" },
      { kind: "point", at: [0.819, 0.574], tone: "aplicacao" },
      { kind: "point", at: [0.5, 0.866], tone: "principal" },
      { kind: "text", at: [0.92, 0.66], text: "ponto de a", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.56, 1.05], text: "ponto de a + b", tone: "principal", anchor: "start" },
    ],
  },

  "quadrantes": {
    alt: "Plano cartesiano com os quatro quadrantes numerados: primeiro à direita e acima, segundo à esquerda e acima, terceiro à esquerda e abaixo, quarto à direita e abaixo.",
    x: [-6, 6], y: [-6, 6],
    xTicks: [-6, -3, 0, 3, 6], yTicks: [-6, -3, 0, 3, 6],
    legend: "O sinal de cada coordenada decide o quadrante: (−, +) fica no 2º e (−, −) no 3º.",
    marks: [
      { kind: "text", at: [3, 3], text: "1º (+, +)", tone: "neutro" },
      { kind: "text", at: [-3, 3], text: "2º (−, +)", tone: "neutro" },
      { kind: "text", at: [-3, -3], text: "3º (−, −)", tone: "neutro" },
      { kind: "text", at: [3, -3], text: "4º (+, −)", tone: "neutro" },
      { kind: "point", at: [-3, 5], tone: "principal", label: "(−3, 5)" },
      { kind: "point", at: [-2, -5], tone: "aplicacao", label: "(−2, −5)" },
    ],
  },

  // ── Estudo de sinal ──────────────────────────────────────────────────
  "sinal-parabola": {
    alt: "Parábola de (x menos 1) vezes (x mais 3), com as raízes em menos três e um. Os dois trechos das pontas ficam acima do eixo, pintados como positivos, e o trecho do meio fica abaixo, pintado como negativo.",
    x: [-4.5, 2.5], y: [-5, 9],
    legend: "Positivo é acima do eixo. O sinal só muda ao passar por uma raiz — por isso basta testar um ponto de cada trecho.",
    marks: [
      { kind: "area", top: (x) => (x - 1) * (x + 3), from: -4.5, to: -3, tone: "aplicacao" },
      { kind: "area", top: (x) => (x - 1) * (x + 3), from: -3, to: 1, tone: "alerta" },
      { kind: "area", top: (x) => (x - 1) * (x + 3), from: 1, to: 2.5, tone: "aplicacao" },
      { kind: "curve", f: (x) => (x - 1) * (x + 3), tone: "principal" },
      { kind: "point", at: [-3, 0], tone: "neutro" },
      { kind: "point", at: [1, 0], tone: "neutro" },
      { kind: "text", at: [-3.9, 5], text: "+", tone: "aplicacao" },
      { kind: "text", at: [-1, -2.2], text: "−", tone: "alerta" },
      { kind: "text", at: [2, 5], text: "+", tone: "aplicacao" },
    ],
  },

  "sinal-racional": {
    alt: "Gráfico de (x mais 1) sobre (x menos 2): a curva cruza o eixo em menos um e tem assíntota vertical em dois. Fica positiva antes de menos um, negativa entre menos um e dois, e positiva depois de dois.",
    x: [-6, 7], y: [-6, 7],
    legend: "A curva toca o eixo em −1, que entra na resposta, e some perto de 2, que nunca entra.",
    marks: [
      { kind: "vline", at: 2, tone: "alerta", label: "x = 2" },
      { kind: "curve", f: (x) => (x + 1) / (x - 2), from: -6, to: 1.5, tone: "principal" },
      { kind: "curve", f: (x) => (x + 1) / (x - 2), from: 2.5, to: 7, tone: "principal" },
      { kind: "point", at: [-1, 0], tone: "aplicacao", label: "entra" },
      { kind: "text", at: [-4, 2.2], text: "+", tone: "aplicacao" },
      { kind: "text", at: [0.4, -2.6], text: "−", tone: "alerta" },
      { kind: "text", at: [5, 2.6], text: "+", tone: "aplicacao" },
    ],
  },

  // ── Pré-cálculo: as funções elementares que faltavam ────────────────
  "modulo-v": {
    alt: "Gráfico em forma de V: os valores descem até zero em x igual a zero e sobem do outro lado, nunca ficando negativos. Os pontos em menos três e em três estão os dois na altura três.",
    x: [-6, 6], y: [-1, 6],
    xTicks: [-6, -4, -2, 0, 2, 4, 6], yTicks: [0, 2, 4, 6],
    legend: "y = |x| — o módulo devolve a distância até zero, então o resultado nunca é negativo. Errar 3 para menos e errar 3 para mais dão o mesmo |x| = 3.",
    marks: [
      { kind: "curve", f: (x) => Math.abs(x), tone: "principal" },
      { kind: "point", at: [-3, 3], tone: "aplicacao", label: "|−3| = 3" },
      { kind: "point", at: [3, 3], tone: "aplicacao", label: "|3| = 3" },
      { kind: "point", at: [0, 0], tone: "neutro" },
      { kind: "text", at: [0, -0.55], text: "bico na origem", tone: "neutro" },
    ],
  },

  "exponencial-dobra": {
    alt: "Curva que sobe muito devagar à esquerda, quase encostando no eixo horizontal, e dispara para cima à direita. Os pontos marcados em x igual a zero, um, dois, três, quatro e cinco valem um, dois, quatro, oito, dezesseis e trinta e dois.",
    x: [-3, 5.5], y: [-5, 40],
    xTicks: [-3, -2, -1, 0, 1, 2, 3, 4, 5], yTicks: [0, 10, 20, 30, 40],
    legend: "y = 2ˣ — a cada passo em x o valor dobra: 1, 2, 4, 8, 16, 32. O crescimento acelera, e à esquerda a curva chega perto de zero sem nunca tocar.",
    marks: [
      { kind: "curve", f: (x) => Math.pow(2, x), tone: "principal" },
      { kind: "point", at: [0, 1], tone: "aplicacao" },
      { kind: "point", at: [1, 2], tone: "aplicacao" },
      { kind: "point", at: [2, 4], tone: "aplicacao" },
      { kind: "point", at: [3, 8], tone: "aplicacao" },
      { kind: "point", at: [4, 16], tone: "aplicacao" },
      { kind: "point", at: [5, 32], tone: "aplicacao", label: "32" },
      { kind: "text", at: [-1.6, 4.5], text: "quase encosta no eixo", tone: "neutro" },
    ],
  },

  "logaritmo-desfaz-exponencial": {
    alt: "Curva que sobe rápido perto de zero e vai achatando. Os pontos marcados mostram que, para o resultado subir de um em um, o x precisa dobrar: 1, 2, 4, 8 e 16 dão 0, 1, 2, 3 e 4.",
    x: [0, 17], y: [-4, 5],
    xTicks: [0, 1, 2, 4, 8, 16], yTicks: [-4, -2, 0, 2, 4],
    legend: "y = log₂(x) — o espelho da exponencial: desfaz o que 2ˣ faz. Cada vez que x dobra, o log sobe exatamente 1.",
    marks: [
      { kind: "curve", f: (x) => Math.log(x) / Math.LN2, from: 0.07, to: 17, tone: "principal" },
      { kind: "point", at: [1, 0], tone: "aplicacao" },
      { kind: "point", at: [2, 1], tone: "aplicacao" },
      { kind: "point", at: [4, 2], tone: "aplicacao" },
      { kind: "point", at: [8, 3], tone: "aplicacao" },
      { kind: "point", at: [16, 4], tone: "aplicacao" },
      { kind: "text", at: [9.5, -1.6], text: "x dobra ⇒ y sobe 1", tone: "neutro" },
    ],
  },

  "juros-composto-contra-simples": {
    alt: "Duas linhas partindo de mil reais: a reta tracejada do juro simples sobe sempre no mesmo ritmo e chega a três mil em vinte anos, enquanto a curva do juro composto vai encurvando para cima e passa de seis mil e setecentos no mesmo prazo.",
    x: [0, 20], y: [0, 7000],
    xLabel: "anos",
    xTicks: [0, 5, 10, 15, 20], yTicks: [0, 2000, 4000, 6000],
    legend: "R$ 1.000 a 10% ao ano. A distância entre as duas linhas é o juro sobre juro: em 2 anos são só R$ 10, em 20 anos passam de R$ 3.700.",
    marks: [
      { kind: "curve", f: (t) => 1000 * Math.pow(1.1, t), tone: "principal" },
      { kind: "curve", f: (t) => 1000 + 100 * t, tone: "neutro", dashed: true },
      { kind: "point", at: [20, 6727.5], tone: "principal" },
      { kind: "point", at: [20, 3000], tone: "neutro" },
      { kind: "text", at: [18.5, 6100], text: "composto: R$ 6.727", tone: "principal", anchor: "end" },
      { kind: "text", at: [18.5, 1700], text: "simples: R$ 3.000", tone: "neutro", anchor: "end" },
    ],
  },

  // ── Preparação para limites: a tendência com buraco ──────────────────
  "aproximacao-buraco-em-1": {
    alt: "Reta crescente com uma bolinha vazada em x igual a um, na altura dois. Pela esquerda os valores sobem para 1,9 e pela direita descem para 2,1: os dois lados cercam a altura dois, que a função não assume.",
    x: [-1, 3], y: [0, 4.5],
    legend: "f(x) = (x² − 1)/(x − 1) vale x + 1 em todo ponto menos em x = 1, onde dá 0/0. A tendência é 2 mesmo sem o ponto existir.",
    marks: [
      { kind: "hline", at: 2, tone: "neutro", label: "a tendência é 2" },
      { kind: "vline", at: 1, tone: "neutro" },
      { kind: "curve", f: (x) => x + 1, from: -1, to: 1, tone: "principal" },
      { kind: "curve", f: (x) => x + 1, from: 1, to: 3, tone: "principal" },
      { kind: "point", at: [0.9, 1.9], tone: "aplicacao" },
      { kind: "point", at: [1.1, 2.1], tone: "aplicacao" },
      { kind: "point", at: [1, 2], open: true, tone: "principal" },
      { kind: "text", at: [-0.9, 3.3], text: "1,9 pela esquerda ↗", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [2.9, 0.9], text: "↘ 2,1 pela direita", tone: "aplicacao", anchor: "end" },
    ],
  },

  // ── Trigonometria: a onda com amplitude e eixo deslocado ─────────────
  "roda-gigante-altura": {
    alt: "Onda que sobe e desce duas vezes ao longo de duas voltas completas. Ela oscila em torno da linha dos doze metros, atinge vinte e dois metros aos noventa graus e dois metros aos duzentos e setenta.",
    x: [0, 720], y: [0, 26],
    xLabel: "ângulo (graus)",
    xTicks: [0, 90, 180, 270, 360, 450, 540, 630, 720],
    yTicks: [0, 2, 12, 22],
    legend: "altura = 12 + 10·sen(θ). O 10 é o raio (amplitude, o quanto sobe e desce); o 12 é a altura do centro, que levanta a onda inteira do chão.",
    marks: [
      { kind: "hline", at: 12, tone: "neutro", label: "centro da roda: 12 m" },
      { kind: "curve", f: (g) => 12 + 10 * Math.sin((g * Math.PI) / 180), tone: "principal" },
      { kind: "point", at: [90, 22], tone: "aplicacao", label: "topo: 22 m" },
      { kind: "point", at: [270, 2], tone: "aplicacao", label: "base: 2 m" },
    ],
  },

  // ── Derivadas: a secante virando tangente ────────────────────────────
  "secante-vira-tangente": {
    alt: "Parábola aberta para cima com dois pontos marcados, em x igual a um e em x igual a três. A reta que liga os dois é a secante; a outra reta, mais deitada, toca a parábola só no ponto de x igual a um e é a tangente.",
    x: [-0.5, 3.5], y: [-2, 10],
    legend: "Sobre f(x) = x², a secante liga (1,1) a (3,9) e tem inclinação 4. Aproximando o segundo ponto do primeiro, ela tomba até virar a tangente, de inclinação 2.",
    marks: [
      { kind: "curve", f: (x) => x * x, tone: "principal" },
      { kind: "segment", from: [1, 1], to: [3, 9], tone: "ideia", label: "secante (m = 4)" },
      { kind: "curve", f: (x) => 2 * x - 1, tone: "aplicacao", dashed: true },
      { kind: "point", at: [1, 1], tone: "principal" },
      { kind: "point", at: [3, 9], tone: "ideia" },
      { kind: "text", at: [1.95, 1.1], text: "tangente (m = 2)", tone: "aplicacao", anchor: "start" },
    ],
  },

  // ── Aplicações da derivada ───────────────────────────────────────────
  "pontos-criticos-x4": {
    alt: "Curva em forma de W: desce até um vale à esquerda, sobe até um topo na origem, desce até outro vale à direita e volta a subir. Nos três pontos de virada a tangente é horizontal.",
    x: [-2.6, 2.6], y: [-6, 6],
    legend: "f(x) = x⁴ − 4x² tem f′ = 0 em x = −√2, 0 e √2. Os três são pontos críticos; só depois de classificar se sabe que os laterais são mínimos e o do meio é máximo.",
    marks: [
      { kind: "segment", from: [-1.95, -4], to: [-0.9, -4], tone: "neutro", dashed: true },
      { kind: "segment", from: [0.9, -4], to: [1.95, -4], tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => x * x * x * x - 4 * x * x, tone: "principal" },
      { kind: "point", at: [0, 0], tone: "aplicacao", label: "x = 0" },
      { kind: "point", at: [-1.414, -4], tone: "principal" },
      { kind: "point", at: [1.414, -4], tone: "principal" },
      { kind: "text", at: [0, 3.4], text: "tangente horizontal nos três", tone: "neutro" },
      { kind: "text", at: [0, -5.3], text: "mínimos em x = ±√2", tone: "neutro" },
    ],
  },

  "otimizacao-cerca-muro": {
    alt: "Parábola aberta para baixo partindo da origem: a área do cercado cresce até o pico de duzentos metros quadrados, quando o lado paralelo ao muro mede vinte metros, e volta a cair até zerar em quarenta.",
    x: [0, 40], y: [0, 240],
    xLabel: "x (m paralelos ao muro)",
    xTicks: [0, 10, 20, 30, 40], yTicks: [0, 50, 100, 150, 200],
    legend: "A(x) = 20x − x²/2, com x entre 0 e 40. Fora desse intervalo não há cercado possível — por isso o domínio faz parte do problema.",
    marks: [
      { kind: "vline", at: 20, tone: "neutro" },
      { kind: "curve", f: (x) => 20 * x - (x * x) / 2, tone: "principal" },
      { kind: "point", at: [20, 200], tone: "aplicacao", label: "x = 20 → A = 200 m²" },
      { kind: "text", at: [7, 40], text: "cresce", tone: "neutro" },
      { kind: "text", at: [33, 40], text: "decresce", tone: "neutro" },
    ],
  },

  "lucro-maximo-marginais": {
    alt: "Parábola aberta para baixo: o lucro começa negativo, cruza o zero perto de cinquenta unidades, sobe até dezoito mil reais em mil unidades e volta a cair, ficando negativo de novo depois de cerca de mil novecentas e cinquenta.",
    x: [0, 2000], y: [-2500, 20000],
    xLabel: "unidades produzidas",
    xTicks: [0, 500, 1000, 1500, 2000],
    yTicks: [0, 5000, 10000, 15000, 20000],
    legend: "L(x) = 40x − 2000 − 0,02x². No pico, L′ = 0 — é onde a receita marginal iguala o custo marginal. Produzir além disso derruba o lucro.",
    marks: [
      { kind: "curve", f: (x) => 40 * x - 2000 - 0.02 * x * x, tone: "principal" },
      { kind: "point", at: [1000, 18000], tone: "aplicacao", label: "x = 1000 → R$ 18.000" },
      { kind: "point", at: [51.3, 0], tone: "neutro" },
      { kind: "point", at: [1948.7, 0], tone: "neutro" },
      { kind: "text", at: [1900, 4500], text: "volta a cair", tone: "alerta", anchor: "end" },
    ],
  },

  // ── Integrais: a soma que vira área ──────────────────────────────────
  "soma-de-riemann-2x": {
    alt: "Reta crescente partindo da origem, com a região abaixo dela pintada entre zero e quatro. Quatro retângulos de mesma largura, com a altura tomada na borda esquerda de cada pedaço, preenchem a região por baixo e deixam de fora um triângulo em cada topo.",
    x: [0, 4.5], y: [0, 9],
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 2, 4, 6, 8],
    legend: "A área sob a reta, entre 0 e 4, é o total acumulado — o que os retângulos tentam estimar. Quanto mais fino o corte, menor a sobra branca no topo.",
    marks: [
      { kind: "area", top: (x) => 2 * x, from: 0, to: 4, tone: "aplicacao" },
      { kind: "rects", f: (x) => 2 * x, edges: particaoUniforme(0, 4, 4), side: "left", tone: "ideia" },
      { kind: "curve", f: (x) => 2 * x, from: 0, to: 4, tone: "principal" },
      { kind: "text", at: [1.9, 1.1], text: "área = total acumulado", tone: "aplicacao" },
    ],
  },

  // ── Funções para o cálculo: crescimento é por intervalo ──────────────
  "crescimento-por-intervalo": {
    alt: "Curva que sobe, atinge um topo em x igual a menos dois, desce até um vale em x igual a dois e volta a subir: a mesma função tem trechos de crescimento e de decrescimento.",
    x: [-4, 4], y: [-20, 20],
    xTicks: [-4, -2, 0, 2, 4], yTicks: [-20, -10, 0, 10, 20],
    legend: "A mesma função pode crescer num trecho e decrescer em outro — por isso se fala em crescimento por intervalo, não da função inteira.",
    marks: [
      { kind: "curve", f: (x) => x * x * x - 12 * x, tone: "principal" },
      { kind: "point", at: [-2, 16], tone: "aplicacao" },
      { kind: "point", at: [2, -16], tone: "aplicacao" },
      { kind: "text", at: [-3.4, 17], text: "cresce ↗", tone: "neutro" },
      { kind: "text", at: [0, 17], text: "decresce ↘", tone: "neutro" },
      { kind: "text", at: [3.5, -17], text: "cresce ↗", tone: "neutro" },
    ],
  },

  // ── Valor absoluto: distância e faixa ────────────────────────────────
  "distancia-na-reta": {
    alt: "Reta numérica de menos cinco a seis. Os pontos menos três e quatro estão marcados, e o trecho entre eles, que atravessa o zero, está destacado. Uma chave acima do trecho indica que a distância entre eles é sete: três passos até o zero e mais quatro depois dele.",
    x: [-5.6, 6.6], y: [-1.4, 1.5],
    axes: "nenhum",
    legend: "Do −3 ao zero são 3 passos; do zero ao 4, mais 4. O módulo faz a mesma conta: |4 − (−3)| = 7.",
    marks: [
      ...retaNumerica(-5, 6),
      { kind: "segment", from: [-3, 0], to: [4, 0], tone: "aplicacao" },
      { kind: "segment", from: [-3, 0.7], to: [4, 0.7], tone: "aplicacao" },
      { kind: "segment", from: [-3, 0.52], to: [-3, 0.88], tone: "aplicacao" },
      { kind: "segment", from: [4, 0.52], to: [4, 0.88], tone: "aplicacao" },
      { kind: "text", at: [0.5, 1.08], text: "distância = |4 − (−3)| = 7", tone: "aplicacao" },
      { kind: "point", at: [-3, 0], tone: "principal" },
      { kind: "point", at: [4, 0], tone: "principal" },
      { kind: "text", at: [-1.5, -1.05], text: "3 passos", tone: "neutro" },
      { kind: "text", at: [2, -1.05], text: "4 passos", tone: "neutro" },
    ],
  },

  "faixa-modular": {
    alt: "Gráfico em V do módulo de x menos três, com o bico no ponto três do eixo e uma linha horizontal na altura dois. O V fica abaixo da linha entre x igual a um e x igual a cinco, trecho pintado que resolve módulo de x menos três menor ou igual a dois. À esquerda de um e à direita de cinco o V passa acima da linha: são as duas pontas que resolvem módulo de x menos três maior que dois.",
    x: [-1.5, 7.5], y: [-0.5, 4.5],
    xTicks: [-1, 0, 1, 2, 3, 4, 5, 6, 7], yTicks: [0, 1, 2, 3, 4],
    legend: "A distância até 3 fica abaixo do raio 2 só na faixa [1, 5]. Fora dela sobram as duas pontas, que são a resposta de |x − 3| > 2.",
    marks: [
      { kind: "area", top: () => 2, bottom: (x) => Math.abs(x - 3), from: 1, to: 5, tone: "aplicacao" },
      { kind: "hline", at: 2, tone: "alerta", label: "raio = 2" },
      { kind: "segment", from: [1, 0], to: [1, 2], tone: "neutro", dashed: true },
      { kind: "segment", from: [5, 0], to: [5, 2], tone: "neutro", dashed: true },
      { kind: "segment", from: [-1.5, 0], to: [1, 0], tone: "alerta", dashed: true },
      { kind: "segment", from: [5, 0], to: [7.5, 0], tone: "alerta", dashed: true },
      { kind: "segment", from: [1, 0], to: [5, 0], tone: "aplicacao" },
      { kind: "curve", f: (x) => Math.abs(x - 3), tone: "principal" },
      { kind: "point", at: [1, 0], tone: "aplicacao" },
      { kind: "point", at: [5, 0], tone: "aplicacao" },
      { kind: "text", at: [3, 1.25], text: "|x − 3| ≤ 2", tone: "aplicacao" },
      { kind: "text", at: [-0.25, 0.9], text: "|x − 3| > 2", tone: "alerta" },
      { kind: "text", at: [6.25, 0.9], text: "|x − 3| > 2", tone: "alerta" },
    ],
  },

  // ── L'Hôpital: razão de inclinações e 1 elevado a infinito ───────────
  "lhopital-razao-inclinacoes": {
    alt: "Duas curvas que passam juntas pelo ponto x igual a dois, na altura zero: x ao cubo menos oito, mais inclinada, e x ao quadrado menos quatro, mais deitada. Cada uma vem com a sua reta tangente tracejada, de inclinações doze e quatro. Um pouco à direita de dois, um traço vertical mostra a altura de cada curva: a primeira fica perto de três vezes a segunda.",
    x: [1.4, 2.6], y: [-6, 10],
    xTicks: [1.5, 2, 2.5], yTicks: [-5, 0, 5, 10],
    legend: "Perto de x = 2 as duas funções se comportam como as suas tangentes, de inclinações 12 e 4. Por isso (x³ − 8)/(x² − 4) tende a 12/4 = 3.",
    marks: [
      { kind: "curve", f: (x) => 12 * (x - 2), tone: "principal", dashed: true },
      { kind: "curve", f: (x) => 4 * (x - 2), tone: "aplicacao", dashed: true },
      { kind: "curve", f: (x) => x * x * x - 8, tone: "principal" },
      { kind: "curve", f: (x) => x * x - 4, tone: "aplicacao" },
      { kind: "segment", from: [2.3, 0], to: [2.3, 4.167], tone: "principal" },
      { kind: "segment", from: [2.3, 0], to: [2.3, 1.29], tone: "aplicacao" },
      { kind: "point", at: [2, 0], tone: "neutro" },
      { kind: "text", at: [2.47, 8.6], text: "f", tone: "principal", anchor: "start" },
      { kind: "text", at: [2.5, 3.1], text: "g", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [1.45, 8.3], text: "perto de 2: altura de f ÷ altura de g → 12 ÷ 4 = 3", tone: "neutro", anchor: "start" },
    ],
  },

  "um-elevado-a-infinito": {
    alt: "Curva que parte da altura dois em x igual a um e sobe cada vez mais devagar, aproximando-se de uma linha tracejada na altura do número e, cerca de dois vírgula setenta e dois. Bem mais abaixo, outra linha tracejada marca a altura um, o valor que a intuição sugere e que a curva nunca alcança.",
    x: [0, 40], y: [0, 3.2],
    xTicks: [0, 10, 20, 30, 40], yTicks: [0, 1, 2, 3],
    legend: "(1 + 1/x)ˣ sobe devagar em direção a e ≈ 2,718, e não a 1. A base encolhe para 1, mas o expoente cresce na mesma medida.",
    marks: [
      { kind: "hline", at: 1, tone: "alerta", label: "a intuição: 1" },
      { kind: "hline", at: Math.E, tone: "aplicacao", label: "e ≈ 2,718" },
      { kind: "curve", f: (x) => Math.pow(1 + 1 / x, x), from: 1, to: 40, tone: "principal" },
      { kind: "point", at: [1, 2], tone: "principal" },
      { kind: "point", at: [10, Math.pow(1.1, 10)], tone: "principal" },
      { kind: "text", at: [1.6, 1.75], text: "x = 1 → 2", tone: "neutro", anchor: "start" },
      { kind: "text", at: [10, 2.3], text: "x = 10 → 2,594", tone: "neutro" },
    ],
  },

  // ── Equações trigonométricas: o círculo e a onda comprimida ──────────
  "seno-igual-meio-ciclo": {
    alt: "Círculo de raio um centrado na origem, cortado por uma linha horizontal na altura um meio. A linha encontra o círculo em dois pontos simétricos em relação ao eixo vertical: o do ângulo de trinta graus, à direita, e o do ângulo de cento e cinquenta graus, à esquerda. Cada raio forma trinta graus com o seu lado do eixo horizontal.",
    x: [-1.5, 1.5], y: [-1.3, 1.3],
    xTicks: [-1, 0, 1], yTicks: [-1, 0, 1],
    aspect: "igual",
    legend: "A altura 1/2 aparece duas vezes por volta: em 30° e em 180° − 30° = 150°. Os dois raios fazem o mesmo ângulo com o eixo horizontal, um de cada lado.",
    marks: [
      { kind: "curve", f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "curve", f: (x) => -Math.sqrt(Math.max(0, 1 - x * x)), from: -1, to: 1, tone: "neutro" },
      { kind: "hline", at: 0.5, tone: "alerta", label: "altura 1/2" },
      { kind: "segment", from: [0, 0], to: [0.866, 0.5], tone: "principal" },
      { kind: "segment", from: [0, 0], to: [-0.866, 0.5], tone: "aplicacao" },
      { kind: "angle", at: [0, 0], from: [1, 0], to: [0.866, 0.5], label: "30°", tone: "principal" },
      { kind: "angle", at: [0, 0], from: [-1, 0], to: [-0.866, 0.5], label: "30°", tone: "aplicacao" },
      { kind: "point", at: [0.866, 0.5], tone: "principal", label: "x = 30°" },
      { kind: "point", at: [-0.866, 0.5], tone: "aplicacao", label: "x = 150°" },
    ],
  },

  "seno-2x-igual-meio": {
    alt: "Duas ondas no intervalo de zero a trezentos e sessenta graus: a do seno de x, tracejada, faz uma volta completa; a do seno de dois x, contínua, faz duas no mesmo espaço. Uma linha horizontal na altura um meio corta a onda de seno de dois x em quatro pontos: quinze, setenta e cinco, cento e noventa e cinco e duzentos e cinquenta e cinco graus.",
    x: [0, 360], y: [-1.5, 1.5],
    xLabel: "x (graus)",
    xTicks: [0, 90, 180, 270, 360], yTicks: [-1, 0, 1],
    legend: "Comprimida pela metade, a onda de sen 2x passa pela altura 1/2 quatro vezes numa volta de x. Resolver sen u = 1/2 só na primeira volta de u encontraria metade delas.",
    marks: [
      { kind: "curve", f: (g) => Math.sin((g * Math.PI) / 180), tone: "neutro", dashed: true },
      { kind: "curve", f: (g) => Math.sin((2 * g * Math.PI) / 180), tone: "principal" },
      { kind: "hline", at: 0.5, tone: "alerta", label: "altura 1/2" },
      { kind: "segment", from: [15, 0.5], to: [15, -0.6], tone: "neutro", dashed: true },
      { kind: "segment", from: [75, 0.5], to: [75, -0.6], tone: "neutro", dashed: true },
      { kind: "segment", from: [195, 0.5], to: [195, -0.6], tone: "neutro", dashed: true },
      { kind: "segment", from: [255, 0.5], to: [255, -0.6], tone: "neutro", dashed: true },
      { kind: "point", at: [15, 0.5], tone: "aplicacao" },
      { kind: "point", at: [75, 0.5], tone: "aplicacao" },
      { kind: "point", at: [195, 0.5], tone: "aplicacao" },
      { kind: "point", at: [255, 0.5], tone: "aplicacao" },
      { kind: "text", at: [15, -0.8], text: "15°", tone: "aplicacao" },
      { kind: "text", at: [75, -0.8], text: "75°", tone: "aplicacao" },
      { kind: "text", at: [195, -0.8], text: "195°", tone: "aplicacao" },
      { kind: "text", at: [255, -0.8], text: "255°", tone: "aplicacao" },
      { kind: "text", at: [45, 1.25], text: "sen 2x", tone: "principal" },
      { kind: "text", at: [100, 1.25], text: "sen x", tone: "neutro" },
    ],
  },

  // ── Limite trigonométrico fundamental: três áreas encaixadas ─────────
  "seno-sobre-h-areas": {
    alt: "Um quarto do círculo de raio um, com um ângulo h marcado a partir do centro. Dentro dele há três regiões encaixadas: um triângulo de altura seno de h, a fatia do círculo com o mesmo ângulo e, por fora, um triângulo maior de altura tangente de h, desenhado tracejado.",
    x: [-0.15, 1.35], y: [-0.25, 1.05],
    axes: "nenhum",
    aspect: "igual",
    legend: "De dentro para fora: triângulo de altura sen h (área sen h/2), fatia do círculo (área h/2) e triângulo de altura tg h (área tg h/2). Dividindo por sen h/2 e invertendo: cos h ≤ sen h/h ≤ 1.",
    marks: [
      { kind: "area", top: (x) => x * Math.tan(0.7), from: 0, to: Math.cos(0.7), tone: "ideia" },
      { kind: "area", top: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: Math.cos(0.7), to: 1, tone: "ideia" },
      { kind: "polygon", points: [[0, 0], [1, 0], [Math.cos(0.7), Math.sin(0.7)]], tone: "aplicacao" },
      { kind: "polygon", points: [[0, 0], [1, 0], [1, Math.tan(0.7)]], tone: "alerta", fill: false, dashed: true },
      { kind: "segment", from: [0, 0], to: [1.25, 0], tone: "neutro" },
      { kind: "curve", f: (x) => Math.sqrt(Math.max(0, 1 - x * x)), from: 0, to: 1, tone: "neutro" },
      { kind: "segment", from: [Math.cos(0.7), 0], to: [Math.cos(0.7), Math.sin(0.7)], tone: "neutro", dashed: true },
      { kind: "angle", at: [0, 0], from: [1, 0], to: [Math.cos(0.7), Math.sin(0.7)], label: "h", tone: "principal" },
      { kind: "point", at: [Math.cos(0.7), Math.sin(0.7)], tone: "principal" },
      { kind: "point", at: [1, Math.tan(0.7)], tone: "alerta" },
      { kind: "text", at: [Math.cos(0.7) - 0.03, 0.3], text: "sen h", tone: "aplicacao", anchor: "end" },
      { kind: "text", at: [1.05, 0.42], text: "tg h", tone: "alerta", anchor: "start" },
      { kind: "text", at: [0.5, -0.12], text: "1", tone: "neutro", anchor: "middle" },
    ],
  },

  // ── Geometria analítica: Pitágoras, degrau, ângulo reto e raio ───────
  "distancia-pitagoras": {
    alt: "Os pontos A, em um vírgula dois, e B, em quatro vírgula seis, ligados por um segmento. Um trecho horizontal de comprimento três e um vertical de comprimento quatro formam com ele um triângulo retângulo, cuja hipotenusa mede cinco. O ponto médio M fica no meio do segmento.",
    x: [0.3, 5], y: [1.3, 6.6],
    xTicks: [1, 2, 3, 4], yTicks: [2, 3, 4, 5, 6],
    aspect: "igual",
    legend: "Δx = 3 e Δy = 4 são os catetos; a distância é a hipotenusa, √(3² + 4²) = 5. O ponto médio M = (5/2, 4) fica a 2,5 de cada ponta.",
    marks: [
      { kind: "segment", from: [1, 2], to: [4, 2], tone: "ideia", dashed: true },
      { kind: "segment", from: [4, 2], to: [4, 6], tone: "ideia", dashed: true },
      { kind: "rightAngle", at: [4, 2], from: [1, 2], to: [4, 6], tone: "neutro" },
      { kind: "segment", from: [1, 2], to: [4, 6], tone: "principal" },
      { kind: "point", at: [1, 2], tone: "principal" },
      { kind: "point", at: [4, 6], tone: "principal" },
      { kind: "point", at: [2.5, 4], tone: "aplicacao" },
      { kind: "text", at: [0.8, 2.05], text: "A", tone: "principal", anchor: "end" },
      { kind: "text", at: [4.2, 6.15], text: "B", tone: "principal", anchor: "start" },
      { kind: "text", at: [2.3, 4.35], text: "M", tone: "aplicacao", anchor: "end" },
      { kind: "text", at: [2.5, 1.62], text: "Δx = 3", tone: "ideia" },
      { kind: "text", at: [4.2, 4], text: "Δy = 4", tone: "ideia", anchor: "start" },
      { kind: "text", at: [2, 4.8], text: "d = 5", tone: "principal", anchor: "end" },
    ],
  },

  "reta-ponto-inclinacao": {
    alt: "A reta y igual a dois x mais um, passando pelos pontos A, em um vírgula três, e B, em quatro vírgula nove. A partir de A, um degrau marca uma unidade para a direita e duas para cima, voltando à reta.",
    x: [-1, 5], y: [-1, 11],
    xTicks: [-1, 0, 1, 2, 3, 4, 5], yTicks: [0, 3, 6, 9],
    legend: "Inclinação 2: cada unidade para a direita sobe 2. Com o ponto A, a reta é y − 3 = 2(x − 1), ou y = 2x + 1.",
    marks: [
      { kind: "curve", f: (x) => 2 * x + 1, tone: "principal" },
      { kind: "segment", from: [1, 3], to: [2, 3], tone: "aplicacao" },
      { kind: "segment", from: [2, 3], to: [2, 5], tone: "aplicacao" },
      { kind: "point", at: [1, 3], tone: "principal" },
      { kind: "point", at: [4, 9], tone: "principal" },
      { kind: "text", at: [1.5, 2.1], text: "1", tone: "aplicacao" },
      { kind: "text", at: [2.2, 4], text: "2", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.85, 3.7], text: "A (1, 3)", tone: "principal", anchor: "end" },
      { kind: "text", at: [3.8, 9.6], text: "B (4, 9)", tone: "principal", anchor: "end" },
    ],
  },

  "retas-perpendiculares": {
    alt: "A reta y igual a dois x mais um e a reta y igual a menos meio x mais cinco, que se cruzam no ponto um vírgula seis, quatro vírgula dois, formando um ângulo reto marcado. A segunda reta passa pelo ponto quatro vírgula três. Os dois eixos usam a mesma escala.",
    x: [-1, 7], y: [0, 7],
    aspect: "igual",
    legend: "Inclinações 2 e −1/2: o produto é −1, e o ângulo é reto. Com escalas iguais nos eixos, o ângulo reto aparece como ângulo reto.",
    marks: [
      { kind: "curve", f: (x) => 2 * x + 1, from: -0.5, to: 3, tone: "principal" },
      { kind: "curve", f: (x) => -x / 2 + 5, from: -1, to: 7, tone: "aplicacao" },
      { kind: "rightAngle", at: [1.6, 4.2], from: [0, 1], to: [4, 3], tone: "neutro" },
      { kind: "point", at: [4, 3], tone: "aplicacao" },
      { kind: "text", at: [2.9, 6.3], text: "y = 2x + 1", tone: "principal", anchor: "start" },
      { kind: "text", at: [5.6, 3.1], text: "y = −x/2 + 5", tone: "aplicacao" },
      { kind: "text", at: [4.1, 2.35], text: "(4, 3)", tone: "aplicacao", anchor: "start" },
    ],
  },

  "circunferencia-centro-raio": {
    alt: "A circunferência de centro dois vírgula menos três e raio cinco. Um segmento liga o centro ao ponto sete vírgula menos três, na borda, marcando o raio.",
    x: [-4, 8.5], y: [-8.5, 2.5],
    aspect: "igual",
    legend: "(x − 2)² + (y + 3)² = 25: todos os pontos a 5 unidades de (2, −3). O centro aparece com os sinais trocados na equação.",
    marks: [
      { kind: "curve", f: (x) => -3 + Math.sqrt(Math.max(0, 25 - (x - 2) * (x - 2))), from: -3, to: 7, tone: "principal" },
      { kind: "curve", f: (x) => -3 - Math.sqrt(Math.max(0, 25 - (x - 2) * (x - 2))), from: -3, to: 7, tone: "principal" },
      { kind: "segment", from: [2, -3], to: [7, -3], tone: "aplicacao", label: "r = 5" },
      { kind: "point", at: [2, -3], tone: "aplicacao" },
      { kind: "point", at: [7, -3], tone: "principal" },
      { kind: "text", at: [1.8, -3.8], text: "centro (2, −3)", tone: "aplicacao", anchor: "end" },
      { kind: "text", at: [7.3, -2.3], text: "(7, −3)", tone: "principal", anchor: "start" },
    ],
  },

  "limite-substituicao-direta": {
    alt: "Parábola subindo. Em x igual a três, uma linha tracejada sobe do eixo horizontal até a curva e outra segue da curva até o eixo vertical, na altura catorze, onde há um ponto cheio sobre a curva.",
    x: [0, 5], y: [-3, 20],
    xTicks: [0, 1, 2, 3, 4, 5], yTicks: [0, 5, 10, 14, 20],
    legend: "A curva passa pelo ponto: o limite em x = 3 é o próprio valor f(3) = 14.",
    marks: [
      { kind: "curve", f: (x) => x * x + 2 * x - 1, from: 0, to: 4, tone: "principal" },
      { kind: "segment", from: [3, 0], to: [3, 14], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 14], to: [3, 14], tone: "neutro", dashed: true },
      { kind: "point", at: [3, 14], tone: "principal" },
      { kind: "text", at: [3.2, 15.8], text: "f(3) = 14", tone: "principal", anchor: "start" },
      { kind: "text", at: [3, -1.8], text: "x = 3", tone: "neutro", anchor: "middle" },
    ],
  },

  "limites-laterais-com-valor-diferente": {
    alt: "Duas semirretas chegam à mesma altura três em x igual a dois, terminando num ponto vazado. Acima delas, um ponto cheio isolado marca a altura cinco, que é o valor da função nesse x.",
    x: [-0.5, 4.5], y: [-1, 7],
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 1, 3, 5, 7],
    legend: "Os dois lados chegam a 3, então o limite é 3 — mesmo com f(2) = 5.",
    marks: [
      { kind: "curve", f: (x) => x + 1, from: -0.5, to: 2, tone: "aplicacao" },
      { kind: "curve", f: (x) => 2 * x - 1, from: 2, to: 4.5, tone: "principal" },
      { kind: "segment", from: [0, 3], to: [2, 3], tone: "neutro", dashed: true },
      { kind: "point", at: [2, 3], open: true, tone: "neutro" },
      { kind: "point", at: [2, 5], tone: "alerta" },
      { kind: "text", at: [2.2, 5.4], text: "f(2) = 5", tone: "alerta", anchor: "start" },
      { kind: "text", at: [0.15, 3.4], text: "limite 3", tone: "neutro", anchor: "start" },
    ],
  },

  "secante-encolhendo-para-tangente": {
    alt: "Parábola da posição em função do tempo. Uma reta secante liga os pontos em t igual a dois e em t igual a dois e meio; uma reta tracejada, menos inclinada, toca a curva apenas no ponto em t igual a dois.",
    x: [0, 3.4], y: [-1, 9],
    xTicks: [0, 1, 2, 3], yTicks: [0, 2, 4, 6, 8],
    legend: "A secante de [2; 2,5] tem inclinação 4,5 m/s; a tangente em t = 2 tem 4 m/s.",
    marks: [
      { kind: "curve", f: (t) => t * t, from: 0, to: 3, tone: "neutro" },
      { kind: "curve", f: (t) => 4 * t - 4, from: 1.2, to: 3.2, tone: "principal", dashed: true },
      { kind: "segment", from: [1.6, 2.2], to: [2.9, 8.05], tone: "aplicacao" },
      { kind: "point", at: [2, 4], tone: "principal" },
      { kind: "point", at: [2.5, 6.25], tone: "aplicacao" },
      { kind: "text", at: [2.95, 7.6], text: "secante 4,5", tone: "aplicacao", anchor: "end" },
      { kind: "text", at: [1.3, 1.2], text: "tangente 4", tone: "principal", anchor: "start" },
    ],
  },

  "custo-medio-e-marginal": {
    alt: "Duas curvas em função da quantidade produzida: o custo médio desce, chega a um ponto mais baixo e volta a subir; o custo marginal é uma reta crescente que cruza o custo médio exatamente nesse ponto mais baixo.",
    x: [40, 420], y: [8, 22],
    xTicks: [50, 150, 250, 350], yTicks: [10, 15, 20],
    legend: "O custo marginal cruza o custo médio no ponto mais baixo do médio, perto de q = 224.",
    marks: [
      { kind: "curve", f: (q) => 500 / q + 8 + 0.01 * q, from: 40, to: 420, tone: "principal" },
      { kind: "curve", f: (q) => 8 + 0.02 * q, from: 40, to: 420, tone: "aplicacao" },
      { kind: "point", at: [223.6, 12.47], tone: "alerta" },
      { kind: "text", at: [238, 13.4], text: "mínimo do médio", tone: "alerta", anchor: "start" },
      { kind: "text", at: [62, 19.2], text: "custo médio", tone: "principal", anchor: "start" },
      { kind: "text", at: [300, 15.4], text: "custo marginal", tone: "aplicacao", anchor: "start" },
    ],
  },

  "assintotas-um-sobre-x-mais-dois": {
    alt: "Hipérbole com dois ramos. À direita, a curva desce do alto e se aproxima da altura dois; à esquerda, sobe por baixo e também se aproxima de dois. Junto ao eixo vertical os dois ramos disparam, um para cima e outro para baixo.",
    x: [-4, 4], y: [-3, 7],
    xTicks: [-4, -2, 0, 2, 4], yTicks: [-2, 0, 2, 4, 6],
    legend: "Assíntota vertical em x = 0 e horizontal em y = 2: a curva se aproxima das duas sem tocar nenhuma.",
    marks: [
      { kind: "hline", at: 2, tone: "alerta", label: "y = 2" },
      { kind: "vline", at: 0, tone: "alerta", label: "x = 0" },
      { kind: "curve", f: (x) => 1 / x + 2, from: -4, to: -0.2, tone: "principal" },
      { kind: "curve", f: (x) => 1 / x + 2, from: 0.2, to: 4, tone: "principal" },
    ],
  },

  "limites-das-partes": {
    alt: "Duas retas cruzam a linha vertical em x igual a dois: uma sobe e chega à altura dois; a outra desce e chega à altura menos três. Linhas tracejadas ligam cada ponto de chegada ao eixo vertical.",
    x: [-0.5, 4], y: [-6, 4],
    xTicks: [0, 1, 2, 3], yTicks: [-6, -3, 0, 2, 4],
    legend: "Cada parte tem seu próprio limite em x = 2; as propriedades combinam esses dois números.",
    marks: [
      { kind: "vline", at: 2, tone: "neutro" },
      { kind: "curve", f: (x) => x, from: -0.5, to: 4, tone: "principal" },
      { kind: "curve", f: (x) => 1 - 2 * x, from: -0.5, to: 4, tone: "aplicacao" },
      { kind: "segment", from: [0, 2], to: [2, 2], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, -3], to: [2, -3], tone: "neutro", dashed: true },
      { kind: "point", at: [2, 2], tone: "principal" },
      { kind: "point", at: [2, -3], tone: "aplicacao" },
      { kind: "text", at: [3.15, 3.4], text: "f → 2", tone: "principal", anchor: "start" },
      { kind: "text", at: [3.15, -5.4], text: "g → −3", tone: "aplicacao", anchor: "start" },
    ],
  },

  "furo-depois-da-fatoracao": {
    alt: "Reta inclinada subindo. Em x igual a menos dois há um ponto vazado na altura um: ali a expressão original não existe, embora a reta siga normalmente dos dois lados.",
    x: [-5, 2], y: [-3, 6],
    xTicks: [-4, -2, 0, 2], yTicks: [-2, 0, 1, 3, 5],
    legend: "Depois de fatorar, a expressão vale x + 3 para todo x ≠ −2. O furo em (−2, 1) é o único traço da indeterminação.",
    marks: [
      { kind: "curve", f: (x) => x + 3, from: -5, to: 2, tone: "principal" },
      { kind: "segment", from: [-2, 0], to: [-2, 1], tone: "neutro", dashed: true },
      { kind: "point", at: [-2, 1], open: true, tone: "alerta" },
      { kind: "text", at: [-1.7, 0.3], text: "x = −2", tone: "neutro", anchor: "start" },
      { kind: "text", at: [-1.7, 1.7], text: "limite 1", tone: "alerta", anchor: "start" },
    ],
  },

  "furo-depois-da-racionalizacao": {
    alt: "Curva suave levemente decrescente, quase horizontal. Em x igual a zero há um ponto vazado na altura de um quarto, valor para o qual a expressão tende.",
    x: [-3.5, 6], y: [0.1, 0.45],
    xTicks: [-3, 0, 3, 6],
    legend: "Depois da racionalização sobra 1/(√(x+4) + 2), que em x = 0 vale 1/4 — o limite procurado.",
    marks: [
      { kind: "curve", f: (x) => 1 / (Math.sqrt(x + 4) + 2), from: -3.5, to: 6, tone: "principal" },
      { kind: "point", at: [0, 0.25], open: true, tone: "alerta" },
      { kind: "text", at: [0.3, 0.29], text: "limite 1/4", tone: "alerta", anchor: "start" },
      { kind: "text", at: [-3.2, 0.42], text: "a expressão original não existe em x = 0", tone: "neutro", anchor: "start" },
    ],
  },

  "confronto-oscilacao-espremida": {
    alt: "Duas retas formam um funil que se fecha na origem: uma é y igual ao módulo de x, a outra é o seu oposto. Entre elas, uma curva oscila cada vez mais rápido e com amplitude cada vez menor à medida que se aproxima de zero.",
    x: [-1, 1], y: [-1, 1],
    xTicks: [-1, 0, 1], yTicks: [-1, 0, 1],
    aspect: "igual",
    legend: "A oscilação continua até o fim, mas fica presa entre −|x| e |x|, que se encontram em zero.",
    marks: [
      { kind: "curve", f: (x) => Math.abs(x), from: -1, to: 1, tone: "alerta", dashed: true },
      { kind: "curve", f: (x) => -Math.abs(x), from: -1, to: 1, tone: "alerta", dashed: true },
      { kind: "curve", f: (x) => (x === 0 ? 0 : x * Math.sin(1 / x)), from: -1, to: 1, tone: "principal" },
      { kind: "point", at: [0, 0], tone: "principal" },
      { kind: "text", at: [0.5, 0.88], text: "y = |x|", tone: "alerta", anchor: "start" },
      { kind: "text", at: [0.5, -0.94], text: "y = −|x|", tone: "alerta", anchor: "start" },
    ],
  },

  "mesma-forma-tres-resultados": {
    alt: "Três curvas no primeiro quadrante, todas indo em direção ao eixo vertical: uma reta horizontal na altura um, uma reta que desce até a origem e uma curva que dispara para cima perto do zero.",
    x: [0, 2.2], y: [0, 5],
    xTicks: [0, 1, 2], yTicks: [0, 1, 3, 5],
    legend: "As três têm forma 0/0 em x = 0 e terminam diferentes: 1, 0 e sem limite finito.",
    marks: [
      { kind: "curve", f: () => 1, from: 0.02, to: 2.2, tone: "principal" },
      { kind: "curve", f: (x) => x, from: 0, to: 2.2, tone: "aplicacao" },
      { kind: "curve", f: (x) => 1 / x, from: 0.2, to: 2.2, tone: "alerta" },
      { kind: "text", at: [1.45, 1.2], text: "x/x → 1", tone: "principal", anchor: "start" },
      { kind: "text", at: [1.6, 2.05], text: "x²/x → 0", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.3, 4.4], text: "x/x² dispara", tone: "alerta", anchor: "start" },
    ],
  },

  "epsilon-delta-faixas": {
    alt: "Reta crescente atravessando o cruzamento de duas faixas: uma faixa horizontal estreita em torno da altura seis e uma faixa vertical estreita em torno de x igual a três. O ponto do encontro fica no centro.",
    x: [1.5, 4.5], y: [3, 9],
    xTicks: [2, 3, 4], yTicks: [4, 6, 8],
    legend: "Exigir |f(x) − 6| < 1 equivale, nesta reta, a exigir |x − 3| < 0,5: o delta responde ao epsilon.",
    marks: [
      { kind: "hline", at: 7, tone: "alerta" },
      { kind: "hline", at: 5, tone: "alerta" },
      { kind: "vline", at: 3.5, tone: "aplicacao" },
      { kind: "vline", at: 2.5, tone: "aplicacao" },
      { kind: "curve", f: (x) => 2 * x, from: 1.5, to: 4.5, tone: "principal" },
      { kind: "point", at: [3, 6], tone: "principal" },
      { kind: "text", at: [1.6, 7.35], text: "L + ε = 7", tone: "alerta", anchor: "start" },
      { kind: "text", at: [1.6, 4.5], text: "L − ε = 5", tone: "alerta", anchor: "start" },
      { kind: "text", at: [3.56, 3.4], text: "a + δ", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [2.44, 3.4], text: "a − δ", tone: "aplicacao", anchor: "end" },
    ],
  },

  "exponencial-e-logaritmo": {
    alt: "Duas curvas: a exponencial sobe suavemente e passa pela altura um quando x é zero; o logaritmo existe apenas à direita do eixo vertical e despenca quando x se aproxima de zero.",
    x: [-2.5, 3], y: [-4, 8],
    xTicks: [-2, 0, 1, 2, 3], yTicks: [-3, 0, 1, 4, 8],
    legend: "A exponencial é contínua em toda a reta; o logaritmo despenca para −∞ quando x se aproxima de zero pela direita.",
    marks: [
      { kind: "vline", at: 0, tone: "neutro" },
      { kind: "curve", f: (x) => Math.exp(x), from: -2.5, to: 2.1, tone: "principal" },
      { kind: "curve", f: (x) => Math.log(x), from: 0.02, to: 3, tone: "aplicacao" },
      { kind: "point", at: [0, 1], tone: "principal" },
      { kind: "text", at: [1.45, 6.4], text: "y = eˣ", tone: "principal", anchor: "start" },
      { kind: "text", at: [2.1, 0.5], text: "y = ln x", tone: "aplicacao", anchor: "start" },
    ],
  },

  "regra-da-soma-inclinacoes": {
    alt: "Três curvas partindo da esquerda: uma parábola tracejada, uma reta tracejada e, acima delas, a curva da soma. Em x igual a um, cada uma recebe um pequeno traço de tangente; o traço da soma é visivelmente mais inclinado que os outros dois.",
    x: [-0.5, 2.4], y: [-1, 8],
    xTicks: [0, 1, 2], yTicks: [0, 1, 2, 3, 6],
    legend: "Em x = 1, as inclinações das partes são 2 e 2; a da soma é 4 — as taxas se somam.",
    marks: [
      { kind: "curve", f: (x) => x * x, from: -0.5, to: 2.4, tone: "aplicacao", dashed: true },
      { kind: "curve", f: (x) => 2 * x, from: -0.5, to: 2.4, tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => x * x + 2 * x, from: -0.5, to: 2.4, tone: "principal" },
      { kind: "segment", from: [0.6, 0.2], to: [1.4, 1.8], tone: "aplicacao" },
      { kind: "segment", from: [0.6, 1.2], to: [1.4, 2.8], tone: "neutro" },
      { kind: "segment", from: [0.6, 1.4], to: [1.4, 4.6], tone: "principal" },
      { kind: "point", at: [1, 1], tone: "aplicacao" },
      { kind: "point", at: [1, 2], tone: "neutro" },
      { kind: "point", at: [1, 3], tone: "principal" },
      { kind: "text", at: [2.05, 7.2], text: "f + g", tone: "principal", anchor: "end" },
      { kind: "text", at: [2.35, 5.4], text: "f = x²", tone: "aplicacao", anchor: "end" },
      { kind: "text", at: [2.35, 4.1], text: "g = 2x", tone: "neutro", anchor: "end" },
    ],
  },

  "potencia-funcao-e-derivada": {
    alt: "Uma parábola com o vértice na origem e, sobre o mesmo par de eixos, a reta da sua derivada, que é negativa à esquerda do zero, passa pela origem e fica positiva à direita.",
    x: [-2.5, 2.5], y: [-4, 6],
    xTicks: [-2, -1, 0, 1, 2], yTicks: [-4, -2, 0, 2, 4, 6],
    legend: "Onde a derivada é negativa a parábola desce; onde é positiva, sobe; no zero da derivada está o vértice.",
    marks: [
      { kind: "curve", f: (x) => x * x, from: -2.5, to: 2.5, tone: "principal" },
      { kind: "curve", f: (x) => 2 * x, from: -2.2, to: 2.2, tone: "aplicacao" },
      { kind: "point", at: [0, 0], tone: "alerta" },
      { kind: "text", at: [-2.4, 5.2], text: "f(x) = x²", tone: "principal", anchor: "start" },
      { kind: "text", at: [1.35, 3.4], text: "f′(x) = 2x", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.12, -1.1], text: "f′ = 0 no vértice", tone: "alerta", anchor: "start" },
    ],
  },

  "cadeia-onda-comprimida": {
    alt: "Duas ondas sobre os mesmos eixos: uma completa um ciclo no trecho mostrado; a outra, mais apertada, completa dois ciclos no mesmo espaço.",
    x: [0, 6.4], y: [-1.5, 1.5],
    xTicks: [0, 2, 4, 6], yTicks: [-1, 0, 1],
    legend: "A camada interna 2x aperta a onda pela metade: por isso a derivada ganha o fator 2 da regra da cadeia.",
    marks: [
      { kind: "curve", f: (x) => Math.sin(x), from: 0, to: 6.4, tone: "neutro" },
      { kind: "curve", f: (x) => Math.sin(2 * x), from: 0, to: 6.4, tone: "principal" },
      { kind: "text", at: [1.3, 1.32], text: "sen x", tone: "neutro", anchor: "start" },
      { kind: "text", at: [3.5, -1.32], text: "sen 2x: o dobro da velocidade", tone: "principal", anchor: "middle" },
    ],
  },

  "sinal-da-derivada-tres-tangentes": {
    alt: "Curva em forma de S deitado: sobe, desce no meio e volta a subir. Em três pontos há pequenos traços de tangente — inclinados para cima nas pontas e para baixo no meio.",
    x: [-2.2, 2.2], y: [-3, 3],
    xTicks: [-2, -1, 0, 1, 2], yTicks: [-2, 0, 2],
    legend: "O sinal da derivada decide a direção: positiva nas pontas (sobe) e negativa no meio (desce).",
    marks: [
      { kind: "curve", f: (x) => x * x * x - 3 * x, from: -2.1, to: 2.1, tone: "principal" },
      { kind: "segment", from: [-1.8, 0], to: [-1.2, 2.25], tone: "aplicacao" },
      { kind: "segment", from: [-0.35, 1.05], to: [0.35, -1.05], tone: "alerta" },
      { kind: "segment", from: [1.2, -2.25], to: [1.8, 0], tone: "aplicacao" },
      { kind: "point", at: [-1.5, 1.125], tone: "aplicacao" },
      { kind: "point", at: [0, 0], tone: "alerta" },
      { kind: "point", at: [1.5, -1.125], tone: "aplicacao" },
      { kind: "text", at: [-2.15, 2.7], text: "f′ > 0", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.45, 1.1], text: "f′ < 0", tone: "alerta", anchor: "start" },
      { kind: "text", at: [1.1, -2.7], text: "f′ > 0", tone: "aplicacao", anchor: "start" },
    ],
  },

  "posicao-e-velocidade": {
    alt: "Curva da posição que sobe, atinge um topo, desce até um vale e volta a subir. Abaixo dela, a curva tracejada da velocidade cruza o zero exatamente nos instantes do topo e do vale.",
    x: [0, 4.2], y: [-4, 7],
    xTicks: [0, 1, 2, 3, 4], yTicks: [-4, 0, 4],
    legend: "A velocidade zera exatamente onde a posição vira: no topo (t = 1) e no vale (t = 3).",
    marks: [
      { kind: "hline", at: 0, tone: "neutro" },
      { kind: "curve", f: (t) => t * t * t - 6 * t * t + 9 * t, from: 0, to: 4.2, tone: "principal" },
      { kind: "curve", f: (t) => 3 * t * t - 12 * t + 9, from: 0.35, to: 4.05, tone: "aplicacao", dashed: true },
      { kind: "point", at: [1, 4], tone: "principal" },
      { kind: "point", at: [3, 0], tone: "principal" },
      { kind: "text", at: [1, 5], text: "topo", tone: "principal", anchor: "middle" },
      { kind: "text", at: [3.05, -1.2], text: "vale", tone: "principal", anchor: "start" },
      { kind: "text", at: [3.5, 4.6], text: "velocidade", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "receita-custo-e-lucro-maximo": {
    alt: "Uma reta de receita e uma curva de custo que partem juntas e voltam a se encontrar. Entre elas, um segmento vertical marca a maior distância, na metade do caminho.",
    x: [0, 330], y: [0, 13000],
    xTicks: [0, 100, 150, 200, 300], yTicks: [0, 4000, 8000],
    legend: "O lucro é a distância entre receita e custo; ela é máxima em x = 150, onde as duas inclinações se igualam.",
    marks: [
      { kind: "curve", f: (x) => 40 * x, from: 0, to: 330, tone: "principal" },
      { kind: "curve", f: (x) => 0.1 * x * x + 10 * x, from: 0, to: 330, tone: "aplicacao" },
      { kind: "segment", from: [150, 3750], to: [150, 6000], tone: "alerta" },
      { kind: "point", at: [150, 6000], tone: "alerta" },
      { kind: "point", at: [150, 3750], tone: "alerta" },
      { kind: "text", at: [158, 5100], text: "lucro máximo", tone: "alerta", anchor: "start" },
      { kind: "text", at: [232, 10200], text: "receita", tone: "principal", anchor: "middle" },
      { kind: "text", at: [292, 8100], text: "custo", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "tangente-na-revisao-derivadas": {
    alt: "Curva que sobe devagar, achata perto da origem e depois dispara. No ponto em x igual a um, uma reta tangente toca a curva e acompanha sua inclinação.",
    x: [-0.6, 1.6], y: [-1.5, 5],
    xTicks: [0, 1], yTicks: [-1, 0, 2, 4],
    legend: "Derivar f(x) = x²(3x − 1) dá f′(1) = 7: é a inclinação da tangente marcada no ponto (1, 2).",
    marks: [
      { kind: "curve", f: (x) => 3 * x * x * x - x * x, from: -0.6, to: 1.35, tone: "principal" },
      { kind: "curve", f: (x) => 2 + 7 * (x - 1), from: 0.55, to: 1.45, tone: "aplicacao", dashed: true },
      { kind: "point", at: [1, 2], tone: "aplicacao" },
      { kind: "text", at: [1.08, 1.3], text: "f′(1) = 7", tone: "aplicacao", anchor: "start" },
    ],
  },

  "inversa-reflexao-e-inclinacoes": {
    alt: "Duas curvas espelhadas em relação à reta tracejada que faz quarenta e cinco graus: uma sobe rápido, a outra cresce devagar. Cada uma recebe um traço de tangente em pontos correspondentes; um traço é íngreme e o outro, suave.",
    x: [0, 5], y: [0, 5],
    xTicks: [0, 1, 2, 3, 4, 5], yTicks: [0, 1, 2, 3, 4, 5],
    aspect: "igual",
    legend: "Em pontos correspondentes, as inclinações são inversas: 4 numa curva e 1/4 na outra.",
    marks: [
      { kind: "curve", f: (x) => x, from: 0, to: 5, tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => x * x, from: 0, to: 2.24, tone: "principal" },
      { kind: "curve", f: (x) => Math.sqrt(x), from: 0, to: 5, tone: "aplicacao" },
      { kind: "segment", from: [1.75, 3], to: [2.25, 5], tone: "principal" },
      { kind: "segment", from: [3, 1.75], to: [5, 2.25], tone: "aplicacao" },
      { kind: "point", at: [2, 4], tone: "principal" },
      { kind: "point", at: [4, 2], tone: "aplicacao" },
      { kind: "text", at: [0.72, 4.3], text: "f(x) = x², inclinação 4", tone: "principal", anchor: "start" },
      { kind: "text", at: [2.6, 1.2], text: "f⁻¹(x) = √x, inclinação 1/4", tone: "aplicacao", anchor: "start" },
    ],
  },

  "seno-e-cosseno-derivada": {
    alt: "Duas ondas do mesmo tamanho, deslocadas entre si: onde a primeira atinge o topo, a segunda cruza o zero descendo.",
    x: [0, 6.4], y: [-1.5, 1.6],
    xTicks: [0, 2, 4, 6], yTicks: [-1, 0, 1],
    legend: "A derivada do seno é o cosseno: no topo do seno a inclinação é zero, e é exatamente ali que o cosseno cruza o eixo.",
    marks: [
      { kind: "segment", from: [1.5708, -1.5], to: [1.5708, 1.5], tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => Math.sin(x), from: 0, to: 6.4, tone: "principal" },
      { kind: "curve", f: (x) => Math.cos(x), from: 0, to: 6.4, tone: "aplicacao" },
      { kind: "point", at: [1.5708, 1], tone: "principal" },
      { kind: "point", at: [1.5708, 0], tone: "aplicacao" },
      { kind: "text", at: [1.75, 1.4], text: "topo do seno", tone: "principal", anchor: "start" },
      { kind: "text", at: [4.3, 1.15], text: "cosseno", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "exponencial-inclinacao-igual-altura": {
    alt: "Curva exponencial subindo. Em dois pontos há traços de tangente: no primeiro, a altura é um e o traço sobe suave; no segundo, a altura é quase três e o traço é bem mais íngreme.",
    x: [-2, 2.2], y: [-1, 8],
    xTicks: [-2, -1, 0, 1, 2], yTicks: [0, 1, 3, 6],
    legend: "Em cada ponto, a inclinação da tangente é igual à altura da curva: é o que faz eˣ ser sua própria derivada.",
    marks: [
      { kind: "curve", f: (x) => Math.exp(x), from: -2, to: 2.05, tone: "principal" },
      { kind: "curve", f: (x) => x + 1, from: -1.6, to: 1.2, tone: "aplicacao", dashed: true },
      { kind: "curve", f: (x) => Math.E * x, from: 0.1, to: 2.1, tone: "alerta", dashed: true },
      { kind: "point", at: [0, 1], tone: "aplicacao" },
      { kind: "point", at: [1, 2.718], tone: "alerta" },
      { kind: "text", at: [-1.9, 2.1], text: "inclinação 1 na altura 1", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.75, 1.1], text: "inclinação e na altura e", tone: "alerta", anchor: "start" },
    ],
  },

  "circunferencia-tangente-implicita": {
    alt: "Circunferência centrada na origem. Um raio tracejado vai do centro até um ponto no primeiro quadrante, e nesse ponto uma reta tangente cruza a curva formando ângulo reto com o raio.",
    x: [-7, 7.5], y: [-7, 7.5],
    xTicks: [-5, 0, 3, 5], yTicks: [-5, 0, 4, 5],
    aspect: "igual",
    legend: "Na circunferência x² + y² = 25, a derivação implícita dá inclinação −x/y: em (3, 4), vale −3/4.",
    marks: [
      { kind: "curve", f: (x) => Math.sqrt(Math.max(0, 25 - x * x)), from: -5, to: 5, tone: "neutro" },
      { kind: "curve", f: (x) => -Math.sqrt(Math.max(0, 25 - x * x)), from: -5, to: 5, tone: "neutro" },
      { kind: "segment", from: [0, 0], to: [3, 4], tone: "aplicacao", dashed: true },
      { kind: "curve", f: (x) => 4 - 0.75 * (x - 3), from: -1, to: 7.2, tone: "principal" },
      { kind: "rightAngle", at: [3, 4], from: [0, 0], to: [7.2, 0.85], tone: "neutro" },
      { kind: "point", at: [3, 4], tone: "principal" },
      { kind: "text", at: [3.4, 4.9], text: "(3, 4): inclinação −3/4", tone: "principal", anchor: "start" },
    ],
  },

  "concavidade-x-cubo": {
    alt: "Curva que sobe o tempo todo, mas muda o jeito de curvar: à esquerda da origem ela é abaulada para cima e à direita, para baixo. No ponto de troca, na origem, há um ponto marcado.",
    x: [-2, 2], y: [-6, 6],
    xTicks: [-2, -1, 0, 1, 2], yTicks: [-3, 0, 3, 6],
    legend: "A segunda derivada de x³ é 6x: negativa antes do zero e positiva depois. Na origem a concavidade troca.",
    marks: [
      { kind: "curve", f: (x) => x * x * x, from: -1.85, to: 1.85, tone: "principal" },
      { kind: "point", at: [0, 0], tone: "alerta" },
      { kind: "text", at: [-1.9, -3.6], text: "f″ < 0", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.9, 3.4], text: "f″ > 0", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [0.12, -1], text: "inflexão", tone: "alerta", anchor: "start" },
    ],
  },

  "area-sob-a-curva-definida": {
    alt: "Parábola subindo a partir da origem. A região entre a curva e o eixo horizontal, de zero até três, está pintada.",
    x: [-0.5, 4], y: [-1, 10],
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 3, 6, 9],
    legend: "A integral definida é o número que mede essa área: de 0 a 3, ela vale exatamente 9.",
    marks: [
      { kind: "area", top: (x) => x * x, from: 0, to: 3, tone: "aplicacao" },
      { kind: "curve", f: (x) => x * x, from: -0.5, to: 3.2, tone: "principal" },
      { kind: "text", at: [1.5, 2.2], text: "área = 9", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [3, -0.7], text: "b = 3", tone: "neutro", anchor: "middle" },
      { kind: "text", at: [0, -0.7], text: "a = 0", tone: "neutro", anchor: "middle" },
    ],
  },

  "integral-aditiva-em-c": {
    alt: "Reta inclinada a quarenta e cinco graus. A região sob ela está pintada em duas partes, separadas por uma linha vertical no meio do intervalo.",
    x: [-0.5, 4.6], y: [-0.5, 5],
    xTicks: [0, 2, 4], yTicks: [0, 2, 4],
    legend: "Partir o intervalo em c = 2 divide a área em 2 e 6; somadas, dão os mesmos 8 do intervalo inteiro.",
    marks: [
      { kind: "area", top: (x) => x, from: 0, to: 2, tone: "aplicacao" },
      { kind: "area", top: (x) => x, from: 2, to: 4, tone: "ideia" },
      { kind: "segment", from: [2, 0], to: [2, 2], tone: "neutro", dashed: true },
      { kind: "curve", f: (x) => x, from: -0.5, to: 4.6, tone: "principal" },
      { kind: "text", at: [1.25, 0.6], text: "2", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [3.1, 1.4], text: "6", tone: "ideia", anchor: "middle" },
      { kind: "text", at: [2, -0.35], text: "c", tone: "neutro", anchor: "middle" },
    ],
  },

  "deslocamento-contra-distancia": {
    alt: "Reta da velocidade que começa negativa, cruza o zero no meio do intervalo e termina positiva. A parte abaixo do eixo e a parte acima estão pintadas em tons diferentes e têm o mesmo tamanho.",
    x: [-0.3, 6.4], y: [-4, 4],
    xTicks: [0, 3, 6], yTicks: [-3, 0, 3],
    legend: "As duas áreas valem 4,5 cada: o deslocamento soma −4,5 + 4,5 = 0, mas a distância percorrida é 9.",
    marks: [
      { kind: "area", top: (t) => t - 3, from: 0, to: 3, tone: "alerta" },
      { kind: "area", top: (t) => t - 3, from: 3, to: 6, tone: "aplicacao" },
      { kind: "hline", at: 0, tone: "neutro" },
      { kind: "curve", f: (t) => t - 3, from: -0.3, to: 6.4, tone: "principal" },
      { kind: "text", at: [1.5, -2.6], text: "−4,5 (volta)", tone: "alerta", anchor: "middle" },
      { kind: "text", at: [4.5, 2.2], text: "+4,5 (avança)", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "consumo-acumulado-area": {
    alt: "Reta levemente crescente representando a potência ao longo do tempo. Toda a região sob ela, das zero às oito horas, está pintada.",
    x: [-0.3, 9], y: [0, 8],
    xTicks: [0, 2, 4, 6, 8], yTicks: [0, 2, 4, 6],
    legend: "A taxa é potência em kW e o eixo horizontal é tempo em horas: a área acumulada são 32 kWh de energia.",
    marks: [
      { kind: "area", top: (t) => 2 + 0.5 * t, from: 0, to: 8, tone: "aplicacao" },
      { kind: "curve", f: (t) => 2 + 0.5 * t, from: -0.3, to: 9, tone: "principal" },
      { kind: "text", at: [4, 2], text: "32 kWh", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [8.2, 6.6], text: "potência (kW)", tone: "principal", anchor: "end" },
    ],
  },

  "area-entre-curva-e-eixo": {
    alt: "Parábola aberta para baixo cortando o eixo horizontal em menos dois e em dois. Toda a região entre a curva e o eixo está pintada.",
    x: [-3, 3], y: [-1.5, 5],
    xTicks: [-2, -1, 0, 1, 2], yTicks: [0, 2, 4],
    legend: "Entre os cortes em −2 e 2, a área vale 32/3 ≈ 10,7. Girando essa região em torno do eixo, a mesma integral vira volume.",
    marks: [
      { kind: "area", top: (x) => 4 - x * x, from: -2, to: 2, tone: "aplicacao" },
      { kind: "hline", at: 0, tone: "neutro" },
      { kind: "curve", f: (x) => 4 - x * x, from: -2.6, to: 2.6, tone: "principal" },
      { kind: "text", at: [0, 1.5], text: "A = 32/3", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "custo-adicional-marginal": {
    alt: "Reta crescente do custo marginal. A faixa sob ela, entre cem e duzentas unidades, está pintada.",
    x: [0, 240], y: [0, 46],
    xTicks: [0, 100, 200], yTicks: [0, 20, 30, 40],
    legend: "A área sob o custo marginal entre 100 e 200 unidades é o custo adicional: R$ 3.500.",
    marks: [
      { kind: "area", top: (x) => 20 + 0.1 * x, from: 100, to: 200, tone: "aplicacao" },
      { kind: "curve", f: (x) => 20 + 0.1 * x, from: 0, to: 240, tone: "principal" },
      { kind: "text", at: [150, 14], text: "R$ 3.500", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [232, 41], text: "C′(x)", tone: "principal", anchor: "end" },
    ],
  },

  "deslocamento-triangulo-velocidade": {
    alt: "Reta que sai da origem e sobe. A região triangular sob ela, de zero a quatro segundos, está pintada.",
    x: [-0.3, 5], y: [-1, 14],
    xTicks: [0, 1, 2, 3, 4], yTicks: [0, 4, 8, 12],
    legend: "Com v(t) = 3t, a área é um triângulo de base 4 e altura 12: o deslocamento é 24 m.",
    marks: [
      { kind: "area", top: (t) => 3 * t, from: 0, to: 4, tone: "aplicacao" },
      { kind: "curve", f: (t) => 3 * t, from: -0.3, to: 4.6, tone: "principal" },
      { kind: "text", at: [2.1, 3.4], text: "24 m", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [4.55, 12.6], text: "v(t) = 3t", tone: "principal", anchor: "end" },
    ],
  },

  "substituicao-troca-os-extremos": {
    alt: "Curva crescente da função interna. Linhas tracejadas mostram que a entrada zero chega à altura um e que a entrada dois chega à altura cinco.",
    x: [-0.3, 2.5], y: [0, 6],
    xTicks: [0, 1, 2], yTicks: [0, 1, 3, 5],
    legend: "Com u = x² + 1, os extremos também mudam: x de 0 a 2 vira u de 1 a 5.",
    marks: [
      { kind: "curve", f: (x) => x * x + 1, from: -0.3, to: 2.3, tone: "principal" },
      { kind: "segment", from: [2, 0], to: [2, 5], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 5], to: [2, 5], tone: "neutro", dashed: true },
      { kind: "segment", from: [0, 1], to: [0.1, 1], tone: "neutro", dashed: true },
      { kind: "point", at: [0, 1], tone: "aplicacao" },
      { kind: "point", at: [2, 5], tone: "aplicacao" },
      { kind: "text", at: [0.15, 1.45], text: "x = 0 → u = 1", tone: "aplicacao", anchor: "start" },
      { kind: "text", at: [1.9, 5.45], text: "x = 2 → u = 5", tone: "aplicacao", anchor: "end" },
    ],
  },

  "valor-medio-retangulo": {
    alt: "Parábola com a região sob ela pintada, e sobre o mesmo trecho um retângulo tracejado de altura constante. As duas áreas são iguais.",
    x: [-0.4, 3.6], y: [-1, 10],
    xTicks: [0, 1, 2, 3], yTicks: [0, 3, 6, 9],
    legend: "O retângulo de altura 3 sobre [0, 3] tem a mesma área da região sob a curva: 3 é o valor médio.",
    marks: [
      { kind: "area", top: (x) => x * x, from: 0, to: 3, tone: "aplicacao" },
      { kind: "polygon", points: [[0, 0], [3, 0], [3, 3], [0, 3]], tone: "alerta", dashed: true },
      { kind: "curve", f: (x) => x * x, from: -0.4, to: 3.2, tone: "principal" },
      { kind: "hline", at: 3, tone: "alerta" },
      { kind: "text", at: [0.15, 3.5], text: "altura média 3", tone: "alerta", anchor: "start" },
      { kind: "text", at: [2.35, 1.1], text: "mesma área", tone: "aplicacao", anchor: "middle" },
    ],
  },

  "area-entre-curvas-com-cruzamento": {
    alt: "Uma reta e uma parábola que se cruzam duas vezes. Entre o primeiro e o segundo cruzamento a reta está por cima; depois, a parábola passa à frente. As duas regiões estão pintadas em tons diferentes.",
    x: [-0.3, 2.4], y: [-0.6, 4.5],
    xTicks: [0, 1, 2], yTicks: [0, 1, 2, 4],
    legend: "Em [0, 1] a reta está acima; em [1, 2] é a parábola. Somando 1/6 e 5/6, a área geométrica é 1.",
    marks: [
      { kind: "area", top: (x) => x, bottom: (x) => x * x, from: 0, to: 1, tone: "aplicacao" },
      { kind: "area", top: (x) => x * x, bottom: (x) => x, from: 1, to: 2, tone: "ideia" },
      { kind: "curve", f: (x) => x, from: -0.3, to: 2.4, tone: "principal" },
      { kind: "curve", f: (x) => x * x, from: -0.3, to: 2.1, tone: "alerta" },
      { kind: "point", at: [1, 1], tone: "neutro" },
      { kind: "text", at: [0.6, -0.34], text: "1/6", tone: "aplicacao", anchor: "middle" },
      { kind: "text", at: [1.72, 2.1], text: "5/6", tone: "ideia", anchor: "middle" },
      { kind: "text", at: [1.05, 0.75], text: "cruzamento", tone: "neutro", anchor: "start" },
    ],
  },

  "solido-de-revolucao-cone": {
    alt: "Duas retas simétricas saindo da origem formam um triângulo deitado em torno do eixo horizontal, com a região entre elas pintada. Um segmento vertical na ponta direita marca o disco de maior raio.",
    x: [-0.4, 2.8], y: [-2.6, 2.6],
    xTicks: [0, 1, 2], yTicks: [-2, 0, 2],
    aspect: "igual",
    legend: "Girando a região sob y = x em torno do eixo, cada fatia vira um disco de raio x; o sólido é um cone de volume 8π/3.",
    marks: [
      { kind: "area", top: (x) => x, bottom: (x) => -x, from: 0, to: 2, tone: "aplicacao" },
      { kind: "hline", at: 0, tone: "neutro" },
      { kind: "curve", f: (x) => x, from: 0, to: 2, tone: "principal" },
      { kind: "curve", f: (x) => -x, from: 0, to: 2, tone: "principal", dashed: true },
      { kind: "segment", from: [2, -2], to: [2, 2], tone: "alerta" },
      { kind: "text", at: [2.1, 1.2], text: "raio 2", tone: "alerta", anchor: "start" },
      { kind: "text", at: [2.72, 0.32], text: "eixo", tone: "neutro", anchor: "end" },
    ],
  },
} satisfies Record<string, PlotSpec>;

export type PlotId = keyof typeof plots;

export function getPlot(id: PlotId): PlotSpec {
  return plots[id];
}
