import React from 'react';
import { AbsoluteFill, interpolate, spring, useVideoConfig } from 'remotion';
import { DarkLabel } from './DarkLabel';
import { SPRING_SMOOTH, THEME } from './theme';

export const StageContainer: React.FC<{
  banner?: string;
  conceptPill?: string;
  conceptColor?: string;
  localFrame: number;
  children: React.ReactNode;
}> = ({ banner, conceptPill, conceptColor = THEME.dark, localFrame, children }) => {
  const { fps } = useVideoConfig();
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });

  return (
    <AbsoluteFill
      style={{
        paddingTop: 120,
        paddingBottom: 185,
        paddingLeft: 72,
        paddingRight: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {banner ? (
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: THEME.dark,
            backgroundColor: THEME.cardBg,
            border: `3px solid ${THEME.dark}`,
            borderRadius: 16,
            padding: '9px 28px',
            boxShadow: '0 6px 0 rgba(0,0,0,0.08)',
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [-12, 0])}px)`,
          }}
        >
          {banner}
        </div>
      ) : (
        <div style={{ height: 8 }} />
      )}

      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>

      {conceptPill ? (
        <div
          style={{
            opacity: enter,
            transform: `translateY(${interpolate(enter, [0, 1], [12, 0])}px)`,
          }}
        >
          <DarkLabel text={conceptPill} bgColor={conceptColor} />
        </div>
      ) : (
        <div style={{ height: 8 }} />
      )}
    </AbsoluteFill>
  );
};

export const BoxCard: React.FC<{
  title: string;
  subtitle?: string;
  accent?: 'default' | 'orange' | 'blue' | 'green' | 'red';
  width?: number;
  minHeight?: number;
  badge?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  title,
  subtitle,
  accent = 'default',
  width = 340,
  minHeight,
  badge,
  children,
  style,
}) => {
  const palette = {
    default: { border: THEME.dark, bg: THEME.cardBg, headBg: THEME.softBg, glow: 'none' },
    orange: { border: THEME.orange, bg: THEME.orangeBg, headBg: THEME.orange, glow: `0 0 0 8px ${THEME.orangeGlow}` },
    blue: { border: THEME.blue, bg: THEME.blueBg, headBg: THEME.blueLight, glow: `0 0 0 8px ${THEME.blueGlow}` },
    green: { border: THEME.green, bg: THEME.greenBg, headBg: THEME.greenLight, glow: 'none' },
    red: { border: THEME.red, bg: THEME.redBg, headBg: THEME.redLight, glow: `0 0 0 8px ${THEME.redGlow}` },
  }[accent];

  return (
    <div
      style={{
        width,
        minHeight,
        backgroundColor: palette.bg,
        border: `4px solid ${palette.border}`,
        borderRadius: 22,
        boxShadow:
          palette.glow !== 'none'
            ? `${palette.glow}, 0 8px 0 rgba(0,0,0,0.08)`
            : '0 8px 0 rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: -32,
            right: 14,
            backgroundColor: accent === 'red' ? THEME.red : THEME.dark,
            color: '#ffffff',
            fontFamily: THEME.fontMono,
            fontSize: 19,
            fontWeight: 800,
            padding: '5px 16px',
            borderRadius: 999,
            border: '2.5px solid #ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.16)',
            zIndex: 5,
            whiteSpace: 'nowrap',
          }}
        >
          {badge}
        </div>
      )}

      <div
        style={{
          backgroundColor: palette.headBg,
          borderBottom: `3px solid ${palette.border}`,
          borderTopLeftRadius: 17,
          borderTopRightRadius: 17,
          padding: '11px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: 12,
          rowGap: 4,
          overflow: 'hidden',
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: THEME.dark, minWidth: 0 }}>{title}</span>
        {subtitle && (
          <span
            style={{
              fontFamily: THEME.fontMono,
              fontSize: 17,
              fontWeight: 700,
              color: THEME.dark,
              opacity: 0.78,
              minWidth: 0,
              overflowWrap: 'break-word',
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      <div
        style={{
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const AnimatedFlowArrow: React.FC<{
  width?: number;
  label?: string;
  color?: string;
  progress: number;
  pulse?: number | null;
  blocked?: boolean;
}> = ({
  width = 220,
  label,
  color = THEME.dark,
  progress,
  pulse = null,
  blocked = false,
}) => {
  const startX = 10;
  const endX = width - 20;
  const curX = interpolate(progress, [0, 1], [startX, endX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dotX =
    pulse !== null
      ? interpolate(pulse, [0, 1], [startX, endX - 10], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : null;

  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {label && (
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 19,
            fontWeight: 700,
            color: blocked ? THEME.red : color,
            backgroundColor: 'rgba(255,255,255,0.94)',
            border: `2px solid ${blocked ? THEME.red : color}`,
            borderRadius: 10,
            padding: '4px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      )}
      <svg width={width} height={38} viewBox={`0 0 ${width} 38`}>
        <line
          x1={startX}
          y1={19}
          x2={endX}
          y2={19}
          stroke="#d8d4ca"
          strokeWidth={4}
          strokeDasharray="8 8"
        />
        {progress > 0.01 && (
          <line
            x1={startX}
            y1={19}
            x2={blocked ? (startX + endX) * 0.55 : curX}
            y2={19}
            stroke={blocked ? THEME.red : color}
            strokeWidth={5.5}
            strokeLinecap="round"
          />
        )}
        {!blocked && progress > 0.7 && (
          <polygon
            points={`${endX - 6},8 ${endX + 14},19 ${endX - 6},30`}
            fill={color}
          />
        )}
        {blocked && (
          <g transform={`translate(${(startX + endX) * 0.58}, 19)`}>
            <circle r={14} fill={THEME.red} />
            <line x1={-6} y1={-6} x2={6} y2={6} stroke="#fff" strokeWidth={3.5} />
            <line x1={6} y1={-6} x2={-6} y2={6} stroke="#fff" strokeWidth={3.5} />
          </g>
        )}
        {!blocked && dotX !== null && (
          <circle
            cx={dotX}
            cy={19}
            r={7.5}
            fill={THEME.orange}
            stroke={THEME.dark}
            strokeWidth={2.5}
          />
        )}
      </svg>
    </div>
  );
};

export const CodeBlockPanel: React.FC<{
  title?: string;
  lines: string[];
  activeLine?: number;
  width?: number;
}> = ({ title = 'PHP 源码', lines, activeLine = -1, width = 580 }) => {
  return (
    <div
      style={{
        width,
        backgroundColor: '#1e222a',
        border: `3.5px solid ${THEME.dark}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 0 rgba(0,0,0,0.10)',
      }}
    >
      <div
        style={{
          backgroundColor: '#2a2f3a',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #3a404d',
        }}
      >
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#27c93f' }} />
        </div>
        <span style={{ fontFamily: THEME.fontMono, fontSize: 17, color: '#abb2bf', fontWeight: 700 }}>
          {title}
        </span>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {lines.map((line, i) => {
          const isActive = i === activeLine;
          return (
            <div
              key={`${i}-${line}`}
              style={{
                display: 'flex',
                gap: 12,
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: isActive ? 'rgba(245, 166, 35, 0.22)' : 'transparent',
                borderLeft: isActive ? `4px solid ${THEME.orange}` : '4px solid transparent',
                fontFamily: THEME.fontMono,
                fontSize: 19,
                lineHeight: 1.45,
                color: isActive ? '#ffe09c' : '#e5e9f0',
                fontWeight: isActive ? 700 : 500,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <span style={{ color: '#636d83', minWidth: 22, textAlign: 'right', userSelect: 'none' }}>
                {i + 1}
              </span>
              <span>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TerminalPanel: React.FC<{
  title?: string;
  lines: Array<{ text: string; tone?: 'cmd' | 'ok' | 'warn' | 'err' | 'dim' }>;
  localFrame: number;
  stepFrames?: number;
  width?: number;
}> = ({ title = 'WSL Ubuntu 终端实测', lines, localFrame, stepFrames = 14, width = 620 }) => {
  return (
    <div
      style={{
        width,
        backgroundColor: '#15181e',
        border: `3.5px solid ${THEME.dark}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 0 rgba(0,0,0,0.10)',
      }}
    >
      <div
        style={{
          backgroundColor: '#232832',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #353c4a',
        }}
      >
        <span style={{ fontFamily: THEME.fontMono, fontSize: 17, color: '#8be9fd', fontWeight: 700 }}>
          $_ {title}
        </span>
        <span style={{ fontFamily: THEME.fontMono, fontSize: 15, color: '#7f8c98' }}>bash</span>
      </div>
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {lines.map((item, idx) => {
          const opacity = interpolate(localFrame - idx * stepFrames, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const colorMap = {
            cmd: '#8be9fd',
            ok: '#50fa7b',
            warn: '#f1fa8c',
            err: '#ff6e67',
            dim: '#9aa5b1',
          };
          return (
            <div
              key={`${idx}-${item.text}`}
              style={{
                opacity,
                fontFamily: THEME.fontMono,
                fontSize: 19,
                lineHeight: 1.45,
                color: colorMap[item.tone ?? 'dim'],
                fontWeight: item.tone === 'cmd' || item.tone === 'err' ? 700 : 500,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WaterTankBar: React.FC<{
  title: string;
  subtitle?: string;
  fillPercent: number; // 0..100
  fillColor?: string;
  capacityLabel: string;
  watermarkPercent?: number;
  width?: number;
  height?: number;
}> = ({
  title,
  subtitle,
  fillPercent,
  fillColor = THEME.blueLight,
  capacityLabel,
  watermarkPercent,
  width = 330,
  height = 240,
}) => {
  const clamped = Math.max(0, Math.min(100, fillPercent));
  return (
    <BoxCard title={title} subtitle={subtitle} width={width}>
      <div
        style={{
          height,
          backgroundColor: '#f8f7f3',
          border: `3px solid ${THEME.dark}`,
          borderRadius: 14,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${clamped}%`,
            backgroundColor: fillColor,
            borderTop: clamped > 0 ? `3px solid ${THEME.dark}` : 'none',
          }}
        />
        {watermarkPercent !== undefined && (
          <div
            style={{
              position: 'absolute',
              bottom: `${watermarkPercent}%`,
              left: 0,
              right: 0,
              borderTop: `3px dashed ${THEME.red}`,
              zIndex: 2,
            }}
          >
            <span
              style={{
                position: 'absolute',
                right: 8,
                top: -26,
                fontFamily: THEME.fontMono,
                fontSize: 15,
                fontWeight: 800,
                color: THEME.red,
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '1px 6px',
                borderRadius: 6,
              }}
            >
              高水位警戒线
            </span>
          </div>
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            fontFamily: THEME.fontMono,
            fontSize: 21,
            fontWeight: 800,
            color: THEME.dark,
            backgroundColor: 'rgba(255,255,255,0.88)',
            padding: '6px 14px',
            borderRadius: 10,
            border: `2px solid ${THEME.dark}`,
            textAlign: 'center',
          }}
        >
          {capacityLabel}
        </div>
      </div>
    </BoxCard>
  );
};
