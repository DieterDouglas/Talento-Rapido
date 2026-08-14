<?php

namespace App\Enums;

enum EmbeddingTaskType: string
{
    case Document = 'RETRIEVAL_DOCUMENT';
    case Query = 'RETRIEVAL_QUERY';
}
