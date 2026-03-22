import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ═══════════════════════════════════════════════════════════════
// SELETIVIDADE COM AMOR — Vídeo "5 Sinais"
// Enhanced by XSquads Agents:
//   Storytelling Squad — Croc Brain Hook, Normal > Explosion > New Normal
//   Copy Squad — Emotional triggers, curiosity gaps, sensory language
//   Design Squad — Motion tokens, visual hierarchy, typography scale
//   Brand Squad — Caregiver+Sage archetype, warm authoritative voice
// ═══════════════════════════════════════════════════════════════

// --- Palette (Brand Squad: warm, nurturing, accessible) ---
const SAGE = "#8BA888";
const PEACH = "#E8B4A2";
const WHITE = "#FFFFFF";
const DARK_GREEN = "#2D3B2D";
const LIGHT_PEACH = "#FDF0EB";

// --- Design Squad: spacing system (8px base unit) ---
const MARGIN = 80;
const SPACING = {
  sm: 16,
  md: 24,
  lg: 40,
};

// --- Design Squad: typography scale for mobile vertical ---
const TYPE = {
  hero: { fontSize: 76, fontWeight: "bold" as const, lineHeight: 1.15 },
  title: { fontSize: 56, fontWeight: "bold" as const, lineHeight: 1.25 },
  subtitle: { fontSize: 44, fontWeight: 600 as const, lineHeight: 1.35 },
  body: { fontSize: 38, fontWeight: 400 as const, lineHeight: 1.4 },
  caption: { fontSize: 32, fontWeight: 400 as const, lineHeight: 1.5 },
  number: { fontSize: 150, fontWeight: "bold" as const, lineHeight: 1 },
};

const centerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: MARGIN,
};

// ═══════════════════════════════════════════════════════════════
// ANIMATION SYSTEM (Design Squad: motion tokens)
// Entry: ease-out 200-300ms | Transition: ease-in-out 300-500ms
// Stagger: 200ms (6 frames) between elements
// ═══════════════════════════════════════════════════════════════

const useFadeIn = (frame: number, delay = 0, duration = 12) =>
  interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const useSlideUp = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.7 },
  });
  return {
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [50, 0])}px)`,
  };
};

const useSlideInLeft = (frame: number, fps: number, delay = 0) => {
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.7 },
  });
  return {
    opacity: progress,
    transform: `translateX(${interpolate(progress, [0, 1], [-100, 0])}px)`,
  };
};

const usePop = (frame: number, fps: number, delay = 0) => {
  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });
  return {
    opacity: s,
    transform: `scale(${interpolate(s, [0, 1], [0.2, 1])})`,
  };
};

// Storytelling Squad: pulse for emphasis moments
const usePulse = (frame: number, fps: number, delay = 0) => {
  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.4 },
  });
  return {
    transform: `scale(${interpolate(s, [0, 1], [0.95, 1.05])})`,
  };
};

// Design Squad: gentle float animation for ambient motion
const useFloat = (frame: number, amplitude = 4, speed = 0.03) => ({
  transform: `translateY(${Math.sin(frame * speed) * amplitude}px)`,
});

// --- Cross-fade wrapper (Design Squad: 300ms transitions) ---
const SceneWrap: React.FC<{
  bg: string;
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ bg, children, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeFrames = 9; // ~300ms at 30fps

  const opacity = interpolate(
    frame,
    [0, fadeFrames, durationInFrames - fadeFrames, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ ...centerStyle, backgroundColor: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// Decorative elements (Design Squad: visual depth layers)
// ═══════════════════════════════════════════════════════════════

const FloatingCircle: React.FC<{
  size: number;
  color: string;
  circleOpacity: number;
  top: string;
  left: string;
  delay?: number;
}> = ({ size, color, circleOpacity, top, left, delay = 0 }) => {
  const frame = useCurrentFrame();
  const fadeIn = useFadeIn(frame, delay, 20);
  const float = useFloat(frame, 6, 0.02 + (delay || 0) * 0.001);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: circleOpacity * fadeIn,
        top,
        left,
        ...float,
      }}
    />
  );
};

// Subtle decorative line accent
const AccentLine: React.FC<{
  color: string;
  width: number;
  delay?: number;
}> = ({ color, width, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: Math.max(0, frame - (delay || 0)),
    fps,
    config: { damping: 20, stiffness: 100, mass: 1 },
  });

  return (
    <div
      style={{
        width: width * progress,
        height: 4,
        backgroundColor: color,
        borderRadius: 2,
        marginTop: SPACING.md,
        marginBottom: SPACING.md,
        opacity: progress,
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 1 — HOOK (0-4s)
// Storytelling: Croc Brain — 3 seconds to make them FEEL
// Copy: Curiosity gap + emotional recognition
// ═══════════════════════════════════════════════════════════════
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 120;

  const mainPop = usePop(frame, fps, 0);
  const subStyle = useSlideUp(frame, fps, 18);
  const lineStyle = useFadeIn(frame, 12, 15);

  return (
    <SceneWrap bg={SAGE} durationInFrames={dur}>
      {/* Design Squad: background depth layers */}
      <FloatingCircle size={200} color={PEACH} circleOpacity={0.08} top="10%" left="-5%" delay={5} />
      <FloatingCircle size={140} color={WHITE} circleOpacity={0.05} top="70%" left="75%" delay={10} />

      <div style={{ zIndex: 1, ...centerStyle, padding: MARGIN }}>
        {/* Storytelling: Start with visceral moment of recognition */}
        <div
          style={{
            color: WHITE,
            ...TYPE.hero,
            textAlign: "center",
            ...mainPop,
          }}
        >
          Seu filho so come{"\n"}5 coisas?
        </div>

        {/* Design Squad: accent line as visual separator */}
        <div style={{ opacity: lineStyle }}>
          <AccentLine color={PEACH} width={120} delay={10} />
        </div>

        {/* Copy Squad: Curiosity gap — creates open loop */}
        <div
          style={{
            color: PEACH,
            ...TYPE.subtitle,
            textAlign: "center",
            ...subStyle,
          }}
        >
          Isso tem nome.
        </div>
      </div>
    </SceneWrap>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2 — INTRODUCAO (4-8s)
// Storytelling: Establish the "Normal" — this is common
// Copy: Validation + authority positioning (Sage archetype)
// ═══════════════════════════════════════════════════════════════
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 120;

  const titleStyle = useSlideUp(frame, fps, 3);
  const lineDelay = 15;
  const subStyle = useSlideUp(frame, fps, 22);
  const noteStyle = useSlideUp(frame, fps, 38);

  return (
    <SceneWrap bg={LIGHT_PEACH} durationInFrames={dur}>
      <FloatingCircle size={160} color={SAGE} circleOpacity={0.06} top="15%" left="70%" delay={3} />
      <FloatingCircle size={100} color={PEACH} circleOpacity={0.08} top="75%" left="10%" delay={8} />

      <div style={{ zIndex: 1, ...centerStyle, padding: MARGIN }}>
        <div
          style={{
            color: DARK_GREEN,
            ...TYPE.hero,
            textAlign: "center",
            ...titleStyle,
          }}
        >
          Seletividade{"\n"}Alimentar
        </div>

        <AccentLine color={SAGE} width={100} delay={lineDelay} />

        <div
          style={{
            color: SAGE,
            ...TYPE.subtitle,
            textAlign: "center",
            ...subStyle,
          }}
        >
          Afeta ate 50% das criancas
        </div>

        {/* Copy Squad: Validation — parent is not alone */}
        <div
          style={{
            color: DARK_GREEN,
            ...TYPE.caption,
            textAlign: "center",
            marginTop: SPACING.lg,
            ...noteStyle,
            opacity: noteStyle.opacity ? noteStyle.opacity * 0.7 : 0.7,
          }}
        >
          E nao, nao e frescura.
        </div>
      </div>
    </SceneWrap>
  );
};

// ═══════════════════════════════════════════════════════════════
// SIGNAL SCENE — Reusable (scenes 3-7)
// Storytelling: "Hourglass" — give each sign time to land
// Design: Hero element > supporting > context (stagger 200ms)
// Copy: Each sign = micro-explosion of recognition
// ═══════════════════════════════════════════════════════════════
const SignalScene: React.FC<{
  num: string;
  numColor: string;
  bg: string;
  title: string;
  subtitle: string;
  textColor: string;
  subColor: string;
  accentColor: string;
  durationInFrames: number;
}> = ({
  num,
  numColor,
  bg,
  title,
  subtitle,
  textColor,
  subColor,
  accentColor,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Design Squad: stagger 6 frames (200ms) between elements
  const numStyle = usePop(frame, fps, 2);
  const lineDelay = 10;
  const titleStyle = useSlideInLeft(frame, fps, 14);
  const subStyle = useSlideInLeft(frame, fps, 26);

  // Storytelling: subtle pulse on number for emphasis
  const pulse = usePulse(frame, fps, 8);

  return (
    <SceneWrap bg={bg} durationInFrames={durationInFrames}>
      {/* Design Squad: ambient depth circles */}
      <FloatingCircle
        size={180}
        color={accentColor}
        circleOpacity={0.06}
        top="8%"
        left="65%"
        delay={2}
      />
      <FloatingCircle
        size={120}
        color={accentColor}
        circleOpacity={0.04}
        top="78%"
        left="-3%"
        delay={6}
      />

      <div style={{ zIndex: 1, ...centerStyle, padding: MARGIN }}>
        {/* Hero element: large number with pop + pulse */}
        <div
          style={{
            color: numColor,
            ...TYPE.number,
            ...numStyle,
            ...pulse,
          }}
        >
          {num}
        </div>

        <AccentLine color={accentColor} width={80} delay={lineDelay} />

        {/* Supporting: title slides in from left */}
        <div
          style={{
            color: textColor,
            ...TYPE.title,
            textAlign: "center",
            marginTop: SPACING.sm,
            ...titleStyle,
          }}
        >
          {title}
        </div>

        {/* Context: subtitle with lighter weight */}
        <div
          style={{
            color: subColor,
            ...TYPE.body,
            textAlign: "center",
            marginTop: SPACING.md,
            ...subStyle,
          }}
        >
          {subtitle}
        </div>
      </div>
    </SceneWrap>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 8 — CTA (34-40s)
// Storytelling: "New Normal" — transformation moment
// Copy: Empowerment, not diagnosis. You are the hero.
// Brand: Caregiver archetype — warm, supportive close
// ═══════════════════════════════════════════════════════════════
const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = 180;

  const heartFade = useFadeIn(frame, 3, 20);
  const heartPulse = usePulse(frame, fps, 10);
  const logoStyle = useSlideUp(frame, fps, 18);
  const lineDelay = 28;
  const ctaStyle = useSlideUp(frame, fps, 38);
  const taglineStyle = useSlideUp(frame, fps, 52);

  return (
    <SceneWrap bg={SAGE} durationInFrames={dur}>
      {/* Gradient overlay: sage to peach (brand warmth) */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${SAGE} 0%, ${PEACH}CC 100%)`,
        }}
      />

      {/* Decorative circles for depth */}
      <FloatingCircle size={220} color={WHITE} circleOpacity={0.06} top="5%" left="60%" delay={3} />
      <FloatingCircle size={160} color={WHITE} circleOpacity={0.04} top="65%" left="-8%" delay={8} />

      <div style={{ ...centerStyle, zIndex: 1, position: "relative" }}>
        {/* Storytelling: Transformation moment — empowerment */}
        <div
          style={{
            color: WHITE,
            ...TYPE.hero,
            textAlign: "center",
            opacity: heartFade,
            ...heartPulse,
          }}
        >
          Voce nao esta{"\n"}sozinha
        </div>

        <AccentLine color={WHITE} width={100} delay={lineDelay} />

        {/* Brand identity */}
        <div
          style={{
            color: WHITE,
            ...TYPE.title,
            textAlign: "center",
            marginTop: SPACING.lg,
            ...logoStyle,
          }}
        >
          Seletividade{"\n"}Com Amor
        </div>

        {/* Copy Squad: CTA with identity */}
        <div
          style={{
            color: DARK_GREEN,
            ...TYPE.subtitle,
            textAlign: "center",
            marginTop: SPACING.lg,
            ...ctaStyle,
          }}
        >
          Siga para mais dicas
        </div>

        {/* Brand Squad: tagline — Caregiver closing */}
        <div
          style={{
            color: WHITE,
            ...TYPE.caption,
            textAlign: "center",
            marginTop: SPACING.md,
            ...taglineStyle,
            opacity: taglineStyle.opacity ? taglineStyle.opacity * 0.8 : 0.8,
          }}
        >
          Entender e o primeiro passo.
        </div>
      </div>
    </SceneWrap>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// Storytelling: Normal (1-2) > Explosion (3-7) > New Normal (8)
// Total: 40 seconds (1200 frames at 30fps)
// ═══════════════════════════════════════════════════════════════
export const SeletividadeVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: SAGE }}>
      {/* === ACT 1: NORMAL (Storytelling: establish recognition) === */}

      {/* Scene 1: Hook 0-4s — Croc Brain emotional punch */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: Intro 4-8s — Name the problem, validate */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      {/* === ACT 2: EXPLOSION (Storytelling: 5 signs reveal pattern) === */}

      {/* Scene 3: Sinal 1 — 8-14s (180 frames) */}
      <Sequence from={240} durationInFrames={180}>
        <SignalScene
          num="1"
          numColor={PEACH}
          bg={SAGE}
          title={"Recusa alimentos\npela textura"}
          subtitle={"Nao e birra.\nE sensibilidade sensorial."}
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          accentColor={PEACH}
          durationInFrames={180}
        />
      </Sequence>

      {/* Scene 4: Sinal 2 — 14-19s (150 frames) */}
      <Sequence from={420} durationInFrames={150}>
        <SignalScene
          num="2"
          numColor={SAGE}
          bg={LIGHT_PEACH}
          title={"So aceita a\nmesma comida"}
          subtitle={"O mesmo prato, do mesmo\njeito, sempre."}
          textColor={DARK_GREEN}
          subColor={SAGE}
          accentColor={SAGE}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 5: Sinal 3 — 19-24s (150 frames) */}
      <Sequence from={570} durationInFrames={150}>
        <SignalScene
          num="3"
          numColor={PEACH}
          bg={SAGE}
          title={"Chora ou tem ansia\nao ver comida nova"}
          subtitle={"O corpo reage antes\nda escolha."}
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          accentColor={PEACH}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 6: Sinal 4 — 24-29s (150 frames) */}
      <Sequence from={720} durationInFrames={150}>
        <SignalScene
          num="4"
          numColor={SAGE}
          bg={LIGHT_PEACH}
          title={"Come bem na escola\nmas nao em casa"}
          subtitle={"Ou o contrario.\nAmbiente importa."}
          textColor={DARK_GREEN}
          subColor={SAGE}
          accentColor={SAGE}
          durationInFrames={150}
        />
      </Sequence>

      {/* Scene 7: Sinal 5 — 29-34s (150 frames) */}
      <Sequence from={870} durationInFrames={150}>
        <SignalScene
          num="5"
          numColor={PEACH}
          bg={SAGE}
          title={"As refeicoes viram\numa batalha"}
          subtitle={"Se tem choro todo dia,\npreste atencao."}
          textColor={WHITE}
          subColor={LIGHT_PEACH}
          accentColor={PEACH}
          durationInFrames={150}
        />
      </Sequence>

      {/* === ACT 3: NEW NORMAL (Storytelling: transformation + empowerment) === */}

      {/* Scene 8: CTA 34-40s — Caregiver close, warm empowerment */}
      <Sequence from={1020} durationInFrames={180}>
        <Scene8 />
      </Sequence>
    </AbsoluteFill>
  );
};
