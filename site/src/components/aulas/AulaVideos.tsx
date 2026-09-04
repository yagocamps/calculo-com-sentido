import type { AulaVideo } from "@/data/aulas/types";

/** Incorpora até três vídeos do YouTube quando a aula realmente os possui. */
export function AulaVideos({ videos }: { videos?: AulaVideo[] }) {
  const list = (videos ?? []).slice(0, 3);

  if (list.length === 0) return null;

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
