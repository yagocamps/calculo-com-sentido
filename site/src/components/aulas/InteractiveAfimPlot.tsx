"use client";

import { useId, useState } from "react";
import { FunctionPlot } from "@/components/aulas/FunctionPlot";

function fmt(n: number): string {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

/**
 * Gráfico de função afim com sliders para `a` e `b`. Para quem não "enxerga"
 * abstração, manipular é o caminho: arrasta o coeficiente e vê a reta mudar
 * em tempo real.
 */
export function InteractiveAfimPlot({
  initialA,
  initialB,
  xDomain,
  yDomain,
}: {
  initialA: number;
  initialB: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
}) {
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  const idA = useId();
  const idB = useId();

  return (
    <div className="my-4 rounded-2 border border-border bg-surface-soft/60 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
        Experimente: arraste e veja a reta mudar
      </p>
      <p
        className="mt-2 font-mono text-[15px]"
        aria-live="polite"
        aria-atomic="true"
      >
        f(x) = <b className="text-terracotta">{fmt(a)}</b>·x +{" "}
        <b className="text-sage-ink">{fmt(b)}</b>
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={idA}
            className="flex justify-between text-[12.5px] font-semibold text-ink-muted"
          >
            <span>
              a (taxa) = <b className="text-terracotta">{fmt(a)}</b>
            </span>
            <span className="font-normal text-ink-subtle">
              inclinação da reta
            </span>
          </label>
          <input
            id={idA}
            type="range"
            min={-5}
            max={5}
            step={0.1}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--terracotta)]"
          />
        </div>
        <div>
          <label
            htmlFor={idB}
            className="flex justify-between text-[12.5px] font-semibold text-ink-muted"
          >
            <span>
              b (parte fixa) = <b className="text-sage-ink">{fmt(b)}</b>
            </span>
            <span className="font-normal text-ink-subtle">
              onde corta o eixo y
            </span>
          </label>
          <input
            id={idB}
            type="range"
            min={-10}
            max={20}
            step={0.5}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--sage)]"
          />
        </div>
      </div>

      <FunctionPlot
        fn={`${a} * x + ${b}`}
        alt={`Reta de f(x) = ${fmt(a)} vezes x, mais ${fmt(b)}: corta o eixo y em ${fmt(b)} e ${
          a >= 0 ? "sobe" : "desce"
        } ${fmt(Math.abs(a))} a cada unidade de x.`}
        xDomain={xDomain}
        yDomain={yDomain}
        legend="Aumente a e veja a reta inclinar; mude b e veja ela subir ou descer inteira."
      />
    </div>
  );
}
