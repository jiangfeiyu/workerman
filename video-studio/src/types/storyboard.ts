export interface StoryboardShot {
  id: string;
  chapter: string;
  visual: string;
  ttsText: string;
  subtitleText: string;
  fallbackDurationSec: number;
}

export interface EpisodeStoryboard {
  id: string;
  title: string;
  outputFile: string;
  voice: string;
  fps: number;
  width: number;
  height: number;
  shots: StoryboardShot[];
}

export interface SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
}

export interface AudioShotManifest {
  id: string;
  audioFile: string | null;
  durationSec: number;
  cues: SubtitleCue[];
}

export interface AudioManifest {
  hasAudio: boolean;
  voice: string;
  shots: Record<string, AudioShotManifest>;
}
