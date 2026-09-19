// Lista das seções da aula, compartilhada entre a TOC fixa (desktop, client),
// a TOC colapsável (mobile, server) e a barra de leitura. Fica num módulo
// neutro para poder ser importada por componentes de servidor e de cliente.
export const sectionLinks = [
  { id: "porque", label: "Por que aprender" },
  { id: "explicacao", label: "Explicação simples" },
  { id: "onde", label: "Onde aparece" },
  { id: "exemplo", label: "Exemplo aplicado" },
  { id: "passos", label: "Passo a passo" },
  { id: "interpretacao", label: "Interpretação" },
  { id: "erros", label: "Erros comuns" },
  { id: "simulacao", label: "Simulação (Aplicabilidade)" },
  { id: "guiados", label: "Exercícios guiados" },
  { id: "aplicados", label: "Exercícios aplicados" },
  { id: "resumo", label: "Resumo" },
  { id: "video", label: "Vídeo aula" },
  { id: "proxima", label: "Próxima aula" },
] as const;

export type SectionLink = (typeof sectionLinks)[number];

/**
 * Nem toda aula tem simulação, vídeo ou próxima aula. Os três consumidores da
 * TOC precisam enxergar exatamente a mesma lista, senão a numeração exibida
 * deixa de bater com a das etapas.
 */
export function visibleSectionLinks({
  hasSimulation = false,
  hasVideos = false,
  hasNext,
}: {
  hasSimulation?: boolean;
  hasVideos?: boolean;
  hasNext: boolean;
}): readonly SectionLink[] {
  return sectionLinks.filter(
    (item) =>
      (item.id !== "simulacao" || hasSimulation) &&
      (item.id !== "proxima" || hasNext) &&
      (item.id !== "video" || hasVideos),
  );
}
