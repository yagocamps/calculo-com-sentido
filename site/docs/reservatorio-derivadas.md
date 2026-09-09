# Reservatório 3D de derivadas

Aula: /calculo-1/derivadas/variacao-instantanea#simulacao.
Integrado após Erros comuns, em Simulação (Aplicabilidade). Preserva a simulação de secante/tangente da aula seguinte.

## Experiências

1. Quanto entra agora? O tanque começa com 14 L aos 2 s. Controle de tempo, avanço de um segundo e reprodução mostram o volume e a taxa instantânea mudando juntos.
2. Olhando cada vez mais de perto: aos 3 s, a taxa é 6 L/s. Medições com intervalos 2; 1; 0,5; 0,1; 0,01 s produzem médias 8; 7; 6,5; 6,1; 6,01 L/s. Um anel dourado marca o nível ao final da medição.
3. E quando a água sai? Volume decrescente e taxa negativa. Aos 2 s: 86 L e −4 L/s. A taxa zero é exibida sem sinal negativo artificial.

## Modelo

Enchimento: V(t) = 10 + t², V′(t) = 2t.
Esvaziamento: V(t) = 90 − t², V′(t) = −2t.
Volume em L; tempo em s; taxa em L/s.
Taxa média: ±(2t + Δt), equivalente ao quociente de diferenças para Δt não nulo.
O intervalo mínimo de medição é 0,01 s; nunca se divide por zero.

Controle de 0 a 6 s, com medição futura até 8 s. Os volumes permanecem entre 0 e 100 L em toda essa faixa.
Aos 2 s no enchimento, a derivada é 4 L/s, mas entram 5 L no segundo completo até 3 s. O texto diferencia explicitamente taxa instantânea e variação durante um intervalo.
No instante inicial, a observação física aproxima pela direita.
O modelo usa vazão variável; não representa escoamento livre por gravidade.

## Interação e apresentação

- Reservatório cilíndrico transparente de seção constante, nível proporcional ao volume, estrutura metálica, bomba, tubulações de entrada/saída e controle azul de tempo.
- Arraste horizontal no controle 3D via raycasting, com atualização imediata e pausa da reprodução. Câmera orbital, zoom e restauração; teclado disponível nos controles HTML e para girar a câmera.
- Reprodução iniciada pela pessoa, limitada ao trecho observado. Atualizações em torno de 30 Hz; término, pausa e troca de experiência cancelam o ciclo. Sem movimento automático ao abrir a aula.
- Leituras não ficam anunciando cada quadro da reprodução para leitores de tela; ao pausar, as leituras voltam a ser anunciadas.
- A cena renderiza sob demanda e não cria objetos por quadro. Materiais, texturas, geometrias, sombras, observadores e eventos são liberados ao desmontar.
- Cena carregada dinamicamente sem SSR; falha de WebGL mantém controles, números e gráfico.
- Matemática, gráfico de volume com tangente/secante e entrada exata recolhidos.
- O estilo-base compartilha o CSS da ponte; o reservatório tem componentes, geometria, regras e estilos de leitura próprios.

## Verificação

57 testes aprovados, incluindo cinco novos sobre derivada versus diferença simétrica, médias convergentes, distinção entre taxa e mudança em um segundo, normalização/capacidade e associação à aula correta.
Build, ESLint, TypeScript e validação de conteúdo, KaTeX e leitura acessível aprovados.
No navegador: controle 3D e arraste com câmera girada; avanço de 2 para 3 s mostrando 19 L e 6 L/s; reprodução/pausa; médias 8 → 7 → 6,5 → 6,1 → 6,01; esvaziamento com sinal negativo; taxa zero; rejeição de texto inválido; parada em 6 s; reinício; ausência de erros/avisos no console.

