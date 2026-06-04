"use client";

import { useCallback, useEffect, useState } from "react";
import { RichText } from "@/components/aulas/RichText";
import { Button } from "@/components/ui/Button";
import type { GlossarioEntry } from "@/data/glossario";

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ModuleFlashcards({ cards }: { cards: GlossarioEntry[] }) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const start = useCallback(
    (shuffle: boolean) => {
      setOrder(
        shuffle
          ? shuffled(cards.length)
          : Array.from({ length: cards.length }, (_, i) => i),
      );
      setPos(0);
      setFlipped(false);
      setOpen(true);
    },
    [cards.length],
  );

  const next = useCallback(() => {
    setFlipped(false);
    setPos((p) => (p + 1) % cards.length);
  }, [cards.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setPos((p) => (p - 1 + cards.length) % cards.length);
  }, [cards.length]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (cards.length === 0) return null;

  const card = open ? cards[order[pos]] : null;

  return (
    <>
      <button
        type="button"
        onClick={() => start(false)}
        className="flex w-full items-center justify-between gap-3 rounded-2 border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-terracotta hover:bg-terracotta-soft/30"
      >
        <span>
          <span className="font-serif text-lg font-medium text-ink">
            🎴 Revisar conceitos
          </span>
          <span className="mt-0.5 block text-xs text-ink-muted">
            {cards.length} flashcards dos termos deste módulo
          </span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-terracotta">
          Começar →
        </span>
      </button>

      {open && card && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Flashcards do módulo"
        >
          <div
            className="w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between text-[12px] text-ink-on-dark/80">
              <span>
                Cartão {pos + 1} de {cards.length}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-2 py-0.5 hover:bg-white/10"
                aria-label="Fechar flashcards"
              >
                ✕ Fechar
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="grid min-h-[260px] w-full place-items-center rounded-3 border border-border bg-surface p-7 text-center shadow-lg"
            >
              {!flipped ? (
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                    Termo
                  </p>
                  <p className="mt-3 font-serif text-3xl font-medium text-ink">
                    {card.termo}
                  </p>
                  <p className="mt-5 text-xs text-ink-subtle">
                    Toque para ver a definição
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                    Definição
                  </p>
                  <RichText
                    as="p"
                    className="mt-3 text-[15px] leading-relaxed text-ink"
                  >
                    {card.definicao}
                  </RichText>
                  {card.exemplo && (
                    <RichText
                      as="p"
                      className="mt-3 text-sm text-ink-muted"
                    >
                      {`Ex.: ${card.exemplo}`}
                    </RichText>
                  )}
                </div>
              )}
            </button>

            <div className="mt-3 flex items-center justify-between gap-2">
              <Button variant="soft" size="sm" onClick={prev}>
                ← Anterior
              </Button>
              <Button
                variant="soft"
                size="sm"
                onClick={() => start(true)}
              >
                🔀 Embaralhar
              </Button>
              <Button variant="primary" size="sm" onClick={next}>
                Próximo →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
