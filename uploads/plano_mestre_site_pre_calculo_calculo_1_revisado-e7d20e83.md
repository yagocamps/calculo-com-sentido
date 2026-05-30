---
titulo: "Plano Mestre — Site Educacional de Pré-Cálculo e Cálculo 1"
projeto: "Cálculo com Sentido"
versao: "2.0"
data: "2026-05-28"
autor: "Yago"
status: "em desenvolvimento"
---

# Plano Mestre do Site Educacional de Pré-Cálculo e Cálculo 1

> Documento preparado para ser usado como briefing em outra IA, IDE ou ferramenta de desenvolvimento.
>
> **Convenção de numeração:** *Seção* = posição neste documento (0–46). *Etapa* = ordem de construção do produto. Uma seção pode descrever uma etapa — por isso os títulos trazem as duas referências (ex.: "11. Etapa 1 — Base do site").

## Sumário

**Parte 0 — Fundamentos do projeto**

- [0. Como usar este documento](#0-como-usar-este-documento)
- [1. Visão geral do projeto](#1-visão-geral-do-projeto)
- [2. Missão do site](#2-missão-do-site)
- [3. Público-alvo](#3-público-alvo)
- [4. Filosofia principal do site](#4-filosofia-principal-do-site)
- [5. Princípios pedagógicos obrigatórios](#5-princípios-pedagógicos-obrigatórios)
- [6. Regra obrigatória para todas as aulas](#6-regra-obrigatória-para-todas-as-aulas)
- [7. Regra obrigatória para todas as atividades](#7-regra-obrigatória-para-todas-as-atividades)
- [8. Estrutura geral do site](#8-estrutura-geral-do-site)
- [9. Jornada ideal do aluno](#9-jornada-ideal-do-aluno)
- [10. Stack de IA e fluxo de execução](#10-stack-de-inteligência-artificial-e-fluxo-de-execução)

**Parte 1 — Desenvolvimento do site**

- [11. Etapa 1 — Base do site](#11-etapa-1--base-do-site)
- [12. Etapa 2 — Página inicial](#12-etapa-2--página-inicial)
- [13. Etapa 3 — Teste de nível](#13-etapa-3--teste-de-nível)
- [14. Etapa 4 — Trilha de Pré-Cálculo](#14-etapa-4--trilha-de-pré-cálculo)
- [15. Etapa 5 — Modelo padrão de aula](#15-etapa-5--modelo-padrão-de-aula)
- [16. Etapa 6 — Modelo padrão de atividade](#16-etapa-6--modelo-padrão-de-atividade)
- [17. Etapa 7 — Tipos de atividades](#17-etapa-7--tipos-de-atividades)
- [18. Etapa 8 — Níveis de dificuldade dos exercícios](#18-etapa-8--níveis-de-dificuldade-dos-exercícios)
- [19. Etapa 9 — Trilha de Cálculo 1](#19-etapa-9--trilha-de-cálculo-1)
- [20. Etapa 10 — Resumos rápidos](#20-etapa-10--resumos-rápidos)
- [21. Etapa 11 — Glossário matemático](#21-etapa-11--glossário-matemático)
- [22. Etapa 12 — Área de progresso do aluno](#22-etapa-12--área-de-progresso-do-aluno)
- [23. Etapa 13 — IA tutora](#23-etapa-13--ia-tutora)
- [24. Áreas de aplicação nas atividades](#24-áreas-de-aplicação-que-devem-aparecer-nas-atividades)
- [25. Ordem recomendada de desenvolvimento](#25-ordem-recomendada-de-desenvolvimento-com-ias)
- [26. MVP inicial](#26-mvp-inicial-do-projeto)
- [27. Primeira versão recomendada](#27-primeira-versão-recomendada)

**Parte 2 — Prompts copiáveis para automação**

- [28. Prompt mestre de regras gerais](#28-prompt-mestre-para-regras-gerais-da-base-de-código)
- [29. Prompt de aula em Markdown](#29-prompt-para-gerar-o-conteúdo-de-uma-aula-em-markdown)
- [30. Prompt de banco de atividades](#30-prompt-para-gerar-banco-de-atividades-aplicadas)
- [31. Prompt de aula de Cálculo 1](#31-prompt-para-criar-aula-de-cálculo-1-acessível)
- [32. Prompt de tela/componente](#32-prompt-para-desenvolver-uma-tela-ou-componente-do-site)
- [33. Prompt do teste de nível](#33-prompt-para-programar-a-lógica-do-teste-de-nível)
- [34. Prompt do glossário](#34-prompt-para-estruturar-o-dicionário-de-dados-do-glossário)
- [35. Prompt da IA tutora](#35-prompt-base-da-api-da-ia-tutora)

**Parte 3 — Checklists de qualidade**

- [36. Checklist de aula](#36-checklist-geral-de-aula)
- [37. Checklist de atividade](#37-checklist-geral-de-atividade)
- [38. Checklist de tela](#38-checklist-geral-de-tela)
- [39. Regra final de desenvolvimento](#39-regra-final-para-desenvolvimento-com-ias)
- [40. Resumo da essência do projeto](#40-resumo-da-essência-do-projeto)

**Parte 4 — Fundação técnica (SEO, acessibilidade e dados)**

- [41. Regra de acessibilidade matemática e alt text](#41-regra-obrigatória-de-acessibilidade-matemática-e-alt-text)
- [42. Etapa SEO — descoberta no Google](#42-etapa-seo--descoberta-no-google)
- [43. Contrato de dados (interfaces TypeScript)](#43-contrato-de-dados-interfaces-typescript)
- [44. Pipeline de conteúdo — fonte única de verdade](#44-pipeline-de-conteúdo--fonte-única-de-verdade)
- [45. Arquitetura real do repositório](#45-arquitetura-real-do-repositório)

**Parte 5 — Roadmap de evolução**

- [46. Roadmap de evolução além do MVP](#46-roadmap-de-evolução-além-do-mvp)

---

## 0. Como usar este documento

Use este arquivo como **guia principal do projeto**.

Ele deve orientar:

- A criação da interface do site.
- A produção das aulas.
- A criação das atividades.
- A organização das trilhas.
- A criação dos prompts para outras IAs.
- A implementação futura da IA tutora.

### Regra principal

Não peça para a IA criar o projeto inteiro de uma vez.

Trabalhe sempre por etapas pequenas:

```text
1. Definir o objetivo da etapa.
2. Passar apenas o contexto necessário.
3. Criar uma tela, componente, aula ou módulo por vez.
4. Revisar.
5. Só depois avançar para a próxima etapa.
```

---

## 1. Visão geral do projeto

Estou desenvolvendo um site educacional de **Pré-Cálculo e Cálculo 1**.

O objetivo principal é ajudar alunos que tiveram dificuldade em matemática no ensino médio e estão entrando na faculdade.

O site deve ser:

- Simples.
- Intuitivo.
- Acolhedor.
- Progressivo.
- Aplicado.
- Fácil de interpretar.
- Útil para iniciantes e também para alunos avançados que queiram revisar.

A proposta é reduzir a dificuldade e a reprovação em **Cálculo 1**, uma das matérias que mais assustam os alunos no início da faculdade.

---

## 2. Missão do site

> Cálculo 1 é uma das matérias que mais assusta alunos no início da faculdade.  
> Muitos alunos não reprovam porque são incapazes, mas porque chegam sem uma base sólida e sem entender o sentido do conteúdo.  
>
> O objetivo deste site é mudar essa realidade.  
>
> Aqui, o aluno aprende Pré-Cálculo e Cálculo 1 de forma simples, aplicada e progressiva, começando do básico e avançando passo a passo até os principais conceitos da faculdade.

### Frase-manifesto (fonte única da mensagem)

> **Matemática com sentido: da função afim ao Teorema Fundamental do Cálculo, sem decoreba.**

Sempre que precisar resumir o projeto (página inicial, `meta description`, redes sociais, rodapé), use esta frase em vez de repetir a lista de adjetivos ("simples, intuitivo, acolhedor, progressivo, aplicado"). Os adjetivos descrevem o **como**; a frase-manifesto entrega o **resultado**, que é mais persuasivo.

---

## 3. Público-alvo

O site deve atender três tipos principais de alunos:

| Tipo de aluno | Necessidade |
|---|---|
| Iniciante | Aprender do zero, sem vergonha de não saber o básico |
| Intermediário | Revisar assuntos esquecidos do ensino médio |
| Avançado | Revisitar rapidamente conteúdos de Pré-Cálculo e Cálculo 1 |

---

## 4. Filosofia principal do site

O site não deve ser apenas um repositório de fórmulas.

Ele deve ensinar o aluno a entender:

1. O que é o conteúdo.
2. Para que serve.
3. Onde aparece na prática.
4. Como resolver.
5. Como interpretar o resultado.
6. Quais erros evitar.

A regra central do projeto é:

> Antes de ensinar a fórmula, ensine o sentido.  
> Antes de cobrar o cálculo, mostre a aplicação.

---

## 5. Princípios pedagógicos obrigatórios

Toda explicação deve responder:

```text
1. O que é isso?
2. Para que serve?
3. Onde aparece na prática?
4. Como eu uso?
5. O que o resultado significa?
```

### Regras de linguagem

- Usar linguagem simples.
- Evitar começar com definição formal pesada.
- Explicar como se fosse para alguém que tem medo de matemática.
- Apresentar a ideia intuitiva antes da fórmula.
- Mostrar exemplos aplicados.
- Resolver passo a passo.
- Interpretar o resultado final.
- Mostrar erros comuns.
- Não avançar para conteúdos difíceis sem preparar a base.

---

## 6. Regra obrigatória para todas as aulas

Toda aula deve ter uma seção chamada:

> **"Onde isso é usado?"**

Essa seção deve mostrar a aplicação prática do conteúdo em áreas reais.

> Acessibilidade é igualmente obrigatória: toda fórmula e todo gráfico de uma aula seguem a **Seção 41 — Regra de acessibilidade matemática e alt text**.

| Conteúdo | Aplicação prática |
|---|---|
| Função afim | Custo de produção, corrida de aplicativo, salário com comissão |
| Função quadrática | Lançamento de objetos, lucro máximo, área máxima |
| Função exponencial | Juros compostos, crescimento populacional, bactérias |
| Logaritmo | Escala de pH, terremotos, som, crescimento financeiro |
| Limites | Aproximações, velocidade instantânea, comportamento de gráficos |
| Derivadas | Taxa de variação, otimização, velocidade, lucro máximo |
| Integrais | Área, volume, consumo acumulado, distância percorrida |

---

## 7. Regra obrigatória para todas as atividades

Todas as atividades devem ter aplicabilidade prática.

Evitar exercícios totalmente abstratos sem contexto.

### Exemplo ruim

```text
Calcule f(3) para f(x) = 2x + 1.
```

### Exemplo melhor

```text
Uma empresa cobra uma taxa fixa de R$ 20,00 mais R$ 8,00 por hora de serviço.

Crie uma função que represente o valor total e calcule quanto será cobrado por 5 horas.
```

O aluno precisa entender a aplicação do cálculo, não apenas repetir procedimentos.

---

## 8. Estrutura geral do site

O site deve conter as seguintes áreas:

1. Início.
2. Teste de nível.
3. Pré-Cálculo.
4. Cálculo 1.
5. Exercícios.
6. Resumos rápidos.
7. Glossário.
8. Meu progresso.
9. Área de dúvidas ou IA tutora, futuramente.

---

## 9. Jornada ideal do aluno

A jornada do aluno deve ser clara e intuitiva:

```text
Entrou no site
↓
Faz um teste de nível
↓
Recebe uma recomendação de trilha
↓
Estuda uma aula curta
↓
Vê exemplos resolvidos
↓
Faz exercícios aplicados
↓
Recebe feedback
↓
Revisa os erros
↓
Avança para o próximo conteúdo
```

---

## 10. Stack de Inteligência Artificial e fluxo de execução

Para organizar o desenvolvimento, o projeto pode ser construído com ferramentas de IA com responsabilidades separadas.

> Observação: ajuste os nomes das ferramentas conforme as versões e recursos disponíveis no momento. O mais importante é manter a separação de responsabilidades.

| Ferramenta | Responsabilidade principal | Onde usar |
|---|---|---|
| Claude Artifacts / Claude Design | Criar protótipos visuais, componentes isolados, telas e experiências de UI/UX | Interface web do Claude |
| Claude Code | Criar estrutura inicial, editar arquivos, rodar comandos, organizar pastas e automatizar tarefas | Terminal ou ambiente conectado ao projeto |
| Google Antigravity | Agente de desenvolvimento para criar, editar, executar e validar partes do projeto | IDE/ambiente do Antigravity |
| Cursor Composer 2.5 | Integrar componentes, criar rotas, estados, lógica de frontend e organização do código | Cursor IDE |

### Regra de uso das IAs

Cada IA deve receber uma tarefa clara e limitada.

### Exemplo ruim

```text
Crie o site inteiro com todas as páginas, conteúdos, exercícios, banco de dados e IA tutora.
```

### Exemplo correto

```text
Crie apenas o componente visual do card de uma trilha de estudo.

O card deve mostrar:
- Nome da trilha.
- Descrição curta.
- Nível.
- Quantidade de aulas.
- Botão para começar.

Não implemente banco de dados, login ou IA tutora.
```

---

## Parte 1 — Desenvolvimento do site

---

## 11. Etapa 1 — Base do site

### Ferramenta recomendada

Claude Code, Google Antigravity ou Cursor Composer.

### Objetivo

Criar a estrutura inicial do site.

### O que desenvolver

- Estrutura do projeto.
- Página inicial.
- Menu de navegação.
- Página de trilhas.
- Página de aula modelo.
- Página de exercícios modelo.
- Página sobre o projeto.
- Layout simples, moderno e responsivo.

### Estrutura de pastas sugerida

```text
/src
  /app
    /page.tsx
    /pre-calculo
    /calculo-1
    /teste-de-nivel
    /glossario
    /resumos
  /components
    /layout
    /ui
    /trilhas
    /aulas
    /exercicios
  /data
    aulas.ts
    exercicios.ts
    trilhas.ts
    glossario.ts
  /lib
    utils.ts
```

> **Atenção:** esta é a estrutura *sugerida no início do projeto*. A arquitetura real evoluiu (route groups, bundles de aulas, camada de progresso). Consulte a **Seção 45 — Arquitetura real do repositório** para o mapa atualizado e confiável.

### Não desenvolver ainda

- Login.
- Banco de dados complexo.
- IA tutora.
- Pagamento.
- Gamificação avançada.
- Aplicativo mobile.

---

## 12. Etapa 2 — Página inicial

### Ferramenta recomendada

Claude Artifacts / Claude Design para o visual.  
Cursor Composer para integrar ao projeto.

### Objetivo

Apresentar a proposta do site de forma clara.

### A página inicial deve ter

- Nome do projeto.
- Texto de missão.
- Explicação do problema.
- Explicação da solução.
- Botão para começar o teste de nível.
- Botão para acessar Pré-Cálculo.
- Botão para acessar Cálculo 1.
- Seção explicando para quem é o site.
- Seção mostrando que as aulas são simples e aplicadas.
- Seção de benefícios.

### Mensagem principal

```text
Aprenda Pré-Cálculo e Cálculo 1 de forma simples, aplicada e progressiva.

Ideal para quem saiu do ensino médio com dificuldade e quer entrar na faculdade com mais confiança.
```

### Microcopy dos CTAs (texto oficial dos botões)

Os botões nunca devem usar rótulos de menu ("Acessar X"). Use copy orientada a benefício e ação. Estes são os textos canônicos:

| Onde | Rótulo fraco (não usar) | Copy oficial |
|---|---|---|
| CTA primário (herói) | "Começar o teste de nível" | **"Descobrir por onde começar (2 min)"** |
| CTA secundário | "Acessar Pré-Cálculo" | **"Revisar a base do zero →"** |
| CTA secundário | "Acessar Cálculo 1" | **"Entrar no Cálculo 1 sem medo →"** |
| Card de aula | "Abrir" | **"Estudar esta aula →"** |
| Fim de aula | "Próxima" | **"Continuar para: {próxima aula} →"** |

Regra: todo CTA primário deve deixar claro **o esforço** (ex.: "2 min") ou **o ganho** (ex.: "sem medo"), nunca apenas o destino.

### Prova social (placeholder até existirem dados reais)

Reservar uma faixa abaixo do herói para prova social. Enquanto não houver depoimentos reais, usar números verificáveis do próprio produto (sem inventar elogios):

```text
- "Mais de 120 aulas e exercícios aplicados, da função afim às integrais."
- "Trilha usada por estudantes de engenharia, administração e ciências."  ← só publicar quando for verdade
- Espaço para 2–3 depoimentos curtos (nome, curso, frase de resultado).
```

> Importante: nunca publicar prova social fabricada. Manter como placeholder estrutural até haver dados legítimos.

---

## 13. Etapa 3 — Teste de nível

### Ferramenta recomendada

Cursor Composer para a lógica de estado e pontuação.  
Claude Code ou Antigravity para gerar o JSON com perguntas em massa.

### Objetivo

Identificar o ponto ideal de início para o aluno.

### O teste deve avaliar

- Operações básicas.
- Frações.
- Potências.
- Raízes.
- Equações.
- Funções.
- Gráficos.
- Trigonometria.
- Noções de limite.

### Resultado do teste

O site deve indicar uma trilha recomendada.

| Pontuação | Recomendação |
|---|---|
| 0% a 40% | Começar pela base matemática |
| 41% a 70% | Começar por Pré-Cálculo |
| 71% a 100% | Pode iniciar Cálculo 1 |

### Exemplo de resultado

```text
Você está no nível Pré-Cálculo Básico.

Recomendamos começar por funções, equações e gráficos antes de entrar em limites.
```

---

## 14. Etapa 4 — Trilha de Pré-Cálculo

### Objetivo

Preparar o aluno para Cálculo 1.

---

### Módulo 1 — Fundamentos matemáticos

#### Conteúdos

- Operações básicas.
- Frações.
- Potenciação.
- Radiciação.
- Produtos notáveis.
- Fatoração.
- Equações do 1º grau.
- Equações do 2º grau.

#### Aplicações

- Cálculo de descontos.
- Divisão de custos.
- Escalas.
- Medidas.
- Problemas financeiros simples.
- Consumo de energia.
- Planejamento de orçamento.

---

### Módulo 2 — Álgebra essencial

#### Conteúdos

- Manipulação de expressões.
- Isolamento de variáveis.
- Inequações.
- Sistemas de equações.
- Simplificação algébrica.

#### Aplicações

- Orçamentos.
- Comparação de planos.
- Cálculo de custos.
- Problemas de produção.
- Equilíbrio entre receita e despesa.

---

### Módulo 3 — Funções

#### Conteúdos

- O que é uma função.
- Domínio e imagem.
- Função afim.
- Função quadrática.
- Função modular.
- Função exponencial.
- Função logarítmica.

#### Aplicações

- Corrida de aplicativo.
- Salário com comissão.
- Juros compostos.
- Crescimento populacional.
- Lucro de uma empresa.
- Custo de produção.

---

### Módulo 4 — Gráficos

#### Conteúdos

- Plano cartesiano.
- Leitura de gráficos.
- Crescimento e decrescimento.
- Interpretação visual de funções.
- Translação de gráficos.

#### Aplicações

- Análise de vendas.
- Evolução de preços.
- Crescimento de seguidores.
- Variação de temperatura.
- Consumo de energia.
- Evolução de notas ou desempenho.

---

### Módulo 5 — Trigonometria básica

#### Conteúdos

- Seno.
- Cosseno.
- Tangente.
- Ciclo trigonométrico.
- Identidades básicas.
- Gráficos trigonométricos simples.

#### Aplicações

- Inclinação de rampas.
- Altura de prédios.
- Ondas.
- Movimento circular.
- Engenharia.
- Arquitetura.

---

### Módulo 6 — Preparação para limites

#### Conteúdos

- Ideia de aproximação.
- Comportamento de funções.
- Valores próximos de um ponto.
- Ideia de tendência.
- Interpretação gráfica.

#### Aplicações

- Velocidade próxima de um instante.
- Tendência de crescimento.
- Aproximações em gráficos.
- Comportamento de sistemas.
- Leitura de mudanças pequenas.

---

## 15. Etapa 5 — Modelo padrão de aula

Toda aula deve seguir a mesma estrutura para facilitar a navegação do aluno.

> **Fonte do conteúdo:** o modelo abaixo é a estrutura editorial. Como esse conteúdo é gravado e renderizado (Markdown/MDX × TypeScript) está definido na **Seção 44 — Pipeline de conteúdo**. Siga-a para não criar a mesma aula em dois lugares.

### Estrutura obrigatória

```text
1. Título da aula.
2. Por que aprender isso?
3. Explicação simples.
4. Onde isso aparece na prática?
5. Exemplo aplicado.
6. Resolução passo a passo.
7. Interpretação do resultado.
8. Erros comuns.
9. Exercícios guiados.
10. Exercícios aplicados.
11. Resumo da aula.
12. Próxima aula recomendada.
```

---

## 16. Etapa 6 — Modelo padrão de atividade

Cada atividade deve seguir esta estrutura:

```text
1. Tema.
2. Área de aplicação.
3. Enunciado.
4. O que o aluno precisa identificar.
5. Dica.
6. Resolução passo a passo.
7. Resposta final.
8. Interpretação simples.
9. Erro comum.
```

---

## 17. Etapa 7 — Tipos de atividades

Cada tema deve ter quatro tipos de atividades.

### 1. Atividade de compreensão

Serve para verificar se o aluno entendeu a ideia.

```text
Em uma função do tipo f(x) = ax + b, o que o valor b representa em uma situação real?
```

### 2. Atividade de cálculo direto

Serve para treinar a técnica.

```text
Uma função representa o custo de um serviço: C(x) = 3x + 20.
Calcule o custo para 5 horas de serviço.
```

### 3. Atividade aplicada

Serve para conectar o conteúdo com a realidade.

```text
Um plano de internet cobra R$ 40,00 fixos mais R$ 5,00 por pacote extra de dados.
Monte a função do custo total.
```

### 4. Atividade de interpretação

Serve para fazer o aluno explicar o resultado.

```text
Na função C(x) = 5x + 40, o que significa o número 40? E o número 5?
```

---

## 18. Etapa 8 — Níveis de dificuldade dos exercícios

Os exercícios devem ser divididos em níveis.

| Nível | Característica |
|---|---|
| Fácil | Aplicação direta |
| Médio | Precisa interpretar |
| Difícil | Mistura conceitos |
| Desafio | Questões próximas da faculdade |

Cada aula deve ter:

- Exercícios fáceis.
- Exercícios médios.
- Exercícios difíceis.
- Desafios aplicados.

---

## 19. Etapa 9 — Trilha de Cálculo 1

### Objetivo

Ensinar Cálculo 1 de forma simples, intuitiva e aplicada para alunos que estão saindo do ensino médio e entrando na faculdade.

A trilha deve evitar começar com definições formais pesadas.

Primeiro vem a ideia. Depois vem a fórmula.

---

### Módulo 1 — Antes do Cálculo

#### Objetivo

Tirar o medo do aluno e explicar o que é Cálculo 1.

#### Conteúdos

- O que é Cálculo 1.
- Por que tanta gente reprova.
- O que o aluno precisa saber antes.
- Como estudar Cálculo.
- Relação entre função, gráfico, limite, derivada e integral.

#### Aplicações

- Movimento.
- Crescimento.
- Variação.
- Otimização.
- Acúmulo.

---

### Módulo 2 — Funções para Cálculo

#### Objetivo

Revisar funções com foco no que será usado em Cálculo 1.

#### Conteúdos

- Funções no contexto do Cálculo.
- Domínio e imagem.
- Gráficos.
- Crescimento e decrescimento.
- Interpretação de funções.
- Funções aplicadas a problemas reais.

#### Aplicações

- Custos.
- Receitas.
- Lucros.
- Velocidade.
- Temperatura.
- Produção.

---

### Módulo 3 — Limites sem trauma

#### Objetivo

Ensinar limites de forma visual e intuitiva.

#### Conteúdos

- Ideia de aproximação.
- Limite por tabela.
- Limite por gráfico.
- Limite por substituição.
- Limites laterais.
- Limites infinitos.
- Limites no infinito.
- Assíntotas.
- Aplicações de limites.

#### Aplicações

- Velocidade instantânea.
- Aproximação de valores.
- Tendência de gráficos.
- Crescimento sem limite.
- Comportamento de funções.

#### Explicação simples

```text
Limite é uma forma de estudar o que acontece com uma função quando chegamos cada vez mais perto de um valor.

Limite não é necessariamente o valor exato no ponto.
É o comportamento perto dele.
```

O aluno deve entender:

```text
Limite = tendência.
Limite = aproximação.
Limite não é sempre substituir o valor diretamente.
```

---

### Módulo 4 — Continuidade

#### Objetivo

Mostrar quando uma função não tem quebras.

#### Conteúdos

- Ideia visual de continuidade.
- Furos no gráfico.
- Saltos.
- Assíntotas.
- Continuidade em um ponto.
- Continuidade em intervalos.
- Aplicações em situações reais.

#### Aplicações

- Modelos sem interrupção.
- Temperatura ao longo do tempo.
- Movimento contínuo.
- Produção contínua.
- Sinais e gráficos.

---

### Módulo 5 — Derivadas com sentido

#### Objetivo

Fazer o aluno entender derivada como taxa de variação.

#### Conteúdos

- Variação média.
- Variação instantânea.
- Reta secante.
- Reta tangente.
- Definição de derivada.
- Regras de derivação.
- Interpretação da derivada.
- Aplicações práticas.

#### Aplicações

- Velocidade.
- Aceleração.
- Lucro marginal.
- Custo marginal.
- Crescimento de uma empresa.
- Variação de temperatura.
- Análise de desempenho.

#### Explicação simples

```text
Derivada mede o quanto algo está mudando em determinado momento.

Ela responde perguntas como:

Está aumentando?
Está diminuindo?
Com que velocidade está mudando?
Qual ponto gera lucro máximo?
Qual ponto gera custo mínimo?
```

---

### Módulo 6 — Aplicações de derivadas

#### Objetivo

Mostrar por que derivada é útil.

#### Conteúdos

- Crescimento e decrescimento.
- Máximos e mínimos.
- Pontos críticos.
- Concavidade.
- Otimização.
- Problemas de velocidade.
- Problemas de produção.
- Problemas de área e volume.

#### Aplicações

- Lucro máximo.
- Custo mínimo.
- Melhor aproveitamento de material.
- Otimização de produção.
- Área máxima.
- Volume máximo.

---

### Módulo 7 — Integrais com sentido

#### Objetivo

Ensinar integral como acumulação.

#### Conteúdos

- Ideia de soma.
- Área sob o gráfico.
- Integral indefinida.
- Integral definida.
- Propriedades da integral.
- Relação entre derivada e integral.
- Teorema Fundamental do Cálculo.
- Aplicações práticas.

#### Aplicações

- Área.
- Volume.
- Distância total.
- Consumo acumulado.
- Produção acumulada.
- Energia acumulada.

#### Explicação simples

```text
Integral pode ser entendida como uma soma acumulada.

Ela ajuda a calcular área, volume, distância total, consumo acumulado e produção acumulada.
```

---

## 20. Etapa 10 — Resumos rápidos

### Objetivo

Ajudar alunos que querem revisar rapidamente a matéria.

### O que deve ter

- Fórmulas principais.
- Mapas mentais.
- Resumo de cada módulo.
- Quando usar cada conteúdo.
- Exemplos curtos.
- Tabela de erros comuns.

### Páginas sugeridas

| Página | Conteúdo |
|---|---|
| Resumo de funções | Definição, tipos e gráficos |
| Resumo de limites | Regras e casos comuns |
| Resumo de derivadas | Fórmulas e aplicações |
| Resumo de integrais | Regras básicas |

---

## 21. Etapa 11 — Glossário matemático

### Objetivo

Ajudar alunos iniciantes a entenderem termos matemáticos.

### Termos importantes

- Variável.
- Constante.
- Função.
- Domínio.
- Imagem.
- Coeficiente.
- Limite.
- Derivada.
- Integral.
- Continuidade.
- Assíntota.
- Taxa de variação.
- Reta tangente.
- Reta secante.
- Ponto crítico.

Cada termo deve ter:

```text
1. Nome do termo.
2. Explicação simples.
3. Exemplo.
4. Onde aparece na matéria.
5. Link para aula relacionada.
```

---

## 22. Etapa 12 — Área de progresso do aluno

### Objetivo

Mostrar para o aluno onde ele está e o que precisa revisar.

### Funcionalidades

- Aulas concluídas.
- Exercícios resolvidos.
- Porcentagem de progresso.
- Módulos recomendados.
- Histórico de erros.
- Revisões sugeridas.

### Exemplo

```text
Você concluiu 60% de Pré-Cálculo.

Pontos fortes:
- Equações.
- Função afim.

Precisa revisar:
- Função quadrática.
- Logaritmos.
- Gráficos.
```

---

## 23. Etapa 13 — IA tutora

### Objetivo

Criar uma IA que ajude o aluno sem simplesmente entregar a resposta.

### Funções da IA

- Explicar de forma simples.
- Dar exemplos.
- Corrigir exercícios.
- Criar exercícios personalizados.
- Identificar dificuldades do aluno.
- Sugerir revisão.
- Explicar erros comuns.

### Regra da IA tutora

A IA nunca deve apenas entregar a resposta direta.

Ela deve seguir este padrão:

```text
1. Entender a dúvida do aluno.
2. Explicar o conceito.
3. Mostrar um exemplo parecido.
4. Guiar o aluno passo a passo.
5. Só depois mostrar a resposta final.
```

---

## 24. Áreas de aplicação que devem aparecer nas atividades

As atividades devem usar situações de áreas reais.

| Área | Exemplos de aplicação |
|---|---|
| Engenharia | Velocidade, aceleração, estruturas, otimização |
| Administração | Custo, receita, lucro, ponto de equilíbrio |
| Economia | Juros, crescimento, taxa de variação |
| Saúde | Dosagem, crescimento de bactérias, concentração |
| Tecnologia | Algoritmos, gráficos, processamento de dados |
| Física | Movimento, força, energia, velocidade |
| Arquitetura | Área, volume, inclinação, formas |
| Meio ambiente | Crescimento populacional, consumo, variação |
| Logística | Rotas, custos, otimização |
| Finanças | Juros compostos, investimentos, parcelas |

---

## 25. Ordem recomendada de desenvolvimento com IAs

A ordem estratégica para utilizar as ferramentas é:

```text
1. Criar a estrutura base do repositório.
2. Criar identidade visual e página inicial estática.
3. Integrar a página inicial ao código fonte.
4. Criar o protótipo visual do modelo padrão de aula.
5. Criar o protótipo visual do modelo padrão de exercícios.
6. Criar rotas dinâmicas para aulas e trilhas.
7. Criar conteúdo Markdown das aulas de Pré-Cálculo.
8. Criar lógica do teste de nível.
9. Gerar banco de dados de questões.
10. Criar sistema de progresso simples com LocalStorage.
11. Criar trilha de Cálculo 1.
12. Criar glossário.
13. Criar resumos rápidos.
14. Planejar IA tutora.
15. Implementar IA tutora somente depois do conteúdo base estar sólido.
```

---

## 26. MVP inicial do projeto

O MVP deve ser simples.

### O MVP deve ter

- Página inicial.
- Menu.
- Página de Pré-Cálculo.
- Página de Cálculo 1.
- Uma aula modelo.
- Uma lista de exercícios aplicados.
- Um resumo rápido.
- Um teste de nível simples.

### O MVP não deve ter

- Login complexo.
- Pagamento.
- Chat com IA.
- Banco de dados grande.
- Gamificação avançada.
- Aplicativo mobile.

---

## 27. Primeira versão recomendada

A primeira versão real do projeto deve conter:

```text
1. Página inicial.
2. Estrutura das trilhas.
3. Modelo de aula.
4. Modelo de exercício.
5. Aula de Função Afim.
6. Exercícios aplicados de Função Afim.
7. Teste de nível simples.
```

---

## Parte 2 — Prompts copiáveis para automação

---

## 28. Prompt mestre para regras gerais da base de código

### Guia de execução

- **IA recomendada:** Cursor Composer, Claude Code ou Antigravity.
- **Onde colar:** arquivo de regras do projeto ou prompt principal da IDE.
- **Objetivo:** manter o padrão educacional ao gerar qualquer componente.

```text
Estou desenvolvendo um site educacional de Pré-Cálculo e Cálculo 1.

O objetivo é ajudar alunos que tiveram dificuldade no ensino médio e estão entrando na faculdade. Quero reduzir a dificuldade em Cálculo 1, uma das matérias com maior índice de reprovação.

O conteúdo deve ser simples, intuitivo, progressivo e com aplicação prática.

O site deve atender:
- Alunos iniciantes que precisam aprender do zero.
- Alunos intermediários que precisam revisar a base.
- Alunos avançados que querem revisitar conteúdos.

Regras obrigatórias:
- Explique tudo de forma simples.
- Sempre considere que o aluno pode estar saindo do ensino médio com dificuldade.
- Toda aula deve mostrar onde o conteúdo é usado na prática.
- Toda atividade deve ter aplicabilidade em alguma área real.
- Use exemplos de engenharia, finanças, administração, saúde, tecnologia, física, arquitetura, meio ambiente, logística ou cotidiano.
- Não use linguagem acadêmica pesada no início.
- Apresente a ideia intuitiva antes da fórmula.
- Toda resolução deve ser passo a passo.
- Toda resposta deve interpretar o resultado em linguagem simples.
- Mostre erros comuns dos alunos.
- Não avance para conteúdos difíceis sem preparar a base.
- Desenvolva apenas a etapa solicitada, sem criar funcionalidades extras.
- A interface deve ser limpa, moderna, responsiva e intuitiva.
- O aluno deve sempre saber onde está, o que está aprendendo e qual é o próximo passo.

Nesta etapa, quero desenvolver:
[DESCREVA A ETAPA]
```

---

## 29. Prompt para gerar o conteúdo de uma aula em Markdown

### Guia de execução

- **IA recomendada:** Cursor Composer, Claude Code ou Antigravity.
- **Onde colar:** prompt da IDE ou terminal.
- **Exemplo de arquivo:** `/data/aulas/funcao-afim.md`.

```text
Crie uma aula estruturada em Markdown para o site educacional de Pré-Cálculo e Cálculo 1.

Tema da aula:
[TEMA]

Público-alvo:
Alunos que tiveram dificuldade em matemática no ensino médio e estão entrando na faculdade.

Objetivo:
Explicar o tema de forma simples, intuitiva, aplicada e progressiva.

Estrutura obrigatória:
1. Título da aula.
2. Por que aprender isso?
3. Explicação simples.
4. Onde isso aparece na prática?
5. Exemplo aplicado.
6. Resolução passo a passo.
7. Interpretação do resultado.
8. Erros comuns.
9. Exercícios guiados.
10. Exercícios aplicados.
11. Resumo da aula.
12. Próxima aula recomendada.

Regras:
- Não começar com definição formal pesada.
- Usar linguagem clara e acolhedora.
- Explicar como se fosse para alguém que tem medo de matemática.
- Mostrar aplicação real.
- Não pular etapas.
- Sempre explicar o significado do resultado.
```

---

## 30. Prompt para gerar banco de atividades aplicadas

### Guia de execução

- **IA recomendada:** Claude Code, Antigravity ou Cursor Composer.
- **Onde colar:** terminal ou prompt da IDE.
- **Ação:** gerar arquivo `.json` ou `.ts` com exercícios estruturados.

```text
Gere um arquivo estruturado com atividades aplicadas para o tema:
[TEMA]

Público-alvo:
Alunos que tiveram dificuldade no ensino médio e estão se preparando para Cálculo 1.

Regras:
- Todas as atividades devem ter aplicação prática.
- Use linguagem simples.
- Não crie exercícios puramente abstratos sem contexto.
- Divida em fácil, médio, difícil e desafio.
- Cada exercício deve ter uma situação real.
- Cada resolução deve ser passo a passo.
- Cada resposta deve ter interpretação final.
- Inclua erros comuns.
- Inclua dica antes da resolução.

Áreas que podem ser usadas:
- Engenharia.
- Administração.
- Finanças.
- Tecnologia.
- Física.
- Saúde.
- Meio ambiente.
- Arquitetura.
- Logística.
- Cotidiano.

Formato obrigatório para cada exercício:
1. Tema.
2. Área de aplicação.
3. Enunciado.
4. O que o aluno precisa identificar.
5. Dica.
6. Resolução passo a passo.
7. Resposta final.
8. Interpretação simples.
9. Erro comum.
```

---

## 31. Prompt para criar aula de Cálculo 1 acessível

### Guia de execução

- **IA recomendada:** Cursor Composer, Claude Code ou Antigravity.
- **Onde colar:** chat da IDE para popular os módulos avançados.

```text
Crie uma aula de Cálculo 1 no formato Markdown sobre:
[TEMA]

O público são alunos que estão saindo do ensino médio e entrando na faculdade. Muitos têm dificuldade com matemática, então a explicação precisa ser simples, intuitiva e acolhedora.

Objetivo:
Fazer o aluno entender o sentido do conteúdo antes de aprender a fórmula.

Estrutura obrigatória:
1. Título da aula.
2. Por que esse tema é importante?
3. Explicação intuitiva antes da fórmula.
4. Onde isso aparece na prática?
5. Exemplo do cotidiano ou de uma área profissional.
6. Explicação matemática simples.
7. Exemplo resolvido passo a passo.
8. Interpretação do resultado.
9. Erros comuns.
10. Exercícios aplicados.
11. Resumo final.
12. Próximo conteúdo recomendado.

Regras:
- Não começar com definição formal pesada.
- Usar linguagem clara.
- Explicar como se fosse para alguém que tem medo de matemática.
- Mostrar aplicação real.
- Não pular etapas.
- Apresentar a ideia intuitiva antes da fórmula.
- Interpretar todos os resultados.
```

---

## 32. Prompt para desenvolver uma tela ou componente do site

### Guia de execução

- **IA recomendada:** Claude Artifacts / Claude Design para visual.
- **Depois:** Cursor Composer para integrar o código ao projeto.

```text
Atue como um Especialista em UI/UX.

Desenvolva o layout visual em React/Tailwind para a tela:
[NOME DA TELA]

Contexto:
Estou criando um site educacional de Pré-Cálculo e Cálculo 1 para alunos que tiveram dificuldade no ensino médio e estão entrando na faculdade.

Objetivo da tela:
[EXPLIQUE O OBJETIVO DA TELA]

Regras de interface:
- Design limpo, moderno e responsivo.
- Linguagem simples.
- Navegação intuitiva.
- Evitar poluição visual.
- Mostrar claramente o próximo passo do aluno.
- Usar cards, seções bem separadas e botões objetivos.
- Pensar em alunos iniciantes.
- Não adicionar funcionalidades fora do solicitado.

Elementos obrigatórios:
[LISTE OS ELEMENTOS QUE A TELA DEVE TER]

Não desenvolver nesta etapa:
[LISTE O QUE NÃO DEVE SER FEITO]
```

---

## 33. Prompt para programar a lógica do teste de nível

### Guia de execução

- **IA recomendada:** Cursor Composer.
- **Onde colar:** prompt da IDE.
- **Exemplo:** implementar `TesteDeNivel.tsx`.

```text
Programe o componente interativo de teste de nível para o site.

Objetivo:
Identificar se o aluno deve começar por matemática básica, Pré-Cálculo ou Cálculo 1.

Conteúdos que devem ser avaliados:
- Operações básicas.
- Frações.
- Potências.
- Raízes.
- Equações.
- Funções.
- Gráficos.
- Trigonometria básica.
- Noções de limites.

Regras de sistema:
- Use estado para gerenciar a pergunta atual e a pontuação.
- As questões devem aparecer uma de cada vez de forma progressiva.
- Ao selecionar a alternativa, explique o resultado antes de avançar.
- Dar recomendação de trilha com base no desempenho final.

Classificação para o algoritmo:
- 0% a 40%: começar pela base matemática.
- 41% a 70%: começar por Pré-Cálculo.
- 71% a 100%: pode iniciar Cálculo 1.

Inclua um mock JSON interno com as perguntas contendo:
- Enunciado.
- Alternativas.
- Resposta correta.
- Explicação simples.
- Conteúdo avaliado.
- Nível de dificuldade.
```

---

## 34. Prompt para estruturar o dicionário de dados do glossário

### Guia de execução

- **IA recomendada:** Claude Code, Antigravity ou Cursor Composer.
- **Onde colar:** terminal ou prompt da IDE.
- **Ação:** compilar em arquivo estático para o frontend consumir.

```text
Crie uma estrutura de dados em JSON servindo como glossário para o site educacional.

Público-alvo:
Alunos iniciantes que podem ter dificuldade com termos matemáticos.

Para cada termo, inclua as chaves:
1. nome.
2. explicacaoSimples.
3. exemploPratico.
4. ondeAparece.
5. aulaRelacionadaSlug.

Termos a serem processados:
- Variável.
- Constante.
- Função.
- Domínio.
- Imagem.
- Coeficiente.
- Limite.
- Derivada.
- Integral.
- Continuidade.
- Assíntota.
- Taxa de variação.
- Reta tangente.
- Reta secante.
- Ponto crítico.

Regras:
- Usar linguagem simples.
- Evitar definição acadêmica pesada.
- Usar exemplos práticos.
```

---

## 35. Prompt base da API da IA tutora

### Guia de execução

- **IA recomendada:** Cursor Composer.
- **Onde colar:** instruções de sistema do backend, rota serverless ou chamada de API do LLM.
- **Uso:** implementação futura.

```text
Atue como o prompt de sistema para uma IA tutora integrada a um site educacional de Pré-Cálculo e Cálculo 1.

Objetivo da IA:
Ajudar alunos com dificuldade em matemática a entender o conteúdo de forma simples, aplicada e passo a passo.

Regras do motor:
- Não entregar a resposta diretamente no início em hipótese alguma.
- Primeiro analisar a requisição e entender a dúvida do aluno.
- Explicar o conceito de forma simples e livre de jargões densos.
- Usar exemplos práticos da área de atuação do aluno ou do cotidiano.
- Guiar o aluno passo a passo.
- Mostrar erros comuns.
- Incentivar o aluno a tentar o próximo passo.
- Só mostrar a resposta final depois da explicação e interação.
- Nunca ridicularizar uma dúvida matemática.
- Usar linguagem acolhedora.
- Adaptar a explicação ao nível atual do aluno: iniciante, intermediário ou avançado.

Fluxo de resposta:
1. Entender a dúvida.
2. Identificar o conteúdo.
3. Explicar a ideia principal.
4. Dar um exemplo parecido.
5. Guiar a resolução do problema original.
6. Verificar entendimento.
7. Mostrar a resposta final.
8. Recomendar revisão de tópicos base, se necessário.
```

---

## Parte 3 — Checklists de qualidade

---

## 36. Checklist geral de aula

Antes de considerar uma aula pronta, verificar:

```text
[ ] A aula tem explicação simples?
[ ] Mostra por que o conteúdo é importante?
[ ] Mostra onde o conteúdo é usado na prática?
[ ] Tem exemplo aplicado?
[ ] Tem resolução passo a passo?
[ ] Interpreta o resultado?
[ ] Mostra erros comuns?
[ ] Tem exercícios aplicados?
[ ] Tem resumo final?
[ ] Indica o próximo conteúdo?
```

---

## 37. Checklist geral de atividade

Antes de considerar uma atividade pronta, verificar:

```text
[ ] A atividade tem contexto real?
[ ] A linguagem é simples?
[ ] O aluno sabe o que precisa encontrar?
[ ] Tem dica?
[ ] Tem resolução passo a passo?
[ ] Tem interpretação final?
[ ] Mostra erro comum?
[ ] Está no nível correto de dificuldade?
```

---

## 38. Checklist geral de tela

Antes de considerar uma tela pronta, verificar:

```text
[ ] A tela é simples e intuitiva?
[ ] O aluno entende o objetivo da tela?
[ ] Existe um próximo passo claro?
[ ] A interface está limpa?
[ ] Funciona bem no celular?
[ ] Não tem funcionalidades desnecessárias?
[ ] Está alinhada com o objetivo do projeto?

Acessibilidade e SEO (obrigatórios):
[ ] Contraste de cor passa no WCAG AA (texto normal 4.5:1, grande 3:1)?
[ ] Navegação 100% por teclado, com foco visível (:focus-visible)?
[ ] Respeita prefers-reduced-motion (sem animações forçadas)?
[ ] Toda imagem/gráfico tem alt text descritivo (ver Seção 41)?
[ ] Toda fórmula é legível por leitor de tela (ver Seção 41)?
[ ] A página tem <title> único e meta description (ver Seção 42)?
[ ] Há um único <h1> e a hierarquia de headings é lógica?
```

---

## 39. Regra final para desenvolvimento com IAs

Sempre desenvolva o projeto de forma modular.

Nunca peça para as ferramentas gerarem múltiplos arquivos, componentes complexos e lógicas misturadas em um único prompt.

### Forma errada

```text
Crie o projeto inteiro, as rotas de Pré-Cálculo, a Home e o banco de dados das atividades tudo de uma vez.
```

### Forma correta

```text
No Claude Artifacts:
Crie apenas a UI do componente de card para a trilha de Cálculo.

No Cursor:
Integre esse card na página Home e faça ele navegar para a rota correta.
```

---

## 40. Resumo da essência do projeto

O site deve ser:

- Simples.
- Intuitivo.
- Aplicado.
- Progressivo.
- Acolhedor.
- Visual.
- Fácil de navegar.
- Focado em reduzir a dificuldade em Cálculo 1.

A essência do projeto é:

> Ensinar matemática com sentido, aplicação e clareza para que o aluno não apenas resolva contas, mas entenda o que está fazendo.

---

## Parte 4 — Fundação técnica (SEO, acessibilidade e dados)

> Esta parte foi adicionada na versão 2.0 do plano. Ela cobre os pilares que faltavam: descoberta no Google, acessibilidade (especialmente de conteúdo matemático) e um contrato de dados único para o conteúdo.

---

## 41. Regra obrigatória de acessibilidade matemática e alt text

Num site de matemática, **acessibilidade não é opcional** — fórmulas e gráficos são o conteúdo principal e, se mal implementados, ficam invisíveis para leitores de tela e para o Google.

### 41.1 Fórmulas

- **Nunca** renderizar fórmula como imagem (`.png`/`.jpg`) sem alternativa textual.
- Renderizar com **KaTeX** (ou MathML) gerando marcação acessível.
- Toda fórmula deve ter uma descrição textual em linguagem natural.

```text
❌ Ruim:   <img src="formula.png">
⚠️ Frágil: apenas LaTeX cru exibido como texto
✅ Bom:    KaTeX + aria-label / texto descritivo
```

Exemplo de descrição textual obrigatória:

```text
Fórmula:    f(x) = a·x + b
Descrição:  "f de x igual a a vezes x, mais b"
Sentido:    "a é a taxa de variação; b é o valor inicial"
```

### 41.2 Gráficos

Todo gráfico precisa de **alt text descritivo** — não o nome do arquivo, mas o que o gráfico mostra:

```text
❌ alt="grafico1.png"
❌ alt="gráfico"
✅ alt="Reta crescente cruzando o eixo y em 6; sobe 2,40 a cada unidade de x"
```

- Gráficos complexos devem ter, além do `alt`, uma **tabela de dados** equivalente ou um parágrafo de descrição longa (`aria-describedby`).
- Não usar **apenas cor** para transmitir informação (ex.: "a linha vermelha sobe") — adicionar rótulo/forma.

### 41.3 Checklist de acessibilidade da aula

```text
[ ] Toda fórmula renderiza com KaTeX/MathML?
[ ] Toda fórmula tem leitura textual (aria-label ou parágrafo)?
[ ] Todo gráfico tem alt descritivo (não o nome do arquivo)?
[ ] Gráfico essencial tem tabela/descrição longa alternativa?
[ ] Informação nunca depende só de cor?
[ ] Contraste do texto passa em WCAG AA?
```

---

## 42. Etapa SEO — descoberta no Google

### Ferramenta recomendada

Cursor Composer (Next.js Metadata API) + verificação no Google Search Console.

### Objetivo

Fazer cada aula, resumo e página de trilha ser encontrável por quem pesquisa dúvidas de matemática no Google. Conteúdo educacional tem altíssimo potencial de busca orgânica.

### 42.1 Metadados por página

| Elemento | Regra |
|---|---|
| `<title>` | Único por página, até ~60 caracteres. Padrão: `{Título da aula} · Cálculo com Sentido` |
| `meta description` | 120–155 caracteres, com benefício + aplicação. Uma por página, nunca duplicada |
| URL/slug | Curto, em kebab-case, sem acento: `/calculo-1/limites/ideia-de-limite` |
| `canonical` | Sempre definido para evitar conteúdo duplicado |
| Open Graph / Twitter Card | `og:title`, `og:description`, `og:image` (imagem 1200×630 por trilha) |

Exemplo de meta description (aula de função afim):

```text
Entenda a função afim pela ideia, não pela decoreba: parte fixa + parte
variável, com exemplos de corrida de app e conta de luz. Aula de 12 min.
```

### 42.2 Dados estruturados (JSON-LD)

Cada aula deve emitir JSON-LD `LearningResource`/`Course`; a página de dúvidas, `FAQPage`.

```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Função afim",
  "description": "Função afim pela ideia: parte fixa + parte variável.",
  "educationalLevel": "Ensino superior introdutório",
  "learningResourceType": "Aula",
  "inLanguage": "pt-BR",
  "isPartOf": { "@type": "Course", "name": "Pré-Cálculo" },
  "teaches": "Função afim, taxa de variação, valor inicial"
}
```

### 42.3 Infraestrutura

```text
[ ] sitemap.xml gerado automaticamente (todas as aulas publicadas)
[ ] robots.txt liberando indexação das páginas públicas
[ ] Next.js generateMetadata por rota dinâmica
[ ] Imagem OG por trilha (Pré-Cálculo / Cálculo 1)
[ ] Headings semânticos (1 h1 por página)
```

### 42.4 SEO de topo de funil (aquisição)

Além das páginas de produto, criar conteúdo que atrai busca:

- "Como estudar para a prova de Cálculo 1"
- "Por que tanta gente reprova em Cálculo 1 (e como evitar)"
- "Pré-Cálculo: o que revisar antes da faculdade"

Esses textos linkam para as trilhas e capturam o aluno antes mesmo de ele procurar o conteúdo específico.

---

## 43. Contrato de dados (interfaces TypeScript)

Para evitar que cada etapa/IA invente um formato diferente, o conteúdo segue **interfaces fixas**. Estas são a fonte de verdade do schema (espelham `src/data/aulas/types.ts` e `src/data/exercicios.ts`).

### 43.1 Aula

```ts
type AulaContent = {
  meta: {
    title: string;
    moduleSlug: string;
    moduleTitle: string;
    lessonNumber: number;
    duration: string;
    level: string;
    readingNotes: string[];
    glossaryTerms: string[];
    nextLesson?: { title: string; href: string };
  };
  porQue: { title: string; paragraphs: string[] };
  explicacao: {
    title: string;
    paragraphs: string[];
    callout?: string;
    formula: string;
    formulaLegend?: string;
  };
  ondeAparece: { title: string; items: { label: string; detail: string }[] };
  exemplo: { title: string; situacao: string };
  passos: { title: string; steps: { title: string; detail: string }[] };
  interpretacao: { title: string; paragraphs: string[] };
  erros: { title: string; items: string[] };
  exerciciosGuiados: { title: string; exercises: AulaExercise[] };
  exerciciosAplicados: { title: string; intro: string; exerciseIds: string[] };
  resumo: { title: string; bullets: string[] };
};
```

### 43.2 Exercício

```ts
type ExerciseLevel = "facil" | "medio" | "dificil" | "desafio";
type ExerciseType = "compreensao" | "calculo" | "aplicada" | "interpretacao";

type Exercicio = {
  id: string;
  num: string;
  title: string;
  tema: string;
  temaSlug: string;
  area: string;            // engenharia, finanças, física, cotidiano...
  type: ExerciseType;
  level: ExerciseLevel;
  enunciado: string;
  identificar: string | string[];
  dica: string;
  resolucao: string;
  resolucaoSteps?: string[];
  resposta: string;
  interpretacao: string;
  erroComum: string;
};
```

### 43.3 Glossário

```ts
type GlossarioEntry = {
  termo: string;
  definicao: string;       // linguagem simples, sem academiquês
  exemplo?: string;
  aulaRelacionadaSlug?: string;  // a adicionar: link para a aula
};
```

> Qualquer prompt de geração de conteúdo (Seções 29, 30, 34) deve produzir objetos compatíveis com estas interfaces.

---

## 44. Pipeline de conteúdo — fonte única de verdade

**Problema:** hoje existe conteúdo em `src/content/aulas/funcao-afim.md` **e** em `src/data/aulas/funcao-afim.ts`. Dois lugares = risco de divergência.

### Decisão (estado atual)

```text
FONTE DE VERDADE = arquivos TypeScript em src/data/aulas/**
Os arquivos .md são RASCUNHOS EDITORIAIS e não são renderizados.
```

Regras enquanto o estado atual valer:

- Todo `.md` editorial deve começar com um aviso: *"Rascunho editorial — a versão renderizada é o `.ts`."*
- Não criar `.md` e `.ts` para a mesma aula sem marcar qual manda.
- Ao publicar, o conteúdo vai para o `.ts` tipado (Seção 43).

### Evolução recomendada (futuro)

Migrar para **MDX como fonte única**, compilado para dados tipados em build:

```text
content/aulas/*.mdx  ──(build)──>  dados tipados (AulaContent)  ──>  render
```

Vantagens: edição em Markdown (mais fácil para conteúdo), tipos garantidos no build, fim da duplicação. Tratar como uma etapa própria, não misturar com geração de conteúdo.

---

## 45. Arquitetura real do repositório

Mapa atualizado do projeto (substitui a estrutura sugerida na Seção 11):

```text
site/
  src/
    app/
      (site)/                      # route group com layout do site
        page.tsx                   # Home
        pre-calculo/
          page.tsx
          [modulo]/page.tsx
          [modulo]/[aula]/page.tsx
        calculo-1/
          page.tsx
          [modulo]/page.tsx
          [modulo]/[aula]/page.tsx
        teste-de-nivel/  exercicios/  resumos/  glossario/
        progresso/  sobre/
      layout.tsx
    components/
      layout/   ui/   trilhas/   aulas/   exercicios/
      teste/    home/   progresso/
    data/
      pre-calculo.ts               # módulos/aulas Pré-Cálculo
      calculo-1.ts                 # módulos/aulas Cálculo 1
      exercicios.ts  glossario.ts  home.ts  teste-nivel.ts
      trilha-module.ts             # tipos compartilhados de trilha
      aulas/
        types.ts                   # AulaContent (Seção 43)
        funcao-afim.ts  o-que-e-calculo-1.ts  ideia-de-limite.ts
        calculo-1/
          register.ts              # registra bundles de aulas de Cálculo 1
          antes-do-calculo.ts  limites.ts  derivadas.ts ...
    lib/
      aulas.ts                     # registry + getAulaContent / hasAulaContent
      progress.ts                  # estado em localStorage (ccs-progress)
      progress-utils.ts            # normalização + % combinado das trilhas
      progress-dashboard.ts        # dashboard de /progresso
      trilhas.ts                   # progresso por módulo/trilha
      navigation.ts  utils.ts  exercicios.ts  teste-nivel.ts
    content/
      aulas/*.md                   # rascunhos editoriais (ver Seção 44)
```

Pontos-chave que o documento antigo não capturava:

- **Route groups** `(site)` para layout compartilhado.
- **Duas trilhas** (`pre-calculo.ts` e `calculo-1.ts`), não uma só `aulas.ts`.
- Aulas de Cálculo 1 agrupadas em **bundles por módulo** + um `register.ts`.
- Camada de **progresso** dedicada (`progress*.ts`) usando `localStorage` e o evento `ccs-progress-update`.

---

## Parte 5 — Roadmap de evolução

---

## 46. Roadmap de evolução além do MVP

Funcionalidades para elevar o site, em ordem de impacto × esforço. Cada item é uma **etapa própria** (regra da Seção 39: uma de cada vez).

| Prioridade | Funcionalidade | Por que importa | Esforço |
|---|---|---|---|
| 1 | **Gráficos interativos** (function-plot / Desmos / GeoGebra) | Ver a reta tangente se mover ensina mais que texto; maior diferencial | Médio |
| 2 | **Renderização KaTeX acessível** | Profissionaliza o visual e resolve a Seção 41 | Médio |
| 3 | **Busca funcional (Cmd+K)** sobre aulas/glossário | Hoje o campo de busca é decorativo; destrava navegação | Médio |
| 4 | **Revisão espaçada / "Revisar hoje"** | Encaixa na Seção 22 (progresso); aumenta retenção | Médio |
| 5 | **Exportar resumo em PDF / modo impressão** | Alunos amam material pré-prova offline | Baixo |
| 6 | **Onboarding pós-teste de nível** com plano semanal | Transforma resultado em ação concreta | Médio |
| 7 | **Dark mode** + `prefers-reduced-motion` | Público estuda à noite; acessibilidade | Baixo |
| 8 | **Analytics de abandono** | Descobrir onde o aluno trava; alimenta a IA tutora | Baixo |

> Regra de sequência: implementar do topo para baixo, validando cada etapa antes da próxima. Itens 2 e 7 são pré-requisitos de qualidade; 1 e 3 são os maiores diferenciais percebidos pelo aluno.
