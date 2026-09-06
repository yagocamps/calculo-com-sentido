/** Conservative answer checking: unsupported equivalences require self-assessment. */
export type CheckResult = "correct" | "incorrect" | "manual";

export type AnswerCheckOptions = {
  /** Absolute error in the answer's units. Omit for exact numeric comparison. */
  absoluteTolerance?: number;
};

/** Remove presentation only. Never discard functions, constants, units or case. */
export function normalizeAnswer(value: string): string {
  let text = value.normalize("NFC").trim();
  if ((text.startsWith("\\(") && text.endsWith("\\)")) ||
      (text.startsWith("\\[") && text.endsWith("\\]"))) {
    text = text.slice(2, -2).trim();
  }
  return text
    .replace(/−/g, "-")
    .replace(/\\(?:left|right)(?=[()\[\]{}|])/g, "")
    .replace(/\\dfrac\b/g, "\\frac")
    .replace(/\\pi\b/g, "π")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*([+*/=^(),{}])\s*/g, "$1")
    .trim();
}

type Rational = { numerator: bigint; denominator: bigint };

function enclosed(text: string, open: string, close: string): boolean {
  if (!text.startsWith(open) || !text.endsWith(close)) return false;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === open) depth++;
    if (text[i] === close) depth--;
    if (depth < 0 || (depth === 0 && i < text.length - 1)) return false;
  }
  return depth === 0;
}

/** Only decimals and fractions, including nested LaTeX fractions; no eval. */
function rational(text: string, depth = 0): Rational | null {
  if (depth > 12 || text.length > 200) return null;
  text = text.trim();
  if (enclosed(text, "(", ")") || enclosed(text, "{", "}")) {
    return rational(text.slice(1, -1), depth + 1);
  }
  if (text.startsWith("-") || text.startsWith("+")) {
    const result = rational(text.slice(1), depth + 1);
    return result && { ...result, numerator: text[0] === "-" ? -result.numerator : result.numerator };
  }
  // A decimal point always means decimal, never a thousands separator.
  const decimal = text.match(/^(\d+)(?:[.,](\d+))?$|^[.,](\d+)$/);
  if (decimal) {
    const whole = decimal[1] ?? "0";
    const fraction = decimal[2] ?? decimal[3] ?? "";
    return { numerator: BigInt(whole + fraction), denominator: BigInt(10) ** BigInt(fraction.length) };
  }
  if (text.startsWith("\\frac")) {
    const parts = text.slice(5).trim();
    let nesting = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "{") nesting++;
      if (parts[i] === "}") nesting--;
      if (nesting < 0) return null;
      if (nesting === 0) {
        const top = parts.slice(0, i + 1);
        const bottom = parts.slice(i + 1).trim();
        if (!enclosed(top, "{", "}") || !enclosed(bottom, "{", "}")) return null;
        return divide(rational(top, depth + 1), rational(bottom, depth + 1));
      }
    }
    return null;
  }
  let nesting = 0;
  let slash = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "(" || text[i] === "{") nesting++;
    if (text[i] === ")" || text[i] === "}") nesting--;
    if (nesting < 0) return null;
    if (text[i] === "/" && nesting === 0) {
      if (slash !== -1) return null;
      slash = i;
    }
  }
  if (nesting !== 0 || slash < 0) return null;
  return divide(rational(text.slice(0, slash), depth + 1), rational(text.slice(slash + 1), depth + 1));
}

function divide(top: Rational | null, bottom: Rational | null): Rational | null {
  if (!top || !bottom || bottom.numerator === BigInt(0)) return null;
  return { numerator: top.numerator * bottom.denominator, denominator: top.denominator * bottom.numerator };
}

export function checkAnswer(attempt: string, answer: string, options: AnswerCheckOptions = {}): CheckResult {
  if (!attempt.trim() || !answer.trim() || attempt.length > 2000 || answer.length > 2000) return "manual";
  const normalizedAttempt = normalizeAnswer(attempt);
  const normalizedAnswer = normalizeAnswer(answer);
  const a = rational(normalizedAttempt);
  const b = rational(normalizedAnswer);
  if (a && b) {
    if (a.numerator * b.denominator === b.numerator * a.denominator) return "correct";
    const tolerance = options.absoluteTolerance;
    if (tolerance !== undefined && Number.isFinite(tolerance) && tolerance > 0) {
      const difference = Math.abs(Number(a.numerator * b.denominator - b.numerator * a.denominator) /
        Number(a.denominator * b.denominator));
      if (difference <= tolerance) return "correct";
    }
    return "incorrect";
  }
  // An unsupported expression is not a numeric answer with its symbols erased.
  // Identical, non-empty text is safe, except malformed numeric expressions.
  if (normalizedAttempt === normalizedAnswer && normalizedAnswer.length > 0 &&
      !/^[\d\s.,+\-/(){}]+$/.test(normalizedAnswer.replace(/\\frac/g, ""))) return "correct";
  return "manual";
}
