import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export const metadata = { title: "Resumos rápidos" };

const resumos = [
  {
    titulo: "Função afim",
    trilha: "Pré-Cálculo",
    tempo: "2 min",
    href: "/pre-calculo/funcoes/funcao-afim",
    disponivel: true,
  },
  {
    titulo: "Domínio e imagem",
    trilha: "Pré-Cálculo",
    tempo: "3 min",
    disponivel: false,
  },
  {
    titulo: "Limite intuitivo",
    trilha: "Cálculo 1",
    tempo: "4 min",
    href: "/calculo-1/limites/ideia-de-limite",
    disponivel: true,
  },
];

export default function ResumosPage() {
  return (
    <PageShell crumbs={["Início", "Resumos rápidos"]}>
      <div className="mx-auto max-w-[1080px]">
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          Resumos rápidos
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-muted">
          Revisão em poucos minutos antes da prova. Enquanto a biblioteca de
          resumos cresce, use as aulas completas da trilha.
        </p>

        <Card className="mt-5 border-l-4 border-l-terracotta">
          <p className="text-sm text-ink-muted">
            Resumos em PDF e cards interativos chegam nas próximas etapas. Por
            agora, a melhor revisão é a aula modelo ou qualquer aula já
            publicada na trilha.
          </p>
          <Button href="/pre-calculo/funcoes/funcao-afim" className="mt-4" size="sm">
            Ir à aula modelo →
          </Button>
        </Card>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resumos.map((r) => (
            <Card key={r.titulo} className={!r.disponivel ? "opacity-75" : ""}>
              <Tag tone={r.disponivel ? "sage" : "muted"}>
                {r.disponivel ? r.trilha : "Em breve"}
              </Tag>
              <h2 className="mt-2 font-serif text-xl font-medium">{r.titulo}</h2>
              <p className="mt-2 text-xs text-ink-subtle">Leitura · {r.tempo}</p>
              {r.disponivel && r.href ? (
                <Link
                  href={r.href}
                  className="mt-3 inline-block text-sm font-semibold text-terracotta hover:underline"
                >
                  Ver na trilha →
                </Link>
              ) : (
                <p className="mt-3 text-xs text-ink-subtle">Resumo em breve</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
