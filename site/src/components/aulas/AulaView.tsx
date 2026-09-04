import Link from "next/link";
import { AlternativeExplanation } from "@/components/aulas/AlternativeExplanation";
import { AulaExerciseCard } from "@/components/aulas/AulaExerciseCard";
import { AulaQuiz } from "@/components/aulas/AulaQuiz";
import { AulaToc } from "@/components/aulas/AulaToc";
import { AulaTocMobile } from "@/components/aulas/AulaTocMobile";
import { FormulaBlock } from "@/components/aulas/FormulaBlock";
import { FutureUseLinks } from "@/components/aulas/FutureUseLinks";
import { FunctionPlot } from "@/components/aulas/FunctionPlot";
import { InteractiveAfimPlot } from "@/components/aulas/InteractiveAfimPlot";
import { BhaskaraDerivation } from "@/components/aulas/BhaskaraDerivation";
import { DemonstrationDisclosure } from "@/components/aulas/DemonstrationDisclosure";
import { LessonAnalytics } from "@/components/aulas/LessonAnalytics";
import { MarkCompleteButton } from "@/components/aulas/MarkCompleteButton";
import { RichText } from "@/components/aulas/RichText";
import { Section } from "@/components/aulas/Section";
import { AulaVideos } from "@/components/aulas/AulaVideos";
import { StepList } from "@/components/aulas/StepList";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Tag } from "@/components/ui/Tag";
import type { AulaContent } from "@/data/aulas/types";
import { glossario, type GlossarioEntry } from "@/data/glossario";
import { exercicios } from "@/data/exercicios";
import { demonstrationsForLesson } from "@/data/demonstracoes";
import { prereqsForModule } from "@/data/prereqs";
import { futureUsesForLesson } from "@/data/future-uses";
import {
  calculo1Modulos,
  calculo1LessonId,
  calculo1ModuloPath,
  calculo1LessonPath,
} from "@/data/calculo-1";
import {
  lessonId,
  lessonPath,
  moduloPath,
  preCalculoModulos,
} from "@/data/pre-calculo";

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

  // Pré-requisitos: os da aula, ou os padrão do módulo como fallback.
  const prereqs = meta.prereqs ?? prereqsForModule(trilha, meta.moduleSlug);
  const futureUses = futureUsesForLesson(
    trilha,
    meta.moduleSlug,
    meta.usedIn,
  );
  const catalogDemonstrations = demonstrationsForLesson(
    trilha,
    meta.moduleSlug,
    aulaSlug,
  );
  const hasQuiz = Boolean(content.quiz?.length);
  const hasVideos = Boolean(content.videos?.length);
  const curriculumModules =
    trilha === "calculo-1" ? calculo1Modulos : preCalculoModulos;
  const moduleIndex = curriculumModules.findIndex(
    (module) => module.slug === meta.moduleSlug,
  );
  const lessonIndex =
    moduleIndex >= 0
      ? curriculumModules[moduleIndex].lessons.findIndex(
          (lesson) => lesson.slug === aulaSlug,
        )
      : -1;
  const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : meta.lessonNumber;
  const sameModuleNext =
    lessonIndex >= 0
      ? curriculumModules[moduleIndex].lessons
          .slice(lessonIndex + 1)
          .find((lesson) => lesson.available)
      : undefined;
  const nextModuleLesson =
    !sameModuleNext && moduleIndex >= 0
      ? curriculumModules
          .slice(moduleIndex + 1)
          .flatMap((module) =>
            module.lessons
              .filter((lesson) => lesson.available)
              .map((lesson) => ({ ...lesson, moduleSlug: module.slug })),
          )[0]
      : undefined;
  const nextCatalogLesson = sameModuleNext
    ? { ...sameModuleNext, moduleSlug: meta.moduleSlug }
    : nextModuleLesson;
  const nextLesson = nextCatalogLesson
    ? {
        title: nextCatalogLesson.title,
        href:
          trilha === "calculo-1"
            ? calculo1LessonPath(nextCatalogLesson.moduleSlug, nextCatalogLesson.slug)
            : lessonPath(nextCatalogLesson.moduleSlug, nextCatalogLesson.slug),
      }
    : meta.nextLesson;

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
      <LessonAnalytics lessonPathId={lessonPathId} />
      <div className="mx-auto grid max-w-[1080px] gap-7 lg:grid-cols-[minmax(0,1fr)_240px]">
        <article className="min-w-0">
          <header className="mb-4">
            <Link
              href={backToModulo}
              className="font-serif text-xs italic text-terracotta hover:underline"
            >
              Aula {String(lessonNumber).padStart(2, "0")} · Módulo{" "}
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

            {prereqs.length > 0 && (
              <div className="mt-4 rounded-2 border border-sky/50 bg-sky-soft/40 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-sky-ink">
                  Para esta aula, ajuda já conhecer
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {prereqs.map((p) => (
                    <Link
                      key={p.href + p.label}
                      href={p.href}
                      className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-[12px] font-semibold text-ink-muted transition-colors hover:border-sky hover:text-sky-ink"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                  Se algum desses estiver nebuloso, revise primeiro — leva
                  poucos minutos e evita travar no meio da aula.
                </p>
              </div>
            )}
            <FutureUseLinks items={futureUses} />
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
              {content.explicacao.alternativa &&
                content.explicacao.alternativa.length > 0 && (
                  <AlternativeExplanation
                    paragraphs={content.explicacao.alternativa}
                  />
                )}
              {content.explicacao.callout && (
                <Callout variant="idea" className="mt-3">
                  <RichText glossary={glossaryHL}>
                    {content.explicacao.callout}
                  </RichText>
                </Callout>
              )}
              <FormulaBlock
                formula={content.explicacao.formula}
                formulaLatex={content.explicacao.formulaLatex}
                formulaAria={content.explicacao.formulaAria}
                legend={content.explicacao.formulaLegend}
              />
              {content.demonstracao && (
                <BhaskaraDerivation
                  title={content.demonstracao.title}
                  intro={content.demonstracao.intro}
                  steps={content.demonstracao.steps}
                />
              )}
              {catalogDemonstrations.length > 0 && (
                <DemonstrationDisclosure
                  demonstrations={catalogDemonstrations}
                />
              )}
              {content.grafico &&
                (content.grafico.interactive?.type === "afim" ? (
                  <InteractiveAfimPlot
                    initialA={content.grafico.interactive.a}
                    initialB={content.grafico.interactive.b}
                    xDomain={content.grafico.xDomain}
                    yDomain={content.grafico.yDomain}
                  />
                ) : (
                  <FunctionPlot
                    fn={content.grafico.fn}
                    alt={content.grafico.alt}
                    xDomain={content.grafico.xDomain}
                    yDomain={content.grafico.yDomain}
                    legend={content.grafico.legend}
                  />
                ))}
            </Section>
          </div>

          <div id="onde">
            <Section n={3} label="Onde isso aparece" title={content.ondeAparece.title}>
              <Callout variant="apply">
                <div className="grid gap-2 sm:grid-cols-2">
                  {content.ondeAparece.items.map((item) => (
                    <div key={item.label} className="text-[13px]">
                      <b>{item.label}</b> ·{" "}
                      <RichText glossary={glossaryHL}>{item.detail}</RichText>
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
              <StepList steps={content.passos.steps} glossary={glossaryHL} />
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
                    <RichText as="li" key={item} glossary={glossaryHL}>
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
                  <RichText as="li" key={b} glossary={glossaryHL}>
                    {b}
                  </RichText>
                ))}
              </ul>
            </Section>
          </div>

          {hasQuiz && content.quiz && (
            <div id="quiz">
              <Section
                n={11}
                label="Checagem rápida"
                title="Pronto para a próxima?"
              >
                <AulaQuiz
                  questions={content.quiz}
                  nextLesson={nextLesson}
                />
              </Section>
            </div>
          )}

          {hasVideos && (
            <div id="video">
              <Section
                n={hasQuiz ? 12 : 11}
                label="Vídeo aula"
                title="Assista à explicação"
              >
                <AulaVideos videos={content.videos} />
              </Section>
            </div>
          )}

          {nextLesson && (
            <div id="proxima">
              <Section
                n={11 + Number(hasQuiz) + Number(hasVideos)}
                label="Próxima aula"
                title="Continue sua trilha"
              >
                <div className="flex flex-wrap items-center gap-4 rounded-2 border border-border bg-surface-warm p-5">
                  <div className="min-w-[200px] flex-1">
                    <p className="font-serif text-lg font-medium">
                      {nextLesson.title}
                    </p>
                  </div>
                  <Button href={nextLesson.href} variant="dark">
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
