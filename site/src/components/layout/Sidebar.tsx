"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon } from "@/components/layout/icons";
import { calculo1Modulos, calculo1ModuloPath } from "@/data/calculo-1";
import { preCalculoModulos, moduloPath } from "@/data/pre-calculo";
import { navItems, navKeyFromPath } from "@/lib/navigation";
import { SidebarProgressWidget } from "@/components/progresso/SidebarProgressWidget";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  active,
  children,
  sub,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  sub?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 rounded-lg text-sm transition-colors",
        sub
          ? cn(
              "py-1.5 pl-[30px] pr-2.5 text-[13px]",
              active
                ? "bg-terracotta-soft font-semibold text-ink"
                : "font-normal text-ink-muted hover:text-ink",
            )
          : cn(
              "border px-2.5 py-1.5",
              active
                ? "border-border bg-surface font-semibold text-ink shadow-sm"
                : "border-transparent font-medium text-ink-muted hover:text-ink",
            ),
      )}
    >
      {children}
    </Link>
  );
}

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const active = navKeyFromPath(pathname);

  const [isMac, setIsMac] = useState(true);

  // OS detection for keyboard shortcut
  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase();
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (
        platform.includes("win") ||
        userAgent.includes("windows") ||
        platform.includes("linux") ||
        userAgent.includes("linux")
      ) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- detecção de OS via navigator, indisponível no SSR
        setIsMac(false);
      }
    }
  }, []);

  // Close mobile sidebar drawer on navigation
  useEffect(() => {
    onClose?.();
  }, [pathname, onClose]);

  const rendered: React.ReactNode[] = [];
  let lastGroup = "";

  for (const item of navItems) {
    if (item.group && item.group !== lastGroup) {
      lastGroup = item.group;
      rendered.push(
        <div
          key={`group-${item.group}`}
          className="px-2.5 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle"
        >
          {item.group}
        </div>,
      );
    }

    rendered.push(
      <NavLink key={item.key} href={item.href} active={active === item.key}>
        {item.icon && <NavIcon name={item.icon} />}
        {item.dot === "sage" && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
        )}
        {item.dot === "terracotta" && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
        )}
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="shrink-0 rounded-full border border-border bg-surface-warm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">
            {item.badge}
          </span>
        )}
      </NavLink>,
    );

    if (item.key === "pre") {
      for (const mod of preCalculoModulos) {
        const href = moduloPath(mod.slug);
        const isModuloActive = pathname.startsWith(href);
        rendered.push(
          <NavLink key={`pre-${mod.slug}`} href={href} active={isModuloActive} sub>
            {mod.shortTitle}
          </NavLink>,
        );
      }
    }

    if (item.key === "calc") {
      for (const mod of calculo1Modulos) {
        const href = calculo1ModuloPath(mod.slug);
        const isModuloActive = pathname.startsWith(href);
        rendered.push(
          <NavLink key={`calc-${mod.slug}`} href={href} active={isModuloActive} sub>
            {mod.shortTitle}
          </NavLink>,
        );
      }
    }
  }

  return (
    <aside
      className={cn(
        "flex h-full w-[264px] min-w-[264px] flex-col gap-[18px] border-r border-border bg-surface-warm px-4 py-[22px]",
        // Mobile layout: fixed drawer, Desktop: standard sidebar
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:static md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-terracotta font-serif text-lg font-semibold text-bg shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]">
            α
          </div>
          <div>
            <div className="font-serif text-[17px] font-medium leading-none tracking-tight">
              Cálculo com Sentido
            </div>
            <div className="mt-0.5 text-[11px] tracking-wide text-ink-subtle">
              Pré-Cálculo · Cálculo 1
            </div>
          </div>
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-1 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-soft md:hidden"
          >
            <NavIcon name="close" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("ccs-open-search"))}
        aria-label="Buscar aulas e termos"
        className="flex items-center gap-2 rounded-[10px] border border-border bg-surface px-2.5 py-2 text-[13px] text-ink-subtle transition-colors hover:border-terracotta hover:text-ink cursor-pointer"
      >
        <NavIcon name="search" />
        <span className="flex-1 text-left">Buscar aulas, termos…</span>
        <kbd className="rounded-md border border-border-soft bg-surface-warm px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
          {isMac ? "⌘K" : "Ctrl+K"}
        </kbd>
      </button>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto">{rendered}</nav>

      <SidebarProgressWidget />
    </aside>
  );
}
