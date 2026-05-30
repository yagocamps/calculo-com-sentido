import { PageShell } from "@/components/layout/PageShell";
import { glossario } from "@/data/glossario";
import { slugify } from "@/lib/utils";

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
          linkam para cá; a lista completa cresce conforme novos módulos forem
          publicados.
        </p>
        <p className="mt-3 rounded-xl border border-dashed border-border bg-surface-warm px-4 py-3 text-sm text-ink-muted">
          {glossario.length} termos disponíveis hoje. Falta um termo? Abra uma
          aula e use os links &quot;Termos novos&quot; na barra lateral.
        </p>
        <dl className="mt-8 divide-y divide-border">
          {glossario.map((entry) => (
            <div key={entry.termo} id={slugify(entry.termo)} className="py-5 scroll-mt-20">
              <dt className="font-serif text-xl font-medium">{entry.termo}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                {entry.definicao}
                {entry.exemplo && (
                  <span className="mt-2 block text-sm text-ink">
                    Ex.: {entry.exemplo}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PageShell>
  );
}
