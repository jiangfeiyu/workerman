<?php
$sum = 0;
for ($i = 0; $i < 10000; $i++) {
    $sum += $i;
}
sleep(2);
echo "Sum is: $sum\n";
