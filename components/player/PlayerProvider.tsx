"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import type { Track } from "@/lib/types";
import { useMediaSession, useSpacebar } from "./hooks";
import { sourceFor } from "./media-source";
import { PlaybackTimeContext, PlayerContext, type Mode, type PlaybackTime, type PlayerValue } from "./PlayerContext";
import { initialQueueState, nextIndex, previousIndex, queueReducer } from "./queue-reducer";
import { preloadSource } from "./preload";
import { VideoStage } from "./VideoStage";

const RESTART_THRESHOLD_SECONDS = 3;
const TIME_UPDATE_STEP_SECONDS = 0.25;

type Resume = { at: number; play: boolean };

export function PlayerProvider({ children }: { children: ReactNode }) {
  const mediaRef = useRef<HTMLVideoElement>(null);
  const resumeRef = useRef<Resume>({ at: 0, play: true });
  const lastTokenRef = useRef(0);
  const upcomingRef = useRef<number | null>(null);

  const [queueState, dispatch] = useReducer(queueReducer, initialQueueState);
  const [mode, setModeState] = useState<Mode>("audio");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [playback, setPlayback] = useState<PlaybackTime>({ time: 0, duration: 0, buffering: false });

  const { queue, index, playToken, shuffle, repeat } = queueState;
  const current = queue[index] ?? null;
  const source = sourceFor(current, mode);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !source) return;

    const { at, play } = resumeRef.current;
    resumeRef.current = { at: 0, play: true };

    if (media.src !== source) {
      media.src = source;
      if (at > 0) media.addEventListener("loadedmetadata", () => (media.currentTime = at), { once: true });
    } else if (lastTokenRef.current !== playToken) {
      media.currentTime = 0;
    }
    lastTokenRef.current = playToken;

    if (play) media.play().catch(() => setIsPlaying(false));
  }, [source, playToken]);

  useEffect(() => {
    upcomingRef.current = nextIndex(queueState, true);
  }, [queueState]);


  const playTracks = useCallback((tracks: Track[], start = 0) => {
    if (tracks.length) dispatch({ type: "play", tracks, start });
  }, []);

  const addToQueue = useCallback((track: Track) => dispatch({ type: "enqueue", track }), []);
  const removeFromQueue = useCallback((i: number) => dispatch({ type: "remove", index: i }), []);
  const jumpTo = useCallback((i: number) => dispatch({ type: "jump", index: i }), []);
  const toggleShuffle = useCallback(() => dispatch({ type: "toggleShuffle" }), []);
  const cycleRepeat = useCallback(() => dispatch({ type: "cycleRepeat" }), []);

  const advance = useCallback(
    (auto: boolean) => {
      const upcoming = upcomingRef.current;
      const target = shuffle && upcoming !== null ? upcoming : nextIndex(queueState, auto);
      if (target === null) mediaRef.current?.pause();
      else jumpTo(target);
    },
    [queueState, shuffle, jumpTo],
  );

  const next = useCallback(() => advance(false), [advance]);

  const prev = useCallback(() => {
    const media = mediaRef.current;
    if (media && media.currentTime > RESTART_THRESHOLD_SECONDS) {
      media.currentTime = 0;
      return;
    }
    const target = previousIndex(queueState);
    if (target !== null) jumpTo(target);
  }, [queueState, jumpTo]);

  const toggle = useCallback(() => {
    const media = mediaRef.current;
    if (!media?.src) return;
    if (media.paused) media.play().catch(() => setIsPlaying(false));
    else media.pause();
  }, []);

  const seek = useCallback((time: number) => {
    if (mediaRef.current && Number.isFinite(time)) mediaRef.current.currentTime = time;
  }, []);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    if (mediaRef.current) {
      mediaRef.current.volume = clamped;
      mediaRef.current.muted = clamped === 0;
    }
    setVolumeState(clamped);
    setMuted(clamped === 0);
  }, []);

  const toggleMute = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;
    media.muted = !media.muted;
    setMuted(media.muted);
  }, []);

  const setMode = useCallback(
    (nextMode: Mode) => {
      const media = mediaRef.current;
      if (media?.src && sourceFor(current, nextMode) !== media.src) {
        resumeRef.current = { at: media.currentTime, play: !media.paused };
      }
      setModeState(nextMode);
    },
    [current],
  );

  const handleEnded = () => {
    const media = mediaRef.current;
    if (repeat === "one" && media) {
      media.currentTime = 0;
      media.play().catch(() => setIsPlaying(false));
      return;
    }
    advance(true);
  };

  const handlePlaying = () => {
    setPlayback((p) => ({ ...p, buffering: false }));
    const upcoming = upcomingRef.current;
    if (upcoming !== null && upcoming !== index) preloadSource(sourceFor(queue[upcoming], mode));
  };

  const handleError = () => {
    const media = mediaRef.current;
    if (media && current?.audioUrl && media.src === current.audioUrl) {
      media.src = current.videoUrl;
      media.play().catch(() => setIsPlaying(false));
    }
  };

  useMediaSession(current, { toggle, next, prev });
  useSpacebar(toggle);

  const value = useMemo<PlayerValue>(
    () => ({
      queue, index, current, isPlaying, mode, shuffle, repeat, volume, muted, showQueue,
      playTracks, addToQueue, removeFromQueue, jumpTo, toggle, next, prev, seek,
      setVolume, toggleMute, setMode, toggleShuffle, cycleRepeat, setShowQueue,
    }),
    [
      queue, index, current, isPlaying, mode, shuffle, repeat, volume, muted, showQueue,
      playTracks, addToQueue, removeFromQueue, jumpTo, toggle, next, prev, seek,
      setVolume, toggleMute, setMode, toggleShuffle, cycleRepeat,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      <PlaybackTimeContext.Provider value={playback}>
        {children}
        <VideoStage>
          <video
            ref={mediaRef}
            playsInline
            preload="auto"
            className="size-full object-contain"
            onClick={toggle}
            onPlay={() => setIsPlaying(true)}
            onPause={() => {
              setIsPlaying(false);
              setPlayback((p) => ({ ...p, buffering: false }));
            }}
            onEnded={handleEnded}
            onError={handleError}
            onLoadStart={() => setPlayback((p) => ({ ...p, buffering: true }))}
            onWaiting={() => setPlayback((p) => ({ ...p, buffering: true }))}
            onPlaying={handlePlaying}
            onTimeUpdate={(e) => {
              const time = e.currentTarget.currentTime;
              setPlayback((p) => (Math.abs(p.time - time) < TIME_UPDATE_STEP_SECONDS ? p : { ...p, time }));
            }}
            onDurationChange={(e) => {
              const duration = e.currentTarget.duration;
              setPlayback((p) => ({ ...p, duration: Number.isFinite(duration) ? duration : 0 }));
            }}
            onEmptied={() => setPlayback({ time: 0, duration: 0, buffering: false })}
          />
        </VideoStage>
      </PlaybackTimeContext.Provider>
    </PlayerContext.Provider>
  );
}
