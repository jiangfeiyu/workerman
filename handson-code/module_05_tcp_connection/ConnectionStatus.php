<?php
declare(strict_types=1);

enum ConnectionStatus: string
{
    case Connecting = 'connecting';
    case Established = 'established';
    case Closing = 'closing';
    case Closed = 'closed';
}
