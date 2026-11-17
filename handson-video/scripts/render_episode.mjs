#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const episodesDir = path.join(rootDir, 'src', 'episodes');

const args = process.argv.slice(2);
const epDirs = args.length
  ? args.map((arg) => path.join(episodesDir, arg))
  : fs
      .readdirSync(episodesDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => path.join(episodesDir, d.name))
      .sort();

const concurrency = process.env.REMOTION_CONCURRENCY || '8';

for (const epDir of epDirs) {
  const sbPath = path.join(epDir, 'storyboard.json');
  if (!fs.existsSync(sbPath)) continue;
  const sb = JSON.parse(fs.readFileSync(sbPath, 'utf8'));
  const outPath = path.resolve(rootDir, sb.outputFile);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  console.log(`\n=== [Render] ${sb.id} -> ${outPath} ===`);
  execSync(
    `npx remotion render src/index.ts ${sb.id} "${outPath}" --concurrency=${concurrency}`,
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
  );
}
