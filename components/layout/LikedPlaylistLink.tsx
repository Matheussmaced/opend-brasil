"use client";

import Link from "next/link";
import { useLikes } from "@/lib/likes";
import { HeartIcon } from "../ui/icons";

export function LikedPlaylistLink() {
  const likes = useLikes();
  return (
    <Link href="/curtidas" className="flex items-center gap-3 rounded-md p-2 hover:bg-zinc-800">
      <span className="grid size-12 place-items-center rounded bg-linear-to-br from-rose-600 to-violet-500">
        <HeartIcon filled width={20} height={20} />
      </span>
      <span>
        <span className="block text-sm font-medium">Músicas curtidas</span>
        <span className="block text-xs text-zinc-400">Playlist · {likes.length} músicas</span>
      </span>
    </Link>
  );
}
