import React from 'react';
import { THEME } from './theme';

export const XRayInspector: React.FC<{
  title: string;
  badge?: string;
  badgeTone?: 'amber' | 'red' | 'green' | 'blue';
  children: React.ReactNode;
}> = ({ title, badge, badgeTone = 'blue', children }) => {
  const toneColors = {
    amber: { bg: THEME.amberBg, color: THEME.amber, border: THEME.amber },
    red: { bg: THEME.redBg, color: THEME.red, border: THEME.red },
    green: { bg: THEME.greenBg, color: THEME.green, border: THEME.green },
    blue: { bg: THEME.blueBg, color: THEME.blue, border: THEME.blue },
  }[badgeTone];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: THEME.cardBg,
        border: `3.5px solid ${THEME.dark}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 0 rgba(44, 37, 32, 0.14)',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: THEME.softBg,
          borderBottom: `2.5px solid ${THEME.dark}`,
          padding: '9px 18px',
        }}
      >
        <span
          style={{
            fontFamily: THEME.fontSans,
            fontSize: 18,
            fontWeight: 800,
            color: THEME.dark,
          }}
        >
          {title}
        </span>
        {badge ? (
          <span
            style={{
              fontFamily: THEME.fontSans,
              fontSize: 14,
              fontWeight: 800,
              color: toneColors.color,
              backgroundColor: toneColors.bg,
              border: `2px solid ${toneColors.border}`,
              borderRadius: 999,
              padding: '2px 12px',
            }}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <div
        style={{
          flex: 1,
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
