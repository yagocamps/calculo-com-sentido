/**
 * Validação da leitura acessível de TODAS as fórmulas do site.
 *
 * O texto gerado por `ariaFromLatex` vai para o `aria-label` (leitores de tela)
 * E para o balão "Lê-se" que o aluno vê ao passar o mouse numa fórmula inline.
 * Uma leitura errada aqui ensina notação errada — por isso ela é verificada
 * como o KaTeX é, com o site inteiro passando pelo teste.
 *
 * Rodar: npx tsx scripts/validate-aria.ts
 */
import { ariaFromLatex } from "@/lib/katex-format";
import { glossario } from "@/data/glossario";
import { exercicios } from "@/data/exercicios";
import { resumos } from "@/data/resumos";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { funcaoAfimAula } from "@/data/aulas/funcao-afim";

type Falha = { regra: string; fonte: string; latex: string; leitura: string };

const falhas: Falha[] = [];
const formulas: { fonte: string; latex: string; display: boolean }[] = [];

const token = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

function varrer(valor: unknown, fonte: string) {
  if (typeof valor === "string") {
    let m: RegExpExecArray | null;
    token.lastIndex = 0;
    while ((m = token.exec(valor))) {
      formulas.push({ fonte, latex: m[1] ?? m[2], display: m[1] !== undefined });
    }
  } else if (Array.isArray(valor)) {
    valor.forEach((v, i) => varrer(v, `${fonte}[${i}]`));
  } else if (valor && typeof valor === "object") {
    for (const [k, v] of Object.entries(valor)) varrer(v, `${fonte}.${k}`);
  }
}

varrer(glossario, "glossario");
varrer(exercicios, "exercicio");
varrer(resumos, "resumo");
const registry = {
  "pre-calculo/funcoes/funcao-afim": funcaoAfimAula,
  ...buildPreCalculoRegistry(),
  ...buildCalculo1Registry(),
};
for (const [k, c] of Object.entries(registry)) varrer(c, `aula:${k}`);

// Campos `formulaLatex` são LaTeX cru (sem delimitadores).
for (const [k, c] of Object.entries(registry)) {
  if (c.explicacao.formulaLatex) {
    formulas.push({
      fonte: `aula:${k}.explicacao.formulaLatex`,
      latex: c.explicacao.formulaLatex,
      display: true,
    });
  }
}

for (const f of formulas) {
  const leitura = ariaFromLatex(f.latex);
  const add = (regra: string) =>
    falhas.push({ regra, fonte: f.fonte, latex: f.latex, leitura });

  // A divisão é o que mais muda o sentido: se sumir, a fórmula lida está errada.
  if (/\\[dt]?frac/.test(f.latex) && !/sobre/.test(leitura)) add("fração sem 'sobre'");
  if (/\\sqrt/.test(f.latex) && !/raiz/.test(leitura)) add("raiz sem 'raiz'");
  if (/\\lim/.test(f.latex) && !/limite/.test(leitura)) add("limite sem 'limite'");
  if (/\\int/.test(f.latex) && !/integral/.test(leitura)) add("integral sem 'integral'");
  // Nada de LaTeX cru pode vazar para o que o aluno lê.
  if (/\\/.test(leitura)) add("sobrou '\\' na leitura");
  if (/[{}]/.test(leitura)) add("sobrou chave na leitura");
  if (/\\%|(?<!\d\s?)%/.test(leitura)) add("'%' não virou 'por cento'");
  // `\circ` tem dois sentidos e já trocaram de lugar uma vez: depois de `^`
  // é grau (30°); sozinho é composição de funções (f ∘ g).
  if (/\^\s*\{?\\circ/.test(f.latex) && !/graus/.test(leitura)) add("grau não virou 'graus'");
  if (/(^|[^^{\s])\s*\\circ/.test(f.latex) && /graus/.test(leitura) && !/\^\s*\{?\\circ/.test(f.latex))
    add("composição lida como 'graus'");

  // Conteúdo de \text{...} tem que sobreviver inteiro.
  const textos = [...f.latex.matchAll(/\\text\{([^{}]+)\}/g)].map((m) => m[1].trim());
  for (const t of textos) {
    if (t.length > 2 && !leitura.includes(t)) add(`perdeu o texto "${t}"`);
  }
  if (f.latex.trim() && !leitura.trim()) add("leitura vazia");
}

const inline = formulas.filter((f) => !f.display);
console.log(`\n===== RELATÓRIO LEITURA ACESSÍVEL =====`);
console.log(`Fórmulas verificadas: ${formulas.length} (${inline.length} inline → balão "Lê-se")`);
console.log(`Falhas: ${falhas.length}`);

if (falhas.length) {
  const porRegra = new Map<string, Falha[]>();
  for (const f of falhas) {
    const chave = f.regra.startsWith("perdeu o texto") ? "perdeu texto de \\text{}" : f.regra;
    if (!porRegra.has(chave)) porRegra.set(chave, []);
    porRegra.get(chave)!.push(f);
  }
  for (const [regra, lista] of porRegra) {
    console.log(`\n----- ${regra.toUpperCase()} (${lista.length}) -----`);
    for (const f of lista.slice(0, 10)) {
      console.log(`\n[${f.fonte}]`);
      console.log(`  LaTeX : ${f.latex}`);
      console.log(`  Lê-se : ${f.leitura}`);
    }
    if (lista.length > 10) console.log(`\n  ... e mais ${lista.length - 10}`);
  }
}
console.log(`\n=======================================`);
process.exitCode = falhas.length ? 1 : 0;
