"use client";

import Link from "next/link";
import { toggleLike, useIsLiked } from "@/lib/likes";
import type { Track } from "@/lib/types";
import { usePlayer } from "../player/PlayerContext";
import { Cover } from "../ui/Cover";
import { HeartIcon, PauseIcon, PlayIcon, QueueIcon, VideoIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { Equalizer } from "./Equalizer";
import { TypeBadge } from "./TypeBadge";

type TrackRowProps = {
  track: Track;
  position: number;
  showAnime: boolean;
  showCover: boolean;
  onPlay: () => void;
};

const HOVER_ONLY = "max-sm:hidden pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100";

export function TrackRow({ track, position, showAnime, showCover, onPlay }: TrackRowProps) {
  const { current, isPlaying, toggle, addToQueue, setMode } = usePlayer();
  const liked = useIsLiked(track.id);
  const isCurrent = current?.id === track.id;
  const isActive = isCurrent && isPlaying;
  const play = isCurrent ? toggle : onPlay;

  const watch = () => {
    if (!isCurrent) onPlay();
    setMode("video");
  };

  return (
    <li
      onDoubleClick={play}
      className={`group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-xl border-2 px-2 py-2 transition sm:grid-cols-[2.75rem_1fr_1fr_auto] ${
        isCurrent
          ? "border-sakura bg-sakura/10"
          : "border-transparent hover:border-ink-700 hover:bg-ink-800/70"
      }`}
    >
      <button
        type="button"
        onClick={play}
        aria-label={isActive ? "Pausar" : `Tocar ${track.title}`}
        className="grid h-10 place-items-center"
      >
        <span
          className={`font-display text-lg italic group-hover:hidden ${isCurrent ? "text-sakura" : "text-ink-500"}`}
        >
          {isActive ? <Equalizer /> : String(position).padStart(2, "0")}
        </span>
        <span className="hidden size-8 rotate-45 place-items-center rounded-md bg-sakura text-ink-950 group-hover:grid">
          <span className="-rotate-45">
            {isActive ? <PauseIcon width={14} height={14} /> : <PlayIcon width={14} height={14} />}
          </span>
        </span>
      </button>

      <div className="flex min-w-0 items-center gap-3">
        {showCover && <Cover src={track.cover} alt="" width={40} className="size-10 rounded-lg" />}
        <div className="min-w-0">
          <p className={`truncate font-bold ${isCurrent ? "text-sakura" : ""}`}>{track.title}</p>
          <p className="truncate text-sm text-ink-300">
            <TypeBadge type={track.type}>{track.label}</TypeBadge>
            {track.spoiler && <span className="mr-1 text-[10px] font-bold uppercase text-sun">spoiler</span>}
            {track.artists}
          </p>
        </div>
      </div>

      <div className="min-w-0 truncate text-sm text-ink-300 max-sm:hidden">
        {showAnime ? (
          <Link href={`/anime/${track.animeSlug}`} className="hover:text-neon hover:underline">
            {track.animeName}
          </Link>
        ) : (
          track.episodes && `Episódios ${track.episodes}`
        )}
      </div>

      <div className="flex items-center">
        <IconButton
          label={liked ? "Remover das curtidas" : "Curtir"}
          active={liked}
          onClick={() => toggleLike(track)}
          className={liked ? "" : "pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100"}
        >
          <HeartIcon filled={liked} width={18} height={18} />
        </IconButton>
        <IconButton label="Assistir vídeo" onClick={watch} className={HOVER_ONLY}>
          <VideoIcon width={18} height={18} />
        </IconButton>
        <IconButton label="Adicionar à fila" onClick={() => addToQueue(track)} className={HOVER_ONLY}>
          <QueueIcon width={18} height={18} />
        </IconButton>
      </div>
    </li>
  );
}
