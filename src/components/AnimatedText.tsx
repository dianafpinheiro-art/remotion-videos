import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const AnimatedText: React.FC<{
  text: string;
  startFrame?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  maxWidth?: number;
  textAlign?: "center" | "left" | "right";
  lineHeight?: number;
  highlightWords?: string[];
  highlightColor?: string;
  animation?: "fadeUp" | "fadeScale" | "typewriter" | "splitReveal";
}> = ({
  text,
  startFrame = 0,
  fontSize = 52,
  color = "#FFFFFF",
  fontWeight = 700,
  maxWidth = 900,
  textAlign = "center",
  lineHeight = 1.4,
  highlightWords = [],
  highlightColor = "#E8B4A2",
  animation = "fadeUp",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const renderFadeUp = () => {
    const opacity = interpolate(relativeFrame, [0, 20], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const translateY = interpolate(relativeFrame, [0, 20], [40, 0], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

    return (
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {renderTextWithHighlights()}
      </div>
    );
  };

  const renderFadeScale = () => {
    const opacity = interpolate(relativeFrame, [0, 15], [0, 1], {
      extrapolateRight: "clamp",
    });
    const scale = interpolate(relativeFrame, [0, 15], [0.8, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.5)),
    });

    return (
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {renderTextWithHighlights()}
      </div>
    );
  };

  const renderSplitReveal = () => {
    const words = text.split(" ");
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: textAlign === "center" ? "center" : "flex-start", gap: "0 12px" }}>
        {words.map((word, i) => {
          const wordDelay = i * 4;
          const wordOpacity = interpolate(
            relativeFrame,
            [wordDelay, wordDelay + 10],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const wordY = interpolate(
            relativeFrame,
            [wordDelay, wordDelay + 10],
            [20, 0],
            {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const isHighlighted = highlightWords.some((hw) =>
            word.toLowerCase().includes(hw.toLowerCase())
          );

          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                display: "inline-block",
                color: isHighlighted ? highlightColor : color,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  const renderTextWithHighlights = () => {
    if (highlightWords.length === 0) return text;

    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      let earliestIndex = remaining.length;
      let matchedWord = "";

      for (const hw of highlightWords) {
        const idx = remaining.toLowerCase().indexOf(hw.toLowerCase());
        if (idx !== -1 && idx < earliestIndex) {
          earliestIndex = idx;
          matchedWord = hw;
        }
      }

      if (matchedWord && earliestIndex < remaining.length) {
        if (earliestIndex > 0) {
          parts.push(
            <span key={key++}>{remaining.slice(0, earliestIndex)}</span>
          );
        }
        parts.push(
          <span key={key++} style={{ color: highlightColor }}>
            {remaining.slice(earliestIndex, earliestIndex + matchedWord.length)}
          </span>
        );
        remaining = remaining.slice(earliestIndex + matchedWord.length);
      } else {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
    }

    return <>{parts}</>;
  };

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        maxWidth,
        textAlign,
        lineHeight,
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: "-0.02em",
        textShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      {animation === "fadeUp" && renderFadeUp()}
      {animation === "fadeScale" && renderFadeScale()}
      {animation === "splitReveal" && renderSplitReveal()}
      {animation === "typewriter" && renderFadeUp()}
    </div>
  );
};
