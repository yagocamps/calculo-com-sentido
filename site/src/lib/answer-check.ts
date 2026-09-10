/** Conservative answer checking: unsupported equivalences require self-assessment. */
export type CheckResult = "correct" | "incorrect" | "manual";

export type AnswerCheckOptions = {
  /** Absolute error in the answer's units. Omit for exact numeric comparison. */
  absoluteTolerance?: number;
  /**
   * Unidade que acompanha o gabarito ("km", "m/s", "kWh"). Declarar aqui torna
   * a unidade opcional na resposta do aluno: "9" e "9 km" valem para o gabarito
   * "\\(9\\) km". Sem esta opção a unidade continua obrigatória — escrever outra
   * unidade nunca é aceito, em nenhum dos dois casos.
   */
  unit?: string;
};

/** Remove presentation only. Never discard functions, constants, units or case. */
export function normalizeAnswer(value: string): string {
  let text = value.normalize("NFC").trim();
  if ((text.startsWith("\\(") && text.endsWith("\\)")) ||
      (text.startsWith("\\[") && text.endsWith("\\]"))) {
    text = text.slice(2, -2).trim();
  }
  return text
    // `0{,}5` é a forma que o site usa para o decimal em LaTeX (a chave dá o
    // espaçamento correto à vírgula). Sem esta linha o próprio gabarito do site
    // deixa de ser reconhecido pela comparação numérica.
    .replace(/\{,\}/g, ",")
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

/**
 * Instrução do campo de resposta. Fica junto das regras de conferência para que
 * o que o aluno lê e o que o verificador aceita não saiam de sincronia.
 */
export function answerHint(options?: AnswerCheckOptions): string {
  const parts = ["Use ponto ou vírgula para decimais, sem separador de milhar."];
  const unit = options?.unit?.trim();
  parts.push(
    unit
      ? `Preserve os símbolos; a unidade (${unit}) é opcional.`
      : "Preserve símbolos e unidades.",
  );
  if (options?.absoluteTolerance !== undefined) {
    parts.push(`Tolerância absoluta: ${options.absoluteTolerance}.`);
  }
  return parts.join(" ");
}

/**
 * Retira a unidade declarada quando ela está no fim do texto e colada a um
 * número. Devolve `null` quando não há o que retirar — inclusive quando o texto
 * termina em outra unidade ("2 cm" com `unit: "m"`), para que uma unidade
 * trocada nunca vire acerto.
 */
function withoutUnit(text: string, unit: string): string | null {
  const trimmed = text.trim();
  if (!trimmed.endsWith(unit)) return null;
  const head = trimmed.slice(0, trimmed.length - unit.length).trim();
  // `head` precisa terminar em algo que encerre um número; assim "2 km" com
  // `unit: "m"` não vira "2 k", e "2cm" com `unit: "m"` não vira "2c".
  if (!/[\d)}\]π∞%]$/u.test(head)) return null;
  return head;
}

export function checkAnswer(attempt: string, answer: string, options: AnswerCheckOptions = {}): CheckResult {
  if (!attempt.trim() || !answer.trim() || attempt.length > 2000 || answer.length > 2000) return "manual";
  const unit = options.unit?.trim();
  const attemptText = unit ? withoutUnit(attempt, unit) ?? attempt : attempt;
  const answerText = unit ? withoutUnit(answer, unit) ?? answer : answer;
  const normalizedAttempt = normalizeAnswer(attemptText);
  const normalizedAnswer = normalizeAnswer(answerText);
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
