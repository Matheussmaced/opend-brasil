import type { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  active?: boolean;
};

export function IconButton({ label, active = false, className = "", ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active || undefined}
      className={`relative rounded-lg p-2 transition disabled:opacity-30 ${
        active ? "bg-sakura/15 text-sakura" : "text-ink-300 hover:bg-white/5 hover:text-white"
      } ${className}`}
      {...props}
    />
  );
}
