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
import { ProgressBar } from "./components/ProgressBar";
import { HeartIcon } from "./components/SensoryIcon";

const COLORS = {
  sage: "#8BA888",
  peach: "#E8B4A2",
  darkGreen: "#2D3B2D",
  lightPeach: "#FDF0EB",
  white: "#FFFFFF",
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
    }}
  >
    {children}
  </AbsoluteFill>
);

// CENA 1
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`radial-gradient(ellipse at 50% 40%, #2D3B2D 0%, #1a2a1a 100%)`}>
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.15} />
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* Quando seu filho cospe a comida… */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 65, 80], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Quando seu filho cospe a comida…
            </div>
          </div>
        )}

        {/* não é pirraça. */}
        {frame >= 85 && (
          <div style={{
            opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [85, 100], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              não é pirraça.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 2
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`linear-gradient(180deg, #2D3B2D 0%, #1e2e1e 50%, #2D3B2D 100%)`}>
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.15} />
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* O cérebro dele processa os alimentos de um jeito diferente. */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              O cérebro dele processa os alimentos de um jeito diferente.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 3
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`linear-gradient(180deg, #2D3B2D 0%, #1e2e1e 50%, #2D3B2D 100%)`}>
      
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* A textura que pra você é normal… */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 65, 80], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              A textura que pra você é normal…
            </div>
          </div>
        )}

        {/* pra ele é como mastigar areia. */}
        {frame >= 85 && (
          <div style={{
            opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [85, 100], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              pra ele é como mastigar areia.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 4
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`linear-gradient(180deg, #2D3B2D 0%, #1e2e1e 50%, #2D3B2D 100%)`}>
      
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* O cheiro que pra você é gostoso… */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 65, 80], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              O cheiro que pra você é gostoso…
            </div>
          </div>
        )}

        {/* pra ele é insuportável. */}
        {frame >= 85 && (
          <div style={{
            opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [85, 100], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              pra ele é insuportável.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 5
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const dangerFlash = frame > 60 ? interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 0.08]) : 0;

  return (
    <SceneContainer background={`radial-gradient(circle at 50% 50%, #3D2B2B 0%, #2D3B2D 100%)`}>
      
      
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#FF0000", opacity: dangerFlash, pointerEvents: "none", zIndex: 5 }} />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* O cérebro dele grita: */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 36, 51], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              O cérebro dele grita:
            </div>
          </div>
        )}

        {/* PERIGO. */}
        {frame >= 56 && (
          <div style={{
            opacity: interpolate(frame, [56, 71, 92, 107], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `scale(${interpolate(frame, [56, 71], [0.5, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.back(2)) })})`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 90, fontWeight: 900, color: "#FF6B6B", fontFamily: "'Inter', sans-serif", textShadow: "0 0 40px rgba(255,107,107,0.5)" }}>
              PERIGO.
            </div>
          </div>
        )}

        {/* Mesmo que seja só uma cenoura. */}
        {frame >= 112 && (
          <div style={{
            opacity: interpolate(frame, [112, 127], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [112, 127], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Mesmo que seja só uma cenoura.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 6
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`linear-gradient(180deg, #1e2e1e 0%, #2D3B2D 100%)`}>
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.15} />
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* Isso se chama */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 65, 80], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Isso se chama
            </div>
          </div>
        )}

        {/* hipersensibilidade sensorial. */}
        {frame >= 85 && (
          <div style={{
            opacity: interpolate(frame, [85, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [85, 100], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              hipersensibilidade sensorial.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 7
const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`radial-gradient(ellipse at 50% 50%, #2D4B2D 0%, #2D3B2D 100%)`}>
      
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* Não é falta de educação. */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 41, 56], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Não é falta de educação.
            </div>
          </div>
        )}

        {/* Não é culpa sua. */}
        {frame >= 61 && (
          <div style={{
            opacity: interpolate(frame, [61, 76, 102, 117], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [61, 76], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Não é culpa sua.
            </div>
          </div>
        )}

        {/* É neurologia. */}
        {frame >= 122 && (
          <div style={{
            opacity: interpolate(frame, [122, 137], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [122, 137], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: "#E8B4A2", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              É neurologia.
            </div>
          </div>
        )}
      </div>

      

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// CENA 8
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  

  return (
    <SceneContainer background={`radial-gradient(ellipse at 50% 40%, #3B5B3B 0%, #2D3B2D 100%)`}>
      <NeuralNetwork color={COLORS.sage} glowColor={COLORS.peach} opacity={0.15} />
      <Particles count={20} colors={[COLORS.sage, COLORS.peach]} />
      

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
        zIndex: 10,
        position: "absolute",
        inset: 0,
        padding: "180px 60px",
      }}>
        {/* Entender é o primeiro passo pra ajudar. */}
        {frame >= 0 && (
          <div style={{
            opacity: interpolate(frame, [0, 15, 38, 53], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Entender é o primeiro passo pra ajudar.
            </div>
          </div>
        )}

        {/* Seletividade Com Amor */}
        {frame >= 58 && (
          <div style={{
            opacity: interpolate(frame, [58, 73, 96, 111], [0, 1, 1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [58, 73], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 600, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Seletividade Com Amor
            </div>
          </div>
        )}

        {/* Siga e salve esse vídeo ❤️ */}
        {frame >= 116 && (
          <div style={{
            opacity: interpolate(frame, [116, 131], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            transform: `translateY(${interpolate(frame, [116, 131], [30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: "#FFFFFF", fontFamily: "'Inter', sans-serif", lineHeight: 1.4, maxWidth: 900, textShadow: "0 2px 20px rgba(0,0,0,0.3)", letterSpacing: "-0.02em" }}>
              Siga e salve esse vídeo ❤️
            </div>
          </div>
        )}
      </div>

      
      {frame >= 80 && (
        <div style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [80, 95], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          zIndex: 10,
        }}>
          <HeartIcon size={50} color={COLORS.peach} />
        </div>
      )}

      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none" }} />
    </SceneContainer>
  );
};

// COMPOSIÇÃO PRINCIPAL
export const SeletividadeAlimentar: React.FC = () => {
  const frame = useCurrentFrame();

  const scenes = [
    { start: 0, duration: 185 },
    { start: 185, duration: 185 },
    { start: 370, duration: 185 },
    { start: 555, duration: 185 },
    { start: 740, duration: 185 },
    { start: 925, duration: 185 },
    { start: 1110, duration: 200 },
    { start: 1310, duration: 190 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkGreen }}>
      <Sequence from={scenes[0].start} durationInFrames={scenes[0].duration}><Scene1 /></Sequence>
      <Sequence from={scenes[1].start} durationInFrames={scenes[1].duration}><Scene2 /></Sequence>
      <Sequence from={scenes[2].start} durationInFrames={scenes[2].duration}><Scene3 /></Sequence>
      <Sequence from={scenes[3].start} durationInFrames={scenes[3].duration}><Scene4 /></Sequence>
      <Sequence from={scenes[4].start} durationInFrames={scenes[4].duration}><Scene5 /></Sequence>
      <Sequence from={scenes[5].start} durationInFrames={scenes[5].duration}><Scene6 /></Sequence>
      <Sequence from={scenes[6].start} durationInFrames={scenes[6].duration}><Scene7 /></Sequence>
      <Sequence from={scenes[7].start} durationInFrames={scenes[7].duration}><Scene8 /></Sequence>

      <ProgressBar totalFrames={1500} />

      {frame < 20 && (
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#000", opacity: interpolate(frame, [0, 20], [1, 0], { extrapolateRight: "clamp" }), zIndex: 200 }} />
      )}
      {frame > 1470 && (
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#000", opacity: interpolate(frame, [1470, 1500], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), zIndex: 200 }} />
      )}
    </AbsoluteFill>
  );
};
