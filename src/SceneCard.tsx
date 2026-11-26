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

  // Natural physics spring easing for entry
  const entrySpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.4,
      stiffness: 220,
    },
  });

  // Outro transition curve
  const outroDuration = 12;
  const outroStart = Math.max(0, scene.durationInFrames - outroDuration);
  const outroProgress = interpolate(
    frame,
    [outroStart, scene.durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Variant-specific Camera & Zoom Dynamics
  const isGlitch = scene.styleVariant === "glitch-split";
  const isNeon = scene.styleVariant === "neon-blur";
  const isVortex = scene.styleVariant === "star-vortex";
  const isFlash = scene.styleVariant === "flash-cut";
  const isHyper = scene.styleVariant === "hyper-shake";
  const isKinetic = scene.styleVariant === "kinetic-zoom";

  // Flash cut strobe effect
  const flashStrobe = isFlash && frame < 6 ? (frame % 2 === 0 ? 1 : 0.2) : 1;
  const flashBg = isFlash && frame < 3 ? "#ffffff" : null;

  // Camera Shake & Impulse
  const isHeavyImpact = isHyper || (frame < 10) || (frame > outroStart - 4);
  const shakeBase = isHeavyImpact ? (isHyper ? 22 : 12) : 2.5;
  const shakeX = (random(`shk-x-${frame}`) - 0.5) * shakeBase;
  const shakeY = (random(`shk-y-${frame}`) - 0.5) * shakeBase;

  // 3D Gyroscope Handheld Drift
  const camRotateX = Math.sin(frame / 20) * (isVortex ? 16 : 8);
  const camRotateY = Math.cos(frame / 24) * (isVortex ? 22 : 10);
  const camRotateZ = interpolate(entrySpring, [0, 1], [isGlitch ? -12 : -6, 0]) + Math.sin(frame / 16) * 2;

  // Scale & Depth
  const introScale = interpolate(entrySpring, [0, 1], [isKinetic ? 0.3 : 0.65, 1]);
  const continuousZoom = interpolate(frame, [0, scene.durationInFrames], [1, isVortex ? 1.45 : 1.2]);
  const outroZoom = interpolate(outroProgress, [0, 1], [1, 1.5]);
  const totalScale = introScale * continuousZoom * outroZoom;

  // Chromatic shift calculation
  const chromaticShift = (isGlitch || isHeavyImpact)
    ? (interpolate(Math.sin(frame * 1.5), [-1, 1], [-8, 8]) + (random(`chr-${frame}`) - 0.5) * 6)
    : interpolate(Math.sin(frame / 6), [-1, 1], [-3, 3]);

  // Optical Blur calculation
  const opticalBlur = isNeon
    ? interpolate(entrySpring, [0, 1], [24, 0])
    : interpolate(entrySpring, [0, 1], [10, 0]);

  // Overall Layer Opacity
  const sceneOpacity = interpolate(
    frame,
    [0, 5, outroStart, scene.durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Audio Equalizer Spectrum simulation (18 bars)
  const eqBars = Array.from({ length: 18 }).map((_, i) => {
    const freq = Math.sin(frame * 0.35 + i * 0.7) * 0.5 + 0.5;
    const barHeight = 15 + freq * (isHeavyImpact ? 85 : 55);
    return { id: i, height: barHeight };
  });

  // Background Starfield / Particle Vortex
  const stars = Array.from({ length: 32 }).map((_, i) => {
    const angle = (i / 32) * Math.PI * 2 + (isVortex ? frame * 0.05 : 0);
    const radius = 100 + (i * 28 + (frame * (isVortex ? 12 : 2))) % (width * 0.85);
    const x = width / 2 + Math.cos(angle) * radius;
    const y = height / 2 + Math.sin(angle) * radius;
    const size = 1.5 + (radius / (width * 0.85)) * 4.5;
    const glow = 0.3 + 0.7 * Math.sin(frame * 0.2 + i);
    return { id: i, x, y, size, glow };
  });

  // Background Theme Gradient based on Accent
  const bgGradient = flashBg
    ? flashBg
    : isNeon
    ? `radial-gradient(circle at 50% 50%, ${scene.accentColor}25 0%, #060411 60%, #010005 100%)`
    : isGlitch
    ? `radial-gradient(ellipse at 50% 40%, #15002a 0%, #05000c 65%, #000000 100%)`
    : `radial-gradient(circle at 50% 45%, #0d0a21 0%, #030209 65%, #000000 100%)`;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        background: bgGradient,
        overflow: "hidden",
        perspective: 1200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'Montserrat', -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Ambient Glow Nebula */}
      <div
        style={{
          position: "absolute",
          width: 950,
          height: 950,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${scene.accentColor}38 0%, #6366f118 45%, transparent 75%)`,
          filter: `blur(${80 + Math.sin(frame / 15) * 20}px)`,
          transform: `scale(${1.1 + Math.sin(frame / 22) * 0.2}) rotate(${frame * 0.3}deg)`,
          pointerEvents: "none",
        }}
      />

      {/* Floating Ethereal Particles / Celestial Vortex */}
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
            boxShadow: `0 0 10px ${scene.accentColor}, 0 0 20px #ffffff`,
          }}
        />
      ))}

      {/* Subtle Film Grain / Scanline Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 20,
        }}
      />

      {/* High-End Vignette Rim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />

      {/* Modern Editorial HUD Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
          opacity: 0.75,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.25em",
          color: "rgba(255, 255, 255, 0.6)",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              boxShadow: "0 0 10px #ef4444",
            }}
          />
          <span>REC // {scene.styleVariant.toUpperCase()}</span>
        </div>
        <div>{Math.floor(frame / fps).toString().padStart(2, "0")}:{(frame % fps).toString().padStart(2, "0")} FPS:30</div>
      </div>

      {/* 3D Kinetic Text Stage */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          transform: `translate3d(${shakeX}px, ${shakeY}px, 0) rotateX(${camRotateX}deg) rotateY(${camRotateY}deg) rotateZ(${camRotateZ}deg) scale(${totalScale})`,
          opacity: sceneOpacity * flashStrobe,
          filter: `blur(${opticalBlur}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 40px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Editorial Sub-Pill Badge */}
        {scene.subText && (
          <div
            style={{
              padding: "9px 26px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${scene.accentColor}50`,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.35em",
              color: scene.accentColor,
              textTransform: "uppercase",
              marginBottom: 42,
              boxShadow: `0 0 35px ${scene.accentColor}33`,
              opacity: interpolate(frame, [0, 8], [0, 1]),
            }}
          >
            ✦ {scene.subText} ✦
          </div>
        )}

        {/* Word Matrix with Staggered Letter Physics */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "22px 32px",
            maxWidth: 1020,
            transformStyle: "preserve-3d",
          }}
        >
          {scene.words.map((word, wordIdx) => {
            const isWordActive = frame >= word.startFrame;
            const wordDelayFrame = Math.max(0, frame - word.startFrame);
            const wordSpring = spring({
              frame: wordDelayFrame,
              fps,
              config: { damping: 11, mass: 0.35, stiffness: 280 },
            });

            const wordScale = isWordActive
              ? interpolate(wordSpring, [0, 1], [0.15, word.highlight ? 1.25 : 1.05])
              : 0;
            const wordOpacity = isWordActive
              ? interpolate(wordSpring, [0, 1], [0, 1])
              : 0;

            const glow = word.color || scene.accentColor;
            const isHighlighted = word.highlight;

            // Split into individual letters for choreography
            const letters = word.text.split("");

            return (
              <div
                key={wordIdx}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  transform: `scale(${wordScale})`,
                  opacity: wordOpacity,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Chromatic Red/Magenta Dispersion Pass */}
                {isHighlighted && (
                  <div
                    style={{
                      position: "absolute",
                      left: chromaticShift,
                      top: 0,
                      display: "inline-flex",
                      userSelect: "none",
                      pointerEvents: "none",
                      opacity: 0.7,
                      filter: "blur(2px)",
                    }}
                  >
                    {letters.map((char, cIdx) => (
                      <span
                        key={cIdx}
                        style={{
                          fontSize: 88,
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          color: "#ff0055",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                )}

                {/* Chromatic Cyan/Blue Dispersion Pass */}
                {isHighlighted && (
                  <div
                    style={{
                      position: "absolute",
                      left: -chromaticShift,
                      top: 0,
                      display: "inline-flex",
                      userSelect: "none",
                      pointerEvents: "none",
                      opacity: 0.7,
                      filter: "blur(2px)",
                    }}
                  >
                    {letters.map((char, cIdx) => (
                      <span
                        key={cIdx}
                        style={{
                          fontSize: 88,
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          color: "#00ffff",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                )}

                {/* Main Crisp Letter Matrix */}
                <div style={{ display: "inline-flex", transformStyle: "preserve-3d" }}>
                  {letters.map((char, cIdx) => {
                    const charDelay = cIdx * 1.5;
                    const charSpring = spring({
                      frame: Math.max(0, wordDelayFrame - charDelay),
                      fps,
                      config: { damping: 9, mass: 0.25, stiffness: 340 },
                    });
                    const charY = interpolate(charSpring, [0, 1], [-25, 0]);
                    const charRotZ = interpolate(charSpring, [0, 1], [(cIdx % 2 === 0 ? -15 : 15), 0]);

                    return (
                      <span
                        key={cIdx}
                        style={{
                          display: "inline-block",
                          transform: `translateY(${charY}px) rotateZ(${charRotZ}deg)`,
                          fontSize: isHighlighted ? 90 : 74,
                          fontWeight: 900,
                          letterSpacing: "-0.04em",
                          textTransform: "uppercase",
                          color: isHighlighted ? "#ffffff" : "#cbd5e1",
                          textShadow: isHighlighted
                            ? `0 0 25px ${glow}, 0 0 50px ${glow}, 0 0 100px ${glow}`
                            : "0 10px 35px rgba(0,0,0,0.9)",
                          WebkitTextStroke: isHighlighted ? `2.5px ${glow}` : "none",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Energy Divider */}
        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 100,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${scene.accentColor})`,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: scene.accentColor,
              boxShadow: `0 0 20px ${scene.accentColor}`,
            }}
          />
          <div
            style={{
              width: 100,
              height: 3,
              background: `linear-gradient(90deg, ${scene.accentColor}, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Rhythmic Bottom Audio Spectrum Visualizer */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 8,
          zIndex: 25,
          opacity: 0.85,
        }}
      >
        {eqBars.map((bar) => (
          <div
            key={bar.id}
            style={{
              width: 5,
              height: bar.height,
              borderRadius: 3,
              background: `linear-gradient(to top, ${scene.accentColor} 0%, #ffffff 100%)`,
              boxShadow: `0 0 12px ${scene.accentColor}88`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
