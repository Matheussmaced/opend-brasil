"use client";

import { createContext, useContext } from "react";
import type { Track } from "@/lib/types";

export type PlayerSnapshot = {
  queue: Track[];
  index: number;
  playing: boolean;
  time: number;
  ended: boolean;
};

export type PlayerSync = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => PlayerSnapshot;
  applySnapshot: (snapshot: PlayerSnapshot) => boolean;
  setFollower: (follower: boolean) => void;
};

export const PlayerSyncContext = createContext<PlayerSync | null>(null);

export function usePlayerSync() {
  const sync = useContext(PlayerSyncContext);
  if (!sync) throw new Error("usePlayerSync precisa estar dentro de PlayerProvider");
  return sync;
}
