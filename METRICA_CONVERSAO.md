# Métrica principal de conversão

## Objetivo

Medir quantos navegadores iniciam o teste de nível e chegam a concluir a primeira aula recomendada.

## Métrica principal

```text
conversão teste → primeira aula =
navegadores que concluem a primeira aula recomendada em até 7 dias
÷
navegadores que iniciam o teste de nível
```

Sem login ou identificador pessoal, esta é uma aproximação anônima por navegador, e não uma contagem garantida de pessoas únicas. Limpar os dados do navegador, trocar de dispositivo ou usar outro perfil inicia uma nova jornada.

## Eventos

| Evento | Quando registrar | Propriedades úteis |
|---|---|---|
| `level_test_started` | Ao clicar em “Começar teste” | `question_count` |
| `level_test_completed` | Ao salvar o resultado | `score_percent`, `recommendation_band` |
| `first_lesson_opened` | Ao abrir a aula indicada no resultado | `lesson_id`, `recommendation_band`, `attribution_window_days` |
| `first_lesson_completed` | Ao marcar a aula indicada como concluída em até 7 dias | `lesson_id`, `recommendation_band`, `hours_since_test` |

Os eventos são enviados ao Vercel Web Analytics sem nome, e-mail ou respostas individuais. Ao concluir o teste, o site grava no `localStorage` apenas a aula indicada, a faixa da recomendação e o prazo de expiração. Assim, a atribuição continua válida se o aluno fechar e reabrir o site, mesmo que os parâmetros da URL sejam perdidos.

## Indicadores secundários

- Conclusão do teste: `level_test_completed / level_test_started`
- Abertura da aula: `first_lesson_opened / level_test_completed`
- Conclusão da primeira aula: `first_lesson_completed / first_lesson_opened`

## Leitura inicial

Acompanhar semanalmente:

1. em qual etapa o funil perde mais navegadores;
2. qual faixa de recomendação converte melhor;
3. quantas horas se passam entre o teste e a conclusão da aula;
4. se mudanças na chamada principal da Home aumentam o início do teste.

Eventos personalizados dependem da disponibilidade no plano da Vercel. Os pageviews do Web Analytics continuam úteis para validar a navegação geral.
