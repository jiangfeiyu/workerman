<?php
declare(strict_types=1);

// 【独立真实验证】EP089 非阻塞 stream_socket_enable_crypto() 真实捕获 ret === 0 后再转为 true
$pemFile = sys_get_temp_dir() . '/mw_ep89_cert.pem';
$priv = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
$csr = openssl_csr_new(['commonName' => 'localhost'], $priv);
$x509 = openssl_csr_sign($csr, null, $priv, 365);
openssl_x509_export($x509, $certPem);
openssl_pkey_export($priv, $keyPem);
file_put_contents($pemFile, $certPem . $keyPem);

$ctx = stream_context_create(['ssl' => ['local_cert' => $pemFile, 'verify_peer' => false]]);
$srv = stream_socket_server('tcp://127.0.0.1:0', $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);
$addr = stream_socket_get_name($srv, false);

$cliCtx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]);
$client = stream_socket_client("tcp://{$addr}", $e2, $s2, 2, STREAM_CLIENT_CONNECT | STREAM_CLIENT_ASYNC_CONNECT, $cliCtx);
stream_set_blocking($client, false);
$conn = @stream_socket_accept($srv, 1);
stream_set_blocking($conn, false);

$zeroCount = 0;
$srvDone = false;
$cliDone = false;
for ($i = 0; $i < 200 && (!$srvDone || !$cliDone); $i++) {
    if (!$cliDone) {
        $rCli = @stream_socket_enable_crypto($client, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
        if ($rCli === true) $cliDone = true;
    }
    if (!$srvDone) {
        $rSrv = @stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLSv1_2_SERVER | STREAM_CRYPTO_METHOD_TLSv1_3_SERVER);
        if ($rSrv === 0) $zeroCount++;
        elseif ($rSrv === true) $srvDone = true;
    }
    usleep(1_000);
}

fclose($client);
fclose($conn);
fclose($srv);
@unlink($pemFile);

$logs = [
    "[捕获 ret === 0] 非阻塞握手半包次数 = {$zeroCount} 次 (绝不能用 !\$ret 误判成失败!)",
    '[握手最终完成] ret === true => ' . ($srvDone ? 'TLS_ESTABLISHED' : 'FAIL'),
];

$snapshot = ['episode' => 'ep89', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
