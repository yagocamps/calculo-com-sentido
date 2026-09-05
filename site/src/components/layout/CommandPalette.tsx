"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchItems, type SearchItem } from "@/lib/search";
import { cn } from "@/lib/utils";

const searchTypeMeta: Record<SearchItem["type"], { label: string; className: string }> = {
  aula: { label: "Aula", className: "bg-sage-soft text-sage-ink" },
  modulo: { label: "Módulo", className: "bg-terracotta-soft text-terracotta" },
  exercicio: { label: "Exercício", className: "bg-amber-soft text-amber-ink" },
  glossario: { label: "Termo", className: "bg-sky-soft text-sky-ink" },
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<SearchItem[]>(() => searchItems(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (item: SearchItem) => {
      close();
      router.push(item.href);
    },
    [close, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ccs-open-search", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ccs-open-search", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reseta seleção ao abrir o modal
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reseta seleção quando a busca muda
    setActive(0);
  }, [query]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      const dialog = e.currentTarget;
      const focusables = Array.from(
        dialog.querySelectorAll(
          'input, button, select, textarea, a, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar aulas e termos"
        onKeyDown={handleKeyDown}
        className="w-full max-w-[560px] overflow-hidden rounded-3 border border-border bg-surface shadow-lg"
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink-subtle"
            aria-hidden
          >
            <path d="M21 21l-4.3-4.3M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Buscar aulas, módulos, exercícios, termos…"
            aria-label="Buscar aulas, módulos, exercícios e termos"
            aria-controls="ccs-search-results"
            className="h-12 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
          />
          <kbd className="rounded-md border border-border-soft bg-surface-warm px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
            Esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          id="ccs-search-results"
          role="listbox"
          aria-label="Resultados"
          className="max-h-[50vh] overflow-y-auto py-1.5"
        >
          {query.trim() === "" ? (
            <li className="px-4 py-6 text-center text-sm text-ink-subtle">
              Digite para buscar entre aulas, módulos, exercícios e termos do glossário.
            </li>
          ) : results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-ink-subtle">
              Nenhum resultado para “{query}”.
            </li>
          ) : (
            results.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left",
                    i === active ? "bg-terracotta-soft" : "hover:bg-surface-soft",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">
                      {item.title}
                    </span>
                    <span className="block truncate text-xs text-ink-muted">
                      {item.subtitle}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      searchTypeMeta[item.type].className,
                    )}
                  >
                    {searchTypeMeta[item.type].label}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
