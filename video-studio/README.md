# Workerman 课程原理动画工坊（Remotion + edge-tts）

本目录基于 `Remotion 4` + 微软 Edge TTS（`zh-CN-XiaoxiaoNeural`）自动生成与 Workerman 课程章节配套的 **1080p MP4 原理动画**，直接输出到对应章节目录供 Docsify 本地调试播放。

## 目录结构

- `src/episodes/<epId>/storyboard.json`：分镜剧本（含 `outputFile` 输出路径、各镜头配音文本与字幕）
- `src/episodes/<epId>/audioManifest.json`：由 `generate_tts.py` 自动写入的精确音频时长与路径清单
- `src/episodes/<epId>/Stage*.tsx`：该集的动画舞台组件
- `src/components/`：米白网格视觉风格的共用组件库（`GridBackground`、`ChapterBadge`、`SubtitleBar`、`StagePrimitives`、`CpuGauge`、`EpisodeShell` 等）
- `scripts/generate_tts.py`：批量或单集生成 `.mp3`/`.srt` 并同步时间轴
- `scripts/render_episode.mjs`：批量或单集渲染 MP4 到 `storyboard.json` 指定的章节目录

## 常用命令

在 `/Users/jiangfei/workerman/video-studio` 目录下执行：

```bash
# 1. 为全部或指定集数生成配音与时间轴
npm run tts
.venv/bin/python scripts/generate_tts.py --episode ep05_01

# 2. 渲染全部或指定集数 MP4 到对应章节目录
npm run render
node scripts/render_episode.mjs ep05_01

# 3. 启动 Remotion Studio 实时预览与逐帧调试
npm run studio
```
