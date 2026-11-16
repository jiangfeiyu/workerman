import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  StageContainer,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage08_02: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 18, fps, config: SPRING_POP });
  const pulseCycle = (localFrame % 42) / 42;

  if (visual === 'two-buffers') {
    return (
      <StageContainer
        banner="TcpConnection 的左右护法：出口大水库 vs 入口大水库"
        conceptPill="双向蓄水池：$sendBuffer (写) + $recvBuffer (读)"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          <BoxCard title="第 7 章：$sendBuffer" subtitle="出口蓄水池" accent="orange" width={540} minHeight={290}>
            <CodeHint text="$this->sendBuffer .= substr($data, $len);" />
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              内核发送区 SO_SNDBUF 满了时，暂存没发完的尾巴，等可写事件异步排空
            </div>
          </BoxCard>

          <BoxCard title="第 8 章：$recvBuffer" subtitle="入口蓄水池" accent="blue" width={540} minHeight={290} badge="本集主角">
            <CodeHint text="$this->recvBuffer .= $data;" highlight />
            <div style={{ fontSize: 24, fontWeight: 700 }}>
              把网线飞来的半包/粘包碎片统一倒进池子拼接，再按协议规矩精准切包
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'delimiter-loop') {
    return (
      <StageContainer
        banner="最朴素的切包规矩：每句话末尾加一个换行符 \\n"
        conceptPill="while (strpos($recvBuffer, '\\n') !== false) 精准切包"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
          <BoxCard title="$recvBuffer 蓄水池切包循环" subtitle="遇半包等待，遇粘包连切" accent="blue" width={1180}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', fontFamily: THEME.fontMono, fontSize: 26, fontWeight: 800 }}>
              <div style={{ padding: '12px 22px', backgroundColor: THEME.greenBg, border: `3px solid ${THEME.green}`, borderRadius: 12 }}>
                hello<span style={{ color: THEME.red }}>\n</span>
              </div>
              <div style={{ padding: '12px 22px', backgroundColor: THEME.greenBg, border: `3px solid ${THEME.green}`, borderRadius: 12 }}>
                world<span style={{ color: THEME.red }}>\n</span>
              </div>
              <div style={{ padding: '12px 22px', backgroundColor: THEME.orangeBg, border: `3px dashed ${THEME.orange}`, borderRadius: 12 }}>
                &#123;"big": "半截JSON... (无\n，留在池里等!)
              </div>
            </div>
            <CodeHint text="while (($pos = strpos($this->recvBuffer, '\n')) !== false) { 切出一包 -> onMessage(); }" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'hardcode-pain') {
    return (
      <StageContainer
        banner="硬编码之痛：把 \\n 写死在 TcpConnection 里行不行？"
        conceptPill="违反开闭原则：换协议就要大改连接底层"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="写死的 baseRead()" subtitle="强耦合 strpos('\n')" accent="red" width={540} badge="换协议就报废">
            <CodeHint text="strpos($this->recvBuffer, '\n')" />
            <div style={{ fontSize: 24, fontWeight: 700, color: THEME.red }}>
              把文本定界符焊死在了底层网络引擎里！
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={180} label="新业务来了" color={THEME.dark} progress={enter} />

          <BoxCard title="新协议百花齐放" subtitle="全都要改底座？" accent="orange" width={520}>
            <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.7 }}>
              <div>1. HTTP 协议：按 \r\n\r\n + Content-Length 切</div>
              <div>2. 游戏二进制 RPC：按 4 字节包头长度切</div>
              <div>3. WebSocket：按二进制位掩码帧切</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'usb-slot') {
    return (
      <StageContainer
        banner="架构升华：把切包规矩抽成 USB 可插拔协议芯片！"
        conceptPill="ProtocolInterface：连接引擎只管水流，芯片决定边界"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
          <BoxCard title="TcpConnection 主板" subtitle="只负责非阻塞收发与缓冲区" accent="default" width={920}>
            <div style={{ fontSize: 25, fontWeight: 800, textAlign: 'center' }}>
              不关心业务数据长什么样，只通过标准 USB 接口向外部协议芯片连发三问！
            </div>
          </BoxCard>

          <div style={{ display: 'flex', gap: 28 }}>
            {[
              { name: 'Text 芯片', desc: '按 \\n 切包', accent: 'blue' as const },
              { name: 'JsonNL 芯片', desc: '\\n + json_decode', accent: 'green' as const },
              { name: 'Frame 芯片', desc: '4 字节包头长度', accent: 'orange' as const },
              { name: 'Http / WS 芯片', desc: '网页与全双工帧', accent: 'default' as const },
            ].map((chip, i) => {
              const s = spring({ frame: localFrame - i * 6, fps, config: SPRING_POP });
              return (
                <div key={chip.name} style={{ transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`, opacity: s }}>
                  <BoxCard title={chip.name} accent={chip.accent} width={280}>
                    <div style={{ fontSize: 22, fontWeight: 700, textAlign: 'center' }}>{chip.desc}</div>
                  </BoxCard>
                </div>
              );
            })}
          </div>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'method-input') {
    return (
      <StageContainer
        banner="第一问 input($buffer, $conn)：池里的水够一个包吗？"
        conceptPill="input() 返回值约定：0=半包继续等 | >0=完整包总字节数 | -1=踢掉"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <BoxCard title="TcpConnection" subtitle="传递 $recvBuffer" accent="default" width={380}>
            <CodeHint text="$len = $protocol::input($buf, $this);" highlight />
          </BoxCard>

          <AnimatedFlowArrow width={180} label="询问包长" color={THEME.blue} progress={enter} pulse={pulseCycle} />

          <BoxCard title="三种标准回答" subtitle="ProtocolInterface::input" accent="blue" width={680}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: THEME.fontMono, fontSize: 22, fontWeight: 800 }}>
              <div style={{ padding: '10px 16px', backgroundColor: THEME.orangeBg, border: `2.5px solid ${THEME.orange}`, borderRadius: 10 }}>
                返回 0   =&gt; 半包！还不够完整，继续等下一波数据
              </div>
              <div style={{ padding: '10px 16px', backgroundColor: THEME.greenBg, border: `2.5px solid ${THEME.green}`, borderRadius: 10 }}>
                返回 &gt; 0 =&gt; 够了！第 1 个完整包占 $len 字节，立刻切出！
              </div>
              <div style={{ padding: '10px 16px', backgroundColor: THEME.redBg, border: `2.5px solid ${THEME.red}`, borderRadius: 10 }}>
                返回 -1  =&gt; 非法或超长恶意报文，立刻 destroy() 断开！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'decode-encode') {
    return (
      <StageContainer
        banner="第二问 decode() 脱壳交付，第三问 encode() 穿壳发送"
        conceptPill="input 验包长 → decode 脱外壳 → encode 穿外壳"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <BoxCard title="收包：decode($rawPkg)" subtitle="脱外壳" accent="green" width={580}>
            <CodeHint text='原始切包: "{\"user\":\"张三\"}\n"' />
            <AnimatedFlowArrow width={260} label="json_decode + rtrim" color={THEME.green} progress={enter} pulse={pulseCycle} />
            <CodeHint text="业务收到: ['user' => '张三'] (原生 array!)" highlight />
          </BoxCard>

          <BoxCard title="发包：encode($data)" subtitle="穿外壳" accent="orange" width={580}>
            <CodeHint text="业务调用: $conn->send(['ok' => true])" />
            <AnimatedFlowArrow width={260} label="json_encode + '\n'" color={THEME.orange} progress={enter} pulse={pulseCycle} />
            <CodeHint text='实际发出: "{\"ok\":true}\n"' highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'newline-collision') {
    const cut = pop > 0.3;
    return (
      <StageContainer
        banner="定界符死穴：正文里自带 \\n，边界与内容撞车了！"
        conceptPill="撞车惨案：多行古诗或二进制图片被 \\n 拦腰斩断"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <BoxCard title="用户发送的一首古诗" subtitle="只想算 1 条消息" accent="blue" width={480}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 23, fontWeight: 700, backgroundColor: '#fff', padding: 16, borderRadius: 12, border: `2.5px solid ${THEME.dark}` }}>
              床前明月光<span style={{ color: THEME.red }}>\n</span>疑是地上霜<span style={{ color: THEME.red }}>\n</span>举头望明月<span style={{ color: THEME.red }}>\n</span>
            </div>
          </BoxCard>

          <AnimatedFlowArrow width={190} label="TextProtocol 误切" color={THEME.red} progress={enter} blocked={cut} />

          <BoxCard title="服务端惨遭拦腰斩断" subtitle="错误触发 3 次!" accent="red" width={540} badge="图片也会损坏!">
            <div style={{ fontFamily: THEME.fontMono, fontSize: 22, fontWeight: 800, color: THEME.red, lineHeight: 1.7 }}>
              <div>onMessage #1: "床前明月光"</div>
              <div>onMessage #2: "疑是地上霜"</div>
              <div>onMessage #3: "举头望明月"</div>
              <div style={{ color: THEME.mutedText, fontSize: 20 }}>二进制图片里的 0x0A 字节就是 \n！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // frame-protocol
  return (
    <StageContainer
      banner="万能协议 FrameProtocol：4 字节大端长度头 + 任意变长包体"
      conceptPill="pack('N', $totalLen) 固定 4 字节包头，无视正文任何字符"
      conceptColor={THEME.dark}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          <BoxCard title="定长包头 (4 字节)" subtitle="pack('N', $len)" accent="orange" width={460} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 28, fontWeight: 800, color: THEME.dark }}>
              0x00 0x00 0x04 0x00
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              先读前 4 字节 =&gt; 总长 = 1024 B
            </div>
          </BoxCard>

          <BoxCard title="变长包体 (任意字节内容)" subtitle="substr($buf, 4)" accent="blue" width={760} badge="随便包含 \n 或二进制" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth: 0 }}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 700 }}>
              [古诗换行 \n | 图片二进制 0x0A 0xFF | JSON | 视频流...]
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: THEME.green }}>
              池子凑够 1024 字节直接按长度一刀切下，零误伤！
            </div>
          </BoxCard>
        </div>

        <CodeHint text="strlen($buf) < 4 => return 0;  |  $len = unpack('Nlen', $buf)['len'];  |  return $len;" highlight />
      </div>
    </StageContainer>
  );
};
