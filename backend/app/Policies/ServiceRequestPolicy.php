<?php

namespace App\Policies;

use App\Models\ServiceRequest;
use App\Models\User;

class ServiceRequestPolicy
{
    public function view(User $user, ServiceRequest $serviceRequest): bool
    {
        return $user->is($serviceRequest->requester) || $user->is($serviceRequest->service->provider);
    }

    public function updateStatus(User $user, ServiceRequest $serviceRequest): bool
    {
        return $user->is($serviceRequest->service->provider);
    }
}
