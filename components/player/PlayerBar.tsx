import { NowPlaying } from "./NowPlaying";
import { PlayerControls } from "./PlayerControls";
import { PlayerExtras } from "./PlayerExtras";
import { MobileProgress } from "./PlayerProgress";
import { QueuePanel } from "./QueuePanel";

export function PlayerBar() {
  return (
    <>
      <QueuePanel />
      <footer className="fixed inset-x-0 bottom-0 z-50 grid h-player grid-cols-[1fr_auto] items-center gap-4 border-t border-zinc-900 bg-black px-3 sm:grid-cols-[1fr_2fr_1fr] sm:px-4">
        <NowPlaying />
        <PlayerControls />
        <PlayerExtras />
        <MobileProgress />
      </footer>
    </>
  );
}
