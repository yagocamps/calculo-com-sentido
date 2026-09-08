# Ponte de continuidade 3D

Aula: /calculo-1/continuidade/ideia-continuidade#simulacao.
A experiência ocupa “Simulação (Aplicabilidade)” após “Erros comuns”, com entrada no índice.

## Experiências

1. Conectando a ponte: o lado fixo fica a 2,50 m; o dourado começa a 3,20 m. Arrastar a alça ou alinhar alturas elimina o degrau.
2. Um degrau no caminho: começa alinhada. “Criar um degrau” eleva o lado dourado para 3,00 m; é possível corrigir ou explorar outras alturas.
3. Uma rampa também funciona: começa conectada, com inclinação de 8°. O ajuste de −12° a +12° preserva a altura na junção. A alça ainda permite experimentar uma rampa com salto.

## Modelo matemático

No domínio mostrado, −4 ≤ x ≤ 4, a junção está em x = 0.
O perfil é h(x) = 2,50 para x < 0; h(x) = H + x tan(θ) para x ≥ 0.
A junção pertence ao trecho dourado, portanto h(0) = H. Os limites laterais são 2,50 e H.
Continuidade exige H = 2,50; inclinação diferente de zero não quebra a continuidade, mas cria um canto não derivável quando os trechos se encontram.
O gráfico representa ramos separados no salto, com ponto esquerdo aberto e direito fechado. Não desenha uma linha vertical como parte da função.
Furos e valores isolados são apontados como assunto da aula seguinte.

A altura é quantizada em centímetros entre 1,50 e 3,50 m. Entrada numérica não atrai para o encaixe: 2,51 m produz um degrau de 0,01 m. Somente o arraste tem atração a 2,50 m numa faixa de 4,5 cm. A inclinação é quantizada em graus.
A geometria usa a mesma função: o trecho direito sofre cisalhamento vertical mantendo a coordenada horizontal. Pilares acompanham a altura do piso; a faixa de controles mantém os pilares acima de suas bases.

## Interação e implementação

- Ponte com rio, margens, árvores, piso, guarda-corpos, pilares e alça dourada em Three.js.
- Raycasting na alça e plano vertical orientado à câmera para arraste estável após girar a cena. Captura do ponteiro; giro suspenso durante o ajuste.
- Renderização sob demanda, sem movimento automático. Câmera orbital, zoom, restauração e giro pelas setas quando a cena está focada.
- Números e geometria derivados de um estado de altura/inclinação; rascunho e mensagens separados.
- Ajustes numéricos e matemática recolhidos. Controles nativos oferecem alternativa ao mouse.
- Importação dinâmica da cena sem SSR. Liberação de geometria, materiais, texturas, sombras, observadores e eventos ao desmontar.
- Falha de WebGL mantém leituras, controles e gráfico disponíveis.
- Troca de experiência reinicia o modelo e leva foco/rolagem ao título.

## Verificação

52 testes, validação de conteúdo/KaTeX/leitura acessível, ESLint, TypeScript e build aprovados.
Os cinco testes novos cobrem limites laterais e valor na junção, continuidade sem derivabilidade da rampa, normalização e atração de controles, faixas geométricas e associação à aula correta.

Navegador local: alça ajustando 3,20 → 2,56 → 2,50 m; encaixe em 0,00 m; entrada 2,51 mantendo degrau de 0,01; rejeição de texto inválido; teclado ajustando um centímetro; criação/correção de degrau de 0,50 m; rampa de −12° a +12° com diferença zero; gráfico e leitura acessível coerentes; arraste após girar a câmera; reinício; console sem erros/avisos.

