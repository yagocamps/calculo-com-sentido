# Implementação da auditoria — bloco 2

Data: 5 de setembro de 2026. Base: `7021a2e`.
Branch: `codex/correcoes-confiabilidade-limites`.

## Resultado

Este bloco implementa a sessão adaptativa, permite recuperar uma busca sem resultados e completa os planos de estudo. As fases 1 a 4 continuam com pendências; a fase 5 de recursos avançados permanece fora do escopo. Não houve publicação no Vercel.

### Sessão adaptativa

- A rota `/exercicios?session=adaptativa&id=...` abre uma sequência própria, com cinco questões do mesmo tema, sem repetir questões na sequência. Se o banco de um tema tiver menos de cinco, o alvo usa a quantidade disponível.
- A próxima questão só é escolhida depois da avaliação: busca um nível acima no acerto e um abaixo no erro, respeitando os níveis 1 a 5. Se faltar esse nível, escolhe o disponível mais próximo e prefere questões ainda não concluídas.
- Uma avaliação por questão: submissões repetidas não acrescentam respostas à sessão. O histórico do banco recebe a tentativa; acertos registram a conclusão do exercício.
- O estado inclui identificador da sessão, tema, questão atual, respostas e método de avaliação. Recarregar ou sair e voltar restaura a sequência. A conclusão mostra acertos, erros e resoluções, identificando a autoavaliação.
- A navegação recebe foco no andamento da nova questão e no resumo final. Iniciar outra sessão substitui a sequência salva, preservando o histórico de tentativas.
- Ao abrir uma prática de outro tema pelo plano, a página explica qual sessão está salva e oferece iniciar o tema escolhido. Isso evita substituir a sessão sem uma ação explícita do aluno.

### Busca

- Campo de busca e filtros continuam acessíveis quando nenhum exercício é encontrado.
- Editar o termo recupera os resultados. “Ver todos os exercícios” limpa busca, tema, nível e parâmetros da URL, inclusive o filtro inicial recebido por link.
- Filtros informam seu estado por `aria-pressed`.

### Plano de estudos e persistência

- Todos os períodos são gerados: 2 semanas × 5 sessões = 10; 4 × 4 = 16; 8 × 3 = 24. Cada semana pode ser expandida e contém aulas, prática e revisão.
- Um plano novo começa pela aula prioritária conhecida, quando disponível, e segue pelas aulas ainda não concluídas. O roteiro fica salvo para que mudanças no progresso não substituam silenciosamente sessões anteriores.
- Datas são locais e editáveis. O aluno escolhe a data e confirma em “Salvar data”; a alteração permanece após recarga. Datas inválidas são rejeitadas.
- A conclusão de cada sessão é manual e independente da conclusão das aulas: acompanha rotina, sem certificar domínio. Escolher outro ritmo cria um novo roteiro e preserva o histórico de aulas e exercícios; escolher o ritmo atual preserva o plano.
- O esquema de progresso passa à versão 3. Planos antigos recebem o roteiro completo; sessão adaptativa, datas e conclusões fazem parte do backup JSON. Importar um backup sem esses campos limpa os campos anteriores, em vez de misturar planos de origens diferentes.

## Validação

- `npm run build`: 22 testes aprovados, validação de conteúdo, KaTeX, leitura acessível, lint, TypeScript e geração de 195 páginas. As sugestões editoriais preexistentes do validador de conteúdo permanecem.
- Oito testes novos cobrem ajuste de dificuldade, limite de cinco questões, ausência de repetição, submissões duplicadas, banco pequeno, dados inválidos, todos os planos, preservação das escolhas e exportação/importação em armazenamento simulado.
- Navegador local: sessão de Limites completada com uma resposta correta automática e quatro incorretas por autoavaliação. O primeiro acerto elevou a próxima questão ao nível 2; o erro seguinte voltou ao nível 1. Resposta registrada ficou bloqueada e foi restaurada após recarga; a quinta avaliação abriu o resumo.
- Plano: dez, dezesseis e vinte e quatro sessões confirmadas, incluindo o conteúdo das últimas semanas. Conclusão manual e data `2026-10-20` da primeira sessão preservadas após recarga. O teste encontrou a fragilidade de salvar durante a edição da data; o formulário com confirmação foi aplicado e retestado.
- Busca: termo sem resultados manteve os controles; trocar para `raiz` trouxe 11 resultados. Limpar filtros recuperou 350 exercícios e a URL `/exercicios`, inclusive após recarga.
- Prática do plano: abrir Fundamentos com uma sessão salva de Limites mostrou o aviso; iniciar o tema escolhido abriu Fundamentos. A resposta `20` em Ordem das operações registrou um acerto, bloqueou nova submissão e liberou a questão seguinte, com foco no andamento.
- Tela de 390 × 844: plano e prática inspecionados visualmente, controles de data disponíveis, largura da página de 390 px sem rolagem horizontal. Nenhum erro ou aviso de console observado nesses fluxos. Esta verificação não substitui a auditoria mobile completa.
- Backup validado pelas funções reais de importação e persistência em teste automatizado; o seletor nativo de arquivos não fez parte da verificação no navegador.

## Limites e próximas pendências

O algoritmo adapta a dificuldade dentro do tema; não estima domínio por habilidade. Mantém uma sequência detalhada por vez, além do histórico de tentativas existente. Os dados continuam locais, com transferência manual por backup; não há sincronização automática entre dispositivos.

Ainda faltam integrar checkpoints e exercícios guiados ao histórico geral e ao backup, completar as demais lacunas matemáticas e associações de exercícios, corrigir sliders e origem do sitemap, revisar a Trilha Expressa e realizar a auditoria abrangente de acessibilidade/mobile e a aceitação pedagógica. Esses itens não foram marcados como concluídos neste bloco.

## Como conferir

Na pasta `site`, execute `npm run build`. Para a experiência local, use `npm run dev` e abra `/progresso`, `/exercicios?q=termo-sem-resultados` ou `/exercicios?id=lim-prop-01&session=adaptativa`.
