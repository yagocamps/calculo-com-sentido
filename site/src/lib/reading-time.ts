import type { AulaContent } from "@/data/aulas/types";

/**
 * Duração de uma aula estimada a partir do conteúdo real.
 *
 * Antes, cada aula declarava a duração à mão e as aulas geradas em série
 * herdavam o padrão "13 min" — inclusive as de 200 palavras. O número aparece
 * na aula, na lista do módulo e no total da trilha expressa, então um valor
 * inventado faz o aluno planejar a véspera de prova com a conta errada.
 *
 * O cálculo pesa três custos diferentes de leitura:
 * prosa (rápida), fórmula (lenta, mesmo quando curta) e exercício guiado
 * (tentar, conferir, ler a resolução).
 */
const PALAVRAS_POR_MINUTO = 180;
const SEGUNDOS_POR_FORMULA_INLINE = 4;
const SEGUNDOS_POR_FORMULA_DISPLAY = 20;
const MINUTOS_POR_EXERCICIO_GUIADO = 2;
const MINIMO_MINUTOS = 3;

/** Campos que guardam LaTeX cru ou texto que não é lido em sequência. */
const CAMPOS_NAO_LIDOS = new Set([
  "formulaLatex",
  "formulaAria",
  "fn",
  "alt",
  "id",
  "href",
  "answerCheck",
  "exerciseIds",
]);

const MATH = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

type Custo = { palavras: number; inline: number; display: number };

function medir(texto: string, custo: Custo) {
  MATH.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MATH.exec(texto)) !== null) {
    if (m[1] !== undefined) custo.display++;
    else custo.inline++;
  }
  const prosa = texto.replace(MATH, " ");
  custo.palavras += prosa.split(/\s+/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
}

function percorrer(valor: unknown, custo: Custo, chave?: string) {
  if (chave && CAMPOS_NAO_LIDOS.has(chave)) return;
  if (typeof valor === "string") return medir(valor, custo);
  if (Array.isArray(valor)) return valor.forEach((v) => percorrer(v, custo));
  if (valor && typeof valor === "object") {
    for (const [k, v] of Object.entries(valor)) percorrer(v, custo, k);
  }
}

/** Minutos de leitura de uma aula, arredondados para cima. */
export function estimateMinutes(content: AulaContent): number {
  const custo: Custo = { palavras: 0, inline: 0, display: 0 };
  for (const secao of [
    content.porQue,
    content.explicacao,
    content.demonstracao,
    content.ondeAparece,
    content.exemplo,
    content.passos,
    content.interpretacao,
    content.erros,
    content.exerciciosGuiados,
    content.resumo,
  ]) {
    percorrer(secao, custo);
  }

  const minutos =
    custo.palavras / PALAVRAS_POR_MINUTO +
    (custo.inline * SEGUNDOS_POR_FORMULA_INLINE) / 60 +
    (custo.display * SEGUNDOS_POR_FORMULA_DISPLAY) / 60 +
    content.exerciciosGuiados.exercises.length * MINUTOS_POR_EXERCICIO_GUIADO;

  return Math.max(MINIMO_MINUTOS, Math.ceil(minutos));
}

/** Rótulo pronto para a interface ("11 min"). */
export function durationLabel(content: AulaContent): string {
  return `${estimateMinutes(content)} min`;
}

/** Soma de minutos em horas com uma casa ("6,1 h"), no formato pt-BR. */
export function hoursLabel(minutes: number): string {
  return `${(minutes / 60).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} h`;
}
