<?php
declare(strict_types=1);

// 【加餐过渡】为什么裸 $conn (resource) 玩不转？先踩坑，再用最小包装盒收拢！
[$r, $w] = stream_socket_pair(STREAM_PF_UNIX, STREAM_SOCK_STREAM, 0);

// 1. 踩坑：裸 resource 根本不能挂载业务属性！
try {
    $r->uid = 10086;
} catch (\Throwable $e) {
    echo "[踩坑报错] " . $e->getMessage() . "\n";
}

// 2. 退一步用散装数组？每加一个状态就得建一张表，极易漏删泄漏！
$uids[(int)$r] = 10086;
$sendBuffers[(int)$r] = '';
echo "[散装数组] 维护多张全局表，断连时漏 unset 一张就泄漏！\n";

// 3. 最小包装盒：先不搞 Enum / EventLoop，只用一个最土的盒子装起来！
class ConnBox
{
    public $socket;
    public ?int $uid = null;
    public string $sendBuffer = '';

    public function __construct($socket)
    {
        $this->socket = $socket;
    }
}

$box = new ConnBox($r);
$box->uid = 10086;
echo "[最小包装盒] \$box->uid = {$box->uid} 成功！销毁时 unset(\$box) 全部带走！\n";
fclose($r);
fclose($w);
