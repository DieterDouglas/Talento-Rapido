<?php

namespace App\Enums;

enum ServiceSortField: string
{
    case Name = 'name';
    case Rating = 'rating';
    case ReviewsCount = 'reviews_count';

    public function column(): string
    {
        return match ($this) {
            self::Name => 'title',
            self::Rating => 'reviews_avg_rating',
            self::ReviewsCount => 'reviews_count',
        };
    }
}
