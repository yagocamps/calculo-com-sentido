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

/** Símbolos que viram uma palavra só, sem argumento. */
const ARIA_SIMBOLOS: Record<string, string> = {
  to: " tende a ",
  rightarrow: " tende a ",
  infty: " infinito ",
  times: " vezes ",
  cdot: " vezes ",
  div: " dividido por ",
  leq: " menor ou igual a ",
  le: " menor ou igual a ",
  geq: " maior ou igual a ",
  ge: " maior ou igual a ",
  neq: " diferente de ",
  ne: " diferente de ",
  pm: " mais ou menos ",
  mp: " menos ou mais ",
  approx: " aproximadamente ",
  equiv: " equivale a ",
  Rightarrow: " então ",
  Leftrightarrow: " então ",
  iff: " então ",
  implies: " então ",
  Delta: " delta ",
  delta: " delta ",
  pi: " pi ",
  theta: " teta ",
  alpha: " alfa ",
  beta: " beta ",
  lambda: " lambda ",
  varepsilon: " épsilon ",
  epsilon: " épsilon ",
  sin: " seno de ",
  cos: " cosseno de ",
  tan: " tangente de ",
  sec: " secante de ",
  csc: " cossecante de ",
  cot: " cotangente de ",
  ln: " logaritmo natural de ",
  exp: " exponencial de ",
  cdots: " e assim por diante ",
  ldots: " e assim por diante ",
  dots: " e assim por diante ",
  quad: " ",
  qquad: " ",
  displaystyle: " ",
  in: " pertence a ",
  cup: " união ",
  cap: " interseção ",
  // `\circ` sozinho é composição de funções: (f ∘ g). O caso de grau
  // (`30^\circ`) é tratado em ariaExpoente, antes de chegar aqui.
  circ: " composta com ",
};

/** Comandos que só embrulham conteúdo: a leitura é o próprio conteúdo. */
const ARIA_TRANSPARENTES = new Set([
  "text",
  "textbf",
  "textit",
  "mathrm",
  "mathbf",
  "mathit",
  "operatorname",
  "mbox",
]);

/** Lê o grupo `{...}` que começa no índice da chave de abertura, respeitando
 * aninhamento. É isto que a versão antiga em regex não fazia — e por isso
 * frações com `\sqrt{}` ou `\text{}` dentro perdiam o "sobre". */
function ariaGrupo(s: string, i: number): { corpo: string; fim: number } {
  if (s[i] !== "{") {
    // Argumento de um caractere só: \frac12, x^2, a_n
    return { corpo: s[i] ?? "", fim: i + 1 };
  }
  let nivel = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === "{") nivel++;
    else if (s[j] === "}") {
      nivel--;
      if (nivel === 0) return { corpo: s.slice(i + 1, j), fim: j + 1 };
    }
  }
  return { corpo: s.slice(i + 1), fim: s.length };
}

/** Lê um argumento opcional `[...]`, se houver, a partir de `i`. */
function ariaOpcional(s: string, i: number): { corpo: string | null; fim: number } {
  if (s[i] !== "[") return { corpo: null, fim: i };
  const fecha = s.indexOf("]", i);
  if (fecha < 0) return { corpo: null, fim: i };
  return { corpo: s.slice(i + 1, fecha), fim: fecha + 1 };
}

/** Pula espaços em branco. */
function ariaEspacos(s: string, i: number): number {
  while (i < s.length && /\s/.test(s[i])) i++;
  return i;
}

/** Lê a potência depois de `^` e devolve a leitura em pt-BR. */
function ariaExpoente(s: string, i: number): { texto: string; fim: number } {
  i = ariaEspacos(s, i);
  // 30^\circ → "30 graus"
  if (s.slice(i).startsWith("\\circ")) return { texto: " graus ", fim: i + 5 };
  const { corpo, fim } = ariaGrupo(s, i);
  const limpo = corpo.trim();
  if (limpo === "2") return { texto: " ao quadrado ", fim };
  if (limpo === "3") return { texto: " ao cubo ", fim };
  if (limpo === "\\circ") return { texto: " graus ", fim };
  return { texto: ` elevado a ${ariaFromLatex(corpo)} `, fim };
}

/** Converte um trecho de LaTeX numa leitura textual em pt-BR.
 *
 * Percorre a expressão caractere a caractere (em vez de encadear regex), para
 * que `\frac`, `\sqrt` e `\text` funcionem mesmo aninhados uns nos outros.
 * Esta leitura vai para o `aria-label` dos leitores de tela E para o balão
 * "Lê-se" que o aluno vê — uma leitura errada aqui ensina notação errada. */
export function ariaFromLatex(latex: string): string {
  let out = "";
  let i = 0;

  while (i < latex.length) {
    const c = latex[i];

    if (c === "\\") {
      // \\ separa linhas de um desenvolvimento
      if (latex[i + 1] === "\\") {
        out += "; ";
        i += 2;
        continue;
      }
      // \% \, \; \! e espaço escapado
      const escapado = /^\\([%,;!&_ ])/.exec(latex.slice(i));
      if (escapado) {
        out += escapado[1] === "%" ? " por cento " : " ";
        i += 2;
        continue;
      }
      const nome = /^\\([a-zA-Z]+)/.exec(latex.slice(i));
      if (!nome) {
        i += 1;
        continue;
      }
      const cmd = nome[1];
      let j = i + nome[0].length;

      if (cmd === "frac" || cmd === "dfrac" || cmd === "tfrac") {
        j = ariaEspacos(latex, j);
        const num = ariaGrupo(latex, j);
        const den = ariaGrupo(latex, ariaEspacos(latex, num.fim));
        out += ` (${ariaFromLatex(num.corpo)}) sobre (${ariaFromLatex(den.corpo)}) `;
        i = den.fim;
        continue;
      }

      if (cmd === "sqrt") {
        j = ariaEspacos(latex, j);
        const idx = ariaOpcional(latex, j);
        const rad = ariaGrupo(latex, ariaEspacos(latex, idx.fim));
        const dentro = ariaFromLatex(rad.corpo);
        if (idx.corpo === null) out += ` raiz de ${dentro} `;
        else if (idx.corpo.trim() === "3") out += ` raiz cúbica de ${dentro} `;
        else out += ` raiz de índice ${ariaFromLatex(idx.corpo)} de ${dentro} `;
        i = rad.fim;
        continue;
      }

      if (ARIA_TRANSPARENTES.has(cmd)) {
        j = ariaEspacos(latex, j);
        const g = ariaGrupo(latex, j);
        out += g.corpo;
        i = g.fim;
        continue;
      }

      if (cmd === "lim") {
        j = ariaEspacos(latex, j);
        if (latex[j] === "_") {
          const g = ariaGrupo(latex, j + 1);
          out += ` limite quando ${ariaFromLatex(g.corpo)} de `;
          i = g.fim;
        } else {
          out += " limite de ";
          i = j;
        }
        continue;
      }

      if (cmd === "int" || cmd === "sum" || cmd === "prod") {
        const rotulo =
          cmd === "int" ? "integral" : cmd === "sum" ? "somatório" : "produtório";
        j = ariaEspacos(latex, j);
        let de: string | null = null;
        let ate: string | null = null;
        if (latex[j] === "_") {
          const g = ariaGrupo(latex, j + 1);
          de = ariaFromLatex(g.corpo);
          j = ariaEspacos(latex, g.fim);
        }
        if (latex[j] === "^") {
          const g = ariaGrupo(latex, j + 1);
          ate = ariaFromLatex(g.corpo);
          j = g.fim;
        }
        out += de && ate ? ` ${rotulo} de ${de} até ${ate} de ` : ` ${rotulo} de `;
        i = j;
        continue;
      }

      if (cmd === "log") {
        j = ariaEspacos(latex, j);
        if (latex[j] === "_") {
          const g = ariaGrupo(latex, j + 1);
          out += ` logaritmo na base ${ariaFromLatex(g.corpo)} de `;
          i = g.fim;
        } else {
          out += " logaritmo de ";
          i = j;
        }
        continue;
      }

      if (cmd === "begin" || cmd === "end") {
        j = ariaEspacos(latex, j);
        const g = ariaGrupo(latex, j);
        i = g.fim;
        continue;
      }

      if (cmd === "left" || cmd === "right") {
        // O delimitador em si é lido no próximo passo do laço.
        i = j;
        continue;
      }

      if (ARIA_SIMBOLOS[cmd] !== undefined) {
        out += ARIA_SIMBOLOS[cmd];
        i = j;
        continue;
      }

      // Comando desconhecido: descarta o comando, mantém o que vem depois.
      i = j;
      continue;
    }

    if (c === "{" || c === "}") {
      if (c === "{") {
        const g = ariaGrupo(latex, i);
        out += ariaFromLatex(g.corpo);
        i = g.fim;
      } else {
        i += 1;
      }
      continue;
    }

    if (c === "^") {
      const e = ariaExpoente(latex, i + 1);
      out += e.texto;
      i = e.fim;
      continue;
    }

    if (c === "_") {
      const g = ariaGrupo(latex, ariaEspacos(latex, i + 1));
      out += ` índice ${ariaFromLatex(g.corpo)} `;
      i = g.fim;
      continue;
    }

    if (c === "'") {
      out += " linha ";
      i += 1;
      continue;
    }

    if (c === "=") {
      out += " é igual a ";
      i += 1;
      continue;
    }

    if (c === "&") {
      i += 1;
      continue;
    }

    out += c;
    i += 1;
  }

  return out
    .replace(/\s+/g, " ")
    .replace(/\s+([,;.)])/g, "$1")
    .replace(/\(\s+/g, "(")
    .trim();
}
