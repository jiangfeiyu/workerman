import type {
  AudioManifest,
  EpisodeStoryboard,
  StoryboardShot,
} from '../types/storyboard';

export interface ScheduledShot {
  shot: StoryboardShot;
  fromFrame: number;
  durationFrames: number;
  audioFile: string | null;
  subtitleText: string;
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
    };
    cursor += durationFrames;
    return entry;
  });

  return {
    scheduled,
    totalFrames: Math.max(1, cursor),
  };
}
