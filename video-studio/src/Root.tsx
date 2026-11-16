import React from 'react';
import { Composition } from 'remotion';
import { EpisodeShell, type EpisodeProps } from './components';
import type { AudioManifest, EpisodeStoryboard } from './types/storyboard';
import { buildShotSchedule } from './utils/timing';

import ep0001Storyboard from './episodes/ep00_01/storyboard.json';
import ep0001Manifest from './episodes/ep00_01/audioManifest.json';
import { Stage00_01 } from './episodes/ep00_01/Stage00_01';

import ep0101Storyboard from './episodes/ep01_01/storyboard.json';
import ep0101Manifest from './episodes/ep01_01/audioManifest.json';
import { Stage01_01 } from './episodes/ep01_01/Stage01_01';

import ep0102Storyboard from './episodes/ep01_02/storyboard.json';
import ep0102Manifest from './episodes/ep01_02/audioManifest.json';
import { Stage01_02 } from './episodes/ep01_02/Stage01_02';

import ep0201Storyboard from './episodes/ep02_01/storyboard.json';
import ep0201Manifest from './episodes/ep02_01/audioManifest.json';
import { Stage02_01 } from './episodes/ep02_01/Stage02_01';

import ep0202Storyboard from './episodes/ep02_02/storyboard.json';
import ep0202Manifest from './episodes/ep02_02/audioManifest.json';
import { Stage02_02 } from './episodes/ep02_02/Stage02_02';

import ep0301Storyboard from './episodes/ep03_01/storyboard.json';
import ep0301Manifest from './episodes/ep03_01/audioManifest.json';
import { Stage03_01 } from './episodes/ep03_01/Stage03_01';

import ep0302Storyboard from './episodes/ep03_02/storyboard.json';
import ep0302Manifest from './episodes/ep03_02/audioManifest.json';
import { Stage03_02 } from './episodes/ep03_02/Stage03_02';

import ep0401Storyboard from './episodes/ep04_01/storyboard.json';
import ep0401Manifest from './episodes/ep04_01/audioManifest.json';
import { Stage04_01 } from './episodes/ep04_01/Stage04_01';

import ep04ExtraStoryboard from './episodes/ep04_extra/storyboard.json';
import ep04ExtraManifest from './episodes/ep04_extra/audioManifest.json';
import { Stage04_Extra } from './episodes/ep04_extra/Stage04_Extra';

import ep0501Storyboard from './episodes/ep05_01/storyboard.json';
import ep0501Manifest from './episodes/ep05_01/audioManifest.json';
import { Stage05_01 } from './episodes/ep05_01/Stage05_01';

import ep0502Storyboard from './episodes/ep05_02/storyboard.json';
import ep0502Manifest from './episodes/ep05_02/audioManifest.json';
import { Stage05_02 } from './episodes/ep05_02/Stage05_02';

import ep0503Storyboard from './episodes/ep05_03/storyboard.json';
import ep0503Manifest from './episodes/ep05_03/audioManifest.json';
import { Stage05_03 } from './episodes/ep05_03/Stage05_03';

import ep0601Storyboard from './episodes/ep06_01/storyboard.json';
import ep0601Manifest from './episodes/ep06_01/audioManifest.json';
import { Stage06_01 } from './episodes/ep06_01/Stage06_01';

import ep0701Storyboard from './episodes/ep07_01/storyboard.json';
import ep0701Manifest from './episodes/ep07_01/audioManifest.json';
import { Stage07_01 } from './episodes/ep07_01/Stage07_01';

import ep0702Storyboard from './episodes/ep07_02/storyboard.json';
import ep0702Manifest from './episodes/ep07_02/audioManifest.json';
import { Stage07_02 } from './episodes/ep07_02/Stage07_02';

import ep0703Storyboard from './episodes/ep07_03/storyboard.json';
import ep0703Manifest from './episodes/ep07_03/audioManifest.json';
import { Stage07_03 } from './episodes/ep07_03/Stage07_03';

import ep0801Storyboard from './episodes/ep08_01/storyboard.json';
import ep0801Manifest from './episodes/ep08_01/audioManifest.json';
import { Stage08_01 } from './episodes/ep08_01/Stage08_01';

import ep0802Storyboard from './episodes/ep08_02/storyboard.json';
import ep0802Manifest from './episodes/ep08_02/audioManifest.json';
import { Stage08_02 } from './episodes/ep08_02/Stage08_02';

import ep0803Storyboard from './episodes/ep08_03/storyboard.json';
import ep0803Manifest from './episodes/ep08_03/audioManifest.json';
import { Stage08_03 } from './episodes/ep08_03/Stage08_03';

const Ep0001Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage00_01} />
);
const Ep0101Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage01_01} />
);
const Ep0102Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage01_02} />
);
const Ep0201Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage02_01} />
);
const Ep0202Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage02_02} />
);
const Ep0301Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage03_01} />
);
const Ep0302Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage03_02} />
);
const Ep0401Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage04_01} />
);
const Ep04ExtraComp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage04_Extra} />
);
const Ep0501Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage05_01} />
);
const Ep0502Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage05_02} />
);
const Ep0503Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage05_03} />
);
const Ep0601Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage06_01} />
);
const Ep0701Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage07_01} />
);
const Ep0702Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage07_02} />
);
const Ep0703Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage07_03} />
);
const Ep0801Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage08_01} />
);
const Ep0802Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage08_02} />
);
const Ep0803Comp: React.FC<EpisodeProps> = (props) => (
  <EpisodeShell {...props} Stage={Stage08_03} />
);

const EPISODES: Array<{
  storyboard: EpisodeStoryboard;
  manifest: AudioManifest;
  component: React.FC<EpisodeProps>;
}> = [
  {
    storyboard: ep0001Storyboard as EpisodeStoryboard,
    manifest: ep0001Manifest as AudioManifest,
    component: Ep0001Comp,
  },
  {
    storyboard: ep0101Storyboard as EpisodeStoryboard,
    manifest: ep0101Manifest as AudioManifest,
    component: Ep0101Comp,
  },
  {
    storyboard: ep0102Storyboard as EpisodeStoryboard,
    manifest: ep0102Manifest as AudioManifest,
    component: Ep0102Comp,
  },
  {
    storyboard: ep0201Storyboard as EpisodeStoryboard,
    manifest: ep0201Manifest as AudioManifest,
    component: Ep0201Comp,
  },
  {
    storyboard: ep0202Storyboard as EpisodeStoryboard,
    manifest: ep0202Manifest as AudioManifest,
    component: Ep0202Comp,
  },
  {
    storyboard: ep0301Storyboard as EpisodeStoryboard,
    manifest: ep0301Manifest as AudioManifest,
    component: Ep0301Comp,
  },
  {
    storyboard: ep0302Storyboard as EpisodeStoryboard,
    manifest: ep0302Manifest as AudioManifest,
    component: Ep0302Comp,
  },
  {
    storyboard: ep0401Storyboard as EpisodeStoryboard,
    manifest: ep0401Manifest as AudioManifest,
    component: Ep0401Comp,
  },
  {
    storyboard: ep04ExtraStoryboard as EpisodeStoryboard,
    manifest: ep04ExtraManifest as AudioManifest,
    component: Ep04ExtraComp,
  },
  {
    storyboard: ep0501Storyboard as EpisodeStoryboard,
    manifest: ep0501Manifest as AudioManifest,
    component: Ep0501Comp,
  },
  {
    storyboard: ep0502Storyboard as EpisodeStoryboard,
    manifest: ep0502Manifest as AudioManifest,
    component: Ep0502Comp,
  },
  {
    storyboard: ep0503Storyboard as EpisodeStoryboard,
    manifest: ep0503Manifest as AudioManifest,
    component: Ep0503Comp,
  },
  {
    storyboard: ep0601Storyboard as EpisodeStoryboard,
    manifest: ep0601Manifest as AudioManifest,
    component: Ep0601Comp,
  },
  {
    storyboard: ep0701Storyboard as EpisodeStoryboard,
    manifest: ep0701Manifest as AudioManifest,
    component: Ep0701Comp,
  },
  {
    storyboard: ep0702Storyboard as EpisodeStoryboard,
    manifest: ep0702Manifest as AudioManifest,
    component: Ep0702Comp,
  },
  {
    storyboard: ep0703Storyboard as EpisodeStoryboard,
    manifest: ep0703Manifest as AudioManifest,
    component: Ep0703Comp,
  },
  {
    storyboard: ep0801Storyboard as EpisodeStoryboard,
    manifest: ep0801Manifest as AudioManifest,
    component: Ep0801Comp,
  },
  {
    storyboard: ep0802Storyboard as EpisodeStoryboard,
    manifest: ep0802Manifest as AudioManifest,
    component: Ep0802Comp,
  },
  {
    storyboard: ep0803Storyboard as EpisodeStoryboard,
    manifest: ep0803Manifest as AudioManifest,
    component: Ep0803Comp,
  },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {EPISODES.map(({ storyboard, manifest, component }) => {
        const { totalFrames } = buildShotSchedule(storyboard, manifest);
        return (
          <Composition
            key={storyboard.id}
            id={storyboard.id}
            component={component}
            durationInFrames={totalFrames}
            fps={storyboard.fps}
            width={storyboard.width}
            height={storyboard.height}
            defaultProps={{
              storyboard,
              manifest,
            }}
          />
        );
      })}
    </>
  );
};
