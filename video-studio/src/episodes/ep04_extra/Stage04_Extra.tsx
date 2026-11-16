import React from 'react';
import { interpolate, spring } from 'remotion';
import { CodeHint, THEME, SPRING_SMOOTH, SPRING_POP } from '../../components';
import type { StageProps } from '../../components/EpisodeShell';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';

export const Stage04_Extra: React.FC<StageProps> = ({
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

  if (visual === 'four-layers') {
    const layers = [
      {
        tag: 'L7 应用层',
        title: 'HTTP / 业务载荷',
        desc: 'GET /index.html HTTP/1.1\\r\\nHost: ...',
        size: 'Variable Bytes',
        color: THEME.blue,
      },
      {
        tag: 'L4 传输层',
        title: 'TCP Header (20B)',
        desc: 'SrcPort | DstPort | Seq | Ack | SYN/ACK/FIN',
        size: '+20 Bytes',
        color: THEME.orange,
      },
      {
        tag: 'L3 网络层',
        title: 'IP Header (20B)',
        desc: 'SrcIP 10.0.0.5 -> DstIP 10.0.0.8 | TTL 64',
        size: '+20 Bytes',
        color: "#8e44ad",
      },
      {
        tag: 'L2 数据链路层',
        title: 'Ethernet Frame (MTU 1500B)',
        desc: 'MAC 帧头 (14B) + IP 包 + FCS 校验 (4B)',
        size: 'Max Payload 1460B (MSS)',
        color: THEME.green,
      },
    ];

    return (
      <StageContainer
        banner="自顶向下层层套娃封装：1500B MTU 扣除 20B IP + 20B TCP = 1460B MSS"
        conceptPill="TCP/IP 四层封装"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            width: 1120,
            transform: `translateY(${(1 - enter) * 20}px)`,
            opacity: enter,
          }}
        >
          {layers.map((layer, idx) => {
            const p = spring({
              frame: Math.max(0, localFrame - idx * 10),
              fps,
              config: SPRING_POP,
            });
            return (
              <div
                key={layer.tag}
                style={{
                  transform: `scale(${0.94 + 0.06 * p})`,
                  opacity: p,
                  background: '#FFFFFF',
                  border: `2px solid ${layer.color}`,
                  borderRadius: 14,
                  padding: '18px 26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div
                    style={{
                      background: layer.color,
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: 19,
                      padding: '8px 16px',
                      borderRadius: 10,
                      minWidth: 165,
                      textAlign: 'center',
                    }}
                  >
                    {layer.tag}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 23,
                        fontWeight: 800,
                        color: THEME.dark,
                      }}
                    >
                      {layer.title}
                    </div>
                    <div
                      style={{
                        fontFamily: THEME.fontMono,
                        fontSize: 18,
                        color: THEME.mutedText,
                        marginTop: 4,
                      }}
                    >
                      {layer.desc}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: THEME.fontMono,
                    fontSize: 19,
                    fontWeight: 700,
                    color: layer.color,
                    background: `${layer.color}14`,
                    padding: '6px 14px',
                    borderRadius: 8,
                  }}
                >
                  {layer.size}
                </div>
              </div>
            );
          })}
        </div>
      </StageContainer>
    );
  }

  if (visual === 'three-way-syn') {
    const p1 = interpolate(localFrame, [10, 48], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const p2 = interpolate(localFrame, [65, 110], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const p3 = interpolate(localFrame, [125, 170], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <StageContainer
        banner="三次握手核心目的：双方确认各自的 [发] 与 [收] 双工能力均正常"
        conceptPill="3-Way Handshake"
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
          <BoxCard
            title="Client (主动发起)"
            subtitle={p3 >= 1 ? 'ESTABLISHED' : p1 > 0 ? 'SYN_SENT' : 'CLOSED'}
            accent={p3 >= 1 ? 'green' : 'blue'}
            width={380}
            minHeight={420}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7, color: THEME.dark }}>
              <div>1. 发 SYN (seq=x)</div>
              <div style={{ color: p2 >= 1 ? THEME.green : THEME.mutedText }}>
                2. 收到 SYN+ACK ✓ 确认自己能收能发
              </div>
              <div style={{ color: p3 >= 1 ? THEME.green : THEME.mutedText }}>
                3. 回 ACK (ack=y+1)
              </div>
            </div>
            <CodeHint text="connect()" highlight={p1 > 0} />
          </BoxCard>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: 460,
              padding: '24px 0',
            }}
          >
            <AnimatedFlowArrow
              width={460}
              label="① SYN = 1, seq = x (随机 ISN)"
              color={THEME.blue}
              progress={p1}
              pulse={p1 > 0 && p1 < 1 ? p1 : null}
            />
            <div style={{ transform: 'scaleX(-1)' }}>
              <AnimatedFlowArrow
                width={460}
                label=""
                color={THEME.orange}
                progress={p2}
                pulse={p2 > 0 && p2 < 1 ? p2 : null}
              />
            </div>
            <div
              style={{
                textAlign: 'center',
                fontFamily: THEME.fontMono,
                fontSize: 19,
                fontWeight: 700,
                color: THEME.orange,
                marginTop: -22,
              }}
            >
              ← ② SYN=1, ACK=1, seq=y, ack=x+1
            </div>
            <AnimatedFlowArrow
              width={460}
              label="③ ACK = 1, seq = x+1, ack = y+1"
              color={THEME.green}
              progress={p3}
              pulse={p3 > 0 && p3 < 1 ? p3 : null}
            />
          </div>

          <BoxCard
            title="Server (listen 队列)"
            subtitle={p3 >= 1 ? 'ESTABLISHED' : p2 > 0 ? 'SYN_RCVD' : 'LISTEN'}
            accent={p3 >= 1 ? 'green' : 'orange'}
            width={380}
            minHeight={420}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7, color: THEME.dark }}>
              <div>• 收到 SYN → 进半连接队列</div>
              <div>• 回 SYN+ACK 等待第三次握手</div>
              <div style={{ color: p3 >= 1 ? THEME.green : THEME.mutedText }}>
                • 收到 ACK → 进全连接队列 (Accept)
              </div>
            </div>
            <CodeHint text="stream_socket_accept()" highlight={p3 >= 1} />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'isn-ghost') {
    const ghostX = interpolate(localFrame, [25, 110], [0, 380], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const blocked = localFrame >= 95;

    return (
      <StageContainer
        banner="随机 ISN 防幽灵老包：绝不让上一代迷路报文串进新连接！"
        conceptPill="ISN 随机初始序号"
        conceptColor={"#8e44ad"}
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
          <BoxCard
            title="历史旧连接迷路包"
            subtitle="seq = 12 (若固定从 0 开始)"
            accent="red"
            width={360}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.65 }}>
              路由器绕远路滞留了 20 秒的旧数据分片，刚好在相同四元组重建连接时飞来！
            </div>
            <CodeHint text="Old Packet: seq=12 'PAY=999'" />
          </BoxCard>

          <div
            style={{
              width: 440,
              height: 160,
              position: 'relative',
              background: '#F8FAFC',
              border: `2px dashed ${THEME.gridColor}`,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            <div
              style={{
                transform: `translateX(${ghostX}px)`,
                background: blocked ? THEME.red : THEME.orange,
                color: '#FFF',
                fontFamily: THEME.fontMono,
                fontSize: 18,
                fontWeight: 700,
                padding: '10px 16px',
                borderRadius: 10,
                boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
              }}
            >
              {blocked ? '✗ 序号不匹配，丢弃！' : '👻 迷路旧包 seq=12'}
            </div>
          </div>

          <BoxCard
            title="新连接内核校验"
            subtitle="期望窗口: 3,849,102,400+"
            accent="green"
            width={380}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.65 }}>
              Linux 用密钥哈希 (四元组 + 微秒时钟) 生成不可预测的随机 ISN。
            </div>
            <CodeHint text="seq=12 不在窗口内 -> Drop + RST" highlight />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'four-way-fin') {
    const s1 = interpolate(localFrame, [10, 42], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const s2 = interpolate(localFrame, [52, 85], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const s3 = interpolate(localFrame, [100, 140], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const s4 = interpolate(localFrame, [150, 185], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <StageContainer
        banner="全双工必须独立关闭两个方向：我没话说了 ≠ 你没话说了"
        conceptPill="四次挥手"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard
            title="主动关闭方 (Client)"
            subtitle={
              s4 >= 1
                ? 'TIME_WAIT (2MSL)'
                : s2 >= 1
                  ? 'FIN_WAIT_2'
                  : 'FIN_WAIT_1'
            }
            accent="blue"
            width={330}
            minHeight={430}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>1. 调用 fclose() 发 FIN</div>
              <div>2. 收到 ACK 停发，但仍可继续收余包！</div>
              <div>3. 收到对端 FIN，回 ACK</div>
            </div>
          </BoxCard>

          <div
            style={{
              width: 540,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '18px 0',
            }}
          >
            <AnimatedFlowArrow
              width={540}
              label="① FIN (我写通道已关)"
              color={THEME.blue}
              progress={s1}
            />
            <AnimatedFlowArrow
              width={540}
              label="← ② ACK (收到，但我还有余包要发)"
              color={THEME.orange}
              progress={s2}
            />
            <AnimatedFlowArrow
              width={540}
              label="← ③ FIN (我余包也发完了，调 fclose)"
              color={THEME.red}
              progress={s3}
            />
            <AnimatedFlowArrow
              width={540}
              label="④ ACK (收到，各自体面退场)"
              color={THEME.green}
              progress={s4}
            />
          </div>

          <BoxCard
            title="被动关闭方 (Server)"
            subtitle={
              s4 >= 1 ? 'CLOSED' : s3 >= 1 ? 'LAST_ACK' : 'CLOSE_WAIT'
            }
            accent={s3 < 1 && s2 >= 1 ? 'orange' : 'green'}
            width={330}
            minHeight={430}
          >
            <div style={{ fontSize: 20, lineHeight: 1.7 }}>
              <div>• 内核自动回 ② ACK</div>
              <div>• 此时进入 CLOSE_WAIT</div>
              <div>• 业务发完剩余响应，调 fclose() 才发 ③ FIN</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'close-wait') {
    const fdCount = Math.min(1024, Math.floor(interpolate(localFrame, [20, 150], [18, 1024])));
    return (
      <StageContainer
        banner="生产高频血案：被动方忘调 fclose() → 永久卡死 CLOSE_WAIT 耗光 FD！"
        conceptPill="CLOSE_WAIT 泄漏"
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
          <CodeBlockPanel
            title="buggy_server.php (漏写 fclose)"
            width={560}
            lines={[
              '$data = fread($conn, 8192);',
              'if ($data === "" || $data === false) {',
              '    echo "客户端断开，但我不管...\\n";',
              '    // 💥 漏了 fclose($conn) 和 unset!',
              '    return;',
              '}',
            ]}
            activeLine={3}
          />
          <BoxCard
            title="ss -ant 现场抓包"
            subtitle={`FD 占用: ${fdCount} / 1024`}
            accent="red"
            width={580}
            minHeight={360}
            badge="Too many open files"
          >
            <TerminalPanel
              width={530}
              localFrame={localFrame}
              stepFrames={24}
              lines={[
                { text: 'ss -ant | grep CLOSE-WAIT | head -n 4', tone: 'cmd' },
                { text: 'CLOSE-WAIT 0 0 127.0.0.1:2345 127.0.0.1:51012', tone: 'warn' },
                { text: 'CLOSE-WAIT 0 0 127.0.0.1:2345 127.0.0.1:51018', tone: 'warn' },
                { text: 'CLOSE-WAIT 0 0 127.0.0.1:2345 127.0.0.1:51029', tone: 'warn' },
                { text: 'Warning: accept(): Too many open files!', tone: 'err' },
              ]}
            />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'time-wait') {
    const countdown = Math.max(0, Math.round(interpolate(localFrame, [15, 160], [60, 0])));
    return (
      <StageContainer
        banner="TIME_WAIT 并非 BUG！主动方守候 2MSL (Linux 约 60s) 承担两大兜底职责"
        conceptPill="TIME_WAIT 2MSL"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard
            title="职责 1：兜底重传最后 ACK"
            accent="blue"
            width={400}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              万一主动方发的第 4 个 ACK 在半路丢了，被动方会重传 FIN。如果主动方还在 TIME_WAIT，就能再次补发 ACK！
            </div>
            <CodeHint text="否则被动方收到 RST 报错退出" />
          </BoxCard>

          <BoxCard
            title="2MSL 倒计时器"
            subtitle={`Linux 2MSL ≈ ${countdown}s`}
            accent="orange"
            width={340}
            minHeight={340}
          >
            <div
              style={{
                fontSize: 64,
                fontFamily: THEME.fontMono,
                fontWeight: 800,
                color: THEME.orange,
                textAlign: 'center',
                margin: '36px 0',
              }}
            >
              {countdown}s
            </div>
            <CodeHint text="SO_REUSEADDR 允许端口快速复用" highlight />
          </BoxCard>

          <BoxCard
            title="职责 2：熬死迷路老包"
            accent="green"
            width={400}
            minHeight={340}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              确保这一对 IP+Port 上的所有旧数据包在网络上彻底超时消散，防止下一次立刻复用相同端口时撞车。
            </div>
            <CodeHint text="1 MSL = 报文最大存活时间 (30s)" />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'nagle-40ms') {
    const waitMs = Math.min(40, Math.round(interpolate(localFrame, [25, 130], [0, 40])));
    return (
      <StageContainer
        banner="经典 40ms 卡顿惨案：Nagle (发完头等 ACK) × Delayed ACK (攒 40ms 再回)"
        conceptPill="Nagle + Delayed ACK 死锁"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 26,
            opacity: enter,
          }}
        >
          <BoxCard
            title="发送端 (Nagle 开启)"
            subtitle="第 1 次 fwrite(Header) 后"
            accent="orange"
            width={400}
            minHeight={380}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>1. 已发 1 个小包 (HTTP Header) 在路上</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 10 }}>
                2. 第 2 次 fwrite(Body) 想发：Nagle 规则规定“前一个包的 ACK 没回来，不许发第二个小包！”
              </div>
            </div>
            <CodeHint text="我等你先回 ACK 再发 Body..." />
          </BoxCard>

          <BoxCard
            title="死等耗时计数器"
            accent="red"
            width={320}
            minHeight={380}
          >
            <div
              style={{
                fontSize: 66,
                fontFamily: THEME.fontMono,
                fontWeight: 800,
                color: THEME.red,
                textAlign: 'center',
                marginTop: 52,
              }}
            >
              +{waitMs}ms
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: THEME.mutedText,
                marginTop: 18,
              }}
            >
              白白浪费的延迟！
            </div>
          </BoxCard>

          <BoxCard
            title="接收端 (Delayed ACK)"
            subtitle="收到第 1 个小包后"
            accent="blue"
            width={400}
            minHeight={380}
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• 内核想省包头流量：打算等业务回响应时“捎带 ACK”</div>
              <div style={{ color: THEME.red, fontWeight: 700, marginTop: 10 }}>
                • 于是故意憋着不回，直到 40ms 定时器超时才被迫单独发 ACK！
              </div>
            </div>
            <CodeHint text="我等你发 Body 好一起回..." />
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'nodelay-fix') {
    return (
      <StageContainer
        banner="两大根治方案：开启 TCP_NODELAY 禁用 Nagle，或用户态拼整包一次写入"
        conceptPill="TCP_NODELAY 破局"
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
          <CodeBlockPanel
            title="方案一：禁用 Nagle 算法"
            width={580}
            lines={[
              '$socket = socket_import_stream($conn);',
              'socket_set_option(',
              '    $socket,',
              '    SOL_TCP,',
              '    TCP_NODELAY,',
              '    1 // 立即发送，绝不等待上一包 ACK',
              ');',
            ]}
            activeLine={4}
          />
          <BoxCard
            title="方案二：应用层合并写 + 效果对比"
            accent="green"
            width={560}
            minHeight={340}
            badge="RTT < 0.2ms"
          >
            <div style={{ fontSize: 21, lineHeight: 1.7 }}>
              <div>• 错误：fwrite($header); fwrite($body); (分两次发小包)</div>
              <div style={{ color: THEME.green, fontWeight: 700, marginTop: 8 }}>
                • 正确：fwrite($conn, $header . $body); (一次整包写入)
              </div>
              <div style={{ marginTop: 16 }}>
                Workerman TcpConnection 默认配置了应用层缓冲区整合与 TCP_NODELAY！
              </div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  return (
    <StageContainer
      banner="拔网线时无 FIN 包！内核 Keepalive 默认等 2 小时，必须用应用层心跳"
      conceptPill="应用层心跳保活"
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
        <BoxCard
          title="内核 TCP Keepalive"
          subtitle="SO_KEEPALIVE (太慢了！)"
          accent="red"
          width={560}
          minHeight={370}
        >
          <div style={{ fontSize: 21, lineHeight: 1.7 }}>
            <div>• tcp_keepalive_time = 7200 秒 (2 小时!)</div>
            <div>• tcp_keepalive_intvl = 75 秒</div>
            <div>• tcp_keepalive_probes = 9 次</div>
            <div style={{ color: THEME.red, marginTop: 10, fontWeight: 700 }}>
              结论：拔掉网线 2 小时服务器都不知道客人死了，还无法感知 PHP 进程僵死！
            </div>
          </div>
        </BoxCard>

        <BoxCard
          title="Workerman 应用层定时心跳"
          subtitle="Timer::add(30s) 精准踢死链"
          accent="green"
          width={580}
          minHeight={370}
          badge="推荐生产方案"
        >
          <CodeBlockPanel
            width={530}
            lines={[
              'Timer::add(10, function() use ($worker) {',
              '    $now = time();',
              '    foreach ($worker->connections as $conn) {',
              '        if ($now - $conn->lastMsgTime > 55) {',
              '            $conn->close(); // 踢掉僵尸连接',
              '        }',
              '    }',
              '});',
            ]}
            activeLine={4}
          />
        </BoxCard>
      </div>
    </StageContainer>
  );
};
