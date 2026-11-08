<?php
$pid = posix_getpid();

echo "=== 1. 探秘进程当前立足点 (cwd) ===\n";
echo "PHP 函数 getcwd() 结果: " . getcwd() . "\n";
echo "Linux 内核 /proc/$pid/cwd 软链接指向: " . readlink("/proc/$pid/cwd") . "\n\n";

// 在当前目录下造一个测试文件
$testFile = "./test_cwd.txt";
file_put_contents($testFile, "我在原工作目录下！");

echo "=== 2. 尝试用相对路径访问 ./test_cwd.txt ===\n";
if (file_exists($testFile)) {
    echo "✅ 成功找到文件: " . file_get_contents($testFile) . "\n\n";
}

echo "=== 3. 改变进程立足点: chdir('/tmp') ===\n";
chdir('/tmp');
echo "新的 getcwd(): " . getcwd() . "\n";
echo "新的 /proc/$pid/cwd 软链接指向: " . readlink("/proc/$pid/cwd") . "\n\n";

echo "=== 4. 再次尝试用相对路径访问同一个 ./test_cwd.txt ===\n";
if (!file_exists($testFile)) {
    echo "❌ 惨剧发生！找不到 ./test_cwd.txt 了！\n";
    echo "原因：相对路径 ./ 永远相对于进程的 cwd（当前在 /tmp），而不是代码所在的目录！\n";
    echo "正解：守护进程常驻或引入文件，务必使用绝对路径或 __DIR__ (代码所在目录: " . __DIR__ . ")！\n";
}

// 清理原目录下的测试文件
@unlink(__DIR__ . '/test_cwd.txt');
