<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\ServiceRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_request_id' => ServiceRequest::factory()->completed(),
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->boolean(80) ? fake()->sentence() : null,
        ];
    }
}
