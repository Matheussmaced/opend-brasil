import type { Track } from "@/lib/types";
import type { Mode } from "./PlayerContext";

export function sourceFor(track: Track | null, mode: Mode) {
  if (!track) return null;
  return mode === "video" || !track.audioUrl ? track.videoUrl : track.audioUrl;
}
