"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CloseIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { pillClass } from "../ui/PillLink";
import { usePlayer } from "./PlayerContext";

export function VideoStage({ children }: { children: ReactNode }) {
  const { mode, current, setMode } = usePlayer();
  const isOpen = mode === "video" && current !== null;
  const close = () => setMode("audio");

  return (
    <div
      className={
        isOpen ? "fixed inset-x-0 top-0 bottom-player z-40 flex flex-col bg-black/95 backdrop-blur" : "hidden"
      }
    >
      {isOpen && (
        <div className="flex items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-rose-400">
              {current.label} · {current.animeName}
            </p>
            <h2 className="truncate text-xl font-bold">{current.title}</h2>
            <p className="truncate text-sm text-zinc-400">{current.artists}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/anime/${current.animeSlug}`}
              onClick={close}
              className={`${pillClass("outline")} max-sm:hidden`}
            >
              Ver anime
            </Link>
            <IconButton label="Fechar vídeo" onClick={close}>
              <CloseIcon width={24} height={24} />
            </IconButton>
          </div>
        </div>
      )}
      <div className="flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-6">{children}</div>
    </div>
  );
}
