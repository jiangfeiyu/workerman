export const THEME = {
  bgColor: '#f6f5f0',
  gridColor: '#e8e6df',
  dark: '#2c2c2c',
  cardBg: '#ffffff',
  softBg: '#f3f1ea',
  orange: '#f5a623',
  orangeBg: '#fff7e6',
  orangeGlow: 'rgba(245, 166, 35, 0.34)',
  blue: '#2980b9',
  blueLight: '#a8d8ff',
  blueBg: '#eef7ff',
  blueGlow: 'rgba(41, 128, 185, 0.25)',
  green: '#27ae60',
  greenLight: '#a8f0c6',
  greenBg: '#eafaf1',
  red: '#e74c3c',
  redLight: '#ffb8b0',
  redBg: '#fdecea',
  redGlow: 'rgba(231, 76, 60, 0.28)',
  mutedText: '#666666',
  fontSans:
    '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif',
  fontMono:
    '"JetBrains Mono", "SF Mono", Menlo, Monaco, Consolas, monospace',
} as const;

export const SPRING_SMOOTH = {
  damping: 15,
  stiffness: 120,
  mass: 0.9,
} as const;

export const SPRING_POP = {
  damping: 12,
  stiffness: 180,
  mass: 0.8,
} as const;
