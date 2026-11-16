import React from 'react';
import { THEME } from './theme';

export const CodeHint: React.FC<{
  text: string;
  opacity?: number;
  highlight?: boolean;
}> = ({ text, opacity = 1, highlight = false }) => {
  return (
    <div
      style={{
        fontFamily: THEME.fontMono,
        fontSize: 22,
        fontWeight: 600,
        color: highlight ? THEME.dark : THEME.mutedText,
        backgroundColor: highlight ? THEME.orangeBg : 'rgba(255, 255, 255, 0.92)',
        padding: '8px 16px',
        borderRadius: 10,
        border: highlight ? `2.5px solid ${THEME.orange}` : '2px dashed #aaaaaa',
        opacity,
        maxWidth: '100%',
        boxSizing: 'border-box',
        wordBreak: 'break-word',
      }}
    >
      {text}
    </div>
  );
};
