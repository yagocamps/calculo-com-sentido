import type { AulaContent } from "@/data/aulas/types";
import { c1Meta } from "@/data/aulas/calculo-1/helpers";
import { oQueECalculo1Aula } from "@/data/aulas/o-que-e-calculo-1";

const MOD = "antes-do-calculo";
const MOD_TITLE = "Antes do Cálculo";

export const antesDoCalculoAulas: Record<string, AulaContent> = {
  "o-que-e-calculo-1": oQueECalculo1Aula,
  "por-que-reprovam": {
    meta: c1Meta({
      title: "Por que tanta gente reprova em Cálculo?",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "9 min",
      readingNotes: ["5 armadilhas comuns", "Como evitar cada uma"],
      glossaryTerms: ["Pré-requisito", "Prática", "Interpretação"],
      next: { slug: "pre-requisitos", title: "O que você precisa saber antes" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Reprovar em Cálculo 1 raramente significa \"não sou bom em matemática\". Na maioria das vezes significa estudar do jeito errado para essa matéria.",
        "A disciplina exige ligar símbolo, gráfico e situação real — quem só decora regras trava na primeira prova aplicada.",
        "Entender os padrões de reprovação é o primeiro passo para não repetir a história de milhares de calouros.",
      ],
    },
    explicacao: {
      title: "As cinco causas mais comuns",
      paragraphs: [
        "Pular o Pré-Cálculo e ir direto para limites sem dominar funções e gráficos.",
        "Estudar só assistindo aula, sem resolver exercícios com feedback.",
        "Decorar fórmulas sem saber o que cada letra mede na prática.",
        "Não revisar erros: cada prova errada repetida vira hábito.",
        "Deixar para a véspera — Cálculo é construção, não decoreba de uma noite.",
      ],
      callout:
        "Aprovação em Cálculo correlaciona mais com prática constante do que com \"dom natural\".",
      formula: "Sucesso ≈ base + prática + interpretação",
      formulaLegend: "não é talento misterioso",
    },
    ondeAparece: {
      title: "Sinais de alerta no semestre",
      items: [
        { label: "Prova 1 ruim", detail: "Costuma indicar lacuna em funções/gráficos" },
        { label: "Trava em 0/0", detail: "Limite sem intuição de aproximação" },
        { label: "Derivada mecânica", detail: "Sabe derivar mas não interpreta" },
        { label: "Integral vazia", detail: "Só aplica regra sem ideia de área/soma" },
        { label: "Desistência", detail: "Acumula dúvida sem buscar revisão cedo" },
      ],
    },
    exemplo: {
      title: "Caso típico",
      situacao:
        "Ana passou no ensino médio decorando fórmulas. Na faculdade, na primeira lista de limites, não entende por que \\(x\\) não pode ser 1 em \\(\\frac{x^2-1}{x-1}\\), mesmo o gráfico \"passando\" perto de 2.",
    },
    passos: {
      title: "Como sair desse ciclo",
      steps: [
        {
          title: "Diagnosticar a lacuna",
          detail: "Função? Gráfico? Limite? Identifique o primeiro tópico que não faz sentido.",
        },
        {
          title: "Voltar um degrau",
          detail: "Use o Pré-Cálculo deste site ou o módulo 2 da trilha antes de avançar.",
        },
        {
          title: "Praticar com sentido",
          detail: "Para cada exercício: o que é x? O que a resposta significa?",
        },
        {
          title: "Ritmo semanal",
          detail: "Pouco por dia bate muito na véspera da P2.",
        },
      ],
    },
    interpretacao: {
      title: "O que mudar na prática",
      paragraphs: [
        "Reprovar uma prova não define sua carreira — repetir o mesmo método de estudo, sim, mantém o risco.",
        "Professores avaliam aplicação e raciocínio; este site treina exatamente isso.",
        "Peça ajuda cedo: dúvida acumulada vira bloqueio em derivadas e integrais.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que \"todo mundo reprova, é normal\" e não mudar hábito.",
        "Copiar resolução sem fechar o caderno e tentar sozinho.",
        "Pular exercícios aplicados achando que só conta cálculo.",
        "Comparar ritmo com colega que já viu Cálculo no colégio técnico.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "repr-g1",
          type: "compreensao",
          enunciado:
            "Um aluno decora regras de derivada mas erra questões de velocidade. Qual lacuna é mais provável?",
          resolucao: "Falta interpretação e ligação com limite/função, não só regra.",
          resposta: "Interpretação e base em funções/limites.",
          interpretacao: "Derivada sem contexto vira álgebra vazia.",
        },
        {
          id: "repr-g2",
          type: "interpretacao",
          enunciado:
            "Depois de errar a P1, qual atitude acelera recuperação?",
          resolucao:
            "Revisar erros, reforçar pré-requisitos e praticar com feedback.",
          resposta: "Diagnóstico + revisão + prática constante.",
          interpretacao: "Só estudar capítulos novos sem corrigir base repete o ciclo.",
        },
              {
          id: "repr-g3",
          type: "compreensao",
          enunciado: "Um aluno acerta as contas de derivada, mas erra sempre que a questão pede o significado do resultado. O que ele precisa treinar?",
          resposta: "Interpretação: ler o resultado com unidade e contexto",
          resolucao: "Saber derivar é técnica; dizer o que \\(f'(3) = -5\\) significa naquele problema é interpretação. São habilidades diferentes, e a prova cobra as duas.",
          interpretacao: "Este site coloca uma seção de interpretação em toda aula justamente por isso: a conta certa sem leitura não fecha a questão.",
          erroComum: "Fazer mais exercícios de conta esperando que a interpretação venha junto por osmose.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Em breve: autoavaliação de hábitos de estudo.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Reprovação costuma vir de base fraca, pouca prática e estudo só mecânico.",
        "Funções e gráficos são o alicerce — não pule.",
        "Interpretar resultados importa tanto quanto calcular.",
        "Ritmo constante vence maratona na véspera.",
      ],
    },
  },

  "pre-requisitos": {
    meta: c1Meta({
      title: "O que você precisa saber antes de Cálculo 1",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "11 min",
      readingNotes: ["Checklist objetivo", "Ligação com a trilha"],
      glossaryTerms: ["Função", "Domínio", "Gráfico", "Equação"],
      next: { slug: "como-estudar", title: "Como estudar Cálculo sem trauma" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Cálculo 1 não começa do zero absoluto: ele pressupõe que você leia expressões, monte gráficos simples e entenda o que é uma função.",
        "Sem isso, limites e derivadas viram manipulação de símbolos sem imagem mental.",
        "Este checklist evita que você entre na sala já em desvantagem.",
      ],
    },
    explicacao: {
      title: "Checklist mínimo",
      paragraphs: [
        "Álgebra: fatorar, simplificar frações, resolver equações do 1º e 2º grau.",
        "Funções: notação \\(f(x)\\), domínio, imagem, composição básica.",
        "Gráficos: reta, parábola, exponencial simples; ler aumento e decrescimento.",
        "Trigonometria (nível intro): seno e cosseno em triângulo e no círculo — muitos cursos usam em derivadas.",
        "Raciocínio: traduzir problema de texto para equação ou função.",
      ],
      callout:
        "Não precisa ser expert — precisa não travar ao ver \\(f(x) = ax + b\\) ou \\(x^2\\).",
      formula: "Base sólida → limites → derivadas → integrais",
      formulaLegend: "cada etapa usa a anterior",
    },
    ondeAparece: {
      title: "Onde cada pré-requisito aparece",
      items: [
        { label: "Função afim", detail: "Custo fixo + variável; reta no gráfico" },
        { label: "Quadrática", detail: "Otimização e parábolas" },
        { label: "Exponencial/log", detail: "Crescimento populacional, juros" },
        { label: "Trig", detail: "Movimento circular, ondas" },
        { label: "Gráfico", detail: "Limite e continuidade visuais" },
      ],
    },
    exemplo: {
      title: "Autoavaliação rápida",
      situacao:
        "Você consegue, sem calculadora, dizer o que é \\(f(2)\\) se \\(f(x) = 3x - 1\\)? Esboçar se a reta sobe ou desce? Resolver \\(x^2 - 4 = 0\\)?",
    },
    passos: {
      title: "O que fazer se falhar algum item",
      steps: [
        {
          title: "Marcar lacunas",
          detail: "Liste: álgebra, funções, gráficos ou trig.",
        },
        {
          title: "Usar Pré-Cálculo",
          detail: "Trilha de 6 módulos neste site cobre o essencial.",
        },
        {
          title: "Módulo 2 aqui",
          detail: "Funções para Cálculo revisa o que mais cai na faculdade.",
        },
        {
          title: "Só então limites",
          detail: "Avance quando função e gráfico não assustarem mais.",
        },
      ],
    },
    interpretacao: {
      title: "Mensagem honesta",
      paragraphs: [
        "Ter lacunas é comum — o erro é ignorá-las.",
        "Duas semanas de revisão focada podem economizar um semestre inteiro.",
        "Cálculo recompensa quem constrói base, não quem pula etapas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que Cálculo vai \"ensinar álgebra de novo\" do zero.",
        "Confundir notação \\(f(x)\\) com multiplicação \\(f\\) vezes \\(x\\).",
        "Ignorar gráficos porque a prova \"é só conta\".",
        "Subestimar trigonometria em cursos de exatas.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "pre-g1",
          type: "calculo",
          enunciado: "Se \\(f(x) = 2x + 5\\), calcule \\(f(3)\\).",
          resolucao: "\\(f(3) = 2 \\cdot 3 + 5 = 11\\)",
          resposta: "\\(11\\)",
          interpretacao: "Substituir \\(x\\) por 3 na regra da função.",
        },
        {
          id: "pre-g2",
          type: "compreensao",
          enunciado: "\\(f(x) = -x + 4\\). A função cresce ou decresce?",
          resolucao: "Coeficiente de \\(x\\) é negativo → decresce.",
          resposta: "Decresce.",
          interpretacao: "Sinal de \\(a\\) em \\(ax + b\\) indica inclinação da reta.",
        },
              {
          id: "pre-g3",
          type: "calculo",
          enunciado: "Fatore \\(x^2 - 16\\) e simplifique \\(\\frac{x^2 - 16}{x - 4}\\) para \\(x \\neq 4\\).",
          resposta: "\\(x + 4\\)",
          resolucao: "\\(x^2 - 16 = (x-4)(x+4)\\), por diferença de quadrados. Cancelando o fator \\(x - 4\\), sobra \\(x + 4\\).",
          interpretacao: "Essa é a manobra mais usada em limites que dão \\(\\frac{0}{0}\\). Quem não fatora com segurança trava já na terceira aula de Cálculo.",
          erroComum: "Cancelar o \\(x^2\\) com o \\(x\\) — só se cancela fator inteiro, nunca parcela.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise no Pré-Cálculo: função afim, quadrática e gráficos.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Domine álgebra básica, funções e leitura de gráficos antes de limites.",
        "Trig introdutória ajuda em muitos cursos — não ignore.",
        "Use a trilha Pré-Cálculo + módulo 2 de Cálculo 1 para revisar.",
        "Autoavaliação honesta economiza tempo no semestre.",
      ],
    },
  },

  "como-estudar": {
    meta: c1Meta({
      title: "Como estudar Cálculo sem trauma",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "12 min",
      readingNotes: ["Rotina semanal", "Método em 4 passos"],
      glossaryTerms: ["Active recall", "Spaced practice"],
      next: {
        slug: "mapa-da-trilha",
        title: "Mapa: função → limite → derivada → integral",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Estudar Cálculo como se fosse História — só ler e grifar — não funciona. É habilidade de raciocínio e procedimento.",
        "O método certo reduz ansiedade porque você sabe o que fazer em cada sessão de estudo.",
        "Trauma em matemática muitas vezes vem de método, não de capacidade.",
      ],
    },
    explicacao: {
      title: "Método em quatro passos",
      paragraphs: [
        "1) Entender a ideia (texto, vídeo curto, esta trilha) — 20% do tempo.",
        "2) Resolver guiado — seguir passos comentados, 30%.",
        "3) Resolver sozinho — fechar solução e tentar de novo, 40%.",
        "4) Interpretar — escrever em uma frase o que o resultado significa, 10%.",
      ],
      callout: "Fechar o material e tentar de memória vale mais que reler três vezes.",
      formula: "Estudo eficaz = ideia + prática + revisão de erros",
      formulaLegend: "repetição espaçada ajuda",
    },
    ondeAparece: {
      title: "Rotina que funciona na faculdade",
      items: [
        { label: "Segunda/Quarta", detail: "Conceito novo + 5 exercícios guiados" },
        { label: "Terça/Quinta", detail: "Lista sozinho + corrigir erros" },
        { label: "Sexta", detail: "Revisar resumo e glossário" },
        { label: "Pré-prova", detail: "Simulado cronometrado + mapa de erros" },
        { label: "Grupo pequeno", detail: "Explicar para colega fixa o conteúdo" },
      ],
    },
    exemplo: {
      title: "Sessão de 50 minutos",
      situacao:
        "Você acabou de ver ideia de limite. Como organizar uma sessão única?",
    },
    passos: {
      title: "Roteiro da sessão",
      steps: [
        { title: "10 min", detail: "Reler resumo da aula e fórmula com legenda." },
        { title: "15 min", detail: "Dois exercícios guiados sem olhar resposta." },
        { title: "20 min", detail: "Três exercícios sozinho; marcar travadas." },
        { title: "5 min", detail: "Anotar erro mais frequente e agendar revisão." },
      ],
    },
    interpretacao: {
      title: "Ansiedade e expectativa",
      paragraphs: [
        "Errar na lista é dado — o progresso está em reduzir o mesmo erro.",
        "Compare-se com seu eu da semana passada, não com o colega que já domina.",
        "Dormir e pausar faz parte do aprendizado (consolidação de memória).",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Só copiar solução do professor ou IA sem tentar antes.",
        "Estudar 6 horas um dia e zero na semana seguinte.",
        "Pular interpretação: \"achei o número, pronto\".",
        "Não ter caderno de erros — repetirá os mesmos pontos na prova.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "est-g1",
          type: "interpretacao",
          enunciado:
            "Depois de resolver um limite, qual pergunta fixa a interpretação?",
          resolucao:
            "O que x está se aproximando e para qual valor f(x) tende?",
          resposta: "Qual a tendência quando x → a?",
          interpretacao: "Liga símbolo ao gráfico e à situação.",
        },
        {
          id: "est-g2",
          type: "compreensao",
          enunciado: "Por que reler o capítulo três vezes é menos eficaz que fazer cinco questões?",
          resolucao: "Cálculo exige procedimento ativo, não só reconhecimento.",
          resposta: "Prática ativa fixa mais que releitura passiva.",
          interpretacao: "Active recall — recuperar da memória, não só expor.",
        },
              {
          id: "est-g3",
          type: "compreensao",
          enunciado: "Você tem 5 horas na semana para estudar Cálculo. É melhor concentrar tudo num dia ou distribuir em quatro dias?",
          resposta: "Distribuir: repetição espaçada fixa mais que uma sessão longa",
          resolucao: "Sessões curtas e repetidas obrigam você a puxar o conteúdo da memória várias vezes. Cinco horas seguidas trazem cansaço e pouca recuperação.",
          interpretacao: "É o mesmo princípio do sistema de revisão deste site: rever depois de esquecer um pouco é o que consolida.",
          erroComum: "Confundir tempo de estudo com aprendizado — cinco horas de leitura passiva rendem menos que duas de exercício ativo.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Use o banco de exercícios do site após cada aula de conteúdo.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Estude com ciclo: ideia → guiado → sozinho → interpretar.",
        "Rotina curta e frequente supera maratona esporádica.",
        "Caderno de erros é sua melhor ferramenta pré-prova.",
        "Ansiedade cai quando o método é previsível.",
      ],
    },
  },

  "mapa-da-trilha": {
    meta: c1Meta({
      title: "Mapa: função → limite → derivada → integral",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "8 min",
      readingNotes: ["Visão dos 7 módulos", "Ordem pedagógica"],
      glossaryTerms: ["Limite", "Derivada", "Integral", "Continuidade"],
      next: {
        slug: "funcoes-no-calculo",
        moduleSlug: "funcoes-para-calculo",
        title: "Funções no contexto do Cálculo",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Ver o semestre inteiro em um mapa reduz medo do desconhecido.",
        "Cada bloco da trilha responde um tipo de pergunta do mundo real.",
        "Sabendo onde você está, fica mais fácil não se perder em detalhes.",
      ],
    },
    explicacao: {
      title: "A ordem da trilha (e por quê)",
      paragraphs: [
        "Módulo 2 — Funções: linguagem de tudo que vem depois.",
        "Módulo 3 — Limites: aproximação e tendência; base da derivada.",
        "Módulo 4 — Continuidade: gráficos sem \"quebras\" indesejadas.",
        "Módulo 5 — Derivadas: taxa de variação instantânea.",
        "Módulo 6 — Aplicações: otimização, máximos, gráficos ricos.",
        "Módulo 7 — Integrais: acúmulo, área, distância total.",
      ],
      callout: "Não pule módulos abertos: cada um usa o anterior.",
      formula: "f → lim → cont → f′ → aplic → ∫",
      formulaLegend: "função → limite → continuidade → derivada → aplicações → integral",
    },
    ondeAparece: {
      title: "Perguntas que cada parte responde",
      items: [
        { label: "Função", detail: "Como y depende de x?" },
        { label: "Limite", detail: "Para onde tende quando x se aproxima?" },
        { label: "Derivada", detail: "Quão rápido muda agora?" },
        { label: "Integral", detail: "Quanto acumulou no total?" },
        { label: "Aplicações", detail: "Qual o melhor valor (lucro, área)?" },
      ],
    },
    exemplo: {
      title: "História de um carro",
      situacao:
        "Posição \\(s(t)\\). Limite ajuda na velocidade instantânea; derivada é \\(v(t)\\); integral de \\(v\\) recupera distância.",
    },
    passos: {
      title: "Como usar este mapa no semestre",
      steps: [
        { title: "Início", detail: "Módulos 1–2 + Pré-Cálculo se precisar." },
        { title: "Meio", detail: "Limites e continuidade com gráficos." },
        { title: "Pico", detail: "Derivadas e listas de otimização." },
        { title: "Fechamento", detail: "Integrais e Teorema Fundamental." },
      ],
    },
    interpretacao: {
      title: "Próximo passo seu",
      paragraphs: [
        "Se concluiu este módulo, vá para Funções para Cálculo (módulo 2).",
        "Marque aulas como concluídas em Meu progresso para acompanhar o anel da trilha.",
        "Volte a este mapa quando sentir que \"perdeu o fio\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Querer ir direto a derivadas sem limites.",
        "Tratar integral como \"antiderivada\" sem ideia de soma.",
        "Estudar módulos em ordem aleatória da apostila.",
        "Esquecer aplicações — é onde a prova costuma cobrar.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "map-g1",
          type: "compreensao",
          enunciado: "Qual tópico responde \"quanto a quantidade mudou por unidade de tempo\"?",
          resposta: "Derivada.",
          resolucao: "Taxa de variação instantânea é derivada.",
          interpretacao: "Integral responde acúmulo, não taxa instantânea.",
        },
        {
          id: "map-g2",
          type: "interpretacao",
          enunciado: "Por que limites vêm antes de derivadas na trilha?",
          resolucao: "Derivada é definida como limite de razão incremental.",
          resposta: "Porque a derivada é definida via limite.",
          interpretacao: "Sem limite, a definição formal não faz sentido.",
        },
              {
          id: "map-g3",
          type: "interpretacao",
          enunciado: "\"Qual a área sob a curva de consumo entre 8 h e 18 h?\" Que etapa da trilha responde isso, e qual você precisa dominar antes?",
          resposta: "Integral; antes é preciso dominar limite e derivada",
          resolucao: "Área sob curva é acúmulo, ou seja, integral. Mas a integral é definida por um limite de somas e se liga à derivada pelo Teorema Fundamental.",
          interpretacao: "A trilha não é lista de tópicos soltos: cada etapa é ferramenta da seguinte. Pular limite deixa a integral sem chão.",
          erroComum: "Tratar integral como assunto independente, que daria para estudar sem ter entendido derivada.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Siga a ordem dos módulos na sidebar de Cálculo 1.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Trilha: funções → limites → continuidade → derivadas → aplicações → integrais.",
        "Cada etapa responde um tipo de pergunta prática.",
        "Módulo 2 é seu próximo destino após Antes do Cálculo.",
        "Use o progresso do site para não se perder.",
      ],
    },
  },
};
