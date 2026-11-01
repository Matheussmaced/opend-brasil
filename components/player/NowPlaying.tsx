"use client";

import Link from "next/link";
import { toggleLike, useIsLiked } from "@/lib/likes";
import type { Track } from "@/lib/types";
import { TypeBadge } from "../track/TypeBadge";
import { HeartIcon, MusicIcon, VideoIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { Disc } from "./Disc";
import { usePlayer } from "./PlayerContext";

export function NowPlaying() {
  const { current } = usePlayer();
  return current ? <CurrentTrack track={current} /> : <EmptyState />;
}

function CurrentTrack({ track }: { track: Track }) {
  const { mode, setMode, isPlaying } = usePlayer();
  const liked = useIsLiked(track.id);

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => setMode(mode === "video" ? "audio" : "video")}
        className="group relative shrink-0"
        aria-label="Alternar vídeo"
      >
        <Disc src={track.cover} alt={track.animeName} spinning={isPlaying} />
        <span className="absolute inset-0 hidden place-items-center rounded-full bg-ink-950/70 text-neon group-hover:grid">
          <VideoIcon />
        </span>
      </button>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{track.title}</p>
        <p className="truncate text-xs text-ink-300">
          <TypeBadge type={track.type}>{track.label}</TypeBadge>
          <Link href={`/anime/${track.animeSlug}`} className="hover:text-neon hover:underline">
            {track.animeName}
          </Link>
        </p>
      </div>
      <IconButton
        label={liked ? "Remover das curtidas" : "Curtir"}
        active={liked}
        onClick={() => toggleLike(track)}
        className="max-md:hidden"
      >
        <HeartIcon filled={liked} width={18} height={18} />
      </IconButton>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center gap-3 text-sm text-ink-300">
      <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-dashed sm:size-14 border-ink-500 text-ink-500">
        <MusicIcon />
      </span>
      <span>
        <span className="block font-bold text-white">Nada tocando</span>
        <span className="block text-xs max-sm:hidden">Escolha uma abertura ♪</span>
      </span>
    </div>
  );
}
