import type { HTMLAttributes } from "react";

type BadgeTone = "blue" | "green" | "purple" | "orange";

const tones: Record<BadgeTone, string> = {
  blue: "bg-[#eaf2ff] text-[#075cc5]",
  green: "bg-[#e6f7eb] text-[#16844a]",
  purple: "bg-[#f1eaff] text-[#7452d6]",
  orange: "bg-[#fff0df] text-[#e36c13]",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({
  tone = "blue",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border border-current/10 px-2.5 py-1 text-[10px] font-semibold leading-none shadow-[0_1px_2px_rgba(31,68,111,0.025)] ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
