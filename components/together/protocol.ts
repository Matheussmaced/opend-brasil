import type { Track } from "@/lib/types";
import type { PlayerSnapshot } from "../player/PlayerSyncContext";
import { isRecord, toSafeTrack } from "./safe-track";

const MAX_QUEUE = 500;
const ECHO_TOLERANCE_SECONDS = 3;

export const ROOM_CODE = /^[a-z0-9]{6}$/;

export type RoomMessage = { type: "sync"; snapshot: PlayerSnapshot } | { type: "members"; count: number };

function parseQueue(value: unknown): Track[] | null {
  if (!Array.isArray(value) || value.length > MAX_QUEUE) return null;
  const tracks = value.map(toSafeTrack);
  return tracks.every((t) => t !== null) ? tracks : null;
}

function parseSnapshot(value: unknown): PlayerSnapshot | null {
  if (!isRecord(value)) return null;
  const queue = parseQueue(value.queue);
  const { index, time, playing } = value;
  if (!queue || typeof index !== "number" || typeof time !== "number" || typeof playing !== "boolean") return null;
  if (!Number.isInteger(index) || index < 0 || (queue.length > 0 && index >= queue.length)) return null;
  if (!Number.isFinite(time) || time < 0) return null;
  return { queue, index, time, playing, ended: false };
}

export function parseMessage(data: unknown): RoomMessage | null {
  if (!isRecord(data)) return null;
  if (data.type === "members" && typeof data.count === "number") return { type: "members", count: data.count };
  if (data.type !== "sync") return null;
  const snapshot = parseSnapshot(data.snapshot);
  return snapshot && { type: "sync", snapshot };
}

export function isSameState(local: PlayerSnapshot, shared: PlayerSnapshot, elapsedSeconds: number) {
  const expectedTime = shared.time + (shared.playing ? elapsedSeconds : 0);
  return (
    local.index === shared.index &&
    local.playing === shared.playing &&
    local.queue.length === shared.queue.length &&
    local.queue.every((track, i) => track.id === shared.queue[i].id) &&
    Math.abs(local.time - expectedTime) < ECHO_TOLERANCE_SECONDS
  );
}

export function randomRoomCode() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}
