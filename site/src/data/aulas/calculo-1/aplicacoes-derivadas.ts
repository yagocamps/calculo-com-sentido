import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

const MOD = "aplicacoes-derivadas";
const MOD_TITLE = "Aplicações de derivadas";

export const aplicacoesDerivadasAulas: Record<string, AulaContent> = {
  "crescimento-decrescimento-deriv": {
    meta: c1Meta({
      title: "Onde a função sobe ou desce",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "11 min",
      glossaryTerms: ["f′", "Crescente", "Decrescente"],
      next: { slug: "maximos-minimos", title: "Máximos e mínimos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A derivada é um termômetro do gráfico: \\(f'>0\\) a função sobe; \\(f'<0\\) desce; \\(f'=0\\) pode ser platô ou virada.",
        "Esse teste organiza onde buscar máximos e mínimos.",
      ],
    },
    explicacao: {
      title: "Teste da primeira derivada",
      paragraphs: [
        "Calcule \\(f'(x)\\) e estude o sinal em intervalos.",
        "\\(f'>0\\) no intervalo \\(\\to f\\) crescente ali.",
        "\\(f'<0 \\to f\\) decrescente.",
        "Mudança de sinal em \\(f'\\) indica possível extremo.",
      ],
      formula: "f′ > 0 ⇒ ↗ | f′ < 0 ⇒ ↘",
      formulaLatex: "f' > 0 \\Rightarrow \\nearrow \\quad|\\quad f' < 0 \\Rightarrow \\searrow",
      formulaAria: "f linha maior que zero implica crescente; f linha menor que zero implica decrescente",
      callout: "Sinal de f′ importa mais que o valor de f em si.",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "Lucro", detail: "Quando produzir aumenta lucro" },
        { label: "Temperatura", detail: "Aquecendo ou esfriando" },
        { label: "Vendas", detail: "Campanha acelerando ou freando" },
      ],
    },
    exemplo: {
      title: "\\(f(x)=x^3-3x\\)",
      situacao: "Onde f cresce e onde decresce?",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "f′(x)", detail: "\\(f'(x) = 3x^2-3 = 3(x^2-1)\\)." },
        { title: "Zeros", detail: "\\(x=-1\\) e \\(x=1\\)." },
        { title: "Sinais", detail: "\\(f'>0\\) se \\(|x|>1\\); \\(f'<0\\) se \\(|x|<1\\)." },
        { title: "Conclusão", detail: "Cresce \\((-\\infty,-1) \\cup (1,\\infty)\\); decresce \\((-1,1)\\)." },
      ],
    },
    interpretacao: {
      title: "Gráfico",
      paragraphs: [
        "Entre \\(-1\\) e \\(1\\) o gráfico desce; fora disso sobe — coerente com cubo menos 3x.",
        "Extremos locais serão estudados na próxima aula.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar sinal de \\(f\\) em vez de \\(f'\\).",
        "Esquecer pontos onde \\(f'\\) não existe.",
        "Concluir extremo só com \\(f'=0\\) sem trocar sinal.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cd-g1",
          type: "calculo",
          enunciado: "\\(f(x)=5-2x\\). f cresce ou decresce?",
          resposta: "Decresce em \\(\\mathbb{R}\\).",
          resolucao: "\\(f'=-2<0\\).",
          interpretacao: "Afim decrescente.",
        },
        {
          id: "cd-g2",
          type: "interpretacao",
          enunciado: "\\(f'\\) passa de \\(+\\) para \\(-\\) em \\(x=4\\). O que isso sugere?",
          resposta: "Possível máximo local em \\(x=4\\).",
          resolucao: "Crescente antes, decrescente depois.",
          interpretacao: "Mudança de sinal em \\(f'\\).",
        },
              {
          id: "cd-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x^2 - 8x + 3\\). Em que intervalo \\(f\\) decresce, e em qual cresce?",
          resposta: "Decresce para \\(x < 4\\); cresce para \\(x > 4\\)",
          resolucao: "\\(f'(x) = 2x - 8\\). Então \\(f' < 0 \\Leftrightarrow x < 4\\) e \\(f' > 0 \\Leftrightarrow x > 4\\).",
          interpretacao: "O sinal da derivada divide a reta em faixas. Em \\(x = 4\\) ele troca — é o fundo da parábola.",
          erroComum: "Olhar o sinal de \\(f\\) em vez do sinal de \\(f'\\).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-01", "ad-ap-02", "apd-f-01", "apd-f-02", "apd-f-03", "apd-f-04"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(f'>0\\): crescente; \\(f'<0\\): decrescente.",
        "Zeros de \\(f'\\) candidatos a extremos.",
        "Monte tabela de sinais de \\(f'\\).",
      ],
    },
  },

  "maximos-minimos": {
    meta: c1Meta({
      title: "Máximos e mínimos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "14 min",
      next: { slug: "pontos-criticos", title: "Pontos críticos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Otimizar é achar o melhor valor: maior lucro, menor custo, máxima área com cerca fixa.",
        "Máximo e mínimo local são os \"topos\" e \"fundos\" do gráfico.",
      ],
    },
    explicacao: {
      title: "Conceitos",
      paragraphs: [
        "Máximo local: \\(f(a) \\geq f(x)\\) perto de \\(a\\).",
        "Mínimo local: \\(f(a) \\leq f(x)\\) perto de \\(a\\).",
        "Em interior de intervalo, extremo local frequentemente tem \\(f'(a)=0\\) ou \\(f'\\) indefinida.",
      ],
      formula: "Extremo local interior ⟹ f′(a)=0 ou f′(a) não existe",
      formulaLatex: "\\text{extremo local interior} \\Rightarrow f'(a)=0 \\text{ ou } f'(a) \\text{ não existe}",
      formulaAria: "extremo local interior implica f linha de a igual a zero ou f linha de a não existe",
      callout: "f′(a)=0 não garante extremo — confirme mudança de sinal.",
    },
    ondeAparece: {
      title: "Problemas típicos",
      items: [
        { label: "Lucro máximo", detail: "L(x) parabólica" },
        { label: "Custo mínimo", detail: "Custo médio ou total" },
        { label: "Geometria", detail: "Área máxima com perímetro fixo" },
      ],
    },
    exemplo: {
      title: "\\(f(x)=-x^2+4x+1\\)",
      situacao: "Encontre máximo local.",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "f′", detail: "\\(f'(x) = -2x+4\\)." },
        { title: "f′=0", detail: "\\(x=2\\)." },
        { title: "Sinal f′", detail: "\\(+\\) antes de 2, \\(-\\) depois \\(\\to\\) máximo em \\(x=2\\)." },
        { title: "Valor", detail: "\\(f(2)=-4+8+1=5\\)." },
      ],
    },
    interpretacao: {
      title: "Parábola",
      paragraphs: [
        "Coeficiente de \\(x^2\\) negativo: um único máximo global em \\(x=2\\).",
        "Problemas aplicados pedem interpretar \\(x=2\\) no contexto (unidades).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que \\(f'=0\\) é sempre máximo.",
        "Ignorar extremos nos endpoints do domínio.",
        "Confundir máximo local com global.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "mm-g1",
          type: "calculo",
          enunciado: "\\(f(x)=x^2-6x+10\\). Mínimo local?",
          resposta: "\\(x=3\\), \\(f(3)=1\\)",
          resolucao: "\\(f'=2x-6=0 \\Rightarrow x=3\\); \\(f'=2(x-3)\\): mínimo em 3.",
          interpretacao: "Parábola abre para cima.",
        },
        {
          id: "mm-g2",
          type: "interpretacao",
          enunciado: "Domínio [0,10]. Por que testar x=0 e x=10?",
          resposta: "Extremo global pode estar na borda.",
          resolucao: "Teorema não exclui endpoints.",
          interpretacao: "Sempre liste candidatos no fechado.",
        },
              {
          id: "mm-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x^2 - 4x\\) em \\([0,\\ 5]\\). Encontre o máximo e o mínimo globais.",
          resposta: "Mínimo \\(-4\\) em \\(x = 2\\); máximo \\(5\\) em \\(x = 5\\)",
          resolucao: "\\(f'(x) = 2x - 4 = 0 \\Rightarrow x = 2\\), com \\(f(2) = -4\\). Nas bordas: \\(f(0) = 0\\) e \\(f(5) = 5\\). Comparando os três, o maior é \\(5\\).",
          interpretacao: "O máximo global não estava num ponto crítico, e sim na borda. Por isso a regra é testar críticos e extremos juntos.",
          erroComum: "Parar em \\(x = 2\\) e responder que ali está o máximo, sem comparar com as bordas.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-03", "ad-ap-04"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Máximo/mínimo local = topo/fundo do gráfico.",
        "Candidatos: \\(f'=0\\), \\(f'\\) indefinida, bordas do domínio.",
        "Confirme com sinal de \\(f'\\) ou valor.",
      ],
    },
  },

  "pontos-criticos": {
    meta: c1Meta({
      title: "Pontos críticos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "12 min",
      next: { slug: "concavidade", title: "Concavidade" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Ponto crítico: onde a \"estratégia\" de subida/descida pode mudar — \\(f'=0\\) ou \\(f'\\) não existe.",
        "Lista de críticos reduz busca em problemas de otimização.",
      ],
    },
    explicacao: {
      title: "Definição e fluxo",
      paragraphs: [
        "Crítico em \\(a\\): \\(f'(a)=0\\) ou \\(f'(a)\\) indefinida (com \\(a\\) no domínio).",
        "Passo 1: derive. Passo 2: ache zeros e indeterminações. Passo 3: teste sinal ou segunda derivada.",
        "Domínio físico (\\(x \\geq 0\\)) corta candidatos inválidos.",
      ],
      formula: "críticos = { x | f′(x)=0 ou f′ não existe }",
      formulaLatex: "\\text{críticos} = \\{\\, x \\mid f'(x)=0 \\text{ ou } f' \\text{ não existe} \\,\\}",
      formulaAria: "conjunto dos críticos: x tais que f linha de x igual a zero ou f linha não existe",
      callout: "Todo extremo interior é crítico, mas nem todo crítico é extremo.",
    },
    ondeAparece: {
      title: "Exemplos",
      items: [
        { label: "|x| em 0", detail: "Crítico sem derivada" },
        { label: "x³ em 0", detail: "\\(f'=0\\) mas sem extremo" },
        { label: "Produção", detail: "\\(x \\geq 0\\) apenas" },
      ],
    },
    exemplo: {
      title: "\\(f(x)=x^4-4x^2\\)",
      situacao: "Pontos críticos?",
    },
    passos: {
      title: "Achar",
      steps: [
        { title: "f′", detail: "\\(f'(x) = 4x^3-8x = 4x(x^2-2)\\)." },
        { title: "f′=0", detail: "\\(x=0\\), \\(x=\\sqrt{2}\\), \\(x=-\\sqrt{2}\\)." },
        { title: "Classificar depois", detail: "mínimo em 0? máximos em \\(\\pm\\sqrt{2}\\)? (teste sinal)." },
      ],
    },
    interpretacao: {
      title: "x³ em 0",
      paragraphs: [
        "\\(f'(0)=0\\) mas gráfico atravessa — ponto de inflexão, não extremo.",
        "Por isso classificação após listar críticos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer onde \\(f'\\) não existe.",
        "Incluir \\(x\\) fora do domínio aplicado.",
        "Parar em \\(f'=0\\) sem classificar.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "pc-g1",
          type: "calculo",
          enunciado: "\\(f(x)=x^3-3x\\). Críticos?",
          resposta: "\\(x=-1\\) e \\(x=1\\)",
          resolucao: "\\(f'=3x^2-3=3(x^2-1)\\).",
          interpretacao: "Dois candidatos.",
        },
        {
          id: "pc-g2",
          type: "compreensao",
          enunciado: "\\(f'(2)\\) não existe. \\(x=2\\) é crítico?",
          resposta: "Sim, se 2 está no domínio.",
          resolucao: "Definição inclui derivada inexistente.",
          interpretacao: "Cantos contam.",
        },
              {
          id: "pc-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x^3\\). Encontre os pontos críticos e diga se há máximo ou mínimo em cada um.",
          resposta: "\\(x = 0\\) é crítico, mas não é máximo nem mínimo",
          resolucao: "\\(f'(x) = 3x^2\\) zera só em \\(x = 0\\). Como \\(f' \\geq 0\\) dos dois lados, não há troca de sinal: a função nunca para de crescer.",
          interpretacao: "Ponto crítico é candidato, não veredito. Aqui a tangente fica horizontal mas a curva segue subindo — é ponto de inflexão.",
          erroComum: "Assumir que todo ponto com \\(f' = 0\\) é máximo ou mínimo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-05", "ad-ap-06"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Crítico: \\(f'=0\\) ou \\(f'\\) indefinida.",
        "Lista completa antes de classificar.",
        "Domínio do problema filtra candidatos.",
      ],
    },
  },

  "concavidade": {
    meta: c1Meta({
      title: "Concavidade e segunda derivada",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "11 min",
      next: { slug: "otimizacao", title: "Problemas de otimização" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Concavidade descreve se o gráfico parece um U (∪) ou um ∩.",
        "\\(f''>0\\): concavidade para cima; \\(f''<0\\): para baixo; \\(f''=0\\) possível inflexão.",
        "Segunda derivada classifica críticos (teste da segunda derivada).",
      ],
    },
    explicacao: {
      title: "Regras",
      paragraphs: [
        "\\(f''(x)>0 \\to f'\\) crescente \\(\\to f\\) côncava para cima.",
        "\\(f''(x)<0 \\to\\) côncava para baixo.",
        "Em crítico \\(c\\) com \\(f'(c)=0\\): \\(f''(c)>0\\) mínimo local; \\(f''(c)<0\\) máximo local; \\(f''(c)=0\\) inconclusivo.",
      ],
      formula: "f″ > 0 ⇒ ∪ | f″ < 0 ⇒ ∩",
      formulaLatex: "f'' > 0 \\Rightarrow \\cup \\quad|\\quad f'' < 0 \\Rightarrow \\cap",
      formulaAria: "f duas linhas maior que zero implica concavidade para cima; menor que zero, para baixo",
      callout: "Cálculo 1 introdutório usa f″ quando disponível; senão teste de f′.",
    },
    ondeAparece: {
      title: "Leitura",
      items: [
        { label: "Custo", detail: "Curvatura de escala" },
        { label: "Crescimento", detail: "Aceleração de mudança" },
        { label: "Risco", detail: "Mudança de tendência" },
      ],
    },
    exemplo: {
      title: "\\(f(x)=x^3\\)",
      situacao: "\\(f''\\) e concavidade?",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "f′", detail: "\\(f'(x) = 3x^2\\)." },
        { title: "f″", detail: "\\(f''(x) = 6x\\)." },
        { title: "Sinal", detail: "\\(f''<0\\) se \\(x<0\\); \\(f''>0\\) se \\(x>0 \\to\\) inflexão em 0." },
      ],
    },
    interpretacao: {
      title: "Inflexão",
      paragraphs: [
        "Em 0 o gráfico muda de ∩ para ∪ — ponto de inflexão.",
        "\\(f'(0)=0\\) e não é extremo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir concavidade com crescimento.",
        "Aplicar teste da 2ª derivada quando \\(f''(c)=0\\).",
        "Derivar duas vezes errado em regra da cadeia.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "conc-g1",
          type: "calculo",
          enunciado: "\\(f(x)=x^2\\). \\(f''(x)\\)? Classifique \\(x=0\\).",
          resposta: "\\(f''=2>0 \\to\\) mínimo",
          resolucao: "\\(f'=2x\\), \\(f''=2\\).",
          interpretacao: "Parábola ∪.",
        },
        {
          id: "conc-g2",
          type: "interpretacao",
          enunciado: "\\(f''>0\\) no intervalo. \\(f'\\) está aumentando ou diminuindo?",
          resposta: "\\(f'\\) aumenta (f cresce mais rápido ou decresce mais devagar).",
          resolucao: "\\(f''\\) é derivada de \\(f'\\).",
          interpretacao: "Aceleração da taxa.",
        },
              {
          id: "conc-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x^3 - 6x^2\\). Onde a concavidade muda de sentido?",
          resposta: "Em \\(x = 2\\): côncava para baixo antes, para cima depois",
          resolucao: "\\(f''(x) = 6x - 12\\), que zera em \\(x = 2\\). Para \\(x < 2\\) vale \\(f'' < 0\\); para \\(x > 2\\), \\(f'' > 0\\).",
          interpretacao: "Ponto de inflexão é onde a curva troca o jeito de curvar. Em economia, é onde o crescimento deixa de acelerar e passa a desacelerar.",
          erroComum: "Confundir inflexão (\\(f'' = 0\\)) com extremo (\\(f' = 0\\)).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-07", "ad-ap-08"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(f''\\) descreve concavidade.",
        "Teste \\(f''(c)\\) classifica críticos com \\(f'(c)=0\\).",
        "\\(f''=0\\) pode ser inflexão.",
      ],
    },
  },

  "otimizacao": {
    meta: c1Meta({
      title: "Problemas de otimização",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "15 min",
      next: { slug: "velocidade-producao", title: "Velocidade e produção" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Otimizar = traduzir história → função → domínio → extremo → frase resposta.",
        "É o tipo de questão que mais aparece em prova aplicada.",
      ],
    },
    explicacao: {
      title: "Roteiro em 5 passos",
      paragraphs: [
        "1) Desenho e variável x. 2) Restrição → relação. 3) Função objetivo (área, lucro…). 4) Domínio. 5) Derivada, críticos, comparar valores.",
      ],
      formula: "objetivo(x) → derive → teste críticos + bordas",
      callout: "Unidades e frase final valem pontos.",
    },
    ondeAparece: {
      title: "Clássicos",
      items: [
        { label: "Cerca", detail: "Área máxima com perímetro fixo" },
        { label: "Caixa", detail: "Volume máximo cortando cantos" },
        { label: "Lucro", detail: "L(x)=R(x)−C(x)" },
      ],
    },
    exemplo: {
      title: "Campo retangular",
      situacao: "Cercar 40 m de tela contra um muro (sem tela no muro). Largura \\(x\\), comprimento \\(y\\). Área máxima?",
    },
    passos: {
      title: "Modelar",
      steps: [
        { title: "Restrição", detail: "\\(x+2y=40\\) (dois lados y e um x)." },
        { title: "Área", detail: "\\[A=xy = \\frac{x(40-x)}{2} = 20x - \\frac{x^2}{2}\\]" },
        { title: "Domínio", detail: "\\(x \\in (0,40)\\)." },
        { title: "A′=0", detail: "\\(20-x=0 \\Rightarrow x=20,\\ y=10,\\ A=200\\) m²." },
      ],
    },
    interpretacao: {
      title: "Resposta",
      paragraphs: [
        "Retângulo 20 m perpendicular ao muro, 10 m paralelo — área máxima 200 m².",
        "Sempre verifique se \\(x=20\\) respeita contexto.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Montar função errada na restrição.",
        "Esquecer domínio físico.",
        "Responder só x sem área/lucro pedido.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "opt-g1",
          type: "aplicada",
          enunciado: "Dois números positivos com soma 20 e produto máximo. Modelo?",
          resposta: "\\(P(x)=x(20-x)\\), máximo em \\(x=10\\)",
          resolucao: "\\(P'=20-2x=0\\).",
          interpretacao: "Quadrado 10+10.",
        },
        {
          id: "opt-g2",
          type: "interpretacao",
          enunciado: "Por que comparar f nos endpoints após achar críticos?",
          resposta: "Máximo global pode estar na borda do domínio.",
          resolucao: "Ex.: [0,10] fechado.",
          interpretacao: "Checklist completo.",
        },
              {
          id: "opt-g3",
          type: "aplicada",
          enunciado: "Um terreno retangular será cercado com \\(120\\) m de tela e dividido ao meio por outra cerca, paralela a um dos lados. Quais dimensões dão a maior área?",
          resposta: "\\(30\\) m por \\(20\\) m, com área máxima de \\(600\\ \\text{m}^2\\)",
          resolucao: "Com a divisória, a tela cobre \\(2w + 3h = 120\\), logo \\(w = 60 - 1{,}5h\\). \\(A(h) = h(60 - 1{,}5h) = 60h - 1{,}5h^2\\). \\(A'(h) = 60 - 3h = 0 \\Rightarrow h = 20\\) e \\(w = 30\\).",
          interpretacao: "A divisória extra muda o formato ótimo: sem ela o melhor seria o quadrado; com ela, o lado dividido encolhe.",
          erroComum: "Montar o perímetro como \\(2w + 2h\\), esquecendo que a divisória também consome tela.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-09", "ad-ap-10"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Modelar → derivar → testar críticos e bordas.",
        "Restrição define variáveis.",
        "Resposta em linguagem do problema.",
      ],
    },
  },

  "velocidade-producao": {
    meta: c1Meta({
      title: "Velocidade de produção e taxas relacionadas (intro)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "12 min",
      next: { slug: "area-volume-max", title: "Área e volume máximos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Às vezes duas grandezas mudam no tempo ligadas por equação — derivar ambos os lados em t.",
        "Velocidade de produção: dQ/dt; otimizar estoque ou fluxo usa mesma ideia de taxa.",
      ],
    },
    explicacao: {
      title: "Ideia",
      paragraphs: [
        "Se \\(V(t)\\) volume e \\(h(t)\\) altura relacionados por \\(V=\\pi r^2 h\\) com r fixo, \\(\\frac{dV}{dt} = \\pi r^2 \\frac{dh}{dt}\\).",
        "Taxas relacionadas: derive implicitamente em relação ao tempo.",
        "Cálculo 1 intro: reconhecer que derivada mede ritmo de mudança conjunta.",
      ],
      formula: "d/dt [relação em x,y,t] = 0",
      formulaLatex: "\\frac{d}{dt}\\left[\\text{relação em } x,y,t\\right] = 0",
      formulaAria: "derivada em relação a t da relação entre x, y e t igual a zero",
      callout: "Problemas clássicos de escada e balde — mesma estrutura.",
    },
    ondeAparece: {
      title: "Contextos",
      items: [
        { label: "Fábrica", detail: "Peças por hora" },
        { label: "Tanque", detail: "Nível sobe, vazão" },
        { label: "Projeto", detail: "Progresso %/semana" },
      ],
    },
    exemplo: {
      title: "Produção \\(Q(t)\\)",
      situacao: "\\(Q(t)=50t-t^2\\) peças em \\(0 \\leq t \\leq 50\\) h. Quando produção instantânea é máxima?",
    },
    passos: {
      title: "Taxa",
      steps: [
        { title: "Q′(t)", detail: "\\(Q'(t) = 50-2t\\)." },
        { title: "Q′=0", detail: "\\(t=25\\) h." },
        { title: "Interpretação", detail: "Ritmo de produção máximo na metade do intervalo; depois desacelera." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "\\(Q\\) acumula peças; \\(Q'\\) é taxa instantânea de produção.",
        "\\(Q\\) total máxima em \\(t=50\\) (endpoint), mas taxa máxima em \\(t=25\\).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir total acumulado com taxa.",
        "Esquecer unidade de tempo.",
        "Derivar em relação errada (x vs t).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "vp-g1",
          type: "calculo",
          enunciado: "\\(s(t)=t^2\\). Velocidade máxima em \\([0,5]\\)?",
          resposta: "\\(v(5)=10\\) m/s",
          resolucao: "\\(v=2t\\) crescente; máximo no fim do intervalo.",
          interpretacao: "Taxa cresce com t.",
        },
        {
          id: "vp-g2",
          type: "interpretacao",
          enunciado: "\\(Q'(t)<0\\). O que ocorre com estoque sendo produzido?",
          resposta: "Produção instantânea negativa ou modelo só válido até certo t — revisar contexto.",
          resolucao: "Taxa negativa = diminui acúmulo.",
          interpretacao: "Ler enunciado físico.",
        },
              {
          id: "vp-g3",
          type: "aplicada",
          enunciado: "O raio de uma mancha circular de óleo cresce a \\(2\\) m/min. A que taxa a área cresce quando \\(r = 10\\) m? (Use \\(A = \\pi r^2\\).)",
          resposta: "\\(40\\pi \\approx 126\\ \\text{m}^2\\) por minuto",
          resolucao: "\\(A = \\pi r^2 \\Rightarrow \\frac{dA}{dt} = 2\\pi r \\cdot \\frac{dr}{dt}\\). Com \\(r = 10\\) e \\(\\frac{dr}{dt} = 2\\): \\(2\\pi \\cdot 10 \\cdot 2 = 40\\pi\\).",
          interpretacao: "Duas taxas ligadas pela geometria: o raio cresce sempre a 2 m/min, mas a área cresce cada vez mais rápido, porque depende de \\(r\\).",
          erroComum: "Derivar \\(A = \\pi r^2\\) como \\(2\\pi r\\) e parar, esquecendo de multiplicar por \\(\\frac{dr}{dt}\\).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-11", "ad-ap-12"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Derivada em relação ao tempo = taxa instantânea.",
        "Produção máxima vs acumulado máximo podem ocorrer em instantes diferentes.",
        "Taxas relacionadas derivam vínculos.",
      ],
    },
  },

  "area-volume-max": {
    meta: c1Meta({
      title: "Área e volume máximos",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "13 min",
      next: { slug: "lucro-maximo", title: "Lucro máximo na prática" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Geometria + cálculo: maximizar área ou volume com material limitado.",
        "Padrão de prova desde o ensino médio avançado até engenharia.",
      ],
    },
    explicacao: {
      title: "Estratégia",
      paragraphs: [
        "Desenhe, nomeie dimensões, uma variável livre.",
        "Perímetro, área, superfície ou volume como função objetivo.",
        "Derivada zero + teste de máximo.",
      ],
      formula: "V(x) ou A(x) → V′(x)=0",
      formulaLatex: "V(x) \\text{ ou } A(x) \\;\\to\\; V'(x)=0",
      formulaAria: "V de x ou A de x, derive e iguale a zero",
    },
    ondeAparece: {
      title: "Problemas",
      items: [
        { label: "Jardim", detail: "Área com cerca fixa" },
        { label: "Caixa sem tampa", detail: "Volume com chapa limitada" },
        { label: "Cilindro", detail: "Lata que gasta menos material (intro)" },
      ],
    },
    exemplo: {
      title: "Caixa sem tampa",
      situacao: "Cartão \\(12 \\times 12\\). Cortar quadrados de lado \\(x\\) nos cantos e dobrar. Volume máximo?",
    },
    passos: {
      title: "Modelo",
      steps: [
        { title: "Base", detail: "\\(12-2x\\) por lado." },
        { title: "V(x)", detail: "\\(V(x) = x(12-2x)^2\\)." },
        { title: "Domínio", detail: "\\(0<x<6\\)." },
        { title: "Derivar e resolver", detail: "\\(V'=0\\) no interior \\(\\to x=2\\) (com \\(0<x<6\\))." },
        { title: "V(2)", detail: "Base \\(8 \\times 8\\), altura 2 \\(\\to V=128\\) cm³." },
      ],
    },
    interpretacao: {
      title: "Conferência",
      paragraphs: [
        "Sempre teste \\(x\\) pequeno (\\(V \\to 0\\)) e \\(x \\to 6\\) (\\(V \\to 0\\)) para confirmar máximo interior.",
        "Resposta: dimensões da caixa, não só x.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer que falta a tampa na área de material.",
        "Domínio 0<x<6 violado.",
        "Confundir área da base com volume.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "av-g1",
          type: "aplicada",
          enunciado: "Retângulo de perímetro 24. Lados \\(x\\) e \\(12-x\\). Área máxima?",
          resposta: "\\(36\\) com \\(x=6\\)",
          resolucao: "\\(A=12x-x^2\\), \\(A'=12-2x=0\\).",
          interpretacao: "Quadrado lado 6.",
        },
        {
          id: "av-g2",
          type: "compreensao",
          enunciado: "Por que \\(V \\to 0\\) quando \\(x \\to 0^+\\) na caixa?",
          resposta: "Altura \\(x \\to 0\\).",
          resolucao: "Volume colapsa.",
          interpretacao: "Endpoints ajudam a confiar no crítico.",
        },
              {
          id: "av-g3",
          type: "aplicada",
          enunciado: "Uma caixa sem tampa tem base quadrada de lado \\(x\\) e volume fixo de \\(32\\ \\text{cm}^3\\). Quais dimensões usam menos material?",
          resposta: "Base \\(4\\) cm e altura \\(2\\) cm, com \\(48\\ \\text{cm}^2\\) de material",
          resolucao: "Do volume: \\(h = \\frac{32}{x^2}\\). Área \\(= x^2 + 4xh = x^2 + \\frac{128}{x}\\). Derivando: \\(2x - \\frac{128}{x^2} = 0 \\Rightarrow x^3 = 64 \\Rightarrow x = 4\\), e \\(h = 2\\).",
          interpretacao: "Aqui se minimiza material com volume fixo — o espelho do problema de maximizar volume com material fixo. Mesma técnica, pergunta invertida.",
          erroComum: "Tentar minimizar o volume em vez da área, trocando o que é fixo pelo que é objetivo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-13", "ad-ap-14"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Geometria → uma variável → volume/área.",
        "Teste endpoints e críticos.",
        "Responda com dimensões e unidades.",
      ],
    },
  },

  "lucro-maximo": {
    meta: c1Meta({
      title: "Lucro máximo na prática",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "12 min",
      next: { slug: "revisao-aplic-derivadas", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Empresas querem \\(L(x)=R(x)-C(x)\\) máximo — onde produzir/vender para melhor lucro.",
        "Une custo marginal, receita e otimização.",
      ],
    },
    explicacao: {
      title: "Passos",
      paragraphs: [
        "Monte \\(R(x)\\) e \\(C(x)\\) do enunciado.",
        "\\(L(x)=R(x)-C(x)\\); domínio \\(x \\geq 0\\).",
        "\\(L'(x)=R'(x)-C'(x)\\); zeros de \\(L'\\) ou compare críticos.",
        "Interprete \\(x\\) em unidades vendidas/produzidas.",
      ],
      formula: "L′(x)=0 ⇔ R′(x)=C′(x) (marginais iguais)",
      formulaLatex: "L'(x)=0 \\iff R'(x)=C'(x) \\quad (\\text{marginais iguais})",
      formulaAria: "L linha de x igual a zero se e somente se R linha de x igual a C linha de x",
      callout: "Produzir enquanto receita marginal > custo marginal.",
    },
    ondeAparece: {
      title: "Modelos",
      items: [
        { label: "Preço fixo", detail: "\\(R=px\\)" },
        { label: "Demanda linear", detail: "\\(p=a-bx\\)" },
        { label: "Custo quadrático", detail: "Escalas de produção" },
      ],
    },
    exemplo: {
      title: "\\(C(x)=2000+10x+0{,}02x^2\\), \\(p=50\\) reais/unidade",
      situacao: "\\(R(x)=50x\\). Lucro máximo?",
    },
    passos: {
      title: "Cálculo",
      steps: [
        { title: "L(x)", detail: "\\[L(x) = 50x-2000-10x-0{,}02x^2 = 40x-2000-0{,}02x^2\\]" },
        { title: "L′", detail: "\\(40-0{,}04x=0 \\Rightarrow x=1000\\)." },
        { title: "L(1000)", detail: "Substituir e interpretar lucro em reais." },
      ],
    },
    interpretacao: {
      title: "Marginal",
      paragraphs: [
        "Em \\(x=1000\\), \\(R'=50\\) e \\(C'=10+0{,}04 \\cdot 1000=50\\) — marginais iguais.",
        "Antes disso \\(R'>C'\\); depois o contrário.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Maximizar receita em vez de lucro.",
        "Esquecer custo fixo na interpretação (afeta \\(L\\), não \\(L'=0\\)).",
        "\\(x\\) não inteiro quando só faz sentido inteiro — testar vizinhos.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "lm-g1",
          type: "calculo",
          enunciado: "\\(R(x)=80x\\), \\(C(x)=500+15x\\). \\(L'(x)=0\\)?",
          resposta: "Nunca — \\(R'>C'\\) sempre",
          resolucao: "\\(L'=65>0\\); lucro cresce no modelo linear sem limite.",
          interpretacao: "Modelo precisa domínio limitado ou curvatura.",
        },
        {
          id: "lm-g2",
          type: "aplicada",
          enunciado: "\\(L(x)=-x^2+100x-500\\). \\(x\\) que maximiza?",
          resposta: "\\(x=50\\)",
          resolucao: "\\(L'=-2x+100=0\\).",
          interpretacao: "Parábola abre para baixo.",
        },
              {
          id: "lm-g3",
          type: "aplicada",
          enunciado: "\\(R(x) = 60x - 0{,}5x^2\\) e \\(C(x) = 10x + 200\\). Ache a produção de lucro máximo usando \\(R'(x) = C'(x)\\).",
          resposta: "\\(x = 50\\), com lucro de R$ 1.050,00",
          resolucao: "\\(R'(x) = 60 - x\\) e \\(C'(x) = 10\\). Igualando: \\(60 - x = 10 \\Rightarrow x = 50\\). Daí \\(L(50) = 1750 - 700 = 1050\\).",
          interpretacao: "Produza enquanto a receita marginal supera o custo marginal; pare quando se igualam. A regra econômica sai direto de \\(L' = 0\\).",
          erroComum: "Igualar \\(R(x) = C(x)\\) — isso dá o ponto de equilíbrio, onde o lucro é zero, não máximo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-15", "ad-ap-16"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Maximize \\(L=R-C\\).",
        "\\(L'=0\\) ↔ marginais iguais.",
        "Interprete \\(x\\) e lucro em reais.",
      ],
    },
  },

  "revisao-aplic-derivadas": {
    meta: c1Meta({
      title: "Revisão: Aplicações de derivadas",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "8 min",
      next: {
        slug: "ideia-de-soma",
        moduleSlug: "integrais",
        title: "Ideia de soma acumulada",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Este módulo transformou derivada em ferramenta de decisão: onde sobe, onde maximizar, como modelar.",
        "Próximo bloco: integrais — acúmulo em vez de taxa instantânea.",
      ],
    },
    explicacao: {
      title: "Checklist",
      paragraphs: [
        "✓ Sinal de \\(f'\\): crescimento/decrescimento.",
        "✓ Críticos e máximos/mínimos.",
        "✓ \\(f''\\) e concavidade (quando couber).",
        "✓ Otimização: modelar, derivar, testar bordas.",
        "✓ Lucro e geometria.",
      ],
      formula: "Problema aplicado = modelo + domínio + L′ ou f′=0",
      formulaLatex: "\\text{problema aplicado} = \\text{modelo} + \\text{domínio} + (L'=0 \\text{ ou } f'=0)",
      formulaAria: "problema aplicado igual a modelo mais domínio mais L linha igual a zero ou f linha igual a zero",
      callout: "Integrais respondem \"quanto acumulou\" — complemento natural.",
    },
    ondeAparece: {
      title: "Conexão",
      items: [
        { label: "Derivada", detail: "Taxa instantânea" },
        { label: "Integral", detail: "Acúmulo / área" },
        { label: "TFC", detail: "Liga as duas (módulo 7)" },
      ],
    },
    exemplo: {
      title: "Simulado mental",
      situacao: "Cerca 100 m para cercar campo retangular com um lado no rio (sem cerca). Variável?",
    },
    passos: {
      title: "Esboço",
      steps: [
        { title: "Variáveis", detail: "Largura \\(x\\), comprimento \\(y\\)." },
        { title: "Restrição", detail: "\\(x+2y=100\\)." },
        { title: "Objetivo", detail: "\\(A=xy \\to\\) otimizar." },
      ],
    },
    interpretacao: {
      title: "Seguir",
      paragraphs: [
        "Abra Integrais com sentido — comece por Ideia de soma.",
        "Derivada e integral são os dois pilares finais da trilha.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Pular modelagem e ir direto à fórmula.",
        "Não revisar erros de sinal em f′.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "rad-g1",
          type: "compreensao",
          enunciado: "Liste três passos de um problema de otimização.",
          resposta: "Modelar, derivar (críticos), testar bordas e interpretar.",
          resolucao: "Roteiro da aula 5.",
          interpretacao: "Estrutura de prova.",
        },
        {
          id: "rad-g2",
          type: "calculo",
          enunciado: "\\(f(x)=-2x^2+8x+1\\). Máximo?",
          resposta: "\\(x=2\\), \\(f(2)=9\\)",
          resolucao: "\\(f'=-4x+8=0\\).",
          interpretacao: "Revisão extremos.",
        },
              {
          id: "rad-g3",
          type: "calculo",
          enunciado: "\\(f(x) = x^3 - 3x^2\\). (a) Ache os pontos críticos. (b) Classifique cada um usando \\(f''\\).",
          resposta: "(a) \\(x = 0\\) e \\(x = 2\\); (b) máximo local em \\(0\\), mínimo local em \\(2\\)",
          resolucao: "\\(f'(x) = 3x^2 - 6x = 3x(x-2)\\), que zera em \\(0\\) e \\(2\\). Como \\(f''(x) = 6x - 6\\): \\(f''(0) = -6 < 0\\) (máximo) e \\(f''(2) = 6 > 0\\) (mínimo).",
          interpretacao: "A segunda derivada classifica sem montar tabela de sinais — é o teste mais rápido quando \\(f''\\) é fácil de calcular.",
          erroComum: "Classificar pelo valor de \\(f\\) nos críticos, em vez do sinal de \\(f''\\).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Pratique com exercícios resolvidos passo a passo.", exerciseIds: ["ad-ap-17", "ad-ap-18", "dsf-apder-01"] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(f'\\) e \\(f''\\) guiam forma do gráfico e extremos.",
        "Otimização = modelo + domínio + críticos.",
        "Próximo: integrais e acúmulo.",
      ],
    },
  },
};
