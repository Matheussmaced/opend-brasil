import type { Track } from "@/lib/types";

export type Repeat = "off" | "all" | "one";

export type QueueState = {
  queue: Track[];
  index: number;
  playToken: number;
  shuffle: boolean;
  repeat: Repeat;
};

export type QueueAction =
  | { type: "play"; tracks: Track[]; start: number }
  | { type: "enqueue"; track: Track }
  | { type: "remove"; index: number }
  | { type: "jump"; index: number }
  | { type: "toggleShuffle" }
  | { type: "cycleRepeat" };

const NEXT_REPEAT: Record<Repeat, Repeat> = { off: "all", all: "one", one: "off" };

export const initialQueueState: QueueState = {
  queue: [],
  index: 0,
  playToken: 0,
  shuffle: false,
  repeat: "off",
};

export function queueReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case "play":
      return { ...state, queue: action.tracks, index: action.start, playToken: state.playToken + 1 };
    case "enqueue":
      return state.queue.length
        ? { ...state, queue: [...state.queue, action.track] }
        : { ...state, queue: [action.track], index: 0, playToken: state.playToken + 1 };
    case "remove":
      if (action.index === state.index) return state;
      return {
        ...state,
        queue: state.queue.filter((_, i) => i !== action.index),
        index: action.index < state.index ? state.index - 1 : state.index,
      };
    case "jump":
      return { ...state, index: action.index, playToken: state.playToken + 1 };
    case "toggleShuffle":
      return { ...state, shuffle: !state.shuffle };
    case "cycleRepeat":
      return { ...state, repeat: NEXT_REPEAT[state.repeat] };
  }
}

export function nextIndex({ queue, index, shuffle, repeat }: QueueState, auto: boolean): number | null {
  const size = queue.length;
  if (!size) return null;
  if (shuffle && size > 1) {
    const offset = 1 + Math.floor(Math.random() * (size - 1));
    return (index + offset) % size;
  }
  if (index + 1 < size) return index + 1;
  return auto && repeat === "off" ? null : 0;
}

export function previousIndex({ queue, index }: QueueState): number | null {
  if (!queue.length) return null;
  return index > 0 ? index - 1 : queue.length - 1;
}
