import type { PlotSpec, PlotMark, PlotTone } from "@/data/plots";

/**
 * Gráfico desenhado no servidor, sem JavaScript no cliente.
 *
 * O site tinha 11 laboratórios interativos excelentes e nenhuma figura no
 * resto — inclusive em exercícios que pedem para "ler o gráfico" e descrevem
 * a curva em palavras. Aqui o objetivo não é interatividade: é existir a
 * figura, imprimir junto com a página e não custar nada para carregar.
 *
 * O que este componente precisa saber desenhar é exatamente o vocabulário de
 * Cálculo 1: bolinha aberta (o buraco), salto, assíntota, retângulos de
 * Riemann e área entre curvas.
 */

const W = 600;
const H = 340;
// `bottom` acomoda duas linhas: os números do eixo e, abaixo deles, o nome da
// variável — que senão fica por cima da última marca de escala.
// `top` deixa o nome do eixo y acima da marca de escala mais alta, que senão
// escreve por cima dele.
const PAD = { top: 34, right: 18, bottom: 48, left: 46 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const TONES: Record<PlotTone, string> = {
  principal: "var(--terracotta)",
  aplicacao: "var(--sage)",
  ideia: "var(--sky)",
  alerta: "var(--amber)",
  neutro: "var(--ink-subtle)",
};

function toneColor(tone: PlotTone = "principal") {
  return TONES[tone];
}

/** Números do eixo em pt-BR, sem casas inúteis. */
function fmt(v: number) {
  const arredondado = Math.abs(v) < 1e-9 ? 0 : v;
  return arredondado.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

type Escala = {
  x: (valor: number) => number;
  y: (valor: number) => number;
  xMin: number; xMax: number; yMin: number; yMax: number;
};

function criarEscala(spec: PlotSpec): Escala {
  const [xMin, xMax] = spec.x;
  const [yMin, yMax] = spec.y;
  return {
    xMin, xMax, yMin, yMax,
    x: (v) => PAD.left + ((v - xMin) / (xMax - xMin)) * PLOT_W,
    y: (v) => PAD.top + PLOT_H - ((v - yMin) / (yMax - yMin)) * PLOT_H,
  };
}

/** Marcas de escala "redondas" dentro do domínio. */
function ticks(min: number, max: number, alvo = 6): number[] {
  const bruto = (max - min) / alvo;
  const potencia = Math.pow(10, Math.floor(Math.log10(bruto)));
  const passo = [1, 2, 2.5, 5, 10].map((m) => m * potencia).find((p) => p >= bruto) ?? potencia * 10;
  const saida: number[] = [];
  for (let v = Math.ceil(min / passo) * passo; v <= max + 1e-9; v += passo) {
    saida.push(Math.abs(v) < passo / 1000 ? 0 : v);
  }
  return saida;
}

/**
 * Amostra a função e quebra o traço onde ela sai do quadro ou deixa de existir
 * — é o que faz uma assíntota vertical aparecer como duas pernas separadas em
 * vez de um risco atravessando o gráfico.
 */
function caminho(
  f: (x: number) => number,
  de: number,
  ate: number,
  esc: Escala,
  amostras = 240,
): string {
  const partes: string[] = [];
  let abriu = false;
  const folga = (esc.yMax - esc.yMin) * 0.25;
  for (let i = 0; i <= amostras; i++) {
    const x = de + ((ate - de) * i) / amostras;
    const y = f(x);
    const dentro = Number.isFinite(y) && y >= esc.yMin - folga && y <= esc.yMax + folga;
    if (!dentro) {
      abriu = false;
      continue;
    }
    const px = esc.x(x).toFixed(1);
    const py = esc.y(Math.min(esc.yMax + folga, Math.max(esc.yMin - folga, y))).toFixed(1);
    partes.push(`${abriu ? "L" : "M"}${px},${py}`);
    abriu = true;
  }
  return partes.join(" ");
}

function Marca({ mark, esc }: { mark: PlotMark; esc: Escala }) {
  const cor = toneColor(mark.tone);

  switch (mark.kind) {
    case "curve": {
      const de = mark.from ?? esc.xMin;
      const ate = mark.to ?? esc.xMax;
      return (
        <path
          d={caminho(mark.f, de, ate, esc)}
          fill="none"
          stroke={cor}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={mark.dashed ? "6 5" : undefined}
        />
      );
    }
    case "point": {
      const [x, y] = mark.at;
      const cx = esc.x(x);
      const cy = esc.y(y);
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={5.5}
            fill={mark.open ? "var(--surface)" : cor}
            stroke={cor}
            strokeWidth={2.5}
          />
          {mark.label && (
            <text x={cx + 10} y={cy - 9} fill="var(--ink-muted)" fontSize={14} fontFamily="var(--font-sans)">
              {mark.label}
            </text>
          )}
        </g>
      );
    }
    case "vline": {
      const px = esc.x(mark.at);
      return (
        <g>
          <line
            x1={px} x2={px} y1={PAD.top} y2={PAD.top + PLOT_H}
            stroke={cor} strokeWidth={2} strokeDasharray="7 6"
          />
          {mark.label && (
            <text x={px + 6} y={PAD.top + 14} fill={cor} fontSize={14} fontFamily="var(--font-sans)">
              {mark.label}
            </text>
          )}
        </g>
      );
    }
    case "hline": {
      const py = esc.y(mark.at);
      return (
        <g>
          <line
            x1={PAD.left} x2={PAD.left + PLOT_W} y1={py} y2={py}
            stroke={cor} strokeWidth={2} strokeDasharray="7 6"
          />
          {mark.label && (
            <text x={PAD.left + PLOT_W - 6} y={py - 8} textAnchor="end" fill={cor} fontSize={14} fontFamily="var(--font-sans)">
              {mark.label}
            </text>
          )}
        </g>
      );
    }
    case "rects": {
      return (
        <g>
          {mark.edges.slice(0, -1).map((esquerda, i) => {
            const direita = mark.edges[i + 1];
            const amostraEm = mark.side === "right" ? direita : esquerda;
            const altura = mark.f(amostraEm);
            const yTopo = esc.y(Math.max(altura, 0));
            const yBase = esc.y(Math.min(altura, 0));
            return (
              <rect
                key={i}
                x={esc.x(esquerda)}
                y={yTopo}
                width={esc.x(direita) - esc.x(esquerda)}
                height={Math.max(1, yBase - yTopo)}
                fill={cor}
                fillOpacity={0.18}
                stroke={cor}
                strokeWidth={1.5}
              />
            );
          })}
        </g>
      );
    }
    case "area": {
      const amostras = 160;
      const topo: string[] = [];
      const base: string[] = [];
      for (let i = 0; i <= amostras; i++) {
        const x = mark.from + ((mark.to - mark.from) * i) / amostras;
        topo.push(`${esc.x(x).toFixed(1)},${esc.y(mark.top(x)).toFixed(1)}`);
        base.push(`${esc.x(x).toFixed(1)},${esc.y(mark.bottom ? mark.bottom(x) : 0).toFixed(1)}`);
      }
      return (
        <polygon
          points={[...topo, ...base.reverse()].join(" ")}
          fill={cor}
          fillOpacity={0.2}
          stroke="none"
        />
      );
    }
    case "text": {
      return (
        <text
          x={esc.x(mark.at[0])}
          y={esc.y(mark.at[1])}
          textAnchor={mark.anchor ?? "middle"}
          fill={cor}
          fontSize={14}
          fontWeight={600}
          fontFamily="var(--font-sans)"
        >
          {mark.text}
        </text>
      );
    }
    case "segment": {
      const [x1, y1] = mark.from;
      const [x2, y2] = mark.to;
      return (
        <g>
          <line
            x1={esc.x(x1)} y1={esc.y(y1)} x2={esc.x(x2)} y2={esc.y(y2)}
            stroke={cor} strokeWidth={2.5} strokeLinecap="round"
            strokeDasharray={mark.dashed ? "6 5" : undefined}
          />
          {mark.label && (
            <text
              x={esc.x((x1 + x2) / 2) + 8}
              y={esc.y((y1 + y2) / 2) - 8}
              fill={cor} fontSize={14} fontFamily="var(--font-sans)"
            >
              {mark.label}
            </text>
          )}
        </g>
      );
    }
  }
}

export function StaticPlot({ spec, className }: { spec: PlotSpec; className?: string }) {
  const esc = criarEscala(spec);
  const xTicks = spec.xTicks ?? ticks(esc.xMin, esc.xMax);
  const yTicks = spec.yTicks ?? ticks(esc.yMin, esc.yMax);
  const eixoX = esc.y(0);
  const eixoY = esc.x(0);
  const temEixoX = esc.yMin <= 0 && esc.yMax >= 0;
  const temEixoY = esc.xMin <= 0 && esc.xMax >= 0;

  return (
    <figure className={className}>
      <div className="overflow-x-auto rounded-2 border border-border bg-surface">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={spec.alt}
          className="block h-auto w-full min-w-[320px]"
        >
          <g aria-hidden="true">
            {xTicks.map((t) => (
              <line key={`gx-${t}`} x1={esc.x(t)} x2={esc.x(t)} y1={PAD.top} y2={PAD.top + PLOT_H}
                stroke="var(--border-soft)" strokeWidth={1} />
            ))}
            {yTicks.map((t) => (
              <line key={`gy-${t}`} x1={PAD.left} x2={PAD.left + PLOT_W} y1={esc.y(t)} y2={esc.y(t)}
                stroke="var(--border-soft)" strokeWidth={1} />
            ))}

            {temEixoX && (
              <line x1={PAD.left} x2={PAD.left + PLOT_W} y1={eixoX} y2={eixoX}
                stroke="var(--ink-subtle)" strokeWidth={1.5} />
            )}
            {temEixoY && (
              <line x1={eixoY} x2={eixoY} y1={PAD.top} y2={PAD.top + PLOT_H}
                stroke="var(--ink-subtle)" strokeWidth={1.5} />
            )}

            {xTicks.map((t) => (
              <text key={`tx-${t}`} x={esc.x(t)} y={PAD.top + PLOT_H + 20} textAnchor="middle"
                fill="var(--ink-subtle)" fontSize={13} fontFamily="var(--font-mono)">
                {fmt(t)}
              </text>
            ))}
            {yTicks.map((t) => (
              <text key={`ty-${t}`} x={PAD.left - 8} y={esc.y(t) + 4} textAnchor="end"
                fill="var(--ink-subtle)" fontSize={13} fontFamily="var(--font-mono)">
                {fmt(t)}
              </text>
            ))}

            <text x={PAD.left + PLOT_W} y={PAD.top + PLOT_H + 40} textAnchor="end"
              fill="var(--ink-muted)" fontSize={13} fontStyle="italic" fontFamily="var(--font-serif)">
              {spec.xLabel ?? "x"}
            </text>
            <text x={PAD.left - 8} y={PAD.top - 18} textAnchor="end"
              fill="var(--ink-muted)" fontSize={13} fontStyle="italic" fontFamily="var(--font-serif)">
              {spec.yLabel ?? "y"}
            </text>
          </g>

          {spec.marks.map((mark, i) => (
            <Marca key={i} mark={mark} esc={esc} />
          ))}
        </svg>
      </div>
      {spec.legend && (
        <figcaption className="mt-2 text-xs leading-relaxed text-ink-subtle">{spec.legend}</figcaption>
      )}
    </figure>
  );
}
