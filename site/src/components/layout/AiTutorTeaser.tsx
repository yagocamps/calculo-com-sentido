"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Tag } from "@/components/ui/Tag";

const CHAVE_DISPENSADO = "ccs:ia-tutora-dispensada";

// Store mínimo em cima do localStorage. useSyncExternalStore evita tanto o
// "piscar" do teaser antes da leitura quanto setState dentro de efeito.
const ouvintes = new Set<() => void>();

function assinarDispensa(aoMudar: () => void) {
  ouvintes.add(aoMudar);
  return () => {
    ouvintes.delete(aoMudar);
  };
}

function lerDispensa() {
  try {
    return window.localStorage.getItem(CHAVE_DISPENSADO) === "1";
  } catch {
    return false;
  }
}

// No servidor o teaser nasce escondido, para não aparecer e sumir na hidratação.
function lerDispensaNoServidor() {
  return true;
}

function marcarDispensado() {
  try {
    window.localStorage.setItem(CHAVE_DISPENSADO, "1");
  } catch {
    // navegador sem storage: some só nesta sessão
  }
  for (const aoMudar of ouvintes) aoMudar();
}

/**
 * Botão flutuante discreto que anuncia a IA Tutora (Roadmap, Seção 23).
 * Ainda não conversa — apenas gera expectativa e mostra que a plataforma
 * está em evolução. Quando a IA existir, este componente vira o launcher.
 *
 * Enquanto ela não chega, o teaser não pode atrapalhar quem está estudando:
 * some abaixo de `md` (no celular ele cobria o texto da aula) e pode ser
 * dispensado de vez, com a escolha guardada no navegador.
 */
export function AiTutorTeaser() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dispensado = useSyncExternalStore(
    assinarDispensa,
    lerDispensa,
    lerDispensaNoServidor,
  );

  const dispensar = () => {
    setOpen(false);
    marcarDispensado();
  };

  // Fecha com Escape ou clique fora — comportamento padrão de popover.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (dispensado) return null;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-40 hidden md:block print:hidden"
    >
      {open && (
        <div
          role="dialog"
          aria-label="IA Tutora — em breve"
          className="absolute bottom-[calc(100%+10px)] right-0 w-[280px] rounded-2 border border-border bg-surface/90 p-4 shadow-lg backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-serif text-[17px] font-medium tracking-tight">
              IA Tutora
            </span>
            <Tag tone="terracotta">Em breve</Tag>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
            Estamos preparando uma tutora que explica passo a passo, no seu
            ritmo, e tira dúvidas de qualquer aula. Enquanto ela não chega,
            explore as trilhas e os resumos rápidos.
          </p>
          <p className="mt-2 text-[11.5px] text-ink-subtle">
            A plataforma está em evolução constante. ✨
          </p>
          <button
            type="button"
            onClick={dispensar}
            className="mt-3 text-[12px] font-semibold text-terracotta hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm cursor-pointer"
          >
            Não mostrar de novo
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="IA Tutora (em breve)"
        title="IA Tutora — em breve"
        className="group flex h-11 items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta hover:shadow-lg cursor-pointer"
      >
        <span aria-hidden className="text-base leading-none">
          ✨
        </span>
        <span className="text-[12.5px] font-semibold text-ink-muted transition-colors group-hover:text-ink">
          IA Tutora
        </span>
        <span className="rounded-full bg-terracotta-soft px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-terracotta-ink">
          Em breve
        </span>
      </button>
    </div>
  );
}
