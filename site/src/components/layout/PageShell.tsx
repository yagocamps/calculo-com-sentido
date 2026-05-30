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
  children,
  className,
}: {
  crumbs: string[];
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync progress derived fields on mount
  useEffect(() => {
    syncDerivedFields();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-ink">
      <a href="#main-content" className="sr-only">
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

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar
          crumbs={crumbs}
          right={right}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main
          id="main-content"
          className={cn(
            "flex-1 overflow-y-auto px-4 pb-9 pt-7 md:px-9",
            className,
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
