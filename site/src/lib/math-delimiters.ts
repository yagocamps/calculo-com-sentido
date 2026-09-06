/** Finds malformed RichText math even when no complete pair can be extracted. */
export function mathDelimiterErrors(text: string): string[] {
  const errors: string[] = [];
  let opening: { token: string; index: number } | null = null;
  for (const match of text.matchAll(/\\[()[\]]/g)) {
    const token = match[0];
    const index = match.index;
    if (token === "\\(" || token === "\\[") {
      if (opening) errors.push(`Abertura ${token} aninhada na posição ${index}.`);
      opening = { token, index };
    } else if (!opening) {
      errors.push(`Fechamento ${token} sem abertura na posição ${index}.`);
    } else {
      const expected = opening.token === "\\(" ? "\\)" : "\\]";
      if (token !== expected) errors.push(`Esperado ${expected}, encontrado ${token} na posição ${index}.`);
      if (!text.slice(opening.index + 2, index).trim()) errors.push(`Fórmula vazia na posição ${opening.index}.`);
      opening = null;
    }
  }
  if (opening) errors.push(`Abertura ${opening.token} sem fechamento na posição ${opening.index}.`);
  return errors;
}
