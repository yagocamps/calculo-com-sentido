import { Calculo1ModuloPageClient } from "@/components/trilhas/Calculo1ModuloPageClient";
import { getAllCalculo1ModuloParams, getCalculo1Modulo } from "@/data/calculo-1";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllCalculo1ModuloParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modulo: string }>;
}) {
  const { modulo: slug } = await params;
  const modulo = getCalculo1Modulo(slug);
  if (!modulo) return { title: "Módulo" };
  return { title: `${modulo.title} · Cálculo 1` };
}

export default async function Calculo1ModuloPage({
  params,
}: {
  params: Promise<{ modulo: string }>;
}) {
  const { modulo: slug } = await params;
  const modulo = getCalculo1Modulo(slug);
  if (!modulo) notFound();

  return <Calculo1ModuloPageClient modulo={modulo} />;
}
