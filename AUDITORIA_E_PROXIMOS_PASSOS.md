# Auditoria e próximos passos

## Objetivo do produto

O Cálculo com Sentido é uma plataforma educacional para quem chega à faculdade com insegurança em matemática. O método é **sentido antes da fórmula**: explicar o porquê, mostrar uma aplicação real, resolver passo a passo, interpretar o resultado e praticar.

O fluxo principal do produto é:

```
Home → teste de nível → recomendação → primeira aula → conclusão → progresso
```

## Estado atual publicado

A aplicação publicada é a pasta `site/`, em Next.js. O protótipo visual legado da raiz não participa do deploy.

- Pré-Cálculo: 6 módulos, 59 aulas e 144 exercícios.
- Cálculo 1: 7 módulos, 62 aulas e 121 exercícios.
- Total: 121 aulas publicadas e 265 exercícios no banco.
- Progresso individual salvo no navegador por enquanto.
- Deploy da branch `main` conectado ao GitHub e verificado como concluído pela Vercel.
- Root Directory esperado na Vercel: `site`.

## Validação desktop

Rotas principais verificadas no site publicado:

`/`, `/teste-de-nivel`, `/trilha-expressa`, `/pre-calculo`,
`/pre-calculo/fundamentos`, `/pre-calculo/funcoes/funcao-afim`,
`/calculo-1`, `/calculo-1/limites`, `/calculo-1/derivadas`,
`/exercicios`, `/resumos`, `/glossario`, `/progresso` e `/sobre`.

Todas carregaram com título e conteúdo principal esperados, sem tela de erro ou 404.

A demonstração da aula de Função afim confirmou:

- gráfico interativo com controles de taxa e valor inicial;
- explicação alternativa;
- exercícios guiados;
- quiz de saída com resultado 3/3;
- botão de conclusão e atualização do progresso;
- busca global;
- tema claro/escuro;
- aumento e redução do tamanho do texto.

## Fluxo de entrada

O teste de nível tem 24 perguntas. O resultado observado encaminhou corretamente para:

1. recomendação de Pré-Cálculo;
2. primeira aula de Fundamentos;
3. conclusão da aula;
4. painel de progresso e próxima aula.

A Home usa a chamada:

> Descubra por onde começar em Cálculo — e avance com sentido.

O CTA principal orienta o aluno a fazer o teste e encontrar a primeira aula; quando já existe progresso local, oferece continuar de onde parou.

## Métrica de conversão

A métrica principal está detalhada em [METRICA_CONVERSAO.md](METRICA_CONVERSAO.md):

```
conversão =
usuários únicos que concluem a primeira aula
÷
usuários únicos que iniciam o teste de nível
```

Eventos planejados:

- `level_test_started`
- `level_test_completed`
- `first_lesson_opened`
- `first_lesson_completed`

A coleta agregada ainda não foi ativada; o MVP atual usa `localStorage`.

## Alinhamentos realizados

- números de exercícios das trilhas corrigidos para refletir o banco real;
- chamada principal da Home reescrita para deixar o próximo passo claro;
- duração do teste padronizada como 10–15 minutos;
- documentação de publicação da Vercel adicionada;
- documentação da aula alinhada às 13 etapas de conteúdo realmente apresentadas.

## Próximos passos

1. Manter o foco na versão desktop até a aprovação desta base.
2. Ativar a coleta agregada da métrica, sem dados pessoais.
3. Expandir as demonstrações interativas para outras aulas.
4. Depois, fazer uma rodada dedicada de experiência mobile.
5. Em uma fase posterior, avaliar autenticação, sincronização do progresso e tutora de IA.
