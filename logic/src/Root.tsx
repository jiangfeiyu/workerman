import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { EP01Argument } from "./logic/EP01Argument";
import { EP02Identity } from "./logic/EP02Identity";
import { EP03Conditions } from "./logic/EP03Conditions";
import { EP04Boolean } from "./logic/EP04Boolean";
import { EP05FallacyStrawman } from "./logic/EP05FallacyStrawman";
import { EP06AuthorityCircle } from "./logic/EP06AuthorityCircle";
import { EP07CorrelationBias } from "./logic/EP07CorrelationBias";
import { EP08FalseDilemma } from "./logic/EP08FalseDilemma";
import { EP09Mece } from "./logic/EP09Mece";
import { EP10ValidSound } from "./logic/EP10ValidSound";
import { EP11ThreeInferences } from "./logic/EP11ThreeInferences";
import { EP12Reductio } from "./logic/EP12Reductio";
import { EP13Toulmin } from "./logic/EP13Toulmin";
import { EP14Pyramid } from "./logic/EP14Pyramid";
import { EP15StarCausal } from "./logic/EP15StarCausal";
import { EP16Warroom } from "./logic/EP16Warroom";
import { EP17FirstPrinciples } from "./logic/EP17FirstPrinciples";
import { EP18IssueTree } from "./logic/EP18IssueTree";
import { EP19SunkCost } from "./logic/EP19SunkCost";
import { EP20SecondOrder } from "./logic/EP20SecondOrder";
import { EP21FourLayers } from "./logic/EP21FourLayers";
import { EP22PayoffMatrix } from "./logic/EP22PayoffMatrix";
import { EP23BiasAnchor } from "./logic/EP23BiasAnchor";
import { EP24UpwardGrey } from "./logic/EP24UpwardGrey";
import { EP25Bayes } from "./logic/EP25Bayes";
import { EP26Simpson } from "./logic/EP26Simpson";
import { EP27ExpectedValue } from "./logic/EP27ExpectedValue";
import { EP28BaseRate } from "./logic/EP28BaseRate";
import { EP29PromptLogic } from "./logic/EP29PromptLogic";
import { EP30HallucinationCheck } from "./logic/EP30HallucinationCheck";
import { EP31RedBlueTeam } from "./logic/EP31RedBlueTeam";
import { EP32CapstoneWorkflow } from "./logic/EP32CapstoneWorkflow";
import { EP33Loops } from "./logic/EP33Loops";
import { EP34DelayTrap } from "./logic/EP34DelayTrap";
import { EP35ShiftingBurden } from "./logic/EP35ShiftingBurden";
import { EP36GoodhartKpi } from "./logic/EP36GoodhartKpi";
import { EP37UnitEconomics } from "./logic/EP37UnitEconomics";
import { EP38CashFlow } from "./logic/EP38CashFlow";
import { EP39MoatShields } from "./logic/EP39MoatShields";
import { EP40PricingPower } from "./logic/EP40PricingPower";
import { EP41PrincipalAgent } from "./logic/EP41PrincipalAgent";
import { EP42LemonMarket } from "./logic/EP42LemonMarket";
import { EP43ConwayBoundary } from "./logic/EP43ConwayBoundary";
import { EP44TwoWayDoor } from "./logic/EP44TwoWayDoor";
import { EP45LeverageCurve } from "./logic/EP45LeverageCurve";
import { EP46BarbellStrategy } from "./logic/EP46BarbellStrategy";
import { EP47CircleCompetence } from "./logic/EP47CircleCompetence";
import { EP48StrategyCompass } from "./logic/EP48StrategyCompass";
import { EP49SurvivorBias } from "./logic/EP49SurvivorBias";
import { EP50Counterfactual } from "./logic/EP50Counterfactual";
import { EP51ABTestingTraps } from "./logic/EP51ABTestingTraps";
import { EP52OccamFalsify } from "./logic/EP52OccamFalsify";
import { EP53Abilene } from "./logic/EP53Abilene";
import { EP54CrisisResponse } from "./logic/EP54CrisisResponse";
import { EP55BlamelessPostmortem } from "./logic/EP55BlamelessPostmortem";
import { EP56Steelman } from "./logic/EP56Steelman";
import { EP57SCurve } from "./logic/EP57SCurve";
import { EP58CriticalMass } from "./logic/EP58CriticalMass";
import { EP59SignalNoise } from "./logic/EP59SignalNoise";
import { EP60JevonsShift } from "./logic/EP60JevonsShift";
import { EP61DeterministicRail } from "./logic/EP61DeterministicRail";
import { EP62MultiAgent } from "./logic/EP62MultiAgent";
import { EP63RAGHygiene } from "./logic/EP63RAGHygiene";
import { EP64HumanInLoop } from "./logic/EP64HumanInLoop";
import { AgentFlowDiagram } from "./logic/components/AgentFlowDiagram";
import { AILogicDiagram } from "./logic/components/AILogicDiagram";
import { ChapterBadge } from "./logic/components/ChapterBadge";
import { ChatBubble } from "./logic/components/ChatBubble";
import { CrisisDiagram } from "./logic/components/CrisisDiagram";
import { DecisionDiagram } from "./logic/components/DecisionDiagram";
import { EconomicsDiagram } from "./logic/components/EconomicsDiagram";
import { EulerDiagram } from "./logic/components/EulerDiagram";
import { ExperimentDiagram } from "./logic/components/ExperimentDiagram";
import { FallacyDiagram } from "./logic/components/FallacyDiagram";
import { LogicBlock } from "./logic/components/LogicBlock";
import { NegotiationDiagram } from "./logic/components/NegotiationDiagram";
import { OrgMechanismDiagram } from "./logic/components/OrgMechanismDiagram";
import { PracticeDiagram } from "./logic/components/PracticeDiagram";
import { ProbabilityDiagram } from "./logic/components/ProbabilityDiagram";
import { ReasoningDiagram } from "./logic/components/ReasoningDiagram";
import { StrategyLeverageDiagram } from "./logic/components/StrategyLeverageDiagram";
import { SystemLoopDiagram } from "./logic/components/SystemLoopDiagram";
import { TrendModelDiagram } from "./logic/components/TrendModelDiagram";
import { SceneAgentFlow } from "./logic/scenes/SceneAgentFlow";
import { SceneCompare } from "./logic/scenes/SceneCompare";
import { SceneAILogic } from "./logic/scenes/SceneAILogic";
import { SceneCrisis } from "./logic/scenes/SceneCrisis";
import { SceneDecision } from "./logic/scenes/SceneDecision";
import { SceneDeconstruct } from "./logic/scenes/SceneDeconstruct";
import { SceneEconomics } from "./logic/scenes/SceneEconomics";
import { SceneEuler } from "./logic/scenes/SceneEuler";
import { SceneExperiment } from "./logic/scenes/SceneExperiment";
import { SceneFallacy } from "./logic/scenes/SceneFallacy";
import { SceneHook } from "./logic/scenes/SceneHook";
import { SceneNegotiation } from "./logic/scenes/SceneNegotiation";
import { SceneOrgMechanism } from "./logic/scenes/SceneOrgMechanism";
import { ScenePractice } from "./logic/scenes/ScenePractice";
import { SceneProbability } from "./logic/scenes/SceneProbability";
import { SceneQuiz } from "./logic/scenes/SceneQuiz";
import { SceneReasoning } from "./logic/scenes/SceneReasoning";
import { SceneStrategy } from "./logic/scenes/SceneStrategy";
import { SceneSystemLoop } from "./logic/scenes/SceneSystemLoop";
import { SceneTrendModel } from "./logic/scenes/SceneTrendModel";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Module-1-Courses">
        <Composition
          id="EP01-Argument"
          component={EP01Argument}
          durationInFrames={1590}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP02-Identity"
          component={EP02Identity}
          durationInFrames={1590}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP03-Conditions"
          component={EP03Conditions}
          durationInFrames={2010}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP04-Boolean"
          component={EP04Boolean}
          durationInFrames={2280}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-2-Courses">
        <Composition
          id="EP05-Strawman"
          component={EP05FallacyStrawman}
          durationInFrames={1860}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP06-Authority"
          component={EP06AuthorityCircle}
          durationInFrames={1890}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP07-Correlation"
          component={EP07CorrelationBias}
          durationInFrames={1890}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP08-Spectrum"
          component={EP08FalseDilemma}
          durationInFrames={1860}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-3-Courses">
        <Composition
          id="EP09-MECE"
          component={EP09Mece}
          durationInFrames={1860}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP10-ValidSound"
          component={EP10ValidSound}
          durationInFrames={1920}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP11-ThreeInferences"
          component={EP11ThreeInferences}
          durationInFrames={2250}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP12-Reductio"
          component={EP12Reductio}
          durationInFrames={2130}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-4-Courses">
        <Composition
          id="EP13-Toulmin"
          component={EP13Toulmin}
          durationInFrames={2010}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP14-Pyramid"
          component={EP14Pyramid}
          durationInFrames={1980}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP15-StarCausal"
          component={EP15StarCausal}
          durationInFrames={2040}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP16-Warroom"
          component={EP16Warroom}
          durationInFrames={2250}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-5-Season2">
        <Composition
          id="EP17-FirstPrinciples"
          component={EP17FirstPrinciples}
          durationInFrames={2100}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP18-IssueTree"
          component={EP18IssueTree}
          durationInFrames={2070}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP19-SunkCost"
          component={EP19SunkCost}
          durationInFrames={2100}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP20-SecondOrder"
          component={EP20SecondOrder}
          durationInFrames={2070}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-6-Season2">
        <Composition
          id="EP21-FourLayers"
          component={EP21FourLayers}
          durationInFrames={2220}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP22-PayoffMatrix"
          component={EP22PayoffMatrix}
          durationInFrames={2190}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP23-BiasAnchor"
          component={EP23BiasAnchor}
          durationInFrames={2280}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP24-UpwardGrey"
          component={EP24UpwardGrey}
          durationInFrames={2220}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-7-Season2">
        <Composition
          id="EP25-Bayes"
          component={EP25Bayes}
          durationInFrames={2460}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP26-Simpson"
          component={EP26Simpson}
          durationInFrames={2400}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP27-ExpectedValue"
          component={EP27ExpectedValue}
          durationInFrames={2490}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP28-BaseRate"
          component={EP28BaseRate}
          durationInFrames={2640}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-8-Season2">
        <Composition
          id="EP29-PromptLogic"
          component={EP29PromptLogic}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP30-HallucinationCheck"
          component={EP30HallucinationCheck}
          durationInFrames={2640}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP31-RedBlueTeam"
          component={EP31RedBlueTeam}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP32-CapstoneWorkflow"
          component={EP32CapstoneWorkflow}
          durationInFrames={2880}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-9-Season3">
        <Composition
          id="EP33-Loops"
          component={EP33Loops}
          durationInFrames={2370}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP34-DelayTrap"
          component={EP34DelayTrap}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP35-ShiftingBurden"
          component={EP35ShiftingBurden}
          durationInFrames={2370}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP36-GoodhartKPI"
          component={EP36GoodhartKpi}
          durationInFrames={2460}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-10-Season3">
        <Composition
          id="EP37-UnitEconomics"
          component={EP37UnitEconomics}
          durationInFrames={2520}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP38-CashFlow"
          component={EP38CashFlow}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP39-MoatShields"
          component={EP39MoatShields}
          durationInFrames={2580}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP40-PricingPower"
          component={EP40PricingPower}
          durationInFrames={2850}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-11-Season3">
        <Composition
          id="EP41-PrincipalAgent"
          component={EP41PrincipalAgent}
          durationInFrames={2430}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP42-LemonMarket"
          component={EP42LemonMarket}
          durationInFrames={2580}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP43-ConwayBoundary"
          component={EP43ConwayBoundary}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP44-TwoWayDoor"
          component={EP44TwoWayDoor}
          durationInFrames={2790}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-12-Season3">
        <Composition
          id="EP45-LeverageCurve"
          component={EP45LeverageCurve}
          durationInFrames={2670}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP46-BarbellStrategy"
          component={EP46BarbellStrategy}
          durationInFrames={2760}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP47-CircleCompetence"
          component={EP47CircleCompetence}
          durationInFrames={2700}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP48-StrategyCompass"
          component={EP48StrategyCompass}
          durationInFrames={2910}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-13-Season4">
        <Composition
          id="EP49-SurvivorBias"
          component={EP49SurvivorBias}
          durationInFrames={2370}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP50-Counterfactual"
          component={EP50Counterfactual}
          durationInFrames={2520}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP51-ABTestingTraps"
          component={EP51ABTestingTraps}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP52-OccamFalsify"
          component={EP52OccamFalsify}
          durationInFrames={2580}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-14-Season4">
        <Composition
          id="EP53-Abilene"
          component={EP53Abilene}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP54-CrisisResponse"
          component={EP54CrisisResponse}
          durationInFrames={2730}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP55-BlamelessPostmortem"
          component={EP55BlamelessPostmortem}
          durationInFrames={2820}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP56-Steelman"
          component={EP56Steelman}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-15-Season4">
        <Composition
          id="EP57-SCurve"
          component={EP57SCurve}
          durationInFrames={2580}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP58-CriticalMass"
          component={EP58CriticalMass}
          durationInFrames={2730}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP59-SignalNoise"
          component={EP59SignalNoise}
          durationInFrames={2610}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP60-JevonsShift"
          component={EP60JevonsShift}
          durationInFrames={2520}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="Module-16-Season4">
        <Composition
          id="EP61-DeterministicRail"
          component={EP61DeterministicRail}
          durationInFrames={2760}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP62-MultiAgent"
          component={EP62MultiAgent}
          durationInFrames={2670}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP63-RAGHygiene"
          component={EP63RAGHygiene}
          durationInFrames={2850}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="EP64-HumanInLoop"
          component={EP64HumanInLoop}
          durationInFrames={2880}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      <Folder name="EP01-Scenes">
        <Composition
          id="SceneHook"
          component={SceneHook}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            headline: "为什么写了 500 字汇报，老板还是问“结论呢”？",
            colleagueMessage:
              "最近大家反馈新版本很卡，我昨晚自己用也闪退了两次，而且竞品昨天刚上了新功能。所以我们这周必须暂停开发新需求，全员修 Bug！",
            bossReply:
              "等等…竞品上新功能和咱们修 Bug 有啥关系？到底多卡？要停几天？",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneDeconstruct"
          component={SceneDeconstruct}
          durationInFrames={480}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            title: "一个合格的论证 = 有效前提 + 合理桥梁 ➔ 明确结论",
            premiseText:
              "“昨晚闪退 2 次” + “用户反馈卡顿” → 需要补充具体崩溃率与受影响人数。",
            noiseText:
              "“竞品昨天上了新功能” → 竞品上新不能推导出“我们要修 Bug”，属于干扰项。",
            hiddenPremiseText:
              "如果不立刻修 Bug，用户流失损失 > 延期新需求的收益",
            conclusionText:
              "建议本周抽出 2 名研发用 2 天集中修 P0 闪退，新需求顺延至下周三。",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneCompare"
          component={SceneCompare}
          durationInFrames={390}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            title: "同样一件事，换个结构说，通过率直接翻倍",
            badExample:
              "“最近大家反馈新版本很卡，我昨晚也闪退两次，而且竞品昨天刚上新功能。所以我们这周必须暂停开发，全员修 Bug！”",
            goodExample:
              "“【结论】建议抽 2 位开发用 2 天集中修 P0 闪退。【事实】昨日崩溃率从 0.3% 升至 3.2%，已影响 18% 新用户留存。修完后可保住本周转化目标。”",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneQuiz"
          component={SceneQuiz}
          durationInFrames={420}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            question:
              "“这个设计稿配色很高级，大厂都在用，所以我建议今天直接定稿上线！”",
            answer:
              "答案：只有“主观感受（高级）+ 诉诸他人（大厂）”，缺少能支撑“上线效果更好”的客观前提（如点击率测试数据、目标用户匹配度）。",
            mantra: "本集口诀：结论先行，事实撑腰；情绪和无关项，统统丢掉！",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneEuler"
          component={SceneEuler}
          durationInFrames={420}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP02",
            sectionTitle: "02 · 同一律图解",
            accentColor: "#38B764",
            title: "同一律：同一个词，在同一次对话里只能指同一个意思",
            mode: "disjoint",
            outerLabel: "产品说的“优化”：改视觉转化",
            innerLabel: "开发说的“优化”：降接口耗时",
            outerColor: "#41A6F6",
            innerColor: "#38B764",
            relationCaption: "两个不相交的圈，硬用一个词去套，必然鸡同鸭讲",
            noteText: "先给模糊词下定义，再讨论怎么做",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneFallacy"
          component={SceneFallacy}
          durationInFrames={510}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP05",
            sectionTitle: "02 · 谬误透视镜",
            accentColor: "#F77622",
            title: "稻草人 + 滑坡谬误：先歪曲你的话，再用极端后果吓唬你",
            mode: "strawman-slippery",
            leftTitle: "原话：一期先暂缓低频弹窗",
            leftDetail: "假靶子：你根本不管用户转化！",
            rightTitle: "砍一个低频弹窗",
            rightDetail: "项目肯定黄了！",
            summaryCaption: "核心破局：扶正原话靶子，切断无依据滑坡",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneReasoning"
          component={SceneReasoning}
          durationInFrames={510}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP09",
            sectionTitle: "02 · MECE 原则图解",
            accentColor: "#38B764",
            title: "MECE 原则：相互独立（不重） + 完全穷尽（不漏）",
            mode: "mece-tree",
            item1Title: "一次只用一把尺",
            item1Body: "同一层级只能用同一个维度划分，避免交叉",
            item2Title: "所有块加起来 = 100%",
            item2Body: "加上“其他”兜底项，保证完全覆盖全集",
            item3Title: "",
            item3Body: "",
            summaryCaption: "好分类就像切蛋糕：每一刀下去，既不重叠也不掉渣",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="ScenePractice"
          component={ScenePractice}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP13",
            sectionTitle: "02 · 图尔敏论证模型",
            accentColor: "#FFCD75",
            title: "让老板很难拒绝的四宫格：主张 + 数据 + 依据 + 堵反驳",
            mode: "toulmin",
            slot1Title: "① 核心主张（Claim）",
            slot1Body: "申请下月增补 1 名中级测试工程师。",
            slot2Title: "② 客观数据（Data）",
            slot2Body: "上季度漏测导致线上直接损失 18 万元。",
            slot3Title: "③ 正当依据（Warrant）",
            slot3Body: "补人后回归提速 40%，预计 3 个月回本。",
            slot4Title: "④ 反驳预判（Rebuttal）",
            slot4Body: "已用自动化覆盖 60% 用例，专攻高危支付链路。",
            summaryCaption: "把“伸手要成本”变成“帮老板减损赚钱的投资案”",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneDecision"
          component={SceneDecision}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP17",
            sectionTitle: "02 · 第一性原理 vs 类比",
            accentColor: "#38B764",
            title: "第一性原理：剥掉行业惯例，回到最底层事实重建方案",
            mode: "first-principles",
            block1Title: "照搬 12 个专业图表",
            block1Body: "只看“大厂做了啥”（类比表象），忽略小店老板根本没时间学复杂报表。",
            block2Title: "回到“10 秒算清今天赚没赚”",
            block2Body: "一张极简“今日收支卡片”就够了！研发成本降 90%，留存翻 3 倍。",
            block3Title: "",
            block3Body: "",
            summaryCaption: "类比思维让你跟在别人后面跑；第一性原理让你找到捷径",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneNegotiation"
          component={SceneNegotiation}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP21",
            sectionTitle: "02 · 四层剥离法",
            accentColor: "#38B764",
            title: "把死命令往下剥四层：看清对方真正想要的安全感",
            mode: "four-layers",
            item1Title: "① 表层立场",
            item1Body: "“绝不同意这周五全量上线！”（在此层硬杠永远无解）",
            item2Title: "② 主观观点",
            item2Body: "“我觉得这版太赶、风险太不可控！”",
            item3Title: "③ 触发事实",
            item3Body: "上个月抢上线导致线上崩了 2 小时，测试团队被通报批评",
            item4Title: "④ 底层真需求",
            item4Body: "怕再出事故背绩效锅，需要可控的兜底证明！",
            summaryCaption: "满足对方的底层真需求，表层的死立场自然就松动了",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneProbability"
          component={SceneProbability}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP25",
            sectionTitle: "02 · 贝叶斯更新",
            accentColor: "#73EFF7",
            title: "把判断写成 0%~100% 滑块：按新证据权重动态调刻度",
            mode: "bayes-update",
            item1Title: "① 先设先验基准（Prior）",
            item1Body: "不急着上头：假设新方向常规成功率先按 40% 打底",
            item2Title: "② 检验新证据权重",
            item2Body: "竞品砍业务是没市场还是他们缺钱？先核查真实原因",
            item3Title: "③ 动态微调滑块",
            item3Body: "查实对方资金链断裂：把握仅微调降到 35%，而非直接清零",
            item4Title: "④ 小步验证再加权",
            item4Body: "用可控成本试跑两周，拿到真实转化数据把把握推高到 62%",
            summaryCaption:
              "高手每次只押注与当前把握度匹配的成本，保留随时修正的空间",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneAILogic"
          component={SceneAILogic}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP29",
            sectionTitle: "02 · 形式逻辑 Prompt",
            accentColor: "#38B764",
            title: "用形式逻辑写 Prompt：锁前提 + 且/或/非边界 + 验收标准",
            mode: "prompt-logic",
            item1Title: "① 锁定前提与角色",
            item1Body:
              "定死视角、受众与硬约束：如“客单 99 元零食、预算 3 万、面向下沉老客”。",
            item2Title: "② 布尔边界（且/或/非）",
            item2Body:
              "AND 含排期与测算；OR 路径二选一；NOT 严禁“赋能/闭环”等虚词空话。",
            item3Title: "③ 客观验收尺子",
            item3Body:
              "规定条数、每条不超 30 字、必须带可验证指标，不达标直接重写。",
            item4Title: "实战公式",
            item4Body:
              "【前提】谁/给谁/硬约束 + 【且/或/非】必须做与严禁做 + 【验收】格式与数字门槛",
            summaryCaption: "AI 不是许愿池，你把逻辑轨道铺好，它才会高速狂奔",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneSystemLoop"
          component={SceneSystemLoop}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP33",
            sectionTitle: "02 · 增强回路 vs 调节回路",
            accentColor: "#38B764",
            title: "系统里永远藏着两套环：加速雪球（R）与上限刹车（B）",
            mode: "reinforcing-balancing",
            item1Title: "好口碑带新客，雪球越滚越大",
            item1Body:
              "投放拉新 ➔ 好口碑发酵 ➔ 带来更多自然推荐（正反馈飞轮越转越快）",
            item2Title: "初期顺风顺水",
            item2Body: "每投 1 块钱都能撬动复利增长",
            item3Title: "过载触发隐形天花板",
            item3Body:
              "规模一扩大 ➔ 客服排队、引导断层、体验下降 ➔ 老客流失抵消新增",
            item4Title: "先解开交付与体验瓶颈",
            item4Body: "拆掉手刹再推飞轮，增长曲线立刻重回上升",
            summaryCaption: "一边拉手刹一边猛踩油门，只会白白烧空预算",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneExperiment"
          component={SceneExperiment}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP49",
            sectionTitle: "02 · 幸存者偏差",
            accentColor: "#E43B44",
            title: "补齐沉默分母：别把“活着的巧合”当成必胜密码",
            mode: "survivor-bias",
            item1Title: "只看存活的 3 家爆款",
            item1Body:
              "看见全都在用“开屏大红弹窗”，直接当成 100% 流量密码照抄。",
            item2Title: "拉齐 100 家完整分母",
            item2Body:
              "把同期也用红弹窗的失败者拉进来：3 家存活，97 家照样亏到关门！",
            item3Title: "真差异过滤",
            item3Body:
              "别找成功者“都有”的动作，要找“成功组有、失败组没有”的核心门槛！",
            item4Title: "",
            item4Body: "",
            summaryCaption: "补齐漏斗里的沉默失败样本，才能算出真正的胜率",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneCrisis"
          component={SceneCrisis}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP53",
            sectionTitle: "02 · 群体迷思破冰",
            accentColor: "#E43B44",
            title: "打破阿比林悖论：先匿名写雷区，再指定合法反方",
            mode: "abilene-groupthink",
            item1Title: "怕当异类",
            item1Body: "主管一开口定调，大家把顾虑咽回肚子",
            item2Title: "误读沉默",
            item2Body: "把没人反对误以为全组都觉得很稳",
            item3Title: "匿名写雷区",
            item3Body: "讨论前先独立匿名打分与写出最大担忧",
            item4Title: "指定合法反方",
            item4Body: "轮流指派魔鬼代言人专门挑刺，瓦解虚假一致",
            summaryCaption: "莫把沉默当赞成，用规则保护真话",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneTrendModel"
          component={SceneTrendModel}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP57",
            sectionTitle: "02 · S 曲线拐点",
            accentColor: "#41A6F6",
            title: "为什么要在老业务还在赚钱时提前开第二曲线？",
            mode: "s-curve",
            item1Title: "第一曲线爬坡爆发",
            item1Body: "主业务进入增长期，现金流充沛",
            item2Title: "A 点斜率放缓拐点",
            item2Body: "获客成本翻倍，正是启动第二曲线的黄金窗口",
            item3Title: "第二曲线无缝接力",
            item3Body: "趁老业务还在赚钱时孵化新业务，避免断粮",
            item4Title: "",
            item4Body: "",
            summaryCaption: "莫等老曲线掉头才转身，在 A 点拐点提前架起第二曲线",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneAgentFlow"
          component={SceneAgentFlow}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP61",
            sectionTitle: "02 · 铁轨 vs 大脑",
            accentColor: "#38B764",
            title: "确定性铁轨锁算账，概率性大脑做理解",
            mode: "deterministic-probabilistic",
            item1Title: "写死算账与校验",
            item1Body: "金额计算、时间比对、格式与权限拦截必须走确定性代码",
            item2Title: "释放语义与归纳",
            item2Body: "长文摘要、需求拆解、文案起草交由大模型发挥弹性",
            item3Title: "混合铁律",
            item3Body: "代码铺好铁轨和刹车，大模型只在车厢里提供智能",
            item4Title: "",
            item4Body: "",
            summaryCaption: "铁轨锁死边界与算账，大模型只负责语义理解与创造",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneEconomics"
          component={SceneEconomics}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP37",
            sectionTitle: "02 · 单位经济模型 UE",
            accentColor: "#FFCD75",
            title: "把一单切成“可变”与“固定”：单均倒挂时做大只会加速亏",
            mode: "unit-economics",
            item1Title: "卖 30 元，可变成本花 36 元",
            item1Body:
              "进货 22 + 冷链配送与补贴 14 = 36 > 30 元，每加一单净亏 6 元",
            item2Title: "10 万单亏穿 60 万",
            item2Body: "可变成本不会因放量消失",
            item3Title: "单价 − 可变成本 > 0（正毛利）",
            item3Body:
              "先把单单毛利调到正数（如 +10 元），每多卖一单都在往回赚固定成本",
            item4Title: "放量才真能摊薄",
            item4Body: "冲过平衡点后研发房租被彻底摊薄",
            summaryCaption:
              "先让最小一单赚正毛利，再谈用规模摊薄固定研发与房租",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneOrgMechanism"
          component={SceneOrgMechanism}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP41",
            sectionTitle: "02 · 激励相容设计",
            accentColor: "#38B764",
            title: "告别“猫鼠盯梢”：用激励相容把分钱与目标绑在一起",
            mode: "principal-agent",
            item1Title: "按天/按人头发死钱，目标打架",
            item1Body:
              "拖得越久、塞人越多反而赚越多，省成本干得快反而少拿钱",
            item2Title: "监工成本比工钱高",
            item2Body: "全靠喊觉悟和派人盯梢根本管不住",
            item3Title: "总包一口价 ＋ 省本提前分红",
            item3Body:
              "把“按时间拿钱”改成“按结果、省下预算分奖金”，对方为自己赚大头就会拼命快干",
            item4Title: "顺着人性自驱推进",
            item4Body: "不用催进度，对方自己优化效率",
            summaryCaption:
              "好机制让对方为自己赚钱的同时，刚好把你的事办漂亮",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
        <Composition
          id="SceneStrategy"
          component={SceneStrategy}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP45",
            sectionTitle: "02 · 个人可复制杠杆",
            accentColor: "#A7F070",
            title: "同样一天 24 小时，靠三类零成本复制杠杆拉出百倍差距",
            mode: "leverage-curve",
            item1Title: "纯卖体力与小时数",
            item1Body:
              "手停产出归零，只能一对一应付眼前杂活，每天硬上限死卡在 24 小时",
            item2Title: "十年难翻倍",
            item2Body: "越努力反而被绑得越紧",
            item3Title: "代码自动化 ＋ SOP 流程 ＋ 模板产品",
            item3Body:
              "做好一次就能零成本复制给 10 个人、1 万个客户使用，睡后持续创造回报",
            item4Title: "同活做三遍必工具化",
            item4Body: "顺手留下可复用复利资产",
            summaryCaption:
              "每次解决完重复痛点，顺手留下一件零复制成本的杠杆工具",
            style: { backgroundColor: "#1A1C2C" },
          }}
        />
      </Folder>

      <Folder name="Logic-Elements">
        <Composition
          id="ChapterBadge"
          component={ChapterBadge}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            episodeLabel: "EP01",
            sectionTitle: "01 · 痛点开场",
            accentColor: "#FFCD75",
          }}
        />
        <Composition
          id="ChatBubble"
          component={ChatBubble}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sender: "同事小李",
            role: "产品经理",
            message:
              "最近大家反馈新版本很卡，所以我们这周必须暂停开发，全员修 Bug！",
            align: "left",
            avatarColor: "#41A6F6",
            bubbleColor: "#262B44",
            textColor: "#F4F4F4",
          }}
        />
        <Composition
          id="LogicBlock"
          component={LogicBlock}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            badge: "前提（事实）",
            title: "客观数据支撑",
            body: "本周线上崩溃率上升至 3.2%，客服收到 48 起卡顿工单。",
            accentColor: "#41A6F6",
            strikethrough: false,
          }}
        />
        <Composition
          id="EulerDiagram"
          component={EulerDiagram}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "subset",
            outerLabel: "大圈：能拿到结果（必要）",
            innerLabel: "小圈：满足条件（充分）",
            outerColor: "#41A6F6",
            innerColor: "#38B764",
            relationCaption: "小圈在里面：只要进小圈，一定在大圈里（充分条件）",
            style: {
              position: "absolute",
              left: 444,
              top: 290,
            },
          }}
        />
        <Composition
          id="FallacyDiagram"
          component={FallacyDiagram}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "strawman-slippery",
            leftTitle: "原话：一期先暂缓低频弹窗",
            leftDetail: "假靶子：你根本不管用户转化！",
            rightTitle: "砍一个低频弹窗",
            rightDetail: "项目肯定黄了！",
            summaryCaption: "核心破局：扶正原话靶子，切断无依据滑坡",
            style: {
              position: "absolute",
              left: 280,
              top: 240,
            },
          }}
        />
        <Composition
          id="ReasoningDiagram"
          component={ReasoningDiagram}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "mece-tree",
            item1Title: "一次只用一把尺",
            item1Body: "同一层级只能用同一个维度划分，避免交叉",
            item2Title: "所有块加起来 = 100%",
            item2Body: "加上“其他”兜底项，保证完全覆盖全集",
            item3Title: "",
            item3Body: "",
            summaryCaption: "好分类就像切蛋糕：每一刀下去，既不重叠也不掉渣",
            style: {
              position: "absolute",
              left: 270,
              top: 260,
            },
          }}
        />
        <Composition
          id="PracticeDiagram"
          component={PracticeDiagram}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "toulmin",
            slot1Title: "① 核心主张（Claim）",
            slot1Body: "申请下月增补 1 名中级测试工程师。",
            slot2Title: "② 客观数据（Data）",
            slot2Body: "上季度漏测导致线上直接损失 18 万元。",
            slot3Title: "③ 正当依据（Warrant）",
            slot3Body: "补人后回归提速 40%，预计 3 个月回本。",
            slot4Title: "④ 反驳预判（Rebuttal）",
            slot4Body: "已用自动化覆盖 60% 用例，专攻高危支付链路。",
            summaryCaption: "把“伸手要成本”变成“帮老板减损赚钱的投资案”",
            style: {
              position: "absolute",
              left: 270,
              top: 220,
            },
          }}
        />
        <Composition
          id="DecisionDiagram"
          component={DecisionDiagram}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "first-principles",
            block1Title: "照搬 12 个专业图表",
            block1Body: "只看“大厂做了啥”，忽略小店老板根本没时间学复杂报表。",
            block2Title: "回到“10 秒算清今天赚没赚”",
            block2Body: "一张极简“今日收支卡片”就够了！研发成本降 90%。",
            block3Title: "",
            block3Body: "",
            summaryCaption: "类比思维让你跟在别人后面跑；第一性原理让你找到捷径",
            style: {
              position: "absolute",
              left: 270,
              top: 240,
            },
          }}
        />
        <Composition
          id="NegotiationDiagram"
          component={NegotiationDiagram}
          durationInFrames={180}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "four-layers",
            item1Title: "① 表层立场",
            item1Body: "“绝不同意这周五全量上线！”（在此层硬杠永远无解）",
            item2Title: "② 主观观点",
            item2Body: "“我觉得这版太赶、风险太不可控！”",
            item3Title: "③ 触发事实",
            item3Body: "上个月抢上线崩了 2 小时，测试被通报",
            item4Title: "④ 底层真需求",
            item4Body: "怕再出事故背绩效锅，需要安全兜底！",
            summaryCaption: "满足对方的底层真需求，表层的死立场自然就松动了",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="ProbabilityDiagram"
          component={ProbabilityDiagram}
          durationInFrames={210}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "bayes-update",
            item1Title: "① 先设先验基准（Prior）",
            item1Body: "不急着上头：假设新方向常规成功率先按 40% 打底",
            item2Title: "② 检验新证据权重",
            item2Body: "竞品砍业务是没市场还是他们缺钱？先核查真实原因",
            item3Title: "③ 动态微调滑块",
            item3Body: "查实对方资金链断裂：把握仅微调降到 35%，而非直接清零",
            item4Title: "④ 小步验证再加权",
            item4Body: "用可控成本试跑两周，拿到真实转化数据把把握推高到 62%",
            summaryCaption:
              "高手每次只押注与当前把握度匹配的成本，保留随时修正的空间",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="AILogicDiagram"
          component={AILogicDiagram}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "prompt-logic",
            item1Title: "① 锁定前提与角色",
            item1Body:
              "定死视角、受众与硬约束：如“客单 99 元零食、预算 3 万、面向下沉老客”。",
            item2Title: "② 布尔边界（且/或/非）",
            item2Body:
              "AND 含排期与测算；OR 路径二选一；NOT 严禁“赋能/闭环”等虚词空话。",
            item3Title: "③ 客观验收尺子",
            item3Body:
              "规定条数、每条不超 30 字、必须带可验证指标，不达标直接重写。",
            item4Title: "实战公式",
            item4Body:
              "【前提】谁/给谁/硬约束 + 【且/或/非】必须做与严禁做 + 【验收】格式与数字门槛",
            summaryCaption: "AI 不是许愿池，你把逻辑轨道铺好，它才会高速狂奔",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="SystemLoopDiagram"
          component={SystemLoopDiagram}
          durationInFrames={210}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "reinforcing-balancing",
            item1Title: "好口碑带新客，雪球越滚越大",
            item1Body:
              "投放拉新 ➔ 好口碑发酵 ➔ 带来更多自然推荐（正反馈飞轮越转越快）",
            item2Title: "初期顺风顺水",
            item2Body: "每投 1 块钱都能撬动复利增长",
            item3Title: "过载触发隐形天花板",
            item3Body:
              "规模一扩大 ➔ 客服排队、引导断层、体验下降 ➔ 老客流失抵消新增",
            item4Title: "先解开交付与体验瓶颈",
            item4Body: "拆掉手刹再推飞轮，增长曲线立刻重回上升",
            summaryCaption: "一边拉手刹一边猛踩油门，只会白白烧空预算",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="ExperimentDiagram"
          component={ExperimentDiagram}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "survivor-bias",
            item1Title: "只看存活的 3 家爆款",
            item1Body:
              "看见全都在用“开屏大红弹窗”，直接当成 100% 流量密码照抄。",
            item2Title: "拉齐 100 家完整分母",
            item2Body:
              "把同期也用红弹窗的失败者拉进来：3 家存活，97 家照样亏到关门！",
            item3Title: "真差异过滤",
            item3Body:
              "别找成功者“都有”的动作，要找“成功组有、失败组没有”的核心门槛！",
            item4Title: "",
            item4Body: "",
            summaryCaption: "补齐漏斗里的沉默失败样本，才能算出真正的胜率",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="CrisisDiagram"
          component={CrisisDiagram}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "abilene-groupthink",
            item1Title: "怕当异类",
            item1Body: "主管一开口定调，大家把顾虑咽回肚子",
            item2Title: "误读沉默",
            item2Body: "把没人反对误以为全组都觉得很稳",
            item3Title: "匿名写雷区",
            item3Body: "讨论前先独立匿名打分与写出最大担忧",
            item4Title: "指定合法反方",
            item4Body: "轮流指派魔鬼代言人专门挑刺，瓦解虚假一致",
            summaryCaption: "莫把沉默当赞成，用规则保护真话",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="TrendModelDiagram"
          component={TrendModelDiagram}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "s-curve",
            item1Title: "第一曲线爬坡爆发",
            item1Body: "主业务进入增长期，现金流充沛",
            item2Title: "A 点斜率放缓拐点",
            item2Body: "获客成本翻倍，正是启动第二曲线的黄金窗口",
            item3Title: "第二曲线无缝接力",
            item3Body: "趁老业务还在赚钱时孵化新业务，避免断粮",
            item4Title: "",
            item4Body: "",
            summaryCaption: "莫等老曲线掉头才转身，在 A 点拐点提前架起第二曲线",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="AgentFlowDiagram"
          component={AgentFlowDiagram}
          durationInFrames={270}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "deterministic-probabilistic",
            item1Title: "写死算账与校验",
            item1Body: "金额计算、时间比对、格式与权限拦截必须走确定性代码",
            item2Title: "释放语义与归纳",
            item2Body: "长文摘要、需求拆解、文案起草交由大模型发挥弹性",
            item3Title: "混合铁律",
            item3Body: "代码铺好铁轨和刹车，大模型只在车厢里提供智能",
            item4Title: "",
            item4Body: "",
            summaryCaption: "铁轨锁死边界与算账，大模型只负责语义理解与创造",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="EconomicsDiagram"
          component={EconomicsDiagram}
          durationInFrames={210}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "unit-economics",
            item1Title: "卖 30 元，可变成本花 36 元",
            item1Body:
              "进货 22 + 冷链配送与补贴 14 = 36 > 30 元，每加一单净亏 6 元",
            item2Title: "10 万单亏穿 60 万",
            item2Body: "可变成本不会因放量消失",
            item3Title: "单价 − 可变成本 > 0（正毛利）",
            item3Body:
              "先把单单毛利调到正数（如 +10 元），每多卖一单都在往回赚固定成本",
            item4Title: "放量才真能摊薄",
            item4Body: "冲过平衡点后研发房租被彻底摊薄",
            summaryCaption:
              "先让最小一单赚正毛利，再谈用规模摊薄固定研发与房租",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="OrgMechanismDiagram"
          component={OrgMechanismDiagram}
          durationInFrames={210}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "principal-agent",
            item1Title: "按天/按人头发死钱，目标打架",
            item1Body:
              "拖得越久、塞人越多反而赚越多，省成本干得快反而少拿钱",
            item2Title: "监工成本比工钱高",
            item2Body: "全靠喊觉悟和派人盯梢根本管不住",
            item3Title: "总包一口价 ＋ 省本提前分红",
            item3Body:
              "把“按时间拿钱”改成“按结果、省下预算分奖金”，对方为自己赚大头就会拼命快干",
            item4Title: "顺着人性自驱推进",
            item4Body: "不用催进度，对方自己优化效率",
            summaryCaption:
              "好机制让对方为自己赚钱的同时，刚好把你的事办漂亮",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
        <Composition
          id="StrategyLeverageDiagram"
          component={StrategyLeverageDiagram}
          durationInFrames={210}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            mode: "leverage-curve",
            item1Title: "纯卖体力与小时数",
            item1Body:
              "手停产出归零，只能一对一应付眼前杂活，每天硬上限死卡在 24 小时",
            item2Title: "十年难翻倍",
            item2Body: "越努力反而被绑得越紧",
            item3Title: "代码自动化 ＋ SOP 流程 ＋ 模板产品",
            item3Body:
              "做好一次就能零成本复制给 10 个人、1 万个客户使用，睡后持续创造回报",
            item4Title: "同活做三遍必工具化",
            item4Body: "顺手留下可复用复利资产",
            summaryCaption:
              "每次解决完重复痛点，顺手留下一件零复制成本的杠杆工具",
            style: {
              position: "absolute",
              left: 270,
              top: 210,
            },
          }}
        />
      </Folder>

      <Folder name="Starter-Templates">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
        <Composition
          id="HelloWorld"
          component={HelloWorld}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
    </>
  );
};
