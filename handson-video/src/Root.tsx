import React from 'react';
import { Composition } from 'remotion';
import { EpisodeShell, type EpisodeProps, type StageProps } from './components';
import type { AudioManifest, EpisodeStoryboard } from './types/storyboard';
import { buildShotSchedule } from './utils/timing';

import ep001Storyboard from './episodes/ep001/storyboard.json';
import ep001Manifest from './episodes/ep001/audioManifest.json';
import { Stage001 } from './episodes/ep001/Stage001';

import ep002Storyboard from './episodes/ep002/storyboard.json';
import ep002Manifest from './episodes/ep002/audioManifest.json';
import { Stage002 } from './episodes/ep002/Stage002';

import ep003Storyboard from './episodes/ep003/storyboard.json';
import ep003Manifest from './episodes/ep003/audioManifest.json';
import { Stage003 } from './episodes/ep003/Stage003';

import ep004Storyboard from './episodes/ep004/storyboard.json';
import ep004Manifest from './episodes/ep004/audioManifest.json';
import { Stage004 } from './episodes/ep004/Stage004';

import ep005Storyboard from './episodes/ep005/storyboard.json';
import ep005Manifest from './episodes/ep005/audioManifest.json';
import { Stage005 } from './episodes/ep005/Stage005';

import ep006Storyboard from './episodes/ep006/storyboard.json';
import ep006Manifest from './episodes/ep006/audioManifest.json';
import { Stage006 } from './episodes/ep006/Stage006';

import ep006bStoryboard from './episodes/ep006b/storyboard.json';
import ep006bManifest from './episodes/ep006b/audioManifest.json';
import { Stage006B } from './episodes/ep006b/Stage006B';

import ep007Storyboard from './episodes/ep007/storyboard.json';
import ep007Manifest from './episodes/ep007/audioManifest.json';
import { Stage007 } from './episodes/ep007/Stage007';

import ep008Storyboard from './episodes/ep008/storyboard.json';
import ep008Manifest from './episodes/ep008/audioManifest.json';
import { Stage008 } from './episodes/ep008/Stage008';

import ep009Storyboard from './episodes/ep009/storyboard.json';
import ep009Manifest from './episodes/ep009/audioManifest.json';
import { Stage009 } from './episodes/ep009/Stage009';

import ep009bStoryboard from './episodes/ep009b/storyboard.json';
import ep009bManifest from './episodes/ep009b/audioManifest.json';
import { Stage009B } from './episodes/ep009b/Stage009B';

import ep010Storyboard from './episodes/ep010/storyboard.json';
import ep010Manifest from './episodes/ep010/audioManifest.json';
import { Stage010 } from './episodes/ep010/Stage010';

import ep011Storyboard from './episodes/ep011/storyboard.json';
import ep011Manifest from './episodes/ep011/audioManifest.json';
import { Stage011 } from './episodes/ep011/Stage011';

import ep012Storyboard from './episodes/ep012/storyboard.json';
import ep012Manifest from './episodes/ep012/audioManifest.json';
import { Stage012 } from './episodes/ep012/Stage012';

import ep013Storyboard from './episodes/ep013/storyboard.json';
import ep013Manifest from './episodes/ep013/audioManifest.json';
import { Stage013 } from './episodes/ep013/Stage013';

import ep014Storyboard from './episodes/ep014/storyboard.json';
import ep014Manifest from './episodes/ep014/audioManifest.json';
import { Stage014 } from './episodes/ep014/Stage014';

import ep015Storyboard from './episodes/ep015/storyboard.json';
import ep015Manifest from './episodes/ep015/audioManifest.json';
import { Stage015 } from './episodes/ep015/Stage015';

import ep015bStoryboard from './episodes/ep015b/storyboard.json';
import ep015bManifest from './episodes/ep015b/audioManifest.json';
import { Stage015B } from './episodes/ep015b/Stage015B';

import ep016Storyboard from './episodes/ep016/storyboard.json';
import ep016Manifest from './episodes/ep016/audioManifest.json';
import { Stage016 } from './episodes/ep016/Stage016';

import ep017Storyboard from './episodes/ep017/storyboard.json';
import ep017Manifest from './episodes/ep017/audioManifest.json';
import { Stage017 } from './episodes/ep017/Stage017';

import ep018Storyboard from './episodes/ep018/storyboard.json';
import ep018Manifest from './episodes/ep018/audioManifest.json';
import { Stage018 } from './episodes/ep018/Stage018';

import ep019Storyboard from './episodes/ep019/storyboard.json';
import ep019Manifest from './episodes/ep019/audioManifest.json';
import { Stage019 } from './episodes/ep019/Stage019';

import ep020Storyboard from './episodes/ep020/storyboard.json';
import ep020Manifest from './episodes/ep020/audioManifest.json';
import { Stage020 } from './episodes/ep020/Stage020';

import ep021Storyboard from './episodes/ep021/storyboard.json';
import ep021Manifest from './episodes/ep021/audioManifest.json';
import { Stage021 } from './episodes/ep021/Stage021';

import ep021bStoryboard from './episodes/ep021b/storyboard.json';
import ep021bManifest from './episodes/ep021b/audioManifest.json';
import { Stage021B } from './episodes/ep021b/Stage021B';

import ep022Storyboard from './episodes/ep022/storyboard.json';
import ep022Manifest from './episodes/ep022/audioManifest.json';
import { Stage022 } from './episodes/ep022/Stage022';

import ep023Storyboard from './episodes/ep023/storyboard.json';
import ep023Manifest from './episodes/ep023/audioManifest.json';
import { Stage023 } from './episodes/ep023/Stage023';

import ep024Storyboard from './episodes/ep024/storyboard.json';
import ep024Manifest from './episodes/ep024/audioManifest.json';
import { Stage024 } from './episodes/ep024/Stage024';

import ep025Storyboard from './episodes/ep025/storyboard.json';
import ep025Manifest from './episodes/ep025/audioManifest.json';
import { Stage025 } from './episodes/ep025/Stage025';

import ep025bStoryboard from './episodes/ep025b/storyboard.json';
import ep025bManifest from './episodes/ep025b/audioManifest.json';
import { Stage025B } from './episodes/ep025b/Stage025B';

import ep026Storyboard from './episodes/ep026/storyboard.json';
import ep026Manifest from './episodes/ep026/audioManifest.json';
import { Stage026 } from './episodes/ep026/Stage026';

import ep027Storyboard from './episodes/ep027/storyboard.json';
import ep027Manifest from './episodes/ep027/audioManifest.json';
import { Stage027 } from './episodes/ep027/Stage027';

import ep028Storyboard from './episodes/ep028/storyboard.json';
import ep028Manifest from './episodes/ep028/audioManifest.json';
import { Stage028 } from './episodes/ep028/Stage028';

import ep029Storyboard from './episodes/ep029/storyboard.json';
import ep029Manifest from './episodes/ep029/audioManifest.json';
import { Stage029 } from './episodes/ep029/Stage029';

import ep029bStoryboard from './episodes/ep029b/storyboard.json';
import ep029bManifest from './episodes/ep029b/audioManifest.json';
import { Stage029B } from './episodes/ep029b/Stage029B';

import ep030Storyboard from './episodes/ep030/storyboard.json';
import ep030Manifest from './episodes/ep030/audioManifest.json';
import { Stage030 } from './episodes/ep030/Stage030';

import ep031Storyboard from './episodes/ep031/storyboard.json';
import ep031Manifest from './episodes/ep031/audioManifest.json';
import { Stage031 } from './episodes/ep031/Stage031';

import ep031bStoryboard from './episodes/ep031b/storyboard.json';
import ep031bManifest from './episodes/ep031b/audioManifest.json';
import { Stage031B } from './episodes/ep031b/Stage031B';

import ep032Storyboard from './episodes/ep032/storyboard.json';
import ep032Manifest from './episodes/ep032/audioManifest.json';
import { Stage032 } from './episodes/ep032/Stage032';

import ep033Storyboard from './episodes/ep033/storyboard.json';
import ep033Manifest from './episodes/ep033/audioManifest.json';
import { Stage033 } from './episodes/ep033/Stage033';

import ep034Storyboard from './episodes/ep034/storyboard.json';
import ep034Manifest from './episodes/ep034/audioManifest.json';
import { Stage034 } from './episodes/ep034/Stage034';

import ep035Storyboard from './episodes/ep035/storyboard.json';
import ep035Manifest from './episodes/ep035/audioManifest.json';
import { Stage035 } from './episodes/ep035/Stage035';

import ep036Storyboard from './episodes/ep036/storyboard.json';
import ep036Manifest from './episodes/ep036/audioManifest.json';
import { Stage036 } from './episodes/ep036/Stage036';

import ep036bStoryboard from './episodes/ep036b/storyboard.json';
import ep036bManifest from './episodes/ep036b/audioManifest.json';
import { Stage036B } from './episodes/ep036b/Stage036B';

import ep037Storyboard from './episodes/ep037/storyboard.json';
import ep037Manifest from './episodes/ep037/audioManifest.json';
import { Stage037 } from './episodes/ep037/Stage037';

import ep038Storyboard from './episodes/ep038/storyboard.json';
import ep038Manifest from './episodes/ep038/audioManifest.json';
import { Stage038 } from './episodes/ep038/Stage038';

import ep039Storyboard from './episodes/ep039/storyboard.json';
import ep039Manifest from './episodes/ep039/audioManifest.json';
import { Stage039 } from './episodes/ep039/Stage039';

import ep040Storyboard from './episodes/ep040/storyboard.json';
import ep040Manifest from './episodes/ep040/audioManifest.json';
import { Stage040 } from './episodes/ep040/Stage040';

import ep041Storyboard from './episodes/ep041/storyboard.json';
import ep041Manifest from './episodes/ep041/audioManifest.json';
import { Stage041 } from './episodes/ep041/Stage041';

import ep042Storyboard from './episodes/ep042/storyboard.json';
import ep042Manifest from './episodes/ep042/audioManifest.json';
import { Stage042 } from './episodes/ep042/Stage042';

import ep043Storyboard from './episodes/ep043/storyboard.json';
import ep043Manifest from './episodes/ep043/audioManifest.json';
import { Stage043 } from './episodes/ep043/Stage043';

import ep044Storyboard from './episodes/ep044/storyboard.json';
import ep044Manifest from './episodes/ep044/audioManifest.json';
import { Stage044 } from './episodes/ep044/Stage044';

import ep045Storyboard from './episodes/ep045/storyboard.json';
import ep045Manifest from './episodes/ep045/audioManifest.json';
import { Stage045 } from './episodes/ep045/Stage045';

import ep046Storyboard from './episodes/ep046/storyboard.json';
import ep046Manifest from './episodes/ep046/audioManifest.json';
import { Stage046 } from './episodes/ep046/Stage046';

import ep047Storyboard from './episodes/ep047/storyboard.json';
import ep047Manifest from './episodes/ep047/audioManifest.json';
import { Stage047 } from './episodes/ep047/Stage047';

import ep048Storyboard from './episodes/ep048/storyboard.json';
import ep048Manifest from './episodes/ep048/audioManifest.json';
import { Stage048 } from './episodes/ep048/Stage048';

import ep049Storyboard from './episodes/ep049/storyboard.json';
import ep049Manifest from './episodes/ep049/audioManifest.json';
import { Stage049 } from './episodes/ep049/Stage049';

import ep050Storyboard from './episodes/ep050/storyboard.json';
import ep050Manifest from './episodes/ep050/audioManifest.json';
import { Stage050 } from './episodes/ep050/Stage050';

import ep050bStoryboard from './episodes/ep050b/storyboard.json';
import ep050bManifest from './episodes/ep050b/audioManifest.json';
import { Stage050B } from './episodes/ep050b/Stage050B';

import ep051Storyboard from './episodes/ep051/storyboard.json';
import ep051Manifest from './episodes/ep051/audioManifest.json';
import { Stage051 } from './episodes/ep051/Stage051';

import ep052Storyboard from './episodes/ep052/storyboard.json';
import ep052Manifest from './episodes/ep052/audioManifest.json';
import { Stage052 } from './episodes/ep052/Stage052';

import ep053Storyboard from './episodes/ep053/storyboard.json';
import ep053Manifest from './episodes/ep053/audioManifest.json';
import { Stage053 } from './episodes/ep053/Stage053';

import ep054Storyboard from './episodes/ep054/storyboard.json';
import ep054Manifest from './episodes/ep054/audioManifest.json';
import { Stage054 } from './episodes/ep054/Stage054';

import ep055Storyboard from './episodes/ep055/storyboard.json';
import ep055Manifest from './episodes/ep055/audioManifest.json';
import { Stage055 } from './episodes/ep055/Stage055';

import ep056Storyboard from './episodes/ep056/storyboard.json';
import ep056Manifest from './episodes/ep056/audioManifest.json';
import { Stage056 } from './episodes/ep056/Stage056';

import ep057Storyboard from './episodes/ep057/storyboard.json';
import ep057Manifest from './episodes/ep057/audioManifest.json';
import { Stage057 } from './episodes/ep057/Stage057';

import ep058Storyboard from './episodes/ep058/storyboard.json';
import ep058Manifest from './episodes/ep058/audioManifest.json';
import { Stage058 } from './episodes/ep058/Stage058';

import ep059Storyboard from './episodes/ep059/storyboard.json';
import ep059Manifest from './episodes/ep059/audioManifest.json';
import { Stage059 } from './episodes/ep059/Stage059';

import ep060Storyboard from './episodes/ep060/storyboard.json';
import ep060Manifest from './episodes/ep060/audioManifest.json';
import { Stage060 } from './episodes/ep060/Stage060';

import ep061Storyboard from './episodes/ep061/storyboard.json';
import ep061Manifest from './episodes/ep061/audioManifest.json';
import { Stage061 } from './episodes/ep061/Stage061';

import ep062Storyboard from './episodes/ep062/storyboard.json';
import ep062Manifest from './episodes/ep062/audioManifest.json';
import { Stage062 } from './episodes/ep062/Stage062';

import ep062bStoryboard from './episodes/ep062b/storyboard.json';
import ep062bManifest from './episodes/ep062b/audioManifest.json';
import { Stage062B } from './episodes/ep062b/Stage062B';

import ep063Storyboard from './episodes/ep063/storyboard.json';
import ep063Manifest from './episodes/ep063/audioManifest.json';
import { Stage063 } from './episodes/ep063/Stage063';

import ep064Storyboard from './episodes/ep064/storyboard.json';
import ep064Manifest from './episodes/ep064/audioManifest.json';
import { Stage064 } from './episodes/ep064/Stage064';

import ep065Storyboard from './episodes/ep065/storyboard.json';
import ep065Manifest from './episodes/ep065/audioManifest.json';
import { Stage065 } from './episodes/ep065/Stage065';

import ep066Storyboard from './episodes/ep066/storyboard.json';
import ep066Manifest from './episodes/ep066/audioManifest.json';
import { Stage066 } from './episodes/ep066/Stage066';

import ep066bStoryboard from './episodes/ep066b/storyboard.json';
import ep066bManifest from './episodes/ep066b/audioManifest.json';
import { Stage066B } from './episodes/ep066b/Stage066B';

import ep067Storyboard from './episodes/ep067/storyboard.json';
import ep067Manifest from './episodes/ep067/audioManifest.json';
import { Stage067 } from './episodes/ep067/Stage067';

import ep068Storyboard from './episodes/ep068/storyboard.json';
import ep068Manifest from './episodes/ep068/audioManifest.json';
import { Stage068 } from './episodes/ep068/Stage068';

import ep069Storyboard from './episodes/ep069/storyboard.json';
import ep069Manifest from './episodes/ep069/audioManifest.json';
import { Stage069 } from './episodes/ep069/Stage069';

import ep070Storyboard from './episodes/ep070/storyboard.json';
import ep070Manifest from './episodes/ep070/audioManifest.json';
import { Stage070 } from './episodes/ep070/Stage070';

import ep071Storyboard from './episodes/ep071/storyboard.json';
import ep071Manifest from './episodes/ep071/audioManifest.json';
import { Stage071 } from './episodes/ep071/Stage071';

import ep072Storyboard from './episodes/ep072/storyboard.json';
import ep072Manifest from './episodes/ep072/audioManifest.json';
import { Stage072 } from './episodes/ep072/Stage072';

import ep073Storyboard from './episodes/ep073/storyboard.json';
import ep073Manifest from './episodes/ep073/audioManifest.json';
import { Stage073 } from './episodes/ep073/Stage073';

import ep074Storyboard from './episodes/ep074/storyboard.json';
import ep074Manifest from './episodes/ep074/audioManifest.json';
import { Stage074 } from './episodes/ep074/Stage074';

import ep075Storyboard from './episodes/ep075/storyboard.json';
import ep075Manifest from './episodes/ep075/audioManifest.json';
import { Stage075 } from './episodes/ep075/Stage075';

import ep076Storyboard from './episodes/ep076/storyboard.json';
import ep076Manifest from './episodes/ep076/audioManifest.json';
import { Stage076 } from './episodes/ep076/Stage076';

import ep077Storyboard from './episodes/ep077/storyboard.json';
import ep077Manifest from './episodes/ep077/audioManifest.json';
import { Stage077 } from './episodes/ep077/Stage077';

import ep078Storyboard from './episodes/ep078/storyboard.json';
import ep078Manifest from './episodes/ep078/audioManifest.json';
import { Stage078 } from './episodes/ep078/Stage078';

import ep078bStoryboard from './episodes/ep078b/storyboard.json';
import ep078bManifest from './episodes/ep078b/audioManifest.json';
import { Stage078B } from './episodes/ep078b/Stage078B';

import ep079Storyboard from './episodes/ep079/storyboard.json';
import ep079Manifest from './episodes/ep079/audioManifest.json';
import { Stage079 } from './episodes/ep079/Stage079';

import ep080Storyboard from './episodes/ep080/storyboard.json';
import ep080Manifest from './episodes/ep080/audioManifest.json';
import { Stage080 } from './episodes/ep080/Stage080';

import ep081Storyboard from './episodes/ep081/storyboard.json';
import ep081Manifest from './episodes/ep081/audioManifest.json';
import { Stage081 } from './episodes/ep081/Stage081';

import ep082Storyboard from './episodes/ep082/storyboard.json';
import ep082Manifest from './episodes/ep082/audioManifest.json';
import { Stage082 } from './episodes/ep082/Stage082';

import ep083Storyboard from './episodes/ep083/storyboard.json';
import ep083Manifest from './episodes/ep083/audioManifest.json';
import { Stage083 } from './episodes/ep083/Stage083';

import ep084Storyboard from './episodes/ep084/storyboard.json';
import ep084Manifest from './episodes/ep084/audioManifest.json';
import { Stage084 } from './episodes/ep084/Stage084';

import ep085Storyboard from './episodes/ep085/storyboard.json';
import ep085Manifest from './episodes/ep085/audioManifest.json';
import { Stage085 } from './episodes/ep085/Stage085';

import ep086Storyboard from './episodes/ep086/storyboard.json';
import ep086Manifest from './episodes/ep086/audioManifest.json';
import { Stage086 } from './episodes/ep086/Stage086';

import ep087Storyboard from './episodes/ep087/storyboard.json';
import ep087Manifest from './episodes/ep087/audioManifest.json';
import { Stage087 } from './episodes/ep087/Stage087';

import ep088Storyboard from './episodes/ep088/storyboard.json';
import ep088Manifest from './episodes/ep088/audioManifest.json';
import { Stage088 } from './episodes/ep088/Stage088';

import ep088bStoryboard from './episodes/ep088b/storyboard.json';
import ep088bManifest from './episodes/ep088b/audioManifest.json';
import { Stage088B } from './episodes/ep088b/Stage088B';

import ep089Storyboard from './episodes/ep089/storyboard.json';
import ep089Manifest from './episodes/ep089/audioManifest.json';
import { Stage089 } from './episodes/ep089/Stage089';

import ep090Storyboard from './episodes/ep090/storyboard.json';
import ep090Manifest from './episodes/ep090/audioManifest.json';
import { Stage090 } from './episodes/ep090/Stage090';

import ep091Storyboard from './episodes/ep091/storyboard.json';
import ep091Manifest from './episodes/ep091/audioManifest.json';
import { Stage091 } from './episodes/ep091/Stage091';

import ep092Storyboard from './episodes/ep092/storyboard.json';
import ep092Manifest from './episodes/ep092/audioManifest.json';
import { Stage092 } from './episodes/ep092/Stage092';

import ep093Storyboard from './episodes/ep093/storyboard.json';
import ep093Manifest from './episodes/ep093/audioManifest.json';
import { Stage093 } from './episodes/ep093/Stage093';

import ep094Storyboard from './episodes/ep094/storyboard.json';
import ep094Manifest from './episodes/ep094/audioManifest.json';
import { Stage094 } from './episodes/ep094/Stage094';

import ep095Storyboard from './episodes/ep095/storyboard.json';
import ep095Manifest from './episodes/ep095/audioManifest.json';
import { Stage095 } from './episodes/ep095/Stage095';

import ep096Storyboard from './episodes/ep096/storyboard.json';
import ep096Manifest from './episodes/ep096/audioManifest.json';
import { Stage096 } from './episodes/ep096/Stage096';

import ep097Storyboard from './episodes/ep097/storyboard.json';
import ep097Manifest from './episodes/ep097/audioManifest.json';
import { Stage097 } from './episodes/ep097/Stage097';

import ep098Storyboard from './episodes/ep098/storyboard.json';
import ep098Manifest from './episodes/ep098/audioManifest.json';
import { Stage098 } from './episodes/ep098/Stage098';

import ep099Storyboard from './episodes/ep099/storyboard.json';
import ep099Manifest from './episodes/ep099/audioManifest.json';
import { Stage099 } from './episodes/ep099/Stage099';

import ep100Storyboard from './episodes/ep100/storyboard.json';
import ep100Manifest from './episodes/ep100/audioManifest.json';
import { Stage100 } from './episodes/ep100/Stage100';

import ep101Storyboard from './episodes/ep101/storyboard.json';
import ep101Manifest from './episodes/ep101/audioManifest.json';
import { Stage101 } from './episodes/ep101/Stage101';

import ep102Storyboard from './episodes/ep102/storyboard.json';
import ep102Manifest from './episodes/ep102/audioManifest.json';
import { Stage102 } from './episodes/ep102/Stage102';

import ep103Storyboard from './episodes/ep103/storyboard.json';
import ep103Manifest from './episodes/ep103/audioManifest.json';
import { Stage103 } from './episodes/ep103/Stage103';

import ep104Storyboard from './episodes/ep104/storyboard.json';
import ep104Manifest from './episodes/ep104/audioManifest.json';
import { Stage104 } from './episodes/ep104/Stage104';

import ep104bStoryboard from './episodes/ep104b/storyboard.json';
import ep104bManifest from './episodes/ep104b/audioManifest.json';
import { Stage104B } from './episodes/ep104b/Stage104B';

import ep105Storyboard from './episodes/ep105/storyboard.json';
import ep105Manifest from './episodes/ep105/audioManifest.json';
import { Stage105 } from './episodes/ep105/Stage105';

import ep106Storyboard from './episodes/ep106/storyboard.json';
import ep106Manifest from './episodes/ep106/audioManifest.json';
import { Stage106 } from './episodes/ep106/Stage106';

import ep107Storyboard from './episodes/ep107/storyboard.json';
import ep107Manifest from './episodes/ep107/audioManifest.json';
import { Stage107 } from './episodes/ep107/Stage107';

import ep108Storyboard from './episodes/ep108/storyboard.json';
import ep108Manifest from './episodes/ep108/audioManifest.json';
import { Stage108 } from './episodes/ep108/Stage108';

import ep109Storyboard from './episodes/ep109/storyboard.json';
import ep109Manifest from './episodes/ep109/audioManifest.json';
import { Stage109 } from './episodes/ep109/Stage109';

import ep110Storyboard from './episodes/ep110/storyboard.json';
import ep110Manifest from './episodes/ep110/audioManifest.json';
import { Stage110 } from './episodes/ep110/Stage110';

import ep111Storyboard from './episodes/ep111/storyboard.json';
import ep111Manifest from './episodes/ep111/audioManifest.json';
import { Stage111 } from './episodes/ep111/Stage111';

import ep112Storyboard from './episodes/ep112/storyboard.json';
import ep112Manifest from './episodes/ep112/audioManifest.json';
import { Stage112 } from './episodes/ep112/Stage112';

const EPISODES: Array<{
  storyboard: EpisodeStoryboard;
  manifest: AudioManifest;
  Stage: React.FC<StageProps>;
}> = [
  { storyboard: ep001Storyboard as EpisodeStoryboard, manifest: ep001Manifest as AudioManifest, Stage: Stage001 },
  { storyboard: ep002Storyboard as EpisodeStoryboard, manifest: ep002Manifest as AudioManifest, Stage: Stage002 },
  { storyboard: ep003Storyboard as EpisodeStoryboard, manifest: ep003Manifest as AudioManifest, Stage: Stage003 },
  { storyboard: ep004Storyboard as EpisodeStoryboard, manifest: ep004Manifest as AudioManifest, Stage: Stage004 },
  { storyboard: ep005Storyboard as EpisodeStoryboard, manifest: ep005Manifest as AudioManifest, Stage: Stage005 },
  { storyboard: ep006Storyboard as EpisodeStoryboard, manifest: ep006Manifest as AudioManifest, Stage: Stage006 },
  { storyboard: ep006bStoryboard as EpisodeStoryboard, manifest: ep006bManifest as AudioManifest, Stage: Stage006B },
  { storyboard: ep007Storyboard as EpisodeStoryboard, manifest: ep007Manifest as AudioManifest, Stage: Stage007 },
  { storyboard: ep008Storyboard as EpisodeStoryboard, manifest: ep008Manifest as AudioManifest, Stage: Stage008 },
  { storyboard: ep009Storyboard as EpisodeStoryboard, manifest: ep009Manifest as AudioManifest, Stage: Stage009 },
  { storyboard: ep009bStoryboard as EpisodeStoryboard, manifest: ep009bManifest as AudioManifest, Stage: Stage009B },
  { storyboard: ep010Storyboard as EpisodeStoryboard, manifest: ep010Manifest as AudioManifest, Stage: Stage010 },
  { storyboard: ep011Storyboard as EpisodeStoryboard, manifest: ep011Manifest as AudioManifest, Stage: Stage011 },
  { storyboard: ep012Storyboard as EpisodeStoryboard, manifest: ep012Manifest as AudioManifest, Stage: Stage012 },
  { storyboard: ep013Storyboard as EpisodeStoryboard, manifest: ep013Manifest as AudioManifest, Stage: Stage013 },
  { storyboard: ep014Storyboard as EpisodeStoryboard, manifest: ep014Manifest as AudioManifest, Stage: Stage014 },
  { storyboard: ep015Storyboard as EpisodeStoryboard, manifest: ep015Manifest as AudioManifest, Stage: Stage015 },
  { storyboard: ep015bStoryboard as EpisodeStoryboard, manifest: ep015bManifest as AudioManifest, Stage: Stage015B },
  { storyboard: ep016Storyboard as EpisodeStoryboard, manifest: ep016Manifest as AudioManifest, Stage: Stage016 },
  { storyboard: ep017Storyboard as EpisodeStoryboard, manifest: ep017Manifest as AudioManifest, Stage: Stage017 },
  { storyboard: ep018Storyboard as EpisodeStoryboard, manifest: ep018Manifest as AudioManifest, Stage: Stage018 },
  { storyboard: ep019Storyboard as EpisodeStoryboard, manifest: ep019Manifest as AudioManifest, Stage: Stage019 },
  { storyboard: ep020Storyboard as EpisodeStoryboard, manifest: ep020Manifest as AudioManifest, Stage: Stage020 },
  { storyboard: ep021Storyboard as EpisodeStoryboard, manifest: ep021Manifest as AudioManifest, Stage: Stage021 },
  { storyboard: ep021bStoryboard as EpisodeStoryboard, manifest: ep021bManifest as AudioManifest, Stage: Stage021B },
  { storyboard: ep022Storyboard as EpisodeStoryboard, manifest: ep022Manifest as AudioManifest, Stage: Stage022 },
  { storyboard: ep023Storyboard as EpisodeStoryboard, manifest: ep023Manifest as AudioManifest, Stage: Stage023 },
  { storyboard: ep024Storyboard as EpisodeStoryboard, manifest: ep024Manifest as AudioManifest, Stage: Stage024 },
  { storyboard: ep025Storyboard as EpisodeStoryboard, manifest: ep025Manifest as AudioManifest, Stage: Stage025 },
  { storyboard: ep025bStoryboard as EpisodeStoryboard, manifest: ep025bManifest as AudioManifest, Stage: Stage025B },
  { storyboard: ep026Storyboard as EpisodeStoryboard, manifest: ep026Manifest as AudioManifest, Stage: Stage026 },
  { storyboard: ep027Storyboard as EpisodeStoryboard, manifest: ep027Manifest as AudioManifest, Stage: Stage027 },
  { storyboard: ep028Storyboard as EpisodeStoryboard, manifest: ep028Manifest as AudioManifest, Stage: Stage028 },
  { storyboard: ep029Storyboard as EpisodeStoryboard, manifest: ep029Manifest as AudioManifest, Stage: Stage029 },
  { storyboard: ep029bStoryboard as EpisodeStoryboard, manifest: ep029bManifest as AudioManifest, Stage: Stage029B },
  { storyboard: ep030Storyboard as EpisodeStoryboard, manifest: ep030Manifest as AudioManifest, Stage: Stage030 },
  { storyboard: ep031Storyboard as EpisodeStoryboard, manifest: ep031Manifest as AudioManifest, Stage: Stage031 },
  { storyboard: ep031bStoryboard as EpisodeStoryboard, manifest: ep031bManifest as AudioManifest, Stage: Stage031B },
  { storyboard: ep032Storyboard as EpisodeStoryboard, manifest: ep032Manifest as AudioManifest, Stage: Stage032 },
  { storyboard: ep033Storyboard as EpisodeStoryboard, manifest: ep033Manifest as AudioManifest, Stage: Stage033 },
  { storyboard: ep034Storyboard as EpisodeStoryboard, manifest: ep034Manifest as AudioManifest, Stage: Stage034 },
  { storyboard: ep035Storyboard as EpisodeStoryboard, manifest: ep035Manifest as AudioManifest, Stage: Stage035 },
  { storyboard: ep036Storyboard as EpisodeStoryboard, manifest: ep036Manifest as AudioManifest, Stage: Stage036 },
  { storyboard: ep036bStoryboard as EpisodeStoryboard, manifest: ep036bManifest as AudioManifest, Stage: Stage036B },
  { storyboard: ep037Storyboard as EpisodeStoryboard, manifest: ep037Manifest as AudioManifest, Stage: Stage037 },
  { storyboard: ep038Storyboard as EpisodeStoryboard, manifest: ep038Manifest as AudioManifest, Stage: Stage038 },
  { storyboard: ep039Storyboard as EpisodeStoryboard, manifest: ep039Manifest as AudioManifest, Stage: Stage039 },
  { storyboard: ep040Storyboard as EpisodeStoryboard, manifest: ep040Manifest as AudioManifest, Stage: Stage040 },
  { storyboard: ep041Storyboard as EpisodeStoryboard, manifest: ep041Manifest as AudioManifest, Stage: Stage041 },
  { storyboard: ep042Storyboard as EpisodeStoryboard, manifest: ep042Manifest as AudioManifest, Stage: Stage042 },
  { storyboard: ep043Storyboard as EpisodeStoryboard, manifest: ep043Manifest as AudioManifest, Stage: Stage043 },
  { storyboard: ep044Storyboard as EpisodeStoryboard, manifest: ep044Manifest as AudioManifest, Stage: Stage044 },
  { storyboard: ep045Storyboard as EpisodeStoryboard, manifest: ep045Manifest as AudioManifest, Stage: Stage045 },
  { storyboard: ep046Storyboard as EpisodeStoryboard, manifest: ep046Manifest as AudioManifest, Stage: Stage046 },
  { storyboard: ep047Storyboard as EpisodeStoryboard, manifest: ep047Manifest as AudioManifest, Stage: Stage047 },
  { storyboard: ep048Storyboard as EpisodeStoryboard, manifest: ep048Manifest as AudioManifest, Stage: Stage048 },
  { storyboard: ep049Storyboard as EpisodeStoryboard, manifest: ep049Manifest as AudioManifest, Stage: Stage049 },
  { storyboard: ep050Storyboard as EpisodeStoryboard, manifest: ep050Manifest as AudioManifest, Stage: Stage050 },
  { storyboard: ep050bStoryboard as EpisodeStoryboard, manifest: ep050bManifest as AudioManifest, Stage: Stage050B },
  { storyboard: ep051Storyboard as EpisodeStoryboard, manifest: ep051Manifest as AudioManifest, Stage: Stage051 },
  { storyboard: ep052Storyboard as EpisodeStoryboard, manifest: ep052Manifest as AudioManifest, Stage: Stage052 },
  { storyboard: ep053Storyboard as EpisodeStoryboard, manifest: ep053Manifest as AudioManifest, Stage: Stage053 },
  { storyboard: ep054Storyboard as EpisodeStoryboard, manifest: ep054Manifest as AudioManifest, Stage: Stage054 },
  { storyboard: ep055Storyboard as EpisodeStoryboard, manifest: ep055Manifest as AudioManifest, Stage: Stage055 },
  { storyboard: ep056Storyboard as EpisodeStoryboard, manifest: ep056Manifest as AudioManifest, Stage: Stage056 },
  { storyboard: ep057Storyboard as EpisodeStoryboard, manifest: ep057Manifest as AudioManifest, Stage: Stage057 },
  { storyboard: ep058Storyboard as EpisodeStoryboard, manifest: ep058Manifest as AudioManifest, Stage: Stage058 },
  { storyboard: ep059Storyboard as EpisodeStoryboard, manifest: ep059Manifest as AudioManifest, Stage: Stage059 },
  { storyboard: ep060Storyboard as EpisodeStoryboard, manifest: ep060Manifest as AudioManifest, Stage: Stage060 },
  { storyboard: ep061Storyboard as EpisodeStoryboard, manifest: ep061Manifest as AudioManifest, Stage: Stage061 },
  { storyboard: ep062Storyboard as EpisodeStoryboard, manifest: ep062Manifest as AudioManifest, Stage: Stage062 },
  { storyboard: ep062bStoryboard as EpisodeStoryboard, manifest: ep062bManifest as AudioManifest, Stage: Stage062B },
  { storyboard: ep063Storyboard as EpisodeStoryboard, manifest: ep063Manifest as AudioManifest, Stage: Stage063 },
  { storyboard: ep064Storyboard as EpisodeStoryboard, manifest: ep064Manifest as AudioManifest, Stage: Stage064 },
  { storyboard: ep065Storyboard as EpisodeStoryboard, manifest: ep065Manifest as AudioManifest, Stage: Stage065 },
  { storyboard: ep066Storyboard as EpisodeStoryboard, manifest: ep066Manifest as AudioManifest, Stage: Stage066 },
  { storyboard: ep066bStoryboard as EpisodeStoryboard, manifest: ep066bManifest as AudioManifest, Stage: Stage066B },
  { storyboard: ep067Storyboard as EpisodeStoryboard, manifest: ep067Manifest as AudioManifest, Stage: Stage067 },
  { storyboard: ep068Storyboard as EpisodeStoryboard, manifest: ep068Manifest as AudioManifest, Stage: Stage068 },
  { storyboard: ep069Storyboard as EpisodeStoryboard, manifest: ep069Manifest as AudioManifest, Stage: Stage069 },
  { storyboard: ep070Storyboard as EpisodeStoryboard, manifest: ep070Manifest as AudioManifest, Stage: Stage070 },
  { storyboard: ep071Storyboard as EpisodeStoryboard, manifest: ep071Manifest as AudioManifest, Stage: Stage071 },
  { storyboard: ep072Storyboard as EpisodeStoryboard, manifest: ep072Manifest as AudioManifest, Stage: Stage072 },
  { storyboard: ep073Storyboard as EpisodeStoryboard, manifest: ep073Manifest as AudioManifest, Stage: Stage073 },
  { storyboard: ep074Storyboard as EpisodeStoryboard, manifest: ep074Manifest as AudioManifest, Stage: Stage074 },
  { storyboard: ep075Storyboard as EpisodeStoryboard, manifest: ep075Manifest as AudioManifest, Stage: Stage075 },
  { storyboard: ep076Storyboard as EpisodeStoryboard, manifest: ep076Manifest as AudioManifest, Stage: Stage076 },
  { storyboard: ep077Storyboard as EpisodeStoryboard, manifest: ep077Manifest as AudioManifest, Stage: Stage077 },
  { storyboard: ep078Storyboard as EpisodeStoryboard, manifest: ep078Manifest as AudioManifest, Stage: Stage078 },
  { storyboard: ep078bStoryboard as EpisodeStoryboard, manifest: ep078bManifest as AudioManifest, Stage: Stage078B },
  { storyboard: ep079Storyboard as EpisodeStoryboard, manifest: ep079Manifest as AudioManifest, Stage: Stage079 },
  { storyboard: ep080Storyboard as EpisodeStoryboard, manifest: ep080Manifest as AudioManifest, Stage: Stage080 },
  { storyboard: ep081Storyboard as EpisodeStoryboard, manifest: ep081Manifest as AudioManifest, Stage: Stage081 },
  { storyboard: ep082Storyboard as EpisodeStoryboard, manifest: ep082Manifest as AudioManifest, Stage: Stage082 },
  { storyboard: ep083Storyboard as EpisodeStoryboard, manifest: ep083Manifest as AudioManifest, Stage: Stage083 },
  { storyboard: ep084Storyboard as EpisodeStoryboard, manifest: ep084Manifest as AudioManifest, Stage: Stage084 },
  { storyboard: ep085Storyboard as EpisodeStoryboard, manifest: ep085Manifest as AudioManifest, Stage: Stage085 },
  { storyboard: ep086Storyboard as EpisodeStoryboard, manifest: ep086Manifest as AudioManifest, Stage: Stage086 },
  { storyboard: ep087Storyboard as EpisodeStoryboard, manifest: ep087Manifest as AudioManifest, Stage: Stage087 },
  { storyboard: ep088Storyboard as EpisodeStoryboard, manifest: ep088Manifest as AudioManifest, Stage: Stage088 },
  { storyboard: ep088bStoryboard as EpisodeStoryboard, manifest: ep088bManifest as AudioManifest, Stage: Stage088B },
  { storyboard: ep089Storyboard as EpisodeStoryboard, manifest: ep089Manifest as AudioManifest, Stage: Stage089 },
  { storyboard: ep090Storyboard as EpisodeStoryboard, manifest: ep090Manifest as AudioManifest, Stage: Stage090 },
  { storyboard: ep091Storyboard as EpisodeStoryboard, manifest: ep091Manifest as AudioManifest, Stage: Stage091 },
  { storyboard: ep092Storyboard as EpisodeStoryboard, manifest: ep092Manifest as AudioManifest, Stage: Stage092 },
  { storyboard: ep093Storyboard as EpisodeStoryboard, manifest: ep093Manifest as AudioManifest, Stage: Stage093 },
  { storyboard: ep094Storyboard as EpisodeStoryboard, manifest: ep094Manifest as AudioManifest, Stage: Stage094 },
  { storyboard: ep095Storyboard as EpisodeStoryboard, manifest: ep095Manifest as AudioManifest, Stage: Stage095 },
  { storyboard: ep096Storyboard as EpisodeStoryboard, manifest: ep096Manifest as AudioManifest, Stage: Stage096 },
  { storyboard: ep097Storyboard as EpisodeStoryboard, manifest: ep097Manifest as AudioManifest, Stage: Stage097 },
  { storyboard: ep098Storyboard as EpisodeStoryboard, manifest: ep098Manifest as AudioManifest, Stage: Stage098 },
  { storyboard: ep099Storyboard as EpisodeStoryboard, manifest: ep099Manifest as AudioManifest, Stage: Stage099 },
  { storyboard: ep100Storyboard as EpisodeStoryboard, manifest: ep100Manifest as AudioManifest, Stage: Stage100 },
  { storyboard: ep101Storyboard as EpisodeStoryboard, manifest: ep101Manifest as AudioManifest, Stage: Stage101 },
  { storyboard: ep102Storyboard as EpisodeStoryboard, manifest: ep102Manifest as AudioManifest, Stage: Stage102 },
  { storyboard: ep103Storyboard as EpisodeStoryboard, manifest: ep103Manifest as AudioManifest, Stage: Stage103 },
  { storyboard: ep104Storyboard as EpisodeStoryboard, manifest: ep104Manifest as AudioManifest, Stage: Stage104 },
  { storyboard: ep104bStoryboard as EpisodeStoryboard, manifest: ep104bManifest as AudioManifest, Stage: Stage104B },
  { storyboard: ep105Storyboard as EpisodeStoryboard, manifest: ep105Manifest as AudioManifest, Stage: Stage105 },
  { storyboard: ep106Storyboard as EpisodeStoryboard, manifest: ep106Manifest as AudioManifest, Stage: Stage106 },
  { storyboard: ep107Storyboard as EpisodeStoryboard, manifest: ep107Manifest as AudioManifest, Stage: Stage107 },
  { storyboard: ep108Storyboard as EpisodeStoryboard, manifest: ep108Manifest as AudioManifest, Stage: Stage108 },
  { storyboard: ep109Storyboard as EpisodeStoryboard, manifest: ep109Manifest as AudioManifest, Stage: Stage109 },
  { storyboard: ep110Storyboard as EpisodeStoryboard, manifest: ep110Manifest as AudioManifest, Stage: Stage110 },
  { storyboard: ep111Storyboard as EpisodeStoryboard, manifest: ep111Manifest as AudioManifest, Stage: Stage111 },
  { storyboard: ep112Storyboard as EpisodeStoryboard, manifest: ep112Manifest as AudioManifest, Stage: Stage112 },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {EPISODES.map(({ storyboard, manifest, Stage }) => {
        const { totalFrames } = buildShotSchedule(storyboard, manifest);
        const Comp: React.FC<EpisodeProps> = (props) => (
          <EpisodeShell {...props} Stage={Stage} />
        );
        return (
          <Composition
            key={storyboard.id}
            id={storyboard.id}
            component={Comp}
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
