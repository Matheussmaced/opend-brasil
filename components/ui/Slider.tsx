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
      className={`group h-1 cursor-pointer appearance-none rounded-full bg-[linear-gradient(to_right,var(--color-white)_var(--fill),var(--color-zinc-700)_var(--fill))] hover:bg-[linear-gradient(to_right,var(--color-rose-400)_var(--fill),var(--color-zinc-700)_var(--fill))] disabled:cursor-default [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:opacity-0 hover:[&::-moz-range-thumb]:opacity-100 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 ${className}`}
    />
  );
}
