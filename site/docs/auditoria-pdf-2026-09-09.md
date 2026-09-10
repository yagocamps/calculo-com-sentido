# Auditoria do PDF — implementação de 9 de setembro de 2026

Referência: `Auditoria_Calculo_com_Sentido_para_ChatGPT.pdf`, 13 páginas, fornecido pelo usuário. Escopo confirmado: P0 a P3 deste PDF; a exclusão da fase 5 pertence à auditoria antiga. A preferência posterior do usuário por não trabalhar na navegação de celular foi mantida.

## P0 — correção matemática

| Item | Resultado verificado |
| --- | --- |
| P0.1 Limites | Mantidas as correções anteriores; eliminado outro atalho incorreto no resumo. Denominador tendendo a zero exige análise da expressão e dos lados. Exemplos de 0/0, 1/x e 1/x² distinguem os casos. |
| P0.2 Assíntotas | A revisão anterior já permite cruzar assíntotas horizontais/oblíquas e inclui x/(x²+1). |
| P0.3 Componentes | As relações de seno e cosseno já identificam o eixo de referência do ângulo. |
| P0.4 Segunda derivada | Aula de otimização reforçada: ponto crítico, sinais da segunda derivada, caso inconclusivo e comparação para máximo absoluto. |
| P0.5 Receita/custo | Mantido o tratamento de R'=C' como candidato, sem garantir máximo. |
| P0.6 Glossário | Distinção existente entre radical e raiz/zero de função preservada. |
| P0.7 Quadrática | Exemplo físico de altura já corrigido na revisão anterior. |
| P0.8 Geometria analítica | Resumo existente com distância, ponto médio, coeficiente angular e reta; cobertura do catálogo verificada por teste. |

Erro adicional corrigido: no problema da cerca com x+2y=40, os lados estavam invertidos na interpretação. Agora x é paralelo ao muro, com 20 m, e y é perpendicular, com 10 m. Área máxima: 200 m², confirmada pela derivada e pelo domínio.

## P1 — sequência curricular

Os 16 assuntos pedidos já possuíam aulas; foram preservados e conectados por pré-requisitos explícitos. Os complementos ficam em `src/data/aulas/auditoria-pdf.ts`, aplicados pelos dois registros de aulas, sem duplicar aulas no catálogo.

| Assunto | Cobertura/complemento |
| --- | --- |
| Composição | Domínio da composição e da ordem inversa; exemplo de sensor, temperatura e dilatação. |
| Funções por partes | União dos domínios e leitura de pontos abertos/fechados. |
| Radianos | Aula existente ligada como pré-requisito de derivadas trigonométricas. |
| Derivadas trigonométricas | Radianos, restrição da tangente e deslocamento oscilatório. |
| Exponenciais/logarítmicas | Regras existentes e modelo de resfriamento com regra da cadeia. |
| Regra da cadeia | Hipóteses, três camadas, exercício adicional e título atualizado. |
| Implícita | Circunferência, restrição y≠0 e tangentes verticais. |
| Taxas relacionadas | Desenho do círculo, variáveis/unidades e relação antes dos valores numéricos. |
| Aproximação linear | Tolerância de uma peça circular; variação estimada separada do erro da aproximação. |
| Rolle/TVM | Hipóteses, exemplo de Rolle e consequência para monotonicidade em um intervalo. |
| Valor intermediário | Aula existente conectada à continuidade. |
| Valor extremo | Hipóteses e contraexemplos; aula posicionada antes de otimização. |
| Substituição | Aula existente ligada à cadeia e ao TFC. |
| Área entre curvas | Aula existente ligada à integral definida. |
| Valor médio | Retângulo equivalente e acúmulo com sinal. |
| Riemann | Aula/simulação existentes preservadas e ligadas à interpretação de área. |

## P2 — diagnóstico e evidência de aprendizagem

- Diagnóstico inclui fatoração; revisão encaminha à aula específica e prioriza fundamentos com dificuldade, sem obrigar refazer todo o módulo.
- Resultados antigos que guardam escores por habilidade preservam seu denominador original após a inclusão de perguntas.
- Painel distingue **Não estudado**, **Estudado** e **Dominado** por assunto.
- Domínio exige três questões distintas com último resultado correto, acerto posterior em questão já acertada após pelo menos 24 horas da formação dessa base, pelo menos 80% de acerto nas últimas até dez tentativas e nenhum último erro pendente. Tentativas futuras/inválidas e autoavaliações não entram.
- Marcar aula manualmente registra estudo, sem conceder domínio.
- Erros reaparecem como revisão após 24 horas. Recuperação de pré-requisito usa evidência de erro no próprio pré-requisito, sem inferir uma deficiência apenas pelo erro em tema avançado.
- Seleção adaptativa conserva o nível apropriado e considera habilidades relacionadas ao desempatar candidatos.

## P3 — publicação e arquitetura

- Contagens da página inicial derivadas do catálogo central, incluindo módulos, aulas publicadas e exercícios.
- 373 exercícios com URL individual estável, HTML pré-renderizado, metadados próprios, canonical e sitemap. URLs anteriores de filtros continuam válidas.
- Informação explícita de persistência no navegador, com exportação/importação para cópia de segurança.
- Seções de vídeo sem conteúdo já eram omitidas; comportamento preservado.
- Link “Pular para o conteúdo” agora fica visível ao receber foco e transfere o foco para o conteúdo principal.

## Validação e limites da evidência

- Antes: 57 testes automatizados aprovados. Depois: **62 aprovados, zero falhas**.
- `npm run build`: aprovado, incluindo testes, conteúdo, KaTeX, ARIA, ESLint, TypeScript e geração estática.
- Cinco páginas comparadas: início, resumos, regra da cadeia, progresso e taxas relacionadas. Axe WCAG 2 A/AA e 2.1 AA: **zero violações nas páginas examinadas**, antes e depois. Sem erros de execução ou transbordamento horizontal na janela desktop de 1440×1000.
- Teste adicional com o painel completo de evidências aberto: zero violações do axe.
- Exercício individual com JavaScript desativado: enunciado, KaTeX e canonical presentes.
- Fluxo de conclusão manual: assunto fica Estudado, sem receber Dominado. Atalho de teclado testado até o foco no elemento principal.
- Revisão visual: desenho de taxas relacionadas, painel de evidências e exercício individual.
- Na versão otimizada local, JavaScript observado nas cinco rotas ficou entre 574.555 e 586.094 bytes codificados. Os números públicos anteriores eram aproximadamente 587–600 KB. Essas medições são de laboratório e podem variar por compressão, cache e rede; não certificam Core Web Vitals reais.

Evidências locais: pasta `auditoria` ao lado do repositório, especialmente `build-auditoria-pdf-final.log`, `axe-pdf-antes-depois.json`, `axe-pdf-build-producao.json` e `smoke-pdf-result.json`.

## Pendências declaradas

- **Formatação de todo o acervo:** novos desenvolvimentos usam KaTeX; exercícios de propriedades dos limites e diversos trechos da aula foram convertidos. Ainda há expressões em texto simples em conteúdos legados. O validador garante a sintaxe das expressões marcadas, mas não demonstra que toda expressão do acervo foi marcada. Portanto o item universal de KaTeX do PDF **não está certificado como concluído**.
- **Sincronização entre dispositivos:** não há backend/conta nesta arquitetura. A etapa compatível foi entregue com persistência local e cópia de segurança, conforme permitido pelo PDF. Uma conta sincronizada exige projeto de autenticação, armazenamento e migração.
- **Métricas de campo:** a auditoria automatizada e a inspeção visual não substituem dados reais de LCP, INP e CLS nem uma auditoria manual completa com leitor de tela.
- **Mobile:** não foi alterada a navegação nem declarada validação de celular, em respeito à instrução do usuário.

Não se declara o checklist integral do PDF encerrado enquanto a revisão global da notação permanecer pendente.

## Arquivos principais

`src/data/aulas/auditoria-pdf.ts`, `src/data/aulas/calculo-1/aplicacoes-derivadas.ts`, `src/data/aulas/calculo-1/propriedades-dos-limites.ts`, `src/data/resumos.ts`, `src/data/teste-nivel.ts`, `src/lib/learning-evidence.ts`, `src/lib/progress-dashboard.ts`, `src/lib/adaptive-session.ts`, `src/lib/catalog-stats.ts`, `src/app/(site)/exercicios/[id]/page.tsx`, `src/app/sitemap.ts`, componentes de progresso/teste/aula e `tests/pdf-audit.test.ts`.

## Melhorias adicionais sugeridas

Depois da migração integral de notação, acrescentar uma verificação editorial que detecte fórmulas sem delimitadores sem confundir texto, URLs ou respostas aceitas. Ampliar gradualmente a amostra de acessibilidade e medir Core Web Vitals de visitantes reais antes de assumir metas de desempenho cumpridas.
