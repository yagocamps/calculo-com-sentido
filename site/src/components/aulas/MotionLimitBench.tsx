"use client";

import { useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { APPROACH_VALUES, approachValue, constrainValue, formatReading as fmt, keyboardValue, measurement, type MotionScenario } from "@/lib/motion-limit";
import styles from "./MotionLimitBench.module.css";

const scenarios = [
  { id: "encoder", title: "Chegando mais perto", question: "De qual velocidade estamos chegando perto?" },
  { id: "firmware", title: "Um valor diferente no ponto", question: "E se o visor mostrar zero exatamente na marca?" },
  { id: "friction", title: "Mudando de direção", question: "O atrito aponta para o mesmo lado quando o carrinho muda de direção?" },
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
  const [visited, setVisited] = useState<number[]>([-0.5]);
  const [message, setMessage] = useState("");
  const [inspectZero, setInspectZero] = useState(false);
  const id = useId();
  const value = experiment.valor;
  const friction = scenario === "friction";
  const output = measurement(experiment.cenario, value)!;
  const unit = friction ? "m/s" : "s";
  const outputUnit = friction ? "N" : "m/s";
  const max = friction ? 2 : 0.5;
  const zeroMessage = friction ? "Com o carrinho parado, esta regra de atrito deixa de valer. Use Mudar direção para experimentar o outro lado." : "Para medir, precisamos de duas posições em instantes diferentes. Chegamos bem perto da marca! Use Trocar de lado para explorar o outro lado.";

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
    setDraft("-0,500"); setVisited([-0.5]); setMessage(""); setInspectZero(false);
  }

  function approach(side: -1 | 1) {
    setVisited(previous => previous.includes(value) ? previous : [...previous, value]);
    update(approachValue(value, side));
  }

  const close = Math.abs(value) === 0.001;
  const side = value < 0 ? -1 : 1;
  const trail = APPROACH_VALUES.filter(mark => mark >= Math.abs(value) && visited.includes(side * mark)).map(mark => side * mark);
  if (!trail.includes(value)) trail.push(value);
  const phrase = friction
    ? `O carrinho vai para a ${value < 0 ? "esquerda" : "direita"}. O atrito empurra para a ${value < 0 ? "direita" : "esquerda"}, sempre contra o movimento.`
    : close ? "Quase lá: a leitura está muito perto de 6 m/s. Experimente o outro lado e compare."
    : `Ao ${value < 0 ? "avançar" : "recuar"} até a marca roxa, a leitura chega cada vez mais perto de 6 m/s.`;

  return <div>
    <p className={styles.instruction}>{friction ? "Mude a direção e observe a seta laranja." : "Arraste o carrinho para perto da marca roxa."}</p>
    <MotionBenchScene scenario={scenario} value={value} onValueChange={raw => update(raw, true)} />
    <div className={styles.readingFocus} aria-label="Resultado da experiência">
      <div><span>{friction ? "O atrito empurra para a" : "Velocidade medida agora"}</span><output data-reading="output">{friction ? (output > 0 ? "Direita" : "Esquerda") : fmt(output)} {!friction && <small>m/s</small>}</output></div>
      <div className={styles.target}><span>{friction ? "Força do atrito" : "Estamos chegando perto de"}</span><strong>{friction ? "5 N" : "6 m/s"}</strong></div>
    </div>
    {!friction && <div className={styles.progress} aria-label="Leituras já exploradas deste lado">
      <span>Seu caminho</span><p>{trail.map((mark, index) => <span key={mark}>{index > 0 && <i aria-hidden="true"> → </i>}{fmt(measurement(scenario, mark)!)}</span>)} <small>m/s</small></p>
    </div>}
    <div className={styles.controls}>
      <div className={styles.actions}>
        <button className={styles.primaryAction} type="button" disabled={close} onClick={() => approach(side)}>{close ? (friction ? "Bem perto de parar" : "Bem perto da marca") : friction ? "Diminuir velocidade" : "Chegar mais perto"}</button>
        <button type="button" onClick={() => update(-value)}>{friction ? "Mudar direção" : "Trocar de lado"}</button>
        <button type="button" onClick={reset}>Recomeçar</button>
      </div>
      <p className={styles.explanation} aria-live="polite" aria-atomic="true">{phrase}</p>
      <p id={`${id}-message`} role="status" className={styles.message}>{message}</p>
      <details className={styles.adjustments}>
        <summary>{friction ? "Ajustar a velocidade" : "Ajustar pelos números"}</summary>
        <div className={styles.controlTop}>
          <label htmlFor={`${id}-range`}>{friction ? "Velocidade do carrinho" : "Tempo em relação à marca roxa"} <span>em {friction ? "metros por segundo" : "segundos"}</span></label>
          <form onSubmit={event => { event.preventDefault(); update(draft.trim() ? Number(draft.replace(",", ".")) : NaN); }} className={styles.numberForm}>
            <label className={styles.srOnly} htmlFor={`${id}-number`}>Valor numérico {friction ? "da velocidade" : "do intervalo"} em {unit}</label>
            <input id={`${id}-number`} inputMode="decimal" value={draft} onChange={event => setDraft(event.target.value)} aria-describedby={`${id}-help ${id}-message`} />
            <button type="submit">Aplicar</button>
          </form>
        </div>
        <input id={`${id}-range`} className={styles.slider} type="range" min={-max} max={max} step={0.001} value={value} aria-valuetext={`${fmt(value)} ${unit}; ${friction ? value < 0 ? "para a esquerda" : "para a direita" : value < 0 ? "antes da marca" : "depois da marca"}`} aria-describedby={`${id}-help ${id}-message`} onChange={event => update(Number(event.target.value), true)} onKeyDown={event => {
          if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(event.key)) {
            event.preventDefault(); update(keyboardValue(value, ["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 1, scenario));
          } else if (event.key === "Home" || event.key === "End") { event.preventDefault(); update(event.key === "Home" ? -max : max); }
        }} />
        <div className={styles.rangeLabels}><span>{friction ? "← Esquerda" : "Antes da marca"}</span><span>{friction ? "Direita →" : "Depois da marca"}</span></div>
        <p id={`${id}-help`} className={styles.help}>{friction ? "O sinal indica a direção do movimento." : "Números negativos representam instantes antes da marca; positivos, depois. Quanto mais perto de zero, mais próximas ficam as duas posições."} Use as setas do teclado para percorrer os valores.</p>
      </details>
    </div>
    {scenario === "firmware" && <div className={styles.firmware}>
      <button type="button" aria-expanded={inspectZero} onClick={() => setInspectZero(!inspectZero)}>{inspectZero ? "Fechar o visor da marca" : "Ver o valor exatamente na marca"}</button>
      {inspectZero && <p role="status"><strong>Na marca: 0 m/s. Perto dela: quase 6 m/s.</strong> Neste experimento, o visor foi programado para mostrar zero exatamente na marca. Isso não muda os valores ao redor. O carrinho continua na posição que você escolheu.</p>}
    </div>}
    <details className={styles.dataDetails}>
      <summary>Entender a matemática</summary>
      <p className={styles.caption}>{friction ? "Cada ajuste representa um ensaio independente: o carrinho fica na posição de ensaio e as setas indicam o movimento e o atrito. A seta azul varia com a velocidade; a laranja mantém 5 N. Como os lados chegam a +5 N e −5 N, o limite bilateral não existe. Em repouso, esta lei do atrito cinético não se aplica." : "O carrinho representa uma posição medida, não uma animação em tempo real. A marca roxa é a posição de 9 m, atingida aos 3 s. Diminuir o intervalo entre duas medições faz a velocidade média se aproximar da velocidade naquele instante: esse valor é o limite."}</p>
      <p className={styles.formula}>{friction ? "N = 20 N · μₖ = 0,25 · F = −5 sign(v), para v ≠ 0" : "s(t) = t² · Δt ≠ 0 · v média = [(3 + Δt)² − 9] / Δt = 6 + Δt"}</p>
      {!friction && <p className={styles.caption}>Intervalo atual: {fmt(value)} s · Posição do carrinho: {fmt((3 + value) ** 2)} m. Com intervalo zero, a medição produz 0/0 e não fornece uma velocidade.{scenario === "firmware" && " O valor especial 0 é uma escolha do programa, não uma medição. O limite continua sendo 6 m/s."}</p>}
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
  const title = useRef<HTMLHeadingElement>(null);
  const previousScenario = useRef(scenario);
  useEffect(() => {
    if (previousScenario.current === scenario) return;
    previousScenario.current = scenario;
    title.current?.focus({ preventScroll: true });
    title.current?.closest("section")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [scenario]);
  const id = useId();
  const index = scenarios.findIndex(item => item.id === scenario);
  const active = scenarios[index];
  return <section id="bancada-limites" className={styles.bench} aria-labelledby={`${id}-title`}>
    <header className={styles.header}>
      <p className={styles.eyebrow}>EXPLORE EM 3D · EXPERIÊNCIA {index + 1} DE 3</p>
      <h3 ref={title} tabIndex={-1} id={`${id}-title`}>{active.title}</h3>
      <p className={styles.question}>{active.question}</p>
    </header>
    <BenchExperiment key={scenario} scenario={scenario} />
    <nav className={styles.nextExperiment} aria-label="Outras experiências de limites">
      {index > 0 && <button type="button" onClick={() => setScenario(scenarios[index - 1].id)}>← Experiência anterior</button>}
      <button type="button" onClick={() => setScenario(scenarios[(index + 1) % scenarios.length].id)}>{index < 2 ? `Próxima: ${scenarios[index + 1].title} →` : "Voltar à primeira experiência"}</button>
    </nav>
  </section>;
}
