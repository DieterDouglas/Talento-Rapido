<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ServiceController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        return Service::query()
            ->with(['provider', 'category'])
            ->when($request->string('search')->isNotEmpty(), fn ($query) => $query->where('title', 'ilike', '%'.$request->string('search').'%')
            )
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->integer('category_id'))
            )
            ->latest()
            ->paginate(15);
    }

    public function store(StoreServiceRequest $request): Service
    {
        return $request->user()->services()->create($request->validated());
    }

    public function show(Service $service): Service
    {
        return $service->load(['provider', 'category', 'reviews.serviceRequest.requester']);
    }

    public function update(UpdateServiceRequest $request, Service $service): Service
    {
        $service->update($request->validated());

        return $service;
    }

    public function destroy(Service $service): Response
    {
        $this->authorize('delete', $service);

        $service->delete();

        return response()->noContent();
    }
}
