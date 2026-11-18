"use client";

import { createContext, useContext } from "react";

export type RoomStatus = "idle" | "connecting" | "hosting" | "joined";

export type TogetherValue = {
  status: RoomStatus;
  roomCode: string | null;
  members: number;
  error: string | null;
  createRoom: () => void;
  joinRoom: (code: string) => void;
  leaveRoom: () => void;
};

export const TogetherContext = createContext<TogetherValue | null>(null);

export function useTogether() {
  const value = useContext(TogetherContext);
  if (!value) throw new Error("useTogether precisa estar dentro de TogetherProvider");
  return value;
}

export function roomHref(code: string) {
  return `/juntos/${code}`;
}
