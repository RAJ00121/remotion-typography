import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { LYRIC_SCENES } from "./lyricsData";
import { SceneCard } from "./SceneCard";

export const TypographyAnimation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Background Audio track (synced directly to the 30fps frames) */}
      <Audio src={staticFile("audio.webm")} />

      {/* Sequenced Scenes */}
      {LYRIC_SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
        >
          <SceneCard scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
