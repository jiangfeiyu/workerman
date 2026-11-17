#!/usr/bin/env python3
"""
Generate TTS audio (.mp3) and synchronized subtitles (.srt) for each shot in:
  src/episodes/<episode_id>/storyboard.json

Supports two engines:
  1. Azure AI Speech REST API + SSML (auto-used when AZURE_SPEECH_KEY is set,
     default voice: zh-CN-XiaochenMultilingualNeural)
  2. Free Microsoft Edge TTS fallback (edge-tts CLI)

Outputs:
  public/audio/<episode_id>/<shot_id>.mp3
  public/audio/<episode_id>/<shot_id>.srt
  src/episodes/<episode_id>/audioManifest.json
"""

import argparse
import difflib
import json
import os
import re
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from xml.sax.saxutils import escape

import certifi
from mutagen.mp3 import MP3

ROOT = Path(__file__).resolve().parent.parent
EPISODES_DIR = ROOT / "src" / "episodes"
AUDIO_ROOT = ROOT / "public" / "audio"
PRONUNCIATION_MAP_PATH = Path(__file__).resolve().parent / "pronunciation_map.json"
DEFAULT_AZURE_VOICE = "zh-CN-XiaochenMultilingualNeural"
DEFAULT_EDGE_VOICE = "zh-CN-XiaoxiaoNeural"

SRT_TIME_RE = re.compile(
    r"(\d{2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})[,.](\d{3})"
)


def load_dotenv(env_path: Path) -> None:
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        if k and k not in os.environ:
            os.environ[k] = v


def load_pronunciation_map() -> dict[str, str]:
    if not PRONUNCIATION_MAP_PATH.exists():
        return {}
    data = json.loads(PRONUNCIATION_MAP_PATH.read_text(encoding="utf-8"))
    return dict(data.get("exact", {}))


def clean_code_punctuation(text: str) -> str:
    """Clean PHP operators/symbols into natural spoken tokens."""
    result = text
    result = result.replace("===", "全等于").replace("!==", "不全等于").replace("=>", "映射到")
    result = re.sub(r"\s=\s", " 等于 ", result)
    result = result.replace("(int)", "整数 ")
    result = result.replace(" @ ", " 艾特 ")
    result = re.sub(r"@([A-Za-z_])", r"\1", result)
    result = result.replace("::", " ").replace("->", " ")
    result = re.sub(r"-\$([A-Za-z_][A-Za-z0-9_]*)", r"负 \1", result)
    result = re.sub(r"\$([A-Za-z_][A-Za-z0-9_]*)", r"\1", result)
    result = result.replace("()", "")
    result = re.sub(r"([A-Za-z0-9])_([A-Za-z0-9])", r"\1 \2", result)
    result = re.sub(r"([a-z])([A-Z])", r"\1 \2", result)
    result = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1 \2", result)
    result = re.sub(r"\s{2,}", " ", result).strip()
    return result


def normalize_tts_text(text: str, exact_map: dict[str, str]) -> str:
    """Normalize text for free edge-tts (uses homophones & acronym expansion)."""
    result = text

    # Disambiguate Chinese polyphonic characters for edge-tts
    result = re.sub(
        r"(第\s*[0-9一二三四五六七八九十百千万两]+(?:\s*[到至~～\-]\s*[0-9一二三四五六七八九十百千万两]+)?\s*)行",
        r"\1航",
        result,
    )
    result = re.sub(
        r"([0-9一二三四五六七八九十百千万两几每该这那]\s*)行(?!不)",
        r"\1航",
        result,
    )
    result = re.sub(r"(换|空|多|逐|单|首|尾|末)行", r"\1航", result)
    result = result.replace("行号", "航号").replace("行距", "航距").replace("行高", "航高")
    result = re.sub(r"调(\s*[A-Za-z_$@])", r"调用\1", result)

    result = clean_code_punctuation(result)

    if exact_map:
        sorted_keys = sorted(exact_map.keys(), key=len, reverse=True)
        pattern = re.compile(
            r"(?<![A-Za-z0-9_])(" + "|".join(re.escape(k) for k in sorted_keys) + r")(?![A-Za-z0-9_])"
        )
        protected: dict[str, str] = {}

        def _replace(match: re.Match[str]) -> str:
            token = f"\x00PH{len(protected)}\x00"
            protected[token] = exact_map[match.group(1)]
            return token

        result = pattern.sub(_replace, result)
        for token, replacement in protected.items():
            result = result.replace(token, replacement)

    result = re.sub(r"\s{2,}", " ", result).strip()
    return result


def build_azure_ssml(text: str, voice: str, rate: str) -> str:
    """Build Azure AI Speech SSML with native multilingual code reading + phoneme locks."""
    cleaned = clean_code_punctuation(text)

    # Mark polyphonic tokens with placeholders before XML escaping
    placeholders: dict[str, str] = {}

    def _hold(xml_snippet: str) -> str:
        tok = f"__SSML_{len(placeholders)}__"
        placeholders[tok] = xml_snippet
        return tok

    # 1. Lock "行" -> hang 2 in code-line contexts
    cleaned = re.sub(
        r"(第\s*[0-9一二三四五六七八九十百千万两]+(?:\s*[到至~～\-]\s*[0-9一二三四五六七八九十百千万两]+)?\s*)行",
        lambda m: m.group(1) + _hold('<phoneme alphabet="sapi" ph="hang 2">行</phoneme>'),
        cleaned,
    )
    cleaned = re.sub(
        r"([0-9一二三四五六七八九十百千万两几每该这那]\s*)行(?!不)",
        lambda m: m.group(1) + _hold('<phoneme alphabet="sapi" ph="hang 2">行</phoneme>'),
        cleaned,
    )
    cleaned = re.sub(
        r"(换|空|多|逐|单|首|尾|末)行",
        lambda m: m.group(1) + _hold('<phoneme alphabet="sapi" ph="hang 2">行</phoneme>'),
        cleaned,
    )
    cleaned = cleaned.replace(
        "行号", _hold('<phoneme alphabet="sapi" ph="hang 2">行</phoneme>') + "号"
    )

    # 2. Lock standalone "调" before ASCII identifiers -> diao 4
    cleaned = re.sub(
        r"调(\s*[A-Za-z])",
        lambda m: _hold('<phoneme alphabet="sapi" ph="diao 4">调</phoneme>') + m.group(1),
        cleaned,
    )

    # 3. Natural pauses after punctuation (except at very end)
    cleaned = re.sub(
        r"([。！？])(?=.)",
        lambda m: m.group(1) + _hold('<break time="220ms"/>'),
        cleaned,
    )
    cleaned = re.sub(
        r"([：；]|——)(?=.)",
        lambda m: m.group(1) + _hold('<break time="150ms"/>'),
        cleaned,
    )

    escaped = escape(cleaned)
    for tok, snippet in placeholders.items():
        escaped = escaped.replace(tok, snippet)

    rate_attr = rate if rate != "+0%" else "0%"
    ssml = (
        '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">'
        f'<voice name="{escape(voice)}">'
        f'<prosody rate="{escape(rate_attr)}">{escaped}</prosody>'
        "</voice></speak>"
    )
    # Validate XML well-formedness locally before network call
    ET.fromstring(ssml.encode("utf-8"))
    return ssml


def generate_azure_tts(
    key: str,
    region: str,
    voice: str,
    rate: str,
    text: str,
    mp3_path: Path,
) -> None:
    ssml = build_azure_ssml(text, voice=voice, rate=rate)
    url = f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1"
    ssl_ctx = ssl.create_default_context(cafile=certifi.where())
    for attempt in range(5):
        req = urllib.request.Request(
            url,
            data=ssml.encode("utf-8"),
            method="POST",
            headers={
                "Ocp-Apim-Subscription-Key": key,
                "Content-Type": "application/ssml+xml",
                "X-Microsoft-OutputFormat": "audio-24khz-96kbitrate-mono-mp3",
                "User-Agent": "workerman-handson-tts",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=30, context=ssl_ctx) as resp:
                mp3_bytes = resp.read()
            mp3_path.write_bytes(mp3_bytes)
            time.sleep(1.2)
            return
        except urllib.error.HTTPError as e:
            detail = e.read().decode("utf-8", errors="ignore")
            if e.code == 429 and attempt < 4:
                wait_s = 6 * (attempt + 1)
                print(f"     [Azure 429 rate-limit] waiting {wait_s}s before retry...")
                time.sleep(wait_s)
                continue
            raise RuntimeError(f"Azure TTS HTTP {e.code}: {detail}") from e


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


def _vis_width(s: str) -> float:
    return sum(0.56 if ord(ch) < 128 else 1.0 for ch in s)


def _clean_sub_display(s: str) -> str:
    s = s.strip()
    return re.sub(r"[，。、；：]+$", "", s).strip()


def _split_long_unpunctuated(text: str, max_width: float = 45.0) -> list[str]:
    text = text.strip()
    if _vis_width(text) <= max_width:
        return [text] if text else []

    candidates: list[int] = []
    ascii_depth = 0
    in_sq = False
    in_dq = False
    for i, ch in enumerate(text):
        if ch == "'" and not in_dq and (i == 0 or text[i - 1] != "\\"):
            in_sq = not in_sq
        elif ch == '"' and not in_sq and (i == 0 or text[i - 1] != "\\"):
            in_dq = not in_dq
        elif not in_sq and not in_dq:
            if ch in "([{":
                ascii_depth += 1
            elif ch in ")]}" and ascii_depth > 0:
                ascii_depth -= 1
            elif ch == " " and ascii_depth == 0 and 6 <= i <= len(text) - 7:
                left_tok = re.search(r"([A-Za-z0-9_$]+)$", text[:i])
                right_tok = re.match(r"^([A-Za-z0-9_$]+)", text[i + 1 :])
                if (left_tok and len(left_tok.group(1)) <= 2) or (
                    right_tok and len(right_tok.group(1)) <= 2
                ):
                    continue
                candidates.append(i)

    if not candidates:
        return [text]

    mid = _vis_width(text) / 2.0
    best_idx = min(candidates, key=lambda idx: abs(_vis_width(text[:idx]) - mid))
    left = text[:best_idx].strip()
    right = text[best_idx:].strip()
    if _vis_width(left) < 9.0 or _vis_width(right) < 9.0:
        return [text]
    return _split_long_unpunctuated(left, max_width) + _split_long_unpunctuated(right, max_width)


def split_clauses_safe(text: str, max_width: float = 27.0) -> list[str]:
    text = text.strip()
    if _vis_width(text) <= max_width:
        return [text] if text else []

    split_points: list[int] = []
    ascii_depth = 0
    in_sq = False
    in_dq = False
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == "'" and not in_dq and (i == 0 or text[i - 1] != "\\"):
            in_sq = not in_sq
        elif ch == '"' and not in_sq and (i == 0 or text[i - 1] != "\\"):
            in_dq = not in_dq
        elif not in_sq and not in_dq:
            if ch in "([{":
                ascii_depth += 1
            elif ch in ")]}" and ascii_depth > 0:
                ascii_depth -= 1

        if ascii_depth == 0 and not in_sq and not in_dq:
            if ch in "，；：、。！？":
                split_points.append(i + 1)
            elif text[i : i + 2] == "——":
                split_points.append(i + 2)
                i += 1
        i += 1

    if not split_points:
        return _split_long_unpunctuated(text, max_width=45.0)

    raw_parts: list[str] = []
    prev = 0
    for sp in split_points:
        part = text[prev:sp].strip()
        if part:
            raw_parts.append(part)
        prev = sp
    tail = text[prev:].strip()
    if tail:
        raw_parts.append(tail)

    merged: list[str] = []
    for part in raw_parts:
        if not merged:
            merged.append(part)
            continue
        sep = " " if (merged[-1][-1].isascii() and part[0].isascii()) else ""
        cand = merged[-1] + sep + part
        if _vis_width(cand) <= max_width or (
            (_vis_width(merged[-1]) < 8.0 or _vis_width(part) < 7.0)
            and _vis_width(cand) <= 32.0
        ):
            merged[-1] = cand
        else:
            merged.append(part)

    final_parts: list[str] = []
    for part in merged:
        final_parts.extend(_split_long_unpunctuated(part, max_width=45.0))
    return final_parts


def align_raw_to_cues(
    raw: str, srt_cues: list[dict], exact_map: dict[str, str]
) -> list[tuple[float, float, str]]:
    if not srt_cues:
        return [(0.0, 1.0, raw.strip())]

    norm_cues = [
        {"startSec": c["startSec"], "endSec": c["endSec"], "text": c["text"]}
        for c in srt_cues
    ]
    for idx in range(len(norm_cues) - 1):
        if norm_cues[idx]["endSec"] > norm_cues[idx + 1]["startSec"]:
            mid = round((norm_cues[idx]["endSec"] + norm_cues[idx + 1]["startSec"]) / 2, 3)
            norm_cues[idx]["endSec"] = mid
            norm_cues[idx + 1]["startSec"] = mid
    if len(norm_cues) == 1:
        return [(norm_cues[0]["startSec"], norm_cues[0]["endSec"], raw.strip())]

    tokens = re.findall(r"[A-Za-z0-9_$\.:/\-\>\<=\!\?'\"()\[\]]+|\s+|.", raw)
    full_norm = normalize_tts_text(raw, exact_map)
    cue_texts = [c["text"].strip() for c in norm_cues]
    joined_cues = " ".join(cue_texts)

    cue_end_in_joined: list[int] = []
    pos = 0
    for i, ct in enumerate(cue_texts):
        if i > 0:
            pos += 1
        pos += len(ct)
        cue_end_in_joined.append(pos)

    def _compact(s: str) -> tuple[str, list[int]]:
        chars, idxs = [], []
        for idx, ch in enumerate(s):
            if not ch.isspace():
                chars.append(ch.lower())
                idxs.append(idx)
        return "".join(chars), idxs

    jc, j_idx = _compact(joined_cues)
    fn, f_idx = _compact(full_norm)
    sm = difflib.SequenceMatcher(None, jc, fn, autojunk=False)
    j_to_f: dict[int, int] = {}
    for _tag, i1, i2, j1, j2 in sm.get_opcodes():
        if i2 > i1 and j2 > j1:
            for k in range(i2 - i1):
                mapped_j = min(j2 - 1, j1 + round(k * (j2 - j1) / (i2 - i1)))
                j_to_f[i1 + k] = f_idx[mapped_j]

    raw_token_norm_pos: list[int] = []
    for k in range(1, len(tokens) + 1):
        raw_token_norm_pos.append(len(normalize_tts_text("".join(tokens[:k]), exact_map)))

    raw_boundaries = [0]
    for ci in range(len(cue_texts) - 1):
        end_j = cue_end_in_joined[ci]
        comp_j = 0
        for p, orig_i in enumerate(j_idx):
            if orig_i < end_j:
                comp_j = p
        target_fn = j_to_f.get(
            comp_j, round(comp_j * len(full_norm) / max(1, len(jc)))
        )
        best_tok, best_diff = 0, 10**9
        for ti, nlen in enumerate(raw_token_norm_pos):
            diff = abs(nlen - (target_fn + 1))
            if tokens[ti] in "。！？!?.，,;；：:" and diff <= 3:
                diff -= 4
            if diff < best_diff:
                best_diff = diff
                best_tok = ti + 1
        raw_char = max(raw_boundaries[-1], len("".join(tokens[:best_tok])))
        while raw_char < len(raw) and raw[raw_char] in "。！？!?；;，,、”’）).":
            raw_char += 1
        raw_boundaries.append(raw_char)
    raw_boundaries.append(len(raw))

    return [
        (
            norm_cues[ci]["startSec"],
            norm_cues[ci]["endSec"],
            raw[raw_boundaries[ci] : raw_boundaries[ci + 1]].strip(),
        )
        for ci in range(len(norm_cues))
    ]


def build_shot_cues(
    raw_tts: str, srt_cues: list[dict], exact_map: dict[str, str]
) -> list[dict]:
    aligned = align_raw_to_cues(raw_tts, srt_cues, exact_map)
    final_cues: list[dict] = []
    for s_sec, e_sec, seg in aligned:
        parts = split_clauses_safe(seg, max_width=27.0)
        if not parts:
            continue
        weights = [
            max(1, len(re.sub(r"\s+", "", normalize_tts_text(p, exact_map))))
            for p in parts
        ]
        total_w = sum(weights)
        dur = max(0.05, e_sec - s_sec)
        cur = s_sec
        for idx, (part, w) in enumerate(zip(parts, weights)):
            nxt = e_sec if idx == len(parts) - 1 else round(cur + dur * (w / total_w), 3)
            disp = _clean_sub_display(part)
            if disp and re.search(r"[0-9A-Za-z\u4e00-\u9fff]", disp):
                final_cues.append(
                    {"startSec": round(cur, 3), "endSec": round(nxt, 3), "text": disp}
                )
            elif disp and final_cues:
                final_cues[-1]["text"] += disp
                final_cues[-1]["endSec"] = round(nxt, 3)
            cur = nxt
    return final_cues


def build_proportional_cues(raw_tts: str, audio_len_sec: float) -> list[dict]:
    """Compute weighted clause cues across an MP3 duration (used for Azure REST API)."""
    parts = split_clauses_safe(raw_tts, max_width=27.0)
    if not parts:
        return []
    weights = []
    for p in parts:
        base = max(1.0, len(re.sub(r"\s+", "", clean_code_punctuation(p))) * 1.0)
        if p.endswith(("。", "！", "？")):
            base += 1.4
        elif p.endswith(("，", "；", "：", "——")):
            base += 0.8
        weights.append(base)
    total_w = sum(weights)
    usable = max(0.2, audio_len_sec - 0.12)
    cur = 0.04
    cues: list[dict] = []
    for idx, (part, w) in enumerate(zip(parts, weights)):
        nxt = round(audio_len_sec - 0.05, 3) if idx == len(parts) - 1 else round(cur + usable * (w / total_w), 3)
        disp = _clean_sub_display(part)
        if disp and re.search(r"[0-9A-Za-z\u4e00-\u9fff]", disp):
            cues.append({"startSec": round(cur, 3), "endSec": nxt, "text": disp})
        elif disp and cues:
            cues[-1]["text"] += disp
            cues[-1]["endSec"] = nxt
        cur = nxt
    return cues


def _format_srt_ts(seconds: float) -> str:
    ms_total = max(0, round(seconds * 1000))
    h, rem = divmod(ms_total, 3_600_000)
    m, rem = divmod(rem, 60_000)
    s, ms = divmod(rem, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_episode_srt(storyboard: dict, manifest_shots: dict[str, dict]) -> Path | None:
    output_file = storyboard.get("outputFile")
    if not output_file:
        return None
    fps = int(storyboard.get("fps", 30))
    srt_out = (ROOT / output_file).with_suffix(".srt")
    srt_out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    cue_idx = 1
    cursor_frames = 0
    for shot in storyboard["shots"]:
        sid = shot["id"]
        entry = manifest_shots.get(sid)
        duration_sec = (
            entry["durationSec"] if entry else float(shot.get("fallbackDurationSec", 10))
        )
        duration_frames = max(1, round(duration_sec * fps))
        shot_offset = cursor_frames / fps
        for cue in (entry or {}).get("cues", []):
            start = shot_offset + cue["startSec"]
            end = shot_offset + cue["endSec"]
            lines.append(
                f"{cue_idx}\n{_format_srt_ts(start)} --> {_format_srt_ts(end)}\n{cue['text']}\n"
            )
            cue_idx += 1
        cursor_frames += duration_frames

    srt_out.write_text("\n".join(lines), encoding="utf-8")
    return srt_out


def generate_edge_tts(
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
    engine: str,
    azure_key: str,
    azure_region: str,
    edge_tts_bin: str,
    rate: str,
    pad_sec: float,
    exact_map: dict[str, str],
    voice_override: str | None = None,
    dry_run: bool = False,
) -> None:
    storyboard_path = ep_dir / "storyboard.json"
    manifest_path = ep_dir / "audioManifest.json"
    storyboard = json.loads(storyboard_path.read_text(encoding="utf-8"))
    ep_id = ep_dir.name

    sb_voice = storyboard.get("voice", "")
    if voice_override:
        voice = voice_override
    elif engine == "azure":
        voice = sb_voice if "Xiaochen" in sb_voice else DEFAULT_AZURE_VOICE
    else:
        voice = sb_voice if sb_voice and "Xiaochen" not in sb_voice else DEFAULT_EDGE_VOICE

    audio_dir = AUDIO_ROOT / ep_id
    audio_dir.mkdir(parents=True, exist_ok=True)
    manifest_shots: dict[str, dict] = {}
    total_sec = 0.0

    print(f"\n=== [TTS:{engine}] Episode: {ep_id} ({storyboard.get('title', '')}) | Voice: {voice} ===")
    for shot in storyboard["shots"]:
        shot_id = shot["id"]
        raw_text = shot["ttsText"]

        if dry_run:
            if engine == "azure":
                ssml = build_azure_ssml(raw_text, voice=voice, rate=rate)
                print(f"  [SSML OK {shot_id}] {ssml}")
            else:
                print(f"  [Normalized {shot_id}] {normalize_tts_text(raw_text, exact_map)}")
            continue

        mp3_path = audio_dir / f"{shot_id}.mp3"
        srt_path = audio_dir / f"{shot_id}.srt"
        print(f"  -> Generating {shot_id} ({engine}:{voice})...")

        if engine == "azure":
            generate_azure_tts(
                key=azure_key,
                region=azure_region,
                voice=voice,
                rate=rate,
                text=raw_text,
                mp3_path=mp3_path,
            )
            audio_len = float(MP3(mp3_path).info.length)
            cues = build_proportional_cues(raw_text, audio_len)
        else:
            spoken_text = normalize_tts_text(raw_text, exact_map)
            generate_edge_tts(
                edge_tts_bin=edge_tts_bin,
                voice=voice,
                rate=rate,
                text=spoken_text,
                mp3_path=mp3_path,
                srt_path=srt_path,
            )
            audio_len = float(MP3(mp3_path).info.length)
            srt_cues = parse_srt(srt_path)
            cues = build_shot_cues(raw_text, srt_cues, exact_map)

        duration_sec = round(audio_len + pad_sec, 3)
        total_sec += duration_sec

        manifest_shots[shot_id] = {
            "id": shot_id,
            "audioFile": f"audio/{ep_id}/{shot_id}.mp3",
            "durationSec": duration_sec,
            "cues": cues,
        }
        print(f"     OK: {mp3_path.name} ({duration_sec:.2f}s, {len(cues)} cues)")

    if dry_run:
        return

    manifest = {
        "hasAudio": True,
        "voice": voice,
        "shots": manifest_shots,
    }
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    srt_out = write_episode_srt(storyboard, manifest_shots)
    srt_note = f" + {srt_out.name}" if srt_out else ""
    print(f"  -> Total duration: {total_sec:.2f}s | Updated {manifest_path.name}{srt_note}")


def main() -> int:
    load_dotenv(ROOT / ".env")

    parser = argparse.ArgumentParser(description="Generate TTS audio for handson-video episodes.")
    parser.add_argument("--episode", help="Only process one episode directory, e.g. ep001")
    parser.add_argument(
        "--engine",
        choices=["auto", "azure", "edge"],
        default="auto",
        help="TTS backend: auto uses azure when AZURE_SPEECH_KEY is set, else edge",
    )
    parser.add_argument("--voice", help="Override voice name")
    parser.add_argument("--rate", default="+0%", help="Speech rate adjustment, e.g. +5%%")
    parser.add_argument("--pad-sec", type=float, default=0.55, help="Trailing pause per shot")
    parser.add_argument("--dry-run", action="store_true", help="Preview SSML/normalization without API calls")
    args = parser.parse_args()

    azure_key = os.environ.get("AZURE_SPEECH_KEY", "").strip()
    azure_region = os.environ.get("AZURE_SPEECH_REGION", "eastasia").strip()
    engine = ("azure" if azure_key else "edge") if args.engine == "auto" else args.engine

    if engine == "azure" and not azure_key and not args.dry_run:
        print("Error: --engine azure requires AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (in env or .env)", file=sys.stderr)
        return 1

    edge_tts_bin = str(Path(sys.executable).parent / "edge-tts")
    if not Path(edge_tts_bin).exists():
        edge_tts_bin = "edge-tts"

    exact_map = load_pronunciation_map()

    if args.episode:
        ep_dirs = [EPISODES_DIR / args.episode]
    else:
        ep_dirs = sorted(p for p in EPISODES_DIR.iterdir() if p.is_dir())

    for ep_dir in ep_dirs:
        if not (ep_dir / "storyboard.json").exists():
            continue
        process_episode(
            ep_dir=ep_dir,
            engine=engine,
            azure_key=azure_key,
            azure_region=azure_region,
            edge_tts_bin=edge_tts_bin,
            rate=args.rate,
            pad_sec=args.pad_sec,
            exact_map=exact_map,
            voice_override=args.voice,
            dry_run=args.dry_run,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
