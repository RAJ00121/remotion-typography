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

  // Snappy exponential spring for instant hook punch
  const entrySpring = spring({
    frame,
    fps,
    config: {
      damping: 10,
      mass: 0.35,
      stiffness: 280,
    },
  });

  // Outro transition
  const outroDuration = 10;
  const outroStart = scene.durationInFrames - outroDuration;
  const outroProgress = interpolate(
    frame,
    [outroStart, scene.durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 3D dynamic camera drift (cinematic handheld float)
  const camRotateX = Math.sin(frame / 18) * 8;
  const camRotateY = Math.cos(frame / 22) * 12;
  const camRotateZ = interpolate(entrySpring, [0, 1], [-8, 0]) + (Math.sin(frame / 14) * 2.5);

  // Kinetic Zoom punch at intro + continuous deep zoom
  const punchScale = interpolate(entrySpring, [0, 1], [0.35, 1]);
  const driftZoom = interpolate(frame, [0, scene.durationInFrames], [1, 1.25]);
  const outroZoom = interpolate(outroProgress, [0, 1], [1, 1.6]);
  const totalScale = punchScale * driftZoom * outroZoom;

  // Flash / Fade Opacity
  const opacity = interpolate(
    frame,
    [0, 4, outroStart, scene.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Sub-bass rhythm impact (camera shake)
  const isImpact = frame < 12 || (frame > outroStart - 5);
  const shakeIntensity = isImpact ? 14 : 2.5;
  const shakeX = (random(`shk-x-${frame}`) - 0.5) * shakeIntensity;
  const shakeY = (random(`shk-y-${frame}`) - 0.5) * shakeIntensity;

  // RGB split / chromatic aberration offset
  const chromaticShift = interpolate(
    Math.sin(frame / 5),
    [-1, 1],
    [-4, 4]
  ) * (isImpact ? 2.5 : 1);

  // 24 Ambient floating stardust & nebula elements
  const stars = Array.from({ length: 24 }).map((_, i) => {
    const startX = random(`star-x-${i}`) * width;
    const speedY = 1.2 + random(`star-s-${i}`) * 2.8;
    const currentY = (random(`star-y-${i}`) * height + frame * speedY) % height;
    const size = 2 + random(`star-sz-${i}`) * 5;
    const glow = 0.3 + 0.7 * Math.abs(Math.sin((frame + i * 15) / 12));
    return { id: i, x: startX, y: currentY, size, glow };
  });

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: "radial-gradient(circle at 50% 45%, #0c0a1f 0%, #030208 70%, #000000 100%)",
        overflow: "hidden",
        perspective: 1200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Montserrat', 'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Nebula Clouds */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${scene.accentColor}35 0%, #3b82f615 45%, transparent 75%)`,
          filter: "blur(90px)",
          transform: `scale(${1.1 + Math.sin(frame / 20) * 0.25}) rotate(${frame * 0.4}deg)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          right: "5%",
          top: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Ethereal Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            opacity: star.glow,
            boxShadow: `0 0 14px ${scene.accentColor}, 0 0 24px #ffffff`,
          }}
        />
      ))}

      {/* Retro VHS Scanline Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
          opacity: 0.5,
          zIndex: 20,
        }}
      />

      {/* Vignette Rim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />

      {/* 3D Kinetic Text Stage */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          transform: `translate3d(${shakeX}px, ${shakeY}px, 0) rotateX(${camRotateX}deg) rotateY(${camRotateY}deg) rotateZ(${camRotateZ}deg) scale(${totalScale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 50px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Kinetic Badge / Micro Header */}
        {scene.subText && (
          <div
            style={{
              padding: "8px 24px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${scene.accentColor}55`,
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.4em",
              color: scene.accentColor,
              textTransform: "uppercase",
              marginBottom: 36,
              boxShadow: `0 0 25px ${scene.accentColor}44`,
              opacity: interpolate(frame, [0, 8], [0, 1]),
            }}
          >
            ✦ {scene.subText} ✦
          </div>
        )}

        {/* Word Matrix with RGB Glitch & High Impact Glow */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px 30px",
            maxWidth: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          {scene.words.map((word, idx) => {
            const isWordActive = frame >= word.startFrame;
            const wordSpring = spring({
              frame: Math.max(0, frame - word.startFrame),
              fps,
              config: { damping: 9, mass: 0.3, stiffness: 320 },
            });

            // Fast explosive pop scale
            const scaleVal = isWordActive
              ? interpolate(wordSpring, [0, 1], [0.2, word.highlight ? 1.25 : 1.05])
              : 0;

            const wordOpacity = isWordActive
              ? interpolate(wordSpring, [0, 1], [0, 1])
              : 0;

            const glow = word.color || scene.accentColor;
            const isHighlighted = word.highlight;

            return (
              <div
                key={idx}
                style={{
                  position: "relative",
                  display: "inline-block",
                  transform: `scale(${scaleVal})`,
                  opacity: wordOpacity,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Chromatic Red Pass */}
                {isHighlighted && (
                  <span
                    style={{
                      position: "absolute",
                      left: chromaticShift,
                      top: 0,
                      fontSize: 88,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      color: "#ff0055",
                      opacity: 0.65,
                      filter: "blur(2px)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {word.text}
                  </span>
                )}

                {/* Chromatic Cyan Pass */}
                {isHighlighted && (
                  <span
                    style={{
                      position: "absolute",
                      left: -chromaticShift,
                      top: 0,
                      fontSize: 88,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      color: "#00ffff",
                      opacity: 0.65,
                      filter: "blur(2px)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {word.text}
                  </span>
                )}

                {/* Primary Crisp Text Layer */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    fontSize: isHighlighted ? 88 : 72,
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    color: isHighlighted ? "#ffffff" : "#cbd5e1",
                    textShadow: isHighlighted
                      ? `0 0 20px ${glow}, 0 0 45px ${glow}, 0 0 90px ${glow}`
                      : "0 8px 30px rgba(0,0,0,0.9)",
                    WebkitTextStroke: isHighlighted ? `2px ${glow}` : "none",
                  }}
                >
                  {word.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Energy Line */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${scene.accentColor})`,
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: scene.accentColor,
              boxShadow: `0 0 15px ${scene.accentColor}`,
            }}
          />
          <div
            style={{
              width: 80,
              height: 3,
              background: `linear-gradient(90deg, ${scene.accentColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
