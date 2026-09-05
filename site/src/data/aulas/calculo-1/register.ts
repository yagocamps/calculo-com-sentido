import type { AulaContent } from "@/data/aulas/types";
import { antesDoCalculoAulas } from "@/data/aulas/calculo-1/antes-do-calculo";
import { funcoesParaCalculoAulas } from "@/data/aulas/calculo-1/funcoes-para-calculo";
import { limitesAulas } from "@/data/aulas/calculo-1/limites";
import { continuidadeAulas } from "@/data/aulas/calculo-1/continuidade";
import { derivadasAulas } from "@/data/aulas/calculo-1/derivadas";
import { aplicacoesDerivadasAulas } from "@/data/aulas/calculo-1/aplicacoes-derivadas";
import { integraisAulas } from "@/data/aulas/calculo-1/integrais";
import { calculo1Phase2Registry } from "@/data/aulas/calculo-1/fase2";

export function buildCalculo1Registry(): Record<string, AulaContent> {
  const entries: Record<string, AulaContent> = {};

  const bundles: { modulo: string; aulas: Record<string, AulaContent> }[] = [
    { modulo: "antes-do-calculo", aulas: antesDoCalculoAulas },
    { modulo: "funcoes-para-calculo", aulas: { ...funcoesParaCalculoAulas, ...calculo1Phase2Registry["funcoes-para-calculo"] } },
    { modulo: "limites", aulas: { ...limitesAulas, ...calculo1Phase2Registry.limites } },
    { modulo: "continuidade", aulas: { ...continuidadeAulas, ...calculo1Phase2Registry.continuidade } },
    { modulo: "derivadas", aulas: { ...derivadasAulas, ...calculo1Phase2Registry.derivadas } },
    { modulo: "aplicacoes-derivadas", aulas: { ...aplicacoesDerivadasAulas, ...calculo1Phase2Registry["aplicacoes-derivadas"] } },
    { modulo: "integrais", aulas: { ...integraisAulas, ...calculo1Phase2Registry.integrais } },
  ];

  for (const { modulo, aulas } of bundles) {
    for (const [aulaSlug, content] of Object.entries(aulas)) {
      entries[`calculo-1/${modulo}/${aulaSlug}`] = content;
    }
  }

  return entries;
}

/** Parâmetros SSG apenas para aulas com conteúdo no registry */
export function getCalculo1StaticAulaParams() {
  return Object.keys(buildCalculo1Registry()).map((key) => {
    const [, modulo, aula] = key.split("/");
    return { modulo, aula };
  });
}
