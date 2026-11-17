export const THEME = {
  bgColor: '#f8f5ee',
  gridColor: '#eae4d7',
  dark: '#2c2520',
  ideBg: '#1c1917',
  ideHeader: '#292524',
  ideBorder: '#44403c',
  termBg: '#141312',
  cardBg: '#ffffff',
  softBg: '#f4efe6',
  amber: '#e68a1e',
  amberLight: '#ffd9a0',
  amberBg: '#fff6e8',
  amberGlow: 'rgba(230, 138, 30, 0.30)',
  blue: '#2980b9',
  blueLight: '#a8d8ff',
  blueBg: '#eef7ff',
  green: '#27ae60',
  greenLight: '#a8f0c6',
  greenBg: '#eafaf1',
  red: '#e74c3c',
  redLight: '#ffb8b0',
  redBg: '#fdecea',
  mutedText: '#6e655c',
  fontSans:
    '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif',
  fontMono:
    '"JetBrains Mono", "SF Mono", Menlo, Monaco, Consolas, monospace',
} as const;

export const SPRING_SMOOTH = {
  damping: 16,
  stiffness: 120,
  mass: 0.9,
} as const;

export const SPRING_POP = {
  damping: 12,
  stiffness: 180,
  mass: 0.8,
} as const;
