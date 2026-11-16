import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SPRING_SMOOTH, THEME } from './theme';

export const ChapterBadge: React.FC<{
  title: string;
  animateIn?: boolean;
}> = ({ title, animateIn = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = animateIn
    ? spring({ frame, fps, config: SPRING_SMOOTH })
    : 1;
  const translateY = interpolate(progress, [0, 1], [-18, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 44,
        left: 60,
        backgroundColor: THEME.cardBg,
        border: `3.5px solid ${THEME.dark}`,
        borderRadius: 999,
        padding: '10px 28px',
        fontSize: 26,
        fontWeight: 700,
        color: THEME.dark,
        boxShadow: `0 4px 0 ${THEME.dark}`,
        opacity: progress,
        transform: `translateY(${translateY}px)`,
        letterSpacing: 0.8,
        zIndex: 10,
      }}
    >
      {title}
    </div>
  );
};
