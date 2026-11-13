import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  size?: number;
  filled?: boolean;
};

export function Icon({ name, size = 24, filled, className = "", ...rest }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: size }}
      aria-hidden
      {...rest}
    >
      {name}
    </span>
  );
}
