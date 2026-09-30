"use client";

import { useRef, useState } from "react";
import { RichText } from "@/components/aulas/RichText";

/** A single lesson pilot. Rendering happens offline; students only load video. */
export function SecantAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const buttonClass = "rounded-lg border border-border px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky";

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    try {
      if (video.ended) video.currentTime = 0;
      await video.play();
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  return (
    <section id="animacao-secante" aria-labelledby="animacao-secante-title" className="my-5 min-w-0 scroll-mt-24 rounded-xl border border-border bg-surface p-4">
      <div className="mb-3">
        <h3 id="animacao-secante-title" className="font-serif text-xl font-semibold">Veja a secante se aproximar da tangente</h3>
        <p id="animacao-secante-description" className="mt-1 text-sm leading-relaxed text-ink-muted">
          <RichText>{String.raw`Em \(f(x)=x^2\), fixamos \(P=(2,4)\) e aproximamos o segundo ponto. Observe como a inclinação muda. A animação dura cerca de 30 segundos, sem áudio.`}</RichText>
        </p>
      </div>
      <video
        ref={videoRef}
        controls
        playsInline
        preload="none"
        poster="/animations/secante-tangente-v1.jpg"
        aria-label="Animação: da secante à tangente de x ao quadrado em x igual a 2"
        aria-describedby="animacao-secante-description animacao-secante-summary"
        className="aspect-[48/31] w-full rounded-lg bg-[#10151c]"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src="/animations/secante-tangente-v1.mp4" type="video/mp4" />
        <track kind="captions" src="/animations/secante-tangente-v1.vtt" srcLang="pt-BR" label="Português" />
        Seu navegador não suporta este vídeo. A descrição completa está abaixo.
      </video>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={togglePlayback} className={`${buttonClass} bg-sky-soft text-sky-ink`}>
          {playing ? "Pausar animação" : "Reproduzir animação"}
        </button>
        <button type="button" onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          video.pause();
          video.currentTime = 0;
        }} className={buttonClass}>Voltar ao início</button>
        <label className="ml-auto flex items-center gap-2 text-sm text-ink-muted">
          Velocidade
          <select defaultValue="1" className="rounded-lg border border-border bg-paper px-2 py-2 text-ink" onChange={(event) => {
            if (videoRef.current) videoRef.current.playbackRate = Number(event.target.value);
          }}>
            <option value="0.5">0,5×</option>
            <option value="1">1×</option>
            <option value="1.5">1,5×</option>
          </select>
        </label>
      </div>
      {failed && <p role="status" className="mt-3 text-sm text-ink-muted">Não foi possível reproduzir a animação. Você pode acompanhar a descrição abaixo.</p>}
      <p id="animacao-secante-summary" className="mt-4 text-sm leading-relaxed">
        <RichText>{String.raw`A ideia central: para \(h\ne0\), a secante tem inclinação \(m=4+h\). Quando \(h\to0\), essa inclinação tende a \(4\), que é \(f'(2)\).`}</RichText>
      </p>
      <details className="mt-3 border-t border-border pt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-ink-muted">Ler a descrição da animação</summary>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed">
          <li><RichText>{String.raw`O gráfico azul é \(f(x)=x^2\). A secante laranja passa por \(P=(2,4)\) e \(Q=(4,16)\). Com \(h=2\), sua inclinação é \(6\).`}</RichText></li>
          <li><RichText>{String.raw`Q se aproxima de P pela direita. Para \(h=1\), a inclinação vale \(5\); para \(h=0{,}5\), vale \(4{,}5\).`}</RichText></li>
          <li><RichText>{String.raw`Com \(h=0{,}05\), a inclinação ainda é \(4{,}05\). A secante está próxima da tangente verde, mas ainda é uma secante.`}</RichText></li>
          <li><RichText>{String.raw`No limite \(h\to0\), obtemos a tangente \(y=4x-4\) e a derivada \(f'(2)=4\). Não substituímos \(h=0\) no quociente. Para esta parábola, a aproximação pela esquerda dá o mesmo limite.`}</RichText></li>
        </ol>
      </details>
    </section>
  );
}
