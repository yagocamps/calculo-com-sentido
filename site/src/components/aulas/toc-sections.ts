// Lista das seções da aula, compartilhada entre a TOC fixa (desktop, client)
// e a TOC colapsável (mobile, server). Fica num módulo neutro para poder ser
// importada por componentes de servidor e de cliente.
export const sectionLinks = [
  { id: "porque", label: "Por que aprender" },
  { id: "explicacao", label: "Explicação simples" },
  { id: "onde", label: "Onde aparece" },
  { id: "exemplo", label: "Exemplo aplicado" },
  { id: "passos", label: "Passo a passo" },
  { id: "interpretacao", label: "Interpretação" },
  { id: "erros", label: "Erros comuns" },
  { id: "guiados", label: "Exercícios guiados" },
  { id: "aplicados", label: "Exercícios aplicados" },
  { id: "resumo", label: "Resumo" },
  { id: "video", label: "Vídeo aula" },
  { id: "proxima", label: "Próxima aula" },
] as const;
