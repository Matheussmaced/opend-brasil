const BARS = [
  "bg-sakura [animation-delay:0ms]",
  "bg-neon [animation-delay:150ms]",
  "bg-sun [animation-delay:300ms]",
];

export function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-0.5" aria-hidden>
      {BARS.map((bar) => (
        <span key={bar} className={`w-1 animate-equalizer rounded-t-sm ${bar}`} />
      ))}
    </span>
  );
}
