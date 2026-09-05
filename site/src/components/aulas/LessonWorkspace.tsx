"use client";

import { useEffect, useState } from "react";
import {
  getProgress,
  saveLessonNote,
  toggleLessonFavorite,
} from "@/lib/progress";

export function LessonWorkspace({
  lessonPathId,
}: {
  lessonPathId: string;
}) {
  const [favorite, setFavorite] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- preferências desta aula vivem no localStorage
    setFavorite(progress.favoriteLessons.includes(lessonPathId));
    setNote(progress.lessonNotes[lessonPathId] ?? "");
  }, [lessonPathId]);

  const persistNote = () => {
    saveLessonNote(lessonPathId, note);
    setSaved(true);
  };

  return (
    <details className="mt-4 rounded-2 border border-border bg-surface-soft px-4 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-ink">
        Minha área de estudo
        <span className="ml-2 font-normal text-ink-muted">
          · favorito e anotação
        </span>
      </summary>
      <div className="mt-3 grid gap-3 lg:grid-cols-[auto_1fr] lg:items-start">
        <button
          type="button"
          aria-pressed={favorite}
          onClick={() => setFavorite(toggleLessonFavorite(lessonPathId))}
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-terracotta transition-colors hover:border-terracotta"
        >
          {favorite ? "★ Aula favoritada" : "☆ Adicionar aos favoritos"}
        </button>
        <div>
          <label
            htmlFor={`note-${lessonPathId.replaceAll("/", "-")}`}
            className="text-xs font-semibold text-ink-muted"
          >
            Anotação pessoal
          </label>
          <textarea
            id={`note-${lessonPathId.replaceAll("/", "-")}`}
            value={note}
            maxLength={1500}
            rows={3}
            onChange={(event) => {
              setNote(event.target.value);
              setSaved(false);
            }}
            onBlur={persistNote}
            placeholder="Registre uma dúvida, uma descoberta ou o ponto que deseja revisar."
            className="mt-1 w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-subtle focus-visible:border-terracotta"
          />
          <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-ink-subtle">
            <span>{note.length}/1500 caracteres</span>
            <button
              type="button"
              onClick={persistNote}
              className="font-semibold text-terracotta hover:underline"
            >
              Salvar anotação
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {saved ? "Anotação salva neste navegador." : ""}
          </p>
        </div>
      </div>
    </details>
  );
}
