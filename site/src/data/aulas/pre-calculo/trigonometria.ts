import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "trigonometria";
const MOD_TITLE = "Trigonometria básica";

export const trigonometriaAulas: Record<string, AulaContent> = {
  seno: {
    meta: preMeta({
      title: "Seno: o cateto oposto sobre a hipotenusa",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "12 min",
      readingNotes: ["Lados do triângulo retângulo", "Seno como razão"],
      glossaryTerms: ["Seno", "Cateto oposto", "Hipotenusa", "Ângulo"],
      next: { slug: "cosseno", title: "Cosseno" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A trigonometria nasceu de uma pergunta prática: como medir alturas e distâncias que não dá para alcançar com a fita métrica — a altura de uma montanha, a largura de um rio.",
        "O seno é a primeira ferramenta: ele liga um ângulo a uma proporção entre lados de um triângulo retângulo. Sabendo o ângulo e um lado, você descobre os outros.",
        "Apesar do nome assustador, é só uma razão (uma divisão) que sempre vale o mesmo para um dado ângulo.",
      ],
    },
    explicacao: {
      title: "Uma razão que só depende do ângulo",
      paragraphs: [
        "Num triângulo retângulo, em relação a um ângulo, há o cateto oposto (na frente do ângulo), o cateto adjacente (ao lado) e a hipotenusa (o maior lado, na frente do ângulo reto).",
        "O seno do ângulo é o cateto oposto dividido pela hipotenusa. O notável: para o mesmo ângulo, essa razão é sempre a mesma, não importa o tamanho do triângulo.",
      ],
      callout:
        "Seno = cateto oposto ÷ hipotenusa. Memorize por SOH: Seno = Oposto sobre Hipotenusa.",
      formula: "sen(θ) = oposto / hipotenusa",
      formulaLatex: "\\sin(\\theta) = \\frac{\\text{oposto}}{\\text{hipotenusa}}",
      formulaAria: "seno de teta igual a cateto oposto sobre hipotenusa",
      formulaLegend: "SOH: o seno relaciona o lado oposto com a hipotenusa",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Topografia", detail: "medir altura de morros e prédios" },
        { label: "Navegação", detail: "calcular rotas e distâncias" },
        { label: "Engenharia", detail: "forças em rampas e estruturas" },
        { label: "Física", detail: "componentes de velocidade e força" },
        { label: "Astronomia", detail: "distância de estrelas" },
        { label: "Cálculo", detail: "funções trigonométricas e derivadas" },
      ],
    },
    exemplo: {
      title: "A altura de uma pipa",
      situacao:
        "Uma pipa está presa por uma linha de 50 m que faz 30° com o chão. A que altura ela está? Use sen(30°) = 0,5.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Desenhar o triângulo",
          detail: "A linha é a hipotenusa (50 m); a altura da pipa é o cateto oposto ao ângulo de 30°.",
        },
        {
          title: "Escolher a razão certa",
          detail: "Queremos o oposto e temos a hipotenusa → usamos o seno.",
        },
        {
          title: "Montar a equação",
          detail: "sen(30°) = altura / 50.",
        },
        {
          title: "Isolar a altura",
          detail: "altura = 50 · sen(30°) = 50 · 0,5 = 25.",
        },
        {
          title: "Conferir o sentido",
          detail: "A 30° (ângulo baixo), a altura ser metade da linha é razoável.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A pipa está a 25 m de altura. Medimos algo inalcançável usando só um ângulo e o comprimento da linha — esse é o superpoder da trigonometria.",
        "Como sen(30°) = 0,5, a altura é exatamente metade da linha. Se o ângulo fosse maior, o seno cresceria e a pipa estaria mais alta para a mesma linha.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar cateto oposto com adjacente.",
        "Usar o seno quando o lado conhecido pede cosseno.",
        "Esquecer que o seno é uma divisão, não uma multiplicação direta.",
        "Misturar graus e radianos na calculadora.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Num triângulo, o oposto a um ângulo é 6 e a hipotenusa é 10. Qual o seno?",
          identificar: "Seno = oposto / hipotenusa.",
          dica: "6 dividido por 10.",
          resolucao: "sen = 6/10 = 0,6.",
          resposta: "0,6",
          interpretacao: "A razão entre o lado oposto e a hipotenusa é 0,6.",
          erroComum: "Dividir a hipotenusa pelo oposto.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Uma rampa de 20 m faz 30° com o chão. Qual a altura no topo? (sen 30° = 0,5)",
          identificar: "Altura é o cateto oposto; a rampa é a hipotenusa.",
          dica: "altura = hipotenusa · sen.",
          resolucao: "altura = 20 · 0,5 = 10.",
          resposta: "10 m",
          interpretacao: "A rampa sobe 10 m ao longo dos 20 m de comprimento.",
          erroComum: "Multiplicar por 30 em vez do seno.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que o seno de um ângulo é igual em triângulos de tamanhos diferentes?",
          identificar: "É uma razão entre lados.",
          dica: "Triângulos semelhantes mantêm proporções.",
          resolucao: "Triângulos com o mesmo ângulo são semelhantes; suas razões de lados são iguais, então o seno é o mesmo.",
          resposta: "Porque é uma proporção, não um comprimento",
          interpretacao: "O seno mede forma (ângulo), não tamanho.",
          erroComum: "Achar que o seno depende do tamanho do triângulo.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique cálculos com seno em triângulos retângulos no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Seno = cateto oposto ÷ hipotenusa (SOH).",
        "Depende só do ângulo, não do tamanho do triângulo.",
        "Permite medir alturas e distâncias inalcançáveis.",
        "Cuidado para não trocar oposto com adjacente.",
      ],
    },
  },

  cosseno: {
    meta: preMeta({
      title: "Cosseno: o cateto adjacente sobre a hipotenusa",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "12 min",
      readingNotes: ["Cateto adjacente", "Cosseno como razão"],
      glossaryTerms: ["Cosseno", "Cateto adjacente", "Hipotenusa"],
      next: { slug: "tangente", title: "Tangente" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Se o seno cuida do lado \"na frente\" do ângulo, o cosseno cuida do lado \"colado\" nele. Juntos, eles descrevem completamente um triângulo retângulo.",
        "O cosseno responde a perguntas como: qual a distância horizontal que percorri ao subir uma rampa? Quanto uma escada se afasta da parede?",
        "É o par natural do seno, e os dois aparecem sempre juntos em física, engenharia e gráficos.",
      ],
    },
    explicacao: {
      title: "O lado que está ao lado",
      paragraphs: [
        "O cateto adjacente é o lado que forma o ângulo junto com a hipotenusa (sem ser a hipotenusa). O cosseno é esse cateto adjacente dividido pela hipotenusa.",
        "Como o seno, o cosseno só depende do ângulo. E há uma relação linda entre eles: quando um cresce, o outro diminui, porque os catetos se compensam.",
      ],
      callout:
        "Cosseno = cateto adjacente ÷ hipotenusa. Memorize por CAH: Cosseno = Adjacente sobre Hipotenusa.",
      formula: "cos(θ) = adjacente / hipotenusa",
      formulaLatex: "\\cos(\\theta) = \\frac{\\text{adjacente}}{\\text{hipotenusa}}",
      formulaAria: "cosseno de teta igual a cateto adjacente sobre hipotenusa",
      formulaLegend: "CAH: o cosseno relaciona o lado adjacente com a hipotenusa",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Construção", detail: "distância horizontal de uma rampa" },
        { label: "Escadas", detail: "afastamento da base em relação à parede" },
        { label: "Física", detail: "componente horizontal de uma força" },
        { label: "Navegação", detail: "deslocamento leste-oeste" },
        { label: "Games", detail: "movimento em direções com ângulo" },
        { label: "Cálculo", detail: "derivada do seno é o cosseno" },
      ],
    },
    exemplo: {
      title: "A base de uma escada",
      situacao:
        "Uma escada de 4 m encosta na parede formando 60° com o chão. A que distância da parede está o pé da escada? Use cos(60°) = 0,5.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os lados",
          detail: "A escada é a hipotenusa (4 m); a distância do pé à parede é o cateto adjacente ao ângulo de 60°.",
        },
        {
          title: "Escolher a razão",
          detail: "Temos a hipotenusa e queremos o adjacente → cosseno.",
        },
        {
          title: "Montar a equação",
          detail: "cos(60°) = distância / 4.",
        },
        {
          title: "Isolar a distância",
          detail: "distância = 4 · cos(60°) = 4 · 0,5 = 2.",
        },
        {
          title: "Conferir o sentido",
          detail: "Um ângulo de 60° (íngreme) deixa o pé perto da parede — 2 m faz sentido.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O pé da escada está a 2 m da parede. O cosseno deu a parte horizontal, do mesmo jeito que o seno daria a altura alcançada.",
        "Quanto mais íngreme a escada (ângulo maior), menor o cosseno e mais perto da parede fica o pé. Seno e cosseno trabalham em sentidos opostos conforme o ângulo muda.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir adjacente com oposto (cosseno usa o adjacente).",
        "Usar cosseno quando o problema dá o lado oposto.",
        "Trocar seno e cosseno na hora de montar.",
        "Esquecer de verificar graus/radianos na calculadora.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "O adjacente é 8 e a hipotenusa é 10. Qual o cosseno?",
          identificar: "Cosseno = adjacente / hipotenusa.",
          dica: "8 dividido por 10.",
          resolucao: "cos = 8/10 = 0,8.",
          resposta: "0,8",
          interpretacao: "A razão do lado adjacente com a hipotenusa é 0,8.",
          erroComum: "Usar o cateto oposto.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Uma rampa de 10 m faz 60° com o chão. Qual o avanço horizontal? (cos 60° = 0,5)",
          identificar: "Avanço horizontal é o adjacente.",
          dica: "adjacente = hipotenusa · cos.",
          resolucao: "10 · 0,5 = 5.",
          resposta: "5 m",
          interpretacao: "A rampa avança 5 m na horizontal.",
          erroComum: "Usar o seno e achar a altura.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Quando o ângulo aumenta de 30° para 60°, o cosseno cresce ou diminui?",
          identificar: "Pense no adjacente ficando menor.",
          dica: "Ângulo mais íngreme aproxima da parede.",
          resolucao: "O cosseno diminui (cos 30° ≈ 0,87 > cos 60° = 0,5).",
          resposta: "Diminui",
          interpretacao: "Ângulos maiores reduzem a parte horizontal.",
          erroComum: "Achar que cosseno cresce com o ângulo (isso é o seno).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique cálculos com cosseno em triângulos retângulos no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Cosseno = cateto adjacente ÷ hipotenusa (CAH).",
        "É o par do seno: descreve a parte horizontal.",
        "Quando o ângulo cresce, o cosseno diminui.",
        "Use cosseno quando o lado adjacente está envolvido.",
      ],
    },
  },

  tangente: {
    meta: preMeta({
      title: "Tangente: oposto sobre adjacente",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "11 min",
      readingNotes: ["Razão entre catetos", "Inclinação e tangente"],
      glossaryTerms: ["Tangente", "Cateto oposto", "Cateto adjacente", "Inclinação"],
      next: { slug: "ciclo-trigonometrico", title: "Ciclo trigonométrico" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A tangente é a razão que mede inclinação: quanto algo sobe para cada passo na horizontal. É a matemática por trás de \"rampa de 10%\" e da declividade de uma estrada.",
        "Diferente do seno e do cosseno, a tangente não usa a hipotenusa — compara os dois catetos diretamente.",
        "É a ferramenta certa quando você conhece (ou quer) a relação entre altura e distância horizontal, sem se importar com a hipotenusa.",
      ],
    },
    explicacao: {
      title: "A razão entre os dois catetos",
      paragraphs: [
        "A tangente do ângulo é o cateto oposto dividido pelo cateto adjacente. É exatamente \"o quanto sobe\" sobre \"o quanto anda\".",
        "Repare que tan(θ) = sen(θ)/cos(θ): a tangente é o seno dividido pelo cosseno. Por isso ela cresce muito rápido perto de 90°, onde o cosseno se aproxima de zero.",
      ],
      callout:
        "Tangente = cateto oposto ÷ cateto adjacente. Memorize por TOA: Tangente = Oposto sobre Adjacente.",
      formula: "tan(θ) = oposto / adjacente = sen(θ)/cos(θ)",
      formulaLatex: "\\tan(\\theta) = \\frac{\\text{oposto}}{\\text{adjacente}} = \\frac{\\sin\\theta}{\\cos\\theta}",
      formulaAria: "tangente de teta igual a oposto sobre adjacente, igual a seno sobre cosseno",
      formulaLegend: "TOA: a tangente compara os catetos e é seno sobre cosseno",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Estradas", detail: "inclinação (subida em %)" },
        { label: "Telhados", detail: "caimento por metro" },
        { label: "Rampas de acesso", detail: "norma de acessibilidade" },
        { label: "Topografia", detail: "ângulo de elevação de um ponto" },
        { label: "Câmeras", detail: "ângulo de visão" },
        { label: "Cálculo", detail: "declividade é a ideia de derivada" },
      ],
    },
    exemplo: {
      title: "A altura de um prédio pela sombra",
      situacao:
        "Do chão, você vê o topo de um prédio a 40 m de distância sob um ângulo de 45°. Qual a altura do prédio? Use tan(45°) = 1.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os lados",
          detail: "A distância no chão (40 m) é o adjacente; a altura é o oposto ao ângulo de 45°.",
        },
        {
          title: "Escolher a razão",
          detail: "Temos adjacente e queremos oposto, sem a hipotenusa → tangente.",
        },
        {
          title: "Montar a equação",
          detail: "tan(45°) = altura / 40.",
        },
        {
          title: "Isolar a altura",
          detail: "altura = 40 · tan(45°) = 40 · 1 = 40.",
        },
        {
          title: "Conferir o sentido",
          detail: "A 45°, altura e distância são iguais — daí os 40 m.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O prédio tem 40 m. Como tan(45°) = 1, a altura é igual à distância — característico do ângulo de 45°, onde subir e andar se equilibram.",
        "A tangente é a própria definição de inclinação: 40 m de altura em 40 m de distância é uma subida de 100%. É assim que se lê a placa \"rampa 8%\" numa estrada.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar a hipotenusa na tangente (ela só usa os catetos).",
        "Inverter a razão (oposto sobre adjacente, não o contrário).",
        "Esquecer que tan = sen/cos.",
        "Tentar calcular tan(90°), que não existe (cosseno zero).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "O oposto é 3 e o adjacente é 4. Qual a tangente?",
          identificar: "Tangente = oposto / adjacente.",
          dica: "3 dividido por 4.",
          resolucao: "tan = 3/4 = 0,75.",
          resposta: "0,75",
          interpretacao: "Sobe 3 a cada 4 de avanço horizontal.",
          erroComum: "Calcular 4/3.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Uma estrada sobe 6 m a cada 100 m na horizontal. Qual a tangente da inclinação?",
          identificar: "Oposto = 6, adjacente = 100.",
          dica: "6/100.",
          resolucao: "tan = 6/100 = 0,06.",
          resposta: "0,06 (6%)",
          interpretacao: "É a famosa rampa de 6%.",
          erroComum: "Confundir com porcentagem do comprimento total.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que a tangente dispara quando o ângulo se aproxima de 90°?",
          identificar: "Lembre que tan = sen/cos.",
          dica: "O que acontece com o cosseno perto de 90°?",
          resolucao: "Perto de 90° o cosseno tende a zero, e dividir por algo quase zero faz a tangente crescer sem limite.",
          resposta: "Porque o cosseno tende a zero",
          interpretacao: "Uma parede vertical tem inclinação 'infinita'.",
          erroComum: "Achar que a tangente tem valor máximo.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique tangente e inclinação no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Tangente = cateto oposto ÷ cateto adjacente (TOA).",
        "Não usa a hipotenusa; compara os catetos.",
        "tan(θ) = sen(θ)/cos(θ).",
        "Mede inclinação (subida por avanço horizontal).",
      ],
    },
  },

  "ciclo-trigonometrico": {
    meta: preMeta({
      title: "Ciclo trigonométrico",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      readingNotes: ["Círculo de raio 1", "Seno e cosseno como coordenadas"],
      glossaryTerms: ["Ciclo trigonométrico", "Radiano", "Círculo unitário"],
      next: { slug: "identidades-basicas", title: "Identidades básicas" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Os triângulos só lidam com ângulos entre 0° e 90°. Mas seno e cosseno valem para qualquer ângulo — inclusive uma volta inteira, e mais. Como?",
        "O ciclo trigonométrico é a resposta: um círculo de raio 1 onde seno e cosseno viram as coordenadas de um ponto que gira. Ele estende a trigonometria para todos os ângulos.",
        "É também onde aparecem os radianos e a ideia de repetição — a base para entender ondas e movimentos circulares.",
      ],
    },
    explicacao: {
      title: "Seno e cosseno como coordenadas",
      paragraphs: [
        "Desenhe um círculo de raio 1 centrado na origem. Para um ângulo θ medido a partir do eixo x, marque o ponto onde o raio toca o círculo. A coordenada x desse ponto é cos(θ); a coordenada y é sen(θ).",
        "Conforme o ângulo gira, o ponto percorre o círculo, e seno e cosseno oscilam entre −1 e 1. Uma volta completa são 360° ou 2π radianos, e depois tudo se repete.",
      ],
      callout:
        "No círculo de raio 1, o ponto do ângulo θ é (cos θ, sen θ). Seno e cosseno são coordenadas que giram.",
      formula: "P(θ) = (cos θ, sen θ),  raio = 1",
      formulaLatex: "P(\\theta) = (\\cos\\theta,\\ \\sin\\theta), \\quad r = 1",
      formulaAria: "P de teta igual a abre parêntese cosseno de teta vírgula seno de teta fecha parêntese, raio igual a um",
      formulaLegend: "o ponto no círculo unitário tem cosseno e seno como coordenadas",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Ondas", detail: "som, luz e rádio são senoides" },
        { label: "Movimento circular", detail: "roda-gigante, relógios" },
        { label: "Eletricidade", detail: "corrente alternada" },
        { label: "Música", detail: "frequências e tons" },
        { label: "Animação", detail: "movimentos cíclicos suaves" },
        { label: "Cálculo", detail: "derivadas de seno e cosseno" },
      ],
    },
    exemplo: {
      title: "Pontos famosos do círculo",
      situacao:
        "Qual é o ponto (cos θ, sen θ) para θ = 0°, 90° e 180° no ciclo trigonométrico?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Começar em 0°",
          detail: "O raio aponta para a direita: ponto (1, 0). Logo cos 0° = 1 e sen 0° = 0.",
        },
        {
          title: "Girar para 90°",
          detail: "O raio aponta para cima: ponto (0, 1). cos 90° = 0 e sen 90° = 1.",
        },
        {
          title: "Girar para 180°",
          detail: "O raio aponta para a esquerda: ponto (−1, 0). cos 180° = −1 e sen 180° = 0.",
        },
        {
          title: "Observar o padrão",
          detail: "O cosseno (x) e o seno (y) se alternam entre −1, 0 e 1 conforme o ponto gira.",
        },
        {
          title: "Concluir",
          detail: "O círculo dá seno e cosseno de qualquer ângulo, não só de 0° a 90°.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Ler o ponto no círculo dá seno e cosseno de qualquer ângulo. Em 90°, por exemplo, o cosseno é 0 — coisa que um triângulo nunca mostraria.",
        "Como o ponto volta ao início a cada volta, seno e cosseno se repetem. Essa repetição (periodicidade) é o que descreve tudo que oscila: ondas, marés, batimentos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar as coordenadas: x é cosseno, y é seno.",
        "Esquecer que os valores ficam entre −1 e 1.",
        "Confundir graus com radianos (360° = 2π).",
        "Achar que ângulos maiores que 90° não têm seno/cosseno.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "No ciclo, qual coordenada do ponto é o seno?",
          identificar: "Seno é a altura.",
          dica: "Vertical = y.",
          resolucao: "O seno é a coordenada y (vertical).",
          resposta: "A coordenada y",
          interpretacao: "Seno mede a altura do ponto no círculo.",
          erroComum: "Dizer que é o x.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quanto valem cos 90° e sen 90°?",
          identificar: "Em 90° o ponto está em (0, 1).",
          dica: "Aponta para cima.",
          resolucao: "cos 90° = 0 e sen 90° = 1.",
          resposta: "cos = 0, sen = 1",
          interpretacao: "No topo do círculo, só há altura.",
          erroComum: "Inverter os dois valores.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que seno e cosseno nunca passam de 1 nem ficam abaixo de −1?",
          identificar: "São coordenadas num círculo de raio 1.",
          dica: "O ponto não sai do círculo.",
          resolucao: "Como o raio é 1, as coordenadas do ponto vão de −1 a 1; logo seno e cosseno também.",
          resposta: "Porque o raio do círculo é 1",
          interpretacao: "O tamanho do círculo limita os valores.",
          erroComum: "Achar que podem crescer como a tangente.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique o ciclo trigonométrico e valores notáveis no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "O ciclo é um círculo de raio 1; o ponto do ângulo é (cos θ, sen θ).",
        "Cosseno é a coordenada x; seno é a y.",
        "Estende seno e cosseno para qualquer ângulo.",
        "Seno e cosseno ficam entre −1 e 1 e se repetem a cada volta.",
      ],
    },
  },

  "identidades-basicas": {
    meta: preMeta({
      title: "Identidades básicas: a relação fundamental",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "13 min",
      readingNotes: ["Relação fundamental", "Seno e cosseno se completam"],
      glossaryTerms: ["Identidade", "Relação fundamental", "Pitágoras"],
      next: { slug: "graficos-trigonometricos", title: "Gráficos trigonométricos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Seno e cosseno não são independentes: eles estão amarrados por uma regra que nunca falha. Conhecendo um, você acha o outro.",
        "Essa relação economiza trabalho — em provas, na física e no cálculo, ela permite trocar uma expressão complicada por uma simples.",
        "E o melhor: ela vem direto do teorema de Pitágoras aplicado ao círculo de raio 1, que você acabou de ver.",
      ],
    },
    explicacao: {
      title: "Pitágoras dentro do círculo",
      paragraphs: [
        "No círculo de raio 1, o ponto é (cos θ, sen θ). Esse ponto, a origem e seu reflexo no eixo formam um triângulo retângulo de hipotenusa 1, com catetos cos θ e sen θ.",
        "Aplicando Pitágoras: (cos θ)² + (sen θ)² = 1². Essa é a relação fundamental da trigonometria — vale para qualquer ângulo, sempre.",
      ],
      callout:
        "sen²θ + cos²θ = 1. Conhecendo um deles, o outro sai isolando na equação.",
      formula: "sen²(θ) + cos²(θ) = 1",
      formulaLatex: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1",
      formulaAria: "seno ao quadrado de teta mais cosseno ao quadrado de teta igual a um",
      formulaLegend: "relação fundamental: seno e cosseno se completam",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Física", detail: "decompor forças e velocidades" },
        { label: "Engenharia", detail: "simplificar cálculos de estruturas" },
        { label: "Cálculo", detail: "integrais e derivadas trigonométricas" },
        { label: "Computação gráfica", detail: "rotações e normalização" },
        { label: "Eletrônica", detail: "potência em corrente alternada" },
        { label: "Provas", detail: "achar um valor a partir do outro" },
      ],
    },
    exemplo: {
      title: "Achar o cosseno a partir do seno",
      situacao:
        "Um ângulo agudo tem sen θ = 0,6. Quanto vale cos θ?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Escrever a relação",
          detail: "sen²θ + cos²θ = 1.",
        },
        {
          title: "Substituir o seno",
          detail: "0,6² + cos²θ = 1 → 0,36 + cos²θ = 1.",
        },
        {
          title: "Isolar o cosseno ao quadrado",
          detail: "cos²θ = 1 − 0,36 = 0,64.",
        },
        {
          title: "Tirar a raiz",
          detail: "cos θ = √0,64 = 0,8 (positivo, pois o ângulo é agudo).",
        },
        {
          title: "Conferir",
          detail: "0,6² + 0,8² = 0,36 + 0,64 = 1. Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Com cos θ = 0,8, achamos o segundo lado sem medir nada — só usando a relação. Esse é o ângulo do triângulo 3-4-5, clássico.",
        "Repare: quanto maior o seno, menor o cosseno, porque a soma dos quadrados é fixa em 1. Eles dividem um \"orçamento\" de 1 entre si.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de elevar ao quadrado antes de somar.",
        "Esquecer a raiz no final ao isolar.",
        "Ignorar o sinal (em ângulos maiores que 90° o cosseno pode ser negativo).",
        "Confundir sen²θ com sen(θ²).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Se cos θ = 0,8 (ângulo agudo), quanto vale sen θ?",
          identificar: "Use sen²θ = 1 − cos²θ.",
          dica: "1 − 0,64 e depois a raiz.",
          resolucao: "sen²θ = 1 − 0,64 = 0,36 → sen θ = 0,6.",
          resposta: "0,6",
          interpretacao: "É o mesmo triângulo 3-4-5 visto de outro lado.",
          erroComum: "Esquecer a raiz quadrada.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Verifique se sen θ = 0,5 e cos θ = 0,5 podem ser do mesmo ângulo.",
          identificar: "Teste na relação fundamental.",
          dica: "Some os quadrados.",
          resolucao: "0,25 + 0,25 = 0,5 ≠ 1. Não podem.",
          resposta: "Não, pois a soma dos quadrados não dá 1",
          interpretacao: "A relação fundamental serve de teste de consistência.",
          erroComum: "Achar que quaisquer valores entre 0 e 1 servem.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "De onde vem a relação sen²θ + cos²θ = 1?",
          identificar: "Pense no círculo de raio 1.",
          dica: "Teorema de Pitágoras.",
          resolucao: "É Pitágoras no triângulo de catetos cos θ e sen θ e hipotenusa 1 (o raio).",
          resposta: "Do teorema de Pitágoras no círculo unitário",
          interpretacao: "Geometria e trigonometria são a mesma ideia.",
          erroComum: "Achar que é uma fórmula decorada sem origem.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique a relação fundamental no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Relação fundamental: sen²θ + cos²θ = 1.",
        "Vem de Pitágoras no círculo de raio 1.",
        "Conhecendo um, isola-se o outro.",
        "Cuidado com a raiz e com o sinal.",
      ],
    },
  },

  "graficos-trigonometricos": {
    meta: preMeta({
      title: "Gráficos trigonométricos: a forma de onda",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "11 min",
      readingNotes: ["A senoide", "Período e amplitude"],
      glossaryTerms: ["Senoide", "Período", "Amplitude", "Onda"],
      next: { slug: "rampas-altura", title: "Rampas e altura de prédios" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quando você desenha o seno para todos os ângulos, surge uma curva ondulada que sobe e desce sem parar: a senoide.",
        "Essa forma é a assinatura de tudo que oscila — som, luz, marés, batimentos cardíacos, sinais de rádio. Reconhecer a onda é entender o mundo cíclico.",
        "O gráfico transforma a tabela de valores em algo visual e imediato: dá para ver o ritmo, a altura e a repetição de relance.",
      ],
    },
    explicacao: {
      title: "A onda que se repete",
      paragraphs: [
        "O gráfico de y = sen(x) parte de 0, sobe até 1 (em 90°), volta a 0 (em 180°), desce até −1 (em 270°) e retorna a 0 (em 360°). Depois, repete tudo de novo.",
        "Dois números descrevem a onda: a amplitude (o quanto sobe e desce — aqui, 1) e o período (o quanto anda até repetir — aqui, 360° ou 2π). O cosseno tem a mesma forma, só começando do alto.",
      ],
      callout:
        "A senoide oscila entre −1 e 1 e se repete a cada volta. Amplitude = altura; período = comprimento da repetição.",
      formula: "y = sen(x), período 2π, amplitude 1",
      formulaLatex: "y = \\sin(x), \\quad \\text{período } 2\\pi, \\ \\text{amplitude } 1",
      formulaAria: "y igual a seno de x, período dois pi, amplitude um",
      formulaLegend: "a curva do seno sobe a 1, desce a menos 1 e se repete",
    },
    grafico: {
      fn: "sin(x)",
      alt: "Curva ondulada do seno: parte de zero, sobe até 1, desce até −1 e repete suavemente.",
      xDomain: [0, 12.6],
      yDomain: [-1.5, 1.5],
      legend: "y = sen(x) — a senoide oscila entre −1 e 1 e se repete a cada 2π.",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Som", detail: "ondas sonoras e tons puros" },
        { label: "Eletricidade", detail: "tensão da rede (corrente alternada)" },
        { label: "Marés", detail: "subida e descida do mar" },
        { label: "Saúde", detail: "eletrocardiograma e respiração" },
        { label: "Rádio", detail: "ondas eletromagnéticas" },
        { label: "Cálculo", detail: "funções periódicas e derivadas" },
      ],
    },
    exemplo: {
      title: "Lendo a senoide",
      situacao:
        "No gráfico de y = sen(x), em quais ângulos entre 0° e 360° a curva vale 0?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Lembrar o início",
          detail: "Em x = 0°, sen(0°) = 0. Primeiro zero.",
        },
        {
          title: "Subir e voltar",
          detail: "A curva sobe até 1 em 90° e volta a 0 em 180°. Segundo zero.",
        },
        {
          title: "Descer e voltar",
          detail: "Desce até −1 em 270° e volta a 0 em 360°. Terceiro zero.",
        },
        {
          title: "Listar os zeros",
          detail: "0°, 180° e 360° (e 360° já é o início da próxima volta).",
        },
        {
          title: "Generalizar",
          detail: "Os zeros do seno acontecem a cada 180°.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A onda cruza o zero em 0°, 180° e 360° — pontos onde, numa oscilação, o objeto passa pela posição de equilíbrio.",
        "Esse ritmo regular é o que chamamos de período. Entender onde a onda zera, sobe ou desce é a base para ler qualquer sinal: um som, uma corrente, um pulso.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que a curva ultrapassa 1 ou −1.",
        "Confundir amplitude (altura) com período (largura).",
        "Esquecer que o cosseno é a mesma onda deslocada.",
        "Misturar graus e radianos ao marcar o eixo x.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "compreensao",
          enunciado: "Qual a amplitude da curva y = sen(x)?",
          identificar: "É o valor máximo de afastamento do zero.",
          dica: "Até onde a curva sobe?",
          resolucao: "Sobe até 1 e desce até −1, então a amplitude é 1.",
          resposta: "1",
          interpretacao: "A onda se afasta no máximo 1 do eixo.",
          erroComum: "Dizer que é 2 (a distância total topo-fundo).",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Qual o período de y = sen(x) em graus?",
          identificar: "Quanto anda até repetir?",
          dica: "Uma volta completa.",
          resolucao: "Repete a cada 360° (2π radianos).",
          resposta: "360°",
          interpretacao: "Depois de uma volta, a onda recomeça igual.",
          erroComum: "Dizer 180°, que é só meio período.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Em y = sen(x), qual o valor da curva em x = 90°?",
          identificar: "Ponto mais alto da onda.",
          dica: "sen(90°) é o máximo.",
          resolucao: "sen(90°) = 1.",
          resposta: "1",
          interpretacao: "É o pico da senoide.",
          erroComum: "Confundir com sen(0°) = 0.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique leitura de gráficos de seno e cosseno no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "O gráfico do seno é uma onda (senoide) entre −1 e 1.",
        "Amplitude = altura; período = comprimento da repetição.",
        "y = sen(x) zera a cada 180° e repete a cada 360°.",
        "Toda oscilação do mundo tem essa forma.",
      ],
    },
  },

  "rampas-altura": {
    meta: preMeta({
      title: "Rampas e altura de prédios",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "10 min",
      readingNotes: ["Aplicação prática", "Ângulo de elevação"],
      glossaryTerms: ["Ângulo de elevação", "Inclinação", "Acessibilidade"],
      next: { slug: "ondas-movimento", title: "Ondas e movimento circular" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Toda rampa de acessibilidade, cada telhado e a altura de um prédio que você não pode escalar — tudo isso é trigonometria aplicada.",
        "Com um ângulo e uma distância, engenheiros e arquitetos calculam o que seria impossível medir diretamente. É a trigonometria saindo do papel para a obra.",
        "Aqui você junta seno, cosseno e tangente em problemas do dia a dia da construção.",
      ],
    },
    explicacao: {
      title: "Escolher a razão pela informação que você tem",
      paragraphs: [
        "A pergunta-chave é sempre: que lados eu conheço e qual eu quero? Oposto e hipotenusa → seno. Adjacente e hipotenusa → cosseno. Oposto e adjacente → tangente.",
        "O ângulo de elevação é aquele que sua linha de visão faz com a horizontal ao olhar para cima. Ele é a chave para medir alturas a partir do chão.",
      ],
      callout:
        "Identifique o ângulo e os lados (conhecido e procurado). A razão certa aparece sozinha.",
      formula: "altura = distância · tan(ângulo de elevação)",
      formulaLatex: "\\text{altura} = \\text{distância} \\cdot \\tan(\\theta)",
      formulaAria: "altura igual a distância vezes tangente do ângulo",
      formulaLegend: "com a base e o ângulo de elevação, a tangente dá a altura",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Acessibilidade", detail: "rampas dentro da norma (máx. 8,33%)" },
        { label: "Construção civil", detail: "altura de prédios e torres" },
        { label: "Telhados", detail: "caimento e comprimento de água" },
        { label: "Escadas", detail: "relação degrau-espelho" },
        { label: "Topografia", detail: "desníveis de terreno" },
        { label: "Segurança", detail: "ângulo de apoio de escadas" },
      ],
    },
    exemplo: {
      title: "Altura de uma torre",
      situacao:
        "A 30 m da base de uma torre, você mede um ângulo de elevação de 45° até o topo. Qual a altura da torre? (tan 45° = 1)",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar o triângulo",
          detail: "A distância (30 m) é o adjacente; a altura é o oposto ao ângulo de 45°.",
        },
        {
          title: "Escolher a razão",
          detail: "Tenho adjacente, quero oposto, sem hipotenusa → tangente.",
        },
        {
          title: "Montar a equação",
          detail: "tan(45°) = altura / 30.",
        },
        {
          title: "Isolar a altura",
          detail: "altura = 30 · tan(45°) = 30 · 1 = 30.",
        },
        {
          title: "Conferir",
          detail: "A 45°, altura e distância são iguais: 30 m faz sentido.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A torre tem 30 m. Medimos a altura sem subir nela, só com uma trena no chão e um instrumento de ângulo.",
        "Se o ângulo medido fosse maior, a torre seria mais alta para a mesma distância. É assim que se levantam alturas de montanhas, prédios e árvores na prática.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Escolher a razão errada para os lados que você tem.",
        "Esquecer de somar a altura do observador (olho do nível do chão).",
        "Confundir ângulo de elevação com ângulo de depressão.",
        "Usar a distância inclinada quando o dado é a distância no chão.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "aplicada",
          enunciado: "A 50 m de um prédio, o ângulo de elevação ao topo é 45°. Qual a altura? (tan 45° = 1)",
          identificar: "Adjacente = 50, ângulo = 45°, quero o oposto.",
          dica: "altura = distância · tan.",
          resolucao: "altura = 50 · 1 = 50.",
          resposta: "50 m",
          interpretacao: "A 45°, altura iguala a distância.",
          erroComum: "Usar seno em vez de tangente.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Uma rampa precisa subir 1 m com inclinação máxima de tan = 0,083. Qual o comprimento horizontal mínimo?",
          identificar: "tan = oposto/adjacente; oposto = 1.",
          dica: "adjacente = oposto / tan.",
          resolucao: "adjacente = 1 / 0,083 ≈ 12 m.",
          resposta: "≈ 12 m",
          interpretacao: "Por isso rampas acessíveis são longas.",
          erroComum: "Multiplicar em vez de dividir.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Para medir a altura de um prédio do chão, qual ângulo você usa?",
          identificar: "Olhando para cima a partir da horizontal.",
          dica: "Nome do ângulo entre a horizontal e a linha de visão para cima.",
          resolucao: "O ângulo de elevação.",
          resposta: "Ângulo de elevação",
          interpretacao: "É a base da topografia e da agrimensura.",
          erroComum: "Chamar de ângulo de depressão (esse é para baixo).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique altura, rampas e ângulos de elevação no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Identifique ângulo e lados (conhecido e procurado) para escolher a razão.",
        "Ângulo de elevação mede alturas a partir do chão.",
        "altura = distância · tan(ângulo) é o caso mais comum.",
        "Trigonometria está em rampas, telhados e prédios.",
      ],
    },
  },

  "ondas-movimento": {
    meta: preMeta({
      title: "Ondas e movimento circular",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "10 min",
      readingNotes: ["Movimento que se repete", "Do círculo à onda"],
      glossaryTerms: ["Periodicidade", "Frequência", "Movimento circular"],
      next: { slug: "engenharia-arquitetura", title: "Engenharia e arquitetura" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Por que o som, a luz, as marés, a roda-gigante e a corrente elétrica usam a mesma matemática? Porque todos se repetem, e seno e cosseno são a linguagem da repetição.",
        "Um ponto girando num círculo, visto de lado, sobe e desce exatamente como uma onda. Movimento circular e onda são a mesma coisa vista de ângulos diferentes.",
        "Entender isso conecta a trigonometria a quase toda a física que descreve o mundo cíclico.",
      ],
    },
    explicacao: {
      title: "Do giro à onda",
      paragraphs: [
        "Imagine um ponto girando num círculo. A altura dele (a coordenada y) é sen(θ). Conforme o ângulo aumenta com o tempo, essa altura traça uma senoide.",
        "Por isso a posição num movimento que oscila — uma mola, um pêndulo pequeno, a tensão da rede — se escreve com seno ou cosseno em função do tempo. A frequência diz quantas voltas por segundo; o período, quanto dura cada volta.",
      ],
      callout:
        "A altura de um ponto que gira é uma senoide. Movimento circular projetado = onda.",
      formula: "y(t) = A · sen(2π · f · t)",
      formulaLatex: "y(t) = A \\cdot \\sin(2\\pi f\\, t)",
      formulaAria: "y de t igual a A vezes seno de dois pi f t",
      formulaLegend: "A = amplitude · f = frequência (voltas por segundo) · t = tempo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Som", detail: "frequência define a nota musical" },
        { label: "Roda-gigante", detail: "altura do passageiro no tempo" },
        { label: "Molas e pêndulos", detail: "oscilação harmônica" },
        { label: "Eletricidade", detail: "60 Hz da tomada" },
        { label: "Marés", detail: "ciclo diário do nível do mar" },
        { label: "Rádio e Wi-Fi", detail: "ondas em frequências distintas" },
      ],
    },
    exemplo: {
      title: "Altura na roda-gigante",
      situacao:
        "Uma roda-gigante tem raio de 10 m e o centro a 12 m do chão. Quando o assento está no ângulo de 90° (topo), qual a altura em relação ao chão?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Modelar a altura",
          detail: "altura = centro + raio · sen(θ) = 12 + 10 · sen(θ).",
        },
        {
          title: "Usar o ângulo do topo",
          detail: "No topo, θ = 90° e sen(90°) = 1.",
        },
        {
          title: "Substituir",
          detail: "altura = 12 + 10 · 1.",
        },
        {
          title: "Calcular",
          detail: "altura = 22 m.",
        },
        {
          title: "Conferir o sentido",
          detail: "Centro a 12 m mais o raio de 10 m chega a 22 m no ponto mais alto. Coerente.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "No topo o passageiro está a 22 m do chão. A mesma fórmula dá a altura em qualquer instante: é uma senoide subindo e descendo enquanto a roda gira.",
        "Trocar o ângulo por tempo transforma a trigonometria numa descrição do movimento. Esse salto — de ângulo para tempo — é o que liga seno e cosseno à física das ondas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de somar a altura do centro (o eixo da roda).",
        "Confundir frequência (voltas por segundo) com período (tempo por volta).",
        "Usar graus na calculadora quando a fórmula está em radianos.",
        "Achar que onda e movimento circular são coisas sem relação.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "aplicada",
          enunciado: "Na roda do exemplo (12 + 10·sen θ), qual a altura quando θ = 0°?",
          identificar: "sen(0°) = 0.",
          dica: "Some o centro com 10·0.",
          resolucao: "altura = 12 + 10·0 = 12 m.",
          resposta: "12 m",
          interpretacao: "Na lateral, o assento está na altura do centro.",
          erroComum: "Esquecer que sen(0°) = 0 e somar 10.",
        },
        {
          id: "guiado-2",
          type: "compreensao",
          enunciado: "Se uma roda dá 2 voltas por minuto, qual é seu período?",
          identificar: "Período = tempo por volta.",
          dica: "60 s divididos por 2 voltas.",
          resolucao: "60 / 2 = 30 s por volta.",
          resposta: "30 segundos",
          interpretacao: "Período e frequência são inversos.",
          erroComum: "Dizer 2 s, confundindo com a frequência.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que a altura de um ponto girando forma uma onda?",
          identificar: "A altura é sen(θ).",
          dica: "Pense no seno crescendo e diminuindo com o ângulo.",
          resolucao: "Como a altura é sen(θ) e θ cresce com o tempo, a altura traça a senoide.",
          resposta: "Porque a altura é o seno do ângulo, que oscila",
          interpretacao: "Giro e onda são o mesmo fenômeno.",
          erroComum: "Achar que precisa de uma fórmula diferente.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique movimento circular e ondas no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Movimento circular projetado vira uma onda (senoide).",
        "A altura de um ponto que gira é sen do ângulo.",
        "Frequência = voltas por segundo; período = tempo por volta.",
        "Som, luz, marés e eletricidade seguem essa matemática.",
      ],
    },
  },

  "engenharia-arquitetura": {
    meta: preMeta({
      title: "Engenharia e arquitetura",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "9 min",
      readingNotes: ["Trigonometria na obra", "Forças e estruturas"],
      glossaryTerms: ["Treliça", "Decomposição de forças", "Estrutura"],
      next: { slug: "revisao-trigonometria", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Pontes, telhados, guindastes e torres ficam de pé porque alguém calculou ângulos e forças com trigonometria. É ela que decide a espessura de uma viga e a inclinação de um cabo.",
        "Quando uma força age em diagonal, separamos ela em \"quanto empurra para os lados\" e \"quanto empurra para cima\" — e isso é seno e cosseno puro.",
        "Esta aula mostra a trigonometria como ferramenta de quem projeta o mundo construído.",
      ],
    },
    explicacao: {
      title: "Decompor uma força",
      paragraphs: [
        "Uma força F aplicada num ângulo θ com a horizontal tem duas partes: a horizontal, F·cos(θ), e a vertical, F·sen(θ). Somadas vetorialmente, elas reconstroem a força original.",
        "Essa decomposição é o pão de cada dia da engenharia: saber quanto de uma carga vai para baixo (peso) e quanto para o lado (empuxo) define se a estrutura aguenta.",
      ],
      callout:
        "Força em diagonal = parte horizontal (F·cos θ) + parte vertical (F·sen θ).",
      formula: "Fx = F·cos(θ),  Fy = F·sen(θ)",
      formulaLatex: "F_x = F\\cos(\\theta), \\quad F_y = F\\sin(\\theta)",
      formulaAria: "F x igual a F cosseno de teta; F y igual a F seno de teta",
      formulaLegend: "cosseno dá a parte horizontal; seno dá a vertical",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Pontes", detail: "tensão nos cabos e treliças" },
        { label: "Telhados", detail: "carga distribuída pela inclinação" },
        { label: "Guindastes", detail: "componentes da força de elevação" },
        { label: "Torres", detail: "estais e ângulos de ancoragem" },
        { label: "Arquitetura", detail: "ângulos de fachadas e escadas" },
        { label: "Mecânica", detail: "planos inclinados e atrito" },
      ],
    },
    exemplo: {
      title: "Força em um cabo de sustentação",
      situacao:
        "Um cabo puxa uma estrutura com força de 100 N num ângulo de 30° com a horizontal. Quais são as componentes horizontal e vertical? (cos 30° ≈ 0,87; sen 30° = 0,5)",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Separar as componentes",
          detail: "Fx = F·cos(θ) e Fy = F·sen(θ).",
        },
        {
          title: "Calcular a horizontal",
          detail: "Fx = 100 · cos(30°) ≈ 100 · 0,87 = 87 N.",
        },
        {
          title: "Calcular a vertical",
          detail: "Fy = 100 · sen(30°) = 100 · 0,5 = 50 N.",
        },
        {
          title: "Interpretar",
          detail: "87 N puxam na horizontal e 50 N na vertical.",
        },
        {
          title: "Conferir",
          detail: "Como 30° é baixo, a parte horizontal (87 N) deve ser maior que a vertical (50 N). Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "A força de 100 N se reparte em 87 N na horizontal e 50 N na vertical. O engenheiro usa cada parte para dimensionar apoios e fundações.",
        "Mudar o ângulo redistribui a força: ângulos maiores aumentam a parte vertical e diminuem a horizontal. É assim que se ajusta o projeto de um cabo ou de um estai.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar seno e cosseno nas componentes (cosseno é a horizontal).",
        "Esquecer que as componentes somam vetorialmente, não diretamente.",
        "Medir o ângulo a partir da vertical sem ajustar as fórmulas.",
        "Ignorar unidades (newtons, metros) ao misturar valores.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "aplicada",
          enunciado: "Uma força de 200 N atua a 60° com a horizontal. Qual a componente vertical? (sen 60° ≈ 0,87)",
          identificar: "Fy = F·sen(θ).",
          dica: "200 · 0,87.",
          resolucao: "Fy = 200 · 0,87 = 174 N.",
          resposta: "≈ 174 N",
          interpretacao: "A 60°, a parte vertical domina.",
          erroComum: "Usar cosseno e achar a horizontal.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "A mesma força de 200 N a 60°: qual a componente horizontal? (cos 60° = 0,5)",
          identificar: "Fx = F·cos(θ).",
          dica: "200 · 0,5.",
          resolucao: "Fx = 200 · 0,5 = 100 N.",
          resposta: "100 N",
          interpretacao: "A parte horizontal é menor que a vertical a 60°.",
          erroComum: "Trocar com a componente vertical.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Qual componente cresce quando o ângulo com a horizontal aumenta?",
          identificar: "Pense em sen e cos ao crescer o ângulo.",
          dica: "Seno cresce, cosseno diminui.",
          resolucao: "A componente vertical (F·sen θ) cresce; a horizontal diminui.",
          resposta: "A vertical",
          interpretacao: "Ângulos mais íngremes puxam mais para cima.",
          erroComum: "Achar que ambas crescem juntas.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique decomposição de forças e ângulos em estruturas no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Força em diagonal se decompõe em horizontal (F·cos θ) e vertical (F·sen θ).",
        "Cosseno dá a parte horizontal; seno dá a vertical.",
        "Engenharia usa isso em pontes, telhados e guindastes.",
        "Mudar o ângulo redistribui a força entre as direções.",
      ],
    },
  },

  "revisao-trigonometria": {
    meta: preMeta({
      title: "Revisão do módulo: trigonometria básica",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "8 min",
      readingNotes: ["Fechamento do módulo", "SOH-CAH-TOA e ciclo"],
      glossaryTerms: ["Seno", "Cosseno", "Tangente", "Senoide"],
      next: { slug: "ideia-aproximacao", title: "Ideia de aproximação", moduleSlug: "preparacao-limites" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A trigonometria começou medindo triângulos e terminou descrevendo ondas, giros e forças. Esta revisão amarra tudo num só fio.",
        "Se você reconhecer qual razão usar e ler uma senoide, levou o essencial — e está pronto para a reta final antes do cálculo.",
        "Vamos recapitular as ideias-chave e resolver um problema que usa várias delas juntas.",
      ],
    },
    explicacao: {
      title: "O mapa do módulo",
      paragraphs: [
        "Seno (oposto/hipotenusa), cosseno (adjacente/hipotenusa) e tangente (oposto/adjacente) são as três razões: SOH-CAH-TOA. Cada uma serve a um par de lados.",
        "O ciclo trigonométrico estende tudo para qualquer ângulo, com (cos θ, sen θ) como coordenadas. A relação sen²θ + cos²θ = 1 amarra os dois, e o gráfico do seno revela a onda que descreve oscilações e giros.",
      ],
      callout:
        "Razões (SOH-CAH-TOA) → ciclo (qualquer ângulo) → relação fundamental → senoide (oscilações).",
      formula: "sen²θ + cos²θ = 1 · tan θ = sen θ / cos θ",
      formulaLatex: "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}",
      formulaAria: "seno ao quadrado mais cosseno ao quadrado igual a um; tangente igual a seno sobre cosseno",
      formulaLegend: "as duas relações que conectam todo o módulo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Construção", detail: "alturas, rampas e telhados" },
        { label: "Física", detail: "forças, ondas e movimento circular" },
        { label: "Eletricidade", detail: "corrente alternada" },
        { label: "Topografia", detail: "distâncias inacessíveis" },
        { label: "Música e som", detail: "frequências" },
        { label: "Cálculo", detail: "funções periódicas e derivadas" },
      ],
    },
    exemplo: {
      title: "Um problema que junta tudo",
      situacao:
        "Uma rampa de 10 m faz 30° com o chão. Qual a altura ganha (use seno) e o avanço horizontal (use cosseno)? (sen 30° = 0,5; cos 30° ≈ 0,87)",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os lados",
          detail: "A rampa é a hipotenusa (10 m); altura é o oposto, avanço é o adjacente.",
        },
        {
          title: "Altura pelo seno",
          detail: "altura = 10 · sen(30°) = 10 · 0,5 = 5 m.",
        },
        {
          title: "Avanço pelo cosseno",
          detail: "avanço = 10 · cos(30°) ≈ 10 · 0,87 = 8,7 m.",
        },
        {
          title: "Conferir com a relação",
          detail: "5² + 8,7² ≈ 25 + 75,7 = 100,7 ≈ 10² (pequeno arredondamento). Confere.",
        },
        {
          title: "Concluir",
          detail: "A rampa sobe 5 m e avança 8,7 m na horizontal.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Com um único triângulo, seno e cosseno deram as duas medidas que importam na obra: o quanto se sobe e o quanto se anda.",
        "A relação fundamental serviu de prova real — sinal de que você domina as peças e como elas se encaixam. É isso que leva para o cálculo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Trocar a razão pelo par de lados errado.",
        "Esquecer a relação sen²θ + cos²θ = 1 para conferir.",
        "Misturar graus e radianos.",
        "Confundir amplitude e período ao ler a senoide.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Numa rampa de 8 m a 30°, qual a altura ganha? (sen 30° = 0,5)",
          identificar: "altura = hipotenusa · sen.",
          dica: "8 · 0,5.",
          resolucao: "altura = 8 · 0,5 = 4 m.",
          resposta: "4 m",
          interpretacao: "Metade do comprimento, pois sen 30° = 0,5.",
          erroComum: "Usar cosseno.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Se sen θ = 0,6, quanto vale cos θ (ângulo agudo)?",
          identificar: "Relação fundamental.",
          dica: "1 − 0,36 e raiz.",
          resolucao: "cos²θ = 1 − 0,36 = 0,64 → cos θ = 0,8.",
          resposta: "0,8",
          interpretacao: "Triângulo 3-4-5 de novo.",
          erroComum: "Esquecer a raiz.",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Qual o período do gráfico de y = sen(x)?",
          identificar: "Quanto anda até repetir.",
          dica: "Uma volta inteira.",
          resolucao: "360° (ou 2π radianos).",
          resposta: "360° (2π)",
          interpretacao: "Depois de uma volta, a onda recomeça.",
          erroComum: "Dizer 180°.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise todo o módulo de trigonometria no banco de exercícios.",
      exerciseIds: [],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "SOH-CAH-TOA: as três razões e seus pares de lados.",
        "Ciclo trigonométrico estende tudo para qualquer ângulo.",
        "sen²θ + cos²θ = 1 e tan θ = sen θ/cos θ amarram o módulo.",
        "A senoide descreve ondas, giros e oscilações.",
      ],
    },
  },
};
