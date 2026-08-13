<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
use App\Models\ServiceRequest;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, ServiceRequest $serviceRequest): Review
    {
        return $serviceRequest->review()->create($request->validated());
    }
}
