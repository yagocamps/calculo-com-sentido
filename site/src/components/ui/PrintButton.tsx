"use client";

import { Button } from "@/components/ui/Button";

/** Imprime a página atual (o CSS de impressão esconde o chrome da UI). */
export function PrintButton({ children }: { children?: React.ReactNode }) {
  return (
    <Button
      variant="soft"
      size="sm"
      onClick={() => window.print()}
      className="print:hidden"
    >
      {children ?? "🖨 Imprimir / salvar PDF"}
    </Button>
  );
}
