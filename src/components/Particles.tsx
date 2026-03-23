import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
  color: string;
}

export const Particles: React.FC<{
  count?: number;
  colors?: string[];
}> = ({ count = 30, colors = ["#8BA888", "#E8B4A2", "#FFFFFF"] }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9301 + 49297) * 233280;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i) => ({
      x: seededRandom(i * 3 + 1) * 100,
      y: seededRandom(i * 3 + 2) * 100,
      size: seededRandom(i * 3 + 3) * 6 + 2,
      speed: seededRandom(i * 7 + 4) * 0.5 + 0.2,
      opacity: seededRandom(i * 7 + 5) * 0.4 + 0.1,
      delay: seededRandom(i * 7 + 6) * 60,
      color: colors[Math.floor(seededRandom(i * 7 + 7) * colors.length)],
    }));
  }, [count, colors]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p, i) => {
        const adjustedFrame = frame + p.delay;
        const yOffset = (adjustedFrame * p.speed) % 120;
        const xWobble = Math.sin(adjustedFrame * 0.02 * p.speed) * 15;
        const pulse = interpolate(
          Math.sin(adjustedFrame * 0.05),
          [-1, 1],
          [0.5, 1]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x + xWobble}%`,
              top: `${((p.y - yOffset + 120) % 120) - 10}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: p.opacity * pulse,
              filter: `blur(${p.size > 5 ? 2 : 0}px)`,
              transform: `scale(${pulse})`,
            }}
          />
        );
      })}
    </div>
  );
};
