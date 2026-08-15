<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequestRequest;
use App\Http\Requests\UpdateServiceRequestStatusRequest;
use App\Models\ServiceRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    public function sent(Request $request): Collection
    {
        return ServiceRequest::query()
            ->where('requester_id', $request->user()->id)
            ->with(['service.provider', 'service.category', 'requester', 'review'])
            ->when($request->filled('service_id'), fn ($query) => $query->where('service_id', $request->integer('service_id'))
            )
            ->latest()
            ->get();
    }

    public function received(Request $request): Collection
    {
        // Pendente > aceito > concluído > cancelado — dá mais destaque
        // pro que ainda precisa de uma ação do prestador. A ordem vem
        // direto de ServiceRequest::STATUSES, sem duplicar os valores.
        $priorityCases = collect(ServiceRequest::STATUSES)
            ->map(fn (string $status, int $priority) => "WHEN '{$status}' THEN {$priority}")
            ->implode(' ');

        return ServiceRequest::query()
            ->whereHas('service', fn ($query) => $query->where('user_id', $request->user()->id))
            ->with(['service.provider', 'service.category', 'requester', 'review'])
            ->orderByRaw("CASE status {$priorityCases} END")
            ->latest()
            ->get();
    }

    public function store(StoreServiceRequestRequest $request): ServiceRequest
    {
        return $request->user()->serviceRequests()->create($request->validated());
    }

    public function show(ServiceRequest $serviceRequest): ServiceRequest
    {
        $this->authorize('view', $serviceRequest);

        return $serviceRequest->load(['service', 'requester']);
    }

    public function updateStatus(UpdateServiceRequestStatusRequest $request, ServiceRequest $serviceRequest): ServiceRequest
    {
        $serviceRequest->update($request->validated());

        return $serviceRequest;
    }
}
