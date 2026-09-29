"use client";

import { useEffect, useState } from "react";

export function LessonPosition({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = main.getBoundingClientRect().top + 100;
      let current = 0;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = index;
      });
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    main.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (main.firstElementChild) observer.observe(main.firstElementChild);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      main.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);
  if (!sections.length) return null;
  return <p className="hidden truncate text-[11px] text-ink-subtle md:block" title="Posição na leitura, não uma medida de aprendizado">
    Etapa {active + 1} de {sections.length} · {sections[active]?.label}
  </p>;
}
