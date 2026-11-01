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

const HOVER_ONLY = "opacity-0 group-hover:opacity-100 max-sm:hidden";

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
      className={`group grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-md px-2 py-2 hover:bg-white/10 sm:grid-cols-[2rem_1fr_1fr_auto] ${
        isCurrent ? "bg-white/5" : ""
      }`}
    >
      <button
        type="button"
        onClick={play}
        aria-label={isActive ? "Pausar" : `Tocar ${track.title}`}
        className="grid size-8 place-items-center text-sm tabular-nums text-zinc-400"
      >
        <span className={`group-hover:hidden ${isCurrent ? "text-rose-400" : ""}`}>
          {isActive ? <Equalizer /> : position}
        </span>
        <span className="hidden text-white group-hover:block">
          {isActive ? <PauseIcon width={16} height={16} /> : <PlayIcon width={16} height={16} />}
        </span>
      </button>

      <div className="flex min-w-0 items-center gap-3">
        {showCover && <Cover src={track.cover} alt="" width={40} className="size-10 rounded" />}
        <div className="min-w-0">
          <p className={`truncate font-medium ${isCurrent ? "text-rose-400" : ""}`}>{track.title}</p>
          <p className="truncate text-sm text-zinc-400">
            <TypeBadge type={track.type}>{track.label}</TypeBadge>
            {track.spoiler && <span className="mr-1 text-[10px] uppercase text-amber-400">spoiler</span>}
            {track.artists}
          </p>
        </div>
      </div>

      <div className="min-w-0 truncate text-sm text-zinc-400 max-sm:hidden">
        {showAnime ? (
          <Link href={`/anime/${track.animeSlug}`} className="hover:text-white hover:underline">
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
          className={liked ? "" : "sm:opacity-0 sm:group-hover:opacity-100"}
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
