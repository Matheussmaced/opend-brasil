"use client";

import { formatTime } from "@/lib/format";
import { Slider } from "../ui/Slider";
import { usePlaybackTime, usePlayer } from "./PlayerContext";

export function PlayerProgress() {
  const { seek, current } = usePlayer();
  const { time, duration } = usePlaybackTime();

  return (
    <div className="flex w-full items-center gap-2 font-mono text-[11px] text-ink-300">
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
    <div className="absolute inset-x-0 bottom-0 h-1 bg-ink-800 lg:hidden">
      <div className="h-full bg-linear-to-r from-sakura to-neon" style={{ width: `${percent}%` }} />
    </div>
  );
}
