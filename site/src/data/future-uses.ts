import type { AulaFutureUse } from "@/data/aulas/types";

type Track = "pre-calculo" | "calculo-1";

export const futureUseDefaults: Record<Track, Record<string, AulaFutureUse[]>> = {
  "pre-calculo": {
    fundamentos: [
      {
        label: "Álgebra essencial",
        href: "/pre-calculo/algebra",
        detail: "para manipular expressões sem perder sinais ou equivalência",
      },
      {
        label: "Limites",
        href: "/calculo-1/limites",
        detail: "em frações, potências, raízes e aproximações",
      },
    ],
    algebra: [
      {
        label: "Funções",
        href: "/pre-calculo/funcoes",
        detail: "para domínio, zeros e diferentes formas de uma função",
      },
      {
        label: "Laboratório de limites",
        href: "/pre-calculo/preparacao-limites",
        detail: "para tratar indeterminações com segurança",
      },
    ],
    funcoes: [
      {
        label: "Limites e continuidade",
        href: "/calculo-1/limites",
        detail: "todo limite descreve o comportamento de uma função",
      },
      {
        label: "Regra da cadeia",
        href: "/calculo-1/derivadas/derivada-composta",
        detail: "como derivada de uma composição de funções",
      },
    ],
    graficos: [
      {
        label: "Limites por gráfico",
        href: "/calculo-1/limites/limite-por-grafico",
        detail: "para prever tendência e existência antes de calcular",
      },
      {
        label: "Aplicações de derivadas",
        href: "/calculo-1/aplicacoes-derivadas",
        detail: "em crescimento, extremos e concavidade",
      },
    ],
    "geometria-analitica": [
      {
        label: "Reta secante e tangente",
        href: "/calculo-1/derivadas/reta-secante-tangente",
        detail: "inclinação é a linguagem geométrica da derivada",
      },
      {
        label: "Círculo trigonométrico",
        href: "/pre-calculo/trigonometria/ciclo-trigonometrico",
        detail: "distância e coordenadas constroem seno e cosseno",
      },
    ],
    trigonometria: [
      {
        label: "Limite trigonométrico",
        href: "/calculo-1/limites/limite-trigonometrico-fundamental",
        detail: "a ponte para derivar seno e cosseno",
      },
      {
        label: "Derivadas trigonométricas",
        href: "/calculo-1/derivadas/derivadas-trigonometricas",
        detail: "em ondas, movimento circular e oscilações",
      },
    ],
    "preparacao-limites": [
      {
        label: "Cálculo de limites",
        href: "/calculo-1/limites",
        detail: "para escolher entre substituição, fatoração e racionalização",
      },
      {
        label: "Definição da derivada",
        href: "/calculo-1/derivadas/definicao-derivada",
        detail: "o quociente de diferenças termina em um limite",
      },
    ],
  },
  "calculo-1": {
    "antes-do-calculo": [
      {
        label: "Funções para Cálculo",
        href: "/calculo-1/funcoes-para-calculo",
        detail: "para reconstruir a base antes das técnicas",
      },
      {
        label: "Limites",
        href: "/calculo-1/limites",
        detail: "primeira ferramenta formal de aproximação",
      },
    ],
    "funcoes-para-calculo": [
      {
        label: "Limites",
        href: "/calculo-1/limites",
        detail: "domínio, composição e gráficos orientam o cálculo",
      },
      {
        label: "Regra da cadeia",
        href: "/calculo-1/derivadas/derivada-composta",
        detail: "para reconhecer função de fora e função de dentro",
      },
    ],
    limites: [
      {
        label: "Continuidade",
        href: "/calculo-1/continuidade",
        detail: "continuidade reúne limite e valor da função",
      },
      {
        label: "Derivadas",
        href: "/calculo-1/derivadas",
        detail: "a taxa instantânea nasce de um limite",
      },
    ],
    continuidade: [
      {
        label: "Teoremas e aplicações",
        href: "/calculo-1/aplicacoes-derivadas",
        detail: "para justificar existência de raízes e extremos",
      },
      {
        label: "Teorema Fundamental do Cálculo",
        href: "/calculo-1/integrais/tfc",
        detail: "suas hipóteses dependem de continuidade",
      },
    ],
    derivadas: [
      {
        label: "Aplicações de derivadas",
        href: "/calculo-1/aplicacoes-derivadas",
        detail: "para estudar mudança, extremos e aproximação",
      },
      {
        label: "Integrais",
        href: "/calculo-1/integrais",
        detail: "antiderivar desfaz uma derivada",
      },
    ],
    "aplicacoes-derivadas": [
      {
        label: "Integrais e acúmulo",
        href: "/calculo-1/integrais",
        detail: "taxas conhecidas permitem recuperar totais",
      },
      {
        label: "Modelagem",
        href: "/exercicios?tema=aplicacoes-derivadas",
        detail: "para transformar contexto em função e decisão",
      },
    ],
    integrais: [
      {
        label: "Aplicações acumulativas",
        href: "/calculo-1/integrais/aplicacoes-integrais",
        detail: "em área, deslocamento, volume e valor médio",
      },
      {
        label: "Revisão cumulativa",
        href: "/exercicios?tema=integrais",
        detail: "para combinar derivadas, antiderivadas e interpretação",
      },
    ],
  },
};

export function futureUsesForLesson(
  track: Track,
  moduleSlug: string,
  explicit?: AulaFutureUse[],
) {
  return explicit?.length ? explicit : futureUseDefaults[track][moduleSlug] ?? [];
}
