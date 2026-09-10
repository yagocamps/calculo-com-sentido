import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateMinutes } from "@/lib/reading-time";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { preCalculoModulos } from "@/data/pre-calculo";
import { calculo1Modulos } from "@/data/calculo-1";
import { lessonMinutes } from "@/lib/aulas";

const registry = { ...buildPreCalculoRegistry(), ...buildCalculo1Registry() };

test("a duração acompanha o tamanho real da aula", () => {
  const densa = estimateMinutes(registry["calculo-1/limites/propriedades-dos-limites"]);
  const curta = estimateMinutes(registry["pre-calculo/geometria-analitica/distancia-e-ponto-medio"]);
  assert.ok(densa > curta * 3, `aula densa (${densa} min) deveria superar a curta (${curta} min)`);
  // A aula curta declarava "13 min" à mão; o conteúdo não sustenta esse número.
  assert.ok(curta < 13, `aula de ~200 palavras não leva ${curta} min`);
});

test("nenhuma aula fica sem duração plausível", () => {
  for (const [key, content] of Object.entries(registry)) {
    const min = estimateMinutes(content);
    assert.ok(Number.isInteger(min), `${key}: duração precisa ser inteira`);
    assert.ok(min >= 3, `${key}: ${min} min é baixo demais para uma aula`);
    assert.ok(min <= 60, `${key}: ${min} min sugere que a aula deveria ser dividida`);
  }
});

test("exercícios guiados pesam na estimativa", () => {
  const base = registry["pre-calculo/geometria-analitica/circunferencia"];
  const semExercicios = { ...base, exerciciosGuiados: { ...base.exerciciosGuiados, exercises: [] } };
  assert.ok(estimateMinutes(base) > estimateMinutes(semExercicios));
});

test("toda aula do catálogo resolve para a duração do conteúdo", () => {
  for (const [track, modules] of [
    ["pre-calculo", preCalculoModulos],
    ["calculo-1", calculo1Modulos],
  ] as const) {
    for (const m of modules) {
      for (const l of m.lessons) {
        const content = registry[`${track}/${m.slug}/${l.slug}`];
        if (!content) continue;
        assert.equal(
          lessonMinutes(track, m.slug, l),
          estimateMinutes(content),
          `${track}/${m.slug}/${l.slug} deveria usar a duração calculada`,
        );
      }
    }
  }
});
