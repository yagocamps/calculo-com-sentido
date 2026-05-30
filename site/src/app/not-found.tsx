import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-ink select-none">
      <div className="max-w-md space-y-6">
        {/* Large stylized 404 */}
        <div className="font-serif text-[110px] md:text-[130px] font-extralight leading-none text-terracotta tracking-tighter">
          404
        </div>
        
        <div className="space-y-3">
          <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">
            Página não encontrada
          </h1>
          <p className="font-mono text-xs md:text-sm text-ink-muted bg-surface-soft py-1 px-3 rounded-full inline-block border border-border/40">
            lim (sentido) → ∞ = ∅
          </p>
          <p className="text-sm leading-relaxed text-ink-muted md:px-4">
            O caminho que você tentou calcular não existe neste módulo ou foi
            deslocado para fora do plano cartesiano.
          </p>
        </div>

        {/* Math backdrop snippet */}
        <div className="rounded-2 border border-border/80 bg-surface-warm p-4 font-mono text-[11px] text-ink-subtle">
          ∫ f(x) dx = “Nada por aqui…”
        </div>

        <div className="pt-3">
          <Button href="/" variant="primary">
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
}
