"use client";

import { useState } from "react";
import type { Track } from "@/lib/types";
import { PlaylistAddIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { AddToPlaylistDialog } from "./AddToPlaylistDialog";

export function AddToPlaylistButton({ track, className = "" }: { track: Track; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton label="Adicionar à playlist" onClick={() => setOpen(true)} className={className}>
        <PlaylistAddIcon width={18} height={18} />
      </IconButton>
      {open && <AddToPlaylistDialog track={track} onClose={() => setOpen(false)} />}
    </>
  );
}
