import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "algebra";
const MOD_TITLE = "Álgebra essencial";

export const algebraAulas: Record<string, AulaContent> = {
  "expressoes-algebricas": {
    meta: preMeta({
      title: "Manipulação de expressões algébricas",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "12 min",
      readingNotes: ["Termos semelhantes", "Distributiva na prática"],
      glossaryTerms: ["Termo", "Coeficiente", "Variável", "Termos semelhantes"],
      next: { slug: "isolamento-variaveis", title: "Isolamento de variáveis" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Uma expressão algébrica é só uma conta com letra no lugar de um número que você ainda não sabe. \"3 maçãs + 2 maçãs\" vira \"\\(3x + 2x\\)\" — e dá \\(5x\\), do mesmo jeito que daria 5 maçãs.",
        "Manipular expressão é arrumar a bagunça: juntar o que é parecido, abrir parênteses, deixar tudo mais curto antes de resolver.",
        "Quase toda equação, função e problema de Cálculo começa com uma expressão que precisa ser simplificada. É a faxina antes do trabalho de verdade.",
      ],
    },
    explicacao: {
      title: "Juntar o que é semelhante",
      paragraphs: [
        "Termos semelhantes têm a mesma letra elevada ao mesmo expoente: \\(3x\\) e \\(5x\\) são semelhantes; \\(3x\\) e \\(3x^2\\) não são. Só dá para somar ou subtrair termos semelhantes.",
        "A propriedade distributiva abre os parênteses: \\(a(b + c) = ab + ac\\). Ela é a ferramenta para tirar parênteses e depois juntar os termos parecidos.",
      ],
      callout:
        "Pense na letra como uma \"unidade\": você soma 3 reais + 2 reais, mas não soma 3 reais + 2 metros. \\(x\\) e \\(x^2\\) são unidades diferentes.",
      formula: "a(b + c) = ab + ac",
      formulaLatex: "a(b + c) = ab + ac",
      formulaAria: "a vezes abre parêntese b mais c fecha parêntese é igual a a b mais a c",
      formulaLegend: "a propriedade distributiva, que abre os parênteses",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Equações", detail: "simplificar antes de isolar a incógnita" },
        { label: "Funções", detail: "deixar a fórmula na forma mais simples" },
        { label: "Finanças", detail: "juntar custos fixos e variáveis" },
        { label: "Física", detail: "reorganizar fórmulas para isolar grandezas" },
        { label: "Programação", detail: "simplificar condições e contas" },
        { label: "Cálculo", detail: "expandir antes de derivar ou integrar" },
      ],
    },
    exemplo: {
      title: "Uma expressão para arrumar",
      situacao:
        "Simplifique: \\(2(x + 3) + 4x - 5\\). Tem parêntese para abrir e termos parecidos para juntar.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Abrir o parêntese (distributiva)",
          detail: "\\(2(x + 3) = 2 \\cdot x + 2 \\cdot 3 = 2x + 6\\).",
        },
        {
          title: "Juntar tudo passo a passo",
          detail:
            "\\[\\begin{aligned} 2(x + 3) + 4x - 5 &= 2x + 6 + 4x - 5 \\\\ &= (2x + 4x) + (6 - 5) \\\\ &= 6x + 1 \\end{aligned}\\]",
        },
        {
          title: "Escrever o resultado simplificado",
          detail: "\\(6x + 1\\) — não dá para juntar mais (um tem letra, o outro não).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(6x + 1\\) é a mesma expressão de antes, só que arrumada. Para qualquer valor de \\(x\\), as duas dão o mesmo número — só que esta é mais fácil de usar.",
        "Repare que não dá para juntar \\(6x\\) com \\(1\\): um tem letra, o outro não. São unidades diferentes, e por isso o resultado fica com dois termos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Somar termos diferentes: \\(6x + 1\\) não é \\(7x\\).",
        "Esquecer de distribuir para todos os termos do parêntese.",
        "Errar o sinal ao distribuir um número negativo: \\(-2(x - 3) = -2x + 6\\).",
        "Somar \\(x\\) com \\(x^2\\) como se fossem semelhantes.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Simplifique \\(3x + 5x - 2x\\).",
          identificar: "Todos são termos semelhantes (mesma letra).",
          dica: "Some e subtraia os coeficientes.",
          resolucao:
            "\\[\\begin{aligned} 3x + 5x - 2x &= (3 + 5 - 2)x \\\\ &= 6x \\end{aligned}\\]",
          resposta: "\\(6x\\)",
          interpretacao: "Como somar 3 + 5 − 2 caixas iguais: sobram 6 caixas.",
          erroComum: "Esquecer de manter o \\(x\\) no resultado.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Abra e simplifique \\(4(2x - 1)\\).",
          identificar: "Use a distributiva.",
          dica: "Multiplique o 4 por cada termo de dentro.",
          resolucao:
            "\\[\\begin{aligned} 4(2x - 1) &= 4 \\cdot 2x - 4 \\cdot 1 \\\\ &= 8x - 4 \\end{aligned}\\]",
          resposta: "\\(8x - 4\\)",
          interpretacao: "O 4 multiplica tudo que está no parêntese, não só o primeiro termo.",
          erroComum: "Multiplicar só o \\(2x\\) e esquecer o \\(-1\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Simplifique \\(5x + 3 - (2x - 4)\\).",
          identificar: "O sinal de menos na frente do parêntese inverte os sinais.",
          dica: "\\(-(2x - 4) = -2x + 4\\).",
          resolucao:
            "\\[\\begin{aligned} 5x + 3 - (2x - 4) &= 5x + 3 - 2x + 4 \\\\ &= 3x + 7 \\end{aligned}\\]",
          resposta: "\\(3x + 7\\)",
          interpretacao: "O menos virou os dois sinais de dentro; só depois junte os semelhantes.",
          erroComum: "Trocar só o sinal do \\(2x\\) e deixar o \\(-4\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Treine simplificação de expressões no banco de exercícios do site.",
      exerciseIds: ["alg-ap-01", "alg-ap-02"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Só some/subtraia termos semelhantes (mesma letra e expoente).",
        "Distributiva: \\(a(b + c) = ab + ac\\) abre os parênteses.",
        "Menos na frente do parêntese inverte todos os sinais de dentro.",
        "Simplificar é arrumar a expressão sem mudar o valor dela.",
      ],
    },
  },

  "isolamento-variaveis": {
    meta: preMeta({
      title: "Isolamento de variáveis",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "11 min",
      readingNotes: ["A balança em equilíbrio", "Operação inversa"],
      glossaryTerms: ["Incógnita", "Operação inversa", "Igualdade"],
      next: { slug: "inequacoes", title: "Inequações" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Isolar uma variável é deixá-la sozinha de um lado do igual: \"x = alguma coisa\". É como descascar uma fruta — você tira tudo que está em volta do x até ele ficar exposto.",
        "Essa é a habilidade mais usada de toda a matemática: resolver equação, inverter uma fórmula de física, achar quanto você pode gastar. Tudo é isolar.",
        "O segredo é simples: o que está fazendo conta com o x, você desfaz com a operação contrária — sempre nos dois lados.",
      ],
    },
    explicacao: {
      title: "A balança e a operação inversa",
      paragraphs: [
        "Uma equação é uma balança em equilíbrio: os dois lados pesam igual. Se você faz algo de um lado, tem de fazer o mesmo do outro, ou a balança desequilibra.",
        "Para tirar o que acompanha o x, use a operação inversa: o que soma você subtrai, o que multiplica você divide. Faça isso até o x ficar sozinho.",
      ],
      callout:
        "Regra de ouro: o que você faz de um lado, faz do outro. A igualdade só se mantém se os dois lados mudarem junto.",
      formula: "ax + b = c  ⟹  x = (c − b) / a",
      formulaLatex: "ax + b = c \\;\\Rightarrow\\; x = \\frac{c - b}{a}",
      formulaAria: "a x mais b igual a c implica que x é igual a c menos b sobre a",
      formulaLegend: "isolando x em uma equação do primeiro grau",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Física", detail: "isolar a velocidade em v = d/t" },
        { label: "Finanças", detail: "achar quanto economizar por mês" },
        { label: "Receitas", detail: "ajustar quantidade para X porções" },
        { label: "Funções", detail: "encontrar o x que dá certo valor de y" },
        { label: "Química", detail: "isolar concentração numa fórmula" },
        { label: "Cálculo", detail: "reescrever equações antes de resolver" },
      ],
    },
    exemplo: {
      title: "Uma fórmula para inverter",
      situacao:
        "Você guarda dinheiro com a regra \\(T = 50m + 200\\) (total \\(T\\) após \\(m\\) meses, começando com R$ 200). Quantos meses para juntar R$ 950? Isole \\(m\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Escrever a equação com o valor pedido",
          detail: "\\(950 = 50m + 200\\).",
        },
        {
          title: "Isolar m passo a passo",
          detail:
            "\\[\\begin{aligned} 950 &= 50m + 200 \\\\ 950 - 200 &= 50m \\\\ 750 &= 50m \\\\ m &= \\frac{750}{50} \\\\ m &= 15 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "\\(50 \\cdot 15 + 200 = 750 + 200 = 950\\). Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(m = 15\\) meses é o tempo para juntar R$ 950 nesse ritmo. Isolar a variável transformou \"quanto tempo?\" em uma conta direta.",
        "A ordem das operações inversas importa: tiramos primeiro o que estava somando (\\(200\\)) e depois o que estava multiplicando (\\(50\\)) — o contrário da ordem normal das operações.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Fazer a operação só de um lado da igualdade.",
        "Dividir antes de tirar o termo que está somando.",
        "Trocar o sinal errado ao passar um número para o outro lado.",
        "Dividir só parte do lado: tem de dividir a expressão inteira.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Isole \\(x\\) em \\(2x + 6 = 20\\).",
          identificar: "Tire primeiro o que soma, depois o que multiplica.",
          dica: "Subtraia 6, depois divida por 2.",
          resolucao:
            "\\[\\begin{aligned} 2x + 6 &= 20 \\\\ 2x &= 14 \\\\ x &= 7 \\end{aligned}\\]",
          resposta: "\\(x = 7\\)",
          interpretacao: "Substituindo: \\(2 \\cdot 7 + 6 = 20\\). Confere.",
          erroComum: "Dividir por \\(2\\) antes de tirar o \\(6\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Isole \\(t\\) na fórmula \\(d = v \\cdot t\\).",
          identificar: "\\(v\\) está multiplicando \\(t\\).",
          dica: "Divida os dois lados por \\(v\\).",
          resolucao: "\\(t = \\frac{d}{v}\\).",
          resposta: "\\(t = \\frac{d}{v}\\)",
          interpretacao: "Tempo é distância dividida pela velocidade — faz sentido físico.",
          erroComum: "Escrever \\(t = d - v\\), confundindo divisão com subtração.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Isole \\(x\\) em \\(\\frac{x - 4}{3} = 5\\).",
          identificar: "Desfaça a divisão antes da subtração.",
          dica: "Multiplique os dois lados por 3 primeiro.",
          resolucao:
            "\\[\\begin{aligned} \\frac{x - 4}{3} &= 5 \\\\ x - 4 &= 15 \\\\ x &= 19 \\end{aligned}\\]",
          resposta: "\\(x = 19\\)",
          interpretacao: "Verificando: \\(\\frac{19 - 4}{3} = \\frac{15}{3} = 5\\). Confere.",
          erroComum: "Somar \\(4\\) antes de multiplicar por \\(3\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique isolamento de variáveis e inversão de fórmulas no banco do site.",
      exerciseIds: ["alg-ap-03", "alg-ap-04"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Isolar = deixar a variável sozinha de um lado do igual.",
        "Use a operação inversa: soma↔subtração, multiplicação↔divisão.",
        "O que faz de um lado, faça do outro (a balança).",
        "Desfaça primeiro o que soma, depois o que multiplica.",
      ],
    },
  },

  inequacoes: {
    meta: preMeta({
      title: "Inequações: quando não é igual",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "13 min",
      readingNotes: ["A regra do sinal ao multiplicar por negativo", "Resposta é um intervalo"],
      glossaryTerms: ["Inequação", "Intervalo", "Desigualdade"],
      next: { slug: "sistemas-equacoes", title: "Sistemas de equações" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Nem tudo na vida é \"igual a\". Muita coisa é \"no máximo\", \"pelo menos\", \"acima de\": o limite de peso no elevador, o mínimo de pontos para passar, o teto do orçamento.",
        "Inequação é a equação dessas situações. Em vez de um único valor, a resposta é uma faixa de valores que funcionam.",
        "A boa notícia: resolve-se quase igual a uma equação. Só tem uma regra nova — e ela pega muita gente desprevenida.",
      ],
    },
    explicacao: {
      title: "Quase igual a equação, com uma pegadinha",
      paragraphs: [
        "Os símbolos: \\(<\\) (menor), \\(>\\) (maior), \\(\\leq\\) (menor ou igual), \\(\\geq\\) (maior ou igual). Você isola a variável do mesmo jeito que numa equação.",
        "A pegadinha: ao multiplicar ou dividir os dois lados por um número negativo, o sinal da desigualdade vira. Se \\(-x < 3\\), ao multiplicar por \\(-1\\) fica \\(x > -3\\) (o \\(<\\) virou \\(>\\)).",
      ],
      callout:
        "Multiplicou ou dividiu por número negativo? Vire a desigualdade. É o único passo diferente de uma equação comum.",
      formula: "−x < a  ⟹  x > −a",
      formulaLatex: "-x < a \\;\\Rightarrow\\; x > -a",
      formulaAria: "menos x menor que a implica x maior que menos a",
      formulaLegend: "ao multiplicar por menos um, a desigualdade inverte",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Elevador", detail: "peso total \\(\\leq\\) capacidade máxima" },
        { label: "Provas", detail: "pelo menos X pontos para aprovar" },
        { label: "Orçamento", detail: "gastos \\(\\leq\\) dinheiro disponível" },
        { label: "Velocidade", detail: "manter abaixo do limite da via" },
        { label: "Produção", detail: "fabricar acima do ponto de lucro" },
        { label: "Cálculo", detail: "domínio de funções com restrição" },
      ],
    },
    exemplo: {
      title: "Um limite de orçamento",
      situacao:
        "Você tem R$ 100 para gastar. Cada ingresso custa R$ 18 e você já gastou R$ 10 de transporte. Quantos ingressos no máximo dá para comprar? Monte como inequação.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar a inequação",
          detail: "Gasto total não pode passar de 100: \\(18x + 10 \\leq 100\\).",
        },
        {
          title: "Resolver passo a passo",
          detail:
            "\\[\\begin{aligned} 18x + 10 &\\leq 100 \\\\ 18x &\\leq 90 \\\\ x &\\leq 5 \\end{aligned}\\]",
        },
        {
          title: "Interpretar o intervalo",
          detail: "\\(x\\) pode ser 0, 1, 2, 3, 4 ou 5 ingressos.",
        },
        {
          title: "Conferir o sentido",
          detail: "5 ingressos: \\(18 \\cdot 5 + 10 = 100\\), exatamente o limite. 6 estouraria.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(x \\leq 5\\) quer dizer \"no máximo 5 ingressos\". A resposta não é um número só, e sim todos os valores que respeitam o orçamento.",
        "Como ingresso é coisa inteira, na prática a resposta vai de 0 a 5. O símbolo \\(\\leq\\) inclui o 5, porque gastar exatamente R$ 100 ainda está dentro do limite.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de virar o sinal ao multiplicar/dividir por negativo.",
        "Tratar a resposta como um único número, e não como um intervalo.",
        "Confundir \\(<\\) (não inclui) com \\(\\leq\\) (inclui o valor).",
        "Virar o sinal ao multiplicar por um número positivo (não precisa).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(2x + 1 > 7\\).",
          identificar: "Isole o \\(x\\) como numa equação.",
          dica: "Subtraia 1, depois divida por 2 (positivo).",
          resolucao:
            "\\[\\begin{aligned} 2x + 1 &> 7 \\\\ 2x &> 6 \\\\ x &> 3 \\end{aligned}\\]",
          resposta: "\\(x > 3\\)",
          interpretacao: "Qualquer valor maior que 3 satisfaz; 3 não entra (é \\(>\\), não \\(\\geq\\)).",
          erroComum: "Incluir o \\(3\\) na resposta.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(-3x \\geq 12\\).",
          identificar: "Vai dividir por número negativo.",
          dica: "Divida por \\(-3\\) e vire o sinal.",
          resolucao:
            "Dividir por \\(-3\\) inverte a desigualdade: \\[\\begin{aligned} -3x &\\geq 12 \\\\ x &\\leq -4 \\end{aligned}\\]",
          resposta: "\\(x \\leq -4\\)",
          interpretacao: "Testando \\(x = -5\\): \\(-3 \\cdot (-5) = 15 \\geq 12\\). Confere.",
          erroComum: "Esquecer de inverter a desigualdade e escrever \\(x \\geq -4\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Para passar você precisa de média \\(\\geq 6\\). Já tem 5 e 7; que nota mínima \\(x\\) precisa na terceira prova?",
          identificar: "Monte a média das três e force \\(\\geq 6\\).",
          dica: "\\(\\frac{5 + 7 + x}{3} \\geq 6\\).",
          resolucao:
            "\\[\\begin{aligned} \\frac{5 + 7 + x}{3} &\\geq 6 \\\\ \\frac{12 + x}{3} &\\geq 6 \\\\ 12 + x &\\geq 18 \\\\ x &\\geq 6 \\end{aligned}\\]",
          resposta: "\\(x \\geq 6\\)",
          interpretacao: "Precisa tirar pelo menos 6 na última prova para fechar a média.",
          erroComum: "Multiplicar só parte do lado ao tirar o \\(/3\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique inequações e problemas de limite no banco de exercícios.",
      exerciseIds: ["alg-ap-05", "alg-ap-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Inequação resolve-se quase igual a uma equação.",
        "Multiplicar/dividir por negativo VIRA o sinal da desigualdade.",
        "A resposta é um intervalo de valores, não um número só.",
        "\\(\\leq\\) e \\(\\geq\\) incluem o valor; \\(<\\) e \\(>\\) não incluem.",
      ],
    },
  },

  "sistemas-equacoes": {
    meta: preMeta({
      title: "Sistemas de equações",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "14 min",
      readingNotes: ["Método da substituição", "Método da adição"],
      glossaryTerms: ["Sistema", "Substituição", "Adição"],
      next: { slug: "simplificacao", title: "Simplificação algébrica" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Às vezes você tem duas coisas desconhecidas ao mesmo tempo: quantos adultos e quantas crianças, o preço do café e o do pão. Uma equação só não basta.",
        "Um sistema junta duas (ou mais) equações que valem ao mesmo tempo. A resposta é o par de valores que satisfaz as duas de uma vez.",
        "Pense em duas pistas de um detetive: cada equação é uma pista, e só um par de valores fecha com as duas.",
      ],
    },
    explicacao: {
      title: "Dois caminhos para a mesma resposta",
      paragraphs: [
        "Substituição: isole uma variável numa equação e troque na outra. Aí sobra uma equação com uma incógnita só, fácil de resolver.",
        "Adição (ou eliminação): some ou subtraia as duas equações para cancelar uma variável. Funciona bem quando os coeficientes já combinam ou dá para ajustá-los.",
      ],
      callout:
        "Os dois métodos dão a mesma resposta. Escolha substituição quando uma variável já está fácil de isolar; adição quando os coeficientes se cancelam bem.",
      formula: "{ x + y = S ;  x − y = D }  ⟹  x = (S+D)/2",
      formulaLatex: "\\begin{cases} x + y = S \\\\ x - y = D \\end{cases} \\Rightarrow x = \\frac{S + D}{2}",
      formulaAria: "sistema x mais y igual a S e x menos y igual a D implica x igual a S mais D sobre dois",
      formulaLegend: "somando as duas equações o y se cancela",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Compras", detail: "descobrir dois preços a partir de dois totais" },
        { label: "Eventos", detail: "quantos adultos e crianças por bilheteria" },
        { label: "Misturas", detail: "combinar dois produtos numa proporção" },
        { label: "Finanças", detail: "dividir um valor em duas aplicações" },
        { label: "Engenharia", detail: "resolver forças em duas direções" },
        { label: "Programação", detail: "calcular interseção de duas retas" },
      ],
    },
    exemplo: {
      title: "Dois preços, dois totais",
      situacao:
        "2 cafés e 1 pão custam R$ 17. 1 café e 1 pão custam R$ 11. Qual o preço de cada um? Chame café de \\(x\\) e pão de \\(y\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar o sistema",
          detail: "\\[\\begin{cases} 2x + y = 17 \\\\ x + y = 11 \\end{cases}\\]",
        },
        {
          title: "Subtrair as equações (eliminação)",
          detail:
            "\\[\\begin{aligned} (2x + y) - (x + y) &= 17 - 11 \\\\ x &= 6 \\end{aligned}\\]",
        },
        {
          title: "Substituir e isolar y",
          detail:
            "\\[\\begin{aligned} 6 + y &= 11 \\\\ y &= 5 \\end{aligned}\\]",
        },
        {
          title: "Conferir nas duas equações",
          detail: "\\(2 \\cdot 6 + 5 = 17\\) ✓ e \\(6 + 5 = 11\\) ✓.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Café custa R$ 6 e pão R$ 5. Esse par é o único que satisfaz as duas situações ao mesmo tempo — por isso precisávamos das duas equações.",
        "Subtrair as equações foi esperto: o \\(y\\) tinha coeficiente igual nas duas, então sumiu e sobrou só o \\(x\\). Esse é o coração do método da adição/eliminação.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Resolver uma equação só e achar que terminou.",
        "Errar o sinal ao subtrair equações inteiras.",
        "Esquecer de substituir para achar a segunda variável.",
        "Não conferir a resposta nas duas equações.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva: \\(x + y = 10\\) e \\(x - y = 4\\).",
          identificar: "Os y se cancelam ao somar.",
          dica: "Some as duas equações.",
          resolucao:
            "Somando as duas equações: \\[\\begin{aligned} 2x &= 14 \\\\ x &= 7 \\\\ 7 + y &= 10 \\Rightarrow y = 3 \\end{aligned}\\]",
          resposta: "\\(x = 7,\\ y = 3\\)",
          interpretacao: "Confere: \\(7 + 3 = 10\\) e \\(7 - 3 = 4\\).",
          erroComum: "Somar os lados errados e perder o cancelamento.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva por substituição: \\(y = 2x\\) e \\(x + y = 9\\).",
          identificar: "\\(y\\) já está isolado.",
          dica: "Troque \\(y\\) por \\(2x\\) na segunda equação.",
          resolucao:
            "\\[\\begin{aligned} x + 2x &= 9 \\\\ 3x &= 9 \\\\ x &= 3 \\\\ y &= 2 \\cdot 3 = 6 \\end{aligned}\\]",
          resposta: "\\(x = 3,\\ y = 6\\)",
          interpretacao: "Substituição brilha quando uma variável já está pronta.",
          erroComum: "Esquecer de voltar e calcular \\(y\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Em um show, 3 adultos e 2 crianças pagam R$ 130; 1 adulto e 2 crianças pagam R$ 70. Preço de cada?",
          identificar: "Monte o sistema com \\(a\\) (adulto) e \\(c\\) (criança).",
          dica: "Subtraia para cancelar as crianças.",
          resolucao:
            "\\[\\begin{aligned} 3a + 2c &= 130 \\\\ a + 2c &= 70 \\\\ 2a &= 60 \\\\ a &= 30 \\\\ c &= 20 \\end{aligned}\\]",
          resposta: "adulto R$ 30, criança R$ 20",
          interpretacao: "O termo \\(2c\\) era igual nas duas, então sumiu na subtração.",
          erroComum: "Subtrair só parte de uma das equações.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique sistemas por substituição e adição no banco de exercícios.",
      exerciseIds: ["alg-ap-07", "alg-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Sistema = duas equações que valem ao mesmo tempo.",
        "Substituição: isole uma variável e troque na outra equação.",
        "Adição/eliminação: some ou subtraia para cancelar uma variável.",
        "Sempre confira a resposta nas duas equações.",
      ],
    },
  },

  simplificacao: {
    meta: preMeta({
      title: "Simplificação algébrica",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "10 min",
      readingNotes: ["Cancelar fatores comuns", "Fatorar antes de cortar"],
      glossaryTerms: ["Fator comum", "Fração algébrica", "Simplificação"],
      next: { slug: "orcamentos-planos", title: "Orçamentos e planos" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Simplificar é deixar uma expressão na forma mais curta e limpa, sem mudar o valor dela. É como reduzir uma fração: 4/8 e 1/2 são a mesma coisa, mas 1/2 é mais fácil de usar.",
        "Em álgebra, expressões grandes escondem o que importa. Simplificar revela a estrutura e evita erros nas contas seguintes.",
        "No Cálculo isso é ouro: uma derivada ou um limite quase sempre fica simples depois de cortar fatores comuns.",
      ],
    },
    explicacao: {
      title: "Cancelar só fatores, nunca termos soltos",
      paragraphs: [
        "Você só pode cancelar o que está multiplicando o numerador inteiro e o denominador inteiro — um fator comum. Por isso, muitas vezes é preciso fatorar antes de cortar.",
        "O erro clássico é cortar pedaços que estão somando. Em \\(\\frac{x + 2}{2}\\) não dá para cortar o 2, porque o de cima está somando, não multiplicando.",
      ],
      callout:
        "Só corta o que multiplica tudo. Se há soma no numerador, fatore primeiro para achar o fator comum.",
      formula: "(a·c) / (b·c) = a / b",
      formulaLatex: "\\frac{a \\cdot c}{b \\cdot c} = \\frac{a}{b}",
      formulaAria: "a vezes c sobre b vezes c é igual a a sobre b",
      formulaLegend: "o fator comum c cancela em cima e embaixo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Frações", detail: "reduzir à forma mais simples" },
        { label: "Funções", detail: "limpar a fórmula antes de usar" },
        { label: "Física", detail: "cancelar unidades e constantes" },
        { label: "Cálculo", detail: "resolver limites do tipo 0/0" },
        { label: "Finanças", detail: "simplificar fórmulas de juros" },
        { label: "Provas", detail: "respostas pedem a forma simplificada" },
      ],
    },
    exemplo: {
      title: "Uma fração algébrica para reduzir",
      situacao:
        "Simplifique a fração \\( \\frac{x^2 + 3x}{x} \\). Há um fator comum escondido no numerador.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Fatorar o numerador",
          detail: "\\(x^2 + 3x = x(x + 3)\\) — o \\(x\\) aparece nos dois termos.",
        },
        {
          title: "Cancelar e simplificar",
          detail:
            "\\[\\begin{aligned} \\frac{x^2 + 3x}{x} &= \\frac{x(x + 3)}{x} \\\\ &= x + 3 \\end{aligned}\\]",
        },
        {
          title: "Conferir com um número",
          detail: "Para \\(x = 2\\): \\(\\frac{4 + 6}{2} = 5\\) e \\(2 + 3 = 5\\). Confere.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(x + 3\\) é a mesma expressão, muito mais simples. Para qualquer \\(x\\) (diferente de 0), as duas dão o mesmo valor.",
        "O passo decisivo foi fatorar antes de cortar. Sem fatorar, alguém tentaria cancelar o \\(x\\) direto e erraria, porque o \\(3x\\) estava somando.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Cancelar termos que estão somando: \\(\\frac{x + 2}{2}\\) não vira \\(x\\).",
        "Cortar antes de fatorar e perder o fator comum.",
        "Cancelar só um dos termos do numerador.",
        "Esquecer a condição de que o denominador não pode ser zero.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Simplifique \\(\\frac{6x}{3}\\).",
          identificar: "Fator numérico comum.",
          dica: "Divida o coeficiente por 3.",
          resolucao: "\\(\\frac{6x}{3} = 2x\\), porque \\(\\frac{6}{3} = 2\\).",
          resposta: "\\(2x\\)",
          interpretacao: "O 3 divide o 6 inteiro, que multiplica o \\(x\\) — pode cancelar.",
          erroComum: "Achar que sobra \\(x\\) sozinho.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Simplifique \\(\\frac{2x + 4}{2}\\).",
          identificar: "Fatore o numerador antes de cortar.",
          dica: "\\(2x + 4 = 2(x + 2)\\).",
          resolucao:
            "\\[\\begin{aligned} \\frac{2x + 4}{2} &= \\frac{2(x + 2)}{2} \\\\ &= x + 2 \\end{aligned}\\]",
          resposta: "\\(x + 2\\)",
          interpretacao: "Só cortou porque o 2 multiplicava todo o numerador depois de fatorar.",
          erroComum: "Cortar o 2 do 4 e esquecer o \\(2x\\), escrevendo \\(x + 4\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Simplifique \\(\\frac{x^2 - x}{x - 1}\\).",
          identificar: "Fatore numerador e procure fator comum.",
          dica: "\\(x^2 - x = x(x - 1)\\).",
          resolucao:
            "\\[\\begin{aligned} \\frac{x^2 - x}{x - 1} &= \\frac{x(x - 1)}{x - 1} \\\\ &= x \\end{aligned}\\]",
          resposta: "\\(x\\)",
          interpretacao: "O fator \\((x - 1)\\) aparece em cima e embaixo e se cancela.",
          erroComum: "Tentar cancelar o \\(x\\) sem fatorar primeiro.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique simplificação de frações algébricas no banco de exercícios.",
      exerciseIds: ["alg-ap-09", "alg-ap-10"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Simplificar = forma mais curta sem mudar o valor.",
        "Só cancele fatores que multiplicam o numerador e o denominador inteiros.",
        "Fatore antes de cortar quando houver soma.",
        "Nunca corte termos que estão somando.",
      ],
    },
  },

  "orcamentos-planos": {
    meta: preMeta({
      title: "Orçamentos e planos: parte fixa + parte variável",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "10 min",
      readingNotes: ["Custo fixo vs. variável", "Comparar dois planos"],
      glossaryTerms: ["Custo fixo", "Custo variável", "Ponto de equilíbrio"],
      next: { slug: "custos-producao", title: "Custos de produção" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quase todo plano que você contrata tem duas partes: um valor fixo que paga sempre, e um valor que varia com o uso. Conta de celular, academia, internet, conta de luz.",
        "Escrever isso como expressão (fixo + variável × quantidade) deixa fácil comparar planos e prever quanto vai pagar.",
        "Essa é a estrutura da função afim, que você vai estudar a fundo depois. Aqui você já monta e compara antes de dar nome.",
      ],
    },
    explicacao: {
      title: "A fórmula de qualquer plano",
      paragraphs: [
        "Custo total = parte fixa + (valor por unidade × quantidade usada). A parte fixa não muda; a variável cresce com o uso.",
        "Para comparar dois planos, monte a expressão de cada um e veja em que quantidade eles se igualam — o ponto de equilíbrio. Abaixo dele, um plano é melhor; acima, o outro.",
      ],
      callout:
        "Plano = fixo + variável × uso. Comparar dois planos é achar o uso em que ficam iguais.",
      formula: "C = F + p·x",
      formulaLatex: "C = F + p \\cdot x",
      formulaAria: "C igual a F mais p vezes x",
      formulaLegend: "custo total = parte fixa F mais preço por unidade p vezes a quantidade x",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Celular", detail: "mensalidade + custo por GB extra" },
        { label: "Academia", detail: "matrícula + mensalidade" },
        { label: "Táxi/app", detail: "bandeirada + valor por km" },
        { label: "Conta de luz", detail: "taxa fixa + consumo" },
        { label: "Streaming", detail: "comparar assinatura mensal vs. anual" },
        { label: "Frete", detail: "taxa base + valor por kg" },
      ],
    },
    exemplo: {
      title: "Dois planos de celular",
      situacao:
        "Plano A: R$ 30 fixos + R$ 2 por GB. Plano B: R$ 50 fixos + R$ 1 por GB. A partir de quantos GB o plano B compensa?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Escrever a expressão de cada plano",
          detail: "A: \\(30 + 2x\\). B: \\(50 + x\\), onde \\(x\\) = GB usados.",
        },
        {
          title: "Igualar e isolar x",
          detail:
            "\\[\\begin{aligned} 30 + 2x &= 50 + x \\\\ 2x - x &= 50 - 30 \\\\ x &= 20 \\end{aligned}\\]",
        },
        {
          title: "Interpretar o ponto",
          detail: "Em 20 GB os dois custam o mesmo: \\(30 + 40 = 70 = 50 + 20\\).",
        },
        {
          title: "Decidir acima e abaixo",
          detail: "Acima de 20 GB, B é mais barato (cresce mais devagar). Abaixo, A.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O plano B compensa a partir de 20 GB. Antes disso, a mensalidade alta dele não vale a pena; depois, o preço menor por GB ganha.",
        "Repare que quem tem a parte variável menor (B, com R$ 1/GB) sempre vence no uso alto. A parte fixa só decide quem ganha no uso baixo.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Comparar só a parte fixa e ignorar o custo por uso.",
        "Esquecer de multiplicar o preço unitário pela quantidade.",
        "Achar que o plano mais barato no fixo é sempre melhor.",
        "Misturar as unidades (GB, minutos) ao montar a expressão.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Um plano cobra R$ 40 fixos + R$ 3 por GB. Quanto custam 12 GB?",
          identificar: "Substitua \\(x = 12\\) na expressão.",
          dica: "\\(40 + 3 \\cdot 12\\).",
          resolucao:
            "\\[\\begin{aligned} 40 + 3 \\cdot 12 &= 40 + 36 \\\\ &= 76 \\end{aligned}\\]",
          resposta: "R$ 76,00",
          interpretacao: "A parte variável (R$ 36) já superou a fixa nesse uso.",
          erroComum: "Esquecer de somar a parte fixa.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "App A: R$ 5 fixos + R$ 2/km. App B: R$ 8 fixos + R$ 1,50/km. Em quantos km custam igual?",
          identificar: "Iguale as duas expressões.",
          dica: "\\(5 + 2x = 8 + 1{,}5x\\).",
          resolucao:
            "\\[\\begin{aligned} 5 + 2x &= 8 + 1{,}5x \\\\ 0{,}5x &= 3 \\\\ x &= 6 \\end{aligned}\\]",
          resposta: "6 km",
          interpretacao: "Até 6 km o App A é mais barato; acima, o B.",
          erroComum: "Subtrair os fixos no lado errado e achar x negativo.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Dois planos têm o mesmo custo por GB, mas fixos diferentes. Qual é sempre melhor?",
          identificar: "A parte variável é idêntica; só o fixo decide.",
          dica: "Compare apenas a parte que não muda.",
          resolucao: "O de menor parte fixa é sempre mais barato, em qualquer uso.",
          resposta: "O de menor custo fixo",
          interpretacao: "Sem diferença na variável, não há ponto de equilíbrio: um sempre vence.",
          erroComum: "Procurar um ponto de cruzamento que não existe.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique comparação de planos e orçamentos no banco de exercícios.",
      exerciseIds: ["alg-ap-11", "alg-ap-12"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Plano: custo = parte fixa + preço por unidade × quantidade.",
        "Comparar planos = igualar expressões e achar o ponto de equilíbrio.",
        "Menor custo variável vence no uso alto; menor fixo vence no uso baixo.",
        "Essa é a estrutura da função afim que vem adiante.",
      ],
    },
  },

  "custos-producao": {
    meta: preMeta({
      title: "Custos de produção",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "11 min",
      readingNotes: ["Custo total e custo por unidade", "Por que o unitário cai"],
      glossaryTerms: ["Custo fixo", "Custo variável", "Custo unitário"],
      next: { slug: "receita-despesa", title: "Receita e despesa" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quem produz qualquer coisa — pão, camiseta, app — tem dois tipos de custo: o que paga uma vez (aluguel, máquina) e o que paga por item feito (ingrediente, tecido).",
        "Entender essa separação explica por que produzir mais barateia cada unidade, e a partir de quanto vale a pena ligar a fábrica.",
        "É a mesma estrutura de fixo + variável dos planos, agora vista pelo lado de quem fabrica.",
      ],
    },
    explicacao: {
      title: "Custo total e custo por unidade",
      paragraphs: [
        "Custo total = custo fixo + custo variável por item × quantidade. O fixo é pago mesmo produzindo zero; o variável só existe quando você produz.",
        "O custo por unidade é o total dividido pela quantidade. Como o fixo se dilui em mais itens, o custo de cada unidade cai conforme você produz mais.",
      ],
      callout:
        "Produzir mais não muda o custo fixo total, mas espalha ele em mais itens — por isso cada unidade fica mais barata.",
      formula: "C(x) = F + v·x   e   Cu = C(x)/x",
      formulaLatex: "C(x) = F + v \\cdot x \\quad\\text{e}\\quad C_u = \\frac{C(x)}{x}",
      formulaAria: "C de x igual a F mais v vezes x; e custo unitário igual a C de x sobre x",
      formulaLegend: "custo total e custo por unidade produzida",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Padaria", detail: "forno (fixo) + farinha por pão (variável)" },
        { label: "Confecção", detail: "máquina + tecido por peça" },
        { label: "Software", detail: "desenvolvimento + custo por usuário" },
        { label: "Eventos", detail: "aluguel do espaço + custo por convidado" },
        { label: "Indústria", detail: "linha de montagem + matéria-prima" },
        { label: "Food truck", detail: "veículo + ingredientes por prato" },
      ],
    },
    exemplo: {
      title: "Uma pequena produção de bolos",
      situacao:
        "Você gasta R$ 200 fixos por mês (gás, equipamento) e R$ 8 de ingredientes por bolo. Qual o custo total e o custo por bolo se fizer 50 bolos?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar o custo total",
          detail: "\\(C(x) = 200 + 8x\\), com \\(x\\) = número de bolos.",
        },
        {
          title: "Calcular para 50 bolos",
          detail:
            "\\[\\begin{aligned} C(50) &= 200 + 8 \\cdot 50 \\\\ &= 200 + 400 \\\\ &= 600 \\end{aligned}\\]",
        },
        {
          title: "Calcular o custo por bolo",
          detail: "\\(C_u = \\frac{600}{50} = 12\\).",
        },
        {
          title: "Comparar com uma produção menor",
          detail: "Com 20 bolos: \\(\\frac{200 + 160}{20} = \\frac{360}{20} = 18\\) por bolo.",
        },
        {
          title: "Interpretar a diferença",
          detail: "Produzir mais (50) baixou o custo unitário de R$ 18 para R$ 12.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Cada bolo custa R$ 12 quando você faz 50. O custo por unidade caiu porque os R$ 200 fixos se dividiram entre mais bolos.",
        "Isso explica o ganho de escala: quanto mais você produz, menor o peso do custo fixo em cada item — até o limite da sua capacidade.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer o custo fixo ao calcular o total.",
        "Dividir só o custo variável pela quantidade ao achar o unitário.",
        "Achar que o custo por unidade é constante (ele cai com a escala).",
        "Multiplicar o custo fixo pela quantidade (ele é pago uma vez só).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Custo fixo R$ 100, variável R$ 5/item. Qual o custo total de 30 itens?",
          identificar: "Use \\(C = F + v \\cdot x\\).",
          dica: "\\(100 + 5 \\cdot 30\\).",
          resolucao:
            "\\[\\begin{aligned} 100 + 5 \\cdot 30 &= 100 + 150 \\\\ &= 250 \\end{aligned}\\]",
          resposta: "R$ 250,00",
          interpretacao: "O variável (R$ 150) já superou o fixo nessa quantidade.",
          erroComum: "Multiplicar o fixo por 30 também.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Com o item anterior, qual o custo por unidade dos 30 itens?",
          identificar: "Divida o total pela quantidade.",
          dica: "\\(\\frac{250}{30}\\).",
          resolucao: "\\(\\frac{250}{30} \\approx 8{,}33\\).",
          resposta: "≈ R$ 8,33 por item",
          interpretacao: "Maior que os R$ 5 variáveis, porque inclui parte do fixo.",
          erroComum: "Dividir só o R$ 150 variável e achar R$ 5.",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Por que o custo por unidade cai quando se produz mais?",
          identificar: "Pense no que acontece com o custo fixo.",
          dica: "O fixo é o mesmo; a quantidade aumenta.",
          resolucao: "O custo fixo total não muda, mas é dividido por mais unidades, baixando a parcela em cada uma.",
          resposta: "Porque o custo fixo se dilui em mais itens",
          interpretacao: "É o efeito de escala: produzir mais reduz o peso do fixo por item.",
          erroComum: "Achar que o custo variável por item também cai.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique cálculo de custo total e unitário no banco de exercícios.",
      exerciseIds: ["alg-ap-13", "alg-ap-14"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Custo total = custo fixo + custo variável × quantidade.",
        "Custo por unidade = custo total ÷ quantidade.",
        "O fixo é pago uma vez; não multiplica pela quantidade.",
        "Produzir mais dilui o fixo e baixa o custo por unidade.",
      ],
    },
  },

  "receita-despesa": {
    meta: preMeta({
      title: "Receita, despesa e ponto de equilíbrio",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "10 min",
      readingNotes: ["Lucro = receita − custo", "Quando começa o lucro"],
      glossaryTerms: ["Receita", "Despesa", "Lucro", "Ponto de equilíbrio"],
      next: { slug: "revisao-algebra", title: "Revisão do módulo" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Todo negócio vive de uma conta simples: quanto entra menos quanto sai. O que entra é a receita; o que sai é a despesa; a diferença é o lucro (ou o prejuízo).",
        "Saber a partir de quantas vendas você para de ter prejuízo — o ponto de equilíbrio — é uma das contas mais úteis que existem.",
        "Junta tudo do módulo: montar expressões, igualar e isolar para responder \"a partir de quando dá lucro?\".",
      ],
    },
    explicacao: {
      title: "Receita, custo e lucro",
      paragraphs: [
        "Receita = preço de venda × quantidade vendida. Custo = custo fixo + custo variável × quantidade. Lucro = receita − custo.",
        "O ponto de equilíbrio é onde receita = custo: lucro zero. Vendendo mais que isso, você tem lucro; menos, prejuízo. Para achá-lo, iguale as duas expressões e isole a quantidade.",
      ],
      callout:
        "Lucro = receita − custo. Ponto de equilíbrio é onde os dois se igualam: a partir dali, cada venda é lucro.",
      formula: "p·x = F + v·x  ⟹  x = F / (p − v)",
      formulaLatex: "p \\cdot x = F + v \\cdot x \\;\\Rightarrow\\; x = \\frac{F}{p - v}",
      formulaAria: "p vezes x igual a F mais v vezes x implica x igual a F sobre p menos v",
      formulaLegend: "ponto de equilíbrio: receita igual ao custo total",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Pequeno negócio", detail: "quantas vendas para cobrir os custos" },
        { label: "Eventos", detail: "ingressos mínimos para não ter prejuízo" },
        { label: "Loja", detail: "meta de vendas do mês" },
        { label: "Freelancer", detail: "horas necessárias para cobrir despesas" },
        { label: "Startup", detail: "usuários pagantes até o break-even" },
        { label: "Produção", detail: "decidir se vale fabricar um lote" },
      ],
    },
    exemplo: {
      title: "Quantos brigadeiros para empatar?",
      situacao:
        "Você vende brigadeiros a R$ 3 cada. Tem R$ 120 de custo fixo e gasta R$ 1 de ingredientes por brigadeiro. Quantos precisa vender para empatar (lucro zero)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar receita e custo",
          detail: "Receita = \\(3x\\). Custo = \\(120 + x\\), com \\(x\\) = brigadeiros.",
        },
        {
          title: "Igualar (lucro zero) e isolar x",
          detail:
            "\\[\\begin{aligned} 3x &= 120 + x \\\\ 3x - x &= 120 \\\\ 2x &= 120 \\\\ x &= 60 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "Receita: \\(3 \\cdot 60 = 180\\). Custo: \\(120 + 60 = 180\\). Empata.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Você precisa vender 60 brigadeiros para empatar. A partir do 61º, cada um deixa R$ 2 de lucro (preço R$ 3 menos R$ 1 de ingrediente).",
        "O número 2 do denominador (\\(p - v = 3 - 1\\)) é a margem por unidade: quanto cada venda contribui para cobrir o fixo. Quanto maior a margem, menos vendas para empatar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Confundir receita (só o que entra) com lucro (entra menos sai).",
        "Esquecer o custo variável e dividir o fixo só pelo preço.",
        "Usar o preço em vez da margem (\\(p - v\\)) no denominador.",
        "Achar que vender abaixo do ponto de equilíbrio já dá lucro.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Receita \\(5x\\), custo \\(200 + 5x\\)... existe ponto de equilíbrio?",
          identificar: "Compare preço de venda e custo variável.",
          dica: "Iguale \\(5x = 200 + 5x\\).",
          resolucao:
            "\\[\\begin{aligned} 5x &= 200 + 5x \\\\ 5x - 5x &= 200 \\\\ 0 &= 200 \\end{aligned}\\] impossível: nunca cobre o fixo.",
          resposta: "Não há ponto de equilíbrio",
          interpretacao: "Vendendo ao mesmo valor do custo variável, a margem é zero — nunca paga o fixo.",
          erroComum: "Dividir 200 por zero sem perceber que é impossível.",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Ingressos a R$ 20, custo fixo R$ 800, R$ 4 por pessoa. Quantos ingressos para empatar?",
          identificar: "Use \\(x = \\frac{F}{p - v}\\).",
          dica: "Margem \\(= 20 - 4 = 16\\).",
          resolucao: "\\(x = \\frac{800}{16} = 50\\).",
          resposta: "50 ingressos",
          interpretacao: "Do 51º em diante, cada ingresso rende R$ 16 de lucro.",
          erroComum: "Dividir 800 por 20 (preço) em vez da margem.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "No exemplo dos brigadeiros, qual o lucro vendendo 100?",
          identificar: "Lucro = receita − custo.",
          dica: "Receita \\(3 \\cdot 100\\); custo \\(120 + 100\\).",
          resolucao:
            "\\[\\begin{aligned} \\text{Lucro} &= 300 - 220 \\\\ &= 80 \\end{aligned}\\]",
          resposta: "R$ 80,00 de lucro",
          interpretacao: "40 unidades acima do equilíbrio × R$ 2 de margem = R$ 80.",
          erroComum: "Reportar a receita (R$ 300) como se fosse o lucro.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique lucro e ponto de equilíbrio no banco de exercícios.",
      exerciseIds: ["alg-ap-15", "alg-ap-16"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Receita = preço × quantidade; lucro = receita − custo.",
        "Ponto de equilíbrio: receita = custo, lucro zero.",
        "x = custo fixo ÷ margem (preço − custo variável).",
        "Acima do equilíbrio há lucro; abaixo, prejuízo.",
      ],
    },
  },

  "revisao-algebra": {
    meta: preMeta({
      title: "Revisão do módulo: álgebra essencial",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "9 min",
      readingNotes: ["Consolida as 8 aulas", "Da expressão ao problema real"],
      glossaryTerms: ["Expressão", "Equação", "Inequação", "Sistema"],
      next: {
        slug: "o-que-e-funcao",
        title: "O que é uma função?",
        moduleSlug: "funcoes",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A álgebra inteira deste módulo serve a um propósito só: transformar situações em expressões e resolver para a resposta que você quer.",
        "Você aprendeu a simplificar, isolar, comparar com desigualdade, resolver sistemas e aplicar tudo a orçamentos, custos e lucro. Esta aula amarra os fios.",
        "Levar isso firme é o que torna o módulo de Funções — o próximo passo — natural em vez de assustador.",
      ],
    },
    explicacao: {
      title: "O módulo em um mapa",
      paragraphs: [
        "Manipular expressões e simplificar são a faxina: deixar a conta limpa. Isolar variáveis e resolver inequações são a ação: achar o valor ou o intervalo que responde a pergunta.",
        "Sistemas resolvem duas incógnitas de uma vez. E as aplicações (planos, custos, receita) mostram que tudo isso existe para responder perguntas reais de dinheiro e decisão.",
      ],
      callout:
        "Caminho de sempre: traduza a situação em expressão → simplifique → isole ou iguale → interprete a resposta.",
      formula: "situação → expressão → isolar/igualar → resposta",
      formulaLegend: "o fluxo que conecta todas as aulas do módulo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Funções", detail: "o próximo módulo usa tudo isto" },
        { label: "Finanças", detail: "planos, custos e lucro no dia a dia" },
        { label: "Provas", detail: "questões de álgebra e problema" },
        { label: "Física", detail: "isolar grandezas em fórmulas" },
        { label: "Decisões", detail: "comparar opções com matemática" },
        { label: "Cálculo", detail: "manipulação é pré-requisito constante" },
      ],
    },
    exemplo: {
      title: "Um problema que usa o módulo inteiro",
      situacao:
        "Uma oficina cobra R$ 60 fixos + R$ 40 por hora. Outra cobra R$ 100 fixos + R$ 30 por hora. A partir de quantas horas a segunda compensa, e quanto custa nesse ponto?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar as expressões",
          detail: "A: \\(60 + 40h\\). B: \\(100 + 30h\\), com \\(h\\) = horas.",
        },
        {
          title: "Igualar e isolar h",
          detail:
            "\\[\\begin{aligned} 60 + 40h &= 100 + 30h \\\\ 40h - 30h &= 100 - 60 \\\\ 10h &= 40 \\\\ h &= 4 \\end{aligned}\\]",
        },
        {
          title: "Calcular o custo nesse ponto",
          detail: "\\(60 + 40 \\cdot 4 = 220\\) (igual a \\(100 + 30 \\cdot 4 = 220\\)).",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Em 4 horas as duas oficinas custam R$ 220. Acima disso, a oficina B (menor preço por hora) compensa; abaixo, a A.",
        "Repare como o problema usou o módulo inteiro: montar expressões (aula 1), juntar termos semelhantes (aula 1), isolar a variável (aula 2) e a lógica de planos (aula 6). É tudo a mesma caixa de ferramentas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Comparar planos olhando só a parte fixa.",
        "Errar o sinal ao juntar termos dos dois lados.",
        "Esquecer de virar a desigualdade ao multiplicar por negativo.",
        "Parar num único valor quando o problema pede um intervalo.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Simplifique e resolva: \\(3(x - 2) + 4 = 16\\).",
          identificar: "Abra o parêntese, junte e isole.",
          dica: "Distribua o 3 primeiro.",
          resolucao:
            "\\[\\begin{aligned} 3(x - 2) + 4 &= 16 \\\\ 3x - 6 + 4 &= 16 \\\\ 3x - 2 &= 16 \\\\ 3x &= 18 \\\\ x &= 6 \\end{aligned}\\]",
          resposta: "\\(x = 6\\)",
          interpretacao: "Simplificar antes deixou a equação fácil de isolar.",
          erroComum: "Distribuir o 3 só no \\(x\\) e esquecer o \\(-2\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva o sistema: \\(x + y = 12\\) e \\(2x - y = 3\\).",
          identificar: "Some para cancelar y.",
          dica: "As parcelas de \\(y\\) são \\(+y\\) e \\(-y\\).",
          resolucao:
            "Somando as duas: \\[\\begin{aligned} 3x &= 15 \\\\ x &= 5 \\\\ 5 + y &= 12 \\Rightarrow y = 7 \\end{aligned}\\]",
          resposta: "\\(x = 5,\\ y = 7\\)",
          interpretacao: "Confere nas duas: \\(5 + 7 = 12\\) e \\(10 - 7 = 3\\).",
          erroComum: "Subtrair em vez de somar e não cancelar o \\(y\\).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Você vende a R$ 10, custo fixo R$ 300, R$ 4 por item. Quantos itens para ter lucro?",
          identificar: "Ponto de equilíbrio e depois \"mais que isso\".",
          dica: "\\(x = \\frac{300}{10 - 4}\\).",
          resolucao: "\\(x = \\frac{300}{6} = 50\\); para lucro, \\(x > 50\\).",
          resposta: "Mais de 50 itens",
          interpretacao: "No 50º empata; do 51º em diante há lucro — resposta é um intervalo.",
          erroComum: "Responder exatamente 50, que dá lucro zero.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise todo o módulo de álgebra com exercícios variados no banco do site.",
      exerciseIds: ["alg-ap-17", "alg-ap-18"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Fluxo: situação → expressão → simplificar → isolar/igualar → interpretar.",
        "Simplificar e isolar são a base de toda resolução.",
        "Inequações dão intervalos; sistemas resolvem duas incógnitas.",
        "Planos, custos e lucro são a álgebra aplicada ao dinheiro.",
      ],
    },
  },
};
