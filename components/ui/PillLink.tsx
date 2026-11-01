import Link from "next/link";
import type { ComponentProps } from "react";

const VARIANTS = {
  solid: "bg-white text-black hover:scale-105",
  outline: "border border-zinc-600 text-zinc-200 hover:border-white hover:text-white",
};

type Variant = keyof typeof VARIANTS;

export function pillClass(variant: Variant = "solid") {
  return `inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-bold transition disabled:opacity-40 ${VARIANTS[variant]}`;
}

export function PillLink({
  variant = "solid",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${pillClass(variant)} ${className}`} {...props} />;
}
