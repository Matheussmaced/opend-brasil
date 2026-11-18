"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

export function createLocalStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();
  let cache: T | null = null;

  function read(): T {
    if (cache !== null) return cache;
    try {
      const raw = localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      cache = fallback;
    }
    return cache;
  }

  function write(next: T) {
    cache = next;
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
    listeners.forEach((notify) => notify());
  }

  function subscribe(notify: () => void) {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      cache = null;
      notify();
    };
    listeners.add(notify);
    window.addEventListener("storage", handleStorage);
    return () => {
      listeners.delete(notify);
      window.removeEventListener("storage", handleStorage);
    };
  }

  function useSelector<S>(select: (value: T) => S, serverValue: S) {
    return useSyncExternalStore(subscribe, () => select(read()), () => serverValue);
  }

  return { read, write, useSelector };
}
