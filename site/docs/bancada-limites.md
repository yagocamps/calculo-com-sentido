# Bancada de ensaio de movimento

Implementação da especificação `limites-bancada-especificacao.txt`, integrada em
`/calculo-1/limites/ideia-de-limite#bancada-limites`.
Ela ocupa o tópico 08, “Simulação (Aplicabilidade)”, após “Erros comuns”,
com entrada própria no índice em `#simulacao`.

## Comportamento

- A: posição s(t) = t², referência em t = 3 s, quociente de diferenças em intervalos não nulos e limite de 6 m/s.
- B: mesmo experimento, com inspeção separada do retorno 0 do firmware em Δt = 0. O gráfico mantém o furo (0, 6) e o ponto preenchido (0, 0).
- C: ensaios de velocidade comandada no mesmo aparato; força cinética oposta ao movimento, com limites laterais +5 N e −5 N. Os ramos e o marcador não são animados através da descontinuidade.
- Arraste contínuo com atração às marcas, parada antes de atravessar zero, entrada decimal com aplicação explícita, aproximação por passos, setas do teclado e reinício.
- Histórico por cenário, tabela acessível, leitura com três casas decimais, perguntas com feedback e transferência para LMTD.
- SVG próprio, temas existentes, adaptação à largura da coluna, alvos de 44 px e respeito a `prefers-reduced-motion`.

## Ajustes de precisão em relação ao texto recebido

1. A constante cinética μₖ = 0,25 determina 5 N durante o movimento. Ela não determina o máximo do atrito estático: seria necessário μₛ. Por isso não se apresenta uma faixa estática de ±5 N. Referência: [OpenStax, Friction](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction).
2. A inspeção de zero em B é independente do controle do ensaio, preservando a exigência de que o intervalo controlado nunca seja zero.
3. C não usa simultaneamente a trajetória s(t) = t²: velocidades negativas são comandos de ensaios independentes, e não um tempo negativo na trajetória de A/B.
4. O modo de ruído, explicitamente opcional na especificação, não está habilitado nesta versão. Todas as leituras representam o modelo ideal.

## Estrutura e verificação

`src/lib/motion-limit.ts` contém as regras de domínio, leitura, limites do controle e passos.
`MotionLimitBench.tsx` deriva bancada, gráfico e leitura de um único estado físico; histórico, rascunho de entrada, inspeção e respostas são estado de interface. A chave do cenário reinicia a experiência inteira.

`npm run build` executa testes, conteúdo, KaTeX, leitura acessível, ESLint, TypeScript e geração de páginas.
`tests/motion-limit.test.ts` cobre quociente original versus simplificação, exclusão de zero, retorno do firmware, sinais do atrito, limites de entrada, magnetismo e navegação por teclado.

Verificação funcional realizada no navegador integrado: aproximações completas dos dois lados, rejeição de zero digitado, arraste através de zero, ajuste de entrada fora da faixa, teclado, inspeção do firmware, troca de cenário sem resíduos, três respostas por teclado, reinício do histórico e ausência de erros no console. Redimensionamento conferido em larguras de desktop.
