<?php

namespace App\Http\Controllers;

use App\Enums\ServiceSortField;
use App\Enums\SortDirection;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Services\GeminiEmbeddingService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function __construct(private readonly GeminiEmbeddingService $embeddings)
    {
    }

    public function index(Request $request): LengthAwarePaginator
    {
        $sortField = ServiceSortField::tryFrom((string) $request->query('sort'));
        $direction = SortDirection::tryFrom((string) $request->query('direction')) ?? SortDirection::Desc;

        return Service::query()
            ->with(['provider', 'category'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('title', 'ilike', '%'.$request->string('search').'%')
            )
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->integer('category_id'))
            )
            ->when(
                $sortField === ServiceSortField::Rating,
                fn ($query) => $query->orderByRaw("reviews_avg_rating {$direction->value} NULLS LAST")
            )
            ->when(
                $sortField && $sortField !== ServiceSortField::Rating,
                fn ($query) => $query->orderBy($sortField->column(), $direction->value)
            )
            ->when(! $sortField, fn ($query) => $query->latest())
            ->paginate(15);
    }

    public function store(StoreServiceRequest $request): Service
    {
        $service = $request->user()->services()->create($request->validated());

        $this->embedService($service);

        return $service;
    }

    public function show(Service $service): Service
    {
        $service->load(['provider', 'category', 'reviews.serviceRequest.requester']);
        $service->loadAvg('reviews', 'rating');
        $service->loadCount('reviews');

        return $service;
    }

    public function update(UpdateServiceRequest $request, Service $service): Service
    {
        $service->update($request->validated());

        if ($service->wasChanged(['title', 'description'])) {
            $this->embedService($service);
        }

        return $service;
    }

    private function embedService(Service $service): void
    {
        try {
            $vector = $this->embeddings->embed("{$service->title}. {$service->description}");
            $service->update(['embedding' => $vector]);
        } catch (\Throwable $e) {
            // Um serviço sem embedding continua funcionando normalmente,
            // só fica de fora da busca inteligente até ser reindexado.
            Log::warning('Falha ao gerar embedding do serviço', [
                'service_id' => $service->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(Service $service): Response
    {
        $this->authorize('delete', $service);

        $service->delete();

        return response()->noContent();
    }
}
