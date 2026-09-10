import assert from "node:assert/strict";
import { test } from "node:test";
import { plots, type PlotSpec } from "@/data/plots";
import { exercicios } from "@/data/exercicios";
import { visualLabsByLesson } from "@/data/visual-labs";
import { buildPreCalculoRegistry } from "@/data/aulas/pre-calculo/register";
import { buildCalculo1Registry } from "@/data/aulas/calculo-1/register";

const registry = { ...buildPreCalculoRegistry(), ...buildCalculo1Registry() };

const entradas = Object.entries(plots) as [string, PlotSpec][];

test("todo gráfico tem domínio válido e descrição acessível", () => {
  for (const [id, spec] of entradas) {
    assert.ok(spec.x[0] < spec.x[1], `${id}: domínio x invertido`);
    assert.ok(spec.y[0] < spec.y[1], `${id}: domínio y invertido`);
    assert.ok(spec.alt.trim().length >= 40, `${id}: alt curto demais para descrever a figura`);
    assert.ok(!/\\\(|\\\[/.test(spec.alt), `${id}: alt é lido em voz alta e não pode conter LaTeX`);
    assert.ok(spec.marks.length > 0, `${id}: gráfico sem nenhuma marca`);
  }
});

test("as curvas aparecem dentro do quadro", () => {
  for (const [id, spec] of entradas) {
    for (const mark of spec.marks) {
      if (mark.kind !== "curve") continue;
      const de = mark.from ?? spec.x[0];
      const ate = mark.to ?? spec.x[1];
      let visiveis = 0;
      for (let i = 0; i <= 120; i++) {
        const x = de + ((ate - de) * i) / 120;
        const y = mark.f(x);
        if (Number.isFinite(y) && y >= spec.y[0] && y <= spec.y[1]) visiveis++;
      }
      assert.ok(
        visiveis >= 12,
        `${id}: a curva quase não aparece no quadro (${visiveis} de 121 amostras visíveis) — ajuste o domínio`,
      );
    }
  }
});

test("pontos, retas de apoio e retângulos ficam dentro do quadro", () => {
  for (const [id, spec] of entradas) {
    for (const mark of spec.marks) {
      if (mark.kind === "point") {
        const [x, y] = mark.at;
        assert.ok(x >= spec.x[0] && x <= spec.x[1], `${id}: ponto fora do domínio x`);
        assert.ok(y >= spec.y[0] && y <= spec.y[1], `${id}: ponto fora do domínio y`);
      }
      if (mark.kind === "vline") {
        assert.ok(mark.at >= spec.x[0] && mark.at <= spec.x[1], `${id}: vline fora do quadro`);
      }
      if (mark.kind === "hline") {
        assert.ok(mark.at >= spec.y[0] && mark.at <= spec.y[1], `${id}: hline fora do quadro`);
      }
      if (mark.kind === "rects") {
        assert.ok(mark.edges.length >= 2, `${id}: partição precisa de ao menos duas bordas`);
        for (let i = 1; i < mark.edges.length; i++) {
          assert.ok(mark.edges[i] > mark.edges[i - 1], `${id}: bordas da partição fora de ordem`);
        }
        assert.ok(mark.edges[0] >= spec.x[0], `${id}: retângulos começam fora do quadro`);
        assert.ok(mark.edges.at(-1)! <= spec.x[1], `${id}: retângulos terminam fora do quadro`);
      }
      if (mark.kind === "area") {
        assert.ok(mark.from < mark.to, `${id}: área com intervalo invertido`);
      }
    }
  }
});

test("nenhum gráfico fica órfão e toda referência aponta para um id existente", () => {
  const usados = new Set<string>();
  for (const e of exercicios) if (e.grafico) usados.add(e.grafico);
  for (const c of Object.values(registry)) if (c.plot) usados.add(c.plot);
  for (const id of usados) {
    assert.ok(id in plots, `algo aponta para o gráfico inexistente "${id}"`);
  }
  const orfaos = entradas.map(([id]) => id).filter((id) => !usados.has(id));
  assert.deepEqual(orfaos, [], "gráficos criados e não usados por nenhum exercício nem aula");
});

test("as aulas do módulo Gráficos têm figura", () => {
  // Um módulo sobre ler gráficos sem gráfico algum era a contradição mais
  // visível do site. A revisão do módulo segue sem figura, de propósito.
  const semFigura = Object.entries(registry)
    .filter(([id]) => id.startsWith("pre-calculo/graficos/") && !id.endsWith("/revisao-graficos"))
    .filter(([id, c]) => !c.plot && !(id in visualLabsByLesson))
    .map(([id]) => id);
  assert.deepEqual(semFigura, [], "aula do módulo Gráficos sem nenhuma figura");
});

test("os retângulos de Riemann reproduzem a soma do gabarito", () => {
  // CUR-RIE-1: três retângulos à direita para f(x)=x em [0,3] devem somar 6.
  const spec = plots["riemann-direita-3"];
  const rects = spec.marks.find((m) => m.kind === "rects");
  assert.ok(rects && rects.kind === "rects");
  let soma = 0;
  for (let i = 1; i < rects.edges.length; i++) {
    const largura = rects.edges[i] - rects.edges[i - 1];
    const altura = rects.f(rects.side === "right" ? rects.edges[i] : rects.edges[i - 1]);
    soma += largura * altura;
  }
  assert.equal(soma, 6, "a figura precisa mostrar a mesma soma que o gabarito do exercício");
});

test("a partição desigual mantém uma fatia larga, que é o ponto do exercício", () => {
  const spec = plots["riemann-particao-desigual"];
  const rects = spec.marks.find((m) => m.kind === "rects");
  assert.ok(rects && rects.kind === "rects");
  const larguras = rects.edges.slice(1).map((e, i) => e - rects.edges[i]);
  assert.equal(Math.max(...larguras), 0.5, "a maior largura precisa continuar 1/2");
  assert.ok(larguras.length > 2, "e o restante precisa estar dividido em várias partes");
});
