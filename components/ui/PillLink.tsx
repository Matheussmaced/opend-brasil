import Link from "next/link";
import type { ComponentProps } from "react";

const VARIANTS = {
  solid: "border-sakura bg-sakura text-ink-950 shadow-[3px_3px_0_0_var(--color-neon)] hover:-translate-y-0.5",
  outline: "border-ink-500 text-ink-300 hover:border-neon hover:text-neon",
};

type Variant = keyof typeof VARIANTS;

export function pillClass(variant: Variant = "solid") {
  return `inline-flex items-center justify-center gap-2 rounded-lg border-2 px-5 py-2 text-sm font-bold transition disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]}`;
}

export function PillLink({
  variant = "solid",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${pillClass(variant)} ${className}`} {...props} />;
}
