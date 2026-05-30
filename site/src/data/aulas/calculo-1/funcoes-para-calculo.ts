import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";

const MOD = "funcoes-para-calculo";
const MOD_TITLE = "Funções para Cálculo";

export const funcoesParaCalculoAulas: Record<string, AulaContent> = {
  "funcoes-no-calculo": {
    meta: c1Meta({
      title: "Funções no contexto do Cálculo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "10 min",
      glossaryTerms: ["Função", "Variável", "Lei"],
      next: { slug: "dominio-imagem", title: "Domínio e imagem (revisão)" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Em Cálculo, quase tudo é função: posição em função do tempo, custo em função da quantidade, temperatura em função da hora.",
        "f(x) não é \"f vezes x\" — é a regra que transforma entrada em saída.",
        "Dominar essa linguagem evita que limites e derivadas pareçam símbolos soltos.",
      ],
    },
    explicacao: {
      title: "O que é uma função aqui",
      paragraphs: [
        "Entrada (x) no domínio → regra f → saída f(x) na imagem.",
        "Gráfico: conjunto de pontos (x, f(x)); visualiza comportamento.",
        "Cálculo pergunta: o que acontece com f(x) quando x muda, se aproxima, ou acumula.",
      ],
      callout: "Primeiro entenda a história; depois a notação.",
      formula: "y = f(x)",
      formulaLegend: "x = entrada · f(x) = saída",
    },
    ondeAparece: {
      title: "Exemplos reais",
      items: [
        { label: "s(t)", detail: "Posição do carro no tempo" },
        { label: "C(q)", detail: "Custo de produzir q unidades" },
        { label: "T(h)", detail: "Temperatura às h horas" },
        { label: "P(t)", detail: "População no ano t" },
      ],
    },
    exemplo: {
      title: "Tradução de problema",
      situacao: "A cada hora trabalhada, um freelancer ganha R$ 80 fixos de deslocamento mais R$ 45 por hora. Expresse o ganho G(h).",
    },
    passos: {
      title: "Montar a função",
      steps: [
        { title: "Identificar variável", detail: "h = horas trabalhadas." },
        { title: "Parte fixa", detail: "R$ 80 → termo constante." },
        { title: "Parte variável", detail: "45·h." },
        { title: "Função", detail: "G(h) = 45h + 80." },
      ],
    },
    interpretacao: {
      title: "Leitura",
      paragraphs: [
        "G(0) = 80: só deslocamento. G(2) = 170: duas horas de trabalho.",
        "Esse padrão fixo + taxa aparecerá em derivadas (custo marginal).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir f(x) com produto f·x.",
        "Esquecer unidades (h em horas, R$ na saída).",
        "Usar duas variáveis sem combinar numa lei única.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "fnc-g1",
          type: "aplicada",
          enunciado: "C(x) = 12x + 200 é custo de x peças. O que é 200?",
          resposta: "Custo fixo (independe de x).",
          resolucao: "Termo constante quando x = 0.",
          interpretacao: "Fixo + variável = função afim.",
        },
        {
          id: "fnc-g2",
          type: "compreensao",
          enunciado: "Por que Cálculo insiste em funções?",
          resposta: "Porque modelam como uma grandeza depende de outra.",
          resolucao: "Limites e derivadas operam sobre f(x).",
          interpretacao: "Sem função, não há objeto de estudo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Veja função afim no Pré-Cálculo.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Função = regra que associa entrada a saída.",
        "Notação f(x); gráfico (x, f(x)).",
        "Modelos reais: custo, posição, temperatura.",
        "Traduza problema de texto para f(x) antes de calcular.",
      ],
    },
  },

  "dominio-imagem": {
    meta: c1Meta({
      title: "Domínio e imagem (revisão)",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "11 min",
      next: { slug: "graficos-leitura", title: "Ler gráficos com sentido" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Domínio: valores de x permitidos. Imagem: valores de f(x) que realmente aparecem.",
        "Em Cálculo, divisão por zero e raiz de negativo bloqueiam pontos — isso define onde limites fazem sentido.",
      ],
    },
    explicacao: {
      title: "Conceitos",
      paragraphs: [
        "Domínio natural: todos os x que não quebram a fórmula (denominador ≠ 0, radicando ≥ 0).",
        "Imagem: projete no eixo y o que o gráfico alcança.",
        "Restrição de contexto: x ≥ 0 em quantidade produzida, mesmo que a fórmula aceite negativos.",
      ],
      formula: "f: D → ℝ",
      formulaLegend: "D = domínio",
      callout: "Contexto real pode cortar o domínio matemático.",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "1/x", detail: "Domínio: x ≠ 0" },
        { label: "√x", detail: "Domínio: x ≥ 0" },
        { label: "Produção", detail: "x ≥ 0 unidades" },
        { label: "Tempo", detail: "t ≥ 0 em experimentos" },
      ],
    },
    exemplo: {
      title: "f(x) = 1/(x − 2)",
      situacao: "Qual x não pode ser usado? O que acontece perto de x = 2?",
    },
    passos: {
      title: "Análise",
      steps: [
        { title: "Denominador", detail: "x − 2 ≠ 0 → x ≠ 2." },
        { title: "Domínio", detail: "ℝ \\ {2} ou \"todos os reais exceto 2\"." },
        { title: "Perto de 2", detail: "f(x) explode → assunto do módulo de limites." },
      ],
    },
    interpretacao: {
      title: "Ligação com limites",
      paragraphs: [
        "Buraco em x = 2 é exatamente onde estudamos limite e continuidade.",
        "Domínio errado → resposta sem sentido na aplicação.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que domínio é sempre todos os reais.",
        "Confundir imagem com codomínio declarado.",
        "Ignorar restrição física (x ≥ 0).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "dom-g1",
          type: "calculo",
          enunciado: "Domínio de f(x) = √(x − 5)?",
          resposta: "x ≥ 5",
          resolucao: "Radicando ≥ 0 → x − 5 ≥ 0.",
          interpretacao: "Raiz par só aceita não negativos.",
        },
        {
          id: "dom-g2",
          type: "compreensao",
          enunciado: "f(x) = 3x + 1 com x = número de itens vendidos (≥ 0). Domínio?",
          resposta: "x ≥ 0 (reais não negativos).",
          resolucao: "Contexto restringe, apesar da reta aceitar negativos.",
          interpretacao: "Domínio matemático vs domínio aplicado.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Domínio = entradas válidas; imagem = saídas alcançadas.",
        "Cuidado com denominador zero e raízes.",
        "Contexto pode restringir x.",
        "Prepara limites em pontos excluídos.",
      ],
    },
  },

  "graficos-leitura": {
    meta: c1Meta({
      title: "Ler gráficos com sentido",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "10 min",
      next: { slug: "crescimento-decrescimento", title: "Crescimento e decrescimento" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Prova de Cálculo mistura álgebra e gráfico. Quem só manipula símbolos perde metade da intuição.",
        "Ler gráfico é prever limite, derivada e integral antes de calcular.",
      ],
    },
    explicacao: {
      title: "O que olhar",
      paragraphs: [
        "Eixo x e y: o que cada um mede?",
        "Onde sobe, desce, fica estável.",
        "Cruzamentos com eixos (zeros).",
        "Comportamento longe: tendência quando x → ∞.",
      ],
      callout: "Gráfico é o filme; fórmula é o roteiro.",
      formula: "(x, f(x))",
      formulaLegend: "cada ponto do gráfico",
    },
    ondeAparece: {
      title: "Onde cai na faculdade",
      items: [
        { label: "Limite", detail: "Tendência perto de um ponto" },
        { label: "Derivada", detail: "Inclinação da curva" },
        { label: "Integral", detail: "Área sob o trecho" },
        { label: "Continuidade", detail: "Sem salto ou buraco" },
      ],
    },
    exemplo: {
      title: "Gráfico de custo",
      situacao: "Curva de custo médio em U: alto no início, mínimo no meio, sobe de novo. Onde produzir faz sentido?",
    },
    passos: {
      title: "Leitura",
      steps: [
        { title: "Mínimo", detail: "Ponto mais baixo da curva." },
        { title: "Antes do mínimo", detail: "Custo médio caindo." },
        { title: "Depois", detail: "Custo médio subindo de novo." },
        { title: "Decisão", detail: "Produzir perto do mínimo (otimização depois)." },
      ],
    },
    interpretacao: {
      title: "Mensagem",
      paragraphs: [
        "Você não precisa desenhar perfeito — precisa interpretar comportamento.",
        "Sketch (esboço) de gráfico é habilidade de prova.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir eixos x e y.",
        "Ler valor em escala errada.",
        "Ignorar unidades na legenda.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "grf-g1",
          type: "interpretacao",
          enunciado: "Gráfico sobe da esquerda para a direita. f é crescente?",
          resposta: "Sim, no intervalo observado.",
          resolucao: "Maior x → maior f(x) no trecho.",
          interpretacao: "Crescimento visual = derivada positiva (depois).",
        },
        {
          id: "grf-g2",
          type: "compreensao",
          enunciado: "Gráfico com buraco em x = 1. O que questionar primeiro?",
          resposta: "Limite quando x → 1.",
          resolucao: "Valor no ponto pode não existir; tendência sim.",
          interpretacao: "Prepara módulo de limites.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Identifique eixos, tendência, zeros e extremos.",
        "Gráfico apoia limite, derivada e integral.",
        "Esboce para pensar, mesmo sem software.",
      ],
    },
  },

  "crescimento-decrescimento": {
    meta: c1Meta({
      title: "Crescimento e decrescimento",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "11 min",
      next: { slug: "interpretacao-grafica", title: "Interpretar o que o gráfico diz" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Saber onde f sobe ou desce é pré-requisito para derivada e otimização.",
        "Na prática: lucro aumentando? estoque caindo? temperatura subindo?",
      ],
    },
    explicacao: {
      title: "Definição intuitiva",
      paragraphs: [
        "Crescente em intervalo: ao andar para a direita no gráfico, sobe.",
        "Decrescente: ao andar para a direita, desce.",
        "Constante: trecho horizontal.",
      ],
      formula: "f′(x) > 0 → cresce | f′(x) < 0 → decresce",
      formulaLegend: "derivada virá depois; hoje use o gráfico",
      callout: "Intervalo importa — função pode subir e descer em regiões diferentes.",
    },
    ondeAparece: {
      title: "Aplicações",
      items: [
        { label: "Lucro", detail: "Onde receita supera custo crescente" },
        { label: "Medicina", detail: "Concentração subindo ou caindo" },
        { label: "Marketing", detail: "Vendas em alta ou queda" },
      ],
    },
    exemplo: {
      title: "f(x) = −x² + 4x",
      situacao: "Parábola com máximo. Onde cresce e onde decresce?",
    },
    passos: {
      title: "Esboço mental",
      steps: [
        { title: "Abre para baixo", detail: "Coeficiente de x² negativo." },
        { title: "Sobe até o topo", detail: "Crescente antes do vértice." },
        { title: "Desce depois", detail: "Decrescente após o vértice." },
        { title: "Vértice", detail: "Máximo — assunto de aplicações de derivada." },
      ],
    },
    interpretacao: {
      title: "Antecipação",
      paragraphs: [
        "Derivada positiva = crescente; negativa = decrescente; zero = possível extremo.",
        "Esta aula treina o olhar; o módulo 5 formaliza.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Dizer \"sempre crescente\" olhando só um pedaço.",
        "Confundir crescente com positivo (f pode ser negativa e subir).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cre-g1",
          type: "interpretacao",
          enunciado: "f(x) = 2x + 3. Crescente ou decrescente em ℝ?",
          resposta: "Crescente.",
          resolucao: "Coeficiente 2 > 0 → reta sobe.",
          interpretacao: "Afim com a > 0 sempre cresce.",
        },
        {
          id: "cre-g2",
          type: "compreensao",
          enunciado: "Em um intervalo f é decrescente. O que esperar de f′ ali (quando estudar derivada)?",
          resposta: "f′ negativa no intervalo.",
          resolucao: "Taxa de variação negativa.",
          interpretacao: "Liga gráfico a símbolo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Crescente/decrescente dependem do intervalo.",
        "Leia o gráfico da esquerda para a direita.",
        "Derivada formalizará esse olhar.",
      ],
    },
  },

  "interpretacao-grafica": {
    meta: c1Meta({
      title: "Interpretar o que o gráfico diz",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "10 min",
      next: { slug: "custo-receita", title: "Custo, receita e lucro" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Prova cobra interpretação: \"o que significa f(10) = 200?\"",
        "Número sem frase em português perde pontos e sentido.",
      ],
    },
    explicacao: {
      title: "Tradução gráfico ↔ linguagem",
      paragraphs: [
        "f(a) = b → quando x = a, a saída é b.",
        "Máximo no gráfico → melhor valor possível naquele modelo.",
        "Interseção de duas curvas → quantidades em equilíbrio.",
      ],
      callout: "Sempre diga o que é x e o que é y antes de interpretar.",
      formula: "f(a) = b ⇔ ponto (a, b) no gráfico",
    },
    ondeAparece: {
      title: "Frases típicas de prova",
      items: [
        { label: "Break-even", detail: "Receita = custo" },
        { label: "Estoque zero", detail: "f cruza eixo x" },
        { label: "Capacidade", detail: "Platô no gráfico" },
      ],
    },
    exemplo: {
      title: "Lucro L(x)",
      situacao: "L(100) = 5000. O que isso quer dizer?",
    },
    passos: {
      title: "Redação",
      steps: [
        { title: "x", detail: "100 unidades (ou o contexto dado)." },
        { title: "L(x)", detail: "Lucro em reais." },
        { title: "Frase", detail: "Ao produzir/vender 100 unidades, o lucro é R$ 5.000." },
      ],
    },
    interpretacao: {
      title: "Hábito",
      paragraphs: [
        "Após cada cálculo, escreva uma linha interpretando.",
        "Professor valoriza coerência de unidades.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Responder só o número.",
        "Trocar o papel de x e y.",
        "Interpretar fora do domínio válido.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "int-g1",
          type: "interpretacao",
          enunciado: "v(5) = 20 em v = velocidade (m/s), t em segundos. Interprete.",
          resposta: "No instante t = 5 s, a velocidade é 20 m/s.",
          resolucao: "Entrada 5 s, saída 20 m/s.",
          interpretacao: "Unidades na frase.",
        },
        {
          id: "int-g2",
          type: "aplicada",
          enunciado: "Gráficos de custo e receita se cruzam em x = 40. Significado?",
          resposta: "Break-even em 40 unidades.",
          resolucao: "C(x) = R(x) no ponto.",
          interpretacao: "Abaixo de 40, prejuízo; acima, lucro (se curvas típicas).",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Traduza f(a) para linguagem do problema.",
        "Declare sempre o significado de x e f(x).",
        "Interseções e extremos têm histórias práticas.",
      ],
    },
  },

  "custo-receita": {
    meta: c1Meta({
      title: "Custo, receita e lucro como funções",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "12 min",
      next: { slug: "velocidade-temperatura", title: "Velocidade e temperatura" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Modelos C(x), R(x), L(x) = R(x) − C(x) aparecem em Cálculo 1 e Economia.",
        "Derivada de custo = custo marginal; de lucro = onde lucro para de crescer.",
      ],
    },
    explicacao: {
      title: "Modelo básico",
      paragraphs: [
        "Custo fixo + custo variável por unidade → C(x) afim ou mais complexo.",
        "Receita = preço × quantidade → R(x) = p·x (preço constante).",
        "Lucro L(x) = R(x) − C(x).",
      ],
      formula: "L(x) = R(x) − C(x)",
      callout: "Lucro máximo no gráfico: topo da curva L.",
    },
    ondeAparece: {
      title: "Decisões",
      items: [
        { label: "Produzir ou não", detail: "L(x) > 0" },
        { label: "Quantidade ótima", detail: "Máximo de L(x)" },
        { label: "Custo marginal", detail: "C′(x) — custo de mais uma unidade" },
      ],
    },
    exemplo: {
      title: "Pequena empresa",
      situacao: "C(x) = 1000 + 8x, R(x) = 25x. Lucro? Quantidade para L = 0?",
    },
    passos: {
      title: "Resolver",
      steps: [
        { title: "Lucro", detail: "L(x) = 25x − (1000 + 8x) = 17x − 1000." },
        { title: "Break-even", detail: "17x − 1000 = 0 → x = 1000/17 ≈ 58,8." },
        { title: "Interpretação", detail: "A partir de ~59 unidades, lucro positivo." },
      ],
    },
    interpretacao: {
      title: "Cálculo adiante",
      paragraphs: [
        "Derivar L(x) e zerar achará produção ótima (módulo 6).",
        "Gráfico de L é parábola se C e R forem afins lineares em x.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer custo fixo no lucro.",
        "Achar que receita máxima = lucro máximo.",
        "x negativo em produção.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "cr-g1",
          type: "calculo",
          enunciado: "C(x)=500+10x, R(x)=30x. Encontre L(x).",
          resposta: "L(x) = 20x − 500",
          resolucao: "30x − 500 − 10x.",
          interpretacao: "Margem por unidade R$ 20 após custo variável.",
        },
        {
          id: "cr-g2",
          type: "aplicada",
          enunciado: "L(50) = −200. O que a empresa está vivendo?",
          resposta: "Prejuízo de R$ 200 ao produzir 50 unidades.",
          resolucao: "L negativo.",
          interpretacao: "Precisa ajustar preço, custo ou volume.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "L(x) = R(x) − C(x).",
        "Break-even: L(x) = 0.",
        "Custo fixo + variável modelam C(x).",
        "Otimização de lucro virá com derivadas.",
      ],
    },
  },

  "velocidade-temperatura": {
    meta: c1Meta({
      title: "Velocidade e temperatura: funções do tempo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "10 min",
      next: { slug: "revisao-funcoes-calculo", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "s(t), v(t), T(t) são os exemplos clássicos de Cálculo em física e engenharia.",
        "Posição → velocidade → aceleração é cadeia de taxas de variação.",
      ],
    },
    explicacao: {
      title: "Relações",
      paragraphs: [
        "s(t): posição. Velocidade média: Δs/Δt. Instantânea: limite quando Δt → 0.",
        "T(t): temperatura ao longo do dia; taxa de aquecimento = derivada de T.",
      ],
      formula: "v_média = Δs/Δt → v(t) = s′(t)",
      formulaLegend: "derivada como limite",
    },
    ondeAparece: {
      title: "Contextos",
      items: [
        { label: "Trânsito", detail: "Posição GPS no tempo" },
        { label: "Clima", detail: "T(t) em estação de medição" },
        { label: "Processos", detail: "Temperatura de forno industrial" },
      ],
    },
    exemplo: {
      title: "s(t) = t²",
      situacao: "Distância em metros, t em segundos. Velocidade média entre t=1 e t=3?",
    },
    passos: {
      title: "Cálculo",
      steps: [
        { title: "Δs", detail: "s(3)−s(1) = 9−1 = 8 m." },
        { title: "Δt", detail: "3−1 = 2 s." },
        { title: "Média", detail: "8/2 = 4 m/s." },
        { title: "Instantânea depois", detail: "Derivada: v(t)=2t → v(2)=4 m/s no meio do intervalo." },
      ],
    },
    interpretacao: {
      title: "Ponte",
      paragraphs: [
        "Velocidade instantânea é o caso motivador de limite e derivada.",
        "Temperatura segue a mesma lógica de \"quão rápido muda\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir posição com velocidade.",
        "Esquecer unidades (m/s vs m).",
        "Usar Δt = 0 na média (indeterminação).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "vel-g1",
          type: "calculo",
          enunciado: "s(t)=3t. Velocidade média de t=0 a t=4?",
          resposta: "3 m/s",
          resolucao: "Δs=12, Δt=4 → 12/4=3.",
          interpretacao: "Movimento uniforme: média = instantânea.",
        },
        {
          id: "vel-g2",
          type: "interpretacao",
          enunciado: "T(12)=30°C e T(14)=38°C. O que ocorreu?",
          resposta: "Aumento de 8°C em 2 horas.",
          resolucao: "ΔT=8, Δt=2.",
          interpretacao: "Taxa média 4°C/h no intervalo.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "s(t), T(t) modelam grandezas no tempo.",
        "Taxa média = Δ saída / Δ tempo.",
        "Instantânea → limite e derivada.",
      ],
    },
  },

  "revisao-funcoes-calculo": {
    meta: c1Meta({
      title: "Revisão: Funções para Cálculo",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "8 min",
      next: {
        slug: "ideia-de-limite",
        moduleSlug: "limites",
        title: "Ideia de limite (intuitivo)",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Consolidar funções evita retorno à estaca zero no módulo de limites.",
        "Checklist final antes de entrar em aproximação e tendência.",
      ],
    },
    explicacao: {
      title: "Checklist do módulo",
      paragraphs: [
        "✓ Montar f(x) a partir de problema.",
        "✓ Domínio e restrições.",
        "✓ Ler gráfico: cresce, decresce, máximo.",
        "✓ Interpretar f(a) em palavras.",
        "✓ Custo, receita, lucro e grandezas no tempo.",
      ],
      formula: "Próximo: lim (x→a) f(x)",
      callout: "Limite estuda f perto de um ponto — função precisa estar clara.",
    },
    ondeAparece: {
      title: "Conexão",
      items: [
        { label: "Limite", detail: "Comportamento perto de a" },
        { label: "Derivada", detail: "Taxa de mudança de f" },
        { label: "Integral", detail: "Acúmulo de f" },
      ],
    },
    exemplo: {
      title: "Mini-simulado mental",
      situacao: "f(x)=(x²−9)/(x−3). Simplifique para x≠3 e interprete o buraco em x=3.",
    },
    passos: {
      title: "Revisão rápida",
      steps: [
        { title: "Fatorar", detail: "x²−9=(x−3)(x+3)." },
        { title: "Simplificar", detail: "f(x)=x+3 para x≠3." },
        { title: "Gráfico", detail: "Reta com buraco em (3,6)." },
        { title: "Limite", detail: "Tendência para 6 — próximo módulo." },
      ],
    },
    interpretacao: {
      title: "Próximo módulo",
      paragraphs: [
        "Abra Limites sem trauma — comece por Ideia de limite.",
        "Marque este módulo como concluído no progresso se dominou o checklist.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Avançar sem interpretar gráficos.",
        "Pular exercícios guiados das aulas anteriores.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "rev-g1",
          type: "compreensao",
          enunciado: "Liste três perguntas que Cálculo faz sobre uma função.",
          resposta: "Tendência (limite), taxa de mudança (derivada), acúmulo (integral).",
          resolucao: "Mapa da trilha.",
          interpretacao: "Visão integrada.",
        },
        {
          id: "rev-g2",
          type: "calculo",
          enunciado: "R(x)=40x, C(x)=1200+15x. L(x)?",
          resposta: "L(x)=25x−1200",
          resolucao: "Subtração.",
          interpretacao: "Revisão custo-receita.",
        },
      ],
    },
    exerciciosAplicados: { title: "Exercícios aplicados", intro: "Em breve.", exerciseIds: [] },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Função, domínio, gráfico, interpretação, modelos econômicos e no tempo.",
        "Próximo: módulo Limites.",
        "Revisite aulas fracas antes de seguir.",
      ],
    },
  },
};
