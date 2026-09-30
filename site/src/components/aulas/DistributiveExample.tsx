"use client";

import { useId, useState } from "react";
import { MathFormula } from "./Math";

const examples = [
  {
    name: "Com números", factor: "4", first: "15", second: "28", sign: "+", tail: "",
    products: ["4 × 15 = 60", "4 × 28 = 112"], expanded: String.raw`(4\times15)+(4\times28)`, result: "60+112=172",
    check: String.raw`4\times(15+28)=4\times43=172`,
    reading: "quatro vezes quinze mais quatro vezes vinte e oito", resultReading: "sessenta mais cento e doze é igual a cento e setenta e dois",
    checkReading: "quatro vezes a soma de quinze e vinte e oito é quatro vezes quarenta e três, igual a cento e setenta e dois",
    conclusion: "Somar primeiro ou distribuir dá o mesmo total: 172.",
  },
  {
    name: "Expressão da aula", factor: "2", first: "x", second: "3", sign: "+", tail: "+ 4x − 5",
    products: ["2 × x = 2x", "2 × 3 = 6"], expanded: "2x+6+4x-5", result: "(2x+4x)+(6-5)=6x+1",
    check: String.raw`x=2:\quad 2(2+3)+4\cdot2-5=13\quad\text{e}\quad6\cdot2+1=13`,
    reading: "dois x mais seis mais quatro x menos cinco", resultReading: "dois x mais quatro x, mais seis menos cinco, é igual a seis x mais um",
    checkReading: "para x igual a dois, a expressão original e seis x mais um valem treze",
    conclusion: "O 2 multiplica os termos dentro deste parêntese. Depois, juntamos os termos semelhantes. A equivalência vale para todo x; x=2 é uma conferência.",
  },
  {
    name: "Com sinal negativo", factor: "−2", first: "x", second: "3", sign: "−", tail: "",
    products: ["−2 × x = −2x", "−2 × (−3) = +6"], expanded: "(-2)x+(-2)(-3)", result: "-2x+6",
    check: String.raw`x=2:\quad-2(2-3)=2\quad\text{e}\quad-2\cdot2+6=2`,
    reading: "menos dois vezes x mais menos dois vezes menos três", resultReading: "menos dois x mais seis",
    checkReading: "para x igual a dois, a expressão original e menos dois x mais seis valem dois",
    conclusion: "O segundo termo é −3. Multiplicar dois números negativos produz +6. Distribua o fator com seu sinal.",
  },
] as const;

const steps = [
  ["Observe antes de calcular", "O número fora do parêntese multiplica cada termo da soma. Avance para acompanhar os dois caminhos."],
  ["Multiplique o primeiro termo", "A primeira seta liga o fator ao primeiro termo. Este produto será a primeira parcela."],
  ["Multiplique também o segundo termo", "A segunda seta mostra o outro produto. Nenhum termo dentro do parêntese fica de fora."],
  ["Reúna os produtos", "Agora escrevemos a mesma expressão com o parêntese aberto. Cada parcela veio de um dos caminhos."],
  ["Simplifique e confira", "Some números ou junte termos semelhantes. Confira que a expressão continua com o mesmo valor."],
] as const;

export function DistributiveExample() {
  const [mode, setMode] = useState(0);
  const [step, setStep] = useState(0);
  const id = useId().replace(/:/g, "");
  const example = examples[mode];
  const firstColor = "var(--terracotta)";
  const secondColor = "var(--sage)";
  return <section aria-label="Exemplo visual da propriedade distributiva" className="my-6 rounded-2 border border-border bg-surface p-5 md:p-6">
    <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">Veja cada transformação</p>
    <h3 className="mt-2 font-serif text-2xl">Um fator, dois caminhos</h3>
    <p className="mt-2 text-sm text-ink-muted">Use “Próximo passo” para ver de onde vem cada parcela. Você pode voltar e repetir.</p>
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Escolha o exemplo">
      {examples.map((item, index) => <button key={item.name} type="button" aria-pressed={mode === index} onClick={() => { setMode(index); setStep(0); }} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${mode === index ? "border-terracotta bg-terracotta-soft text-terracotta-ink" : "border-border text-ink-muted hover:bg-surface-soft"}`}>{item.name}</button>)}
    </div>
    <div className="mt-5 rounded-xl bg-bg p-3 md:p-5">
      <svg viewBox="0 0 600 165" role="img" aria-label={`${example.factor} vezes (${example.first} ${example.sign} ${example.second}) ${example.tail}. ${step >= 1 ? `Primeiro caminho: ${example.products[0]}.` : ""} ${step >= 2 ? `Segundo caminho: ${example.products[1]}.` : ""}`} className="w-full max-w-[600px]">
        <defs>
          <marker id={`${id}-first`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill={firstColor} /></marker>
          <marker id={`${id}-second`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill={secondColor} /></marker>
        </defs>
        <g fontFamily="Georgia, serif" fontSize="35" fill="var(--ink)" textAnchor="middle">
          <text x="72" y="48">{example.factor}</text><text x="115" y="48">×</text><text x="149" y="48">(</text>
          <text x="190" y="48" fill={step >= 1 ? firstColor : "var(--ink)"}>{example.first}</text>
          <text x="248" y="48" fill={step >= 2 && mode === 2 ? secondColor : "var(--ink)"}>{example.sign}</text>
          <text x="305" y="48" fill={step >= 2 ? secondColor : "var(--ink)"}>{example.second}</text><text x="347" y="48">)</text>
          <text x="448" y="48">{example.tail}</text>
        </g>
        {step >= 1 && <g><path d="M72 65 C72 113 190 113 190 65" fill="none" stroke={firstColor} strokeWidth="3" markerEnd={`url(#${id}-first)`} /><text x="126" y="114" textAnchor="middle" fontSize="14" fill={firstColor}>1º termo</text></g>}
        {step >= 2 && <g><path d="M72 65 C72 157 305 157 305 65" fill="none" stroke={secondColor} strokeWidth="3" markerEnd={`url(#${id}-second)`} /><text x="224" y="155" textAnchor="middle" fontSize="14" fill={secondColor}>2º termo{mode === 2 ? " (−3)" : ""}</text></g>}
      </svg>
      <div className="grid gap-2 sm:grid-cols-2">
        {example.products.map((product, index) => <p key={index} className={`rounded-lg border p-3 text-sm ${step > index ? index === 0 ? "border-terracotta/40 text-terracotta-ink" : "border-sage/40 text-sage-ink" : "border-border text-ink-subtle"}`}>{step > index ? product : `${index + 1}º produto · avance para revelar`}</p>)}
      </div>
      {step >= 3 && <div className="mt-4 max-w-full overflow-x-auto"><p className="text-xs font-semibold text-ink-muted">Parêntese aberto</p><MathFormula latex={example.expanded} text={example.reading} display /></div>}
      {step >= 4 && <div className="mt-3 max-w-full overflow-x-auto border-t border-border pt-3"><p className="text-xs font-semibold text-ink-muted">Resultado simplificado</p><MathFormula latex={example.result} text={example.resultReading} display /><p className="mt-3 text-sm text-ink-muted">{example.conclusion}</p><details className="mt-3"><summary className="cursor-pointer text-sm font-semibold">Conferir por outro caminho</summary><div className="overflow-x-auto"><MathFormula latex={example.check} text={example.checkReading} display /></div></details></div>}
    </div>
    <div className="mt-4" aria-live="polite" aria-atomic="true"><p className="text-xs font-semibold text-ink-subtle">Passo {step + 1} de {steps.length}</p><p className="mt-1 font-semibold">{steps[step][0]}</p><p className="mt-1 text-sm text-ink-muted">{steps[step][1]}</p></div>
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" disabled={step === 0} onClick={() => setStep(value => value - 1)} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold disabled:opacity-40">← Voltar</button>
      <button type="button" disabled={step === steps.length - 1} onClick={() => setStep(value => value + 1)} className="rounded-lg bg-terracotta px-4 py-2 text-sm font-semibold text-bg disabled:opacity-40">Próximo passo →</button>
      <button type="button" onClick={() => setStep(0)} className="rounded-lg px-4 py-2 text-sm text-ink-muted underline">Recomeçar</button>
    </div>
  </section>;
}
