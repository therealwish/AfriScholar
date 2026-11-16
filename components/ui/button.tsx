import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-tight rounded-sm border-2 transition-all duration-150 select-none disabled:opacity-40 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  // Swapped: Primary is now the cream button with the black shadow
  primary:
    "bg-paper text-ink border-ink shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none",
  
  // Swapped: Secondary is now the dark ink button with the gold shadow
  secondary:
   "bg-paper text-ink border-ink shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-x-0 active:translate-y-0 active:shadow-none",
  
  ghost: "border-transparent text-ink hover:bg-paper-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonStyles(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props} />
  );
}