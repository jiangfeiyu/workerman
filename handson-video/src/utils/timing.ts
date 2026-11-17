import type {
  AudioManifest,
  EpisodeStoryboard,
  StoryboardShot,
  SubtitleCue,
} from '../types/storyboard';

export interface ScheduledShot {
  shot: StoryboardShot;
  fromFrame: number;
  durationFrames: number;
  audioFile: string | null;
  subtitleText: string;
  cues: SubtitleCue[];
}

export function buildShotSchedule(
  storyboard: EpisodeStoryboard,
  manifest: AudioManifest
): {
  scheduled: ScheduledShot[];
  totalFrames: number;
} {
  let cursor = 0;
  const scheduled: ScheduledShot[] = storyboard.shots.map((shot) => {
    const audioEntry = manifest.shots[shot.id];
    const durationSec = audioEntry?.durationSec ?? shot.fallbackDurationSec;
    const durationFrames = Math.max(1, Math.round(durationSec * storyboard.fps));
    const entry: ScheduledShot = {
      shot,
      fromFrame: cursor,
      durationFrames,
      audioFile: manifest.hasAudio ? audioEntry?.audioFile ?? null : null,
      subtitleText: shot.subtitleText,
      cues: audioEntry?.cues ?? [],
    };
    cursor += durationFrames;
    return entry;
  });

  return {
    scheduled,
    totalFrames: Math.max(1, cursor),
  };
}

export function getActiveSubtitleText(
  scheduledShot: ScheduledShot,
  localSec: number
): string {
  const { cues, subtitleText } = scheduledShot;
  if (!cues || cues.length === 0) {
    return subtitleText;
  }
  if (localSec <= cues[0].startSec) {
    return cues[0].text;
  }

  let activeIdx = 0;
  for (let i = 0; i < cues.length; i++) {
    if (localSec >= cues[i].startSec) {
      activeIdx = i;
    } else {
      break;
    }
  }

  const nextCue = cues[activeIdx + 1];
  if (nextCue && localSec >= nextCue.startSec - 0.08) {
    return nextCue.text;
  }
  return cues[activeIdx].text;
}
