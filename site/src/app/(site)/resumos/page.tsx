import Link from "next/link";
import { RichText } from "@/components/aulas/RichText";
import { PageShell } from "@/components/layout/PageShell";
import { PrintButton } from "@/components/ui/PrintButton";
import { Tag } from "@/components/ui/Tag";
import { resumos, type Resumo } from "@/data/resumos";
import { slugify } from "@/lib/utils";

export const metadata = {
  title: "Resumos rápidos",
  description:
    "Cheat sheet de 1 página por módulo: pontos-chave, cards de fórmulas e tabela de erros comuns para revisar antes da prova.",
};

const trilhas = ["Pré-Cálculo", "Cálculo 1"] as const;

export default function ResumosPage() {
  return (
    <PageShell crumbs={["Início", "Resumos rápidos"]}>
      <div className="mx-auto max-w-[880px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-4xl font-medium tracking-tight">
            Resumos rápidos
          </h1>
          <PrintButton />
        </div>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Uma página de cola por módulo — pontos-chave, cards de fórmulas e os
          erros que mais derrubam nota, lado a lado com o jeito certo. Ideal
          para a véspera da prova. Para se aprofundar, abra a aula
          correspondente na trilha.
        </p>

        {/* Índice rápido */}
        <nav aria-label="Índice dos resumos" className="mt-6 flex flex-wrap gap-2">
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-6 font-serif text-xs font-semibold uppercase tracking-wider text-ink-subtle">
      {children}
    </h4>
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

      <SectionLabel>Pontos-chave</SectionLabel>
      <ul className="mt-2 grid gap-x-5 gap-y-2 sm:grid-cols-2">
        {resumo.pontos.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 text-[14px] leading-relaxed"
          >
            <span className="mt-0.5 text-sage" aria-hidden>
              ✓
            </span>
            <RichText>{p}</RichText>
          </li>
        ))}
      </ul>

      <SectionLabel>Fórmulas</SectionLabel>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        {resumo.formulas.map((f, i) => (
          <div
            key={`${slugify(resumo.slug)}-f${i}`}
            className="flex items-center justify-center rounded-2 border border-border-soft bg-surface-soft px-4 py-3 text-center"
          >
            <RichText>{`\\[${f}\\]`}</RichText>
          </div>
        ))}
      </div>

      <SectionLabel>Erros comuns</SectionLabel>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-[13.5px] leading-relaxed">
          <thead>
            <tr className="text-left">
              <th
                scope="col"
                className="w-1/2 rounded-tl-2 border border-border-soft bg-amber-soft/60 px-3.5 py-2 font-semibold text-amber-ink"
              >
                ✗ O que o aluno faz
              </th>
              <th
                scope="col"
                className="w-1/2 rounded-tr-2 border border-border-soft bg-sage-soft/60 px-3.5 py-2 font-semibold text-sage-ink"
              >
                ✓ O correto
              </th>
            </tr>
          </thead>
          <tbody>
            {resumo.erros.map((e) => (
              <tr key={e.faz} className="align-top">
                <td className="border border-border-soft px-3.5 py-2.5 text-ink-muted">
                  <RichText>{e.faz}</RichText>
                </td>
                <td className="border border-border-soft px-3.5 py-2.5">
                  <RichText>{e.correto}</RichText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
