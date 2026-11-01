"use client";

import { createContext, useContext } from "react";
import type { Track } from "@/lib/types";
import type { Repeat } from "./queue-reducer";

export type Mode = "audio" | "video";

export type PlayerValue = {
  queue: Track[];
  index: number;
  current: Track | null;
  isPlaying: boolean;
  mode: Mode;
  shuffle: boolean;
  repeat: Repeat;
  volume: number;
  muted: boolean;
  showQueue: boolean;
  playTracks: (tracks: Track[], start?: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  jumpTo: (index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setMode: (mode: Mode) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setShowQueue: (show: boolean) => void;
};

export type PlaybackTime = { time: number; duration: number; buffering: boolean };

export const PlayerContext = createContext<PlayerValue | null>(null);

export const PlaybackTimeContext = createContext<PlaybackTime>({ time: 0, duration: 0, buffering: false });

export function usePlayer() {
  const player = useContext(PlayerContext);
  if (!player) throw new Error("usePlayer precisa estar dentro de <PlayerProvider>");
  return player;
}

export function usePlaybackTime() {
  return useContext(PlaybackTimeContext);
}
