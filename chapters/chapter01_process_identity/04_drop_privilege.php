<?php
echo "初始身份: UID=" . posix_getuid() . ", GID=" . posix_getgid() . "\n";

// 按照你推导的正确顺序：1. 先趁着还是皇上(UID=0)，把部门(GID)降为平民(33 www-data)
$gidOk = posix_setgid(33);
// 2. 最后再把自己的用户身份(UID)彻底降为平民(33 www-data)
$uidOk = posix_setuid(33);

echo "降权结果: setgid=" . ($gidOk ? '成功' : '失败') . ", setuid=" . ($uidOk ? '成功' : '失败') . "\n";
echo "当前身份: UID=" . posix_getuid() . ", GID=" . posix_getgid() . "\n";
echo "如果现在已经是平民了，再试图改回皇上部门(GID=0): " . (posix_setgid(0) ? '成功' : '失败！没权限了！') . "\n";
