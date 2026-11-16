import React from 'react';
import { Audio, Sequence, useCurrentFrame, useVideoConfig, staticFile } from 'remotion';
import type { AudioManifest, EpisodeStoryboard } from '../types/storyboard';
import { buildShotSchedule } from '../utils/timing';
import { ChapterBadge } from './ChapterBadge';
import { GridBackground } from './GridBackground';
import { SubtitleBar } from './SubtitleBar';
import { THEME } from './theme';

export interface StageProps {
  visual: string;
  localFrame: number;
  fps: number;
  durationFrames: number;
}

export type EpisodeProps = {
  storyboard: EpisodeStoryboard;
  manifest: AudioManifest;
};

export const EpisodeShell: React.FC<
  EpisodeProps & {
    Stage: React.FC<StageProps>;
  }
> = ({ storyboard, manifest, Stage }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { scheduled } = buildShotSchedule(storyboard, manifest);

  const activeIndex = scheduled.findIndex(
    (s) => frame >= s.fromFrame && frame < s.fromFrame + s.durationFrames
  );
  const currentScheduled =
    scheduled[activeIndex >= 0 ? activeIndex : scheduled.length - 1];
  const localFrame = frame - currentScheduled.fromFrame;

  return (
    <GridBackground>
      {scheduled.map((item) =>
        item.audioFile ? (
          <Sequence
            key={item.shot.id}
            from={item.fromFrame}
            durationInFrames={item.durationFrames}
          >
            <Audio src={staticFile(item.audioFile)} />
          </Sequence>
        ) : null
      )}

      <ChapterBadge
        title={currentScheduled.shot.chapter}
        animateIn={activeIndex === 0}
      />

      <div
        style={{
          position: 'absolute',
          top: 48,
          right: 60,
          fontFamily: THEME.fontMono,
          fontSize: 22,
          fontWeight: 700,
          color: THEME.mutedText,
          backgroundColor: 'rgba(255,255,255,0.86)',
          border: '2px solid #d4d0c5',
          borderRadius: 999,
          padding: '8px 22px',
          zIndex: 10,
        }}
      >
        {storyboard.title}
      </div>

      <Stage
        visual={currentScheduled.shot.visual}
        localFrame={localFrame}
        fps={fps}
        durationFrames={currentScheduled.durationFrames}
      />

      <SubtitleBar text={currentScheduled.subtitleText} />
    </GridBackground>
  );
};
