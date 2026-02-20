import React from "react";

type Props = {
  /** Total width in pixels (default: 49) */
  length?: number;
  /** Total height in pixels. If omitted it preserves the original aspect ratio (14/49). */
  height?: number;
  /** 'right' (default) or 'left' to flip the arrow */
  direction?: "right" | "left";
  /** Stroke color (any valid CSS color). Default: 'currentColor' */
  color?: string;
  /** Stroke width in user units (default: 1.5) */
  strokeWidth?: number;
  /** Optional CSS class */
  className?: string;
  /** Accessibility title */
  title?: string;
};

const ORIGINAL_WIDTH = 49;
const ORIGINAL_HEIGHT = 14;

export default function LongArrow({
  length = ORIGINAL_WIDTH,
  height,
  direction = "left",
  color = "currentColor",
  strokeWidth = 1.5,
  className,
  title,
}: Props) {
  const computedHeight =
    height ?? Math.round((length * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH);

  // When flipping with CSS transform we need to set transform origin so it flips around center
  const flipStyle: React.CSSProperties =
    direction === "left"
      ? { transform: "scaleX(-1)", transformOrigin: "center" }
      : {};

  return (
    <svg
      width={length}
      height={computedHeight}
      viewBox={`0 0 ${ORIGINAL_WIDTH} ${ORIGINAL_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      style={flipStyle}>
      {title ? <title>{title}</title> : null}
      <path
        d="M48.25 6.75H0.75M0.75 6.75L6.75 0.75M0.75 6.75L6.75 12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
