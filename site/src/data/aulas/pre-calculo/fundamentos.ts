import type { AulaContent } from "@/data/aulas/types";
import { preMeta } from "@/data/aulas/pre-calculo/helpers";

const MOD = "fundamentos";
const MOD_TITLE = "Fundamentos matemáticos";

export const fundamentosAulas: Record<string, AulaContent> = {
  "operacoes-basicas": {
    meta: preMeta({
      title: "Operações básicas e ordem das operações",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 1,
      duration: "10 min",
      readingNotes: ["3 exemplos resolvidos", "Erros de ordem mais comuns"],
      glossaryTerms: ["Ordem das operações", "Sinal", "Parênteses"],
      next: { slug: "fracoes", title: "Frações na prática" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quase todo erro de conta em prova não é \"não saber a matéria\": é fazer as operações na ordem errada.",
        "Quando você digita \\(2 + 3 \\times 4\\) na calculadora e ela responde \\(14\\) (e não \\(20\\)), é porque existe uma ordem combinada que o mundo todo segue.",
        "Dominar essa ordem é o que faz suas contas baterem com o gabarito e com a calculadora.",
      ],
    },
    explicacao: {
      title: "A ordem que todo mundo combinou seguir",
      paragraphs: [
        "Primeiro resolva o que está dentro de parênteses. Depois potências e raízes. Depois multiplicação e divisão (da esquerda para a direita). Por último, soma e subtração (da esquerda para a direita).",
        "Multiplicação e divisão têm a mesma prioridade — quem aparece primeiro da esquerda para a direita resolve primeiro. O mesmo vale para soma e subtração.",
      ],
      callout:
        "Regra de bolso: Parênteses → Potências → ×÷ → +−. Dentro do mesmo nível, vá da esquerda para a direita.",
      formula: "( ) → potências → × ÷ → + −",
      formulaLegend: "a ordem de prioridade das operações",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Calculadora", detail: "Ela sempre respeita essa ordem" },
        { label: "Planilhas", detail: "Excel/Sheets calculam na mesma ordem" },
        { label: "Conta do mercado", detail: "3 itens a R$ 5 + 1 a R$ 8" },
        { label: "Receitas", detail: "Dobrar só parte dos ingredientes" },
        { label: "Programação", detail: "Toda linguagem segue a mesma regra" },
        { label: "Provas", detail: "Metade dos erros vem da ordem trocada" },
      ],
    },
    exemplo: {
      title: "Uma conta simples que engana",
      situacao:
        "Você comprou 3 cadernos a R$ 4,00 cada e 1 caneta de R$ 6,00. Qual é o total? Escreva como uma única conta: \\(3 \\times 4 + 6\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar as operações",
          detail: "Há uma multiplicação (\\(3 \\times 4\\)) e uma soma (\\(+\\,6\\)).",
        },
        {
          title: "Aplicar a ordem",
          detail: "Multiplicação vem antes da soma → resolvo \\(3 \\times 4\\) primeiro.",
        },
        {
          title: "Desenvolver passo a passo",
          detail:
            "\\[\\begin{aligned} 3 \\times 4 + 6 &= 12 + 6 \\\\ &= 18 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "R$ 12 dos cadernos + R$ 6 da caneta = R$ 18. Bate.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 18,00 é o total da compra. Se você fizesse \\(3 \\times (4 + 6)\\) daria R$ 30, que está errado — o parêntese mudaria a ordem.",
        "A ordem não é capricho: \\(3 \\times 4\\) significa \"três cadernos\", e os R$ 6 da caneta são outra coisa. Somar antes misturaria itens diferentes.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Resolver da esquerda para a direita ignorando a prioridade (\\(2 + 3 \\times 4\\) não é \\(20\\)).",
        "Esquecer que \\(\\times\\) e \\(\\div\\) vêm antes de \\(+\\) e \\(-\\).",
        "Sinal de menos na frente do parêntese: \\(-(5 - 2) = -3\\), não \\(-7\\).",
        "Em \\(8 \\div 2 \\times 2\\), ir da esquerda para a direita: dá \\(8\\), não \\(2\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quanto é \\(6 + 2 \\times 3\\)?",
          identificar: "Qual operação tem prioridade?",
          dica: "Multiplicação antes da soma.",
          resolucao:
            "\\[\\begin{aligned} 6 + 2 \\times 3 &= 6 + 6 \\\\ &= 12 \\end{aligned}\\]",
          resposta: "\\(12\\)",
          interpretacao: "Se você somasse primeiro (\\(6 + 2 = 8\\)) e multiplicasse, daria \\(24\\) — errado.",
          erroComum: "Calcular \\(6 + 2\\) antes do produto.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva: \\((4 + 1) \\times 2 - 3\\).",
          identificar: "O que está dentro do parêntese vem primeiro.",
          dica: "Parênteses → multiplicação → subtração.",
          resolucao:
            "\\[\\begin{aligned} (4 + 1) \\times 2 - 3 &= 5 \\times 2 - 3 \\\\ &= 10 - 3 \\\\ &= 7 \\end{aligned}\\]",
          resposta: "\\(7\\)",
          interpretacao: "O parêntese muda tudo: sem ele, \\(4 + 1 \\times 2 - 3 = 3\\).",
          erroComum: "Ignorar o parêntese e multiplicar só o \\(1\\) por \\(2\\).",
        },
        {
          id: "guiado-3",
          type: "compreensao",
          enunciado: "Por que \\(8 \\div 2 \\times 2\\) dá \\(8\\), e não \\(2\\)?",
          identificar: "\\(\\div\\) e \\(\\times\\) têm a mesma prioridade.",
          dica: "Resolva da esquerda para a direita.",
          resolucao:
            "Da esquerda para a direita: \\[\\begin{aligned} 8 \\div 2 \\times 2 &= 4 \\times 2 \\\\ &= 8 \\end{aligned}\\]",
          resposta: "\\(8\\)",
          interpretacao: "Mesma prioridade resolve-se na ordem em que aparece, da esquerda para a direita.",
          erroComum: "Fazer \\(2 \\times 2 = 4\\) antes e depois \\(8 \\div 4 = 2\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Treine contas com ordem de operações no banco de exercícios do site.",
      exerciseIds: ["fund-ap-01", "fund-ap-02"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Ordem: parênteses → potências/raízes → \\(\\times\\,\\div\\) → \\(+\\,-\\).",
        "Mesma prioridade: da esquerda para a direita.",
        "Parênteses mudam o resultado — use-os para forçar a ordem.",
        "A maioria dos erros de conta é ordem trocada, não falta de saber.",
      ],
    },
  },

  fracoes: {
    meta: preMeta({
      title: "Frações na prática: somar, multiplicar e dividir",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 2,
      duration: "12 min",
      readingNotes: ["Soma com MMC", "Regra do \"vira e multiplica\""],
      glossaryTerms: ["Numerador", "Denominador", "MMC", "Fração equivalente"],
      next: { slug: "potenciacao", title: "Potenciação" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Fração é só uma forma de dizer \"uma parte de um todo\": meia pizza, três quartos de hora, \\(20\\%\\) de desconto.",
        "Sem frações você trava em proporção, probabilidade, juros e em quase toda aplicação de funções. Elas são a base silenciosa do resto.",
        "A boa notícia: são poucas regras, e cada uma tem uma imagem simples por trás.",
      ],
    },
    explicacao: {
      title: "As três operações que importam",
      paragraphs: [
        "Para somar ou subtrair, os denominadores precisam ser iguais. Quando não são, igualamos usando o MMC (menor múltiplo comum) e ajustamos os numeradores.",
        "Para multiplicar é direto: numerador vezes numerador, denominador vezes denominador. Para dividir, repita a primeira e multiplique pelo inverso da segunda (\"vira e multiplica\").",
      ],
      callout:
        "Somar pede denominador igual. Multiplicar não pede nada — é só multiplicar reto.",
      formula: "a/b + c/d = (a·d + c·b) / (b·d)",
      formulaLatex: "\\frac{a}{b} + \\frac{c}{d} = \\frac{a\\,d + c\\,b}{b\\,d}",
      formulaAria: "a sobre b mais c sobre d é igual a (a vezes d mais c vezes b) sobre (b vezes d)",
      formulaLegend: "soma de frações igualando os denominadores",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Receitas", detail: "\\(\\frac{1}{2}\\) xícara + \\(\\frac{1}{3}\\) de xícara" },
        { label: "Tempo", detail: "\\(\\frac{3}{4}\\) de hora = 45 min" },
        { label: "Descontos", detail: "\\(\\frac{1}{5}\\) de desconto = \\(20\\%\\)" },
        { label: "Probabilidade", detail: "chances escritas como fração" },
        { label: "Divisão de conta", detail: "rachar a conta entre amigos" },
        { label: "Escalas", detail: "mapa \\(\\frac{1}{100000}\\)" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Você estudou \\(\\frac{1}{2}\\) hora de manhã e \\(\\frac{1}{3}\\) de hora à tarde. Quanto tempo estudou no total?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Olhar os denominadores",
          detail: "São \\(2\\) e \\(3\\) — diferentes, então preciso igualar.",
        },
        {
          title: "Achar o MMC",
          detail: "O menor múltiplo comum de \\(2\\) e \\(3\\) é \\(6\\).",
        },
        {
          title: "Reescrever as frações",
          detail: "\\(\\frac{1}{2} = \\frac{3}{6}\\) e \\(\\frac{1}{3} = \\frac{2}{6}\\) (multipliquei em cima e embaixo).",
        },
        {
          title: "Somar passo a passo",
          detail:
            "\\[\\begin{aligned} \\frac{1}{2} + \\frac{1}{3} &= \\frac{3}{6} + \\frac{2}{6} \\\\ &= \\frac{5}{6} \\end{aligned}\\]",
        },
        {
          title: "Traduzir para minutos",
          detail: "\\(\\frac{5}{6}\\) de hora \\(= \\frac{5}{6} \\times 60 = 50\\) minutos.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(\\frac{5}{6}\\) de hora são \\(50\\) minutos de estudo no dia — faltam \\(10\\) minutos para fechar uma hora.",
        "Repare que não dá para somar \\(\\frac{1}{2} + \\frac{1}{3}\\) \"de cabeça\" como \\(\\frac{2}{5}\\): isso ignoraria que os pedaços têm tamanhos diferentes. O MMC coloca tudo no mesmo tamanho de fatia (sextos) antes de somar.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Somar numerador com numerador e denominador com denominador (\\(\\frac{1}{2} + \\frac{1}{3} \\neq \\frac{2}{5}\\)).",
        "Esquecer de ajustar o numerador depois de mudar o denominador.",
        "Na divisão, multiplicar direto sem inverter a segunda fração.",
        "Não simplificar a fração final quando dá (ex.: \\(\\frac{4}{6} = \\frac{2}{3}\\)).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quanto é \\(\\frac{1}{4} + \\frac{2}{4}\\)?",
          identificar: "Os denominadores já são iguais.",
          dica: "Some só os numeradores e mantenha o denominador.",
          resolucao: "\\(\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}\\).",
          resposta: "\\(\\frac{3}{4}\\)",
          interpretacao: "Três quartos do todo — denominador não muda quando já é igual.",
          erroComum: "Somar também os denominadores (dar \\(\\frac{3}{8}\\)).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Calcule \\(\\frac{2}{3} \\times \\frac{3}{5}\\).",
          identificar: "Multiplicação: é só multiplicar reto.",
          dica: "Numerador × numerador, denominador × denominador.",
          resolucao:
            "\\[\\begin{aligned} \\frac{2}{3} \\times \\frac{3}{5} &= \\frac{2 \\times 3}{3 \\times 5} \\\\ &= \\frac{6}{15} \\\\ &= \\frac{2}{5} \\end{aligned}\\] (simplificando por \\(3\\))",
          resposta: "\\(\\frac{2}{5}\\)",
          interpretacao: "Multiplicar frações sempre dá um pedaço menor ou igual.",
          erroComum: "Tentar igualar denominadores antes de multiplicar.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Resolva \\(\\frac{1}{2} \\div \\frac{1}{4}\\).",
          identificar: "Divisão: vira e multiplica.",
          dica: "Repita \\(\\frac{1}{2}\\) e multiplique pelo inverso de \\(\\frac{1}{4}\\), que é \\(\\frac{4}{1}\\).",
          resolucao:
            "\\[\\begin{aligned} \\frac{1}{2} \\div \\frac{1}{4} &= \\frac{1}{2} \\times \\frac{4}{1} \\\\ &= \\frac{4}{2} \\\\ &= 2 \\end{aligned}\\]",
          resposta: "\\(2\\)",
          interpretacao: "Cabem dois quartos dentro de meio? Sim — faz sentido dar 2.",
          erroComum: "Inverter a primeira fração em vez da segunda.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique frações em contextos de receita, tempo e desconto no banco de exercícios.",
      exerciseIds: ["fund-ap-03", "fund-ap-04"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Somar/subtrair: iguale os denominadores (MMC), depois mexa só nos numeradores.",
        "Multiplicar: reto — numerador com numerador, denominador com denominador.",
        "Dividir: repita a primeira e multiplique pelo inverso da segunda.",
        "Sempre simplifique a fração final.",
      ],
    },
  },

  potenciacao: {
    meta: preMeta({
      title: "Potenciação: multiplicação repetida e suas regras",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 3,
      duration: "11 min",
      readingNotes: ["Propriedades das potências", "Expoente zero e negativo"],
      glossaryTerms: ["Base", "Expoente", "Potência"],
      next: { slug: "radiciacao", title: "Radiciação" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Potência é só um atalho para multiplicar o mesmo número várias vezes: \\(2^5\\) é \\(2 \\times 2 \\times 2 \\times 2 \\times 2\\).",
        "Esse atalho aparece em juros compostos, crescimento de populações, área, volume e notação científica. Sem ele, números grandes e pequenos ficam impossíveis de escrever.",
        "Decorar potência sem entender a ideia leva a erros bobos; entender a ideia faz as regras parecerem óbvias.",
      ],
    },
    explicacao: {
      title: "A base, o expoente e as regras",
      paragraphs: [
        "Na potência \\(a^n\\), a base \\(a\\) é o número repetido e o expoente \\(n\\) diz quantas vezes ele entra na multiplicação.",
        "Multiplicação de mesma base: some os expoentes. Divisão de mesma base: subtraia. Potência de potência: multiplique. Expoente zero dá 1, e expoente negativo vira fração (inverte).",
      ],
      callout:
        "Mesma base multiplicando → soma expoentes. Mesma base dividindo → subtrai expoentes.",
      formula: "aᵐ · aⁿ = aᵐ⁺ⁿ",
      formulaLatex: "a^m \\cdot a^n = a^{m+n}",
      formulaAria: "a elevado a m vezes a elevado a n é igual a a elevado a m mais n",
      formulaLegend: "produto de potências de mesma base",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Juros compostos", detail: "montante cresce como \\((1+i)^n\\)" },
        { label: "Notação científica", detail: "\\(300000 = 3 \\times 10^5\\)" },
        { label: "Área e volume", detail: "\\(m^2\\), \\(m^3\\) são potências" },
        { label: "Informática", detail: "1 KB = \\(2^{10}\\) bytes" },
        { label: "Biologia", detail: "bactérias dobram: \\(2^n\\)" },
        { label: "Química", detail: "pH usa potências de \\(10\\)" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Simplifique a expressão \\(2^3 \\times 2^2\\) escrevendo o resultado como uma única potência e depois como número.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reconhecer a base",
          detail: "As duas potências têm a mesma base: \\(2\\).",
        },
        {
          title: "Aplicar a regra do produto",
          detail: "Mesma base multiplicando → soma os expoentes: \\(3 + 2 = 5\\).",
        },
        {
          title: "Desenvolver passo a passo",
          detail:
            "\\[\\begin{aligned} 2^3 \\times 2^2 &= 2^{3+2} \\\\ &= 2^5 \\\\ &= 32 \\end{aligned}\\]",
        },
        {
          title: "Conferir contando",
          detail: "\\(2^3 = 8\\) e \\(2^2 = 4\\); \\(8 \\times 4 = 32\\). Bate.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Somar os expoentes funciona porque \\(2^3 \\times 2^2\\) é o \\(2\\) multiplicado \\(3\\) vezes e depois mais \\(2\\) vezes — no total \\(5\\) vezes.",
        "Por isso a regra não é decoreba: o expoente conta quantos fatores existem, e juntar dois grupos é só somar as contagens.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Multiplicar as bases em vez de somar os expoentes (\\(2^3 \\times 2^2 \\neq 4^5\\)).",
        "Achar que \\(2^3 = 2 \\times 3 = 6\\) (é \\(2 \\times 2 \\times 2 = 8\\)).",
        "Esquecer que \\(a^0 = 1\\) (para qualquer \\(a \\neq 0\\)).",
        "Tratar expoente negativo como número negativo: \\(2^{-1} = \\frac{1}{2}\\), não \\(-2\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Escreva \\(5^4 \\div 5^2\\) como uma única potência.",
          identificar: "Mesma base dividindo.",
          dica: "Subtraia os expoentes.",
          resolucao:
            "\\[\\begin{aligned} 5^4 \\div 5^2 &= 5^{4-2} \\\\ &= 5^2 \\end{aligned}\\]",
          resposta: "\\(5^2 = 25\\)",
          interpretacao: "Dividir tira fatores: sobram 2 cincos.",
          erroComum: "Dividir as bases ou dividir os expoentes.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quanto vale \\(3^0 + 3^{-1}\\)?",
          identificar: "Expoente zero e expoente negativo.",
          dica: "\\(3^0 = 1\\) e \\(3^{-1} = \\frac{1}{3}\\).",
          resolucao:
            "\\[\\begin{aligned} 3^0 + 3^{-1} &= 1 + \\frac{1}{3} \\\\ &= \\frac{4}{3} \\end{aligned}\\]",
          resposta: "\\(\\frac{4}{3}\\)",
          interpretacao: "Expoente negativo inverte a base; não deixa o número negativo.",
          erroComum: "Escrever \\(3^{-1} = -3\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Simplifique \\((2^3)^2\\).",
          identificar: "Potência de potência.",
          dica: "Multiplique os expoentes.",
          resolucao:
            "\\[\\begin{aligned} (2^3)^2 &= 2^{3 \\times 2} \\\\ &= 2^6 \\\\ &= 64 \\end{aligned}\\]",
          resposta: "\\(64\\)",
          interpretacao: "São três 2 repetidos duas vezes → seis 2 multiplicados.",
          erroComum: "Somar os expoentes (dar \\(2^5\\)).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Use potências em notação científica e crescimento no banco de exercícios.",
      exerciseIds: ["fund-ap-05", "fund-ap-06"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\(a^n\\) = \\(a\\) multiplicado por ele mesmo \\(n\\) vezes.",
        "Mesma base: \\(\\times\\) soma expoentes, \\(\\div\\) subtrai expoentes.",
        "Potência de potência multiplica os expoentes.",
        "\\(a^0 = 1\\) e \\(a^{-n} = \\frac{1}{a^n}\\).",
      ],
    },
  },

  radiciacao: {
    meta: preMeta({
      title: "Radiciação: a operação que desfaz a potência",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 4,
      duration: "10 min",
      readingNotes: ["Raiz como expoente fracionário", "Simplificar radicais"],
      glossaryTerms: ["Radical", "Índice", "Radicando", "Expoente fracionário"],
      next: { slug: "produtos-notaveis", title: "Produtos notáveis" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Se a potência multiplica um número por ele mesmo, a raiz faz a pergunta inversa: \"qual número, multiplicado por ele mesmo, dá isto?\".",
        "\\(\\sqrt{25} = 5\\) porque \\(5 \\times 5 = 25\\). É a chave para resolver equações de 2º grau, calcular distâncias (Pitágoras) e entender desvios em estatística.",
        "Ver a raiz como o \"desfazer\" da potência elimina o medo: é a mesma ideia, de trás para frente.",
      ],
    },
    explicacao: {
      title: "Raiz é potência com expoente fração",
      paragraphs: [
        "A raiz quadrada de \\(a\\) procura o número que elevado ao quadrado dá \\(a\\). A raiz de índice \\(n\\) procura o número que elevado a \\(n\\) dá o radicando.",
        "O truque que organiza tudo: toda raiz pode virar potência com expoente fracionário. Assim você usa as mesmas regras de potência que já aprendeu.",
      ],
      callout:
        "\\(\\sqrt{a}\\) é a meia-potência de \\(a\\): \\(\\sqrt{a} = a^{1/2}\\). Por isso \\(\\sqrt{a} \\times \\sqrt{a} = a\\).",
      formula: "ⁿ√a = a^(1/n)",
      formulaLatex: "\\sqrt[n]{a} = a^{1/n}",
      formulaAria: "raiz de índice n de a é igual a a elevado a um sobre n",
      formulaLegend: "raiz escrita como expoente fracionário",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Pitágoras", detail: "hipotenusa = \\(\\sqrt{a^2 + b^2}\\)" },
        { label: "Bhaskara", detail: "tem uma raiz no meio da fórmula" },
        { label: "Estatística", detail: "desvio-padrão usa raiz" },
        { label: "Geometria", detail: "lado de um quadrado de área \\(A\\) é \\(\\sqrt{A}\\)" },
        { label: "Física", detail: "tempo de queda envolve raiz" },
        { label: "Finanças", detail: "taxa média de crescimento" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Um quadrado tem área de \\(144\\) cm². Qual é a medida do lado?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Lembrar a relação",
          detail: "Área do quadrado = lado × lado = \\(\\text{lado}^2\\). Então lado \\(= \\sqrt{\\text{área}}\\).",
        },
        {
          title: "Perguntar o que ao quadrado dá 144",
          detail: "\\(12 \\times 12 = 144\\).",
        },
        {
          title: "Desenvolver",
          detail:
            "\\[\\begin{aligned} \\text{lado} &= \\sqrt{144} \\\\ &= 12 \\text{ cm} \\end{aligned}\\]",
        },
        {
          title: "Conferir",
          detail: "\\(12^2 = 144\\) cm² — confere com a área dada.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O lado de \\(12\\) cm é o único valor positivo que, ao quadrado, devolve a área de \\(144\\) cm².",
        "Em geometria usamos só a raiz positiva (não existe lado de \\(-12\\) cm). Em equações, porém, lembre que tanto \\(12\\) quanto \\(-12\\) elevados ao quadrado dão \\(144\\) — por isso a equação \\(x^2 = 144\\) tem duas soluções.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Achar que \\(\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b}\\) (é falso: \\(\\sqrt{9+16} \\neq 3+4\\)).",
        "Esquecer que \\(x^2 = 144\\) tem duas soluções (\\(12\\) e \\(-12\\)).",
        "Confundir \\(\\sqrt{16} = 4\\) com \\(\\frac{16}{2}\\).",
        "Não simplificar: \\(\\sqrt{12} = 2\\sqrt{3}\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Calcule \\(\\sqrt{81}\\).",
          identificar: "Qual número ao quadrado dá 81?",
          dica: "Pense na tabuada: \\(9 \\times 9\\).",
          resolucao: "\\(9 \\times 9 = 81\\), então \\(\\sqrt{81} = 9\\).",
          resposta: "\\(9\\)",
          interpretacao: "A raiz desfaz o quadrado: \\(9^2 = 81\\).",
          erroComum: "Dividir \\(81\\) por \\(2\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva a equação \\(x^2 = 49\\).",
          identificar: "Procuramos todos os x cujo quadrado é 49.",
          dica: "São dois valores: um positivo e um negativo.",
          resolucao:
            "\\[\\begin{aligned} x^2 &= 49 \\\\ x &= \\pm\\sqrt{49} \\\\ x &= 7 \\ \\text{ou} \\ {-7} \\end{aligned}\\]",
          resposta: "\\(x = 7\\) ou \\(x = -7\\)",
          interpretacao: "Tanto \\(7^2\\) quanto \\((-7)^2\\) valem \\(49\\).",
          erroComum: "Dar só a solução positiva.",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Simplifique \\(\\sqrt{8}\\).",
          identificar: "Procure um fator quadrado perfeito dentro de 8.",
          dica: "\\(8 = 4 \\times 2\\), e \\(4\\) é quadrado perfeito.",
          resolucao:
            "\\[\\begin{aligned} \\sqrt{8} &= \\sqrt{4 \\times 2} \\\\ &= \\sqrt{4} \\times \\sqrt{2} \\\\ &= 2\\sqrt{2} \\end{aligned}\\]",
          resposta: "\\(2\\sqrt{2}\\)",
          interpretacao: "Tiramos o 4 da raiz como 2; o 2 fica dentro.",
          erroComum: "Escrever \\(\\sqrt{8} = \\sqrt{4} + \\sqrt{4}\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique raízes em Pitágoras e áreas no banco de exercícios.",
      exerciseIds: ["fund-ap-07", "fund-ap-08"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Raiz é o inverso da potência: \\(\\sqrt[n]{a}\\) pergunta \"o que elevado a \\(n\\) dá \\(a\\)\".",
        "\\(\\sqrt[n]{a} = a^{1/n}\\) — vira potência de expoente fracionário.",
        "\\(x^2 = k\\) (\\(k > 0\\)) tem duas soluções: \\(+\\sqrt{k}\\) e \\(-\\sqrt{k}\\).",
        "\\(\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}\\). Simplifique tirando quadrados perfeitos.",
      ],
    },
  },

  "produtos-notaveis": {
    meta: preMeta({
      title: "Produtos notáveis: atalhos que evitam contas longas",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 5,
      duration: "14 min",
      readingNotes: ["Quadrado da soma e da diferença", "Produto da soma pela diferença"],
      glossaryTerms: ["Produto notável", "Quadrado da soma", "Diferença de quadrados"],
      next: { slug: "fatoracao", title: "Fatoração" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Alguns produtos aparecem tanto que vale a pena reconhecer o padrão em vez de multiplicar tudo na mão toda vez.",
        "\\((a + b)^2\\) não é \\(a^2 + b^2\\) — esse é o erro que mais cai em prova. Entender por que aparece o \"\\(2ab\\)\" no meio te salva de perder pontos bobos.",
        "Esses atalhos também são a ponte para a fatoração, que vem na próxima aula e desbloqueia equações de 2º grau.",
      ],
    },
    explicacao: {
      title: "Três padrões que você vai usar para sempre",
      paragraphs: [
        "Quadrado da soma: \\((a + b)^2 = a^2 + 2ab + b^2\\). O termo do meio (\\(2ab\\)) aparece porque há dois produtos cruzados ao distribuir.",
        "Quadrado da diferença: \\((a - b)^2 = a^2 - 2ab + b^2\\). Igual ao anterior, mas com o meio negativo.",
        "Soma pela diferença: \\((a + b)(a - b) = a^2 - b^2\\). Aqui o termo do meio se cancela — sobra só a diferença dos quadrados.",
      ],
      callout:
        "\\((a + b)^2\\) tem três termos, não dois. O \"\\(2ab\\)\" do meio é o que todo mundo esquece.",
      formula: "(a + b)² = a² + 2ab + b²",
      formulaLatex: "(a + b)^2 = a^2 + 2ab + b^2",
      formulaAria: "abre parêntese a mais b fecha parêntese ao quadrado é igual a a ao quadrado mais dois a b mais b ao quadrado",
      formulaLegend: "quadrado da soma",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Fatoração", detail: "reconhecer o padrão para fatorar" },
        { label: "Bhaskara", detail: "completar quadrados usa \\((a+b)^2\\)" },
        { label: "Áreas", detail: "quadrado de lado \\((a+b)\\)" },
        { label: "Cálculo mental", detail: "\\(19^2 = (20-1)^2 = 361\\)" },
        { label: "Física", detail: "energia e variações ao quadrado" },
        { label: "Simplificações", detail: "encurtar expressões grandes" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Sem calculadora, quanto é \\(21^2\\)? Use o produto notável escrevendo \\(21\\) como \\((20 + 1)\\).",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Reescrever o número",
          detail: "\\(21 = 20 + 1\\), então \\(21^2 = (20 + 1)^2\\).",
        },
        {
          title: "Desenvolver com o quadrado da soma",
          detail:
            "\\[\\begin{aligned} 21^2 &= (20 + 1)^2 \\\\ &= 20^2 + 2 \\cdot 20 \\cdot 1 + 1^2 \\\\ &= 400 + 40 + 1 \\\\ &= 441 \\end{aligned}\\]",
        },
        {
          title: "Conferir",
          detail: "\\(21 \\times 21 = 441\\). Bate — e foi mais rápido de cabeça.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O padrão transforma uma multiplicação difícil (\\(21 \\times 21\\)) em três contas fáceis. O termo do meio (\\(2 \\cdot 20 \\cdot 1 = 40\\)) é exatamente o que faltaria se você só somasse \\(400 + 1\\).",
        "Geometricamente, \\((20+1)^2\\) é a área de um quadrado de lado \\(21\\): um quadrado \\(20 \\times 20\\), mais duas tiras \\(20 \\times 1\\), mais um quadradinho \\(1 \\times 1\\). As duas tiras são o \"\\(2ab\\)\".",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Escrever \\((a + b)^2 = a^2 + b^2\\) (esquecer o \\(2ab\\)).",
        "Trocar o sinal do meio em \\((a - b)^2\\).",
        "Achar que \\((a + b)(a - b)\\) tem termo do meio (ele se cancela).",
        "Aplicar o padrão errado: confundir soma pela diferença com quadrado.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Desenvolva \\((x + 3)^2\\).",
          identificar: "É um quadrado da soma.",
          dica: "\\(a = x\\), \\(b = 3\\) → \\(a^2 + 2ab + b^2\\).",
          resolucao:
            "\\[\\begin{aligned} (x + 3)^2 &= x^2 + 2 \\cdot x \\cdot 3 + 3^2 \\\\ &= x^2 + 6x + 9 \\end{aligned}\\]",
          resposta: "\\(x^2 + 6x + 9\\)",
          interpretacao: "O \\(6x\\) é o termo cruzado que não pode sumir.",
          erroComum: "Escrever \\(x^2 + 9\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Desenvolva \\((2x - 5)^2\\).",
          identificar: "Quadrado da diferença com \\(a = 2x\\), \\(b = 5\\).",
          dica: "Cuidado: \\(a^2 = (2x)^2 = 4x^2\\).",
          resolucao:
            "\\[\\begin{aligned} (2x - 5)^2 &= (2x)^2 - 2 \\cdot (2x) \\cdot 5 + 5^2 \\\\ &= 4x^2 - 20x + 25 \\end{aligned}\\]",
          resposta: "\\(4x^2 - 20x + 25\\)",
          interpretacao: "O coeficiente 2 entra no quadrado: \\((2x)^2 = 4x^2\\).",
          erroComum: "Escrever \\(2x^2\\) em vez de \\(4x^2\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Calcule \\((x + 4)(x - 4)\\).",
          identificar: "Soma pela diferença.",
          dica: "O resultado é \\(a^2 - b^2\\).",
          resolucao:
            "\\[\\begin{aligned} (x + 4)(x - 4) &= x^2 - 4^2 \\\\ &= x^2 - 16 \\end{aligned}\\]",
          resposta: "\\(x^2 - 16\\)",
          interpretacao: "Os termos \\(+4x\\) e \\(-4x\\) se cancelam; sobra a diferença de quadrados.",
          erroComum: "Deixar um termo do meio.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Treine produtos notáveis e cálculo mental no banco de exercícios.",
      exerciseIds: ["fund-ap-09", "fund-ap-10"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "\\((a + b)^2 = a^2 + 2ab + b^2\\) — nunca esqueça o \\(2ab\\).",
        "\\((a - b)^2 = a^2 - 2ab + b^2\\).",
        "\\((a + b)(a - b) = a^2 - b^2\\) — o meio se cancela.",
        "Servem para cálculo mental e abrem caminho para a fatoração.",
      ],
    },
  },

  fatoracao: {
    meta: preMeta({
      title: "Fatoração: escrever uma soma como produto",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 6,
      duration: "13 min",
      readingNotes: ["Fator comum", "Diferença de quadrados", "Trinômio quadrado"],
      glossaryTerms: ["Fatoração", "Fator comum", "Trinômio"],
      next: { slug: "equacao-primeiro-grau", title: "Equações do 1º grau" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Fatorar é o inverso de distribuir: em vez de abrir um produto, você junta uma soma de volta na forma de multiplicação.",
        "Isso parece abstrato, mas é o que permite simplificar frações algébricas e resolver equações: quando um produto é zero, basta um dos fatores ser zero.",
        "É a ferramenta que faz \\(x^2 + 5x + 6 = 0\\) virar \\((x + 2)(x + 3) = 0\\) e revelar as raízes na hora.",
      ],
    },
    explicacao: {
      title: "Três técnicas que cobrem a maioria dos casos",
      paragraphs: [
        "Fator comum: se todos os termos têm um pedaço igual, coloque-o em evidência. Ex.: \\(6x + 9 = 3(2x + 3)\\).",
        "Diferença de quadrados: \\(a^2 - b^2 = (a + b)(a - b)\\). É o produto notável lido de trás para frente.",
        "Trinômio do 2º grau: \\(x^2 + Sx + P\\) se fatora achando dois números que somam \\(S\\) e multiplicam \\(P\\).",
      ],
      callout:
        "Sempre comece procurando fator comum — é o passo que mais gente pula.",
      formula: "a² − b² = (a + b)(a − b)",
      formulaLatex: "a^2 - b^2 = (a + b)(a - b)",
      formulaAria: "a ao quadrado menos b ao quadrado é igual a abre parêntese a mais b fecha vezes abre parêntese a menos b fecha",
      formulaLegend: "fatoração da diferença de quadrados",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Equações 2º grau", detail: "achar raízes sem Bhaskara" },
        { label: "Simplificar frações", detail: "cancelar fatores iguais" },
        { label: "Limites", detail: "tirar a indeterminação \\(\\frac{0}{0}\\)" },
        { label: "Cálculo", detail: "derivadas e integrais mais limpas" },
        { label: "Engenharia", detail: "simplificar fórmulas longas" },
        { label: "Programação", detail: "otimizar expressões" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Fatore o trinômio \\(x^2 + 5x + 6\\) para descobrir suas raízes sem usar Bhaskara.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar S e P",
          detail: "Soma dos números \\(= 5\\) (coeficiente do \\(x\\)); produto \\(= 6\\) (termo livre).",
        },
        {
          title: "Procurar dois números",
          detail: "Que somem 5 e multipliquem 6: \\(2\\) e \\(3\\) (\\(2+3=5\\), \\(2 \\times 3=6\\)).",
        },
        {
          title: "Escrever a forma fatorada",
          detail: "\\(x^2 + 5x + 6 = (x + 2)(x + 3)\\).",
        },
        {
          title: "Achar as raízes",
          detail:
            "\\[\\begin{aligned} (x + 2)(x + 3) &= 0 \\\\ x + 2 = 0 \\ &\\text{ou} \\ x + 3 = 0 \\\\ x = -2 \\ &\\text{ou} \\ x = -3 \\end{aligned}\\]",
        },
        {
          title: "Conferir",
          detail: "Abrindo \\((x+2)(x+3)\\) volta a \\(x^2 + 5x + 6\\). Bate.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "As raízes \\(-2\\) e \\(-3\\) são os valores de \\(x\\) que zeram a expressão. A forma fatorada deixa isso visível na hora: basta zerar cada parêntese.",
        "É por isso que fatorar é tão útil em equações: \"um produto é zero quando algum fator é zero\". Sem fatorar, esse atalho não existe.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Pular o fator comum e partir direto para o trinômio.",
        "Errar o sinal: para \\(x^2 - 5x + 6\\), os números são \\(-2\\) e \\(-3\\).",
        "Confundir soma com produto ao escolher os dois números.",
        "Cancelar termos somados (só fatores multiplicando podem cancelar).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Fatore \\(4x + 8\\) colocando o fator comum em evidência.",
          identificar: "O que \\(4x\\) e \\(8\\) têm em comum?",
          dica: "Ambos são divisíveis por \\(4\\).",
          resolucao: "\\(4x + 8 = 4(x + 2)\\).",
          resposta: "\\(4(x + 2)\\)",
          interpretacao: "Conferindo: \\(4 \\times x + 4 \\times 2 = 4x + 8\\).",
          erroComum: "Escrever \\(4(x + 8)\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Fatore \\(x^2 - 9\\).",
          identificar: "É uma diferença de quadrados (\\(9 = 3^2\\)).",
          dica: "Use \\(a^2 - b^2 = (a+b)(a-b)\\).",
          resolucao:
            "\\[\\begin{aligned} x^2 - 9 &= x^2 - 3^2 \\\\ &= (x + 3)(x - 3) \\end{aligned}\\]",
          resposta: "\\((x + 3)(x - 3)\\)",
          interpretacao: "As raízes da expressão são \\(3\\) e \\(-3\\).",
          erroComum: "Escrever \\((x - 3)^2\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Fatore \\(x^2 - 7x + 10\\).",
          identificar: "Trinômio: soma \\(-7\\), produto \\(10\\).",
          dica: "Dois números que somam \\(-7\\) e multiplicam \\(10\\): ambos negativos.",
          resolucao:
            "\\(-2\\) e \\(-5\\) somam \\(-7\\) e multiplicam \\(10\\): \\[\\begin{aligned} x^2 - 7x + 10 &= (x - 2)(x - 5) \\end{aligned}\\]",
          resposta: "\\((x - 2)(x - 5)\\)",
          interpretacao: "Raízes \\(2\\) e \\(5\\); o sinal negativo do meio pede dois números negativos.",
          erroComum: "Usar \\(+2\\) e \\(+5\\) (dariam \\(+7x\\)).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique fatoração aplicada a equações no banco de exercícios.",
      exerciseIds: ["fund-ap-11", "fund-ap-12"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Fatorar = transformar soma em produto (inverso de distribuir).",
        "Comece sempre pelo fator comum.",
        "Diferença de quadrados: \\(a^2 - b^2 = (a+b)(a-b)\\).",
        "Trinômio \\(x^2 + Sx + P\\): ache dois números que somem \\(S\\) e multipliquem \\(P\\).",
      ],
    },
  },

  "equacao-primeiro-grau": {
    meta: preMeta({
      title: "Equações do 1º grau: isolar a incógnita",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 7,
      duration: "12 min",
      readingNotes: ["Operações inversas", "Verificação da solução"],
      glossaryTerms: ["Incógnita", "Equação", "Membro", "Coeficiente"],
      next: { slug: "equacao-segundo-grau", title: "Equações do 2º grau" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Uma equação é uma balança: os dois lados valem o mesmo. Resolver é descobrir o valor escondido (a incógnita) mantendo a balança equilibrada.",
        "Equações de 1º grau respondem perguntas do tipo \"quanto preciso vender para bater a meta?\" ou \"em quantos meses o saldo zera?\".",
        "A regra de ouro é simples: o que você faz de um lado, faz do outro. Entender isso evita a decoreba do \"passa pro outro lado trocando o sinal\".",
      ],
    },
    explicacao: {
      title: "Isolar usando operações inversas",
      paragraphs: [
        "O objetivo é deixar o x sozinho de um lado. Para isso, desfazemos o que está grudado nele usando a operação inversa: o que soma, subtrai; o que multiplica, divide.",
        "Cada passo é aplicado nos dois lados ao mesmo tempo — assim a igualdade continua verdadeira. \"Passar para o outro lado\" é só um atalho dessa mesma ideia.",
      ],
      callout:
        "Não \"passa trocando o sinal\" por mágica: você aplica a operação inversa nos dois lados.",
      formula: "a·x + b = 0  ⟹  x = −b / a",
      formulaLatex: "a x + b = 0 \\;\\Rightarrow\\; x = -\\frac{b}{a}",
      formulaAria: "a x mais b igual a zero implica x igual a menos b sobre a",
      formulaLegend: "solução geral da equação do 1º grau (a ≠ 0)",
    },
    grafico: {
      fn: "2 * x - 6",
      alt: "Reta de f(x) = 2x − 6 cruzando o eixo x em x = 3, que é a solução de 2x − 6 = 0.",
      xDomain: [-1, 7],
      yDomain: [-10, 10],
      legend: "f(x) = 2x − 6: a solução de 2x − 6 = 0 é onde a reta cruza o eixo x (x = 3).",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Metas de venda", detail: "quanto vender para um valor alvo" },
        { label: "Tempo", detail: "quando dois custos se igualam" },
        { label: "Receitas", detail: "ajustar proporção de ingredientes" },
        { label: "Física", detail: "movimento uniforme: \\(s = s_0 + v \\cdot t\\)" },
        { label: "Comparar planos", detail: "a partir de quando um compensa" },
        { label: "Orçamento", detail: "quanto sobra após gastos fixos" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Você tem R$ 6,00 a menos do que o dobro de uma quantia \\(x\\), e isso resulta em zero. Ou seja: \\(2x - 6 = 0\\). Qual é o valor de \\(x\\)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Desfazer a subtração",
          detail: "Some 6 nos dois lados para soltar o termo com \\(x\\).",
        },
        {
          title: "Desfazer a multiplicação",
          detail: "Divida os dois lados por 2 para isolar o \\(x\\).",
        },
        {
          title: "Desenvolvimento completo",
          detail:
            "\\[\\begin{aligned} 2x - 6 &= 0 \\\\ 2x &= 6 \\\\ x &= \\frac{6}{2} \\\\ x &= 3 \\end{aligned}\\]",
        },
        {
          title: "Verificar",
          detail: "\\(2 \\cdot 3 - 6 = 6 - 6 = 0\\). A balança fecha — solução correta.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "\\(x = 3\\) é o único valor que torna a igualdade verdadeira. Trocar por qualquer outro número desequilibra a balança.",
        "No gráfico, a solução é exatamente o ponto em que a reta \\(f(x) = 2x - 6\\) corta o eixo horizontal — onde \\(f\\) vale zero. Resolver a equação e \"achar a raiz da função\" são a mesma coisa.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Aplicar a operação em um lado só e esquecer o outro.",
        "Trocar o sinal de forma mecânica e errar (mover \\(+6\\) vira \\(-6\\) ao passar).",
        "Dividir só um dos termos pelo coeficiente.",
        "Não verificar a resposta no final.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(x + 7 = 12\\).",
          identificar: "O que está grudado no \\(x\\)?",
          dica: "Subtraia \\(7\\) dos dois lados.",
          resolucao:
            "\\[\\begin{aligned} x + 7 &= 12 \\\\ x &= 12 - 7 \\\\ x &= 5 \\end{aligned}\\]",
          resposta: "\\(x = 5\\)",
          interpretacao: "\\(5 + 7 = 12\\) — confere.",
          erroComum: "Somar \\(7\\) em vez de subtrair.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(3x = 21\\).",
          identificar: "O \\(x\\) está multiplicado por 3.",
          dica: "Divida os dois lados por \\(3\\).",
          resolucao:
            "\\[\\begin{aligned} 3x &= 21 \\\\ x &= \\frac{21}{3} \\\\ x &= 7 \\end{aligned}\\]",
          resposta: "\\(x = 7\\)",
          interpretacao: "\\(3 \\times 7 = 21\\) — confere.",
          erroComum: "Subtrair \\(3\\) em vez de dividir.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Um táxi cobra R$ 5 fixos + R$ 2 por km. Quantos km custam R$ 19? (Resolva \\(2x + 5 = 19\\).)",
          identificar: "Isole \\(x\\) desfazendo \\(+5\\) e depois \\(\\times 2\\).",
          dica: "Tire o \\(5\\), depois divida por \\(2\\).",
          resolucao:
            "\\[\\begin{aligned} 2x + 5 &= 19 \\\\ 2x &= 19 - 5 \\\\ 2x &= 14 \\\\ x &= \\frac{14}{2} \\\\ x &= 7 \\end{aligned}\\]",
          resposta: "7 km",
          interpretacao: "Com 7 km: \\(2 \\cdot 7 + 5 = 19\\). A corrida tem 7 quilômetros.",
          erroComum: "Dividir \\(19\\) por \\(2\\) antes de tirar o \\(5\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Resolva equações de 1º grau aplicadas a custos e metas no banco de exercícios.",
      exerciseIds: ["fund-ap-13", "fund-ap-14"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Equação é uma balança: os dois lados são iguais.",
        "Isole o \\(x\\) desfazendo as operações com suas inversas.",
        "O que faz de um lado, faça do outro.",
        "\\(ax + b = 0 \\Rightarrow x = -\\frac{b}{a}\\); sempre verifique a resposta.",
      ],
    },
  },

  "equacao-segundo-grau": {
    meta: preMeta({
      title: "Equações do 2º grau: a fórmula de Bhaskara",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 8,
      duration: "15 min",
      readingNotes: ["Discriminante Δ", "Quando há 2, 1 ou nenhuma raiz real"],
      glossaryTerms: ["Discriminante", "Raiz", "Coeficiente", "Bhaskara"],
      next: { slug: "descontos-orcamento", title: "Descontos e orçamento" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Quando o x aparece ao quadrado, a coisa que cresce não cresce de forma constante — acelera. É o caso de área, trajetória de uma bola, lucro com preço variável.",
        "A equação de 2º grau responde \"para quais valores isso vale zero?\". Por exemplo: em que instante a bola toca o chão, ou em que preço o lucro é nulo.",
        "Bhaskara é só uma receita pronta que sempre funciona, mesmo quando a fatoração é difícil de enxergar.",
      ],
    },
    explicacao: {
      title: "A fórmula e o papel do discriminante",
      paragraphs: [
        "Toda equação do 2º grau pode ser escrita como \\(ax^2 + bx + c = 0\\), com \\(a \\neq 0\\). A fórmula de Bhaskara entrega as raízes a partir dos coeficientes \\(a\\), \\(b\\) e \\(c\\).",
        "O coração da fórmula é o discriminante \\(\\Delta = b^2 - 4ac\\). Se \\(\\Delta > 0\\) há duas raízes reais; se \\(\\Delta = 0\\) há uma (raiz dupla); se \\(\\Delta < 0\\) não há raiz real (a raiz quadrada de número negativo não existe nos reais).",
      ],
      callout:
        "Calcule o \\(\\Delta\\) primeiro: ele já avisa quantas soluções esperar antes de terminar a conta.",
      formula: "x = (−b ± √(b² − 4ac)) / (2a)",
      formulaLatex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      formulaAria: "x igual a menos b mais ou menos raiz de b ao quadrado menos quatro a c, tudo sobre dois a",
      formulaLegend: "fórmula de Bhaskara · Δ = b² − 4ac",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Lançamentos", detail: "altura de uma bola no tempo" },
        { label: "Áreas", detail: "achar dimensões dada uma área" },
        { label: "Lucro máximo", detail: "preço que zera ou maximiza lucro" },
        { label: "Física", detail: "tempo de queda e movimento" },
        { label: "Engenharia", detail: "dimensionamento de estruturas" },
        { label: "Cálculo", detail: "achar onde uma parábola corta o eixo" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Resolva \\(x^2 - 5x + 6 = 0\\) usando Bhaskara e diga quantas soluções a equação tem.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Identificar os coeficientes",
          detail: "\\(a = 1\\), \\(b = -5\\), \\(c = 6\\).",
        },
        {
          title: "Calcular o discriminante",
          detail:
            "\\[\\begin{aligned} \\Delta &= (-5)^2 - 4 \\cdot 1 \\cdot 6 \\\\ &= 25 - 24 \\\\ &= 1 \\end{aligned}\\]",
        },
        {
          title: "Avaliar o Δ",
          detail: "\\(\\Delta = 1 > 0\\) → duas raízes reais distintas.",
        },
        {
          title: "Aplicar a fórmula",
          detail:
            "\\[\\begin{aligned} x &= \\frac{-(-5) \\pm \\sqrt{1}}{2 \\cdot 1} \\\\ &= \\frac{5 \\pm 1}{2} \\end{aligned}\\]",
        },
        {
          title: "Obter as duas raízes",
          detail:
            "\\[\\begin{aligned} x_1 &= \\frac{5 + 1}{2} = 3 \\\\ x_2 &= \\frac{5 - 1}{2} = 2 \\end{aligned}\\]",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "As soluções \\(x = 2\\) e \\(x = 3\\) são os valores que zeram a expressão. Se fosse a altura de uma bola, seriam os dois instantes em que ela está na altura zero (saída e chegada ao chão).",
        "Repare que poderíamos ter fatorado: \\(x^2 - 5x + 6 = (x - 2)(x - 3)\\). Bhaskara e fatoração levam ao mesmo lugar — a fórmula é o caminho garantido quando a fatoração não salta aos olhos.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Errar o sinal de \\(b\\): em \\(x^2 - 5x + 6\\), \\(b = -5\\), então \\(-b = +5\\).",
        "Esquecer o \"\\(4ac\\)\" ou multiplicar errado no \\(\\Delta\\).",
        "Dividir só o \\(\\sqrt{\\Delta}\\) por \\(2a\\) e esquecer de dividir o \\(-b\\) também.",
        "Forçar resposta quando \\(\\Delta < 0\\) (não há raiz real).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Calcule o discriminante de \\(x^2 + 2x + 1 = 0\\) e diga quantas raízes há.",
          identificar: "\\(a = 1\\), \\(b = 2\\), \\(c = 1\\).",
          dica: "\\(\\Delta = b^2 - 4ac\\).",
          resolucao:
            "\\[\\begin{aligned} \\Delta &= 2^2 - 4 \\cdot 1 \\cdot 1 \\\\ &= 4 - 4 \\\\ &= 0 \\end{aligned}\\] uma raiz (dupla).",
          resposta: "\\(\\Delta = 0\\), uma raiz real",
          interpretacao: "\\(x = -\\frac{b}{2a} = -1\\); a parábola toca o eixo em um único ponto.",
          erroComum: "Concluir que \\(\\Delta = 0\\) significa nenhuma raiz.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Resolva \\(x^2 - 4 = 0\\).",
          identificar: "\\(a = 1\\), \\(b = 0\\), \\(c = -4\\).",
          dica: "Com \\(b = 0\\), dá para isolar: \\(x^2 = 4\\).",
          resolucao:
            "\\[\\begin{aligned} x^2 - 4 &= 0 \\\\ x^2 &= 4 \\\\ x &= \\pm 2 \\end{aligned}\\]",
          resposta: "\\(x = 2\\) ou \\(x = -2\\)",
          interpretacao: "Diferença de quadrados: \\((x-2)(x+2) = 0\\).",
          erroComum: "Dar só \\(x = 2\\).",
        },
        {
          id: "guiado-3",
          type: "interpretacao",
          enunciado: "Sem resolver, o que significa \\(\\Delta < 0\\) em \\(x^2 + x + 5 = 0\\)?",
          identificar: "\\(a = 1\\), \\(b = 1\\), \\(c = 5\\).",
          dica: "Calcule \\(\\Delta\\) e interprete o sinal.",
          resolucao:
            "\\[\\begin{aligned} \\Delta &= 1^2 - 4 \\cdot 1 \\cdot 5 \\\\ &= 1 - 20 \\\\ &= -19 \\end{aligned}\\] \\(\\Delta < 0\\): não há raiz real.",
          resposta: "Nenhuma raiz real",
          interpretacao: "A parábola não cruza o eixo \\(x\\): fica inteira acima dele.",
          erroComum: "Tentar tirar raiz de número negativo nos reais.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique equações de 2º grau aplicadas no banco de exercícios.",
      exerciseIds: ["fund-ap-15", "fund-ap-16"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Forma geral: \\(ax^2 + bx + c = 0\\) (\\(a \\neq 0\\)).",
        "Bhaskara: \\(x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}\\), com \\(\\Delta = b^2 - 4ac\\).",
        "\\(\\Delta > 0\\): duas raízes; \\(\\Delta = 0\\): uma; \\(\\Delta < 0\\): nenhuma real.",
        "Quando dá, fatorar é mais rápido — mas Bhaskara sempre funciona.",
      ],
    },
  },

  "descontos-orcamento": {
    meta: preMeta({
      title: "Descontos e orçamento: porcentagem na vida real",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 9,
      duration: "10 min",
      readingNotes: ["Desconto como fator", "Descontos sucessivos"],
      glossaryTerms: ["Porcentagem", "Fator de desconto", "Acréscimo"],
      next: { slug: "escalas-medidas", title: "Escalas e medidas" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Porcentagem é só uma fração com denominador 100: \\(20\\% = \\frac{20}{100} = 0{,}2\\). Tirar \\(20\\%\\) é multiplicar por \\(0{,}8\\).",
        "Você usa isso toda semana: desconto na loja, gorjeta, aumento de salário, juros do cartão. Errar aqui custa dinheiro de verdade.",
        "O truque que destrava tudo é pensar em fator: descontar não é subtrair depois — é multiplicar pelo que sobra.",
      ],
    },
    explicacao: {
      title: "Desconto é multiplicar pelo que sobra",
      paragraphs: [
        "Se um produto tem \\(d\\%\\) de desconto, sobra \\((100 - d)\\%\\). Em decimal, o preço final é o preço original vezes \\((1 - d)\\), com \\(d\\) escrito como decimal.",
        "Para acréscimo, multiplique por \\((1 + d)\\). E descontos sucessivos não se somam: \\(10\\%\\) e depois \\(10\\%\\) não dão \\(20\\%\\), porque o segundo incide sobre um valor já menor.",
      ],
      callout:
        "Tirar \\(30\\%\\) = multiplicar por \\(0{,}70\\). Dar aumento de \\(30\\%\\) = multiplicar por \\(1{,}30\\).",
      formula: "P_final = P · (1 − d)",
      formulaLatex: "P_{final} = P \\cdot (1 - d)",
      formulaAria: "preço final é igual ao preço vezes abre parêntese um menos d fecha parêntese",
      formulaLegend: "d = desconto em decimal (ex.: 25% → 0,25)",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Promoções", detail: "preço com desconto na vitrine" },
        { label: "Salário", detail: "reajuste de \\(X\\%\\)" },
        { label: "Gorjeta", detail: "\\(10\\%\\) sobre a conta" },
        { label: "Impostos", detail: "acréscimo sobre o valor base" },
        { label: "Cartão", detail: "juros somados ao saldo" },
        { label: "Black Friday", detail: "descontos sucessivos enganosos" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Uma blusa custa R$ 80,00 e está com \\(25\\%\\) de desconto. Qual é o preço final?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Transformar a porcentagem em decimal",
          detail: "\\(25\\% = \\frac{25}{100} = 0{,}25\\).",
        },
        {
          title: "Descobrir o fator que sobra",
          detail: "Se tiro \\(25\\%\\), sobram \\(75\\%\\) → fator \\(1 - 0{,}25 = 0{,}75\\).",
        },
        {
          title: "Multiplicar pelo fator",
          detail: "\\(80 \\times 0{,}75\\).",
        },
        {
          title: "Calcular",
          detail: "\\(80 \\times 0{,}75 = 60\\).",
        },
        {
          title: "Conferir pelo desconto",
          detail: "\\(25\\%\\) de \\(80\\) = \\(20\\); \\(80 - 20 = 60\\). Bate.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 60,00 é quanto você paga. O fator \\(0{,}75\\) já embute o desconto: você pula a etapa de \"calcular o desconto e depois subtrair\".",
        "Esse método brilha em descontos sucessivos: \\(25\\%\\) e depois mais \\(10\\%\\) é \\(80 \\times 0{,}75 \\times 0{,}90 = 54\\) → R$ 54 — e não \\(80\\) menos \\(35\\%\\), que daria R$ 52. Multiplicar fatores evita esse erro comum.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Somar descontos sucessivos (\\(10\\% + 10\\% \\neq 20\\%\\)).",
        "Esquecer de converter a porcentagem em decimal.",
        "Multiplicar pelo desconto (\\(0{,}25\\)) em vez do que sobra (\\(0{,}75\\)).",
        "Confundir \"\\(30\\%\\) de desconto\" com \"preço é \\(30\\%\\) do original\".",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quanto é \\(15\\%\\) de R$ 200?",
          identificar: "\\(15\\%\\) em decimal é \\(0{,}15\\).",
          dica: "Multiplique \\(200\\) por \\(0{,}15\\).",
          resolucao: "\\(200 \\times 0{,}15 = 30\\).",
          resposta: "R$ 30,00",
          interpretacao: "É a parte que corresponde a \\(15\\) de cada \\(100\\).",
          erroComum: "Multiplicar por \\(15\\) em vez de \\(0{,}15\\).",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Um produto de R$ 50 teve aumento de \\(20\\%\\). Qual o novo preço?",
          identificar: "Aumento → multiplicar por \\((1 + d)\\).",
          dica: "Fator de acréscimo = \\(1{,}20\\).",
          resolucao: "\\(50 \\times 1{,}20 = 60\\).",
          resposta: "R$ 60,00",
          interpretacao: "Os R$ 10 a mais são exatamente \\(20\\%\\) de \\(50\\).",
          erroComum: "Multiplicar por \\(0{,}20\\) (isso dá só o aumento).",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Uma TV de R$ 1000 tem \\(10\\%\\) e depois mais \\(10\\%\\) de desconto. Preço final?",
          identificar: "Descontos sucessivos multiplicam fatores.",
          dica: "\\(1000 \\times 0{,}90 \\times 0{,}90\\).",
          resolucao: "\\(1000 \\times 0{,}90 = 900\\); \\(900 \\times 0{,}90 = 810\\).",
          resposta: "R$ 810,00",
          interpretacao: "Não é \\(20\\%\\) (R$ 800): o 2º desconto incide sobre R$ 900.",
          erroComum: "Somar os descontos e tirar \\(20\\%\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique porcentagem, desconto e acréscimo no banco de exercícios.",
      exerciseIds: ["fund-ap-17", "fund-ap-18"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Porcentagem é fração de \\(100\\); converta para decimal antes de calcular.",
        "Desconto de \\(d\\%\\): multiplique por \\((1 - d)\\). Acréscimo: por \\((1 + d)\\).",
        "Descontos sucessivos multiplicam fatores — não se somam.",
        "Pensar em fator é mais rápido e evita erros.",
      ],
    },
  },

  "escalas-medidas": {
    meta: preMeta({
      title: "Escalas e medidas: regra de três e proporção",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 10,
      duration: "9 min",
      readingNotes: ["Proporção direta", "Multiplicação cruzada"],
      glossaryTerms: ["Proporção", "Razão", "Escala", "Regra de três"],
      next: { slug: "problemas-financeiros", title: "Problemas financeiros simples" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Proporção responde \"se tanto custa isso, quanto custa aquilo?\" mantendo a mesma relação. É a regra de três que você já usou sem saber o nome.",
        "Está em receita que serve mais gente, mapa com escala, conversão de moeda, velocidade média e mistura de tintas.",
        "Entender que é só uma igualdade entre duas razões tira o mistério: você monta a proporção e cruza.",
      ],
    },
    explicacao: {
      title: "Duas razões iguais, multiplicação cruzada",
      paragraphs: [
        "Uma proporção é a afirmação de que duas frações (razões) são iguais. Quando uma grandeza dobra e a outra também, elas são diretamente proporcionais.",
        "Para achar o valor que falta, use a multiplicação cruzada: o produto dos extremos é igual ao produto dos meios. Isolar a incógnita vira uma equação de 1º grau.",
      ],
      callout:
        "Monte \\(\\frac{\\text{sei}}{\\text{sei}} = \\frac{\\text{sei}}{x}\\) e cruze multiplicando.",
      formula: "a/b = c/d  ⟹  a·d = b·c",
      formulaLatex: "\\frac{a}{b} = \\frac{c}{d} \\;\\Rightarrow\\; a\\,d = b\\,c",
      formulaAria: "a sobre b igual a c sobre d implica a vezes d igual a b vezes c",
      formulaLegend: "multiplicação cruzada na proporção",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Receitas", detail: "ajustar para mais porções" },
        { label: "Mapas", detail: "escala \\(1:100000\\)" },
        { label: "Moedas", detail: "converter real e dólar" },
        { label: "Velocidade", detail: "km por hora → por minuto" },
        { label: "Tintas", detail: "proporção de mistura" },
        { label: "Maquetes", detail: "reduzir mantendo proporção" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Se \\(3\\) pães custam R$ 6,00, quanto custam \\(5\\) pães (mesmo preço por pão)?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Montar a proporção",
          detail: "\\(\\frac{3 \\text{ pães}}{6 \\text{ reais}} = \\frac{5 \\text{ pães}}{x \\text{ reais}}\\).",
        },
        {
          title: "Multiplicar cruzado e resolver",
          detail:
            "\\[\\begin{aligned} 3 \\cdot x &= 6 \\cdot 5 \\\\ 3x &= 30 \\\\ x &= \\frac{30}{3} \\\\ x &= 10 \\end{aligned}\\]",
        },
        {
          title: "Conferir o preço unitário",
          detail: "\\(\\frac{6}{3} =\\) R$ 2 por pão; \\(5 \\times 2 =\\) R$ 10. Bate.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 10,00 é o preço de \\(5\\) pães mantendo o mesmo valor por unidade. A proporção garante que a relação \"reais por pão\" não mudou.",
        "Se o preço por pão mudasse (atacado mais barato, por exemplo), a relação deixaria de ser proporcional e a regra de três não valeria. Sempre cheque se a relação é mesmo direta.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Inverter uma das razões ao montar a proporção.",
        "Misturar unidades (pães em cima de um lado, reais do outro).",
        "Usar regra de três direta quando a relação é inversa.",
        "Cruzar somando em vez de multiplicando.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Se \\(2\\) litros custam R$ 8, quanto custam \\(5\\) litros?",
          identificar: "Relação direta entre litros e reais.",
          dica: "Monte \\(\\frac{2}{8} = \\frac{5}{x}\\) e cruze.",
          resolucao:
            "\\[\\begin{aligned} 2x &= 8 \\cdot 5 \\\\ 2x &= 40 \\\\ x &= 20 \\end{aligned}\\]",
          resposta: "R$ 20,00",
          interpretacao: "R$ 4 por litro; \\(5\\) litros = R$ 20.",
          erroComum: "Montar \\(\\frac{2}{8} = \\frac{x}{5}\\) (razão invertida).",
        },
        {
          id: "guiado-2",
          type: "aplicada",
          enunciado: "Uma receita para \\(4\\) pessoas usa \\(200\\) g de farinha. Para \\(6\\) pessoas?",
          identificar: "Pessoas e farinha são diretamente proporcionais.",
          dica: "\\(\\frac{4}{200} = \\frac{6}{x}\\).",
          resolucao:
            "\\[\\begin{aligned} 4x &= 200 \\cdot 6 \\\\ 4x &= 1200 \\\\ x &= 300 \\end{aligned}\\]",
          resposta: "300 g",
          interpretacao: "\\(50\\) g por pessoa; \\(6\\) pessoas → \\(300\\) g.",
          erroComum: "Somar 100 g \"porque são 2 pessoas a mais\".",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Num mapa de escala \\(1:1000\\), \\(3\\) cm representam quantos metros reais?",
          identificar: "\\(1\\) cm no mapa = \\(1000\\) cm reais.",
          dica: "\\(3 \\text{ cm} \\times 1000\\) = cm reais; depois converta para metros.",
          resolucao:
            "\\[\\begin{aligned} 3 \\times 1000 &= 3000 \\text{ cm} \\\\ &= 30 \\text{ m} \\end{aligned}\\]",
          resposta: "30 metros",
          interpretacao: "A escala diz quantas vezes a realidade foi reduzida.",
          erroComum: "Esquecer de converter cm para metros.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique proporção, escala e regra de três no banco de exercícios.",
      exerciseIds: ["fund-ap-19", "fund-ap-20"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Proporção é a igualdade de duas razões.",
        "Multiplicação cruzada: \\(\\frac{a}{b} = \\frac{c}{d} \\Rightarrow a \\cdot d = b \\cdot c\\).",
        "Mantenha as mesmas unidades de cada lado.",
        "Confira se a relação é direta antes de aplicar regra de três.",
      ],
    },
  },

  "problemas-financeiros": {
    meta: preMeta({
      title: "Problemas financeiros simples: juros e montante",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 11,
      duration: "11 min",
      readingNotes: ["Juros simples", "Capital, taxa e tempo"],
      glossaryTerms: ["Capital", "Juros", "Taxa", "Montante"],
      next: { slug: "consumo-energia", title: "Consumo de energia" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Juros é o aluguel do dinheiro: o quanto se paga (ou se ganha) por usar um valor durante um tempo.",
        "Em juros simples, esse aluguel incide sempre sobre o valor inicial — cresce de forma constante, como uma função afim. É a porta de entrada para juros compostos.",
        "Saber montar a conta evita cair em parcelamento caro e ajuda a comparar investimentos.",
      ],
    },
    explicacao: {
      title: "Capital, taxa, tempo e montante",
      paragraphs: [
        "O capital (\\(C\\)) é o valor inicial. A taxa (\\(i\\)) é o percentual por período, em decimal. O tempo (\\(t\\)) é o número de períodos, na mesma unidade da taxa.",
        "Em juros simples, o montante (\\(M\\)) é o capital mais os juros acumulados. Como os juros são sempre \\(i \\cdot C\\) por período, o crescimento é linear: \\(M = C(1 + i \\cdot t)\\).",
      ],
      callout:
        "A taxa e o tempo precisam estar na mesma unidade: taxa ao mês pede tempo em meses.",
      formula: "M = C · (1 + i · t)",
      formulaLatex: "M = C\\,(1 + i\\,t)",
      formulaAria: "montante igual a capital vezes abre parêntese um mais i vezes t fecha parêntese",
      formulaLegend: "C = capital · i = taxa (decimal) · t = tempo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Empréstimos", detail: "quanto pagar de volta" },
        { label: "Poupança", detail: "rendimento ao longo do tempo" },
        { label: "Parcelamento", detail: "custo real do \"sem juros\"" },
        { label: "Multas", detail: "juros por atraso" },
        { label: "Investimentos", detail: "comparar rendimentos" },
        { label: "Cartão", detail: "juros sobre saldo devedor" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Você aplica R$ 1000 a juros simples de \\(2\\%\\) ao mês durante \\(6\\) meses. Quanto terá no final?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Listar os dados",
          detail: "\\(C = 1000\\); \\(i = 2\\% = 0{,}02\\) ao mês; \\(t = 6\\) meses.",
        },
        {
          title: "Conferir as unidades",
          detail: "Taxa ao mês e tempo em meses — compatíveis.",
        },
        {
          title: "Desenvolver o montante",
          detail:
            "\\[\\begin{aligned} i \\cdot t &= 0{,}02 \\times 6 = 0{,}12 \\\\ M &= 1000 \\times (1 + 0{,}12) \\\\ &= 1000 \\times 1{,}12 \\\\ &= 1120 \\end{aligned}\\]",
        },
        {
          title: "Separar os juros",
          detail: "Juros \\(= M - C = 1120 - 1000 =\\) R$ 120.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "Você termina com R$ 1120: o capital de R$ 1000 mais R$ 120 de juros pelos \\(6\\) meses.",
        "Como é juros simples, os R$ 20 por mês (\\(2\\%\\) de \\(1000\\)) nunca mudam. Em juros compostos, os juros passariam a render juros e o total seria um pouco maior — essa é a diferença-chave entre os dois sistemas.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Usar a taxa em porcentagem (\\(2\\)) em vez de decimal (\\(0{,}02\\)).",
        "Misturar unidades: taxa ao mês com tempo em anos.",
        "Confundir juros (\\(120\\)) com montante (\\(1120\\)).",
        "Aplicar fórmula de juros compostos quando o problema é simples.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Qual o juro simples de R$ 500 a \\(3\\%\\) ao mês por \\(4\\) meses?",
          identificar: "Juros \\(= C \\cdot i \\cdot t\\).",
          dica: "\\(i = 0{,}03\\); \\(t = 4\\).",
          resolucao:
            "\\[\\begin{aligned} \\text{Juros} &= 500 \\times 0{,}03 \\times 4 \\\\ &= 60 \\end{aligned}\\]",
          resposta: "R$ 60,00",
          interpretacao: "São R$ 15 por mês (\\(3\\%\\) de \\(500\\)) ao longo de \\(4\\) meses.",
          erroComum: "Usar \\(3\\) em vez de \\(0{,}03\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Qual o montante de R$ 2000 a \\(1\\%\\) ao mês por \\(10\\) meses (juros simples)?",
          identificar: "\\(M = C(1 + i \\cdot t)\\).",
          dica: "\\(i \\cdot t = 0{,}01 \\times 10 = 0{,}10\\).",
          resolucao:
            "\\[\\begin{aligned} M &= 2000 \\times (1 + 0{,}10) \\\\ &= 2000 \\times 1{,}10 \\\\ &= 2200 \\end{aligned}\\]",
          resposta: "R$ 2200,00",
          interpretacao: "R$ 200 de juros somados ao capital inicial.",
          erroComum: "Esquecer o \"1 +\" e calcular só os juros.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Uma dívida de R$ 800 ficou \\(3\\) meses a \\(5\\%\\) ao mês (juros simples). Quanto pagar?",
          identificar: "Montante \\(= C(1 + i \\cdot t)\\).",
          dica: "\\(i \\cdot t = 0{,}05 \\times 3 = 0{,}15\\).",
          resolucao:
            "\\[\\begin{aligned} M &= 800 \\times 1{,}15 \\\\ &= 920 \\end{aligned}\\]",
          resposta: "R$ 920,00",
          interpretacao: "R$ 120 de juros pelo atraso de \\(3\\) meses.",
          erroComum: "Somar 15% de juros uma vez só esquecendo que \\(t = 3\\) já entra no produto.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique juros simples e montante no banco de exercícios.",
      exerciseIds: ["fund-ap-21", "fund-ap-22"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Juros simples incidem sempre sobre o capital inicial (crescimento linear).",
        "\\(M = C(1 + i \\cdot t)\\); juros \\(= C \\cdot i \\cdot t\\).",
        "Use a taxa em decimal e a mesma unidade de tempo.",
        "Montante = capital + juros; não confunda os dois.",
      ],
    },
  },

  "consumo-energia": {
    meta: preMeta({
      title: "Consumo de energia: do watt à conta de luz",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 12,
      duration: "10 min",
      readingNotes: ["kWh na prática", "Custo proporcional ao consumo"],
      glossaryTerms: ["Potência", "Quilowatt-hora", "Tarifa"],
      next: { slug: "revisao-fundamentos-1", title: "Revisão · Parte 1" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A conta de luz é pura matemática de fundamentos: potência vezes tempo dá energia, e energia vezes tarifa dá o valor a pagar.",
        "Entender isso revela onde o dinheiro vai: aparelhos de alta potência ligados por muito tempo (chuveiro, ar-condicionado) dominam a fatura.",
        "É também um exemplo perfeito de proporção e função afim aplicadas ao dia a dia.",
      ],
    },
    explicacao: {
      title: "Potência × tempo = energia",
      paragraphs: [
        "Potência mede o \"ritmo\" de consumo, em watts (W) ou quilowatts (kW), sendo 1 kW = 1000 W. Energia é potência acumulada no tempo, medida em quilowatt-hora (kWh).",
        "Um aparelho de 1 kW ligado por 1 hora consome 1 kWh. A conta de luz cobra por cada kWh consumido, multiplicando pela tarifa.",
      ],
      callout:
        "1 kWh = um aparelho de 1000 W ligado por 1 hora. A tarifa é o preço de cada kWh.",
      formula: "Energia (kWh) = Potência (kW) × tempo (h)",
      formulaLatex: "E = P \\cdot t",
      formulaAria: "energia igual a potência vezes tempo",
      formulaLegend: "E em kWh, P em kW, t em horas",
    },
    grafico: {
      fn: "0.75 * x",
      alt: "Reta do custo em função do consumo: cada kWh custa R$ 0,75, então o custo sobe proporcionalmente ao consumo.",
      xDomain: [0, 200],
      yDomain: [0, 150],
      legend: "Custo(x) = 0,75·x — R$ 0,75 por kWh consumido (proporção direta).",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Conta de luz", detail: "kWh × tarifa" },
        { label: "Chuveiro", detail: "alta potência, muito consumo" },
        { label: "Ar-condicionado", detail: "horas ligadas pesam" },
        { label: "Eletrônicos", detail: "stand-by consome também" },
        { label: "Energia solar", detail: "quanto se gera por dia" },
        { label: "Sustentabilidade", detail: "reduzir consumo e custo" },
      ],
    },
    exemplo: {
      title: "Uma situação concreta",
      situacao:
        "Um chuveiro de \\(5400\\) W é usado \\(1\\) hora por dia durante \\(30\\) dias. Com tarifa de R$ 0,75/kWh, qual o custo no mês?",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Converter a potência para kW",
          detail: "\\(5400 \\text{ W} \\div 1000 = 5{,}4\\) kW.",
        },
        {
          title: "Calcular o tempo total no mês",
          detail: "\\(1 \\text{ h/dia} \\times 30 \\text{ dias} = 30\\) h.",
        },
        {
          title: "Desenvolver energia e custo",
          detail:
            "\\[\\begin{aligned} E &= 5{,}4 \\times 30 = 162 \\text{ kWh} \\\\ \\text{Custo} &= 162 \\times 0{,}75 \\\\ &= 121{,}50 \\end{aligned}\\]",
        },
        {
          title: "Interpretar",
          detail: "O chuveiro custa cerca de R$ 121,50 no mês.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 121,50 vêm só do chuveiro — costuma ser um dos maiores vilões da conta justamente por juntar alta potência (\\(5{,}4\\) kW) com uso diário.",
        "Como o custo é \\(0{,}75\\) vezes o consumo, reduzir banhos pela metade (\\(81\\) kWh) corta o gasto pela metade (≈ R$ 60). A relação é uma proporção direta, como mostra a reta do gráfico.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Esquecer de converter watts para quilowatts (dividir por \\(1000\\)).",
        "Multiplicar potência em W direto pela tarifa de kWh.",
        "Misturar tempo: usar minutos onde a fórmula pede horas.",
        "Confundir potência (kW) com energia (kWh).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Quantos kWh consome uma lâmpada de \\(100\\) W ligada por \\(10\\) horas?",
          identificar: "Converta W para kW e multiplique pelo tempo.",
          dica: "\\(100\\) W \\(= 0{,}1\\) kW.",
          resolucao:
            "\\[\\begin{aligned} E &= 0{,}1 \\times 10 \\\\ &= 1 \\text{ kWh} \\end{aligned}\\]",
          resposta: "1 kWh",
          interpretacao: "Equivale a 1 kW por 1 hora — daí dar exatamente 1 kWh.",
          erroComum: "Multiplicar \\(100 \\times 10\\) e responder \\(1000\\) kWh.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Com tarifa de R$ 0,80/kWh, quanto custam \\(50\\) kWh?",
          identificar: "Custo = energia × tarifa.",
          dica: "\\(50 \\times 0{,}80\\).",
          resolucao: "\\(50 \\times 0{,}80 = 40\\).",
          resposta: "R$ 40,00",
          interpretacao: "Cada kWh custa R$ 0,80; \\(50\\) deles, R$ 40.",
          erroComum: "Somar em vez de multiplicar.",
        },
        {
          id: "guiado-3",
          type: "aplicada",
          enunciado: "Uma TV de \\(200\\) W fica ligada \\(5\\) h/dia. Quanto consome em \\(30\\) dias?",
          identificar: "Potência em kW × horas totais.",
          dica: "\\(0{,}2\\) kW; horas \\(= 5 \\times 30 = 150\\).",
          resolucao:
            "\\[\\begin{aligned} E &= 0{,}2 \\times 150 \\\\ &= 30 \\text{ kWh} \\end{aligned}\\]",
          resposta: "30 kWh",
          interpretacao: "Aparelho de baixa potência, mas o uso longo acumula.",
          erroComum: "Esquecer de multiplicar os \\(5\\) h pelos \\(30\\) dias.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique cálculo de consumo e custo de energia no banco de exercícios.",
      exerciseIds: ["fund-ap-23", "fund-ap-24"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Energia (kWh) = potência (kW) × tempo (h).",
        "\\(1\\) kW \\(= 1000\\) W; sempre converta antes de calcular.",
        "Custo = energia × tarifa — proporção direta ao consumo.",
        "Alta potência + uso longo = maior peso na conta.",
      ],
    },
  },

  "revisao-fundamentos-1": {
    meta: preMeta({
      title: "Revisão · Parte 1: números, frações e potências",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 13,
      duration: "12 min",
      readingNotes: ["Consolida aulas 1 a 6", "Checklist de regras"],
      glossaryTerms: ["Ordem das operações", "MMC", "Expoente", "Produto notável"],
      next: { slug: "revisao-fundamentos-2", title: "Revisão · Parte 2" },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "Você passou por seis assuntos que parecem soltos — ordem das operações, frações, potências, raízes, produtos notáveis e fatoração — mas eles formam uma única caixa de ferramentas.",
        "Revisar não é repetir: é olhar de cima e perceber como uma regra puxa a outra. Quem mistura potências e frações com segurança não trava em álgebra depois.",
        "Esta aula amarra tudo em um checklist mental que você vai usar em quase toda conta daqui pra frente.",
      ],
    },
    explicacao: {
      title: "As seis ferramentas, em uma frase cada",
      paragraphs: [
        "Ordem das operações: parênteses → potências/raízes → ×÷ → +−, sempre da esquerda para a direita no mesmo nível. Frações: só some com denominador igual (use MMC); para multiplicar é reto, para dividir é \"vira e multiplica\".",
        "Potências: mesma base, expoentes somam no produto e subtraem na divisão. Raízes são potências de expoente fracionário. Produtos notáveis e fatoração são a mesma estrada nos dois sentidos: expandir e voltar a fatorar.",
      ],
      callout:
        "Tudo se conecta: uma raiz é uma potência, fatorar é desfazer um produto notável, e dividir fração é multiplicar pelo inverso.",
      formula: "(a + b)² = a² + 2ab + b²",
      formulaLatex: "(a + b)^2 = a^2 + 2ab + b^2",
      formulaAria: "abre parêntese a mais b fecha parêntese ao quadrado é igual a a ao quadrado mais dois a b mais b ao quadrado",
      formulaLegend: "o produto notável mais usado — saber de cor economiza tempo",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Álgebra", detail: "todo o próximo módulo depende disto" },
        { label: "Funções", detail: "simplificar expressões antes de resolver" },
        { label: "Provas", detail: "metade dos pontos perdidos vêm daqui" },
        { label: "Finanças", detail: "juros usam potências e frações" },
        { label: "Física", detail: "fórmulas com quadrados e raízes" },
        { label: "Calculadora", detail: "conferir se você respeita a ordem" },
      ],
    },
    exemplo: {
      title: "Uma conta que usa quase tudo",
      situacao:
        "Simplifique a expressão: \\( \\frac{2^3 \\cdot 2}{2^2} + (3 + 1)^2 \\). Ela mistura potências de mesma base, ordem das operações e um produto notável.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Resolver o que está no parêntese",
          detail: "\\((3 + 1)^2 = 4^2 = 16\\).",
        },
        {
          title: "Juntar e dividir as potências de mesma base",
          detail: "\\(\\frac{2^3 \\cdot 2}{2^2} = \\frac{2^4}{2^2} = 2^2 = 4\\).",
        },
        {
          title: "Desenvolvimento completo",
          detail:
            "\\[\\begin{aligned} \\frac{2^3 \\cdot 2}{2^2} + (3 + 1)^2 &= 2^2 + 4^2 \\\\ &= 4 + 16 \\\\ &= 20 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "Cada regra entrou na ordem certa; nenhuma etapa foi pulada.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "O \\(20\\) não é o ponto importante — o que importa é que você encadeou quatro regras diferentes sem se perder. Essa é exatamente a habilidade que a álgebra vai cobrar.",
        "Repare que somar as potências de base \\(2\\) só foi possível porque a base era a mesma. Trocar a base quebraria a regra, e aí teríamos de calcular cada potência separadamente.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Somar expoentes de bases diferentes (\\(2^3 \\cdot 3^2\\) não é \\(6^5\\)).",
        "Distribuir o expoente sobre uma soma: \\((a + b)^2\\) não é \\(a^2 + b^2\\).",
        "Somar frações multiplicando os denominadores sem ajustar o numerador.",
        "Esquecer que a raiz quadrada é potência de expoente \\(\\frac{1}{2}\\).",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Simplifique \\(5^2 + 2 \\times (4 - 1)\\).",
          identificar: "Parênteses e potência antes da multiplicação e soma.",
          dica: "Resolva \\((4 - 1)\\) e \\(5^2\\) primeiro.",
          resolucao:
            "\\[\\begin{aligned} 5^2 + 2 \\times (4 - 1) &= 25 + 2 \\times 3 \\\\ &= 25 + 6 \\\\ &= 31 \\end{aligned}\\]",
          resposta: "\\(31\\)",
          interpretacao: "A ordem garante o resultado; trocar etapas mudaria tudo.",
          erroComum: "Somar \\(25 + 2\\) antes de multiplicar pelo parêntese.",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Some \\(\\frac{1}{2} + \\frac{2}{3}\\).",
          identificar: "Denominadores diferentes — precisa de MMC.",
          dica: "MMC\\((2, 3) = 6\\).",
          resolucao:
            "\\[\\begin{aligned} \\frac{1}{2} + \\frac{2}{3} &= \\frac{3}{6} + \\frac{4}{6} \\\\ &= \\frac{7}{6} \\end{aligned}\\]",
          resposta: "\\(\\frac{7}{6}\\)",
          interpretacao: "Um pouco mais que um inteiro, o que faz sentido somando duas frações grandes.",
          erroComum: "Somar numeradores e denominadores: \\(\\frac{3}{5}\\).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Expanda \\((x + 3)^2\\).",
          identificar: "Produto notável do quadrado da soma.",
          dica: "\\(a^2 + 2ab + b^2\\) com \\(a = x\\) e \\(b = 3\\).",
          resolucao:
            "\\[\\begin{aligned} (x + 3)^2 &= x^2 + 2 \\cdot x \\cdot 3 + 3^2 \\\\ &= x^2 + 6x + 9 \\end{aligned}\\]",
          resposta: "\\(x^2 + 6x + 9\\)",
          interpretacao: "O termo do meio (\\(6x\\)) é o que muita gente esquece.",
          erroComum: "Escrever \\(x^2 + 9\\) e omitir o \\(6x\\).",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Revise as seis ferramentas com exercícios variados no banco do site.",
      exerciseIds: ["fund-ap-25", "fund-ap-26"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Ordem das operações governa toda conta; respeite-a sempre.",
        "Frações somam com denominador igual; multiplicam reto; dividem virando.",
        "Potências de mesma base: somam/subtraem expoentes; raiz é expoente fracionário.",
        "Produto notável e fatoração são a mesma via nos dois sentidos.",
      ],
    },
  },

  "revisao-fundamentos-2": {
    meta: preMeta({
      title: "Revisão · Parte 2: equações e aplicações",
      moduleSlug: MOD,
      moduleTitle: MOD_TITLE,
      lessonNumber: 14,
      duration: "12 min",
      readingNotes: ["Consolida aulas 7 a 12", "Da equação ao problema real"],
      glossaryTerms: ["Equação", "Incógnita", "Proporção", "Tarifa"],
      next: {
        slug: "expressoes-algebricas",
        title: "Manipulação de expressões",
        moduleSlug: "algebra",
      },
    }),
    porQue: {
      title: "Antes da fórmula, o sentido",
      paragraphs: [
        "A segunda metade dos fundamentos saiu da conta pura e entrou no mundo: equações de 1º e 2º grau, descontos, escalas, finanças e energia.",
        "O fio condutor é sempre o mesmo: traduzir uma situação em uma igualdade e isolar o que você não sabe. Quem enxerga isso resolve problema sem decorar fórmula.",
        "Esta revisão fecha o módulo conectando a técnica (resolver equações) ao propósito (responder perguntas reais).",
      ],
    },
    explicacao: {
      title: "Da equação ao problema, em uma frase cada",
      paragraphs: [
        "Equação de 1º grau: isole a incógnita fazendo a mesma operação dos dois lados. Equação de 2º grau: use Bhaskara quando não fatorar fácil, e lembre que o discriminante decide quantas soluções existem.",
        "Aplicações são equações disfarçadas: desconto é uma porcentagem subtraída, escala é uma proporção, conta de luz é energia × tarifa. Montar a igualdade certa é 90% do trabalho.",
      ],
      callout:
        "Todo problema vira: \"o que eu quero saber\" de um lado, \"o que eu sei\" do outro. Resolver é só isolar.",
      formula: "x = (−b ± √(b² − 4ac)) / 2a",
      formulaLatex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      formulaAria: "x é igual a menos b mais ou menos raiz de b ao quadrado menos quatro a c, tudo sobre dois a",
      formulaLegend: "fórmula de Bhaskara para equações de segundo grau",
    },
    ondeAparece: {
      title: "Onde isso aparece",
      items: [
        { label: "Compras", detail: "calcular preço com desconto" },
        { label: "Mapas", detail: "converter escala em distância real" },
        { label: "Finanças", detail: "parcelas, juros e orçamento" },
        { label: "Conta de luz", detail: "estimar consumo e custo" },
        { label: "Engenharia", detail: "equações de 2º grau em trajetórias" },
        { label: "Funções", detail: "raízes de equação = zeros da função" },
      ],
    },
    exemplo: {
      title: "Um problema que vira equação",
      situacao:
        "Uma blusa custava R$ 80,00 e está com \\(25\\%\\) de desconto. Depois ainda há R$ 5,00 de cupom. Quanto você paga? Monte como uma única conta.",
    },
    passos: {
      title: "Como pensar e resolver",
      steps: [
        {
          title: "Traduzir o desconto percentual",
          detail: "\\(25\\%\\) de \\(80 = 0{,}25 \\times 80 = 20\\) de desconto.",
        },
        {
          title: "Escrever como uma conta só e desenvolver",
          detail:
            "\\[\\begin{aligned} 80 \\times (1 - 0{,}25) - 5 &= 80 \\times 0{,}75 - 5 \\\\ &= 60 - 5 \\\\ &= 55 \\end{aligned}\\]",
        },
        {
          title: "Conferir o sentido",
          detail: "Pagar R$ 55 por algo de R$ 80 com desconto e cupom faz sentido.",
        },
      ],
    },
    interpretacao: {
      title: "O que esse resultado significa?",
      paragraphs: [
        "R$ 55,00 é o valor final. O passo-chave foi transformar \"\\(25\\%\\) de desconto\" em \"\\(\\times\\, 0{,}75\\)\" — multiplicar pelo que sobra é mais rápido que calcular o desconto e subtrair.",
        "Repare que a ordem importou: o cupom de R$ 5 entrou depois do desconto percentual. Se a loja aplicasse o cupom antes, o resultado mudaria — e o enunciado diz qual vem primeiro.",
      ],
    },
    erros: {
      title: "Cuidado com",
      items: [
        "Somar \\(25\\%\\) de desconto como se fosse R$ 25, não \\(25\\%\\) do valor.",
        "Aplicar o percentual e o cupom em ordem trocada sem ler o enunciado.",
        "Em equações, mexer só de um lado da igualdade.",
        "Em Bhaskara, esquecer o \\(\\pm\\) e achar só uma das raízes.",
      ],
    },
    exerciciosGuiados: {
      title: "Exercícios guiados",
      exercises: [
        {
          id: "guiado-1",
          type: "calculo",
          enunciado: "Resolva \\(3x - 7 = 11\\).",
          identificar: "Equação de 1º grau — isole o \\(x\\).",
          dica: "Some \\(7\\) dos dois lados, depois divida por \\(3\\).",
          resolucao:
            "\\[\\begin{aligned} 3x - 7 &= 11 \\\\ 3x &= 18 \\\\ x &= 6 \\end{aligned}\\]",
          resposta: "\\(x = 6\\)",
          interpretacao: "Substituindo: \\(3 \\cdot 6 - 7 = 11\\). Confere.",
          erroComum: "Dividir por \\(3\\) antes de passar o \\(7\\).",
        },
        {
          id: "guiado-2",
          type: "calculo",
          enunciado: "Quanto custa um produto de R$ 200 com \\(30\\%\\) de desconto?",
          identificar: "Multiplicar pelo que sobra (\\(1 - 0{,}30\\)).",
          dica: "\\(200 \\times 0{,}70\\).",
          resolucao: "\\(200 \\times 0{,}70 = 140\\).",
          resposta: "R$ 140,00",
          interpretacao: "Você paga \\(70\\%\\) do preço; R$ 60 foi o desconto.",
          erroComum: "Calcular \\(200 \\times 0{,}30\\) e responder R$ 60 (que é o desconto, não o preço).",
        },
        {
          id: "guiado-3",
          type: "calculo",
          enunciado: "Resolva \\(x^2 - 5x + 6 = 0\\).",
          identificar: "Equação de 2º grau — fatorar ou Bhaskara.",
          dica: "Procure dois números que somam \\(5\\) e multiplicam \\(6\\).",
          resolucao:
            "\\[\\begin{aligned} x^2 - 5x + 6 &= 0 \\\\ (x - 2)(x - 3) &= 0 \\\\ x = 2 \\ &\\text{ou} \\ x = 3 \\end{aligned}\\]",
          resposta: "\\(x = 2\\) ou \\(x = 3\\)",
          interpretacao: "Duas soluções porque o discriminante é positivo.",
          erroComum: "Encontrar só uma raiz e parar.",
        },
      ],
    },
    exerciciosAplicados: {
      title: "Exercícios aplicados",
      intro: "Pratique equações e problemas aplicados no banco de exercícios do site.",
      exerciseIds: ["fund-ap-27", "fund-ap-28", "dsf-fund-01"],
    },
    resumo: {
      title: "Resumo da aula",
      bullets: [
        "Equação: isole a incógnita fazendo a mesma coisa dos dois lados.",
        "2º grau: Bhaskara, e o discriminante diz quantas soluções há.",
        "Desconto de \\(p\\%\\): multiplique por \\((1 - \\frac{p}{100})\\).",
        "Todo problema real vira uma igualdade — montá-la é o essencial.",
      ],
    },
  },
};
