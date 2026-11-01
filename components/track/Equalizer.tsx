const BAR_DELAYS = ["[animation-delay:0ms]", "[animation-delay:150ms]", "[animation-delay:300ms]"];

export function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-0.5" aria-hidden>
      {BAR_DELAYS.map((delay) => (
        <span key={delay} className={`w-0.75 animate-equalizer bg-rose-400 ${delay}`} />
      ))}
    </span>
  );
}
