import assert from "node:assert/strict";
import test from "node:test";
import katex from "katex";
import { alignCalculationChains, prepareForKatex, ariaFromLatex } from "../src/lib/katex-format";

test("calculation chains keep the initial expression on its own row without changing mathematics", () => {
  const input = String.raw`\begin{aligned} 2(x+3)+4x-5 &= 2x+6+4x-5 \\ &= (2x+4x)+(6-5) \\ &= 6x+1 \end{aligned}`;
  const result = alignCalculationChains(input);
  assert.match(result, /& 2\(x\+3\)\+4x-5 \\\\ & =/);
  const withoutRowPauses = (value: string) => ariaFromLatex(value).replace(/;/g, "").replace(/\s+/g, " ");
  assert.equal(withoutRowPauses(result), withoutRowPauses(input));
  assert.equal(alignCalculationChains(result), result);
  assert.doesNotThrow(() => katex.renderToString(prepareForKatex(result), { throwOnError: true }));
});

test("systems, changing left sides, nested arrays and explicit spacing are preserved", () => {
  for (const input of [
    String.raw`\begin{aligned} x+y &= 4 \\ x-y &= 2 \end{aligned}`,
    String.raw`\begin{aligned} x^2 &= 4 \\ x &= 2 \end{aligned}`,
    String.raw`\begin{aligned} x &= \begin{cases} 1 & x>0 \\ 0 & x<0 \end{cases} \\ &= y \end{aligned}`,
  ]) assert.equal(alignCalculationChains(input), input);
  const spaced = String.raw`\begin{aligned} x &= 2+3 \\[10pt] &= 5 \end{aligned}`;
  assert.ok(prepareForKatex(spaced).includes(String.raw`\\[10pt]`));
});
