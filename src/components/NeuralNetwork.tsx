import React, { useMemo } from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface Node {
  x: number;
  y: number;
  size: number;
  pulseSpeed: number;
}

export const NeuralNetwork: React.FC<{
  color?: string;
  glowColor?: string;
  opacity?: number;
}> = ({
  color = "#8BA888",
  glowColor = "#E8B4A2",
  opacity = 0.3,
}) => {
  const frame = useCurrentFrame();

  const nodes = useMemo<Node[]>(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 12345 + 67890) * 54321;
      return x - Math.floor(x);
    };
    return Array.from({ length: 12 }, (_, i) => ({
      x: seededRandom(i * 5 + 1) * 80 + 10,
      y: seededRandom(i * 5 + 2) * 80 + 10,
      size: seededRandom(i * 5 + 3) * 8 + 4,
      pulseSpeed: seededRandom(i * 5 + 4) * 0.03 + 0.01,
    }));
  }, []);

  const connections = useMemo(() => {
    const conns: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 40) {
          conns.push([i, j]);
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    >
      {connections.map(([i, j], idx) => {
        const pulse = interpolate(
          Math.sin(frame * 0.03 + idx),
          [-1, 1],
          [0.1, 0.6]
        );
        const signalPos = interpolate(
          (frame * 0.5 + idx * 30) % 100,
          [0, 100],
          [0, 1]
        );
        const sx =
          nodes[i].x + (nodes[j].x - nodes[i].x) * signalPos;
        const sy =
          nodes[i].y + (nodes[j].y - nodes[i].y) * signalPos;

        return (
          <g key={`conn-${idx}`}>
            <line
              x1={nodes[i].x}
              y1={nodes[i].y}
              x2={nodes[j].x}
              y2={nodes[j].y}
              stroke={color}
              strokeWidth={0.3}
              opacity={pulse}
            />
            <circle
              cx={sx}
              cy={sy}
              r={0.8}
              fill={glowColor}
              opacity={pulse * 1.5}
            >
              <animate
                attributeName="r"
                values="0.5;1.2;0.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      {nodes.map((node, i) => {
        const pulse = interpolate(
          Math.sin(frame * node.pulseSpeed),
          [-1, 1],
          [0.6, 1]
        );
        return (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * pulse * 0.5}
              fill={color}
              opacity={0.6 * pulse}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * pulse * 0.8}
              fill="none"
              stroke={glowColor}
              strokeWidth={0.2}
              opacity={0.3 * pulse}
            />
          </g>
        );
      })}
    </svg>
  );
};
