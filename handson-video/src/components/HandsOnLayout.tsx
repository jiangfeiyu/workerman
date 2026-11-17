import React from 'react';
import {
  IDECodePanel,
  type CodeDiffKind,
  type IDECodeLine,
} from './IDECodePanel';
import { LegoProgressStrip, type LegoNode } from './LegoProgressStrip';
import {
  MultiTerminalPanel,
  type TerminalPaneData,
} from './MultiTerminalPanel';

export interface HandsOnLayoutProps {
  legoNodes: LegoNode[];
  subLabel: string;
  fileName: string;
  tabs?: string[];
  lines: IDECodeLine[];
  focusLines?: number[];
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
  terminals: TerminalPaneData[];
  xray: React.ReactNode;
}

export type { CodeDiffKind };

export const HandsOnLayout: React.FC<HandsOnLayoutProps> = ({
  legoNodes,
  subLabel,
  fileName,
  tabs,
  lines,
  focusLines,
  typeRange,
  callout,
  fontSize = 17,
  lineHeight = 26,
  startLineNumber = 1,
  terminals,
  xray,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 104,
        left: 52,
        right: 52,
        bottom: 132,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <LegoProgressStrip nodes={legoNodes} subLabel={subLabel} />

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1040px 1fr',
          gap: 18,
          minHeight: 0,
        }}
      >
        <IDECodePanel
          fileName={fileName}
          tabs={tabs}
          lines={lines}
          focusLines={focusLines}
          typeRange={typeRange}
          callout={callout}
          fontSize={fontSize}
          lineHeight={lineHeight}
          startLineNumber={startLineNumber}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            minHeight: 0,
          }}
        >
          <div style={{ flex: 1.32, minHeight: 0 }}>
            <MultiTerminalPanel panes={terminals} />
          </div>
          <div style={{ flex: 0.82, minHeight: 0 }}>{xray}</div>
        </div>
      </div>
    </div>
  );
};
