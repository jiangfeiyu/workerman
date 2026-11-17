import React from 'react';
import { THEME } from './theme';

export const SubtitleBar: React.FC<{
  text: string;
}> = ({ text }) => {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 64px',
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontFamily: THEME.fontSans,
          backgroundColor: 'rgba(28, 25, 23, 0.94)',
          color: '#ffffff',
          padding: '13px 34px',
          borderRadius: 14,
          border: '2px solid rgba(255, 255, 255, 0.14)',
          fontSize: 31,
          fontWeight: 600,
          letterSpacing: 0.5,
          textAlign: 'center',
          lineHeight: 1.38,
          boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
          maxWidth: 1720,
          textShadow: '0 1px 2px rgba(0,0,0,0.35)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
