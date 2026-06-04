// Verificação leve de resposta de exercício.
//
// Estratégia: tenta comparar numericamente (cobre a maioria dos exercícios de
// cálculo, cuja resposta é um número, fração ou decimal). Se não der para julgar
// automaticamente (expressões, frases, conceitos), devolve "manual" e o aluno
// faz a autoavaliação ("acertei / ainda não"). O ganho pedagógico principal é
// forçar uma tentativa ANTES de revelar a solução.

export type CheckResult = "correct" | "incorrect" | "manual";

function stripLatex(s: string): string {
  return s
    .replace(/\\\(|\\\)|\\\[|\\\]/g, "") // delimitadores \( \) \[ \]
    .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
    .replace(/\\dfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)")
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)")
    .replace(/\\cdot|\\times/g, "*")
    .replace(/\\div/g, "/")
    .replace(/\\left|\\right/g, "")
    .replace(/\\[,;: ]/g, "")
    .replace(/\\[a-zA-Z]+/g, "") // demais comandos (\lim, \to, \pi, ...)
    .replace(/[{}]/g, "");
}

/** Normaliza para uma forma comparável (sem espaços, moeda, unidades, acentos). */
export function normalizeAnswer(s: string): string {
  let t = stripLatex(s).toLowerCase().trim();
  t = t.replace(/r\$\s*/g, ""); // moeda
  // separador de milhar "1.460" -> "1460" (3 dígitos após o ponto, não seguido de dígito)
  t = t.replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2");
  // decimal com vírgula -> ponto
  t = t.replace(/(\d),(\d)/g, "$1.$2");
  t = t.replace(/\s+/g, "");
  // remove unidades e palavras comuns no fim dos tokens
  t = t.replace(
    /(km\/h|m\/s|kwh|kw|°c|°|graus?|km|cm|mm|kg|reais|real|metros?|minutos?|min|horas?|litros?|unidades?|un\.?|peças?|m²|m³|m|h|s|l)\b/g,
    "",
  );
  return t;
}

function toNumber(s: string): number | null {
  const n = normalizeAnswer(s);
  if (/^[+-]?\d+(\.\d+)?$/.test(n)) return parseFloat(n);
  const frac = n.match(/^\(?([+-]?\d+(?:\.\d+)?)\)?\/\(?(\d+(?:\.\d+)?)\)?$/);
  if (frac) {
    const den = parseFloat(frac[2]);
    if (den !== 0) return parseFloat(frac[1]) / den;
  }
  return null;
}

/**
 * Compara a tentativa do aluno com o gabarito.
 * - Ambos numéricos → compara com tolerância de ~1% (perdoa arredondamento).
 * - Strings normalizadas iguais → correto (cobre expressões simples).
 * - Caso contrário → "manual" (autoavaliação).
 */
export function checkAnswer(attempt: string, gabarito: string): CheckResult {
  if (!attempt.trim()) return "manual";

  const a = toNumber(attempt);
  const g = toNumber(gabarito);
  if (a !== null && g !== null) {
    const tol = Math.max(1e-6, Math.abs(g) * 0.01);
    return Math.abs(a - g) <= tol ? "correct" : "incorrect";
  }

  const na = normalizeAnswer(attempt);
  const ng = normalizeAnswer(gabarito);
  if (na.length > 0 && na === ng) return "correct";

  return "manual";
}
