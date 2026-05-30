# Cálculo com Sentido

Site educacional de **Pré-Cálculo e Cálculo 1** para estudantes que chegam à faculdade com dificuldade em matemática. A proposta é ensinar **sentido antes da fórmula**: cada aula explica o porquê, mostra onde aquilo aparece na vida real, resolve passo a passo e interpreta o resultado.

## Filosofia editorial

1. **Sentido antes da fórmula** — toda aula começa pelo porquê.
2. **Aplicação real obrigatória** — cotidiano, engenharia, finanças.
3. **Passo a passo + interpretação** — toda resolução termina explicando o que o resultado significa.
4. **Erros comuns sempre** — cada aula lista os deslizes típicos.
5. **Linguagem acolhedora** — sem academiquês, para quem tem medo de matemática.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **KaTeX** para renderização de fórmulas (inline e blocos de desenvolvimento)
- **function-plot** para gráficos interativos
- **localStorage** para progresso (MVP, sem autenticação)

## Estrutura

```
.
├── site/                 # Aplicação Next.js (código que roda)
│   ├── src/app/          # Rotas (App Router)
│   ├── src/components/    # Componentes (layout, aulas, exercícios, UI)
│   └── src/data/          # Conteúdo data-driven das aulas e exercícios
├── index.html            # Protótipo visual (source-of-truth de design)
├── design-canvas.jsx     # Protótipo de telas
├── tokens.tailwind.md    # Tokens do design system
└── CLAUDE.md             # Convenções do projeto
```

## Como rodar

```bash
cd site
npm install
npm run dev
```

Acesse http://localhost:3000.

## Conteúdo

- **Pré-Cálculo**: Fundamentos, Álgebra, Funções, Gráficos, Trigonometria e Preparação para Limites.
- **Cálculo 1**: trilha completa de limites, derivadas e integrais.

Cada aula segue uma estrutura de 12 seções (por que aprender, explicação, onde aparece, exemplo, passo a passo, interpretação, erros comuns, exercícios guiados e aplicados, resumo, próxima aula).
