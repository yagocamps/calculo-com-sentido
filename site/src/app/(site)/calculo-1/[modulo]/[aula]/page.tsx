import { AulaEmBreve } from "@/components/aulas/AulaEmBreve";
import { AulaView } from "@/components/aulas/AulaView";
import { getCalculo1StaticAulaParams } from "@/data/aulas/calculo-1/register";
import {
  calculo1ModuloPath,
  getCalculo1Aula,
} from "@/data/calculo-1";
import { getAulaContent } from "@/lib/aulas";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getCalculo1StaticAulaParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modulo: string; aula: string }>;
}) {
  const { modulo, aula } = await params;
  const content = getAulaContent("calculo-1", modulo, aula);
  if (content) return { title: content.meta.title };
  const data = getCalculo1Aula(modulo, aula);
  if (!data) return { title: "Aula" };
  return { title: `${data.aula.title} · Cálculo 1` };
}

export default async function Calculo1AulaPage({
  params,
}: {
  params: Promise<{ modulo: string; aula: string }>;
}) {
  const { modulo: moduloSlug, aula: aulaSlug } = await params;
  const data = getCalculo1Aula(moduloSlug, aulaSlug);
  if (!data) notFound();

  const content = getAulaContent("calculo-1", moduloSlug, aulaSlug);
  if (content) {
    return (
      <AulaView content={content} aulaSlug={aulaSlug} trilha="calculo-1" />
    );
  }

  return (
    <AulaEmBreve
      trilhaLabel="Cálculo 1"
      trilhaHref="/calculo-1"
      moduloPath={calculo1ModuloPath(data.modulo.slug)}
      modeloHref="/calculo-1/antes-do-calculo/o-que-e-calculo-1"
      modulo={data.modulo}
      aula={data.aula}
    />
  );
}
