import type { Metadata } from "next";
import type { AulaContent } from "@/data/aulas/types";
import { getSiteUrl } from "@/lib/site";

/** Limite prático de um snippet de busca. */
const MAX_DESCRICAO = 158;

function temMatematica(texto: string): boolean {
  return /\\\(|\\\[/.test(texto);
}

function truncar(texto: string, limite = MAX_DESCRICAO): string {
  const limpo = texto.replace(/\s+/g, " ").trim();
  if (limpo.length <= limite) return limpo;
  const corte = limpo.slice(0, limite - 1);
  const espaco = corte.lastIndexOf(" ");
  return `${(espaco > limite * 0.6 ? corte.slice(0, espaco) : corte).replace(/[,;:.\s]+$/, "")}…`;
}

/**
 * Descrição da aula para busca e compartilhamento.
 *
 * Prefere a primeira frase de "Por que aprender isso", que é escrita em
 * linguagem natural e diz o que o aluno ganha com a aula. Quando esse trecho
 * tem LaTeX, cai para um resumo estrutural — melhor uma frase honesta e sem
 * fórmula do que uma fórmula estropiada no resultado do Google.
 */
export function lessonDescription(content: AulaContent): string {
  const abertura = content.porQue.paragraphs.find((p) => p.trim() && !temMatematica(p));
  if (abertura) {
    const frase = truncar(abertura);
    // Uma frase curta demais não vira snippet útil sozinha.
    if (frase.length >= 80) return frase;
    return truncar(`${frase} ${resumoEstrutural(content)}`);
  }
  return truncar(`${content.meta.title}. ${resumoEstrutural(content)}`);
}

function resumoEstrutural(content: AulaContent): string {
  const partes = [
    "Explicação com sentido antes da fórmula",
    "exemplo resolvido passo a passo",
    "erros comuns",
    `${content.exerciciosGuiados.exercises.length} exercícios guiados`,
  ];
  return `${partes.join(", ")} — módulo ${content.meta.moduleTitle}.`;
}

/** Metadata completa de uma página de aula: título, descrição, canonical e OG. */
export function lessonMetadata(
  content: AulaContent,
  trilha: "pre-calculo" | "calculo-1",
  aulaSlug: string,
): Metadata {
  const title = content.meta.title;
  const description = lessonDescription(content);
  const url = `${getSiteUrl()}/${trilha}/${content.meta.moduleSlug}/${aulaSlug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
    },
  };
}
