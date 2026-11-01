"use client";

import { formatTime } from "@/lib/format";
import { Slider } from "../ui/Slider";
import { usePlaybackTime, usePlayer } from "./PlayerContext";

export function PlayerProgress() {
  const { seek, current } = usePlayer();
  const { time, duration } = usePlaybackTime();

  return (
    <div className="flex w-full items-center gap-2 text-[11px] tabular-nums text-zinc-400">
      <span className="w-10 text-right">{formatTime(time)}</span>
      <Slider
        label="Posição"
        value={Math.min(time, duration)}
        max={duration}
        step={0.1}
        disabled={!current}
        onChange={seek}
        className="flex-1"
      />
      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
}

export function MobileProgress() {
  const { time, duration } = usePlaybackTime();
  const percent = duration ? (time / duration) * 100 : 0;

  return (
    <div className="absolute inset-x-0 top-0 h-0.5 bg-zinc-800 sm:hidden">
      <div className="h-full bg-rose-500" style={{ width: `${percent}%` }} />
    </div>
  );
}
