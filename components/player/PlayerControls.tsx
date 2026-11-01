"use client";

import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon, ShuffleIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { usePlaybackTime, usePlayer } from "./PlayerContext";
import { PlayerProgress } from "./PlayerProgress";

const REPEAT_LABEL = { off: "Repetir", all: "Repetir fila", one: "Repetir uma" };

export function PlayerControls() {
  const { current, shuffle, repeat, toggleShuffle, cycleRepeat, prev, next } = usePlayer();
  const disabled = !current;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-0.5 sm:gap-2 lg:gap-3">
        <IconButton label="Aleatório" active={shuffle} onClick={toggleShuffle} className="max-lg:hidden">
          <ShuffleIcon width={18} height={18} />
        </IconButton>
        <IconButton label="Anterior" onClick={prev} disabled={disabled} className="max-sm:hidden">
          <PrevIcon />
        </IconButton>
        <PlayPauseButton />
        <IconButton label="Próxima" onClick={next} disabled={disabled}>
          <NextIcon />
        </IconButton>
        <IconButton
          label={REPEAT_LABEL[repeat]}
          active={repeat !== "off"}
          onClick={cycleRepeat}
          className="max-lg:hidden"
        >
          <RepeatIcon width={18} height={18} />
          {repeat === "one" && <span className="absolute top-0 right-0.5 text-[9px] font-bold">1</span>}
        </IconButton>
      </div>
      <div className="w-full max-w-xl max-lg:hidden">
        <PlayerProgress />
      </div>
    </div>
  );
}

function PlayPauseButton() {
  const { current, isPlaying, toggle } = usePlayer();
  const { buffering } = usePlaybackTime();

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!current}
      aria-label={isPlaying ? "Pausar" : "Tocar"}
      className="mx-1 grid size-10 rotate-45 place-items-center rounded-lg bg-linear-to-br from-sakura to-neon text-ink-950 shadow-[0_0_18px_-2px_var(--color-sakura)] transition hover:scale-110 disabled:opacity-40 disabled:shadow-none"
    >
      <span className="-rotate-45">
        {isPlaying && buffering ? (
          <span className="block size-4 animate-spin rounded-full border-2 border-ink-950 border-t-transparent" />
        ) : isPlaying ? (
          <PauseIcon width={18} height={18} />
        ) : (
          <PlayIcon width={18} height={18} />
        )}
      </span>
    </button>
  );
}
