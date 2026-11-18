"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePlayerSync, type PlayerSnapshot } from "../player/PlayerSyncContext";
import { isSameState } from "./protocol";

const SEND_DEBOUNCE_MS = 150;
const SUPPRESS_AFTER_REMOTE_MS = 2500;
const HEARTBEAT_MS = 4000;

type Shared = { snapshot: PlayerSnapshot; at: number };

type SnapshotSyncOptions = {
  active: boolean;
  isHost: boolean;
  broadcast: (snapshot: PlayerSnapshot) => void;
};

export function useSnapshotSync({ active, isHost, broadcast }: SnapshotSyncOptions) {
  const sync = usePlayerSync();
  const sharedRef = useRef<Shared | null>(null);
  const suppressUntilRef = useRef(0);

  const applyRemote = useCallback(
    (snapshot: PlayerSnapshot) => {
      const now = performance.now();
      sharedRef.current = { snapshot, at: now };
      if (sync.applySnapshot(snapshot)) suppressUntilRef.current = now + SUPPRESS_AFTER_REMOTE_MS;
    },
    [sync],
  );

  useEffect(() => {
    sync.setFollower(active && !isHost);
    return () => sync.setFollower(false);
  }, [sync, active, isHost]);

  useEffect(() => {
    if (!active) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const sendIfChanged = () => {
      const now = performance.now();
      if (now < suppressUntilRef.current) {
        timer = setTimeout(sendIfChanged, suppressUntilRef.current - now);
        return;
      }
      const snapshot = sync.getSnapshot();
      if (snapshot.ended) return;
      const shared = sharedRef.current;
      if (shared && isSameState(snapshot, shared.snapshot, (now - shared.at) / 1000)) return;
      sharedRef.current = { snapshot, at: now };
      broadcast(snapshot);
    };

    const unsubscribe = sync.subscribe(() => {
      clearTimeout(timer);
      timer = setTimeout(sendIfChanged, SEND_DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
      sharedRef.current = null;
    };
  }, [sync, active, broadcast]);

  useEffect(() => {
    if (!active || !isHost) return;
    const interval = setInterval(() => {
      const snapshot = sync.getSnapshot();
      if (snapshot.playing && !snapshot.ended) broadcast(snapshot);
    }, HEARTBEAT_MS);
    return () => clearInterval(interval);
  }, [sync, active, isHost, broadcast]);

  return { applyRemote, currentSnapshot: sync.getSnapshot };
}
