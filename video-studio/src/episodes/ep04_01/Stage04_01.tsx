import React from 'react';
import { spring } from 'remotion';
import { CodeHint, SPRING_POP, SPRING_SMOOTH, THEME } from '../../components';
import {
  AnimatedFlowArrow,
  BoxCard,
  CodeBlockPanel,
  StageContainer,
  TerminalPanel,
} from '../../components/StagePrimitives';
import type { StageProps } from '../../components/EpisodeShell';

export const Stage04_01: React.FC<StageProps> = ({ visual, localFrame, fps }) => {
  const enter = spring({ frame: localFrame, fps, config: SPRING_SMOOTH });
  const pop = spring({ frame: localFrame - 20, fps, config: SPRING_POP });
  const pulse = (localFrame % 42) / 42;

  if (visual === 'socket-is-fd') {
    return (
      <StageContainer
        banner="跨机器通信还是一切皆文件吗？Socket 照样是 3 号 FD！"
        conceptPill="stream_socket_server('tcp://0.0.0.0:8080') -> 内核分配 FD 3"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="01_socket_listen.php"
            lines={[
              '$server = stream_socket_server(',
              '    "tcp://0.0.0.0:8080"',
              ');',
              '// 进 /proc/PID/fd 偷看：3 -> socket:[12345]',
            ]}
            activeLine={1}
            width={580}
          />
          <BoxCard title="地址三要素缺一不可" accent="blue" width={520}>
            <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.65 }}>
              <div>1. tcp:// — 使用 TCP 快递协议</div>
              <div>2. 0.0.0.0 — 监听本机所有网卡</div>
              <div>3. :8080 — 房间门牌号（端口区分微信/Web）</div>
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'ss-listen') {
    return (
      <StageContainer
        banner="终端透视镜 ss -tlnp：亲眼看到 8080 端口大门敞开！"
        conceptPill="LISTEN 状态：8080 端口已正式挂牌绑定到 PHP 进程 PID"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <TerminalPanel
          title="ss -tlnp 端口监听检查"
          lines={[
            { text: '$ ss -tlnp | grep 8080', tone: 'cmd' },
            { text: 'State   Recv-Q  Send-Q  Local Address:Port   Process', tone: 'dim' },
            { text: 'LISTEN  0       128     0.0.0.0:8080         users:(("php",pid=2310,fd=3))', tone: 'ok' },
            { text: '# 看见没？fd=3 正是我们的 PHP 监听 Socket！', tone: 'warn' },
          ]}
          localFrame={localFrame}
          stepFrames={18}
          width={980}
        />
      </StageContainer>
    );
  }

  if (visual === 'why-no-fread') {
    return (
      <StageContainer
        banner="撞墙实验：既然 $server 是 3 号文件，直接 fread($server) 行不行？"
        conceptPill="迎宾小姐 FD 3 只管在门口喊欢迎光临，绝不能直接读客人消息！"
        conceptColor={THEME.red}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="错误尝试"
            lines={[
              '$server = stream_socket_server("tcp://0.0.0.0:8080");',
              '$msg = fread($server, 1024); // ❌ 报错！',
            ]}
            activeLine={1}
            width={620}
          />
          <AnimatedFlowArrow width={160} label="被拒!" color={THEME.red} progress={enter} blocked />
          <BoxCard title="饭店模型秒懂" accent="red" width={430} badge="大门会被堵死!">
            <div style={{ fontSize: 23, fontWeight: 700, color: THEME.red }}>
              若大门口迎宾员直接拉着张三在门口点菜聊天，后面的李四王五全堵死进不来！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'accept-waiter') {
    return (
      <StageContainer
        banner="accept 分身术：3 号迎宾员接待客人，生出 4 号专职服务员！"
        conceptPill="stream_socket_accept($server) -> 返回新 FD 4 ($conn)"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <BoxCard title="FD 3 迎宾员 ($server)" subtitle="LISTEN 门口" accent="blue" width={360}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>一直站在 8080 门口接新客，永不离开！</div>
          </BoxCard>
          <AnimatedFlowArrow width={200} label="accept4() 分身" color={THEME.orange} progress={enter} pulse={pulse} />
          <BoxCard title="FD 4 包厢服务员 ($conn)" subtitle="专职 1 对 1" accent="orange" width={420} badge="新连接诞生!">
            <CodeHint text="/proc/PID/fd: 4 -> socket:[22222]" highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>领进包厢，专门负责这 1 个客人的收发！</div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'duplex-rw') {
    return (
      <StageContainer
        banner="拿到 4 号服务员：fread($conn) 收消息，fwrite($conn) 回消息！"
        conceptPill="挂断后 fclose($conn) 只销毁 FD 4，门口的 FD 3 依然健在"
        conceptColor={THEME.green}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <CodeBlockPanel
            title="02_accept_and_rw.php"
            lines={[
              '$conn = stream_socket_accept($server); // FD 4',
              '$msg = fread($conn, 1024);           // 收信',
              'fwrite($conn, "收到: $msg");         // 回信',
              'fclose($conn);                       // 仅关 FD 4',
            ]}
            activeLine={localFrame > 55 ? 2 : 1}
            width={620}
          />
          <TerminalPanel
            title="客户端 nc 127.0.0.1 8080"
            lines={[
              { text: '$ nc 127.0.0.1 8080', tone: 'cmd' },
              { text: 'hello server', tone: 'dim' },
              { text: '收到: hello server', tone: 'ok' },
            ]}
            localFrame={localFrame}
            stepFrames={22}
            width={480}
          />
        </div>
      </StageContainer>
    );
  }

  if (visual === 'worker-network') {
    return (
      <StageContainer
        banner="v0.6 合体！把第 3 章 Worker 里的 STDIN 换成 Socket + accept！"
        conceptPill="只需改几行代码，玩具脚本立刻长成真正的网络服务器！"
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="03_worker_socket.php (v0.6)"
            lines={[
              'class Worker {',
              '    public $onMessage = null;',
              '    public function run() {',
              '        $server = stream_socket_server($this->address);',
              '        $conn = stream_socket_accept($server);',
              '        while (($msg = fread($conn, 1024)) !== "") {',
              '            ($this->onMessage)($msg);',
              '        }',
              '    }',
              '}',
            ]}
            activeLine={4}
            width={740}
          />
          <BoxCard title="完美响应浏览器！" accent="green" width={420}>
            <CodeHint text="HTTP/1.1 200 OK" highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              按 HTTP 规范拼上 Content-Length 就能直接在 Chrome 打开！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'two-args') {
    const fixed = pop > 0.25;
    return (
      <StageContainer
        banner="撞墙痛点：在 $onMessage 闭包里怎么给客人回话？手里没有 $conn！"
        conceptPill="Workerman 双参数铁律：($this->onMessage)($conn, $msg)"
        conceptColor={THEME.orange}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          <CodeBlockPanel
            title="为什么必须传两个参数？"
            lines={[
              '// ❌ 只有 $msg，不知道往哪个 FD 写回信！',
              '$worker->onMessage = function ($msg) {',
              '    fwrite(???, "在的!"); // 抓瞎！',
              '};',
              '// ✅ 把 4 号服务员 $conn 作为第 1 参数递出来！',
              '$worker->onMessage = function ($conn, $msg) {',
              '    fwrite($conn, "在的!");',
              '};',
            ]}
            activeLine={fixed ? 6 : 2}
            width={680}
          />
          <BoxCard title="彻底顿悟！" accent={fixed ? 'green' : 'red'} width={460} badge={fixed ? '第1参数必须是 $conn' : '拿不到 $conn'}>
            <div style={{ fontSize: 23, fontWeight: 700 }}>
              因为 $conn 藏在 Worker::run() 内部，必须通过参数接力棒递给业务闭包！
            </div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  if (visual === 'lifecycle-slots') {
    return (
      <StageContainer
        banner="v0.7 全生命周期插座：onConnect + onMessage + onClose"
        conceptPill="客人进门送瓜子 (onConnect) → 聊天 (onMessage) → 买单离开 (onClose)"
        conceptColor={THEME.blue}
        localFrame={localFrame}
      >
        <div style={{ display: 'flex', gap: 28 }}>
          <BoxCard title="1. onConnect($conn)" subtitle="accept 成功时" accent="blue" width={380}>
            <CodeHint text="fwrite($conn, '欢迎光临!');" highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>客人刚进包厢触发一次</div>
          </BoxCard>
          <BoxCard title="2. onMessage($conn, $msg)" subtitle="fread 有数据时" accent="orange" width={390}>
            <CodeHint text="fwrite($conn, '回复:'.$msg);" highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>每次收到业务消息触发</div>
          </BoxCard>
          <BoxCard title="3. onClose($conn)" subtitle="fread 读到空串" accent="green" width={380}>
            <CodeHint text="fclose($conn);" highlight />
            <div style={{ fontSize: 22, fontWeight: 700 }}>客人挂断离开时清理现场</div>
          </BoxCard>
        </div>
      </StageContainer>
    );
  }

  // reuseaddr
  return (
    <StageContainer
      banner="Ctrl+C 重启报错 Address already in use？TIME_WAIT 与 SO_REUSEADDR！"
      conceptPill="stream_context_create(['socket' => ['so_reuseaddr' => 1]])"
      conceptColor={THEME.red}
      localFrame={localFrame}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
        <TerminalPanel
          title="ss -tan | grep 8080"
          lines={[
            { text: '$ php server.php', tone: 'cmd' },
            { text: 'Error: Address already in use (端口被占!)', tone: 'err' },
            { text: '$ ss -tan | grep 8080', tone: 'cmd' },
            { text: 'TIME-WAIT  0  0  127.0.0.1:8080  127.0.0.1:51234', tone: 'warn' },
          ]}
          localFrame={localFrame}
          stepFrames={16}
          width={620}
        />
        <CodeBlockPanel
          title="Workerman/Worker.php :: listen()"
          lines={[
            '$context = stream_context_create([',
            "    'socket' => ['so_reuseaddr' => 1],",
            ']);',
            'stream_socket_server($addr, $e, $s, ..., $context);',
          ]}
          activeLine={1}
          width={580}
        />
      </div>
    </StageContainer>
  );
};
