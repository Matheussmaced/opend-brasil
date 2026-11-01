import { NowPlaying } from "./NowPlaying";
import { PlayerControls } from "./PlayerControls";
import { PlayerExtras } from "./PlayerExtras";
import { MobileProgress } from "./PlayerProgress";
import { QueuePanel } from "./QueuePanel";

export function PlayerBar() {
  return (
    <>
      <QueuePanel />
      <footer className="fixed inset-x-2 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-6xl sm:inset-x-4 sm:bottom-4 md:left-60 lg:left-68">
        <div className="relative grid h-18 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 overflow-hidden rounded-2xl border-2 border-ink-700 bg-ink-900/95 px-2 sm:h-20 sm:gap-4 sm:px-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] shadow-[0_10px_40px_-10px_var(--color-sakura)] backdrop-blur lg:px-5">
          <NowPlaying />
          <PlayerControls />
          <PlayerExtras />
          <MobileProgress />
        </div>
      </footer>
    </>
  );
}
