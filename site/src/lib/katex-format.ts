/**
 * Dá um respiro vertical nas quebras de linha (`\\`) dentro de ambientes
 * `aligned`. Sem isso, desenvolvimentos com frações (que são "altas") ficam
 * com as linhas espremidas umas nas outras. Adiciona `[6pt]` às quebras que
 * ainda não tenham espaçamento explícito.
 *
 * Aplicado em um único ponto (antes de cada render KaTeX), vale para todos os
 * blocos do site de uma vez.
 */
export function addAlignedRowGap(latex: string): string {
  if (!latex.includes("\\begin{aligned}")) return latex;
  return latex.replace(
    /\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}/g,
    (_full, inner: string) => {
      const spaced = inner.replace(/\\\\(?!\s*\[)/g, "\\\\[6pt]");
      return `\\begin{aligned}${spaced}\\end{aligned}`;
    },
  );
}
