import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const SceneTransition: React.FC<{
  type?: "fade" | "wipe" | "radial";
  durationFrames?: number;
  color?: string;
}> = ({ type = "fade", durationFrames = 15, color = "#2D3B2D" }) => {
  const frame = useCurrentFrame();

  if (type === "wipe") {
    const progress = interpolate(frame, [0, durationFrames], [0, 100], {
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
          zIndex: 100,
        }}
      />
    );
  }

  if (type === "radial") {
    const progress = interpolate(frame, [0, durationFrames], [0, 150], {
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, transparent ${progress}%, ${color} ${progress + 5}%)`,
          zIndex: 100,
        }}
      />
    );
  }

  // Fade
  const opacity = interpolate(frame, [0, durationFrames], [1, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: color,
        opacity,
        zIndex: 100,
      }}
    />
  );
};
