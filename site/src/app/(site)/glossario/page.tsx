import { GlossarioList } from "@/components/glossario/GlossarioList";
import { PageShell } from "@/components/layout/PageShell";
import { glossario } from "@/data/glossario";

export const metadata = { title: "Glossário" };

export default function GlossarioPage() {
  return (
    <PageShell crumbs={["Início", "Glossário"]}>
      <div className="mx-auto max-w-[760px]">
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          Glossário matemático
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Definições em linguagem simples — sem academiquês. Os termos das aulas
          linkam para cá. Use a busca para encontrar rápido o que precisa.
        </p>
        <GlossarioList entries={glossario} />
      </div>
    </PageShell>
  );
}
