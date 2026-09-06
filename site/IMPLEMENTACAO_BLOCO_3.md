# Implementação da auditoria — bloco 3

Data: 5 de setembro de 2026. Base: `12ba4c5`.
Branch: `codex/correcoes-confiabilidade-limites`.

## Resultado

Este bloco trata as lacunas matemáticas dirigidas que restavam na auditoria, além da sequência de Riemann e da recuperação algébrica na Trilha Expressa. O catálogo passa a 167 aulas e o banco a 373 exercícios. A fase 5 de recursos avançados permanece fora do escopo. Não houve publicação no Vercel.

## Conteúdo e prática

| Conteúdo | Mudança implementada |
|---|---|
| Indeterminações | Expõe as sete formas usuais. Desenvolve as três potências indeterminadas com base positiva, transformação por logaritmo, retorno pela exponencial e contraexemplos com limites diferentes. O exemplo inicial compara três quocientes com a mesma forma 0/0. |
| Limites exponenciais e logarítmicos | Acrescenta os quocientes fundamentais, a passagem entre eles, escalas e outras bases. Explicita a desigualdade logarítmica admitida nesta etapa, deduz o limite por Confronto dos dois lados e indica uma construção por integrais para leitura posterior. Não usa L’Hôpital nem as derivadas que dependem desses limites para justificá-los. |
| Logaritmo em base geral | Desenvolve a derivada de logₐ(u), com mudança de base, cadeia, a constante ln a no denominador e condições da base e do argumento. Distingue a=1 na exponencial da base inválida no logaritmo. |
| Derivada da inversa | Nova aula com hipóteses suficientes, demonstração pelo quociente de diferenças, verificação pela cadeia, identificação do ponto correspondente e exemplo sem resolver a cúbica. A inversa de x³ em zero mostra por que a derivada não nula importa. Inclui três exercícios guiados, três do banco e quiz de saída com condição essencial. |
| Substituição definida | Acrescenta exemplo completo com troca de limites de integração, alternativa de voltar a x antes de avaliar, substituição decrescente e condições suficientes. A prática inclui uma substituição não monótona válida pela cadeia e pelo TFC, com integral de valor zero. |
| Área com cruzamento | O exemplo principal integra entre x e x² no intervalo [0,2], dividindo no cruzamento interior x=1. Calcula 1/6 e 5/6, totalizando 1; explica por que tomar o módulo da integral final, 2/3, perde área. |
| Função inversa | Distingue inversa sobre o contradomínio declarado, que exige bijetividade, de inversa sobre a imagem de uma função injetiva. Mostra a escolha de domínio e contradomínio para x² e exp. |
| Polinômios | A fórmula principal descreve a multiplicidade de um zero real, sem pressupor decomposição total em fatores lineares reais. Explicita o corpo numérico, fatores quadráticos e x²+1 como contraexemplo. Separa o polinômio nulo. |
| Riemann | Declara continuidade como condição suficiente e exige que a maior largura da partição tenda a zero. A aula vem antes de integral definida, TFC e aplicações. |

Os 23 novos exercícios estão ligados às nove aulas correspondentes. Seus tipos e níveis foram escolhidos pelo raciocínio exigido; este bloco não tenta preencher artificialmente os cinco níveis em cada aula. As associações das demais aulas ainda exigem revisão.

Os dados da revisão passam pela mesma fábrica que gera o catálogo e o conteúdo, preservando IDs de exercícios guiados anteriores. A nova aula entra nas rotas estáticas, busca, trilha e cálculo de progresso. Ao acrescentar uma aula, a porcentagem de conclusão da trilha pode diminuir, mantendo as conclusões já registradas.

## Sequência e Trilha Expressa

- Propriedades dos limites continua antes de substituição, conforme o bloco 1.
- Limites exponenciais e logarítmicos precede a classificação que usa essas ferramentas nas potências.
- A nova aula da inversa vem depois da introdução à cadeia, com links para os pré-requisitos.
- Riemann precede integral definida e TFC tanto na trilha regular quanto na seleção Expressa.
- A Expressa inclui frações algébricas, cancelamento com restrição e racionalização antes das técnicas de 0/0. Também inclui propriedades, fatoração e racionalização em limites.
- Remove a alegação sem evidência “70% das derivadas de prova”, as generalizações sobre toda P1 e a contagem fixa antiga de sete aulas de base. A seleção orienta comparar o roteiro com o programa da prova.

## Validação

- `npm run build`: 27 testes aprovados, validação de conteúdo, KaTeX e leitura acessível, lint, TypeScript e geração de 196 páginas.
- Cinco testes novos verificam associações ao banco, pré-requisitos, âncoras do quiz, ordem curricular, referências da Expressa e as 27 combinações de respostas do novo quiz.
- Os gabaritos numéricos de integrais são comparados com integração direta dos polinômios originais. Limites recebem verificações numéricas dos dois lados; a derivada da inversa recebe uma conferência independente por inversão numérica e quociente de diferenças. Essas sondagens são proteção contra regressão, não demonstrações matemáticas.
- KaTeX: 7.697 fórmulas na versão final, zero erros de renderização e zero avisos estritos. As sugestões de legibilidade de fórmulas inline continuam no relatório; não são uma certificação de acessibilidade completa.
- Navegador: nova aula carregada e exercícios vinculados presentes. Quiz com 2/3 e erro essencial recomendou reforço; o link abriu a seção correta. A questão `cur-dinv-2` aceitou 1/14 e registrou resolução.
- As três potências indeterminadas apareceram com seus quadros completos. Em 390 × 844, limites fundamentais e exemplo de área foram inspecionados visualmente, sem erro KaTeX nem rolagem horizontal da página. Nenhum erro ou aviso de console observado nesses fluxos.
- A troca do viewport desktop para mobile deixou o menu aberto; ele foi fechado antes da inspeção. A gestão de foco e interação do menu continua no escopo da auditoria mobile, sem aprovação global neste bloco.

## Referências de revisão

Os exemplos e a redação foram preparados para o projeto. As hipóteses e regras foram conferidas com as seguintes seções do OpenStax:

- [Derivatives of Inverse Functions](https://openstax.org/books/calculus-volume-1/pages/3-7-derivatives-of-inverse-functions): taxa da inversa no ponto correspondente e derivada não nula.
- [Derivatives of Exponential and Logarithmic Functions](https://openstax.org/books/calculus-volume-1/pages/3-9-derivatives-of-exponential-and-logarithmic-functions): bases gerais, logaritmos e cadeia.
- [Substitution](https://openstax.org/books/calculus-volume-1/pages/5-5-substitution): substituição em integrais definidas e transformação dos extremos.
- [Areas between Curves](https://openstax.org/books/calculus-volume-1/pages/6-1-areas-between-curves): distância vertical e divisão em regiões.
- [Integrals, Exponential Functions, and Logarithms](https://openstax.org/books/calculus-volume-1/pages/6-7-integrals-exponential-functions-and-logarithms): construção do logaritmo por integral, usada na leitura opcional da justificativa dos limites.

## Pendências preservadas

Ainda faltam o histórico comum e backup de checkpoints/exercícios guiados, as associações e sequências de prática das demais aulas, os sliders de reflexão/parábola, a origem pública do sitemap e a auditoria abrangente de mobile, teclado e leitor de tela. A aceitação pedagógica por estudantes e uma revisão editorial independente também não foram realizadas. Corrigir as lacunas identificadas não certifica todo o currículo nem encerra as fases 1 a 4.

## Como conferir

Execute `npm run build` na pasta `site`. Na prévia local, visite:

- `/calculo-1/derivadas/derivada-da-inversa`
- `/calculo-1/limites/limites-exponenciais-logaritmicos`
- `/calculo-1/limites/classificacao-indeterminacoes`
- `/calculo-1/integrais/substituicao`
- `/calculo-1/integrais/area-entre-curvas`
- `/trilha-expressa`
