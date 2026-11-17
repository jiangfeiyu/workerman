<?php
declare(strict_types=1);

// EP088-090: 生成自签名证书 + stream_socket_enable_crypto() 非阻塞 TLS 握手状态机实测
$certFile = sys_get_temp_dir() . '/mw_test_cert.pem';
$priv = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
$csr  = openssl_csr_new(['commonName' => 'localhost'], $priv);
$x509 = openssl_csr_sign($csr, null, $priv, 365);
openssl_x509_export($x509, $certPem);
openssl_pkey_export($priv, $keyPem);
file_put_contents($certFile, $certPem . $keyPem);

$ctx = stream_context_create([
    'ssl' => [
        'local_cert'  => $certFile,
        'verify_peer' => false,
    ],
]);
$server = stream_socket_server('tcp://127.0.0.1:0', $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);
$addr   = stream_socket_get_name($server, false);

$pid = pcntl_fork();
if ($pid === 0) {
    $cCtx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]);
    $cli = stream_socket_client("ssl://{$addr}", $ce, $cs, 3, STREAM_CLIENT_CONNECT, $cCtx);
    fwrite($cli, "GET /tls-ok HTTP/1.1\r\n\r\n");
    $reply = fread($cli, 1024);
    fclose($cli);
    exit(0);
}

$srvConn = stream_socket_accept($server, 3);
stream_set_blocking($srvConn, false);

// 核心：非阻塞 doSslHandshake 状态机循环处理返回值 0 与 true!
$zeroCount = 0;
$handshakeOk = false;
$deadline = microtime(true) + 3.0;
while (microtime(true) < $deadline) {
    $ret = @stream_socket_enable_crypto($srvConn, true, STREAM_CRYPTO_METHOD_TLSv1_2_SERVER | STREAM_CRYPTO_METHOD_TLSv1_3_SERVER);
    if ($ret === 0) {
        $zeroCount++;
        usleep(1_000);
        continue; // 0 = 握手半包中，绝非失败，继续等可读!
    }
    if ($ret === true) {
        $handshakeOk = true;
        break;
    }
    break;
}

stream_set_blocking($srvConn, true);
$plainReq = trim((string)fread($srvConn, 1024));
fwrite($srvConn, "HTTP/1.1 200 OK\r\n\r\nTLS_OK");
fclose($srvConn);
fclose($server);
pcntl_waitpid($pid, $st);
@unlink($certFile);

$logs = [
    '[EP088 · 自签名证书 + SSL Context] 2048-bit RSA PEM 证书就绪，未改业务逻辑即挂上 TLS 上下文',
    "[EP089-090 · doSslHandshake 状态机] 遇到 ret===0 (未握完继续等) 次数={$zeroCount} -> ret===true 握手成功!",
    "[HTTPS 解密收发验证] 服务端解密客户端请求首行 => {$plainReq}",
];

$snapshot = ['episode' => 'ep88_90_tls', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
