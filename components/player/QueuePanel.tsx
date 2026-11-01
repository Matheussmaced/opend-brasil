"use client";

import { Cover } from "../ui/Cover";
import { CloseIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { usePlayer } from "./PlayerContext";

export function QueuePanel() {
  const { queue, index, showQueue, setShowQueue, jumpTo, removeFromQueue } = usePlayer();
  if (!showQueue) return null;

  return (
    <aside className="fixed inset-x-2 top-2 bottom-player z-45 flex flex-col sm:inset-x-auto sm:top-4 sm:right-4 sm:w-80 rounded-2xl border-2 border-neon bg-ink-900/95 shadow-panel backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-display tracking-wide">
          Fila <span className="ml-1 text-xs text-sakura-soft">キュー</span>
        </h2>
        <IconButton label="Fechar fila" onClick={() => setShowQueue(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <ol className="flex-1 overflow-y-auto px-2 pb-2">
        {queue.length === 0 && <p className="px-2 text-sm text-ink-300">A fila está vazia.</p>}
        {queue.map((track, i) => (
          <li
            key={`${track.id}-${i}`}
            className={`group flex items-center gap-2 rounded-lg border-l-4 px-2 py-1.5 hover:bg-white/5 ${
              i === index ? "border-sakura bg-sakura/10" : "border-transparent"
            }`}
          >
            <button
              type="button"
              onClick={() => jumpTo(i)}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              <Cover src={track.cover} alt="" width={40} className="size-10 rounded-md" />
              <span className="min-w-0">
                <span className={`block truncate text-sm font-bold ${i === index ? "text-sakura" : ""}`}>
                  {track.title}
                </span>
                <span className="block truncate text-xs text-ink-300">
                  {track.label} · {track.animeName}
                </span>
              </span>
            </button>
            {i !== index && (
              <IconButton
                label="Remover da fila"
                onClick={() => removeFromQueue(i)}
                className="pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100"
              >
                <CloseIcon width={16} height={16} />
              </IconButton>
            )}
          </li>
        ))}
      </ol>
    </aside>
  );
}
