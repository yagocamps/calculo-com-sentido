"use client";

import { useEffect, useState } from "react";
import { visibleSectionLinks } from "@/components/aulas/toc-sections";

/**
 * Barra de leitura da aula.
 *
 * A aula tem cerca de seis telas de rolagem. No desktop a TOC lateral já diz
 * onde o aluno está, então aqui basta o fio de progresso. No mobile a TOC vive
 * dentro de um acordeão fechado, e sem esta faixa não sobra nenhuma pista de
 * posição: por isso ela também mostra o número e o nome da etapa atual.
 */
export function ReadingProgress({
  hasSimulation = false,
  hasVideos = false,
  hasNext,
}: {
  hasSimulation?: boolean;
  hasVideos?: boolean;
  hasNext: boolean;
}) {
  const links = visibleSectionLinks({ hasSimulation, hasVideos, hasNext });
  const [percent, setPercent] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const scroller = document.getElementById("main-content");
    if (!scroller) return;

    const sections = links
      .map((link) => document.getElementById(link.id))
      .map((el, i) => (el ? { el, i } : null))
      .filter((x): x is { el: HTMLElement; i: number } => x !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = scroller.scrollHeight - scroller.clientHeight;
      const atEnd = travel - scroller.scrollTop <= 2;
      setPercent(travel <= 0 ? 0 : (scroller.scrollTop / travel) * 100);

      // Etapa atual: a última cujo topo já passou do terço superior da tela.
      // No fim da rolagem essa conta trava, porque as últimas etapas cabem
      // todas abaixo da linha de corte; ali vale a última da lista.
      const limit = scroller.getBoundingClientRect().top + scroller.clientHeight * 0.3;
      let active = 0;
      for (const { el, i } of sections) {
        if (el.getBoundingClientRect().top <= limit) active = i;
      }
      setCurrent(atEnd && sections.length > 0 ? sections[sections.length - 1].i : active);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // `links` é derivado de props estáveis; recriar o observador a cada render
    // religaria o listener sem necessidade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links.length]);

  const step = links[current];

  return (
    <div className="sticky top-0 z-20 -mx-4 mb-4 bg-bg px-4 pb-1.5 md:-mx-9 md:px-9 lg:mx-0 lg:px-0 print:hidden">
      <div className="flex items-center gap-2 pb-1.5 pt-2 lg:hidden">
        <span className="font-mono text-[11px] font-bold text-terracotta">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="truncate text-[12px] font-semibold text-ink-muted">
          {step?.label}
        </span>
        <span className="ml-auto shrink-0 font-mono text-[11px] text-ink-subtle">
          {Math.round(percent)}%
        </span>
      </div>
      <div
        className="h-[3px] w-full overflow-hidden rounded-full bg-border-soft lg:mt-0"
        role="progressbar"
        aria-label="Progresso de leitura da aula"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
      >
        <div
          className="h-full rounded-full bg-terracotta transition-[width] duration-150"
          style={{ width: `${percent}%` }}
        />
      </div>
      {/*
        O conteúdo passa por baixo da faixa. Sem este degradê ele é cortado
        no meio da letra e parece falha de renderização; com ele, dissolve.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-full h-3 bg-gradient-to-b from-bg to-transparent"
      />
    </div>
  );
}
