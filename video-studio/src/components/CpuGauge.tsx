import React from 'react';
import { THEME } from './theme';

export const CpuGauge: React.FC<{
  percent: string;
  stateLabel: string;
  mode: 'idle' | 'busy' | 'normal';
  localFrame: number;
}> = ({ percent, stateLabel, mode, localFrame }) => {
  const isBusy = mode === 'busy';
  const isIdle = mode === 'idle';
  const borderColor = isBusy ? THEME.red : isIdle ? THEME.green : THEME.dark;
  const bgColor = isBusy ? THEME.redBg : isIdle ? THEME.greenBg : '#ffffff';
  const spinDeg = isBusy ? (localFrame * 24) % 360 : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        backgroundColor: bgColor,
        border: `3.5px solid ${borderColor}`,
        borderRadius: 18,
        padding: '12px 24px',
        boxShadow: isBusy
          ? `0 0 0 8px ${THEME.redGlow}`
          : '0 6px 0 rgba(0,0,0,0.08)',
      }}
    >
      {/* Animated gear/rotor indicator */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: `4px solid ${borderColor}`,
          borderTopColor: 'transparent',
          transform: `rotate(${spinDeg}deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 28,
            fontWeight: 800,
            color: borderColor,
          }}
        >
          CPU {percent}
        </div>
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 20,
            fontWeight: 700,
            color: THEME.mutedText,
          }}
        >
          状态: {stateLabel}
        </div>
      </div>
    </div>
  );
};
