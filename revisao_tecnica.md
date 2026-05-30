# Revisão Técnica — Cálculo com Sentido (2026-05-28)

Reauditoria do projeto **Cálculo com Sentido** (Next.js 16 + React 19 + Tailwind 4 + TypeScript). Esta versão substitui a revisão anterior: **todos os 5 bugs e melhorias documentados antes já foram implementados no código** (verificado arquivo por arquivo). O documento abaixo registra esse estado e levanta os problemas que ainda restam de fato.

> Como validei: li os arquivos-fonte citados, rodei `npm run lint` e `npm run build`. O build passa e gera **90 páginas estáticas (SSG)** sem erro. O `eslint`, porém, retorna **7 errors + 4 warnings**.

---

# Análise geral do site

Projeto maduro e bem estruturado. Arquitetura limpa (App Router com route group `(site)`, data-driven, libs isoladas em `/lib`), SEO configurado (`metadata`, OpenGraph, `robots.ts`, `sitemap.ts`), dark mode com script anti-flash, 404 estilizado, KaTeX acessível, backup/import de progresso com validação. Renderização 100% estática — TTFB ótimo.

O que **não** está pronto: o `eslint` falha (CI/deploy que rode lint vai quebrar), há imports/variáveis mortos, e faltam itens finais de produção (variável de ambiente de URL, testes, favicon/OG image, política de erro client-side). Nada impeditivo para o usuário, mas precisa de uma faxina antes do deploy.

## Status dos itens da revisão anterior — todos RESOLVIDOS

| Item antigo | Estado atual (verificado) |
|---|---|
| Bug 1 — Sidebar sem responsividade | ✅ Drawer mobile com `fixed inset-y-0`, hamburger no Topbar, fecha ao navegar — `Sidebar.tsx:141-194` |
| Bug 2 — Âncoras do glossário | ✅ `id={slugify(entry.termo)}` + `scroll-mt-20` no glossário; `AulaToc.tsx:89` usa `/glossario#${slugify(t)}` |
| Bug 3 — `Button disabled` com `href` | ✅ `preventDefault`, `href="#"`, `pointer-events-none`, `aria-disabled` — `Button.tsx:51-68` |
| Bug 4 — `ProgressRing` invisível | ✅ `stroke="var(--border-soft)"` — `ProgressRing.tsx:33` |
| Bug 5 — `syncDerivedFields` morto | ✅ Chamado em `importProgressFromJson` — `progress.ts:238` |
| UX — Scroll-spy no sumário | ✅ `IntersectionObserver` — `AulaToc.tsx:29-49` |
| UX — Badge "LM" fake / tempo fixo | ✅ Timer real via `sessionStorage` + badge "Estudante" — `Topbar.tsx:16-39,78-84` |
| UX — Atalho ⌘K no Windows | ✅ Detecção de OS, mostra `Ctrl+K` — `Sidebar.tsx:59-75,186` |
| a11y — Focus trap no CommandPalette | ✅ `handleKeyDown` com ciclo de Tab — `CommandPalette.tsx:78-104` |
| Produção — 404 / backup JSON | ✅ `not-found.tsx` estilizado + export/import com limite de 500 KB |

---

# Bugs encontrados

Não há mais bugs **funcionais** que quebrem o uso. Os problemas atuais são de qualidade de código e gate de build.

### Bug A — `eslint` falha com 7 erros (`set-state-in-effect`)
* **Problema:** A regra `react-hooks/set-state-in-effect` (React 19 / Next 16) acusa erro em 7 pontos onde há `setState` síncrono dentro de `useEffect`.
* **Local:** `ExercicioDetail.tsx:53`, `CommandPalette.tsx:52` e `:59`, `Sidebar.tsx:72`, `ThemeToggle.tsx:12`, `ProgressoContent.tsx:29`, `TesteNivelFlow.tsx:34`.
* **Impacto:** `npm run build` passa (Next 16 não bloqueia), mas `npm run lint` retorna **exit code 1**. Se o pipeline de deploy (Vercel/CI) rodar lint, **o deploy quebra**. Vários desses casos são leitura legítima de `localStorage` pós-montagem (padrão correto para evitar hydration mismatch).
* **Correção sugerida:** Tratar caso a caso, não silenciar em massa:
  - **Leitura de localStorage pós-mount** (`ExercicioDetail`, `ProgressoContent`, `ThemeToggle`): manter o padrão, mas suprimir a regra na linha com justificativa — `// eslint-disable-next-line react-hooks/set-state-in-effect -- leitura client-only pós-hidratação`.
  - **`CommandPalette:52,59`**: `setActive(0)` ao abrir/digitar pode virar `key`-reset do componente ou ser derivado, eliminando o efeito.
  - **`Sidebar:72`** (detecção de OS): mover a detecção para fora do render usando `useSyncExternalStore` ou inicializar o state com função lazy lendo `navigator` dentro de guarda `typeof window`.
* **Prioridade:** Alta (bloqueia CI/deploy automatizado).

### Bug B — Imports e variáveis mortos (4 warnings)
* **Problema / Local:**
  - `not-found.tsx:1` — `Link` importado e não usado.
  - `AulaEmBreve.tsx:1` — `Link` importado e não usado.
  - `progress.ts:112` — `catch (e)` com `e` não usado.
  - `trilhas.ts:10` — `moduloPath` importado e não usado.
* **Impacto:** Ruído no lint, bundle marginalmente maior, sinal de código não revisado.
* **Correção:** Remover os imports não usados; trocar `catch (e)` por `catch`.
* **Prioridade:** Baixa.

---

# Melhorias de interface

A base visual continua forte e o design editorial está coerente. Refinamentos que ainda valem:

1. **Estado de loading do progresso.** O dashboard (`ProgressoContent`) e os anéis leem `localStorage` após montar. No primeiro paint o usuário vê `0%`/vazio por um instante antes de "pular" para o valor real. Adicionar um skeleton/spinner sutil enquanto o estado não foi lido (`mounted` flag) evita o flash.
2. **Feedback ao marcar aula/exercício concluído.** Confirmar que `MarkCompleteButton` dá retorno visual imediato (mudança de label + cor) — bom ponto para uma micro-transição.
3. **Favicon e OG image.** Há `favicon.ico`, mas não vi `opengraph-image`. Sem imagem, links compartilhados em WhatsApp/redes ficam sem preview — relevante para um site educacional que circula entre alunos.

---

# Melhorias de segurança

Risco geral **baixo** — site estático, sem backend, sem auth (por design do MVP). Pontos confirmados como sólidos:

* **`dangerouslySetInnerHTML` com KaTeX:** seguro. As fórmulas vêm só de dados internos (`data/aulas/`), nunca de input do usuário.
* **localStorage defensivo:** `normalizeLessonIds/ExerciseIds/Reviews` validam IDs contra o conjunto conhecido ao ler o JSON cru — bloqueia payload adulterado.
* **Import de backup:** `importProgressFromJson` valida tamanho (≤500 KB), schema e tipos antes de aceitar — `progress.ts:199-243`. Bom.

Ação restante:
* **Headers de segurança.** Adicionar headers básicos no deploy (CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy`). Numa CSP, lembrar que o `themeScript` inline no `layout.tsx` exige `script-src` com nonce ou hash.

---

# Melhorias de performance

Já está muito bom: SSG completo, `function-plot` carregado com `import()` dinâmico dentro do `useEffect` (não infla o bundle inicial).

* **`next/image`:** se entrarem imagens (ex.: OG, ilustrações), usar `<Image />` para WebP + lazy automático.
* **Fontes:** 3 famílias Google (Newsreader 6 pesos+itálico, DM Sans 4, JetBrains Mono 3). É bastante. Confirmar que todos os pesos carregados são realmente usados; cortar os que não forem reduz o CSS/fonte baixada.

---

# Melhorias de acessibilidade

* **KaTeX acessível:** `role="math"` + `aria-label` em português, visual com `aria-hidden`. Excelente.
* **Focus trap no CommandPalette:** implementado. Verificar também que ao **fechar** o modal o foco volta ao botão que o abriu (restaurar `document.activeElement` anterior).
* **Contraste do dark mode:** rodar uma checagem com axe/Lighthouse nas duas paletas — o texto `text-ink-subtle` sobre `surface-warm` é o par mais arriscado.
* **`scroll-mt`:** já aplicado no glossário; conferir se as seções da aula (`#porque`, etc.) também têm offset para o header não cobrir o título ao ancorar.

---

# Melhorias no código

* **Resolver os 7 `set-state-in-effect`** (Bug A) — é a dívida técnica mais visível.
* **Limpar imports/vars mortos** (Bug B).
* **Unificar tipos das trilhas:** `pre-calculo.ts` declara tipos locais e `calculo-1.ts` importa de `trilha-module.ts`. Centralizar tudo em `trilha-module.ts` (ou um `data/types.ts`) elimina duplicação — facilita adicionar trilhas no futuro.
* **`AGENTS.md`** avisa que esta é uma versão de Next com breaking changes e que se deve ler `node_modules/next/dist/docs/` antes de codar. Manter isso em mente em qualquer mudança de API de rota/config.

---

# Checklist antes de colocar em produção

- [ ] **Zerar o `eslint`** — corrigir os 7 erros `set-state-in-effect` e os 4 warnings, deixando `npm run lint` com exit 0.
- [ ] **Definir `NEXT_PUBLIC_SITE_URL`** no ambiente de deploy — hoje `getSiteUrl()` cai em `localhost:3000` como fallback, o que quebra canonical/sitemap/OG em produção (`site.ts:6`).
- [ ] **Adicionar `opengraph-image`** (e conferir favicon) para previews ao compartilhar.
- [ ] **Loading state** no dashboard de progresso e nos anéis (evitar flash de 0%).
- [ ] **Headers de segurança** no deploy (CSP compatível com o script inline de tema, nosniff, referrer-policy).
- [ ] **Lighthouse/axe** em desktop e mobile, light e dark — registrar score de a11y e perf.
- [ ] **Teste manual em celular real** (360–390px) — o drawer já existe, mas vale validar toque e scroll.
- [ ] **Testes básicos** — não há nenhum teste. No mínimo, testar `normalize*`, `importProgressFromJson` e `computeCombinedTrilhaPercent` (lógica pura, fácil de cobrir).
- [ ] **Backup do conteúdo** — como o progresso vive só no `localStorage`, garantir que o botão de export JSON está acessível e documentado para o aluno.
- [ ] **Revisar SEO por página** — confirmar `title`/`description` em todas as rotas (várias já têm via `metadata`).

---

# Plano de ação por prioridade

## Prioridade alta (antes do deploy)
1. **Corrigir os 7 erros de `eslint`** (Bug A) — senão um deploy com lint no pipeline quebra.
2. **Configurar `NEXT_PUBLIC_SITE_URL`** no ambiente de produção.
3. **Headers de segurança** básicos no deploy.

## Prioridade média (melhora bastante, não impede)
4. **Loading states** no progresso (evitar flash de 0%).
5. **OG image + favicon** para compartilhamento.
6. **Limpar imports/variáveis mortos** (Bug B).
7. **Auditoria Lighthouse/axe** light + dark.

## Prioridade baixa (refinamento)
8. **Unificar tipos das trilhas** em um único módulo.
9. **Restaurar foco** ao fechar o CommandPalette.
10. **Testes unitários** das funções puras de progresso.
11. **Enxugar pesos de fonte** não utilizados.

---

## O que enviar se quiser aprofundar
Para validar UX/responsividade de fato (não só código), me envie: **prints do mobile** (home, uma aula, exercícios, progresso) em light e dark, e a **saída do Lighthouse**. Para revisar contraste, um print do dark mode com texto sobre `surface-warm`.
