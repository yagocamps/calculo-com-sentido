import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { exercicios } from "@/data/exercicios";
import { getExercicio } from "@/lib/exercicios";
import { exercisePath } from "@/lib/exercise-url";
import { getSiteUrl } from "@/lib/site";
import { StandaloneExercise } from "@/components/exercicios/StandaloneExercise";
import { PageShell } from "@/components/layout/PageShell";

export const dynamicParams = false;
export function generateStaticParams() { return exercicios.map(e => ({ id: e.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const exercise = getExercicio(id);
  if (!exercise) notFound();
  const title = `${exercise.title} · ${exercise.num}`;
  const description = `Pratique ${exercise.tema}: ${exercise.title}. Exercício com dica, resposta comentada e resolução passo a passo.`;
  const url = `${getSiteUrl()}${exercisePath(id)}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}
export default async function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exercise = getExercicio(id);
  if (!exercise) notFound();
  return <PageShell crumbs={["Início", "Exercícios", exercise.tema]}>
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-5 font-serif text-3xl">{exercise.title}</h1>
      <StandaloneExercise exercise={exercise} />
      <Link className="mt-5 inline-block text-sky-ink underline" href={`/exercicios?tema=${encodeURIComponent(exercise.temaSlug)}`}>Voltar ao banco de exercícios</Link>
    </div>
  </PageShell>;
}
