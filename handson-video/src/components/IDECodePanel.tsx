import React from 'react';
import { interpolate } from 'remotion';
import { THEME } from './theme';

export type CodeDiffKind = 'normal' | 'added' | 'modified' | 'removed';

export interface IDECodeLine {
  text: string;
  diff?: CodeDiffKind;
  note?: string;
}

const PHP_KEYWORDS = new Set([
  '<?php',
  'declare',
  'strict_types',
  'if',
  'else',
  'elseif',
  'while',
  'for',
  'foreach',
  'as',
  'return',
  'continue',
  'break',
  'function',
  'fn',
  'class',
  'interface',
  'enum',
  'case',
  'public',
  'private',
  'protected',
  'static',
  'new',
  'true',
  'false',
  'null',
  'echo',
  'exit',
  'use',
  'namespace',
  'try',
  'catch',
]);

function renderPhpTokens(line: string): React.ReactNode {
  const commentIdx = line.indexOf('//');
  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : '';

  const tokenRegex =
    /("(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\$[A-Za-z_][A-Za-z0-9_]*|<\?php|\b[A-Za-z_][A-Za-z0-9_]*\b|\b-?\d+\b)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let k = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={`p-${k++}`} style={{ color: '#e7e5e4' }}>
          {codePart.slice(lastIndex, match.index)}
        </span>
      );
    }
    const token = match[0];
    let color = '#e7e5e4';
    if (token.startsWith('"') || token.startsWith("'")) {
      color = '#86efac';
    } else if (token.startsWith('$')) {
      color = '#7dd3fc';
    } else if (PHP_KEYWORDS.has(token)) {
      color = '#f59e0b';
    } else if (/^-?\d+$/.test(token)) {
      color = '#fda4af';
    } else if (codePart[match.index + token.length] === '(') {
      color = '#fde047';
    }
    nodes.push(
      <span key={`t-${k++}`} style={{ color }}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < codePart.length) {
    nodes.push(
      <span key={`tail-${k++}`} style={{ color: '#e7e5e4' }}>
        {codePart.slice(lastIndex)}
      </span>
    );
  }

  if (commentPart) {
    nodes.push(
      <span key="cmt" style={{ color: '#a8a29e', fontStyle: 'italic' }}>
        {commentPart}
      </span>
    );
  }

  return nodes.length ? nodes : ' ';
}

export const IDECodePanel: React.FC<{
  fileName: string;
  tabs?: string[];
  lines: IDECodeLine[];
  focusLines?: number[];
  /** 1-based line range for typewriter typing animation */
  typeRange?: {
    fromLine: number;
    toLine: number;
    localFrame: number;
    startFrame?: number;
    framesPerLine?: number;
  };
  callout?: {
    line: number;
    text: string;
    tone?: 'amber' | 'red' | 'green' | 'blue';
  };
  fontSize?: number;
  lineHeight?: number;
  startLineNumber?: number;
}> = ({
  fileName,
  tabs,
  lines,
  focusLines = [],
  typeRange,
  callout,
  fontSize = 21,
  lineHeight = 33,
  startLineNumber = 1,
}) => {
  const focusSet = new Set(focusLines);
  const allTabs = tabs && tabs.length > 0 ? tabs : [fileName];

  const getTypedCharLimit = (lineNo: number, fullLen: number): number => {
    if (!typeRange) return fullLen;
    if (lineNo < typeRange.fromLine) return fullLen;
    if (lineNo > typeRange.toLine) return 0;

    const start = typeRange.startFrame ?? 0;
    const fpl = typeRange.framesPerLine ?? 14;
    const offset = (lineNo - typeRange.fromLine) * fpl + start;
    const progress = interpolate(
      typeRange.localFrame,
      [offset, offset + fpl],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    return Math.round(fullLen * progress);
  };

  const calloutColors = {
    amber: { bg: THEME.amber, border: '#ffd9a0' },
    red: { bg: THEME.red, border: '#ffb8b0' },
    green: { bg: THEME.green, border: '#a8f0c6' },
    blue: { bg: THEME.blue, border: '#a8d8ff' },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: THEME.ideBg,
        border: `3.5px solid ${THEME.dark}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 8px 0 rgba(44, 37, 32, 0.16)',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Top IDE Title + Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: THEME.ideHeader,
          borderBottom: `2px solid ${THEME.ideBorder}`,
          padding: '10px 18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 7 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: '#ef4444',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: '#f59e0b',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: '#22c55e',
                display: 'inline-block',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {allTabs.map((tab) => {
              const active = tab === fileName;
              return (
                <div
                  key={tab}
                  style={{
                    fontFamily: THEME.fontMono,
                    fontSize: 15,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#ffffff' : '#a8a29e',
                    backgroundColor: active ? THEME.ideBg : 'transparent',
                    border: active
                      ? `1.5px solid ${THEME.ideBorder}`
                      : '1.5px solid transparent',
                    borderRadius: 8,
                    padding: '4px 14px',
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 14,
            color: '#a8a29e',
          }}
        >
          PHP 8.5 · strict_types
        </div>
      </div>

      {/* Code Lines */}
      <div
        style={{
          padding: '16px 18px',
          fontFamily: THEME.fontMono,
          fontSize,
          lineHeight: `${lineHeight}px`,
          flex: 1,
          position: 'relative',
        }}
      >
        {lines.map((line, idx) => {
          const lineNo = startLineNumber + idx;
          const charLimit = getTypedCharLimit(lineNo, line.text.length);
          const visibleText = line.text.slice(0, charLimit);
          const isTypingThisLine =
            typeRange &&
            lineNo >= typeRange.fromLine &&
            lineNo <= typeRange.toLine &&
            charLimit > 0 &&
            charLimit < line.text.length;
          const isHidden =
            typeRange && lineNo > typeRange.toLine;
          const isFocused = focusSet.has(lineNo);
          const diff = line.diff ?? 'normal';

          const rowBg = isFocused
            ? 'rgba(230, 138, 30, 0.22)'
            : diff === 'added'
            ? 'rgba(39, 174, 96, 0.14)'
            : diff === 'modified'
            ? 'rgba(230, 138, 30, 0.12)'
            : diff === 'removed'
            ? 'rgba(231, 76, 60, 0.14)'
            : 'transparent';

          const leftBarColor = isFocused
            ? THEME.amber
            : diff === 'added'
            ? THEME.green
            : diff === 'modified'
            ? THEME.amber
            : diff === 'removed'
            ? THEME.red
            : 'transparent';

          return (
            <div
              key={lineNo}
              style={{
                display: 'flex',
                alignItems: 'center',
                minHeight: lineHeight,
                backgroundColor: rowBg,
                borderLeft: `4px solid ${leftBarColor}`,
                borderRadius: 6,
                paddingLeft: 8,
                paddingRight: 12,
                opacity: isHidden ? 0.12 : focusSet.size > 0 && !isFocused ? 0.65 : 1,
                position: 'relative',
              }}
            >
              <span
                style={{
                  width: 34,
                  textAlign: 'right',
                  marginRight: 14,
                  color: isFocused ? THEME.amberLight : '#78716c',
                  fontSize: fontSize - 3,
                  userSelect: 'none',
                  flexShrink: 0,
                }}
              >
                {lineNo}
              </span>
              <span
                style={{
                  width: 18,
                  color:
                    diff === 'added'
                      ? '#4ade80'
                      : diff === 'removed'
                      ? '#f87171'
                      : diff === 'modified'
                      ? '#fbbf24'
                      : 'transparent',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {diff === 'added'
                  ? '+'
                  : diff === 'removed'
                  ? '-'
                  : diff === 'modified'
                  ? '~'
                  : ' '}
              </span>
              <span style={{ whiteSpace: 'pre' }}>
                {renderPhpTokens(visibleText)}
                {isTypingThisLine ? (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: fontSize,
                      backgroundColor: THEME.amber,
                      verticalAlign: 'middle',
                      marginLeft: 2,
                    }}
                  />
                ) : null}
              </span>

              {callout && callout.line === lineNo ? (
                <div
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: -2,
                    fontFamily: THEME.fontSans,
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#ffffff',
                    backgroundColor: calloutColors[callout.tone ?? 'amber'].bg,
                    border: `2px solid ${
                      calloutColors[callout.tone ?? 'amber'].border
                    }`,
                    borderRadius: 999,
                    padding: '2px 14px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.45)',
                    zIndex: 5,
                  }}
                >
                  {callout.text}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
