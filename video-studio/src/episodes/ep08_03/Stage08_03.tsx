import React from 'react';
import { spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage08_03: React.FC<StageProps> = ({
  visual,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({
    frame: Math.max(0, localFrame - 12),
    fps,
    config: SPRING_POP,
  });

  if (visual === 'poem-disaster') {
    return (
      <StageContainer
        banner="04_poem_truncation_disaster.php：正文里自带 \\n 换行符 → 一首《静夜思》被硬砍成 4 截！"
        conceptPill="定界符撞车惨案"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard title="客户端发 1 条完整《静夜思》" accent="blue" width={420} minHeight={340}>
            <div style={{ fontFamily: THEME.fontMono, fontSize: 20, lineHeight: 1.75 }}>
              "床前明月光\n疑是地上霜\n举头望明月\n低头思故乡\n"
            </div>
            <CodeHint text="打算作为【1 条完整消息】发出" />
          </BoxCard>
          <TerminalPanel
            title="换行符协议切包惨状"
            width={680}
            localFrame={localFrame}
            stepFrames={18}
            lines={[
              { text: '🚨 [onMessage 触发第 1 次] 内容: "床前明月光"', tone: 'err' },
              { text: '🚨 [onMessage 触发第 2 次] 内容: "疑是地上霜"', tone: 'err' },
              { text: '🚨 [onMessage 触发第 3 次] 内容: "举头望明月"', tone: 'err' },
              { text: '🚨 [onMessage 触发第 4 次] 内容: "低头思故乡"', tone: 'err' },
            ]}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'string-len-fail') {
    return (
      <StageContainer
        banner="包头写文本数字行不行？'5' 占 1B，'100000' 占 6B → 包头自己多长都不确定，彻底死循环！"
        conceptPill="文本数字头的悖论"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard title="小消息: '5' + 'hello'" accent="blue" width={540} minHeight={330}>
            <div style={{ fontSize: 22, lineHeight: 1.75 }}>
              长度字符串 <code style={{ fontFamily: THEME.fontMono }}>'5'</code> 只占 <b>1 字节</b>
            </div>
            <CodeHint text="接收方：该先读 1 字节还是 6 字节来解析长度？！" />
          </BoxCard>
          <BoxCard title="大消息: '100000' + 100KB" accent="red" width={560} minHeight={330}>
            <div style={{ fontSize: 22, lineHeight: 1.75 }}>
              长度字符串 <code style={{ fontFamily: THEME.fontMono }}>'100000'</code> 占了 <b>6 字节</b>
            </div>
            <CodeHint text="如果包头自身不是定长，你根本无法下手读包头！" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'pack-n-magic') {
    const rows = [
      { n: '5', hex: '00 00 00 05', len: '4 Bytes' },
      { n: '100,000', hex: '00 01 86 a0', len: '4 Bytes' },
      { n: '4,000,000,000', hex: 'ee 6b 28 00', len: '4 Bytes' },
    ];
    return (
      <StageContainer
        banner="05_pack_unpack_microscope.php：pack('N', $len) 让 0~42 亿任何数字永远死死只占【4 字节】！"
        conceptPill="固定 4 字节二进制头"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            width: 1100,
            opacity: enter,
          }}
        >
          {rows.map((r, idx) => (
            <div
              key={r.n}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: `3px solid ${idx === 2 ? THEME.blue : THEME.dark}`,
                borderRadius: 16,
                padding: '18px 28px',
                boxShadow: '0 8px 0 rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 800 }}>
                pack('N', {r.n})
              </div>
              <div style={{ fontFamily: THEME.fontMono, fontSize: 26, fontWeight: 800, color: THEME.orange }}>
                [ {r.hex} ]
              </div>
              <div
                style={{
                  background: THEME.green,
                  color: '#FFF',
                  fontFamily: THEME.fontMono,
                  fontSize: 20,
                  fontWeight: 800,
                  padding: '8px 18px',
                  borderRadius: 10,
                }}
              >
                死死固定 {r.len}
              </div>
            </div>
          ))}
        </div>
      </StageContainer>
    );
  }

  if (visual === 'big-endian') {
    const bytes = ['0x00 (高位 MSB)', '0x01', '0x86', '0xa0 (低位 LSB)'];
    return (
      <StageContainer
        banner="大端序 Big-Endian ('N')：高位在前、低位在后，统一网络传输标准消除 CPU 字节序差异！"
        conceptPill="网络大端序 (Big-Endian)"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            opacity: enter,
          }}
        >
          <BoxCard
            title="数字 100,000 = 0x000186a0 在网线里的排队顺序"
            subtitle="大端序 (pack 'N')：左高位 -> 右低位"
            accent="blue"
            width={1060}
            minHeight={220}
          >
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 10 }}>
              {bytes.map((b, i) => (
                <div
                  key={b}
                  style={{
                    flex: 1,
                    background: i === 0 ? THEME.orangeBg : '#F8FAFC',
                    border: `2.5px solid ${i === 0 ? THEME.orange : THEME.dark}`,
                    borderRadius: 12,
                    padding: '18px 14px',
                    textAlign: 'center',
                    fontFamily: THEME.fontMono,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  <div>Byte #{i}</div>
                  <div style={{ color: THEME.blue, marginTop: 8 }}>{b}</div>
                </div>
              ))}
            </div>
          </BoxCard>
          <CodeHint text="x86 CPU 内存用小端序 (反着存 a0 86 01 00)，跨网通信务必统一用大写 N 网络大端序！" highlight />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'unpack-pitfall') {
    return (
      <StageContainer
        banner="PHP 新手必踩大坑：unpack('N', $bin) 不取名时返回数组下标居然从 [1] 开始而不是 [0]！"
        conceptPill="unpack('Ntotal_length', $bin)"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard title="❌ 无命名键的阴险陷阱" accent="red" width={540} minHeight={330}>
            <CodeBlockPanel
              width={490}
              lines={[
                '$arr = unpack("N", $bin);',
                '// var_dump($arr) => [ 1 => 63 ] (根本没有 $arr[0]!)',
                '$len = $arr[0]; // 💥 Undefined array key 0!',
              ]}
              activeLine={2}
            />
          </BoxCard>
          <BoxCard title="✅ Workerman 严谨写法" accent="green" width={560} minHeight={330}>
            <CodeBlockPanel
              width={510}
              lines={[
                '$unpack_data = unpack("Ntotal_length", $buffer);',
                '// var_dump => [ "total_length" => 63 ]',
                'return $unpack_data["total_length"]; // 清晰 zero bug!',
              ]}
              activeLine={0}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'frame-input-3states') {
    const step = Math.floor(localFrame / 48) % 3;
    return (
      <StageContainer
        banner="Frame::input($buffer) 嗅探三步：< 4B 返回 0 → 解包算总长 → 够长就返回精确包长切片！"
        conceptPill="input() 三态嗅探机"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            opacity: enter,
          }}
        >
          <CodeBlockPanel
            title="Frame::input(string $buffer): int"
            width={680}
            lines={[
              'public static function input(string $buffer): int {',
              '    // 状态 1：连 4 字节包头都没收齐，返回 0 继续攒半包！',
              '    if (strlen($buffer) < 4) return 0;',
              '    // 状态 2：解出前 4 字节约定的【总包长 = 4 + 包体】',
              '    $unpack = unpack("Ntotal_length", $buffer);',
              '    // 外层框架拿这个返回值跟 strlen($recvBuffer) 比较决定是否继续等！',
              '    return $unpack["total_length"];',
              '}',
            ]}
            activeLine={step === 0 ? 2 : step === 1 ? 4 : 6}
          />
          <BoxCard title="外层统一判定逻辑" accent="green" width={420} minHeight={340}>
            <div style={{ fontSize: 21, lineHeight: 1.75 }}>
              <div>• 返回 <b>0</b> → 继续等数据</div>
              <div>• 返回 <b>67</b>，但缓存只有 10B → 仍不够，继续等！</div>
              <div>• 缓存 ≥ <b>67B</b> → 精准切出前 67B 解包交付业务！</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'decode-encode-binary') {
    return (
      <StageContainer
        banner="encode 穿 4B 头 · decode 剥 4B 头：包体就算塞满 \\n 和 \\x00 图片二进制也丝毫无损！"
        conceptPill="encode / decode 透传二进制"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 28,
            opacity: enter,
          }}
        >
          <BoxCard title="发送端 encode() 穿马甲" accent="blue" width={540} minHeight={350}>
            <CodeBlockPanel
              width={490}
              lines={[
                'public static function encode($data): string {',
                '    $totalLen = 4 + strlen($data);',
                '    // 4 字节二进制包头 + 原封不动原始字节',
                '    return pack("N", $totalLen) . $data;',
                '}',
              ]}
              activeLine={3}
            />
          </BoxCard>
          <BoxCard title="接收端 decode() 脱马甲" accent="green" width={560} minHeight={350}>
            <CodeBlockPanel
              width={510}
              lines={[
                'public static function decode(string $buffer): string {',
                '    // 一刀跳过头 4 字节长度头，原汁原味交出正文！',
                '    return substr($buffer, 4);',
                '}',
                '// 因为按【长度】切分，完全不管正文里有没有 \\n 或 \\x00！',
              ]}
              activeLine={2}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="06_frame_protocol_demo.php & Workerman/Protocols/Frame.php 源码对齐：全链路通关！"
      conceptPill="FrameProtocol 实战通关"
      conceptColor={THEME.green}
      localFrame={localFrame}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          transform: `scale(${0.95 + 0.05 * pop})`,
          opacity: enter,
        }}
      >
        <TerminalPanel
          title="06_frame_protocol_demo.php 极端粘包+半包混合实测"
          width={760}
          localFrame={localFrame}
          stepFrames={18}
          lines={[
            { text: '1. [客户端] 连续粘在一起发：《静夜思》(含4个\\n) + 纯二进制(\\x00\\x0a)', tone: 'cmd' },
            { text: '🎉 [onMessage 第 1 次] 完整《静夜思》 (63 字节，一首诗完好无损!)', tone: 'ok' },
            { text: '🎉 [onMessage 第 2 次] 完整二进制流 (24 字节，0x00 未截断!)', tone: 'ok' },
            { text: '2. [客户端] 故意拆半包：先发 10 字节 -> 后补剩下面包', tone: 'warn' },
            { text: '🎉 [onMessage 第 3 次] 完整收到拼合后的第 3 包！', tone: 'ok' },
          ]}
        />
        <BoxCard title="全链路彻底打通" accent="green" width={360} minHeight={340} badge="Stage 0~8 毕业">
          <div style={{ fontSize: 21, lineHeight: 1.75 }}>
            从系统调用 <code style={{ fontFamily: THEME.fontMono }}>write(1)</code> 到事件循环、最小堆定时器、双缓冲背压，再到二进制协议芯片，底层再无黑盒！
          </div>
        </BoxCard>
      </div>
    </StageContainer>
  );
};
