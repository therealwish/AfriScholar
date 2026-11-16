import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "forest" | "clay";

const tones: Record<Tone, string> = {
  neutral: "border-ink/20 bg-transparent text-ink-soft",
  gold: "border-gold-deep/50 bg-transparent text-gold-deep",
  forest: "border-forest/50 bg-transparent text-forest",
  clay: "border-clay/50 bg-transparent text-clay",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border px-2 py-0.75 font-mono text-[0.625rem] font-medium uppercase tracking-widest",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}