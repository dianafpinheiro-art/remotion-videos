import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const TextureIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = "#E8B4A2",
}) => {
  const frame = useCurrentFrame();
  const wobble = Math.sin(frame * 0.05) * 3;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* Sand-like dots pattern */}
      {Array.from({ length: 40 }, (_, i) => {
        const seed = (n: number) => {
          const x = Math.sin(n * 9301 + 49297) * 233280;
          return x - Math.floor(x);
        };
        const cx = seed(i * 2) * 80 + 10;
        const cy = seed(i * 2 + 1) * 60 + 20;
        const r = seed(i * 3) * 2 + 0.5;
        const opacity = interpolate(
          Math.sin(frame * 0.04 + i * 0.5),
          [-1, 1],
          [0.3, 0.8]
        );
        return (
          <circle key={i} cx={cx} cy={cy} r={r} fill={color} opacity={opacity} />
        );
      })}
      {/* Hand outline */}
      <path
        d="M35 85 L35 50 C35 45 40 42 43 45 L43 35 C43 30 48 28 51 32 L51 30 C51 25 56 23 59 27 L59 35 C62 32 67 33 67 38 L67 65 C67 75 58 85 50 85 Z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        opacity={0.8}
        transform={`translate(${wobble}, 0)`}
      />
    </svg>
  );
};

export const SmellIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = "#E8B4A2",
}) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* Nose shape */}
      <path
        d="M50 25 C50 25, 42 40, 35 55 C32 62, 38 70, 45 68 L50 70 L55 68 C62 70, 68 62, 65 55 C58 40, 50 25, 50 25"
        stroke={color}
        strokeWidth={2}
        fill={`${color}20`}
        strokeLinecap="round"
      />
      {/* Smell waves */}
      {[0, 1, 2].map((i) => {
        const waveOffset = interpolate(
          (frame * 0.5 + i * 20) % 60,
          [0, 60],
          [0, -30]
        );
        const waveOpacity = interpolate(
          (frame * 0.5 + i * 20) % 60,
          [0, 30, 60],
          [0, 0.6, 0]
        );
        return (
          <path
            key={i}
            d={`M${42 + i * 5} ${30 + waveOffset} Q${47 + i * 3} ${
              25 + waveOffset
            } ${50 + i * 2} ${30 + waveOffset}`}
            stroke={color}
            strokeWidth={1.5}
            fill="none"
            opacity={waveOpacity}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export const AlertIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 120,
  color = "#FF6B6B",
}) => {
  const frame = useCurrentFrame();
  const flash = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.6, 1]);
  const shake = Math.sin(frame * 0.3) * 3;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: `translateX(${shake}px)` }}
    >
      {/* Triangle */}
      <path
        d="M50 15 L85 80 L15 80 Z"
        stroke={color}
        strokeWidth={3}
        fill={`${color}20`}
        strokeLinejoin="round"
        opacity={flash}
      />
      {/* Exclamation */}
      <line
        x1={50}
        y1={35}
        x2={50}
        y2={58}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={flash}
      />
      <circle cx={50} cy={68} r={3} fill={color} opacity={flash} />
    </svg>
  );
};

export const HeartIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = "#E8B4A2",
}) => {
  const frame = useCurrentFrame();
  const beat = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.9, 1.1]
  );

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ transform: `scale(${beat})` }}
    >
      <path
        d="M50 85 C50 85, 15 60, 15 38 C15 22, 28 15, 38 15 C44 15, 48 18, 50 22 C52 18, 56 15, 62 15 C72 15, 85 22, 85 38 C85 60, 50 85, 50 85"
        fill={color}
        opacity={0.9}
      />
    </svg>
  );
};
