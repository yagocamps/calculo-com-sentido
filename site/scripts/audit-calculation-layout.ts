import { writeFileSync } from "node:fs";
import { buildPreCalculoRegistry } from "../src/data/aulas/pre-calculo/register";
import { buildCalculo1Registry } from "../src/data/aulas/calculo-1/register";
import { alignCalculationChains } from "../src/lib/katex-format";

const affected: { lesson: string; field: string; latex: string }[] = [];
let inspected = 0;
function walk(value: unknown, lesson: string, field: string) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/\\begin\{aligned\}[\s\S]*?\\end\{aligned\}/g)) {
      inspected++;
      if (alignCalculationChains(match[0]) !== match[0]) affected.push({ lesson, field, latex: match[0] });
    }
  } else if (Array.isArray(value)) value.forEach((item, i) => walk(item, lesson, `${field}[${i}]`));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, item]) => walk(item, lesson, `${field}.${key}`));
}
Object.entries({ ...buildPreCalculoRegistry(), ...buildCalculo1Registry() }).forEach(([lesson, data]) => walk(data, lesson, "aula"));
const report = { inspected, affectedCount: affected.length, affectedLessons: new Set(affected.map(item => item.lesson)).size, affected };
writeFileSync("calculation-layout-audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ inspected, affectedCount: report.affectedCount, affectedLessons: report.affectedLessons }));
