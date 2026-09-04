import { sectionLinks } from "@/components/aulas/toc-sections";
import type { AulaContent } from "@/data/aulas/types";

/**
 * Índice da aula colapsável, exibido só no mobile (no desktop a TOC fica fixa
 * na coluna lateral). Usa <details> nativo — sem JS, fecha ao tocar num link.
 */
export function AulaTocMobile({ content }: { content: AulaContent }) {
  const links = sectionLinks.filter(
    (item) =>
      (item.id !== "proxima" || content.meta.nextLesson) &&
      (item.id !== "quiz" || content.quiz?.length) &&
      (item.id !== "video" || content.videos?.length),
  );

  return (
    <details className="group mb-6 rounded-2 border border-border bg-surface-soft lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-2.5 text-[13px] font-semibold text-ink">
        <span>Índice da aula</span>
        <span className="text-ink-subtle transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ul className="border-t border-border-soft px-2 pb-2 pt-1 text-[13px]">
        {links.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink-muted hover:bg-surface hover:text-ink"
            >
              <span className="font-mono text-[11px] text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
