"use client";

import { useEffect, useRef } from "react";

export type GraphSpec = {
  /** Expressão no formato do function-plot, ex.: "2.4 * x + 6". */
  fn: string;
  /** Descrição acessível obrigatória (Plano Mestre, Seção 41). */
  alt: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  legend?: string;
};

export function FunctionPlot({
  fn,
  alt,
  xDomain = [-10, 10],
  yDomain,
  legend,
}: GraphSpec) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { default: functionPlot } = await import("function-plot");
      const el = containerRef.current;
      if (!el || disposed) return;

      let lastWidth = 0;

      const render = () => {
        // clientWidth inclui o padding; descontamos padding (e borda, que o
        // clientWidth não inclui) para o SVG caber DENTRO do container. Sem
        // isso o SVG transborda, infla a coluna do grid e o ResizeObserver
        // realimenta o crescimento "ao infinito".
        const style = getComputedStyle(el);
        const padX =
          parseFloat(style.paddingLeft || "0") +
          parseFloat(style.paddingRight || "0");
        const width = Math.max(200, Math.floor((el.clientWidth || 600) - padX));
        const height = Math.min(340, Math.max(220, Math.round(width * 0.55)));
        lastWidth = width;
        el.innerHTML = "";
        const color =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--terracotta")
            .trim() || "#c2553d";
        try {
          functionPlot({
            target: el,
            width,
            height,
            grid: true,
            xAxis: { domain: xDomain, label: "x" },
            yAxis: yDomain ? { domain: yDomain, label: "y" } : { label: "y" },
            data: [{ fn, color, graphType: "polyline" }],
          });
        } catch {
          if (el) el.innerHTML = "";
        }
      };

      render();

      // Só re-renderiza quando a largura disponível realmente mudar (> 1px).
      // Evita o laço do ResizeObserver disparado pela própria injeção do SVG.
      const ro = new ResizeObserver(() => {
        const style = getComputedStyle(el);
        const padX =
          parseFloat(style.paddingLeft || "0") +
          parseFloat(style.paddingRight || "0");
        const width = Math.max(200, Math.floor((el.clientWidth || 600) - padX));
        if (Math.abs(width - lastWidth) > 1) render();
      });
      ro.observe(el);
      const mo = new MutationObserver(() => render());
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      cleanup = () => {
        ro.disconnect();
        mo.disconnect();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [fn, xDomain, yDomain]);

  return (
    <figure className="my-4">
      <div
        ref={containerRef}
        role="img"
        aria-label={alt}
        className="ccs-plot overflow-hidden rounded-2 border border-border bg-surface p-2"
      />
      <figcaption className="mt-2 text-xs text-ink-subtle">
        {legend ?? alt}
      </figcaption>
    </figure>
  );
}
