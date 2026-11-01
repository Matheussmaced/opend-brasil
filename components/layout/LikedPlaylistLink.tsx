"use client";

import Link from "next/link";
import { useLikes } from "@/lib/likes";
import { HeartIcon } from "../ui/icons";

export function LikedPlaylistLink() {
  const count = useLikes().length;
  return (
    <Link
      href="/curtidas"
      className="group flex items-center gap-3 rounded-xl border-2 border-ink-700 bg-ink-800/60 p-2 transition hover:border-sakura"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-linear-to-br from-sakura to-ink-700 transition group-hover:-rotate-6">
        <HeartIcon filled width={20} height={20} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold">Músicas curtidas</span>
        <span className="block text-xs text-ink-300">Playlist · {count} músicas</span>
      </span>
    </Link>
  );
}
