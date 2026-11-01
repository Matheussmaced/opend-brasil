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
      className={`relative rounded-full p-2 transition disabled:opacity-30 ${
        active ? "text-rose-400" : "text-zinc-400 hover:text-white"
      } ${className}`}
      {...props}
    />
  );
}
