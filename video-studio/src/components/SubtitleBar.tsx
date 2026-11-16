import React from 'react';

export const SubtitleBar: React.FC<{
  text: string;
}> = ({ text }) => {
  if (!text) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 72px',
        zIndex: 20,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(28, 28, 28, 0.90)',
          color: '#ffffff',
          padding: '16px 38px',
          borderRadius: 14,
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: 1,
          textAlign: 'center',
          lineHeight: 1.42,
          boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
          maxWidth: 1680,
        }}
      >
        {text}
      </div>
    </div>
  );
};
