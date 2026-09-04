# Métrica principal de conversão

## Objetivo

Medir quantas pessoas descobrem seu ponto de partida e realmente iniciam a jornada de estudo.

## Métrica principal

```
conversão teste → primeira aula =
usuários únicos que concluem a primeira aula
÷
usuários únicos que iniciam o teste de nível
```

A janela recomendada é de 7 dias após o início do teste. Isso evita atribuir à campanha uma conclusão que aconteceu muito tempo depois.

## Eventos

| Evento | Quando registrar | Propriedades úteis |
|---|---|---|
| `level_test_started` | Ao clicar em “Começar teste” | `question_count` |
| `level_test_completed` | Ao salvar o resultado | `score_percent`, `recommendation_band` |
| `first_lesson_opened` | Ao abrir a aula indicada no resultado | `lesson_id`, `recommendation_band` |
| `first_lesson_completed` | Ao marcar a primeira aula como concluída | `lesson_id`, `recommendation_band` |

Os eventos são enviados pela integração do Vercel Web Analytics. O CTA da recomendação leva
`from=level-test` e a faixa recomendada para a primeira aula, permitindo atribuir a abertura
e a conclusão ao teste sem coletar identidade, nome ou e-mail.

## Indicadores secundários

- **Conclusão do teste:** `level_test_completed / level_test_started`
- **Clique para a aula:** `first_lesson_opened / level_test_completed`
- **Conclusão da primeira aula:** `first_lesson_completed / first_lesson_opened`

A métrica principal é calculada por usuário único, e não pela quantidade bruta de cliques ou tentativas.

## Estado atual

O progresso do site continua salvo no `localStorage`, enquanto os quatro eventos do funil
já estão instrumentados no Web Analytics da Vercel. Assim, a experiência individual continua
funcionando sem conta e a análise agregada pode ser feita no painel, sem coletar nome, e-mail
ou qualquer dado pessoal.

A disponibilidade de eventos personalizados depende do plano da Vercel; os pageviews do
Web Analytics continuam sendo úteis para validar a navegação geral.

## Critério de sucesso inicial

Depois de uma primeira amostra de usuários, acompanhar:

1. onde o funil perde mais pessoas;
2. qual recomendação converte melhor;
3. quanto tempo leva do teste até a conclusão da primeira aula;
4. se a chamada principal da Home aumenta o início do teste.

Essa métrica será a referência para as futuras demonstrações de quiz, gráficos, explicações alternativas, pré-requisitos, revisão espaçada e tutora de IA.
