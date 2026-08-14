<?php

namespace App\Http\Controllers;

use App\Enums\EmbeddingTaskType;
use App\Http\Requests\SmartSearchRequest;
use App\Models\Service;
use App\Services\GeminiEmbeddingService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Pgvector\Laravel\Distance;

class SmartSearchController extends Controller
{
    public function __construct(private readonly GeminiEmbeddingService $embeddings)
    {
    }

    public function search(SmartSearchRequest $request): Collection|JsonResponse
    {
        try {
            $vector = $this->embeddings->embed($request->validated('query'), EmbeddingTaskType::Query);
        } catch (\Throwable) {
            return response()->json([
                'message' => 'A busca inteligente está indisponível no momento. Tente novamente em instantes.',
            ], 503);
        }

        return Service::query()
            ->with(['provider', 'category'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->nearestNeighbors('embedding', $vector, Distance::Cosine)
            ->take(12)
            ->get();
    }
}
