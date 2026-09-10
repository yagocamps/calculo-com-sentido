import assert from "node:assert/strict";
import { test } from "node:test";
import { lessonDescription, lessonMetadata } from "@/lib/lesson-seo";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { getSiteUrl } from "@/lib/site";

const registry = { ...buildPreCalculoRegistry(), ...buildCalculo1Registry() };

test("toda aula publicada tem descrição própria e utilizável", () => {
  const vistas = new Set<string>();
  for (const [key, content] of Object.entries(registry)) {
    const d = lessonDescription(content);
    assert.ok(d.length >= 80, `${key}: descrição curta demais (${d.length})`);
    assert.ok(d.length <= 158, `${key}: descrição longa demais (${d.length})`);
    assert.ok(!/\\\(|\\\[|\\frac|\\lim/.test(d), `${key}: LaTeX vazou para a descrição — ${d}`);
    vistas.add(d);
  }
  // Descrições repetidas competiriam entre si na busca.
  const repetidas = Object.keys(registry).length - vistas.size;
  assert.ok(repetidas === 0, `${repetidas} aulas compartilham a mesma descrição`);
});

test("a metadata da aula traz canonical e Open Graph absolutos", () => {
  const key = "calculo-1/derivadas/definicao-derivada";
  const meta = lessonMetadata(registry[key], "calculo-1", "definicao-derivada");
  const url = `${getSiteUrl()}/calculo-1/derivadas/definicao-derivada`;
  assert.equal(meta.title, registry[key].meta.title);
  assert.equal(meta.alternates?.canonical, url);
  assert.equal(meta.openGraph?.url, url);
  assert.equal(meta.openGraph?.description, meta.description);
});
