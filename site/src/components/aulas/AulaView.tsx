import Link from "next/link";
import { AulaExerciseCard } from "@/components/aulas/AulaExerciseCard";
import { AulaToc } from "@/components/aulas/AulaToc";
import { AulaTocMobile } from "@/components/aulas/AulaTocMobile";
import { FormulaBlock } from "@/components/aulas/FormulaBlock";
import { FunctionPlot } from "@/components/aulas/FunctionPlot";
import { MarkCompleteButton } from "@/components/aulas/MarkCompleteButton";
import { RichText } from "@/components/aulas/RichText";
import { Section } from "@/components/aulas/Section";
import { StepList } from "@/components/aulas/StepList";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Tag } from "@/components/ui/Tag";
import type { AulaContent } from "@/data/aulas/types";
import { glossario, type GlossarioEntry } from "@/data/glossario";
import { exercicios } from "@/data/exercicios";
import {
  calculo1LessonId,
  calculo1ModuloPath,
} from "@/data/calculo-1";
import { lessonId, moduloPath } from "@/data/pre-calculo";

const glossarioByTerm = new Map(glossario.map((g) => [g.termo, g]));

export function AulaView({
  content,
  aulaSlug,
  trilha = "pre-calculo",
}: {
  content: AulaContent;
  aulaSlug: string;
  trilha?: "pre-calculo" | "calculo-1";
}) {
  const { meta } = content;
  const trilhaRoot = trilha === "calculo-1" ? "Cálculo 1" : "Pré-Cálculo";
  const lessonPathId =
    trilha === "calculo-1"
      ? calculo1LessonId(meta.moduleSlug, aulaSlug)
      : lessonId(meta.moduleSlug, aulaSlug);
  const backToModulo =
    trilha === "calculo-1"
      ? calculo1ModuloPath(meta.moduleSlug)
      : moduloPath(meta.moduleSlug);
  const crumbTitle = meta.title.includes(":")
    ? meta.title.split(":")[0].trim()
    : meta.title;

  const appliedExercises = content.exerciciosAplicados.exerciseIds
    .map((id) => exercicios.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  // Realce inline dos termos do glossário desta aula (1ª ocorrência no texto).
  const glossaryHL = {
    terms: meta.glossaryTerms
      .map((t) => ({ termo: t, entry: glossarioByTerm.get(t) }))
      .filter((x): x is { termo: string; entry: GlossarioEntry } =>
        Boolean(x.entry),
      ),
    used: new Set<string>(),
  };

  return (
    <PageShell
      crumbs={[trilhaRoot, meta.moduleTitle, crumbTitle]}
      right={<MarkCompleteButton lessonPathId={lessonPathId} />}
    >
      <div className="mx-auto grid max-w-[1080px] gap-7 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0">
          <header className="mb-4">
            <Link
              href={backToModulo}
              className="font-serif text-xs italic text-terracotta hover:underline"
            >
              Aula {String(meta.lessonNumber).padStart(2, "0")} · Módulo{" "}
              {meta.moduleTitle}
            </Link>
            <h1 className="mt-2 text-balance font-serif text-[38px] font-medium leading-tight tracking-tight">
              {meta.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-ink-muted">
              <span>⏱ {meta.duration} de leitura</span>
              {meta.readingNotes.map((note) => (
                <span key={note} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-ink-subtle" />
                  {note}
                </span>
              ))}
              <Tag tone="sage">Nível: {meta.level}</Tag>
            </div>
          </header>

          <AulaTocMobile content={content} />

          <div id="porque">
            <Section n={1} label="Por que aprender isso" title={content.porQue.title}>
              {content.porQue.paragraphs.map((p) => (
                <RichText
                  as="p"
                  key={p.slice(0, 24)}
                  className="mb-3 text-[15px] leading-relaxed last:mb-0"
                  glossary={glossaryHL}
                >
                  {p}
                </RichText>
              ))}
            </Section>
          </div>

          <div id="explicacao">
            <Section n={2} label="Explicação simples" title={content.explicacao.title}>
              {content.explicacao.paragraphs.map((p) => (
                <RichText
                  as="p"
                  key={p.slice(0, 24)}
                  className="mb-3 text-[15px] leading-relaxed last:mb-0"
                  glossary={glossaryHL}
                >
                  {p}
                </RichText>
              ))}
              {content.explicacao.callout && (
                <Callout variant="idea" className="mt-3">
                  <RichText>{content.explicacao.callout}</RichText>
                </Callout>
              )}
              <FormulaBlock
                formula={content.explicacao.formula}
                formulaLatex={content.explicacao.formulaLatex}
                formulaAria={content.explicacao.formulaAria}
                legend={content.explicacao.formulaLegend}
              />
              {content.grafico && (
                <FunctionPlot
                  fn={content.grafico.fn}
                  alt={content.grafico.alt}
                  xDomain={content.grafico.xDomain}
                  yDomain={content.grafico.yDomain}
                  legend={content.grafico.legend}
                />
              )}
            </Section>
          </div>

          <div id="onde">
            <Section n={3} label="Onde isso aparece" title={content.ondeAparece.title}>
              <Callout variant="apply">
                <div className="grid gap-2 sm:grid-cols-2">
                  {content.ondeAparece.items.map((item) => (
                    <div key={item.label} className="text-[13px]">
                      <b>{item.label}</b> · <RichText>{item.detail}</RichText>
                    </div>
                  ))}
                </div>
              </Callout>
            </Section>
          </div>

          <div id="exemplo">
            <Section n={4} label="Exemplo aplicado" title={content.exemplo.title} titleRich>
              <RichText
                as="p"
                className="text-[15px] leading-relaxed"
                glossary={glossaryHL}
              >
                {content.exemplo.situacao}
              </RichText>
            </Section>
          </div>

          <div id="passos">
            <Section n={5} label="Resolução passo a passo" title={content.passos.title}>
              <StepList steps={content.passos.steps} />
            </Section>
          </div>

          <div id="interpretacao">
            <Section n={6} label="Interpretação" title={content.interpretacao.title}>
              {content.interpretacao.paragraphs.map((p) => (
                <RichText
                  as="p"
                  key={p.slice(0, 24)}
                  className="mb-3 text-[15px] leading-relaxed last:mb-0"
                  glossary={glossaryHL}
                >
                  {p}
                </RichText>
              ))}
            </Section>
          </div>

          <div id="erros">
            <Section n={7} label="Erros comuns" title={content.erros.title}>
              <Callout variant="warn" label="ERROS COMUNS">
                <ul className="list-disc space-y-1 pl-4 text-[14px] leading-relaxed">
                  {content.erros.items.map((item) => (
                    <RichText as="li" key={item}>
                      {item}
                    </RichText>
                  ))}
                </ul>
              </Callout>
            </Section>
          </div>

          <div id="guiados">
            <Section
              n={8}
              label="Exercícios guiados"
              title={content.exerciciosGuiados.title}
            >
              <div className="space-y-3">
                {content.exerciciosGuiados.exercises.map((ex) => (
                  <AulaExerciseCard key={ex.id} exercise={ex} />
                ))}
              </div>
            </Section>
          </div>

          <div id="aplicados">
            <Section
              n={9}
              label="Exercícios aplicados"
              title={content.exerciciosAplicados.title}
            >
              <RichText as="p" className="mb-4 text-[15px] leading-relaxed text-ink-muted">
                {content.exerciciosAplicados.intro}
              </RichText>
              <div className="space-y-2">
                {appliedExercises.map((ex) => (
                  <Link
                    key={ex.id}
                    href={`/exercicios?id=${ex.id}`}
                    className="block rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-terracotta hover:bg-terracotta-soft/20"
                  >
                    <span className="font-mono text-[11px] text-ink-subtle">
                      {ex.num}
                    </span>
                    <p className="font-semibold">{ex.title}</p>
                    <p className="text-xs text-ink-muted">{ex.tema}</p>
                  </Link>
                ))}
              </div>
              <Button href="/exercicios" variant="primary" className="mt-4">
                Ver todos os exercícios →
              </Button>
            </Section>
          </div>

          <div id="resumo">
            <Section n={10} label="Resumo da aula" title={content.resumo.title}>
              <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
                {content.resumo.bullets.map((b) => (
                  <RichText as="li" key={b}>
                    {b}
                  </RichText>
                ))}
              </ul>
            </Section>
          </div>

          {meta.nextLesson && (
            <div id="proxima">
              <Section
                n={11}
                label="Próxima aula"
                title="Continue sua trilha"
              >
                <div className="flex flex-wrap items-center gap-4 rounded-2 border border-border bg-surface-warm p-5">
                  <div className="min-w-[200px] flex-1">
                    <p className="font-serif text-lg font-medium">
                      {meta.nextLesson.title}
                    </p>
                  </div>
                  <Button href={meta.nextLesson.href} variant="dark">
                    Continuar →
                  </Button>
                </div>
              </Section>
            </div>
          )}

          <div className="mt-8 border-t border-border-soft pt-6">
            <Link
              href={backToModulo}
              className="text-sm font-semibold text-terracotta hover:underline"
            >
              ← Voltar ao módulo {meta.moduleTitle}
            </Link>
          </div>
        </article>

        <AulaToc content={content} />
      </div>
    </PageShell>
  );
}
