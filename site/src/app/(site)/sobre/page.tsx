import { PageShell } from "@/components/layout/PageShell";

export const metadata = { title: "Sobre o projeto" };

export default function SobrePage() {
  return (
    <PageShell crumbs={["Início", "Sobre o projeto"]}>
      <article className="mx-auto max-w-[760px]">
        <span className="font-serif text-[13px] italic tracking-wide text-terracotta">
          Nossa missão
        </span>
        <h1 className="mt-2 text-balance font-serif text-5xl font-medium leading-[1.05] tracking-tight">
          Cálculo 1 não precisa ser um pesadelo no primeiro semestre
        </h1>
        <p className="mt-4 font-serif text-lg leading-relaxed text-ink-muted text-pretty">
          Muitos alunos não reprovam porque são incapazes, mas porque chegam sem
          base sólida e sem entender o sentido do conteúdo. Este site existe para
          mudar essa realidade.
        </p>

        <blockquote className="my-8 rounded-r-2 border-l-4 border-terracotta bg-surface-warm py-5 pl-7 pr-6 font-serif text-[26px] italic leading-snug text-balance">
          Antes de ensinar a fórmula, ensine o sentido. Antes de cobrar o cálculo,
          mostre a aplicação.
        </blockquote>

        <section className="mt-10">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-terracotta">
            Princípios pedagógicos
          </p>
          <h2 className="mt-2 font-serif text-[28px] font-medium tracking-tight">
            Toda explicação responde cinco perguntas
          </h2>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "O que é isso?",
              "Para que serve?",
              "Onde aparece na prática?",
              "Como eu uso?",
              "O que o resultado significa?",
            ].map((q, i) => (
              <div
                key={q}
                className="rounded-2 border border-border bg-surface p-4 shadow-sm"
              >
                <span className="font-serif text-[11px] italic tracking-wide text-terracotta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-medium leading-snug">{q}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-[28px] font-medium tracking-tight">
            Como o site evolui
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed">
            A Etapa 1 montou a base (navegação, trilhas, modelos). A Etapa 2
            completou a página inicial com missão, problema, solução e benefícios.
            Em seguida: teste de nível interativo, aulas em Markdown e progresso
            no navegador.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
