"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sectionLinks } from "@/components/aulas/toc-sections";
import { GlossaryTermChip } from "@/components/glossario/GlossaryTermChip";
import type { AulaContent } from "@/data/aulas/types";
import { glossario } from "@/data/glossario";
import { slugify } from "@/lib/utils";

const glossarioByTerm = new Map(glossario.map((g) => [g.termo, g]));

export function AulaToc({ content }: { content: AulaContent }) {
  const pathname = usePathname();
  const links = sectionLinks.filter(
    (item) =>
      (item.id !== "proxima" || content.meta.nextLesson) &&
      (item.id !== "quiz" || content.quiz),
  );

  const [activeId, setActiveId] = useState<string>("");
  // Pequenas vitórias durante a aula: seções já percorridas viram ✓.
  // `maxReached` = índice mais distante já visitado (persistido na sessão).
  const [maxReached, setMaxReached] = useState(0);
  const storageKey = `ccs-aula-secoes:${pathname}`;

  useEffect(() => {
    try {
      const stored = Number(sessionStorage.getItem(storageKey));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restauração do progresso de leitura (sessionStorage), client-only
      if (stored > 0) setMaxReached(stored);
    } catch {
      /* modo privado */
    }
  }, [storageKey]);

  useEffect(() => {
    const indexById = new Map(links.map((l, i) => [l.id as string, i]));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const id = visibleEntries[0].target.id;
          setActiveId(id);
          const idx = indexById.get(id) ?? 0;
          setMaxReached((prev) => {
            const next = Math.max(prev, idx);
            if (next !== prev) {
              try {
                sessionStorage.setItem(storageKey, String(next));
              } catch {
                /* modo privado */
              }
            }
            return next;
          });
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.05,
      }
    );

    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links, storageKey]);

  // Seções anteriores à mais distante alcançada contam como percorridas.
  const doneCount = maxReached;

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-6 text-[13px]">
        <div className="mb-2.5 flex items-baseline justify-between">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            Nesta aula
          </p>
          {doneCount > 0 && (
            <span className="rounded-full bg-sage-soft px-2 py-0.5 text-[10.5px] font-bold text-sage-ink">
              {doneCount} de {links.length} ✓
            </span>
          )}
        </div>
        <ul>
          {links.map((item, i) => {
            const isActive = activeId ? activeId === item.id : i === 0;
            const isDone = i < maxReached;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex border-l-2 py-1 pl-3 transition-colors hover:text-ink ${
                    isActive
                      ? "border-terracotta font-semibold text-ink"
                      : "border-transparent text-ink-muted"
                  }`}
                >
                  <span
                    className={`mr-2 font-mono text-[11px] ${
                      isDone ? "text-sage" : "text-ink-subtle"
                    }`}
                    aria-label={isDone ? "Seção percorrida" : undefined}
                  >
                    {isDone ? "✓" : String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {content.meta.glossaryTerms.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Termos novos
            </p>
            <div className="flex flex-wrap gap-1.5">
              {content.meta.glossaryTerms.map((t) => (
                <GlossaryTermChip
                  key={t}
                  termo={t}
                  href={`/glossario#${slugify(t)}`}
                  entry={glossarioByTerm.get(t)}
                />
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
