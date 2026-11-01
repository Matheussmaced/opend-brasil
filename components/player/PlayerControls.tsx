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
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 sm:gap-3">
        <IconButton label="Aleatório" active={shuffle} onClick={toggleShuffle} className="max-sm:hidden">
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
          className="max-sm:hidden"
        >
          <RepeatIcon width={18} height={18} />
          {repeat === "one" && <span className="absolute right-0.5 top-0.5 text-[9px] font-bold">1</span>}
        </IconButton>
      </div>
      <div className="w-full max-w-xl max-sm:hidden">
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
      className="grid size-9 place-items-center rounded-full bg-white text-black transition hover:scale-105 disabled:opacity-40"
    >
      {isPlaying && buffering ? (
        <span className="size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
      ) : isPlaying ? (
        <PauseIcon width={18} height={18} />
      ) : (
        <PlayIcon width={18} height={18} />
      )}
    </button>
  );
}
