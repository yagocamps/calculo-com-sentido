# Implementação da auditoria — bloco 4

Data: 6 de setembro de 2026. Base: `d6ac83d`.
Branch: `codex/correcoes-confiabilidade-limites`.

## Resultado

Os checkpoints dos módulos e os exercícios guiados das aulas passam a participar do progresso local, das recomendações e do backup. O histórico identifica a origem da tentativa e distingue conferência automática, autoavaliação e alternativas. A fase 5 de recursos avançados permanece fora do escopo. Não houve publicação no Vercel.

## Comportamento entregue

- Respostas conferidas dos guiados são restauradas ao voltar à aula ou recarregar a página, incluindo o resultado e a resolução. Respostas ainda não verificadas continuam sendo rascunhos temporários.
- Quando o corretor não consegue avaliar uma resposta, ela fica pendente de comparação com o gabarito. Só uma autoavaliação explícita registra acerto ou erro; o histórico identifica esse método.
- Reenviar a mesma resposta não infla os contadores. Nos guiados, “Tentar novamente” abre uma nova tentativa e preserva o histórico; nos checkpoints, só as alternativas alteradas geram novas tentativas.
- Um erro recente em guiado ou checkpoint recomenda a aula correspondente e permite voltar ao exercício ou checkpoint pelo link. Erros em habilidades essenciais têm prioridade. Corrigir a questão retira esse erro da prioridade, mantendo o evento anterior no histórico.
- Acertar um guiado ou checkpoint não marca uma aula nem um exercício do banco como concluído. Os indicadores continuam distinguindo conclusão declarada e tentativas registradas.
- Se o armazenamento falhar, os novos controles informam que a resposta foi avaliada, mas não salva, e permitem repetir o salvamento. A importação também deixa de anunciar sucesso quando não consegue gravar.
- Links diretos para guiados e checkpoints são reposicionados após a restauração das respostas, inclusive ao recarregar no celular.

## Persistência e compatibilidade

O progresso usa schema 4. O catálogo de avaliações reconhece IDs do banco, IDs de guiados associados à aula e IDs das questões dos checkpoints. As respostas atuais incluem uma assinatura do conteúdo: uma resposta de uma versão incompatível não é restaurada como avaliação atual.

Os checkpoints antigos em `ccs-checkpoint:v1:*` são migrados uma vez quando contêm respostas completas, data válida e assinatura compatível. A migração ocorre também ao exportar antes de revisitar o módulo. A prontidão é recalculada pelas respostas; percentuais antigos ou registros contendo apenas nota não fabricam aprovação ou tentativas. As datas originais são preservadas.

O backup reúne banco, guiados e checkpoints com o restante do progresso. Importar substitui esses registros pelo conteúdo normalizado do arquivo; dados antigos separados não reaparecem na leitura seguinte. O comando de zerar progresso também impede essa recuperação involuntária. Os testes dessa operação usam armazenamento simulado, sem apagar os dados do navegador usado na verificação.

O histórico detalhado mantém até 200 eventos; os contadores de tentativas são cumulativos. Respostas guiadas têm limite de 2.000 caracteres. O importador verifica o limite de 20 MB em bytes, rejeita JSON com raiz escalar ou array e preserva o progresso existente quando a validação ou gravação falha. O espaço efetivamente disponível depende do navegador.

## Validação

- `npm run build`: 36 testes, validação de conteúdo, KaTeX, leitura acessível, lint e TypeScript; geração de 196 páginas.
- Nove testes novos cobrem migração sem duplicação, registros antigos incompatíveis, correção de uma única questão, guiados com links precisos, autoavaliação explícita, exportação/importação das três origens, recálculo de respostas, rejeição de JSON inválido e falhas de armazenamento com nova tentativa de gravação.
- Navegador local: resposta `999` no primeiro guiado de derivada da inversa, restauração após recarregar e retorno pelo histórico ao ID do exercício; autoavaliação do terceiro guiado e restauração do método.
- Navegador local: checkpoint anterior de Preparação para Limites restaurado em 80% com habilidade essencial incorreta; correção apenas dessa resposta, prontidão em 100%, restauração após recarregar e contador cumulativo passando de 4/5 para 5/6.
- Depois da correção do checkpoint, a recomendação passou a apontar o guiado pendente de revisão. O histórico mostrou separadamente conferência automática, autoavaliação e alternativas.
- Tela de 390 × 844: inspeção visual dos cartões, controles e checkpoint, sem rolagem horizontal nas páginas verificadas. Links diretos após recarregar posicionaram os alvos abaixo do cabeçalho. O tamanho temporário do navegador foi restaurado.
- Nenhum erro ou aviso registrado no console durante os fluxos inspecionados. O ciclo de backup foi verificado por testes de integração com armazenamento simulado; não foi executada importação pelo seletor nativo de arquivos no navegador real.

Log da compilação: `../../auditoria/build-bloco-4.log`.

## Pendências da auditoria geral

Este bloco não encerra todas as fases 1 a 4. Ainda exigem trabalho a associação precisa entre prática e conteúdo das demais aulas, os controles deslizantes acessíveis, a origem do sitemap e a auditoria abrangente de navegação móvel, teclado e leitor de tela. A inspeção móvel acima cobre os controles alterados neste bloco.

Os quizzes rápidos de saída das aulas continuam com feedback próprio; este bloco integra checkpoints de módulo e exercícios guiados. A atualização simultânea de formulários já abertos em outras abas também não foi implementada: respostas são restauradas ao abrir ou recarregar a página. Os dados permanecem locais, com transferência manual por backup, sem sincronização em nuvem.

Contagem de conteúdo, testes automatizados e conclusão por clique não substituem revisão editorial independente e avaliação pedagógica com estudantes.
