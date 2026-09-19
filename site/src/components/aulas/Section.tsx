import { RichText } from "@/components/aulas/RichText";
import { cn } from "@/lib/utils";

export function Section({
  n,
  label,
  title,
  titleRich,
  children,
}: {
  n: number;
  label: string;
  title: string;
  titleRich?: boolean;
  children: React.ReactNode;
}) {
  // A etapa 1 abre logo abaixo do cabeçalho da aula (que já termina em
  // caixas); uma régua ali empilharia bordas sem separar nada.
  const isFirst = n === 1;

  return (
    <section
      className={cn(
        // A quebra entre etapas precisa valer ~4x o espaço entre parágrafos
        // (12px); abaixo disso o olho lê como pausa, não como fronteira.
        // O recuo à esquerda abre a calha onde o selo numerado se pendura no
        // desktop, formando uma régua de marcos ao rolar a aula.
        "mt-10 md:mt-12 lg:pl-10",
        // Espaço sozinho não sinaliza quebra. A régua fica mais perto do que
        // abre do que do que fecha, então pertence à etapa que começa.
        !isFirst && "border-t border-border-soft pt-5 md:pt-6",
      )}
    >
      <div className="mb-2.5 flex min-h-[28px] items-center gap-3 font-serif text-[12px] font-semibold uppercase tracking-[0.14em] text-terracotta">
        {/* O selo é o marco da quebra: precisa de presença suficiente para
            não ser o menor elemento da página anunciando a maior fronteira. */}
        <span className="grid h-[28px] w-[28px] shrink-0 place-items-center rounded-lg border border-terracotta/25 bg-terracotta-soft font-mono text-[13px] font-bold text-terracotta-ink lg:-ml-10">
          {String(n).padStart(2, "0")}
        </span>
        {label}
      </div>
      {/* <h2>: as subseções internas da etapa (regras, demonstrações,
          laboratórios) são <h3>, e precisam ficar abaixo deste nível. */}
      <h2 className="mb-3 font-serif text-[26px] font-medium leading-snug tracking-tight text-ink">
        {titleRich ? <RichText as="span">{title}</RichText> : title}
      </h2>
      {children}
    </section>
  );
}
