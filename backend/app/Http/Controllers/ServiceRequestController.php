<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequestRequest;
use App\Http\Requests\UpdateServiceRequestStatusRequest;
use App\Models\ServiceRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    public function index(Request $request): Collection
    {
        $user = $request->user();

        return ServiceRequest::query()
            ->with(['service.provider', 'service.category', 'requester', 'review'])
            ->where(
                fn ($query) => $query->where('requester_id', $user->id)
                    ->orWhereHas('service', fn ($service) => $service->where('user_id', $user->id))
            )
            ->when($request->filled('service_id'), fn ($query) => $query->where('service_id', $request->integer('service_id'))
            )
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
