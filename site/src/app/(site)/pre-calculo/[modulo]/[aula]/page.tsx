import { AulaEmBreve } from "@/components/aulas/AulaEmBreve";
import { AulaView } from "@/components/aulas/AulaView";
import { getAllAulaParams, getAula, moduloPath } from "@/data/pre-calculo";
import { getAulaContent } from "@/lib/aulas";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllAulaParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modulo: string; aula: string }>;
}) {
  const { modulo, aula } = await params;
  const content = getAulaContent("pre-calculo", modulo, aula);
  if (content) return { title: content.meta.title };
  const data = getAula(modulo, aula);
  if (!data) return { title: "Aula" };
  return { title: `${data.aula.title} · Pré-Cálculo` };
}

export default async function AulaPage({
  params,
}: {
  params: Promise<{ modulo: string; aula: string }>;
}) {
  const { modulo: moduloSlug, aula: aulaSlug } = await params;
  const data = getAula(moduloSlug, aulaSlug);
  if (!data) notFound();

  const content = getAulaContent("pre-calculo", moduloSlug, aulaSlug);
  if (content) {
    return <AulaView content={content} aulaSlug={aulaSlug} />;
  }

  return (
    <AulaEmBreve
      trilhaLabel="Pré-Cálculo"
      trilhaHref="/pre-calculo"
      moduloPath={moduloPath(data.modulo.slug)}
      modeloHref="/pre-calculo/funcoes/funcao-afim"
      modulo={data.modulo}
      aula={data.aula}
    />
  );
}
