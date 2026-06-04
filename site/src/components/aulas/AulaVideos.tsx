import type { AulaVideo } from "@/data/aulas/types";

/**
 * Seção "Vídeo aula". Quando ainda não há vídeos, mostra um aviso de
 * "Em breve". Quando houver (até 3), incorpora os players do YouTube.
 * Nada é hospedado no site — só embeds do YouTube.
 */
export function AulaVideos({ videos }: { videos?: AulaVideo[] }) {
  const list = (videos ?? []).slice(0, 3);

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2 border border-dashed border-border bg-surface-warm px-5 py-8 text-center">
        <span className="text-2xl" aria-hidden="true">
          ▶️
        </span>
        <p className="font-serif text-lg font-medium text-ink">
          Vídeo-aula em breve
        </p>
        <p className="max-w-md text-sm text-ink-muted">
          Em breve esta aula vai ter explicações em vídeo no YouTube para você
          assistir junto com o conteúdo escrito.
        </p>
        <span className="mt-1 inline-flex items-center rounded-full bg-amber-soft px-3 py-1 text-xs font-semibold text-amber-ink">
          Em breve
        </span>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {list.map((v) => (
        <figure key={v.youtubeId} className="overflow-hidden rounded-2 border border-border bg-surface-ink">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
              title={v.titulo}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <figcaption className="px-4 py-2.5 text-sm font-medium text-ink-on-dark">
            {v.titulo}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
