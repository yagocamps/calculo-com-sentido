export type GlossarioEntry = {
  termo: string;
  definicao: string;
  exemplo?: string;
};

export const glossario: GlossarioEntry[] = [
  {
    termo: "Função afim",
    definicao: "Função da forma f(x) = ax + b, com taxa constante a e valor inicial b.",
    exemplo: "Corrida: bandeirada + preço por km.",
  },
  {
    termo: "Domínio",
    definicao: "Conjunto de valores de entrada (x) para os quais a função faz sentido.",
  },
  {
    termo: "Limite",
    definicao: "Valor que a função se aproxima quando x se aproxima de um ponto.",
  },
];
