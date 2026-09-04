// Pré-requisitos padrão por módulo (Plano Mestre — "o maior bloqueio é
// entrar numa aula sem a base"). Toda aula herda os pré-requisitos do seu
// módulo; aulas podem sobrescrever com chips mais específicos via
// `meta.prereqs` (ex.: Função afim aponta direto para "Equações do 1º grau").

import { calculo1ModuloPath, calculo1Modulos } from "@/data/calculo-1";
import { moduloPath, preCalculoModulos } from "@/data/pre-calculo";
import type { AulaPrereq } from "@/data/aulas/types";

type Trilha = "pre-calculo" | "calculo-1";

/** Pré-requisitos por módulo, como referências (trilha, módulo). */
const modulePrereqs: Record<Trilha, Record<string, [Trilha, string][]>> = {
  "pre-calculo": {
    fundamentos: [],
    algebra: [["pre-calculo", "fundamentos"]],
    funcoes: [["pre-calculo", "algebra"]],
    graficos: [["pre-calculo", "funcoes"]],
    "geometria-analitica": [
      ["pre-calculo", "algebra"],
      ["pre-calculo", "graficos"],
    ],
    trigonometria: [
      ["pre-calculo", "geometria-analitica"],
    ],
    "preparacao-limites": [
      ["pre-calculo", "funcoes"],
      ["pre-calculo", "graficos"],
    ],
  },
  "calculo-1": {
    "antes-do-calculo": [],
    "funcoes-para-calculo": [["pre-calculo", "funcoes"]],
    limites: [
      ["calculo-1", "funcoes-para-calculo"],
      ["pre-calculo", "preparacao-limites"],
    ],
    continuidade: [["calculo-1", "limites"]],
    derivadas: [["calculo-1", "limites"]],
    "aplicacoes-derivadas": [["calculo-1", "derivadas"]],
    integrais: [["calculo-1", "derivadas"]],
  },
};

function resolveModule(trilha: Trilha, slug: string): AulaPrereq | null {
  const modulos = trilha === "pre-calculo" ? preCalculoModulos : calculo1Modulos;
  const modulo = modulos.find((m) => m.slug === slug);
  if (!modulo) return null;
  return {
    label:
      trilha === "pre-calculo"
        ? `Pré · ${modulo.shortTitle}`
        : modulo.shortTitle,
    href:
      trilha === "pre-calculo" ? moduloPath(slug) : calculo1ModuloPath(slug),
  };
}

/** Pré-requisitos padrão das aulas de um módulo (vazio para módulos iniciais). */
export function prereqsForModule(trilha: Trilha, moduleSlug: string): AulaPrereq[] {
  const refs = modulePrereqs[trilha][moduleSlug] ?? [];
  const out: AulaPrereq[] = [];
  for (const [t, slug] of refs) {
    const p = resolveModule(t, slug);
    if (!p) continue;
    // Dentro da própria trilha Pré-Cálculo, o prefixo "Pré ·" é redundante.
    if (t === "pre-calculo" && trilha === "pre-calculo") {
      out.push({ ...p, label: p.label.replace("Pré · ", "") });
    } else {
      out.push(p);
    }
  }
  return out;
}
