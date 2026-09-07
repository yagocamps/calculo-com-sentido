"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { APPROACH_VALUES, approachValue, constrainValue, formatReading as fmt, keyboardValue, measurement, type MotionScenario } from "@/lib/motion-limit";
import styles from "./MotionLimitBench.module.css";

const scenarios = [
  { id: "encoder", letter: "A", title: "Intervalo impossível", question: "Como medir uma velocidade em um instante?" },
  { id: "firmware", letter: "B", title: "O zero do firmware", question: "Mudar o valor no ponto muda o limite?" },
  { id: "friction", letter: "C", title: "Inversão do atrito", question: "E quando cada lado conta uma história?" },
] as const;

const quizzes = [
  { question: "A · Qual é a leitura do encoder em Δt = 0?", options: ["6 m/s", "Sem leitura", "0 m/s"], correct: 1, feedback: "O quociente original é 0/0. A leitura não existe em zero; 6 m/s é o limite das leituras e a velocidade instantânea." },
  { question: "B · O retorno 0 do firmware muda o limite?", options: ["Sim, o limite passa a 0", "O limite deixa de existir", "Não, continua em 6 m/s"], correct: 2, feedback: "O firmware só definiu o valor no ponto. Para todo intervalo não nulo, a leitura continua em 6 + Δt, aproximando-se de 6 m/s." },
  { question: "C · Existe limite bilateral da força em v = 0?", options: ["Não: os limites laterais diferem", "Sim, vale 0 N", "Sim, vale 5 N"], correct: 0, feedback: "Pela esquerda, a força tende a +5 N; pela direita, a −5 N. Como são diferentes, não há um único limite bilateral." },
];

function Apparatus({ scenario, value }: { scenario: MotionScenario; value: number }) {
  const friction = scenario === "friction";
  const reference = 330;
  const position = friction ? reference : 105 + ((3 + value) ** 2 - 6) * 75;
  const direction = value < 0 ? -1 : 1;
  const velocityLength = Math.abs(value) / 2 * 115;
  const label = friction
    ? `Carrinho com velocidade ${fmt(value)} m/s; força de atrito ${fmt(measurement(scenario, value)!)} N, oposta ao movimento.`
    : `Encoder marca s(3) = 9 m e s(3 + Δt) = ${fmt((3 + value) ** 2)} m. As marcas se aproximam quando o intervalo diminui.`;
  return <svg viewBox="0 0 680 220" role="img" aria-label={label} className={styles.apparatus}>
    <text x="28" y="29" className={styles.svgLabel}>01 / BANCADA DE ENSAIO</text>
    <text x="652" y="29" textAnchor="end" className={styles.svgMuted}>{friction ? "Velocidade comandada" : "Movimento: s(t) = t²"}</text>
    <rect x="28" y="152" width="624" height="17" rx="6" fill="var(--border)" />
    <line x1="40" x2="640" y1="159" y2="159" stroke="var(--ink-subtle)" />
    {Array.from({ length: 25 }, (_, i) => <line key={i} x1={40 + i * 25} x2={40 + i * 25} y1="173" y2={i % 5 ? 178 : 185} stroke="var(--ink-subtle)" />)}
    <text x="30" y="208" className={styles.svgMuted}>Trilho linear</text>
    <text x="650" y="208" textAnchor="end" className={styles.svgMuted}>Eixo positivo →</text>
    {!friction && <>
      <line x1={reference} x2={reference} y1="56" y2="183" stroke="var(--sky)" strokeWidth="2" strokeDasharray="4 4" />
      <text x={reference - 9} y="70" textAnchor="end" fill="var(--sky-ink)" fontSize="13">t₀ = 3 s · 9 m</text>
      <line className={styles.moving} x1={position} x2={position} y1="83" y2="183" stroke="var(--terracotta)" strokeWidth="2" />
      <text x="650" y="88" textAnchor="end" className={styles.svgMuted}>t = {fmt(3 + value)} s</text>
    </>}
    <g className={styles.moving} style={{ transform: `translateX(${position - 45}px)` }}>
      <rect x="0" y="109" width="90" height="34" rx="8" fill="var(--terracotta)" />
      <rect x="12" y="99" width="44" height="16" rx="5" fill="var(--terracotta-soft)" stroke="var(--terracotta)" />
      <circle cx="19" cy="146" r="9" fill="var(--ink)" /><circle cx="71" cy="146" r="9" fill="var(--ink)" />
      <rect x="63" y="103" width="16" height="17" rx="3" fill="var(--sage)" />
      <text x="45" y="132" textAnchor="middle" fill="white" fontSize="12">CARRINHO</text>
    </g>
    {friction ? <>
      <line x1="330" x2={330 + direction * velocityLength} y1="68" y2="68" stroke="var(--terracotta)" strokeWidth="3" />
      <path d={`M ${330 + direction * velocityLength - direction * Math.min(11, velocityLength)} ${68 - Math.min(6, velocityLength)} L ${330 + direction * velocityLength} 68 L ${330 + direction * velocityLength - direction * Math.min(11, velocityLength)} ${68 + Math.min(6, velocityLength)}`} fill="none" stroke="var(--terracotta)" strokeWidth="3" />
      <text x={330 + direction * 145} y="72" textAnchor={direction < 0 ? "end" : "start"} fill="var(--terracotta-ink)" fontSize="13">v {direction > 0 ? ">" : "<"} 0</text>
      <line x1="330" x2={330 - direction * 115} y1="91" y2="91" stroke="var(--sage)" strokeWidth="3" />
      <path d={`M ${330 - direction * 104} 85 L ${330 - direction * 115} 91 L ${330 - direction * 104} 97`} fill="none" stroke="var(--sage)" strokeWidth="3" />
      <text x={330 - direction * 145} y="95" textAnchor={direction < 0 ? "start" : "end"} fill="var(--sage-ink)" fontSize="13">F = {direction < 0 ? "+5" : "−5"} N</text>
    </> : <>
      <rect x="39" y="106" width="24" height="38" rx="4" fill="var(--sky-soft)" stroke="var(--sky)" />
      <line x1="64" x2={position - 48} y1="124" y2="124" stroke="var(--sky)" strokeDasharray="3 5" />
      <text x="28" y="94" className={styles.svgMuted}>Encoder óptico</text>
    </>}
  </svg>;
}

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
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const id = useId();
  const value = experiment.valor;
  const friction = scenario === "friction";
  const output = measurement(experiment.cenario, value)!;
  const unit = friction ? "m/s" : "s";
  const outputUnit = friction ? "N" : "m/s";
  const max = friction ? 2 : 0.5;
  const zeroMessage = friction ? "A lei do atrito cinético não vale em v = 0." : "O encoder não mede em intervalo zero. O limite descreve a aproximação, não o ponto.";
  const bothSides = APPROACH_VALUES.every(mark => visited.includes(mark) && visited.includes(-mark));

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
    setDraft("-0,500"); setVisited([]); setMessage(""); setInspectZero(false); setAnswers({});
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
      <span>{friction ? "Freio de atrito" : "a = 2 m/s² · repouso inicial"}</span>
      <span>{friction ? "N = 20 N · μₖ = 0,25" : "t₀ = 3 s · s(t₀) = 9 m"}</span>
      <span className={styles.live}>Modelo ideal · ao vivo</span>
    </div>
    <Apparatus scenario={scenario} value={value} />
    <p className={styles.caption}>{friction ? "O bloco laranja é o freio. Aqui variamos a velocidade comandada, não o tempo: são ensaios independentes de atrito no mesmo carrinho. O movimento s(t) = t² pertence aos cenários A e B." : `O bloco laranja é o freio, inativo neste ensaio. As duas marcas indicam posições medidas pelo encoder. ${value < 0 ? "Δt negativo compara um instante anterior com t₀ = 3 s; o tempo do ensaio continua positivo." : "Δt positivo compara t₀ = 3 s com um instante posterior."}`}</p>

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
      <p id={`${id}-help`} className={styles.help}>Cada clique avança uma marca: 0,5 → 0,1 → 0,01 → 0,001. Para trocar de lado, use os botões, o campo numérico ou as setas do teclado; as setas saltam o zero. O arraste para antes de atravessá-lo.</p>
      <p id={`${id}-message`} role="status" className={styles.message}>{message}</p>
    </div>

    <div className={styles.readings}>
      <MeasurementGraph scenario={scenario} value={value} />
      <div className={styles.instrument} aria-label="Painel do instrumento">
        <p className={styles.eyebrow}>03 / LEITURA DO INSTRUMENTO</p>
        <span>{friction ? "Força de atrito" : "Velocidade média"}</span>
        <output className={styles.bigReading} data-reading="output">{friction && output > 0 ? "+" : ""}{fmt(output)} <small>{outputUnit}</small></output>
        <dl><div><dt>{friction ? "Velocidade v" : "Intervalo Δt"}</dt><dd>{fmt(value)} {unit}</dd></div>
          <div><dt>{friction ? "Limite pela esquerda" : "Distância até 6 m/s"}</dt><dd>{friction ? "+5 N" : `${fmt(Math.abs(value))} m/s`}</dd></div>
          <div><dt>{friction ? "Limite pela direita" : "Limite pelos dois lados"}</dt><dd>{friction ? "−5 N" : "6 m/s"}</dd></div>
          <div><dt>{friction ? "Limite bilateral" : "Leitura do encoder em zero"}</dt><dd>{friction ? "Não existe" : "Sem leitura"}</dd></div>
        </dl>
      </div>
    </div>
    <div className={styles.explanation} aria-live="polite" aria-atomic="true">
      <p>{phrase}</p>
      {bothSides && <p className={styles.conclusion}>{friction ? "Você percorreu os dois lados: +5 N e −5 N. Os resultados não convergem para o mesmo valor, então o limite bilateral não existe." : "Pelos dois lados, a medição converge para 6 m/s. Essa é a velocidade instantânea em t = 3 s — mesmo que o encoder nunca consiga medi-la diretamente."}</p>}
    </div>

    <div className={styles.tableSection}>
      <h4>04 / Caderno de medições</h4>
      <p>As leituras aparecem conforme você explora. O traço significa “ainda não medido”.</p>
      <div className={styles.tableScroll}><table>
        <caption>Aproximações pela esquerda e pela direita; alternativa textual ao gráfico.</caption>
        <thead><tr><th scope="col">{friction ? "v" : "Δt"} &lt; 0 ({unit})</th><th scope="col">Leitura ({outputUnit})</th><th scope="col">{friction ? "v" : "Δt"} &gt; 0 ({unit})</th><th scope="col">Leitura ({outputUnit})</th></tr></thead>
        <tbody>{APPROACH_VALUES.map(mark => <tr key={mark}>
          {([-1, 1] as const).map(side => <CellPair key={side} value={side * mark} selected={value === side * mark} visited={visited.includes(side * mark)} scenario={scenario} />)}
        </tr>)}
        <tr className={styles.zeroRow}><th scope="row">0 {unit}</th><td colSpan={3}>{friction ? "LEI CINÉTICA NÃO DEFINIDA" : scenario === "firmware" ? "ENCODER: SEM LEITURA · FIRMWARE: 0 m/s" : "SEM LEITURA · 0/0"}</td></tr>
        </tbody></table></div>
      {visited.some(mark => !APPROACH_VALUES.some(step => Math.abs(mark) === step)) && <p className={styles.help}>Leituras entre as marcas estão no painel e no gráfico; o caderno compara as quatro distâncias de referência.</p>}
    </div>

    <div className={styles.model}>
      <h4>{friction ? "O que a lei física permite afirmar" : "A conta por trás da medição"}</h4>
      <p className={styles.formula}>{friction ? "F(v) = +5 N se v < 0; F(v) = −5 N se v > 0." : "v̄(Δt) = [(3 + Δt)² − 9] / Δt = 6 + Δt, somente para Δt ≠ 0."}</p>
      <p>{friction ? "O atrito cinético tem módulo μₖN = 0,25 × 20 = 5 N e sentido oposto ao movimento. Em v = 0 entra o atrito estático: a força depende da força externa e de μₛ, que não foi informado. Portanto, não atribuímos uma força em zero nem uma faixa estática de ±5 N." : "Na fórmula, os valores numéricos estão em unidades SI: tempo em segundos e velocidade em m/s. Cancelar Δt simplifica a expressão, mas não preenche o furo. Em Δt = 0, a expressão original continua sendo 0/0."}</p>
      {scenario === "firmware" && <div className={styles.firmware}>
        <pre><code>{"if (dt == 0) return 0.0;\nreturn (s(t0 + dt) - s(t0)) / dt;"}</code></pre>
        <button type="button" aria-expanded={inspectZero} onClick={() => setInspectZero(!inspectZero)}>Inspecionar Δt = 0</button>
        {inspectZero && <div role="status"><strong>Retorno do firmware: {measurement("firmware", 0)} m/s · Limite: 6 m/s</strong><p>O firmware devolve 0 m/s. O limite continua sendo 6 m/s. O código não errou a conta — ele respondeu uma pergunta que a física não fez.</p><p>Esta inspeção consulta somente o caso especial do código. O intervalo do ensaio continua em {fmt(value)} s, fora de zero.</p></div>}
      </div>}
    </div>

    <div className={styles.quiz}><h4>Teste sua leitura da bancada</h4>
      {quizzes.map((quiz, index) => <fieldset key={quiz.question}>
        <legend>{quiz.question}</legend>
        {quiz.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`${id}-quiz-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers(previous => ({ ...previous, [index]: optionIndex }))} />{option}</label>)}
        {answers[index] !== undefined && <p role="status" className={answers[index] === quiz.correct ? styles.correct : styles.retry}><strong>{answers[index] === quiz.correct ? "Isso mesmo. " : "Ainda não. "}</strong>{quiz.feedback}</p>}
      </fieldset>)}
    </div>
    <aside className={styles.transfer}>
      <p className={styles.eyebrow}>DA BANCADA PARA A ENGENHARIA TÉRMICA</p>
      <h4>O mesmo cuidado em um trocador de calor</h4>
      <p>A diferença média logarítmica de temperatura é LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁ / ΔT₂), para diferenças positivas e distintas.</p>
      <p>Se ΔT₁ e ΔT₂ se aproximam de 10 °C, a expressão tende a <strong>10 °C</strong>. Substituir ambos por 10 °C diretamente produz 0/0. Qual valor um programa deve usar nesse caso?</p>
      <p><strong>10 °C, pela extensão contínua.</strong> Um caso especial pode preservar o comportamento do modelo. Retornar zero indiscriminadamente, como no cenário B, quebra essa continuidade.</p>
    </aside>
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
      <p className={styles.eyebrow}>LABORATÓRIO INTERATIVO / LIMITES</p>
      <h3 id={`${id}-title`}>Bancada de movimento.<br /><span>Explore o que acontece perto de zero.</span></h3>
      <p>Controle uma bancada de movimento. Veja o que a medição faz ao se aproximar de um ponto — e o que acontece exatamente nele.</p>
      <Link href="/pre-calculo/funcoes/funcao-quadratica">Antes de começar: função quadrática ↗</Link>
    </header>
    <div className={styles.scenarios} role="group" aria-label="Cenário do experimento">
      {scenarios.map(item => <button key={item.id} type="button" aria-pressed={scenario === item.id} onClick={() => setScenario(item.id)}><span>{item.letter}</span>{item.title}</button>)}
    </div>
    <div className={styles.question}><span>ENSAIO {active.letter}</span><h4>{active.question}</h4></div>
    <BenchExperiment key={scenario} scenario={scenario} />
  </section>;
}
