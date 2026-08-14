<?php

namespace App\Services;

use App\Enums\EmbeddingTaskType;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class GeminiEmbeddingService
{
    private const MODEL = 'gemini-embedding-001';

    private const DIMENSIONS = 768;

    /**
     * @return float[]
     */
    public function embed(string $text, EmbeddingTaskType $taskType = EmbeddingTaskType::Document): array
    {
        $apiKey = config('services.gemini.key');

        if (! $apiKey) {
            throw new RuntimeException('GEMINI_API_KEY não configurada.');
        }

        $response = Http::withHeaders(['x-goog-api-key' => $apiKey])
            ->post('https://generativelanguage.googleapis.com/v1beta/models/'.self::MODEL.':embedContent', [
                'model' => 'models/'.self::MODEL,
                'content' => [
                    'parts' => [['text' => $text]],
                ],
                'taskType' => $taskType->value,
                'outputDimensionality' => self::DIMENSIONS,
            ])
            ->throw()
            ->json();

        return $response['embedding']['values'];
    }
}
