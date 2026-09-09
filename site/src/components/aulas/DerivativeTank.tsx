"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { closerTankInterval, MAX_TANK_TIME, normalizeTankTime, tankAverage, tankFormat as fmt, tankRate, tankVolume, type TankExperience } from "@/lib/derivative-tank";
import base from "./ContinuityBridge.module.css";
import styles from "./DerivativeTank.module.css";

const TankScene = dynamic(() => import("./DerivativeTankScene"), { ssr: false, loading: () => <div className={base.loading} role="status">Preparando o reservatório 3D…</div> });
const experiences = [
  { id: "fill", title: "Quanto entra agora?", question: "O tanque enche sempre no mesmo ritmo?" },
  { id: "compare", title: "Olhando cada vez mais de perto", question: "Uma média de vários segundos conta o que acontece agora?" },
  { id: "drain", title: "E quando a água sai?", question: "O que uma derivada negativa nos diz?" },
] as const;

function VolumeGraph({ time, interval, drain, compare }: { time: number; interval: number; drain: boolean; compare: boolean }) {
  const x = (v: number) => 50 + v * 55;
  const y = (v: number) => 258 - v * 2.2;
  const volume = tankVolume(time, drain);
  const rate = tankRate(time, drain);
  const path = Array.from({ length: 81 }, (_, i) => (i ? "L " : "M ") + x(i / 10) + " " + y(tankVolume(i / 10, drain))).join(" ");
  const start = Math.max(0, time - 1);
  const end = Math.min(8, time + 1);
  return <svg viewBox="0 0 550 300" className={base.graph} role="img" aria-label={"Volume em função do tempo. Aos " + fmt(time) + " segundos, há " + fmt(volume) + " litros, com taxa instantânea " + fmt(rate) + " litros por segundo." + (compare ? " A média até " + fmt(time + interval) + " segundos é " + fmt(tankAverage(time, interval)!) + " litros por segundo." : "")}>
    <text x="20" y="22" fill="var(--ink-muted)" fontSize="12">VOLUME (L)</text>
    {[0, 25, 50, 75, 100].map(v => <g key={v}><line x1="50" x2="490" y1={y(v)} y2={y(v)} stroke="var(--border)" /><text x="40" y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--ink-muted)">{v}</text></g>)}
    <path d={path} stroke="var(--terracotta)" fill="none" strokeWidth="3" />
    <path d={"M " + x(start) + " " + y(volume + rate * (start - time)) + " L " + x(end) + " " + y(volume + rate * (end - time))} stroke="var(--verde)" strokeWidth="3" strokeDasharray="6 3" fill="none" />
    {compare && <><line x1={x(time)} y1={y(volume)} x2={x(time + interval)} y2={y(tankVolume(time + interval))} stroke="var(--sage)" strokeWidth="2" /><circle cx={x(time + interval)} cy={y(tankVolume(time + interval))} r="5" fill="var(--sage)" /></>}
    <circle cx={x(time)} cy={y(volume)} r="6" fill="var(--terracotta)" stroke="var(--surface)" strokeWidth="2" />
    {[0, 2, 4, 6, 8].map(t => <text key={t} x={x(t)} y="279" textAnchor="middle" fill="var(--ink-muted)" fontSize="12">{t}</text>)}
    <text x="490" y="299" textAnchor="end" fill="var(--ink-muted)" fontSize="11">Tempo (s)</text>
  </svg>;
}

function TankExperiment({ experience }: { experience: TankExperience }) {
  const initialTime = experience === "compare" ? 3 : 2;
  const [time, setTime] = useState(initialTime);
  const [interval, setInterval] = useState(2);
  const [playing, setPlaying] = useState(false);
  const [draft, setDraft] = useState(fmt(initialTime));
  const [message, setMessage] = useState("");
  const timeRef = useRef(time);
  const id = useId();
  const drain = experience === "drain";
  const compare = experience === "compare";
  const volume = tankVolume(time, drain);
  const rate = tankRate(time, drain);
  const average = tankAverage(time, interval, drain)!;
  useEffect(() => { timeRef.current = time; }, [time]);
  useEffect(() => {
    if (!playing) return;
    const from = timeRef.current;
    const started = performance.now();
    let animation = 0;
    let lastPaint = 0;
    function tick(now: number) {
      if (now - lastPaint >= 32) {
        const next = normalizeTankTime(from + (now - started) / 1000, from);
        setTime(next); setDraft(fmt(next)); lastPaint = now;
        if (next === MAX_TANK_TIME) { setPlaying(false); return; }
      }
      animation = requestAnimationFrame(tick);
    }
    animation = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animation);
  }, [playing]);
  function changeTime(raw: number) {
    setPlaying(false);
    const next = normalizeTankTime(raw, time);
    setTime(next); setDraft(fmt(next));
    setMessage(!Number.isFinite(raw) ? "Digite um tempo válido, com vírgula ou ponto decimal." : raw < 0 || raw > MAX_TANK_TIME ? "Escolha um instante entre 0 e 6 segundos." : "");
  }
  function reset() {
    setPlaying(false); setTime(initialTime); setDraft(fmt(initialTime)); setInterval(2); setMessage("");
  }
  function togglePlay() {
    if (!playing && time >= MAX_TANK_TIME) { setTime(0); timeRef.current = 0; setDraft(fmt(0)); }
    setPlaying(!playing);
  }
  const feedback = compare
    ? "A média é " + fmt(average) + " L/s. Naquele instante, a taxa é " + fmt(rate) + " L/s. Encurtar a medição aproxima os dois valores."
    : time === 0 ? "Neste instante inicial, a taxa é zero. Avance o tempo para ver o ritmo mudar."
    : drain ? "O tanque tem " + fmt(volume) + " litros, e o volume está diminuindo a " + fmt(Math.abs(rate)) + " L/s neste instante. O sinal negativo indica que a água está saindo."
    : "O tanque tem " + fmt(volume) + " litros, e o volume está aumentando a " + fmt(rate) + " L/s neste instante. Essa taxa é a derivada.";
  return <div>
    <p className={base.instruction}>{compare ? "Encurte a medição e compare as duas taxas." : "Avance o tempo e observe o nível da água."}</p>
    <TankScene time={time} drain={drain} interval={compare ? interval : null} onTimeChange={changeTime} />
    <div className={styles.readings} aria-label="Volume e taxa de variação">
      <div><span>Água no tanque</span><output data-reading="tank-volume" aria-live={playing ? "off" : "polite"}>{fmt(volume)} <small>L</small></output></div>
      <div><span>{time === 0 ? "Variação neste instante" : drain ? "Diminuindo neste instante" : "Aumentando neste instante"}</span><output data-reading="tank-rate" aria-live={playing ? "off" : "polite"}>{rate > 0 ? "+" : ""}{fmt(rate)} <small>L/s</small></output></div>
    </div>
    <div className={base.controls}>
      <div className={styles.timeControl}>
        <label htmlFor={id + "-time"}>Instante observado <strong>{fmt(time)} s</strong></label>
        <input id={id + "-time"} type="range" min="0" max={MAX_TANK_TIME} step="0.01" value={time} aria-valuetext={fmt(time) + " segundos"} onChange={e => changeTime(Number(e.target.value))} />
        <div className={base.endLabels}><span>Início · 0 s</span><span>6 s</span></div>
      </div>
      {compare && <div className={styles.comparison} aria-label="Comparação entre média e derivada">
        <div><span>Medição de {fmt(time)} a {fmt(time + interval)} s</span><strong data-reading="tank-average">{fmt(average)} L/s</strong><small>Média neste intervalo</small></div>
        <div><span>Intervalo observado</span><strong>{fmt(interval)} s</strong><small>Mais curto → mais perto da taxa instantânea</small></div>
      </div>}
      <div className={base.actions}>
        {compare ? <button className={base.primary} type="button" disabled={interval === 0.01} onClick={() => setInterval(closerTankInterval(interval))}>{interval === 0.01 ? "Medição bem próxima" : "Medir mais de perto"}</button>
          : <button className={base.primary} type="button" disabled={time === MAX_TANK_TIME} onClick={() => changeTime(time + 1)}>Avançar 1 segundo</button>}
        {!compare && <button type="button" onClick={togglePlay}>{playing ? "Pausar" : time === MAX_TANK_TIME ? "Observar de novo" : drain ? "Ver esvaziando" : "Ver enchendo"}</button>}
        <button type="button" onClick={reset}>Recomeçar</button>
      </div>
      <p className={base.feedback} role="status" aria-live={playing ? "off" : "polite"}>{feedback}</p>
      {compare && <p className={base.help}>A marca dourada no tanque mostra o nível ao final da medição; a água azul mostra o instante escolhido.</p>}
      <details className={base.adjustments}>
        <summary>Escolher um tempo exato</summary>
        <div className={base.numberRow}><form onSubmit={e => { e.preventDefault(); changeTime(draft.trim() ? Number(draft.replace(",", ".")) : NaN); }}>
          <label className={base.srOnly} htmlFor={id + "-number"}>Tempo em segundos</label>
          <input id={id + "-number"} inputMode="decimal" value={draft} onChange={e => setDraft(e.target.value)} aria-describedby={id + "-message"} />
          <button type="submit">Aplicar</button>
        </form></div>
        <p id={id + "-message"} role="status" className={base.message}>{message}</p>
        <p className={base.help}>Mover o controle de tempo pausa a reprodução e mostra o instante escolhido.</p>
      </details>
    </div>
    <details className={base.math}>
      <summary>Entender a matemática</summary>
      <p>Volume e taxa são grandezas diferentes: litros dizem quanto há no tanque; litros por segundo dizem quão rápido esse volume muda. A bomba deste modelo varia a vazão ao longo do tempo.</p>
      <p className={base.formula}>{drain ? "V(t) = 90 − t² litros · V′(t) = −2t litros por segundo" : "V(t) = 10 + t² litros · V′(t) = 2t litros por segundo"}</p>
      <p>Aos {fmt(time)} s: V = {fmt(volume)} L e V′ = {fmt(rate)} L/s. A taxa instantânea não precisa ser igual à quantidade que entrará ou sairá durante o próximo segundo inteiro.</p>
      {compare && <><p>Entre {fmt(time)} s e {fmt(time + interval)} s, o volume passa de {fmt(volume)} para {fmt(tankVolume(time + interval))} L. A taxa média é a variação de volume dividida pelo tempo decorrido.</p><p className={base.formula}>[V(t + Δt) − V(t)] / Δt = 2t + Δt, para Δt ≠ 0.<br />Quando Δt se aproxima de zero, a taxa média se aproxima de 2t.</p><p>Com intervalo zero, a divisão seria 0/0. Por isso, a experiência aproxima a medição sem usar esse valor.</p></>}
      <VolumeGraph time={time} interval={interval} drain={drain} compare={compare} />
      <p className={base.help}>Azul: volume ao longo do tempo. Verde tracejado: tangente, cuja inclinação representa a derivada.{compare && " Dourado: secante, cuja inclinação representa a média no intervalo."} No instante inicial t = 0, a experiência observa a aproximação pela direita.</p>
      <p className={base.help}>Reservatório de 100 L. O controle percorre 0 a 6 s; as medições podem ir até 8 s. O modelo permanece dentro da capacidade nesse período. A reprodução para ao fim do trecho observado.</p>
    </details>
  </div>;
}

export function DerivativeTank() {
  const [experience, setExperience] = useState<TankExperience>("fill");
  const title = useRef<HTMLHeadingElement>(null);
  const previous = useRef(experience);
  const id = useId();
  useEffect(() => {
    if (experience === previous.current) return;
    previous.current = experience; title.current?.focus({ preventScroll: true });
    title.current?.closest("section")?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [experience]);
  const index = experiences.findIndex(item => item.id === experience);
  return <section id="reservatorio-derivadas" className={base.bridge} aria-labelledby={id + "-title"}>
    <header className={base.header}><p className={base.eyebrow}>EXPLORE EM 3D · EXPERIÊNCIA {index + 1} DE 3</p><h3 id={id + "-title"} ref={title} tabIndex={-1}>{experiences[index].title}</h3><p>{experiences[index].question}</p></header>
    <TankExperiment key={experience} experience={experience} />
    <nav className={base.next} aria-label="Outras experiências de derivadas">
      {index > 0 && <button type="button" onClick={() => setExperience(experiences[index - 1].id)}>← Experiência anterior</button>}
      <button type="button" onClick={() => setExperience(experiences[(index + 1) % 3].id)}>{index < 2 ? "Próxima: " + experiences[index + 1].title + " →" : "Voltar à primeira experiência"}</button>
    </nav>
  </section>;
}
