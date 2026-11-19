import type React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const PixelProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const totalBlocks = 48;
  const activeBlocks = Math.round(
    Math.min(1, Math.max(0, frame / durationInFrames)) * totalBlocks,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 12,
        backgroundColor: "#0D0E15",
        display: "flex",
        gap: 4,
        padding: "2px 4px",
      }}
    >
      {Array.from({ length: totalBlocks }).map((_, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: index < activeBlocks ? "#FFCD75" : "#262B44",
          }}
        />
      ))}
    </div>
  );
};
