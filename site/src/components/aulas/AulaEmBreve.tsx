import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { TrilhaAula, TrilhaModuloData } from "@/data/trilha-module";

export function AulaEmBreve({
  trilhaLabel,
  trilhaHref,
  moduloPath,
  modeloHref,
  modulo,
  aula,
}: {
  trilhaLabel: string;
  trilhaHref: string;
  moduloPath: string;
  modeloHref: string;
  modulo: TrilhaModuloData;
  aula: TrilhaAula;
}) {
  return (
    <PageShell crumbs={[trilhaLabel, modulo.shortTitle, aula.title]}>
      <div className="mx-auto max-w-[640px]">
        <Card className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
            Conteúdo em produção
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight">
            {aula.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Esta aula faz parte do módulo <b>{modulo.title}</b> e será publicada
            em breve com o modelo completo (12 seções, exercícios e resumo).
          </p>
          <p className="mt-2 text-xs text-ink-subtle">Duração prevista: {aula.duration}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button href={moduloPath} variant="primary">
              Ver aulas do módulo
            </Button>
            <Button href={modeloHref} variant="soft">
              Aula modelo disponível
            </Button>
            <Button href={trilhaHref} variant="ghost">
              Voltar à trilha
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
