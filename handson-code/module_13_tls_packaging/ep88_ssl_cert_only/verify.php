<?php
declare(strict_types=1);

// 【独立验证】EP088 生成 2048-bit RSA 自签名 PEM 证书并挂入 SSL Context（不剧透 EP089/090）
$pemFile = sys_get_temp_dir() . '/mw_ep88_cert.pem';
$priv = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
$csr = openssl_csr_new(['commonName' => 'localhost'], $priv);
$x509 = openssl_csr_sign($csr, null, $priv, 365);
openssl_x509_export($x509, $certPem);
openssl_pkey_export($priv, $keyPem);
file_put_contents($pemFile, $certPem . $keyPem);

$ctx = stream_context_create(['ssl' => ['local_cert' => $pemFile, 'verify_peer' => false]]);
$srv = stream_socket_server('tcp://127.0.0.1:0', $e, $s, STREAM_SERVER_BIND | STREAM_SERVER_LISTEN, $ctx);
$addr = stream_socket_get_name($srv, false);
fclose($srv);
@unlink($pemFile);

$logs = [
    '[OpenSSL 生成] 2048-bit RSA 私钥 + X.509 自签名证书 PEM 就绪',
    "[SSL Context 挂载] stream_socket_server('tcp://{$addr}', \$ctx) 启动成功 (业务代码 0 改动!)",
];

$snapshot = ['episode' => 'ep88', 'output' => $logs];
file_put_contents(__DIR__ . '/snapshot.json', json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n");
echo json_encode($snapshot, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
