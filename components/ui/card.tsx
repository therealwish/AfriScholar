import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border-2 border-ink bg-paper p-5 shadow-hard",
        className
      )}
      {...props}
    />
  );
}