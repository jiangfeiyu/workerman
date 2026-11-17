# 《手把手从 0 到 1 写一个 Workerman（ModernWorker）》实战视频工坊

基于 `Remotion 4` + 微软 `edge-tts` 的 **三栏联动（IDE 代码演进 + 真实多终端回放 + 内核 X-Ray 透视）** 实战编程视频自动化生产工程。

## 常用命令

在 `/Users/jiangfei/workerman/handson-video` 目录下执行：

```bash
# 1. 预览术语发音规范化结果
.venv/bin/python scripts/generate_tts.py --episode ep001 --dry-run

# 2. 生成指定集数配音与字幕时间轴
.venv/bin/python scripts/generate_tts.py --episode ep001

# 3. TypeScript 类型检查
npm run typecheck

# 4. 渲染指定集数 1080p MP4 到 out/ 目录
node scripts/render_episode.mjs ep001

# 5. 启动 Remotion Studio 实时预览
npm run studio
```
