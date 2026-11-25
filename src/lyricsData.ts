export interface WordCue {
  text: string;
  startFrame: number;
  endFrame: number;
  highlight?: boolean;
  color?: string;
}

export interface LyricScene {
  id: string;
  startFrame: number;
  durationInFrames: number;
  primaryText: string;
  subText?: string;
  words: WordCue[];
  styleVariant: "kinetic-zoom" | "glitch-split" | "neon-blur" | "star-vortex" | "flash-cut" | "hyper-shake";
  accentColor: string;
}

// 30 FPS timing mapped exactly to The Neighbourhood - Reflections (Slowed + Reverb looped hook)
export const LYRIC_SCENES: LyricScene[] = [
  {
    id: "scene-1",
    startFrame: 0,
    durationInFrames: 68, // ~2.26s
    primaryText: "SO CLOSE",
    subText: "FEELS LIKE REACHING OUT",
    words: [
      { text: "SO", startFrame: 5, endFrame: 22, highlight: true, color: "#38bdf8" },
      { text: "CLOSE", startFrame: 23, endFrame: 65, highlight: true, color: "#f43f5e" },
    ],
    styleVariant: "kinetic-zoom",
    accentColor: "#38bdf8",
  },
  {
    id: "scene-2",
    startFrame: 68,
    durationInFrames: 70, // ~2.3s
    primaryText: "SO CLOSE",
    subText: "YET SLIPPING THROUGH FINGERS",
    words: [
      { text: "SO", startFrame: 5, endFrame: 25, highlight: true, color: "#ec4899" },
      { text: "CLOSE", startFrame: 26, endFrame: 68, highlight: true, color: "#a855f7" },
    ],
    styleVariant: "glitch-split",
    accentColor: "#ec4899",
  },
  {
    id: "scene-3",
    startFrame: 138,
    durationInFrames: 140, // ~4.6s
    primaryText: "YET SO FAR AWAY",
    subText: "CAN YOU HEAR ME CALLING?",
    words: [
      { text: "YET", startFrame: 5, endFrame: 25 },
      { text: "SO", startFrame: 26, endFrame: 50, highlight: true, color: "#f59e0b" },
      { text: "FAR", startFrame: 51, endFrame: 85, highlight: true, color: "#ef4444" },
      { text: "AWAY", startFrame: 86, endFrame: 135, highlight: true, color: "#6366f1" },
    ],
    styleVariant: "neon-blur",
    accentColor: "#f59e0b",
  },
  {
    id: "scene-4",
    startFrame: 278,
    durationInFrames: 130, // ~4.3s
    primaryText: "HOW TO BE SOLO",
    subText: "LOST IN EMPTY ROOMS",
    words: [
      { text: "I", startFrame: 5, endFrame: 20 },
      { text: "DON'T", startFrame: 21, endFrame: 45 },
      { text: "KNOW", startFrame: 46, endFrame: 70, highlight: true, color: "#06b6d4" },
      { text: "SOLO", startFrame: 71, endFrame: 125, highlight: true, color: "#8b5cf6" },
    ],
    styleVariant: "flash-cut",
    accentColor: "#06b6d4",
  },
  {
    id: "scene-5",
    startFrame: 408,
    durationInFrames: 140, // ~4.6s
    primaryText: "SO DON'T GO, NO",
    subText: "JUST STAY WITH ME",
    words: [
      { text: "SO", startFrame: 5, endFrame: 25 },
      { text: "DON'T", startFrame: 26, endFrame: 55, highlight: true, color: "#f43f5e" },
      { text: "GO", startFrame: 56, endFrame: 80, highlight: true, color: "#fb7185" },
      { text: "JUST", startFrame: 81, endFrame: 105 },
      { text: "STAY", startFrame: 106, endFrame: 135, highlight: true, color: "#10b981" },
    ],
    styleVariant: "hyper-shake",
    accentColor: "#f43f5e",
  },
  {
    id: "scene-6",
    startFrame: 548,
    durationInFrames: 100, // ~3.3s
    primaryText: "SHOOTING THROUGH THE SKY",
    subText: "BRIGHTER THAN THE HORIZON",
    words: [
      { text: "YOU", startFrame: 5, endFrame: 20 },
      { text: "AND", startFrame: 21, endFrame: 35 },
      { text: "I", startFrame: 36, endFrame: 50, highlight: true, color: "#eab308" },
      { text: "SKY", startFrame: 51, endFrame: 95, highlight: true, color: "#38bdf8" },
    ],
    styleVariant: "kinetic-zoom",
    accentColor: "#38bdf8",
  },
  {
    id: "scene-7",
    startFrame: 648,
    durationInFrames: 85, // ~2.8s
    primaryText: "LIGHTING UP THE NIGHT",
    subText: "WASN'T ALWAYS RIGHT",
    words: [
      { text: "LIGHTING", startFrame: 5, endFrame: 30, highlight: true, color: "#ec4899" },
      { text: "UP", startFrame: 31, endFrame: 45 },
      { text: "THE", startFrame: 46, endFrame: 55 },
      { text: "NIGHT", startFrame: 56, endFrame: 80, highlight: true, color: "#f43f5e" },
    ],
    styleVariant: "glitch-split",
    accentColor: "#ec4899",
  },
  {
    id: "scene-8",
    startFrame: 733,
    durationInFrames: 130, // ~4.3s
    primaryText: "EVERY TIME WE REALIGN",
    subText: "AND YOU SAVE ME",
    words: [
      { text: "WE", startFrame: 5, endFrame: 25 },
      { text: "REALIGN", startFrame: 26, endFrame: 65, highlight: true, color: "#8b5cf6" },
      { text: "IT'S", startFrame: 66, endFrame: 80 },
      { text: "CRAZY", startFrame: 81, endFrame: 100, highlight: true, color: "#06b6d4" },
      { text: "SAVE ME", startFrame: 101, endFrame: 125, highlight: true, color: "#10b981" },
    ],
    styleVariant: "flash-cut",
    accentColor: "#8b5cf6",
  },
  {
    id: "scene-9",
    startFrame: 863,
    durationInFrames: 90, // ~3s
    primaryText: "TOO CLOSE TO THE STARS",
    subText: "HEAVEN NEVER FELT THIS NEAR",
    words: [
      { text: "TOO", startFrame: 5, endFrame: 20 },
      { text: "CLOSE", startFrame: 21, endFrame: 45, highlight: true, color: "#facc15" },
      { text: "TO THE", startFrame: 46, endFrame: 60 },
      { text: "STARS", startFrame: 61, endFrame: 85, highlight: true, color: "#f43f5e" },
    ],
    styleVariant: "star-vortex",
    accentColor: "#facc15",
  },
  {
    id: "scene-10",
    startFrame: 953,
    durationInFrames: 140, // ~4.6s
    primaryText: "I NEVER KNEW SOMEBODY",
    subText: "FALLING JUST AS HARD",
    words: [
      { text: "NEVER", startFrame: 5, endFrame: 30 },
      { text: "KNEW", startFrame: 31, endFrame: 55 },
      { text: "SOMEBODY", startFrame: 56, endFrame: 90, highlight: true, color: "#ec4899" },
      { text: "LIKE YOU", startFrame: 91, endFrame: 135, highlight: true, color: "#38bdf8" },
    ],
    styleVariant: "hyper-shake",
    accentColor: "#ec4899",
  },
  {
    id: "scene-11",
    startFrame: 1093,
    durationInFrames: 150, // ~5s
    primaryText: "FALLING JUST AS HARD",
    subText: "RATHER LOSE THAN USE SOMEBODY",
    words: [
      { text: "FALLING", startFrame: 5, endFrame: 45, highlight: true, color: "#f43f5e" },
      { text: "JUST", startFrame: 46, endFrame: 75 },
      { text: "AS", startFrame: 76, endFrame: 95 },
      { text: "HARD", startFrame: 96, endFrame: 145, highlight: true, color: "#a855f7" },
    ],
    styleVariant: "kinetic-zoom",
    accentColor: "#f43f5e",
  },
  {
    id: "scene-12",
    startFrame: 1243,
    durationInFrames: 180, // ~6s
    primaryText: "REFLECTION IN YOUR EYES",
    subText: "THE NEIGHBOURHOOD",
    words: [
      { text: "BLESSING", startFrame: 5, endFrame: 45, highlight: true, color: "#10b981" },
      { text: "IN", startFrame: 46, endFrame: 65 },
      { text: "DISGUISE", startFrame: 66, endFrame: 105, highlight: true, color: "#38bdf8" },
      { text: "REFLECTIONS", startFrame: 106, endFrame: 175, highlight: true, color: "#e11d48" },
    ],
    styleVariant: "neon-blur",
    accentColor: "#38bdf8",
  },
];

export const TOTAL_DURATION_FRAMES = 1450; // ~48.3 seconds of peak hook
