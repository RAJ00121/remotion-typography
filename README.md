# Remotion Kinetic Typography Animation 🎬

High-hook animated typography video project created with [Remotion](https://remotion.dev).

### Features
- 🎵 **Audio-Synced Kinetic Typography**: Mapped to *The Neighbourhood - Reflections* (Looped Slowed & Reverb Hook).
- ⚡ **High Retention & Hook Visuals**:
  - Spring-physics text reveals per word.
  - Glowing neon gradients and CRT scanline overlay.
  - Glitch, hyper-shake, and drift zoom cameras.
  - Multi-layered starfield ambient particle systems.
- 📱 **Dual Format Compositions**:
  - `TypographyAnimation`: 9:16 vertical (1080x1920) ideal for YouTube Shorts, Reels, TikTok.
  - `TypographyAnimationLandscape`: 16:9 standard (1920x1080) for full displays.
- 🚀 **Automated GitHub Actions Render Pipeline**:
  - Powered by Node.js 22 LTS with pnpm v10 and modern GitHub Action versions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`).
  - No deprecated Node.js 20 warnings.
  - Automatically exports rendered `.mp4` videos to GitHub Artifacts on push or manual trigger.

### GitHub Actions Rendering
Trigger manually under the **Actions** tab by choosing **Render Remotion Video** → **Run workflow**, or simply push to `main`. Once finished, download the rendered MP4s directly from Artifacts!
