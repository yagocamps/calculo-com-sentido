import { funcaoAfimAula } from "@/data/aulas/funcao-afim";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { moduleCheckpoints } from "@/data/checkpoints";
import {
  calculo1LessonId,
  calculo1Modulos,
} from "@/data/calculo-1";
import { exercicios } from "@/data/exercicios";
import { exerciciosFase2 } from "@/data/exercicios-fase2";
import { futureUseDefaults } from "@/data/future-uses";
import { homeProblem } from "@/data/home";
import { lessonId, preCalculoModulos } from "@/data/pre-calculo";
import { visualLabsByLesson } from "@/data/visual-labs";
import { getSearchIndex } from "@/lib/search";

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
const moduleSet = new Set([
  ...preCalculoModulos.map((module) => `pre-calculo/${module.slug}`),
  ...calculo1Modulos.map((module) => `calculo-1/${module.slug}`),
]);

function validateLearningHref(source: string, href: string) {
  const path = href.split("?")[0]?.replace(/^\/+|\/+$/g, "") ?? "";
  if (!path.startsWith("pre-calculo/") && !path.startsWith("calculo-1/")) {
    return;
  }
  const segments = path.split("/");
  const exists = segments.length === 2 ? moduleSet.has(path) : catalogSet.has(path);
  if (!exists) errors.push(`${source} aponta para rota inexistente: ${href}`);
}

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
  if (nextHref) validateLearningHref(`${lessonPath} (próxima aula)`, nextHref);
  for (const item of content.meta.usedIn ?? []) {
    validateLearningHref(`${lessonPath} (você usará isto em)`, item.href);
  }
}

for (const [track, modules] of Object.entries(futureUseDefaults)) {
  for (const [moduleSlug, items] of Object.entries(modules)) {
    const source = `${track}/${moduleSlug} (uso futuro padrão)`;
    if (!moduleSet.has(`${track}/${moduleSlug}`)) {
      errors.push(`Uso futuro configurado para módulo inexistente: ${track}/${moduleSlug}`);
    }
    for (const item of items) validateLearningHref(source, item.href);
  }
}

for (const [modulePath, checkpoint] of Object.entries(moduleCheckpoints)) {
  if (!moduleSet.has(modulePath)) {
    errors.push(`Checkpoint configurado para módulo inexistente: ${modulePath}`);
  }
  if (checkpoint.questions.length < 4) {
    errors.push(`Checkpoint com menos de 4 questões: ${modulePath}`);
  }
  for (const [index, question] of checkpoint.questions.entries()) {
    if (question.correctIndex < 0 || question.correctIndex >= question.options.length) {
      errors.push(`Resposta inválida no checkpoint ${modulePath}, questão ${index + 1}`);
    }
    validateLearningHref(
      `${modulePath} (revisão da questão ${index + 1})`,
      question.reviewHref,
    );
  }
}

const phase2LevelsByTopic = new Map<string, Set<number>>();
for (const exercise of exerciciosFase2) {
  const topic = exercise.id.replace(/-\d$/, "");
  const levels = phase2LevelsByTopic.get(topic) ?? new Set<number>();
  if (exercise.pedagogicalLevel) levels.add(exercise.pedagogicalLevel);
  phase2LevelsByTopic.set(topic, levels);
}
for (const [topic, levels] of phase2LevelsByTopic) {
  if ([1, 2, 3, 4, 5].some((level) => !levels.has(level))) {
    errors.push(`${topic} não cobre os cinco níveis pedagógicos`);
  }
}

const requiredVisualKinds = new Set([
  "limit",
  "secant",
  "riemann",
  "unit-circle",
  "transformations",
  "parabola",
  "product-rule",
  "ftc",
]);
for (const [lessonPath, kind] of Object.entries(visualLabsByLesson)) {
  if (!catalogSet.has(lessonPath)) {
    errors.push(`Laboratório visual aponta para aula inexistente: ${lessonPath}`);
  }
  requiredVisualKinds.delete(kind);
}
for (const kind of requiredVisualKinds) {
  errors.push(`Laboratório visual obrigatório ausente: ${kind}`);
}

const searchIndex = getSearchIndex();
const indexedExerciseCount = searchIndex.filter((item) => item.type === "exercicio").length;
const indexedModuleCount = searchIndex.filter((item) => item.type === "modulo").length;
if (indexedExerciseCount !== exercicios.length) {
  errors.push(`Busca indexa ${indexedExerciseCount} de ${exercicios.length} exercícios`);
}
if (indexedModuleCount < 10) {
  errors.push(`Busca indexa poucos módulos: ${indexedModuleCount}`);
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
console.log(`Tópicos-gargalo em cinco níveis: ${phase2LevelsByTopic.size}`);
console.log(`Checkpoints cumulativos: ${Object.keys(moduleCheckpoints).length}`);
console.log(`Laboratórios visuais centrais: ${Object.keys(visualLabsByLesson).length}`);
console.log(`Itens na busca global: ${searchIndex.length} (${indexedExerciseCount} exercícios, ${indexedModuleCount} módulos)`);
console.log(`Falhas: ${errors.length}`);
for (const error of errors) console.error(`- ${error}`);
console.log("================================================\n");

process.exitCode = errors.length ? 1 : 0;
