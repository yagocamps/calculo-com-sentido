"use client";

import { useId, useState } from "react";
import { MathFormula } from "@/components/aulas/Math";
import { FunctionPlot } from "@/components/aulas/FunctionPlot";

function fmt(n: number): string {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function latexNumber(n: number): string {
  return Number.isInteger(n)
    ? String(n)
    : n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function quadraticLatex(a: number, b: number, c: number): string {
  const first = latexNumber(a) + "x^2";
  const middle =
    b === 0 ? "" : " " + (b < 0 ? "-" : "+") + " " + latexNumber(Math.abs(b)) + "x";
  const constant =
    c === 0 ? "" : " " + (c < 0 ? "-" : "+") + " " + latexNumber(Math.abs(c));
  return "f(x) = " + first + middle + constant;
}

function deltaStatus(delta: number): string {
  if (delta > 0) return "duas raízes reais distintas";
  if (delta === 0) return "uma raiz real (raiz dupla)";
  return "nenhuma raiz real";
}

/**
 * Demonstração interativa de uma função quadrática.
 * O estudante altera os coeficientes e observa como a parábola,
 * o discriminante, as raízes e o vértice se relacionam.
 */
export function InteractiveQuadraticPlot({
  initialA,
  initialB,
  initialC,
  xDomain,
  yDomain,
}: {
  initialA: number;
  initialB: number;
  initialC: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
}) {
  const [a, setA] = useState(initialA === 0 ? 1 : initialA);
  const [b, setB] = useState(initialB);
  const [c, setC] = useState(initialC);
  const idA = useId();
  const idB = useId();
  const idC = useId();

  const delta = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  const roots =
    delta >= 0
      ? [
          (-b - Math.sqrt(delta)) / (2 * a),
          (-b + Math.sqrt(delta)) / (2 * a),
        ].sort((left, right) => left - right)
      : [];

  const equationLatex = quadraticLatex(a, b, c);
  const deltaLatex =
    "\\Delta = b^2 - 4ac = " +
    latexNumber(b) +
    "^2 - 4\\cdot(" +
    latexNumber(a) +
    ")\\cdot(" +
    latexNumber(c) +
    ") = " +
    latexNumber(delta);

  return (
    <div className="my-4 rounded-2 border border-border bg-surface-soft/60 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
        Demonstração interativa · mexa nos coeficientes
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
        Altere <b>a</b>, <b>b</b> e <b>c</b> para observar quando a parábola
        cruza o eixo x — e como isso aparece no discriminante.
      </p>

      <div className="mt-3 rounded-xl border border-border bg-surface px-4 py-3">
        <MathFormula
          latex={equationLatex}
          text={
            "função quadrática: f de x igual a " +
            fmt(a) +
            " vezes x ao quadrado, " +
            (b < 0 ? "menos " : "mais ") +
            fmt(Math.abs(b)) +
            " vezes x, " +
            (c < 0 ? "menos " : "mais ") +
            fmt(Math.abs(c))
          }
          className="text-[17px]"
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <div>
          <label
            htmlFor={idA}
            className="flex justify-between gap-3 text-[12.5px] font-semibold text-ink-muted"
          >
            <span>
              a (abertura) = <b className="text-terracotta">{fmt(a)}</b>
            </span>
            <span className="text-right font-normal text-ink-subtle">
              {a > 0 ? "abre para cima" : "abre para baixo"}
            </span>
          </label>
          <input
            id={idA}
            type="range"
            min={-3}
            max={3}
            step={0.5}
            value={a}
            onChange={(event) => {
              const next = Number(event.target.value);
              setA(next === 0 ? 0.5 : next);
            }}
            className="mt-1 w-full accent-[var(--terracotta)]"
          />
        </div>

        <div>
          <label
            htmlFor={idB}
            className="flex justify-between gap-3 text-[12.5px] font-semibold text-ink-muted"
          >
            <span>
              b (inclinação) = <b className="text-sage-ink">{fmt(b)}</b>
            </span>
            <span className="text-right font-normal text-ink-subtle">
              desloca o vértice
            </span>
          </label>
          <input
            id={idB}
            type="range"
            min={-10}
            max={10}
            step={0.5}
            value={b}
            onChange={(event) => setB(Number(event.target.value))}
            className="mt-1 w-full accent-[var(--sage)]"
          />
        </div>

        <div>
          <label
            htmlFor={idC}
            className="flex justify-between gap-3 text-[12.5px] font-semibold text-ink-muted"
          >
            <span>
              c (corte no y) = <b className="text-sky-ink">{fmt(c)}</b>
            </span>
            <span className="text-right font-normal text-ink-subtle">
              sobe ou desce a curva
            </span>
          </label>
          <input
            id={idC}
            type="range"
            min={-10}
            max={10}
            step={0.5}
            value={c}
            onChange={(event) => setC(Number(event.target.value))}
            className="mt-1 w-full accent-[var(--sky)]"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3" aria-live="polite">
        <div className="rounded-xl border border-border bg-surface px-3 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
            Discriminante
          </p>
          <MathFormula
            latex={deltaLatex}
            text={"delta igual a " + fmt(delta)}
            className="mt-1 block text-[15px]"
          />
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            Δ {deltaStatus(delta)}.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface px-3 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
            Raízes reais
          </p>
          {roots.length > 0 ? (
            <MathFormula
              latex={
                "x_1 = " +
                latexNumber(roots[0]) +
                ",\\quad x_2 = " +
                latexNumber(roots[1])
              }
              text={
                "x um igual a " +
                fmt(roots[0]) +
                "; x dois igual a " +
                fmt(roots[1])
              }
              className="mt-1 block text-[15px]"
            />
          ) : (
            <p className="mt-1 text-[15px] font-semibold text-ink">
              Não existem nos reais
            </p>
          )}
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            São os pontos onde f(x) = 0.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface px-3 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-subtle">
            Vértice
          </p>
          <MathFormula
            latex={
              "V = (" +
              latexNumber(vertexX) +
              ",\\ " +
              latexNumber(vertexY) +
              ")"
            }
            text={
              "vértice nas coordenadas " +
              fmt(vertexX) +
              " e " +
              fmt(vertexY)
            }
            className="mt-1 block text-[15px]"
          />
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            O ponto mais alto ou mais baixo da parábola.
          </p>
        </div>
      </div>

      <FunctionPlot
        fn={String(a) + " * x^2 + " + String(b) + " * x + " + String(c)}
        alt={
          "Parábola da função quadrática " +
          fmt(a) +
          " vezes x ao quadrado, mais " +
          fmt(b) +
          " vezes x, mais " +
          fmt(c) +
          ". O discriminante é " +
          fmt(delta) +
          " e há " +
          deltaStatus(delta) +
          "."
        }
        xDomain={xDomain}
        yDomain={yDomain}
        legend="Observe a relação: as raízes são os cruzamentos com o eixo x e o vértice é o ponto de mudança de direção."
      />
    </div>
  );
}
