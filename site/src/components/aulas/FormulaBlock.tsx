import { MathFormula } from "@/components/aulas/Math";

export function FormulaBlock({
  formula,
  formulaLatex,
  formulaAria,
  legend,
}: {
  formula: string;
  formulaLatex?: string;
  formulaAria?: string;
  legend?: string;
}) {
  const ariaText = formulaAria ?? formula;

  return (
    <div className="my-3 flex flex-wrap items-center gap-4 rounded-2 bg-surface-ink px-5 py-4 font-mono text-base text-ink-on-dark">
      <span className="font-serif text-[13px] italic opacity-50">fórmula</span>
      {formulaLatex ? (
        <MathFormula latex={formulaLatex} text={ariaText} display />
      ) : (
        <span role="math" aria-label={ariaText}>
          {formula}
        </span>
      )}
      {legend && <span className="ml-auto text-xs opacity-60">{legend}</span>}
      {/* Leitura por extenso: quem trava em notação muitas vezes não sabe nem
          verbalizar a fórmula. aria-hidden evita leitura dupla (o aria-label
          do role="math" já cobre leitores de tela). */}
      {formulaAria && (
        <p aria-hidden className="w-full font-sans text-xs italic leading-relaxed opacity-60">
          Lê-se: “{formulaAria}”
        </p>
      )}
    </div>
  );
}
