interface LogoProps {
  /** Optional fixed size (used only if you really need it) */
  size?: number;
  /** Fill colour for the square */
  fill?: string;
  /** Fill colour for the triangle path */
  accent?: string;
  /** Stroke colour for the triangle outline */
  stroke?: string;
  /** Stroke width for the triangle outline */
  strokeWidth?: number;
  /** Optional extra class names */
  className?: string;
}

export default function Logo({
  size,
  fill = "#D9D9D9",
  accent = "black",
  stroke = "#060606",
  strokeWidth = 0.5,
  className = "",
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...(size && { width: size, height: size })}
      aria-hidden="true"
      focusable="false">
      <rect
        x="25"
        width="35.3553"
        height="35.3553"
        transform="rotate(45 25 0)"
        fill={fill}
      />
      <path
        d="M49.6465 25.0001L25.25 49.3967V0.603527L49.6465 25.0001Z"
        fill={accent}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
