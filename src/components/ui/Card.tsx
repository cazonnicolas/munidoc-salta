import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`surface-card rounded-2xl border border-[#d5e1ee] bg-white ${className}`}
      {...props}
    />
  );
}
