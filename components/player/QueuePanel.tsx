"use client";

import { Cover } from "../ui/Cover";
import { CloseIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { usePlayer } from "./PlayerContext";

export function QueuePanel() {
  const { queue, index, showQueue, setShowQueue, jumpTo, removeFromQueue } = usePlayer();
  if (!showQueue) return null;

  return (
    <aside className="fixed top-2 right-2 bottom-player z-45 flex w-80 flex-col rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-bold">Fila</h2>
        <IconButton label="Fechar fila" onClick={() => setShowQueue(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <ol className="flex-1 overflow-y-auto px-2 pb-2">
        {queue.length === 0 && <p className="px-2 text-sm text-zinc-500">A fila está vazia.</p>}
        {queue.map((track, i) => (
          <li key={`${track.id}-${i}`} className="group flex items-center gap-2 rounded px-2 py-1.5 hover:bg-zinc-900">
            <button
              type="button"
              onClick={() => jumpTo(i)}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              <Cover src={track.cover} alt="" width={40} className="size-10 rounded" />
              <span className="min-w-0">
                <span className={`block truncate text-sm ${i === index ? "text-rose-400" : ""}`}>{track.title}</span>
                <span className="block truncate text-xs text-zinc-500">
                  {track.label} · {track.animeName}
                </span>
              </span>
            </button>
            {i !== index && (
              <IconButton
                label="Remover da fila"
                onClick={() => removeFromQueue(i)}
                className="opacity-0 group-hover:opacity-100"
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
