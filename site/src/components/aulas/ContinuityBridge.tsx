"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { bridgeFormat as fmt, bridgeProfile, bridgeReading, bridgeStart, LEFT_HEIGHT, MAX_ANGLE, MAX_HEIGHT, MIN_HEIGHT, normalizeAngle, normalizeHeight, type BridgeExperience } from "@/lib/continuity-bridge";
import styles from "./ContinuityBridge.module.css";

const BridgeScene = dynamic(() => import("./ContinuityBridgeScene"), {
  ssr: false,
  loading: () => <div className={styles.loading} role="status">Preparando a ponte 3D…</div>,
});
const experiences = [
  { id: "connect", title: "Conectando a ponte", question: "As duas partes se encontram na mesma altura?" },
  { id: "step", title: "Um degrau no caminho", question: "O que muda quando um lado fica mais alto?" },
  { id: "ramp", title: "Uma rampa também funciona", question: "A ponte pode mudar de inclinação e continuar conectada?" },
] as const;

function ProfileGraph({ height, angle }: { height: number; angle: number }) {
  const { continuous } = bridgeReading(height);
  const x = (v: number) => 280 + v * 52;
  const y = (v: number) => 258 - v * 44;
  return <svg className={styles.graph} viewBox="0 0 560 300" role="img" aria-label={"Perfil da ponte. Pela esquerda, a altura chega a 2,50 metros. Pela direita, chega a " + fmt(height) + " metros. A altura na junção é " + fmt(height) + " metros. " + (continuous ? "O perfil é contínuo na junção." : "Há um salto na junção.")}>
    <text x="24" y="24" fill="var(--ink-muted)" fontSize="12">ALTURA DO CAMINHO (m)</text>
    <line x1="60" x2="505" y1={y(0)} y2={y(0)} stroke="var(--ink-subtle)" />
    <line x1={x(0)} x2={x(0)} y1="38" y2={y(0)} stroke="var(--ink-subtle)" strokeDasharray="4 5" />
    {[1, 2, 3, 4].map(mark => <g key={mark}><line x1="60" x2="505" y1={y(mark)} y2={y(mark)} stroke="var(--border)" /><text x="45" y={y(mark) + 4} fill="var(--ink-muted)" fontSize="12">{mark}</text></g>)}
    <path d={"M " + x(-4) + " " + y(LEFT_HEIGHT) + " H " + x(0)} stroke="var(--terracotta)" fill="none" strokeWidth="4" />
    <path d={"M " + x(0) + " " + y(height) + " L " + x(4) + " " + y(bridgeProfile(4, height, angle))} stroke="var(--sage)" fill="none" strokeWidth="4" />
    {!continuous && <circle cx={x(0)} cy={y(LEFT_HEIGHT)} r="6" fill="var(--surface)" stroke="var(--terracotta)" strokeWidth="2.5" />}
    <circle cx={x(0)} cy={y(height)} r="6" fill="var(--sage)" stroke="var(--surface)" strokeWidth="2" />
    {[-4, -2, 0, 2, 4].map(mark => <text key={mark} x={x(mark)} y="278" textAnchor="middle" fill="var(--ink-muted)" fontSize="12">{mark === 0 ? "junção" : mark}</text>)}
    <text x="504" y="298" textAnchor="end" fill="var(--ink-muted)" fontSize="11">Posição ao longo da ponte (m)</text>
  </svg>;
}

function BridgeExperiment({ experience, onRamp }: { experience: BridgeExperience; onRamp: () => void }) {
  const [model, setModel] = useState(() => bridgeStart(experience));
  const [draft, setDraft] = useState(() => fmt(bridgeStart(experience).height));
  const [message, setMessage] = useState("");
  const id = useId();
  const reading = bridgeReading(model.height);
  const ramp = experience === "ramp";
  const createStep = experience === "step" && reading.continuous;
  function updateHeight(raw: number, drag = false) {
    const height = normalizeHeight(raw, model.height, drag);
    setModel(previous => ({ ...previous, height }));
    setDraft(fmt(height));
    setMessage(!Number.isFinite(raw) ? "Digite uma altura válida, com vírgula ou ponto decimal." : raw < MIN_HEIGHT || raw > MAX_HEIGHT ? "Use uma altura entre 1,50 e 3,50 metros." : "");
  }
  function reset() {
    const next = bridgeStart(experience);
    setModel(next); setDraft(fmt(next.height)); setMessage("");
  }
  const feedback = reading.continuous
    ? model.angle === 0 ? "Os trechos se encontram! A altura chega ao mesmo valor pelos dois lados." : "A rampa continua conectada. A inclinação muda, mas a altura não dá um salto na junção."
    : "Existe um degrau de " + fmt(Math.abs(reading.difference)) + " m. O lado ajustável está " + (reading.difference > 0 ? "mais alto" : "mais baixo") + ".";
  return <div>
    <p className={styles.instruction}>{ramp ? "Mude a inclinação e observe a conexão." : experience === "step" ? "Levante ou abaixe a alça dourada para criar um degrau." : "Arraste a alça dourada até as alturas coincidirem."}</p>
    <BridgeScene height={model.height} angle={model.angle} onHeightChange={raw => updateHeight(raw, true)} />
    <div className={styles.readings} aria-label="Alturas na junção">
      <div><span>Lado fixo · azul</span><strong>2,50 <small>m</small></strong></div>
      <div><span>Lado ajustável · dourado</span><output data-reading="bridge-height">{fmt(model.height)} <small>m</small></output></div>
      <div><span>Diferença na junção</span><output data-reading="bridge-gap">{fmt(Math.abs(reading.difference))} <small>m</small></output></div>
    </div>
    <div className={styles.controls}>
      {ramp && <div className={styles.angleControl}>
        <label htmlFor={id + "-angle"}>Inclinação da rampa <strong>{model.angle}°</strong></label>
        <input id={id + "-angle"} type="range" min={-MAX_ANGLE} max={MAX_ANGLE} step="1" value={model.angle} aria-valuetext={model.angle + " graus"} onChange={e => setModel(previous => ({ ...previous, angle: normalizeAngle(Number(e.target.value), previous.angle) }))} />
        <div className={styles.endLabels}><span>Descida</span><span>Plano</span><span>Subida</span></div>
      </div>}
      <div className={styles.actions}>
        <button className={styles.primary} type="button" disabled={reading.continuous && !createStep} onClick={() => updateHeight(createStep ? 3 : LEFT_HEIGHT)}>{createStep ? "Criar um degrau" : reading.continuous ? "Alturas alinhadas" : "Alinhar alturas"}</button>
        {!ramp && <button type="button" onClick={onRamp}>Experimentar uma rampa</button>}
        <button type="button" onClick={reset}>Recomeçar</button>
      </div>
      <p className={reading.continuous ? styles.connected : styles.feedback} role="status"><strong>{reading.continuous ? "Conectada" : "Há um degrau"}</strong>{feedback}</p>
      <details className={styles.adjustments}>
        <summary>Ajustar pelos números</summary>
        <div className={styles.numberRow}>
          <label htmlFor={id + "-height"}>Altura do lado dourado na junção</label>
          <form onSubmit={e => { e.preventDefault(); updateHeight(draft.trim() ? Number(draft.replace(",", ".")) : NaN); }}>
            <label className={styles.srOnly} htmlFor={id + "-number"}>Altura em metros</label>
            <input id={id + "-number"} inputMode="decimal" value={draft} onChange={e => setDraft(e.target.value)} aria-describedby={id + "-message"} />
            <button type="submit">Aplicar</button>
          </form>
        </div>
        <input id={id + "-height"} type="range" min={MIN_HEIGHT} max={MAX_HEIGHT} step="0.01" value={model.height} aria-valuetext={fmt(model.height) + " metros"} onChange={e => updateHeight(Number(e.target.value))} />
        <div className={styles.endLabels}><span>1,50 m</span><span>3,50 m</span></div>
        <p id={id + "-message"} className={styles.message} role="status">{message}</p>
        <p className={styles.help}>Use as setas do teclado para ajustar de centímetro em centímetro. A altura é medida a partir do nível de referência do rio.</p>
      </details>
    </div>
    <details className={styles.math}>
      <summary>Entender a matemática</summary>
      <p>Estamos estudando o perfil de altura na junção, indicada por x = 0. Para haver continuidade, as alturas que se aproximam pelos dois lados precisam coincidir com a altura definida na própria junção.</p>
      <div className={styles.conditions}><span>Pela esquerda: <b>2,50 m</b></span><span>Pela direita: <b>{fmt(model.height)} m</b></span><span>Na junção: <b>{fmt(model.height)} m</b></span></div>
      <p>Neste modelo, a junção pertence ao trecho dourado. {reading.continuous ? "Os três valores coincidem: o perfil é contínuo nesse ponto." : "Os limites laterais são diferentes: o limite bilateral não existe, e o perfil é descontínuo nesse ponto."}</p>
      <p className={styles.formula}>h(x) = 2,50, se x &lt; 0<br />h(x) = {fmt(model.height)} + x · tan({model.angle}°), se x ≥ 0</p>
      <ProfileGraph height={model.height} angle={model.angle} />
      {ramp && <p>À esquerda, a inclinação é zero. À direita, é tan({model.angle}°). {model.angle !== 0 && reading.continuous ? "As inclinações diferentes criam um canto: o perfil é contínuo, mas não é derivável na junção." : "A continuidade depende das alturas na junção; a derivabilidade também depende de como as inclinações se encontram."}</p>}
      <p className={styles.help}>Esta experiência explora continuidade e saltos. Uma função também pode ter um furo ou um valor isolado diferente do limite, como você verá na próxima aula.</p>
    </details>
  </div>;
}

export function ContinuityBridge() {
  const [experience, setExperience] = useState<BridgeExperience>("connect");
  const title = useRef<HTMLHeadingElement>(null);
  const previous = useRef(experience);
  const id = useId();
  useEffect(() => {
    if (previous.current === experience) return;
    previous.current = experience;
    title.current?.focus({ preventScroll: true });
    title.current?.closest("section")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [experience]);
  const index = experiences.findIndex(item => item.id === experience);
  const active = experiences[index];
  return <section id="ponte-continuidade" className={styles.bridge} aria-labelledby={id + "-title"}>
    <header className={styles.header}>
      <p className={styles.eyebrow}>EXPLORE EM 3D · EXPERIÊNCIA {index + 1} DE 3</p>
      <h3 id={id + "-title"} ref={title} tabIndex={-1}>{active.title}</h3>
      <p>{active.question}</p>
    </header>
    <BridgeExperiment key={experience} experience={experience} onRamp={() => setExperience("ramp")} />
    <nav className={styles.next} aria-label="Outras experiências de continuidade">
      {index > 0 && <button type="button" onClick={() => setExperience(experiences[index - 1].id)}>← Experiência anterior</button>}
      <button type="button" onClick={() => setExperience(experiences[(index + 1) % 3].id)}>{index < 2 ? "Próxima: " + experiences[index + 1].title + " →" : "Voltar à primeira experiência"}</button>
    </nav>
  </section>;
}
