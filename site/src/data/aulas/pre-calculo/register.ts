import type { AulaContent } from "@/data/aulas/types";
import { fundamentosAulas } from "@/data/aulas/pre-calculo/fundamentos";
import { algebraAulas } from "@/data/aulas/pre-calculo/algebra";
import { funcoesAulas } from "@/data/aulas/pre-calculo/funcoes";
import { graficosAulas } from "@/data/aulas/pre-calculo/graficos";
import { trigonometriaAulas } from "@/data/aulas/pre-calculo/trigonometria";
import { preparacaoLimitesAulas } from "@/data/aulas/pre-calculo/preparacao-limites";

export function buildPreCalculoRegistry(): Record<string, AulaContent> {
  const entries: Record<string, AulaContent> = {};

  const bundles: { modulo: string; aulas: Record<string, AulaContent> }[] = [
    { modulo: "fundamentos", aulas: fundamentosAulas },
    { modulo: "algebra", aulas: algebraAulas },
    { modulo: "funcoes", aulas: funcoesAulas },
    { modulo: "graficos", aulas: graficosAulas },
    { modulo: "trigonometria", aulas: trigonometriaAulas },
    { modulo: "preparacao-limites", aulas: preparacaoLimitesAulas },
  ];

  for (const { modulo, aulas } of bundles) {
    for (const [aulaSlug, content] of Object.entries(aulas)) {
      entries[`pre-calculo/${modulo}/${aulaSlug}`] = content;
    }
  }

  return entries;
}
