import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  StageContainer,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage08_01: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 16, fps, config: SPRING_POP });
  const pulseCycle = (localFrame % 42) / 42;

  if (visual === 'parcel-illusion') {
    return (
      <StageContainer
        banner="业务层的美好幻想：每次 fwrite 都是一个独立快递盒"
        conceptPill="幻想模型：1 次 fwrite = 1 次 onMessage"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="客户端循环 10 次" subtitle="fwrite($c, 'hello')" accent="blue" width={400}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['[快递盒 1] hello', '[快递盒 2] hello', '[快递盒 3] hello ... ×10'].map((txt) => (
                <div
                  key={txt}
                  style={{
                    padding: '10px 16px',
                    border: `2.5px solid ${THEME.dark}`,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    fontFamily: THEME.fontMono,
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                >
                  {txt}
                </div>
              ))}
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={220} label="以为有纸箱边界" color={THEME.blue} progress={enter} pulse={pulseCycle} />

          <BoxCard title="幻想中的服务端" subtitle="期待触发 10 次" accent="green" width={460}>
            <CodeHint text="onMessage 第 1 次 -> 'hello'" highlight />
            <CodeHint text="onMessage 第 2 次 -> 'hello'" highlight />
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.mutedText }}>
              每条消息边界分明，互不干扰……吗？
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'sticky-crash') {
    return (
      <StageContainer
        banner="车祸现场 1（粘包）：10 句话被焊死成了一长坨！"
        conceptPill="TCP 粘包：10 次 fwrite → 服务端只触发 1 次 onMessage"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="客户端调用 10 次" subtitle="每次 5 字节" accent="blue" width={360}>
            <CodeHint text="for ($i=0; $i<10; $i++)" />
            <CodeHint text="  fwrite($c, 'hello');" highlight />
          </BoxCard>

          <AnimatedFlowArrow width={190} label="全部焊在一起" color={THEME.red} progress={enter} pulse={pulseCycle} />

          <BoxCard title="服务端只触发第 1 次！" subtitle="长度: 50 字节" accent="red" width={620} badge="粘成一坨！">
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 23,
                fontWeight: 800,
                color: THEME.red,
                backgroundColor: '#fff',
                padding: '16px 18px',
                borderRadius: 12,
                border: `3px solid ${THEME.red}`,
                wordBreak: 'break-all',
              }}
            >
              "hellohellohellohellohellohellohellohellohellohello"
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: THEME.dark }}>
              10 条独立指令粘成 1 坨，业务代码完全无法解析！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'half-crash') {
    return (
      <StageContainer
        banner="车祸现场 2（半包）：1 条 100KB JSON 被大卸十三块！"
        conceptPill="TCP 半包：1 次 fwrite → 服务端被切成 13 次残缺碎片"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <BoxCard title="客户端 1 次发送" subtitle="100,011 字节 JSON" accent="blue" width={360}>
            <CodeHint text="$json = json_encode(...);" />
            <CodeHint text="fwrite($c, $json);" highlight />
          </BoxCard>

          <AnimatedFlowArrow width={190} label="被砍成 13 段" color={THEME.red} progress={enter} pulse={pulseCycle} />

          <BoxCard title="服务端触发 13 次！" subtitle="每次仅 8192 字节" accent="red" width={620} badge="json_decode => null">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: THEME.fontMono, fontSize: 21, fontWeight: 700 }}>
              <div style={{ padding: '8px 14px', backgroundColor: '#fff', borderRadius: 8, border: `2px solid ${THEME.red}` }}>
                第 1 次: 8192B -&gt; &#123;"data":"XXXXXX... (缺右括号!)
              </div>
              <div style={{ padding: '8px 14px', backgroundColor: '#fff', borderRadius: 8, border: `2px solid ${THEME.red}` }}>
                第 2 次: 8192B -&gt; XXXXXXXXXXXXXX... (全军覆没!)
              </div>
              <div style={{ padding: '8px 14px', backgroundColor: '#fff', borderRadius: 8, border: `2px solid ${THEME.red}` }}>
                第 13 次: 1707B -&gt; ...XXXXX"&#125; (只有尾巴!)
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'water-pipe') {
    const flowShift = (localFrame * 6) % 120;
    return (
      <StageContainer
        banner="底层真相：TCP 不是快递盒，而是一根自来水管！"
        conceptPill="TCP 字节流 (Byte Stream)：水流之间没有任何分界线"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36, width: '100%' }}>
          <div
            style={{
              width: 1320,
              height: 170,
              backgroundColor: THEME.blueBg,
              border: `5px solid ${THEME.dark}`,
              borderRadius: 85,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 10px 0 rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                whiteSpace: 'nowrap',
                fontFamily: THEME.fontMono,
                fontSize: 34,
                fontWeight: 800,
                color: THEME.blue,
                transform: `translateX(${-flowShift}px)`,
                letterSpacing: 4,
              }}
            >
              h-e-l-l-o-h-e-l-l-o-h-e-l-l-o-&#123;"data":"XXXXXXX...&#125;-h-e-l-l-o-h-e-l-l-o-h-e-l-l-o
            </div>
          </div>

          <div style={{ display: 'flex', gap: 40 }}>
            <BoxCard title="水龙头（发送端 fwrite）" subtitle="只管往水管里灌水" accent="orange" width={540}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>
                不管你分 10 次灌还是一口气倒 100KB，进水管后全部融为一体！
              </div>
            </BoxCard>
            <BoxCard title="水盆（接收端 fread）" subtitle="只管拿勺子从管口舀水" accent="blue" width={540}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>
                一次舀多少取决于内核当时到了多少水，绝不知道“一句话”在哪结束！
              </div>
            </BoxCard>
          </div>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'why-sticky') {
    return (
      <StageContainer
        banner="粘包两大元凶：内核 Nagle 攒小包 + 服务端捞晚了"
        conceptPill="Nagle 算法：合并短时间微包，省掉 40 字节 TCP/IP 包头"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="如果每 5 字节单发" subtitle="极度浪费带宽" accent="default" width={400}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 23, fontWeight: 700 }}>
              40B 报头 + 5B 'hello'
            </div>
            <div style={{ fontSize: 22, color: THEME.red, fontWeight: 700 }}>
              有效载荷仅 11%！89% 全在发信封！
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={200} label="Nagle 合并优化" color={THEME.orange} progress={enter} pulse={pulseCycle} />

          <BoxCard title="内核自动攒成一瓢再发" subtitle="外加 fread 读取时机差" accent="orange" width={580} badge="50 字节一整坨">
            <div style={{ fontFamily: THEME.fontMono, fontSize: 23, fontWeight: 700, backgroundColor: '#fff', padding: '12px 16px', borderRadius: 10, border: `2px solid ${THEME.dark}` }}>
              40B 报头 + [hello×10 共 50B]
            </div>
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.dark }}>
              只要服务端读晚 1 毫秒，池子里早就攒好 10 句话了！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'why-half') {
    const pieces = [0, 1, 2, 3];
    return (
      <StageContainer
        banner="半包物理铁律：网线一次最多搬运 MSS = 1460 字节"
        conceptPill="MTU 1500 / MSS 1460：100KB 数据必须切成 70+ 碎片分批飞"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <BoxCard title="100KB 完整大包" subtitle="100,011 字节" accent="orange" width={360}>
            <div style={{ fontSize: 24, fontWeight: 800 }}>体积过大，网线一口吃不下！</div>
          </BoxCard>

          <AnimatedFlowArrow width={170} label="底层切片" color={THEME.dark} progress={enter} />

          <BoxCard title="以太网网线分片运输" subtitle="每片 <= 1460B (MSS)" accent="blue" width={660}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {pieces.map((p) => {
                const s = spring({ frame: localFrame - p * 8, fps, config: SPRING_POP });
                return (
                  <div
                    key={p}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 12,
                      border: `3px solid ${THEME.blue}`,
                      backgroundColor: '#fff',
                      fontFamily: THEME.fontMono,
                      fontSize: 21,
                      fontWeight: 800,
                      transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
                      opacity: s,
                    }}
                  >
                    片#{p + 1} (1460B)
                  </div>
                );
              })}
              <div style={{ padding: '12px 18px', fontFamily: THEME.fontMono, fontSize: 22, fontWeight: 800, color: THEME.mutedText }}>
                ... 共 70+ 片
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: THEME.dark }}>
              只要第 1 批碎片到了，fread 就会立刻返回，绝不会等你凑齐 100KB！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // need-buffer
  return (
    <StageContainer
      banner="破局起点：绝对不能读到一点碎片就调 onMessage！"
      conceptPill="引入接收蓄水池：$this->recvBuffer .= $data"
      conceptColor={THEME.green}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <BoxCard title="fread($socket, 65535)" subtitle="零散水流碎片" accent="blue" width={380}>
          <CodeHint text="$data = fread($socket, 65535);" />
          <div style={{ fontSize: 23, fontWeight: 700 }}>每次拿到的只是随机长度的水滴</div>
        </BoxCard>

        <AnimatedFlowArrow width={210} label="先统一倒入" color={THEME.green} progress={enter} pulse={pulseCycle} />

        <BoxCard title="TcpConnection 蓄水池" subtitle="$this->recvBuffer" accent="green" width={580} badge="凑齐再切包！">
          <CodeHint text="$this->recvBuffer .= $data;" highlight />
          <div style={{ fontSize: 24, fontWeight: 700, color: THEME.dark }}>
            半包先在池子里乖乖等齐，粘包则在池子里排好队，用协议规矩一刀一刀精准切！
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
