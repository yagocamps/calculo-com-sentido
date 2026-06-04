/**
 * Validação sintática de TODO o KaTeX do site.
 * Importa os dados reais (glossário, exercícios, resumos, todas as aulas),
 * extrai cada fórmula (\(...\), \[...\] e campos formulaLatex crus) e roda
 * o KaTeX com throwOnError:true + strict:"warn" para capturar erros e avisos.
 */
import katex from "katex";
import { glossario } from "@/data/glossario";
import { exercicios } from "@/data/exercicios";
import { resumos } from "@/data/resumos";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { funcaoAfimAula } from "@/data/aulas/funcao-afim";

type Issue = {
  kind: "erro" | "aviso";
  source: string;
  latex: string;
  mode: string;
  message: string;
};

const issues: Issue[] = [];
let mathCount = 0;

const mathToken = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

type Legib = { source: string; latex: string; reason: string };
const legib: Legib[] = [];

/** Marca fórmulas inline que ficariam mais legíveis em display block. */
function checkLegibility(latex: string, display: boolean, source: string) {
  if (display) return;
  const reasons: string[] = [];
  if (/\\begin\{(aligned|cases|array|b?matrix|p?matrix)\}/.test(latex))
    reasons.push("ambiente multilinha (aligned/cases/matrix) inline");
  if (/\\\\/.test(latex)) reasons.push("quebra de linha (\\\\) dentro de inline");
  if (/\\(sum|int|prod|lim|oint|bigcup|bigcap)\b/.test(latex))
    reasons.push("operador grande (sum/int/lim/prod) inline");
  // frac aninhada: um \frac cujo conteúdo contém outro \frac
  if (/\\frac\{[^{}]*\\frac/.test(latex) || /\\frac\{[^}]*\}\{[^{}]*\\frac/.test(latex))
    reasons.push("fração aninhada");
  if (reasons.length) legib.push({ source, latex, reason: reasons.join("; ") });
}

function checkLatex(latex: string, display: boolean, source: string) {
  mathCount++;
  checkLegibility(latex, display, source);
  const warnings: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.join(" "));
  try {
    katex.renderToString(latex, {
      throwOnError: true,
      displayMode: display,
      strict: "warn",
      output: "htmlAndMathml",
    });
  } catch (e) {
    issues.push({
      kind: "erro",
      source,
      latex,
      mode: display ? "display" : "inline",
      message: (e as Error).message,
    });
  } finally {
    console.warn = origWarn;
  }
  for (const w of warnings) {
    issues.push({
      kind: "aviso",
      source,
      latex,
      mode: display ? "display" : "inline",
      message: w,
    });
  }
}

function walk(value: unknown, source: string, key?: string) {
  if (typeof value === "string") {
    if (key === "formulaLatex") {
      checkLatex(value, true, `${source}`);
      return;
    }
    let m: RegExpExecArray | null;
    mathToken.lastIndex = 0;
    while ((m = mathToken.exec(value)) !== null) {
      if (m[1] !== undefined) checkLatex(m[1], true, source);
      else checkLatex(m[2], false, source);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${source}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, `${source}.${k}`, k);
  }
}

glossario.forEach((g) => walk(g, `glossario:${g.termo}`));
exercicios.forEach((e) => walk(e, `exercicio:${e.id}`));
resumos.forEach((r) => walk(r, `resumo:${r.slug}`));

const registry: Record<string, unknown> = {
  "pre-calculo/funcoes/funcao-afim": funcaoAfimAula,
  ...buildPreCalculoRegistry(),
  ...buildCalculo1Registry(),
};
for (const [k, content] of Object.entries(registry)) walk(content, `aula:${k}`);

const erros = issues.filter((i) => i.kind === "erro");
const avisos = issues.filter((i) => i.kind === "aviso");

console.log(`\n===== RELATÓRIO KaTeX =====`);
console.log(`Fórmulas verificadas: ${mathCount}`);
console.log(`Erros (quebram render): ${erros.length}`);
console.log(`Avisos (strict): ${avisos.length}`);

if (erros.length) {
  console.log(`\n----- ERROS -----`);
  for (const i of erros) {
    console.log(`\n[${i.source}] (${i.mode})`);
    console.log(`  LaTeX: ${i.latex}`);
    console.log(`  Erro : ${i.message}`);
  }
}
if (avisos.length) {
  console.log(`\n----- AVISOS -----`);
  for (const i of avisos) {
    console.log(`\n[${i.source}] (${i.mode})`);
    console.log(`  LaTeX: ${i.latex}`);
    console.log(`  Aviso: ${i.message}`);
  }
}
console.log(`\nLegibilidade (inline pesado → sugerir display): ${legib.length}`);
if (legib.length) {
  console.log(`\n----- LEGIBILIDADE -----`);
  for (const i of legib) {
    console.log(`\n[${i.source}]`);
    console.log(`  Motivo: ${i.reason}`);
    console.log(`  LaTeX : ${i.latex}`);
  }
}
console.log(`\n===========================`);
