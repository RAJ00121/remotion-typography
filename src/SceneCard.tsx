import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";
import { LyricScene } from "./lyricsData";

interface SceneCardProps {
  scene: LyricScene;
}

export const SceneCard: React.FC<SceneCardProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Intro spring pop
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 180,
    },
  });

  // Outro fade / zoom
  const outroStart = scene.durationInFrames - 15;
  const outroProgress = interpolate(
    frame,
    [outroStart, scene.durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dynamic Camera / Scale
  const baseScale = interpolate(enterSpring, [0, 1], [0.6, 1]);
  const driftScale = interpolate(frame, [0, scene.durationInFrames], [1, 1.15]);
  const scale = (baseScale * driftScale) * (1 + outroProgress * 0.25);
  const opacity = interpolate(
    frame,
    [0, 8, outroStart, scene.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Kinetic shake / glitch effect based on variant
  const isShake = scene.styleVariant === "hyper-shake" || scene.styleVariant === "glitch-split";
  const shakeX = isShake
    ? (random(`x-${frame}`) - 0.5) * 14 * (frame % 4 === 0 ? 1 : 0.2)
    : 0;
  const shakeY = isShake
    ? (random(`y-${frame}`) - 0.5) * 12 * (frame % 4 === 0 ? 1 : 0.2)
    : 0;
  const rotation = interpolate(enterSpring, [0, 1], [-6, 0]) + (shakeX * 0.15);

  // Background floating ambient particles
  const particleSeeds = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "radial-gradient(ellipse at center, #0f172a 0%, #030712 100%)",
        overflow: "hidden",
        fontFamily: "'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background Glow Aura */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${scene.accentColor}33 0%, transparent 70%)`,
          filter: "blur(60px)",
          transform: `scale(${1 + Math.sin(frame / 12) * 0.2})`,
          pointerEvents: "none",
        }}
      />

      {/* Starfield Particles */}
      {particleSeeds.map((seed) => {
        const pX = (random(`px-${seed}`) * width);
        const pY = ((random(`py-${seed}`) * height + frame * (1 + seed * 0.5)) % height);
        const pSize = random(`pz-${seed}`) * 4 + 2;
        const pOpacity = 0.3 + 0.5 * Math.sin((frame + seed * 20) / 10);
        return (
          <div
            key={seed}
            style={{
              position: "absolute",
              left: pX,
              top: pY,
              width: pSize,
              height: pSize,
              borderRadius: "50%",
              backgroundColor: scene.accentColor,
              opacity: pOpacity,
              boxShadow: `0 0 12px ${scene.accentColor}`,
            }}
          />
        );
      })}

      {/* Cinematic CRT Scanline Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 10,
        }}
      />

      {/* Main Kinetic Typography Container */}
      <div
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${scale}) rotate(${rotation}deg)`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 60px",
          zIndex: 5,
        }}
      >
        {/* Subtitle / Header Tag */}
        {scene.subText && (
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "0.35em",
              color: scene.accentColor,
              textTransform: "uppercase",
              marginBottom: 24,
              opacity: interpolate(frame, [0, 15], [0, 0.9], { extrapolateLeft: "clamp" }),
              textShadow: `0 0 18px ${scene.accentColor}88`,
            }}
          >
            {scene.subText}
          </div>
        )}

        {/* Highlighted Words Row with Individual Spring Hooks */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px 32px",
            maxWidth: 960,
          }}
        >
          {scene.words.map((word, idx) => {
            const wordActive = frame >= word.startFrame;
            const wordProgress = spring({
              frame: frame - word.startFrame,
              fps,
              config: { damping: 10, stiffness: 220, mass: 0.4 },
            });

            const wordScale = wordActive
              ? interpolate(wordProgress, [0, 1], [0.3, word.highlight ? 1.18 : 1])
              : 0;
            const wordOpacity = wordActive
              ? interpolate(wordProgress, [0, 1], [0, 1])
              : 0;

            const glowColor = word.color || scene.accentColor;
            const isWordHighlighted = word.highlight;

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  transform: `scale(${wordScale})`,
                  opacity: wordOpacity,
                  fontSize: isWordHighlighted ? 86 : 74,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: isWordHighlighted ? glowColor : "#f8fafc",
                  textShadow: isWordHighlighted
                    ? `0 0 35px ${glowColor}, 0 0 70px ${glowColor}66`
                    : "0 10px 30px rgba(0,0,0,0.8)",
                  transition: "color 0.2s ease",
                  filter: wordActive ? "none" : "blur(8px)",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>

        {/* Minimal Beat Indicator Bar */}
        <div
          style={{
            marginTop: 48,
            width: 240,
            height: 4,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${(frame / scene.durationInFrames) * 100}%`,
              background: `linear-gradient(90deg, #38bdf8, ${scene.accentColor})`,
              boxShadow: `0 0 10px ${scene.accentColor}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
