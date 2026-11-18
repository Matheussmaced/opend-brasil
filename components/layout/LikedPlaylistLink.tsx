"use client";

import { useLikes } from "@/lib/likes";
import { HeartIcon } from "../ui/icons";
import { LibraryLink } from "./LibraryLink";

export function LikedPlaylistLink() {
  const count = useLikes().length;
  return (
    <LibraryLink
      href="/curtidas"
      title="Músicas curtidas"
      subtitle={`Playlist · ${count} músicas`}
      artwork={
        <span className="grid size-12 place-items-center rounded-lg bg-linear-to-br from-sakura to-ink-700">
          <HeartIcon filled width={20} height={20} />
        </span>
      }
    />
  );
}
