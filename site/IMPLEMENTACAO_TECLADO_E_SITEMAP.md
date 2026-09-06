# Controles por teclado e origem pública do site

Data: 6 de setembro de 2026. Base: `b53fe12`.
Branch: `codex/correcoes-confiabilidade-limites`.

Continuação das correções das fases 1 a 4. A fase 5 de recursos avançados permanece excluída. Por orientação expressa do usuário nesta continuação, a navegação em celular fica fora do trabalho; a verificação deste bloco foi realizada no computador.

## Correções implementadas

### Coeficientes sem travamento

Os laboratórios de reflexões/escalas e parábola forçavam o valor zero de volta para um número positivo. Isso impedia a passagem incremental de positivo para negativo com as setas.

O coeficiente `a` agora tem dois controles nativos: seleção do sinal e ajuste do módulo positivo. É possível trocar de positivo para negativo e voltar pelo teclado, preservando o módulo. A condição `a ≠ 0` permanece explícita, mantendo a função quadrática e evitando divisão por zero no vértice. O texto descreve a inversão da concavidade, sem afirmar que trocar apenas `a` reflete a função inteira `ax²+bx+c`.

### Valores e foco acessíveis

Os controles deslizantes dos oito laboratórios receberam nomes estáveis, valores textuais em português e indicação visível de foco. A função afim recebeu o mesmo tratamento para seus dois coeficientes. Cada laboratório mantém uma única região dedicada a anunciar o resumo das alterações, evitando as duas regiões redundantes anteriores; as saídas numéricas dos controles deixam de ser regiões de anúncio adicionais.

No laboratório de limites, o valor do controle agora é a posição real de `x`. Antes, o controle armazenava e expunha o deslocamento relativo a 1, embora seu nome anunciasse a posição de x. A faixa geométrica foi preservada: de −0,5 a 2,5. Em x=1, a descrição continua distinguindo função indefinida e limite igual a 2.

### Sitemap, robots e base de metadados

`getSiteUrl()` deixa de usar `VERCEL_URL`, que pode conter o endereço temporário do deploy. A origem padrão passa a ser `https://calculo-com-sentido.vercel.app`, compartilhada pelo sitemap, robots e `metadataBase`.

Uma origem explicitamente configurada em `NEXT_PUBLIC_SITE_URL` continua tendo prioridade. Espaços externos e a barra final são normalizados; um domínio sem protocolo recebe HTTPS. Configurações com protocolo incompatível, credenciais, caminho, consulta ou fragmento geram erro claro, em vez de produzir URLs incorretas silenciosamente. Um endereço HTTP local continua disponível quando configurado explicitamente.

Se a variável explícita já estiver definida no ambiente remoto com um domínio temporário, será necessário corrigi-la para o domínio público na entrega. O ambiente remoto não foi alterado, e esta versão ainda não foi publicada no Vercel.

## Verificação executada

- `npm run build`: 40 testes aprovados, validação de conteúdo, KaTeX e leitura acessível, lint, TypeScript e geração de 196 páginas.
- Quatro testes novos verificam independência do endereço de preview, normalização de domínio explícito, rejeição de origens inválidas e concordância entre sitemap e robots.
- Sitemap gerado no build: 191 URLs distintas, todas na origem pública estável. A rota local `/sitemap.xml` retornou HTTP 200 com as mesmas 191 URLs e origem. O robots gerado aponta para esse sitemap.
- Navegador desktop: 14 sliders em nove páginas foram operados com Home, End e setas nos limites inferior e superior; os valores permaneceram dentro das faixas e todos expuseram nome e valor acessível.
- Reflexões: `a=0,25 → −0,25 → 2`, preservando o módulo ao trocar o sinal e atualizando a descrição do gráfico.
- Parábola: com `b=−2` e `c=−3`, a troca `a=−0,5 → 0,5` produziu vértices `(−2,−1)` e `(2,−5)`, discriminantes `−2` e `10` e classificações de raízes correspondentes. Nos extremos `a=3, b=−6, c=6`, o vértice foi `(1,3)` e o discriminante `−36`.
- Limites: 30 passos de 0,05 desde −0,5 levaram a x=1. O controle anunciou “x = 1” e a descrição explicou que a função não existe nesse ponto, mas a tendência é 2.
- Inspeção visual dos controles e foco no computador; nenhum erro ou aviso de console registrado nos fluxos observados.

Faixas verificadas:

| Laboratório | Controles e extremos |
|---|---|
| Limites | x: −0,5 a 2,5 |
| Secante/tangente | h: 0,1 a 2,5 |
| Riemann | n: 2 a 20 |
| Círculo trigonométrico | ângulo: 0° a 360° |
| Reflexões/escalas | módulo de a: 0,25 a 2; h: −3 a 3; k: −4 a 4; sinal positivo/negativo |
| Parábola | módulo de a: 0,5 a 3; b e c: −6 a 6; sinal positivo/negativo |
| Produto | h: 0,05 a 1,2 |
| TFC | x: 0,1 a 3 |
| Função afim | a: −5 a 5; b: −10 a 20 |

Log: `../../auditoria/build-bloco-5.log`. Esse nome numera a sequência local de entregas; não se refere à fase 5 da auditoria.

## Limites e trabalho restante

A inspeção da árvore acessível e do teclado não equivale a uma sessão de uso com NVDA/JAWS. Ainda cabe uma revisão abrangente do foco e da navegação por teclado nos demais fluxos desktop, além da associação precisa entre aulas e exercícios restantes e da revisão pedagógica independente. A verificação do sitemap em produção depende da publicação e da conferência do ambiente remoto.

Este relatório fecha as falhas específicas de travamento dos coeficientes e origem padrão do sitemap no código local. Não declara todas as fases 1 a 4 concluídas.
