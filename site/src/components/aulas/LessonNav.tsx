"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdjacentLesson } from "@/lib/lesson-nav";

/**
 * Barra de navegação no rodapé da aula: anterior · voltar ao módulo · próxima.
 * Atalhos de teclado: ← ou K = anterior; → ou J = próxima (ignorados ao digitar).
 */
export function LessonNav({
  prev,
  next,
  backHref,
  backLabel,
}: {
  prev: AdjacentLesson;
  next: AdjacentLesson;
  backHref: string;
  backLabel: string;
}) {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el?.isContentEditable
      ) {
        return;
      }
      if ((e.key === "ArrowRight" || e.key === "j" || e.key === "J") && next) {
        router.push(next.href);
      } else if (
        (e.key === "ArrowLeft" || e.key === "k" || e.key === "K") &&
        prev
      ) {
        router.push(prev.href);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  return (
    <nav
      aria-label="Navegação entre aulas"
      className="mt-8 grid gap-3 border-t border-border-soft pt-6 sm:grid-cols-3 sm:items-center"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-2 border border-border bg-surface px-4 py-3 transition-colors hover:border-terracotta"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
            ← Anterior
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-medium text-ink group-hover:text-terracotta">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      <Link
        href={backHref}
        className="text-center text-sm font-semibold text-terracotta hover:underline"
      >
        {backLabel}
      </Link>

      {next ? (
        <Link
          href={next.href}
          className="group rounded-2 border border-border bg-surface px-4 py-3 text-right transition-colors hover:border-terracotta"
        >
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
            Próxima →
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-medium text-ink group-hover:text-terracotta">
            {next.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
    </nav>
  );
}
