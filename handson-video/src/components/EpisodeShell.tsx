import React from 'react';
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import type { AudioManifest, EpisodeStoryboard } from '../types/storyboard';
import { buildShotSchedule, getActiveSubtitleText } from '../utils/timing';
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
  const activeSubtitle = getActiveSubtitleText(
    currentScheduled,
    localFrame / fps
  );

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
          top: 34,
          right: 52,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 20,
            fontWeight: 800,
            color: '#ffffff',
            backgroundColor: THEME.amber,
            border: `3px solid ${THEME.dark}`,
            borderRadius: 999,
            padding: '7px 17px',
            boxShadow: `0 4px 0 ${THEME.dark}`,
          }}
        >
          {storyboard.epTag}
        </div>
        <div
          style={{
            fontFamily: THEME.fontSans,
            fontSize: 21,
            fontWeight: 800,
            color: THEME.dark,
            backgroundColor: 'rgba(255,255,255,0.92)',
            border: `3px solid ${THEME.dark}`,
            borderRadius: 999,
            padding: '7px 20px',
            boxShadow: '0 4px 0 rgba(0,0,0,0.08)',
          }}
        >
          {storyboard.title}
        </div>
      </div>

      <Stage
        visual={currentScheduled.shot.visual}
        localFrame={localFrame}
        fps={fps}
        durationFrames={currentScheduled.durationFrames}
      />

      <SubtitleBar text={activeSubtitle} />
    </GridBackground>
  );
};
