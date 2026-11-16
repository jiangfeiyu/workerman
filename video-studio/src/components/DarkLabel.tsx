import React from 'react';
import { THEME } from './theme';

export const DarkLabel: React.FC<{
  text: string;
  bgColor?: string;
}> = ({ text, bgColor = THEME.dark }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 700,
        padding: '10px 28px',
        borderRadius: 12,
        letterSpacing: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};
