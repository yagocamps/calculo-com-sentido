# Implementação da auditoria — bloco 1

Data: 5 de setembro de 2026. Base: `bdbd066a46cb28b25cc55868a570c062f0d0f66d`.
Branch: `codex/correcoes-confiabilidade-limites`.

## Resultado

Este bloco corrige falsos acertos, a indicação indevida de prontidão algébrica, a aula de propriedades dos limites e a falha na detecção de delimitadores matemáticos. A fase 5 permanece fora do escopo. As fases 1 a 4 ainda têm outras pendências.

### Corretor

- Preserva constantes, funções, unidades, agrupamento e maiúsculas/minúsculas. `16` versus `16π` e `sin(x)` versus `cos(x)` deixam de receber acerto automático.
- Compara números decimais e frações por aritmética racional exata, incluindo denominadores negativos e frações LaTeX aninhadas. Não usa `eval` nem equivalência simbólica por amostragem.
- A tolerância implícita de 1% foi removida: `101` não é aceito como `100`. Arredondamento deve ser configurado por exercício em `answerCheck.absoluteTolerance`, informado no enunciado e exibido junto ao campo. A configuração existe no banco e nos exercícios guiados, inclusive na fábrica de aulas.
- Ponto e vírgula são separadores decimais; o campo orienta a não usar separador de milhar. Unidades não são apagadas. Equivalências não reconhecidas pedem comparação com o gabarito; isso não significa que a resposta esteja errada.
- Tentativa vazia não dispara avaliação. Editar a resposta remove o feedback anterior.

### Checkpoint e quiz

- O checkpoint anterior a Limites exige a meta de 80% e acerto na questão essencial de cancelamento. O aluno pode continuar navegando e recebe um link de revisão específico.
- Salva respostas e restaura o resultado após recarga, recalculando a aprovação a partir das questões atuais. Registros antigos que continham apenas uma porcentagem não são usados como evidência de prontidão.
- Alternativas usam controles de rádio nativos, com navegação por setas e indicação de foco.
- O novo quiz de limites exige acerto nas condições essenciais do quociente e da raiz. Um resultado de 2/3 com erro nessas condições recomenda reforço, com link para a propriedade correspondente.
- Integração de checkpoints ao histórico geral, recomendações e backup permanece para outro bloco.

### Propriedades dos limites

- Aula passa a vir antes da substituição direta na trilha.
- Onze quadros com fórmula, leitura acessível, condições e exemplo: constante, identidade, soma, diferença, múltiplo, produto, quociente, potências inteiras, raízes reais, módulo e composição contínua.
- Explicita limites finitos, mesma aproximação, domínio, limites laterais, expoentes negativos, índices pares/ímpares e denominador não nulo.
- Inclui contraexemplos, conexões com comparação/Confronto e indeterminações; oito exercícios guiados, dez exercícios vinculados em cinco níveis e três perguntas de saída.
- Os tipos dos dez exercícios foram classificados pelo raciocínio pedido. Problemas aplicados usam concentração e área com suas unidades.
- Catálogo permanece com 166 aulas; banco passa de 340 para 350 exercícios.

### Validação

- Corrige o gabarito `p2-derivacao-implicita-5` e explicita a condição `x+2y≠0`.
- O verificador de KaTeX agora detecta delimitadores sem par, incompatíveis, aninhados ou vazios, inclui checkpoints e retorna código de erro quando encontra falhas. Antes, uma fórmula sem fechamento escapava da extração e o script não definia falha do processo.
- Quatorze testes de regressão/aceitação cobrem o corretor, as 1.024 combinações do checkpoint, restauração, quiz crítico, cobertura da aula, ordem na trilha e delimitadores.
- `npm run build` passa a executar validação e lint no `prebuild`. Um build iniciado por esse comando é interrompido se essas verificações falharem.

## Evidência de teste

- `npm run validate`: 14 testes aprovados; 166 aulas e 350 exercícios com referências válidas; 7.601 fórmulas verificadas pelo KaTeX, zero erros e zero avisos estritos; leitura acessível sem falhas. Sugestões editoriais de legibilidade preexistentes ainda constam no relatório do validador.
- Lint e TypeScript aprovados. Build de produção com 195 páginas geradas.
- Navegador local: aula carregada sem erros de console; `−0,125` aceito para `−1/8`; `16` no exercício de arruelas exige conferência e `16π` recebe acerto.
- Banco: `4 cm²` não recebe acerto para `4π cm²`; resposta completa recebe acerto e conclusão.
- Checkpoint: 80% com erro essencial pede reforço; resultado e cinco alternativas são restaurados após recarga. Corrigir por seta do teclado e reenviar produz 100% e prontidão.
- Quiz: 2/3 com erro no quociente pede revisão e o link abre a propriedade correta.
- Tela de 390×844: onze quadros presentes, zero erros KaTeX, largura da página de 390 px, sem rolagem horizontal da página. Isso é verificação das mudanças deste bloco, não auditoria mobile completa do site.

## Pendências preservadas

Sessão adaptativa, busca sem resultados, plano integral de semanas, histórico comum/backup, sliders, sitemap, Trilha Expressa e as demais lacunas matemáticas da auditoria ainda precisam de implementação. A associação de exercícios foi concluída apenas para propriedades dos limites. Nenhuma etapa geral foi marcada como encerrada por causa deste bloco.

## Como conferir

Na pasta `site`, execute `npm run build` para testes, validação, lint, TypeScript e build. Use `npm run dev` para abrir a versão local. Rotas principais:

- `/calculo-1/limites/propriedades-dos-limites`
- `/calculo-1/integrais/volumes-por-discos`
- `/pre-calculo/preparacao-limites`
- `/exercicios?id=lim-prop-08`

O conteúdo é local nesta entrega; não houve publicação no Vercel. A atualização de `AGENTS.md` foi gerada pelo próprio Next.js ao iniciar o servidor.
