import { writeFileSync } from "node:fs";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { funcaoAfimAula } from "@/data/aulas/funcao-afim";
import { getPlot } from "@/data/plots";
import { visualLabsByLesson } from "@/data/visual-labs";

const registry = { "pre-calculo/funcoes/funcao-afim": funcaoAfimAula, ...buildPreCalculoRegistry(), ...buildCalculo1Registry() };
const lessons = Object.entries(registry).map(([path, content]) => ({
  path, title: content.meta.title, explanation: content.explicacao,
  plotId: content.plot ?? null, plot: content.plot ? getPlot(content.plot) : null,
  visualLab: visualLabsByLesson[path] ?? null,
}));
writeFileSync("../explanation-audit-inventory.json", JSON.stringify(lessons, null, 2));
console.log(JSON.stringify({ lessons: lessons.length, plots: lessons.filter(lesson => lesson.plot).length, labs: lessons.filter(lesson => lesson.visualLab).length }));
