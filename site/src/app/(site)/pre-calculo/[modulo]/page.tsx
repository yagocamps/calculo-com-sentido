import { ModuloPageClient } from "@/components/trilhas/ModuloPageClient";
import { getAllModuloParams, getModulo } from "@/data/pre-calculo";
import { getModuleFlashcards } from "@/lib/flashcards";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllModuloParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modulo: string }>;
}) {
  const { modulo: slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) return { title: "Módulo" };
  return { title: `${modulo.title} · Pré-Cálculo` };
}

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ modulo: string }>;
}) {
  const { modulo: slug } = await params;
  const modulo = getModulo(slug);
  if (!modulo) notFound();

  const flashcards = getModuleFlashcards("pre-calculo", slug);
  return <ModuloPageClient modulo={modulo} flashcards={flashcards} />;
}
