import React from 'react';
import { THEME } from './theme';

export interface LegoNode {
  label: string;
  state: 'done' | 'active' | 'todo';
}

export const LegoProgressStrip: React.FC<{
  nodes: LegoNode[];
  subLabel?: string;
}> = ({ nodes, subLabel }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        border: `3px solid ${THEME.dark}`,
        borderRadius: 14,
        padding: '8px 20px',
        boxShadow: '0 4px 0 rgba(44, 37, 32, 0.12)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'nowrap' }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: THEME.mutedText,
            marginRight: 4,
            whiteSpace: 'nowrap',
          }}
        >
          🧱 递归拼装
        </span>
        {nodes.map((node, idx) => {
          const isActive = node.state === 'active';
          const isDone = node.state === 'done';
          return (
            <React.Fragment key={node.label}>
              <div
                style={{
                  fontFamily: THEME.fontSans,
                  fontSize: 15,
                  fontWeight: isActive ? 800 : 700,
                  padding: '4px 12px',
                  borderRadius: 999,
                  whiteSpace: 'nowrap',
                  backgroundColor: isActive
                    ? THEME.amber
                    : isDone
                    ? THEME.greenBg
                    : THEME.softBg,
                  color: isActive
                    ? '#ffffff'
                    : isDone
                    ? THEME.green
                    : THEME.mutedText,
                  border: `2px solid ${
                    isActive
                      ? THEME.dark
                      : isDone
                      ? THEME.green
                      : '#d6cfc4'
                  }`,
                }}
              >
                {isDone ? '✓ ' : isActive ? '▶ ' : ''}
                {node.label}
              </div>
              {idx < nodes.length - 1 ? (
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: THEME.mutedText,
                  }}
                >
                  →
                </span>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
      {subLabel ? (
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 15,
            fontWeight: 700,
            color: THEME.blue,
            backgroundColor: THEME.blueBg,
            border: `2px solid ${THEME.blue}`,
            borderRadius: 999,
            padding: '3px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {subLabel}
        </div>
      ) : null}
    </div>
  );
};
