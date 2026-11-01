"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { preloadSource } from "./preload";

const HOVER_DELAY_MS = 150;

export function usePreloadIntent(getSource: () => string | null) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const warm = () => preloadSource(getSource(), { optional: true });

  return {
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(warm, HOVER_DELAY_MS);
    },
    onPointerLeave: () => clearTimeout(timerRef.current),
    onPointerDown: warm,
  };
}
