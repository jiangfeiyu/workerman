<?php
declare(strict_types=1);

// 【踩坑】TCP 是没有消息边界的自来水管：连发 20 条短消息，接收端一次 fread 往往收到“连体怪”甚至“半截包”！
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

for ($i = 1; $i <= 20; $i++) {
    fwrite($w, json_encode(['id' => $i, 'msg' => 'hello']) . "\n");
}
fclose($w);

// 模拟接收端一次最多只读 128 字节
$chunk1 = fread($r, 128);
$chunk2 = fread($r, 128);
fclose($r);

echo "[第1次 fread(128) 惨状] 字节=" . strlen((string)$chunk1) . "\n" . trim((string)$chunk1) . "\n";
echo "---\n";
echo "[第2次 fread(128) 惨状] 开头居然是上一条被腰斩的残片:\n" . strtok((string)$chunk2, "\n") . "\n";
