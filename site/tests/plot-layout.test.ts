import assert from "node:assert/strict";
import { test } from "node:test";
import { plots, type PlotSpec } from "@/data/plots";
import { createPlotScale, formatPlotTick, layoutPlotLabels } from "@/lib/plot-layout";

test("os valores monetários cabem à esquerda sem abreviar a escala", () => {
  const spec: PlotSpec = { alt: "Receita", x: [0,10], y: [-20000,20000], yTicks: [-20000,0,20000], marks: [] };
  const scale=createPlotScale(spec);
  assert.equal(formatPlotTick(-20000), "-20.000");
  for(const value of scale.yTicks) assert.ok(scale.pad.left-8-formatPlotTick(value).length*8>=6);
});

test("círculos conservam a escala igual mesmo com números largos no eixo", () => {
  const scale=createPlotScale({alt:"Círculo",x:[-2,2],y:[-2,2],aspect:"igual",yTicks:[-20000,20000],marks:[]});
  assert.ok(Math.abs((scale.x(1)-scale.x(0))-(scale.y(0)-scale.y(1)))<1e-8);
});

test("os três nomes da regra da soma ficam afastados das três curvas", () => {
  const spec=plots["regra-da-soma-inclinacoes"];
  const scale=createPlotScale(spec);
  const labels=layoutPlotLabels(spec,scale);
  assert.deepEqual(labels.map(label=>label.text),["f + g","f = x²","g = 2x"]);
  for(const label of labels) {
    // The actual labels are at most 44 SVG units wide in the site font.
    const left=label.x-44,right=label.x;
    for(const mark of spec.marks) {
      if(mark.kind!=="curve")continue;
      for(let i=0;i<=1000;i++) {
        const x=spec.x[0]+(spec.x[1]-spec.x[0])*i/1000;
        const px=scale.x(x),py=scale.y(mark.f(x));
        assert.ok(!(px>left&&px<right&&py>label.y-14&&py<label.y+4),`${label.text} cruza um traço`);
      }
    }
  }
});

test("nenhuma anotação do catálogo desaparece ao reorganizar os gráficos", () => {
  for(const [id,spec] of Object.entries(plots)) {
    const expected=spec.marks.flatMap(mark=>mark.kind==="text"?[mark.text]:"label" in mark&&mark.label?[mark.label]:[]);
    const labels=layoutPlotLabels(spec,createPlotScale(spec));
    assert.deepEqual(labels.map(label=>label.text),expected,id);
    assert.ok(labels.every(label=>Number.isFinite(label.x)&&Number.isFinite(label.y)&&label.x>=0&&label.x<=600&&label.y>=0&&label.y<=340),id);
  }
});
