"use client";

import { QueueIcon, VideoIcon, VolumeIcon } from "../ui/icons";
import { IconButton } from "../ui/IconButton";
import { Slider } from "../ui/Slider";
import { usePlayer } from "./PlayerContext";

export function PlayerExtras() {
  const { current, mode, setMode, showQueue, setShowQueue, muted, volume, toggleMute, setVolume } = usePlayer();
  const isVideo = mode === "video";
  const audible = muted ? 0 : volume;

  return (
    <div className="flex items-center justify-end sm:gap-1">
      <IconButton
        label={isVideo ? "Só áudio" : "Ver vídeo"}
        active={isVideo}
        disabled={!current}
        onClick={() => setMode(isVideo ? "audio" : "video")}
      >
        <VideoIcon />
      </IconButton>
      <IconButton label="Fila" active={showQueue} onClick={() => setShowQueue(!showQueue)}>
        <QueueIcon />
      </IconButton>
      <IconButton label={audible ? "Silenciar" : "Ativar som"} onClick={toggleMute} className="max-lg:hidden">
        <VolumeIcon muted={audible === 0} />
      </IconButton>
      <Slider
        label="Volume"
        value={audible}
        max={1}
        step={0.01}
        onChange={setVolume}
        className="w-20 max-lg:hidden xl:w-24"
      />
    </div>
  );
}
