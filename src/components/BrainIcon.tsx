import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const BrainIcon: React.FC<{
  size?: number;
  color?: string;
  glowColor?: string;
  alertMode?: boolean;
}> = ({
  size = 200,
  color = "#8BA888",
  glowColor = "#E8B4A2",
  alertMode = false,
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.95, 1.05]);
  const glowPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [10, 25]
  );

  const alertColor = alertMode
    ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 1]) > 0.5
      ? "#FF6B6B"
      : color
    : color;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${pulse})`,
        filter: `drop-shadow(0 0 ${glowPulse}px ${glowColor})`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size * 0.85}
        height={size * 0.85}
        fill="none"
      >
        {/* Left hemisphere */}
        <path
          d="M50 15 C35 15, 20 25, 18 40 C16 50, 20 58, 22 62 C18 66, 17 72, 20 78 C23 84, 30 88, 38 88 C42 90, 46 90, 50 88"
          stroke={alertColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill={`${alertColor}15`}
        />
        {/* Left folds */}
        <path
          d="M28 35 C35 38, 42 34, 45 30"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M22 50 C30 48, 38 52, 44 48"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M24 65 C32 62, 38 66, 46 63"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Right hemisphere */}
        <path
          d="M50 15 C65 15, 80 25, 82 40 C84 50, 80 58, 78 62 C82 66, 83 72, 80 78 C77 84, 70 88, 62 88 C58 90, 54 90, 50 88"
          stroke={alertColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill={`${alertColor}15`}
        />
        {/* Right folds */}
        <path
          d="M72 35 C65 38, 58 34, 55 30"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M78 50 C70 48, 62 52, 56 48"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M76 65 C68 62, 62 66, 54 63"
          stroke={alertColor}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Center line */}
        <line
          x1={50}
          y1={15}
          x2={50}
          y2={88}
          stroke={alertColor}
          strokeWidth={1}
          opacity={0.4}
        />

        {/* Neural sparks */}
        {[
          [35, 42],
          [65, 42],
          [30, 60],
          [70, 60],
          [42, 75],
          [58, 75],
        ].map(([cx, cy], i) => {
          const sparkOpacity = interpolate(
            Math.sin(frame * 0.1 + i * 1.2),
            [-1, 1],
            [0, 0.8]
          );
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={alertMode ? 3 : 2}
              fill={glowColor}
              opacity={sparkOpacity}
            />
          );
        })}

        {/* Stem */}
        <path
          d="M50 88 L50 98"
          stroke={alertColor}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
