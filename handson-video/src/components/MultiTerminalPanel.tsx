import React from 'react';
import { interpolate } from 'remotion';
import { THEME } from './theme';

export interface TerminalLine {
  text: string;
  tone?: 'normal' | 'cmd' | 'info' | 'warn' | 'error' | 'success';
  appearAtFrame?: number;
}

export interface TerminalPaneData {
  id: string;
  title: string;
  status?: {
    label: string;
    tone: 'green' | 'red' | 'amber' | 'blue';
  };
  command?: string;
  commandTypeFrames?: [number, number];
  localFrame: number;
  lines: TerminalLine[];
}

export const MultiTerminalPanel: React.FC<{
  panes: TerminalPaneData[];
}> = ({ panes }) => {
  const statusStyles = {
    green: { bg: 'rgba(39, 174, 96, 0.20)', text: '#4ade80', border: '#22c55e' },
    red: { bg: 'rgba(231, 76, 60, 0.24)', text: '#fca5a5', border: '#ef4444' },
    amber: { bg: 'rgba(230, 138, 30, 0.24)', text: '#fcd34d', border: '#f59e0b' },
    blue: { bg: 'rgba(41, 128, 185, 0.24)', text: '#93c5fd', border: '#3b82f6' },
  };

  const lineColors = {
    normal: '#e7e5e4',
    cmd: '#fde047',
    info: '#7dd3fc',
    warn: '#fbbf24',
    error: '#f87171',
    success: '#4ade80',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
      }}
    >
      {panes.map((pane) => {
        const [startF, endF] = pane.commandTypeFrames ?? [0, 18];
        const cmd = pane.command ?? '';
        const typedLen = cmd
          ? Math.round(
              cmd.length *
                interpolate(pane.localFrame, [startF, endF], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
            )
          : 0;
        const st = pane.status ? statusStyles[pane.status.tone] : null;

        return (
          <div
            key={pane.id}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: THEME.termBg,
              border: `3px solid ${THEME.dark}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 6px 0 rgba(44, 37, 32, 0.14)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#24211f',
                borderBottom: '1.5px solid #3c3734',
                padding: '6px 14px',
              }}
            >
              <span
                style={{
                  fontFamily: THEME.fontMono,
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#d6d3d1',
                }}
              >
                {pane.title}
              </span>
              {pane.status && st ? (
                <span
                  style={{
                    fontFamily: THEME.fontSans,
                    fontSize: 13,
                    fontWeight: 800,
                    color: st.text,
                    backgroundColor: st.bg,
                    border: `1.5px solid ${st.border}`,
                    borderRadius: 999,
                    padding: '2px 10px',
                  }}
                >
                  {pane.status.label}
                </span>
              ) : null}
            </div>

            <div
              style={{
                padding: '8px 14px',
                fontFamily: THEME.fontMono,
                fontSize: 15,
                lineHeight: '22px',
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {cmd ? (
                <div style={{ color: '#fde047', marginBottom: 4 }}>
                  <span style={{ color: '#4ade80' }}>$ </span>
                  {cmd.slice(0, typedLen)}
                </div>
              ) : null}

              {pane.lines.map((line, idx) => {
                const show =
                  line.appearAtFrame === undefined ||
                  pane.localFrame >= line.appearAtFrame;
                if (!show) return null;
                return (
                  <div
                    key={idx}
                    style={{
                      color: lineColors[line.tone ?? 'normal'],
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
