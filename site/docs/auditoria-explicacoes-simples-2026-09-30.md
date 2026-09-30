# Auditoria de leitura e apresentação — Explicação simples

Data: 30/09/2026.

## Escopo e método

Foram percorridas as seções `#explicacao` das 177 aulas publicadas, em desktop, com inspeção das caixas de texto e dos traços dos SVGs no navegador. A seção contém 161 gráficos estáticos e 9 gráficos de laboratórios. Foram comparadas as medidas antes e depois das alterações, incluindo uma passagem com tema escuro e ampliação de texto de 125%.

A inspeção procura cortes nas bordas, interseções entre textos e traços, colisões entre rótulos, erros de renderização KaTeX e fórmulas que escapam de seus contêineres. Dicas ocultas e textos exclusivos para leitores de tela não são considerados cortes de conteúdo visível. As medidas complementam a conferência visual; não substituem a avaliação pedagógica de cada conceito.

## Problemas identificados e correções

| Problema | Levantamento inicial | Correção |
| --- | --- | --- |
| Rótulos sobre traços | 82 rótulos em 59 aulas | Posicionamento próximo da referência, com espaço reservado em torno do texto, evitando os traços e outros rótulos. Anotações são desenhadas depois da geometria e recebem um contorno na cor do fundo. |
| Números e nomes de eixos cortados | 27 textos em 10 aulas | Margens ajustadas ao comprimento dos valores, inclusive no extremo direito. O nome do eixo vertical passa a começar dentro do quadro. |
| Curvas invadindo a margem | Exemplos de regras de derivação e outros gráficos | As curvas, áreas e retângulos respeitam a janela do gráfico; anotações e círculos vazados permanecem independentes dessa janela. |
| Fórmulas e títulos apertados | Cabeçalhos de demonstrações e fórmulas extensas | Títulos ocupam o espaço restante, botões mantêm sua largura e fórmulas extensas têm rolagem horizontal local. |
| Marcas de formatação aparecendo no texto | Trechos com `**...**` | O destaque é renderizado como negrito, incluindo as fórmulas contidas nele. |
| Leitura incorreta de expoentes | Por exemplo, `1^\infty` era lido com parte do comando perdida | Comandos completos em argumentos sem chaves são preservados: “1 elevado a infinito”. |
| Rótulos variáveis em laboratórios | Coordenadas do círculo e nomes das faixas do produto | Coordenadas são posicionadas conforme o quadrante. Nomes de faixas pequenas passam para fora delas, com linhas de referência. |

## Verificação

- A passagem final pelas 177 seções não apontou textos de SVG cortados, colisões entre rótulos e traços ou entre rótulos, nem fórmulas saindo do espaço reservado.
- Foram exercitados os 73 ângulos disponíveis no círculo trigonométrico e os 24 incrementos do laboratório da regra do produto.
- Testes adicionais verificam margens monetárias, preservação de escala geométrica, separação dos três rótulos da regra da soma, conservação de todas as anotações do catálogo e leitura de expoentes.
- 94 testes passaram; validações de conteúdo, KaTeX e acessibilidade sem falhas. Lint e geração de produção concluídos.

As fórmulas e os dados das funções dos gráficos foram preservados. O piloto interativo de distributiva anteriormente removido não faz parte desta alteração.
