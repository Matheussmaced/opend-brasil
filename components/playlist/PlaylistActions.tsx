"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deletePlaylist, renamePlaylist, type Playlist } from "@/lib/playlists";
import { PencilIcon, TrashIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { PlaylistNameForm } from "./PlaylistNameForm";
import { ShareButton } from "./ShareButton";

export function PlaylistActions({ playlist }: { playlist: Playlist }) {
  const router = useRouter();
  const [renaming, setRenaming] = useState(false);

  const rename = (name: string) => {
    renamePlaylist(playlist.id, name);
    setRenaming(false);
  };

  const remove = () => {
    if (!confirm(`Apagar a playlist “${playlist.name}”?`)) return;
    router.replace("/");
    deletePlaylist(playlist.id);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ShareButton playlist={playlist} />
      <IconButton label="Renomear" active={renaming} onClick={() => setRenaming(!renaming)}>
        <PencilIcon width={18} height={18} />
      </IconButton>
      <IconButton label="Apagar playlist" onClick={remove} className="hover:text-sakura">
        <TrashIcon width={18} height={18} />
      </IconButton>
      {renaming && (
        <div className="w-full max-w-md">
          <PlaylistNameForm submitLabel="Salvar" initialName={playlist.name} onSubmit={rename} />
        </div>
      )}
    </div>
  );
}
