"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { DEFAULT_RAMP, rampFormat as fmt, rampHeight, rampSection, rampSlices, rampVolume, type RampModel } from "@/lib/integral-ramp";
import { RichText } from "./RichText";
import base from "./ContinuityBridge.module.css";
import styles from "./IntegralRamp.module.css";

const RampScene = dynamic(() => import("./IntegralRampScene"), { ssr: false, loading: () => <div className={base.loading} role="status">Preparando a rampa 3D…</div> });
const dimensions = [
  { key: "length", label: "Comprimento (m)", min: 2, max: 8, step: 0.5 },
  { key: "width", label: "Largura (m)", min: 1, max: 3, step: 0.25 },
  { key: "startHeight", label: "Altura no início (m)", min: 0.1, max: 1.5, step: 0.1 },
  { key: "endHeight", label: "Altura no final (m)", min: 0.1, max: 1.5, step: 0.1 },
] as const;
const tex = (v: number, digits = 3) => fmt(v, digits).replace(',', '{,}');

function AreaChart({ model, x, count }: { model: RampModel; x: number; count: number | null }) {
  const sx = (v: number) => 54 + 490 * v / model.length;
  const max = model.width * Math.max(model.startHeight, model.endHeight) * 1.2;
  const sy = (v: number) => 220 - 170 * v / max;
  return <svg viewBox="0 0 590 265" className={styles.chart} role="img" aria-label={`Área de cada corte ao longo da rampa. O trecho até ${fmt(x)} metros está destacado. Sua integral é ${fmt(rampVolume(model, x),3)} metros cúbicos.`}>
    <text x="16" y="22" fill="var(--ink-muted)" fontSize="12">Área de cada corte (m²)</text>
    <line x1="54" y1="220" x2="554" y2="220" stroke="var(--border)" />
    <line x1="54" y1="40" x2="54" y2="220" stroke="var(--border)" />
    <path d={`M54,220 L54,${sy(rampSection(model, 0))} L${sx(x)},${sy(rampSection(model,x))} L${sx(x)},220 Z`} fill="var(--sage-soft)" />
    {count !== null && rampSlices(model,x,count).map((s,i) => <rect key={i} x={sx(s.start)} y={sy(model.width*s.height)} width={sx(s.end)-sx(s.start)} height={220-sy(model.width*s.height)} fill="var(--sky-soft)" fillOpacity=".6" stroke="var(--sky-ink)" strokeWidth=".7" />)}
    <line x1="54" y1={sy(rampSection(model,0))} x2="544" y2={sy(rampSection(model,model.length))} stroke="var(--terracotta)" strokeWidth="3" />
    <line x1={sx(x)} y1={sy(rampSection(model,x))} x2={sx(x)} y2="220" stroke="var(--sky-ink)" strokeDasharray="5 4" />
    <circle cx={sx(x)} cy={sy(rampSection(model,x))} r="5" fill="var(--sky-ink)" />
    <text x="44" y={sy(rampSection(model,0))+4} textAnchor="end" fill="var(--ink-muted)" fontSize="11">{fmt(rampSection(model,0))}</text>
    <text x="54" y="242" fill="var(--ink-muted)" fontSize="11">0</text><text x="544" y="242" textAnchor="end" fill="var(--ink-muted)" fontSize="11">{fmt(model.length)}</text>
    <text x="544" y="262" textAnchor="end" fill="var(--ink-muted)" fontSize="11">Trecho percorrido (m)</text>
  </svg>;
}

export function IntegralRamp() {
  const [model,setModel] = useState<RampModel>(DEFAULT_RAMP);
  const [fraction,setFraction] = useState(0.5);
  const [compare,setCompare] = useState(false);
  const [count,setCount] = useState(6);
  const [playing,setPlaying] = useState(false);
  const [message,setMessage] = useState("");
  const fractionRef = useRef(fraction);
  const id=useId();
  useEffect(()=>{ fractionRef.current=fraction; },[fraction]);
  useEffect(()=>{
    if(!playing) return;
    const start=performance.now(), from=fractionRef.current;
    let frame=0,last=0;
    function tick(now:number) {
      if(now-last>=40) {
        const next=Math.min(1,from+(now-start)/8000);
        setFraction(next);last=now;
        if(next===1) {setPlaying(false);return;}
      }
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[playing]);
  const x=fraction*model.length;
  const volume=rampVolume(model,x), total=rampVolume(model,model.length);
  const sum=rampSlices(model,x,count).reduce((v,s)=>v+s.volume,0);
  const difference=sum-volume;
  function changePosition(next:number) {setPlaying(false);setFraction(Math.max(0,Math.min(1,next/model.length)));}
  function togglePlay() {if(!playing&&fraction>=1){setFraction(0);fractionRef.current=0;}setPlaying(v=>!v);}
  return <section className={base.bridge} aria-label="Simulador 3D de integrais: rampa de concreto">
    <header className={base.header}><p className={base.eyebrow}>INTEGRAIS · CONSTRUÇÃO CIVIL</p><h3>Quanto concreto cabe aqui?</h3><p>Uma rampa fica pronta quando juntamos todos os seus pequenos trechos. Avance o corte azul e veja quanto volume já foi preenchido.</p></header>
    <p className={base.instruction}>Arraste o corte azul ou mova o controle abaixo.</p>
    <RampScene model={model} x={x} count={compare?count:null} onPositionChange={changePosition} />
    <div className={styles.readings}>
      <div><span>Concreto no trecho</span><output aria-label="Volume acumulado">{fmt(volume,3)} <small>m³</small></output></div>
      <div><span>Falta preencher</span><output aria-label="Volume restante">{fmt(total-volume,3)} <small>m³</small></output></div>
      <div><span>Área do corte azul</span><output aria-label="Área da seção atual">{fmt(rampSection(model,x),3)} <small>m²</small></output></div>
    </div>
    <div className={base.controls}>
      <div className={styles.toolbar}><button type="button" className={base.primary} onClick={togglePlay}>{playing?"Pausar":"Preencher aos poucos"}</button><button type="button" aria-pressed={compare} onClick={()=>{setPlaying(false);setCompare(v=>!v);}}>Somar fatias</button><button type="button" onClick={()=>{setPlaying(false);setModel(DEFAULT_RAMP);setFraction(0.5);setCount(6);setCompare(false);setMessage("");}}>Recomeçar</button></div>
      <label className={styles.progress} htmlFor={id+"-distance"}>Trecho preenchido <output>{fmt(x)} de {fmt(model.length)} m</output></label>
      <input id={id+"-distance"} type="range" min="0" max={model.length} step="0.01" value={x} aria-valuetext={`${fmt(x)} metros preenchidos`} onChange={e=>changePosition(Number(e.target.value))} />
      <div className={base.feedback}>{x===0?"Ainda não há concreto. Avance um pouco para começar a somar volume.":fraction===1?`Rampa completa: ${fmt(total,3)} m³. Esse é o volume de todos os trechos somados.`:`Até ${fmt(x)} m, juntamos ${fmt(volume,3)} m³. Cada novo trecho acrescenta volume conforme a área do seu corte.`}</div>
      {compare&&<div className={styles.compare}>
        <label htmlFor={id+"-slices"}>Em quantas fatias vamos dividir? <strong>{count}</strong></label>
        <input id={id+"-slices"} type="range" min="2" max="60" step="1" value={count} onChange={e=>setCount(Number(e.target.value))} />
        <p>Somando os blocos: <strong>{fmt(sum,3)} m³</strong>. Volume exato: <strong>{fmt(volume,3)} m³</strong>.</p>
        <p>{Math.abs(difference)<1e-9?"Aqui os blocos coincidem com o volume exato.":`Os blocos ${difference>0?"passam":"ficam abaixo"} do volume real em ${fmt(Math.abs(difference),4)} m³. Aumente o número de fatias para diminuir essa diferença.`}</p>
        <p className={base.help}>Cada bloco usa a altura no final da fatia. Se a rampa sobe, sobra volume; se desce, falta. A integral é o valor para o qual essas somas caminham.</p>
      </div>}
      <details className={base.adjustments}><summary>Mudar as medidas da rampa</summary><div className={styles.inputs}>
        {dimensions.map(d=><label key={d.key}>{d.label}<input type="number" min={d.min} max={d.max} step={d.step} value={model[d.key]} onChange={e=>{
          const v=e.target.valueAsNumber;setPlaying(false);
          if(!Number.isFinite(v)){setMessage("Informe uma medida dentro do intervalo indicado.");return;}
          const next=Math.max(d.min,Math.min(d.max,v));setModel(m=>({...m,[d.key]:next}));
          setMessage(next!==v?`${d.label}: use entre ${fmt(d.min)} e ${fmt(d.max)}.`:"");
        }} /><small>De {fmt(d.min)} a {fmt(d.max)} m</small></label>)}
      </div><p role="status" className={base.message}>{message}</p></details>
    </div>
    <details className={base.math}><summary>Entender a matemática</summary>
      <p>O corte azul tem a largura da rampa e a altura daquele ponto. Sua área multiplicada por um pequeno comprimento aproxima o volume de uma fatia. Somar todas as fatias aproxima o volume total.</p>
      <RichText as="p" className={base.formula}>{String.raw`\(h(s)=${tex(model.startHeight)}+\frac{${tex(model.endHeight-model.startHeight)}}{${tex(model.length)}}s\), \(A(s)=${tex(model.width)}h(s)\). \[V(x)=\int_0^x A(s)\,ds=${tex(model.width)}\left(${tex(model.startHeight)}x+\frac{${tex(model.endHeight-model.startHeight)}}{2\cdot${tex(model.length)}}x^2\right).\] No corte atual, \(h(${tex(x)})=${tex(rampHeight(model,x))}\,\mathrm m\).`}</RichText>
      <AreaChart model={model} x={x} count={compare?count:null} />
      <RichText as="p">{String.raw`A altura deste gráfico é uma área em \(\mathrm m^2\), e o eixo horizontal mede comprimento em \(\mathrm m\). Por isso, a região sombreada representa volume em \(\mathrm m^3\). Aqui \(V'(x)=A(x)\): derivar o volume acumulado recupera a área do corte.`}</RichText>
    </details>
    <p className={styles.note}>Modelo geométrico de preenchimento, sem simular o escoamento ou a cura do concreto. As medidas representam um volume ideal, sem perdas de obra.</p>
  </section>;
}
