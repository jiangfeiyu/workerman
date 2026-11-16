import React from 'react';
import { AbsoluteFill } from 'remotion';
import { THEME } from './theme';

export const GridBackground: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.bgColor,
        backgroundImage: `linear-gradient(${THEME.gridColor} 1.5px, transparent 1.5px), linear-gradient(90deg, ${THEME.gridColor} 1.5px, transparent 1.5px)`,
        backgroundSize: '48px 48px',
        fontFamily: THEME.fontSans,
        color: THEME.dark,
        overflow: 'hidden',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
