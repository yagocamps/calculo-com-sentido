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
- Histórico por cenário, tabela acessível e leitura com três casas decimais. Gráfico e tabela ficam em um painel recolhível.
- Bancada 3D em Three.js, com câmera orbital, zoom, vistas de frente/topo/perspectiva, materiais metálicos, luz e sombras. O gráfico matemático continua em SVG.
- Conforme o pedido posterior de focar somente na simulação, foram retirados do simulador o quiz, os textos extensos e a transferência para LMTD. As seções da aula permanecem independentes.
- A cena mostra posições de ensaio, sem alegar reprodução em tempo real. As transições de posição duram 400 ms e respeitam `prefers-reduced-motion`.

## Ajustes de precisão em relação ao texto recebido

1. A constante cinética μₖ = 0,25 determina 5 N durante o movimento. Ela não determina o máximo do atrito estático: seria necessário μₛ. Por isso não se apresenta uma faixa estática de ±5 N. Referência: [OpenStax, Friction](https://openstax.org/books/university-physics-volume-1/pages/6-2-friction).
2. A inspeção de zero em B é independente do controle do ensaio, preservando a exigência de que o intervalo controlado nunca seja zero.
3. C não usa simultaneamente a trajetória s(t) = t²: velocidades negativas são comandos de ensaios independentes, e não um tempo negativo na trajetória de A/B.
4. O modo de ruído, explicitamente opcional na especificação, não está habilitado nesta versão. Todas as leituras representam o modelo ideal.

## Estrutura e verificação

`src/lib/motion-limit.ts` contém as regras de domínio, leitura, limites do controle e passos.
`MotionLimitBench.tsx` deriva bancada, gráfico e leitura de um único estado físico; histórico, rascunho de entrada e inspeção são estado de interface. A chave do cenário reinicia a experiência inteira.
`MotionBenchScene.tsx` carrega em um módulo separado no navegador, renderiza sob demanda e libera geometria, materiais, texturas, controles e observadores ao desmontar. Sem WebGL, informa a indisponibilidade e mantém os controles e leituras textuais.

`npm run build` executa testes, conteúdo, KaTeX, leitura acessível, ESLint, TypeScript e geração de páginas.
`tests/motion-limit.test.ts` cobre quociente original versus simplificação, exclusão de zero, retorno do firmware, sinais do atrito, limites de entrada, magnetismo e navegação por teclado.

As regras matemáticas já foram verificadas no navegador integrado: aproximações dos dois lados, rejeição de zero digitado, arraste através de zero, ajuste de entrada fora da faixa, teclado, inspeção do firmware, troca de cenário e reinício. Na versão 3D, a inspeção visual confirmou o modelo, a vista superior, o deslocamento até a referência e as forças opostas ao movimento. Entrada zero, inspeção do firmware e remoção do quiz foram conferidas novamente. Build, TypeScript, lint e 46 testes aprovados.
