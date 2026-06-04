"use client";

import { useEffect, useState } from "react";
import { sectionLinks } from "@/components/aulas/toc-sections";
import { GlossaryTermChip } from "@/components/glossario/GlossaryTermChip";
import type { AulaContent } from "@/data/aulas/types";
import { glossario } from "@/data/glossario";
import { slugify } from "@/lib/utils";

const glossarioByTerm = new Map(glossario.map((g) => [g.termo, g]));

export function AulaToc({ content }: { content: AulaContent }) {
  const links = content.meta.nextLesson
    ? sectionLinks
    : sectionLinks.filter((item) => item.id !== "proxima");

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
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
  }, [links]);

  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-6 text-[13px]">
        <p className="mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          Nesta aula
        </p>
        <ul>
          {links.map((item, i) => {
            const isActive = activeId ? activeId === item.id : i === 0;
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
                  <span className="mr-2 font-mono text-[11px] text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
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
