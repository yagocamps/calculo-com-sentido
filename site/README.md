# Cálculo com Sentido — app Next.js

Site educacional de Pré-Cálculo e Cálculo 1.

- **Etapa 1:** base do site (layout, rotas, modelos)
- **Etapa 2:** página inicial completa (missão, problema, solução, benefícios)
- **Etapa 3:** teste de nível interativo (12 perguntas, pontuação, recomendação)
- **Etapa 4:** trilha Pré-Cálculo (6 módulos, 59 aulas, páginas por módulo)
- **Etapa 5:** modelo de aula (12 seções) + Função afim completa
- **Etapa 6:** modelo de exercício (9 partes) + 8 exercícios de Função afim
- **Etapa 8:** progresso real via localStorage (aulas, exercícios, módulos)

## Desenvolvimento

```bash
cd site
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Rotas (Etapa 1)

| Rota | Página |
|------|--------|
| `/` | Home |
| `/sobre` | Sobre o projeto |
| `/teste-de-nivel` | Teste de nível (layout) |
| `/pre-calculo` | Trilha Pré-Cálculo |
| `/calculo-1` | Trilha Cálculo 1 |
| `/pre-calculo/funcoes/funcao-afim` | Aula modelo |
| `/exercicios` | Exercícios modelo |
| `/resumos` | Resumos |
| `/glossario` | Glossário |
| `/progresso` | Meu progresso |

O protótipo visual original permanece em `../index.html`.
