"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AulaContent } from "@/data/aulas/types";
import { slugify } from "@/lib/utils";

const sectionLinks = [
  { id: "porque", label: "Por que aprender" },
  { id: "explicacao", label: "Explicação simples" },
  { id: "onde", label: "Onde aparece" },
  { id: "exemplo", label: "Exemplo aplicado" },
  { id: "passos", label: "Passo a passo" },
  { id: "interpretacao", label: "Interpretação" },
  { id: "erros", label: "Erros comuns" },
  { id: "guiados", label: "Exercícios guiados" },
  { id: "aplicados", label: "Exercícios aplicados" },
  { id: "resumo", label: "Resumo" },
  { id: "proxima", label: "Próxima aula" },
] as const;

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
                <Link
                  key={t}
                  href={`/glossario#${slugify(t)}`}
                  className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11.5px] text-ink-muted hover:border-terracotta hover:text-ink"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
