import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import { PageShell } from "@/components/layout/PageShell";
import { Tag } from "@/components/ui/Tag";
import { resumos, type Resumo } from "@/data/resumos";
import { slugify } from "@/lib/utils";

export const metadata = {
  title: "Resumos rápidos",
  description:
    "Resumo de 1 página por módulo: pontos-chave, fórmulas e erros comuns para revisar antes da prova.",
};

const trilhas = ["Pré-Cálculo", "Cálculo 1"] as const;

export default function ResumosPage() {
  return (
    <PageShell crumbs={["Início", "Resumos rápidos"]}>
      <div className="mx-auto max-w-[820px]">
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          Resumos rápidos
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Um resumo de uma página por módulo — pontos-chave, fórmulas e erros
          comuns. Ideal para revisar na véspera da prova. Para se aprofundar,
          abra a aula correspondente na trilha.
        </p>

        {/* Índice rápido */}
        <nav className="mt-6 flex flex-wrap gap-2">
          {resumos.map((r) => (
            <a
              key={r.slug}
              href={`#${r.slug}`}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-ink-muted transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {r.titulo}
            </a>
          ))}
        </nav>

        {trilhas.map((trilha) => (
          <section key={trilha} className="mt-10">
            <h2 className="font-serif text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
              {trilha}
            </h2>
            <div className="mt-4 space-y-5">
              {resumos
                .filter((r) => r.trilha === trilha)
                .map((r) => (
                  <ResumoCard key={r.slug} resumo={r} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function ResumoCard({ resumo }: { resumo: Resumo }) {
  return (
    <article
      id={resumo.slug}
      className="scroll-mt-20 rounded-3 border border-border bg-surface p-6 shadow-sm"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border-soft pb-3">
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-2xl font-medium tracking-tight">
            {resumo.titulo}
          </h3>
          <Tag tone="sage">{resumo.tempo}</Tag>
        </div>
        <Link
          href={resumo.href}
          className="text-sm font-semibold text-terracotta hover:underline"
        >
          Ver na trilha →
        </Link>
      </header>

      <RichText as="p" className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {resumo.intro}
      </RichText>

      <h4 className="mt-5 font-serif text-xs font-semibold uppercase tracking-wider text-ink-subtle">
        Pontos-chave
      </h4>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed">
        {resumo.pontos.map((p) => (
          <RichText as="li" key={p}>
            {p}
          </RichText>
        ))}
      </ul>

      <h4 className="mt-5 font-serif text-xs font-semibold uppercase tracking-wider text-ink-subtle">
        Fórmulas
      </h4>
      <div className="mt-2 space-y-1 rounded-2 bg-surface-soft px-4 py-3">
        {resumo.formulas.map((f, i) => (
          <RichText key={`${slugify(resumo.slug)}-f${i}`}>{`\\[${f}\\]`}</RichText>
        ))}
      </div>

      <h4 className="mt-5 font-serif text-xs font-semibold uppercase tracking-wider text-ink-subtle">
        Erros comuns
      </h4>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-muted">
        {resumo.erros.map((e) => (
          <RichText as="li" key={e}>
            {e}
          </RichText>
        ))}
      </ul>
    </article>
  );
}
