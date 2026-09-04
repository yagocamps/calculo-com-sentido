import type { AulaContent } from "@/data/aulas/types";
import { fundamentosAulas } from "@/data/aulas/pre-calculo/fundamentos";
import { algebraAulas } from "@/data/aulas/pre-calculo/algebra";
import { funcoesAulas } from "@/data/aulas/pre-calculo/funcoes";
import { graficosAulas } from "@/data/aulas/pre-calculo/graficos";
import { trigonometriaAulas } from "@/data/aulas/pre-calculo/trigonometria";
import { preparacaoLimitesAulas } from "@/data/aulas/pre-calculo/preparacao-limites";
import { preCalculoPhase2Registry } from "@/data/aulas/pre-calculo/fase2";

export function buildPreCalculoRegistry(): Record<string, AulaContent> {
  const entries: Record<string, AulaContent> = {};

  const bundles: { modulo: string; aulas: Record<string, AulaContent> }[] = [
    { modulo: "fundamentos", aulas: { ...fundamentosAulas, ...preCalculoPhase2Registry.fundamentos } },
    { modulo: "algebra", aulas: { ...algebraAulas, ...preCalculoPhase2Registry.algebra } },
    { modulo: "funcoes", aulas: { ...funcoesAulas, ...preCalculoPhase2Registry.funcoes } },
    { modulo: "graficos", aulas: { ...graficosAulas, ...preCalculoPhase2Registry.graficos } },
    { modulo: "geometria-analitica", aulas: preCalculoPhase2Registry["geometria-analitica"] },
    { modulo: "trigonometria", aulas: { ...trigonometriaAulas, ...preCalculoPhase2Registry.trigonometria } },
    { modulo: "preparacao-limites", aulas: { ...preparacaoLimitesAulas, ...preCalculoPhase2Registry["preparacao-limites"] } },
  ];

  for (const { modulo, aulas } of bundles) {
    for (const [aulaSlug, content] of Object.entries(aulas)) {
      entries[`pre-calculo/${modulo}/${aulaSlug}`] = content;
    }
  }

  return entries;
}
