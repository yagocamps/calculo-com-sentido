"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import type { VisualLabKind } from "@/data/visual-labs";

const W = 600;
const H = 300;
const P = 38;

function fmt(value: number, digits = 2) {
  const normalized = Math.abs(value) < 10 ** -(digits + 1) ? 0 : value;
  return normalized.toLocaleString("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  });
}

function pointPath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  samples = 100,
) {
  return Array.from({ length: samples + 1 }, (_, index) => {
    const x = xMin + ((xMax - xMin) * index) / samples;
    const y = fn(x);
    const px = P + ((x - xMin) / (xMax - xMin)) * (W - 2 * P);
    const py = H - P - ((y - yMin) / (yMax - yMin)) * (H - 2 * P);
    return `${index === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
  }).join(" ");
}

function xy(
  x: number,
  y: number,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
) {
  return {
    x: P + ((x - xMin) / (xMax - xMin)) * (W - 2 * P),
    y: H - P - ((y - yMin) / (yMax - yMin)) * (H - 2 * P),
  };
}

function Axes({
  xMin,
  xMax,
  yMin,
  yMax,
}: {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}) {
  const xAxis = xy(0, 0, xMin, xMax, yMin, yMax).y;
  const yAxis = xy(0, 0, xMin, xMax, yMin, yMax).x;
  return (
    <g aria-hidden="true" stroke="var(--border)">
      {[1, 2, 3, 4, 5].map((n) => (
        <line
          key={`v-${n}`}
          x1={(W * n) / 6}
          x2={(W * n) / 6}
          y1={P}
          y2={H - P}
        />
      ))}
      {[1, 2, 3].map((n) => (
        <line
          key={`h-${n}`}
          x1={P}
          x2={W - P}
          y1={(H * n) / 4}
          y2={(H * n) / 4}
        />
      ))}
      {xAxis >= P && xAxis <= H - P && (
        <line x1={P} x2={W - P} y1={xAxis} y2={xAxis} stroke="var(--ink-subtle)" />
      )}
      {yAxis >= P && yAxis <= W - P && (
        <line x1={yAxis} x2={yAxis} y1={P} y2={H - P} stroke="var(--ink-subtle)" />
      )}
    </g>
  );
}

function Graph({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      className="mt-4 w-full rounded-2 border border-border bg-surface"
    >
      {children}
    </svg>
  );
}

function RangeControl({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex justify-between gap-3 text-xs font-semibold text-ink-muted">
        <span>{label}</span>
        <output htmlFor={id} className="font-mono text-terracotta">
          {valueLabel}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full accent-[var(--terracotta)]"
      />
    </div>
  );
}

function LabShell({
  title,
  intro,
  status,
  exercise,
  answer,
  practiceHref,
  children,
}: {
  title: string;
  intro: string;
  status: string;
  exercise: string;
  answer: string;
  practiceHref: string;
  children: ReactNode;
}) {
  return (
    <section className="my-5 rounded-3 border border-sky/50 bg-sky-soft/30 p-4 sm:p-5">
      <p className="text-[11px] font-bold uppercase tracking-wider text-sky-ink">
        Laboratório visual · manipule
      </p>
      <h3 className="mt-1 font-serif text-xl font-medium">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{intro}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      {children}
      <div className="mt-4 rounded-2 border border-border bg-surface px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
          Exercício do experimento
        </p>
        <p className="mt-1 text-sm font-medium leading-relaxed">{exercise}</p>
        <details className="mt-2 text-sm text-ink-muted">
          <summary className="cursor-pointer font-semibold text-terracotta">
            Conferir resposta
          </summary>
          <p className="mt-2 leading-relaxed">{answer}</p>
        </details>
        <Link href={practiceHref} className="mt-3 inline-block text-xs font-semibold text-terracotta hover:underline">
          Praticar este conceito no banco →
        </Link>
      </div>
    </section>
  );
}

function LimitLab() {
  const [offset, setOffset] = useState(-0.8);
  const x = 1 + offset;
  const y = x + 1;
  const point = xy(x, y, -1, 3, -1, 5);
  const hole = xy(1, 2, -1, 3, -1, 5);
  const status = Math.abs(offset) < 0.001
    ? "x está em 1; a função não existe nesse ponto, mas a tendência é 2."
    : `x está em ${fmt(x)} e f de x vale ${fmt(y)}; ao aproximar x de 1, o valor se aproxima de 2.`;
  return (
    <LabShell
      title="Aproxime-se sem precisar tocar"
      intro="Arraste x pelos dois lados do ponto 1. O círculo vazio marca um valor ausente; a tendência continua visível."
      status={status}
      exercise="Aproxime x de 1 pela esquerda e pela direita. Para qual número f(x) tende? O limite depende de f(1) existir?"
      answer="Pelos dois lados, f(x) tende a 2. O limite observa os valores próximos; portanto pode existir mesmo quando f(1) não existe."
      practiceHref="/exercicios?id=p2-limites-laterais-3"
    >
      <div className="mt-4">
        <RangeControl label="Posição de x" valueLabel={`x = ${fmt(x)}`} min={-1.5} max={1.5} step={0.05} value={offset} onChange={setOffset} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">{status}</p>
      <Graph label={`Gráfico de uma reta com círculo vazio em x igual a 1 e y igual a 2. ${status}`}>
        <Axes xMin={-1} xMax={3} yMin={-1} yMax={5} />
        <path d={pointPath((value) => value + 1, -1, 3, -1, 5)} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        <circle cx={hole.x} cy={hole.y} r="7" fill="var(--surface)" stroke="var(--terracotta)" strokeWidth="4" />
        {Math.abs(offset) > 0.001 && <circle cx={point.x} cy={point.y} r="7" fill="var(--sage)" />}
      </Graph>
    </LabShell>
  );
}

function SecantLab() {
  const [h, setH] = useState(1.5);
  const a = 1;
  const slope = 2 + h;
  const p1 = xy(a, a * a, -1, 4, -1, 10);
  const p2 = xy(a + h, (a + h) ** 2, -1, 4, -1, 10);
  const secant = (x: number) => 1 + slope * (x - 1);
  const tangent = (x: number) => 1 + 2 * (x - 1);
  const status = `Distância h igual a ${fmt(h)}; inclinação da secante igual a ${fmt(slope)}; inclinação limite da tangente igual a 2.`;
  return (
    <LabShell
      title="Da secante à tangente"
      intro="Reduza h. O segundo ponto se aproxima do primeiro e a reta secante gira até a posição da tangente."
      status={status}
      exercise="Quando h se aproxima de zero, para qual valor tende a inclinação da secante de y=x² no ponto x=1?"
      answer="A inclinação é 2+h. Quando h tende a zero, ela tende a 2, que é a derivada de x² em x=1."
      practiceHref="/exercicios?tema=derivadas"
    >
      <div className="mt-4">
        <RangeControl label="Distância entre os pontos (h)" valueLabel={fmt(h)} min={0.1} max={2.5} step={0.1} value={h} onChange={setH} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">m secante = {fmt(slope)} · m tangente = 2</p>
      <Graph label={`Parábola y igual a x ao quadrado, secante com inclinação ${fmt(slope)} e tangente com inclinação 2.`}>
        <Axes xMin={-1} xMax={4} yMin={-1} yMax={10} />
        <path d={pointPath((x) => x * x, -1, 4, -1, 10)} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        <path d={pointPath(secant, -1, 4, -1, 10)} fill="none" stroke="var(--sage)" strokeWidth="3" />
        <path d={pointPath(tangent, -1, 4, -1, 10)} fill="none" stroke="var(--sky)" strokeWidth="3" strokeDasharray="8 7" />
        <circle cx={p1.x} cy={p1.y} r="6" fill="var(--sky)" />
        <circle cx={p2.x} cy={p2.y} r="6" fill="var(--sage)" />
      </Graph>
    </LabShell>
  );
}

function RiemannLab() {
  const [n, setN] = useState(4);
  const dx = 1 / n;
  const sum = ((n + 1) * (2 * n + 1)) / (6 * n * n);
  const status = `${n} retângulos à direita, largura ${fmt(dx, 3)}, soma ${fmt(sum, 4)}; área exata um terço.`;
  return (
    <LabShell
      title="A soma vira área"
      intro="Aumente o número de retângulos sob y=x². As larguras diminuem e a soma se aproxima da área exata."
      status={status}
      exercise="Compare n=2 e n=20. Qual aproximação fica mais próxima de 1/3 e por quê?"
      answer="n=20 fica mais próximo. Retângulos mais estreitos acompanham melhor a curva; no limite, a soma de Riemann é a integral."
      practiceHref="/exercicios?tema=integrais"
    >
      <div className="mt-4">
        <RangeControl label="Quantidade de retângulos" valueLabel={`n = ${n}`} min={2} max={20} step={1} value={n} onChange={setN} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">Soma à direita ≈ {fmt(sum, 4)} · área exata = 0,3333…</p>
      <Graph label={`Curva y igual a x ao quadrado entre zero e um, aproximada por ${n} retângulos. Soma ${fmt(sum, 4)}.`}>
        <Axes xMin={-0.05} xMax={1.05} yMin={-0.05} yMax={1.1} />
        {Array.from({ length: n }, (_, index) => {
          const right = (index + 1) / n;
          const leftPoint = xy(index / n, 0, -0.05, 1.05, -0.05, 1.1);
          const topPoint = xy(right, right * right, -0.05, 1.05, -0.05, 1.1);
          const basePoint = xy(right, 0, -0.05, 1.05, -0.05, 1.1);
          return <rect key={index} x={leftPoint.x} y={topPoint.y} width={basePoint.x - leftPoint.x} height={basePoint.y - topPoint.y} fill="var(--sage-soft)" stroke="var(--sage)" />;
        })}
        <path d={pointPath((x) => x * x, -0.05, 1.05, -0.05, 1.1)} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
      </Graph>
    </LabShell>
  );
}

function UnitCircleLab() {
  const [angle, setAngle] = useState(45);
  const radians = (angle * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const cx = 300;
  const cy = 150;
  const radius = 105;
  const px = cx + radius * cosine;
  const py = cy - radius * sine;
  const status = `Ângulo ${angle} graus, ou ${fmt(radians, 3)} radianos; cosseno ${fmt(cosine, 3)} e seno ${fmt(sine, 3)}.`;
  return (
    <LabShell
      title="Seno e cosseno são coordenadas"
      intro="Gire o ponto. A projeção horizontal é o cosseno; a vertical é o seno. Observe como os sinais mudam por quadrante."
      status={status}
      exercise="Posicione o ângulo em 60°. Quais são aproximadamente as coordenadas do ponto?"
      answer="cos 60° = 0,5 e sen 60° ≈ 0,866 = √3/2. Logo o ponto é aproximadamente (0,5; 0,866)."
      practiceHref="/exercicios?tema=trigonometria"
    >
      <div className="mt-4">
        <RangeControl label="Ângulo" valueLabel={`${angle}°`} min={0} max={360} step={5} value={angle} onChange={setAngle} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">(cos θ, sen θ) = ({fmt(cosine, 3)}; {fmt(sine, 3)})</p>
      <Graph label={`Círculo trigonométrico com ponto no ângulo ${angle} graus. Cosseno ${fmt(cosine, 3)} e seno ${fmt(sine, 3)}.`}>
        <line x1={cx - 150} x2={cx + 150} y1={cy} y2={cy} stroke="var(--ink-subtle)" />
        <line x1={cx} x2={cx} y1={cy - 130} y2={cy + 130} stroke="var(--ink-subtle)" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--sky)" strokeWidth="4" />
        <line x1={px} y1={py} x2={px} y2={cy} stroke="var(--sage)" strokeWidth="3" strokeDasharray="7 5" />
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke="var(--terracotta)" strokeWidth="3" strokeDasharray="7 5" />
        <circle cx={px} cy={py} r="8" fill="var(--sage)" />
        <text x={px + 10} y={py - 10} fill="var(--ink)" fontSize="14">({fmt(cosine, 2)}; {fmt(sine, 2)})</text>
      </Graph>
    </LabShell>
  );
}

function TransformationsLab() {
  const [a, setA] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);
  const formula = `y = ${fmt(a)}(x ${h >= 0 ? "−" : "+"} ${fmt(Math.abs(h))})² ${k >= 0 ? "+" : "−"} ${fmt(Math.abs(k))}`;
  const status = `${formula}. Vértice em ${fmt(h)}, ${fmt(k)}; ${a < 0 ? "refletida para baixo" : "voltada para cima"}; escala vertical ${fmt(Math.abs(a))}.`;
  return (
    <LabShell
      title="Transforme o gráfico-base"
      intro="Compare a curva colorida com y=x² tracejada. h move na horizontal, k move na vertical e a controla reflexão e escala."
      status={status}
      exercise="Configure a=-1, h=2 e k=-3. Quais transformações aconteceram em y=x²?"
      answer="Reflexão no eixo x, deslocamento de 2 unidades para a direita e 3 para baixo. O vértice fica em (2,-3)."
      practiceHref="/exercicios?tema=graficos"
    >
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <RangeControl label="Escala/reflexão (a)" valueLabel={fmt(a)} min={-2} max={2} step={0.25} value={a} onChange={(value) => setA(value === 0 ? 0.25 : value)} />
        <RangeControl label="Horizontal (h)" valueLabel={fmt(h)} min={-3} max={3} step={0.5} value={h} onChange={setH} />
        <RangeControl label="Vertical (k)" valueLabel={fmt(k)} min={-4} max={4} step={0.5} value={k} onChange={setK} />
      </div>
      <p className="mt-2 font-mono text-sm font-semibold" aria-live="polite">{formula}</p>
      <Graph label={`Gráfico transformado ${status} A parábola base y igual a x ao quadrado aparece tracejada.`}>
        <Axes xMin={-4} xMax={4} yMin={-5} yMax={8} />
        <path d={pointPath((x) => x * x, -4, 4, -5, 8)} fill="none" stroke="var(--ink-subtle)" strokeWidth="2" strokeDasharray="7 6" />
        <path d={pointPath((x) => a * (x - h) ** 2 + k, -4, 4, -5, 8)} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        <circle cx={xy(h, k, -4, 4, -5, 8).x} cy={xy(h, k, -4, 4, -5, 8).y} r="7" fill="var(--sage)" />
      </Graph>
    </LabShell>
  );
}

function ParabolaLab() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const xv = -b / (2 * a);
  const yv = a * xv * xv + b * xv + c;
  const delta = b * b - 4 * a * c;
  const roots = delta > 0.0001 ? "duas raízes reais" : Math.abs(delta) <= 0.0001 ? "uma raiz real dupla" : "nenhuma raiz real";
  const vertex = xy(xv, yv, -5, 5, -8, 10);
  const status = `Coeficientes a ${fmt(a)}, b ${fmt(b)}, c ${fmt(c)}; vértice ${fmt(xv)}, ${fmt(yv)}; delta ${fmt(delta)}; ${roots}.`;
  return (
    <LabShell
      title="Leia a parábola pelos coeficientes"
      intro="Altere a, b e c. O painel calcula vértice e discriminante para ligar a fórmula à forma do gráfico."
      status={status}
      exercise="Use a=1, b=-4 e c=3. Onde fica o vértice e quantas raízes reais aparecem?"
      answer="xᵥ=2 e yᵥ=-1, então o vértice é (2,-1). Δ=4>0, portanto há duas raízes reais: 1 e 3."
      practiceHref="/exercicios?tema=funcao-quadratica"
    >
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <RangeControl label="Coeficiente a" valueLabel={fmt(a)} min={-3} max={3} step={0.5} value={a} onChange={(value) => setA(value === 0 ? 0.5 : value)} />
        <RangeControl label="Coeficiente b" valueLabel={fmt(b)} min={-6} max={6} step={0.5} value={b} onChange={setB} />
        <RangeControl label="Coeficiente c" valueLabel={fmt(c)} min={-6} max={6} step={0.5} value={c} onChange={setC} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">V = ({fmt(xv)}; {fmt(yv)}) · Δ = {fmt(delta)} · {roots}</p>
      <Graph label={`Parábola y igual a ${fmt(a)} x ao quadrado mais ${fmt(b)} x mais ${fmt(c)}. ${status}`}>
        <Axes xMin={-5} xMax={5} yMin={-8} yMax={10} />
        <path d={pointPath((x) => a * x * x + b * x + c, -5, 5, -8, 10)} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        {vertex.y >= P && vertex.y <= H - P && <circle cx={vertex.x} cy={vertex.y} r="7" fill="var(--sage)" />}
      </Graph>
    </LabShell>
  );
}

function ProductRuleLab() {
  const [h, setH] = useState(0.8);
  const x = 1.5;
  const width = x + 1;
  const height = x;
  const exactRate = width + height;
  const approxRate = exactRate + h;
  const scale = 62;
  const left = 105;
  const top = 45;
  const baseWidth = width * scale;
  const baseHeight = height * scale;
  const extra = h * scale;
  const status = `Incremento ${fmt(h)}; taxa média da área ${fmt(approxRate)}; taxa instantânea pelo produto ${fmt(exactRate)}.`;
  return (
    <LabShell
      title="A regra do produto é uma área que cresce"
      intro="O retângulo tem lados f(x)=x+1 e g(x)=x. Ao aumentar x por h, surgem duas faixas e um pequeno canto."
      status={status}
      exercise="Por que o canto Δf·Δg não aparece na derivada final quando h tende a zero?"
      answer="Aqui o canto vale h². No quociente de variação dividimos por h, restando h, que tende a zero. Permanecem f·g′ + g·f′."
      practiceHref="/exercicios?tema=derivadas"
    >
      <div className="mt-4">
        <RangeControl label="Pequeno aumento (h)" valueLabel={fmt(h)} min={0.05} max={1.2} step={0.05} value={h} onChange={setH} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">ΔA/Δx = {fmt(approxRate)} → (fg)′ = {fmt(exactRate)}</p>
      <Graph label={`Retângulo original de lados ${fmt(width)} e ${fmt(height)}, acrescido de duas faixas e um canto para incremento ${fmt(h)}. ${status}`}>
        <rect x={left} y={top + extra} width={baseWidth} height={baseHeight} fill="var(--terracotta-soft)" stroke="var(--terracotta)" strokeWidth="3" />
        <rect x={left + baseWidth} y={top + extra} width={extra} height={baseHeight} fill="var(--sage-soft)" stroke="var(--sage)" strokeWidth="3" />
        <rect x={left} y={top} width={baseWidth} height={extra} fill="var(--sky-soft)" stroke="var(--sky)" strokeWidth="3" />
        <rect x={left + baseWidth} y={top} width={extra} height={extra} fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="3" />
        <text x={left + 10} y={top + extra + baseHeight / 2} fill="var(--ink)" fontSize="15">f · g</text>
        <text x={left + baseWidth + 5} y={top + extra + baseHeight / 2} fill="var(--ink)" fontSize="13">g·Δf</text>
        <text x={left + 10} y={top + Math.max(16, extra / 2)} fill="var(--ink)" fontSize="13">f·Δg</text>
      </Graph>
    </LabShell>
  );
}

function FtcLab() {
  const [x, setX] = useState(1.5);
  const area = x ** 3 / 3;
  const slope = x * x;
  const chartLeft = 35;
  const chartTop = 38;
  const chartWidth = 240;
  const chartHeight = 220;
  const sx = (value: number) => chartLeft + (value / 3) * chartWidth;
  const sy = (value: number) => chartTop + chartHeight - (value / 9) * chartHeight;
  const ax = (value: number) => 330 + (value / 3) * chartWidth;
  const ay = (value: number) => chartTop + chartHeight - (value / 9) * chartHeight;
  const coord = (value: number) => value.toFixed(1);
  const areaPath = `M${coord(sx(0))},${coord(sy(0))} ${Array.from({ length: 41 }, (_, index) => {
    const t = (x * index) / 40;
    return `L${coord(sx(t))},${coord(sy(t * t))}`;
  }).join(" ")} L${coord(sx(x))},${coord(sy(0))} Z`;
  const curvePath = Array.from({ length: 81 }, (_, index) => {
    const t = (3 * index) / 80;
    return `${index ? "L" : "M"}${coord(sx(t))},${coord(sy(t * t))}`;
  }).join(" ");
  const accumulatorPath = Array.from({ length: 81 }, (_, index) => {
    const t = (3 * index) / 80;
    return `${index ? "L" : "M"}${coord(ax(t))},${coord(ay(t ** 3 / 3))}`;
  }).join(" ");
  const status = `Limite superior x igual a ${fmt(x)}; área acumulada A de x igual a ${fmt(area, 3)}; inclinação de A igual a ${fmt(slope, 3)}, igual à altura f de x.`;
  return (
    <LabShell
      title="Acumular e derivar se desfazem"
      intro="Mova o limite superior. À esquerda cresce a área sob f(t)=t²; à direita cresce a função acumuladora A(x)=x³/3."
      status={status}
      exercise="Coloque x=2. Quanto vale A(2) e qual é a inclinação A′(2)?"
      answer="A(2)=∫₀²t²dt=8/3≈2,667. Pelo TFC, A′(2)=f(2)=4."
      practiceHref="/exercicios?tema=integrais"
    >
      <div className="mt-4">
        <RangeControl label="Limite superior da integral" valueLabel={`x = ${fmt(x)}`} min={0.1} max={3} step={0.1} value={x} onChange={setX} />
      </div>
      <p className="mt-2 text-sm font-semibold" aria-live="polite">A(x) = {fmt(area, 3)} · A′(x) = f(x) = {fmt(slope, 3)}</p>
      <Graph label={`Dois gráficos. À esquerda, área sob t ao quadrado de zero até ${fmt(x)}. À direita, acumuladora x ao cubo sobre três. ${status}`}>
        <line x1={chartLeft} x2={chartLeft + chartWidth} y1={sy(0)} y2={sy(0)} stroke="var(--ink-subtle)" />
        <line x1={chartLeft} x2={chartLeft} y1={chartTop} y2={sy(0)} stroke="var(--ink-subtle)" />
        <path d={areaPath} fill="var(--sage-soft)" stroke="none" />
        <path d={curvePath} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
        <line x1={330} x2={330 + chartWidth} y1={ay(0)} y2={ay(0)} stroke="var(--ink-subtle)" />
        <line x1={330} x2={330} y1={chartTop} y2={ay(0)} stroke="var(--ink-subtle)" />
        <path d={accumulatorPath} fill="none" stroke="var(--sky)" strokeWidth="4" />
        <circle cx={ax(x)} cy={ay(area)} r="7" fill="var(--sage)" />
        <text x={80} y={25} fill="var(--ink)" fontSize="14">f(t)=t² e sua área</text>
        <text x={385} y={25} fill="var(--ink)" fontSize="14">A(x)=x³/3</text>
      </Graph>
    </LabShell>
  );
}

export function InteractiveConceptLab({ kind }: { kind: VisualLabKind }) {
  switch (kind) {
    case "limit": return <LimitLab />;
    case "secant": return <SecantLab />;
    case "riemann": return <RiemannLab />;
    case "unit-circle": return <UnitCircleLab />;
    case "transformations": return <TransformationsLab />;
    case "parabola": return <ParabolaLab />;
    case "product-rule": return <ProductRuleLab />;
    case "ftc": return <FtcLab />;
  }
}
