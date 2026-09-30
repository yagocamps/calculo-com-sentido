import type { PlotSpec, PlotMark, PlotTone } from "@/data/plots";
import { createPlotScale, formatPlotTick as fmt, layoutPlotLabels, PLOT_HEIGHT as H, PLOT_WIDTH as W, type PlotScale as Escala } from "@/lib/plot-layout";

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
  const PAD = esc.pad;
  const PLOT_W = esc.width;
  const PLOT_H = esc.height;

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
    case "text": return null;
    case "polygon": {
      return (
        <polygon
          points={mark.points.map(([x, y]) => `${esc.x(x).toFixed(1)},${esc.y(y).toFixed(1)}`).join(" ")}
          fill={mark.fill === false ? "none" : cor}
          fillOpacity={mark.fill === false ? 0 : 0.14}
          stroke={cor}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeDasharray={mark.dashed ? "6 5" : undefined}
        />
      );
    }
    case "angle": {
      // O arco é calculado em pixels para sair redondo mesmo quando as escalas
      // de x e y são diferentes.
      const v = { x: esc.x(mark.at[0]), y: esc.y(mark.at[1]) };
      const dir = (p: [number, number]) => {
        const dx = esc.x(p[0]) - v.x;
        const dy = esc.y(p[1]) - v.y;
        const n = Math.hypot(dx, dy) || 1;
        return { x: dx / n, y: dy / n };
      };
      const a = dir(mark.from);
      const b = dir(mark.to);
      const r = 30;
      const p1 = { x: v.x + a.x * r, y: v.y + a.y * r };
      const p2 = { x: v.x + b.x * r, y: v.y + b.y * r };
      // `sweep` escolhe o lado curto do arco, que é sempre o ângulo interno.
      const cruz = a.x * b.y - a.y * b.x;
      return (
        <g>
          <path
            d={`M${p1.x.toFixed(1)},${p1.y.toFixed(1)} A${r},${r} 0 0 ${cruz > 0 ? 1 : 0} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`}
            fill="none"
            stroke={cor}
            strokeWidth={2}
          />
        </g>
      );
    }
    case "rightAngle": {
      const v = { x: esc.x(mark.at[0]), y: esc.y(mark.at[1]) };
      const dir = (p: [number, number]) => {
        const dx = esc.x(p[0]) - v.x;
        const dy = esc.y(p[1]) - v.y;
        const n = Math.hypot(dx, dy) || 1;
        return { x: dx / n, y: dy / n };
      };
      const a = dir(mark.from);
      const b = dir(mark.to);
      const s = 15;
      return (
        <polyline
          points={[
            `${(v.x + a.x * s).toFixed(1)},${(v.y + a.y * s).toFixed(1)}`,
            `${(v.x + (a.x + b.x) * s).toFixed(1)},${(v.y + (a.y + b.y) * s).toFixed(1)}`,
            `${(v.x + b.x * s).toFixed(1)},${(v.y + b.y * s).toFixed(1)}`,
          ].join(" ")}
          fill="none"
          stroke={cor}
          strokeWidth={2}
        />
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
        </g>
      );
    }
  }
}

export function StaticPlot({ spec, className }: { spec: PlotSpec; className?: string }) {
  const esc = createPlotScale(spec);
  const { pad: PAD, width: PLOT_W, height: PLOT_H, xTicks, yTicks } = esc;
  const labels = layoutPlotLabels(spec, esc);
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
          {spec.axes !== "nenhum" && (
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
            <text x={PAD.left} y={PAD.top - 18} textAnchor="start"
              fill="var(--ink-muted)" fontSize={13} fontStyle="italic" fontFamily="var(--font-serif)">
              {spec.yLabel ?? "y"}
            </text>
          </g>
          )}

          {/* A nested viewport clips function traces without clipping annotations
              or the open circles used to explain holes at domain boundaries. */}
          <svg x={PAD.left} y={PAD.top} width={PLOT_W} height={PLOT_H} viewBox={`${PAD.left} ${PAD.top} ${PLOT_W} ${PLOT_H}`} overflow="hidden" aria-hidden="true">
            {spec.marks.map((mark, i) => ["curve", "area", "rects"].includes(mark.kind) ? <Marca key={i} mark={mark} esc={esc} /> : null)}
          </svg>
          {spec.marks.map((mark, i) => !["curve", "area", "rects"].includes(mark.kind) ? <Marca key={i} mark={mark} esc={esc} /> : null)}
          <g stroke="var(--surface)" strokeWidth={5} strokeLinejoin="round" paintOrder="stroke fill" fontFamily="var(--font-sans)">
            {labels.map((label,i)=><text key={i} x={label.x} y={label.y} textAnchor={label.anchor} fill={toneColor(label.tone)} fontSize={label.size} fontWeight={label.weight}>{label.text}</text>)}
          </g>
        </svg>
      </div>
      {spec.legend && (
        <figcaption className="mt-2 text-xs leading-relaxed text-ink-subtle">{spec.legend}</figcaption>
      )}
    </figure>
  );
}
