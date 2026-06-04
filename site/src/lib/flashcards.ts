import { calculo1Modulos } from "@/data/calculo-1";
import { glossario, type GlossarioEntry } from "@/data/glossario";
import { preCalculoModulos } from "@/data/pre-calculo";
import { getAulaContent } from "@/lib/aulas";

/**
 * Monta os flashcards de um módulo: reúne os `glossaryTerms` declarados nas
 * aulas do módulo e casa cada um com a definição do glossário. Roda no
 * servidor (usa o registro de aulas) — o resultado é um array pequeno e
 * serializável, passado por props para o cliente.
 */
export function getModuleFlashcards(
  trilha: "pre-calculo" | "calculo-1",
  moduleSlug: string,
): GlossarioEntry[] {
  const modulos = trilha === "calculo-1" ? calculo1Modulos : preCalculoModulos;
  const mod = modulos.find((m) => m.slug === moduleSlug);
  if (!mod) return [];

  const terms: string[] = [];
  const seen = new Set<string>();
  for (const lesson of mod.lessons) {
    const content = getAulaContent(trilha, moduleSlug, lesson.slug);
    if (!content) continue;
    for (const t of content.meta.glossaryTerms) {
      if (!seen.has(t)) {
        seen.add(t);
        terms.push(t);
      }
    }
  }

  const byTerm = new Map(glossario.map((g) => [g.termo, g]));
  const cards: GlossarioEntry[] = [];
  for (const t of terms) {
    const entry = byTerm.get(t);
    if (entry) cards.push(entry);
  }
  return cards;
}
