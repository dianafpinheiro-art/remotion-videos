import React from "react";
import {
  useCurrentFrame,
  AbsoluteFill,
  Sequence,
  interpolate,
  Easing,
} from "remotion";
import { Particles } from "./components/Particles";
import { NeuralNetwork } from "./components/NeuralNetwork";
import { BrainIcon } from "./components/BrainIcon";
import { AnimatedText } from "./components/AnimatedText";
import { SceneTransition } from "./components/SceneTransition";
import { ProgressBar } from "./components/ProgressBar";
import {
  TextureIcon,
  SmellIcon,
  AlertIcon,
  HeartIcon,
} from "./components/SensoryIcon";

const COLORS = {
  sage: "#8BA888",
  peach: "#E8B4A2",
  darkGreen: "#2D3B2D",
  lightPeach: "#FDF0EB",
  white: "#FFFFFF",
};

// Safe zone padding for social media
const SAFE_ZONE = {
  top: 180,
  bottom: 180,
  left: 60,
  right: 60,
};

const SceneContainer: React.FC<{
  background: string;
  children: React.ReactNode;
}> = ({ background, children }) => (
  <AbsoluteFill
    style={{
      background,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: `${SAFE_ZONE.top}px ${SAFE_ZONE.right}px ${SAFE_ZONE.bottom}px ${SAFE_ZONE.left}px`,
    }}
  >
    {children}
  </AbsoluteFill>
);

// ============================================
// SCENE 1 — HOOK (0-185 frames, ~6.2s)
// ============================================
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneContainer
      background={`radial-gradient(ellipse at 50% 40%, ${COLORS.darkGreen} 0%, #1a2a1a 100%)`}
    >
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.15} />
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
        }}
      >
        {/* Emoji visual */}
        <Sequence from={10}>
          <div
            style={{
              fontSize: 80,
              opacity: interpolate(frame - 10, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `scale(${interpolate(frame - 10, [0, 15], [0.5, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
                easing: Easing.out(Easing.back(2)),
              })})`,
            }}
          >
            🤯
          </div>
        </Sequence>

        <Sequence from={20}>
          <AnimatedText
            text="Quando seu filho cospe a comida…"
            fontSize={54}
            color={COLORS.white}
            fontWeight={800}
            animation="splitReveal"
            highlightWords={["cospe"]}
            highlightColor={COLORS.peach}
          />
        </Sequence>

        <Sequence from={70}>
          <AnimatedText
            text="não é pirraça."
            fontSize={62}
            color={COLORS.peach}
            fontWeight={900}
            animation="fadeScale"
          />
        </Sequence>
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </SceneContainer>
  );
};

// ============================================
// SCENE 2 — Brain Processing (185-370 frames, ~6.2s)
// ============================================
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`linear-gradient(180deg, ${COLORS.darkGreen} 0%, #1e2e1e 50%, ${COLORS.darkGreen} 100%)`}
    >
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.2} />
      <Particles count={25} colors={[COLORS.sage, "#6B8B6B"]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <div
            style={{
              opacity: interpolate(frame - 5, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `translateY(${interpolate(frame - 5, [0, 20], [30, 0], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              })}px)`,
            }}
          >
            <BrainIcon size={220} color={COLORS.sage} glowColor={COLORS.peach} />
          </div>
        </Sequence>

        <Sequence from={20}>
          <AnimatedText
            text="O cérebro dele processa os alimentos de um jeito diferente."
            fontSize={48}
            color={COLORS.white}
            fontWeight={700}
            animation="splitReveal"
            highlightWords={["cérebro", "diferente"]}
            highlightColor={COLORS.peach}
          />
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 3 — Texture (370-555 frames, ~6.2s)
// ============================================
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`linear-gradient(135deg, #2a3a2a 0%, ${COLORS.darkGreen} 50%, #1a2a1a 100%)`}
    >
      <Particles count={35} colors={["#C4A882", "#D4B896", COLORS.peach]} />

      {/* Sand texture background effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          background: `repeating-conic-gradient(${COLORS.peach} 0% 25%, transparent 0% 50%) 0 0 / 20px 20px`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <div
            style={{
              opacity: interpolate(frame - 5, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            <TextureIcon size={140} color={COLORS.peach} />
          </div>
        </Sequence>

        <Sequence from={15}>
          <AnimatedText
            text="A textura que pra você é normal…"
            fontSize={46}
            color={COLORS.white}
            fontWeight={600}
            animation="fadeUp"
          />
        </Sequence>

        <Sequence from={60}>
          <AnimatedText
            text="pra ele é como mastigar areia."
            fontSize={52}
            color={COLORS.peach}
            fontWeight={800}
            animation="fadeScale"
            highlightWords={["areia"]}
            highlightColor="#D4A574"
          />
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 4 — Smell (555-740 frames, ~6.2s)
// ============================================
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`radial-gradient(circle at 50% 60%, #2D4B2D 0%, ${COLORS.darkGreen} 100%)`}
    >
      <Particles count={20} colors={[COLORS.sage, COLORS.peach, "#BFD4BF"]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <div
            style={{
              opacity: interpolate(frame - 5, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            <SmellIcon size={140} color={COLORS.sage} />
          </div>
        </Sequence>

        <Sequence from={15}>
          <AnimatedText
            text="O cheiro que pra você é gostoso…"
            fontSize={46}
            color={COLORS.white}
            fontWeight={600}
            animation="fadeUp"
          />
        </Sequence>

        <Sequence from={60}>
          <AnimatedText
            text="pra ele é insuportável."
            fontSize={56}
            color={COLORS.peach}
            fontWeight={800}
            animation="fadeScale"
            highlightWords={["insuportável"]}
            highlightColor="#E8B4A2"
          />
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 5 — DANGER (740-925 frames, ~6.2s)
// ============================================
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const dangerFlash =
    frame > 60
      ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 0.1])
      : 0;

  return (
    <SceneContainer
      background={`radial-gradient(circle at 50% 50%, #3D2B2B 0%, ${COLORS.darkGreen} 100%)`}
    >
      {/* Red danger flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FF0000",
          opacity: dangerFlash,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      <Particles count={15} colors={["#FF6B6B", COLORS.peach, "#FF9999"]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <div
            style={{
              opacity: interpolate(frame - 5, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            <BrainIcon
              size={180}
              color={COLORS.sage}
              glowColor="#FF6B6B"
              alertMode={frame > 50}
            />
          </div>
        </Sequence>

        <Sequence from={15}>
          <AnimatedText
            text="O cérebro dele grita:"
            fontSize={44}
            color={COLORS.white}
            fontWeight={600}
            animation="fadeUp"
          />
        </Sequence>

        <Sequence from={50}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <AlertIcon size={80} color="#FF6B6B" />
            <AnimatedText
              text="PERIGO."
              fontSize={80}
              color="#FF6B6B"
              fontWeight={900}
              animation="fadeScale"
            />
            <AlertIcon size={80} color="#FF6B6B" />
          </div>
        </Sequence>

        <Sequence from={90}>
          <AnimatedText
            text="Mesmo que seja só uma cenoura."
            fontSize={40}
            color={COLORS.lightPeach}
            fontWeight={500}
            animation="fadeUp"
          />
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 6 — Hypersensitivity (925-1110 frames, ~6.2s)
// ============================================
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`linear-gradient(180deg, #1e2e1e 0%, ${COLORS.darkGreen} 100%)`}
    >
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.25} />
      <Particles count={30} colors={[COLORS.sage, COLORS.peach, COLORS.white]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <AnimatedText
            text="Isso se chama"
            fontSize={42}
            color={COLORS.lightPeach}
            fontWeight={500}
            animation="fadeUp"
          />
        </Sequence>

        <Sequence from={30}>
          <div
            style={{
              padding: "20px 40px",
              border: `2px solid ${COLORS.sage}`,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.sage}15, ${COLORS.peach}15)`,
              opacity: interpolate(frame - 30, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `scale(${interpolate(frame - 30, [0, 20], [0.8, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
                easing: Easing.out(Easing.back(1.5)),
              })})`,
            }}
          >
            <AnimatedText
              text="hipersensibilidade sensorial."
              fontSize={50}
              color={COLORS.peach}
              fontWeight={800}
              animation="fadeScale"
              startFrame={0}
            />
          </div>
        </Sequence>

        <Sequence from={70}>
          <div
            style={{
              opacity: interpolate(frame - 70, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            <BrainIcon size={150} color={COLORS.sage} glowColor={COLORS.peach} />
          </div>
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 7 — Not your fault (1110-1310 frames, ~6.7s)
// ============================================
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`radial-gradient(ellipse at 50% 50%, #2D4B2D 0%, ${COLORS.darkGreen} 100%)`}
    >
      <Particles count={20} colors={[COLORS.sage, COLORS.lightPeach]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <AnimatedText
            text="Não é falta de educação."
            fontSize={48}
            color={COLORS.white}
            fontWeight={700}
            animation="fadeUp"
            highlightWords={["Não"]}
            highlightColor={COLORS.peach}
          />
        </Sequence>

        <Sequence from={50}>
          <AnimatedText
            text="Não é culpa sua."
            fontSize={48}
            color={COLORS.white}
            fontWeight={700}
            animation="fadeUp"
            highlightWords={["Não", "culpa"]}
            highlightColor={COLORS.peach}
          />
        </Sequence>

        <Sequence from={100}>
          <div
            style={{
              padding: "15px 35px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.sage}30, ${COLORS.peach}30)`,
              opacity: interpolate(frame - 100, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `scale(${interpolate(frame - 100, [0, 20], [0.9, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
                easing: Easing.out(Easing.back(1.5)),
              })})`,
            }}
          >
            <AnimatedText
              text="É neurologia."
              fontSize={60}
              color={COLORS.sage}
              fontWeight={900}
              animation="fadeScale"
              startFrame={0}
            />
          </div>
        </Sequence>
      </div>

      <SceneTransition type="fade" durationFrames={12} color={COLORS.darkGreen} />
    </SceneContainer>
  );
};

// ============================================
// SCENE 8 — CTA (1310-1500 frames, ~6.3s)
// ============================================
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer
      background={`radial-gradient(ellipse at 50% 40%, #3B5B3B 0%, ${COLORS.darkGreen} 100%)`}
    >
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.1} />
      <Particles count={25} colors={[COLORS.sage, COLORS.peach, COLORS.lightPeach]} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          zIndex: 10,
        }}
      >
        <Sequence from={5}>
          <AnimatedText
            text="Entender é o primeiro passo pra ajudar."
            fontSize={44}
            color={COLORS.white}
            fontWeight={600}
            animation="splitReveal"
            highlightWords={["Entender", "ajudar"]}
            highlightColor={COLORS.peach}
          />
        </Sequence>

        {/* Divider line */}
        <Sequence from={50}>
          <div
            style={{
              width: interpolate(frame - 50, [0, 20], [0, 300], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              height: 2,
              background: `linear-gradient(90deg, transparent, ${COLORS.sage}, transparent)`,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </Sequence>

        {/* Brand */}
        <Sequence from={60}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
              opacity: interpolate(frame - 60, [0, 20], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
              transform: `translateY(${interpolate(frame - 60, [0, 20], [20, 0], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              })}px)`,
            }}
          >
            <div
              style={{
                fontSize: 26,
                color: COLORS.sage,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              🌿
            </div>
            <div
              style={{
                fontSize: 42,
                color: COLORS.peach,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.01em",
                textShadow: `0 2px 15px ${COLORS.peach}40`,
              }}
            >
              Seletividade Com Amor
            </div>
          </div>
        </Sequence>

        {/* CTA */}
        <Sequence from={100}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: interpolate(frame - 100, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              }),
            }}
          >
            <HeartIcon size={50} color={COLORS.peach} />
            <AnimatedText
              text="Siga e salve esse vídeo ❤️"
              fontSize={34}
              color={COLORS.lightPeach}
              fontWeight={600}
              animation="fadeUp"
              startFrame={0}
            />
          </div>
        </Sequence>
      </div>
    </SceneContainer>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================
export const SeletividadeAlimentar: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene timings (in frames at 30fps)
  const scenes = [
    { start: 0, duration: 185 },     // Scene 1: Hook
    { start: 185, duration: 185 },    // Scene 2: Brain
    { start: 370, duration: 185 },    // Scene 3: Texture
    { start: 555, duration: 185 },    // Scene 4: Smell
    { start: 740, duration: 185 },    // Scene 5: Danger
    { start: 925, duration: 185 },    // Scene 6: Hypersensitivity
    { start: 1110, duration: 200 },   // Scene 7: Not your fault
    { start: 1310, duration: 190 },   // Scene 8: CTA
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkGreen }}>
      <Sequence from={scenes[0].start} durationInFrames={scenes[0].duration}>
        <Scene1 />
      </Sequence>

      <Sequence from={scenes[1].start} durationInFrames={scenes[1].duration}>
        <Scene2 />
      </Sequence>

      <Sequence from={scenes[2].start} durationInFrames={scenes[2].duration}>
        <Scene3 />
      </Sequence>

      <Sequence from={scenes[3].start} durationInFrames={scenes[3].duration}>
        <Scene4 />
      </Sequence>

      <Sequence from={scenes[4].start} durationInFrames={scenes[4].duration}>
        <Scene5 />
      </Sequence>

      <Sequence from={scenes[5].start} durationInFrames={scenes[5].duration}>
        <Scene6 />
      </Sequence>

      <Sequence from={scenes[6].start} durationInFrames={scenes[6].duration}>
        <Scene7 />
      </Sequence>

      <Sequence from={scenes[7].start} durationInFrames={scenes[7].duration}>
        <Scene8 />
      </Sequence>

      {/* Global progress bar */}
      <ProgressBar totalFrames={1500} />

      {/* Global fade in */}
      <Sequence from={0} durationInFrames={20}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000",
            opacity: interpolate(frame, [0, 20], [1, 0], {
              extrapolateRight: "clamp",
            }),
            zIndex: 200,
          }}
        />
      </Sequence>

      {/* Global fade out */}
      {frame > 1470 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000",
            opacity: interpolate(frame, [1470, 1500], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            zIndex: 200,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
