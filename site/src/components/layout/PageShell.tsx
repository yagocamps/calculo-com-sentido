"use client";

import { useState, useEffect } from "react";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { cn } from "@/lib/utils";
import { syncDerivedFields } from "@/lib/progress";

export function PageShell({
  crumbs,
  right,
  headerContext,
  children,
  className,
  focusAvailable = false,
}: {
  crumbs: string[];
  right?: React.ReactNode;
  headerContext?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  focusAvailable?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  // Sync progress derived fields on mount
  useEffect(() => {
    syncDerivedFields();
  }, []);

  return (
    <div className={cn("flex h-screen overflow-hidden bg-bg text-ink print:block print:h-auto print:overflow-visible", focused && "study-focus")}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-3 focus:text-ink focus:ring-2 focus:ring-terracotta">
        Pular para o conteúdo
      </a>
      <CommandPalette />
      
      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={cn("contents", focused && "md:hidden")}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden print:block print:overflow-visible">
        <Topbar
          crumbs={crumbs}
          context={focused ? null : headerContext}
          right={<>{focusAvailable && <button type="button" aria-pressed={focused}
            onClick={() => setFocused(value => !value)}
            className="hidden shrink-0 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-soft md:inline-flex">
            {focused ? "Sair do modo foco" : "Modo foco"}
          </button>}{right}</>}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "flex-1 overflow-x-clip overflow-y-auto px-4 pb-9 pt-7 md:px-9 print:overflow-visible",
            className,
          )}
        >
          <div className="ccs-fade-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
