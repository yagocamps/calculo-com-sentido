import assert from "node:assert/strict";
import { test } from "node:test";
import katex from "katex";
import { ariaFromLatex, prepareForKatex, trigNotationPtBr } from "@/lib/katex-format";

test("as funções trigonométricas saem na grafia usada no Brasil", () => {
  for (const [latex, esperado] of [
    [String.raw`\sin x`, "sen"],
    [String.raw`\sin^2\theta`, "sen"],
    [String.raw`\tan x`, "tg"],
    [String.raw`\cot x`, "cotg"],
    [String.raw`\csc x`, "cossec"],
  ] as [string, string][]) {
    const texto = katex.renderToString(prepareForKatex(latex), { throwOnError: true, output: "html" });
    assert.match(texto, new RegExp(esperado), `${latex} deveria renderizar "${esperado}"`);
  }
});

test("cosseno e secante não mudam, e as versões hiperbólicas ficam intactas", () => {
  assert.equal(trigNotationPtBr(String.raw`\cos x + \sec x`), String.raw`\cos x + \sec x`);
  assert.equal(trigNotationPtBr(String.raw`\sinh x`), String.raw`\sinh x`);
  assert.equal(trigNotationPtBr(String.raw`\tanh x`), String.raw`\tanh x`);
});

test("a leitura em português continua vindo do comando semântico", () => {
  // A troca acontece só no render; o aria-label continua saindo de \sin.
  assert.match(ariaFromLatex(String.raw`\sin x`), /seno de/);
  assert.match(ariaFromLatex(String.raw`\tan x`), /tangente de/);
});

test("o espaçamento de aligned continua sendo aplicado", () => {
  const out = prepareForKatex(String.raw`\begin{aligned} a &= b \\ c &= d \end{aligned}`);
  assert.match(out, /\\\\\[6pt\]/);
});
