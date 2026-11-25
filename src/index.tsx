import { registerRoot } from "remotion";
import { Composition } from "remotion";
import { TypographyAnimation } from "./TypographyAnimation";
import { TOTAL_DURATION_FRAMES } from "./lyricsData";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Reel/Shorts format (1080x1920) - Highest engagement for lyric typography */}
      <Composition
        id="TypographyAnimation"
        component={TypographyAnimation}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* 16:9 Landscape variant (1920x1080) */}
      <Composition
        id="TypographyAnimationLandscape"
        component={TypographyAnimation}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
