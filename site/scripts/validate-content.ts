import { funcaoAfimAula } from "@/data/aulas/funcao-afim";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import {
  calculo1LessonId,
  calculo1Modulos,
} from "@/data/calculo-1";
import { exercicios } from "@/data/exercicios";
import { homeProblem } from "@/data/home";
import { lessonId, preCalculoModulos } from "@/data/pre-calculo";

const errors: string[] = [];
const registry = {
  "pre-calculo/funcoes/funcao-afim": funcaoAfimAula,
  ...buildPreCalculoRegistry(),
  ...buildCalculo1Registry(),
};

const catalogLessonIds = [
  ...preCalculoModulos.flatMap((module) =>
    module.lessons
      .filter((lesson) => lesson.available)
      .map((lesson) => lessonId(module.slug, lesson.slug)),
  ),
  ...calculo1Modulos.flatMap((module) =>
    module.lessons
      .filter((lesson) => lesson.available)
      .map((lesson) => calculo1LessonId(module.slug, lesson.slug)),
  ),
];
const catalogSet = new Set(catalogLessonIds);
const registrySet = new Set(Object.keys(registry));

for (const id of catalogSet) {
  if (!registrySet.has(id)) errors.push(`Aula publicada sem conteúdo: ${id}`);
}
for (const id of registrySet) {
  if (!catalogSet.has(id)) errors.push(`Conteúdo sem rota publicada: ${id}`);
}

const exerciseIds = new Set<string>();
for (const exercise of exercicios) {
  if (exerciseIds.has(exercise.id)) {
    errors.push(`ID de exercício duplicado: ${exercise.id}`);
  }
  exerciseIds.add(exercise.id);
}

for (const [lessonPath, content] of Object.entries(registry)) {
  const [, moduleSlug] = lessonPath.split("/");
  if (content.meta.moduleSlug !== moduleSlug) {
    errors.push(
      `Módulo divergente em ${lessonPath}: ${content.meta.moduleSlug}`,
    );
  }
  for (const exerciseId of content.exerciciosAplicados.exerciseIds) {
    if (!exerciseIds.has(exerciseId)) {
      errors.push(`${lessonPath} referencia exercício inexistente: ${exerciseId}`);
    }
  }
  const nextHref = content.meta.nextLesson?.href;
  if (nextHref?.startsWith("/pre-calculo/") || nextHref?.startsWith("/calculo-1/")) {
    const nextId = nextHref.replace(/^\/+|\/+$/g, "");
    if (!catalogSet.has(nextId)) {
      errors.push(`${lessonPath} aponta para próxima aula inexistente: ${nextHref}`);
    }
  }
}

const contentText = JSON.stringify(registry);
const forbiddenClaims = [
  "desce) cada vez mais rápido",
  "seu reflexo no eixo formam",
  "Se grau num > grau den, limite no infinito é",
];
for (const claim of forbiddenClaims) {
  if (contentText.includes(claim)) errors.push(`Trecho matemático obsoleto: ${claim}`);
}
if (JSON.stringify(homeProblem).includes("1 em 3")) {
  errors.push("A Home ainda contém a estatística não referenciada '1 em 3'.");
}

console.log("\n===== RELATÓRIO DE INTEGRIDADE DO CONTEÚDO =====");
console.log(`Aulas publicadas verificadas: ${catalogSet.size}`);
console.log(`Conteúdos registrados: ${registrySet.size}`);
console.log(`Exercícios únicos: ${exerciseIds.size}`);
console.log(`Falhas: ${errors.length}`);
for (const error of errors) console.error(`- ${error}`);
console.log("================================================\n");

process.exitCode = errors.length ? 1 : 0;
