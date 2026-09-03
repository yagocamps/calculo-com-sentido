import Link from "next/link";
import { HeroCtas } from "@/components/home/HeroCtas";
import { ReviewTodayBanner } from "@/components/home/ReviewTodayBanner";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Tag } from "@/components/ui/Tag";
import {
  homeAudience,
  homeBenefits,
  homeLessonModel,
  homeMission,
  homePaths,
  homeProblem,
  homeSocialProof,
  homeSolution,
} from "@/data/home";
import { countPublishedLessons } from "@/lib/progress-utils";
import { cn } from "@/lib/utils";

export function HomePageContent() {
  const sections = [
    HeroSection,
    ReviewTodayBanner,
    SocialProofSection,
    MissionSection,
    ProblemSection,
    SolutionSection,
    PathsSection,
    LessonsSection,
    BenefitsSection,
    AudienceSection,
    FinalCtaSection,
  ];
  return (
    <PageShell crumbs={["Início"]}>
      <div className="mx-auto max-w-[1080px] space-y-[22px]">
        {sections.map((Section, i) => (
          <div
            key={i}
            className="ccs-fade-up"
            style={{ "--fade-order": i } as React.CSSProperties}
          >
            <Section />
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3 border border-border bg-gradient-to-br from-surface-warm to-terracotta-soft px-9 py-10 md:px-11 md:py-11">
      <div
        className="pointer-events-none absolute -right-10 -top-8 select-none font-serif text-[280px] italic leading-none text-terracotta-ink/10"
        aria-hidden
      >
        ∫ƒ
      </div>

      <p className="relative font-serif text-lg font-medium tracking-tight text-terracotta-ink">
        Cálculo com Sentido
      </p>

      <span className="relative mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
        Para quem chega à faculdade com medo de Cálculo
      </span>

      <h1 className="relative mt-4 max-w-[720px] text-balance font-serif text-[46px] font-medium leading-[1.05] tracking-tight text-ink">
        Aprenda Pré-Cálculo e Cálculo 1 de forma{" "}
        <em className="italic text-terracotta">simples</em>, aplicada e progressiva.
      </h1>

      <p className="relative mt-3.5 max-w-[640px] text-base leading-relaxed text-ink-muted">
        Ideal para quem saiu do ensino médio com dificuldade e quer entrar na
        faculdade com mais confiança. Antes de cobrar a fórmula, mostramos o
        sentido. Antes de ensinar o cálculo, mostramos onde ele aparece na vida
        real.
      </p>

      <HeroCtas />
    </section>
  );
}

function SocialProofSection() {
  const published = countPublishedLessons();
  const bullets = [
    `${published} aulas com conteúdo publicado nas trilhas`,
    ...homeSocialProof,
  ];
  return (
    <section
      className="flex flex-wrap gap-x-6 gap-y-2 rounded-2 border border-border bg-surface px-6 py-4 text-sm text-ink-muted"
      aria-label="Destaques do conteúdo"
    >
      {bullets.map((item) => (
        <p key={item} className="flex items-center gap-2">
          <span className="text-sage" aria-hidden>
            ✓
          </span>
          {item}
        </p>
      ))}
    </section>
  );
}

function MissionSection() {
  return (
    <section className="rounded-3 border border-border bg-surface px-8 py-8 md:px-10">
      <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
        Missão
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium tracking-tight">
        Mudar a forma como você encara Cálculo na faculdade
      </h2>
      <div className="mt-5 space-y-3 border-l-4 border-terracotta pl-6">
        {homeMission.quote.map((line) => (
          <p key={line} className="font-serif text-lg leading-relaxed text-ink-muted">
            {line}
          </p>
        ))}
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-ink">{homeMission.closing}</p>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_280px]">
      <div className="rounded-3 border border-border bg-surface-warm px-8 py-8">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
          O problema
        </p>
        <h2 className="mt-2 font-serif text-[28px] font-medium tracking-tight">
          {homeProblem.title}
        </h2>
        {homeProblem.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            {p}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {homeProblem.stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2 border border-border bg-surface p-4 shadow-sm"
          >
            <p className="font-serif text-2xl font-medium tracking-tight text-terracotta">
              {s.value}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SolutionSection() {
  return (
    <section className="rounded-3 border border-border bg-surface px-8 py-8 md:px-10">
      <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-sage-ink">
        A solução
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium tracking-tight">
        {homeSolution.title}
      </h2>
      {homeSolution.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
          {p}
        </p>
      ))}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {homeSolution.pillars.map((pillar) => (
          <Callout key={pillar.title} variant="idea" label={pillar.title}>
            {pillar.desc}
          </Callout>
        ))}
      </div>
    </section>
  );
}

function PathsSection() {
  return (
    <section id="trilhas" className="scroll-mt-6">
      <div className="mb-3.5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
            Trilhas
          </p>
          <h2 className="font-serif text-[28px] font-medium tracking-tight">
            Escolha por onde começar
          </h2>
        </div>
        <Button href="/teste-de-nivel" variant="soft" size="sm">
          Não sei por onde → teste de nível
        </Button>
      </div>
      <div className="grid gap-3.5 md:grid-cols-2">
        {homePaths.map((path) => (
          <PathCard key={path.title} {...path} />
        ))}
      </div>
    </section>
  );
}

function PathCard({
  title,
  tag,
  tagTone,
  meta,
  desc,
  href,
  accent,
}: (typeof homePaths)[number]) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2 border border-border bg-surface p-[22px] shadow-sm border-l-[3px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        accent,
      )}
    >
      <div className="flex items-center gap-2.5">
        <Tag tone={tagTone}>{tag}</Tag>
        <span className="text-xs text-ink-subtle">{meta}</span>
      </div>
      <h3 className="font-serif text-[22px] font-medium tracking-tight">{title}</h3>
      <p className="text-[13.5px] leading-relaxed text-ink-muted">{desc}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <Button href={href} variant="dark">
          Acessar trilha →
        </Button>
        <Link
          href={href}
          className="text-[13px] font-semibold text-ink-muted hover:text-terracotta"
        >
          Ver módulos
        </Link>
      </div>
    </div>
  );
}

function LessonsSection() {
  return (
    <section className="rounded-3 border border-border bg-gradient-to-br from-surface-soft to-sky-soft/40 px-8 py-8 md:px-10">
      <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-sky-ink">
        Como são as aulas
      </p>
      <h2 className="mt-2 max-w-xl font-serif text-[28px] font-medium tracking-tight">
        {homeLessonModel.title}
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
        {homeLessonModel.subtitle}
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ol className="grid gap-2 sm:grid-cols-2">
          {homeLessonModel.steps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-terracotta-soft font-mono text-[10px] font-bold text-terracotta-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug text-ink">{step}</span>
            </li>
          ))}
        </ol>

        <div className="space-y-3">
          <Callout variant="apply" label="Exemplos de aplicação">
            <ul className="space-y-2 text-[13px]">
              {homeLessonModel.examples.map((ex) => (
                <li key={ex.topic}>
                  <b>{ex.topic}</b>
                  <span className="opacity-80"> · {ex.apps}</span>
                </li>
              ))}
            </ul>
          </Callout>
          <Button href="/pre-calculo/funcoes/funcao-afim" variant="primary">
            Ver aula modelo: Função afim →
          </Button>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section>
      <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
        Benefícios
      </p>
      <h2 className="mt-2 font-serif text-[28px] font-medium tracking-tight">
        Por que estudar aqui
      </h2>
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {homeBenefits.map((b) => (
          <div
            key={b.num}
            className="rounded-2 border border-border bg-surface p-[18px]"
          >
            <div className="font-serif text-[13px] font-semibold tracking-wide text-terracotta">
              {b.num}
            </div>
            <div className="mt-1.5 font-serif text-[17px] font-medium tracking-tight">
              {b.title}
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="rounded-3 bg-surface-ink p-7 text-ink-on-dark md:p-8">
      <p className="font-serif text-[11px] uppercase tracking-[0.18em] opacity-60">
        Para quem é este site
      </p>
      <div className="mt-4 grid gap-8 md:grid-cols-3">
        {homeAudience.map((a) => (
          <div key={a.title} className="flex flex-col">
            <div className="font-serif text-[19px] font-medium">{a.title}</div>
            <p className="mt-1 flex-1 text-[13px] leading-relaxed opacity-75">
              {a.desc}
            </p>
            <Button
              href={a.href}
              variant="ghost"
              size="sm"
              className="mt-4 !border-white/20 !bg-white/10 !text-ink-on-dark hover:!bg-white/15"
            >
              {a.cta} →
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="flex flex-col items-center rounded-3 border border-border bg-surface-warm px-8 py-10 text-center">
      <h2 className="max-w-lg text-balance font-serif text-3xl font-medium tracking-tight">
        Pronto para descobrir por onde começar?
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        O teste de nível leva poucos minutos e sugere Pré-Cálculo, Cálculo 1 ou
        uma revisão pontual.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Button href="/teste-de-nivel" size="lg">
          Descobrir por onde começar (2 min) →
        </Button>
        <Button href="/pre-calculo" variant="ghost" size="lg">
          Revisar a base do zero →
        </Button>
      </div>
    </section>
  );
}
