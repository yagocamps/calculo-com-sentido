# Cálculo com Sentido — convenções do projeto

Site educacional de Pré-Cálculo e Cálculo 1 para alunos que chegam à faculdade com dificuldade em matemática.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** para estilização
- **Markdown** (`.md` / MDX) para conteúdo de aulas
- **LocalStorage** para progresso (MVP — sem auth no início)

## Estrutura de pastas

```
/src
  /app
    page.tsx                  → Home
    /sobre/page.tsx
    /teste-de-nivel/page.tsx
    /pre-calculo
      page.tsx                → trilha
      /[modulo]/[aula]/page.tsx
    /calculo-1
      page.tsx
      /[modulo]/[aula]/page.tsx
    /exercicios/page.tsx
    /resumos/page.tsx
    /glossario/page.tsx
    /progresso/page.tsx
    layout.tsx                → sidebar fixa + topbar
  /components
    /layout      (Sidebar, Topbar, Shell)
    /ui          (Btn, Tag, Card, Callout, ProgressRing, ModuleCard)
    /aulas       (Section, Formula, StepRow, ErrosComuns)
    /exercicios  (ListItem, Reveal, LevelTag)
  /data
    trilhas.ts
    aulas/*.md
    exercicios.ts
    glossario.ts
  /lib
    progress.ts  → leitura/escrita no localStorage
    utils.ts
```

## Filosofia editorial (não esqueça!)

1. **Sentido antes da fórmula.** Toda aula explica o porquê antes da matemática.
2. **Aplicação real obrigatória.** Cada conteúdo mostra onde aparece (cotidiano, engenharia, finanças, etc).
3. **Passo a passo + interpretação.** Toda resolução é passo a passo e termina com "o que significa esse resultado".
4. **Erros comuns sempre.** Toda aula lista 2-4 erros típicos.
5. **Linguagem acolhedora.** Sem academiquês. Como se fosse para alguém com medo de matemática.

Estrutura obrigatória da aula (12 seções):
1. Título · 2. Por que aprender · 3. Explicação simples · 4. Onde aparece · 5. Exemplo aplicado · 6. Passo a passo · 7. Interpretação · 8. Erros comuns · 9. Exercícios guiados · 10. Exercícios aplicados · 11. Resumo · 12. Próxima aula.

Estrutura obrigatória do exercício (9 campos):
1. Tema · 2. Área de aplicação · 3. Enunciado · 4. O que identificar · 5. Dica · 6. Resolução · 7. Resposta · 8. Interpretação · 9. Erro comum.

## Sistema visual

Veja `tokens.tailwind.md` para o config do Tailwind.

- **Paleta:** cream warm (`#FAF6EF`) + marrom-tinta (`#2A211A`) + acento terracota (`#C2553D`). Semânticas: sálvia (concluído), azul (info), âmbar (dica/alerta).
- **Tipografia:** Newsreader (serif, títulos) + DM Sans (UI/body) + JetBrains Mono (fórmulas).
- **Cantos:** 8/14/20/28px. Sombras suaves.
- **Sidebar fixa de 264px** estilo documentação, com busca, navegação agrupada por trilha e mini-progresso no rodapé.
- **Callouts** com borda lateral colorida (4px) por intenção: ideia, aplicação, erro, dica.

## Como evoluir o projeto

Trabalhar sempre por etapas pequenas. Uma tela, uma aula, um módulo por vez.

**Não fazer no MVP:** login, banco grande, IA tutora, pagamento, gamificação avançada, app mobile.

**Ordem sugerida:**
1. Layout shell (sidebar + topbar) ← portado do protótipo
2. Componentes UI base (Btn, Card, Tag, Callout, ProgressRing)
3. Home estática
4. Trilha de Pré-Cálculo (data-driven)
5. Página de aula (modelo + 1 aula real: Função afim)
6. Página de exercícios (modelo + dataset)
7. Teste de nível
8. Progresso via localStorage
9. Resumos, glossário
10. Cálculo 1
11. IA tutora (depois do conteúdo base sólido)

## Referência visual

O protótipo de layout vive em `index.html` (canvas com 10 telas). Use ele como source-of-truth visual quando portar para Next.js.

## App Next.js

O projeto implementado está em `site/`. Rodar com `cd site && npm run dev`.

- **Etapa 1:** layout, rotas, modelos de aula/exercício
- **Etapa 2:** Home completa em `site/src/components/home/` + `site/src/data/home.ts`
- **Etapa 3:** Teste de nível em `site/src/components/teste/` + `site/src/data/teste-nivel.ts`
- **Etapa 4:** Trilha Pré-Cálculo em `site/src/data/pre-calculo.ts` + rotas `/pre-calculo/[modulo]`
- **Etapa 5:** Aulas em `site/src/data/aulas/` + `AulaView` (12 seções). MD fonte em `site/src/content/aulas/`
- **Etapa 6:** Exercícios em `site/src/data/exercicios.ts` + `ExerciciosFlow` (9 partes, filtros, reveal)
- **Etapa 8:** Progresso em `site/src/components/progresso/` + `site/src/lib/progress-dashboard.ts`
