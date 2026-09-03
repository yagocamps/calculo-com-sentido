"use client";

import { useEffect, useState } from "react";

const SCALES = [1, 1.1, 1.25];
const STORAGE_KEY = "ccs-font-scale";

function applyScale(scale: number) {
  // `zoom` escala tudo (inclusive valores em px, comuns neste código);
  // mexer só no font-size raiz deixaria metade da UI sem acompanhar.
  (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom =
    scale === 1 ? "" : String(scale);
}

/** Controle A−/A+ para quem tem dificuldade de leitura/concentração. */
export function FontSizeControl() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    const i = SCALES.indexOf(stored);
    if (i > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- preferência salva (localStorage), client-only
      setIdx(i);
      applyScale(SCALES[i]);
    }
  }, []);

  const change = (delta: number) => {
    const next = Math.min(SCALES.length - 1, Math.max(0, idx + delta));
    if (next === idx) return;
    setIdx(next);
    applyScale(SCALES[next]);
    try {
      localStorage.setItem(STORAGE_KEY, String(SCALES[next]));
    } catch {
      /* modo privado */
    }
  };

  return (
    <div
      className="hidden sm:inline-flex items-center overflow-hidden rounded-full border border-border bg-surface-warm"
      role="group"
      aria-label="Tamanho do texto"
    >
      <button
        type="button"
        onClick={() => change(-1)}
        disabled={idx === 0}
        aria-label="Diminuir tamanho do texto"
        className="px-2 py-0.5 text-[12px] font-semibold text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink disabled:cursor-default disabled:opacity-40 cursor-pointer"
      >
        A−
      </button>
      <span className="h-3.5 w-px bg-border" aria-hidden />
      <button
        type="button"
        onClick={() => change(1)}
        disabled={idx === SCALES.length - 1}
        aria-label="Aumentar tamanho do texto"
        className="px-2 py-0.5 text-[13px] font-semibold text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink disabled:cursor-default disabled:opacity-40 cursor-pointer"
      >
        A+
      </button>
    </div>
  );
}
