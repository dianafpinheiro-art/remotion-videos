import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// Palette
const SAGE = "#8BA888";
const PEACH = "#E8B4A2";
const WHITE = "#FFFFFF";
const DARK_GREEN = "#2D3B2D";
const LIGHT_PEACH = "#FDF0EB";

const MARGIN = 80;

const centerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: MARGIN,
};

// --- Animation helpers ---

const useFadeIn = (frame: number, delay = 0, duration = 15) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const useSlideUp = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`,
  };
};

const useSlideInLeft = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  return {
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [-120, 0])}px)`,
  };
};

const usePop = (frame: number, fps: number, delay = 0) => {
  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.6 },
  });
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.3, 1])})`,
  };
};

// --- Cross-fade wrapper ---

const SceneWrap: React.FC<{
  bg: string;
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ bg, children, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeInDur = 9; // 0.3s
  const fadeOutStart = durationInFrames - 9;

  const opacity = interpolate(
    frame,
    [0, fadeInDur, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ ...centerStyle, backgroundColor: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

// --- Scene 1: Hook (0-4s = 0-120f) ---
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 120;

  const mainScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.7 },
  });
  const mainOpacity = useFadeIn(frame, 0, 20);
  const subStyle = useSlideUp(frame, fps, 25);

  return (
    <SceneWrap bg={SAGE} durationInFrames={dur}>
      <div
        style={{
          color: WHITE,
          fontSize: 72,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.2,
          opacity: mainOpacity,
          transform: `scale(${interpolate(mainScale, [0, 1], [0.7, 1])})`,
        }}
      >
        Seu filho só come{"\n"}5 coisas?
      </div>
      <div
        style={{
          color: PEACH,
          fontSize: 48,
          fontWeight: 600,
          textAlign: "center",
          marginTop: 40,
          ...subStyle,
        }}
      >
        Isso tem nome.
      </div>
    </SceneWrap>
  );
};

// --- Scene 2: Intro (4-8s = 120-240f) ---
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 120;

  const titleStyle = useSlideUp(frame, fps, 5);
  const subStyle = useSlideUp(frame, fps, 20);

  return (
    <SceneWrap bg={LIGHT_PEACH} durationInFrames={dur}>
      <div
        style={{
          color: DARK_GREEN,
          fontSize: 68,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.2,
          ...titleStyle,
        }}
      >
        Seletividade{"\n"}Alimentar
      </div>
      <div
        style={{
          color: SAGE,
          fontSize: 42,
          fontWeight: 600,
          textAlign: "center",
          marginTop: 40,
          ...subStyle,
        }}
      >
        Afeta até 50% das crianças
      </div>
    </SceneWrap>
  );
};

// --- Signal scene (reusable) ---
const SignalScene: React.FC<{
  num: string;
  numColor: string;
  bg: string;
  title: string;
  subtitle: string;
  textColor: string;
  subColor: string;
  durationInFrames: number;
}> = ({ num, numColor, bg, title, subtitle, textColor, subColor, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numStyle = usePop(frame, fps, 3);
  const titleStyle = useSlideInLeft(frame, fps, 15);
  const subStyle = useSlideInLeft(frame, fps, 30);

  return (
    <SceneWrap bg={bg} durationInFrames={durationInFrames}>
      <div
        style={{
          color: numColor,
          fontSize: 140,
          fontWeight: "bold",
          ...numStyle,
        }}
      >
        {num}
      </div>
      <div
        style={{
          color: textColor,
          fontSize: 52,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.3,
          marginTop: 30,
          ...titleStyle,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: subColor,
          fontSize: 38,
          fontWeight: 400,
          textAlign: "center",
          lineHeight: 1.4,
          marginTop: 24,
          ...subStyle,
        }}
      >
        {subtitle}
      </div>
    </SceneWrap>
  );
};

// --- Scene 8: CTA (34-40s) ---
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 180;

  const heartStyle = useFadeIn(frame, 5, 25);
  const logoStyle = useSlideUp(frame, fps, 20);
  const ctaStyle = useSlideUp(frame, fps, 40);

  return (
    <SceneWrap bg={SAGE} durationInFrames={dur}>
      {/* Gradient overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${SAGE} 0%, ${PEACH} 100%)`,
          opacity: 1,
        }}
      />
      <div style={{ ...centerStyle, zIndex: 1, position: "relative" }}>
        <div
          style={{
            color: WHITE,
            fontSize: 60,
            fontWeight: "bold",
            textAlign: "center",
            opacity: heartStyle,
          }}
        >
          Você não está sozinha ❤️
        </div>
        <div
          style={{
            color: WHITE,
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 50,
            ...logoStyle,
          }}
        >
          Seletividade Com Amor
        </div>
        <div
          style={{
            color: DARK_GREEN,
            fontSize: 40,
            fontWeight: 600,
            textAlign: "center",
            marginTop: 30,
            ...ctaStyle,
          }}
        >
          Siga para mais dicas
        </div>
      </div>
    </SceneWrap>
  );
};

// --- Main composition ---
export const SeletividadeVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: SAGE }}>
      {/* Scene 1: Hook 0-4s (frames 0-120) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: Intro 4-8s (frames 120-240) */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: Sinal 1 — 8-14s (frames 240-420) */}
      <Sequence from={240} durationInFrames={180}>
        <SignalScene
          num="1"
          numColor={PEACH}
          bg={SAGE}
          title="Recusa alimentos pela textura"
          subtitle={"Não é birra.\nÉ sensibilidade sensorial."}
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          durationInFrames={180}
        />
      </Sequence>

      {/* Scene 4: Sinal 2 — 14-19s (frames 420-570) */}
      <Sequence from={420} durationInFrames={150}>
        <SignalScene
          num="2"
          numColor={SAGE}
          bg={LIGHT_PEACH}
          title="Só aceita a mesma comida"
          subtitle={"O mesmo prato, do mesmo\njeito, sempre."}
          textColor={DARK_GREEN}
          subColor={SAGE}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 5: Sinal 3 — 19-24s (frames 570-720) */}
      <Sequence from={570} durationInFrames={150}>
        <SignalScene
          num="3"
          numColor={PEACH}
          bg={SAGE}
          title={"Chora ou tem ânsia\nao ver comida nova"}
          subtitle="O corpo reage antes da escolha."
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 6: Sinal 4 — 24-29s (frames 720-870) */}
      <Sequence from={720} durationInFrames={150}>
        <SignalScene
          num="4"
          numColor={SAGE}
          bg={LIGHT_PEACH}
          title={"Come bem na escola\nmas não em casa"}
          subtitle="Ou o contrário. Ambiente importa."
          textColor={DARK_GREEN}
          subColor={SAGE}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 7: Sinal 5 — 29-34s (frames 870-1020) */}
      <Sequence from={870} durationInFrames={150}>
        <SignalScene
          num="5"
          numColor={PEACH}
          bg={SAGE}
          title={"As refeições viram\numa batalha"}
          subtitle={"Se tem choro todo dia,\npreste atenção."}
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 8: CTA — 34-40s (frames 1020-1200) */}
      <Sequence from={1020} durationInFrames={180}>
        <Scene8 />
      </Sequence>
    </AbsoluteFill>
  );
};
