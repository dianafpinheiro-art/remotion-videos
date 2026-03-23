import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const ProgressBar: React.FC<{
  totalFrames: number;
}> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, totalFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: "rgba(255,255,255,0.1)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(90deg, #8BA888, #E8B4A2)",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
};
