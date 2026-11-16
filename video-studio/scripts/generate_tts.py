#!/usr/bin/env python3
"""
Generate Microsoft Edge TTS audio (.mp3) and subtitles (.srt) for each shot
in a multi-episode storyboard directory:
  src/episodes/<episode_id>/storyboard.json
Outputs:
  public/audio/<episode_id>/<shot_id>.mp3
  public/audio/<episode_id>/<shot_id>.srt
  src/episodes/<episode_id>/audioManifest.json
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

from mutagen.mp3 import MP3

ROOT = Path(__file__).resolve().parent.parent
EPISODES_DIR = ROOT / "src" / "episodes"
AUDIO_ROOT = ROOT / "public" / "audio"

SRT_TIME_RE = re.compile(
    r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})"
)


def parse_srt_seconds(h: str, m: str, s: str, ms: str) -> float:
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000.0


def parse_srt(srt_path: Path) -> list[dict]:
    if not srt_path.exists():
        return []
    raw = srt_path.read_text(encoding="utf-8").strip()
    if not raw:
        return []
    cues: list[dict] = []
    for block in re.split(r"\r?\n\r?\n", raw):
        lines = [line.strip() for line in block.splitlines() if line.strip()]
        if len(lines) < 2:
            continue
        match = SRT_TIME_RE.search(lines[1] if "-->" in lines[1] else lines[0])
        if not match:
            continue
        start_sec = parse_srt_seconds(*match.groups()[:4])
        end_sec = parse_srt_seconds(*match.groups()[4:])
        text_start_idx = 2 if "-->" in lines[1] else 1
        text = " ".join(lines[text_start_idx:]).strip()
        if text:
            cues.append(
                {
                    "startSec": round(start_sec, 3),
                    "endSec": round(end_sec, 3),
                    "text": text,
                }
            )
    return cues


def generate_shot_tts(
    edge_tts_bin: str,
    voice: str,
    rate: str,
    text: str,
    mp3_path: Path,
    srt_path: Path,
) -> None:
    cmd = [
        edge_tts_bin,
        "--voice",
        voice,
        f"--rate={rate}",
        "--text",
        text,
        "--write-media",
        str(mp3_path),
        "--write-subtitles",
        str(srt_path),
    ]
    subprocess.run(cmd, check=True)


def process_episode(
    ep_dir: Path,
    edge_tts_bin: str,
    rate: str,
    pad_sec: float,
) -> None:
    storyboard_path = ep_dir / "storyboard.json"
    manifest_path = ep_dir / "audioManifest.json"
    storyboard = json.loads(storyboard_path.read_text(encoding="utf-8"))
    ep_id = ep_dir.name
    voice = storyboard.get("voice", "zh-CN-XiaoxiaoNeural")

    audio_dir = AUDIO_ROOT / ep_id
    audio_dir.mkdir(parents=True, exist_ok=True)
    manifest_shots: dict[str, dict] = {}

    print(f"\n=== [TTS] Episode: {ep_id} ({storyboard.get('title', '')}) ===")
    for shot in storyboard["shots"]:
        shot_id = shot["id"]
        mp3_path = audio_dir / f"{shot_id}.mp3"
        srt_path = audio_dir / f"{shot_id}.srt"
        print(f"  -> Generating {shot_id} ({voice})...")
        generate_shot_tts(
            edge_tts_bin=edge_tts_bin,
            voice=voice,
            rate=rate,
            text=shot["ttsText"],
            mp3_path=mp3_path,
            srt_path=srt_path,
        )

        audio_info = MP3(mp3_path)
        audio_len = float(audio_info.info.length)
        duration_sec = round(audio_len + pad_sec, 3)

        srt_cues = parse_srt(srt_path)
        start_sec = srt_cues[0]["startSec"] if srt_cues else 0.0
        end_sec = srt_cues[-1]["endSec"] if srt_cues else round(audio_len, 3)

        manifest_shots[shot_id] = {
            "id": shot_id,
            "audioFile": f"audio/{ep_id}/{shot_id}.mp3",
            "durationSec": duration_sec,
            "cues": [
                {
                    "startSec": start_sec,
                    "endSec": end_sec,
                    "text": shot["subtitleText"],
                }
            ],
        }
        print(f"     OK: {mp3_path.name} ({duration_sec:.2f}s)")

    manifest = {
        "hasAudio": True,
        "voice": voice,
        "shots": manifest_shots,
    }
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"  -> Updated {manifest_path}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate Edge TTS audio & manifest for Workerman course episodes."
    )
    parser.add_argument(
        "--episode",
        help="Episode directory name under src/episodes/ (omit to generate all).",
    )
    parser.add_argument("--rate", default="+4%", help="Speech rate adjustment, e.g. +4%%")
    parser.add_argument("--pad-sec", type=float, default=0.5, help="Trailing pause per shot")
    args = parser.parse_args()

    edge_tts_bin = str(Path(sys.executable).parent / "edge-tts")
    if not Path(edge_tts_bin).exists():
        edge_tts_bin = "edge-tts"

    if args.episode:
        ep_dirs = [EPISODES_DIR / args.episode]
        if not (ep_dirs[0] / "storyboard.json").exists():
            raise FileNotFoundError(f"Missing storyboard.json in {ep_dirs[0]}")
    else:
        ep_dirs = sorted(
            p for p in EPISODES_DIR.iterdir() if p.is_dir() and (p / "storyboard.json").exists()
        )

    for ep_dir in ep_dirs:
        process_episode(
            ep_dir=ep_dir,
            edge_tts_bin=edge_tts_bin,
            rate=args.rate,
            pad_sec=args.pad_sec,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
