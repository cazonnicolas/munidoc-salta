import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "primary";
};

export function Button({
  variant = "outline",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "border-[#0c62c7] bg-gradient-to-b from-[#1672d4] to-[#0758b9] text-white shadow-[0_5px_12px_rgba(8,91,190,0.16)] hover:from-[#0e65c5] hover:to-[#064da3]"
      : "border-[#c9d9ec] bg-white/95 text-[#075cc5] shadow-[0_1px_2px_rgba(26,64,108,0.03)] hover:border-[#85afe1] hover:bg-[#f3f8ff]";

  return (
    <button
      type={type}
      className={`inline-flex h-8 items-center justify-center rounded-lg border px-3 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c62c7]/30 ${styles} ${className}`}
      {...props}
    />
  );
}
