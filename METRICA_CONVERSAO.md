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

## Indicadores secundários

- **Conclusão do teste:** `level_test_completed / level_test_started`
- **Clique para a aula:** `first_lesson_opened / level_test_completed`
- **Conclusão da primeira aula:** `first_lesson_completed / first_lesson_opened`

A métrica principal é calculada por usuário único, e não pela quantidade bruta de cliques ou tentativas.

## Estado atual

O progresso do site ainda é salvo apenas no `localStorage`. Isso permite a experiência individual, mas não permite contar pessoas entre navegadores.

Para obter números agregados, o próximo passo é ativar o Web Analytics da Vercel e enviar esses quatro eventos como eventos personalizados, sem coletar nome, e-mail ou qualquer dado pessoal.

## Critério de sucesso inicial

Depois de uma primeira amostra de usuários, acompanhar:

1. onde o funil perde mais pessoas;
2. qual recomendação converte melhor;
3. quanto tempo leva do teste até a conclusão da primeira aula;
4. se a chamada principal da Home aumenta o início do teste.

Essa métrica será a referência para as futuras demonstrações de quiz, gráficos, explicações alternativas, pré-requisitos, revisão espaçada e tutora de IA.
