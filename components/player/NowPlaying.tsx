"use client";

import Link from "next/link";
import { toggleLike, useIsLiked } from "@/lib/likes";
import type { Track } from "@/lib/types";
import { Cover } from "../ui/Cover";
import { HeartIcon, MusicIcon, VideoIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { TypeBadge } from "../track/TypeBadge";
import { usePlayer } from "./PlayerContext";

export function NowPlaying() {
  const { current } = usePlayer();
  return current ? <CurrentTrack track={current} /> : <EmptyState />;
}

function CurrentTrack({ track }: { track: Track }) {
  const { mode, setMode } = usePlayer();
  const liked = useIsLiked(track.id);

  return (
    <div className="flex min-w-0 items-center gap-3">
      <button
        type="button"
        onClick={() => setMode(mode === "video" ? "audio" : "video")}
        className="group relative shrink-0"
        aria-label="Alternar vídeo"
      >
        <Cover src={track.cover} alt={track.animeName} width={56} className="size-14 rounded" />
        <span className="absolute inset-0 hidden place-items-center rounded bg-black/60 group-hover:grid">
          <VideoIcon />
        </span>
      </button>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{track.title}</p>
        <p className="truncate text-xs text-zinc-400">
          <TypeBadge type={track.type}>{track.label}</TypeBadge>
          <Link href={`/anime/${track.animeSlug}`} className="hover:underline">
            {track.animeName}
          </Link>{" "}
          · {track.artists}
        </p>
      </div>
      <IconButton
        label={liked ? "Remover das curtidas" : "Curtir"}
        active={liked}
        onClick={() => toggleLike(track)}
        className="max-sm:hidden"
      >
        <HeartIcon filled={liked} width={18} height={18} />
      </IconButton>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-500">
      <div className="grid size-14 place-items-center rounded bg-zinc-900">
        <MusicIcon />
      </div>
      Escolha uma abertura para tocar
    </div>
  );
}
