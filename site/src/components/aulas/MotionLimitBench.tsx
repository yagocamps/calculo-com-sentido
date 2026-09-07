"use client";

import { useId, useState } from "react";
import dynamic from "next/dynamic";
import { APPROACH_VALUES, approachValue, constrainValue, formatReading as fmt, keyboardValue, measurement, type MotionScenario } from "@/lib/motion-limit";
import styles from "./MotionLimitBench.module.css";

const scenarios = [
  { id: "encoder", letter: "A", title: "Intervalo impossível", question: "Como medir uma velocidade em um instante?" },
  { id: "firmware", letter: "B", title: "O zero do firmware", question: "Mudar o valor no ponto muda o limite?" },
  { id: "friction", letter: "C", title: "Inversão do atrito", question: "E quando cada lado conta uma história?" },
] as const;

const MotionBenchScene = dynamic(() => import("./MotionBenchScene"), {
  ssr: false,
  loading: () => <div className={styles.sceneLoading} role="status">Carregando bancada 3D…</div>,
});

function MeasurementGraph({ scenario, value }: { scenario: MotionScenario; value: number }) {
  const friction = scenario === "friction";
  const max = friction ? 2 : 0.5;
  const x = (v: number) => 250 + v / max * 180;
  const y = (v: number) => friction ? 150 - v * 15 : 240 - v * 26;
  const output = measurement(scenario, value)!;
  return <svg viewBox="0 0 490 300" role="img" aria-label={friction ? "Força em função da velocidade: ramo esquerdo em +5 N, direito em −5 N, sem ligação em zero. Limite bilateral não existe." : `Leitura em função do intervalo: reta 6 + Δt com furo em (0, 6). ${scenario === "firmware" ? "Ponto preenchido em (0, 0) mostra o retorno do firmware." : "Não há leitura em zero."} Leitura atual ${fmt(output)} m/s.`} className={styles.graph}>
    <text x="28" y="25" className={styles.svgLabel}>02 / {friction ? "FORÇA × VELOCIDADE" : "LEITURA × INTERVALO"}</text>
    <text x="28" y="47" className={styles.svgMuted}>{friction ? "F (N)" : "v média (m/s)"}</text>
    <line x1="55" x2="450" y1={y(0)} y2={y(0)} stroke="var(--ink-subtle)" />
    <line x1={x(0)} x2={x(0)} y1="53" y2="248" stroke="var(--ink-subtle)" strokeDasharray="4 5" />
    {(friction ? [-5, 5] : [6]).map(level => <g key={level}>
      <line x1="55" x2="450" y1={y(level)} y2={y(level)} stroke="var(--border)" strokeDasharray="5 5" />
      <text x="44" y={y(level) + 5} textAnchor="end" className={styles.svgMuted}>{level > 0 && friction ? "+" : ""}{level}</text>
    </g>)}
    {friction ? <>
      <path data-branch="left" d={`M ${x(-2)} ${y(5)} H ${x(0) - 7}`} fill="none" stroke="var(--sky)" strokeWidth="4" />
      <path data-branch="right" d={`M ${x(0) + 7} ${y(-5)} H ${x(2)}`} fill="none" stroke="var(--sage)" strokeWidth="4" />
      <text x="75" y={y(5) - 13} fill="var(--sky-ink)" fontSize="13">Pela esquerda: +5 N</text>
      <text x="273" y={y(-5) - 13} fill="var(--sage-ink)" fontSize="13">Pela direita: −5 N</text>
    </> : <>
      <path d={`M ${x(-0.5)} ${y(5.5)} L ${x(-0.012)} ${y(5.988)} M ${x(0.012)} ${y(6.012)} L ${x(0.5)} ${y(6.5)}`} fill="none" stroke="var(--terracotta)" strokeWidth="4" />
      <text x="320" y="68" fill="var(--terracotta-ink)" fontSize="13">L = 6 m/s</text>
      {scenario === "firmware" && <>
        <circle data-point="firmware-zero" cx={x(0)} cy={y(0)} r="6" fill="var(--sage)" />
        <text x="263" y={y(0) - 13} fill="var(--sage-ink)" fontSize="12">Retorno do código: 0</text>
      </>}
    </>}
    <circle className={friction ? undefined : styles.moving} cx={x(value)} cy={y(output)} r="7" fill="var(--terracotta)" stroke="var(--surface)" strokeWidth="2" />
    {!friction && <circle data-point="hole" cx={x(0)} cy={y(6)} r="6" fill="var(--surface)" stroke="var(--terracotta)" strokeWidth="2.5" />}
    {[-max, 0, max].map(tick => <text key={tick} x={x(tick)} y="268" textAnchor="middle" className={styles.svgMuted}>{tick.toLocaleString("pt-BR")}</text>)}
    <text x="450" y="290" textAnchor="end" className={styles.svgMuted}>{friction ? "v (m/s)" : "Δt (s)"}</text>
  </svg>;
}

function BenchExperiment({ scenario }: { scenario: MotionScenario }) {
  const [experiment, setExperiment] = useState({ cenario: scenario, valor: -0.5, ruidoLigado: false });
  const [draft, setDraft] = useState("-0,500");
  const [visited, setVisited] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [inspectZero, setInspectZero] = useState(false);
  const id = useId();
  const value = experiment.valor;
  const friction = scenario === "friction";
  const output = measurement(experiment.cenario, value)!;
  const unit = friction ? "m/s" : "s";
  const outputUnit = friction ? "N" : "m/s";
  const max = friction ? 2 : 0.5;
  const zeroMessage = friction ? "A lei do atrito cinético não vale em v = 0." : "O encoder não mede em intervalo zero. O limite descreve a aproximação, não o ponto.";

  function update(raw: number, drag = false) {
    const next = constrainValue(raw, value, scenario, drag);
    setExperiment({ ...experiment, valor: next.value });
    setDraft(fmt(next.value));
    if (next.reason !== "invalid" && !(next.reason === "zero" && !drag)) {
      setVisited(previous => previous.includes(next.value) ? previous : [...previous, next.value]);
    }
    setMessage(next.reason === "zero" ? zeroMessage : next.reason === "invalid" ? "Digite um número válido, com vírgula ou ponto decimal." : next.reason === "range" ? `Valor ajustado: use de −${max} a +${max} ${unit}, com distância mínima de 0,001 ${unit} de zero.` : "");
  }

  function reset() {
    setExperiment({ cenario: scenario, valor: -0.5, ruidoLigado: false });
    setDraft("-0,500"); setVisited([]); setMessage(""); setInspectZero(false);
  }

  function approach(side: -1 | 1) {
    setVisited(previous => previous.includes(value) ? previous : [...previous, value]);
    update(approachValue(value, side));
  }

  const phrase = friction
    ? `Com v = ${fmt(value)} m/s, o carrinho se move para a ${value < 0 ? "esquerda" : "direita"}, e o atrito aponta para a ${value < 0 ? "direita" : "esquerda"}: ${value < 0 ? "+" : ""}${fmt(output)} N.`
    : `O intervalo está a ${fmt(Math.abs(value))} s de zero, e a velocidade medida está a ${fmt(Math.abs(value))} m/s de 6.`;

  return <div>
    <div className={styles.calibration}>
      <span>{friction ? "N = 20 N · μₖ = 0,25" : "s(t) = t² · t₀ = 3 s · s(t₀) = 9 m"}</span>
      <span className={styles.live}>Modelo ideal</span>
    </div>
    <MotionBenchScene scenario={scenario} value={value} />
    <div className={styles.quickReadings} aria-label="Leituras do ensaio">
      <div><span>{friction ? "Velocidade comandada" : "Intervalo Δt"}</span><strong>{fmt(value)} <small>{unit}</small></strong></div>
      <div><span>{friction ? "Força de atrito" : "Velocidade média"}</span><output data-reading="output">{friction && output > 0 ? "+" : ""}{fmt(output)} <small>{outputUnit}</small></output></div>
      <div><span>{friction ? "Limite bilateral" : "Limite da velocidade"}</span><strong>{friction ? "Não existe" : "6 m/s"}</strong></div>
    </div>
    <div className={styles.controls}>
      <div className={styles.controlTop}>
        <label htmlFor={`${id}-range`}>{friction ? "Velocidade do carrinho" : "Intervalo entre medições"} <span>{friction ? "v" : "Δt"} ({unit})</span></label>
        <form onSubmit={event => { event.preventDefault(); update(draft.trim() ? Number(draft.replace(",", ".")) : NaN); }} className={styles.numberForm}>
          <label className={styles.srOnly} htmlFor={`${id}-number`}>Valor numérico {friction ? "da velocidade" : "do intervalo"} em {unit}</label>
          <input id={`${id}-number`} inputMode="decimal" value={draft} onChange={event => setDraft(event.target.value)} aria-describedby={`${id}-help ${id}-message`} />
          <button type="submit">Aplicar</button>
        </form>
      </div>
      <input id={`${id}-range`} className={styles.slider} type="range" min={-max} max={max} step={0.001} value={value} aria-valuetext={`${fmt(value)} ${unit}; zero excluído`} aria-describedby={`${id}-help ${id}-message`} onChange={event => update(Number(event.target.value), true)} onKeyDown={event => {
        if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(event.key)) {
          event.preventDefault(); update(keyboardValue(value, ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 1, scenario));
        } else if (event.key === "Home" || event.key === "End") { event.preventDefault(); update(event.key === "Home" ? -max : max); }
      }} />
      <div className={styles.rangeLabels}><span>−{max.toLocaleString("pt-BR")} {unit}</span><span>0 · fora do domínio</span><span>+{max.toLocaleString("pt-BR")} {unit}</span></div>
      <div className={styles.actions}>
        <button type="button" onClick={() => approach(-1)}>Aproximar pela esquerda <span>→ 0⁻</span></button>
        <button type="button" onClick={() => approach(1)}>Aproximar pela direita <span>0⁺ ←</span></button>
        <button type="button" onClick={reset}>Reiniciar</button>
      </div>
      <p id={`${id}-help`} className={styles.help}>Passos: 0,5 → 0,1 → 0,01 → 0,001. Use os botões ou as setas para trocar de lado sem passar por zero.</p>
      <p id={`${id}-message`} role="status" className={styles.message}>{message}</p>
    </div>
    <p className={styles.explanation} aria-live="polite" aria-atomic="true">{phrase}</p>
    <p className={styles.caption}>{friction ? "Ensaios de velocidade comandada, independentes da trajetória s(t) = t². O carrinho indica a posição de ensaio; as setas mostram velocidade e força. Em v = 0, a lei cinética não se aplica." : `As marcas representam duas posições medidas, não uma reprodução em tempo real. ${value < 0 ? "Δt negativo compara um instante anterior com t₀ = 3 s." : "Δt positivo compara um instante posterior com t₀ = 3 s."} Em Δt = 0, o encoder fica sem leitura.`}</p>
    {scenario === "firmware" && <div className={styles.firmware}>
      <button type="button" aria-expanded={inspectZero} onClick={() => setInspectZero(!inspectZero)}>Inspecionar Δt = 0</button>
      {inspectZero && <p role="status"><strong>Firmware: 0 m/s · Limite: 6 m/s.</strong> O retorno especial do código muda o valor no ponto, mas não muda as leituras próximas. O ensaio continua em Δt = {fmt(value)} s.</p>}
    </div>}
    <details className={styles.dataDetails}>
      <summary>Gráfico e medições do ensaio</summary>
      <MeasurementGraph scenario={scenario} value={value} />
      <div className={styles.tableScroll}><table>
        <caption>Aproximações pelos dois lados. Traço: ainda não medido.</caption>
        <thead><tr><th scope="col">{friction ? "v" : "Δt"} &lt; 0 ({unit})</th><th scope="col">Leitura ({outputUnit})</th><th scope="col">{friction ? "v" : "Δt"} &gt; 0 ({unit})</th><th scope="col">Leitura ({outputUnit})</th></tr></thead>
        <tbody>{APPROACH_VALUES.map(mark => <tr key={mark}>
          {([-1, 1] as const).map(side => <CellPair key={side} value={side * mark} selected={value === side * mark} visited={visited.includes(side * mark)} scenario={scenario} />)}
        </tr>)}
        <tr className={styles.zeroRow}><th scope="row">0 {unit}</th><td colSpan={3}>{friction ? "LEI CINÉTICA NÃO DEFINIDA" : scenario === "firmware" ? "ENCODER: SEM LEITURA · FIRMWARE: 0 m/s" : "SEM LEITURA · 0/0"}</td></tr>
        </tbody></table></div>
    </details>
  </div>;
}

function CellPair({ value, selected, visited, scenario }: { value: number; selected: boolean; visited: boolean; scenario: MotionScenario }) {
  return <><th scope="row" className={selected ? styles.selected : undefined}>{fmt(value)}{selected && <span className={styles.srOnly}>, valor atual</span>}</th><td className={selected ? styles.selected : undefined}>{visited ? `${scenario === "friction" && value < 0 ? "+" : ""}${fmt(measurement(scenario, value)!)}` : "—"}</td></>;
}

export function MotionLimitBench() {
  const [scenario, setScenario] = useState<MotionScenario>("encoder");
  const id = useId();
  const active = scenarios.find(item => item.id === scenario)!;
  return <section id="bancada-limites" className={styles.bench} aria-labelledby={`${id}-title`}>
    <header className={styles.header}>
      <p className={styles.eyebrow}>LABORATÓRIO 3D / LIMITES</p>
      <h3 id={`${id}-title`}>Bancada de movimento</h3>
    </header>
    <div className={styles.scenarios} role="group" aria-label="Cenário do experimento">
      {scenarios.map(item => <button key={item.id} type="button" aria-pressed={scenario === item.id} onClick={() => setScenario(item.id)}><span>{item.letter}</span>{item.title}</button>)}
    </div>
    <p className={styles.question}>{active.question}</p>
    <BenchExperiment key={scenario} scenario={scenario} />
  </section>;
}
