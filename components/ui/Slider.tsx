import type { CSSProperties } from "react";

type SliderProps = {
  value: number;
  max: number;
  step: number;
  label: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

export function Slider({ value, max, step, label, onChange, disabled, className = "" }: SliderProps) {
  const percent = max > 0 ? (value / max) * 100 : 0;

  return (
    <input
      type="range"
      min={0}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ "--fill": `${percent}%` } as CSSProperties}
      className={`h-1.5 cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,var(--color-sakura),var(--color-neon)_var(--fill),var(--color-ink-700)_var(--fill))] disabled:cursor-default [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rotate-45 [&::-moz-range-thumb]:rounded-xs [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink-950 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:rotate-45 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-xs [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink-950 [&::-webkit-slider-thumb]:bg-white ${className}`}
    />
  );
}
