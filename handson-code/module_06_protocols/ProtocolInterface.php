<?php
declare(strict_types=1);

interface ProtocolInterface
{
    /**
     * 检查缓冲区是否包含完整的一包数据：
     * - 返回 0：半包，数据还不够，继续等待接收
     * - 返回 > 0：完整一包的总字节长度
     */
    public static function input(string $buffer): int;

    /** 把完整包解码成业务数据 */
    public static function decode(string $package): mixed;

    /** 把业务数据编码成网络发送字节流 */
    public static function encode(mixed $data): string;
}
