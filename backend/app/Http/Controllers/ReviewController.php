<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
use App\Models\ServiceRequest;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, ServiceRequest $serviceRequest): Review
    {
        $imagePath = $request->hasFile('image')
            ? $request->file('image')->store('reviews', 'public')
            : null;

        return $serviceRequest->review()->create([
            ...$request->safe()->only(['rating', 'comment']),
            'image_path' => $imagePath,
        ]);
    }
}
