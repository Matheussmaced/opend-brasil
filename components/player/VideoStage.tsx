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
        isOpen
          ? "fixed inset-x-0 top-0 bottom-player z-40 flex flex-col md:left-56 lg:left-64 bg-ink-950/95 bg-speedlines backdrop-blur"
          : "hidden"
      }
    >
      {isOpen && (
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-widest text-neon">
              {current.label} · {current.animeName}
            </p>
            <h2 className="truncate font-display text-lg tracking-wide sm:text-2xl">{current.title}</h2>
            <p className="truncate text-sm text-ink-300">{current.artists}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/anime/${current.animeSlug}`} onClick={close} className={`${pillClass("outline")} max-sm:hidden`}>
              Ver anime
            </Link>
            <IconButton label="Fechar vídeo" onClick={close}>
              <CloseIcon width={24} height={24} />
            </IconButton>
          </div>
        </div>
      )}
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center px-2 pb-4 sm:px-6">
        <div className="size-full overflow-hidden rounded-2xl border-2 border-sakura bg-black shadow-panel-neon">
          {children}
        </div>
      </div>
    </div>
  );
}
